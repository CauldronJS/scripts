const assert = require('internal/assert');
const { fork } = require('child_process');
const path = require('path');
const EventEmitter = require('events');
const RoundRobinHandle = require('internal/cluster/round_robin_handle');
const SharedHandle = require('internal/cluster/shared_handle');
const Worker = require('internal/cluster/worker');
const { internal, sendHelper } = require('internal/cluster/utils');
const { ERR_SOCKET_BAD_PORT } = require('internal/errors').codes;
const { isLegalPort } = require('internal/net');

const cluster = new EventEmitter();
const intercom = new EventEmitter();

const SCHED_NONE = 1;
const SCHED_RR = 2;

const [minPort, maxPort] = [1024, 65535];

const handles = new Map();
cluster.isWorker = false;
cluster.isMaster = true;
cluster.Worker = Worker;
cluster.workers = {};
cluster.settings = {};
cluster.SCHED_NONE = SCHED_NONE;
cluster.SCHED_RR = SCHED_RR;

module.exports = cluster;

let ids = 0;
let debugPortOffset = 1;
let initialized = false;

let schedulingPolicy =
  {
    none: SCHED_NONE,
    rr: SCHED_RR
  }[process.env.NODE_CLUSTER_SCHED_POLICY] || SCHED_RR;

cluster.schedulingPolicy = schedulingPolicy;

cluster.setupMaster = options => {
  const settings = {
    args: process.argv.slice(2),
    exec: process.argv[1],
    execArgv: process.execArgv,
    silent: false,
    ...cluster.settings,
    ...options
  };

  if (
    settings.execArgv.some(s => s.startsWith('--prof')) &&
    !settings.execArgv.some(s => s.startsWith('--logfile='))
  ) {
    settings.execArgv = settings.execArgv.concat(['-logfile=cauldron-%p.log']);
  }

  cluster.settings = settings;
  if (initialized === true) {
    return process.nextTick(setupSettingsNT, settings);
  }
  initialized = true;

  schedulingPolicy = cluster.schedulingPolicy;
  assert(
    schedulingPolicy === SCHED_NONE || schedulingPolicy === SCHED_RR,
    `Bad cluster.schedulingPolicy: ${schedulingPolicy}`
  );

  process.nextTick(setupSettingsNT, settings);

  process.on('internalMessage', message => {
    if (message.cmd !== 'NOE_DEBUG_ENABLED') {
      return;
    }

    for (const worker of Object.values(cluster.workers)) {
      if (worker.state === 'online' || worker.state === 'listening') {
        process._debugProcess(worker.process.pid);
      } else {
        worker.once('online', () => {
          process._debugProcess(this.process.pid);
        });
      }
    }
  });
};

const setupSettingsNT = settings => cluster.emit('setup', settings);

const createWorkerProcess = (id, env) => {
  const workerEnv = { ...process.env, ...env, CAULDRON_UNIQUE_ID: `${id}` };
  const execArgv = cluster.settings.execArgv.slice();
  const debugArgRegex = /--inspect(?:brk|-port)?|--debug-port/;
  const options = process.env.NODE_OPTIONS || '';
  if (
    execArgv.some(arg => arg.match(debugArgRegex)) ||
    options.match(debugArgRegex)
  ) {
    let inspectPort;
    if (cluster.settings.inspectPort) {
      if (typeof cluster.settings.inspectPort === 'function') {
        inspectPort = cluster.settings.inspectPort();
      } else {
        inspectPort = cluster.settings.inspectPort;
      }
      if (!isLegalPort(inspectPort)) {
        throw new ERR_SOCKET_BAD_PORT(inspectPort);
      }
    } else {
      inspectPort = process.debugPort + debugPortOffset;
      if (inspectPort > maxPort) {
        inspectPort = inspectPort - maxPort + minPort - 1;
      }
      debugPortOffset++;
    }

    execArgv.push(`--inspect-port=${inspectPort}`);
  }

  const {
    exec,
    args,
    cwd,
    silent,
    windowsHide,
    stdio,
    gid,
    uid
  } = cluster.settings;
  return fork(exec, args, {
    cwd,
    env: workerEnv,
    silent,
    windowsHide,
    stdio,
    execArgv,
    gid,
    uid
  });
};

const removeWorker = worker => {
  assert(worker);
  delete cluster.workers[worker.id];

  if (Object.keys(cluster.workers).length === 0) {
    assert(handles.size === 0, 'Resource leak detected.');
    intercom.emit('disconnect');
  }
};

const removeHandlesForWorker = worker => {
  assert(worker);
  handles.forEach((handle, key) => {
    if (handle.remove(worker)) {
      handles.delete(key);
    }
  });
};

cluster.fork = env => {
  cluster.setupMaster();
  const id = ++ids;
  const process = createWorkerProcess(id, env);
  const worker = new Worker({
    id,
    process
  });

  worker.on('message', (message, handle) => {
    cluster.emit('message', this, message, handle);
  });

  worker.process.once('exit', (exitCode, signalCode) => {
    if (!worker.isConnected()) {
      removeHandlesForWorker(worker);
      removeWorker(worker);
    }

    worker.exitedAfterDisconnect = !!worker.exitedAfterDisconnect;
    worker.state = 'dead';
    worker.emit('exit', exitCode, signalCode);
    cluster.emit('exit', worker, exitCode, signalCode);
  });
};

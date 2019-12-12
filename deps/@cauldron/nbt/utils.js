import semver from 'semver';

export const since = minVersion => currentVersion =>
  semver.gte(minVersion, currentVersion);

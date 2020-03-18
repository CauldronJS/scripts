---
id: configuration
title: Configuring CauldronJS
sidebar_label: Configuration
---

# `package.json`

The `package.json` lives in every Node project. It's a basic file that tells the environment
the name, how it should run it, how to compile, and what it depends on. This is useful in
exporting your code as a library or automating a pipeline. For Cauldron, we'll learn how it
can configure our environment.

The typical structure looks something like this

```language/json
{
  "main": "index.js",
  "description": "My super cool library",
  "author": "Justin Cox",
  "url": "https://github.com/conji",
  "scripts": {},
  "dependencies": {}
}
```

As you can tell, this file tells us a lot. We can see where it's entering at, the author, and
libraries it depends on. While there's default scripts that are configured in here, right now
Cauldron only uses one: `start`. The `start` script will run on bootstrapping of the
environment and will only run against the whole directory. If we modify our scripts to look
like

```language/json
{
  ...
  "scripts": {
    "start": "echo Starting"
  }
}
```

we'll see the result after Cauldron has started the initialization. This is useful for any
automation of compiling without having to manually run the command after each change. An
example of this being useful is with the popular compiler Babel.

## `package.json` custom fields

If you'd like to create custom attributes in a configuration file, you can fetch them with
`process.config.variables`. This is useful as Cauldron has limited access to the environment
due to Java security features.

### `argv`

Not only that, it can be a drop-in replacement for arguments that you would run with the
script. For example,

```language/json
// package.json
{
  ...
  "argv": ["hello", "world"]
}
```

will fill `process.argv` with `['hello', 'world']`. Eventually there will be a way to inject
arguments directly into the VM on creation so we can bypass this, but this is our temporary
solution.

### `pluginDependencies`

We can declare what plugins have to be loaded prior to running the entry point with the
`pluginDependencies` field. This matches by name and `semver` patterns so we can restrict what
versions we look for.

_This functionality is currently in active development._

### `debugMessages`

Since Cauldron has a hard time running in the debugger, instead we have to result to allowing
logging functionality in production-like environments. If this field is set to true,
`console.log` will output to the logger.

_This functionality is currently in active development._

## Environment Variables

### `CAULDRON_CWD`

There aren't many variables but this one is what made development loads easier. It allows you
to define where the working directory is for Cauldron. This is useful for many reasons, but
the main one being the following scenario:

Imagine you're running 2 servers. One for Spigot and one for Sponge. As was intended, the
codebase is 100% sharable across both servers. Obviously there's platform specific
functionality, but anything you've written would have to follow those checks. The biggest size
contributer to Cauldron (and NodeJS for that matter) is the `node_modules` directory. It can
get pretty freakin' large and wasting disk space to duplicate it isn't very smart. So why not
have them both read from the same working directory?

By setting the `CAULDRON_CWD` variable, you can allow multiple servers to run off of the same
codebase. This means updates are live across all of them and no need to sync with git or
rsync. :clapping-hands:

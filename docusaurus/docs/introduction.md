---
id: introduction
title: Introduction
sidebar_label: Introduction
---

Welcome to the docs for CauldronJS. If you're already aware of what Cauldron does, then you
can skip on over to the Getting Started section. If not, lets get you up to speed on why
Cauldron is so cool.

## What is CauldronJS?

At the core, Cauldron is an attempt at making a NodeJS clone in the JVM. Whether it's used for
an existing enterprise application or just your starting codebase, the end result is the same.
Cauldron is built on the [GraalVM](https://www.graalvm.org/) made by Oracle&reg; to replace
the JVM in certain environments where you can pick your languages but run on the popular JVM
memory and threading model. By using their public JavaScript engine, we can run JS in the JVM
with minimal code.

## What was it built for?

I've done many a rewrite of JavaScript engines for Java. The sole purpose has always been to
allow me to write in JS for one of my favorite projects: Bukkit. Throughout all the years
though, writing things in older JS just was never fun. Rhino and Nashorn never gave me the
power that I wanted over my code, like constants, up to date features, and proper security.
Since it was decided all JS engines would be stripped from the JVM, another option had to be
explored. I wanted something that I could embed in any JAR plugin that would be allowed to run
but also not restrict compatibility with other plugins. Enter GraalVM. For now, it runs
fluidly on Spigot with minimal support for Sponge. Additional platforms in the future include
ForgeModLoader and Bungee. In the end, Cauldron's goal is to allow plugin and mod developers
to write code that can run on any platform with no version discrepencies.

## Why should I use it?

There are a few JS engines for Bukkit, the most notable being
[ScriptCraft](http://scriptcraft.net/). While it does its job well, it doesn't do everything I
believe it could. It's stuck on ES5, an outdated language version. Some things it doesn't
allow are:

- constants
- scoped variables
- lambdas
- latest `prototype` compliance
- up to date security features
- typed arrays (`Uint8Array`, `Uint16Array`, etc.)
- `BigInt`
- string interpolation/template strings
- event loop and async functions
- classes
- static and public/private accessors
- NodeJS compatibility

If you're not a dedicated JS developer, these aren't that necessary. There were ways to do it
in the past, but you wouldn't be caught dead doing any of these in a production environment.
_This_ is what Cauldron was made for. It allows the developer to not have to change their
mindset to reflect patterns of a time long gone.

## NodeJS and Cauldron

Things written in Cauldron will not run in NodeJS. It is not meant to be backwards compatible, just simply a drop-in replacement for NodeJS. While the support isn't 100%, it _is_ actively getting there. Current support includes:

- Buffers
- HTML parsing
- CommonJS modules
- Streams
- custom module resolvers
- NPM/Yarn support
- a basic implementation of `child_processes`
- async functionality
- filesystem and path libraries
- `EventEmitter`
- `Semver`

With upcoming features like:

- `net` library!
- HTTP/S protocol and toolchain
- worker threads
- zlib
- everything else built into NodeJS :)

During the development phase of Cauldron, the `lib` directory within the scripts project will be what's actively worked on for the core library. This is to prevent constant rebuilding and debugging of the JAR itself as the JS portion is much easier to test. And while not there yet, the final goal is to have the ability to take _any_ Node package and be able to use it within CauldronJS. This means if you want a web server running side-by-side with your Cauldron-backed server to display real-time analytics and stats, it's simple and doesn't require multiple servers or web hosts. Or if you want to just make a simple command in game, that's fine too.

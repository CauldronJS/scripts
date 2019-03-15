# Cauldron Scripts
> A starter script collection for the Cauldron plugin

## Warning!

None of these scripts will work with Rhino/Nashorn simply due to the fact that this project is somewhat ES6 compliant (of which neither of those two engines are). These are all developed on the GraalVM. Currently these are also not usable on Windows _until_ Oracle comes out with a version of the Windows GraalVM that is ES6 compatible. If you'd like to get around that, check out [this documentation](/docs/running-on-windows.md).

## Getting Started

As mentioned above, you need [GraalVM](https://www.graalvm.org/) in order to run Cauldron. Installing it does seem daunting at first, but I can break it down relatively easy. Keep in mind as well this will all have to be done in a Unix/Debian environment.

1. [Download the latest version of GraalVM](https://github.com/oracle/graal/releases)
2. Extract to a directory _that you remember_. We're going to be running GraalVM instead of Java for Bukkit/Spigot/Paper/etc. As far as I've tested, Graal works fine as a replacement. Their statement is that GraalVM is a drop-in-replacement. If there are things that break, then it's most likely a compatibilty issue with Java 8 since that's what Graal implements.
3. You can either edit your PATH to `graalinstalldir/bin` and remove Java's, OR run `alias java='/graalinstalldir/bin/java` and `alias javac='/graalinstalldir/bin/javac'. If you're just testing to see compatibility, I'd recommend the latter as a simple restart of bash will remove the alias. 
4. Boot up the server without Cauldron to verify everything still works. If not, you can leave an issue explaining what happened and I'll respond as quickly as possible.

Great. Now we're at the actual Cauldron steps. 

1. Ensure Cauldron is installed on your server. It won't run off the bat successfully due to something wrong with how Graal unpacks resources on the fly, so hold off.
2. Clone this repo into `plugins/Cauldron`. If you don't know what that is, you can simply download this repo as a zip and drag-and-drop into `plugins/Cauldron`.
3. Start the server and everything should be good. If not, again, open an issue and I'll see what's up.

## So What Actually Is Cauldron?

If you're here without looking at the plugin repo, I'll give a brief explanation. Cauldron allows you to run JavaScript in a Java environment, but specifically Bukkit/Spigot.

> But what about ScriptCraft???

ScriptCraft doesn't do nearly everything I want it to, is lack luster as far as finished products go, and is essentially what it set out to do: allow peopple to write plugins in Spigot. This is no fault of its own, but it's also not enough for someone who is a seasoned JavaScript developer. 

## What Does Cauldron Have That ScriptCraft Doesn't?

### NodeJS Compliance

This is a tricky topic because it's also not 100% true, but it _is_ the endgoal. A good portion is done, but there's still plenty ahead. One of the issues to getting NodeJS to run in a Java environment, especially Spigot, is server timings. NodeJS at heart runs in V8, a C++ JS engine. GraalVM is capable of running LLVM code, but NodeJS still requires certain access to the running process. It's totally possible to run the JVM from NodeJS, but inner process communication becomes very difficult. Solutions like gRPC could make this possible, but now we're running 2 different processes at once, where resources aren't guaranteed to be ubundant. To solve this, I've left V8 out of the equation and instead am using GraalVM's JS engine and [porting the core NodeJS libraries over to JS](https://github.com/Conji/cauldron-scripts/tree/master/lib). So when I say **NodeJS Compliance**, I simply mean that "a package that works in NodeJS _should_ work in Cauldron". 

### Up To Date ECMAScript Compliance

This one isn't entirely up to me, but Oracle has done pretty well at making sure Graal is ES6 compliant. For the features that aren't implemented, technology like Babel exists to transpile what Graal can't read. 


### Access To Package Management

As stated above, the aim is to be NodeJS compliant. What this grants us is access to the Node Package Manager, or NPM. This means for a JS plugin, all you need to do is get the package ID (something like `@cauldron/hello-world`) and run `npm install @cauldron/hello-world` (or if you like Yarn you can use that). With `cauldron reload`, it means you no longer have to worry about restarting your server if you want to update a config or install a new plugin.

### Keeping Up To Date

Cauldron the plugin itself should stay compliant for years to come. The only time it'd need an update is for security or core functionality patches, most of which are written in JS anyways. All it takes is a `git pull` to update Cauldron and reload. Simple.

### Keep Java Out Of JavaScript

One of the main mentalities of Cauldron: keep Java out of JavaScript. Of course there will be times when you need to import a package, but that shouldn't happen often. References to class path packages aren't restricted, but they're very frowned upon outside of `lib/`. Not only that, but writing in Java and writing in JavaScript are 2 different patterns. While Java is OOP at the core, JS can be defined lately as Procedural Programming. Obviously it's up to the developer as to how they code and JS is an ever-changing beast, but the case still stands that writing scalable code in both languages is vastly different.

### Truly For Spigot

"What...?" Commands are true commands. No need to prepend every command with `/js` to get it to run. Example: 

```
import { createCommand } from 'cauldron';

createCommand('test', { description: 'My test command!', execute({ args }) {
  return `You test ${args.join(', ')}`;
}});
```

Running this command is quite literally `/test`, in game and console. No `/js` required. It shows up on the help menu, tab-complete menu, built-in permission, everything. All the cool bells and whistles. Nobody would be able to differentiate it between a JS command and a plain-old-Bukkit command. And if you do want to run script on the fly, just use something like `/js sender.sendMessage('Hello!')`. "But what if I just want to call a function through JS without cluttering up the globals object?" Simple!

```
import { alias } from 'cauldron';

alias(const helloWorld = name => `hello ${name}`, 'helloWorld');
// the name arg is optional if you don't make an anonymous function name
```

Now you can run `/js helloWorld('SuperCoolDev')`!
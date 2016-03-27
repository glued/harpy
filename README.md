[Surge]:[https://surge.sh]
[Harp]:[https://harpjs.com/]
[Atom]:[https://atom.io/]

# Harpy
An [Atom] package which creates and manages [Harp] servers.

WARNING: Currently in development, only tested on OSX, pretty sure it won't work on Windows

Currently requires [Harp] to be installed globally

`npm install harp -g`

Launch [Harp] from Atom's command palette `cmd + shift + p`

### Commands

**Harpy: Start Server**
  - Will launch a [Harp] server in the current open project
  - Automatically assign an open port starting at 9000
  - Will work for as many projects as you have open, just select the project and run the command
  - All servers will automatically close when you exit atom
  - Errors will show up as notifications
  - Launches default browser to server url

**Harpy: Stop Server**
  - Stops the current [Harp] server running in atom for a specific project

**Harpy: Stop all**
  - stop all active harp servers

**Harpy: Open Browser**
 - Launches the default browser to the selected project's server url

**Harpy: Open Terminal**
 - Launches the (OSX) terminal to the selected project

### Todo
* Windows support
* [Harp] init with settings config
* Atom settings for package
* Prompt for CNAME file
* [Surge] support

### Dev Notes
```
git clone https://github.com/glued/harpy
cd harpy
apm install
apm link .
```

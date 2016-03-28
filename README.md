[Surge]:https://surge.sh
[Harp]:http://harpjs.com/
[Atom]:https://atom.io/


# Harpy
An [Atom] package which creates and manages [Harp] servers.

[![APM Version](https://img.shields.io/apm/v/harpy.svg)](https://atom.io/packages/harpy)
<!-- [![APM Downloads](https://img.shields.io/apm/dm/harpy.svg)](https://atom.io/packages/harpy) -->

Currently requires [Harp] to be installed globally

`npm install harp -g`

Launch [Harp] from Atom's command palette `cmd + shift + p`

![Harpy Commands](https://github.com/glued/harpy/raw/master/img/01.jpg)

![Harpy Server](https://github.com/glued/harpy/raw/master/img/02.jpg)

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
 - Launches the terminal (OSX) or command prompt (Windows) to the selected project

**Harpy: Compile**
- Compile project to www in root directory unless otherwise specified in settings

### Todo
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

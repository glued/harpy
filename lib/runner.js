'use babel'

import { CompositeDisposable, BufferedProcess } from 'atom'
import getPath from 'consistent-path'
import portfinder from 'portfinder'
// import Path from 'path'
import note from './notes'
const running = new Map()

function isWindows(){
  const os = process.platform
  return  os === 'win32' || os === 'win64'
}

function getCWD(){
  const editor      = atom.workspace.getActiveTextEditor()
  const activePath  = editor.getPath()
  const relative    = atom.project.relativizePath(activePath)
  return relative[0]
}

function getENV(){
  const assign = Object.assign
  const env = assign({}, process.env, { PATH: getPath() })
  return env
}

class Runner extends BufferedProcess{
  constructor(command, args, env, cwd, port = 0){
    super({
      command, args,
      options:{ env, cwd },
      exit: code => this.exit(code),
      stdout: out => this.stdout(out),
      stderr: out => this.stderr(out)
    })

    this.key = cwd
    this.port = port
  }

  exit(code){
    console.log(code, this.key)
    running.delete(this.key)
    if(this.port !== 0){
      if(this.port === 2){
         note.success(`Harp Compiled`, this.key)
         new Runner(isWindows() ? 'explorer' : 'open', [this.key], getENV(), this.key)
         return
      }
      note.error(`Harp Error ${this.port}`, 'Server stopped')
    }
  }

  stop(){
    this.kill()
    note.info(`Harp server stopped`)
    running.delete(this.key)
  }

  stdout(out){
    console.log(out)
  }

  stderr(out){
    console.log(out)
    note.error(`Harp Error ${this.port}`, out)
  }

}

function openDefaultBrowser(port){
    const command = isWindows() ? 'explorer' : 'open'
    setTimeout(()=> new Runner(command,[`http:\/\/localhost:${port}/`], getENV(), null), 1000)
}

export default{
  // harpInit:()=>{
  //
  //     let values = atom.config.get('harpy.harpInit').split(' ')
  //     const cwd = getCWD()
  //     running.set(cwd, new Runner('harp', ['init', './'], getENV(), cwd))
  //     note.success(`Harp Init`, values)
  // },

  stopServer: () =>  {
    const cwd = getCWD()
    if(!running.has(cwd))
      return note.warn(`Harp server is not running`)

    running.get(cwd).stop()

  },

  harpCompile: () =>{
    const cwd = getCWD()
    new Runner('harp', ['compile', '--output', atom.config.get('harpy.compileFolder')], getENV(), cwd, 2)
  },

  openBrowser:() =>{
    const cwd = getCWD()
    if(!running.has(cwd))
      return note.warn(`Harp server is not running`)

    const port = running.get(cwd)
    openDefaultBrowser(port)
  },

  startServer:() => {
    const cwd = getCWD()

    if(running.has(cwd))
      return note.warn(`Harp server already running`, `running on port ${running.get(cwd).port}`)

    portfinder.basePort = 9000
    portfinder.getPort((err, port) => {
      running.set(cwd, new Runner('harp', ['server', '--port', port], getENV(), cwd, port))
      note.success(`Harp server started`, `running on port ${running.get(cwd).port}`)
      openDefaultBrowser(port)
    })
  },

  surge:() => {
    const cwd = getCWD()
    running.set(cwd, new Runner('surge', ['--build', '-p', './'], getENV(), cwd, 3))
  },

  openTerminal:() =>{
    const cwd = getCWD()
    if(isWindows())
      new Runner('start', ['cmd'], getENV(), cwd)
    else
      new Runner('open',['-a', 'Terminal', cwd], getENV(), cwd)
  },

  killAll:() => {
    for(let value of running.values())
      value.stop()
  }
}

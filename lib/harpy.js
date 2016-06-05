'use babel'

import { CompositeDisposable } from 'atom'
import runner from './runner'

export default {
  modalPanel: null,
  subscriptions: null,
  config: {
     compileFolder: {
       title: 'Compile',
       description: 'Folder destination for harp compile',
       type: 'string',
       default: 'www'
     }
  },
  activate(state) {
    this.subscriptions = new CompositeDisposable()
    runner.listActiveServers(false)
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'harpy:open terminal': () => runner.openTerminal(),
      'harpy:compile': () => runner.harpCompile(),
      'harpy:list': () => runner.listActiveServers(),
      'harpy:start server': () => runner.startServer(),
      'harpy:start multihost': () => runner.startMultihost(),
      'harpy:stop server': () => runner.stopServer(),
      'harpy:stop all': () => runner.killAll(true),
      // 'harpy:surge': () => runner.surge(),
      'harpy:open browser': ()=> runner.openBrowser()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
    runner.killAll()
  },

  serialize() {
    return {}
  },
}

'use babel'

import { CompositeDisposable } from 'atom'
import runner from './runner'

export default {
  modalPanel: null,
  subscriptions: null,
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'harpy:open terminal': () => runner.openTerminal(),
      'harpy:start server': () => runner.startServer(),
      'harpy:stop server': () => runner.stopServer(),
      'harpy:stop all': () => runner.killAll(),
      // 'harpy:surge': () => runner.surge(),
      'harpy:open browser': ()=> runner.openBrowser()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
    runner.killAll()
  },

  serialize() {
    return {}
  },
}

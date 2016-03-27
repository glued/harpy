'use babel'

export default{
  warn: (txt, detail, dismissable = false) => atom.notifications.addWarning(txt, { detail, dismissable }),
  success: (txt, detail, dismissable = false) => atom.notifications.addSuccess(txt, { detail, dismissable }),
  error: (txt, detail, dismissable = true) => atom.notifications.addError(txt, { detail, dismissable }),
  info: (txt, detail, dismissable = false) => atom.notifications.addInfo(txt, { detail, dismissable })
}

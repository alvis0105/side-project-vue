import Icons from './icons'
import I18n from './i18n'
import Asset from './asset'

export default {
  install(app) {
    app.use(Icons)
    app.use(I18n)
    app.use(Asset)
  },
}

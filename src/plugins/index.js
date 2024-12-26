import Icons from './icons'
import I18n from './i18n'

export default {
  install(app) {
    app.use(Icons)
    app.use(I18n)
  },
}

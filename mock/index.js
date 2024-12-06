import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import api from './api'

export default defineFakeRoute(api)

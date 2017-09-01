
import ReactGA from 'react-ga'

import appConfig from '../app.config'

ReactGA.initialize(appConfig.analytics)

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

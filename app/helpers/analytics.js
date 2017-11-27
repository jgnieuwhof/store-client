
import ReactGA from 'react-ga'

import { analytics } from '../app.config'

ReactGA.initialize(analytics)

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

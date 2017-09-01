
import ReactGA from 'react-ga'

ReactGA.initialize(`UA-000000-01`)

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

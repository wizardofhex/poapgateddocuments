import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Mint from './Decrypt'
import Encrypt from './Encrypt'

const URL_MAP = {
  home: {
    path: '/',
    component: props => <Mint {...props} />
  },

  encrypt: {
    path: '/encrypt',
    component: props => <Encrypt {...props} />
  }
}

export default function AppRouter () {
  const [networkLoading, setNetworkLoading] = useState(true)

  useEffect(() => {
    // listen for LIT network ready event
    document.addEventListener('lit-ready', function (e) {
      console.log('LIT network is ready')
      setNetworkLoading(false)
    }, false)
  }, [])
  return (
    <Router>
      <Switch>
        {Object.values(URL_MAP).map(u =>
          <Route
            key={u.path}
            exact
            path={u.path}
            render={routeProps => u.component({ ...routeProps, networkLoading })}
          />
        )}
      </Switch>
    </Router>
  )
}

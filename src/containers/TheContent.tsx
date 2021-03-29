/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { LogoVerticalWhite } from 'assets/icons/logos'
// routes config
import routes from 'routes'

const loading = (
  <div style={{ height: '100%' }} className='d-flex justify-content-center align-items-center'>
    <LogoVerticalWhite />
  </div>
)

const TheContent = () => {
  return (
    <main>
      <CContainer className={'mt-5'} fluid={false} style={{ height: '100%' }}>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  children={() => (
                    <CFade>
                      <route.component />
                    </CFade>
                  )}/>
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)

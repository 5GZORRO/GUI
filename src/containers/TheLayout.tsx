import React, { Suspense } from 'react'
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'
import { useAuthContext } from 'context/AuthContext'
import { CContainer, CFade } from '@coreui/react'
import { Route } from 'react-router-dom'

import { LogoVerticalWhite } from 'assets/icons/logos'

const WaitingApproval = React.lazy(() => import('../views/WaitingApproval'))

const loading = (
  <div style={{ height: '100%' }} className="d-flex justify-content-center align-items-center">
    <LogoVerticalWhite />
  </div>
)

const TheLayout: React.FC = () => {
  const { user } = useAuthContext()

  if (user?.state !== 'Stakeholder Registered') {
    return (
      <main>
        <CContainer fluid={false} style={{ height: '100%', maxWidth: '100%', padding: 0 }}>
          <Suspense fallback={loading}>
            <Route
              path="/"
              /* eslint-disable */
              children={() => (
                <CFade>
                  <WaitingApproval />
                </CFade>
              )}
              /* eslint-enable */
            />
          </Suspense>
        </CContainer>
      </main>
    )
  }

  return (
    <div className={'c-app c-default-layout'}>
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout

import React, { Suspense, useEffect, useState } from 'react'
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'
import { useAuthContext } from 'context/AuthContext'
import { CCardText, CContainer, CFade, CTextarea, CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react'
import { Route } from 'react-router-dom'

import { LogoVerticalWhite } from 'assets/icons/logos'

const WaitingApproval = React.lazy(() => import('../views/WaitingApproval'))
const DeclinedApproval = React.lazy(() => import('../views/DeclinedApproval'))

const loading = (
  <div style={{ height: '100%' }} className="d-flex justify-content-center align-items-center">
    <LogoVerticalWhite />
  </div>
)

const TheLayout: React.FC = () => {
  const { user } = useAuthContext()
  // const [toast, setToast] = useState(false)

  // useEffect(() => {
  //   if (toast) {
  //     setTimeout(() => setToast(false), 5000)
  //   }
  //   if (!toast) {
  //     setTimeout(() => setToast(true), 5000)
  //   }
  // }, [toast])

  if (user?.state === 'Stakeholder Declined') {
    return (
      <main>
        <CContainer fluid={false} style={{ height: '100%', maxWidth: '100%', padding: 0 }}>
          <Suspense fallback={loading}>
            <Route
              path="/"
              /* eslint-disable */
              children={() => (
                <CFade>
                  <DeclinedApproval />
                </CFade>
              )}
              /* eslint-enable */
            />
          </Suspense>
        </CContainer>
      </main>
    )
  }

  if (user?.state === 'Stakeholder Registration Requested') {
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
    <>
      {/* <CToaster position="top-right">
        <CToast show={toast} style={{ background: '#4c4f54' }}>
          <CToastHeader
            closeButton
            style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <strong className="me-auto" style={{ color: '#2A2B36' }}>
              ERROR:
            </strong>
            <strong style={{ color: '#2A2B36' }}>
              eLicensing violation detected due to expiration of NS licensing
            </strong>
          </CToastHeader>

          <CToastBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <strong>Product Offering Price:</strong>
              </div>
              <div>f0923384-fee6-487c-ad74-6ee5c6c1c5b1</div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <strong>Product DID:</strong>
            </div>
            <div>HadzQmxdjDz17e3MZyD67t</div>
          </CToastBody>
        </CToast>
      </CToaster> */}
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
    </>
  )
}

export default TheLayout

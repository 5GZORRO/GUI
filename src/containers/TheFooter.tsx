import React from 'react'
import { CFooter } from '@coreui/react'
import { Logo5G, LogoEurope } from 'assets/icons/logos'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className='d-flex justify-content-center align-items-center'>
        <span>
          ©2021, All Rights <span className={'text-gradient'}>5GZorro</span>
        </span>
      </div>
      <div className='ml-auto d-flex justify-content-center align-items-center'>
        <LogoEurope className='pr-3' />
        <Logo5G className='pr-3' />
        <div className='d-flex justify-content-center align-items-center'>
          <div>
            <p className='mb-0'><small><strong>5GZORRO</strong> project has received funding from the <strong>European Union’s Horizon</strong></small></p>
            <p className='mb-0'><small><strong>2020</strong> research and innovation programme under grant agreement <strong>No 871533</strong></small></p>
          </div>
        </div>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)

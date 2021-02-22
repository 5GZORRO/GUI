import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheAside,
  TheFooter,
  TheHeader
} from './index'

const TheLayout: React.FC = () => (
  <div className={'c-app c-default-layout c-dark-theme'}>
    <TheSidebar/>
    <TheAside/>
    <div className="c-wrapper">
      <TheHeader/>
      <div className="c-body">
        <TheContent/>
      </div>
      <TheFooter/>
    </div>
  </div>
)

export default TheLayout

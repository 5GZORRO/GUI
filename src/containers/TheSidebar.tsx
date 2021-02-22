import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'

import { LogoHorizontalWhite } from 'assets/icons/logos'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useTypedSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val: boolean) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/login">
        <LogoHorizontalWhite width={'144px'} height={'32px'} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
          />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)

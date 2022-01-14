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
import navigationAdmin from './_navAdmin'

import { LogoHorizontalWhite } from 'assets/icons/logos'
import { useAuthContext } from 'context/AuthContext'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useTypedSelector((state) => state.sidebarShow)
  const { user } = useAuthContext()

  return (
    <CSidebar show={show} unfoldable onShowChange={(val: boolean) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/login">
        <LogoHorizontalWhite width={'144px'} height={'32px'} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={
            user?.stakeholderClaim?.stakeholderRoles[0]?.role === 'Administrator' ||
            user?.stakeholderClaim?.stakeholderRoles[0]?.role === 'Regulator'
              ? navigationAdmin
              : navigation
          }
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

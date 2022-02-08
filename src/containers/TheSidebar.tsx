import React, { useEffect, useState } from 'react'
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
import navigationRegulator from './_navRegulator'

import { LogoHorizontalWhite } from 'assets/icons/logos'
import { useAuthContext } from 'context/AuthContext'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useTypedSelector((state) => state.sidebarShow)
  const { user } = useAuthContext()
  const [nav, setNav] = useState<any>([])

  useEffect(() => {
    if (user) {
      switch (user?.stakeholderClaim?.stakeholderRoles[0]?.role) {
        case 'Administrator':
          setNav(navigationAdmin)
          break
        case 'Regulator':
          setNav(navigationRegulator)
          break
        default:
          setNav(navigation)
          break
      }
    } else {
      setNav([])
    }
  }, [user])

  return (
    <CSidebar show={show} unfoldable onShowChange={(val: boolean) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/login">
        <LogoHorizontalWhite width={'144px'} height={'32px'} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={nav}
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

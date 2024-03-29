import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CToggler,
  CBreadcrumbRouter
} from '@coreui/react'
import { TheHeaderDropdownNotif, TheHeaderDropdown, TheHeaderDropdownMssg } from './index'
import { useAuthContext } from 'context/AuthContext'
import { LogoHorizontalWhite } from 'assets/icons/logos'

// routes config
import routes from 'routes'

const TheHeader: React.FC = () => {
  const { user } = useAuthContext()

  const dispatch = useDispatch()
  const sidebarShow = useTypedSelector((state) => state.sidebarShow)

  const simpleSidebar = user?.state !== 'Stakeholder Registered'

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader color={'#fff'}>
      {!simpleSidebar && (
        <>
          <CToggler color={'#fff'} inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
          <CToggler inHeader color={'#fff'} className="ml-3 d-md-down-none" onClick={toggleSidebar} />
        </>
      )}
      {simpleSidebar && (
        <CHeaderNav className="ml-3 mr-auto">
          <LogoHorizontalWhite width={'144px'} height={'32px'} />
        </CHeaderNav>
      )}
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name='logo' height='48' alt='Logo'/> */} lOGO
      </CHeaderBrand>

      {!simpleSidebar && (
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
      )}
      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownNotif />
        <TheHeaderDropdownMssg /> */}
        <TheHeaderDropdown />
      </CHeaderNav>
      {!simpleSidebar && (
        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
        </CSubheader>
      )}
    </CHeader>
  )
}

export default TheHeader

import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useAuth } from 'hooks/useAuth'

const TheHeaderDropdown = () => {
  const { user } = useAuth()
  return (
    <CDropdown
      inNav
      className='c-header-nav-items mx-2'
    >
      <CDropdownToggle className='c-header-nav-link' caret={true}>
        <div className={'px-2'}>
          <p className={'mb-0 text-gray-300'}>{user.name}</p>
          <p className={'mb-0 text-gray-100 font-12'}>{user.role}</p>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem>
          <CIcon name='cil-user' className='mfe-2' />Sign Out
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-settings' className='mfe-2' />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-credit-card' className='mfe-2' />
          Payments
          <CBadge color='secondary' className='mfs-auto'>42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-file' className='mfe-2' />
          Projects
          <CBadge color='primary' className='mfs-auto'>42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name='cil-lock-locked' className='mfe-2' />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

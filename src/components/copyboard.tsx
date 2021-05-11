import CIcon from '@coreui/icons-react'
import React from 'react'

interface PropsCopyBoard {
    value: any
  }

const styles = {
  container: {
    background: '#181924',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    border: '1px solid #2A2B36',
    borderRadius: '4px'
  },
  icon: {
    height: '30px',
    width: '30px',
    background: '#4F5D73',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  typography: {
    fontFamily: 'Inter',
    color: '#FFFFFFDE',
    letterSpacing: '0.3em'
  }
}

export const CopyBoard:React.FC<PropsCopyBoard> = ({ value }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div style={styles.container}>
        <p className={'m-0 font-14'} style={styles.typography}>{value}</p>
        <div style={styles.icon} onClick={copyToClipboard}>
            <CIcon name='cilCopy' />
        </div>
    </div>
  )
}

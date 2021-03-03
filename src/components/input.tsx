import React, { useState } from 'react'
import { CCol, CInputFile, CRow, CLabel } from '@coreui/react'
import { PDFIcon } from 'assets/icons/externalIcons'

const Input:React.FC = () => {
  const [fileName, setFileName] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileUpload = (e: any) => {
    const files = e.target.files
    setFileName(files[0].name)
  }

  return (
    <>
    <CLabel htmlFor='file-input'>Certified upload</CLabel>
      <CRow className={'m-0 p-2 d-flex align-items-center'} style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '4px' }}>
        <CCol sm={7} lg={8} className={'d-flex align-items-center'}>
        <div style={{ backgroundColor: '#181924', display: 'flex', alignItems: 'center', borderRadius: '4px', width: '36px', height: '36px' }} className={'p-2'}>
          <PDFIcon width={18} height={18} />
        </div>
        <div>
          <p style={{ margin: '0 12px', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fileName || 'Choose File'}</p>
          <p style={{ margin: '0 12px', color: '#8A93A2' }}>Type File: <strong>PDF</strong></p>
        </div>
        </CCol>
        <CCol sm={5} lg={4} className={'d-flex justify-content-end'}>
          <label className='custom-file-upload'>
            <CInputFile
              id='file-input'
              name='file-input'
              accept='.pdf'
              custom
              style={{
                border: '1px solid #ccc',
                display: 'inline-block',
                padding: '6px 12px',
                cursor: 'pointer',
                width: '0px'
              }}
              onChange={e => fileUpload(e)}
            />
            <span style={{ color: '#9DA5B1', textDecorationLine: 'underline', cursor: 'pointer' }}>
              <strong>Choose File</strong>
            </span>
          </label>
        </CCol>
      </CRow>
    </>
  )
}

export default Input

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'
// import { Spline } from 'react-spline'
import 'react-spline/dist/react-spline.modern.css'
// import { SCENE } from 'assets/scene'
/** Context */
import { ModalContext } from 'context/ModalContext'

const Dashboard:React.FC = () => {
  const modalContext = useContext(ModalContext)
  useEffect(() => {
    modalContext?.handleModal()
    console.log('open modal')
  }, [])
  return (
    <>
    <h1>Dashboard</h1>
    {/* <Spline scene={SCENE} /> */}
    </>
  )
}

export default Dashboard

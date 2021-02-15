import React, { useEffect } from 'react'
import axios from 'axios'

const Dashboard:React.FC = () => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/governanceActions`).then(res => console.log(res))
  }, [])

  return (
    <>
      Hello world!
    </>
  )
}

export default Dashboard

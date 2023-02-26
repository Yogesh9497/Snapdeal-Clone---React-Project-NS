import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navigate({location}) {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(location);
    },[navigate])
  return <></>
}

export default Navigate
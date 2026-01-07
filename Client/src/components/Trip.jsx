import React from 'react'
import { useParams } from 'react-router-dom'

function Trip() {
  const {planId} = useParams();

  return (
    <div className="mt-10 text-black">Trip {planId}</div>
  )
}

export default Trip
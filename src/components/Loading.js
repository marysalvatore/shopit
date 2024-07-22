"use client"
import React from 'react';
import { CirclesWithBar, TailSpin } from 'react-loader-spinner'
import { useEffect } from 'react';

const Loading = () => {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://www.shopify.com'
    }, 15000)
  }, [])

  return (
    <div className="loading w-full h-full flex justify-center bg-transparent" style={{zIndex: 1000}}>

        <TailSpin
        visible={true}
        height="80"
        width="80"
        color="gray"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}

export default Loading

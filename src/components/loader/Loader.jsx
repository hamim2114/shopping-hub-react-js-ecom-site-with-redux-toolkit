import React from 'react'

const Loader = () => {
  return (
    <div className="container py-5">
      <div className="flex flex-center loader">
        <img style={{width: '60px'}} src="spinner.svg" alt="loading" />
      </div>
    </div>
  )
}

export default Loader
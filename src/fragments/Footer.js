import React from 'react'

function Footer () {
  return (
    <div className='bg-black flex justify-center md:p-4 font-semibold text-white md:w-screen md:h-40'>
        <div className='flex flex-wrap w-1/4 space-x-3 justify-evenly items-start'>
            <p>Help</p>
            <p>Site Index</p>
            <p>Loopweb</p>
            <p>Privacy Policy</p>
            <p>Condition of User</p>
            <p>Adverstising</p>
            <p>Press Room</p>
            <p>Get the lastest Updates</p>
            <p className='text-sm font-thin'>© 2023 by Loopweb.com, Inc.</p>
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import '../UserLayout/UserLayout.css'

function UserLayout() {
    return (
        <>
            {/* <div className='UserLayout'> */}
            <Header />
            <Outlet />
            {/* </div> */}
        </>
    )
}

export default UserLayout

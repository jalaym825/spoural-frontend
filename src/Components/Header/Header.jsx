import React, { useState } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Global from '../../Utils/Global';
import Accountdetails from '../AccountDetails/Accountdetails';
import '../Header/Header.css';


const Header = () => {

    const menu = ["Home", "Teams", "Matches", "AboutUs", "Contact", "ApplyNow"];
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className='header1 h-[8vh] bg-primary-color flex items-center justify-between w-full'>
            <div className='flex gap-2 font-MateSC ml-3'>
                <h1 className='logo-text  text-white text-2xl first-letter:text-blue-500 first-letter:text-3xl '><Link to={"/"}>Field</Link></h1>
                <h1 className='logo-text  text-white  text-2xl first-letter:text-blue-500 first-letter:text-3xl'><Link to={"/"}>And</Link></h1>
                <h1 className='logo-text  text-white  text-2xl first-letter:text-blue-500 first-letter:text-3xl '><Link to={"/"}>Play</Link></h1>
            </div>
            <nav className='hidden md:flex '>
                <ul className='text-white flex font-Outfit gap-6'>
                    {menu.map((item) => (
                        <Link key={item} to={`/${item.toLowerCase()}`} className='text-lg hover:text-slate-500'>{item}</Link>
                    ))}
                </ul>
            </nav>
            {
                Global.user && Global.token ?
                    <div className='hidden md:flex  mr-4'>
                        <Accountdetails />
                    </div> :
                    <Link to='/login'>
                        <button className='text-white hidden font-poppins md:flex justify-center bg-blue-500 p-2 rounded-lg w-24 font-semibold  hover:text-blue-500 hover:bg-slate-200 mr-4'>
                            Login
                        </button>
                    </Link>
            }

            {/* rsponsive   */}
            <div className='md:hidden  mr-4'>
                <button onClick={toggleDrawer} className='text-white cursor-pointer'>
                    <RiMenu3Fill size={30} />
                </button>
            </div>
            {drawerOpen && (
                <div className='md:hidden  absolute top-[8vh] inset-x-0 bg-primary-color text-white p-4 '  >
                    <ul className='flex flex-col gap-5 font-Outfit'>
                        {menu.map((item) => (
                            <Link key={item} to={item.toLowerCase()} onClick={toggleDrawer} className='text-lg flex justify-center hover:text-slate-500'>{item}</Link>
                        ))}
                        {/* Responsive Accountdetails */}
                        {
                            Global.user && Global.token ?
                                <div className='flex justify-center'>
                                    <Accountdetails />
                               </div>
                                :
                                <Link to='/login' className='flex justify-center'>
                                    <div className='flex justify-center'>
                                        <button className='text-white bg-blue-500 p-2 rounded-lg w-24 font-semibold font-poppins  hover:text-blue-500 hover:bg-slate-200'
                                            onClick={toggleDrawer}>
                                            Login
                                        </button>
                                    </div>
                                </Link>
                        }

                        {/* <div className='flex justify-center'>
                            <Accountdetails />
                        </div> */}

                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header


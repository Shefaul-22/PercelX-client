import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const links = <>

        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/send-parcel">Send A Parcel</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>

        {
            user && <>
                <li><NavLink to="/dashboard/my-parcels">My Parcels</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
        <li><NavLink to="">About Us</NavLink></li>



    </>

    const handleLogOut = () => {
        console.log('LogOut successfull');
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error);
            })

    }
    return (
        <div className="navbar bg-base-100 shadow-sm mb-4 w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">

                        {links}

                    </ul>
                </div>

                <span>
                    <div className="btn btn-ghost text-xl">
                        <Logo></Logo>
                    </div>
                </span>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleLogOut} className="btn">LogOut</a> :
                        <Link to="/login" className="btn">Login</Link>
                }

                <Link to="/rider" className="btn btn-primary text-black ml-3">Be a Rider</Link>
            </div>
        </div>
    );
};

export default Navbar;
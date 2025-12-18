import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto p-5 md:p-7 lg:p-3 '>
            <Logo></Logo>

            <div className='flex items-center gap-6 md:gap-16 my-20 md:my-10'>

                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>

                <div className='flex-1'>
                    <img src={authImg} alt="" />
                </div>

            </div>

        </div>
    );
};

export default AuthLayout;
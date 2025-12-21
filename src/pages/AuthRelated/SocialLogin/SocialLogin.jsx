import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();

    const location = useLocation();
    // console.log('location in social', location);

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);


                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)

                    })

                navigate(location.state || '/');

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='w-full md:w-2/3'>

            <button onClick={handleGoogleLogin} className="btn w-full bg-[#E9ECF1] text-black border-[#e5e5e5]">
                <FcGoogle size={22}></FcGoogle>
                Login with Google
            </button>

        </div>
    );
};

export default SocialLogin;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }
    } = useForm();

    const handleRegister = (data) => {

        console.log("after register", data);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* email */}
                    <label className="label font-medium text-[14px]">Email</label>
                    <input type="email" className="input w-full md:w-2/3"
                        {...register('email', { required: true })}
                        placeholder="example@email.com" />

                    {errors.email?.type === "required" && (
                        <p className='text-red-500'>Email is required</p>
                    )}


                    {/* password */}
                    <label className="label font-medium text-[14px]">Password</label>
                    <div className="relative w-full md:w-2/3">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input w-full pr-10"
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                            })}
                        />

                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </span>
                    </div>


                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is Required</p>
                    }


                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be six characters or Longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must include uppercase, lowercase, number & special character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn bg-primary font-semibold mt-4 w-full md:w-2/3">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;
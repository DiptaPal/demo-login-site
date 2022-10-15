import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import profile from '../../images/profile.png'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center px-20'>
            {/* <div className='flex justify-center items-center'>
                <img src={logo} alt="" className='w-16 h-16'/>
                <p className='text-2xl font-bold'>Logo</p>
            </div>
            <div className='flex justify-between items-center gap-10'>
                <ul className='flex justify-center items-center text-2xl gap-10'>
                    <li>
                        <Link>Home</Link>
                    </li>
                    <li>
                        <Link>Products</Link>
                    </li>
                    <li>
                        <Link>Service</Link>
                    </li>
                    <li>
                        <Link>About</Link>
                    </li>
                    <li>
                        <Link>Log in</Link>
                    </li>
                    <li>
                        <Link>Register</Link>
                    </li>
                </ul>
            </div> */}
        </div>
    );
};

export default Navbar;
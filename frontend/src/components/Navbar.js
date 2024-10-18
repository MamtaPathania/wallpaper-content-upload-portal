import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie';
import logo from '../assets/images/logo5.png'
import { IoIosCloseCircle } from "react-icons/io";


const Navbar = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const username = Cookies.get('username'); 

    const handleLogout = () => {
        Cookies.remove('username'); 
        navigate('/login'); 
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleClose=()=>{
        setDropdownVisible(false)
    }

    return (
        <nav className={`bg-slate shadow ${theme === 'dark' ? 'bg-black shadow-gray-700' : 'bg-gray-900 shadow-blue-200'} border-gray-200 text-center`}>
            <div className='flex justify-between ml-6 lg:ml-4 items-center mx-auto'>
                <div className='flex items-center mx-auto justify-center lg:h-[60px] h-[80px]'>
                    <img src={logo} className='lg:ml-64 mb-2 w-[200px] h-[200px]'/>
                    {/* <span className='lg:ml-64 text-white font-serif text-[24px]'>Upload Image</span> */}
                </div>
                <div className='relative lg:mr-2 mr-4'>
                    <CgProfile size={30} color="white" onClick={toggleDropdown} className="cursor-pointer" />
                    {dropdownVisible && (
                        <div className="absolute right-0 lg:mt-4 mt-6 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                            <div className='flex justify-end' >
                            <IoIosCloseCircle size={25} onClick={handleClose}/>

                            </div>

                            {username && (
                                <>
                                
                                    <p className="px-4 py-2 text-gray-700"><strong>User:</strong>{username}</p>
                                    <hr className="my-1" />
                                </>
                            )}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="w-[80px] text-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-400"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

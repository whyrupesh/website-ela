import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='w-full bg-white px-4 sm:px-8'>
            <div className='flex items-center justify-between py-5 font-medium max-w-screen-xl mx-auto'>

                {/* Main nav links - hidden on small screens */}
                <ul className='hidden sm:flex gap-8 text-lg text-gray-700'>
                    {['/', '/collection', '/about', '/contact'].map((path, idx) => (
                        <NavLink key={idx} to={path} className='flex flex-col items-start gap-1'>
                            <p>{path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                    ))}
                </ul>

                {/* Right icons */}
                <div className='flex items-center gap-5 sm:gap-6 ml-auto'>
                    <img
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        src={assets.search_icon}
                        className='w-5 min-w-5 cursor-pointer'
                        alt="search"
                    />

                    {/* Profile dropdown */}
                    <div className='relative group'>
                        <img
                            onClick={() => token ? null : navigate('/login')}
                            className='w-5 min-w-5 cursor-pointer'
                            src={assets.profile_icon}
                            alt="profile"
                        />
                        {token &&
                            <div className='absolute right-0 pt-4 hidden group-hover:block'>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        }
                    </div>

                    {/* Cart */}
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                            {getCartCount()}
                        </p>
                    </Link>

                    {/* Hamburger menu - only on mobile */}
                    <img
                        onClick={() => setVisible(true)}
                        src={assets.menu_icon}
                        className='w-5 min-w-5 cursor-pointer sm:hidden'
                        alt="menu"
                    />
                </div>
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0'} overflow-hidden`}>
                <div className='flex flex-col text-gray-600 h-full'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-t' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-t' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-t' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-t border-b' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

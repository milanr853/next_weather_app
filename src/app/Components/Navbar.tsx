import React from 'react'
import { FaCloudSun } from 'react-icons/fa'
import SearchBar from './SearchBar'


const Navbar: React.FC = () => {
    return (
        //NAVBAR
        <nav className='h-[80px] shadow-sm sticky top-0 left-0 z-50 bg-white flex items-center justify-center 
        600px:flex-col 600px:gap-4 600px:h-auto 600px:py-4 px-36 900px:px-12'>
            {/* logo section*/}
            <div className='h-full w-[50%] flex items-center 600px:justify-center'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-gray-500 text-3xl'>Weather</h2>
                    <FaCloudSun className='text-3xl mt-1 text-yellow-400 size-9' />
                </div>
            </div>

            {/* search bar section*/}
            <SearchBar />
        </nav>
    )
}

export default Navbar
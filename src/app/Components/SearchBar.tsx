"use client"

import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { getData } from "@/redux/features/weatherDataSlice"
import { useDispatch } from 'react-redux'



const SearchBar: React.FC = () => {
    const [location, setLocation] = useState<string>("")

    const dispatch = useDispatch()

    console.log(window.location.href)
    //api calls
    async function getWeather(cityName: string) {
        try {
            const { data } = await axios.get(`${window.location.href}api/weather?address=` + cityName)
            dispatch(getData(data))
            alert(`Data received`)
        }
        catch (error: any) {
            dispatch(getData(null))
            alert(`Error: ${error.message}`)
        }
    }


    //event listners
    const submitLocation = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() //prevent form from its default behaviour on submit
        // search location is empty or null --> execute nothing, return
        if (!location) return

        // location entered
        getWeather(location)
        setLocation('')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^a-zA-Z]/g, '')
        setLocation(inputValue)
    }



    return (
        <div className='h-full w-[50%] flex items-center justify-end 600px:justify-center'>
            <form className='flex h-[40px]' onSubmit={submitLocation}>
                <input type="text" placeholder='Location' className='h-full px-2 rounded-s-md border-2 border-gray-300 outline-none' value={location} onChange={handleChange} />

                <button className='h-full w-[40px] bg-blue-500 rounded-e-md flex justify-center items-center cursor-pointer'>
                    <GoSearch className='text-white text-lg' />
                </button>
            </form>
        </div>
    )
}


export default SearchBar
import React from 'react'
import { FiDroplet, FiSunrise, FiSunset } from 'react-icons/fi'
import { ImMeter } from 'react-icons/im'
import { LuEye } from 'react-icons/lu'
import { MdAir } from 'react-icons/md'


export interface WeatherDetailsProps {
    visibility: string,
    humidity: string,
    windspeed: string,
    airpressure: string,
    sunrise: string,
    sunset: string,
}

export default function WeatherDetails(props: WeatherDetailsProps) {


    return (
        <div className='flex gap-8 sm:gap-16 overflow-x-auto w-full justify-between items-center pr-3 scrollbar-width-thin h-[140px]'>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Visibility</p>
                <div className="icon text-4xl">{<LuEye />}</div>
                <div className="value">{props?.visibility}</div>
            </div>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Humidity</p>
                <div className="icon text-4xl">{<FiDroplet />}</div>
                <div className="value">{props?.humidity}</div>
            </div>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Wind Speed</p>
                <div className="icon text-4xl">{<MdAir />}</div>
                <div className="value">{props?.windspeed}</div>
            </div>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Air Pressure</p>
                <div className="icon text-4xl">{<ImMeter />}</div>
                <div className="value">{props?.airpressure}</div>
            </div>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Sunrise</p>
                <div className="icon text-4xl">{<FiSunrise />}</div>
                <div className="value">{props?.sunrise}</div>
            </div>

            <div className=' h-full w-[100px] flex flex-col items-center justify-between whitespace-nowrap'>
                <p className="title">Sunset</p>
                <div className="icon text-4xl">{<FiSunset />}</div>
                <div className="value">{props?.sunset}</div>
            </div>

        </div>
    )
}
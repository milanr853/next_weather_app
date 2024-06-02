import Image from 'next/image'
import React from 'react'
import { getDayOrNightIcon } from '../utils/getDayOrNightIcon'

interface WeatherImageProps {
    weatherIcon: string;
    time: string;
}

export default function WeatherImage({ weatherIcon, time }: WeatherImageProps) {
    return (
        <div className='h-20 w-20'>
            <Image
                src={`https://openweathermap.org/img/wn/${getDayOrNightIcon(weatherIcon, time)}@4x.png`}
                alt='weather image'
                width={100}
                height={100}
                className='h-full w-full'
            />
        </div>
    )
}
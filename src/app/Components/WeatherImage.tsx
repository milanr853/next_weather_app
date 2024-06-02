import Image from 'next/image'
import React from 'react'
import { getDayOrNightIcon } from '../utils/getDayOrNightIcon'
import getDefaultTime from "../utils/getDefaultTime"

interface WeatherImageProps {
    weatherIcon: string;
    time?: string;
}

const WeatherImage: React.FC<WeatherImageProps> = ({ weatherIcon, time }) => {
    const icon = weatherIcon || "02d"; // Provide a default value or handle appropriately
    const timeOfDay = time || getDefaultTime();

    return (
        <div className='h-20 w-20'>
            <Image
                src={`https://openweathermap.org/img/wn/${getDayOrNightIcon(icon, timeOfDay)}@4x.png`}
                alt='weather image'
                width={100}
                height={100}
                className='h-full w-full'
            />
        </div>
    )
}

export default WeatherImage
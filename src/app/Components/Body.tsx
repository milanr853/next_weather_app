"use client"

import { format, fromUnixTime, parseISO } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import Wrapper from './Wrapper'
import { convertKelvinToCelcius } from '../utils/convertTemp'
import { nanoid } from 'nanoid';
import Image from 'next/image'
import WeatherImage from './WeatherImage'
import WeatherDetails from './WeatherDetails'
import { metersToKilometers } from '../utils/metersToKilometers'
import { convertWindSpeed } from '../utils/convertWindSpeed'



export default function Body() {
    const weatherData = useSelector((store: any) => store.weatherDataReducer)

    const firstData = weatherData === null ? null : weatherData?.list[0]


    const uniqueDates = [
        ...new Set(
            weatherData?.list.map(
                (entry: any) => new Date(entry.dt * 1000).toISOString().split("T")[0]
            )
        )
    ];

    const firstDataForEachDate = uniqueDates.map((date) => {
        return weatherData?.list.find((entry: any) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
            const entryTime = new Date(entry.dt * 1000).getHours();
            return entryDate === date && entryTime >= 6;
        });
    });




    return (
        <div className='px-36 900px:px-12'>
            {
                weatherData === null ?
                    // no data placeholder
                    <div className='flex flex-col items-center'>
                        <div className='mb-6'>
                            <Image
                                src='/desert.png'
                                alt="placeholder"
                                width={350}
                                height={350}
                                className='rounded-md'
                                priority={true}
                            />
                        </div>
                        <p className='text-gray-500'>!! Seems deserted everywhere !!</p>
                        <p className='text-gray-500'>Verify your location</p>
                    </div>
                    :
                    <>
                        <div className='flex flex-col gap-4'>
                            {/* header */}
                            <div className=' flex flex-row 600px:flex-col justify-between items-center'>
                                <div className='flex items-center gap-1'>
                                    <p className=' text-2xl'>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                                    <p className=' text-xl'>({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</p>
                                </div>
                                <p className='text-2xl'>{`${weatherData?.city?.name}, ${weatherData?.city?.country}`}</p>
                            </div>
                            {/* weather data section */}
                            <Wrapper bgColor="bg-blue-300" gap='12'>
                                {/* temperature */}
                                <div className='flex flex-col items-center justify-center gap-1 w-[120px]'>
                                    <div className='text-5xl'>{convertKelvinToCelcius(firstData?.main?.temp ?? 0)}°</div>
                                    <p className='text-xs text-gray-500 whitespace-nowrap'>Feels like: {convertKelvinToCelcius(firstData?.main?.feels_like ?? 0)}°</p>
                                    <p className='text-xs text-gray-500 flex gap-3'>
                                        <span>{convertKelvinToCelcius(firstData?.main?.temp_min ?? 0)}°↓</span>
                                        <span>{convertKelvinToCelcius(firstData?.main?.temp_max ?? 0)}°↑</span>
                                    </p>
                                </div>

                                {/* hourlyData */}
                                <div className=' flex gap-8 sm:gap-16 overflow-x-auto w-full justify-between items-center pr-3 scrollbar-width-thin'>
                                    {
                                        weatherData?.list.map((obj: any) => (
                                            <div className="card flex flex-col justify-between gap-2 items-center text-xs font-semibold" key={nanoid()}>
                                                <p className='whitespace-nowrap'>{format(parseISO(obj?.dt_txt ?? 0), "h:mm a")}</p>
                                                <div >{convertKelvinToCelcius(obj?.main?.temp ?? 0)}°</div>
                                                <WeatherImage weatherIcon={obj?.weather[0].icon} time={obj?.dt_txt} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Wrapper>


                            {/* extra details section */}
                            <div className='flex gap-4'>
                                <Wrapper bgColor="bg-yellow-300" className='gap-4'>
                                    {/* left */}
                                    <section className='flex items-end w-[260px]'>
                                        <div className="flex flex-col items-center justify-center w-full">
                                            <p className='capitalize text-center '>{firstData?.weather[0].description}</p>
                                            <WeatherImage weatherIcon={firstData?.weather[0].icon ?? ""} time={firstData?.dt_txt ?? ""} />
                                        </div>
                                    </section>
                                    {/* right */}
                                    <WeatherDetails
                                        visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                                        humidity={`${firstData?.main?.humidity ?? 30}%`}
                                        windspeed={convertWindSpeed(firstData?.wind?.speed ?? 1.64)}
                                        airpressure={`${firstData?.main?.pressure ?? 1012} hPa`}
                                        sunrise={format(fromUnixTime(weatherData?.city.sunrise ?? 1702949452), "H:mm")}
                                        sunset={format(fromUnixTime(weatherData?.city.sunset ?? 1702992652), "H:mm")}
                                    />
                                </Wrapper>
                            </div>
                        </div>


                        {/* 5 days forecast section */}
                        <div className='mt-4 flex flex-col gap-4 mb-4'>
                            <p className='text-2xl'>Forecast</p>
                            {
                                firstDataForEachDate.map((d, ind) => (
                                    <Wrapper key={ind} className='gap-4'>
                                        {/* left */}
                                        <section className='flex gap-4 items-end w-[260px]'>
                                            <div className='flex flex-col gap-2 items-center'>
                                                <WeatherImage weatherIcon={d?.weather[0]?.icon ?? "01d"} />
                                                <p>{format(parseISO(d?.dt_txt ?? ""), "dd/MM")}</p>
                                                <p className='text-sm'>{format(parseISO(d?.dt_txt ?? ""), "EEEE")}</p>
                                            </div>
                                            <div className='flex flex-col gap-2 items-start'>
                                                <span className='text-5xl'>{convertKelvinToCelcius(d?.main?.temp ?? 0)}°</span>
                                                <p className='text-xs space-x-1 whitespace-nowrap'>
                                                    <span>Feels like:</span>
                                                    <span>{convertKelvinToCelcius(d?.main?.feels_like ?? 0)}°</span>
                                                </p>
                                                <p className='capitalize'>{d?.weather[0]?.description ?? ""}</p>
                                            </div>
                                        </section>

                                        {/* right */}
                                        <WeatherDetails
                                            visibility={metersToKilometers(d?.visibility ?? 10000)}
                                            humidity={`${d?.main?.humidity ?? 30}%`}
                                            windspeed={convertWindSpeed(d?.wind?.speed ?? 1.64)}
                                            airpressure={`${d?.main?.pressure ?? 1012} hPa`}
                                            sunrise={format(fromUnixTime(weatherData?.city.sunrise ?? 1702949452), "H:mm")}
                                            sunset={format(fromUnixTime(weatherData?.city.sunset ?? 1702992652), "H:mm")}
                                        />
                                    </Wrapper>
                                ))
                            }
                        </div>
                    </>
            }
        </div>
    )
}
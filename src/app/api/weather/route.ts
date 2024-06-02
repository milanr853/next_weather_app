import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(request: any) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${process.env.NEXT_WEATHER_KEY}&cnt=20`

    const { data } = await axios.get(url)

    return NextResponse.json(data)
}


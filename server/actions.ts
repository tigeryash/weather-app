"use server";

export async function getWeather(city: string, country: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,{
        headers: {
            'cache': 'no-store'
        }
    
    })
    const data = await response.json();
    return data;
}

export async function getWeatherForCurrentLocation(city: string, country: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`, {
        headers: {
            'cache': 'no-store'
        }
    })
    const data = await response.json();
    return data;
}
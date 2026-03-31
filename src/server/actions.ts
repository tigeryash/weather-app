"use server";

import { WeatherData } from "@/types/weatherTypes";
import { API_BASE_URLS } from "@/lib/constants";

export async function getWeather(
  city: string,
  country: string
): Promise<WeatherData> {

    const response = await fetch(
      `${API_BASE_URLS.OPENWEATHERMAP}?q=${city},${country}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        cod: response.status,
        message: errorData?.message || "Failed to fetch weather data",
      };
    }
  

  return response.json();
}

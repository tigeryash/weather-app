"use server";

import type { WeatherData } from "@/types/weatherTypes";
import { API_BASE_URLS } from "@/lib/constants";

export async function getWeather(
  lat: string,
  lon: string,
): Promise<WeatherData> {
  const response = await fetch(
    `${API_BASE_URLS.OPENWEATHERMAP}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
    { cache: "no-store" },
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

import type { WeatherData } from "@/types/weatherTypes";
import Wind from "@/components/main/wind";
import Feels from "@/components/main/feels";
import Sunrise from "@/components/main/sunrise";
import Pressure from "@/components/main/pressure";
import Humidity from "@/components/main/humidity";
import Visibility from "@/components/main/visibility";

type WeatherDetailGridProps = {
  data: WeatherData;
  className?: string;
};

const WeatherDetailGrid = ({ data, className }: WeatherDetailGridProps) => {
  if (!("weather" in data)) return null;

  return (
    <div className={className}>
      <div className="col-span-2">
        <Wind deg={data.wind.deg} speed={data.wind.speed} />
      </div>
      <div className="col-span-1">
        <Feels feels={data.main.feels_like} />
      </div>
      <div className="col-span-1">
        <Sunrise
          rise={data.sys.sunrise}
          set={data.sys.sunset}
          timezone={`${data.timezone}`}
        />
      </div>
      <div className="col-span-1">
        <Pressure pressure={data.main.pressure} />
      </div>
      <div className="col-span-1">
        <Humidity humid={data.main.humidity} />
      </div>
      <div className="col-span-1">
        <Visibility visible={data.visibility} />
      </div>
    </div>
  );
};

export default WeatherDetailGrid;

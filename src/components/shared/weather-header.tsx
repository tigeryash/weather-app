type WeatherHeaderProps = {
  cityName: string;
  temp: number;
  description: string;
  tempMax: number;
  tempMin: number;
  isMyLocation?: boolean;
  variant?: "full" | "modal" | "compact";
};

const WeatherHeader = ({
  cityName,
  temp,
  description,
  tempMax,
  tempMin,
  isMyLocation = false,
  variant = "full",
}: WeatherHeaderProps) => {
  if (variant === "compact") {
    return (
      <>
        <div
          className={`flex ${isMyLocation ? "items-center" : ""} justify-between w-full`}
        >
          <div>
            {isMyLocation ? (
              <>
                <h2 className="lg:text-2xl md:text-lg font-bold">
                  My Location
                </h2>
                <p className="text-left md:text-xs lg:text-base">{cityName}</p>
              </>
            ) : (
              <h2 className="lg:text-2xl md:text-lg font-bold">{cityName}</h2>
            )}
          </div>
          <p className="lg:text-5xl md:text-4xl">{temp}&deg;</p>
        </div>
        <div className="mt-6 flex justify-between w-full capitalize">
          <span className="md:text-xs lg:text-base">{description}</span>
          <div className="md:text-xs lg:text-base">
            <span className="mr-2">H:{tempMax}&deg;</span>
            <span>L:{tempMin}&deg;</span>
          </div>
        </div>
      </>
    );
  }

  if (variant === "modal") {
    return (
      <div className="text-center">
        <p className="text-4xl uppercase">{cityName}</p>
        <h3 className="text-5xl font-thin">{temp}&deg;</h3>
        <p className="text-2xl capitalize">{description}</p>
        <p>
          <span className="mr-4 text-2xl">H:{tempMax}&deg;</span>
          <span className="text-2xl">L:{tempMin}&deg;</span>
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {isMyLocation ? (
        <>
          <p className="text-3xl md:text-4xl">My Location</p>
          <p className="text-sm md:text-base uppercase font-semibold">
            {cityName}
          </p>
        </>
      ) : (
        <p className="text-3xl md:text-4xl">{cityName}</p>
      )}
      <h3 className="text-7xl md:text-8xl font-extralight">{temp}&deg;</h3>
      <p className="text-lg md:text-2xl capitalize">{description}</p>
      <p>
        <span className="mr-4 text-lg md:text-2xl">H:{tempMax}&deg;</span>
        <span className="text-lg md:text-2xl">L:{tempMin}&deg;</span>
      </p>
    </div>
  );
};

export default WeatherHeader;

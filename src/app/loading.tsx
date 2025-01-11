const Loading = () => {
  return (
    <>
      <aside
        className="flex flex-col min-h-screen  md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8]
        text-white"
      />
      <main className="flex flex-col items-center w-full text-white md:w-3/4">
        <div className="pt-16 pb-24">
          <div className="text-center">
            <p className="text-4xl">My Location</p>
            <p className="uppercase font-semibold">City</p>
            <h3 className="text-8xl font-thin">--</h3>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-6 w-full p-8 lg:p-12 xl:p-8"></div>
      </main>
    </>
  );
};

export default Loading;

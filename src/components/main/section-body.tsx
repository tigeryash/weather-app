type SectionBodyProps = {
  children: React.ReactNode;
  lorem: boolean;
};

const SectionBody = ({ children, lorem }: SectionBodyProps) => {
  return (
    <>
      <div className="h-20 md:h-32">
        <p className="text-4xl md:text-5xl font-light">{children}</p>
      </div>
      <p className="min-h-[1em] text-xs md:text-base lg:text-lg">
        {lorem ? (
          "Lorem ipsum dolor"
        ) : (
          <span className="text-xs md:text-base lg:text-lg">&nbsp;&nbsp;</span>
        )}
      </p>
    </>
  );
};

export default SectionBody;

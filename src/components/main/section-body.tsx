type SectionBodyProps = {
  children: React.ReactNode;
  lorem: boolean;
};

const SectionBody = ({ children, lorem }: SectionBodyProps) => {
  return (
    <>
      <div className="h-24 md:h-32">
        <p className="text-4xl md:text-5xl font-light">{children}</p>
      </div>
      <p className="min-h-[1em] text-sm md:text-base">
        {lorem ? "Lorem ipsum dolor" : " "}
      </p>
    </>
  );
};

export default SectionBody;

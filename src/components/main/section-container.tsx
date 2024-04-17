type SectionContainerProps = {
  children: React.ReactNode;
  handleClick?: () => void;
};

const SectionContainer = ({ children, handleClick }: SectionContainerProps) => {
  return (
    <section
      onClick={handleClick}
      className="rounded-2xl p-4"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(173, 216, 230, 0.45)",
      }}
    >
      {children}
    </section>
  );
};

export default SectionContainer;

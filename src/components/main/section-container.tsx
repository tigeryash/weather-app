type SectionContainerProps = {
  children: React.ReactNode;
  handleClick?: () => void;
};

const SectionContainer = ({ children, handleClick }: SectionContainerProps) => {
  if (handleClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-2xl bg-[rgba(173,216,230,0.45)] p-4 text-left backdrop-blur-[10px]"
      >
        {children}
      </button>
    );
  }

  return (
    <section className="rounded-2xl p-4 backdrop-blur-[10px] bg-[rgba(173,216,230,0.45)]">
      {children}
    </section>
  );
};

export default SectionContainer;

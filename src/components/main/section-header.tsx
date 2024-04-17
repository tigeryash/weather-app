type SectionHeaderProps = {
  children: React.ReactNode;
  title: string;
};

const SectionHeader = ({ children, title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center pb-2">
      {children}
      <h2 className="uppercase text-xs md:text-base">{title}</h2>
    </div>
  );
};

export default SectionHeader;

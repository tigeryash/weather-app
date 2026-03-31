import { motion } from "motion/react";

const WindCompass = ({
  deg,
  direction,
}: {
  deg: number;
  direction: string;
}) => {
  const cardinals = [
    {
      label: "N",
      className: "left-1/2 top-2 -translate-x-1/2 md:top-3",
      highlight: true,
    },
    {
      label: "E",
      className: "right-2 top-1/2 -translate-y-1/2 md:right-3",
      highlight: false,
    },
    {
      label: "S",
      className: "bottom-2 left-1/2 -translate-x-1/2 md:bottom-3",
      highlight: false,
    },
    {
      label: "W",
      className: "left-2 top-1/2 -translate-y-1/2 md:left-3",
      highlight: false,
    },
  ] as const;

  return (
    <div className="relative h-32 w-32 md:h-44 md:w-44">
      <div className="absolute inset-0 rounded-full border-2 border-white/55" />
      <div className="absolute inset-[10px] rounded-full border border-white/18" />

      {cardinals.map(({ label, className, highlight }) => (
        <span
          key={label}
          className={`absolute text-sm font-semibold tracking-[0.18em] md:text-base ${
            highlight ? "text-white/80" : "text-white/50"
          } ${className}`}
        >
          {label}
        </span>
      ))}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: deg }}
        transition={{ type: "spring", stiffness: 85, damping: 18 }}
      >
        <div className="absolute bottom-1/2 h-[44%] w-[3px] origin-bottom rounded-full bg-gradient-to-t from-transparent via-amber-200 to-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.35)] md:h-[46%]" />
        <div className="absolute top-[16%] h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(253,224,71,0.5)] md:h-4 md:w-4" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/14 backdrop-blur-md shadow-[0_10px_30px_rgba(255,255,255,0.08)] md:h-20 md:w-20">
          <span className="text-xl font-semibold text-white md:text-3xl">
            {direction}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WindCompass;

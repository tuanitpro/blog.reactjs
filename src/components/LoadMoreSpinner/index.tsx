import { motion } from "motion/react";

export const Spinner = ({
  size = 32,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <motion.div
      className="rounded-full border-2 border-border border-t-accent"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
};

export const PulseLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ scale: [0.7, 1, 0.7], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export const BouncingLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export const LoadMoreStatus = ({
  isFetchingNextPage,
  hasNextPage,
  itemsLength,
  variant = "spinner",
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  itemsLength: number;
  variant?: "spinner" | "pulse" | "bouncing";
}) => {
  if (isFetchingNextPage) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-foreground/40">
        {variant === "spinner" && <Spinner />}
        {variant === "pulse" && <PulseLoader />}
        {variant === "bouncing" && <BouncingLoader />}
        <span className="text-xs tracking-wide">Đang tải thêm bài viết...</span>
      </div>
    );
  }

  if (!hasNextPage && itemsLength > 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-10 gap-2 text-foreground/35"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-8 h-px bg-border mb-1" />
        <span className="text-xs tracking-widest uppercase">Hết rồi</span>
      </motion.div>
    );
  }

  return null;
};

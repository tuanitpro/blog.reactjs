import { motion } from "motion/react";

export const Spinner = ({
  size = 40,
  color = "#3b82f6",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <motion.div
      className="rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-blue-500"
      style={{ width: size, height: size, borderTopColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export const PulseLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full bg-blue-500"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export const BouncingLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full bg-blue-500"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
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
      <div className="flex flex-col items-center justify-center py-8 gap-3 text-foreground/50">
        {variant === "spinner" && <Spinner />}
        {variant === "pulse" && <PulseLoader />}
        {variant === "bouncing" && <BouncingLoader />}
        <span className="text-sm">Bạn đợi chút, tôi đang tải thêm bài viết...</span>
      </div>
    );
  }

  if (!hasNextPage && itemsLength > 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3 text-foreground/50">
        <motion.div
          className="text-4xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          ✓
        </motion.div>
        <span className="text-sm">Bạn ơi, không còn bài viết nào nữa rồi!</span>
      </div>
    );
  }

  return null;
};

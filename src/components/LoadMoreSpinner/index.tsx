import { motion } from "motion/react";
import "./index.css";

export const Spinner = ({
  size = 40,
  color = "#3b82f6",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <motion.div
      className="spinner"
      style={{ width: size, height: size, borderColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export const PulseLoader = () => {
  return (
    <div className="pulse-loader">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="pulse-dot"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export const BouncingLoader = () => {
  return (
    <div className="bouncing-loader">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
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
      <div className="load-more-status loading">
        {variant === "spinner" && <Spinner />}
        {variant === "pulse" && <PulseLoader />}
        {variant === "bouncing" && <BouncingLoader />}
        <span className="loading-text">Bạn đợi chút, tôi đang tải thêm bài viết...</span>
      </div>
    );
  }

  if (!hasNextPage && itemsLength > 0) {
    return (
      <div className="load-more-status end">
        <motion.div
          className="end-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          ✓
        </motion.div>
        <span className="end-text">Bạn ơi, không còn bài viết nào nữa rồi!</span>
      </div>
    );
  }

  return null;
};

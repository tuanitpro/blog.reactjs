import "./index.css";

export const Spinner = ({
  size = 40,
  color = "#3b82f6",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderColor: color,
      }}
    ></div>
  );
};

export const PulseLoader = () => {
  return (
    <div className="pulse-loader">
      <div className="pulse-dot"></div>
      <div className="pulse-dot"></div>
      <div className="pulse-dot"></div>
    </div>
  );
};

export const BouncingLoader = () => {
  return (
    <div className="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
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
  hasNextPage: boolean;
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
        <div className="end-icon">✓</div>
        <span className="end-text">Bạn ơi, không còn bài viết nào nữa rồi!</span>
      </div>
    );
  }

  return null;
};

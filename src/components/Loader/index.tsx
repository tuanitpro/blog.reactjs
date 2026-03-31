import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// https://assets-v2.lottiefiles.com/a/6a19835c-3d46-11ef-b6ac-2b61df01c982/UbrgNPx6v6
import loader from "@static/image/loader.lottie";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-48 h-48">
        <DotLottieReact
          src={loader}
          loop
          autoplay
          renderConfig={{ autoResize: true }}
        />
      </div>
    </div>
  );
};

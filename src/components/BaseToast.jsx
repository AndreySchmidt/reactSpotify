import { forwardRef, useImperativeHandle, useRef, useState } from "react";

function BaseToast(_, ref) {
  const hideTimer = useRef();
  const [opacityClass, setOpacityClass] = useState("opacity-0");
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => {
    return {
      show: (message) => {
        setOpacityClass("opacity-1");
        clearTimeout(hideTimer.current);
        setMessage(message);

        hideTimer.current = setTimeout(
          () => setOpacityClass("opacity-0"),
          3000
        );
      },
    };
  });

  return (
    <div
      className={`
    fixed left-1/2 bottom-28 -translate-x-1/2 z-30 bg-[#2e76d0] text-white tracking-wide whitespace-nowrap rounded-lg shadow-3xl py-3 px-8 pointer-events-none
    transition-opacity duration-700 ${opacityClass}`}
    >
      {message}
    </div>
  );
}

export default forwardRef(BaseToast);

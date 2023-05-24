import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

function BaseModal({ onClose: handleClose }) {
  const ref = useRef();
  const contentRef = useRef();

  useEffect(() => {
    setTimeout(animate);

    function handleEsc({ key }) {
      if (key === "Escape") close();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  });

  function close() {
    animate(true);
    setTimeout(handleClose, 500);
  }

  function animate(isClosing = false) {
    ref, current.classList.toggle("opacity-0", isClosing);
    contentRef, current.classList.toggle("-translate-y-10", isClosing);
  }

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-black/70 z-50 opacity-0 transition-opacity duration-500"
      role="dialog"
      onClick={close}
      ref={ref}
    >
      <div
        className="flex flex-col bg-[#333] text-white h-80 w-[480px] rounded-xl relative -translate-y-10 transition-transform duration-500"
        onClick={(event) => event.stopPropagation()}
        ref={contentRef}
      >
        <button
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
          Title
        </h1>
        <div className="py-6 px-8 overflow-y-auto">
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text Text text zzz
        </div>
      </div>
    </div>
  );
}

export default BaseModal;

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
        className="bg-[#333 h-1/3 w-2/5] rounded-xl relative -translate-y-10 transition-transform duration-500"
        onClick={(event) => event.stopPropagation()}
        ref={contentRef}
      >
        <button
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default BaseModal;

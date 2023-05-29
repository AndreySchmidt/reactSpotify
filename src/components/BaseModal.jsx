import ReactDOM from "react-dom";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import useEvent from "../hooks/useEvent";

function BaseModal({ classes, onClose: handleClose, children }) {
  const ref = useRef();
  const contentRef = useRef();

  useEffect(() => {
    setTimeout(animate);
  });

  useEvent("keydown", handleEsc);

  function handleEsc({ key }) {
    if (key === "Escape") close();
  }

  function close() {
    animate(true);
    setTimeout(handleClose, 500);
  }

  function animate(isClosing = false) {
    ref.current.classList.toggle("opacity-0", isClosing);
    contentRef.current.classList.toggle("-translate-y-10", isClosing);
  }

  return ReactDOM.createPortal(
    <div
      className={`flex justify-center items-center fixed inset-0 bg-black/70 z-50 opacity-0 transition-opacity duration-500`}
      role="dialog"
      onClick={close}
      ref={ref}
    >
      <div
        className={`flex flex-col text-white rounded-xl relative -translate-y-10 transition-transform duration-500 ${classes}`}
        onClick={(event) => event.stopPropagation()}
        ref={contentRef}
      >
        <button
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default BaseModal;

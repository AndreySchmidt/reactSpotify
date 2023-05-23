import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

function BaseModal({ onClose: handleClose }) {
  useEffect(() => {
    function handleEsc({ key }) {
      if (key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  });

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-black/70 z-50"
      role="dialog"
      onClick={handleClose}
    >
      <div
        className="bg-[#333 h-1/3 w-2/5] rounded-xl relative"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={handleClose}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default BaseModal;

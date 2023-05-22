import { useState, useRef, useEffect } from "react";
import usePosition from "./useContextMenuPosition";
import useClickAway from "./useClickAway";

function useContextMenu(items) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const move = usePosition(ref, isOpen);
  useClickAway(ref, close, () => isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleEsc({ key }) {
      if (key === "Escape") close();
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  });

  const open = (event) => {
    event.preventDefault();

    move(event.clientX, event.clientY);

    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    open,
    close,
    isOpen,
    ref,
    items,
  };
}

export default useContextMenu;

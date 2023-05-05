import { useState, useRef, useEffect } from "react";
import usePosition from "./useContextMenuPosition";

function useContextMenu() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const updateClickCoordinates = usePosition(
    contextMenuRef,
    isContextMenuOpen
  );

  useEffect(() => {
    if (!isContextMenuOpen) return;

    function handleClickAway({ target }) {
      if (!contextMenuRef.current.contains(target)) closeContextMenu();
    }

    function handleEsc({ key }) {
      if (key === "Escape") closeContextMenu();
    }

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEsc);
    };
  });

  const openContextMenu = (event) => {
    event.preventDefault();

    updateClickCoordinates(event.clientX, event.clientY);
    // clickPosition.x = event.clientX;
    // clickPosition.y = event.clientY;

    setIsContextMenuOpen(true);
  };
  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  return {
    openContextMenu,
    isContextMenuOpen,
    contextMenuRef,
  };
}

export default useContextMenu;

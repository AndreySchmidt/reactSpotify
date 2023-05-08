import { useEffect, useRef, useState } from "react";

function useContextSubmenu(items, closePreviousIfOpen, menuItemRef) {
  const closeTimer = useRef(null);

  const [state, setState] = useState({
    isOpen: false,
    positionClasses: "",
  });

  function getPositionClasses() {
    return `${getPositionYClass()} ${getPositionXClass()}`;
  }

  function getPositionYClass() {
    const item = itemRef.current;
    const itemWidth = item.offsetWidth;
    const windowWidth = window.innerWidth;
    const itemRightCoordX = item.getBoundingClientRect().right;
    const shouldMoveLeft = itemWidth > windowWidth - itemRightCoordX;

    return shouldMoveLeft ? "right-full" : "left-full";
  }

  function getPositionXClass() {
    const windowHeight = window.innerHeight;
    const item = itemRef.current;
    const height = item.offsetHeight * items.lenght;
    const itemBottomCoordY = item.getBoundingClientRect().bottom;
    const shouldMoveUp = height > windowHeight - itemBottomCoordY;

    return shouldMoveUp ? "bottom-0" : "top-0";
  }

  function open() {
    closePreviousIfOpen(startCloseTimer);

    if (closeTimer) {
      stopCloseTimer();

      return;
    }

    setState({
      isOpen: true,
      positionClasses: getPositionClasses(),
    });
  }
  function close() {
    setState({
      isOpen: false,
      positionClasses: "",
    });
  }
  function startCloseTimer() {
    closeTimer.current = setTimeout(close, 100);
  }
  function stopCloseTimer() {
    clearTimeout(closeTimer.current);
  }

  useEffect(() => stopCloseTimer);

  return { open, items, ...state};
}
export default useContextSubmenu;

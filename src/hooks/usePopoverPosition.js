import { useRef, useState } from "react";
import { MIN_DESCTOP_WIDTH, debounce } from "../utils";
import useEvent from "./useEvent";

function usePopoverPosition(ref, screenChangeCallback) {
  const [target, setTarget] = useState();
  const changeWithTimer = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(isCurrentWindowWidthSmall);

  useEvent("resize", debounceResize, () => true, window);

  function handleResize() {
    if (!screenHasBecomeSmall() && !screenHasBecomeBig()) return;

    screenChangeCallback();

    clearTimeout(changeWithTimer.current);
    changeWithTimer.current = setTimeout(() => {
      setIsSmallScreen(isCurrentWindowWidthSmall);
    }, 300);
  }

  const debounceResize = debounce.bind(null, handleResize, 300);

  function screenHasBecomeSmall() {
    return isCurrentWindowWidthSmall() && !isSmallScreen;
  }
  function screenHasBecomeBig() {
    return isCurrentWindowWidthBig() && isSmallScreen;
  }
  function isCurrentWindowWidthSmall() {
    return window.innerWidth < MIN_DESCTOP_WIDTH;
  }
  function isCurrentWindowWidthBig() {
    return window.innerWidth >= MIN_DESCTOP_WIDTH;
  }

  function move(target, offset) {
    offset = offset || calculateTargetOffset(target);
    ref.current.style.top = `${offset.top}px`;
    ref.current.style.left = `${offset.left}px`;

    setTarget(target);
  }

  function calculateTargetOffset(target) {
    const { top, right, left, height } = target.getBoundingClientRect();

    return {
      top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
      left: isSmallScreen ? left : right + 30,
    };
  }

  return { move, target, setTarget, isSmallScreen };
}

export default usePopoverPosition;

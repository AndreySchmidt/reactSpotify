import { debounce } from "../utils";
import {
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";

import BaseBtn from "./BaseBtn";
import BasePopoverTriangle from "./BasePopoverTriangle";

const MIN_DESCTOP_WIDTH = 900;

function BasePopover(_, ref) {
  const [classes, setClasses] = useState(getHiddenClasses);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [target, setTarget] = useState();

  const nodeRef = useRef();

  // const isSmallScreen = window.innerWidth < MIN_DESCTOP_WIDTH;
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < MIN_DESCTOP_WIDTH
  );
  const changeWithTimer = useRef();
  // const resizeTimer = useRef();

  function getHiddenClasses() {
    // const translateClass = isSmallScreen ? "translate-y-1" : "translate-x-1";
    // const HIDDEN_CLASSES = `opacity-0 ${translateClass} pointer-events-none`;
    const translateClass = isSmallScreen ? "translate-y-1" : "translate-x-1";
    return `opacity-0 ${translateClass} pointer-events-none`;
  }

  function show(title, description, nextTarget, offset) {
    if (target === nextTarget) return;

    moveTo(offset ? offset : calculateTargetOffset(nextTarget));
    setTarget(nextTarget);
    setTitle(title);
    setDescription(description);
    setClasses("");
  }
  function hide() {
    setTarget(null);
    setClasses(getHiddenClasses);
  }

  function moveTo(offset) {
    nodeRef.current.style.top = `${offset.top}px`;
    nodeRef.current.style.left = `${offset.left}px`;
  }

  function calculateTargetOffset(target) {
    const { top, right, left, height } = target.getBoundingClientRect();

    return {
      top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
      left: isSmallScreen ? left : right + 30,
    };
  }

  useEffect(() => {
    function handleResize() {
      if (screenHasBecomeSmall() || screenHasBecomeWide()) {
        hide();

        clearTimeout(changeWithTimer.current);
        changeWithTimer.current = setTimeout(() => {
          setIsSmallScreen(window.innerWidth < MIN_DESCTOP_WIDTH);
        }, 300);
      }
    }

    function screenHasBecomeSmall() {
      return window.innerWidth < MIN_DESCTOP_WIDTH && !isSmallScreen;
    }
    function screenHasBecomeWide() {
      return window.innerWidth >= MIN_DESCTOP_WIDTH && isSmallScreen;
    }
    function handleClickAway(event) {
      if (target && target.parentNode.contains(event.target)) return;

      if (!nodeRef.current.contains(event.target)) hide();
    }

    const debounceResize = debounce.bind(null, handleResize, 300);

    window.addEventListener("resize".debounceResize);
    document.addEventListener("mousedown".handleClickAway);

    return () => {
      document.removeEventListener("mousedown".handleClickAway);
      window.removeEventListener("resize".debounceResize);
    };
  });

  useImperativeHandle(ref, () => ({ show }));

  return (
    <div
      className={`transition duration-300 fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none ${classes}`}
      ref={nodeRef}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-xs">{description}</p>
      <div className="mt-6 text-right">
        <BaseBtn onClick={hide}>Not now</BaseBtn>
        <BaseBtn primary>Log in</BaseBtn>
      </div>
      <BasePopoverTriangle side={isSmallScreen ? "top" : "left"} />
    </div>
  );
}

export default forwardRef(BasePopover);

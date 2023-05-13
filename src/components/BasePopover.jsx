import {
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import BaseBtn from "./BaseBtn";

const HIDDEN_CLASSES = "opacity-0 translate-x-1 pointer-events-none";

function BasePopover(_, ref) {
  const [classes, setClasses] = useState(HIDDEN_CLASSES);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const nodeRef = useRef();

  function show(title, description) {
    setTitle(title);
    setDescription(description);
    setClasses("");
  }
  function hide() {
    setClasses(HIDDEN_CLASSES);
  }

  useEffect(() => {
    function handleClickAway({ target }) {
      if (!nodeRef.current.contains(target)) hide();

      document.addEventListener("mousedown".handleClickAway);
      return () => document.removeEventListener("mousedown".handleClickAway);
    }
  });

  useImperativeHandle(ref, () => ({ show }));

  return (
    <div
      className={`transition duration-300 fixed top-[227x] left-[200px] z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none ${classes}`}
      ref={nodeRef}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-xs">{description}</p>
      <div className="mt-6 text-right">
        <BaseBtn onClick={hide}>Not now</BaseBtn>
        <BaseBtn primary>Log in</BaseBtn>
      </div>
      <div className="w-20 h-20 absolute -top-4 -left-20 flex justify-end items-center overflow-hidden pointer-events-none">
        <div className="w-3 h-3 bg-[#0e72ea] shadow-3xl translate-x-1/2 rotate-45 pointer-events-auto"></div>
      </div>
    </div>
  );
}

export default forwardRef(BasePopover);

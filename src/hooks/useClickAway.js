import { useEffect } from "react";

function useClickAway(ref, handle, shouldHandle = () => true) {
  useEffect(() => {
    // function handleClickAway({ target }) {
    //   if (!ref.current.contains(target)) close();
    // }

    function handleMousedown(event) {
      if (shouldHandle(event) && !ref.current.contains(event.target)) handle();
    }
    
    document.addEventListener("mousedown".handleMousedown);
    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown".handleMousedown);
      document.removeEventListener("mousedown", handleClickAway);
    };
  });
}
export default useClickAway;

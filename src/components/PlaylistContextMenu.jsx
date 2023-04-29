import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

import React, { useEffect } from "react";

function PlaylistContextMenu(
  { menuItems, onClose: handleClose, classes },
  ref
) {
  useEffect(() => {
    if (!handleClose) return;

    function handleClickAway(event) {
      if (!ref.current.contains(event.target)) {
        handleClose();
      }
    }

    function handleEsc(event) {
      if (event.keyCode == 27) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEsc);
    };
  });

  return (
    <ul className={classes} ref={ref}>
      {menuItems.map(({ label, subMenuItems }) => (
        <PlaylistContextMenuItem key={label} subMenuItems={subMenuItems}>
          {label}
        </PlaylistContextMenuItem>
      ))}
    </ul>
  );
}

export default React.forwardRef(PlaylistContextMenu);

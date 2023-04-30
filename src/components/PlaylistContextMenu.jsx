import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

import React from "react";

function PlaylistContextMenu({ menuItems, classes }, ref) {
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

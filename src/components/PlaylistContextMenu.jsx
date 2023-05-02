import PlaylistContextMenuItem from "./PlaylistContextMenuItem";
import PlaylistContextMenuItemWithSubmenu from "./PlaylistContextMenuItemWithSubmenu";

import React from "react";

function PlaylistContextMenu({ menuItems, classes }, ref) {
  let closePreviousSubmenu = null;

  function closePreviousSubmenuIfOpen(closeSubmenu = null) {
    if (closePreviousSubmenu) {
      closePreviousSubmenu();
    }

    closePreviousSubmenu = closeSubmenu;
  }

  return (
    <ul className={classes} ref={ref}>
      {menuItems.map(({ label, subMenuItems }) => {
        if (subMenuItems) {
          return (
            <PlaylistContextMenuItemWithSubmenu
              key={label}
              subMenuItems={subMenuItems}
              onMouseEnter={closePreviousSubmenuIfOpen}
            >
              {label}
            </PlaylistContextMenuItemWithSubmenu>
          );
        }

        return (
          <PlaylistContextMenuItem onMouseEnter={closePreviousSubmenuIfOpen} key={label}>{label}</PlaylistContextMenuItem>
        );
      })}
    </ul>
  );
}

export default React.forwardRef(PlaylistContextMenu);

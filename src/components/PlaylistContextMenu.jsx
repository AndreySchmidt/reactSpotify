import PlaylistContextMenuItem from "./PlaylistContextMenuItem";
import PlaylistContextMenuItemWithSubmenu from "./PlaylistContextMenuItemWithSubmenu";

import React, { useRef } from "react";

function PlaylistContextMenu({ menuItems, classes }, ref) {
  let closePreviousSubmenu = useRef(null);

  function closePreviousSubmenuIfOpen(closeSubmenu = null) {
    if (closePreviousSubmenu.current) closePreviousSubmenu.current();

    closePreviousSubmenu.current = closeSubmenu;
  }

  return (
    <ul
      className={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-3xl cursor-default whitespace-nowrap z-10 ${classes}`}
      ref={ref}
    >
      {menuItems.map(({ label, classes: menuItemClasses, subMenuItems, action }) => {
        if (subMenuItems) {
          return (
            <PlaylistContextMenuItemWithSubmenu
              key={label}
              onClick={action}
              classes={menuItemClasses}
              subMenuItems={subMenuItems}
              onMouseEnter={closePreviousSubmenuIfOpen}
            >
              {label}
            </PlaylistContextMenuItemWithSubmenu>
          );
        }

        return (
          <PlaylistContextMenuItem
            onMouseEnter={closePreviousSubmenuIfOpen}
            key={label}
          >
            {label}
          </PlaylistContextMenuItem>
        );
      })}
    </ul>
  );
}

export default React.forwardRef(PlaylistContextMenu);

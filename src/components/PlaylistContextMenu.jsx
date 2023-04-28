import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

import { useEffect } from "react";

function PlaylistContextMenu({ menuItems, onClose, classes }) {
  useEffect(() => {
    document.addEventListener('mousedown', onClose);

    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  });

  return (
    <ul className={classes}>
      {menuItems.map(({ label, subMenuItems }) => (
        <PlaylistContextMenuItem key={label} subMenuItems={subMenuItems}>
          {label}
        </PlaylistContextMenuItem>
      ))}
    </ul>
  );
}

export default PlaylistContextMenu;

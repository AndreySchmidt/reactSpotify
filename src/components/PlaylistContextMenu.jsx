import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

function PlaylistContextMenu({ menuItems, classes }) {
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

import PlaylistContextMenuItem from "PlaylistContextMenuItem";

function PlaylistContextSubMenu() {
  const subMenuItems = [
    { label: "Copy link to playlist" },
    { label: "Embed playlist" },
  ];

  return (
    <ul class="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default">
      {subMenuItems.map(({ label }) => (
        <PlaylistContextMenuItem key={label}>{label}</PlaylistContextMenuItem>
      ))}
    </ul>
  );
}

export default PlaylistContextSubMenu;

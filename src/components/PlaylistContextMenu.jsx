import PlaylistContextSubMenu from "PlaylistContextSubMenu";
import PlaylistContextMenuItem from "PlaylistContextMenuItem";

function PlaylistContextMenu() {
  const menuItems = [
    { label: "Add to Your Library" },
    { label: "Share" },
    { label: "About recommendations" },
    { label: "Open in Desktop app" },
  ];

  return (
    <ul class="absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10 hidden group-hover:block">
      {menuItems.map(({ label }) => (
        <PlaylistContextMenuItem key={label}>{label}</PlaylistContextMenuItem>
      ))}
      {/* <li class="relative">
        <button class="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center">
          Share
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <PlaylistContextSubMenu />
      </li> */}
    </ul>
  );
}

export default PlaylistContextMenu;

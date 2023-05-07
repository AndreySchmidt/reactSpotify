import { ChevronRightIcon } from "@heroicons/react/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";
import useSubmenu from "./hook/useContextSubmenu";
import { useRef } from "react";

function PlaylistContextMenuItemWithSubmenu({
  children: label,
  subMenuItems,
  onMouseEnter: closePreviousSubmenuIfOpen,
}) {
  const ref = useRef(null);
  const bgClass = submenu.isOpen ? "bg-[#3e3e3e]" : "hover:bg-[#3e3e3e]";

  const submenu = useSubmenu(subMenuItems, closePreviousSubmenuIfOpen, ref);

  return (
    <li className="relative" onMouseEnter={submenu.open} ref={ref}>
      <button
        className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}
      >
        {label} <ChevronRightIcon className="h-4 w-4" />
      </button>
      {submenu.isOpen && (
        <PlaylistContextMenu
          menuItems={submenu.items}
          classes={`absolute ${submenu.positionClasses}`}
        />
      )}
    </li>
  );
}

export default PlaylistContextMenuItemWithSubmenu;

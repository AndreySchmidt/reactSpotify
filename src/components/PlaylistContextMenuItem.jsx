import { ChevronRightIcon } from "@heroicons/react/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { useRef, useState } from "react";

function PlaylistContextMenuItem({ children: label, subMenuItems }) {
  const menuItemRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPositionClass, setMenuPositionClass] = useState("left-full");

  function getMenuPositionClass() {
    const menuItem = menuItemRef.current;
    const menuWidth = menuItem.offsetWidth;
    const windowWidth = window.innerWidth;
    const menuItemEndCoord = menuItem.getBoundingClientRect().right;
    const shouldMoveMenuLeft = menuWidth > windowWidth - menuItemEndCoord;

    return shouldMoveMenuLeft ? "right-full" : "left-full";
  }

  function openMenu() {
    setIsMenuOpen(true);
    setMenuPositionClass(getMenuPositionClass());
  }
  function closeMenu() {
    setIsMenuOpen(false);
  }

  let classes = "";
  let classesBtn =
    "w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default";
  let icon = null;
  let subMenu = null;

  if (subMenuItems) {
    let classes = "relative";
    let classesBtn = `${classesBtn} flex justify-between items-center`;
    let icon = <ChevronRightIcon className="h-4 w-4" />;
    let subMenu = isMenuOpen && (
      <PlaylistContextMenu
        menuItems={subMenuItems}
        classes={`absolute top-0 ${menuPositionClass} bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default`}
      />
    );
  }

  return (
    <li
      className={classes}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      ref={menuItemRef}
    >
      <button className={classesBtn}>
        {label} {icon}
      </button>
      {subMenu}
    </li>
  );
}

export default PlaylistContextMenuItem;

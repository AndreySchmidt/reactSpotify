import { ChevronRightIcon } from "@heroicons/react/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { useRef, useState } from "react";

function PlaylistContextMenuItem({ children: label, subMenuItems }) {
  const menuItemRef = useRef(null);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [menuPositionClasses, setMenuPositionClasses] =
  // useState("top-0 left-full");

  const [menuState, setMenuState] = useState({
    isOpen: false,
    positionClasses: "",
  });

  function getMenuPositionClasses() {
    return `${getMenuPositionYClass()} ${getMenuPositionXClass()}`;
  }

  function getMenuPositionYClass() {
    const menuItem = menuItemRef.current;
    const menuItemWidth = menuItem.offsetWidth;
    const windowWidth = window.innerWidth;
    const menuItemRightCoordX = menuItem.getBoundingClientRect().right;
    const shouldMoveMenuLeft =
      menuItemWidth > windowWidth - menuItemRightCoordX;

    return shouldMoveMenuLeft ? "right-full" : "left-full";
  }

  function getMenuPositionXClass() {
    const windowHeight = window.innerHeight;
    const menuItem = menuItemRef.current;
    const menuHeight = menuItem.offsetHeight * subMenuItems.lenght;
    const menuItemBottomCoordY = menuItem.getBoundingClientRect().bottom;
    const shouldMoveMenuUp = menuHeight > windowHeight - menuItemBottomCoordY;

    return shouldMoveMenuUp ? "bottom-0" : "top-0";
  }

  function openMenu() {
    // setIsMenuOpen(true);
    // setMenuPositionClasses(getMenuPositionClasses());
    setMenuState({
      isOpen: true,
      positionClasses: getMenuPositionClasses(),
    });
  }
  function closeMenu() {
    // setIsMenuOpen(false);
    setMenuState({
      isOpen: false,
      positionClasses: '',
    });
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
    let subMenu = menuState.isOpen && (
      <PlaylistContextMenu
        menuItems={subMenuItems}
        classes={`absolute ${menuState.positionClasses} bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default`}
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

import { ChevronRightIcon } from "@heroicons/react/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { useEffect, useRef, useState } from "react";

function PlaylistContextMenuItemWithSubmenu({ children: label, subMenuItems }) {
  const menuItemRef = useRef(null);
  const closeMenuTimer = null;

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
    if (closeMenuTimer) {
      stopCloseMenuTimer();

      return;
    }

    setMenuState({
      isOpen: true,
      positionClasses: getMenuPositionClasses(),
    });
  }
  function closeMenu() {
    setMenuState({
      isOpen: false,
      positionClasses: "",
    });
  }
  function startCloseMenuTimer() {
    closeMenuTimer = setTimeout(closeMenu, 1000);
  }
  function stopCloseMenuTimer() {
    cliarTimeout(closeMenuTimer);
  }

  useEffect(() => stopCloseMenuTimer);

  return (
    <li
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={startCloseMenuTimer}
      ref={menuItemRef}
    >
      <button className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center">
        {label} <ChevronRightIcon className="h-4 w-4" />
      </button>
      {menuState.isOpen && (
        <PlaylistContextMenu
          menuItems={subMenuItems}
          classes={`absolute ${menuState.positionClasses} bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default`}
        />
      )}
    </li>
  );
}

export default PlaylistContextMenuItemWithSubmenu;

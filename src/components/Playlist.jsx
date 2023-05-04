import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

const clickPosition = { x: null, y: null };

function generateContextMenuItems(isAlternate = false) {
  return [
    { label: "Add to Your Library" },
    {
      label: "Share",
      subMenuItems: [
        {
          label: isAlternate ? "Copy Spotify URI" : "Copy link to playlist",
          classes: "min-w-[150px]",
        },
        { label: "Embed playlist" },
      ],
    },
    { label: "About recommendations" },
    { label: "Open in Desktop app" },
  ];
}

function Playlist({ coverUrl, title, description, classes, toggleSrolling }) {
  const [contextMenuItems, setContextMenuItems] = useState(
    generateContextMenuItems()
  );
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const bgClasses = isContextMenuOpen
    ? "bg-[#272727]"
    : "bg-[#181818] hover:bg-[#272727]";

  function updateContextMenuYPosition() {
    const menuHeight = contextMenuRef.current.offsetHeight;
    const shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y;

    contextMenuRef.current.style.top = shouldMoveUp
      ? `${clickPosition.y - menuHeight}px`
      : `${clickPosition.y}px`;
  }
  function updateContextMenuXPosition() {
    const menuWidth = contextMenuRef.current.offsetWidth;
    const shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x;

    contextMenuRef.current.style.left = shouldMoveLeft
      ? `${clickPosition.x - menuWidth}px`
      : `${clickPosition.x}px`;
  }

  function updateContextMenuPosition() {
    updateContextMenuXPosition();
    updateContextMenuYPosition();
  }

  useLayoutEffect(() => {
    toggleSrolling(!isContextMenuOpen);

    if (isContextMenuOpen) {
      updateContextMenuPosition();
    }
  });

  useEffect(() => {
    if (!isContextMenuOpen) return;

    function handleClickAway(event) {
      if (!contextMenuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    }

    function handleEsc(event) {
      if (event.keyCode == 27) {
        closeContextMenu();
      }
    }

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEsc);
    };
  });

  useEffect(() => {
    function handleAltKeydown({ key }) {
      if (key === "Alt" && isContextMenuOpen) {
        setContextMenuItems(generateContextMenuItems(true));
      }
    }
    function handleAltKeyup({ key }) {
      if (key === "Alt" && isContextMenuOpen) {
        setContextMenuItems(generateContextMenuItems(false));
      }
    }

    document.addEventListener("keydown".handleAltKeydown);
    document.addEventListener("keyup".handleAltKeyup);

    return () => {
      document.removeEventListener("keydown".handleAltKeydown);
      document.removeEventListener("keyup".handleAltKeyup);
    };
  });

  const openContextMenu = (event) => {
    event.preventDefault();

    clickPosition.x = event.clientX;
    clickPosition.y = event.clientY;

    setIsContextMenuOpen(true);
  };
  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  return (
    <a
      onClick={(event) => {
        event.preventDefault();
      }}
      onContextMenu={openContextMenu}
      href="/"
      className={`relative p-4 rounded-md ${bgClasses} duration-200 group ${classes}`}
    >
      <div className="relative">
        <PlaylistCover url={coverUrl} />
        <PlaylistPlayBtn />
      </div>
      <PlaylistTitle title={title} />
      <PlaylistDescription description={description} />

      {isContextMenuOpen && (
        <PlaylistContextMenu
          ref={contextMenuRef}
          menuItems={contextMenuItems}
          classes="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10"
        />
      )}
    </a>
  );
}

export default Playlist;

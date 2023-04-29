import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";

import { useState, useRef, useLayoutEffect } from "react";

const clickPosition = { x: null, y: null };

function Playlist({ coverUrl, title, description, classes }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const bgClasses = isContextMenuOpen
    ? "bg-[#272727]"
    : "bg-[#181818] hover:bg-[#272727]";

  function updateContextMenuPosition() {
    contextMenuRef.current.style.top = `${clickPosition.y}px`;
    contextMenuRef.current.style.left = `${clickPosition.x}px`;
  }

  useLayoutEffect(() => {
    if (isContextMenuOpen) {
      updateContextMenuPosition();
    }
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

  const menuItems = [
    { label: "Add to Your Library" },
    {
      label: "Share",
      subMenuItems: [
        { label: "Copy link to playlist" },
        { label: "Embed playlist" },
      ],
    },
    { label: "About recommendations" },
    { label: "Open in Desktop app" },
  ];

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
          onClose={closeContextMenu}
          menuItems={menuItems}
          classes="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10"
        />
      )}
    </a>
  );
}

export default Playlist;

import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";

import useMenu from "../hooks/useContextMenu";
import { useEffect, useLayoutEffect, useState } from "react";

function Playlist({
  coverUrl,
  title,
  description,
  classes,
  toggleSrolling,
  showToast,
  showPopover,
}) {
  const [menuItems, setMenuItems] = useState(generateMenuItems);

  const menu = useMenu(menuItems);

  function generateMenuItems(isAlternate = false) {
    return [
      {
        label: "Add to Your Library",
        action: () => {
          menu.close();
          showPopover();
        },
      },
      {
        label: "Share",
        subMenuItems: [
          {
            label: isAlternate ? "Copy Spotify URI" : "Copy link to playlist",
            classes: "min-w-[150px]",
            action: () => {
              navigator.clipboard.writeText(title).then(() => {
                menu.close();
                showToast("Link copied to clipboard");
              });
            },
          },
          { label: "Embed playlist" },
        ],
      },
      { label: "About recommendations" },
      { label: "Open in Desktop app" },
    ];
  }

  useLayoutEffect(() => {
    toggleSrolling(!menu.isOpen);
  });

  useEffect(() => {
    if (!menu.isOpen) return;

    function handleAltKeydown({ key }) {
      if (key === "Alt") setMenuItems(generateMenuItems(true));
    }
    function handleAltKeyup({ key }) {
      if (key === "Alt") setMenuItems(generateMenuItems(false));
    }

    document.addEventListener("keydown".handleAltKeydown);
    document.addEventListener("keyup".handleAltKeyup);

    return () => {
      document.removeEventListener("keydown".handleAltKeydown);
      document.removeEventListener("keyup".handleAltKeyup);
    };
  });

  const bgClasses = menu.isOpen
    ? "bg-[#272727]"
    : "bg-[#181818] hover:bg-[#272727]";

  return (
    <a
      onClick={(event) => {
        event.preventDefault();
      }}
      onContextMenu={menu.open}
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
          ref={menu.ref}
          menuItems={menu.items}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </a>
  );
}

export default Playlist;

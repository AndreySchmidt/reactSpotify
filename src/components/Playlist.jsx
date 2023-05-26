import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";
import useMenu from "../hooks/useContextMenu";
import { useLayoutEffect, useState } from "react";
import useEvent from "../hooks/useEvent";
import TheModalRecomendations from "./TheModalRecomendations";

function Playlist({
  coverUrl,
  title,
  description,
  classes,
  toggleSrolling,
  showToast,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(generateMenuItems);

  const menu = useMenu(menuItems);

  function generateMenuItems(isAlternate = false) {
    return [
      {
        label: "Add to Your Library",
        action: () => {
          menu.close();
          document.querySelector("nav a:nth-child(4)").click();
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
      {
        label: "About recommendations",
        action: () => {
          menu.close();
          openModal();
        },
      },
      { label: "Open in Desktop app" },
    ];
  }

  useLayoutEffect(() => {
    toggleSrolling(!menu.isOpen);
  });

  useEvent("keydown", handleAltKeydown, menu.isOpen);
  useEvent("keyup", handleAltKeyup, menu.isOpen);

  function handleAltKeydown({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems(true));
  }
  function handleAltKeyup({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems(false));
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

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
      {isModalOpen && <TheModalRecomendations onClose={closeModal} />}
    </a>
  );
}

export default Playlist;

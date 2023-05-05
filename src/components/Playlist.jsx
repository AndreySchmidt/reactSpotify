import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";

import useContextMenu from "../hooks/useContextMenu";

function Playlist({ coverUrl, title, description, classes, toggleSrolling }) {
  const {
    bgClasses,
    openContextMenu,
    isContextMenuOpen,
    contextMenuRef,
    contextMenuItems,
  } = useContextMenu(toggleSrolling);

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
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </a>
  );
}

export default Playlist;

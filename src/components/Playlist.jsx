import PlaylistCover from "./PlaylistCover";
import PlaylistPlayBtn from "./PlaylistPlayBtn";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";

function Playlist({ coverUrl, title, description, classes }) {
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
      href="/"
      className={classes}
    >
      <div className="relative">
        <PlaylistCover url={coverUrl} />
        <PlaylistPlayBtn />
      </div>
      <PlaylistTitle title={title} />
      <PlaylistDescription description={description} />
      <PlaylistContextMenu
        menuItems={menuItems}
        classes="absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10 hidden group-hover:block"
      />
    </a>
  );
}

export default Playlist;

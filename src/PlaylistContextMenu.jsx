function PlaylistContextMenu() {
  return (
    <ul className="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default">
      <li>
        <button className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
          Copy link to playlist
        </button>
      </li>
      <li>
        <button className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
          Embed playlist
        </button>
      </li>
    </ul>
  );
}

export default PlaylistContextMenu;

function PlaylistContextMenuItem({
  children: label,
  onMouseEnter: closePreviousSubmenuIfOpen,
}) {
  return (
    <li onMouseEnter={() => closePreviousSubmenuIfOpen(null)}>
      <button className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center">
        {label}
      </button>
    </li>
  );
}

export default PlaylistContextMenuItem;

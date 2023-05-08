function PlaylistContextMenuItem({
  children: label,
  classes,
  onClick: handleClick,
  onMouseEnter: closePreviousSubmenuIfOpen,
}) {
  return (
    <li onMouseEnter={() => closePreviousSubmenuIfOpen(null)}>
      <button
        onClick={handleClick}
        className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center ${classes}`}
      >
        {label}
      </button>
    </li>
  );
}

export default PlaylistContextMenuItem;

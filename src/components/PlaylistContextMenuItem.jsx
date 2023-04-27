import { ChevronRightIcon } from "@heroicons/react/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";

function PlaylistContextMenuItem({ children: label, subMenuItems }) {
  let classes = "";
  let classesBtn =
    "w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default";
  let icon = null;
  let subMenu = null;

  if (subMenuItems) {
    let classes = "relative";
    let classesBtn = `${classesBtn} flex justify-between items-center`;
    let icon = <ChevronRightIcon className="h-4 w-4" />;
    let subMenu = (
      <PlaylistContextMenu
        menuItems={subMenuItems}
        classes="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default"
      />
    );
  }

  return (
    <li className={classes}>
      <button className={classesBtn}>
        {label} {icon}
      </button>
      {subMenu}
    </li>
  );
}

export default PlaylistContextMenuItem;

import BaseBtn from "./BaseBtn";

function BasePopover() {
  return (
    <div className="fixed top-[227x] left-[200px] z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 min-w-[330px] select-none">
      <h3 className="text-lg font-bold mb-2 ">Create a playlist</h3>
      <p className="text-xs">Log in to create and share playlists.</p>
      <div className="mt-6 text-right">
        <BaseBtn>Not now</BaseBtn>
        <BaseBtn primary>Log in</BaseBtn>
      </div>
      <div className="w-20 h-20 absolute -top-4 -left-20 flex justify-end items-center overflow-hidden pointer-events-none">
        <div className="w-3 h-3 bg-[#0e72ea] shadow-3xl translate-x-1/2 rotate-45 pointer-events-auto"></div>
      </div>
    </div>
  );
}

export default BasePopover;

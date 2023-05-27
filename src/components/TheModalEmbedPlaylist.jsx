import BaseModal from "./BaseModal";
import BaseBtn from "./BaseBtn";
import BaseCheckbox from "./BaseCheckbox";

function TheModalEmbedPlaylist({ onClose: handleClose }) {
  return (
    <BaseModal classes="w-[660px] bg-neutral-900" onClose={handleClose}>
      <h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed">
        Embet
      </h1>
      <div className="py-6 px-8 text-neutral-500 text-[13px]">
        Text for
        <a href="/" className="text-white font-bold hover:underline">
          link
        </a>
        modal
      </div>
      <div className="flex justify-end items-center gap-4 pb-6 px-8">
        <BaseCheckbox id="checkbox">Show code</BaseCheckbox>
        <BaseBtn accent>Copy</BaseBtn>
      </div>
    </BaseModal>
  );
}

export default TheModalEmbedPlaylist;

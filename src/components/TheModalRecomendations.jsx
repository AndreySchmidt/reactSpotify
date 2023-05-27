import BaseModal from "./BaseModal";

function TheModalRecomendations({ onClose: handleClose }) {
  return (
    <BaseModal classes="h-80 w-[480px] bg-[#333]" onClose={handleClose}>
      <h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
        Title
      </h1>
      <div className="py-6 px-8 overflow-y-auto">Text for modal</div>
    </BaseModal>
  );
}

export default TheModalRecomendations;

function BaseCheckbox({ children: label, id }) {
  return (
    <div className="inline-flex items-center gap-2">
      <input
        id={id}
        classname="text-[#1bd760] bg-transparent border-neutral-500 rounded-sm hover:border-[#1bd760] !ring-0 !ring-offset-0 checked:bg-checkbox"
        type="checkbox"
      />
      {label && (
        <label htmlFor={id} className="text-sm text-neutral-400">
          {label}
        </label>
      )}
    </div>
  );
}

export default BaseCheckbox;

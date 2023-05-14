import { useRef } from "react";

function NavItem({ classes, icon, key: label, onClick }) {
  const labelRef = useRef();

  function handleClick(event) {
    if (!onClick) return;

    event.preventDefault();
    onClick(labelRef);
    // onClick(event.currentTarget);
  }

  return (
    <a key={label} href="/" className={classes} onClick={handleClick}>
      {icon}
      <span ref={labelRef} className="ml-4 text-sm font-semibold">
        {label}
      </span>
    </a>
  );
}

export default NavItem;

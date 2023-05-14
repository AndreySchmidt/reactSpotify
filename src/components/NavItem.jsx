function NavItem({ classes, icon, key: label, onClick }) {

function handleClick(event){
  if(!onClick) return;

  event.preventDefault();
  onClick(event.currentTarget);
}

  return (
    <a key={label} href="/" className={classes} onClick={handleClick}>
      {icon}
      <span className="ml-4 text-sm font-semibold">{label}</span>
    </a>
  );
}

export default NavItem;

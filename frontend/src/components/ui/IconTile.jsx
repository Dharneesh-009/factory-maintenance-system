const IconTile = ({ icon: Icon, tone = "primary", size = 20 }) => (
  <span className={`ui-icon-tile ui-icon-tile--${tone}`} aria-hidden="true">
    <Icon size={size} />
  </span>
);

export default IconTile;

import IconTile from "./IconTile";

const formatValue = (value) => (value === null || value === undefined ? "—" : value);

const StatCard = ({ label, value, description, icon, tone = "primary" }) => (
  <article className="ui-stat">
    <div className="ui-stat__top">
      <span className="ui-stat__label">{label}</span>
      {icon && <IconTile icon={icon} tone={tone} />}
    </div>
    <div className="ui-stat__value">{formatValue(value)}</div>
    {description && <div className="ui-stat__description">{description}</div>}
  </article>
);

export default StatCard;

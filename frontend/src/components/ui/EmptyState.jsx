import IconTile from "./IconTile";

const EmptyState = ({ icon, tone = "neutral", title, description, action }) => (
  <div className="ui-empty">
    {icon && <IconTile icon={icon} tone={tone} size={22} />}
    <div className="ui-empty__title">{title}</div>
    {description && <p className="ui-empty__description">{description}</p>}
    {action}
  </div>
);

export default EmptyState;

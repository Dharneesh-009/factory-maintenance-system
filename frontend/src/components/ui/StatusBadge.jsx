const StatusBadge = ({ tone = "neutral", children }) => (
  <span className={`ui-badge ui-badge--${tone}`}>{children}</span>
);

export default StatusBadge;

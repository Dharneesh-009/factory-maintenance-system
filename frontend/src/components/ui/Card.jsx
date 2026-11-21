const Card = ({
  title,
  description,
  actions,
  children,
  className = "",
  bodyClassName = "",
}) => {
  const hasHeader = Boolean(title || description || actions);

  return (
    <section className={["ui-card", className].filter(Boolean).join(" ")}>
      {hasHeader && (
        <header className="ui-card__header">
          <div>
            {title && <h2 className="ui-card__title">{title}</h2>}
            {description && (
              <p className="ui-card__description">{description}</p>
            )}
          </div>
          {actions && <div className="ui-card__actions">{actions}</div>}
        </header>
      )}
      <div className={["ui-card__body", bodyClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </section>
  );
};

export default Card;

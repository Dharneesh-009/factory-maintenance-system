const PageHeader = ({ title, description, actions }) => (
  <div className="ui-page-header">
    <div>
      <h1 className="ui-page-header__title">{title}</h1>
      {description && (
        <p className="ui-page-header__description">{description}</p>
      )}
    </div>
    {actions && <div className="ui-page-header__actions">{actions}</div>}
  </div>
);

export default PageHeader;

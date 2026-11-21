const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  type = "button",
  className = "",
  children,
  ...rest
}) => {
  const classes = ["ui-btn", `ui-btn--${variant}`, `ui-btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;

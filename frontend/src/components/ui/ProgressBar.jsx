const clampPercent = (value, max) => {
  if (!max || !Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
};

const ProgressBar = ({ value = 0, max = 100, tone = "primary", label }) => {
  const percent = clampPercent(value, max);

  return (
    <div
      className="ui-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <div
        className={`ui-progress__bar ui-progress__bar--${tone}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;

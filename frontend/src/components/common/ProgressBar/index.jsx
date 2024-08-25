const ProgressBar = ({ icon, filename, progress }) => {
  const baseClassName = "progress-bar";

  return (
    <div className={`${baseClassName}`}>
      <div className={`${baseClassName}__icon-wrapper`}>{icon}</div>
      <div className={`${baseClassName}__filename`}>{filename}</div>
      <div className={`${baseClassName}__percentage`}>{`${progress}%`}</div>
      <div className={`${baseClassName}__meter`}>
        <div
          className={`${baseClassName}__fill`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

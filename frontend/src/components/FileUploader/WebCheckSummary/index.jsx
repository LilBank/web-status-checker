import { formatTime } from "../../../utils/stringUtils";

const WebCheckSummary = ({ webStatus, totalTime }) => {
  const totalWebsites = webStatus.total;
  const totalAvailable = webStatus.up;
  const totalDown = webStatus.down;
  const { minutes, seconds } = formatTime(totalTime);
  const baseClassName = "webcheck-summary";

  return (
    <article className={`${baseClassName}`}>
      <header className={`${baseClassName}__header`}>
        <h1>{`Total ${totalWebsites} Websites`}</h1>
        <p>{`(Used ${minutes} minute(s) and ${seconds} second(s))`}</p>
      </header>
      <ul className={`${baseClassName}__list-status`}>
        <div className={`${baseClassName}__status ${baseClassName}__status--up`}>
          <div>UP</div>
          <div>{totalAvailable}</div>
        </div>
        <div className={`${baseClassName}__status ${baseClassName}__status--down`}>
          <div>Down</div>
          <div>{totalDown}</div>
        </div>
      </ul>
    </article>
  );
};

export default WebCheckSummary;

import useLoadingStore from "../../stores/useLoadingStore";
import ProgressBar from "../common/ProgressBar";
import FileDropZone from "./FileDropZone/index.jsx";
import CSVFileIcon from "../../assets/icons/csv-file.svg?react";
import WebCheckSummary from "./WebCheckSummary/index.jsx";
import useWebCheckStore from "../../stores/useWebCheckStore.js";

const FileUploader = () => {
  const webStatus = useWebCheckStore((state) => state.webStatus);
  const duration = useWebCheckStore((state) => state.duration);
  const progress = useLoadingStore((state) => state.progress);
  const loading = useLoadingStore((state) => state.loading);
  const filename = useLoadingStore((state) => state.filename);
  const isFetched = webStatus.total || 0;
  const fileUploaderClassName = "file-uploader";

  const FileUploaderMain = () => {
    return (
      <div className={`${fileUploaderClassName}__main`}>
        <header className={`${fileUploaderClassName}__title`}>
          <h1>Websites Checker</h1>
        </header>
        <FileDropZone baseClassName={fileUploaderClassName} />
      </div>
    );
  };

  const FileUploaderFooter = () => {
    return (
      <div className={`${fileUploaderClassName}__footer`}>
        {loading ? (
          <ProgressBar
            icon={<CSVFileIcon />}
            filename={filename}
            progress={progress}
          />
        ) : isFetched ? (
          <WebCheckSummary
            webStatus={webStatus}
            totalTime={duration}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <section className={`${fileUploaderClassName}`}>
      <FileUploaderMain />
      <FileUploaderFooter />
    </section>
  );
};

export default FileUploader;

import { csvToArray, readFileAsText } from "../../../utils/fileUtils";
import { fetchWithProgress } from "../../../utils/fetchUtils";
import useLoadingStore from "../../../stores/useLoadingStore";
import useWebCheckStore from "../../../stores/useWebCheckStore";
import CSVFileIcon from "../../../assets/icons/csv-file.svg?react";
import InputButton from "./InputButton";
import InputDescription from "./InputDescription";
import InputDivisor from "./InputDivisor";

const FileDropZone = ({ baseClassName }) => {
  const loading = useLoadingStore((state) => state.loading);
  const setUrls = useWebCheckStore((state) => state.setUrls);
  const setWebStatus = useWebCheckStore((state) => state.setWebStatus);
  const setDuration = useWebCheckStore((state) => state.setDuration);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setFilename = useLoadingStore((state) => state.setFilename);
  const setProgress = useLoadingStore((state) => state.setProgress);
  const clearLoading = useLoadingStore((state) => state.clearLoading);

  const handleDrop = async (event) => {
    event.preventDefault();

    if (loading) {
      window.alert("Please wait for the previous process to complete.");
      return;
    }

    const items = event.dataTransfer.items;
    const isSingleItem = items.length === 1;

    if (!isSingleItem) {
      window.alert("Please only input a single file.");
      return;
    }

    const item = items[0];
    const isCSV = item.getAsFile().type === "text/csv";

    if (!isCSV) {
      window.alert("Please only input a a CSV file type.");
      return;
    }

    const file = item.getAsFile();
    const csv = await readFileAsText(file);
    const tempUrls = csvToArray(csv);

    setFilename(file.name);
    setLoading(true);
    setUrls(tempUrls);

    try {
      const [response, duration] = await fetchWithProgress(
        `${import.meta.env.VITE_BACKEND_BASE_URL}api/check-urls`,
        tempUrls,
        setProgress
      );
      setWebStatus(response);
      setDuration(duration);
    } catch (error) {
      window.alert(error);
    }

    setUrls([]);
    clearLoading();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const Actionable = () => {
    return (
      <div
        className={`${baseClassName}__input-wrapper`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <CSVFileIcon />
        <InputDescription baseClassName={baseClassName} />
        <InputDivisor baseClassName={baseClassName} />
        <InputButton baseClassName={baseClassName} />
      </div>
    );
  };

  return <Actionable />;
};

export default FileDropZone;

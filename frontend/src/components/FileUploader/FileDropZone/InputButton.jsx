import { csvToArray, readFileAsText } from "../../../utils/fileUtils";
import { fetchWithProgress } from "../../../utils/fetchUtils";
import useLoadingStore from "../../../stores/useLoadingStore";
import useWebCheckStore from "../../../stores/useWebCheckStore";

const InputButton = ({ baseClassName }) => {
  const loading = useLoadingStore((state) => state.loading);
  const setUrls = useWebCheckStore((state) => state.setUrls);
  const setWebStatus = useWebCheckStore((state) => state.setWebStatus);
  const setDuration = useWebCheckStore((state) => state.setDuration);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setFilename = useLoadingStore((state) => state.setFilename);
  const setProgress = useLoadingStore((state) => state.setProgress);
  const clearLoading = useLoadingStore((state) => state.clearLoading);

  const handleChange = async (event) => {
    const file = event.target.files[0];
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
    event.target.value = null;
  };

  return (
    <label
      className={`${baseClassName}__input-button
        ${loading ? ` ${baseClassName}__input-button--disabled` : ""}`}
    >
      <input
        type="file"
        className={`${baseClassName}__input`}
        accept=".csv"
        onChange={handleChange}
        disabled={loading}
      />
      Browse File
    </label>
  );
};

export default InputButton;

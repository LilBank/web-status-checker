import axios from 'axios';

export const fetchWithProgress = async (endpoint, urls, setProgress) => {
  const startTime = performance.now();

  try {
    const response = await axios.post(endpoint, { urls }, {
      onUploadProgress: progressEvent => {
        const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        setProgress(progress);
      }
    });

    const endTime = performance.now()
    const duration = endTime - startTime;
    await new Promise(resolve => setTimeout(resolve, 1200));

    return [response.data, duration];
  } catch (error) {
    // TODO: Log to file
    console.error('Error uploading file:', error);
    throw error;
  }
};

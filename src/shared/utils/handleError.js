export default function handleError(err, setError) {
  if (typeof err.response?.data?.details === 'string') {
    setError(err.response.data.message);
  } else if (err.response?.data?.details) {
    const details = err.response.data.details;
    const errorMessages = Object.values(details).filter(Boolean).join(".\n");
    setError(errorMessages);
  } else {
    if (err.response.data.message) setError(err.response.data.message);
    else setError("An unexpected error occurred.");
  }
}

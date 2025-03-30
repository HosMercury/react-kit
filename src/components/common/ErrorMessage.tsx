const ErrorMessage = ({ message }: { message: string }) => {
  if (message === "") return null;
  return (
    <div className="bg-red-500 text-white p-2 mb-3 rounded">{message}</div>
  );
};

export default ErrorMessage;

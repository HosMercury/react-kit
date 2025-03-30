const ErrorMessages = ({ errors }: { errors: string[] }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="bg-red-500 text-white p-2 mb-3 rounded-md">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorMessages;

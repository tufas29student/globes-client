// components/ErrorState.jsx
const ErrorState = ({ error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 p-8 rounded-xl">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    </div>
  );
};

export default ErrorState;

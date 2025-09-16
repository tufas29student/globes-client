// components/LoadingState.jsx
const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-center">טוען נתוני מניות...</p>
      </div>
    </div>
  );
};

export default LoadingState;

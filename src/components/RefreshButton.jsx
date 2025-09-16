// components/RefreshButton.jsx
const RefreshButton = ({ fetchData }) => {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={fetchData}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        רענן נתונים
      </button>
    </div>
  );
};

export default RefreshButton;

export default function Custom500() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-6xl font-bold text-red-600">500</h1>
          <p className="mt-4 text-xl text-gray-800">Server-side error occurred</p>
          <p className="mt-2 text-gray-600">
            {"We're sorry, but something went wrong on our end"}.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
  
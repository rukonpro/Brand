export default function Custom404() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-7xl font-bold text-blue-600">404</h1>
          <p className="mt-4 text-xl text-gray-800">
            Oops! Page not found.
          </p>
          <p className="mt-2 text-gray-600">
          {"  The page you are looking for doesn't exist or may have been moved."}
          </p>
          <a
            href="/"
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none"
          >
            Go back to Home
          </a>
          <a
            href="/"
            className="mt-4 text-blue-600 hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }
  
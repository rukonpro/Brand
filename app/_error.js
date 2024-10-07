function Error({ statusCode }) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-6xl font-bold text-red-600">
            {statusCode || "Error"}
          </h1>
          <p className="mt-4 text-xl text-gray-800">
            {statusCode
              ? `An error ${statusCode} occurred on the server.`
              : "An error occurred on the client."}
          </p>
          <p className="mt-2 text-gray-600">
           {" We're sorry, but something went wrong."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none"
          >
            Reload Page
          </button>
          <a
            href="/"
            className="mt-4 text-blue-600 hover:underline"
          >
            Go back to Home
          </a>
        </div>
      </div>
    );
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  };
  
  export default Error;
  
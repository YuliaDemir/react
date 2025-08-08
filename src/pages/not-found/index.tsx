import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-blue-800 p-6">
      <h1 className="text-8xl font-semibold mb-4">404</h1>
      <p className="text-xl mb-6">
        The path was not found! but I don't think you really needed it.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
      >
        Back to the Future
      </Link>
    </div>
  );
};

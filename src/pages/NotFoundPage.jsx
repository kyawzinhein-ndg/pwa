import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/home"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}

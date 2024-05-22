import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center p-16 h-[92vh]">
      <div className="flex flex-col text-center gap-6 max-w-md">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto"/>
        <h2 className="font-extrabold text-9xl text-slate-200">
          404
        </h2>
        <p className="text-2xl md:text-3xl dark:text-gray-300">
          Sorry, we couldn&apos;t find this page.
        </p>
        <Link
          to="/"
          className="px-8 py-4 text-xl font-semibold rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
import { appwrite, github, twitter, react } from "../icons";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/todos");
  };

  return (
    <>
      {/* Hero */}
      <section className="container h-screen mx-auto flex">
        <div className="flex flex-col mx-auto justify-center p-6 text-center">
          <p className="my-8 text-2xl font-medium">Introducing</p>
          <h1 className="text-9xl font-bold">toTooooDoooo</h1>
          <p className="my-8 text-2xl font-medium">
            A Simple To-do App built with {appwrite(8)} Appwrite and {react(8)}{" "}
            React
          </p>
          <button
            onClick={handleClick}
            className="mx-auto mt-4 py-5 px-24 font-semibold text-2xl rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Links */}
      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8 flex">
        <div className="rounded-full mx-4 transition duration-200 ease-in-out transform hover:-translate-y-3 hover:scale-125 hover:shadow-4xl">
          <a href="http://github.com/appwrite/appwrite">{github(10)}</a>
        </div>
        <div className="rounded-full mx-4 transition duration-200 ease-in-out transform hover:-translate-y-3 hover:scale-125 hover:shadow-2xl">
          <a href="https://twitter.com/appwrite_io">{twitter(10)}</a>
        </div>
        <div className="rounded-full mx-4 transition duration-200 ease-in-out transform hover:-translate-y-3 hover:scale-125 hover:shadow-2xl">
          <a href="http://appwrite.io">{appwrite(10)}</a>
        </div>
      </section>
    </>
  );
};

export default Landing;

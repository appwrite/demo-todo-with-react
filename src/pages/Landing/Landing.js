import { appwrite, github, twitter, react } from '../icons';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/todos');
  };

  const links = [
    {
      href: 'http://github.com/appwrite/appwrite',
      icon: github(10),
    },
    {
      href: 'https://twitter.com/appwrite_io',
      icon: twitter(10),
    },
    {
      href: 'http://appwrite.io',
      icon: appwrite(10),
    },
  ];

  return (
    <>
      <section className="container h-screen mx-auto flex">
        <div className="flex flex-col mx-auto justify-center p-6 text-center">
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">Introducing</p>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold">RainyDo</h1>
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">
            A Simple To-do App provided by RainySystems
          </p>
          <button
            onClick={handleClick}
            className="mx-auto mt-4 py-3 lg:py-5 px-10 lg:px-24 text-lg md:text-2xl font-semibold  rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
            Jump in!
          </button>
        </div>
      </section>
    </>
  );
};

export default Landing;

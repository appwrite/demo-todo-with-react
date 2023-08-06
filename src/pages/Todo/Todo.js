import { useState } from 'react';
import api from '../../api/api';
import { FetchState, useGetTodos } from '../../hooks';
import { Server } from '../../utils/config';
import Alert from '../Alert/Alert';
import TodoItem from './TodoItem';
import { Permission, Role } from 'appwrite';

const Todo = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ todos, isLoading, isError }] = useGetTodos(stale);
  const [currentTodo, setCurrentTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();

    // Trim the input to remove leading and trailing spaces
    const trimmedTodo = currentTodo.trim();

    if (trimmedTodo === '') {
      setErrorMessage('Todo must be added');
      return;
    }

    const data = {
      content: trimmedTodo,
      isComplete: false,
    };

    try {
      await api.createDocument(Server.databaseID, Server.collectionID, data, [
        Permission.read(Role.user(user['$id'])),
        Permission.write(Role.user(user['$id'])),
      ]);
      setStale({ stale: true });
      setCurrentTodo('');
      setErrorMessage(''); // Reset the error message on successful addition
    } catch (e) {
      console.error('Error in adding todo');
    }
  };

  const handleLogout = async (e) => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  return (
    <>
      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
            📝 <br /> &nbsp; toTooooDoooos
          </div>

          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
              placeholder="🤔   What to do today?"
              value={currentTodo}
              onChange={(e) => {
                setCurrentTodo(e.target.value);
                setErrorMessage(''); // Reset the error message on input change
              }}
            ></input>
          </form>

          {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
          {isLoading && <h1> Loading .... </h1>}

          <ul>
            {todos.map((item) => (
              <TodoItem key={item['$id']} item={item} setStale={setStale} />
            ))}
          </ul>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
        <button
          onClick={handleLogout}
          className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
        >
          Logout 👋
        </button>
      </section>
    </>
  );
};

export default Todo;

import { useState } from 'react';
import api from '../../api/api';
import { FetchState, useGetTodos } from '../../hooks';
import Alert from '../Alert/Alert';
import TodoItem from './TodoItem';
import { Permission, Role } from 'appwrite';

const Todo = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ todos, isLoading, isError }] = useGetTodos(stale);
  const [currentTodo, setCurrentTodo] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    // console.log('Adding Todo');
    const data = {
      content: currentTodo,
      isComplete: false,
    };
    // console.log(data, user);
    try {
      await api.createDocument(data, [
        Permission.read(Role.user(user['$id'])),
        Permission.write(Role.user(user['$id'])),
      ]);
      setStale({ stale: true });
      setCurrentTodo('');
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
      <section className="container flex flex-col h-screen max-w-xl max-h-screen px-3 mx-auto">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="p-16 my-auto text-center rounded-lg">
          <div className="text-3xl font-bold md:text-5xl lg:text-6xl">
            📝 <br /> &nbsp; toTooooDoooos
          </div>

          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              className="w-full px-6 py-4 my-8 text-xl transition duration-200 ease-in-out transform border-0 rounded-lg shadow-md focus:ring-2 focus:ring-gray-800 hover:-translate-y-1 hover:scale-110 hover:shadow-xl"
              placeholder="🤔   What to do today?"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            ></input>
          </form>

          {isLoading && <h1> Loading .... </h1>}

          <ul>
            {todos.map((item) => (
              <TodoItem key={item['$id']} item={item} setStale={setStale} />
            ))}
          </ul>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 px-6 py-3 mb-8 mr-8">
        <button
          onClick={handleLogout}
          className="px-12 py-3 mx-auto mt-4 font-semibold text-gray-900 bg-white border border-gray-900 rounded-lg shadow-md text-md hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
        >
          Logout 👋
        </button>
      </section>
    </>
  );
};

export default Todo;

import api from '../../api/api';
import { Server } from '../../utils/config';
import { deleteButton } from '../icons';

const TodoItem = ({ item, setStale }) => {
  const handleComplete = async (e, item) => {
    // console.log('Marking Todo as complete');
    let data = {
      isComplete: !item['isComplete'],
    };
    try {
      // console.log(item);
      await api.updateDocument(Server.databaseID, Server.collectionID, item['$id'], data);
      setStale({ stale: true });
    } catch (e) {
      console.error('Error in marking todo as complete');
    }
  };

  const handleDelete = async (e, item) => {
    // console.log('Deleting Todo');
    try {
      await api.deleteDocument(Server.databaseID, Server.collectionID, item['$id']);
      setStale({ stale: true });
    } catch (e) {
      console.error('Error in deleting todo');
    }
  };

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <input
          type="checkbox"
          className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-125"
          checked={item['isComplete']}
          onChange={(e) => handleComplete(e, item)}
        />
        <div className={`capitalize ml-3 text-md font-medium ${item['isComplete'] ? 'line-through' : ''}`}>
          {item['content']}
          <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
            {item('priority')}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => handleDelete(e, item)}
        className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125">
        {deleteButton}
      </button>
    </li>
  );
};

export default TodoItem;

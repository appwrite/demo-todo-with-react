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
      await api.updateDocument(
        item["$id"],
        data,
        item["$permissions"]
      );
      setStale({ stale: true });
    } catch (e) {
      console.error('Error in marking todo as complete');
    }
  };

  const handleDelete = async (e, item) => {
    // console.log('Deleting Todo');
    try {
      await api.deleteDocument(
        item['$id']
      );
      setStale({ stale: true });
    } catch (e) {
      console.error('Error in deleting todo');
    }
  };

  return (
    <li className="flex items-center justify-between px-4 mt-4">
      <div className="flex">
        <input
          type="checkbox"
          className="w-6 h-6 text-green-500 transition duration-75 ease-in-out transform border-4 border-green-200 rounded-md focus:ring-0 hover:scale-125"
          checked={item['isComplete']}
          onChange={(e) => handleComplete(e, item)}
        />
        <div
          className={`capitalize ml-3 text-md font-medium ${
            item['isComplete'] ? 'line-through' : ''
          }`}
        >
          {item['content']}
        </div>
      </div>
      <button
        onClick={(e) => handleDelete(e, item)}
        className="transition duration-75 ease-in-out transform focus:outline-none hover:scale-125"
      >
        {deleteButton}
      </button>
    </li>
  );
};

export default TodoItem;

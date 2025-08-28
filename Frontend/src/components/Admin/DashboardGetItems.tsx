import { useQuery } from '@tanstack/react-query';
import api from '../../config/Axios/axios.config';
import Logout from '../Authentication/Logout';
import DeleteData from '../Data/DeleteData';

interface Note {
  _id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  favourite: boolean;
  userId: string;
  createdAt: string;
}

const DashboardGetItems = () => {
  const fetchNotes = async () => {
    const response = await api.get<Note[]>('/auth/admin'); 
    return response.data;
  };

  const { data: notes, isPending, isError, error } = useQuery({
    queryKey: ['adminNotes'],
    queryFn: fetchNotes,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <ul className="space-y-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-600">By User: {note.userId}</p>
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p>{note.body}</p>
              <p className="text-sm text-gray-600">Category: {note.category}</p>
              <p className="text-sm text-gray-600">
                Tags: {note.tags.join(', ') || 'None'}
              </p>
              <p className="text-sm text-gray-600">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Favourite: {note.favourite ? 'Yes' : 'No'}
              </p>
              <DeleteData id={note._id} /> 
            </li>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </ul>
      <Logout />
    </div>
  );
};

export default DashboardGetItems;
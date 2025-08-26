import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  tags: string[];
  body: string;
  favourite: boolean;
  category: string;
  userId: string;
  createdAt: string; 
  updatedAt: string;
}

// Axios instance for API calls (best practice: reuse across app)
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Fetch notes function (best practice: separate API logic)
const fetchNotes = async (): Promise<Note[]> => {
  const response = await api.get('/notes');
  return response.data.note; // Return array of notes
};

const NotesList = () => {
  const { data: notes, isPending, isError, error } = useQuery({
    queryKey: ['notes'], 
    queryFn: fetchNotes, 
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>

      {/* Handle loading state */}
      {isPending && <p className="text-gray-500">Loading notes...</p>}

      {/* Handle error state */}
      {isError && (
        <p className="text-red-500">
          Error fetching notes: {error?.message || 'Something went wrong'}
        </p>
      )}

      {notes && notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note._id} className="border p-4 rounded shadow">
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
            </li>
          ))}
        </ul>
      ) : (
        !isPending && <p className="text-gray-500">No notes found.</p>
      )}
    </div>
  );
};

export default NotesList;
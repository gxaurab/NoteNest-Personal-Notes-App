
import { queryClient } from "../../main"
import { useMutation } from '@tanstack/react-query';
import api from '../../config/Axios/axios.config';

interface DeleteDataProps {
  id: string;
}

const DeleteData = ({ id }: DeleteDataProps) => {

  const deleteItem = async (noteId: string) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: deleteItem, 
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['notes', 'adminNotes'] });
    },
    onError: () => {
      alert('Error deleting note');
    },
  });

  const handleDelete = () => {
    mutation.mutate(id); // Use prop id
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="text-xl bg-red-500 text-white p-2 rounded hover:bg-red-600"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default DeleteData;
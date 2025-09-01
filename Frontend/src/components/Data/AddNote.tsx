import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddNote, type AddNoteType } from "../../config/zod/schema";
import { useMutation } from "@tanstack/react-query";
import api from "../../config/Axios/axios.config";
import { useAuthStore } from "../../store/authStore";
import { queryClient } from "../../main";

const AddData = () => {
  const { _id } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<AddNoteType>({
    resolver: zodResolver(AddNote),
  });

  const postData = async (data: AddNoteType & { userId: string }) => {
    const response = await api.post("/notes", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  });

  const onSubmit = (data: AddNoteType) => {
    if (!_id) {
      console.error("User ID is missing");
      return; 
    }
    const fullData = { ...data, userId: _id }; 
    mutation.mutate(fullData);
  };

  return (
    <div>
      Add Note
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input {...register("title")} className="border" />
        {errors.title?.message && <span className="text-red-500">{errors.title.message}</span>}

        <label htmlFor="tags">Tags</label>
        <input {...register("tags")} />
        {errors.tags?.message && <span className="text-red-500">{errors.tags.message}</span>}

        <label htmlFor="body">Body</label>
        <input {...register("body")} />
        {errors.body?.message && <span className="text-red-500">{errors.body.message}</span>}

        <label htmlFor="category">Category</label>
        <input {...register("category")} className="border" />
        {errors.category?.message && <span className="text-red-500">{errors.category.message}</span>}

        <button type="submit">Create Note</button>

        {errors.root?.message && <span className="text-red-500">{errors.root.message}</span>}
      </form>
    </div>
  );
};

export default AddData;
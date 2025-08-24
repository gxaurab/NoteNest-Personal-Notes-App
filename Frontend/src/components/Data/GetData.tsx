// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"

// const GetData = () => {
    
//     const {data, error, isPending,isError, refetch} = useQuery({queryKey: ['notes'], queryFn: fetchNotes})
    
//     const fetchNotes =()=>{
//         try {
//             const data = axios.get()
//         } catch (error) {
            
//         }
//     }

//     if(isPending){ return <span> Loading ...</span>}
//     if(isError){ return <span> Error: {error.message}</span>}
  
//     return (
//     <div>GetData



//     </div>
//   )
// }

// export default GetData
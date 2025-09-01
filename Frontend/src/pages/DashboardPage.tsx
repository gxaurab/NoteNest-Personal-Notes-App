import AddData from "../components/Data/AddNote"
import GetData from "../components/Data/GetData"


const DashboardPage = () => {


  return (
    <div className="mt-10">
      
      
      <h1 className="text-sm text-red-500"> Didn't really gave importance to making dashboard</h1>
      <section className="flex flex-col gap-5">
        <AddData/>
        <GetData/>
      </section>
    </div>
  )
}

export default DashboardPage
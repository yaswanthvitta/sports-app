import { API_ENDPOINT } from "../../config/constants";
import { Link } from "react-router-dom";



const  FetchMatch = async(id : number)  => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data)
      return(
        <>
           <Link
            key={data.id}
            to={`${data.id}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              {data.name}
            </h5>
          </Link>
        </>
      )
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  }

  export default FetchMatch
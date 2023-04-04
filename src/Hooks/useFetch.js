import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
    const [adminData, setadminData] = useState([]);
const [response, setResponse] = useState('');


useEffect(() => {
  axios.get(url)
  .then((res) => {
    setadminData(res.data)
    setResponse(res.data.message)
  }).catch((err) => {
    setResponse(err.response.data.message)
  })
},[url])
  return {adminData, response}
}

export default useFetch
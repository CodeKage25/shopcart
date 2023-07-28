import axios from 'axios';


const API_URL = 'v1'



async function httpGetProducts(queryParams) {
  const response = await axios.get(`${API_URL}/products`, {
      param: queryParams
    })
    return await response.json()
  }


export {
    httpGetProducts
}  

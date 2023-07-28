const API_URL = 'v1'


async function httpGetProducts() {
    const response = await fetch(`${API_URL}/products`)
    return await response.json()
  }


export {
    httpGetProducts
}  

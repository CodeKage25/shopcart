import { useCallback, useEffect, useState } from "react";

import { httpGetProducts } from './requests'


function useProducts() {
    const [products, setProducts] = useState([])

    const getProducts = useCallback(async () => {
        const fetchedProducts = await httpGetProducts();
        setProducts(fetchedProducts)
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return products;
    
};



export default useProducts;
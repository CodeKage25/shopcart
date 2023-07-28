import { useCallback, useEffect, useState } from "react";

import { httpGetProducts } from './requests'


function useProducts(queryParams) {
    const [products, setProducts] = useState([])

    const getProducts = useCallback(async () => {
        const fetchedProducts = await httpGetProducts(queryParams);
        setProducts(fetchedProducts)
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return products;
    
};



export default useProducts;
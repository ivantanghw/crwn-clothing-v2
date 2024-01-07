import { createContext, useState} from "react";

//whatever name for the variable
import PRODUCTS from '../shop-data'

// initialize context
export const ProductsContext = createContext({
    products: [],
});

// Provider of context - set value
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}
import { createContext, useState, useEffect} from "react";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

//whatever name for the variable
// import SHOP_DATA from '../shop-data.js'

// initialize context
export const CategoriesContext = createContext({
    categoriesMap: {},
  });

// Provider of context - set value
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
/*
    useEffect(() => {
    addCollectionAndDocuments('collections', SHOP_DATA);
    }, []);
*/
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []); //[] means run only when this ProductsProvider gets mounted

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
        {children}
        </CategoriesContext.Provider>
    );
};
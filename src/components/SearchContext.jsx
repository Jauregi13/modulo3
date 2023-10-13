import { createContext, useContext, useState } from "react"


const SearchContext = createContext()

export const useSearchContext = () => {
    return useContext(SearchContext)
}


export const SearchProvider = ({children}) => {

    const [query, setQuery] = useState('')

    const updateQuery = (query) => {
        setQuery(query)
    }

    return (
        <SearchContext.Provider value={{updateQuery,query}}>
            {children}
        </SearchContext.Provider>
    )
}
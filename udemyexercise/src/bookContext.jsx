import { createContext, useState } from 'react';



  export const BookContext=createContext();
export const Provider=({children})=>{
    const [count,setCount]=useState(0)

    const increment=()=>{
        setCount(count+1)
    }
const value={
    count,
    increment
}
    return (<BookContext.Provider value={value}>
        {children}
    </BookContext.Provider>)
}

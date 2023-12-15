// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useState, useEffect } from 'react';

const PokemonList = () => {
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');

    const fetchData = async () => {
        try {
            const res = await fetch(nextPage);
            const newData = await res.json();
            setData((prevData) => [...prevData, ...newData.results]);
            setNextPage(newData.next);
        } catch(e) {
            console.log(e)
        }
    }

    const handleLoadMore = () => {
        fetchData(nextPage);
    };

    useEffect(() => {
        fetchData();
      }, []);
    

    return (
        <div role='list'>
        {data.map((obj, index) => {
            return(
            <li key={index} role='listitem'>{obj.name}</li>
            
            ) 

        })}
         <button onClick={handleLoadMore} role='button'>Load More</button>
         
        </div>
    )
};

export default PokemonList;

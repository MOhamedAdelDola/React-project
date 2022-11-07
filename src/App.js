import { useState , useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './pagination';

function App() {
  const [pokemon,setPokemon] = useState();
  const [currentPage , setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPage,setNextPage] = useState();
  const [prevPage,setPervPage] = useState();
  const [loading,setLoading] = useState(true);




  useEffect( () =>{
    setLoading(true)
    let cancel
    axios.get(currentPage,{
      cancelToken : new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPage(res.data.next)
      setPervPage(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel();
  },[currentPage])

  function goToNextPage(){
    setCurrentPage(nextPage)
  }
  function goToPrevPage(){
    setCurrentPage(prevPage)
  }
  if (loading) return "Loading Please wait ......"


  return (
    // because we are returning two components and the return return one item or component
    // it is an empty html element 
    <> 
    <PokemonList pokemon={pokemon} />
    <Pagination 
      goToNextPage ={nextPage ? goToNextPage : null}
      goToPrevPage ={prevPage ? goToPrevPage : null}
    />
    </>
  );
}

export default App;

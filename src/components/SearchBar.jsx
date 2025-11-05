import {useState, useEffect} from 'react'
import setsPtHGSS from "../data/PtHGSS.json"
import setsBW from "../data/BW.json"
import Table from '../components/Table'

const SearchBar = ({version}) => {
  const [search, setSearch] = useState(""); // [variable de estado, función que actualiza la variable de estado]
  const [sets, setSets] = useState(setsPtHGSS)
  const [filteredSets, setFilteredSets] = useState([]); // sets es el valor inicial de filteredSets

  const setsNames = {
    "PtHGSS": setsPtHGSS,
    "BW": setsBW,
  }

  useEffect(() => {
    const timeout = setTimeout(() => { // setTimeout(() => {código para filtrar los sets}, tiempo después de dejar de escribir para ejecutar el código)
      const searchCriteria = search.split(",").map(c => c.trim().toLowerCase()).filter(c => c.length > 0); // si escribo "Gengar, Shadow Ball", los criterios de búsqueda son "gengar" y "shadow ball"
      const filteredItems = sets.filter((set) => 
        searchCriteria.every(criterion =>
          Object.entries(set).some(([key, value]) => {
            if (key == "EVs") return false
            else if (typeof value === "string") {
              return value.toLowerCase().includes(criterion)
            }
            else if (Array.isArray(value)) {
              return value.some(v => v.toLowerCase().includes(criterion))
            }
            else return false
          })
        )
      )
      setFilteredSets(filteredItems)
    }, 200); // espera 200ms tras dejar de escribir
    return () => clearTimeout(timeout); // limpia el timeout si el usuario sigue escribiendo (cleanup function)
  }, [search]); // useEffect(función, array con las variables que se usan en la función)
  // sin useEffect, el código se ejecuta cada vez que se renderiza el componente, lo que puede causar problemas
  // al usar useEffect, el código se ejecuta solo cuando cambian las dependencias

  useEffect(() => {
    setSets(setsNames[version])
  }, [version])

  useEffect(() => {
    const searchCriteria = search.split(",").map(c => c.trim().toLowerCase()).filter(c => c.length > 0);
    const filteredItems = sets.filter((set) => 
      searchCriteria.every(criterion =>
        Object.entries(set).some(([key, value]) => {
          if (key == "EVs") return false
          else if (typeof value === "string") {
            return value.toLowerCase().includes(criterion)
          }
          else if (Array.isArray(value)) {
            return value.some(v => v.toLowerCase().includes(criterion))
          }
          else return false
        })
      )
    )
    setFilteredSets(filteredItems)
  }, [sets])

  return (
    <>
      <div id="search-bar">
          <input
              type="text"
              spellCheck="false"
              placeholder="Search by Pokémon, item, move, nature, trainer..."
              value={search} // hace el texto introducido en el input sea la variable de estado search
              onChange={(e) => setSearch(e.target.value)}
              // e es el evento que se produce al cambiar el valor del input; e.target es el elemento donde tiene lugar el evento (en este caso, <input>); e.target.value devuelve la propiedad value del input, que es el texto que hay en el input en ese momento
          />
      </div>

      <Table rows={
        (filteredSets.length > 350) ? ["Use the search bar to filter the data."] :
        (filteredSets.length == 0) ? ["No results found."] :
        filteredSets
      }/>
    </>
  )
}

export default SearchBar
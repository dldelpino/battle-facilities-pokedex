import {useState} from "react"
import SearchBar from "./components/SearchBar"
import Header from "./components/Header"

const App = () => {
  const [version, setVersion] = useState("PtHGSS")
  return (
    <>
      <Header version={version} setVersion={setVersion}/>
      <SearchBar version={version}/>
    </>
  );
};

export default App;
const Header = ({version, setVersion}) => {
  const versionNames = ["PtHGSS", "BW"]
  return (
    <header>
        <div id="header-left">
          <div id="button-group">
            {versionNames.map((versionName) => (
              <button 
                key={versionName} // me lo pide la consola
                onClick={() => setVersion(versionName)} 
                className={version == versionName ? "button-selected" : "button-not-selected"}
              >
                {versionName}
              </button>
            ))}
          </div>
        </div>
        <div id="title">
            <img src="icon.png"/>
            Battle Facilities Pokédex
        </div>
        <div id="header-right">
            <a href="https://github.com/dldelpino/battle-frontier-pokedex" target="_blank"><img src="github.png"/></a>
        </div>
    </header>
  )
}

export default Header
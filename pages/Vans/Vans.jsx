import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = React.useState([]);

  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  React.useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const displayVans = typeFilter 
  ? vans.filter(van=> van.type === typeFilter)
  : vans;
  const vanElements = displayVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* <Link to={`/vans/${van.id}`}>            absolute path */}
      <Link to={van.id}>                      { /* realtive path */}
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">        
        <button className={`van-type simple ${typeFilter==="simple"? "selected": null}`} onClick={()=>setSearchParams({type: "simple"})}>Simple</button>
        <button className={`van-type luxury ${typeFilter==="luxury"? "selected": null}`} onClick={()=>setSearchParams({type: "luxury"})}>Luxury</button>
        <button className={`van-type rugged ${typeFilter==="rugged"? "selected": null}`} onClick={()=>setSearchParams({type: "rugged"})}>Rugged</button>
        {typeFilter && <button className="van-type clear-filters" onClick={()=>setSearchParams({})}>Clear filter</button>}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

        // Other Ways to add setsearch pararms are below

        // <Link to="?type=simple" className="van-type simple">Simple</Link>
        // <Link to="?type=rugged" className="van-type rugged">Rugged</Link>
        // <Link to="?type=luxury" className="van-type luxury">Luxury</Link>
        // <Link to="." className="van-type clear-filters">Clear</Link>

        
        // <button className="van-type simple" onClick={()=>setSearchParams("?type=simple")}>Simple</button>
        // <button className="van-type luxury" onClick={()=>setSearchParams("?type=luxury")}>Luxury</button>
        // <button className="van-type rugged" onClick={()=>setSearchParams("?type=rugged")}>Rugged</button>
        // <button className="van-type clear-filters" onClick={()=>setSearchParams(".")}>Clear filter</button>
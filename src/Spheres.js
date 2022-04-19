import React from 'react'
import Sphere from './Sphere'
import locations from './countryLocation.json'

const Spheres = () => {

  return (
    <>
      {locations.map(p => 
        <>
          <Sphere key={p.lat * p.long * Math.random()} points1={locations} lat1={p.lat}
          continent={p.continent} lng={p.long} name={p.name} /> 
        </>
      )}
    </>
  )
}

export default Spheres
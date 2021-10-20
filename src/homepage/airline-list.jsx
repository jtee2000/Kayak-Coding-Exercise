import React, { useEffect, useState } from 'react';
import '../stylesheets/airline-list.css';


export const AirlineList = () => {
  const [airplaneData, setAirplaneData] = useState([])
  const [oneworld, setOneWorld] = useState(false)
  const [skyTeam, setSkyTeam] = useState(false)
  const [starAlliance, setStarAlliance] = useState(false)
  let [filterKey, setFilterKey] = useState([])
  const allianceMap = {'OW': 'Oneworld', 'ST': 'Sky Team', 'SA': 'Star Alliance', 'None': ''}
  useEffect(() => {
    setAirplaneData(window.airplaneData);
  }, [])
  useEffect(() => {
    performStateUpdates('OW')
  }, [oneworld])
  useEffect(() => {
    performStateUpdates('ST')
  }, [skyTeam])
  useEffect(() => {
    performStateUpdates('SA')
  }, [starAlliance])

  const performStateUpdates = (alliance) => {
    let key
    switch (alliance) {
      case 'OW':
        key = oneworld
        break
      case 'ST':
        key = skyTeam
        break
      case 'SA':
        key = starAlliance
        break
      default: 
        key = undefined
    }
    if (key) {
      filterKey.push(alliance)
      const filteredData = window.airplaneData.filter((item) => (filterKey.length > 0 ? filterKey.includes(item.alliance) : true))
      setAirplaneData(filteredData)
    } else {
      const index = filterKey.indexOf(alliance)
      filterKey.splice(index, 1)
      const filteredData = window.airplaneData.filter((item) => (filterKey.length > 0 ? filterKey.includes(item.alliance) : true))
      setAirplaneData(filteredData)
    }
  }

  const onChange = (alliance) => {
    switch (alliance) {
      case 'oneworld':
        setOneWorld(!oneworld)
        break
      case 'skyTeam': 
        setSkyTeam(!skyTeam)
        break
      case 'starAlliance':
        setStarAlliance(!starAlliance)
        break
      default:
        break
    }
  }

  const mouseEnter = (index) => {
    console.log('reached here')
    console.log(document.getElementById(`hiddenElements-${index}`))
    document.getElementById(`hiddenElements-${index}`).style.display = "inline"
  }

  const mouseLeave = (index) => {
    console.log('reached here')
    document.getElementById(`hiddenElements-${index}`).style.display = 'none'

  }

  const airlineTiles = airplaneData.map( (airline, index) => {
    return (
      <div className="airline-tile" key={`airline-${index}`} onMouseEnter={() => mouseEnter(index)} onMouseLeave={() => mouseLeave(index)}>
        <div className="airplane-content flex">
          <img src={`https://kayak.com${airline.logoURL}`} className="logo"/>
          <div style={{textAlign: 'left'}}>
            <div className="airplane-name">{airline.name}</div> 
            <div className="hidden" id={`hiddenElements-${index}`}>
              <div className="alliance-name">{allianceMap[airline.alliance]}</div>
              <div className="alliance-name">{airline.phone}</div>
              <div className="airline-website">{airline.site.replace('https://', '').replace('www.', '')}</div>
            </div>
          </div>
        </div>
      </div>
    )
  })
    return (
      <div className="airline-content-container">
        <h1 className="title">Airlines</h1>
        <h3 className="filter">Filter by Alliances</h3>
        <div className="flex" style={{marginLeft: 8}}>
          <div className="alliance-select-container">
            <input type="checkbox" id="oneworld" onChange={() => onChange('oneworld')} value={oneworld}/>
            <label htmlFor="oneworld">Oneworld</label>
          </div>
          <div className="alliance-select-container">
            <input type="checkbox" id="skyTeam" onChange={() => onChange('skyTeam')} value={skyTeam}/>
            <label htmlFor="skyTeam">Sky Team</label>
          </div>
          <div className="alliance-select-container">
            <input type="checkbox" id="starAlliance" onChange={() => onChange('starAlliance')} value={starAlliance}/>
            <label htmlFor="starAlliance">Star Alliance</label>
          </div>
        </div>
        <div className="airline-tile-container">
          {airlineTiles}
        </div>
      </div>
    );
}
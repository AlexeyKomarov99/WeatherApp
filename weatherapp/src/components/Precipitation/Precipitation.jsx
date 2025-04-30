import React from 'react';
//===== assets =====//
import './Precipitation.scss';
import { GiWaterDrop as WaterDropIcon } from "react-icons/gi";

const Precipitation = ({forecastData}) => {

  const precip_mm = forecastData?.current?.precip_mm;
  // let precipPerDay = 0;
  // const precipPerHour = 
  //   forecastData?.forecast?.forecastday[0]?.hour.forEach(hour => {
  //     precipPerDay += hour.precip_mm
  // })

  const precipPerHour = 
    forecastData?.forecast?.forecastday[0]?.hour.map(hour => {
      return {
        precip_mm: hour.precip_mm,
      }
    }
  )



  // const precipPerDay = precipPerHour.reduce((acc, precip) =>
  //   acc + precip.precip_mm, 0
  // )

  console.log(forecastData);
  console.log(precipPerHour);
  // console.log('sum', )
  // console.log(precipPerDay);

  return (
    <section className='Precipitation'>
      <div className="Precipitation__header">
        
      </div>
    </section>
  )
}

export default Precipitation;
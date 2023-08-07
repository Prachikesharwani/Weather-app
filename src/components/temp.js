// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=c1b87adcd9322cbe35f5e6b0669f2a7e
import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import "./style.css"

const Temp = () => {
    const[searchValue,setSearchValue]=useState("allahabad")
    const[tempInfo,setTempInfo]= useState({});

    const getWeatherinfo= async()=>{ 
        try{
         let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c1b87adcd9322cbe35f5e6b0669f2a7e`;

         const res=await fetch(url);
         const data=await res.json();
         const {temp, humidity, pressure}=data.main;
         const{main:weathermood}=data.weather[0];
         const {name}=data;
         const{speed}=data.wind;
         const{country ,sunset}=data.sys;

         const myNewWeatherInfo={
            temp, humidity, pressure,weathermood, name,speed,country,sunset
         };
         setTempInfo(myNewWeatherInfo);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
     getWeatherinfo();
    })
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm'
                    value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                    <button className='searchButton' type='button' onClick={getWeatherinfo}>Search</button>
                </div>
            </div>

            {/* our temp card */}
            <Weathercard tempInfo={tempInfo}/>
        </>
    );
};

export default Temp;

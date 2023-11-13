import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "../style/Home.css"
import Card from "./Card.jsx"
import loading from "../assets/loading.gif"
const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newsdata,setnewdata] = useState([]);
    const [search,setsearch] = useState();
    const [cregion,setcregion]=useState("india");
    const region=(selectedRegion)=>{
        setcregion(selectedRegion);
        console.log(selectedRegion);
        datafetch(selectedRegion);
     }
    const datafetch=async(selectedRegion)=>{
        try{
           if(selectedRegion==undefined){
            selectedRegion="india";
           }
           const currentDate = new Date().toISOString().split('T')[0];
           console.log(currentDate)
            setIsLoading(true);
            const data= await fetch(`https://newsapi.org/v2/everything?q=${selectedRegion}&from=2023-10-13&sortBy=publishedAt&apiKey=500cafdb64b24b88b972543da1db1c87`);
            const Datas = await data.json();
            setnewdata(Datas.articles);
            console.log(Datas);
        }catch(err){
            console.log(err);
        }finally{
       setIsLoading(false)
       setsearch("")
        }
    }
   const category=(categories)=>{
    const query=categories+" "+cregion;
    datafetch(query)
   }
   const searching=()=>{
    datafetch(search)
   }
    useEffect(() => {
     datafetch()
    }, [])
    
  return (
    <>
    <div className="main">
    <nav>
        <div className="title">
        <h4>DailyMinds📜</h4>
        </div>
        <div className="location">
            <span>region: </span>
            <select name="region" id="newregion" onChange={(e)=>{region(e.target.value)}}>
            <option value="india">India</option>
            <option value="america">US</option>
            <option value="china">China</option>
            <option value="japan">Japan</option>
            <option value="pakistan">Pakistan</option>
            </select>
        </div>
    </nav>
    <div className="searching">
        <div className="inputsearch">
            <input type="text" placeholder='Search for news...' value={search} onChange={(e)=>{
                setsearch(e.target.value);
            }}  onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searching();
                        }
                    }}/>
        </div>
        <div className="category">
            <button onClick={()=>{
                category("Health")
            }}>Health</button>
            <button onClick={()=>{
                category("Entertainment")
            }}>Entertainment</button>
            <button onClick={()=>{
                category("Cricket")
            }}>Cricket</button>
            <button onClick={()=>{
                category("Science")
            }}>Science</button>
            <button onClick={()=>{
                category("Business")
            }}>Business</button>
        </div>
    </div>
    {
        isLoading?(<div className='loading'><img className='loadingimg' src={loading} alt="loading.." /></div>):
    <div className="cardmain">
    {
        newsdata.map((i,index)=>{
            return(
                <Card id={index} title={i.title} img={i.urlToImage} des={i.description} readm={i.url} />
            )
        })
    }
    </div>
    }
    </div>
    </>
  )
}

export default Home

import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1.5%;  
  padding-left: 2%;
  
`;
// const config = {
//   headers: {
//     "Content-Type": "application/json"
//     },
//     withCredentials: true
//   }
const config = {
  withCredentials: true
}
const Home = ({type}) => {
  const [videos, setvideos]= useState([]);
  
  useEffect(()=>{
    const fetchdata= async ()=>{
      //console.log('c1')
      const res= await axios.get(`http://localhost:8800/api/video/${type}`)
      //console.log(res.data)

      // let response = await fetch('http://localhost:8800/api/video/random', {
      //       method: "GET",
      //       headers: {
      //           'Content-Type': 'application/json',
      //       }
      //   })
      // const data= await  response.json();
      
      setvideos(res.data);
    }
    
    fetchdata();
    
  },[type])
  
  return (
    <Container>
      {videos.map((video)=>(<Card key={video._id} video={video}></Card>))}
      
    </Container>
  );
};

export default Home;

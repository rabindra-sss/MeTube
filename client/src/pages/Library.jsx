import React from 'react'
import styled, { ThemeProvider } from "styled-components";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

const Container = styled.div`
    
  padding-left: 2%;
  
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex-wrap: wrap;
    gap: 1.5%; 
    padding: 2%;
`
const Label = styled.h3`
    display: flex;
    align-items:center;
    justify-content: start;
    padding: 5px;
    color: ${({theme})=>theme.text};
`
const Items= styled.div`
    display: flex;
    justify-content: start;
    overflow-x: scroll;
`

export default function Library() {
    const [videos, setvideos]= useState([]);
    
  useEffect(()=>{
    const fetchdata= async ()=>{
      //console.log('c1')
      const res= await axios.get(`http://localhost:8800/api/video/your-videos`)
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
  },[])

  return (
    <Container>
        <Section>
            <Label>Your Videos</Label>
            <Items>
            {videos? videos.map((video)=>{
            return <Card type= "sm" key={video._id} video= {video}/>
        }) 
        : "you don't have any videos"
    }
            </Items>
        </Section>
        <Section>
            <Label>History</Label>
            <Items></Items>
        </Section>
        <Section>
            <Label>Liked Videos</Label>
            <Items></Items>
        </Section>

        
    </Container>
  )
}

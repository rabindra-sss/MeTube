import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios'
import Card from '../components/Card';
import {useLocation} from 'react-router-dom'
const container= styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    z-index: 500;
`

export default function SearchPage() {
    const [videos, setVideos]= useState([]);

    const query = useLocation().search;
    //console.log(query)

    useEffect(()=>{
        const fetchVideos = async()=>{
            const res= await axios.get(`http://localhost:8800/api/video/search${query}`)
            setVideos(res.data);
        };
        fetchVideos();
    },[query])

  return (
    <container>
        {videos.map((video)=>{
            return <Card type="none" video={video}></Card>
        })}
    </container>
  )
}

import React from 'react'
import styled from "styled-components";

import Card from './Card';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const Container = styled.div`
  flex: 2;
`;
const Label = styled.h3`
    display: flex;
    align-items:center;
    justify-content: start;
    padding: 5px;
    color: ${({theme})=>theme.text}
`
export default function Recommendation({tags}) {
    const [videos, setVideos]= useState([]);

    useEffect(()=>{
        const fetchVideos = async()=>{
            const res= await axios.get(`http://localhost:8800/api/video/tags?tags=${tags}`)
            setVideos(res.data);
        };
        fetchVideos();
    },[tags])
  return (
    <Container>
        <Label>Related Videos</Label>
        {videos.map((video)=>{
            return <Card type= "sm" key={video._id} video= {video}/>
        })}
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}
    </Container>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from 'timeago.js';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};    //360px
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  padding: 1%;
  
  @media screen and (max-width: 800px) {
    width: ${(props) => props.type !== "sm" && "54vw"};
  }
  
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};  //120px : 202px
  background-color: #999;
  border-radius: 1cap;
  border: 1px solid ${({ theme }) => theme.soft};
  flex: 1;

  &:hover {
    border: ${({ theme }) => "1px solid green"};
  }

  @media screen and (max-width: 800px) {
    height: ${(props) => (props.type === "sm" ? "18vw" : "30vw")};
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};

  &:hover {
    width: 38px;
  height: 38px;
  margin-right: -2px;
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => {if(theme.text=="white") return "#b4f8b4"
      return "#045a04";
     }};
}
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setchannel]= useState({});

  useEffect(()=>{
    const fetchChannel= async ()=>{
      //console.log('2')
      const res= await axios.get(`https://metube-1.onrender.com/api/user/find/${video.userId}`)
      setchannel(res.data);
    }
     
    fetchChannel();
    
  },[video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.thumbnail}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.userName}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

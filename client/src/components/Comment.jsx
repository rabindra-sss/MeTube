import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from 'axios'
import avatarimg from '../img/image.png'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  const [channel, setchannel]= useState({});
  useEffect(()=>{
    const fetchdata = async()=>{
      const res = await axios.get(`http://localhost:8800/api/user/find/${comment.userId}`)
      setchannel(res.data)
    }
    fetchdata();
  },[comment.userId])

  //console.log(channel)
  return (
    <Container>
      <Avatar src={channel.img || avatarimg} />
      <Details>
        <Name>
          {channel.userName} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.content}
        </Text>
      </Details>
        
    </Container>
  );
};

export default Comment;

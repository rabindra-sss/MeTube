import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from 'axios'
import avatarimg from '../img/image.png'

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #3c3cbd;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 5px 10px;
  cursor: pointer;
`

const Comments = () => {
  const {currentUser}= useSelector((state)=> state.user);
  //console.log(currentUser)
  const {currentVideo}= useSelector((state)=> state.video);
  //console.log('video is')
  //console.log(currentVideo)
  
  const [comments, setcomments]= useState([]);
  const [comment, setcomment] = useState(null);

  useEffect(()=>{
    const fetchcomments= async ()=>{
      const res= await axios.get(`http://localhost:8800/api/comment/${currentVideo._id}`)
      setcomments(res.data.comments);
    }
    fetchcomments();
  },[currentVideo]);

  const handleComment = async()=>{
    const res= await axios.post(`http://localhost:8800/api/comment/`, {userId: currentUser, videoId: currentVideo, content: comment})
    const newcomment = res.data;
    setcomments([...comments , newcomment]);
  }
  
  //console.log(comments)
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser ? currentUser.img : avatarimg} />
        <Input type="text" placeholder="Add a comment..." onChange={(e)=>setcomment(e.target.value)}/>
        {comment && <Button onClick={handleComment} >Post</Button>}
      </NewComment>
      {
        comments.map((comment)=>{
          return <Comment key={comment._id} comment={comment}/>
        })
      }
    </Container>
  );
};

export default Comments;

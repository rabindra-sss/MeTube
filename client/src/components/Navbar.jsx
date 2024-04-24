import React, { useState } from "react";
import styled from "styled-components";
import MeTubeimg from "../img/Metubeimg.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../redux/UserSlice";
import Upload from "./Upload.jsx";
import SearchPage from "../pages/Search.jsx";

import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index:500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 2%;
  position: relative;

`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};

  padding: 5px 8px;

`;
const Img = styled.img`
  height: 25px;
  border-radius: 8px;
`;
const Search = styled.div`
  width: 40%;
  /* position: absolute; */
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #5df05d;
  color: #5df05d;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 800px) {
    padding: 2px 6px;
    font-size: 12px;
  }
`;

const User = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
 font-weight: 500;
 color: ${({ theme }) => theme.text};
`
const Avatar= styled.img`
 width: 32px;
 height: 32px;
 border-radius: 50%;
 background-color: #999;
`
const Navbar = () => {
  const {currentUser} = useSelector(state=> state.user)
  const dispatch= useDispatch();

  const [Open, setOpen] =useState(false);
  //console.log(Open)

  const [q, setQ]= useState("");
  
  const navigate = useNavigate();
  return (
    <>
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex"}}>
          <Logo>
            <Img src={MeTubeimg} />
            MeTube
          </Logo>
        </Link>
        
        <Search >
          <Input placeholder="Search" onChange={(e)=>{setQ(e.target.value)}} />
          <SearchOutlinedIcon onClick={()=>{navigate(`/search?q=${q}`)}}/>
        </Search>
        { currentUser ? 
        (
          <User>
            <VideoCallOutlinedIcon onClick={()=>setOpen(true)}/>
            <Avatar src={currentUser.img}></Avatar>
            {currentUser.userName}
            <Button onClick={()=>dispatch(logout())}>
            LOG OUT
          </Button>
          </User>
        )
        : <Link to="signin" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>}
      </Wrapper>
    </Container>
    {Open && <Upload setOpen={setOpen}></Upload>}
    </> 
  );
};

export default Navbar;

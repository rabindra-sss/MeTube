import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/UserSlice";
import Cookies from 'js-cookie';
import { auth, provider } from "../Firebase";

import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;
const config = {
    withCredentials: true
  }
const SignIn = () => {
  let [credentials, setcredentials]= useState({userId:"", email:"", password:""});
  const navigate= useNavigate();
  // const [userName, setuserName]= useState("");
  // const [email, setemail]= useState("");
  // const [password, setpassword]= useState("");
  useEffect(()=>{
    //console.log(1)
    //console.log(credentials)
  },[credentials])
  const changeEmail= (e)=>{setcredentials({...credentials, email: e.target.value})};
  const chaneUserId = (e)=>{setcredentials({...credentials, userId: e.target.value})};
  const changePassword = (e)=>{setcredentials({...credentials, password: e.target.value})};

  const dispatch= useDispatch();
  
  const handleSignIn= async (e)=>{
    e.preventDefault();
    dispatch(loginStart());
   try{
     const res= await axios.post('http://localhost:8800/api/auth/signin', credentials);
     //console.log(res.data)
     dispatch(loginSuccess(res.data.user));
     navigate('/');

     const token = localStorage.getItem("access_token");
      //console.log('token', token);

   }
   catch(err){
    dispatch(loginFailure());
   }
  }

  const signinwithGoogle= async ()=>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
    .then((result)=>{
       axios.post('http://localhost:8800/api/auth/google',{
        userName: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
          }).then((res)=>{
            dispatch(loginSuccess(res.data.user))
            navigate('/')
          })
      
    }).ctach((error)=>{
        dispatch(loginFailure)
      });

  }
  
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to MeTube</SubTitle>
        <Button onClick={signinwithGoogle}>Sign in with Google</Button>
        <Input placeholder="user Id" onChange={chaneUserId}/>
         <p style={{fontSize: '12px', color: "gray"}}>or</p>
        <Input placeholder="email" onChange={changeEmail}/>
        <Input type="password" placeholder="password" onChange={changePassword} />
        <Button onClick={handleSignIn}>Sign in</Button>
        <Title>New User?</Title>
        <Input placeholder="username" onChange={chaneUserId}/>
        <Input placeholder="email" onChange={changeEmail} />
        <Input type="password" placeholder="password" onChange={changePassword}/>
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;

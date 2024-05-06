import React from "react";
import styled from "styled-components";
import MeTubeimg from "../img/Metubeimg.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";


const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  margin-bottom: 0px;
  /* border: 2px solid black; */
  height: 98vh;
  width: 10vw !important;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  
  top: 2px;
  bottom:0;
  position: sticky;
  
  /* @media screen and (max-width: 400px) {
    width: 30%;
  } */
`;

const Wrapper = styled.div`
  padding: 0px 7%;
  position: relative; 
  height: 100%;
  width: 100%;
  
  margin-bottom: 0;
  
  overflow-y: auto;
  /* scrollbar-color: var(--scrollbar) transparent; */
  scrollbar-width: thin;
  
  font-size: calc(.6em + 0.5vw);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  
`;

const Img = styled.img`
  height: 25px;
  border-radius: 8px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  
  &:hover {
    background-color:  ${({ theme }) => {if(theme.text==="white") return  "green"
      return "#b4f8b4";
     }};
  }
  
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

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
    padding: 1px 3px;
    font-size: 12px;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {if(theme.text==="white") return  "green"
      return "#10a210";
     }};
  margin-bottom: 20px;
  
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>

        <Link to="/" style={{ textDecoration: "none", color: "inherit"}}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Trending
          </Item>
        </Link>

          <Item onClick={()=>{ currentUser ? navigate('/subscriptions') : navigate('/signin')}}>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>

        <Hr />
        <Item onClick={()=>{ currentUser ? navigate('/library') : navigate('/signin')}}>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!currentUser &&
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        }

        <Title>BEST OF METUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />

        <Link to="settings" style={{ textDecoration: "none", color: "inherit" }} >
          <Item >
            <SettingsOutlinedIcon />
            Settings
          </Item>
        </Link>

        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;

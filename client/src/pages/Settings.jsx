import React from 'react'
import styled from "styled-components";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1.5%;  
  padding-left: 2%;
  
`;


const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  color: ${({ theme }) => theme.text};

  
  &:hover {
    background-color:  ${({ theme }) => {if(theme.text=="white") return  "green"
      return "#b4f8b4";
     }};
  }
  
`;
export default function Settings({ darkMode, setDarkMode }) {
    //console.log(darkMode)
  return (
    <Container>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>

    </Container>
  )
}

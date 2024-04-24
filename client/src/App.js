import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import SearchPage from "./pages/Search";
import Library from "./pages/Library";
import Settings from "./pages/Settings";

const Container = styled.div`
  display: flex;
  flex-direction: column;


`;

const Main = styled.div`
  width: 100vw;
  margin-right: 0px;
  display: flex;
  /* flex: 7; */
  background-color: ${({ theme }) => theme.bg};
  border: 2px solid black;
  position: relative;
  
  /* height: 100vh; */
`;
const Wrapper = styled.div`
  padding: 2% 3%;
  /* height: 100vh; */
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>

      <Container>
          <Navbar />
          <Main>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />

            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home  type="trend"/>} />
                  <Route path="subscriptions" element={<Home type="subscriptions"/>} />
                  <Route path="library" element={<Library />} />
                  <Route path="settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode}></Settings>} />


                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="search" element={<SearchPage />} />
                  

                  
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        
      </Container>

      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;

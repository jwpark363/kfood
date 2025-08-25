import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./router/home";
import Header from "./componets/header";
import styled from "styled-components";
import Bottom from "./componets/bottom";
import CodeList from "./router/code_list";
import Recommend from "./router/recommend";

const Box = styled.div`
  margin: 0px auto;
  min-width: 412px;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.background};
`;
function App() {
  return (
    <>
    <Box>
      <div className="Back" />
      <BrowserRouter>
        <Header />
        {/* <Menus /> */}
        <Routes>
          <Route path="/kfood" element={<Home />} />
          <Route path="/kfood/recommend" element={<Recommend />} />
          <Route path="/code" element={<CodeList />} />
        </Routes>
        <Bottom />
      </BrowserRouter>
    </Box>
    </>
  )
}

export default App

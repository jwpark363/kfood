import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./router/home";
import Header from "./componets/header";
import styled from "styled-components";
import CodeList from "./router/code_list";
import Recommend from "./router/recommend";
import { BackImage } from "./componets/styled_components";
import FoodDetail from "./router/food_detail";

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
`;
function App() {
  return (
    <>
    <Box>
    <BackImage $path="/kfood/images/main-back.png"/>
      <BrowserRouter>
        <Header />
        {/* <Menus /> */}
        <Routes>
          <Route path="/kfood" element={<Home />} />
          <Route path="/kfood/detail/:code" element={<FoodDetail />} />
          <Route path="/kfood/recommend" element={<Recommend />} />
          <Route path="/code" element={<CodeList />} />
        </Routes>
      </BrowserRouter>
    </Box>
    </>
  )
}

export default App

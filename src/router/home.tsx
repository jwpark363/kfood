import styled from "styled-components"
import { useEffect, useState } from "react";
import { fetch_food_codes, fetch_food_data, type Food, type FoodData } from "../api";
import { makeRandoms, splitImage } from "../lib/util";
import WebcamCapture from "../componets/webcam";
import { NavLink } from "react-router";
import HowTo from "../componets/howto";

const Box = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    h1{
        margin-top: 12px;
        font-size: 24px;
        font-weight: bold;
    }
    h2{
        margin-top: 12px;
        font-size: 14px;
    }
`;
const SearchBox = styled.div`
    margin-top: 20px;
    padding: 20px 40px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 24px;
    border: 1px dotted gray;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;
const BannerTitle = styled.div`
    margin-top: 24px;
    width: 100%;
    min-width: 400px;
    max-width: 640px;
    display: flex;
    padding-bottom: 12px;
    border-bottom: 1px dotted gray;
    span{
        margin-left: 24px;
    }
`;
const ImageBannerBox = styled.div`
    margin-top: 4px;
    width: 100%;
    min-width: 400px;
    max-width: 640px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
const BannerImage = styled.div<{$path:string}>`
    flex-basis: 23%;
    flex-grow: 1;
    margin: 1%;
    min-width: 240px;
    max-width: 320px;
    width: 100%;
    min-height: 160px;
    max-height: 240px;
    height: 100%;
    background-image: ${props => `url(${props.$path})`};
    background-size: cover;
    background-position: center;
    border-radius: 12px;
`;

export default function Home(){
    // const [_,setFoodData] = useState<FoodData[]>([]);
    const [rFoods,setRFoods] = useState<Food[]>([]);
    useEffect(()=> {
    (async () => {
        const _food_data : FoodData[] = await fetch_food_codes();
        // setFoodData(_food_data.slice(1))
        const imageSize = 2;
        const random_idx = makeRandoms(_food_data.length,imageSize);
        const _rFood = [];
        for(let i = 0;i < imageSize;i++){
            const jsondata = await fetch_food_data(_food_data[random_idx[i]]);
            _rFood.push(jsondata)//jsondata['이미지'].split('/').at(-1)
        }
        setRFoods(_rFood);
    })();
  },[]);
const foodImage = (food : Food) => {
    if(food === null) return '';
    return splitImage(food.image)
}
return(
<Box>
    <h1>음식 사진을 업로드하세요. </h1>
    <h2>AI가 한국 음식을 분석하여 레시피와 관련 요리를 추천해드립니다. </h2>
    <SearchBox>
        <WebcamCapture />
    </SearchBox>
    <HowTo />
    <BannerTitle>
        <span>오늘의 추천 요리</span>
    </BannerTitle>
    <ImageBannerBox>
        {
            rFoods.map((data,i) => 
                <div style={{
                    display:'flex', flexDirection:'column'
                }}>
                    <NavLink to={`/kfood/recommend/${data.code}`} key={i}>
                        <BannerImage $path={`https://www.hansik.or.kr/resources/img/recipe/${foodImage(data)}`} />
                    </NavLink>
                    <span style={{
                        fontSize:'12px',
                        textAlign:'center'
                    }}>{data.menu}</span>
                </div>
            )
        }
    </ImageBannerBox>
</Box>
)
}
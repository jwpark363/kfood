import { useEffect, useState } from "react";
import styled from "styled-components"
import { fetch_food_data_by_code, type Food } from "../api";
import { makeRandoms, splitImage } from "../lib/util";
import { useParams } from "react-router";
import FoodRecipe from "../componets/foodrecipe";
import FoodDesc from "../componets/fooddesc";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    min-width: 420px;
    justify-content: center;
    align-items: center;
`;
const ImageBox = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FoodImage = styled.div<{$path:string}>`
    background-image: ${props => `url(${props.$path})`};
    background-size: cover;
    background-position: center;
    width: 60%;
    height: 240px;
    border-radius: 12px;
`;
export default function FoodDetail(){
    const { code } = useParams();
    const [food,setFood] = useState<Food|null>(null);
    const foodImage = () => {
        if(food === null) return '';
        return splitImage(food.image)
    }
    useEffect(() => {
        (async() => {
            const food_code = code ? code : makeRandoms(100,1)[0]
            const _food = await fetch_food_data_by_code(food_code.toString())
            setFood(_food);
        })()
    },[code])
    return(
        <Box>
            <ImageBox>
                <FoodImage $path={`https://www.hansik.or.kr/resources/img/recipe/${foodImage()}`}></FoodImage>
            </ImageBox>
            <FoodDesc food={food} predict={null}/>
            <FoodRecipe food={food}/>
        </Box>
    )
}
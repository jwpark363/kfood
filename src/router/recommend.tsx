import { useEffect, useState } from "react";
import styled from "styled-components"
import { fetch_food_data_by_code, type Food } from "../api";
import { splitImage, makeRandoms } from "../lib/util";
import { useParams } from "react-router";

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
    margin: 24px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 8px;
    font-size: 18px;
`;
const FoodImage = styled.div<{$path:string}>`
    background-image: ${props => `url(${props.$path})`};
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 240px;
    border-radius: 12px;
`;
const FoodDesc = styled.div`
    margin-top: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    border: 1px dotted gray;
    .head{
        width: 100%;
        padding: 12px;
        background-color: lightgrey;
        display: flex;
        justify-content: space-around;
    }
    .ingredient{
        width: 96%;
        font-size: 14px;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item{
        display: grid;
        grid-template-columns: 1fr 5fr;
        padding: 8px;
        border-bottom: 1px dashed lightgrey;
        line-height: 1.4;
        &:last-child{
            border: none;
        }
    }
`;
const RecipeBox = styled.div`
    margin-top: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    border: 1px dotted gray;
    .head{
        width: 100%;
        padding: 12px;
        background-color: lightgrey;
        display: flex;
        justify-content: center;
    }
    .step{
        width: 100%;
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        .arr{
            cursor: pointer;
            display: flex;
        }
        .right_arr{
            justify-content: end;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
        }
    }
    .contents{
        width: 96%;
        font-size: 14px;
        ul{
            margin: 12px;
            counter-reset: list-item;
            list-style-type: none;
            padding-left: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        li{
            counter-increment: list-item;
            position: relative;
            padding-left: 1em;
            line-height: 1.2;
        }
        li::before{
            content: counter(list-item) ".";
            position: absolute;
            left: 0;
            // 숫자 스타일
        }
    }
`;
const Svg = styled.svg`
    width: 40px;
    height: 40px;
    padding: 8px;
    border: 1px solid grey;
    border-radius: 50%;
`;
export default function Recommend(){
    const { code } = useParams();
    const [recipeStep, setStep] = useState(0);
    const [food,setFood] = useState<Food|null>(null);
    useEffect(() => {
        (async() => {
            const food_code = code ? code : makeRandoms(100,1)[0]
            const _food = await fetch_food_data_by_code(food_code.toString())
            setFood(_food);
        })()
    },[code])
    const handleStep = (step:number) => {
        if(food === null) return;
        const _step = step > 0 ? 1 : step < 0 ? -1 : 0;
        // _step 1
        if(_step == 1){
            if(recipeStep >= food.recipe.length - 1)
                setStep(0)
            else
                setStep(prev => prev + 1)
        }
        //_step -1
        if(_step == -1){
            if(recipeStep === 0)
                setStep(food.recipe.length - 1)
            else
                setStep(prev => prev - 1)
        }
    }
    const foodImage = () => {
        if(food === null) return '';
        return splitImage(food.image)
    }
    const recipeDesc = () => {
        if(food === null) return null;
        // console.log(food instanceof Food);
        if(Array.isArray(food.recipe[recipeStep].desc))
            return food.recipe[recipeStep].desc
        else
            return [food.recipe[recipeStep].desc]
    }
    return(
        <Box>
            <ImageBox>
                <FoodImage $path='https://www.semie.cooking/image/board/cooking/wl/ix/dnpzlhmr/155174454dbej.jpg'></FoodImage>
                <FoodImage $path={`https://www.hansik.or.kr/resources/img/recipe/${foodImage()}`}></FoodImage>
                <span>입력된 이미지</span>
                <span>K-Food Finder 이미지</span>
            </ImageBox>
            <FoodDesc>
                <div className="head">
                    <span>{food && food.menu}</span>
                    <span>92.34%</span>
                </div>
                <div className="ingredient">
                    {food && food.ingredient.map((data,i) =>
                        <div className="item" key={i}>
                            <span>{data.title} 재료</span>
                            <span>{data.ingredients.join(',')}</span>
                        </div>
                    )}
                </div>
            </FoodDesc>
            <RecipeBox>
                <div className="head">
                    <span>한단계씩 따라해보세요.</span>
                </div>
                <div className="step">
                    <div className="arr left_arr">
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" onClick={() => handleStep(-1)}>
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </Svg>
                    </div>
                    <div className="title">
                        <span>Step {recipeStep + 1}. {food && food.recipe[recipeStep].title}</span>
                    </div>
                    <div className="arr right_arr">
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" onClick={() => handleStep(1)}>
                            <path d="M247.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L179.2 256 41.9 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </Svg>
                    </div>
                </div>
                <div className='contents'>
                    <ul>
                    {food && recipeDesc()?.map((data,i) => 
                        <li key={i}>{data}</li>
                    )}
                    </ul>
                </div>
            </RecipeBox>
        </Box>
    )
}
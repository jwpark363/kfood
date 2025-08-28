import styled from "styled-components";
import type { CodeData, Food, Predict } from "../api";
import { NavLink } from "react-router";
import { Svg } from "./styled_components";

const Desc = styled.div`
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
interface FoodParam{
    food:Food | null,
    predict:Predict | null,
    recommend:CodeData[] | null
}
export default function FoodDesc({food,predict,recommend}:FoodParam){
    console.log(predict)
    console.log(recommend)
    return(
        <Desc>
            <div className="head">
                <span>{food && food.menu}</span>
                <span>{predict && `${predict?.probability.toFixed(2)}%`}</span>
            </div>
            <div className="ingredient">
                {food && food.ingredient.map((data,i) =>
                    <div className="item" key={i}>
                        <span>{data.title} 재료</span>
                        <span>{data.ingredients.join(',')}</span>
                    </div>
                )}
                {
                    !recommend ? null : recommend.length == 0 ? null : ( <>
                    <div className="item">
                    <span>추천 K-Food</span>
                    <span>
                    {
                        recommend.map(data => data.kfood_code == '0' ?
                            ` / ${data.name}` :
                            <NavLink to={`/kfood/detail/${data.kfood_code}`}>
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" $size={20} fill="#40c057">
                                    <path d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"/>
                                </Svg>
                                &nbsp;&nbsp;{data.kfood_name}
                            </NavLink>
                        )
                    }
                    </span>
                    </div> </>)
                }
            </div>
        </Desc>
    )
}
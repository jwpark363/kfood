import styled from "styled-components";
import type { CodeData, Food, Predict } from "../api";
import Suggestion from "./suggestion";

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
                <Suggestion recommend={recommend}/>
            </div>
        </Desc>
    )
}
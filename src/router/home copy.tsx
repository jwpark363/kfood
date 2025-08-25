import styled from "styled-components"

const Box = styled.div`
    width: 96%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* align-items: center; */
    /* justify-items: center; */
    gap: 12px;
`;
const Food = styled.div`
    padding: 12px;
    background-color: ${props => props.theme.colors.surface};
`;
const FoodImg = styled.div`
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;
const FoodDesc = styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: 14px;
    color: ${props => props.theme.colors.primaryDark};
`;
export default function Home(){
return(
<Box>
    <Food>
        <FoodImg 
            style={{
                backgroundImage:
                "url('https://www.hansik.or.kr/resources/img/recipe/food006.jpg')"
            }}
        />
        <FoodDesc>
            <span>김밥</span>
        </FoodDesc>
    </Food>
    <Food>
        <FoodImg 
            style={{
                backgroundImage:
                "url('https://www.hansik.or.kr/resources/img/recipe/food012.jpg')"
            }}
        />
        <FoodDesc>
            <span>비빔밥</span>
        </FoodDesc>
    </Food>
    <Food>
        <FoodImg 
            style={{
                backgroundImage:
                "url('https://www.hansik.or.kr/resources/img/recipe/food039.jpg')"
            }}
        />
        <FoodDesc>
            <span>비빔국수</span>
        </FoodDesc>
    </Food>
    <Food>
        <FoodImg 
            style={{
                backgroundImage:
                "url('https://www.hansik.or.kr/resources/img/recipe/food037.jpg')"
            }}
        />
        <FoodDesc>
            <span>호박죽</span>
        </FoodDesc>
    </Food>
</Box>
)
}
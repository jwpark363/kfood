import styled from "styled-components"

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
    width: 94%;
    max-width: 300px;
    height: 200px;
    border-radius: 12px;
`;
const FoodDesc = styled.div`
    margin-top: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    div{
        width: 90%;
        padding: 12px;
        background-color: lightgrey;
        border-radius: 12px;
        display: flex;
        justify-content: space-around;
    }
    div.desc{
        font-size: 14px;
        min-height: 60px;
        line-height: 1.6;
    }
`;
const RecipeBox = styled.div`
    margin-top: 24px;
    width: 72%;
    display: flex;
    flex-direction: column;
    .menu{
        display: flex;
        justify-content: space-around;
        gap: 4px;
        span{
            flex-grow: 1;
            padding: 12px;
            border-radius: 12px;
            background-color: ${props => props.theme.colors.surface};
            text-align: center;
        }
    }
    .contents{
        margin-top: 4px;
        border-radius: 12px;
        width: 100%;
        height: 200px;
        background-color: ${props => props.theme.colors.surface};
    }
`;
export default function Recommend(){
    return(
        <Box>
            <ImageBox>
                <FoodImage $path='https://www.semie.cooking/image/board/cooking/wl/ix/dnpzlhmr/155174454dbej.jpg'></FoodImage>
                <FoodImage $path='https://www.hansik.or.kr/resources/img/recipe/food077.jpg'></FoodImage>
                <span>입력된 이미지</span>
                <span>K-Food Finder 이미지</span>
            </ImageBox>
            <FoodDesc>
                <div><span>요리명</span><span>김치찌게</span></div>
                <div><span>확률</span><span>92.34%</span></div>
                <div className="desc"><span>배추김치 500g, 돼지고기(삼겹살) 200g(또는 돼지갈비 400g), 식용유 4큰술, 물 4컵(1L), 두부 1모(300g), 실파 4½대(45g), 국간장 2큰술, 설탕 1큰술, 소금 약간</span></div>
            </FoodDesc>
            <RecipeBox>
                <div className="menu">
                    <span>레시피</span>
                    <span>추천(재료기반)</span>
                </div>
                <div className='contents'>

                </div>
            </RecipeBox>
        </Box>
    )
}
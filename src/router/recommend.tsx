import { useEffect, useState } from "react";
import styled from "styled-components"
import { fetch_code_map, fetch_food_data_by_code, type CodeData, type Food, type Predict } from "../api";
import { splitImage } from "../lib/util";
import { useLocation } from "react-router";
import axios from "axios";
import FoodDesc from "../componets/fooddesc";
import FoodRecipe from "../componets/foodrecipe";
import { Svg } from "../componets/styled_components";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    min-width: 420px;
    justify-content: center;
    align-items: center;
`;
const ImageBox = styled.div`
    position: relative;
    width: 80%;
    margin: 24px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    gap: 8px;
    font-size: 18px;
`;
const AiImage = styled.div<{$path:string}>`
    background-image: ${props => `url(${props.$path})`};
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 240px;
    border-radius: 12px;
`;
const YourImage = styled.img`
    width: 100%;
    height: 240px;
    border-radius: 12px;
`;
const ImageSvg = styled(Svg)`
    position: absolute;
    top: 10px;
    fill: lightcyan;
`;
interface RecommendParam{
    image:File
}
export default function Recommend(){
    const location = useLocation();
    const image : RecommendParam = location.state?.image
    const [isload,setLoad] = useState(true);
    const [code_map,setCodeMap] = useState<CodeData[]>([]);
    const [predict,setPredict] = useState<Predict|null>(null);
    const [food,setFood] = useState<Food|null>(null);
    const [recommend,setRecommend] = useState<CodeData[]|null>(null);
    const foodImage = () => {
        if(food === null) return '';
        return splitImage(food.image)
    }
    //code map 가져오기
    useEffect(() => {
        (async() => {
            const _code_text = await fetch_code_map()
            const _code_map = JSON.parse(_code_text.replaceAll('NaN','""'))
            setCodeMap(_code_map)
        })()
    },[])
    //이미지 파일을 받아 해당 내용 예측 진행
    useEffect(() => {
        setLoad(true);
        if(!image) return;
        (async()=> {
            const formData = new FormData();
            formData.append('file',Array.isArray(image) ? image[0] : image);
            try {
                const BASE_URL = 'http://127.0.0.1:8000' //로컬 테스트
                // const BASE_URL = 'https://c86e0dd53921.ngrok-free.app' //서버
                const response = await axios.post(`${BASE_URL}/api/predict/`, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Upload successful!', response.data);
                const _predict = response.data;
                // 예측 데이터
                setPredict(_predict)
                // 예측 데이터에 대한 코드맵에서 맵핑 데이터 가져오기
                const find_code = code_map.filter(data => data.code === _predict.class_code)
                const _food_code = (find_code && find_code.length > 0) ? find_code[0] : null;
                if(!_food_code) return;
                // 맵핑 데이터 정보 가져오기
                const _food = await fetch_food_data_by_code(_food_code.kfood_code);
                const _recommend = code_map.filter(data =>
                    _predict.class_code !== data.code && 
                    _food_code.similarity.includes(data.code)
                )
                setFood(_food)
                setRecommend(_recommend);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        })()
        setLoad(false);
    },[image,code_map])
    return(
        <Box>
            <ImageBox>
                <ImageSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" $size={28} style={{left:'10px'}}>
                    <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                </ImageSvg>
                <ImageSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" $size={34} style={{right:'10px'}}>
                    <path d="M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"/>
                </ImageSvg>
                <YourImage src={URL.createObjectURL(image as any)}></YourImage>
                {
                    isload ? <AiImage $path={'/kfood/images/loading.png'}></AiImage> :
                <AiImage $path={`https://www.hansik.or.kr/resources/img/recipe/${foodImage()}`}></AiImage>
                }
            </ImageBox>
            <FoodDesc food={food} predict={predict} recommend={recommend}/>
            <FoodRecipe food={food}/>
        </Box>
    )
}
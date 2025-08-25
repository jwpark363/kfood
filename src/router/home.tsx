import styled from "styled-components"
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetch_food_codes, fetch_food_data, type FoodData } from "../api";
import { makeRandoms } from "../lib/util";

const Box = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: ${props => props.theme.colors.primary};
`;
const SearchBox = styled.div`
    margin-top: 20px;
    width: 90%;
    min-width: 400px;
    max-width: 640px;
    padding: 12px;
    background-color: ${props => props.theme.colors.surface};;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 12px;
    .searchText{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    }
`;
const ImageUploader = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
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
    min-width: 300px;
    max-width: 400px;
    width: 100%;
    min-height: 160px;
    max-height: 240px;
    height: 100%;
    background-image: ${props => `url(${props.$path})`};
    background-size: cover;
    background-position: center;
`;
const LogoBox = styled.div`
    display: flex;
    justify-content: end;
`;
const Logo = styled.div`
    background-image: url('/kfood/images/kfood-logo.png');
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    width: 148px;
    height: 84px;
    border-radius: 12px;
`;
const Svg = styled.svg`
    width: 48px;
    height: 48px;
    fill: #c2255c;
`;
export default function Home(){
    // const [_,setFoodData] = useState<FoodData[]>([]);
    const [rImages,setRImage] = useState<string[]>([]);
    const [file, setFile] = useState<File | File[] | null>(null);
    const handleChange = (selected_file:File|File[]) => {
        setFile(selected_file);
        console.log(selected_file);
    };
    // const getFoodImgUrl = async (food:FoodData) => {
    //     const jsondata = await fetch_food_data(food);
    //     console.log(food);
    //     console.log(jsondata);
    //     return jsondata['이미지'].split('/').at(-1);
    // }
  useEffect(()=> {
    (async () => {
        const csvdata = await fetch_food_codes();
        const _food_data : FoodData[] = [];
        if(csvdata !== null){
            csvdata.split("\n").map(data => {
                const food = data.split(",")
                if(food.length >= 2){
                    const new_food = {
                        code : food[0],
                        name : food[1]
                    }
                    _food_data.push(new_food)
                }
            })
        }
        // setFoodData(_food_data.slice(1))
        const imageSize = 4;
        const random_idx = makeRandoms(_food_data.length,imageSize);
        const _rImage = [];
        for(let i = 0;i < imageSize;i++){
            const jsondata = await fetch_food_data(_food_data[random_idx[i]]);
            _rImage.push(jsondata['이미지'].split('/').at(-1))
        }
        setRImage(_rImage);
    })();
  },[])
//   console.log(food_data);
return(
<Box>
    <SearchBox>
        <LogoBox>
            <Logo />
        </LogoBox>
        <ImageUploader>
            <span>여기로 이미지 파일을 업로드 하세요. </span>
            <FileUploader handleChange={handleChange}
                name="file" multiple={false}
                types={["JPG", "PNG", "GIF"]}
                label="이미지 파일을 업로드하세요!"
            />
            {
                (file && !Array.isArray(file) && <span>( {file.name} )</span>)
            }
        </ImageUploader>
        <NavLink to='/kfood/recommend'>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM305 225c9.4-9.4 9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31-102.1 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l102.1 0-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72z"/>
        </Svg>
        </NavLink>
    </SearchBox>
    <ImageBannerBox>
        {
            rImages.map((img,i) => 
                <BannerImage key={i} $path={`https://www.hansik.or.kr/resources/img/recipe/${img}`}></BannerImage>
            )
        }
    </ImageBannerBox>
</Box>
)
}
import { useRef, useState } from "react";
import styled from "styled-components"

const Box = styled.div`
    width: 96%;
    height: 84%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    color: ${props => props.theme.colors.primary};
`;
const SearchBox = styled.div`
    margin-top: 60px;
    width: 97%;
    height: 380px;
    padding: 12px;
    background-color: ${props => props.theme.colors.surface};;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 40px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    .divider{
        margin-top: 30px;
        width: 100%;
        display: grid;
        grid-template-columns: 4fr 1fr 4fr;
        justify-content: center;
        align-items: center;
    }
    .orLabel{
        display: flex;
        justify-content: center;
    }
    .divider-line{
        background-color: black;
        width: 100%;
        height: 1px;
    }
`;
const FileBox = styled.div`
    width: 100%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    span{
        cursor: pointer;
        font-size: 18px;
    }
    input{
        display: none;
    }
`;
const LogoBox = styled.div`
    display: flex;
    justify-content: end;
`;
const Logo = styled.div`
    background-image: url('/images/kfood-logo.png');
    background-size: cover;
    background-position: center;
    width: 240px;
    height: 120px;
    border-radius: 12px;
`;
export default function Home(){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile,setFile] = useState('');
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file.name);
            // 여기에 파일 업로드 로직 추가 가능
        }
    };
return(
<Box>
    <SearchBox>
        <div className="searchText">K-Food 이미지 검색</div>
        <ImageUploader>
            <span>여기로 이미지 파일을 업로드 하세요. </span>
            <div className="divider">
                <div className="divider-line"></div>
                <div className="orLabel">또는</div>
                <div className="divider-line"></div>
            </div>
            <FileBox>
                <span onClick={handleClick}>이미지 파일을 선택하세요!</span>
                <input type="file" ref={fileInputRef} onChange={handleFileChange}/>
                {selectedFile && <span>({selectedFile})</span>}
            </FileBox>
        </ImageUploader>
    </SearchBox>
    <LogoBox>
        <Logo />
    </LogoBox>
</Box>
)
}
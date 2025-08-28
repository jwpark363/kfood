import { useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { Svg } from "./styled_components";
import { FileUploader } from "react-drag-drop-files";
import { base64ToBlob } from "../lib/image_util";
import { useNavigate } from "react-router";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;
const ToggleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;
const ToggleSvg = styled(Svg)<{$isSelected:boolean}>`
    fill: ${props => props.$isSelected?'#c2255c':'gray'};
    cursor: pointer;
`;
const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: "environment"
};
const ImageUploader = styled.div`
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;
export default function WebcamCapture(){
    const navigate = useNavigate();
    const [isWebCam, setWebCam] = useState(false);
    const webcamRef = useRef<Webcam>(null);
    const [file, setFile] = useState<File | File[] | null>(null);
    const handleChange = (selected_file:File|File[]) => {
        setFile(selected_file);
    };
    const capture = () => {
        if(isWebCam){
            // 카메라 캡쳐 이미지 jpeg 파일 변경
            const imageSrc = webcamRef.current?.getScreenshot();
            if(!imageSrc){
                alert('이미지 캡쳐가 되지 않았습니다. 다시한번 시도해주세요!')
                return;
            }
            const _img_blob = base64ToBlob(imageSrc,'image/jpeg');
            const _filename = `webcam_capture_${Date.now()}.jpeg`;
            const _file = new File([_img_blob], _filename, {
                    type: 'image/jpeg',
            });
            navigate('/kfood/recommend',{state: {image:_file}})
        }else{
            if(!file){
                alert('파일이 선택되지 않았습니다.')
                return;
            }
            navigate('/kfood/recommend',{state: {image:file}})
            //파일 초기화
            setFile(null);
        }
    };
  return (
    <Box>
        <ToggleBox>
            <ToggleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                onClick={() => setWebCam(true)}
                $size={24} $isSelected={isWebCam}>
                <path d="M193.1 32c-18.7 0-36.2 9.4-46.6 24.9L120.5 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-56.5 0-26-39.1C355.1 41.4 337.6 32 318.9 32L193.1 32zm-6.7 51.6c1.5-2.2 4-3.6 6.7-3.6l125.7 0c2.7 0 5.2 1.3 6.7 3.6l33.2 49.8c4.5 6.7 11.9 10.7 20 10.7l69.3 0c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l69.3 0c8 0 15.5-4 20-10.7l33.2-49.8zM256 384a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 272a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
            </ToggleSvg>
            <ToggleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                onClick={() => setWebCam(false)}
                $size={28} $isSelected={!isWebCam}>
                <path d="M304 112L192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L448 528C456.8 528 464 520.8 464 512L464 272L376 272C336.2 272 304 239.8 304 200L304 112zM444.1 224L352 131.9L352 200C352 213.3 362.7 224 376 224L444.1 224zM128 128C128 92.7 156.7 64 192 64L325.5 64C342.5 64 358.8 70.7 370.8 82.7L493.3 205.3C505.3 217.3 512 233.6 512 250.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM387.4 496L252.6 496C236.8 496 224 483.2 224 467.4C224 461 226.1 454.9 230 449.8L297.6 362.9C303 356 311.3 352 320 352C328.7 352 337 356 342.4 362.9L410 449.9C413.9 454.9 416 461.1 416 467.5C416 483.3 403.2 496.1 387.4 496.1zM240 288C257.7 288 272 302.3 272 320C272 337.7 257.7 352 240 352C222.3 352 208 337.7 208 320C208 302.3 222.3 288 240 288z"/>
            </ToggleSvg>
        </ToggleBox>
        {isWebCam ? 
        <Webcam
            audio={false}
            width={400}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            disablePictureInPicture={false}
        /> : 
        <ImageUploader>
            <FileUploader handleChange={handleChange}
                name="file" multiple={false}
                types={["JPG", "PNG", "GIF"]}
                label="이미지 파일을 업로드하세요!"
                uploadedLabel="이미지 파일 선택 완료!"
            />
            {
                (file && !Array.isArray(file) && <span>( {file.name} )</span>)
            }
        </ImageUploader>
        }
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
            style={{
                cursor:'pointer'
            }}
            onClick={capture} fill="#c2255c" $size={40}>
        <path d="M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
        </Svg>
    </Box>
    );
};
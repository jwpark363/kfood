import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styled from "styled-components";

const ImageUploader = styled.div`
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

export default function ImageFileUpload(){
    const [file, setFile] = useState<File | File[] | null>(null);
    const handleChange = (selected_file:File|File[]) => {
        setFile(selected_file);
        console.log(selected_file);
    };
    return(
        <ImageUploader>
            <FileUploader handleChange={handleChange}
                name="file" multiple={false}
                types={["JPG", "PNG", "GIF"]}
                label="이미지 파일을 업로드하세요!"
            />
            {
                (file && !Array.isArray(file) && <span>( {file.name} )</span>)
            }
        </ImageUploader>
    )
}
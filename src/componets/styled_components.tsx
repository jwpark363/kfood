import styled from "styled-components";

export const BackImage = styled.div<{$path:string}>`
    &::before{
        content: '';    
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: ${props => `url(${props.$path})`};
        background-size: cover;
        background-position: center;
        opacity: 0.3; 
        z-index: -1; 
    }
`;
export const Svg = styled.svg<{$size:number}>`
    width: ${props => `${props.$size}px`};
    height: ${props => `${props.$size}px`};
`;

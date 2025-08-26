import styled from "styled-components"

const Box = styled.div`
    width: 100vw;
    height: 68px;
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: #fff5f5;
    .title{
        width: 25vw;
        display: flex;
        justify-content: end;
        align-items: center;
        h1{
            font-size: 20px;
            font-weight: bold;
            color: ${props => props.theme.colors.primaryDark};
        }
    }
`;
export default function Header(){
    return(
        <Box>
            <div className="title"><h1>한식 AI 레시피</h1></div>
        </Box>
        
    )
}
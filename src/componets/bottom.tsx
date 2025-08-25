import styled from "styled-components"

const Box = styled.div`
    position: absolute;
    top: 0px;
    width: 98vw;
    min-width: 400px;
    height: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    line-height: 1.2;
    margin: 0px 12px;
    font-size: 12px;
    color: ${props => props.theme.colors.primaryLight};
`;
export default function Bottom(){
    return(
        <Box>
            <h1>AI 1팀 케데헌 프로젝트</h1>
            <h1>강경란 / 이재진 / 박종욱</h1>
        </Box>
    )
}
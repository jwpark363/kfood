import { NavLink } from "react-router";
import styled from "styled-components"

const Box = styled.div`
    width: 90vw;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 16pt;
    h1{
        font-size: 30px;
        font-weight: bold;
        color: ${props => props.theme.colors.primaryDark};
    }
`;
const Menu = styled.div`
    display: flex;
    gap: 12px;
`;
const Svg = styled.svg`
    width: 20x;
    height: 20px;
    fill: ${props => props.theme.colors.primaryLight};;
`;

export default function Header(){
    return(
        <Box>
            <Menu>
                <NavLink to={'/kfood'}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M240 6.1c9.1-8.2 22.9-8.2 32 0l232 208c9.9 8.8 10.7 24 1.8 33.9s-24 10.7-33.9 1.8l-8-7.2 0 205.3c0 35.3-28.7 64-64 64l-288 0c-35.3 0-64-28.7-64-64l0-205.3-8 7.2c-9.9 8.8-25 8-33.9-1.8s-8-25 1.8-33.9L240 6.1zm16 50.1L96 199.7 96 448c0 8.8 7.2 16 16 16l48 0 0-104c0-39.8 32.2-72 72-72l48 0c39.8 0 72 32.2 72 72l0 104 48 0c8.8 0 16-7.2 16-16l0-248.3-160-143.4zM208 464l96 0 0-104c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24l0 104z"/>
                </Svg>
                </NavLink>
            </Menu>
            <h1>K-Food Finder v1.0</h1>
        </Box>
        
    )
}
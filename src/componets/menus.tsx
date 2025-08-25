import styled from "styled-components"

const Box = styled.div`
    width: 100%;
    height: 62px;
    display: flex;
    justify-content: center;
    gap: 12px;
`;
const Menu = styled.span<{is_selected:boolean}>`
    padding: 2px 16px;
    height: 28px;
    border-radius: 12px;
    background-color: ${props => props.is_selected ? props.theme.colors.accent : props.theme.colors.shadow };
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Menus(){
    return(
        <Box>
            <Menu is_selected={true}>KFood</Menu>
            <Menu is_selected={false}>Image Search</Menu>
            <Menu is_selected={false}>Code List</Menu>
        </Box>
    )
}
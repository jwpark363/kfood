import { useState } from "react";
import styled from "styled-components"

const Box = styled.div`
    width: 90%;
    height: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;  
`;
const Title = styled.div`
    margin-top: 20px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
const Input = styled.input`
    height: 32px;
    border-radius: 12px;
    padding: 12px;
    font-size: 24px;
    color: ${props => props.theme.colors.primaryDark};
`;
const List = styled.div`
    margin-top: 40px;
    width: 100%;
    font-size: 18px;
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
`;

const data = [
    {code:1,name:'김치찌게'},
    {code:2,name:'된장찌게'}
]

export default function CodeList(){
    const [searchText, setText] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    return(
        <Box>
            <Title>Food Code List</Title>
            <Input type="text" onChange={handleChange} value={searchText} placeholder="Input Food Name"></Input>
            <List>
            {
                data.map(d => <><span>{d.code}</span><span>{d.name}</span><span></span></>)
            }
            </List>
        </Box>
    )
}
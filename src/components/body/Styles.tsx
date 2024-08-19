import styled from "styled-components";

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100lvh - 80px);
`;

export const SelectLabel = styled.label`
    color: #D5FAFD;
    font-size: 1.2rem;
    align-self: flex-start;
`;

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1.2rem;
`;

export const Select = styled.select`
    width: 350px;
    padding: 10px;
    margin: 5px 0;
    display: inline-block;
    border: 3px solid #667391;
    border-radius: 6px;
    background-color: #33414E;
`;

export const Option = styled.option`
    background-color: #33414E;
    color: #D5FAFD;
    font-size: 13px;
    border: 1px solid #667391;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background-color: #667391;
        color: #33414E;
    }
`;
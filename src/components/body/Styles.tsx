import styled from "styled-components";

export const Main = styled.main`
    margin: 0 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #33414e92;
    height: 80vh;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.337);
`;

export const FromToContainer = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
    min-width: 270px;
    padding: 10px;
    margin: 5px 0;
    display: inline-block;
    border: 3px solid #667391;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #667391;

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.337);
`;

export const Option = styled.option`
    min-width: 270px;
    background-color: #667391;
    color: #D5FAFD;
    font-size: 13px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background-color: #667391;
        color: #33414E;
    }
`;

export const Input = styled.input`
    min-width: 245px;
    padding: 10px;
    margin: 3rem 0;
    border: 3px solid #667391;
    border-radius: 6px;
    background-color: #33414E;
    color: #D5FAFD;
    font-size: 1rem;
`;

export const ConvertedValueContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 260px;
    height: 5rem;
    margin: 1rem 0;
    background-color: #667391;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.337);
`;

export const ConvertionError = styled.h3`
    color: #ff7e7e;
    font-size: 1.3rem;
    font-weight: 400;
    background-color: transparent;
`;

export const ConvertedValue = styled.h3`
    color: #D5FAFD;
    font-size: 1.5rem;
    background-color: transparent;
`;
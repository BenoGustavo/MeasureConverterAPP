import styled from "styled-components"

export const Background = styled.div`
    height: 100vh;
    background-image: url("bg-image.png");
    image-rendering: optimizeSpeed;

    background-size: cover;
`

export const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    background-color: transparent;
    display: flex;
    justify-content: center;
`;
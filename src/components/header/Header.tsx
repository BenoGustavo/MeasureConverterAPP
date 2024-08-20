import React from "react";
import { HeaderContainer, HeaderTitle, HeaderWrapper } from "./Styles";

export const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderTitle>measure converter</HeaderTitle>
            </HeaderWrapper>
        </HeaderContainer>
    )
}
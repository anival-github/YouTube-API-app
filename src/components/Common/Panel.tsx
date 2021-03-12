import React from 'react';
import HeaderBar from './HeaderBar';
import HeaderContainer from './HeaderContainer';

type PropsType = {
  children: JSX.Element[];
};

const Panel: React.FC<PropsType> = ({ children }: PropsType) => (
  <HeaderBar>
    <HeaderContainer>
      { children }
    </HeaderContainer>
  </HeaderBar>
);

export default Panel;

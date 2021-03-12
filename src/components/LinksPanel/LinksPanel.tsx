import React from 'react';
import Content from '../Common/Content';
import Description from '../Common/Description';
import Panel from '../Common/Panel';
import LinksForm from './LinksForm';
import LinksSelectHost from './LinksSelectHost';

const LinksPanel = () => (
  <Panel>
    <Description>Link from: </Description>
    <Content>
      <LinksSelectHost />
      <LinksForm />
    </Content>
  </Panel>
);

export default LinksPanel;

import React from 'react';
import Content from '../Common/Content';
import Description from '../Common/Description';
import Panel from '../Common/Panel';
import SearchForm from './SearchForm';
import SelectSearchHost from './SearchSelectHost';

function SearchPanel() {
  return (
    <Panel>
      <Description>Search in:</Description>
      <Content>
        <SelectSearchHost />
        <SearchForm />
      </Content>
    </Panel>
  );
}

export default SearchPanel;

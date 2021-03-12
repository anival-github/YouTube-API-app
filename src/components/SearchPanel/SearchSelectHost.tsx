import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AppStateType } from '../../redux/store';
import { setCurrentSearchHost } from '../../redux/search-reducer';
import SelectHost from '../Common/SelectHost';

type MapStateToPropsType = {
  currentSearchHost: string,
  searchHosts: Array<string>,
};

type MapDispatchToPropsType = {
  setCurrentSearchHost: (hosting: string) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Hosting: React.FC<PropsType> = ({
  currentSearchHost, searchHosts, setCurrentSearchHost,
}: PropsType) => {
  const options = searchHosts.map((hosting) => {
    const key = uuid();
    return (
      <option key={key} value={hosting}>
        {hosting}
      </option>
    );
  });

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentSearchHost(e.target.value);
  };

  return (
    <SelectHost
      onChange={handleOnChange}
      value={currentSearchHost}
      name="hosting"
      id="hosting"
      required
    >
      {options}
    </SelectHost>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentSearchHost: state.search.currentSearchHost,
  searchHosts: state.search.searchHosts,
});

export default connect(mapStateToProps, { setCurrentSearchHost })(Hosting);

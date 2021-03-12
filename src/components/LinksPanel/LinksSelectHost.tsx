import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AppStateType } from '../../redux/store';
import { setCurrentParseLinkHost } from '../../redux/link-reducer';
import SelectHost from '../Common/SelectHost';

type MapStateToPropsType = {
  currentLinkParseHost: string,
  linkParseHosts: Array<string>,
};

type MapDispatchToPropsType ={
  setCurrentParseLinkHost: (hosting: string) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const LinksSelectHost: React.FC<PropsType> = ({
  currentLinkParseHost, linkParseHosts, setCurrentParseLinkHost,
}: PropsType) => {
  const options = linkParseHosts.map((hosting) => {
    const key = uuid();
    return (
      <option key={key} value={hosting}>
        {hosting}
      </option>
    );
  });

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentParseLinkHost(e.target.value);
  };

  return (
    <SelectHost
      onChange={handleOnChange}
      value={currentLinkParseHost}
      name="hosting"
      id="hosting"
      required
    >
      {options}
    </SelectHost>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentLinkParseHost: state.link.currentLinksHost,
  linkParseHosts: state.link.linksSupportedHosts,
});

export default connect(mapStateToProps, { setCurrentParseLinkHost })(LinksSelectHost);

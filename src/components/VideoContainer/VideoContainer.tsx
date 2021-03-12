import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import Card from './Card/Card';
import styles from './VideoContainer.module.css';
import { chooseVideo } from '../../redux/link-reducer';
import { EmbedLinkType } from '../../types/types';
import { setAppRegime } from '../../redux/app-reducer';

type MapStatePropsType = {
  embedLink: string,
  isSearchEnabled: boolean,
  searchEmbedLinks: Array<EmbedLinkType>,
};

type MapDispatchPropsType = {
  chooseVideo: (id: string, embedLink: string) => void,
  setAppRegime: (isSearchEnabled: boolean) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const VideoContainer: React.FC<PropsType> = ({
  embedLink, isSearchEnabled, searchEmbedLinks, chooseVideo, setAppRegime,
}: PropsType) => {
  const singleCard = (
    <Card
      id="0"
      embedLink={embedLink}
      setAppRegime={setAppRegime}
      chooseVideo={chooseVideo}
      big
    />
  );

  const multipleCards = searchEmbedLinks.map(({ embedLink, id }) => (
    <Card
      key={id}
      id={id}
      embedLink={embedLink}
      setAppRegime={setAppRegime}
      chooseVideo={chooseVideo}
      big={false}
    />
  ));

  return (
    <div className={styles.album}>
      <div className={styles.container}>
        <div className={styles.content}>
          { !isSearchEnabled && embedLink && singleCard }
          { isSearchEnabled && multipleCards }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  embedLink: state.link.choosenVideoEmbedLink,
  isSearchEnabled: state.app.isSearchEnabled,
  searchEmbedLinks: state.search.searchEmbedLinks,
});

export default connect(mapStateToProps, { chooseVideo, setAppRegime })(VideoContainer);

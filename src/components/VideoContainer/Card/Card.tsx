import React from 'react';
import Button from '../../Common/Button';
import styles from './Card.module.css';

type PropsType = {
  big: boolean
  embedLink: string,
  id: string,
  setAppRegime: (isSearchEnabled: boolean) => void;
  chooseVideo: (id: string, embedLink: string) => void,
};

const Card: React.FC<PropsType> = ({
  big, embedLink, id, setAppRegime, chooseVideo,
}: PropsType) => {
  const handleClick = () => {
    setAppRegime(false);
    chooseVideo(id, embedLink);
  };

  const caption = big
    ? 'Here is your video'
    : <Button onClick={handleClick} type="button">Choose</Button>;

  return (
    <div className={`${styles.card} ${big ? styles.big : styles.small}`}>
      <div className={styles.cardContent}>
        <div className={`${styles.videoWrapper}`}>
          <iframe
            width="854"
            height="480"
            src={embedLink}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Youtube video"
          />
        </div>
        <div className={styles.cardBody}>
          {caption}
        </div>
      </div>
    </div>
  );
};

export default Card;

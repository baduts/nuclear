import React from 'react';
import styles from './styles.scss';
import { History } from 'history';
import { PitchforkAlbum } from '../../../../actions/dashboard';
import { useDispatch } from 'react-redux';
import { albumInfoSearchByName, artistInfoSearchByName } from '../../../../actions/search';

type BestNewMusicContentProps = {
  history: History
  item: PitchforkAlbum | null
}

const BestNewMusicContent: React.FC<BestNewMusicContentProps> = ({
  item,
  history
}) => {
  const dispatch = useDispatch();

  if (item === null) {
    return null;
  }

  return (
    <div className={styles.best_new_music_content}>
      <div className={styles.review_header}>
        <div className={styles.thumbnail}>
          <img alt={item.title} src={item.thumbnail} />
        </div>
        <div className={styles.review_headings}>
          <div
            className={styles.artist}
            onClick={() => dispatch(artistInfoSearchByName(item.artist, history))}
          >
            {item.artist}
          </div>
          <div
            className={styles.title}
            onClick={() => dispatch(albumInfoSearchByName(item.title + ' ' + item.artist, history))}
          >
            {item.title}
          </div>
        </div>
        {
          item.score &&
          <div className={styles.score}>
            <div className={styles.score_box}>
              {item.score}
            </div>
          </div>
        }
      </div>
      {
        item.review.split('\n').map((paragraph, i) => {
          return (
            <p key={'item-' + i} className={styles.paragraph}>
              {paragraph}
            </p>
          );
        })
      }
    </div>
  );
};

export default BestNewMusicContent;

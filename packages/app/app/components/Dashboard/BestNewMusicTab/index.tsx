import React, { useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import _ from 'lodash';
import { History } from 'history';
import BestNewMusicMenu from './BestNewMusicMenu';
import BestNewMusicContent from './BestNewMusicContent';
import styles from './styles.scss';
import { DashboardReducerState } from '../../../reducers/dashboard';
import { PitchforkAlbum } from '../../../actions/dashboard';

type BestNewMusicTabProps = {
  dashboardData: DashboardReducerState
  history: History
}

const BestNewMusicTab:React.FC<BestNewMusicTabProps> = ({dashboardData, history}) => {
  

  const [activeItem, setActiveItem] = useState<PitchforkAlbum | null>(null);


  useEffect(() => {
    if (activeItem === null) {
      const firstAlbum = _.head(
        dashboardData.bestNewAlbums
      );

      if (firstAlbum) {
        setActiveItem(firstAlbum);
      }
    }
  }, [dashboardData]);

  const isLoading = ()  => {
    return (dashboardData.bestNewAlbums && dashboardData.bestNewTracks) ? dashboardData.bestNewAlbums.length < 1  || dashboardData.bestNewTracks.length < 1 : true;
  };

  const setActiveItemHandler = (activeItem:  PitchforkAlbum | null) =>  {
    setActiveItem(activeItem);
    document.getElementsByClassName('best_new_music_content')[0]?.scrollTo(0, 0);
  };

  return (
    <Tab.Pane
      loading={isLoading()}
      attached={false}
      className={styles.best_new_music_tab_pane}
    >
      <BestNewMusicMenu
        albums={dashboardData.bestNewAlbums}
        tracks={dashboardData.bestNewTracks}
        setActiveItem={setActiveItemHandler}
      />
      <BestNewMusicContent
        item={activeItem}
        history={history}
      />
    </Tab.Pane>
  );      

};

export default BestNewMusicTab;

import React, { useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import BestNewMusicTab from './BestNewMusicTab';
import ChartsTab from './ChartsTab';
import GenresTab from './GenresTab';

import styles from './styles.scss';
import { DashboardReducerState } from '../../reducers/dashboard';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { loadBestNewAlbums, loadBestNewTracks, loadTopTags, loadTopTracks } from '../../actions/dashboard';

type DashboardProps = {
  dashboardData: DashboardReducerState
  history: History
  isConnected: boolean
}

const Dashboard: React.FC<DashboardProps> = ({dashboardData, history, isConnected}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(loadBestNewAlbums());
      dispatch(loadBestNewTracks());
      dispatch(loadTopTags());
      dispatch(loadTopTracks());
    }
  }, [isConnected]);

  const panes = () =>  {
    return [
      {
        menuItem: t('best'),
        render: () => (
          <BestNewMusicTab
            dashboardData={dashboardData}
            history={history}        
          />
        )
      },
      {
        menuItem: t('top'),
        render: () => (
          <ChartsTab
            topTracks={dashboardData.topTracks}
          />
        )
      },
      {
        menuItem: t('genres'),
        render: () => (
          <GenresTab
            genres={dashboardData.topTags}
            history={history}
          />
        )
      }
    ];
  };
  return (
    <div className={styles.dashboard}>
      {isConnected && (
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes()}
          className={styles.dashboard_tabs}
        />
      )}
      {!isConnected && <Redirect to='/library' />}
    </div>
  );
};


export default Dashboard;

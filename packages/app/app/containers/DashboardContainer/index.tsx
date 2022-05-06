import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readFavorites } from '../../actions/favorites';
import Dashboard from '../../components/Dashboard';
import { RootState } from '../../reducers';
import { RouteComponentProps } from 'react-router';


const DashboardContainer: React.FC<RouteComponentProps> = ({history}) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readFavorites());
  }, []);

  const dashboard = useSelector((state: RootState) => state.dashboard);
  const isConnected = useSelector((state: RootState) => state.connectivity);
 
  return (
    <Dashboard
      dashboardData={dashboard}
      history={history}
      isConnected={isConnected}
    />
  );
};


export default DashboardContainer;

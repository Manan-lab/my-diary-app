import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';

interface AuthRouteProps {
  element: React.ComponentType;
  type: string
}

const AuthRoute = ({ element: Component, type }: AuthRouteProps): React.JSX.Element => {
  const isAuthenticated = Boolean(userStore.userInfo);

  return (
    <>
      {
        ((!isAuthenticated && type === 'public') ||
          (isAuthenticated && type === 'private')) &&
          (<Component />)
      }
      {
        isAuthenticated && type === 'public' && (
          <Navigate to={'/diary'} />
        )
      }
      {
        !isAuthenticated && type === 'private' && (
          <Navigate to={'/'} />
        )
      }
    </>
  );
};

export default observer(AuthRoute);

import React from 'react';
import { useRoutes } from 'react-router-dom';
import WelcomePage from '../pages/welcomePage/WelcomePage';
import DiaryPage from '../pages/diaryPage/DiaryPage';
import DiaryDetailsPage from '../pages/diaryDetailsPage/DiaryDetailsPage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import AuthRoute from './AuthRoute';

function Routes (): React.JSX.Element | null {
  return useRoutes([
    {
      path: '/',
      element: <AuthRoute element={WelcomePage} type='public' />
    },
    {
      path: '/diary',
      element: <AuthRoute element={DiaryPage} type='private' />
    },
    {
      path: '/diary/:diaryId',
      element: <AuthRoute element={DiaryDetailsPage} type='private' />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);
}

export default Routes;

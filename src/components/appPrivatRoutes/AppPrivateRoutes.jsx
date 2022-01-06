import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import withTranslation from '../utils/hoc/withTranslation';
import CommonButtonPanel from '../commonButtonPanel/CommonButtonPanel';

import {
  MainPage,
  Page404,
  MovieInfoPage,
  ActorInfoPage,
  EditMoviePage,
  RegisteredPage,
  LogOutPage,
  LoginPage,
} from '../pages';

const authSelector = (state) => !!state.auth.email && !!state.auth.password;

const AppPrivatRoutes = () => {
  const isAuthanticated = useSelector(authSelector);
  const CommonButtonPanelWithTranslation = withTranslation(CommonButtonPanel);

  return (
    <Routes>
      {isAuthanticated ? (
        <>
          <Route path="/" element={<CommonButtonPanelWithTranslation />}>
            <Route index element={<MainPage />} />
            <Route path="/movieInfo/:movieId" element={<MovieInfoPage />} />
            <Route path="/edit/:movieId" element={<EditMoviePage />} />
            <Route path="/actor/:actorId" element={<ActorInfoPage />} />
            <Route path="/register" element={<Navigate replace to="/" />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/logout" element={<LogOutPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </>
      ) : (
        <>
          <Route path="/register" element={<RegisteredPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </>
      )}
    </Routes>
  );
};

export default AppPrivatRoutes;

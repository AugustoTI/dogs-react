import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '../../contexts/glovalProvider/context';

import { UserHeader } from '../../components/user_header/UserHeader';
import { Feed } from '../../components/feed/Feed';

import { UserPhotoPost } from './userPhotoPost/UserPhotoPost';
import { UserStats } from './userStats/UserStats';
import { Error404 } from '../../components/Error404/Error404';
import { Head } from '../../components/helper/Head';

export const User = () => {
  const { data } = React.useContext(Context);

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </section>
  );
};

import React from 'react';
import styles from './userHeaderNav.module.css';

import { NavLink, useLocation } from 'react-router-dom';

import { useMedia } from '../../hooks/useMedia';

import { Context } from '../../contexts/glovalProvider/context';

import { FeedSVG } from '../../components/feedSVG';
import { EstatiscasSVG } from '../../components/estatiscasSVG';
import { AdicionarSVG } from '../../components/adicionarSVG';
import { ExitSVG } from '../../components/exitSVG';

export const UserHeaderNav = () => {
  const mobile = useMedia('(max-width: 680px)');
  const [mobileActive, setMobileActive] = React.useState(false);

  const { userLogout } = React.useContext(Context);

  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileActive(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileBtn} ${
            mobileActive && styles.mobileBtnActive
          }`}
          onClick={() => setMobileActive(!mobileActive)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileActive && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <FeedSVG />
          {mobile && 'Minhas fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <EstatiscasSVG />
          {mobile && 'Estatíscas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarSVG />
          {mobile && 'Enviar'}
        </NavLink>

        <button onClick={userLogout}>
          <ExitSVG />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

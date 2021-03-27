import React from 'react';
import styles from './Router.module.scss';
import {
  NavLink,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Footer from '../components/Footer/Footer';
import Photos from '../components/Photos/Photos';
import Videos from '../components/Videos/Videos';
import Favourites from '../components/Favourites/Favourites';

function Router() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  return (
    <div className={styles.Router}>
      <Home />
      <div className={styles.NavBar}>
        <NavLink
          style={{ marginRight: '5vw' }}
          className={styles.inactive}
          activeClassName={styles.active}
          to="/photos"
        >
          Photos
        </NavLink>
        <NavLink
          style={{ marginRight: '5vw' }}
          className={styles.inactive}
          activeClassName={styles.active}
          to="/videos"
        >
          Videos
        </NavLink>
        <NavLink
          style={{ marginLeft: '33vw' }}
          className={styles.inactive}
          activeClassName={styles.active}
          to="/Favourites"
        >
          Favourites
        </NavLink>
      </div>

      <Switch>
        <Route exact path="/photos">
          <Photos />
        </Route>
        <Route exact path="/videos">
          <Videos />
        </Route>
        <Route exact path="/Favourites">
          <Favourites />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default Router;

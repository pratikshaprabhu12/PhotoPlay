import React ,{useState} from 'react';
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
import VideoPlay from '../components/VideoPlay/VideoPlay';
import PhotoDetails from '../components/PhotoDetails/PhotoDetails';

const Router = () => {
  const history = useHistory();
  const location=useLocation();
  const path=location.pathname.split('/');
  console.log(path);
  const { id } = useParams();
  const [search,setSearch]=useState('animal');
  return (
    <div className={styles.Router}>
      <Home search={(value)=>{value?setSearch(value):setSearch('animal');}}/>
      
      {path[1]!=='PhotoDetails'||path[1]==='VideoPlay'?(
      <div className={styles.NavBar}>
        <NavLink
          style={{ marginRight: '5vw' }}
          className={styles.inactive}
          exact activeClassName={styles.active}
          to="/"
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
      </div>):null}

      <Switch>
        <Route exact path="/">
          <Photos search={path[1]===''?search:'animal'}/>
        </Route>
        <Route exact path="/videos">
          <Videos search={path[1]==='videos'?search:'animal'}/>
        </Route>
        <Route exact path="/Favourites">
          <Favourites />
        </Route>

        <Route exact path="/VideoPlay">
          <VideoPlay />
        </Route>
        <Route exact path="/PhotoDetails/:id">
          <PhotoDetails />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default Router;

import React from 'react';
import { useEffect, useState } from 'react';
import banner from '../../assets/1.0. Home - Photos/Mask.png';
import logo from '../../assets/1.0. Home - Photos/Logo.png';
import styles from './Home.module.scss';
//import cn from 'classnames';

const Home = ({ ...props }) => {
  const [navbar, setNavBar] = useState(false);
  //const navBar = cn(styles.header, { [styles.Active]: navbar });
  // const changeBackground = () => {

  //   if (window.scrollY >= 200) {
  //     setNavBar(true);
  //   } else {
  //     setNavBar(false);
  //   }
  // };

  // window.addEventListener("scroll", changeBackground);
  const [img, setImg] = React.useState([]);
  const getBanner = () => {
    fetch('https://api.pexels.com/v1/curated?per_page=1', {
      headers: {
        Authorization:
          '563492ad6f91700001000001935ceb59486643be884e6b248f72ecd5',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.photos[0].src.landscape);
        setImg(data.photos[0].src.landscape);
      });
  };
  console.log(img);
  useEffect(() => {
    getBanner();
  }, []);

  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState('');
  const [result, setResult] = useState([]);

  function handleChange(event) {
    const search = event.target.value;
    setSearch(search);
  }
  function noOfPics(event) {
    const perPage = event.target.value;
    setPerPage(perPage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url =
      'https://api.pexels.com/v1/search?query=' +
      search +
      '&per_page=' +
      perPage;
    const access_token =
      '563492ad6f917000010000014060d806c66c47b88b9b4d7f8c487692';
    axios
      .get(url, {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setResult(data.data.photos);
      });
  }

  return (
    <div className={styles.Home}>
      {navbar === false ? (
        <div
          style={{
            backgroundImage: 'url(' + img + ')',
            backgroundSize: 'cover',
          }}
          className={styles.Banner}
        >
          <img className={styles.logos} src={logo} />
          <h1>Discover the world’s best photos & videos</h1>
          <h2>Best memories online</h2>
          <div className={styles.bg}>
            <input
              type="text"
              placeholder="Search photos, videos, artists"
            ></input>
            <div className={styles.bgs}>
              <span>SEARCH</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mask}>
          <img className={styles.logos} src={logo} />
        </div>
      )}
    </div>
  );
};

export default Home;

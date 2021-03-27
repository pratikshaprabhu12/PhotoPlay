import React from 'react';

import styles from './Photos.module.scss';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUser } from '../../ContextApis/ProvideUser';
import {useHistory} from 'react-router-dom';
import filledHeart from '../../assets/Icon-heart-deselect.png';
import outlineHeart from '../../assets/video-favorite.png';

const Photos = ({ ...props }) => {
  const [totaldata, SetToatalData] = useState();
  const [search, SetSearch] = useState('animal');
  const [nextLink, SetNextLink] = useState('');
  const [heart, setHeart] = useState(false);
  const { fav, setFav, img, setImg } = useUser();
  let history=useHistory();

  const url = 'https://api.pexels.com/v1/search?query=';
  const getImg = () => {
    fetch(url + search, {
      headers: {
        Authorization:
          '563492ad6f91700001000001935ceb59486643be884e6b248f72ecd5',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setImg([...img, ...data.photos]);
        SetNextLink(data.next_page);
        SetToatalData(data);
      });
  };

  const newUrl = () => {
    fetch(nextLink, {
      headers: {
        Authorization:
          '563492ad6f91700001000001935ceb59486643be884e6b248f72ecd5',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setImg([...img, ...data.photos]);
        SetNextLink(data.next_page);
        SetToatalData(data);
      });
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div className={styles.Photos}>
      <InfiniteScroll
        dataLength={img}
        next={newUrl}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.column}>
          {img.map((item, index) => {
            return (
              <div className={styles.Card} key={index}>
                <img onClick={() => {
                    history.push("/PhotoDetails");
                }} src={item.src.small} alt=""></img>
                <img src={oval} className={styles.OvalImg}></img>
                <h3>{item.photographer}</h3>
                <button
                  className={styles.Button}
                  onClick={() => {
                    {
                      fav.find((ele) => {
                        return ele === item.id;
                      })
                        ? setFav(fav.filter((ele) => ele !== item.id))
                        : setFav((fav) => [...fav, item.id]);
                    }
                    setHeart(!heart);
                  }}
                >
                  {fav.find((ele) => {
                    return ele === item.id;
                  }) ? (
                    <img src={outlineHeart} className={styles.filled} />
                  ) : (
                    <img src={filledHeart} className={styles.outline} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Photos;

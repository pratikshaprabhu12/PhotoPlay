import React from 'react';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useEffect, useState } from 'react';
import styles from './Videos.module.scss';
import playButton from '../../assets/ShapeCopy6.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/Icon-heart-deselect.png';
import outlineHeart from '../../assets/video-favorite.png';

const Videos = ({ ...props }) => {
  const [totaldata, SetToatalData] = useState();
  const [search, SetSearch] = useState('animal');
  const [nextLink, SetNextLink] = useState('');
  const [heart, setHeart] = useState(false);
  const { fav, setFav, video, setVideo } = useUser();
  const [count, setCount] = useState(1);
  const url = 'https://api.pexels.com/videos/search?query=';
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
        setVideo([...video, ...data.videos]);
        SetNextLink(data.next_page);
        SetToatalData(data);
        setCount(data.page);
      });
  };

  const newUrl = () => {
    let page = count + 1;
    setCount(count + 1);
    fetch(url + search + '&page=' + page, {
      headers: {
        Authorization:
          '563492ad6f91700001000001935ceb59486643be884e6b248f72ecd5',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setVideo([...video, ...data.videos]);
        SetNextLink(data.next_page);
        SetToatalData(data);
      });
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div className={styles.Videos}>
      <InfiniteScroll
        dataLength={video}
        next={newUrl}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.column}>
          {video.map((item, index) => {
            return (
              <div className={styles.Card} key={index}>
                <img src={item.image} alt=""></img>
                <img src={playButton} className={styles.playButton} />
                <img src={oval} className={styles.OvalImg}></img>
                <h3>{item.user.name}</h3>
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

export default Videos;

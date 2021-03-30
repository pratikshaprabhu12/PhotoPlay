import React from 'react';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useEffect, useState } from 'react';
import styles from './Videos.module.scss';
import {useHistory} from 'react-router-dom';
import playButton from '../../assets/ShapeCopy6.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/Icon-heart-deselect.png';
import outlineHeart from '../../assets/video-favorite.png';

const Videos = ({ search }) => {
  //const [search, SetSearch] = useState('animal');
  const [nextLink, SetNextLink] = useState('');
  const [heart, setHeart] = useState(false);
  const { fav, setFav, video, setVideo,vid,SetVid,setSearch } = useUser();
  const [count, setCount] = useState(1);
  const history = useHistory();
  let Vido = video.filter(
    (ele, ind) =>
      ind ===
      vid.findIndex(
        (elem) =>
          elem.id === ele.id 
      )
  );

  const url = 'https://api.pexels.com/videos/search?query=';
  const getImg = () => {
    console.log('videos');
    setSearch(search);
    if(!localStorage.getItem(search+' video'))
    {
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
        let val=[];
        // let Vido = vid.filter(
        //   (ele, ind) =>
        //     ind ===
        //     vid.findIndex(
        //       (elem) =>
        //         elem.id === ele.id 
        //     )
        // );
        localStorage.setItem(search+' video', JSON.stringify([...val,...data.videos]));
        localStorage.setItem('video', JSON.stringify([...vid,...data.videos]));
        localStorage.setItem(search+' nextVideo', JSON.stringify(data.page));
        SetVid([...vid,...data.videos]);
        setVideo([...val, ...data.videos]);
        console.log([...val, ...data.videos]);
        SetNextLink(data.next_page);
        setCount(data.page);
      });
    }else{
      let data=JSON.parse(localStorage.getItem(search+' video'))||'{}';
      setVideo(data);
      Vido=[data];
      let key=JSON.parse(localStorage.getItem(search+' nextVideo'))||'{}';
      setCount(key);
    }
  };

  const newUrl = () => {
    
    let val=JSON.parse(localStorage.getItem(search+' nextVideo'))||'{}';
    console.log(val,nextLink);
    if(val===count)
    {
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
        let Vido = video.filter(
          (ele, ind) =>
            ind ===
            vid.findIndex(
              (elem) =>
                elem.id === ele.id 
            )
        );let videos = vid.filter(
          (ele, ind) =>
            ind ===
            vid.findIndex(
              (elem) =>
                elem.id === ele.id 
            )
        );
        SetVid([...videos,...data.videos]);
        localStorage.setItem(search+' video', JSON.stringify([...video,...data.videos]));
        localStorage.setItem('video', JSON.stringify([...videos,...data.videos]));
        localStorage.setItem(search+' nextVideo', JSON.stringify(data.page));
        setVideo([...video, ...data.videos]);
        setCount(data.page);
      });}
  };

  useEffect(() => {
    setVideo([]);
    getImg();
  }, [search]);

  useEffect(() => {
    localStorage.setItem('FavVideo', JSON.stringify([...fav]));

  }, [fav]);


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
            //console.log(Vido);
            return (
              <div className={styles.Card} key={index}>
                <img src={item.image} 
                alt=""></img>
                <img onClick={() => {
                  history.push('/VideoPlay/'+`${item.id}`);
                }} src={playButton} className={styles.playButton} />
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

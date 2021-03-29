import React from 'react';

import styles from './Photos.module.scss';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
//import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUser } from '../../ContextApis/ProvideUser';
import {useHistory} from 'react-router-dom';
import filledHeart from '../../assets/Icon-heart-deselect.png';
import outlineHeart from '../../assets/video-favorite.png';

const Photos = ({ search }) => {
  
  
  const [nextLink, SetNextLink] = useState('');
  const [heart, setHeart] = useState(false);
  const { fav, setFav, img, setImg ,photo,setPhoto,setSearch} = useUser();
  //const [favo,setFavo]=useState([]);
  let history=useHistory();
  let image = img.filter(
    (ele, ind) =>
      ind ===
      img.findIndex(
        (elem) =>
          elem.id === ele.id 
      )
  );

  const url = 'https://api.pexels.com/v1/search?query=';
  const getImg = () => {
    console.log(search);
    setSearch(search);
    if(!localStorage.getItem(search+' photo'))
    {
      console.log('hello');
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
        // let Photo = photo.filter(
        //   (ele, ind) =>
        //     ind ===
        //     photo.findIndex(
        //       (elem) =>
        //         elem.id === ele.id 
        //     )
        // );
        localStorage.setItem(search+' photo', JSON.stringify([...val,...data.photos]));
        localStorage.setItem('photo', JSON.stringify([...photo,...data.photos]));
        localStorage.setItem(search+' next', JSON.stringify(data.next_page));
        setPhoto([...photo,...data.photos]);
        setImg([...val, ...data.photos]);
        SetNextLink(data.next_page);
        
      });
    }else{
      let data=JSON.parse(localStorage.getItem(search+' photo'))||'{}';
      setImg(data);
      image=[data];
      let key=JSON.parse(localStorage.getItem(search+' next'))||'{}';
      SetNextLink(key);
    }
  };

  const newUrl = () => {
    let val=JSON.parse(localStorage.getItem(search+' next'))||'{}';
    console.log(val,nextLink);
    if(val===nextLink)
    {
    console.log('hello');
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
        let image = img.filter(
          (ele, ind) =>
            ind ===
            img.findIndex(
              (elem) =>
                elem.id === ele.id 
            )
        );
        let Photo = photo.filter(
          (ele, ind) =>
            ind ===
            photo.findIndex(
              (elem) =>
                elem.id === ele.id 
            )
        );

        setPhoto([...Photo,...data.photos]);
        localStorage.setItem(search+' photo', JSON.stringify([...image,...data.photos]));
        localStorage.setItem('photo', JSON.stringify([...Photo,...data.photos]));
        localStorage.setItem(search+' next', JSON.stringify(data.next_page));
        setImg([...image, ...data.photos]);
        SetNextLink(data.next_page);
        
      });
    }
    else{

      console.log("elsePart",nextLink);
    }
  };
  useEffect(() => {
    setImg([]);
    getImg();
  }, [search]);

  useEffect(() => {
    localStorage.setItem('Fav', JSON.stringify([...fav]));

  }, [fav]);
  
  return (
    <div className={styles.Photos}>
      <InfiniteScroll
        dataLength={img}
        next={newUrl}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.column}>
          {image.map((item, index) => {
            return (
              <div className={styles.Card} key={index}>
                <img onClick={() => {
                    history.push('/PhotoDetails/'+`${item.id}`);
                }} src={item.src.small} alt=""></img>
                <img src={oval} className={styles.OvalImg}></img>
                <h3>{item.photographer}</h3>
                <button
                  className={styles.Button}
                  onClick={() =>{ {
                                fav.length!==0?fav.find((elem) => {
                                  return elem === item.id;
                                })
                                  ? setFav(
                                      fav.filter((elem) => elem !== item.id)
                                    )
                                  : setFav((fav) => [...fav, item.id]):null;
                              }
                              
                    // {
                    //   favo.find((ele) => {
                    //     return ele === item.id;
                    //   })
                    //     ? localStorage.setItem('Fav', JSON.stringify(favo?favo.filter((ele) => ele !== item.id):[]))
                    //     : localStorage.setItem('Fav', JSON.stringify([...favo, item.id]));
                    // }
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

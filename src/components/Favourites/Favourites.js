import React ,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './Favourites.module.scss';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/Icon-heart-deselect.png';
import outlineHeart from '../../assets/video-favorite.png';
import oval from '../../assets/Group 2/Oval Copy.png';
import playButton from '../../assets/ShapeCopy6.png';

const Favourites = () => {
  const { fav, setFav,favVideo} = useUser();
  let history=useHistory();
  useEffect(() => {
    localStorage.setItem('Fav', JSON.stringify([...fav]));
  }, [fav]);
  
let image=JSON.parse(localStorage.getItem('photo'))||'{}';

useEffect(() => {
  localStorage.setItem('Fav', JSON.stringify([...fav]));
}, [favVideo]);
let Video=JSON.parse(localStorage.getItem('video'))||'{}';


let data= fav.filter(
    (ele) =>
     ele!=='['&&ele!==']'&&ele!=='}'&&ele!='{'
  );

  return (
    <div className={styles.Favourites}>
      <div className={styles.column}>
        {data.map((item, index) => {
          return (
            <div className={styles.Card} key={index}>
              {image.find((ele) => {
                return ele.id === item;
              })
                ? image
                    .filter((ele) => ele.id === item)
                    .map((ele, i) => {
                      return (
                        <div className={styles.Card} key={i}>
                          <img src={ele.src.small} 
                          onClick={() => {
                            history.push('/PhotoDetails/'+`${ele.id}`);
                        }} alt=""></img>
                          <img src={oval} className={styles.OvalImg}></img>
                          <h3>{ele.photographer}</h3>
                          <button
                            className={styles.Button}
                            onClick={() => {
                              {
                                fav.find((elem) => {
                                  return elem === ele.id;
                                })
                                  ? setFav(
                                      fav.filter((elem) => elem !== ele.id),
                                    )
                                  : setFav((fav) => [...fav, ele.id]);
                              }
                              
                            }}
                          >
                            {fav.find((elem) => {
                              return elem === ele.id;
                            }) ? (
                              <img
                                src={outlineHeart}
                                className={styles.filled}
                              />
                            ) : (
                              <img
                                src={filledHeart}
                                className={styles.outline}
                              />
                            )}
                          </button>
                        </div>
                      );
                    })
                : Video
                    .filter((ele) => ele.id === item)
                    .map((ele, i) => {
                      ele.id === item;
                      return (
                        <div className={styles.Card} key={i}>
                          <img src={ele.image} alt=""></img>
                          <img onClick={() => {
                            history.push('/VideoPlay/'+`${ele.id}`);
                          }} src={playButton} className={styles.playButton} />
                          <img src={oval} className={styles.OvalImg}></img>
                          <h3>{ele.user.name}</h3>
                          <button
                            className={styles.Button}
                            onClick={() => {
                              {
                                fav.find((elem) => {
                                  return elem === ele.id;
                                })
                                  ? setFav(
                                      fav.filter((elem) => elem !== ele.id),
                                    )
                                  : setFav((fav) => [...fav, ele.id]);
                              }
                            }}
                          >
                            {fav.find((elem) => {
                              return elem === ele.id;
                            }) ? (
                              <img
                                src={outlineHeart}
                                className={styles.filled}
                              />
                            ) : (
                              <img
                                src={filledHeart}
                                className={styles.outline}
                              />
                            )}
                          </button>
                        </div>
                      );
                    })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;

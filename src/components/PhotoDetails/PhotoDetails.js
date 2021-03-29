import React ,{useEffect}from 'react';
import {useLocation} from 'react-router-dom';
import oval from '../../assets/Group 2/Oval Copy.png';
import styles from './PhotoDetails.module.scss';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/video-facorite-deselct.png';
import outlineHeart from '../../assets/video-favorite.png';

const PhotoDetails = ({ ...props }) => {
  const { fav, setFav, img, video ,search} = useUser();
  const location=useLocation();
  const path=location.pathname.split('/');
  //let favo=JSON.parse(localStorage.getItem('Fav'))||'{}';

  let imagedata=JSON.parse(localStorage.getItem('photo'))||'{}';
let image = imagedata.filter(
  (ele, ind) =>
    ind ===
    imagedata.findIndex(
      (elem) =>
        elem.id === ele.id 
    )
);
useEffect(() => {
  localStorage.setItem('FavPhoto', JSON.stringify([...fav]));
}, [fav]);
 
  return (<div className={styles.PhotoDetails}>
    {image.filter((ele) => ele.id === path[2]*1)
                    .map((ele, i) => {
                      return (
                        <div className={styles.Card} key={i}>
                          <img src={ele.src.original} alt=""></img>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
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
                             
                              // {
                              //   favo.find((elem) => {
                              //     return elem === ele.id;
                              //   })
                              //     ? localStorage.setItem('Fav', JSON.stringify(favo?favo.filter((elem) => elem !== ele.id):[]))
                              //     : localStorage.setItem('Fav', JSON.stringify([...favo, ele.id]));
                              // }
                            }
                          }
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
  </div>);
};

export default PhotoDetails;

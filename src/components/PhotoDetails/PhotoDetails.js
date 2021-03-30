import React ,{useEffect}from 'react';
import {useLocation} from 'react-router-dom';
import oval from '../../assets/Group 2/Oval Copy.png';
import styles from './PhotoDetails.module.scss';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/video-facorite-deselct.png';
import outlineHeart from '../../assets/video-favorite.png';
import { MdZoomIn,MdZoomOut} from "react-icons/md";

const PhotoDetails = () => {
  const { fav, setFav, img} = useUser();
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
  localStorage.setItem('Fav', JSON.stringify([...fav]));
}, [fav]);



function zoomin(){
  var myImg = document.getElementById("map");
  var mycard = document.getElementById("card");
  var currWidth = myImg.clientWidth;
  if(currWidth == 2500) return false;
   else{
      myImg.style.width = (currWidth + 100) + "px";
      mycard.style.overflow=scroll;
  } 
}
function zoomout(){
  var myImg = document.getElementById("map");
  var mycard = document.getElementById("card");
  var currWidth = myImg.clientWidth;
  if(currWidth == 100) return false;
else{
      myImg.style.width = (currWidth - 100) + "px";
      mycard.style.overflow=scroll;
  }
}

 
  return (<div className={styles.PhotoDetails}>
    {image.filter((ele) => ele.id === path[2]*1)
                    .map((ele, i) => {
                      return (
                        <div id="card" className={styles.Card} key={i}>
                          <img id="map" src={ele.src.original} alt=""></img>
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
                        <button className={styles.zoomIn}
                        onClick={()=>zoomin()}
                        ><MdZoomIn size={40} color={'#7A0022'}/></button>
                          <button 
                          onClick={()=>zoomout()}
                          className={styles.zoomOut}><MdZoomOut size={40} color={'#7A0022'}/></button>
                        </div>
                      );
                    })}
  </div>);
};

export default PhotoDetails;

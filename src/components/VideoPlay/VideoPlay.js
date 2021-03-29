import React,{useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/video-facorite-deselct.png';
import outlineHeart from '../../assets/video-favorite.png';
import playButton from '../../assets/Shape Copy 7.png';
import maxScreen from '../../assets/Combined Shape (2).png';
import playbutton from '../../assets/Fill 1.png';
import pauseButton from '../../assets/Combined Shape (3).png';
import styles from './VideoPlay.module.scss';

const VideoPlay = ({ ...props }) => {
  const { fav, setFav, img, video ,search} = useUser();
  const location=useLocation();
  const path=location.pathname.split('/');
  let videoref=useRef(null);
  
  //let favo=JSON.parse(localStorage.getItem('Fav'))||'{}';

  let videodata=JSON.parse(localStorage.getItem('video'))||'{}';
let Video = videodata.filter(
  (ele, ind) =>
    ind ===
    videodata.findIndex(
      (elem) =>
        elem.id === ele.id 
    )
);
useEffect(() => {
  localStorage.setItem('Fav', JSON.stringify([...fav]));
}, [fav]);
var myVideo = document.getElementById("video1");
const getVideo=(ele)=>{videoref=ele;};
const [show,setShow]=React.useState(true);
const playVideo=()=>{
    
    videoref.current.play();
    setShow(prev=>!prev);
    };
// const playVideo=()=>{
//   if(show)
//   {
//   videoref.current.play();
//   setShow(prev=>!prev);
//   }
// else{
//   videoref.current.pause();
//   setShow(prev=>!prev);
// }};


  return (<div className={styles.VideoPlay}>
    {Video.filter((ele) => ele.id === path[2]*1)
                    .map((ele, i) => {
                      //console.log(ele.id === path[2]*1);
                      return (<div className={styles.PlayerDiv} key={i}>
    <video ref={videoref} width="925" height="522" controls className={styles.VideoPlayer} >
      <source  src={ele.video_files[0].link} type="video/mp4"/>
</video>
<div onClick={()=>{playVideo();}}>
  <img className={show?styles.PlayBtn:styles.PlayBtnHide} src={playButton}/>
</div>
{/* <div className={styles.PlayPauseBtn}>{show?
  <img onClick={()=>playVideo()} src={playbutton}/>:
  <img onClick={()=>playVideo()} src={pauseButton}/>}</div>
  <div><img src={}/></div> */}
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
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

export default VideoPlay;

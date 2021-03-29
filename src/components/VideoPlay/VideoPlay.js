import React,{useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/video-facorite-deselct.png';
import outlineHeart from '../../assets/video-favorite.png';
import playButton from '../../assets/Shape Copy 7.png';
import styles from './VideoPlay.module.scss';

const VideoPlay = ({ ...props }) => {
  const { fav, setFav, img, video ,search} = useUser();
  const location=useLocation();
  const path=location.pathname.split('/');
  let videoref=useRef(null);
  var myVideo = document.getElementById("video1");
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
const getVideo=(ele)=>{videoref=ele;};
const playVideo=()=>{myVideo.play();};


  return (<div className={styles.VideoPlay}>
    {Video.filter((ele) => ele.id === path[2]*1)
                    .map((ele, i) => {
                      console.log(ele.id === path[2]*1);
                      return (<div key={i}>
    <video id="video1" width="940" height="522" controls className={styles.VideoPlayer} >
      <source  src={ele.video_files[0].link} type="video/mp4"/>
</video>
<div onClick={playVideo}><img src={playButton}/></div></div>
                    );
                  })}
  </div>);
};

export default VideoPlay;

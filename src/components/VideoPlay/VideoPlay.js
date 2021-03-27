import React from 'react';

import styles from './VideoPlay.module.scss';

const VideoPlay = ({ ...props }) => {
  return (<div className={styles.VideoPlay}>
    <video width="750" height="500" controls >
      <source src="https://player.vimeo.com/external/363737105.sd.mp4?s=ed5d8790d07ac8b5a7641fe4d816b00c1e049935&profile_id=165&oauth2_token_id=57447761" type="video/mp4"/>
</video>
  </div>);
};

export default VideoPlay;

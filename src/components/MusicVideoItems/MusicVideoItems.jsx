import React from 'react';
import YouTube from 'react-youtube'
import './MusicVideoItems.css'

const opts = {
  height: '350',
  width: '580',
}

const MusicVideoItems = props => (
    <YouTube
      videoId={props.videoId}
      opts={opts}
    />
  );

export default MusicVideoItems;

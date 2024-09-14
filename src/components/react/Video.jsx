import React from 'react';

const Video = ({ 
  src, 
  type = 'video/mp4', 
  youtube, 
  bilibili, 
  width = '100%', 
  height = 'auto', 
  autoplay = false 
}) => {
  if (youtube) {
    const youtubeUrl = `https://www.youtube.com/embed/${youtube}${autoplay ? '?autoplay=1' : ''}`;
    return (
      <iframe
        width={width}
        height={height}
        src={youtubeUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  if (bilibili) {
    const bilibiliUrl = `https://player.bilibili.com/player.html?bvid=${bilibili}&high_quality=1&danmaku=0&autoplay=${autoplay ? 1 : 0}`;
    return (
      <iframe
        src={bilibiliUrl}
        width={width}
        height={height}
        frameBorder="0"
        allow="fullscreen"
        allowFullScreen
        style={{ border: 'none', overflow: 'hidden' }}
      ></iframe>
    );
  }

  return (
    <video width={width} height={height} controls autoPlay={autoplay}>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
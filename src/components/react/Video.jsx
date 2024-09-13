import React from 'react';

const Video = ({ src, type = 'video/mp4', youtube, bilibili, width = '100%', height = 'auto' }) => {
  if (youtube) {
    return (
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${youtube}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  if (bilibili) {
    return (
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${bilibili}&high_quality=1&danmaku=0`}
        width={width}
        height={height}
        scrolling="no"
        border="0"
        frameBorder="no"
        framespacing="0"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <video width={width} height={height} controls>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
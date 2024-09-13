import React from 'react';

const Video = ({ src, type = 'video/mp4', youtube, width = '100%', height = 'auto' }) => {
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

  return (
    <video width={width} height={height} controls>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
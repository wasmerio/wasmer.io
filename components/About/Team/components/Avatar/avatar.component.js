import React from 'react';

export const getImageUrl = (image) => {
  const unknown = 'unknown.png';
  return `/images/team/${image ? image : unknown}`;
}

export const AvatarComponent = ({ image, name }) => {
  return (
    <div className="bg-lightgrey rounded flex justify-center items-start">
      <img src={getImageUrl(image)} alt={name} />
    </div>
  );
};

import React from 'react';

export const AvatarComponent = ({ image, name }) => {
  const unknown = 'unknown.png';
  return (
    <div className="bg-lightgrey rounded flex justify-center items-start">
      <img src={`images/team/${image ? image : unknown}`} alt={name} />
    </div>
  );
};

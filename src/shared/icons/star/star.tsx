import React from 'react';
import StarIcon from './star.svg';

interface SvgIconProps {
  className?: string;
}

const Star: React.FC<SvgIconProps> = ({ className }) => {
  return <img src={StarIcon} className={className} alt="Star icon" />;
};

export default Star;

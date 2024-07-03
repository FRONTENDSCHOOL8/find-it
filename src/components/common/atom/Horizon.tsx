import React from 'react';

interface HorizonProps {
  lineBold: 'bold' | 'thin';
  lineWidth: 'short' | 'long';
}

const Horizon: React.FC<HorizonProps> = ({ lineBold, lineWidth }) => {
  let style: string = '';

  if (lineBold === 'thin' && lineWidth === 'short') {
    style = 'h-[0.4px] w-315px bg-gray-300';
  } else if (lineBold === 'bold' && lineWidth === 'short') {
    style = 'h-1px w-315px bg-gray-300';
  } else if (lineBold === 'thin' && lineWidth === 'long') {
    style = 'h-[0.4px] w-375px bg-gray-300';
  } else if (lineBold === 'bold' && lineWidth === 'long') {
    style = 'h-1px w-375px bg-gray-300';
  }

  return <div className={style}></div>;
};

export default Horizon;

import React from 'react';

function HCard({index, title, image }) {
  return (
    <div className='md:max-w-5xl md:max-h-[35rem] overflow-hidden border border-black rounded bg-black'>
      <img src={require(`${image}`)} alt={title} className='object-center'/>
    </div>
  );
}

export default HCard;
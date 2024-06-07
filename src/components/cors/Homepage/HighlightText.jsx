import React from 'react';

const HighlightText = ({ text }) => {
  return (
    <span className='font-bold' style={{
      background: 'linear-gradient(to right, #6B46C1, #00B4D8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
        {" "}
      {text}
    </span>
  );
};

export default HighlightText;

import React from 'react';
import Confetti from 'react-confetti';

const Confettis = ({ width, height, confettiPieces }) => {
  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={confettiPieces}
        gravity={0.2}
        colors={['#ff009d', '#61368C', '#fff']}
      />
      <div className="balloons-container">
        <img src="/images/file.png" alt="celebration" className="balloon-image" />
        <img src="/images/file.png" alt="celebration" className="balloon-image" />
        <img src="/images/file.png" alt="celebration" className="balloon-image" />
      </div>
    </>
  );
};

export default Confettis;

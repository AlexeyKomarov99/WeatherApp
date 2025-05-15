import React from 'react';
import styled, { keyframes } from 'styled-components';

const Compass = ({ windDegree, windSpeed, windDir, unit }) => {
  // Преобразуем градусы в отрицательные для правильного отображения в CSS
  const rotation = windDegree ? `rotate(${-windDegree}deg)` : 'rotate(0deg)';

  return (
    <CompassContainer>
      <CompassBackground>
        <CompassRose style={{ transform: rotation }}>
          <CompassArrow />
        </CompassRose>
        <CompassDirections>
          <Direction>N</Direction>
          <Direction>E</Direction>
          <Direction>S</Direction>
          <Direction>W</Direction>
        </CompassDirections>
      </CompassBackground>
      <WindInfo>
        <WindSpeed>
          {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}
        </WindSpeed>
        <WindDirection>{windDir}</WindDirection>
      </WindInfo>
    </CompassContainer>
  );
};

// Анимация для плавного поворота компаса
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CompassContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px auto;
`;

const CompassBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #ddd;
`;

const CompassRose = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  transition: transform 0.5s ease-out;
  animation: ${rotateAnimation} 2s linear infinite;
`;

const CompassArrow = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 4px;
  height: 40%;
  background: red;
  transform: translateX(-50%);
  border-radius: 4px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid red;
    transform: translateX(-50%) translateY(-100%);
  }
`;

const CompassDirections = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Direction = styled.span`
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  
  &:nth-child(1) { top: 5%; left: 50%; transform: translateX(-50%); } /* N */
  &:nth-child(2) { top: 50%; right: 5%; transform: translateY(-50%); } /* E */
  &:nth-child(3) { bottom: 5%; left: 50%; transform: translateX(-50%); } /* S */
  &:nth-child(4) { top: 50%; left: 5%; transform: translateY(-50%); } /* W */
`;

const WindInfo = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const WindSpeed = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const WindDirection = styled.div`
  font-size: 18px;
  color: #666;
  margin-top: 5px;
`;

export default Compass;
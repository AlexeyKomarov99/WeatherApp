import React from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

const Barometer = ({ pressure }) => {
  const notchesCount = 45;
  const radius = 50;
  const centerX = 60;
  const centerY = 80;
  const notchLength = 10;
  const arcDegrees = 240;
  const startAngle = -210;

  // Генерация черточек
  const notches = Array.from({ length: notchesCount }).map((_, index) => {
    const angle = startAngle + (arcDegrees / (notchesCount - 1)) * index;
    const angleRad = (angle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(angleRad);
    const y1 = centerY + radius * Math.sin(angleRad);
    const x2 = centerX + (radius - notchLength) * Math.cos(angleRad);
    const y2 = centerY + (radius - notchLength) * Math.sin(angleRad);
    
    return { x1, y1, x2, y2 };
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Черточки дуги */}
        {notches.map((notch, i) => (
          <line
            key={i}
            x1={notch.x1}
            y1={notch.y1}
            x2={notch.x2}
            y2={notch.y2}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        
        {/* Текст давления */}
        <text
          x={centerX}
          y={centerY - 4}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
        >
          {pressure}
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          fontSize="12"
          fill="white"
        >
          мм рт. ст.
        </text>
        
        {/* Стрелки вверх и вниз */}
        <foreignObject x={centerX - 20} y="100" width="40" height="30">
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            color: 'white',
            fontSize: '20px' // увеличенный размер стрелок
          }}>
            <FaArrowDownLong />
            <FaArrowUpLong />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default Barometer;
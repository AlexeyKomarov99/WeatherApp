import React from 'react';

const CircleWithCompass = ({
  radius = 100,
  strokeWidth = 2,
  markLength = 10,
  fontSize = 16,
  arrowAngle = 0,
  windSpeed = "0 м/с",
  innerCircleRadius = 15,
  arrowHeadSize = 10,
  arrowWidth = 4,
  arrowEndCircleRadius = 8,
  arrowEndCircleStrokeWidth = 2,
  arrowEndCircleScale = 1,
}) => {
  // Рассчитываем размеры с учетом всех элементов
  const center = radius + strokeWidth;
  const size = center * 2;
  const letterRadius = radius - markLength - fontSize * 1.5;
  const arrowLength = radius * 2;

  // Направления компаса
  const directions = [
    { letter: 'С', angle: -90 },  // Север (вверх)
    { letter: 'В', angle: 0 },    // Восток (право)
    { letter: 'Ю', angle: 90 },   // Юг (низ)
    { letter: 'З', angle: 180 },  // Запад (лево)
  ];

  // Корректировка угла стрелки
  const correctedAngle = (arrowAngle + 180 - 90) % 360;
  const arrowAngleRad = (correctedAngle * Math.PI) / 180;

  // Координаты стрелки
  const arrowStartX = center - (arrowLength / 2) * Math.cos(arrowAngleRad);
  const arrowStartY = center - (arrowLength / 2) * Math.sin(arrowAngleRad);
  const arrowEndX = center + (arrowLength / 2) * Math.cos(arrowAngleRad);
  const arrowEndY = center + (arrowLength / 2) * Math.sin(arrowAngleRad);
  const scaledArrowEndCircleRadius = arrowEndCircleRadius * arrowEndCircleScale;

  return (
    <div style={{
      width: '120px',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <svg 
        viewBox={`0 0 ${size} ${size}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        {/* Основная окружность */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="black"
          strokeWidth={strokeWidth}
        />

        {/* 360 черточек */}
        {Array.from({ length: 360 }).map((_, index) => {
          const angle = (index * Math.PI) / 180;
          const x1 = center + radius * Math.cos(angle);
          const y1 = center + radius * Math.sin(angle);
          const x2 = center + (radius - markLength) * Math.cos(angle);
          const y2 = center + (radius - markLength) * Math.sin(angle);

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth={strokeWidth}
            />
          );
        })}

        {/* Буквы направлений */}
        {directions.map((dir, i) => {
          const angleRad = (dir.angle * Math.PI) / 180;
          const x = center + letterRadius * Math.cos(angleRad);
          const y = center + letterRadius * Math.sin(angleRad);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight="bold"
              fill="black"
            >
              {dir.letter}
            </text>
          );
        })}

        {/* Стрелка направления ветра */}
        <line
          x1={arrowStartX}
          y1={arrowStartY}
          x2={arrowEndX}
          y2={arrowEndY}
          stroke="red"
          strokeWidth={arrowWidth}
          strokeLinecap="round"
        />

        {/* Наконечник стрелки */}
        <polygon
          points={`
            ${arrowEndX},${arrowEndY} 
            ${arrowEndX - arrowHeadSize * Math.cos(arrowAngleRad - Math.PI / 6)},${arrowEndY - arrowHeadSize * Math.sin(arrowAngleRad - Math.PI / 6)} 
            ${arrowEndX - arrowHeadSize * Math.cos(arrowAngleRad + Math.PI / 6)},${arrowEndY - arrowHeadSize * Math.sin(arrowAngleRad + Math.PI / 6)}
          `}
          fill="red"
        />

        {/* Окружность на противоположном конце */}
        <circle
          cx={arrowStartX}
          cy={arrowStartY}
          r={scaledArrowEndCircleRadius}
          fill="white"
          stroke="red"
          strokeWidth={arrowEndCircleStrokeWidth}
        />

        {/* Внутренняя окружность */}
        <circle
          cx={center}
          cy={center}
          r={innerCircleRadius}
          fill="white"
          stroke="black"
          strokeWidth={strokeWidth}
        />

        {/* Скорость ветра */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight="bold"
          fill="black"
        >
          {windSpeed}
        </text>
      </svg>
    </div>
  );
};

export default CircleWithCompass;
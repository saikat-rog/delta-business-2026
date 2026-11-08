import React from 'react';

interface TezLogoProps {
  color?: string;
  height?: number | string;
  className?: string;
}

export const TezLogo: React.FC<TezLogoProps> = ({
  color = '#0445DA',
  height = 24,
  className = '',
}) => {
  return (
    <div
      className={`tez-logo-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      <svg
        height={height}
        viewBox="0 0 240 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: height, width: 'auto', display: 'block' }}
      >
        {/* Dynamic Forward-Slanted Hexagon / Fast Parcel Icon */}
        <g transform="translate(0, 4)">
          <path
            d="M24 2L42 12V32L24 42L6 32V12L24 2Z"
            fill={color}
            opacity="0.12"
          />
          <path
            d="M24 2L42 12L24 22L6 12L24 2Z"
            fill={color}
          />
          <path
            d="M6 12V32L24 42V22L6 12Z"
            fill={color}
            opacity="0.75"
          />
          <path
            d="M42 12V32L24 42V22L42 12Z"
            fill={color}
            opacity="0.9"
          />
          {/* Swift speed lines / delivery arrow inside */}
          <path
            d="M16 22L24 17L32 22L24 27L16 22Z"
            fill="#FFFFFF"
          />
        </g>

        {/* TEZ */}
        <text
          x="54"
          y="35"
          fontFamily="'Titillium Web', sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="1px"
          fill={color}
        >
          TEZ
        </text>

        {/* PARCEL */}
        <text
          x="118"
          y="35"
          fontFamily="'Titillium Web', sans-serif"
          fontWeight="700"
          fontSize="30"
          letterSpacing="2px"
          fill={color}
          opacity="0.88"
        >
          PARCEL
        </text>

        {/* Location Pin Accent mark over last letter */}
        <g transform="translate(222, 6) scale(0.65)">
          <path
            d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};

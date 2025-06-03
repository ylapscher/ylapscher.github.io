"use client";

import React from 'react';

const FloatingBadge = () => {
  const badgeStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#D97706', // Elegant orange (Amber 600)
    color: 'white',
    padding: '12px 18px', // Adjusted padding
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensure it's above other content
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    borderRadius: '8px', // Simple rounded corners
  };

  const linkProps = {
    href: 'https://www.samstorybook.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
    style: badgeStyle,
    onMouseOver: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = 'scale(1.05)';
    },
    onMouseOut: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <a {...linkProps}>
      Order Baby Book!
    </a>
  );
};

export default FloatingBadge;

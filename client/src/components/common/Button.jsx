import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-tech-accent text-slate-900 hover:bg-sky-300 focus:ring-sky-400 font-bold",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 font-bold",
    outline: "border-2 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white focus:ring-slate-500",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
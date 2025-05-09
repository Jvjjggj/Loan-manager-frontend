import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
    return (
        <button className={`btn-${variant} btn-${size}`} {...props}>
            {children}
        </button>
    );
};

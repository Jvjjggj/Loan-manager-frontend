import React from 'react';

export const DropdownMenu = ({ children }) => {
    return (
        <div className="dropdown">
            {children}
        </div>
    );
};

export const DropdownMenuTrigger = ({ children }) => <div className="trigger">{children}</div>;
export const DropdownMenuContent = ({ children }) => <div className="content">{children}</div>;
export const DropdownMenuItem = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;

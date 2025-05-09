import React from 'react';

export const Table = ({ children }) => {
    return (
        <table className="table-auto w-full">{children}</table>
    );
};

export const TableBody = ({ children }) => <tbody>{children}</tbody>;
export const TableHeader = ({ children }) => <thead>{children}</thead>;
export const TableRow = ({ children }) => <tr>{children}</tr>;
export const TableCell = ({ children }) => <td>{children}</td>;
export const TableHead = ({ children }) => <th>{children}</th>;

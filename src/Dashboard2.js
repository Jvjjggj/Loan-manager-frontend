import { useState, useEffect, useRef } from 'react';

import './app/Dashboard.css'

import {
    Bell,
    MessageCircle,
    User,
    Search,
    Filter,
    ArrowLeft,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Assuming you have Dashboard.css

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleNavigation = (role) => {
        setIsDropdownOpen(false);
        switch (role) {
            case 'User':
                navigate('/user-dashboard');
                break;
            case 'Verifier':
                navigate('/verifier-dashboard');
                break;
            case 'Admin':
                navigate('/admin-dashboard');
                break;
            default:
                break;
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="logo">CREDIT APP</h1>
                <button className="menu-button">☰</button>
            </div>
            <div className="header-right">
                <Bell className="icon" />
                <MessageCircle className="icon" />
                <div className="user-info" onClick={toggleDropdown} ref={dropdownRef}>
                    <div className="user-icon">
                        <User size={16} />
                    </div>
                    <span className="user-name1">User</span>
                    <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>

                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul>
                                <li id='l' onClick={() => handleNavigation('User')}>User</li>
                                <li id='l' onClick={() => handleNavigation('Verifier')}>Verifier</li>
                                <li id='l' onClick={() => handleNavigation('Admin')}>Admin</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const UserDashboard = () => {
    const [loanApplications] = useState([
        {
            loanOfficer: 'John Okoh',
            amount: '50,000.00',
            dateApplied: 'June 09, 2021',
            status: 'Pending',
            updated: '1 day ago'
        },
        {
            loanOfficer: 'John Okoh',
            amount: '100,000.00',
            dateApplied: 'June 07, 2021',
            status: 'Verified',
            updated: '1 day ago'
        },
        {
            loanOfficer: 'John Okoh',
            amount: '100,000.00',
            dateApplied: 'June 07, 2021',
            status: 'Rejected',
            updated: '1 day ago'
        },
        {
            loanOfficer: 'John Okoh',
            amount: '100,000.00',
            dateApplied: 'May 27, 2021',
            status: 'Approved',
            updated: '1 day ago',
            fullyPaid: true
        }
    ]);

    return (
        <div className="user-dashboard-container">
            <Header />
            <div className="main-content">
                <div className="user-header">
                    <div className="deficit-card">
                        <p className="deficit-label">Deficit</p>
                        <p className="deficit-amount">₦ 0.00</p>
                    </div>
                    <div className="button-group">
                        <button className="get-loan-button">Get A Loan</button>
                        <button className="borrow-cash-button">Borrow Cash</button>
                        <button className="transact-button">Transact</button>
                        <button className="deposit-cash-button">Deposit Cash</button>
                    </div>
                </div>

                <div className="search-filter">
                    <div className="search-bar">
                        <Search size={16} className="search-icon" />
                        <input type="text" placeholder="Search for loans" className="search-input" />
                    </div>
                    <div className="filter-options">
                        <button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.97 1.13a.75.75 0 0 0-1.06 1.06L7.73 5.43a.75.75 0 0 0-1.06 0L3.09 2.19a.75.75 0 0 0-1.06-1.06L.102 3.283A.75.75 0 0 0 0 4v10a.75.75 0 0 0 .75.75h14.5a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.102-.717l-2.185-2.15Zm-3.79 2.173a.75.75 0 0 1 1.06 0l3.5 3.32a.75.75 0 0 1 0 1.06l-3.5 3.32a.75.75 0 0 1-1.06-1.06l2.95-2.79v-2.17h-2.95a.75.75 0 0 1-1.06-.71l-.53-.53a.75.75 0 0 1 0-1.06l.53-.53a.75.75 0 0 1 1.06-.71h2.95v2.17l-2.95-2.79a.75.75 0 0 1 0-1.06Z" />
                            </svg>
                            Sort
                        </button>
                        <button className="filter-button">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="loan-applications-section">
                    <h2 className="table-heading">Applied Loans</h2>
                    <div className="table-container">
                        <table className="loan-applications-table">
                            <thead>
                                <tr>
                                    <th>Loan Officer</th>
                                    <th>Amount</th>
                                    <th>Date Applied</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanApplications.map((loan, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="loan-officer-info">
                                                <User size={24} className="user-icon" />
                                                <span className="loan-officer-name">{loan.loanOfficer}</span>
                                            </div>
                                        </td>
                                        <td>{loan.amount}</td>
                                        <td>
                                            <div className="date-time-info">
                                                <span className="date">{loan.dateApplied}</span>
                                                {loan.updated && <span className="time">Updated {loan.updated}</span>}
                                                {loan.fullyPaid && <span className="fully-paid">Loan Fully Paid</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`status ${loan.status.toLowerCase()}`}
                                            >
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td><MoreHorizontal size={20} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <div className="rows-per-page">
                            Rows per page:
                            <select>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </select>
                        </div>
                        <div className="pagination-controls">
                            <span>1-4 of 4</span>
                            <button>
                                <ArrowLeft size={16} />
                            </button>
                            <button>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

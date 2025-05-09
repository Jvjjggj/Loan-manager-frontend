import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Bell,
  MessageCircle,
  User,
  Home,
  Users,
  DollarSign,
  Repeat,
  Sliders,
  FileText,
  PieChart,
  Clipboard,
  Settings,
  LogOut,
  Calendar,
  Briefcase,
  PenTool,
  PiggyBank,
  Layers,
  MoreHorizontal, // Import the MoreHorizontal icon
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">

      <div className="user-name" color='white'>John Okoh</div>
    </div>
    <ul className="sidebar-menu">
      <li><Home /> Dashboard</li>
      <li><Users /> Borrowers</li>
      <li><DollarSign /> Loans</li>
      <li><Repeat /> Repayments</li>
      <li><Sliders /> Loan Parameters</li>
      <li><PieChart /> Accounting</li>
      <li><FileText /> Reports</li>
      <li><Clipboard /> Collateral</li>
      <li><Users /> Access Configuration</li>
      <li><PiggyBank /> Savings</li>
      <li><Layers /> Expenses</li>
      <li><PenTool /> E-signature</li>
      <li><Briefcase /> Investor Accounts</li>
      <li><Calendar /> Calendar</li>
      <li><Settings /> Settings</li>
      <li><LogOut /> Sign Out</li>
    </ul>
  </div>
);

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
          <span className="user-name1">Verifier</span>
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

const LoanApplicationsPage = () => {
  const [loanCount, setLoanCount] = useState(0);
  const [borrowerCount] = useState(100);
  const [cashDisbursed] = useState(550000);
  const [savings] = useState(450000);
  const [repaidLoans] = useState(30);
  const [cashReceived] = useState(1000000);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [monthlyReleasedData, setMonthlyReleasedData] = useState([]);
  const [outstandingLoanData, setOutstandingLoanData] = useState([]);
  const [repaymentsData, setRepaymentsData] = useState([]);
  const mounted = useRef(true);

  // Fetch loan applications
  useEffect(() => {
    mounted.current = true;
    const fetchData = async () => {
      if (mounted.current) {
        setLoading(true);
        try {
          // Fetch loan applications
          const applicationsResponse = await axios.get('https://loan-manager-backend-y85e.onrender.com/api/applications');
          if (mounted.current) {
            setApplications(applicationsResponse.data);
          }

          // Fetch loan count
          const countResponse = await axios.get('https://loan-manager-backend-y85e.onrender.com/api/applications/count');
          if (mounted.current) {
            setLoanCount(countResponse.data.totalLoans);
          }

          //Mock data for the charts
          const mockMonthlyReleasedData = [
            { month: 'Jan', loans: 400 },
            { month: 'Feb', loans: 300 },
            { month: 'Mar', loans: 500 },
            { month: 'Apr', loans: 200 },
            { month: 'May', loans: 600 },
            { month: 'Jun', loans: 450 },
            { month: 'Jul', loans: 550 },
            { month: 'Aug', loans: 700 },
            { month: 'Sep', loans: 600 },
            { month: 'Oct', loans: 800 },
            { month: 'Nov', loans: 750 },
            { month: 'Dec', loans: 900 },
          ];

          const mockOutstandingLoanData = [
            { month: 'Jan', amount: 10000 },
            { month: 'Feb', amount: 15000 },
            { month: 'Mar', amount: 12000 },
            { month: 'Apr', amount: 18000 },
            { month: 'May', amount: 20000 },
            { month: 'Jun', amount: 17000 },
            { month: 'Jul', amount: 22000 },
            { month: 'Aug', amount: 25000 },
            { month: 'Sep', amount: 23000 },
            { month: 'Oct', amount: 28000 },
            { month: 'Nov', amount: 26000 },
            { month: 'Dec', amount: 30000 },
          ];

          const mockRepaymentsData = [
            { month: 'Jan', collected: 5000 },
            { month: 'Feb', collected: 4500 },
            { month: 'Mar', collected: 6000 },
            { month: 'Apr', collected: 5500 },
            { month: 'May', collected: 7000 },
            { month: 'Jun', collected: 6500 },
            { month: 'Jul', collected: 7500 },
            { month: 'Aug', collected: 8000 },
            { month: 'Sep', collected: 7800 },
            { month: 'Oct', collected: 9000 },
            { month: 'Nov', collected: 8500 },
            { month: 'Dec', collected: 10000 },
          ];
          if (mounted.current) {
            setMonthlyReleasedData(mockMonthlyReleasedData);
            setOutstandingLoanData(mockOutstandingLoanData);
            setRepaymentsData(mockRepaymentsData);
          }

        } catch (err) {
          if (mounted.current) {
            setError(err.message || 'Failed to fetch data');
          }
        } finally {
          if (mounted.current) {
            setLoading(false);
          }
        }
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FEC400';
      case 'rejected':
        return '#CC2929';
      case 'verified':
        return 'green';
      default:
        return '';
    }
  };

  // Function to handle status change
  const handleStatusChange = useCallback(async (id, newStatus) => {
    try {
      // Optimistically update the UI
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      setOpenDropdownId(null); // Close dropdown after selection

      // Send API request to update status
      if (newStatus === 'rejected') {
        await axios.patch(`https://loan-manager-backend-y85e.onrender.com/api/applications/${id}/reject`);
      } else if (newStatus === 'verified') {
        await axios.patch(`https://loan-manager-backend-y85e.onrender.com/api/applications/${id}/verify`); // Corrected endpoint
      }
      else {
        await axios.patch(`https://loan-manager-backend-y85e.onrender.com/api/applications/${id}`, { status: newStatus });
      }


      // Show a success message (optional)
      alert(`Loan status updated to ${newStatus}!`);

    } catch (error) {
      console.error("Error updating loan status:", error);
      // Handle error: show error message, revert UI if necessary
      alert('Failed to update loan status. Please try again.');
      // Revert to the original status (optional, if you want to maintain data integrity)
      // setApplications(prevApplications => {
      //   const originalApplication = savedApplications.current.find(app => app._id === id);
      //   return prevApplications.map(app =>
      //     app._id === id ? { ...app, status: originalApplication.status } : app
      //   );
      // });
    }
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'verified':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className='verified-dashboard-container' style={{ minHeight: '100vh' }}>
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-overview">
          <div className="overview-card loans-card">
            <img src="https://res.cloudinary.com/dvjjouwki/image/upload/v1746807623/Vector_ronywx.png" alt="Loans Icon" style={{ width: '48px', height: '48px' }} />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : loanCount}
              </div>
              <div className="label">Loans</div>
            </div>
          </div>

          <div className="overview-card borrowers-card">
            <Users size={48} color="#fff" />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : borrowerCount}
              </div>
              <div className="label">Borrowers</div>
            </div>
          </div>

          <div className="overview-card disbursed-card">
            <img src="https://res.cloudinary.com/dvjjouwki/image/upload/v1746809002/cash-multiple_bszjwd.png" alt="Loans Icon" style={{ width: '48px', height: '48px' }} />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : cashDisbursed}
              </div>
              <div className="label">Cash Disbursed</div>
            </div>
          </div>

          <div className="overview-card savings-card">
            <PiggyBank size={48} color="#fff" />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : savings}
              </div>
              <div className="label">Savings</div>
            </div>
          </div>

          <div className="overview-card repaid-card">
            <Repeat size={48} color="#fff" />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : repaidLoans}
              </div>
              <div className="label">Repaid Loans</div>
            </div>
          </div>

          <div className="overview-card received-card">
            <img src="https://res.cloudinary.com/dvjjouwki/image/upload/v1746809143/tabler_currency-naira_sdeivr.png" alt="Loans Icon" style={{ width: '48px', height: '48px' }} />
            <div className="card-info">
              <div className="count">
                {loading ? 'Loading...' : error ? 'Error' : cashReceived}
              </div>
              <div className="label">Cash Received</div>
            </div>
          </div>
        </div>
        <h2 className="table-heading">Loan Applications</h2>
        {loading && <p>Loading applications...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && applications.length > 0 && (
          <div className="table-container">
            <table className="loan-applications-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Action</th>
                  <th>More Options</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  const statusColor = getStatusColor(application.status);
                  return (
                    <tr key={application._id}>
                      <td>{application.fullName}</td>
                      <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                      <td style={{ color: statusColor }}>
                        {getStatusIcon(application.status)}
                        {application.status}
                      </td>
                      <td className="relative">
                        <div onClick={() => toggleDropdown(application._id)}>
                          <MoreHorizontal size={20} />
                        </div>
                        {openDropdownId === application._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <div
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleStatusChange(application._id, 'pending')}
                            >
                              Pending
                            </div>
                            <div
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleStatusChange(application._id, 'verified')}
                            >
                              Verified
                            </div>
                            <div
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleStatusChange(application._id, 'rejected')}
                            >
                              Rejected
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !error && applications.length === 0 && (
          <p>No loan applications found.</p>
        )}

        <div className="graph-section">
          <h2 className="graph-heading">Loans Released Monthly</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyReleasedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loans" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-section">
          <h2 className="graph-heading">Total Outstanding Open Loans - Monthly</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={outstandingLoanData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-section">
          <h2 className="graph-heading">Number of Repayments Collected - Monthly</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={repaymentsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="collected" fill="#e55353" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default LoanApplicationsPage;

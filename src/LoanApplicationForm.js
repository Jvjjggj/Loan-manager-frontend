import React, { useState } from 'react';
import './LoanApplicationForm.css';
import { useNavigate } from 'react-router-dom';

function LoanApplicationForm() {
  const [fullName, setFullName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [employmentAddress, setEmploymentAddress] = useState('');
  const [reasonForLoan, setReasonForLoan] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmissionStatus('submitting');
    setSubmissionError(null);

    const applicationData = {
      fullName,
      amount: parseInt(loanAmount),
      tenure: parseInt(loanTenure),
      employmentStatus,
      employmentAddress,
      loanReason: reasonForLoan,
    };

    try {
      const response = await fetch(
        'https://loan-manager-backend-y85e.onrender.com/api/applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setSubmissionStatus('success');
        console.log('Application submitted successfully:', responseData);
        navigate('/verifier-dashboard'); // Navigate after success
        setFullName('');
        setLoanAmount('');
        setLoanTenure('');
        setEmploymentStatus('');
        setEmploymentAddress('');
        setReasonForLoan('');
        setAgreedToTerms(false);
      } else {
        const errorData = await response.json();
        setSubmissionStatus('error');
        setSubmissionError(errorData.message || 'Failed to submit application');
        console.error('Application submission failed:', errorData);
      }
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionError('Network error occurred');
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="formContainer">
      <h2>APPLY FOR A LOAN</h2>
      {submissionStatus === 'submitting' && <p>Submitting application...</p>}
      {submissionStatus === 'success' && (
        <p style={{ color: 'green' }}>Application submitted successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p style={{ color: 'red' }}>Error: {submissionError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="fullName">
            Full Name as it appears on bank account
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="loanAmount">How much do you need?</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="loanTenure">Loan tenure (in months)</label>
          <input
            type="number"
            id="loanTenure"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="employmentStatus">Employment status</label>
          <input
            type="text"
            id="employmentStatus"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="reasonForLoan">Reason for loan</label>
          <textarea
            id="reasonForLoan"
            value={reasonForLoan}
            onChange={(e) => setReasonForLoan(e.target.value)}
            className="textareaField"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="employmentAddress">Employment address</label>
          <input
            type="text"
            id="employmentAddress"
            value={employmentAddress}
            onChange={(e) => setEmploymentAddress(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="checkboxGroup">
          <input
            type="checkbox"
            id="agreedToTerms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <label htmlFor="agreedToTerms">
            I have read the important information and accept that by
            completing the application I will be bound by the same.
          </label>
        </div>

        <div className="checkboxGroup">
          <input type="checkbox"  />
          <label>
            Any personal and credit information obtained by me may be
            disclosed from time to time to other persons, credit bureau or
            other credit reporting agencies.
          </label>
        </div>

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoanApplicationForm;

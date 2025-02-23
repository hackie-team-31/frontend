import React, { useState } from "react";
import styles from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    mobile: string;
    dob: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    jobPosition: string;
    income: string;
    transactionDetails: File | null;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    jobPosition: "",
    income: "",
    transactionDetails: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      transactionDetails: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the request payload based on the expected API format
    const requestBody = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      mobile: formData.mobile,
      dob: formData.dob,
      address: `${formData.addressLine1}, ${formData.addressLine2}, ${formData.country}`,
      job_title: formData.jobPosition,
      monthly_income: parseFloat(formData.income),
      monthly_expenses: 0.0, // Assuming a default or calculated value for now
    };

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration Successful:", result);
        navigate("/cart");
      } else {
        const error = await response.json();
        console.error("Registration Failed:", error);
        alert("Registration failed: " + (error.detail || "Please try again."));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          src="/money.png"
          alt="Logo"
          height={100}
          width={100}
          className={styles.logo} // Create this class in your CSS for styling
        />
        <h2 className={styles.heading}>Create your Account</h2>

        <div>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="mobile" className={styles.label}>
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder="Enter your mobile number"
            className={styles.input}
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dob" className={styles.label}>
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            className={styles.input}
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="addressLine1" className={styles.label}>
            Address Line 1
          </label>
          <input
            id="addressLine1"
            name="addressLine1"
            type="text"
            placeholder="Enter address line 1"
            className={styles.input}
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="addressLine2" className={styles.label}>
            Address Line 2
          </label>
          <input
            id="addressLine2"
            name="addressLine2"
            type="text"
            placeholder="Enter address line 2"
            className={styles.input}
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country" className={styles.label}>
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Enter your country"
            className={styles.input}
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="jobPosition" className={styles.label}>
            Job Position
          </label>
          <input
            id="jobPosition"
            name="jobPosition"
            type="text"
            placeholder="Enter your job position"
            className={styles.input}
            value={formData.jobPosition}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="income" className={styles.label}>
            Income
          </label>
          <input
            id="income"
            name="income"
            type="number"
            placeholder="Enter your income"
            className={styles.input}
            value={formData.income}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="transactionDetails" className={styles.label}>
            Transaction Details (CSV)
          </label>
          <input
            id="transactionDetails"
            name="transactionDetails"
            type="file"
            accept=".csv"
            className={styles.input}
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={styles.input}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Link to="/cart" className={styles.link}>
          Already have an account? Login here
        </Link>

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;

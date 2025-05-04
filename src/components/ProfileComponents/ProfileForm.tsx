import React, { useState } from 'react';
import styles from './ProfileForm.module.scss';

const ProfileForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: 'Creative',
    lastName: 'Sujon',
    phone: '+91 3214 5456 56',
    email: 'Sujondutta@Gmail.Com',
    city: 'Kolkata',
    state: '',
    postcode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
      </div>
      <div className={styles.row}>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
      </div>
      <div className={styles.row}>
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State/Country" />
      </div>
      <div className={styles.row}>
        <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="Postcode" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
      </div>
      <button type="submit" className={styles.updateButton}>Update</button>
    </form>
  );
};

export default ProfileForm;

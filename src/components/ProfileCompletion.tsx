import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/profileService';


interface Profile {
  name: string;
  email: string;
  phone: string;
}

const ProfileCompletion: React.FC = () => {
  console.log('ProfileCompletion');
  const { currentUser } = useAuth() || {};
  console.log('currentUser name: ' + currentUser?.displayName);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ProfileCompletion::useEffect');
    const fetchProfile = async () => {
      console.log('fetchProfile');
      if (currentUser) {
        getProfile(currentUser.uid)
          .then(profileData => {
            if (profileData) {
              setProfile(profileData);
              navigate('/my-docs');
            } else {
              setProfile({ name: '', email: '', phone: '' });
            }
            setLoading(false);
          })
          .catch(error => {
            console.error('Failed to fetch profile:', error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentUser) {
        await updateProfile(currentUser.uid, profile);
        navigate('/my-docs');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return <div>Profile Completion Loading...</div>;
  }

  return (
    <div className="profile-completion">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileCompletion;
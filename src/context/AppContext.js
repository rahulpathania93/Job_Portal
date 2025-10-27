// src/context/AppContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { JOBS as INITIAL_JOBS } from '../mock/jobs';
import { USERS as MOCK_USERS } from '../mock/users';

export const AppContext = createContext();

const PROFILE_KEY = '@jobportal_profile_v1';

export function AppProvider({ children }) {
  const [role, setRole] = useState(null); // 'seeker' | 'provider'
  const [user, setUser] = useState(null); // auth mock
  const [jobs, setJobs] = useState(INITIAL_JOBS || []); // ✅ uses mock data now
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [profile, setProfile] = useState(null);

  // 🧠 Load profile on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load profile', e);
      }
    })();
  }, []);

  // 💾 Persist profile changes
  useEffect(() => {
    (async () => {
      try {
        if (profile)
          await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        else
          await AsyncStorage.removeItem(PROFILE_KEY);
      } catch (e) {
        console.warn('Failed to save profile', e);
      }
    })();
  }, [profile]);

  // ✅ Apply job (also adds applicant to job)
  function applyToJob(jobId) {
    setAppliedJobIds(prev => (prev.includes(jobId) ? prev : [...prev, jobId]));

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        const applicantEmail = user?.email || 'demo@local';
        const already = (j.applicants || []).some(a => a.email === applicantEmail);
        if (already) return j;
        const newApplicant = {
          id: String(Date.now()),
          name: user?.name || 'Guest',
          email: applicantEmail,
          experience: profile?.experience || '',
        };
        return { ...j, applicants: [...(j.applicants || []), newApplicant] };
      })
    );
  }

  // ✅ Post new job (provider)
  function postJob(newJob) {
    setJobs(prev => [{ ...newJob, id: String(Date.now()), applicants: [] }, ...prev]);
  }

  // 🧩 Mock login/signup
  function loginMock(email, password) {
    if (!email || !password) return null;
    
    // Check if credentials match mock users
    const mockUser = MOCK_USERS.find(u => u.email === email);
    
    if (mockUser) {
      setUser(mockUser);
      setRole(mockUser.role);
      // Set profile from user data if available
      if (mockUser.fullName || mockUser.experience) {
        setProfile(mockUser);
      }
      return mockUser;
    }
    
    // Fallback: create generic user
    const r = role || 'seeker';
    const newUser = { name: 'Demo User', email, role: r };
    setUser(newUser);
    setRole(r);
    return newUser;
  }

  function signupMock(email, password, opts = {}) {
    if (!email || !password) return null;
    
    // Check if email matches any mock user (for demo login with default credentials)
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      setUser(existingUser);
      setRole(existingUser.role);
      return existingUser;
    }
    
    const r = role || 'seeker';
    const newUser = { 
      name: opts.name || 'New User', 
      email, 
      role: r,
      fullName: opts.name,
      mobile: opts.mobile,
      ...opts
    };
    setUser(newUser);
    setRole(r);
    return newUser;
  }

  // Mock for social sign-in (UI only)
  function socialSignInMock(provider = 'Google') {
    // produce a mock user; provider name will be set as part of email for uniqueness
    const r = role || 'seeker';
    const mockUser = { name: `${provider} User`, email: `${provider.toLowerCase()}@mock.com`, role: r, social: provider };
    setUser(mockUser);
    setRole(r);
    return mockUser;
  }

  function logout() {
    setUser(null);
    setRole(null);
    setProfile(null);
    setAppliedJobIds([]);
    // Clear AsyncStorage
    AsyncStorage.removeItem(PROFILE_KEY);
  }

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        setUser,
        jobs,
        setJobs,
        appliedJobIds,
        applyToJob,
        postJob,
        profile,
        setProfile,
        loginMock,
        signupMock,
        socialSignInMock,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

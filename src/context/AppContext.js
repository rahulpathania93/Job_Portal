// src/context/AppContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { JOBS as INITIAL_JOBS } from '../mock/jobs'; // ✅ FIXED - import from jobs.js

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
  // inside AppProvider in src/context/AppContext.js
function loginMock(email, password) {
  if (!email || !password) return null;
  const r = role || 'seeker';
  const mockUser = { name: 'Demo User', email, role: r };
  setUser(mockUser);
  setRole(r); // ensure context role is set
  return mockUser;
}

function signupMock(email, password) {
  if (!email || !password) return null;
  const r = role || 'seeker';
  const newUser = { name: 'New User', email, role: r };
  setUser(newUser);
  setRole(r);
  return newUser;
}



  function logout() {
    setUser(null);
    setRole(null);
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
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

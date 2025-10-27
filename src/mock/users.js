// src/mock/users.js
export const USERS = [
  // Job Seekers
  { 
    id: 'seeker_ryan', 
    name: 'Ryan Gosling', 
    email: 'ryangosling@yahoo.com', 
    role: 'seeker',
    fullName: 'Ryan Gosling',
    mobile: '9876543210',
    experience: '10 years',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    location: 'Los Angeles, CA',
    summary: 'Experienced software engineer with 10+ years in full-stack development. Passionate about creating scalable web applications and leading development teams.',
    education: 'BS Computer Science - University of California',
    currentCompany: 'Tech Corp',
    designation: 'Senior Software Engineer',
  },
  
  // Job Providers
  { 
    id: 'prov_xyz', 
    name: 'XYZ Company', 
    email: 'xyzCompany@yahoo.com', 
    role: 'provider',
    companyName: 'XYZ Company',
    industry: 'Technology',
    location: 'San Francisco, CA',
    companySize: '100-500',
    website: 'www.xyzcompany.com',
    description: 'Leading technology company specializing in software development and cloud solutions.',
  },
  
  // Additional mock users
  { id: 'seeker2', name: 'Guest Seeker', email: 'guest@example.com', role: 'seeker' },
];

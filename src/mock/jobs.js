// src/mock/jobs.js
// Example mock job list used by the app for development / demo.
// Each job has: id, title, company, location, type, skills, description, salary, postedBy(email), applicants[]

export const JOBS = [
  {
    id: 'job_1001',
    title: 'Full Stack Engineer',
    company: 'Infosys',
    location: 'Hyderabad, India',
    type: 'Full-time',
    skills: ['React', 'Nodejs', 'MongoDB', 'AWS'],
    salary: '10L - 15L',
    description: 'We are looking for a Full Stack Engineer to build scalable web apps. Great opportunity to own features from design to production.',
    postedBy: 'provider1@example.com',
    applicants: [
      // example applicant objects (so analytics show applicants)
      { id: 'app_1', name: 'Rahul Sharma', email: 'rahul@example.com', experience: '2 yrs' }
    ],
  },

  {
    id: 'job_1002',
    title: 'Node.js Backend Developer',
    company: 'Demo Usdemoer',
    location: 'Delhi, India',
    type: 'Full-time',
    skills: ['Nodejs', 'Express', 'MongoDB'],
    salary: '8L - 12L',
    description: 'Backend engineer to build REST APIs and microservices. Experience with MongoDB and writing unit tests required.',
    postedBy: 'provider2@example.com',
    applicants: [], // no applicants yet
  },

  {
    id: 'job_1003',
    title: 'Frontend Developer (React)',
    company: 'Acme Corp',
    location: 'Bengaluru, India',
    type: 'Full-time',
    skills: ['React', 'JavaScript', 'CSS'],
    salary: '12L - 18L',
    description: 'Build modern web & mobile UIs using React & React Native. Work with designers and backend engineers to ship features.',
    postedBy: 'provider1@example.com',
    applicants: [],
  },

  {
    id: 'job_1004',
    title: 'React Native Developer (Expo)',
    company: 'Nova Labs',
    location: 'Remote',
    type: 'Contract',
    skills: ['React Native', 'Expo', 'Performance'],
    salary: '8L - 14L',
    description: 'Work on cross-platform mobile apps using Expo/React Native. Good knowledge of hooks and performance optimization.',
    postedBy: 'provider3@example.com',
    applicants: [],
  },

  {
    id: 'job_1005',
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Mumbai, India',
    type: 'Full-time',
    skills: ['Figma', 'Design Systems', 'UX'],
    salary: '6L - 10L',
    description: 'Design delightful experiences and reusable design system components. Collaborate with developers to implement designs.',
    postedBy: 'provider2@example.com',
    applicants: [],
  }
];

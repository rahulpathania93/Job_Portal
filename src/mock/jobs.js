// src/mock/jobs.js
// Enhanced mock job list with more realistic data for Naukri.com replica
// Each job has: id, title, company, location, type, skills, description, salary, postedBy(email), applicants[]

export const JOBS = [
  {
    id: 'job_1001',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
    salary: '12L - 18L',
    description: 'We are seeking a Senior Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate should have strong experience in both frontend and backend development.',
    postedBy: 'hr@techcorp.com',
    applicants: [
      { id: 'app_1', name: 'Rahul Sharma', email: 'rahul@example.com', experience: '4 yrs' },
      { id: 'app_2', name: 'Priya Patel', email: 'priya@example.com', experience: '3 yrs' }
    ],
  },

  {
    id: 'job_1002',
    title: 'React Native Mobile Developer',
    company: 'MobileFirst Inc',
    location: 'Mumbai, India',
    type: 'Full-time',
    skills: ['React Native', 'JavaScript', 'Redux', 'Firebase'],
    salary: '8L - 15L',
    description: 'Join our mobile development team to build cross-platform mobile applications. We are looking for a passionate developer who loves creating smooth user experiences on mobile devices.',
    postedBy: 'careers@mobilefirst.com',
    applicants: [
      { id: 'app_3', name: 'Amit Kumar', email: 'amit@example.com', experience: '2 yrs' }
    ],
  },

  {
    id: 'job_1003',
    title: 'UI/UX Designer',
    company: 'DesignStudio Pro',
    location: 'Delhi, India',
    type: 'Full-time',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    salary: '6L - 12L',
    description: 'We are looking for a creative UI/UX Designer to join our design team. You will be responsible for creating user-centered designs and improving user experience across our digital products.',
    postedBy: 'design@designstudio.com',
    applicants: [],
  },

  {
    id: 'job_1004',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Remote',
    type: 'Full-time',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
    salary: '10L - 16L',
    description: 'We are seeking a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. Experience with cloud platforms and containerization is essential.',
    postedBy: 'devops@cloudtech.com',
    applicants: [],
  },

  {
    id: 'job_1005',
    title: 'Data Scientist',
    company: 'DataInsights Ltd',
    location: 'Hyderabad, India',
    type: 'Full-time',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
    salary: '15L - 25L',
    description: 'Join our data science team to work on cutting-edge machine learning projects. We are looking for someone with strong analytical skills and experience in building ML models.',
    postedBy: 'data@datainsights.com',
    applicants: [
      { id: 'app_4', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', experience: '5 yrs' }
    ],
  },

  {
    id: 'job_1006',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Pune, India',
    type: 'Full-time',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research', 'Roadmapping'],
    salary: '18L - 30L',
    description: 'We are looking for an experienced Product Manager to lead our product development initiatives. You will work closely with engineering, design, and business teams to deliver exceptional products.',
    postedBy: 'products@innovatetech.com',
    applicants: [],
  },

  {
    id: 'job_1007',
    title: 'Frontend Developer (Vue.js)',
    company: 'WebCraft Studios',
    location: 'Chennai, India',
    type: 'Contract',
    skills: ['Vue.js', 'JavaScript', 'CSS3', 'Webpack', 'Git'],
    salary: '6L - 10L',
    description: 'We need a Frontend Developer with Vue.js experience to work on our client projects. This is a 6-month contract position with potential for extension.',
    postedBy: 'frontend@webcraft.com',
    applicants: [],
  },

  {
    id: 'job_1008',
    title: 'Backend Developer (Python)',
    company: 'PythonSoft',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'Docker'],
    salary: '9L - 14L',
    description: 'Join our backend team to build scalable web services and APIs. We use Python and Django to create robust backend systems that power our applications.',
    postedBy: 'backend@pythonsoft.com',
    applicants: [],
  },

  {
    id: 'job_1009',
    title: 'QA Automation Engineer',
    company: 'QualityAssure Inc',
    location: 'Gurgaon, India',
    type: 'Full-time',
    skills: ['Selenium', 'Cypress', 'JavaScript', 'Test Automation', 'API Testing'],
    salary: '7L - 12L',
    description: 'We are looking for a QA Automation Engineer to help us maintain high quality standards. You will be responsible for writing and maintaining automated test suites.',
    postedBy: 'qa@qualityassure.com',
    applicants: [],
  },

  {
    id: 'job_1010',
    title: 'Digital Marketing Specialist',
    company: 'GrowthHackers',
    location: 'Mumbai, India',
    type: 'Full-time',
    skills: ['SEO', 'SEM', 'Social Media', 'Analytics', 'Content Marketing'],
    salary: '5L - 9L',
    description: 'Join our marketing team to drive growth through digital channels. We are looking for someone with experience in SEO, SEM, and social media marketing.',
    postedBy: 'marketing@growthhackers.com',
    applicants: [],
  },

  {
    id: 'job_1011',
    title: 'Blockchain Developer',
    company: 'CryptoInnovate',
    location: 'Bangalore, India',
    type: 'Full-time',
    skills: ['Solidity', 'Ethereum', 'Web3', 'JavaScript', 'Smart Contracts'],
    salary: '20L - 35L',
    description: 'We are seeking a Blockchain Developer to work on our decentralized applications. Experience with smart contracts and DeFi protocols is highly preferred.',
    postedBy: 'blockchain@cryptoinnovate.com',
    applicants: [],
  },

  {
    id: 'job_1012',
    title: 'iOS Developer',
    company: 'AppMakers',
    location: 'Delhi, India',
    type: 'Full-time',
    skills: ['Swift', 'iOS', 'Xcode', 'UIKit', 'Core Data'],
    salary: '10L - 16L',
    description: 'Join our iOS development team to create amazing mobile experiences. We are looking for someone passionate about iOS development and user experience.',
    postedBy: 'ios@appmakers.com',
    applicants: [],
  },

  // XYZ Company Jobs
  {
    id: 'job_xyz_001',
    title: 'Senior Cloud Architect',
    company: 'XYZ Company',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform'],
    salary: '$150K - $200K',
    description: 'XYZ Company is looking for an experienced Cloud Architect to design and implement scalable cloud infrastructure. You will work with modern cloud technologies and help migrate our systems to the cloud.',
    postedBy: 'xyzCompany@yahoo.com',
    applicants: [
      { id: 'app_xyz_1', name: 'Ryan Gosling', email: 'ryangosling@yahoo.com', experience: '10 yrs' },
      { id: 'app_xyz_2', name: 'John Smith', email: 'john@example.com', experience: '5 yrs' }
    ],
  },

  {
    id: 'job_xyz_002',
    title: 'Full Stack Developer',
    company: 'XYZ Company',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'GraphQL'],
    salary: '$120K - $160K',
    description: 'We are seeking a talented Full Stack Developer to build cutting-edge web applications. You will work on both frontend and backend systems, implementing new features and maintaining existing codebase.',
    postedBy: 'xyzCompany@yahoo.com',
    applicants: [
      { id: 'app_xyz_3', name: 'Sarah Johnson', email: 'sarah@example.com', experience: '4 yrs' }
    ],
  },

  {
    id: 'job_xyz_003',
    title: 'DevOps Engineer',
    company: 'XYZ Company',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['Jenkins', 'CI/CD', 'Ansible', 'Linux', 'Monitoring'],
    salary: '$130K - $170K',
    description: 'Join our DevOps team to streamline deployments and improve infrastructure reliability. You will be responsible for automating processes and maintaining our cloud infrastructure.',
    postedBy: 'xyzCompany@yahoo.com',
    applicants: [],
  }
];

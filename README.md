# Job Portal 

A modern React Native mobile application that replicates the design and functionality of Naukri.com, built with a neon green, white, and black color scheme.

## 🚀 Features

### Job Seeker Features
- **Role Selection**: Choose between Job Seeker and Job Provider
- **Authentication**: Sign up/Sign in with email or social login
- **Job Search**: Advanced search with filters and sorting
- **Job Listings**: Browse and apply to jobs
- **Job Details**: Comprehensive job information with company details
- **Dashboard**: Track applied jobs, available jobs, and recommendations
- **Profile Management**: Complete profile with skills, experience, and contact info
- **Application Tracking**: Monitor job application status

### Job Provider Features
- **Job Posting**: Create and manage job listings
- **Applicant Management**: View and manage job applicants
- **Analytics Dashboard**: Track job performance and applications
- **Company Profile**: Manage company information

### General Features
- **Modern UI**: Naukri.com inspired design with neon green theme
- **Responsive Design**: Optimized for mobile devices
- **Tab Navigation**: Intuitive bottom tab navigation
- **Search & Filter**: Advanced job search with multiple filters
- **Real-time Updates**: Dynamic content updates
- **Social Login**: Google and LinkedIn integration (mock)

## 🎨 Design System

### Color Palette
- **Primary**: Neon Green (#00FF41)
- **Secondary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Text**: Black (#000000) / Gray (#6B7280)
- **Accent**: Various shades of green and gray

### Typography
- **Headers**: Bold, large fonts for emphasis
- **Body**: Clean, readable fonts for content
- **Labels**: Medium weight for form labels

## 📱 Screens

### Authentication Flow
1. **Role Selection**: Choose user type
2. **Sign In**: Email/password or social login
3. **Sign Up**: Create new account

### Job Seeker Flow
1. **Home**: Featured jobs and quick actions
2. **Search**: Job search with filters
3. **Job Detail**: Complete job information
4. **Dashboard**: Applied jobs and recommendations
5. **Profile**: User profile management

### Job Provider Flow
1. **Home**: Overview and quick actions
2. **My Jobs**: Manage job postings
3. **Post Job**: Create new job listings
4. **Analytics**: Track performance metrics

## 🛠️ Technical Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **Context API**: State management
- **AsyncStorage**: Local data persistence
- **React Native Vector Icons**: Icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Job_Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## 🏗️ Project Structure

```
Job_Portal/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── InputField.jsx
│   │       ├── JobCard.jsx
│   │       ├── PrimaryButton.jsx
│   │       └── SocialButton.jsx
│   ├── constants/
│   │   └── colors.js
│   ├── context/
│   │   └── AppContext.js
│   ├── mock/
│   │   ├── jobs.js
│   │   └── users.js
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   └── TabNavigator.js
│   └── screens/
│       ├── Auth/
│       │   ├── SignIn.jsx
│       │   └── SignUp.jsx
│       ├── Home.jsx
│       ├── RoleSelect.jsx
│       ├── provider/
│       │   ├── AnalyticsDashboard.jsx
│       │   ├── PostJobForm.jsx
│       │   └── ProviderJobs.jsx
│       └── seeker/
│           ├── Dashboard.jsx
│           ├── JobDetail.jsx
│           ├── JobList.jsx
│           └── Profile.jsx
├── app.json
├── package.json
└── README.md
```

## 🎯 Key Components

### UI Components
- **InputField**: Custom input with validation and icons
- **JobCard**: Job listing display component
- **PrimaryButton**: Reusable button with variants
- **SocialButton**: Social login button

### Screens
- **Home**: Main dashboard with featured content
- **JobList**: Job search and filtering
- **JobDetail**: Detailed job information
- **Profile**: User profile management
- **Dashboard**: User-specific dashboard

## 🔧 Configuration

### App Configuration
- **App Name**: Job Portal
- **Package**: com.stonedshooter.Job_Portal
- **Version**: 1.0.0
- **Platform**: iOS, Android, Web

### Color Scheme
All colors are defined in `src/constants/colors.js` for easy customization.

## 📱 Features in Detail

### Job Search
- Search by job title, company, or skills
- Filter by job type (Full-time, Part-time, Contract, Remote)
- Sort by relevance, salary, or company
- Real-time search results

### Job Application
- One-click job application
- Application tracking
- Applied jobs history
- Application status updates

### Profile Management
- Personal information
- Professional details
- Skills and experience
- Contact information
- Profile completion tracking

### Job Provider Tools
- Job posting form
- Applicant management
- Performance analytics
- Job status tracking

## 🚀 Getting Started

1. **Choose Role**: Select Job Seeker or Job Provider
2. **Create Account**: Sign up with email or social login
3. **Complete Profile**: Fill in your professional details
4. **Start Using**: Browse jobs or post jobs based on your role

## 🔮 Future Enhancements

- Real-time notifications
- In-app messaging
- Resume upload
- Advanced analytics
- Company reviews
- Salary insights
- Job recommendations
- Interview scheduling

## 📄 License

This project is for educational purposes and is a replica of Naukri.com for learning React Native development.

## 🤝 Contributing

This is a demo project. For learning purposes, feel free to fork and experiment with the code.

## 📞 Support

For questions or support, please refer to the React Native documentation or Expo documentation.

---

**Note**: This is a mock application for educational purposes. All data is simulated and not connected to real job portals.

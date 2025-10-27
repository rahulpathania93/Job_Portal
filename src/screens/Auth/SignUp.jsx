// src/screens/Auth/SignUp.jsx - Naukri.com Profile Creation
import { useContext, useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ValidatedInputField from '../../components/ui/ValidatedInputField';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function SignUp({ navigation, route }) {
  const { signupMock, socialSignInMock, setRole, role: contextRole } = useContext(AppContext);
  const role = route?.params?.role || contextRole || 'seeker';
  
  // Set role only once on mount
  useEffect(() => {
    if (route?.params?.role && route.params.role !== contextRole) {
      setRole(route.params.role);
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    acceptUpdates: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
  });

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Mobile validation
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation while typing
    if (field === 'fullName') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, fullName: 'Full name is required' }));
      } else {
        setErrors(prev => ({ ...prev, fullName: '' }));
      }
    }
    
    if (field === 'email') {
      if (value.trim()) {
        if (!validateEmail(value)) {
          setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
        } else {
          setErrors(prev => ({ ...prev, email: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    if (field === 'password') {
      if (value) {
        if (!validatePassword(value)) {
          setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
        } else {
          setErrors(prev => ({ ...prev, password: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
    
    if (field === 'mobile') {
      if (value) {
        if (!validateMobile(value)) {
          setErrors(prev => ({ ...prev, mobile: 'Invalid mobile number (must be 10 digits)' }));
        } else {
          setErrors(prev => ({ ...prev, mobile: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, mobile: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      mobile: '',
    };

    let isValid = true;

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number (must be 10 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const { fullName, email, password, mobile } = formData;

    try {
      const user = signupMock(email.trim(), password, { 
        name: fullName, 
        mobile: mobile,
        role: role
      });
      
      if (user) {
        // Navigate to provider profile if role is provider, otherwise to main tabs
        if (role === 'provider') {
          navigation.navigate('JobProviderProfile');
        } else {
          navigation.navigate('MainTabs');
        }
      } else {
        Alert.alert('Error', 'Signup failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Signup failed.');
    }
  };

  const handleGoogleSignUp = () => {
    const user = socialSignInMock('Google');
    if (user) {
      if (role === 'provider') {
        navigation.navigate('JobProviderProfile');
      } else {
        navigation.navigate('MainTabs');
      }
    }
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create your Naukri profile</Text>
            <Text style={styles.subtitle}>
              Search & apply to jobs from India's No.1 Job Site
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <ValidatedInputField
            label="Full name*"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            error={errors.fullName}
          />

          {/* Email */}
          <ValidatedInputField
            label="Email ID*"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            error={errors.email}
          />
          <Text style={styles.hintText}>
            We'll send relevant jobs and updates to this email
          </Text>

          {/* Password */}
          <View style={styles.passwordSection}>
            <ValidatedInputField
              label="Password* (Minimum 6 characters)"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={true}
              error={errors.password}
            />
            <Text style={styles.hintText}>
              This helps your account stay protected
            </Text>
          </View>

          {/* Mobile Number */}
          <View style={styles.mobileSection}>
            <ValidatedInputField
              label="Mobile number*"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChangeText={(text) => handleInputChange('mobile', text)}
              keyboardType="phone-pad"
              error={errors.mobile}
            />
            <Text style={styles.hintText}>
              Recruiters will contact you on this number
            </Text>
          </View>

          {/* Communication Preference */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => handleInputChange('acceptUpdates', !formData.acceptUpdates)}
            >
              <Text style={styles.checkboxText}>
                {formData.acceptUpdates ? '☑️' : '☐'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              Send me important updates & promotions via email, SMS and{' '}
              <Text style={styles.whatsappText}>WhatsApp</Text>
            </Text>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By clicking register, you agree to Naukri's{' '}
            <Text style={styles.linkText}>Terms and Conditions</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign Up */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    paddingHorizontal: 20,
  },
  passwordSection: {
    marginBottom: 4,
  },
  mobileSection: {
    marginBottom: 4,
  },
  hintText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxText: {
    fontSize: 18,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  whatsappText: {
    color: Colors.whatsapp,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 30,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.google,
    marginRight: 12,
  },
  googleButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
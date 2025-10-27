// src/screens/Auth/SignIn.jsx - Naukri.com Login Screen
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

export default function SignIn({ navigation, route }) {
  const { loginMock, socialSignInMock, setRole, role: contextRole } = useContext(AppContext);
  const role = route?.params?.role || contextRole || 'seeker';
  
  // Set role only once on mount
  useEffect(() => {
    if (route?.params?.role && route.params.role !== contextRole) {
      setRole(route.params.role);
    }
  }, []);
  
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'username'
  
  // Default credentials based on role
  const defaultEmail = role === 'provider' ? 'xyzCompany@yahoo.com' : 'ryangosling@yahoo.com';
  const defaultPassword = '123456';
  
  const [formData, setFormData] = useState({
    email: defaultEmail,
    password: defaultPassword,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation while typing
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
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let isValid = true;

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const user = loginMock(formData.email.trim(), formData.password);
      if (user) {
        // Navigate to provider profile if role is provider, otherwise to main tabs
        if (role === 'provider') {
          navigation.navigate('JobProviderProfile');
        } else {
          navigation.navigate('MainTabs');
        }
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleOTPLogin = () => {
    Alert.alert('OTP Login', 'OTP login feature coming soon!');
  };

  const handleGoogleSignIn = () => {
    // Auto-login with default credentials
    const user = loginMock(defaultEmail, defaultPassword);
    if (user) {
      if (role === 'provider') {
        navigation.navigate('JobProviderProfile');
      } else {
        navigation.navigate('MainTabs');
      }
    }
  };

  const handleWhatsAppSignIn = () => {
    // Auto-login with default credentials
    const user = loginMock(defaultEmail, defaultPassword);
    if (user) {
      if (role === 'provider') {
        navigation.navigate('JobProviderProfile');
      } else {
        navigation.navigate('MainTabs');
      }
    }
  };

  const handleLinkedInSignIn = () => {
    // Auto-login with default credentials
    const user = loginMock(defaultEmail, defaultPassword);
    if (user) {
      if (role === 'provider') {
        navigation.navigate('JobProviderProfile');
      } else {
        navigation.navigate('MainTabs');
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
          
          <Text style={styles.title}>Log in to Naukri</Text>
        </View>

        {/* Login Method Selection */}
        <View style={styles.methodContainer}>
          <TouchableOpacity 
            style={styles.methodButton}
            onPress={() => setLoginMethod('email')}
          >
            <View style={styles.radioButton}>
              <View style={[
                styles.radioCircle,
                loginMethod === 'email' && styles.radioSelected
              ]}>
                {loginMethod === 'email' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.methodText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.methodButton}
            onPress={() => setLoginMethod('username')}
          >
            <View style={styles.radioButton}>
              <View style={[
                styles.radioCircle,
                loginMethod === 'username' && styles.radioSelected
              ]}>
                {loginMethod === 'username' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.methodText}>Username</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email/Username Input */}
          <ValidatedInputField
            placeholder={loginMethod === 'email' ? 'Enter your email address' : 'Enter your username'}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType={loginMethod === 'email' ? 'email-address' : 'default'}
            error={errors.email}
          />

          {/* Password Input */}
          <ValidatedInputField
            placeholder="Enter password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={true}
            error={errors.password}
          />

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>

          {/* Login Buttons */}
          <View style={styles.loginButtons}>
            <TouchableOpacity style={styles.otpButton} onPress={handleOTPLogin}>
              <Text style={styles.otpButtonText}>Log in with OTP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Login using</Text>
            
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.linkedinButton} onPress={handleLinkedInSignIn}>
                <Text style={styles.linkedinIcon}>in</Text>
                <Text style={styles.socialButtonText}>LinkedIn</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} onPress={handleWhatsAppSignIn}>
                <Text style={styles.whatsappIcon}>📱</Text>
                <Text style={styles.socialButtonText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Privacy Statement */}
          <Text style={styles.privacyText}>All your activity will remain private</Text>

          {/* Sign Up Link */}
          <TouchableOpacity style={styles.signUpLink} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Register for free</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  methodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioButton: {
    marginRight: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.secondary,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  methodText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: Colors.inputPlaceholder,
    paddingVertical: 12,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  otpButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  otpButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
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
  socialSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  socialTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4', // Google Blue
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    minWidth: '30%',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A66C2', // LinkedIn Blue
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    minWidth: '30%',
  },
  linkedinIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366', // WhatsApp Green
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    minWidth: '30%',
  },
  whatsappIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  privacyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpLink: {
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
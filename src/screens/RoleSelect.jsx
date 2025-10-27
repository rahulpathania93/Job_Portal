// src/screens/RoleSelect.jsx - Naukri.com Landing Page
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { AppContext } from '../context/AppContext';

export default function RoleSelect({ navigation }) {
  const { setRole } = useContext(AppContext);

  function chooseRole(role) {
    setRole(role);
    if (role === 'seeker') {
      navigation.navigate('SignUp', { role });
    } else if (role === 'provider') {
      navigation.navigate('ProviderAuthOptions');
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search for 'Data Analysis'</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Make the most of Naukri by creating your job profile</Text>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Text style={styles.starIcon}>⭐</Text>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>Get discovered directly by recruiters</Text>
              <Text style={styles.benefitSubtitle}>Recruiters will not post a job 70% of the time</Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <Text style={styles.starIcon}>⭐</Text>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>Find relevant job recommendations</Text>
              <Text style={styles.benefitSubtitle}>Relevance is better for complete profiles</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => navigation.navigate('SignUp', { role: 'seeker' })}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('SignIn', { role: 'seeker' })}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Character Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.characterIllustration}>
            <Text style={styles.characterEmoji}>👨‍💼</Text>
          </View>
        </View>
      </View>

      {/* Find Your Dream Job Section */}
      <View style={styles.dreamJobSection}>
        <View style={styles.magnifyingGlass}>
          <Text style={styles.magnifyingGlassIcon}>🔍</Text>
        </View>
        
        <Text style={styles.dreamJobTitle}>Find your dream job!</Text>
        
        <View style={styles.searchForm}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputPlaceholder}>Enter skills, designations, companies</Text>
            <View style={styles.inputUnderline} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputPlaceholder}>Enter location</Text>
            <View style={styles.inputUnderline} />
          </View>
          
          <TouchableOpacity style={styles.searchJobsButton}>
            <Text style={styles.searchJobsButtonText}>Search jobs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Role Selection for Providers */}
      <View style={styles.providerSection}>
        <Text style={styles.providerTitle}>Are you a Job Provider?</Text>
        <Text style={styles.providerSubtitle}>Post jobs and find the best talent</Text>
        
        <TouchableOpacity 
          style={styles.providerButton} 
          onPress={() => chooseRole('provider')}
        >
          <Text style={styles.providerButtonText}>Post Jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  menuButton: {
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBackground,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: Colors.textLight,
  },
  searchPlaceholder: {
    color: Colors.inputPlaceholder,
    fontSize: 16,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 30,
    lineHeight: 32,
  },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  benefitSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 16,
  },
  registerButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  registerButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  loginButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  characterIllustration: {
    width: 120,
    height: 120,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterEmoji: {
    fontSize: 60,
  },
  dreamJobSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  magnifyingGlass: {
    marginBottom: 20,
  },
  magnifyingGlassIcon: {
    fontSize: 40,
  },
  dreamJobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 30,
  },
  searchForm: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputPlaceholder: {
    color: Colors.inputPlaceholder,
    fontSize: 16,
    marginBottom: 8,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: Colors.border,
  },
  searchJobsButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 10,
  },
  searchJobsButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  providerSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  providerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  providerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  providerButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  providerButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});
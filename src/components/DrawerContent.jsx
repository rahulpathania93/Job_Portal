// src/components/DrawerContent.jsx - Job Portal Drawer Menu
import { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { AppContext } from '../context/AppContext';
import { reset } from '../services/NavigationService';

export default function DrawerContent({ navigation }) {
  const { user, role, logout } = useContext(AppContext);
  // const [profilePercentage, setProfilePercentage] = useState(100);
  const [profilePercentage] = useState(100);
  const [notLookingForJobs, setNotLookingForJobs] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear user data
            logout();
            
            // Close drawer first
            navigation.closeDrawer();
            
            // Navigate to RoleSelect using navigation service
            setTimeout(() => {
              reset('RoleSelect');
            }, 200);
          },
        },
      ]
    );
  };

  const handleToggleJobStatus = () => {
    setNotLookingForJobs(!notLookingForJobs);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.profilePercentage}>
            <Text style={styles.percentageText}>{profilePercentage}%</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.name?.toUpperCase() || 'GUEST USER'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.updateLink}>Update profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Not Looking for Jobs Toggle */}
      {role === 'seeker' && (
        <TouchableOpacity 
          style={styles.toggleItem}
          onPress={handleToggleJobStatus}
        >
          <Text style={styles.toggleIcon}>{notLookingForJobs ? '👁️' : '👁️'}</Text>
          <Text style={styles.menuText}>Not looking for jobs</Text>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      )}

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {/* Job Seeker Menu */}
        {role === 'seeker' ? (
          <>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ApplyTab')}
            >
              <Text style={styles.menuIcon}>🔍</Text>
              <Text style={styles.menuText}>Search jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ApplyTab')}
            >
              <Text style={styles.menuIcon}>💼</Text>
              <Text style={styles.menuText}>Recommended jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>🔖</Text>
              <Text style={styles.menuText}>Saved jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ProfileTab')}
            >
              <Text style={styles.menuIcon}>📊</Text>
              <Text style={styles.menuText}>Profile performance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>👁️</Text>
              <Text style={styles.menuText}>Display preferences</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuIcon}>💬</Text>
                <Text style={styles.menuText}>Chat for help</Text>
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>(New)</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>📄</Text>
              <Text style={styles.menuText}>Jobseeker services</Text>
              <Text style={styles.paidLabel}>(Paid)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>👑</Text>
              <Text style={styles.menuText}>Job 360 Pro</Text>
              <Text style={styles.paidLabel}>(Paid)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>📝</Text>
              <Text style={styles.menuText}>Job Portal blog</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuText}>How Job Portal works</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>✉️</Text>
              <Text style={styles.menuText}>Write to us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>ℹ️</Text>
              <Text style={styles.menuText}>About us</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Job Provider Menu
          <>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MyJobsTab')}
            >
              <Text style={styles.menuIcon}>💼</Text>
              <Text style={styles.menuText}>My Jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('AnalyticsTab')}
            >
              <Text style={styles.menuIcon}>📊</Text>
              <Text style={styles.menuText}>Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('PostJobTab')}
            >
              <Text style={styles.menuIcon}>➕</Text>
              <Text style={styles.menuText}>Post New Job</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>🏢</Text>
              <Text style={styles.menuText}>Company Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        
        {/* News Banner */}
        <TouchableOpacity style={styles.newsBanner}>
          <Text style={styles.newsText}>minis</Text>
          <Text style={styles.newsHeadline}>
            M&S dumps IT giant TCS after cyberattack... →
          </Text>
        </TouchableOpacity>
        
        {/* Feedback */}
        <Text style={styles.feedbackText}>Finding this app useful?</Text>
        <View style={styles.feedbackButtons}>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackIcon}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackIcon}>👎</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  profileSection: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profilePercentage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00FF41',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  percentageText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  updateLink: {
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface + '50',
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 16,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
  },
  editIcon: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  newBadge: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  newText: {
    fontSize: 10,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  paidLabel: {
    fontSize: 12,
    color: Colors.secondary,
    marginLeft: 8,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 20,
    backgroundColor: Colors.error + '20',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 16,
    width: 24,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  newsBanner: {
    backgroundColor: Colors.surface + '80',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 8,
  },
  newsHeadline: {
    flex: 1,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  feedbackText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  feedbackButton: {
    padding: 8,
  },
  feedbackIcon: {
    fontSize: 20,
  },
});

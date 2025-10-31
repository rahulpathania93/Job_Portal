// src/navigation/TabNavigator.js - Job Portal Bottom Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerContent from '../components/DrawerContent';
import { Colors } from '../constants/colors';
import { AppContext } from '../context/AppContext';

// Import screens
import Home from '../screens/Home';
import AnalyticsDashboard from '../screens/provider/AnalyticsDashboard';
import PostJobForm from '../screens/provider/PostJobForm';
import ProviderJobs from '../screens/provider/ProviderJobs';
import Dashboard from '../screens/seeker/Dashboard';
import JobList from '../screens/seeker/JobList';
import Profile from '../screens/seeker/Profile';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Tab Icon Component
function TabIcon({ icon, label, focused, badge }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[
        styles.tabIcon,
        { color: focused ? Colors.tabActive : Colors.tabInactive }
      ]}>
        {icon}
      </Text>
      <Text style={[
        styles.tabLabel,
        { color: focused ? Colors.tabActive : Colors.tabInactive }
      ]}>
        {label}
      </Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
}

// Inner Tab Navigator for Job Seekers
function SeekerTabs() {
  const { appliedJobIds } = useContext(AppContext);
  
  return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // Hide default labels, we use custom TabIcon
          tabBarStyle: {
            backgroundColor: Colors.navBackground,
            borderTopWidth: 1,
            borderTopColor: Colors.navBorder,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🏠" label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="ApplyTab"
          component={JobList}
          options={{
            tabBarLabel: 'Apply',
            tabBarIcon: ({ focused }) => (
              <TabIcon 
                icon="📋" 
                label="Apply" 
                focused={focused}
                badge={appliedJobIds.length > 0 ? appliedJobIds.length : null}
              />
            ),
          }}
        />
        <Tab.Screen
          name="NVitesTab"
          component={Dashboard}
          options={{
            tabBarLabel: 'NVites',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📨" label="NVites" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="👤" label="Profile" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Naukri360Tab"
          component={Dashboard}
          options={{
            tabBarLabel: 'Job 360',
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🧭" label="Job 360" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

// Inner Tab Navigator for Job Providers
function ProviderTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide default labels, we use custom TabIcon
        tabBarStyle: {
          backgroundColor: Colors.navBackground,
          borderTopWidth: 1,
          borderTopColor: Colors.navBorder,
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="MyJobsTab"
        component={ProviderJobs}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="💼" label="My Jobs" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="PostJobTab"
        component={PostJobForm}
        options={{
          tabBarLabel: 'Post Job',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="➕" label="Post Job" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="AnalyticsTab"
        component={AnalyticsDashboard}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" label="Analytics" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Tab Navigator with Drawer
export default function TabNavigator() {
  const { role } = useContext(AppContext);

  // Choose which tab navigator to show
  const TabsComponent = role === 'seeker' ? SeekerTabs : ProviderTabs;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.surface,
          width: 280,
        },
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textSecondary,
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Main" component={TabsComponent} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,   
    minWidth: 64,           
    maxWidth: 92,           
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,          // slightly smaller to fit better on mobiles
    fontWeight: '500',
    lineHeight: 14,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: '600',
  },
});
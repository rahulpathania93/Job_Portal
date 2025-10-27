// src/screens/seeker/Dashboard.jsx
import { useContext, useMemo, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import JobCard from '../../components/ui/JobCard';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function Dashboard({ navigation }) {
  const { jobs, appliedJobIds, user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('applied');

  const appliedJobs = useMemo(
    () => jobs.filter(j => appliedJobIds.includes(j.id)),
    [jobs, appliedJobIds]
  );

  const availableJobs = useMemo(
    () => jobs.filter(j => !appliedJobIds.includes(j.id)),
    [jobs, appliedJobIds]
  );

  const recentJobs = useMemo(
    () => jobs.slice(0, 3),
    [jobs]
  );

  const tabs = [
    { key: 'applied', label: 'Applied', count: appliedJobs.length },
    { key: 'available', label: 'Available', count: availableJobs.length },
    { key: 'recommended', label: 'Recommended', count: recentJobs.length },
  ];

  const renderTab = (tab) => (
    <TouchableOpacity
      key={tab.key}
      style={[
        styles.tab,
        activeTab === tab.key && styles.activeTab
      ]}
      onPress={() => setActiveTab(tab.key)}
    >
      <Text style={[
        styles.tabText,
        activeTab === tab.key && styles.activeTabText
      ]}>
        {tab.label}
      </Text>
      <View style={[
        styles.tabBadge,
        activeTab === tab.key && styles.activeTabBadge
      ]}>
        <Text style={[
          styles.tabBadgeText,
          activeTab === tab.key && styles.activeTabBadgeText
        ]}>
          {tab.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }) => (
    <JobCard 
      job={item} 
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
      showApplyButton={!appliedJobIds.includes(item.id)}
    />
  );

  const getCurrentJobs = () => {
    switch (activeTab) {
      case 'applied':
        return appliedJobs;
      case 'available':
        return availableJobs;
      case 'recommended':
        return recentJobs;
      default:
        return [];
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'applied':
        return {
          icon: '📋',
          title: 'No Applications Yet',
          subtitle: 'Start applying to jobs to see them here'
        };
      case 'available':
        return {
          icon: '🔍',
          title: 'No Available Jobs',
          subtitle: 'Check back later for new opportunities'
        };
      case 'recommended':
        return {
          icon: '⭐',
          title: 'No Recommendations',
          subtitle: 'Complete your profile for better recommendations'
        };
      default:
        return {
          icon: '📋',
          title: 'No Jobs Found',
          subtitle: 'Try adjusting your search criteria'
        };
    }
  };

  const renderEmptyState = () => {
    const empty = getEmptyMessage();
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{empty.icon}</Text>
        <Text style={styles.emptyTitle}>{empty.title}</Text>
        <Text style={styles.emptySubtitle}>{empty.subtitle}</Text>
        {activeTab === 'available' && (
          <PrimaryButton
            title="Browse Jobs"
            onPress={() => navigation.navigate('JobList')}
            style={styles.emptyButton}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}!</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{appliedJobs.length}</Text>
          <Text style={styles.statLabel}>Applied</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{availableJobs.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Interviews</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map(renderTab)}
      </ScrollView>

      {/* Job List */}
      <View style={styles.jobListContainer}>
        <FlatList
          data={getCurrentJobs()}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          contentContainerStyle={styles.jobList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  profileButton: {
    padding: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.jobCardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.jobCardBorder,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsContent: {
    paddingHorizontal: 24,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.buttonSecondary,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginRight: 8,
  },
  activeTabText: {
    color: Colors.buttonPrimaryText,
  },
  tabBadge: {
    backgroundColor: Colors.gray200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: Colors.buttonPrimaryText + '20',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabBadgeText: {
    color: Colors.buttonPrimaryText,
  },
  jobListContainer: {
    flex: 1,
  },
  jobList: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
});

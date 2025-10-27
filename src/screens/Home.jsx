// src/screens/Home.jsx - Naukri.com Home Screen
import { useContext, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import JobCard from '../components/ui/JobCard';
import { Colors } from '../constants/colors';
import { AppContext } from '../context/AppContext';

export default function Home({ navigation }) {
  const { jobs, user, role } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Job categories for quick access
  const categories = [
    { name: 'IT/Software', icon: '💻', count: '12.5K' },
    { name: 'Banking', icon: '🏦', count: '8.2K' },
    { name: 'Sales', icon: '📈', count: '15.3K' },
    { name: 'Marketing', icon: '📢', count: '6.7K' },
    { name: 'HR', icon: '👥', count: '4.1K' },
    { name: 'Finance', icon: '💰', count: '9.8K' },
  ];

  // Featured jobs (first 6 jobs)
  const featuredJobs = jobs.slice(0, 6);

  const handleSearch = () => {
    navigation.navigate('SearchJobs');
  };
  
  const handleSearchBarPress = () => {
    navigation.navigate('SearchJobs');
  };

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('ApplyTab', { searchQuery: categoryName });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.count} jobs</Text>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Menu and Search */}
        <View style={styles.header}>
          {/* Hamburger Menu Button */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.searchContainer}
            onPress={handleSearchBarPress}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search for jobs, companies, skills...</Text>
            <TouchableOpacity onPress={handleSearch} style={styles.searchButtonInline}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'Job Seeker'}!
          </Text>
          <Text style={styles.subtitleText}>
            {role === 'seeker' 
              ? 'Find your next opportunity' 
              : 'Manage your job postings'
            }
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2.5M+</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Resumes</Text>
          </View>
        </View>

        {/* Job Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Jobs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ApplyTab')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredJobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.featuredJobsList}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions for Providers */}
        {role === 'provider' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('PostJobTab')}
              >
                <Text style={styles.actionIcon}>➕</Text>
                <Text style={styles.actionTitle}>Post New Job</Text>
                <Text style={styles.actionSubtitle}>Find the best talent</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('AnalyticsTab')}
              >
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={styles.actionTitle}>View Analytics</Text>
                <Text style={styles.actionSubtitle}>Track performance</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 12,
  },
  menuButton: {
    padding: 8,
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
    fontSize: 18,
    marginRight: 12,
    color: Colors.inputPlaceholder,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: Colors.inputPlaceholder,
  },
  searchButtonInline: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 12,
  },
  searchButtonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    width: 100,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    minHeight: 110,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  categoryCount: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  featuredJobsList: {
    paddingHorizontal: 20,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});
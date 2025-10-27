// src/screens/seeker/JobList.jsx - Job Portal Job List Style
import { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import JobCard from '../../components/ui/JobCard';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function JobList({ navigation, route }) {
  const { jobs, appliedJobIds, applyToJob } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState(route?.params?.searchQuery || '');
  const [locationFilter, setLocationFilter] = useState(route?.params?.location || '');
  
  // Update when route params change
  useEffect(() => {
    if (route?.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
    if (route?.params?.location) {
      setLocationFilter(route.params.location);
    }
  }, [route?.params]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const filters = ['Work mode', 'Department', 'Experience'];

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    // If no search or location, show all jobs
    if ((!searchQuery || searchQuery.trim() === '') && (!locationFilter || locationFilter.trim() === '')) {
      return true;
    }
    
    // If search query is provided, split by comma and check if any part matches
    let matchesSearch = true;
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerms = searchQuery.split(',').map(term => term.trim().toLowerCase());
      matchesSearch = searchTerms.some(term => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        (job.skills && job.skills.some(skill => skill.toLowerCase().includes(term)))
      );
    }
    
    // If location is provided, match it
    const matchesLocation = !locationFilter || locationFilter.trim() === '' || 
                          (job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase()));
    
    // Return matches only if both conditions are met
    return matchesSearch && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'salary':
        return parseFloat(b.salary.replace(/[^\d]/g, '')) - parseFloat(a.salary.replace(/[^\d]/g, ''));
      case 'company':
        return a.company.localeCompare(b.company);
      default:
        return new Date(b.id) - new Date(a.id);
    }
  });

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { jobId: job.id });
  };

  const handleApply = (job) => {
    applyToJob(job.id);
  };

  const handleSave = (job) => {
    // Save functionality
    console.log('Saved job:', job.title);
  };

  const renderJobItem = ({ item }) => (
    <JobCard 
      job={item} 
      onPress={() => handleJobPress(item)}
      showApplyButton={!appliedJobIds.includes(item.id)}
      onSave={handleSave}
    />
  );

  const getDisplayQuery = () => {
    if (searchQuery && locationFilter) {
      const skills = searchQuery.split(',')[0];
      return `Results for ${skills}, ${locationFilter}`;
    } else if (searchQuery) {
      return `Results for ${searchQuery}`;
    } else if (locationFilter) {
      return `Results for ${locationFilter}`;
    }
    return 'All Jobs';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Query */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchQuery} numberOfLines={1}>
            {getDisplayQuery()}
          </Text>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredJobs.length} results</Text>
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.jobList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search criteria
            </Text>
          </View>
        }
      />

      {/* Bottom Filter Bar */}
      <View style={styles.bottomFilterBar}>
        <TouchableOpacity style={styles.filterIconButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.bottomFilterButton,
              selectedFilter === filter && styles.selectedBottomFilter
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.bottomFilterText,
              selectedFilter === filter && styles.selectedBottomFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchQuery: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCount: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  jobList: {
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
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
  },
  bottomFilterBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  filterIconButton: {
    padding: 8,
    marginRight: 8,
  },
  filterIcon: {
    fontSize: 20,
  },
  bottomFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.buttonSecondary,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedBottomFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  bottomFilterText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  selectedBottomFilterText: {
    color: Colors.buttonPrimaryText,
  },
});

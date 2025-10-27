// src/screens/seeker/JobList.jsx
import { useContext, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import JobCard from '../../components/ui/JobCard';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function JobList({ navigation, route }) {
  const { jobs, appliedJobIds, applyToJob } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState(route?.params?.searchQuery || '');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const filters = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];
  const sortOptions = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'salary', label: 'Salary' },
    { key: 'company', label: 'Company' }
  ];

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All' || job.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
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

  const renderFilterItem = (filter) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterItem,
        selectedFilter === filter && styles.selectedFilter
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text style={[
        styles.filterText,
        selectedFilter === filter && styles.selectedFilterText
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }) => (
    <JobCard 
      job={item} 
      onPress={() => handleJobPress(item)}
      showApplyButton={!appliedJobIds.includes(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Jobs</Text>
        <Text style={styles.subtitle}>
          {filteredJobs.length} jobs found
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies, skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map(renderFilterItem)}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortOptions}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortOption,
                sortBy === option.key && styles.selectedSortOption
              ]}
              onPress={() => setSortBy(option.key)}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.key && styles.selectedSortOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
              Try adjusting your search criteria or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 24,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.buttonSecondary,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  selectedFilterText: {
    color: Colors.buttonPrimaryText,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginRight: 12,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.buttonSecondary,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedSortOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  selectedSortOptionText: {
    color: Colors.buttonPrimaryText,
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
  },
});

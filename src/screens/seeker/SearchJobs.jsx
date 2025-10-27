// src/screens/seeker/SearchJobs.jsx - Naukri.com Job Search Screen
import { useContext, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function SearchJobs({ navigation }) {
  const { jobs } = useContext(AppContext);
  const [searchSkill, setSearchSkill] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [recentSearches] = useState(['Node.js', 'React Developer', 'Python', 'AWS']);

  const handleSearch = () => {
    // Navigate to job list with search filters
    navigation.navigate('ApplyTab', {
      searchQuery: searchSkill,
      location: searchLocation,
    });
  };

  const handleRecentSearch = (search) => {
    setSearchSkill(search);
    handleSearch();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search jobs and internships</Text>
      </View>

      {/* Search Form */}
      <View style={styles.searchSection}>
        {/* Skills Input */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Skills, designations, companies</Text>
          <View style={styles.inputLine}>
            <Text style={styles.inputText}>
              {searchSkill || 'Enter skills, designations, companies'}
            </Text>
            <View style={styles.inputUnderline} />
          </View>
        </View>

        {/* Location Input */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Location</Text>
          <View style={styles.inputLine}>
            <Text style={styles.inputText}>
              {searchLocation || 'Enter location'}
            </Text>
            <View style={styles.inputUnderline} />
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your most recent searches</Text>
          <View style={styles.recentSearchContainer}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => handleRecentSearch(search)}
              >
                <Text style={styles.searchIcon}>🔍</Text>
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Top Companies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top companies</Text>
            <Text style={styles.sectionSubtitle}>
              Hiring for IT & Information Security - Other
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.companiesGrid}>
          {/* Aveva */}
          <View style={styles.companyCard}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyLogoText}>AVEVA</Text>
            </View>
            <Text style={styles.companyName}>Aveva</Text>
            <View style={styles.companyRating}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>4.1</Text>
              <Text style={styles.reviewCount}>566 reviews</Text>
            </View>
            <View style={styles.companyTag}>
              <Text style={styles.companyTagText}>Foreign MNC</Text>
            </View>
          </View>

          {/* Atos */}
          <View style={styles.companyCard}>
            <View style={[styles.companyLogo, { backgroundColor: '#0066CC' }]}>
              <Text style={[styles.companyLogoText, { color: '#FFFFFF' }]}>Atos</Text>
            </View>
            <Text style={styles.companyName}>Atos</Text>
            <View style={styles.companyRating}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>3.8</Text>
              <Text style={styles.reviewCount}>4.7K+ reviews</Text>
            </View>
            <View style={styles.companyTag}>
              <Text style={styles.companyTagText}>Foreign MNC</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Browse by Category */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse jobs by category</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryContainer}>
            {['IT/Software', 'Banking', 'Sales', 'Marketing', 'Finance'].map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('ApplyTab', { searchQuery: category })}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputBox: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  inputLine: {
    position: 'relative',
  },
  inputText: {
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 12,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: Colors.border,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  recentSearchContainer: {
    marginTop: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  companiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  companyCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  companyLogo: {
    width: 60,
    height: 60,
    backgroundColor: Colors.textPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  companyRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  companyTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  companyTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  categoryItem: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bottomSpacing: {
    height: 40,
  },
});


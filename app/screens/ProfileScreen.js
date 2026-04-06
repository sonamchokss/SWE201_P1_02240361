import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const menuItems = [
    { id: 1, icon: 'setting', title: 'Account Settings' },
    { id: 2, icon: 'bell', title: 'Notifications' },
    { id: 3, icon: 'heart', title: 'Favorites' },
    { id: 4, icon: 'star', title: 'Rate App' },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.avatar}>
          <AntDesign name="user" size={60} color={colors.primary} />
        </View>
        <Text style={styles.name}>Sonam Choki</Text>
        <Text style={styles.bio}>Mobile Developer</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => alert('Edit Profile')}
        >
          <AntDesign name="edit" size={14} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>156</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Posts</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>2.5K</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Followers</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>890</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Following</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <AntDesign name="info-circle" size={22} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        </View>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          Passionate mobile developer with 5+ years of experience creating beautiful apps with React Native.
        </Text>
      </View>

      {/* Skills Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <AntDesign name="star" size={22} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills</Text>
        </View>
        <View style={styles.skillsContainer}>
          <View style={[styles.skill, { backgroundColor: colors.accent }]}>
            <Text style={[styles.skillText, { color: colors.primary }]}>React Native</Text>
          </View>
          <View style={[styles.skill, { backgroundColor: colors.accent }]}>
            <Text style={[styles.skillText, { color: colors.primary }]}>JavaScript</Text>
          </View>
          <View style={[styles.skill, { backgroundColor: colors.accent }]}>
            <Text style={[styles.skillText, { color: colors.primary }]}>TypeScript</Text>
          </View>
          <View style={[styles.skill, { backgroundColor: colors.accent }]}>
            <Text style={[styles.skillText, { color: colors.primary }]}>UI/UX Design</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => alert(item.title)}
          >
            <View style={styles.menuLeft}>
              <AntDesign name={item.icon} size={20} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
            </View>
            <AntDesign name="right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={20} color="#FFFFFF" />
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
  },
  menuContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
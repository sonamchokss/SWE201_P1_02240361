import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { isPortrait, moderateScale, responsiveFontSize, scale, verticalScale } from '../utils/responsive';

const ProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

  // Receiving data passed from HomeScreen
  const { userId, userName } = route.params || { userId: 'N/A', userName: 'Sonam' };

  const menuItems = [
    { id: 1, icon: 'setting', title: 'Account Settings', color: '#4ECDC4' },
    { id: 2, icon: 'bell', title: 'Notifications', color: '#FF6B6B', hasSwitch: true },
    { id: 3, icon: 'heart', title: 'Favorites', color: '#45B7D1' },
    { id: 4, icon: 'star', title: 'Rate App', color: '#96CEB4' },
    { id: 5, icon: 'question-circle', title: 'Help & Support', color: '#FFB347' },
    { id: 6, icon: 'logout', title: 'Logout', color: '#FF6B6B' },
  ];

  const handleMenuItemPress = (item) => {
    if (item.title === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Home') }
        ]
      );
    } else if (item.title !== 'Notifications') {
      Alert.alert(item.title, 'This feature is coming soon!');
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Profile Header - Responsive */}
      <View style={[
        styles.header, 
        { backgroundColor: colors.primary },
        orientation === 'landscape' && styles.headerLandscape
      ]}>
        <View style={styles.avatar}>
          <AntDesign name="user" size={moderateScale(60)} color={colors.primary} />
        </View>
        <Text style={[styles.name, { fontSize: responsiveFontSize(24), color: '#FFFFFF' }]}>
          {userName}
        </Text>
        <Text style={[styles.bio, { fontSize: responsiveFontSize(14), color: '#FFFFFF', opacity: 0.9 }]}>
          Mobile Developer
        </Text>
        <Text style={[styles.userId, { fontSize: responsiveFontSize(12), color: '#FFFFFF', opacity: 0.7 }]}>
          User ID: {userId}
        </Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
        >
          <AntDesign name="edit" size={moderateScale(14)} color="#FFFFFF" />
          <Text style={[styles.editButtonText, { fontSize: responsiveFontSize(12) }]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section - Responsive Grid */}
      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20) }]}>
            156
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
            Posts
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20) }]}>
            2.5K
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
            Followers
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20) }]}>
            890
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
            Following
          </Text>
        </View>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <AntDesign name="info-circle" size={moderateScale(22)} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(18) }]}>
            About
          </Text>
        </View>
        <Text style={[styles.sectionText, { color: colors.textSecondary, fontSize: responsiveFontSize(14), lineHeight: moderateScale(22) }]}>
          Passionate mobile developer with 4+ years of experience creating beautiful apps with React Native. Specialized in cross-platform development and UI/UX design.
        </Text>
      </View>
      {/* Skills Section - Responsive Tags */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <AntDesign name="star" size={moderateScale(22)} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(18) }]}>
            Skills
          </Text>
        </View>
        <View style={styles.skillsContainer}>
          {['React Native', 'JavaScript', 'TypeScript', 'UI/UX', 'Node.js', 'Firebase', 'Redux', 'GraphQL'].map((skill, index) => (
            <View key={index} style={[styles.skill, { backgroundColor: colors.accent }]}>
              <Text style={[styles.skillText, { color: colors.primary, fontSize: responsiveFontSize(12) }]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <AntDesign name={item.icon} size={moderateScale(20)} color={item.color} />
              <Text style={[styles.menuText, { color: colors.text, fontSize: responsiveFontSize(14) }]}>
                {item.title}
              </Text>
            </View>
            {item.hasSwitch ? (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            ) : (
              <AntDesign name="right" size={moderateScale(16)} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={moderateScale(20)} color="#FFFFFF" />
        <Text style={[styles.backButtonText, { fontSize: responsiveFontSize(16), color: '#FFFFFF' }]}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(30),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  headerLandscape: {
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(20),
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  bio: {
    marginBottom: scale(5),
  },
  userId: {
    marginBottom: verticalScale(10),
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(15),
    gap: scale(6),
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
    marginTop: verticalScale(-20),
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
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
    fontWeight: 'bold',
  },
  statLabel: {
    marginTop: scale(4),
  },
  statDivider: {
    width: 1,
  },
  section: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  sectionText: {
    lineHeight: moderateScale(22),
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(15),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  skillText: {},
  menuContainer: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    borderRadius: moderateScale(15),
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
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  menuText: {
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(30),
    padding: moderateScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
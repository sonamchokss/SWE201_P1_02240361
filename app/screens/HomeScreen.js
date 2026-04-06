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

const HomeScreen = ({ navigation }) => {
  const { colors, toggleTheme, theme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.iconCircle}>
          <AntDesign name="smile" size={50} color="#FFFFFF" />
        </View>
        <Text style={styles.welcome}>Welcome back!</Text>
        <Text style={styles.appName}>MyApp</Text>
        <Text style={styles.tagline}>Your journey starts here</Text>
      </View>

      {/* Theme Toggle Button */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <AntDesign 
          name={theme === 'light' ? 'eye' : 'bulb'} 
          size={20} 
          color={colors.primary} 
        />
        <Text style={[styles.themeButtonText, { color: colors.text }]}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </TouchableOpacity>

      {/* Quick Access Section */}
      <View style={styles.cardsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Access
        </Text>

        {/* Profile Card */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={[styles.cardIcon, { backgroundColor: colors.accent }]}>
            <AntDesign name="user" size={28} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Profile</Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
              View and edit your profile
            </Text>
          </View>
          <AntDesign name="right" size={20} color={colors.primary} />
        </TouchableOpacity>

        {/* Settings Card */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => alert('Settings')}
        >
          <View style={[styles.cardIcon, { backgroundColor: colors.accent }]}>
            <AntDesign name="setting" size={28} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
              App preferences and options
            </Text>
          </View>
          <AntDesign name="right" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <AntDesign name="info-circle" size={24} color={colors.primary} />
        <Text style={[styles.infoText, { color: colors.text }]}>
          This app demonstrates navigation between Home and Profile screens using React Navigation.
        </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  iconCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 8,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
});

export default HomeScreen;
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { isPortrait, isTablet, moderateScale, responsiveFontSize, scale, verticalScale } from '../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { colors, toggleTheme, theme } = useTheme();
  const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.height > window.width ? 'portrait' : 'landscape');
    });
    return () => subscription?.remove();
  }, []);

  const features = [
    { id: 1, icon: 'bulb', title: 'Creative', desc: 'Express yourself freely' },
    { id: 2, icon: 'mobile', title: 'Mobile', desc: 'On the go access' },
    { id: 3, icon: 'clock-circle', title: 'Fast', desc: 'Lightning speed' },
    { id: 4, icon: 'lock', title: 'Secure', desc: 'Your data safe' },
  ];

  const getNumColumns = () => {
    if (isTablet()) return orientation === 'portrait' ? 3 : 4;
    return orientation === 'portrait' ? 2 : 3;
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Section - Responsive */}
      <View style={[
        styles.header, 
        { backgroundColor: colors.primary },
        orientation === 'landscape' && styles.headerLandscape
      ]}>
        <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <AntDesign name="smile" size={moderateScale(50)} color="#FFFFFF" />
        </View>
        <Text style={[styles.welcome, { fontSize: responsiveFontSize(16) }]}>Welcome back!</Text>
        <Text style={[styles.appName, { fontSize: responsiveFontSize(32) }]}>MyApp</Text>
        <Text style={[styles.tagline, { fontSize: responsiveFontSize(14) }]}>Your journey starts here</Text>
      </View>

      {/* Theme Toggle Button - Responsive */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <AntDesign 
          name={theme === 'light' ? 'eye' : 'bulb'} 
          size={moderateScale(20)} 
          color={colors.primary} 
        />
        <Text style={[styles.themeButtonText, { color: colors.text, fontSize: responsiveFontSize(14) }]}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </TouchableOpacity>

      {/* Features Grid - Responsive */}
      <View style={styles.featuresContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(20) }]}>
          Features
        </Text>
        <View style={[styles.featuresGrid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {features.map(feature => (
            <View
              key={feature.id}
              style={[
                styles.featureCard, 
                { 
                  backgroundColor: colors.card,
                  width: orientation === 'portrait' ? '48%' : '31%',
                }
              ]}
            >
              <View style={[styles.featureIconCircle, { backgroundColor: colors.accent }]}>
                <AntDesign name={feature.icon} size={moderateScale(32)} color={colors.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: colors.text, fontSize: responsiveFontSize(16) }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
                {feature.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Navigation Cards - Responsive */}
      <View style={styles.cardsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(20) }]}>
          Quick Access
        </Text>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Profile', { userId: '123', userName: 'Sonam' })}
        >
          <View style={[styles.cardIcon, { backgroundColor: colors.accent }]}>
            <AntDesign name="user" size={moderateScale(28)} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text, fontSize: responsiveFontSize(16) }]}>
              Profile
            </Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
              View and edit your profile
            </Text>
          </View>
          <AntDesign name="right" size={moderateScale(20)} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => alert('Settings - Coming Soon')}
        >
          <View style={[styles.cardIcon, { backgroundColor: colors.accent }]}>
            <AntDesign name="setting" size={moderateScale(28)} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text, fontSize: responsiveFontSize(16) }]}>
              Settings
            </Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(12) }]}>
              App preferences and options
            </Text>
          </View>
          <AntDesign name="right" size={moderateScale(20)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Orientation Info - For demonstration */}
      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <AntDesign name="info-circle" size={moderateScale(24)} color={colors.primary} />
        <Text style={[styles.infoText, { color: colors.text, fontSize: responsiveFontSize(13) }]}>
          Orientation: {orientation} | Device: {isTablet() ? 'Tablet' : 'Phone'} | Platform: {Platform.OS}
        </Text>
      </View>
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
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(40),
    alignItems: 'center',
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  headerLandscape: {
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(25),
  },
  iconCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  welcome: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  appName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: scale(5),
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: scale(8),
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    gap: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeButtonText: {
    fontWeight: '500',
  },
  featuresContainer: {
    padding: scale(20),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
  },
  featuresGrid: {
    justifyContent: 'space-between',
  },
  featureCard: {
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(15),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  featureTitle: {
    fontWeight: 'bold',
    marginBottom: scale(6),
    textAlign: 'center',
  },
  featureDesc: {
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(15),
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  cardDesc: {
    opacity: 0.7,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(30),
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    gap: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    lineHeight: 20,
  },
});

export default HomeScreen;
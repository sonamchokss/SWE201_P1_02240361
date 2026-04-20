import { AntDesign } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { getDeviceOrientation, getWindowDimensions, isTablet, moderateScale, responsiveFontSize, scale, verticalScale } from '../utils/responsive';

const FEATURES = [
  { id: '1', icon: 'rocket', title: 'Fast Workflow', desc: 'Optimized actions and better responsiveness' },
  { id: '2', icon: 'mobile', title: 'Adaptive UI', desc: 'Fluid layout across portrait and landscape' },
  { id: '3', icon: 'bell', title: 'Smart Alerts', desc: 'Meaningful prompts with clear decisions' },
  { id: '4', icon: 'line-chart', title: 'Live Stats', desc: 'Track your progress in real time' },
  { id: '5', icon: 'safety', title: 'Secure', desc: 'Built with reliability in mind' },
  { id: '6', icon: 'star', title: 'Polished', desc: 'Modern interactions with haptic feedback' },
];

const FeatureCard = ({ item, colors, windowSize, index, numColumns }) => {
  const pressScale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const columnSpacing = scale(10);
  const cardWidth = useMemo(() => {
    const totalHorizontalPadding = scale(40);
    const totalGaps = columnSpacing * (numColumns - 1);
    return (windowSize.width - totalHorizontalPadding - totalGaps) / numColumns;
  }, [windowSize.width, columnSpacing, numColumns]);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 60).springify()}
      style={{
        width: cardWidth,
        marginRight: (index + 1) % numColumns === 0 ? 0 : columnSpacing,
      }}
    >
      <Animated.View style={cardAnimatedStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={() => {
            Haptics.selectionAsync();
            pressScale.value = withTiming(0.96, { duration: 110 });
          }}
          onPressOut={() => {
            pressScale.value = withSpring(1, { damping: 14, stiffness: 230 });
          }}
          style={[
            styles.featureCard,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadow,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={[styles.featureIconCircle, { backgroundColor: colors.accent }]}>
            <AntDesign name={item.icon} size={moderateScale(24, 0.5, windowSize.width)} color={colors.primary} />
          </View>
          <Text style={[styles.featureTitle, { color: colors.text, fontSize: responsiveFontSize(15, windowSize.width) }]}>{item.title}</Text>
          <Text style={[styles.featureDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(11, windowSize.width) }]}>{item.desc}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { colors, toggleTheme, theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [windowSize, setWindowSize] = useState(getWindowDimensions());
  const [orientation, setOrientation] = useState(getDeviceOrientation());
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowSize(window);
      setOrientation(getDeviceOrientation(window.width, window.height));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const numColumns = useMemo(() => {
    const tablet = isTablet(windowSize.width, windowSize.height);
    if (orientation === 'portrait') {
      return tablet ? 3 : 2;
    }
    return tablet ? 4 : 3;
  }, [orientation, windowSize.width, windowSize.height]);

  const onRefresh = () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  };

  const handleOpenProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Profile', {
      userId: 'U-2026-001',
      userName: 'Sonam',
      fromScreen: 'Home',
      activeOrientation: orientation,
      sentAt: new Date().toLocaleTimeString(),
    });
  };

  const handleSettingsAlert = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Settings', 'More controls are coming in the next iteration.', [{ text: 'Nice', style: 'default' }]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + verticalScale(18) }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, orientation === 'landscape' && styles.headerLandscape]}
      >
        <Animated.View entering={FadeInUp.springify()} style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
          <AntDesign name="appstore" size={moderateScale(46, 0.5, windowSize.width)} color="#FFFFFF" />
        </Animated.View>
        <Text style={[styles.welcome, { fontSize: responsiveFontSize(15, windowSize.width) }]}>Modern Dashboard</Text>
        <Text style={[styles.appName, { fontSize: responsiveFontSize(30, windowSize.width) }]}>My App</Text>
        <Text style={[styles.tagline, { fontSize: responsiveFontSize(13, windowSize.width) }]}>Responsive layout, smooth transitions, and clear contrast.</Text>
      </LinearGradient>

      <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.pillButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => {
            Haptics.selectionAsync();
            toggleTheme();
          }}
          activeOpacity={0.85}
        >
          <AntDesign
            name={theme === 'light' ? 'moon' : 'sun'}
            size={moderateScale(18, 0.5, windowSize.width)}
            color={colors.text}
            style={styles.pillButtonIcon}
          />
          <Text style={[styles.pillButtonText, { color: colors.text, fontSize: responsiveFontSize(13, windowSize.width) }]}>
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pillButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={handleOpenProfile}
          activeOpacity={0.85}
        >
          <AntDesign
            name="arrow-right"
            size={moderateScale(18, 0.5, windowSize.width)}
            color={colors.primary}
            style={styles.pillButtonIcon}
          />
          <Text style={[styles.pillButtonText, { color: colors.text, fontSize: responsiveFontSize(13, windowSize.width) }]}>Open Profile</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.featuresContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(19, windowSize.width) }]}>Feature Grid</Text>

        {isLoading ? (
          <View style={styles.skeletonWrapper}>
            {Array.from({ length: numColumns * 2 }).map((_, index) => (
              <View
                key={`skeleton-${index}`}
                style={[
                  styles.skeletonCard,
                  {
                    backgroundColor: colors.accent,
                    width: (windowSize.width - scale(40) - scale(10) * (numColumns - 1)) / numColumns,
                    marginRight: (index + 1) % numColumns === 0 ? 0 : scale(10),
                  },
                ]}
              />
            ))}
          </View>
        ) : (
          <FlatList
            key={numColumns}
            scrollEnabled={false}
            data={FEATURES}
            renderItem={({ item, index }) => (
              <FeatureCard
                item={item}
                index={index}
                colors={colors}
                windowSize={windowSize}
                numColumns={numColumns}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? styles.columnWrap : undefined}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>

      <View style={styles.cardsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(19, windowSize.width) }]}>Quick Access</Text>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }]}
          onPress={handleOpenProfile}
          activeOpacity={0.9}
        >
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.cardIcon}>
            <AntDesign name="user" size={moderateScale(22, 0.5, windowSize.width)} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text, fontSize: responsiveFontSize(15, windowSize.width) }]}>Data Passing Demo</Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>Passes user info and device orientation to Profile screen.</Text>
          </View>
          <AntDesign name="right" size={moderateScale(18, 0.5, windowSize.width)} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }]}
          onPress={handleSettingsAlert}
          activeOpacity={0.9}
        >
          <View style={[styles.cardIcon, { backgroundColor: colors.accent }]}> 
            <AntDesign name="setting" size={moderateScale(22, 0.5, windowSize.width)} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text, fontSize: responsiveFontSize(15, windowSize.width) }]}>Settings Preview</Text>
            <Text style={[styles.cardDesc, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>Uses haptics plus a polished alert action.</Text>
          </View>
          <AntDesign name="right" size={moderateScale(18, 0.5, windowSize.width)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.infoBox, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <AntDesign name="dashboard" size={moderateScale(20, 0.5, windowSize.width)} color={colors.primary} />
        <Text style={[styles.infoText, { color: colors.text, fontSize: responsiveFontSize(12, windowSize.width) }]}>Orientation: {orientation} | Columns: {numColumns} | Device: {isTablet(windowSize.width, windowSize.height) ? 'Tablet' : 'Phone'} | Platform: {Platform.OS}</Text>
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
    paddingBottom: verticalScale(26),
  },
  header: {
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(34),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderBottomLeftRadius: moderateScale(32),
    borderBottomRightRadius: moderateScale(32),
  },
  headerLandscape: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(20),
  },
  iconCircle: {
    width: moderateScale(78),
    height: moderateScale(78),
    borderRadius: moderateScale(39),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  welcome: {
    color: '#FFFFFF',
    opacity: 0.95,
  },
  appName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: scale(4),
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: scale(7),
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    gap: scale(10),
  },
  pillButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(11),
    paddingHorizontal: scale(10),
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 3,
  },
  pillButtonIcon: {
    backgroundColor: 'transparent',
  },
  pillButtonText: {
    fontWeight: '700',
    backgroundColor: 'transparent',
    includeFontPadding: false,
  },
  featuresContainer: {
    padding: scale(20),
    paddingBottom: scale(8),
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: verticalScale(14),
  },
  flatListContainer: {
    paddingBottom: verticalScale(6),
  },
  columnWrap: {
    marginBottom: verticalScale(10),
  },
  skeletonWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(4),
  },
  skeletonCard: {
    height: verticalScale(128),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(10),
    opacity: 0.75,
  },
  featureCard: {
    padding: moderateScale(16),
    borderRadius: moderateScale(18),
    minHeight: verticalScale(132),
    marginBottom: verticalScale(4),
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIconCircle: {
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(27),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  featureTitle: {
    fontWeight: '700',
    marginBottom: scale(6),
    textAlign: 'center',
  },
  featureDesc: {
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(2),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(14),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardIcon: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: scale(4),
  },
  cardDesc: {},
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginTop: verticalScale(2),
    padding: moderateScale(14),
    borderRadius: moderateScale(14),
    gap: scale(12),
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    lineHeight: 18,
  },
});

export default HomeScreen;
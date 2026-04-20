import { AntDesign } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { getDeviceOrientation, getWindowDimensions, moderateScale, responsiveFontSize, scale, verticalScale } from '../utils/responsive';

const ProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowDimensions());
  const [orientation, setOrientation] = useState(getDeviceOrientation());
  const [refreshing, setRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Building a clean and modern profile experience.');
  const [counter, setCounter] = useState(0);

  const { userId, userName } = route.params || {
    userId: 'N/A',
    userName: 'Sonam',
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowSize(window);
      setOrientation(getDeviceOrientation(window.width, window.height));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const menuItems = [
    { id: 1, icon: 'setting', title: 'Account Settings', color: '#4ECDC4' },
    { id: 2, icon: 'bell', title: 'Notifications', color: '#FF6B6B', hasSwitch: true },
    { id: 3, icon: 'heart', title: 'Favorites', color: '#45B7D1' },
    { id: 4, icon: 'star', title: 'Rate App', color: '#96CEB4' },
    { id: 5, icon: 'question-circle', title: 'Help & Support', color: '#FFB347' },
    { id: 6, icon: 'logout', title: 'Logout', color: '#FF6B6B' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    Haptics.selectionAsync();
    setTimeout(() => setRefreshing(false), 900);
  };

  const columns = useMemo(() => (orientation === 'landscape' ? 2 : 1), [orientation]);

  const handleMenuItemPress = (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (item.title === 'Logout') {
      Alert.alert(
        'Confirm Logout',
        'Would you like to return to Home now?',
        [
          { text: 'Stay', style: 'cancel' },
          {
            text: 'Go to Home',
            style: 'destructive',
            onPress: () => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              navigation.navigate('Home');
            },
          },
        ]
      );
    } else if (item.title !== 'Notifications') {
      Alert.alert(item.title, 'This section is in progress and will be available soon.', [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + verticalScale(28) }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, orientation === 'landscape' && styles.headerLandscape]}
      >
        <View style={[styles.avatar, { shadowColor: colors.shadow }]}> 
          <AntDesign name="user" size={moderateScale(60)} color={colors.primary} />
        </View>
        <Text style={[styles.name, { fontSize: responsiveFontSize(24, windowSize.width), color: '#FFFFFF' }]}>
          {userName}
        </Text>
        <Text style={[styles.bio, { fontSize: responsiveFontSize(14, windowSize.width), color: '#FFFFFF', opacity: 0.92 }]}>
          Mobile Developer
        </Text>
        <Text style={[styles.userId, { fontSize: responsiveFontSize(12, windowSize.width), color: '#FFFFFF', opacity: 0.8 }]}>
          User ID: {userId}
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            Haptics.selectionAsync();
            Alert.alert('Edit Profile', 'Profile editing module will be enabled in a future update.');
          }}
        >
          <AntDesign name="edit" size={moderateScale(14)} color="#FFFFFF" />
          <Text style={[styles.editButtonText, { fontSize: responsiveFontSize(12, windowSize.width) }]}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={[styles.statsContainer, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }]}> 
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20, windowSize.width) }]}>
            156
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>
            Posts
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20, windowSize.width) }]}>
            2.5K
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>
            Followers
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary, fontSize: responsiveFontSize(20, windowSize.width) }]}>
            890
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>
            Following
          </Text>
        </View>
      </View>

      <View style={[styles.sectionRow, columns === 2 && styles.sectionRowLandscape]}>
        <Animated.View entering={FadeInDown.delay(80).springify()} style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }, columns === 2 && styles.halfSection]}>
          <View style={styles.sectionHeader}>
            <AntDesign name="info-circle" size={moderateScale(22)} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(18, windowSize.width) }]}>About</Text>
          </View>
          <Text style={[styles.sectionText, { color: colors.textSecondary, fontSize: responsiveFontSize(14, windowSize.width), lineHeight: moderateScale(22) }]}>
            Passionate mobile developer building production-ready apps focused on clean architecture and thoughtful user experience.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(130).springify()} style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }, columns === 2 && styles.halfSection]}>
          <View style={styles.sectionHeader}>
            <AntDesign name="rocket" size={moderateScale(22)} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(18, windowSize.width) }]}>State Demo</Text>
          </View>
          <Text style={[styles.counterLabel, { color: colors.textSecondary, fontSize: responsiveFontSize(12, windowSize.width) }]}>Counter value: {counter}</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[styles.counterButton, { backgroundColor: colors.accent }]}
              onPress={() => {
                Haptics.selectionAsync();
                setCounter((prev) => Math.max(0, prev - 1));
              }}
            >
              <AntDesign name="minus" size={16} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, { backgroundColor: colors.accent }]}
              onPress={() => {
                Haptics.selectionAsync();
                setCounter((prev) => prev + 1);
              }}
            >
              <AntDesign name="plus" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            value={statusMessage}
            onChangeText={setStatusMessage}
            placeholder="Update your status"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
          />
        </Animated.View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }]}> 
        <View style={styles.sectionHeader}>
          <AntDesign name="star" size={moderateScale(22)} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: responsiveFontSize(18, windowSize.width) }]}>
            Skills
          </Text>
        </View>
        <View style={styles.skillsContainer}>
          {['React Native', 'JavaScript', 'TypeScript', 'UI/UX', 'Node.js', 'Firebase', 'Redux', 'GraphQL'].map((skill, index) => (
            <View key={index} style={[styles.skill, { backgroundColor: colors.accent }]}>
              <Text style={[styles.skillText, { color: colors.primary, fontSize: responsiveFontSize(12, windowSize.width) }]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border }]}> 
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <AntDesign name={item.icon} size={moderateScale(20)} color={item.color} />
              <Text style={[styles.menuText, { color: colors.text, fontSize: responsiveFontSize(14, windowSize.width) }]}>
                {item.title}
              </Text>
            </View>
            {item.hasSwitch ? (
              <Switch
                value={notificationsEnabled}
                onValueChange={(value) => {
                  Haptics.selectionAsync();
                  setNotificationsEnabled(value);
                }}
                trackColor={{ false: '#94A3B8', true: colors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#94A3B8"
                style={styles.notificationSwitch}
              />
            ) : (
              <AntDesign name="right" size={moderateScale(16)} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.primary, shadowColor: colors.shadow, marginBottom: verticalScale(10) }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.goBack();
        }}
      >
        <AntDesign name="arrow-left" size={moderateScale(20)} color="#FFFFFF" />
        <Text style={[styles.backButtonText, { fontSize: responsiveFontSize(16, windowSize.width), color: '#FFFFFF' }]}>
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
    paddingBottom: verticalScale(20),
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(34),
    paddingBottom: verticalScale(26),
    paddingHorizontal: scale(20),
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
    borderWidth: 1,
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
  sectionRow: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  sectionRowLandscape: {
    flexDirection: 'row',
    gap: scale(14),
  },
  section: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  halfSection: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 0,
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
  counterLabel: {
    marginBottom: verticalScale(8),
  },
  counterRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(12),
  },
  counterButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(13),
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
    borderWidth: 1,
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
    borderBottomColor: '#CBD5E1',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  menuText: {
    fontWeight: '500',
  },
  notificationSwitch: {
    transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20),
    marginTop: verticalScale(22),
    padding: moderateScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
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
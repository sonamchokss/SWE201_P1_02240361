import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticTab } from '../../components/haptic-tab';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ name, color, focused }) => {
  const scale = useSharedValue(focused ? 1 : 0.92);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.06 : 0.92, {
      damping: 14,
      stiffness: 220,
      mass: 0.6,
    });
  }, [focused, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconWrap, focused && styles.iconWrapFocused, iconStyle]}>
      <AntDesign name={name} size={20} color={color} />
    </Animated.View>
  );
};

const BottomTabs = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          height: Platform.OS === 'ios' ? 72 + insets.bottom : 66 + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? 18 + insets.bottom : 10,
          paddingTop: 10,
          borderTopWidth: 0,
          borderRadius: 24,
          backgroundColor: colors.tabBar,
          elevation: 10,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.18,
          shadowRadius: 14,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 12,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackground: () => (
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="user" color={color} focused={focused} />
          ),
        }}
        initialParams={{ userId: '123', userName: 'Sonam' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapFocused: {
    backgroundColor: 'rgba(102, 126, 234, 0.16)',
  },
});

export default BottomTabs;
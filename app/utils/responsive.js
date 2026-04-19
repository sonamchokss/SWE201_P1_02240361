import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive width (based on iPhone 8 screen width - 375)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Scale function for responsive sizing
export const scale = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

// Vertical scale function
export const verticalScale = (size) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Moderate scale (with limit)
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Check if device is tablet
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  return (adjustedWidth >= 600 || adjustedHeight >= 600);
};

// Get orientation
export const isPortrait = () => SCREEN_HEIGHT > SCREEN_WIDTH;
export const isLandscape = () => SCREEN_WIDTH > SCREEN_HEIGHT;

// Platform specific values
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Responsive font size
export const responsiveFontSize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  scale,
  verticalScale,
  moderateScale,
  isTablet,
  isPortrait,
  isLandscape,
  isIOS,
  isAndroid,
  responsiveFontSize,
};
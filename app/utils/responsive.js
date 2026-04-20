import { Dimensions, PixelRatio, Platform } from 'react-native';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export const getWindowDimensions = () => Dimensions.get('window');

export const scale = (size, width = getWindowDimensions().width) => (width / guidelineBaseWidth) * size;

export const verticalScale = (size, height = getWindowDimensions().height) => (height / guidelineBaseHeight) * size;

export const moderateScale = (size, factor = 0.5, width = getWindowDimensions().width) => {
  return size + (scale(size, width) - size) * factor;
};

export const isTablet = (width = getWindowDimensions().width, height = getWindowDimensions().height) => {
  const shortestSide = Math.min(width, height);
  const densityIndependentSide = shortestSide / PixelRatio.get();
  return densityIndependentSide >= 600;
};

export const isPortrait = (width = getWindowDimensions().width, height = getWindowDimensions().height) => {
  return height >= width;
};

export const isLandscape = (width = getWindowDimensions().width, height = getWindowDimensions().height) => {
  return width > height;
};

export const getDeviceOrientation = (width = getWindowDimensions().width, height = getWindowDimensions().height) => {
  return isPortrait(width, height) ? 'portrait' : 'landscape';
};

// Platform specific values
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const responsiveFontSize = (size, width = getWindowDimensions().width) => {
  const newSize = scale(size, width);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const getScreenWidth = () => getWindowDimensions().width;
export const getScreenHeight = () => getWindowDimensions().height;

export default {
  getWindowDimensions,
  getScreenWidth,
  getScreenHeight,
  scale,
  verticalScale,
  moderateScale,
  isTablet,
  isPortrait,
  isLandscape,
  getDeviceOrientation,
  isIOS,
  isAndroid,
  responsiveFontSize,
};
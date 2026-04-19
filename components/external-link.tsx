import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ReactNode } from 'react';
import { Linking, Text, TouchableOpacity, type GestureResponderEvent } from 'react-native';

type Props = {
  href: string;
  children?: ReactNode;
};

export function ExternalLink({ href, children }: Props) {
  const onPress = async (event: GestureResponderEvent) => {
    if (process.env.EXPO_OS !== 'web') {
      event.preventDefault();
      await openBrowserAsync(href, {
        presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
      });
      return;
    }

    await Linking.openURL(href);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children ?? href}</Text>
    </TouchableOpacity>
  );
}

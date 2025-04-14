import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import ContinentList from '~/components/continent-list';
import CurrencyList from '~/components/currency-list';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/text';
import { useColorScheme } from '~/lib/useColorScheme';

export default function ModalScreen() {
  const { colors, colorScheme } = useColorScheme();
  const { dismiss } = useRouter();
  const statusBarStyle =
    Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark';

  const onSeeResults = () => {
    dismiss();
  };

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <View className="flex-1 items-center justify-center gap-1 px-12 py-4">
        <ContinentList />
        <CurrencyList />
        <Button className="bg-blue-600" onPress={onSeeResults}>
          <Text>See results</Text>
        </Button>
      </View>
    </>
  );
}

import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContinentList from '~/components/continent-list';
import CurrencyList from '~/components/currency-list';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { useStore } from '~/store/store';

export default function ModalScreen() {
  const { colorScheme } = useColorScheme();
  const { dismiss } = useRouter();
  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

  const resetFilter = useStore((state) => state.resetFilter);

  const onSeeResults = () => {
    dismiss();
  };

  const onClearFilters = () => {
    resetFilter();
    dismiss();
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style={statusBarStyle} />
      <View className="flex-1 justify-between px-4 py-4">
        <ContinentList />

        <CurrencyList />

        <View className="flex-row justify-center gap-3 py-4">
          <Button className="flex-1 rounded-xl bg-blue-600 py-3 shadow-sm" onPress={onSeeResults}>
            <Text className="text-center font-medium text-white">See Results</Text>
          </Button>

          <Button
            className="flex-1 rounded-xl border border-blue-200 bg-white py-3"
            onPress={onClearFilters}>
            <Text className="text-center font-medium text-blue-700">Clear Filters</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

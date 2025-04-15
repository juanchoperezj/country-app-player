import { useQuery } from '@apollo/client';
import { LegendList } from '@legendapp/list';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { Button } from './nativewindui/Button';
import EmptyState from './ui/empty-state';

import { Text } from '~/components/nativewindui/text';
import { Currency, GET_CURRENCIES_PER_COUNTRY } from '~/graphql-client/country';
import { useStore } from '~/store/store';

const CurrencyList = () => {
  const { data, loading, error } = useQuery<{ countries: Currency[] }>(GET_CURRENCIES_PER_COUNTRY);
  const setCurrency = useStore((state) => state.setCurrency);
  const selectedCurrency = useStore((state) => state.currency);

  const onPressCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

  if (loading) return <ActivityIndicator />;

  if (error) return <EmptyState title="Error" description={error.message} />;

  const uniqueCurrencies = data?.countries
    ? Array.from(new Set(data.countries.map((country) => country.currency)))
        .filter(Boolean)
        .map((currency) => ({ currency }))
    : [];

  const renderItem = ({ item }: { item: { currency: string } }) => {
    if (!item.currency) return null;
    return (
      <Button
        onPress={() => onPressCurrency(item.currency)}
        className={twMerge(
          'mr-1 h-[30px] rounded-lg',
          selectedCurrency === item.currency ? 'bg-blue-600' : 'bg-blue-300'
        )}>
        <Text className={twMerge('text-sm', selectedCurrency === item.currency ? 'font-bold' : '')}>
          {item.currency}
        </Text>
      </Button>
    );
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-lg">
      <View className="h-[95px] rounded-lg px-2 py-4">
        <Text className="text-md font-bold text-blue-900">Currencies</Text>
        <LegendList
          data={uniqueCurrencies}
          estimatedItemSize={180}
          horizontal
          contentContainerClassName="py-4 px-2"
          extraData={selectedCurrency}
          removeClippedSubviews={false} // used for selecting text on android
          keyExtractor={(item, index) => `${item.currency}-${index}`}
          renderItem={renderItem}
          recycleItems
          ListEmptyComponent={
            !data?.countries?.length ? <EmptyState title="No currencies" /> : undefined
          }
        />
      </View>
    </LinearGradient>
  );
};

export default CurrencyList;

// do something similar to the continent list

import { useQuery } from '@apollo/client';
import { LegendList } from '@legendapp/list';
import { cssInterop } from 'nativewind';
import { useCallback } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Container } from './Container';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { Button } from './nativewindui/Button';
import EmptyState from './ui/empty-state';

import { Text } from '~/components/nativewindui/text';
import { Currency, GET_CURRENCIES_PER_COUNTRY } from '~/graphql-client/country';
import { useStore } from '~/store/store';

const CurrencyList = () => {
  const { data, loading, error } = useQuery<{ countries: Currency[] }>(GET_CURRENCIES_PER_COUNTRY);
  const setCurrency = useStore((state) => state.setCurrency);
  const resetFilter = useStore((state) => state.resetFilter);
  const selectedCurrency = useStore((state) => state.currency);

  const onPressCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

  if (loading) return <ActivityIndicator />;

  if (error) return <EmptyState title="Error" description={error.message} />;

  return (
    <Container>
      <View className="rounded-lg bg-slate-400 p-4">
        <Text className="mb-4 text-xl">Select a currency to filter</Text>
        <LegendList
          data={data?.countries ?? []}
          estimatedItemSize={180}
          contentContainerClassName="py-4 android:pb-12 px-2"
          extraData={selectedCurrency}
          removeClippedSubviews={false} // used for selecting text on android
          keyExtractor={(item, index) => `${item.currency}-${index}`}
          // ItemSeparatorComponent={renderSeparator}
          renderItem={({ item }) => {
            if (!item.currency) return null;
            return (
              <Button
                onPress={() => onPressCurrency(item.currency)}
                className={twMerge(
                  'rounded-lg',
                  selectedCurrency === item.currency ? 'bg-blue-600' : 'bg-blue-300'
                )}>
                <Text
                  className={twMerge(
                    'text-sm',
                    selectedCurrency === item.currency ? 'font-bold' : ''
                  )}>
                  {item.currency}
                </Text>
              </Button>
            );
          }}
          ListEmptyComponent={
            !data?.countries?.length ? <EmptyState title="No currencies" /> : undefined
          }
        />
      </View>
    </Container>
  );
};

export default CurrencyList;

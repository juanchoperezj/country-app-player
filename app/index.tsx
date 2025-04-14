import { useQuery } from '@apollo/client';
import { LegendList } from '@legendapp/list';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';

import CountryItem from '~/components/country-item';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import EmptyState from '~/components/ui/empty-state';
import { Country, GET_COUNTRIES } from '~/graphql-client/country';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';
import { useStore } from '~/store/store';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

const filterCountries = (
  countries: Country[],
  continent?: string,
  text?: string,
  currency?: string
) => {
  if (continent || text || currency) {
    console.log('🚀 ~ filterCountries ~ continent:', continent);
    return countries
      .filter((country) => country.name.toLowerCase().includes(text?.toLowerCase() ?? ''))
      .filter((country) => (continent ? country.continent.name === continent : true))
      .filter((country) => (currency ? country.currency === currency : true));
  }
  return countries;
};

export default function Screen() {
  const selectedContinent = useStore((state) => state.continent);
  const selectedCurrency = useStore((state) => state.currency);
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: false,
    placeholder: selectedContinent
      ? `Searching in ${selectedContinent} `
      : 'Search by country name',
  });
  const { loading, data, error } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

  const countries = filterCountries(
    data?.countries ?? [],
    selectedContinent,
    searchValue,
    selectedCurrency
  );

  const EMPTY_MESSAGE = searchValue ? 'No country found' : 'No countries found';

  const renderSeparator = () => <View className="border-border/30 border-b p-2" />;

  if (loading) return <ActivityIndicator />;

  if (error) return <EmptyState title="Error" description={error.message} />;

  return (
    <View className="flex-1">
      <LegendList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={countries ?? []}
        estimatedItemSize={180}
        contentContainerClassName="py-4 android:pb-12 px-2"
        extraData={searchValue}
        removeClippedSubviews={false} // used for selecting text on android
        keyExtractor={(item) => item.code}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => <CountryItem country={item} />}
        recycleItems
        ListEmptyComponent={!countries?.length ? <EmptyState title={EMPTY_MESSAGE} /> : undefined}
      />
    </View>
  );
}

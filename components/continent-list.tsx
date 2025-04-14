import { useQuery } from '@apollo/client';
import { cssInterop } from 'nativewind';
import { useCallback } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Container } from './Container';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import EmptyState from './ui/empty-state';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/text';
import { Continent, GET_CONTINENTS } from '~/graphql-client/continents';
import { useStore } from '~/store/store';

cssInterop(Button, {
  className: 'style',
  style: 'style',
});

const ContinentList = () => {
  const { data, loading, error } = useQuery<{ continents: Continent[] }>(GET_CONTINENTS);
  const setContinent = useStore((state) => state.setContinent);
  const resetFilter = useStore((state) => state.resetFilter);
  const selectedContinent = useStore((state) => state.continent);

  const onPressContinent = useCallback((continent: Continent) => {
    setContinent(continent.name);
  }, []);

  if (loading) return <ActivityIndicator />;

  if (error) return <EmptyState title="Error" description={error.message} />;

  return (
    <Container>
      <View className="rounded-lg bg-slate-400 p-4">
        <Text className="mb-4 text-xl">Select a continent to filter</Text>
        <View className="flex-row flex-wrap gap-2">
          <Button
            className={twMerge('rounded-lg', selectedContinent ? 'bg-blue-300' : 'bg-blue-600')}
            onPress={resetFilter}>
            <Text>All</Text>
          </Button>
          {data?.continents.map((continent) => (
            <Button
              key={continent.name}
              className={twMerge(
                'rounded-lg',
                selectedContinent === continent.name ? 'bg-blue-600' : 'bg-blue-300'
              )}
              onPress={() => onPressContinent(continent)}>
              <Text>{continent.name}</Text>
            </Button>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default ContinentList;

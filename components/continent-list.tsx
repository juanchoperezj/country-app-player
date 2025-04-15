import { useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { useCallback } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

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

cssInterop(LinearGradient, { className: 'style' });

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
    <LinearGradient
      colors={['#ecfdf5', '#d1fae5', '#a7f3d0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-lg">
      <View className="mb-6 overflow-hidden rounded-lg shadow-lg">
        <View className="p-5 pb-2">
          <Text className="mb-2 text-2xl font-bold text-green-900">Continents</Text>
          <Text className="mb-4 text-green-800">Explore destinations by continent</Text>
          <View className="flex-row flex-wrap gap-2">
            <Button
              className={twMerge(
                'rounded-xl px-5 py-3 shadow-sm',
                selectedContinent ? 'border border-green-100 bg-white' : 'bg-green-600 shadow-md'
              )}
              onPress={resetFilter}>
              <View className="flex-row items-center">
                <Text
                  className={twMerge(
                    'text-base font-medium',
                    selectedContinent ? 'text-green-800' : 'text-white'
                  )}>
                  🌐 All Continents
                </Text>
              </View>
            </Button>
            {data?.continents.map((continent) => {
              const isSelected = selectedContinent === continent.name;

              return (
                <Button
                  key={continent.name}
                  className={twMerge(
                    'rounded-lg px-4 py-3',
                    selectedContinent === continent.name
                      ? 'shadow-md0 bg-green-600'
                      : 'border border-green-100 bg-white'
                  )}
                  onPress={() => onPressContinent(continent)}>
                  <View className="flex-row items-center">
                    <Text
                      className={twMerge(
                        'text-base font-medium',
                        isSelected ? 'text-white' : 'text-green-800'
                      )}>
                      {continent.name}
                    </Text>
                  </View>
                </Button>
              );
            })}
          </View>
          {selectedContinent && (
            <View className="mt-4">
              <Text className="mb-2 text-sm text-green-800">
                Currently filtering by: <Text className="font-bold">{selectedContinent}</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ContinentList;

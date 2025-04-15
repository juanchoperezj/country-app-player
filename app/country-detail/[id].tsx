import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, ImageBackground } from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Text } from '~/components/nativewindui/text';
import EmptyState from '~/components/ui/empty-state';
import VideoPlayer from '~/components/video-player';
import { Country, GET_COUNTRY_DETAIL } from '~/graphql-client/country';

export default function CountryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ countries: Country[] }>(GET_COUNTRY_DETAIL, {
    variables: { code: id },
  });

  if (loading) return <ActivityIndicator className="flex-1 justify-center" />;

  if (error) return <EmptyState title="Error" description={error.message} />;

  if (!data?.countries?.length) return <EmptyState title="No country found" />;

  const country = data.countries[0];

  return (
    <ScrollView className="flex-1">
      <ImageBackground
        source={require('../../assets/world-map.jpg')}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
        resizeMethod="auto">
        <Stack.Screen options={{ title: country.name, headerTintColor: '#047857' }} />
        <View className="items-center px-6 pb-6 pt-8">
          <Text className="mb-4 text-6xl">{country.emoji}</Text>
          <Text className="text-3xl font-bold text-green-900">{country.name}</Text>
          <Text className="text-green-700">{country.continent.name}</Text>
        </View>
        <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-white shadow-md">
          <View className="p-6">
            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="business-outline" size={18} color="#047857" />
              </View>
              <View>
                <Text className="text-xs uppercase text-green-600">Capital</Text>
                <Text className="text-base font-medium text-green-900">
                  {country.capital || 'No capital information'}
                </Text>
              </View>
            </View>

            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="cash-outline" size={18} color="#047857" />
              </View>
              <View>
                <Text className="text-xs uppercase text-green-600">Currency</Text>
                <Text className="text-base font-medium text-green-900">
                  {country.currency || 'No currency information'}
                </Text>
              </View>
            </View>

            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="chatbubbles-outline" size={18} color="#047857" />
              </View>
              <View className="flex-1">
                <Text className="text-xs uppercase text-green-600">Languages</Text>
                <View className="flex-row flex-wrap">
                  {country.languages.length > 0 ? (
                    country.languages.map((language) => (
                      <View
                        key={language.name}
                        className="mr-2 mt-2 h-[35px] rounded-full bg-green-50 px-1 py-1">
                        <Text className="text-green-800">
                          {language.name}
                          {language.native && language.native !== language.name && (
                            <Text className="text-xs text-green-600"> ({language.native})</Text>
                          )}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="mt-2 text-base font-medium text-green-900">
                      No language information
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="code-outline" size={18} color="#047857" />
              </View>
              <View>
                <Text className="text-xs uppercase text-green-600">Country Code</Text>
                <Text className="text-base font-medium text-green-900">{country.code}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-white shadow-md">
          <View className="p-6">
            <Text className="mb-3 text-lg font-bold text-green-900">Continent Information</Text>

            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="globe-outline" size={18} color="#047857" />
              </View>
              <View>
                <Text className="text-xs uppercase text-green-600">Located In</Text>
                <Text className="text-base font-medium text-green-900">
                  {country.continent.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-white shadow-md">
          <Text className="text-center text-sm text-green-700">HLS Video Player</Text>
          <VideoPlayer />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

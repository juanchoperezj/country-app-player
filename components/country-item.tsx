import { useRouter } from 'expo-router';
import { View, Pressable } from 'react-native';

import { Text } from '~/components/nativewindui/text';
import { Country } from '~/graphql-client/country';

const CountryItem = ({ country }: { country: Country }) => {
  const { navigate } = useRouter();

  const onPressItem = () => {
    navigate(`/country-detail/${country.code}`);
  };

  return (
    <Pressable onPress={() => onPressItem()}>
      <View className="flex-row items-center justify-between gap-2 rounded-xl bg-card p-4">
        <View className="">
          <View className="flex-row gap-2">
            <Text className="w-[85%] overflow-hidden truncate text-2xl">{country.name}</Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="font-bold">{country.continent.name}</Text>
          </View>
        </View>
        <View>
          <Text className="text-5xl">{country.emoji}</Text>
          <Text className="font-bold">{country.code}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CountryItem;

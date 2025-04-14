import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import { Text } from '~/components/nativewindui/text';

export default function CountryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Container>
      <Text className="text-center text-2xl font-bold">Country Detail {id}</Text>
    </Container>
  );
}

import { View } from 'react-native';

import { Text } from '~/components/nativewindui/text';

type EmptyStateProps = {
  title: string;
  description?: string;
};
const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-1 px-12">
      <Text variant="title3" className="pb-1 text-center font-semibold">
        {title}
      </Text>
      {description ? (
        <Text color="tertiary" variant="subhead" className="pb-4 text-center">
          {description}
        </Text>
      ) : null}
    </View>
  );
};

export default EmptyState;

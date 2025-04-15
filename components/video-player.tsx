import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';

import { Text } from './nativewindui/text';

import { Button } from '~/components/nativewindui/Button';

const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const VideoPlayer = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.timeUpdateEventInterval = 1;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { currentTime } = useEvent(player, 'timeUpdate', {
    currentTime: 0,
    bufferedPosition: 0,
    currentLiveTimestamp: 0,
    currentOffsetFromLive: 0,
  });
  console.log('🚀 ~ VideoPlayer ~ currentTime:', currentTime);

  return (
    <View className="align-center h-[300px] justify-start bg-slate-400">
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={{ width: '100%', height: '80%' }}
      />
      <View className="">
        <View className="flex-row items-center justify-between">
          <Button onPress={() => player.play()} className="bg-green-500">
            <Text className="text-white">Play</Text>
          </Button>
          <Button onPress={() => player.pause()} disabled={!isPlaying} className="bg-red-500">
            <Text className="text-white">Pause</Text>
          </Button>
          <View className="flex-row items-center gap-2">
            <Text className="text-white">
              {Math.round(currentTime)}/{Math.round(player.duration)}
            </Text>
            <Text className="text-white">{player.duration.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoPlayer;

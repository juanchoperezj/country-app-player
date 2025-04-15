import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, TouchableOpacity } from 'react-native';

import { ProgressIndicator } from './nativewindui/ProgressIndicator';
import { Text } from './nativewindui/text';

import { convertSeconds } from '~/utils/player';

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

  const handleRestart = () => {
    player.replay();
  };

  return (
    <View className="overflow-hidden rounded-xl bg-slate-800 shadow-lg">
      <View className="relative h-[300px]">
        <VideoView
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          style={{ width: '100%', height: '100%' }}
          nativeControls={false} // Android only
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 py-2">
          <View className="mb-1 px-4">
            <ProgressIndicator
              value={(currentTime * 100) / player.duration}
              max={100}
              className="mb-1.5 h-1.5 overflow-hidden rounded-full"
            />
            <View className="flex-row justify-between">
              <Text className="text-xs text-white">{convertSeconds(currentTime)}</Text>
              <Text className="text-xs text-white">{convertSeconds(player.duration)}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View className="bg-slate-900 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleRestart} className="p-2">
            <Ionicons name="refresh-outline" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-row items-center gap-4">
            {isPlaying ? (
              <TouchableOpacity
                onPress={() => player.pause()}
                className="rounded-full bg-slate-700 p-3">
                <Ionicons name="pause" size={28} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => player.play()}
                className="rounded-full bg-blue-600 p-3">
                <Ionicons name="play" size={28} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity className="p-2">
            <Ionicons name="expand-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VideoPlayer;

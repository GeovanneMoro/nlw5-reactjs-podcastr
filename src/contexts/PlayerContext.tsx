import { createContext, ReactNode, useState } from 'react';

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  hasPrevious: boolean;
  hasNext: boolean;
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isShuffling: boolean;
  isLooping: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  tooglePlay: () => void;
  toogleLoop: () => void;
  toogleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
}

interface PlayerContextProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length,
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      setIsPlaying(false);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      setIsPlaying(false);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      setIsPlaying(false);
    }
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toogleLoop() {
    setIsLooping(!isLooping);
  }

  function toogleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        hasPrevious,
        hasNext,
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isShuffling,
        isLooping,
        tooglePlay,
        toogleLoop,
        toogleShuffle,
        setPlayingState,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

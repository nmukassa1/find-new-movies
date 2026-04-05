/** Minimal typings for YouTube IFrame API (background player control). */
export {};

type YTPlayerInstance = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
};

type YTPlayerOptions = {
  videoId: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (e: { target: YTPlayerInstance }) => void;
    onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
  };
};

type YTPlayerConstructor = new (
  container: HTMLElement | string,
  options: YTPlayerOptions,
) => YTPlayerInstance;

declare global {
  interface Window {
    YT?: {
      Player: YTPlayerConstructor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

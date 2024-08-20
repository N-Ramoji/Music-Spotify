import React, { useRef, useState, useEffect } from 'react';
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaEllipsisH,
} from 'react-icons/fa';
import './MusicPlayer.css';

const MusicPlayer = ({ selectedSong, onPrevious, onNext }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeBarVisible, setIsVolumeBarVisible] = useState(false);

  useEffect(() => {
    if (selectedSong) {
      audioRef.current.volume = volume;
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }

      // Extract dominant color from the album image using Canvas API
      const img = new Image();
      img.src = `https://cms.samespace.com/assets/${selectedSong.cover}`;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;
        const colors = {};
        let dominantColor = { r: 0, g: 0, b: 0, count: 0 };

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const key = `${r},${g},${b}`;
          if (colors[key]) {
            colors[key]++;
          } else {
            colors[key] = 1;
          }

          if (colors[key] > dominantColor.count) {
            dominantColor = { r, g, b, count: colors[key] };
          }
        }

        const dominantColorHex = `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})`;
        document.body.style.backgroundColor = dominantColorHex;
      };
    }
  }, [selectedSong, volume, isPlaying]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => audio.removeEventListener('timeupdate', updateProgress);
    }
  }, );

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // const toggleMute = () => {
  //   if (isMuted) {
  //     audioRef.current.volume = volume;
  //     setIsMuted(false);
  //   } else {
  //     audioRef.current.volume = 0;
  //     setIsMuted(true);
  //   }
  // };

  const toggleVolumeBarVisibility = () => {
    setIsVolumeBarVisible(!isVolumeBarVisible);
  };

  return (
    <div className="music-player">
      {selectedSong ? (
        <>
          <div className="song-info">
            <h2 className="song-title">{selectedSong.name}</h2>
            <p className="song-artist">{selectedSong.artist}</p>
          </div>
          <img
            className="album-art"
            src={`https://cms.samespace.com/assets/${selectedSong.cover}`}
            alt={selectedSong.name}
          />
          <input
            type="range"
            className="seek-bar"
            value={progress}
            onChange={handleSeek}
            min="0"
            max="100"
          />
          <div className="controls">
            <FaEllipsisH className="control-icon" />
            <FaStepBackward className="control-icon" onClick={onPrevious} />
            <div className="play-pause-icon" onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </div>
            <FaStepForward className="control-icon" onClick={onNext} />
            <div className="control-icon" onClick={toggleVolumeBarVisibility}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
          </div>
          {isVolumeBarVisible && (
            <input
              type="range"
              className="volume-bar"
              value={volume * 100}
              onChange={handleVolumeChange}
              min="0"
              max="100"
            />
          )}
          <audio ref={audioRef} src={selectedSong.url} />
        </>
      ) : (
        <div className="select-song">Select a song to play</div>
      )}
    </div>
  );
};

export default MusicPlayer;

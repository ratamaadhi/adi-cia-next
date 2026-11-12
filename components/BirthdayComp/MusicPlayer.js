import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { FiPause, FiPlay } from 'react-icons/fi';
import { senaLyrics } from '../../lib/sena-lyrics';
import styles from '../../styles/Birthday.module.css';

export default function MusicPlayer({ audioRef, playing, onToggle, error }) {
  const [position, setPosition] = useState({ line: -1, word: -1, running: false });

  useEffect(() => {
    const audio = audioRef.current;
    let frame = 0;

    function syncLyrics() {
      const time = audio.currentTime;
      const line = senaLyrics.findIndex(cue => time >= cue.start && time < cue.end);
      const cue = senaLyrics[line];
      const word = cue ? cue.words.findIndex((item, index) => time >= item.start && time < (cue.words[index + 1]?.start ?? cue.end)) : -1;
      const running = !audio.paused && !document.hidden;
      setPosition(previous => previous.line === line && previous.word === word && previous.running === running ? previous : { line, word, running });
    }

    function tick() {
      syncLyrics();
      if (!audio.paused && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function restart() {
      cancelAnimationFrame(frame);
      tick();
    }

    const events = ['play', 'pause', 'seeked', 'ended', 'loadedmetadata'];
    events.forEach(event => audio.addEventListener(event, restart));
    audio.addEventListener('timeupdate', syncLyrics);
    document.addEventListener('visibilitychange', restart);
    restart();

    return () => {
      cancelAnimationFrame(frame);
      events.forEach(event => audio.removeEventListener(event, restart));
      audio.removeEventListener('timeupdate', syncLyrics);
      document.removeEventListener('visibilitychange', restart);
    };
  }, [audioRef]);

  const cue = senaLyrics[position.line];

  return (
    <section className={styles.musicPlayer} aria-label="Musik dan lirik Watching You Grow">
      <div className={styles.lyricArea}>
        {error ? <p className={styles.musicError} role="status">{error}</p> : cue ? (
          <div
            key={position.line}
            className={styles.lyricPaper}
            data-chorus={cue.chorus}
            data-featured={cue.featured}
            data-running={position.running}
            lang="en"
          >
            {cue.featured && <div className={styles.lyricExcavator} aria-hidden="true"><Image src="/birthday/sena/toy-excavator.webp" alt="" width={900} height={900} unoptimized /></div>}
            <p className={styles.lyricText}>{cue.words.map((word, index) => (
              <Fragment key={index}><span className={styles.lyricWord} data-active={index === position.word} data-past={index < position.word}>{word.text}</span>{index < cue.words.length - 1 ? ' ' : ''}</Fragment>
            ))}</p>
            {cue.featured && <span className={styles.lyricStar} aria-hidden="true" />}
          </div>
        ) : (
          <p className={styles.songTitle}>Watching You Grow <span>Mr2Crafty</span></p>
        )}
      </div>
      <div className={styles.musicControls}>
        <button type="button" onClick={onToggle} aria-label={playing ? 'Jeda musik' : 'Putar musik'} title={playing ? 'Jeda musik' : 'Putar musik'}>
          {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}

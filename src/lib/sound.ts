type SoundName = 'click' | 'card-flick' | 'tick' | 'confirm' | 'shuffle';

interface AudioBufferMap {
  [key: string]: AudioBuffer;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private buffers: AudioBufferMap = {};
  private muted = false;
  private volume = 0.3;
  private loadPromises: Map<string, Promise<AudioBuffer | null>> = new Map();

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async init(): Promise<void> {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }

  private async loadBuffer(name: SoundName): Promise<AudioBuffer | null> {
    if (this.buffers[name]) {
      return this.buffers[name];
    }

    if (this.loadPromises.has(name)) {
      return this.loadPromises.get(name)!;
    }

    const promise = fetch(`/sounds/${name}.mp3`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load sound: ${name}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => this.getAudioContext().decodeAudioData(arrayBuffer))
      .then((buffer) => {
        this.buffers[name] = buffer;
        this.loadPromises.delete(name);
        return buffer;
      })
      .catch(() => {
        this.loadPromises.delete(name);
        return null;
      });

    this.loadPromises.set(name, promise);
    return promise;
  }

  async preloadAll(): Promise<void> {
    await Promise.all(
      (['click', 'card-flick', 'tick', 'confirm'] as SoundName[]).map((name) =>
        this.loadBuffer(name)
      )
    );
  }

  async play(name: SoundName): Promise<void> {
    if (this.muted) return;

    await this.init();

    const buffer = await this.loadBuffer(name);
    if (!buffer) return;

    const ctx = this.getAudioContext();
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();

    source.buffer = buffer;
    gainNode.gain.value = this.volume;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(0);
  }

  stopAll(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const soundManager = new SoundManager();

export function playSound(name: SoundName): void {
  soundManager.play(name).catch(() => {});
}

export function setMuted(muted: boolean): void {
  soundManager.setMuted(muted);
}

export function setVolume(volume: number): void {
  soundManager.setVolume(volume);
}

export function isMuted(): boolean {
  return soundManager.isMuted();
}

export function preloadSounds(): void {
  soundManager.preloadAll().catch(() => {});
}
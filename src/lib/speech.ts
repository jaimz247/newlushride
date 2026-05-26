export const LAGOS_LOCATIONS: Record<string, string> = {
  'eco hotel': 'Eko Hotel',
  'eko hotel': 'Eko Hotel',
  'murtala muhammad': 'Murtala Muhammed Airport',
  'murtala mohammed': 'Murtala Muhammed Airport',
  'muritala': 'Murtala',
  'mm2': 'MMA2',
  'vi': 'Victoria Island',
  'victoria highland': 'Victoria Island',
  'victoria island': 'Victoria Island',
  'lekki phase one': 'Lekki Phase 1',
  'lekki phase 1': 'Lekki Phase 1',
  'ikeja gra': 'Ikeja GRA',
  'banana highland': 'Banana Island',
  'banana island': 'Banana Island',
  'ajao state': 'Ajao Estate',
  'festac': 'Festac Town',
  'surulere': 'Surulere',
  'yaba': 'Yaba',
  'maryland': 'Maryland',
  'ikoyi': 'Ikoyi',
  'oniru': 'Oniru',
  'victoria garden city': 'VGC',
};

export class SpeechRecognitionManager {
  private recognition: any = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  public isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        // Dialect refinement to Nigerian English
        this.recognition.lang = 'en-NG'; 
        this.recognition.interimResults = true;
        this.recognition.continuous = false;
      }
    }
  }

  public async start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (errorType: string) => void,
    onEnd: () => void,
    onAudioData: (data: Uint8Array) => void
  ) {
    if (!this.isSupported) {
      onError('enhanced_voice_not_supported');
      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true
        } 
      });
      
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      source.connect(this.analyser);
      
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      
      const updateWaveform = () => {
        if (!this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);
        onAudioData(new Uint8Array(dataArray));
        this.animationFrameId = requestAnimationFrame(updateWaveform);
      };
      
      updateWaveform();
    } catch (err) {
      console.warn("Microphone access for visualization denied or failed:", err);
      // Can still proceed with SpeechRecognition, it will ask for permissions again if needed internally,
      // but visualization will be disabled.
    }

    this.recognition.onstart = () => {};
    
    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      const isFinal = finalTranscript.length > 0;
      let rawTranscript = finalTranscript || interimTranscript;
      
      if (isFinal) {
         rawTranscript = this.applyAutoCorrection(rawTranscript);
      }
      
      if (rawTranscript.trim()) {
        onResult(rawTranscript, isFinal);
      }
    };

    this.recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        onError('permission_denied');
      } else if (event.error !== 'no-speech') {
        onError('recognition_error');
      }
    };

    this.recognition.onend = () => {
      this.cleanup();
      onEnd();
    };
    
    try {
      this.recognition.start();
    } catch (err) {
      console.error("Speech recognition start error:", err);
      onError('start_error');
      this.cleanup();
      onEnd();
    }
  }

  public stop() {
    if (this.recognition) {
       try {
         this.recognition.stop();
       } catch(e) {}
    }
    this.cleanup();
  }

  private cleanup() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private applyAutoCorrection(text: string): string {
    let corrected = text;
    const lower = text.toLowerCase();
    
    for (const [wrong, right] of Object.entries(LAGOS_LOCATIONS)) {
      // Create word-boundary-aware regex to prevent partial matches replacing
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      if (regex.test(lower)) {
        corrected = corrected.replace(regex, right);
      }
    }
    
    // Capitalize first letter of every word for cleaner output
    corrected = corrected.replace(/\b\w/g, c => c.toUpperCase());
    
    // Clean up spaces
    corrected = corrected.replace(/\s+/g, ' ').trim();
    
    // Remove trailing periods from speech to text
    if (corrected.endsWith('.')) {
        corrected = corrected.slice(0, -1);
    }
    
    return corrected;
  }
}

export const speechManager = new SpeechRecognitionManager();

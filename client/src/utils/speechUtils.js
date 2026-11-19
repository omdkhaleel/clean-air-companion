// Web Speech API Helper (Text-to-Speech & Speech-to-Text)

export const speakText = (text, language = 'en', onStart, onEnd) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip Markdown / formatting characters
  const clean = text
    .replace(/[#*_`]/g, '')
    .replace(/\n+/g, '. ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(clean);
  
  if (language === 'hi') {
    utterance.lang = 'hi-IN';
  } else if (language === 'ta') {
    utterance.lang = 'ta-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  utterance.rate = 0.95; // slightly slower for senior clarity

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const createSpeechRecognizer = (language = 'en', onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  if (language === 'hi') {
    recognition.lang = 'hi-IN';
  } else if (language === 'ta') {
    recognition.lang = 'ta-IN';
  } else {
    recognition.lang = 'en-IN';
  }

  recognition.onresult = (event) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};

'use client';
import { useEffect, useState } from 'react';
import './blogPlayer.css'

export default function BlogPlayer({ texto }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const textoParaAudio = async (texto) => {
    const SPEECH_KEY = 'EecUoriGirW1KD2RIJgm9HsSTfyYJmhXnhi8LYjwDcbLWR4jUVUzJQQJ99BFACYeBjFXJ3w3AAAYACOGbkKQ';
    const SPEECH_REGION = 'eastus';
    const url = `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = `
      <speak version='1.0' xml:lang='pt-BR'>
        <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-FranciscaNeural'>
          ${texto}
        </voice>
      </speak>
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': SPEECH_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
      },
      body: ssml
    });

    return await response.blob();
  };

  useEffect(() => {
    const gerarAudio = async () => {
      if (!texto) return;
      setLoading(true);
      try {
        const audioBlob = await textoParaAudio(texto);
        const objectUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(objectUrl);

        const player = document.getElementById('audio-player');
        if (player) player.src = objectUrl;
      } catch (err) {
        console.error('Erro ao gerar áudio:', err);
      }
      setLoading(false);
    };

    gerarAudio();
  }, [texto]);

  return (
<div className="audio-box mb-4 p-3 rounded shadow-sm">
  {loading ? (
    <div className="d-flex align-items-center gap-2 text-muted small">
      <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
      <span>Gerando áudio da notícia...</span>
    </div>
  ) : (
    <div className="audio-player-wrapper">
      <label className="form-label mb-1 text-muted fw-semibold">
        <i className="bi bi-volume-up-fill me-2"></i> Ouça a leitura da notícia:
      </label>
      <audio id="audio-player" controls className="w-100 rounded" />
    </div>
  )}
</div>

  );
}

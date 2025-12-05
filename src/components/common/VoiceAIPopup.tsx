'use client';

import { useEffect, useState } from 'react';

interface VoiceAISettings {
  voice_ai_enabled: boolean;
  voice_ai_script_url: string;
  voice_ai_sandbox_id: string;
  voice_ai_agent_id: string;
}

export function VoiceAIPopup() {
  const [settings, setSettings] = useState<VoiceAISettings | null>(null);

  useEffect(() => {
    // Fetch voice AI settings
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/data/voice-ai');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Error loading voice AI settings:', error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (!settings || !settings.voice_ai_enabled) return;
    if (!settings.voice_ai_script_url || !settings.voice_ai_agent_id) return;

    // Check if script already exists
    const existingScript = document.querySelector(`script[data-lk-agent-id="${settings.voice_ai_agent_id}"]`);
    if (existingScript) return;

    // Create and load script
    const script = document.createElement('script');
    script.src = settings.voice_ai_script_url;
    script.setAttribute('data-lk-sandbox-id', settings.voice_ai_sandbox_id || '');
    script.setAttribute('data-lk-agent-id', settings.voice_ai_agent_id);
    script.async = true;
    document.body.appendChild(script);
  }, [settings]);

  return null;
}


-- Add Voice AI settings fields to profile table
ALTER TABLE profile 
ADD COLUMN IF NOT EXISTS voice_ai_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS voice_ai_script_url TEXT,
ADD COLUMN IF NOT EXISTS voice_ai_sandbox_id TEXT,
ADD COLUMN IF NOT EXISTS voice_ai_agent_id TEXT;

-- Set default values for existing records
UPDATE profile 
SET 
  voice_ai_enabled = COALESCE(voice_ai_enabled, true),
  voice_ai_script_url = COALESCE(voice_ai_script_url, 'http://localhost:3000/embed-popup.js'),
  voice_ai_sandbox_id = COALESCE(voice_ai_sandbox_id, 'http://localhost:3000'),
  voice_ai_agent_id = COALESCE(voice_ai_agent_id, '75fc7d6a-c58b-443d-b41c-8e3d01f499e2')
WHERE voice_ai_enabled IS NULL;


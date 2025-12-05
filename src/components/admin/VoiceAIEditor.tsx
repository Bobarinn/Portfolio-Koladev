'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function VoiceAIEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    voice_ai_enabled: true,
    voice_ai_script_url: 'http://localhost:3000/embed-popup.js',
    voice_ai_sandbox_id: 'http://localhost:3000',
    voice_ai_agent_id: '75fc7d6a-c58b-443d-b41c-8e3d01f499e2',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/voice-ai', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData({
            voice_ai_enabled: data.voice_ai_enabled ?? true,
            voice_ai_script_url: data.voice_ai_script_url || 'http://localhost:3000/embed-popup.js',
            voice_ai_sandbox_id: data.voice_ai_sandbox_id || 'http://localhost:3000',
            voice_ai_agent_id: data.voice_ai_agent_id || '',
          });
        }
      }
    } catch (error) {
      console.error('Error loading voice AI settings:', error);
      toast.error('Failed to load voice AI settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/voice-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Voice AI settings saved successfully');
        // Reload the page to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save voice AI settings');
      }
    } catch (error) {
      console.error('Error saving voice AI settings:', error);
      toast.error('Failed to save voice AI settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice AI Embed Settings</CardTitle>
        <CardDescription>
          Configure the Voice AI popup script that appears on your portfolio. Changes will take effect after saving and refreshing the page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="voice_ai_enabled">Enable Voice AI Popup</Label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="voice_ai_enabled"
              checked={formData.voice_ai_enabled}
              onChange={(e) => setFormData({ ...formData, voice_ai_enabled: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="voice_ai_enabled" className="text-sm text-muted-foreground">
              Show the Voice AI popup on your portfolio
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice_ai_script_url">Script URL</Label>
          <Input
            id="voice_ai_script_url"
            value={formData.voice_ai_script_url}
            onChange={(e) => setFormData({ ...formData, voice_ai_script_url: e.target.value })}
            placeholder="http://localhost:3000/embed-popup.js"
          />
          <p className="text-xs text-muted-foreground">
            The URL where the embed script is hosted
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice_ai_sandbox_id">Sandbox ID</Label>
          <Input
            id="voice_ai_sandbox_id"
            value={formData.voice_ai_sandbox_id}
            onChange={(e) => setFormData({ ...formData, voice_ai_sandbox_id: e.target.value })}
            placeholder="http://localhost:3000"
          />
          <p className="text-xs text-muted-foreground">
            The sandbox/environment URL for the Voice AI service
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice_ai_agent_id">Agent ID</Label>
          <Input
            id="voice_ai_agent_id"
            value={formData.voice_ai_agent_id}
            onChange={(e) => setFormData({ ...formData, voice_ai_agent_id: e.target.value })}
            placeholder="75fc7d6a-c58b-443d-b41c-8e3d01f499e2"
          />
          <p className="text-xs text-muted-foreground">
            The unique identifier for your Voice AI agent
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}


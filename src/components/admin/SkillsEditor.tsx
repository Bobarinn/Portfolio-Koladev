'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Skill {
  id?: string;
  name: string;
  category: 'no-code' | 'code' | 'ai';
  proficiency?: number;
  icon?: string;
  display_order?: number;
}

export function SkillsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    name: '',
    category: 'code',
    proficiency: 5,
    icon: '',
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data.data || data);
      } else {
        toast.error('Failed to load skills');
      }
    } catch (error) {
      console.error('Error loading skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = sessionStorage.getItem('admin_token');
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        id: editingId || undefined,
      };

      const response = await fetch('/api/admin/skills', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingId ? 'Skill updated successfully' : 'Skill created successfully');
        setEditingId(null);
        setFormData({
          name: '',
          category: 'code',
          proficiency: 5,
          icon: '',
        });
        loadSkills();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Skill deleted successfully');
        loadSkills();
      } else {
        toast.error('Failed to delete skill');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id || null);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'code',
      proficiency: skill.proficiency || 5,
      icon: skill.icon || '',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
          <CardDescription>
            {editingId ? 'Update skill information' : 'Create a new skill entry'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: 'no-code' | 'code' | 'ai') =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-code">No-Code</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency (1-10)</Label>
              <Input
                id="proficiency"
                type="number"
                min="1"
                max="10"
                value={formData.proficiency}
                onChange={(e) =>
                  setFormData({ ...formData, proficiency: parseInt(e.target.value) || 5 })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="icon-name"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingId ? 'Update Skill' : 'Create Skill'
              )}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: '',
                    category: 'code',
                    proficiency: 5,
                    icon: '',
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['no-code', 'code', 'ai'] as const).map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize">{category.replace('-', ' ')}</CardTitle>
              <CardDescription>
                {skillsByCategory[category]?.length || 0} skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {skillsByCategory[category]?.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Proficiency: {skill.proficiency}/10
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => skill.id && handleDelete(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {(!skillsByCategory[category] || skillsByCategory[category].length === 0) && (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    No skills yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}







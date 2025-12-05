'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface Experience {
  id?: string;
  company: string;
  role: string;
  title?: string;
  location?: string;
  period?: string;
  duration?: string;
  description?: string;
  impact?: string;
  achievements?: string[];
  images?: string[];
  display_order?: number;
}

export function ExperienceEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    company: '',
    role: '',
    location: '',
    period: '',
    description: '',
    achievements: [],
    images: [],
  });
  const [achievementInput, setAchievementInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/experience', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        toast.error('Failed to load experiences');
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
      toast.error('Failed to load experiences');
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

      const response = await fetch('/api/admin/experience', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingId ? 'Experience updated successfully' : 'Experience created successfully');
        setEditingId(null);
        setFormData({
          company: '',
          role: '',
          location: '',
          period: '',
          description: '',
          achievements: [],
          images: [],
        });
        loadExperiences();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save experience');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Experience deleted successfully');
        loadExperiences();
      } else {
        toast.error('Failed to delete experience');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const token = sessionStorage.getItem('admin_token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('bucket', 'experience-images');
      formDataUpload.append('path', `experience-${Date.now()}-${file.name}`);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...formData,
          images: [...(formData.images || []), data.url],
        });
        toast.success('Image uploaded successfully');
        return data.url;
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload image');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageInput = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageInput.trim()],
      });
      setImageInput('');
      toast.success('Image URL added');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || [],
    });
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id || null);
    setFormData({
      company: exp.company || '',
      role: exp.role || exp.title || '',
      location: exp.location || '',
      period: exp.period || exp.duration || '',
      description: exp.description || '',
      achievements: exp.achievements || [],
      images: exp.images || [],
    });
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter((_, i) => i !== index) || [],
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Experience' : 'Add New Experience'}</CardTitle>
          <CardDescription>
            {editingId ? 'Update experience information' : 'Create a new experience entry'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="Jan 2022 – Dec 2022"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <div className="flex gap-2">
              <Input
                id="images"
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleImageInput();
                  }
                }}
                placeholder="Add image URL and press Enter"
              />
              <Button type="button" onClick={handleImageInput} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                />
                <Button type="button" size="icon" disabled={uploading} asChild>
                  <span>
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </span>
                </Button>
              </label>
            </div>
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements</Label>
            <div className="flex gap-2">
              <Input
                id="achievements"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAchievement();
                  }
                }}
                placeholder="Add an achievement and press Enter"
              />
              <Button type="button" onClick={addAchievement} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.achievements?.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{achievement}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
                editingId ? 'Update Experience' : 'Create Experience'
              )}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    company: '',
                    role: '',
                    location: '',
                    period: '',
                    description: '',
                    achievements: [],
                    images: [],
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experiences ({experiences.length})</CardTitle>
          <CardDescription>Manage your work experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{exp.role} at {exp.company}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                  {exp.description && (
                    <p className="text-sm mt-2 line-clamp-2">{exp.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(exp)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => exp.id && handleDelete(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No experiences yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


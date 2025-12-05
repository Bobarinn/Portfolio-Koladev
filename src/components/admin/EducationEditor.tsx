'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface Education {
  id?: string;
  institution: string;
  school?: string;
  degree: string;
  location?: string;
  period?: string;
  year?: string;
  gpa?: string;
  relevant_coursework?: string[];
  images?: string[];
}

export function EducationEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    location: '',
    period: '',
    gpa: '',
    relevant_coursework: [],
    images: [],
  });
  const [courseworkInput, setCourseworkInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/education', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      } else {
        toast.error('Failed to load education');
      }
    } catch (error) {
      console.error('Error loading education:', error);
      toast.error('Failed to load education');
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

      const response = await fetch('/api/admin/education', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingId ? 'Education updated successfully' : 'Education created successfully');
        setEditingId(null);
        setFormData({
          institution: '',
          degree: '',
          location: '',
          period: '',
          gpa: '',
          relevant_coursework: [],
          images: [],
        });
        loadEducations();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save education');
      }
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/education?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Education deleted successfully');
        loadEducations();
      } else {
        toast.error('Failed to delete education');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const token = sessionStorage.getItem('admin_token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('bucket', 'education-images');
      formDataUpload.append('path', `education-${Date.now()}-${file.name}`);

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

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id || null);
    setFormData({
      institution: edu.institution || edu.school || '',
      degree: edu.degree || '',
      location: edu.location || '',
      period: edu.period || edu.year || '',
      gpa: edu.gpa || '',
      relevant_coursework: edu.relevant_coursework || [],
      images: edu.images || [],
    });
  };

  const addCoursework = () => {
    if (courseworkInput.trim()) {
      setFormData({
        ...formData,
        relevant_coursework: [...(formData.relevant_coursework || []), courseworkInput.trim()],
      });
      setCourseworkInput('');
    }
  };

  const removeCoursework = (index: number) => {
    setFormData({
      ...formData,
      relevant_coursework: formData.relevant_coursework?.filter((_, i) => i !== index) || [],
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
          <CardTitle>{editingId ? 'Edit Education' : 'Add New Education'}</CardTitle>
          <CardDescription>
            {editingId ? 'Update education information' : 'Create a new education entry'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">Degree *</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
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
                placeholder="Aug 2016 – Dec 2021"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="3.3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coursework">Relevant Coursework</Label>
            <div className="flex gap-2">
              <Input
                id="coursework"
                value={courseworkInput}
                onChange={(e) => setCourseworkInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCoursework();
                  }
                }}
                placeholder="Add coursework and press Enter"
              />
              <Button type="button" onClick={addCoursework} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.relevant_coursework?.map((course, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{course}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCoursework(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
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

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingId ? 'Update Education' : 'Create Education'
              )}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    institution: '',
                    degree: '',
                    location: '',
                    period: '',
                    gpa: '',
                    relevant_coursework: [],
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
          <CardTitle>Education ({educations.length})</CardTitle>
          <CardDescription>Manage your education entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(edu)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => edu.id && handleDelete(edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {educations.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No education entries yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


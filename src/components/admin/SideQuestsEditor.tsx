'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface SideQuest {
  id?: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  tags: string[];
  demo_url?: string;
  repo_url?: string;
  display_order?: number;
}

export function SideQuestsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sidequests, setSidequests] = useState<SideQuest[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SideQuest>({
    title: '',
    description: '',
    images: [],
    tags: [],
    demo_url: '',
    repo_url: '',
  });
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    loadSidequests();
  }, []);

  const loadSidequests = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/sidequests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSidequests(data);
      } else {
        toast.error('Failed to load sidequests');
      }
    } catch (error) {
      console.error('Error loading sidequests:', error);
      toast.error('Failed to load sidequests');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const token = sessionStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'sidequest-images');
      formData.append('path', `sidequest-${Date.now()}-${file.name}`);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), data.url],
          image: prev.image || data.url || '', // Set as primary image if none exists
        }));
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
        image: formData.image || imageInput.trim(),
      });
      setImageInput('');
      toast.success('Image URL added');
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      images: newImages,
      image: newImages.length > 0 ? newImages[0] : undefined,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = sessionStorage.getItem('admin_token');
      const url = editingId ? '/api/admin/sidequests' : '/api/admin/sidequests';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        id: editingId || undefined,
        // Set primary image from images array if not set
        image: formData.image || (formData.images && formData.images.length > 0 ? formData.images[0] : null),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingId ? 'Sidequest updated successfully' : 'Sidequest created successfully');
        setEditingId(null);
        setFormData({
          title: '',
          description: '',
          images: [],
          tags: [],
          demo_url: '',
          repo_url: '',
        });
        loadSidequests();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save sidequest');
      }
    } catch (error) {
      console.error('Error saving sidequest:', error);
      toast.error('Failed to save sidequest');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sidequest?')) return;

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/sidequests?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Sidequest deleted successfully');
        loadSidequests();
      } else {
        toast.error('Failed to delete sidequest');
      }
    } catch (error) {
      console.error('Error deleting sidequest:', error);
      toast.error('Failed to delete sidequest');
    }
  };

  const handleEdit = (sidequest: SideQuest) => {
    setEditingId(sidequest.id || null);
    setFormData({
      title: sidequest.title || '',
      description: sidequest.description || '',
      image: sidequest.image,
      images: sidequest.images || (sidequest.image ? [sidequest.image] : []),
      tags: sidequest.tags || [],
      demo_url: sidequest.demo_url || '',
      repo_url: sidequest.repo_url || '',
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
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
          <CardTitle>{editingId ? 'Edit Sidequest' : 'Add New Sidequest'}</CardTitle>
          <CardDescription>
            {editingId ? 'Update sidequest information' : 'Create a new sidequest entry'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                type="url"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repo_url">Repository URL</Label>
              <Input
                id="repo_url"
                type="url"
                value={formData.repo_url}
                onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
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
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
              />
              <Button type="button" onClick={addTag} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
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
                editingId ? 'Update Sidequest' : 'Create Sidequest'
              )}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: '',
                    description: '',
                    images: [],
                    tags: [],
                    demo_url: '',
                    repo_url: '',
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
          <CardTitle>Sidequests ({sidequests.length})</CardTitle>
          <CardDescription>Manage your sidequests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sidequests.map((sidequest) => (
              <div
                key={sidequest.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{sidequest.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {sidequest.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sidequest.tags?.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(sidequest)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => sidequest.id && handleDelete(sidequest.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {sidequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No sidequests yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


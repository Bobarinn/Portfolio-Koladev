'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FontTestPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4">
      <Button 
        onClick={() => router.back()}
        className="mb-8"
        variant="outline"
      >
        Back
      </Button>

      <h1 className="text-4xl font-bold mb-8">Font Test Page - Space Grotesk</h1>
      
      <div className="grid gap-8">
        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-2xl mb-4 font-bold">Font Verification</h2>
          <p className="text-lg mb-4">
            The following characters should look distinctive in Space Grotesk:
          </p>
          <p className="text-3xl mb-4">
            Qa 1234567890 Gg
          </p>
          <p className="text-base mb-4">
            Look for: lowercase &apos;a&apos; with single-story design, distinctive &apos;Q&apos; tail, and the specific shape of &apos;g&apos;.
          </p>
          <div className="flex items-center justify-between gap-4 p-4 bg-glow-blue/10 rounded-lg">
            <span className="text-xl">Space Grotesk</span>
            <span className="text-xl font-sans">a g Q 0 1 2</span>
            <span className="text-xl" style={{ fontFamily: 'system-ui, sans-serif' }}>a g Q 0 1 2</span>
          </div>
        </div>
        
        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-2xl mb-4 font-bold">Regular Text (Space Grotesk)</h2>
          <p className="text-lg mb-4">
            This is regular text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg mb-4 font-light">
            This is light text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg mb-4 font-normal">
            This is normal text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg mb-4 font-medium">
            This is medium text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg mb-4 font-semibold">
            This is semibold text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg font-bold">
            This is bold text in Space Grotesk. The quick brown fox jumps over the lazy dog.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-2xl mb-4 font-bold">Headings (Space Grotesk)</h2>
          <h1 className="text-5xl mb-4 font-bold">Heading 1</h1>
          <h2 className="text-4xl mb-4 font-bold">Heading 2</h2>
          <h3 className="text-3xl mb-4 font-bold">Heading 3</h3>
          <h4 className="text-2xl mb-4 font-bold">Heading 4</h4>
          <h5 className="text-xl mb-4 font-bold">Heading 5</h5>
          <h6 className="text-lg font-bold">Heading 6</h6>
        </div>

        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-2xl mb-4 font-bold">Monospace Text (Fira Code)</h2>
          <p className="font-mono text-lg">
            This is monospace text in Fira Code. The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  );
} 
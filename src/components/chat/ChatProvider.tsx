'use client';

import { ChatAssistant } from './ChatAssistant';
import { useState, useEffect } from 'react';

export const ChatProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ChatAssistant />;
}; 
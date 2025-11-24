import React from 'react';

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  Component: React.ComponentType;
  rawContent: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
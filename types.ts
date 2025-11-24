import React from 'react';

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  content: (string | React.ReactElement)[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
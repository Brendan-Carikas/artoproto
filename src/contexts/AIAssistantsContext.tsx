import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AI_ASSISTANTS_KEY = 'ai_assistants';

interface Assistant {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  isActive?: boolean;
  date: string;
  status: 'Active' | 'Inactive';
  [key: string]: any; // For any additional properties
}

interface AIAssistantsContextType {
  assistants: Assistant[];
  addAssistant: (assistant: Omit<Assistant, 'id' | 'date' | 'status'>) => void;
  updateAssistant: (id: string, updates: Partial<Assistant>) => void;
  deleteAssistant: (id: string) => void;
}

const AIAssistantsContext = createContext<AIAssistantsContextType | null>(null);

interface AIAssistantsProviderProps {
  children: ReactNode;
}

export function useAIAssistants(): AIAssistantsContextType {
  const context = useContext(AIAssistantsContext);
  if (!context) {
    throw new Error('useAIAssistants must be used within an AIAssistantsProvider');
  }
  return context;
}

export function AIAssistantsProvider({ children }: AIAssistantsProviderProps): React.ReactElement {
  const [assistants, setAssistants] = useState<Assistant[]>(() => {
    const saved = localStorage.getItem(AI_ASSISTANTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addAssistant = (assistant: Omit<Assistant, 'id' | 'date' | 'status'>): void => {
    const newAssistant: Assistant = {
      ...assistant,
      name: assistant.name || 'Unnamed Assistant', // Ensure name property exists
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: assistant.isActive ? 'Active' : 'Inactive'
    };
    setAssistants(prev => [...prev, newAssistant]);
  };

  const updateAssistant = (id: string, updates: Partial<Assistant>): void => {
    setAssistants(prev => prev.map(assistant => 
      assistant.id === id ? { ...assistant, ...updates } : assistant
    ));
  };

  const deleteAssistant = (id: string): void => {
    setAssistants(prev => prev.filter(assistant => assistant.id !== id));
  };

  useEffect(() => {
    localStorage.setItem(AI_ASSISTANTS_KEY, JSON.stringify(assistants));
  }, [assistants]);

  return (
    <AIAssistantsContext.Provider value={{ assistants, addAssistant, updateAssistant, deleteAssistant }}>
      {children}
    </AIAssistantsContext.Provider>
  );
}

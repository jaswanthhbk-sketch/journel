import React, { useState } from 'react';
import Navigation from './components/Navigation';
import JournalSection from './components/journal/JournalSection';
import TasksSection from './components/tasks/TasksSection';
import Dashboard from './components/Dashboard';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'excited' | 'stressed';
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: User[];
  createdBy: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: TaskComment[];
};

export type TaskComment = {
  id: string;
  content: string;
  author: User;
  createdAt: string;
};

function App() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'journal' | 'tasks'>('dashboard');
  
  // Mock current user
  const currentUser: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  };

  // Mock team members
  const teamMembers: User[] = [
    currentUser,
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '3',
      name: 'Mike Torres',
      email: 'mike@example.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        currentUser={currentUser}
      />
      
      <main className="pt-16">
        {activeSection === 'dashboard' && (
          <Dashboard 
            currentUser={currentUser}
            teamMembers={teamMembers}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === 'journal' && (
          <JournalSection currentUser={currentUser} />
        )}
        {activeSection === 'tasks' && (
          <TasksSection 
            currentUser={currentUser}
            teamMembers={teamMembers}
          />
        )}
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { User, JournalEntry } from '../../App';
import JournalList from './JournalList';
import JournalEditor from './JournalEditor';

interface JournalSectionProps {
  currentUser: User;
}

const JournalSection: React.FC<JournalSectionProps> = ({ currentUser }) => {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Morning Reflections',
      content: 'Today I want to focus on gratitude and mindfulness. The morning sun streaming through my window reminds me of all the beauty in simple moments.',
      date: '2024-01-15',
      mood: 'happy',
      tags: ['gratitude', 'mindfulness', 'morning'],
      createdAt: '2024-01-15T08:30:00Z',
      updatedAt: '2024-01-15T08:30:00Z'
    },
    {
      id: '2',
      title: 'Project Milestone Reached',
      content: 'Successfully completed the first phase of the project today. The team worked incredibly well together, and I feel proud of what we accomplished.',
      date: '2024-01-14',
      mood: 'excited',
      tags: ['work', 'achievement', 'teamwork'],
      createdAt: '2024-01-14T18:45:00Z',
      updatedAt: '2024-01-14T18:45:00Z'
    },
    {
      id: '3',
      title: 'Challenging Day',
      content: 'Today was tough. Faced several setbacks, but I learned valuable lessons about persistence and problem-solving. Tomorrow is a new opportunity.',
      date: '2024-01-13',
      mood: 'stressed',
      tags: ['challenges', 'learning', 'growth'],
      createdAt: '2024-01-13T20:15:00Z',
      updatedAt: '2024-01-13T20:15:00Z'
    }
  ]);

  const handleNewEntry = () => {
    setSelectedEntry(undefined);
    setView('editor');
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setView('editor');
  };

  const handleSaveEntry = (entry: JournalEntry) => {
    if (selectedEntry) {
      // Update existing entry
      setEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
    } else {
      // Create new entry
      const newEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEntries(prev => [newEntry, ...prev]);
    }
    setView('list');
    setSelectedEntry(undefined);
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(e => e.id !== entryId));
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {view === 'list' ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Journal</h1>
              <p className="text-gray-600">Document your thoughts, experiences, and reflections.</p>
            </div>
            <button
              onClick={handleNewEntry}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </button>
              </div>
            </div>
          </div>

          <JournalList
            entries={filteredEntries}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        </>
      ) : (
        <JournalEditor
          entry={selectedEntry}
          onSave={handleSaveEntry}
          onCancel={() => {
            setView('list');
            setSelectedEntry(undefined);
          }}
        />
      )}
    </div>
  );
};

export default JournalSection;
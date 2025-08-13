import React from 'react';
import { Calendar, Edit, Trash2, Heart, Smile, Meh, Frown, Zap } from 'lucide-react';
import { JournalEntry } from '../../App';

interface JournalListProps {
  entries: JournalEntry[];
  onEditEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onEditEntry, onDeleteEntry }) => {
  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5 text-green-500" />;
      case 'excited': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'neutral': return <Meh className="w-5 h-5 text-gray-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-blue-500" />;
      case 'stressed': return <Heart className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <Calendar className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No journal entries yet</h3>
        <p className="text-gray-600 mb-6">Start documenting your journey by creating your first entry.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              {getMoodIcon(entry.mood)}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {formatDate(entry.date)}
              </span>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditEntry(entry)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
            {entry.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {entry.content}
          </p>

          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{entry.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;
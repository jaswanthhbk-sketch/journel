import React, { useState } from 'react';
import { Calendar, MessageCircle, Edit, Trash2, Send, User } from 'lucide-react';
import { Task, User as UserType } from '../../App';

interface TaskCardProps {
  task: Task;
  currentUser: UserType;
  onEdit: () => void;
  onAddComment: (content: string) => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, currentUser, onEdit, onAddComment, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
          <span className="text-xs font-medium text-gray-500 uppercase">
            {task.priority}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{task.description}</p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex -space-x-2">
          {task.assignedTo.slice(0, 3).map((user, index) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
              title={user.name}
            />
          ))}
          {task.assignedTo.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                +{task.assignedTo.length - 3}
              </span>
            </div>
          )}
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          <span>{task.comments.length} comments</span>
        </button>
        
        <span className="text-xs text-gray-400">
          {formatDateTime(task.updatedAt)}
        </span>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-3 mb-3">
            {task.comments.map(comment => (
              <div key={comment.id} className="flex space-x-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-900 mb-1">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-700">{comment.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    {formatDateTime(comment.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex space-x-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
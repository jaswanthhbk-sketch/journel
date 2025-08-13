import React, { useState } from 'react';
import { Plus, Users, Filter, Search } from 'lucide-react';
import { User, Task, TaskComment } from '../../App';
import TaskBoard from './TaskBoard';
import TaskModal from './TaskModal';

interface TasksSectionProps {
  currentUser: User;
  teamMembers: User[];
}

const TasksSection: React.FC<TasksSectionProps> = ({ currentUser, teamMembers }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design System Review',
      description: 'Review and update the design system components with latest brand guidelines.',
      status: 'in-progress',
      priority: 'high',
      assignedTo: [teamMembers[1]], // Sarah Chen
      createdBy: currentUser,
      dueDate: '2024-01-20',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      comments: [
        {
          id: '1',
          content: 'Started working on the color palette updates.',
          author: teamMembers[1],
          createdAt: '2024-01-15T14:30:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'Client Presentation Prep',
      description: 'Prepare presentation materials for the upcoming client meeting.',
      status: 'todo',
      priority: 'urgent',
      assignedTo: [currentUser, teamMembers[2]],
      createdBy: teamMembers[1],
      dueDate: '2024-01-18',
      createdAt: '2024-01-12T09:15:00Z',
      updatedAt: '2024-01-12T09:15:00Z',
      comments: []
    },
    {
      id: '3',
      title: 'Code Review - User Authentication',
      description: 'Review the new authentication system implementation.',
      status: 'review',
      priority: 'medium',
      assignedTo: [teamMembers[2]], // Mike Torres
      createdBy: teamMembers[3],
      dueDate: '2024-01-22',
      createdAt: '2024-01-13T16:45:00Z',
      updatedAt: '2024-01-16T11:20:00Z',
      comments: [
        {
          id: '2',
          content: 'Found a few security improvements we can make.',
          author: teamMembers[2],
          createdAt: '2024-01-16T11:20:00Z'
        }
      ]
    },
    {
      id: '4',
      title: 'Database Migration',
      description: 'Migrate user data to the new database schema.',
      status: 'completed',
      priority: 'high',
      assignedTo: [teamMembers[3]], // Emma Wilson
      createdBy: currentUser,
      dueDate: '2024-01-15',
      createdAt: '2024-01-08T08:00:00Z',
      updatedAt: '2024-01-15T17:00:00Z',
      comments: [
        {
          id: '3',
          content: 'Migration completed successfully. All tests passed.',
          author: teamMembers[3],
          createdAt: '2024-01-15T17:00:00Z'
        }
      ]
    }
  ]);

  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    if (selectedTask) {
      // Update existing task
      const updatedTask: Task = {
        ...selectedTask,
        ...taskData,
        updatedAt: new Date().toISOString()
      };
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? updatedTask : t));
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: []
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setShowTaskModal(false);
    setSelectedTask(undefined);
  };

  const handleUpdateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleAddComment = (taskId: string, content: string) => {
    const newComment: TaskComment = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, comments: [...task.comments, newComment], updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Collaborative Tasks</h1>
          <p className="text-gray-600">Manage and track tasks with your team.</p>
        </div>
        <button
          onClick={handleCreateTask}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-4 h-4" />
              <span>Team</span>
            </button>
          </div>
        </div>
      </div>

      <TaskBoard
        tasks={filteredTasks}
        currentUser={currentUser}
        onEditTask={handleEditTask}
        onUpdateTaskStatus={handleUpdateTaskStatus}
        onAddComment={handleAddComment}
        onDeleteTask={handleDeleteTask}
      />

      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          currentUser={currentUser}
          teamMembers={teamMembers}
          onSave={handleSaveTask}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(undefined);
          }}
        />
      )}
    </div>
  );
};

export default TasksSection;
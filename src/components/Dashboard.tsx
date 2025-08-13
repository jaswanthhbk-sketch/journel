import React from 'react';
import { BookOpen, CheckSquare, Users, TrendingUp, Calendar, Clock } from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  currentUser: User;
  teamMembers: User[];
  setActiveSection: (section: 'dashboard' | 'journal' | 'tasks') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, teamMembers, setActiveSection }) => {
  const stats = [
    { label: 'Journal Entries', value: '24', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Tasks Completed', value: '18', icon: CheckSquare, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Team Members', value: teamMembers.length.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Productivity', value: '85%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  const recentJournals = [
    { id: '1', title: 'Morning Reflections', date: '2024-01-15', preview: 'Today I want to focus on gratitude and mindfulness...' },
    { id: '2', title: 'Project Milestone', date: '2024-01-14', preview: 'Completed the first phase of the project successfully...' },
    { id: '3', title: 'Team Meeting Notes', date: '2024-01-13', preview: 'Great discussion about upcoming features and roadmap...' },
  ];

  const upcomingTasks = [
    { id: '1', title: 'Design System Review', dueDate: '2024-01-16', priority: 'high', assignee: 'Sarah Chen' },
    { id: '2', title: 'Client Presentation', dueDate: '2024-01-17', priority: 'urgent', assignee: 'Alex Johnson' },
    { id: '3', title: 'Code Review', dueDate: '2024-01-18', priority: 'medium', assignee: 'Mike Torres' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your journey and tasks today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Journal Entries */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Journal Entries</h2>
            <button
              onClick={() => setActiveSection('journal')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentJournals.map((journal) => (
              <div key={journal.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{journal.title}</h3>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {journal.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{journal.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <button
              onClick={() => setActiveSection('tasks')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{task.assignee}</span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {task.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
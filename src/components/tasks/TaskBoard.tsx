import React from 'react';
import { Task, User } from '../../App';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  currentUser: User;
  onEditTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
  onAddComment: (taskId: string, content: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  currentUser,
  onEditTask,
  onUpdateTaskStatus,
  onAddComment,
  onDeleteTask
}) => {
  const columns: { id: Task['status']; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 border-gray-300' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 border-blue-300' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100 border-green-300' },
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onUpdateTaskStatus(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(column => (
        <div
          key={column.id}
          className={`rounded-xl border-2 border-dashed p-4 min-h-[500px] ${column.color}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="bg-white/60 text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
              {getTasksByStatus(column.id).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {getTasksByStatus(column.id).map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="cursor-move"
              >
                <TaskCard
                  task={task}
                  currentUser={currentUser}
                  onEdit={() => onEditTask(task)}
                  onAddComment={(content) => onAddComment(task.id, content)}
                  onDelete={() => onDeleteTask(task.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
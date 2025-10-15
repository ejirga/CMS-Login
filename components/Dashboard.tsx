import React, { useState, useEffect, useMemo } from 'react';
import { UserIcon, CogIcon, ChartBarIcon, ClipboardListIcon } from './icons/DashboardIcons';
import { Task } from '../types';
import { PendingTaskIcon, CompletedTaskIcon } from './icons/TaskIcons';


interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

const mockTasks: Task[] = [
    { id: 1, title: 'Complete Project Proposal', status: 'pending' },
    { id: 2, title: 'Review Q2 Financials', status: 'pending' },
    { id: 3, title: 'Submit Expense Report', status: 'completed' },
    { id: 4, title: 'Onboarding new team member', status: 'pending' },
    { id: 5, title: 'Schedule team-building event', status: 'pending' },
];

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate fetching tasks for the user
    setTasks(mockTasks);
  }, []);

  const handleToggleTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };
  
  const taskProgress = useMemo(() => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  }, [tasks]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full animate-fade-in">
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
            <p className="text-gray-500">Here's your dashboard overview.</p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </header>
      
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Widget 1: Profile */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
               <UserIcon />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">My Profile</h3>
                <p className="text-sm text-gray-500">View and edit your details.</p>
              </div>
            </div>
          </div>
          
          {/* Widget 2: Settings */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
                <CogIcon />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Settings</h3>
                <p className="text-sm text-gray-500">Manage your preferences.</p>
              </div>
            </div>
          </div>

          {/* Widget 3: Analytics */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
                <ChartBarIcon />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Analytics</h3>
                <p className="text-sm text-gray-500">Track your performance.</p>
              </div>
            </div>
          </div>

          {/* Widget 4: My Tasks */}
          <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg shadow-sm">
             <div className="flex items-center space-x-4 mb-4">
                <ClipboardListIcon />
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">My Tasks</h3>
                    <p className="text-sm text-gray-500">Here are your assigned tasks.</p>
                </div>
            </div>
            
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Task Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(taskProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{width: `${taskProgress}%`}}></div>
              </div>
            </div>

            <ul className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                        <span className={`flex-1 ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                           {task.title}
                        </span>
                        <button onClick={() => handleToggleTask(task.id)} className="ml-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1" aria-label={`Mark task ${task.id} as ${task.status === 'completed' ? 'pending' : 'complete'}`}>
                            {task.status === 'completed' ? <CompletedTaskIcon /> : <PendingTaskIcon />}
                        </button>
                    </li>
                ))}
                 {tasks.length === 0 && <p className="text-center text-gray-500 py-4">No tasks assigned yet.</p>}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

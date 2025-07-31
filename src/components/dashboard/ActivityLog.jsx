import React from 'react';
import { Plus, Edit3, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const ActivityLog = () => {
  const logs = [
    {
      id: 1,
      title: 'Item Added',
      description: 'New camera equipment added to inventory',
      tag: 'addition',
      icon: Plus,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      title: 'Booking Approved',
      description: 'Sound system booking approved for Sarah Johnson',
      tag: 'approval',
      icon: CheckCircle,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      timestamp: '25 minutes ago'
    },
    {
      id: 3,
      title: 'Item Edited',
      description: 'Updated pricing for lighting kit',
      tag: 'edit',
      icon: Edit3,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      title: 'Booking Rejected',
      description: 'DJ equipment booking rejected - unavailable dates',
      tag: 'rejection',
      icon: XCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      timestamp: '10 minutes ago'
    }
  ];

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center">
          <span className="hidden sm:inline">View All</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-0">
        {logs.map((log, index) => (
          <div key={log.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors gap-3 ${index < logs.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <div className={`w-10 h-10 ${log.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <log.icon className={`w-5 h-5 ${log.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h4 className="font-medium text-gray-900">{log.title}</h4>
                  <Badge status={log.tag} />
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{log.description}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 self-end sm:self-center whitespace-nowrap">
              {log.timestamp}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityLog;

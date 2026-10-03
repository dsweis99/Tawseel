import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Shield,
  CreditCard,
  UserCheck,
} from 'lucide-react';

export const ActivityLogView: React.FC = () => {
  const { activityLogs, currentGroup, currentUser, t, language } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isSuperOrPlatAdmin = currentUser.role === 'super_admin' || currentUser.role === 'platform_admin';

  // Filter logs
  const visibleLogs = activityLogs.filter((log) => {
    // If not platform-wide admin, only show logs for this group
    if (!isSuperOrPlatAdmin && log.groupId && log.groupId !== currentGroup.id) {
      return false;
    }

    if (filterType !== 'all' && log.type !== filterType) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchDetails = log.details.toLowerCase().includes(q) || (log.detailsAr && log.detailsAr.includes(q));
      const matchAction = log.action.toLowerCase().includes(q) || (log.actionAr && log.actionAr.includes(q));
      const matchUser = log.userName.toLowerCase().includes(q);
      return matchDetails || matchAction || matchUser;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          {t.navActivity}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {language === 'ar'
            ? 'سجل زمني لجميع عمليات الدفع، المراجعات، والتعديلات الإدارية لضمان الشفافية والمساءلة'
            : 'Audit log of all payment decisions, proof submissions, and administrative events.'}
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'payment', label: language === 'ar' ? 'عمليات الدفع' : 'Payments' },
            { id: 'member', label: language === 'ar' ? 'إجراءات الأعضاء' : 'Members' },
            { id: 'system', label: language === 'ar' ? 'النظام' : 'System' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[38px] flex items-center ${
                filterType === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث في سجل النشاط...' : 'Search logs...'}
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {visibleLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            {language === 'ar' ? 'لا توجد سجلات تطابق البحث' : 'No activity logs found.'}
          </div>
        ) : (
          visibleLogs.map((log) => {
            const getIcon = () => {
              if (log.action.includes('Approved')) {
                return <CheckCircle className="w-4 h-4 text-emerald-700" />;
              }
              if (log.action.includes('Rejected')) {
                return <XCircle className="w-4 h-4 text-rose-600" />;
              }
              if (log.action.includes('Uploaded')) {
                return <CreditCard className="w-4 h-4 text-blue-600" />;
              }
              return <Activity className="w-4 h-4 text-purple-600" />;
            };

            const getBg = () => {
              if (log.action.includes('Approved')) return 'bg-emerald-100';
              if (log.action.includes('Rejected')) return 'bg-rose-100';
              if (log.action.includes('Uploaded')) return 'bg-blue-100';
              return 'bg-purple-100';
            };

            return (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 ${getBg()}`}>
                    {getIcon()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {language === 'ar' ? log.actionAr : log.action}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {log.userName} ({log.userRole.replace('_', ' ')})
                      </span>
                      {log.groupName && (
                        <span className="text-[11px] text-slate-400">
                          · {log.groupName}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {language === 'ar' ? log.detailsAr : log.details}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono shrink-0 self-end sm:self-center">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

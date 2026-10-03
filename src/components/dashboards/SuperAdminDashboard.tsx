import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  ShieldAlert,
  ArrowRight,
  Plus,
  Eye,
  Activity,
  Layers,
  Settings,
  X,
  FileCheck,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';
import { DeliveryGroup } from '../../types';

export const SuperAdminDashboard: React.FC = () => {
  const {
    groups,
    members,
    paymentProofs,
    activityLogs,
    users,
    setCurrentGroup,
    setActiveTab,
    addGroup,
    currentUser,
    t,
    language,
    showToast,
  } = useApp();

  const isSuperAdmin = currentUser.role === 'super_admin';
  const isPlatformAdmin = currentUser.role === 'platform_admin';

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupNameAr, setNewGroupNameAr] = useState('');
  const [newCity, setNewCity] = useState('Amman');
  const [newFee, setNewFee] = useState(15);
  const [newContactPhone, setNewContactPhone] = useState('+962 7 9');

  // Aggregated platform metrics
  const totalGroups = groups.length;
  const totalManagers = users.filter((u) => u.role === 'group_manager').length;
  const totalPlatformAdmins = users.filter((u) => u.role === 'platform_admin').length;
  const totalMembers = members.length;
  const registeredMembers = members.filter((m) => m.registrationStatus === 'registered').length;
  const paidMembers = members.filter((m) => m.currentSubscriptionStatus === 'paid').length;
  const pendingReviews = paymentProofs.filter((p) => p.status === 'pending_review').length;
  const unpaidMembers = members.filter((m) => m.currentSubscriptionStatus === 'unpaid').length;

  const totalCollectedPlatform = paidMembers * 15; // across platform estimate

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    addGroup({
      name: newGroupName.trim(),
      nameAr: newGroupNameAr.trim() || newGroupName.trim(),
      city: newCity,
      cityAr: newCity === 'Amman' ? 'عمّان' : newCity === 'Zarqa' ? 'الزرقاء' : 'إربد',
      monthlyFee: Number(newFee),
      contactPhone: newContactPhone.trim(),
    });

    setIsAddGroupOpen(false);
    setNewGroupName('');
    setNewGroupNameAr('');
  };

  const handleSelectGroupToSupport = (group: DeliveryGroup) => {
    setCurrentGroup(group);
    setActiveTab('dashboard');
    showToast(
      language === 'ar'
        ? `تم الانتقال لإدارة مجموعة: ${group.nameAr}`
        : `Switched context to manage group: ${group.name}`,
      'info'
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
              isSuperAdmin ? 'bg-purple-100 dark:bg-purple-900/35 text-purple-800 dark:text-purple-300' : 'bg-blue-100 dark:bg-blue-900/35 text-blue-800 dark:text-blue-300'
            }`}>
              {isSuperAdmin ? t.superAdmin : t.platformAdmin}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 leading-tight">
            {language === 'ar' ? 'لوحة القيادة الإدارية للمنصة' : 'Platform Administration Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'ar'
              ? 'متابعة شاملة لجميع مجموعات التوصيل، المدراء، ونسب التحصيل الشهرية'
              : 'Cross-group supervision of delivery collectives, managers, and subscription settlement.'}
          </p>
        </div>

        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => setIsAddGroupOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs min-h-[44px] flex items-center justify-center gap-2 shadow-2xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>{language === 'ar' ? 'إنشاء مجموعة توصيل جديدة' : 'Create Delivery Group'}</span>
          </button>
        )}
      </div>

      {/* High-Level Operational Metrics (Mobile responsive 2-column grid to 7-column) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
            {language === 'ar' ? 'المجموعات' : 'Total Groups'}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums block mt-1 sm:mt-2">
            {totalGroups}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 block mt-1 truncate">3 Cities</span>
        </div>

        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
            {language === 'ar' ? 'المدراء' : 'Group Managers'}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums block mt-1 sm:mt-2">
            {totalManagers}
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-1 truncate">Synchronized</span>
        </div>

        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
            {t.totalMembers}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums block mt-1 sm:mt-2">
            {totalMembers}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 block mt-1 truncate">
            {registeredMembers} Reg
          </span>
        </div>

        <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/40/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 font-semibold block truncate">
            {t.paidCount}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-100 tabular-nums block mt-1 sm:mt-2">
            {paidMembers}
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block mt-1 truncate">
            {Math.round((paidMembers / (totalMembers || 1)) * 100)}% Settled
          </span>
        </div>

        <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/35/60 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-amber-900 dark:text-amber-200 font-semibold block truncate">
            {t.pendingCount}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-100 tabular-nums block mt-1 sm:mt-2">
            {pendingReviews}
          </span>
          <span className="text-[10px] sm:text-[11px] text-amber-800 dark:text-amber-300 block mt-1 truncate">Review Due</span>
        </div>

        <div className="p-3 sm:p-4 bg-rose-50/60 rounded-2xl border border-rose-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-rose-800 font-semibold block truncate">
            {t.unpaidCount}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-rose-950 tabular-nums block mt-1 sm:mt-2">
            {unpaidMembers}
          </span>
          <span className="text-[10px] sm:text-[11px] text-rose-700 block mt-1 truncate">Overdue</span>
        </div>

        <div className="p-3 sm:p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xs col-span-2 sm:col-span-1 flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium block truncate">
            {language === 'ar' ? 'المحصل' : 'Collected (JOD)'}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white tabular-nums block mt-1 sm:mt-2">
            {totalCollectedPlatform}
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold block mt-1 truncate">October 2026</span>
        </div>
      </div>

      {/* DELIVERY GROUPS DIRECTORY: Direct access to support any group */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {language === 'ar' ? 'مجموعات التوصيل المسجلة بالمنصة' : 'Managed Delivery Groups'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'ar'
                ? 'يمكن لمدير المنصة الدخول لأي مجموعة لمساندة المدراء والاطلاع على سجلاتهم'
                : 'Super Admin and Platform Admin can access any delivery group to assist with administrative support.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-slate-200 dark:divide-slate-800">
          {groups.map((group) => {
            const isMainGroup = group.id === 'group_amman';
            const memberCount = isMainGroup ? 230 : group.totalMembersCount;
            const managerCount = group.managerIds.length;

            return (
              <div key={group.id} className="p-4 sm:p-6 space-y-3 sm:space-y-4 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? group.cityAr : group.city}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">
                      {group.monthlyFee} {group.currency} / {language === 'ar' ? 'شهرياً' : 'mo'}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {language === 'ar' ? group.nameAr : group.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">{t.totalMembers}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{memberCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">{language === 'ar' ? 'المدراء' : 'Managers'}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{managerCount}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectGroupToSupport(group)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 hover:bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{language === 'ar' ? 'دخول لوحة المجموعة' : 'Access Group Dashboard'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SYSTEM ACTIVITY & AUDIT LOG */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {language === 'ar' ? 'سجل العمليات والتدقيق الأمني' : 'System Activity & Audit Log'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ar'
                ? 'توثيق غير قابل للتعديل لجميع قرارات الاعتماد والرفض وتعديل الصلاحيات'
                : 'Immutable audit trail of all approvals, rejections, registrations, and administrative interventions.'}
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                <div className={`p-2 rounded-lg shrink-0 ${
                  log.type === 'payment' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300' :
                  log.type === 'group' ? 'bg-purple-100 dark:bg-purple-900/35 text-purple-800 dark:text-purple-300' :
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                      {language === 'ar' ? log.actionAr : log.action}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded truncate">
                      {log.userName}
                    </span>
                    {log.groupName && (
                      <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        · {log.groupName}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed text-[11px] sm:text-xs">
                    {language === 'ar' ? log.detailsAr : log.details}
                  </p>
                </div>
              </div>

              <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0 self-end sm:self-center">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Delivery Group Modal (Super Admin only) */}
      {isAddGroupOpen && isSuperAdmin && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 text-left rtl:text-right my-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              {language === 'ar' ? 'إنشاء مجموعة توصيل جديدة' : 'Create Delivery Group'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'ar' ? 'إضافة مجموعة جديدة لربط أعضاء الواتساب باشتراك شهري' : 'Register a new delivery community on Wasel'}
            </p>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Group Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Aqaba Port Runners"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  اسم المجموعة (بالعربية) *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupNameAr}
                  onChange={(e) => setNewGroupNameAr(e.target.value)}
                  placeholder="مثال: فرسان العقبة للتوصيل"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    {language === 'ar' ? 'المدينة' : 'City'}
                  </label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 min-h-[44px]"
                  >
                    <option value="Amman">Amman (عمّان)</option>
                    <option value="Zarqa">Zarqa (الزرقاء)</option>
                    <option value="Irbid">Irbid (إربد)</option>
                    <option value="Aqaba">Aqaba (العقبة)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    {language === 'ar' ? 'الاشتراك الشهري' : 'Fee (JOD)'}
                  </label>
                  <input
                    type="number"
                    min="5"
                    step="1"
                    required
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  {language === 'ar' ? 'هاتف مسؤول المجموعة' : 'Primary Manager Phone'}
                </label>
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 min-h-[44px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddGroupOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 text-xs font-semibold min-h-[44px]"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-sm min-h-[44px]"
                >
                  {language === 'ar' ? 'حفظ وإنشاء المجموعة' : 'Save Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

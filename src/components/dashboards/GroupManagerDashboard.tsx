import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  UserX,
  MessageCircle,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Download,
  Eye,
  Check,
  X,
  Phone,
  Send,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';
import { Member, PaymentProof } from '../../types';

export const GroupManagerDashboard: React.FC = () => {
  const {
    t,
    language,
    currentGroup,
    members,
    paymentProofs,
    setSelectedProofForReview,
    setSelectedMemberForProfile,
    setActiveTab,
    showToast,
  } = useApp();

  const [activeAttentionTab, setActiveAttentionTab] = useState<'proofs' | 'unpaid' | 'rejected'>('proofs');

  // Group metrics
  const groupMembers = members.filter((m) => m.groupId === currentGroup.id);
  const totalCount = groupMembers.length; // 230
  const registeredCount = groupMembers.filter((m) => m.registrationStatus === 'registered').length; // 201
  const unregisteredCount = groupMembers.filter((m) => m.registrationStatus === 'not_registered').length; // 29
  
  const paidCount = groupMembers.filter((m) => m.currentSubscriptionStatus === 'paid').length; // 174
  const pendingCount = groupMembers.filter((m) => m.currentSubscriptionStatus === 'pending_review').length; // 17
  const unpaidCount = groupMembers.filter((m) => m.registrationStatus === 'registered' && m.currentSubscriptionStatus === 'unpaid').length; // 10
  const rejectedCount = groupMembers.filter((m) => m.currentSubscriptionStatus === 'rejected').length;

  const collectedAmount = paidCount * currentGroup.monthlyFee;
  const expectedAmount = registeredCount * currentGroup.monthlyFee;
  const collectionRate = registeredCount > 0 ? Math.round((paidCount / registeredCount) * 100) : 0;

  // Filtered pending proofs
  const pendingProofs = paymentProofs.filter(
    (p) => p.groupId === currentGroup.id && p.status === 'pending_review'
  );

  // Filtered unpaid registered members
  const unpaidMembers = groupMembers.filter(
    (m) => m.registrationStatus === 'registered' && m.currentSubscriptionStatus === 'unpaid'
  );

  // Filtered unregistered members
  const unregisteredMembers = groupMembers.filter((m) => m.registrationStatus === 'not_registered');

  // Filtered rejected members
  const rejectedMembers = groupMembers.filter((m) => m.currentSubscriptionStatus === 'rejected');

  const handleSendBulkReminder = () => {
    showToast(
      language === 'ar'
        ? `تم تجهيز إرسال رسائل تذكير واتساب لـ ${unpaidMembers.length} من الأعضاء غير المسددين`
        : `Generated WhatsApp reminder queue for ${unpaidMembers.length} unpaid members`,
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            {language === 'ar' ? currentGroup.nameAr : currentGroup.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.overviewForMonth} · {currentGroup.managerIds.length} {language === 'ar' ? 'مدراء للمجموعة' : 'Synchronized Managers'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('reports')}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px] transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>{t.exportReport}</span>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px] transition-colors shadow-2xs"
          >
            <Users className="w-4 h-4" />
            <span>{language === 'ar' ? 'الأعضاء' : 'Members'}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics: Exception Grid (Mobile friendly 2-col to 6-col) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {/* Total Members */}
        <div
          onClick={() => setActiveTab('members')}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700 cursor-pointer shadow-xs transition-colors flex flex-col justify-between"
        >
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate block">{t.totalMembers}</span>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{totalCount}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-mono">100%</span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">
            {registeredCount} {language === 'ar' ? 'مسجل' : 'reg'}
          </div>
        </div>

        {/* Paid Members */}
        <div
          onClick={() => setActiveTab('members')}
          className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/40/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:border-emerald-700 cursor-pointer shadow-xs transition-colors flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 font-semibold truncate">{t.paidCount}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
          </div>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-100 tabular-nums">{paidCount}</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">{collectionRate}%</span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-800 dark:text-emerald-300 font-medium truncate">
            {collectedAmount} JOD
          </div>
        </div>

        {/* Pending Review */}
        <div
          onClick={() => setActiveAttentionTab('proofs')}
          className={`p-3 sm:p-4 rounded-2xl border cursor-pointer shadow-xs transition-colors flex flex-col justify-between ${
            activeAttentionTab === 'proofs'
              ? 'bg-amber-100 dark:bg-amber-900/35/70 border-amber-400 ring-2 ring-amber-400/20'
              : 'bg-amber-50 dark:bg-amber-950/35/50 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:border-amber-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs text-amber-900 dark:text-amber-200 font-semibold truncate">{t.pendingCount}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          </div>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-100 tabular-nums">{pendingCount}</span>
            <span className="text-[10px] sm:text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
              {language === 'ar' ? 'إجراء' : 'Action'}
            </span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-amber-800 dark:text-amber-300 truncate">
            {language === 'ar' ? 'إيصالات تنتظر' : 'Proofs waiting'}
          </div>
        </div>

        {/* Unpaid Registered Members */}
        <div
          onClick={() => setActiveAttentionTab('unpaid')}
          className={`p-3 sm:p-4 rounded-2xl border cursor-pointer shadow-xs transition-colors flex flex-col justify-between ${
            activeAttentionTab === 'unpaid'
              ? 'bg-rose-100/70 border-rose-400 ring-2 ring-rose-400/20'
              : 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs text-rose-800 font-semibold truncate">{t.unpaidCount}</span>
            <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
          </div>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-rose-950 tabular-nums">{unpaidCount}</span>
            <span className="text-[10px] sm:text-[11px] text-rose-700 font-mono">
              {unpaidCount * currentGroup.monthlyFee} JOD
            </span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-rose-700 truncate">
            {language === 'ar' ? 'تذكير واتساب' : 'Reminders due'}
          </div>
        </div>

        {/* Unregistered Members */}
        <div
          onClick={() => setActiveTab('members')}
          className="p-3 sm:p-4 rounded-2xl border cursor-pointer shadow-xs transition-colors flex flex-col justify-between bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700"
        >
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate block">{t.unregisteredMembers}</span>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 tabular-nums">{unregisteredCount}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              {Math.round((unregisteredCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {language === 'ar' ? 'في الواتساب فقط' : 'In WhatsApp only'}
          </div>
        </div>

        {/* Collection Summary */}
        <div className="p-3 sm:p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium truncate block">{t.collectedAmount}</span>
          <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">{collectedAmount}</span>
            <span className="text-xs text-emerald-400 font-semibold">{currentGroup.currency}</span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">
            {language === 'ar' ? 'المستهدف:' : 'Target:'} {expectedAmount} JOD
          </div>
        </div>
      </div>

      {/* EXCEPTION MANAGEMENT SECTION: "Needs Immediate Attention" */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Section Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {t.needsAttention}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.needsAttentionSubtitle}
              </p>
            </div>

            {/* Sub-Tabs for Exception Queue with responsive touch scrolling */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200 dark:bg-slate-700/70 rounded-xl overflow-x-auto no-scrollbar -mx-1 sm:mx-0">
              <button
                onClick={() => setActiveAttentionTab('proofs')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] flex items-center gap-1.5 shrink-0 ${
                  activeAttentionTab === 'proofs'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white'
                }`}
              >
                <span>{language === 'ar' ? 'إيصالات بانتظار الاعتماد' : 'Pending Proofs'}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/35 text-amber-900 dark:text-amber-200 font-bold text-[10px]">
                  {pendingProofs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveAttentionTab('unpaid')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] flex items-center gap-1.5 shrink-0 ${
                  activeAttentionTab === 'unpaid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white'
                }`}
              >
                <span>{language === 'ar' ? 'لم يسددوا' : 'Unpaid Members'}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold text-[10px]">
                  {unpaidMembers.length}
                </span>
              </button>

              {rejectedMembers.length > 0 && (
                <button
                  onClick={() => setActiveAttentionTab('rejected')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] flex items-center gap-1.5 shrink-0 ${
                    activeAttentionTab === 'rejected'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white'
                  }`}
                >
                  <span>{language === 'ar' ? 'مرفوض' : 'Rejected'}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/35 text-red-900 dark:text-red-200 font-bold text-[10px]">
                    {rejectedMembers.length}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab 1: Pending Payment Proofs Review Queue */}
        {activeAttentionTab === 'proofs' && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pendingProofs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-80" />
                <p className="font-semibold text-slate-800 dark:text-slate-200">{t.noPendingProofs}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {language === 'ar' ? 'كل إيصالات الدفع تم تدقيقها والموافقة عليها' : 'All incoming payment proofs have been verified.'}
                </p>
              </div>
            ) : (
              pendingProofs.slice(0, 8).map((proof) => (
                <div
                  key={proof.id}
                  className="p-3.5 sm:p-5 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 dark:bg-amber-900/35 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                      ⏳
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                          {language === 'ar' && proof.memberNameAr ? proof.memberNameAr : proof.memberName}
                        </h4>
                        <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                          {proof.memberPhone}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{proof.amount} {proof.currency}</span>
                        <span>·</span>
                        <span className="font-mono text-emerald-800 dark:text-emerald-300 font-semibold">{proof.referenceNumber}</span>
                        <span>·</span>
                        <span className="uppercase text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          {proof.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-stretch sm:self-center">
                    <button
                      type="button"
                      onClick={() => setSelectedProofForReview(proof)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تدقيق واعتماد' : 'Review & Approve'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}

            {pendingProofs.length > 8 && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('payments')}
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  {language === 'ar' ? `عرض كافة الإيصالات المتبقية (${pendingProofs.length})` : `View all remaining ${pendingProofs.length} pending proofs →`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Unpaid Members Queue with One-Click WhatsApp Action */}
        {activeAttentionTab === 'unpaid' && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="p-3.5 sm:p-4 bg-rose-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-rose-900 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  {language === 'ar'
                    ? `${unpaidMembers.length} من الأعضاء المسجلين لم يسددوا اشتراك تشرين الأول (15 دينار). تاريخ الاستحقاق: 25 من الشهر.`
                    : `${unpaidMembers.length} registered members have not paid October dues (15 JOD). Due date: 25th of month.`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSendBulkReminder}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 min-h-[44px] shadow-2xs transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'إرسال تذكيرات جماعية' : 'Send WhatsApp Reminders'}</span>
              </button>
            </div>

            {unpaidMembers.map((member) => {
              const reminderText = language === 'ar'
                ? `السلام عليكم أخي ${member.nameAr || member.name}، نود تذكيركم باشتراك شهر تشرين الأول (15 دينار) لمجموعة فرسان عمّان. يرجى التكرم بالتحويل عبر كليك (AMMAN_RUNNERS) ورفع الإشعار. شكراً لتعاونكم!`
                : `Hello ${member.name}, reminder for your October subscription (15 JOD) for Amman Express Runners. CliQ: AMMAN_RUNNERS. Thank you!`;
              const cleanPhone = member.phone.replace(/\D/g, '');
              const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reminderText)}`;

              return (
                <div
                  key={member.id}
                  className="p-3.5 sm:p-5 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                      !
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {language === 'ar' && member.nameAr ? member.nameAr : member.name}
                        </span>
                        <StatusIndicator status="unpaid" size="sm" />
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {member.phone} · {member.monthlyFee} JOD Due
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-stretch sm:self-center">
                    <button
                      type="button"
                      onClick={() => setSelectedMemberForProfile(member)}
                      className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold min-h-[44px] flex items-center justify-center"
                    >
                      {t.viewDetails}
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px] shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.sendWhatsAppReminder}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Rejected Proofs */}
        {activeAttentionTab === 'rejected' && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {rejectedMembers.map((member) => (
              <div
                key={member.id}
                className="p-3.5 sm:p-5 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-100 dark:bg-red-900/35 text-red-800 dark:text-red-300 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                    ×
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        {language === 'ar' && member.nameAr ? member.nameAr : member.name}
                      </span>
                      <StatusIndicator status="rejected" size="sm" />
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {member.phone} · {member.notes}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedMemberForProfile(member)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold min-h-[44px] flex items-center justify-center"
                  >
                    {language === 'ar' ? 'عرض تفاصيل الرفض' : 'View Rejection Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multi-Manager Activity Log for Delivery Group A */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {language === 'ar' ? 'نشاط مدراء المجموعة (تزامن فوري)' : 'Synchronized Manager Activity'}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              {language === 'ar'
                ? 'جميع إجراءات المدراء الـ 6 موثقة وتظهر للجميع لضمان عدم التكرار'
                : 'All actions by the 6 group managers are synchronized and tracked.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('activity')}
            className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline shrink-0"
          >
            {language === 'ar' ? 'السجل الكامل' : 'Full Audit'}
          </button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {[
            {
              manager: 'Omar Al-Khatib (Abu Omar)',
              managerAr: 'عمر الخطيب (أبو عمر)',
              action: 'Approved payment proof for Mahmoud Al-Sayed (15 JOD)',
              actionAr: 'اعتمد إشعار دفع محمود السيد (15 دينار)',
              time: '15m ago',
            },
            {
              manager: 'Rami Al-Masri',
              managerAr: 'رامي المصري',
              action: 'Dispatched subscription reminder to 10 unpaid members',
              actionAr: 'أرسل تذكيرات الاشتراك لـ 10 أعضاء غير مسددين',
              time: '1h ago',
            },
            {
              manager: 'Zeid Hamdan',
              managerAr: 'زيد حمدان',
              action: 'Added new courier phone number from WhatsApp group',
              actionAr: 'أضاف رقم كابتن جديد من محادثة الواتساب',
              time: '3h ago',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[11px] shrink-0">
                  {item.manager.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block truncate">
                    {language === 'ar' ? item.managerAr : item.manager}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 block mt-0.5 truncate">
                    {language === 'ar' ? item.actionAr : item.action}
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

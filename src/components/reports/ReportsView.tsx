import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Printer,
  FileSpreadsheet,
  PieChart,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { currentGroup, members, paymentProofs, t, language, showToast } = useApp();

  const groupMembers = members.filter((m) => m.groupId === currentGroup.id);
  const total = groupMembers.length;
  const registered = groupMembers.filter((m) => m.registrationStatus === 'registered').length;
  const paid = groupMembers.filter((m) => m.currentSubscriptionStatus === 'paid').length;
  const pending = groupMembers.filter((m) => m.currentSubscriptionStatus === 'pending_review').length;
  const unpaid = groupMembers.filter((m) => m.registrationStatus === 'registered' && m.currentSubscriptionStatus === 'unpaid').length;
  const unregistered = groupMembers.filter((m) => m.registrationStatus === 'not_registered').length;

  const collectedJod = paid * currentGroup.monthlyFee;
  const targetJod = registered * currentGroup.monthlyFee;
  const collectionRate = registered > 0 ? Math.round((paid / registered) * 100) : 0;

  // Breakdown by payment channel
  const cliqCount = Math.round(paid * 0.65);
  const zainCashCount = Math.round(paid * 0.22);
  const orangeCount = Math.round(paid * 0.09);
  const cashCount = paid - (cliqCount + zainCashCount + orangeCount);

  const handleDownloadCsv = () => {
    const headers = 'ID,Name,Phone,Registration,October_Status,Monthly_Fee_JOD,Last_Payment\n';
    const rows = groupMembers
      .map(
        (m) =>
          `"${m.id}","${m.name}","${m.phone}","${m.registrationStatus}","${m.currentSubscriptionStatus}",${m.monthlyFee},"${m.lastPaymentDate || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wasel_members_october_2026_${currentGroup.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(language === 'ar' ? 'تم تنزيل ملف CSV بنجاح' : 'Downloaded members CSV report', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
            {t.financialSummary}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ar' ? currentGroup.nameAr : currentGroup.name} · {t.currentBillingCycle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px] transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{t.printReport}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px] transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{t.downloadCsv}</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider block truncate">
            {t.collectedAmount}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums">
              {collectedJod}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-500">JOD</span>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 block truncate">
            {paid} {language === 'ar' ? 'عضو قام بالسداد' : 'members paid'}
          </span>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider block truncate">
            {t.expectedAmount}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
              {targetJod}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-500">JOD</span>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 block truncate">
            {registered} {language === 'ar' ? 'عضو مسجل بالمجموعة' : 'registered couriers'}
          </span>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider block truncate">
            {t.collectionRate}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
              {collectionRate}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${collectionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Grid: Channels vs Membership Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Payment Channel Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {t.paymentMethodBreakdown}
          </h3>

          <div className="space-y-2.5 sm:space-y-3">
            {[
              { label: 'CliQ Instant Transfer (كليك)', count: cliqCount, amount: cliqCount * 15, pct: '65%', color: 'bg-emerald-600' },
              { label: 'Zain Cash (زين كاش)', count: zainCashCount, amount: zainCashCount * 15, pct: '22%', color: 'bg-blue-600' },
              { label: 'Orange Money (أورنج موني)', count: orangeCount, amount: orangeCount * 15, pct: '9%', color: 'bg-amber-600' },
              { label: 'Cash to Manager (نقداً لليد)', count: cashCount, amount: cashCount * 15, pct: '4%', color: 'bg-slate-600' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-semibold gap-2">
                  <span className="text-slate-800 truncate">{item.label}</span>
                  <span className="text-slate-900 font-bold tabular-nums shrink-0">
                    {item.amount} JOD ({item.count})
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className={`${item.color} h-1.5 rounded-full`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Subscription Status Ratios */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {language === 'ar' ? 'توزيع حالات الأعضاء (تشرين الأول 2026)' : 'October 2026 Status Distribution'}
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                <span>{t.statusPaid}</span>
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {paid} {language === 'ar' ? 'عضو' : 'members'} ({Math.round((paid / total) * 100)}%)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span>{t.statusPendingReview}</span>
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {pending} {language === 'ar' ? 'عضو' : 'members'} ({Math.round((pending / total) * 100)}%)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                <span>{t.statusUnpaid}</span>
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {unpaid} {language === 'ar' ? 'عضو' : 'members'} ({Math.round((unpaid / total) * 100)}%)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                <span>{t.statusNotRegistered}</span>
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {unregistered} {language === 'ar' ? 'عضو' : 'members'} ({Math.round((unregistered / total) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

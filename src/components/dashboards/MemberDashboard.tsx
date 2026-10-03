import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  CreditCard,
  Calendar,
  MessageCircle,
  Phone,
  FileCheck,
  Eye,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

export const MemberDashboard: React.FC = () => {
  const {
    currentUser,
    currentGroup,
    members,
    paymentProofs,
    setIsUploadModalOpen,
    setSelectedProofForReview,
    t,
    language,
  } = useApp();

  // Find member record for current user
  const member = members.find((m) => m.id === currentUser.id) || {
    id: currentUser.id,
    name: currentUser.name,
    nameAr: currentUser.nameAr,
    phone: currentUser.phone,
    groupId: currentGroup.id,
    groupName: currentGroup.name,
    registrationStatus: 'registered' as const,
    registrationDate: '2025-08-15',
    currentSubscriptionStatus: 'unpaid' as const,
    currentMonth: '2026-10',
    monthlyFee: currentGroup.monthlyFee,
  };

  // Find recent payment proofs for this member
  const memberProofs = paymentProofs.filter((p) => p.memberId === member.id);
  const activeProof = memberProofs[0];

  const status = member.currentSubscriptionStatus;

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      {/* Welcome Card & WhatsApp Delivery Group Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block">
            {language === 'ar' ? 'مرحباً بك، كابتن' : 'Welcome back, courier'}
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            {language === 'ar' && member.nameAr ? member.nameAr : member.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? currentGroup.nameAr : currentGroup.name} · {member.phone}
          </p>
        </div>

        {currentGroup.whatsappGroupLink && (
          <a
            href={currentGroup.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 transition-colors min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {language === 'ar' ? 'قروب الواتساب' : 'WhatsApp Group'}
            </span>
          </a>
        )}
      </div>

      {/* THE PRIMARY SUBSCRIPTION CARD: Understand status within 3 seconds! (Section 8) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-5 sm:p-8 space-y-5 sm:space-y-6 text-center">
        {/* Title & Billing Period */}
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
            {t.memberMonthlyCardTitle}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {t.currentBillingCycle}
          </h2>
        </div>

        {/* Due Amount & Date (Mobile fluid 2-column) */}
        <div className="py-3 sm:py-4 border-y border-slate-100 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-medium block">{t.amountDue}</span>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="text-2xl sm:text-4xl font-black text-slate-900 tabular-nums">
                {member.monthlyFee}
              </span>
              <span className="text-xs sm:text-base font-bold text-slate-500">JOD</span>
            </div>
          </div>
          <div className="text-center border-l rtl:border-l-0 rtl:border-r border-slate-100 pl-2 rtl:pl-0 rtl:pr-2">
            <span className="text-xs text-slate-500 font-medium block">{t.dueDate}</span>
            <span className="text-sm sm:text-lg font-bold text-slate-800 block mt-1 leading-tight">
              {language === 'ar' ? '25 تشرين الأول 2026' : 'October 25, 2026'}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5 block">
              {language === 'ar' ? 'شهرياً' : 'Monthly'}
            </span>
          </div>
        </div>

        {/* Current Status Indicator using StatusIndicator (Icon + Label + Color) */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            {t.subscriptionStatus}
          </span>
          <StatusIndicator status={status} size="lg" className="shadow-xs" />
        </div>

        {/* Dynamic Contextual Guidance based on Status */}
        {status === 'unpaid' && (
          <div className="p-3.5 sm:p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs text-rose-950 text-left rtl:text-right space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{language === 'ar' ? 'الاشتراك الشهري مستحق' : 'Subscription Due'}</span>
            </div>
            <p className="leading-relaxed">{t.paymentUnpaidNotice}</p>
            <div className="pt-2 border-t border-rose-200/60 font-mono text-xs flex items-center justify-between">
              <span>{t.groupFundCliQ}:</span>
              <span className="font-bold text-slate-900">AMMAN_RUNNERS</span>
            </div>
          </div>
        )}

        {status === 'pending_review' && (
          <div className="p-3.5 sm:p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-950 text-left rtl:text-right space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{language === 'ar' ? 'الإشعار قيد التدقيق' : 'Payment Under Review'}</span>
            </div>
            <p className="leading-relaxed">{t.paymentUnderReviewNotice}</p>
            {activeProof && (
              <div className="pt-2 border-t border-amber-200/60 font-mono text-xs flex items-center justify-between">
                <span className="truncate max-w-[170px]">Ref: {activeProof.referenceNumber}</span>
                <span className="tabular-nums font-semibold">{activeProof.amount} JOD</span>
              </div>
            )}
          </div>
        )}

        {status === 'paid' && (
          <div className="p-3.5 sm:p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-950 text-left rtl:text-right space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'تم اعتماد الاشتراك بنجاح' : 'Payment Approved & Verified'}</span>
            </div>
            <p className="leading-relaxed">{t.paymentApprovedNotice}</p>
          </div>
        )}

        {status === 'rejected' && (
          <div className="p-3.5 sm:p-4 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 text-left rtl:text-right space-y-2">
            <div className="flex items-center gap-2 font-bold text-red-900 text-xs sm:text-sm">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{language === 'ar' ? 'تم رفض إشعار الدفع' : 'Payment Proof Rejected'}</span>
            </div>
            <p className="leading-relaxed">{t.paymentRejectedNotice}</p>
            {activeProof?.rejectionReason && (
              <div className="p-2.5 bg-white rounded-xl border border-red-200 text-red-900 font-medium">
                <span className="font-bold block text-[11px] mb-0.5">
                  {language === 'ar' ? 'السبب الموضح من الإدارة:' : 'Manager Feedback:'}
                </span>
                {activeProof.rejectionReason}
              </div>
            )}
          </div>
        )}

        {/* PRIMARY CTA BUTTON (Large, >= 50px touch target) */}
        <div className="pt-1">
          {status === 'unpaid' && (
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/20 active:scale-[0.99] transition-all min-h-[52px] flex items-center justify-center gap-2.5"
            >
              <Upload className="w-5 h-5 shrink-0" />
              <span>{t.uploadPaymentProof}</span>
            </button>
          )}

          {status === 'pending_review' && (
            <div className="space-y-2">
              <div className="w-full py-4 px-6 rounded-2xl bg-amber-100 text-amber-900 font-bold text-sm sm:text-base min-h-[52px] flex items-center justify-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-700 animate-spin shrink-0" />
                <span>{language === 'ar' ? 'الإشعار قيد مراجعة المدراء' : 'Payment Under Review'}</span>
              </div>
              {activeProof && (
                <button
                  type="button"
                  onClick={() => setSelectedProofForReview(activeProof)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-4 min-h-[36px] inline-flex items-center justify-center"
                >
                  {language === 'ar' ? 'معاينة الإشعار المرفوع' : 'View Submitted Receipt'}
                </button>
              )}
            </div>
          )}

          {status === 'paid' && (
            <div className="space-y-2">
              <div className="w-full py-4 px-6 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-sm sm:text-base min-h-[52px] flex items-center justify-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{language === 'ar' ? 'تم السداد لهذا الشهر ✓' : 'Paid for October ✓'}</span>
              </div>
              {activeProof && (
                <button
                  type="button"
                  onClick={() => setSelectedProofForReview(activeProof)}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline underline-offset-4 min-h-[36px] inline-flex items-center justify-center"
                >
                  {language === 'ar' ? 'معاينة وصل التحويل المعتمد' : 'View Verified Receipt'}
                </button>
              )}
            </div>
          )}

          {status === 'rejected' && (
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-600/20 active:scale-[0.99] transition-all min-h-[52px] flex items-center justify-center gap-2.5"
            >
              <RefreshCw className="w-5 h-5 shrink-0" />
              <span>{t.replacePaymentProof}</span>
            </button>
          )}
        </div>
      </div>

      {/* Payment Proof History Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          {t.navPaymentHistory}
        </h3>

        {memberProofs.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            {language === 'ar' ? 'لا توجد دفعات سابقة مسجلة' : 'No previous payment records found.'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {memberProofs.map((proof) => (
              <div
                key={proof.id}
                className="py-3 flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 block truncate">
                      {proof.subscriptionMonth} · {proof.amount} {proof.currency}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] block mt-0.5 truncate">
                      Ref: {proof.referenceNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <StatusIndicator status={proof.status} size="sm" />
                  <button
                    type="button"
                    onClick={() => setSelectedProofForReview(proof)}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded min-h-[38px] min-w-[38px] flex items-center justify-center"
                    aria-label="View Receipt"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group Support / Contact Manager Help Section */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 block">
            {language === 'ar' ? 'هل تواجه مشكلة في التحويل؟' : 'Need help with payment?'}
          </span>
          <span className="text-slate-500 block mt-0.5">
            {language === 'ar'
              ? 'تواصل مع كابتن أبو عمر (مدير المجموعة) عبر واتساب'
              : 'Contact Omar Al-Khatib (Group Manager) on WhatsApp'}
          </span>
        </div>
        <a
          href="https://wa.me/962791234567"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-mono">+962 7 9123 4567</span>
        </a>
      </div>
    </div>
  );
};

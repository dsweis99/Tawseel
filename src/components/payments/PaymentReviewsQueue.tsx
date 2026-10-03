import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  CheckCircle,
  Eye,
  Search,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

export const PaymentReviewsQueue: React.FC = () => {
  const {
    paymentProofs,
    currentGroup,
    setSelectedProofForReview,
    approvePaymentProof,
    t,
    language,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'pending_review' | 'all' | 'paid' | 'rejected'>('pending_review');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter proofs for this group
  const groupProofs = paymentProofs.filter((p) => p.groupId === currentGroup.id);

  const filteredProofs = groupProofs.filter((proof) => {
    // Status filter
    if (activeFilter !== 'all' && proof.status !== activeFilter) return false;

    // Search query
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      proof.memberName.toLowerCase().includes(q) ||
      (proof.memberNameAr && proof.memberNameAr.includes(q)) ||
      proof.memberPhone.includes(q) ||
      proof.referenceNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          {language === 'ar' ? 'طابور مراجعة وتدقيق إيصالات الدفع' : 'Payment Proof Review Queue'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {language === 'ar'
            ? 'مراجعة وتدقيق تحويلات كليك والمحافظ الإلكترونية لأعضاء المجموعة لشهر تشرين الأول'
            : 'Audit and approve CliQ / e-Wallet transfer proofs submitted by couriers.'}
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto -mx-1 px-1">
          {[
            { id: 'pending_review', label: language === 'ar' ? 'بانتظار المراجعة' : 'Pending Review', count: groupProofs.filter(p => p.status === 'pending_review').length },
            { id: 'paid', label: language === 'ar' ? 'تم الاعتماد' : 'Approved', count: groupProofs.filter(p => p.status === 'paid').length },
            { id: 'rejected', label: language === 'ar' ? 'مرفوض' : 'Rejected', count: groupProofs.filter(p => p.status === 'rejected').length },
            { id: 'all', label: language === 'ar' ? 'كافة السجلات' : 'All Proofs', count: groupProofs.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap min-h-[40px] flex items-center gap-1.5 shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث بالاسم أو رقم المرجع...' : 'Search name or ref...'}
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Proofs Grid / Cards */}
      {filteredProofs.length === 0 ? (
        <div className="p-8 sm:p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          <FileCheck className="w-10 sm:w-12 h-10 sm:h-12 text-emerald-600 mx-auto mb-2 opacity-80" />
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">{t.noPendingProofs}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ar' ? 'لا توجد إيصالات دفع تطابق البحث الحالي.' : 'No payment proofs match your current criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredProofs.map((proof) => (
            <div
              key={proof.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs overflow-hidden flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Header: Member & Status */}
                <div className="p-3.5 sm:p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                      {language === 'ar' && proof.memberNameAr ? proof.memberNameAr : proof.memberName}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5 truncate">{proof.memberPhone}</p>
                  </div>
                  <StatusIndicator status={proof.status} size="sm" />
                </div>

                {/* Receipt Preview Thumbnail */}
                <div
                  onClick={() => setSelectedProofForReview(proof)}
                  className="p-3 bg-slate-100 border-b border-slate-100 flex items-center justify-center cursor-pointer group relative min-h-[160px]"
                >
                  <img
                    src={proof.proofImageUrl}
                    alt="Receipt Thumbnail"
                    referrerPolicy="no-referrer"
                    className="max-h-36 sm:max-h-40 w-auto object-contain rounded shadow-xs group-hover:scale-[1.02] transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 flex items-center justify-center transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 shadow-sm transition-opacity">
                      {language === 'ar' ? 'معاينة بالحجم الكامل' : 'Click to Inspect'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.amountDue}:</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {proof.amount.toFixed(2)} {proof.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.referenceNumber}:</span>
                    <span className="font-mono font-semibold text-emerald-800 truncate max-w-[170px]">
                      {proof.referenceNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.selectPaymentMethod}:</span>
                    <span className="font-semibold uppercase text-slate-700 truncate">
                      {proof.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>{language === 'ar' ? 'تاريخ الرفع:' : 'Uploaded:'}</span>
                    <span className="font-mono">
                      {new Date(proof.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProofForReview(proof)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <Eye className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تدقيق الإشعار' : 'Inspect Proof'}</span>
                </button>

                {proof.status === 'pending_review' && (
                  <button
                    type="button"
                    onClick={() => approvePaymentProof(proof.id)}
                    className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white min-h-[44px] min-w-[44px] flex items-center justify-center shadow-2xs shrink-0"
                    title={t.approvePayment}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

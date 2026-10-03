import React, { useState } from 'react';
import { PaymentProof } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageCircle,
  FileCheck,
  AlertTriangle,
  ZoomIn,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

interface PaymentProofModalProps {
  proof: PaymentProof | null;
  onClose: () => void;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({ proof, onClose }) => {
  const { t, language, approvePaymentProof, rejectPaymentProof, currentUser } = useApp();
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(t.reasonBlurry);
  const [customReason, setCustomReason] = useState('');
  const [managerNotes, setManagerNotes] = useState('');

  if (!proof) return null;

  const isManager = currentUser.role === 'group_manager' || currentUser.role === 'super_admin' || currentUser.role === 'platform_admin';

  const handleApprove = () => {
    approvePaymentProof(proof.id, managerNotes);
    onClose();
  };

  const handleReject = () => {
    const finalReason = customReason.trim()
      ? `${rejectionReason} — ${customReason.trim()}`
      : rejectionReason;
    rejectPaymentProof(proof.id, finalReason);
    onClose();
  };

  const getWhatsappLink = () => {
    const cleanPhone = proof.memberPhone.replace(/\D/g, '');
    const message = language === 'ar'
      ? `مرحباً ${proof.memberNameAr || proof.memberName}، بخصوص إشعار دفع اشتراك شهر أكتوبر لمجموعة التوصيل...`
      : `Hello ${proof.memberName}, regarding your October subscription payment proof for the delivery group...`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left rtl:text-right">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
              <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                {language === 'ar' ? 'مراجعة وتدقيق إشعار الدفع' : 'Payment Proof Verification'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                {proof.groupName} · {proof.subscriptionMonth}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <StatusIndicator status={proof.status} size="sm" />
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Responsive grid (Stacked on mobile, side-by-side on lg) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left / Top: Receipt Image Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {language === 'ar' ? 'صورة إشعار التحويل المرفقة' : 'Submitted Receipt Image'}
            </span>
            <div className="border border-slate-200 rounded-xl bg-slate-100 p-2 flex items-center justify-center min-h-[220px] max-h-[300px] sm:max-h-[380px] lg:max-h-[460px] overflow-hidden shadow-inner relative group">
              <img
                src={proof.proofImageUrl}
                alt="Payment Proof Receipt"
                referrerPolicy="no-referrer"
                className="max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] w-auto object-contain rounded-lg shadow-xs"
              />
            </div>
            <div className="mt-1.5 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ZoomIn className="w-3 h-3" />
              <span>{language === 'ar' ? 'تم الرفع عبر المنصة' : 'Verified digital submission'}</span>
            </div>
          </div>

          {/* Right: Metadata & Recognition over recall */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              {/* Member Card */}
              <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'ar' ? 'بيانات العضو' : 'Member Information'}
                </span>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {language === 'ar' && proof.memberNameAr ? proof.memberNameAr : proof.memberName}
                    </h4>
                    <p className="text-xs text-slate-600 font-mono tracking-tight mt-0.5 truncate">
                      {proof.memberPhone}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${proof.memberPhone.replace(/\s+/g, '')}`}
                      className="p-2 sm:p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                      title="Call Member"
                    >
                      <Phone className="w-4 h-4 text-emerald-700" />
                    </a>
                    <a
                      href={getWhatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                      title="Open WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Transaction Specs */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">{t.amountDue}</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                    {proof.amount.toFixed(2)} {proof.currency}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">{t.selectPaymentMethod}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase truncate block">
                    {proof.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-[11px] text-slate-500 block">{t.referenceNumber}</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-emerald-800 tracking-wider truncate block">
                    {proof.referenceNumber}
                  </span>
                </div>
              </div>

              {/* Upload Timestamp & Member Notes */}
              <div className="text-[11px] sm:text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {language === 'ar' ? 'تاريخ ووقت الرفع:' : 'Uploaded at:'}{' '}
                    {new Date(proof.uploadedAt).toLocaleString()}
                  </span>
                </div>
                {proof.notes && (
                  <div className="p-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 mt-2">
                    <span className="font-semibold block mb-0.5">
                      {language === 'ar' ? 'ملاحظة العضو:' : 'Member Note:'}
                    </span>
                    {proof.notes}
                  </div>
                )}
                {proof.rejectionReason && (
                  <div className="p-3 bg-red-50 text-red-900 rounded-lg border border-red-200 mt-2">
                    <span className="font-semibold block mb-0.5">
                      {language === 'ar' ? 'سبب الرفض الحالي:' : 'Current Rejection Reason:'}
                    </span>
                    {proof.rejectionReason}
                  </div>
                )}
              </div>
            </div>

            {/* Rejection Form Drawer (inside modal when clicking reject) */}
            {isRejecting && (
              <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-200 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-red-800 text-xs sm:text-sm font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{t.rejectionReasonPrompt}</span>
                </div>

                <div className="space-y-1.5">
                  {[
                    t.reasonBlurry,
                    t.reasonWrongAmount,
                    t.reasonMissingRef,
                    t.reasonOldDate,
                    t.reasonOther,
                  ].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer p-1.5 rounded hover:bg-red-100/50"
                    >
                      <input
                        type="radio"
                        name="rejectionReason"
                        checked={rejectionReason === r}
                        onChange={() => setRejectionReason(r)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>

                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder={t.specifyReason}
                  className="w-full text-xs p-2.5 rounded-lg border border-red-300 bg-white text-slate-900 focus:ring-red-500 focus:border-red-500 min-h-[44px]"
                />

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsRejecting(false)}
                    className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 min-h-[44px]"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm min-h-[44px]"
                  >
                    {language === 'ar' ? 'تأكيد الرفض وإشعار العضو' : 'Confirm Rejection'}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons for Managers */}
            {isManager && proof.status === 'pending_review' && !isRejecting && (
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsRejecting(true)}
                  className="flex-1 px-4 py-3 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm min-h-[48px] flex items-center justify-center gap-2 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>{t.rejectPayment}</span>
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm min-h-[48px] flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>{t.approvePayment} (15 JOD)</span>
                </button>
              </div>
            )}

            {/* Already Approved notice */}
            {proof.status === 'paid' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  {language === 'ar'
                    ? `تم اعتماد هذا الإشعار من قِبل ${proof.reviewedByManagerName || 'المدير'}`
                    : `Approved by ${proof.reviewedByManagerName || 'Manager'}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

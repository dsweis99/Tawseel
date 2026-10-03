import React, { useState } from 'react';
import { Member } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  MessageCircle,
  Calendar,
  CreditCard,
  FileCheck,
  Edit2,
  Save,
  Copy,
  Check,
  Bike,
  Car,
  AlertCircle,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

interface MemberProfileModalProps {
  member: Member | null;
  onClose: () => void;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({ member, onClose }) => {
  const {
    t,
    language,
    currentGroup,
    paymentProofs,
    setSelectedProofForReview,
    updateMember,
    currentUser,
    showToast,
  } = useApp();

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(member?.notes || '');
  const [copiedReminder, setCopiedReminder] = useState(false);

  if (!member) return null;

  const isManager = currentUser.role === 'group_manager' || currentUser.role === 'super_admin' || currentUser.role === 'platform_admin';

  // Find proofs for this member
  const memberProofs = paymentProofs.filter((p) => p.memberId === member.id);
  const latestProof = memberProofs[0];

  const handleSaveNotes = () => {
    updateMember(member.id, { notes });
    setIsEditingNotes(false);
    showToast(language === 'ar' ? 'تم حفظ الملاحظات' : 'Notes saved successfully', 'success');
  };

  // Automated WhatsApp Reminder Message for this member
  const reminderText = language === 'ar'
    ? `السلام عليكم أخي ${member.nameAr || member.name}، نود تذكيركم باشتراك شهر تشرين الأول / أكتوبر (${member.monthlyFee} دينار) لمجموعة ${currentGroup.nameAr}. يرجى التكرم بالتحويل عبر كليك (AMMAN_RUNNERS) ورفع صورة الإشعار للمحافظة على عضويتكم. شاكرين تعاونكم الدائم!`
    : `Hello ${member.name}, this is a friendly reminder regarding your October 2026 subscription (${member.monthlyFee} JOD) for ${currentGroup.name}. Please transfer via CliQ (AMMAN_RUNNERS) and upload your payment proof. Thank you!`;

  const cleanPhone = member.phone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reminderText)}`;

  const handleCopyReminder = () => {
    navigator.clipboard?.writeText(reminderText);
    setCopiedReminder(true);
    setTimeout(() => setCopiedReminder(false), 2000);
    showToast(language === 'ar' ? 'تم نسخ نص التذكير' : 'Reminder text copied to clipboard', 'info');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left rtl:text-right">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              {member.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
                {language === 'ar' && member.nameAr ? member.nameAr : member.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono truncate">
                {member.phone} · {member.groupName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">
          {/* Quick Actions (Call / WhatsApp / Copy Reminder) */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            <a
              href={`tel:${member.phone.replace(/\s+/g, '')}`}
              className="flex-1 min-w-[120px] px-3 sm:px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 min-h-[44px] transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{language === 'ar' ? 'اتصال بالعضو' : 'Call Member'}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[130px] px-3 sm:px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 min-h-[44px] transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{language === 'ar' ? 'محادثة واتساب' : 'Open WhatsApp'}</span>
            </a>
            {isManager && member.currentSubscriptionStatus !== 'paid' && (
              <button
                type="button"
                onClick={handleCopyReminder}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center justify-center gap-2 min-h-[44px] transition-colors"
              >
                {copiedReminder ? <Check className="w-4 h-4 text-emerald-700 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                <span>{copiedReminder ? (language === 'ar' ? 'تم النسخ' : 'Copied') : t.copyReminderText}</span>
              </button>
            )}
          </div>

          {/* Status Matrix using StatusIndicator */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                {language === 'ar' ? 'التسجيل' : 'Registration'}
              </span>
              <StatusIndicator status={member.registrationStatus} size="sm" />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                {language === 'ar' ? 'اشتراك تشرين الأول' : 'October Status'}
              </span>
              <StatusIndicator status={member.currentSubscriptionStatus} size="sm" />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                {t.amountDue}
              </span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                {member.monthlyFee} JOD
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                {language === 'ar' ? 'تاريخ الانضمام' : 'Joined Date'}
              </span>
              <span className="text-xs font-mono font-medium text-slate-700 truncate block">
                {member.registrationDate || 'Pending'}
              </span>
            </div>
          </div>

          {/* Vehicle & Identity Details */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {language === 'ar' ? 'بيانات الكابتن والمركبة' : 'Courier & Vehicle Details'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">{language === 'ar' ? 'وسيلة التوصيل' : 'Vehicle Type'}</span>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5 capitalize">
                  {member.vehicleType === 'car' ? <Car className="w-3.5 h-3.5 text-blue-600" /> : <Bike className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{member.vehicleType || 'Motorcycle'}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'ar' ? 'رقم اللوحة' : 'Plate Number'}</span>
                <span className="font-mono font-semibold text-slate-800 block mt-0.5">
                  {member.vehiclePlate || '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'ar' ? 'اسم كليك المسجل' : 'CliQ Alias'}</span>
                <span className="font-mono font-semibold text-slate-800 block mt-0.5">
                  {member.cliqAlias || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Current Payment Proof Banner (if any) */}
          {latestProof && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {language === 'ar' ? 'آخر إشعار دفع مسجل' : 'Latest Payment Proof'} ({latestProof.subscriptionMonth})
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Ref: {latestProof.referenceNumber} · {latestProof.amount} JOD
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProofForReview(latestProof);
                  onClose();
                }}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold min-h-[40px] transition-colors shadow-2xs"
              >
                {t.viewDetails}
              </button>
            </div>
          )}

          {/* Manager Notes Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'ar' ? 'ملاحظات الإدارة والمتابعة' : 'Manager Follow-up Notes'}
              </span>
              {isManager && (
                <button
                  type="button"
                  onClick={() => {
                    if (isEditingNotes) handleSaveNotes();
                    else setIsEditingNotes(true);
                  }}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 min-h-[36px]"
                >
                  {isEditingNotes ? (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>{t.saveChanges}</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تعديل الملاحظات' : 'Edit Notes'}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-slate-900 min-h-[70px]"
                placeholder={language === 'ar' ? 'اكتب ملاحظات للمدراء بخصوص هذا العضو...' : 'Enter internal notes for managers...'}
              />
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic min-h-[50px]">
                {member.notes || (language === 'ar' ? 'لا توجد ملاحظات مسجلة حالياً.' : 'No notes recorded.')}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs min-h-[44px]"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import {
  X,
  Upload,
  CreditCard,
  FileImage,
  Sparkles,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { generateReceiptSvg } from '../../data/mockData';

export const UploadPaymentModal: React.FC = () => {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadPaymentProof,
    currentUser,
    currentGroup,
    t,
    language,
    showToast,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cliq');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [amount, setAmount] = useState<number>(currentGroup.monthlyFee);
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedCliq, setCopiedCliq] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isUploadModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(language === 'ar' ? 'حجم الملف يتجاوز 10 ميغابايت' : 'File exceeds 10MB limit');
      return;
    }

    setSelectedFile(file);
    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUseSimulatedCliqReceipt = () => {
    const randomRef = `CLIQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceNumber(randomRef);
    setPaymentMethod('cliq');
    const svgReceipt = generateReceiptSvg(
      randomRef,
      currentUser.name,
      amount,
      new Date().toISOString().replace('T', ' ').substring(0, 19),
      'cliq'
    );
    setPreviewUrl(svgReceipt);
    setErrorMsg('');
    showToast(
      language === 'ar'
        ? 'تم إنشاء إشعار كليك تجريبي جاهز للاعتماد'
        : 'Generated simulated official CliQ receipt',
      'info'
    );
  };

  const handleCopyCliq = () => {
    navigator.clipboard?.writeText('AMMAN_RUNNERS');
    setCopiedCliq(true);
    setTimeout(() => setCopiedCliq(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!referenceNumber.trim()) {
      setErrorMsg(
        language === 'ar'
          ? 'يرجى إدخال الرقم المرجعي للتحويل (مثال: CLIQ-123456)'
          : 'Please enter the transaction reference number'
      );
      return;
    }

    uploadPaymentProof({
      memberId: currentUser.id,
      amount: Number(amount),
      paymentMethod,
      referenceNumber: referenceNumber.trim(),
      proofImageUrl: previewUrl || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left rtl:text-right">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                {t.uploadModalTitle}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                {language === 'ar' ? currentGroup.nameAr : currentGroup.name} · {t.currentBillingCycle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {/* Group Fund Transfer Info Box */}
          <div className="bg-emerald-50/70 p-3.5 sm:p-4 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>{language === 'ar' ? 'بيانات التحويل لصندوق المجموعة:' : 'Group Fund Transfer Details:'}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-emerald-700 block text-[10px] sm:text-[11px]">{t.groupFundCliQ}:</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">AMMAN_RUNNERS</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCliq}
                className="px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-emerald-800 font-semibold hover:bg-emerald-50 min-h-[38px] flex items-center gap-1 shadow-2xs"
              >
                {copiedCliq ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-xs">{copiedCliq ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
              </button>
            </div>
            <div className="pt-1 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-emerald-700 text-[11px]">{t.groupFundPhone}:</span>
              <span className="font-mono font-semibold text-slate-900 text-xs">+962 7 9123 4567</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.selectPaymentMethod}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'cliq', label: 'CliQ (كليك)', desc: 'Instant bank transfer' },
                { id: 'zain_cash', label: 'Zain Cash', desc: 'زين كاش' },
                { id: 'orange_money', label: 'Orange Money', desc: 'أورنج موني' },
                { id: 'bank_transfer', label: 'Bank Transfer', desc: 'تحويل بنكي' },
                { id: 'cash', label: 'Cash (نقداً)', desc: 'Handed to manager' },
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left rtl:text-right transition-all min-h-[50px] ${
                    paymentMethod === method.id
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block truncate">{method.label}</span>
                  <span className="text-[10px] text-slate-500 block truncate mt-0.5">{method.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount & Reference Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.transferAmount}
              </label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 tabular-nums focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.referenceNumber} *
              </label>
              <input
                type="text"
                required
                placeholder={t.referencePlaceholder}
                value={referenceNumber}
                onChange={(e) => {
                  setReferenceNumber(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 uppercase focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
              />
            </div>
          </div>

          {/* Image Upload Zone & Simulator Option */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.selectProofImage}
              </label>
              <button
                type="button"
                onClick={handleUseSimulatedCliqReceipt}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 underline underline-offset-2 min-h-[36px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{language === 'ar' ? 'توليد وصل كليك تجريبي' : 'Auto-Generate Demo Receipt'}</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-3 sm:p-4 text-center transition-colors bg-slate-50/50">
              {previewUrl ? (
                <div className="space-y-3">
                  <div className="max-h-44 sm:max-h-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 inline-block shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Receipt Preview"
                      referrerPolicy="no-referrer"
                      className="max-h-36 sm:max-h-44 w-auto object-contain mx-auto rounded"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="text-xs text-rose-600 font-semibold hover:underline min-h-[36px]"
                    >
                      {language === 'ar' ? 'إزالة الصورة واختيار أخرى' : 'Remove image and pick another'}
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block p-3 sm:p-4">
                  <FileImage className="w-8 sm:w-10 h-8 sm:h-10 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    {t.dragOrClickToUpload}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 block mt-1">
                    {t.fileRequirements}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {t.optionalNotes}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'ar' ? 'مثال: تم التحويل من حساب أخي محمد' : 'e.g. Transferred from brother’s account'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
            />
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 text-xs font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-end">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm min-h-[44px]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm min-h-[44px] shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 shrink-0" />
              <span>{t.submitProofBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

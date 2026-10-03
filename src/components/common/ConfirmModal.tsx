import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'success';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'primary',
  isLoading = false,
}) => {
  const { t } = useApp();

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      btn: 'bg-rose-600 hover:bg-rose-700 text-white',
      icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
      bgIcon: 'bg-rose-100',
    },
    primary: {
      btn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      icon: <CheckCircle className="w-6 h-6 text-emerald-700" />,
      bgIcon: 'bg-emerald-100',
    },
    success: {
      btn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      icon: <CheckCircle className="w-6 h-6 text-emerald-700" />,
      bgIcon: 'bg-emerald-100',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative text-left rtl:text-right">
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full shrink-0 ${style.bgIcon}`}>
            {style.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 justify-end pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm min-h-[44px] transition-colors"
          >
            {cancelText || t.cancel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
            }}
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm min-h-[44px] flex items-center justify-center gap-2 transition-colors ${style.btn}`}
          >
            {isLoading ? t.processing : (confirmText || t.confirm)}
          </button>
        </div>
      </div>
    </div>
  );
};

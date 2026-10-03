import React from 'react';
import { SubscriptionStatus, RegistrationStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Clock, AlertCircle, XCircle, MinusCircle } from 'lucide-react';

export type AnyStatus = SubscriptionStatus | RegistrationStatus | 'pending' | string;

interface StatusIndicatorProps {
  status: AnyStatus;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'subtle' | 'outline';
  showIcon?: boolean;
  className?: string;
  customLabel?: string;
}

/**
 * StatusIndicator Component
 *
 * Uniformly renders the status (Paid, Pending, Rejected, Unpaid, Expired, Registered, Not Registered)
 * across the entire application.
 *
 * Strictly enforces the Design System Rule:
 * Icon + Label + Accessible Color-Coded Badge
 * (Never communicate status using color alone)
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  variant = 'badge',
  showIcon = true,
  className = '',
  customLabel,
}) => {
  const { t, language } = useApp();

  // Normalize status string (e.g., 'pending' -> 'pending_review')
  const normalizedStatus = status === 'pending' ? 'pending_review' : status;

  let iconNode: React.ReactNode = null;
  let textLabel = customLabel || '';
  let colorStyles = '';

  switch (normalizedStatus) {
    case 'paid':
      iconNode = <CheckCircle2 className="shrink-0" />;
      textLabel = customLabel || t.statusPaid;
      colorStyles =
        variant === 'outline'
          ? 'border-emerald-600 text-emerald-800 dark:text-emerald-300 bg-transparent'
          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      break;

    case 'pending_review':
      iconNode = <Clock className="shrink-0" />;
      textLabel = customLabel || t.statusPendingReview;
      colorStyles =
        variant === 'outline'
          ? 'border-amber-600 text-amber-900 dark:text-amber-200 bg-transparent'
          : 'bg-amber-50 dark:bg-amber-950/35 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      break;

    case 'unpaid':
      iconNode = <AlertCircle className="shrink-0" />;
      textLabel = customLabel || t.statusUnpaid;
      colorStyles =
        variant === 'outline'
          ? 'border-rose-600 text-rose-800 bg-transparent'
          : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      break;

    case 'rejected':
      iconNode = <XCircle className="shrink-0" />;
      textLabel = customLabel || t.statusRejected;
      colorStyles =
        variant === 'outline'
          ? 'border-red-600 text-red-900 dark:text-red-200 bg-transparent'
          : 'bg-red-50 dark:bg-red-950/35 text-red-900 dark:text-red-200 border-red-300 dark:border-red-700 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800';
      break;

    case 'expired':
      iconNode = <Clock className="shrink-0" />;
      textLabel = customLabel || t.statusExpired;
      colorStyles =
        variant === 'outline'
          ? 'border-slate-500 text-slate-700 dark:text-slate-300 bg-transparent'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
      break;

    case 'registered':
      iconNode = <CheckCircle2 className="shrink-0" />;
      textLabel = customLabel || t.statusRegistered;
      colorStyles =
        variant === 'outline'
          ? 'border-blue-500 text-blue-800 dark:text-blue-300 bg-transparent'
          : 'bg-blue-50 dark:bg-blue-950/35 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
      break;

    case 'not_registered':
      iconNode = <MinusCircle className="shrink-0" />;
      textLabel = customLabel || t.statusNotRegistered;
      colorStyles =
        variant === 'outline'
          ? 'border-gray-400 text-gray-700 bg-transparent'
          : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      break;

    default:
      iconNode = <AlertCircle className="shrink-0" />;
      textLabel = customLabel || String(status);
      colorStyles = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800';
  }

  // Size specifications with strict minimum legible typography and touch paddings
  const sizeStyles = {
    sm: {
      container: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium rounded-md min-h-[24px]',
      icon: 'w-3.5 h-3.5',
    },
    md: {
      container: 'text-xs sm:text-sm px-3 py-1 gap-1.5 font-semibold rounded-lg min-h-[30px]',
      icon: 'w-4 h-4',
    },
    lg: {
      container: 'text-sm sm:text-base px-4 py-1.5 gap-2 font-bold rounded-xl min-h-[40px]',
      icon: 'w-5 h-5',
    },
  };

  const selectedSize = sizeStyles[size];

  return (
    <span
      role="status"
      aria-label={`${t.subscriptionStatus}: ${textLabel}`}
      className={`inline-flex items-center border font-sans tracking-normal whitespace-nowrap select-none transition-colors ${selectedSize.container} ${colorStyles} ${className}`}
    >
      {showIcon && iconNode && (
        <span
          className={`inline-flex items-center justify-center shrink-0 ${selectedSize.icon} text-current [&>svg]:w-full [&>svg]:h-full`}
          aria-hidden="true"
        >
          {iconNode}
        </span>
      )}
      <span className="leading-tight">{textLabel}</span>
    </span>
  );
};

export default StatusIndicator;

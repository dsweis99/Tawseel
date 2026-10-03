import React from 'react';
import { StatusIndicator, AnyStatus } from './StatusIndicator';

interface StatusBadgeProps {
  status: AnyStatus;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'subtle' | 'outline';
  showIcon?: boolean;
  className?: string;
  customLabel?: string;
}

/**
 * StatusBadge (Proxy to StatusIndicator for backward compatibility)
 */
export const StatusBadge: React.FC<StatusBadgeProps> = (props) => {
  return <StatusIndicator {...props} />;
};

export default StatusBadge;

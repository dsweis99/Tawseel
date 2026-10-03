export type UserRole = 'super_admin' | 'platform_admin' | 'group_manager' | 'member';

export type RegistrationStatus = 'registered' | 'not_registered';

export type SubscriptionStatus = 'paid' | 'unpaid' | 'pending_review' | 'expired' | 'rejected';

export type PaymentMethod = 'cliq' | 'zain_cash' | 'orange_money' | 'bank_transfer' | 'cash';

export interface User {
  id: string;
  name: string;
  nameAr: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  groupId?: string; // For group managers & members
  groupName?: string;
  joinedDate: string;
  isActive: boolean;
}

export interface DeliveryGroup {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  monthlyFee: number; // in JOD (e.g. 15)
  currency: string; // 'JOD'
  description?: string;
  whatsappGroupLink?: string;
  contactPhone?: string;
  managerIds: string[];
  totalMembersCount: number;
  createdAt: string;
  status: 'active' | 'suspended';
  dueDayOfMonth: number; // e.g. 25th of month
}

export interface Member {
  id: string;
  name: string;
  nameAr: string;
  phone: string;
  groupId: string;
  groupName: string;
  registrationStatus: RegistrationStatus;
  registrationDate?: string;
  currentSubscriptionStatus: SubscriptionStatus;
  currentMonth: string; // e.g. "2026-10"
  monthlyFee: number; // 15 JOD
  vehicleType?: 'motorcycle' | 'car' | 'van';
  vehiclePlate?: string;
  cliqAlias?: string;
  notes?: string;
  lastPaymentDate?: string;
  pendingProofId?: string;
}

export interface PaymentProof {
  id: string;
  memberId: string;
  memberName: string;
  memberNameAr: string;
  memberPhone: string;
  groupId: string;
  groupName: string;
  subscriptionMonth: string; // "2026-10"
  amount: number; // 15
  currency: string; // "JOD"
  paymentMethod: PaymentMethod;
  referenceNumber: string; // e.g. CLIQ-8839219
  proofImageUrl: string;
  uploadedAt: string;
  status: SubscriptionStatus; // 'pending_review' | 'paid' | 'rejected'
  reviewedByManagerId?: string;
  reviewedByManagerName?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface MonthlySubscriptionRecord {
  id: string;
  memberId: string;
  month: string; // "2026-10"
  amount: number;
  status: SubscriptionStatus;
  dueDate: string;
  paymentProofId?: string;
  paidAt?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  groupId?: string;
  groupName?: string;
  action: string;
  actionAr: string;
  details: string;
  detailsAr: string;
  type: 'payment' | 'member' | 'group' | 'auth' | 'system';
}

export interface AppNotification {
  id: string;
  recipientId: string; // user id or 'all_managers' or 'super_admin'
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  type: 'proof_uploaded' | 'proof_approved' | 'proof_rejected' | 'reminder' | 'system';
  relatedMemberId?: string;
  relatedProofId?: string;
}

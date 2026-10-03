import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  DeliveryGroup,
  Member,
  PaymentProof,
  ActivityLog,
  AppNotification,
  PaymentMethod,
} from '../types';
import {
  MOCK_USERS,
  MOCK_GROUPS,
  generateMembers,
  generateInitialPaymentProofs,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_NOTIFICATIONS,
  generateReceiptSvg
} from '../data/mockData';
import { translations, Language } from '../utils/translations';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  groups: DeliveryGroup[];
  currentGroup: DeliveryGroup;
  setCurrentGroup: (group: DeliveryGroup) => void;
  members: Member[];
  paymentProofs: PaymentProof[];
  activityLogs: ActivityLog[];
  notifications: AppNotification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedMemberForProfile: Member | null;
  setSelectedMemberForProfile: (member: Member | null) => void;
  selectedProofForReview: PaymentProof | null;
  setSelectedProofForReview: (proof: PaymentProof | null) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Actions
  approvePaymentProof: (proofId: string, notes?: string) => void;
  rejectPaymentProof: (proofId: string, reason: string) => void;
  uploadPaymentProof: (data: {
    memberId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNumber: string;
    proofImageUrl?: string;
    notes?: string;
  }) => void;
  addMember: (data: Partial<Member>) => void;
  updateMember: (memberId: string, data: Partial<Member>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addGroup: (newGroup: Partial<DeliveryGroup>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [users] = useState<User[]>(MOCK_USERS);
  // Default to Group Manager Omar Al-Khatib for immediate manager operational experience
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[2]); 
  const [groups, setGroups] = useState<DeliveryGroup[]>(MOCK_GROUPS);
  const [currentGroup, setCurrentGroup] = useState<DeliveryGroup>(MOCK_GROUPS[0]);
  const [members, setMembers] = useState<Member[]>(() => generateMembers());
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>(() => generateInitialPaymentProofs());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  const [selectedMemberForProfile, setSelectedMemberForProfile] = useState<Member | null>(null);
  const [selectedProofForReview, setSelectedProofForReview] = useState<PaymentProof | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync RTL / LTR on language change
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4500);
  };

  const approvePaymentProof = (proofId: string, notes?: string) => {
    const proof = paymentProofs.find((p) => p.id === proofId);
    if (!proof) return;

    const now = new Date().toISOString();
    const updatedProofs = paymentProofs.map((p) =>
      p.id === proofId
        ? {
            ...p,
            status: 'paid' as const,
            reviewedByManagerId: currentUser.id,
            reviewedByManagerName: currentUser.name,
            reviewedAt: now,
            notes: notes || p.notes,
          }
        : p
    );
    setPaymentProofs(updatedProofs);

    // Update Member status
    setMembers((prev) =>
      prev.map((m) =>
        m.id === proof.memberId
          ? {
              ...m,
              currentSubscriptionStatus: 'paid' as const,
              lastPaymentDate: now.split('T')[0],
              pendingProofId: undefined,
            }
          : m
      )
    );

    // Add Audit Log
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      timestamp: now,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      groupId: currentGroup.id,
      groupName: currentGroup.name,
      action: 'Approved Payment Proof',
      actionAr: 'تمت الموافقة على إشعار الدفع',
      details: `Approved ${proof.amount} JOD for ${proof.memberName} (Ref: ${proof.referenceNumber}).`,
      detailsAr: `الموافقة على تحويل ${proof.amount} دينار لـ ${proof.memberNameAr} (مرجع: ${proof.referenceNumber}).`,
      type: 'payment',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // Send Notification to Member
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      recipientId: proof.memberId,
      title: 'Payment Approved ✓',
      titleAr: 'تم اعتماد إشعار الدفع بنجاح ✓',
      message: `Your payment of ${proof.amount} JOD for October 2026 was approved by ${currentUser.name}.`,
      messageAr: `تمت الموافقة على اشتراكك الشهري (${proof.amount} دينار) من قِبل ${currentUser.nameAr || currentUser.name}.`,
      timestamp: now,
      read: false,
      type: 'proof_approved',
      relatedMemberId: proof.memberId,
      relatedProofId: proof.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setSelectedProofForReview(null);
    showToast(translations[language].successApproved, 'success');
  };

  const rejectPaymentProof = (proofId: string, reason: string) => {
    const proof = paymentProofs.find((p) => p.id === proofId);
    if (!proof) return;

    const now = new Date().toISOString();
    const updatedProofs = paymentProofs.map((p) =>
      p.id === proofId
        ? {
            ...p,
            status: 'rejected' as const,
            reviewedByManagerId: currentUser.id,
            reviewedByManagerName: currentUser.name,
            reviewedAt: now,
            rejectionReason: reason,
          }
        : p
    );
    setPaymentProofs(updatedProofs);

    // Update Member status
    setMembers((prev) =>
      prev.map((m) =>
        m.id === proof.memberId
          ? {
              ...m,
              currentSubscriptionStatus: 'rejected' as const,
            }
          : m
      )
    );

    // Add Audit Log
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      timestamp: now,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      groupId: currentGroup.id,
      groupName: currentGroup.name,
      action: 'Rejected Payment Proof',
      actionAr: 'تم رفض إشعار الدفع',
      details: `Rejected proof for ${proof.memberName}. Reason: ${reason}`,
      detailsAr: `تم رفض إشعار ${proof.memberNameAr}. السبب: ${reason}`,
      type: 'payment',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // Send Notification to Member
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      recipientId: proof.memberId,
      title: 'Payment Proof Rejected',
      titleAr: 'تم رفض إشعار الدفع',
      message: `Your payment proof was rejected: ${reason}. Please re-upload verified proof.`,
      messageAr: `تم رفض إشعار التحويل: ${reason}. يرجى إعادة رفع صورة واضحة ومطابقة.`,
      timestamp: now,
      read: false,
      type: 'proof_rejected',
      relatedMemberId: proof.memberId,
      relatedProofId: proof.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setSelectedProofForReview(null);
    showToast(translations[language].successRejected, 'error');
  };

  const uploadPaymentProof = (data: {
    memberId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNumber: string;
    proofImageUrl?: string;
    notes?: string;
  }) => {
    const member = members.find((m) => m.id === data.memberId) || {
      id: data.memberId,
      name: currentUser.name,
      nameAr: currentUser.nameAr,
      phone: currentUser.phone,
    };

    const now = new Date().toISOString();
    const dateReadable = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const proofId = `proof_${Date.now()}`;
    
    const imageUrl = data.proofImageUrl || generateReceiptSvg(
      data.referenceNumber,
      member.name,
      data.amount,
      dateReadable,
      data.paymentMethod
    );

    const newProof: PaymentProof = {
      id: proofId,
      memberId: data.memberId,
      memberName: member.name,
      memberNameAr: member.nameAr || member.name,
      memberPhone: member.phone,
      groupId: currentGroup.id,
      groupName: currentGroup.name,
      subscriptionMonth: '2026-10',
      amount: data.amount,
      currency: 'JOD',
      paymentMethod: data.paymentMethod,
      referenceNumber: data.referenceNumber,
      proofImageUrl: imageUrl,
      uploadedAt: now,
      status: 'pending_review',
      notes: data.notes,
    };

    // Replace any prior active proof for this member or prepend
    setPaymentProofs((prev) => [newProof, ...prev.filter((p) => p.memberId !== data.memberId)]);

    // Update Member status
    setMembers((prev) =>
      prev.map((m) =>
        m.id === data.memberId
          ? {
              ...m,
              currentSubscriptionStatus: 'pending_review' as const,
              pendingProofId: proofId,
            }
          : m
      )
    );

    // Add Audit Log
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      timestamp: now,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      groupId: currentGroup.id,
      groupName: currentGroup.name,
      action: 'Uploaded Payment Proof',
      actionAr: 'رفع إشعار تحويل بنكي',
      details: `${member.name} submitted ${data.amount} JOD proof (Ref: ${data.referenceNumber}) for October 2026.`,
      detailsAr: `قام ${member.nameAr || member.name} برفع إشعار تحويل ${data.amount} دينار (مرجع: ${data.referenceNumber}).`,
      type: 'payment',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // Send Notification to Group Managers
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      recipientId: 'all_managers',
      title: 'New Payment Proof Received',
      titleAr: 'إشعار تحويل جديد للمراجعة',
      message: `${member.name} uploaded payment proof for October 2026 (${data.amount} JOD).`,
      messageAr: `قام ${member.nameAr || member.name} برفع إشعار دفع جديد لاشتراك أكتوبر (${data.amount} دينار).`,
      timestamp: now,
      read: false,
      type: 'proof_uploaded',
      relatedMemberId: data.memberId,
      relatedProofId: proofId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setIsUploadModalOpen(false);
    showToast(translations[language].successUploaded, 'success');
  };

  const addMember = (data: Partial<Member>) => {
    const id = `member_${Date.now()}`;
    const newMember: Member = {
      id,
      name: data.name || 'New Member',
      nameAr: data.nameAr || data.name || 'عضو جديد',
      phone: data.phone || '+962 7 9000 0000',
      groupId: currentGroup.id,
      groupName: currentGroup.name,
      registrationStatus: data.registrationStatus || 'registered',
      registrationDate: new Date().toISOString().split('T')[0],
      currentSubscriptionStatus: data.currentSubscriptionStatus || 'unpaid',
      currentMonth: '2026-10',
      monthlyFee: currentGroup.monthlyFee,
      vehicleType: data.vehicleType || 'motorcycle',
      vehiclePlate: data.vehiclePlate,
      cliqAlias: data.cliqAlias,
      notes: data.notes,
    };

    setMembers((prev) => [newMember, ...prev]);
    showToast(translations[language].memberAdded, 'success');
  };

  const updateMember = (memberId: string, data: Partial<Member>) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, ...data } : m)));
    showToast('Member profile updated successfully', 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast(translations[language].markAsRead, 'info');
  };

  const addGroup = (newGroupData: Partial<DeliveryGroup>) => {
    const newGroup: DeliveryGroup = {
      id: `group_${Date.now()}`,
      name: newGroupData.name || 'New Delivery Group',
      nameAr: newGroupData.nameAr || 'مجموعة توصيل جديدة',
      city: newGroupData.city || 'Amman',
      cityAr: newGroupData.cityAr || 'عمّان',
      monthlyFee: newGroupData.monthlyFee || 15,
      currency: 'JOD',
      description: newGroupData.description || '',
      whatsappGroupLink: newGroupData.whatsappGroupLink || '',
      contactPhone: newGroupData.contactPhone || '+962 7 9000 0000',
      managerIds: [currentUser.id],
      totalMembersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      dueDayOfMonth: 25,
    };
    setGroups((prev) => [...prev, newGroup]);
    showToast('Group created successfully', 'success');
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    users,
    language,
    setLanguage,
    t: translations[language],
    groups,
    currentGroup,
    setCurrentGroup,
    members,
    paymentProofs,
    activityLogs,
    notifications,
    activeTab,
    setActiveTab,
    selectedMemberForProfile,
    setSelectedMemberForProfile,
    selectedProofForReview,
    setSelectedProofForReview,
    isUploadModalOpen,
    setIsUploadModalOpen,
    toast,
    showToast,
    approvePaymentProof,
    rejectPaymentProof,
    uploadPaymentProof,
    addMember,
    updateMember,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addGroup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Brand & Roles
    appName: 'Wasel Admin',
    appTagline: 'Delivery Community Membership & Subscription Hub',
    superAdmin: 'Super Admin',
    platformAdmin: 'Platform Admin',
    groupManager: 'Group Manager',
    member: 'Member',
    role: 'Role',
    switchRole: 'Switch Role (Demo Persona)',
    currentRole: 'Current Role',

    // Navigation
    navDashboard: 'Dashboard',
    navGroups: 'Groups',
    navManagers: 'Managers',
    navMembers: 'Members',
    navPayments: 'Payment Reviews',
    navSubscriptions: 'Subscriptions',
    navReports: 'Reports & Export',
    navActivity: 'Activity Log',
    navSettings: 'Group Settings',
    navHome: 'Home',
    navMySubscription: 'My Subscription',
    navPaymentHistory: 'Payment History',
    navProfile: 'My Profile',

    // Statuses (Icon + Label + Color rule)
    statusPaid: 'Paid',
    statusUnpaid: 'Unpaid',
    statusPendingReview: 'Pending Review',
    statusExpired: 'Expired',
    statusRejected: 'Rejected',
    statusRegistered: 'Registered',
    statusNotRegistered: 'Not Registered',

    // Dashboard Headers & Questions
    welcomeBack: 'Welcome back',
    overviewForMonth: 'Monthly Overview — October 2026',
    needsAttention: 'Needs Immediate Attention',
    needsAttentionSubtitle: 'Actionable items requiring manager decision. Resolve these before searching full database.',
    quickStats: 'Key Membership Metrics',
    
    // Core Questions for Managers
    totalMembers: 'Total Members',
    registeredMembers: 'Registered',
    unregisteredMembers: 'Not Registered',
    paidCount: 'Paid',
    pendingCount: 'Pending Review',
    unpaidCount: 'Unpaid',
    expiredCount: 'Expired',
    collectedAmount: 'Total Collected',
    expectedAmount: 'Total Expected',
    collectionRate: 'Collection Rate',

    // Action buttons & CTAs
    reviewProofs: 'Review Payment Proofs',
    uploadPaymentProof: 'Upload Payment Proof',
    replacePaymentProof: 'Replace Payment Proof',
    approvePayment: 'Approve Payment',
    rejectPayment: 'Reject Proof',
    viewDetails: 'View Details',
    exportReport: 'Export Report',
    sendWhatsAppReminder: 'WhatsApp Reminder',
    copyReminderText: 'Copy WhatsApp Message',
    addNewMember: 'Add Member',
    inviteViaWhatsApp: 'Invite via WhatsApp Link',
    filterAll: 'All',
    searchPlaceholder: 'Search by member name or phone number...',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm Action',
    saveChanges: 'Save Changes',
    markAsRead: 'Mark all as read',
    noNotifications: 'No new notifications',

    // Member Dashboard Strings
    memberMonthlyCardTitle: 'Monthly Subscription',
    currentBillingCycle: 'Billing Period: October 2026',
    amountDue: 'Amount Due',
    dueDate: 'Due Date',
    subscriptionStatus: 'Status',
    paymentUnderReviewNotice: 'Your payment proof has been submitted and is currently being reviewed by the group managers.',
    paymentApprovedNotice: 'Your subscription is active and verified for this month. Thank you for your commitment!',
    paymentRejectedNotice: 'Your submitted payment proof could not be verified.',
    paymentUnpaidNotice: 'Please transfer your monthly dues (15 JOD) and upload the receipt to maintain your group membership.',
    groupFundCliQ: 'Group CliQ Alias',
    groupFundPhone: 'Orange / Zain Cash Wallet',

    // Upload Modal Strings
    uploadModalTitle: 'Submit Monthly Payment Proof',
    selectProofImage: 'Select Receipt Photo or Screenshot',
    dragOrClickToUpload: 'Click to browse or take photo of payment receipt',
    fileRequirements: 'Supported: JPG, PNG, WEBP, PDF (Max 10MB)',
    selectPaymentMethod: 'Payment Method Used',
    referenceNumber: 'CliQ / Wallet Reference Number',
    referencePlaceholder: 'e.g. CLIQ-202610-884920 or ZC-499120',
    transferAmount: 'Amount Transferred (JOD)',
    optionalNotes: 'Additional Notes (Optional)',
    submitProofBtn: 'Submit Proof for Verification',

    // Rejection Strings
    rejectionReasonPrompt: 'Reason for rejection (shown clearly to member)',
    reasonBlurry: 'Receipt photo is blurry or illegible',
    reasonWrongAmount: 'Transferred amount does not match 15 JOD fee',
    reasonMissingRef: 'CliQ/Wallet reference number is missing or invalid',
    reasonOldDate: 'Payment date is not from current billing cycle',
    reasonOther: 'Other discrepancy',
    specifyReason: 'Additional explanation for the member...',

    // System Status & Heuristics
    processing: 'Processing...',
    successApproved: 'Payment proof successfully approved!',
    successRejected: 'Payment proof rejected. Notification sent to member.',
    successUploaded: 'Payment proof uploaded! Now pending manager review.',
    memberAdded: 'New member successfully registered.',

    // Empty States
    noPendingProofs: 'All caught up! No payment proofs pending review.',
    noMembersFound: 'No members match your current filter or search criteria.',
    noUnpaidMembers: 'Great news! All registered members have paid.',

    // Reports
    financialSummary: 'Financial Collection Summary',
    paymentMethodBreakdown: 'Breakdown by Payment Channel',
    downloadCsv: 'Download Members CSV',
    printReport: 'Print / Save PDF',

    // Language Toggle
    langEn: 'English',
    langAr: 'العربية',
  },
  ar: {
    // Brand & Roles
    appName: 'واصل أدمن',
    appTagline: 'منصة إدارة اشتراكات وعضويات مجموعات التوصيل',
    superAdmin: 'مدير المنصة الرئيسي (Super Admin)',
    platformAdmin: 'مسؤول العمليات (Platform Admin)',
    groupManager: 'مدير المجموعة (Group Manager)',
    member: 'عضو / كابتن توصيل (Member)',
    role: 'الدور الحالي',
    switchRole: 'تبديل الحساب (تجربة الأدوار)',
    currentRole: 'الدور النشط',

    // Navigation
    navDashboard: 'لوحة التحكم',
    navGroups: 'المجموعات',
    navManagers: 'المدراء',
    navMembers: 'الأعضاء',
    navPayments: 'مراجعة الإيصالات',
    navSubscriptions: 'الاشتراكات',
    navReports: 'التقارير والتصدير',
    navActivity: 'سجل النشاطات',
    navSettings: 'إعدادات المجموعة',
    navHome: 'الرئيسية',
    navMySubscription: 'اشتراكي الشهري',
    navPaymentHistory: 'سجل الدفعات',
    navProfile: 'ملفي الشخصي',

    // Statuses
    statusPaid: 'تم السداد',
    statusUnpaid: 'غير مسدد',
    statusPendingReview: 'قيد المراجعة',
    statusExpired: 'منتهي',
    statusRejected: 'مرفوض',
    statusRegistered: 'مسجل',
    statusNotRegistered: 'غير مسجل',

    // Dashboard Headers & Questions
    welcomeBack: 'أهلاً بك',
    overviewForMonth: 'نظرة عامة على الاشتراكات — تشرين الأول / أكتوبر 2026',
    needsAttention: 'أمور تتطلب اهتمامك الفوري',
    needsAttentionSubtitle: 'عناصر تتطلب قرار المدير. تعامل معها فوراً دون الحاجة للبحث بين 230 عضواً.',
    quickStats: 'إحصائيات العضوية والتحصيل',
    
    // Core Questions for Managers
    totalMembers: 'إجمالي الأعضاء',
    registeredMembers: 'الأعضاء المسجلين',
    unregisteredMembers: 'غير المسجلين',
    paidCount: 'تم السداد',
    pendingCount: 'بانتظار المراجعة',
    unpaidCount: 'لم يسددوا',
    expiredCount: 'منتهي',
    collectedAmount: 'المبلغ المحصل',
    expectedAmount: 'المبلغ المتوقع',
    collectionRate: 'نسبة التحصيل',

    // Action buttons & CTAs
    reviewProofs: 'مراجعة إيصالات الدفع',
    uploadPaymentProof: 'رفع إشعار الدفع',
    replacePaymentProof: 'تعديل / إعادة رفع الإشعار',
    approvePayment: 'الموافقة والاعتماد',
    rejectPayment: 'رفض الإشعار',
    viewDetails: 'عرض التفاصيل',
    exportReport: 'تصدير التقرير',
    sendWhatsAppReminder: 'تذكير واتساب',
    copyReminderText: 'نسخ رسالة الواتساب',
    addNewMember: 'إضافة عضو جديد',
    inviteViaWhatsApp: 'دعوة عبر رابط الواتساب',
    filterAll: 'الكل',
    searchPlaceholder: 'ابحث باسم العضو أو رقم الهاتف...',
    close: 'إغلاق',
    cancel: 'إلغاء',
    confirm: 'تأكيد الإجراء',
    saveChanges: 'حفظ التعديلات',
    markAsRead: 'تحديد الكل كمقروء',
    noNotifications: 'لا توجد تنبيهات جديدة',

    // Member Dashboard Strings
    memberMonthlyCardTitle: 'الاشتراك الشهري لمجموعة التوصيل',
    currentBillingCycle: 'دورة الاشتراك: تشرين الأول / أكتوبر 2026',
    amountDue: 'المبلغ المطلوب',
    dueDate: 'تاريخ الاستحقاق',
    subscriptionStatus: 'حالة الاشتراك',
    paymentUnderReviewNotice: 'تم إرسال إشعار الدفع بنجاح وهو قيد المراجعة والتدقيق من قِبل مدراء المجموعة.',
    paymentApprovedNotice: 'اشتراكك معتمد ونشط لهذا الشهر. شكراً لالتزامك ودعمك لمجموعة التوصيل!',
    paymentRejectedNotice: 'تعذر اعتماد إشعار التحويل المرفوع.',
    paymentUnpaidNotice: 'يرجى تحويل رسوم الاشتراك الشهري (15 دينار) ورفع صورة الإشعار للمحافظة على عضويتك في المجموعة.',
    groupFundCliQ: 'اسم كليك المعتمد للمجموعة (CliQ Alias)',
    groupFundPhone: 'محفظة أورنج / زين كاش المعتمدة',

    // Upload Modal Strings
    uploadModalTitle: 'رفع إشعار تحويل الاشتراك الشهري',
    selectProofImage: 'اختر صورة الوصل أو لقطة شاشة التحويل',
    dragOrClickToUpload: 'انقر لاختيار صورة الإشعار من المعرض أو التقاط صورة',
    fileRequirements: 'الملفات المدعومة: JPG, PNG, WEBP, PDF (بحد أقصى 10 ميغابايت)',
    selectPaymentMethod: 'طريقة الدفع المستخدمة',
    referenceNumber: 'الرقم المرجعي للتحويل (CliQ / Wallet Ref)',
    referencePlaceholder: 'مثال: CLIQ-202610-884920 أو ZC-499120',
    transferAmount: 'المبلغ المحوّل (دينار أردني)',
    optionalNotes: 'ملاحظات إضافية (اختياري)',
    submitProofBtn: 'إرسال الإشعار للتدقيق والاعتماد',

    // Rejection Strings
    rejectionReasonPrompt: 'سبب عدم الاعتماد (سيظهر بوضوح للعضو لإصلاحه)',
    reasonBlurry: 'صورة الوصل غير واضحة أو غير مقروءة',
    reasonWrongAmount: 'المبلغ المحوّل لا يطابق قيمة الاشتراك (15 دينار)',
    reasonMissingRef: 'رقم المرجع البنكي غير ظاهر في الصورة',
    reasonOldDate: 'تاريخ التحويل قديم ولا يخص الشهر الحالي',
    reasonOther: 'سبب آخر',
    specifyReason: 'توضيح إضافي للعضو...',

    // System Status & Heuristics
    processing: 'جاري المعالجة...',
    successApproved: 'تم اعتماد إشعار الدفع بنجاح!',
    successRejected: 'تم رفض الإشعار وإرسال التنبيه للعضو.',
    successUploaded: 'تم رفع إشعار الدفع بنجاح وهو الآن بانتظار مراجعة المدراء.',
    memberAdded: 'تم تسجيل العضو الجديد بنجاح.',

    // Empty States
    noPendingProofs: 'رائع! لا توجد إيصالات دفع بانتظار المراجعة حالياً.',
    noMembersFound: 'لا يوجد أعضاء يطابقون معايير البحث أو التصفية الحالية.',
    noUnpaidMembers: 'ممتاز! جميع الأعضاء المسجلين قاموا بالسداد.',

    // Reports
    financialSummary: 'الملخص المالي والتحصيل',
    paymentMethodBreakdown: 'توزيع قنوات الدفع المستخدمة',
    downloadCsv: 'تنزيل ملف الأعضاء (CSV)',
    printReport: 'طباعة التقرير / حفظ PDF',

    // Language Toggle
    langEn: 'English',
    langAr: 'العربية',
  }
};

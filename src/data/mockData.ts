import { User, DeliveryGroup, Member, PaymentProof, ActivityLog, AppNotification } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user_super_admin',
    name: 'Tariq Al-Hashemi',
    nameAr: 'طارق الهاشمي',
    phone: '+962 7 9555 1000',
    email: 'tariq@waselplatform.jo',
    role: 'super_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2025-01-10',
    isActive: true,
  },
  {
    id: 'user_plat_admin',
    name: 'Rania Qasim',
    nameAr: 'رانيا قاسم',
    phone: '+962 7 8666 2200',
    email: 'rania@waselplatform.jo',
    role: 'platform_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2025-04-15',
    isActive: true,
  },
  {
    id: 'user_manager_1',
    name: 'Omar Al-Khatib (Abu Omar)',
    nameAr: 'عمر الخطيب (أبو عمر)',
    phone: '+962 7 9123 4567',
    email: 'abuomar@ammanrunners.jo',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2025-02-01',
    isActive: true,
  },
  {
    id: 'user_manager_2',
    name: 'Rami Al-Masri',
    nameAr: 'رامي المصري',
    phone: '+962 7 8111 3456',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-03-10',
    isActive: true,
  },
  {
    id: 'user_manager_3',
    name: 'Zeid Hamdan',
    nameAr: 'زيد حمدان',
    phone: '+962 7 7222 9876',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-03-12',
    isActive: true,
  },
  {
    id: 'user_manager_4',
    name: 'Khaled Al-Qaisi',
    nameAr: 'خالد القيسي',
    phone: '+962 7 9333 4455',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-04-01',
    isActive: true,
  },
  {
    id: 'user_manager_5',
    name: 'Fadi Najjar',
    nameAr: 'فادي نجار',
    phone: '+962 7 8444 7788',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-05-18',
    isActive: true,
  },
  {
    id: 'user_manager_6',
    name: 'Tareq Zaid',
    nameAr: 'طارق زيد',
    phone: '+962 7 9555 9900',
    role: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-06-01',
    isActive: true,
  },
  // Featured Demo Members for testing member perspective
  {
    id: 'member_demo_unpaid',
    name: 'Ahmad Khalil',
    nameAr: 'أحمد خليل الروسان',
    phone: '+962 7 9876 5432',
    role: 'member',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-08-15',
    isActive: true,
  },
  {
    id: 'member_demo_pending',
    name: 'Zaid Al-Najjar',
    nameAr: 'زيد النجار',
    phone: '+962 7 8765 4321',
    role: 'member',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-07-20',
    isActive: true,
  },
  {
    id: 'member_demo_paid',
    name: 'Mahmoud Al-Sayed',
    nameAr: 'محمود السيد',
    phone: '+962 7 7654 3210',
    role: 'member',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-06-10',
    isActive: true,
  },
  {
    id: 'member_demo_rejected',
    name: 'Sami Haddad',
    nameAr: 'سامي حداد',
    phone: '+962 7 9123 9988',
    role: 'member',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    joinedDate: '2025-09-01',
    isActive: true,
  }
];

export const MOCK_GROUPS: DeliveryGroup[] = [
  {
    id: 'group_amman',
    name: 'Amman Express Runners',
    nameAr: 'شبكة فرسان عمّان للتوصيل',
    city: 'Amman',
    cityAr: 'عمّان',
    monthlyFee: 15,
    currency: 'JOD',
    description: 'Active WhatsApp delivery community in Greater Amman (Khalda, Abdoun, Dabouq, Sweifieh).',
    whatsappGroupLink: 'https://chat.whatsapp.com/demo-amman-runners',
    contactPhone: '+962 7 9123 4567',
    managerIds: [
      'user_manager_1',
      'user_manager_2',
      'user_manager_3',
      'user_manager_4',
      'user_manager_5',
      'user_manager_6'
    ],
    totalMembersCount: 230,
    createdAt: '2025-02-01',
    status: 'active',
    dueDayOfMonth: 25,
  },
  {
    id: 'group_zarqa',
    name: 'Zarqa Delivery Alliance',
    nameAr: 'تحالف دليفري الزرقاء الجديد',
    city: 'Zarqa',
    cityAr: 'الزرقاء',
    monthlyFee: 12,
    currency: 'JOD',
    description: 'Serving Zarqa city center, New Zarqa, and Free Zone commercial deliveries.',
    whatsappGroupLink: 'https://chat.whatsapp.com/demo-zarqa-alliance',
    contactPhone: '+962 7 8888 1234',
    managerIds: ['user_manager_7', 'user_manager_8', 'user_manager_9'],
    totalMembersCount: 140,
    createdAt: '2025-05-15',
    status: 'active',
    dueDayOfMonth: 28,
  },
  {
    id: 'group_irbid',
    name: 'Irbid Couriers Club',
    nameAr: 'نادي فرسان إربد عروس الشمال',
    city: 'Irbid',
    cityAr: 'إربد',
    monthlyFee: 10,
    currency: 'JOD',
    description: 'University street, Yarmouk perimeter, and downtown Irbid food & parcel group.',
    whatsappGroupLink: 'https://chat.whatsapp.com/demo-irbid-couriers',
    contactPhone: '+962 7 7777 4321',
    managerIds: ['user_manager_10', 'user_manager_11'],
    totalMembersCount: 95,
    createdAt: '2025-07-20',
    status: 'active',
    dueDayOfMonth: 25,
  }
];

// Helper to generate realistic Jordanian bank/CliQ payment receipts
export function generateReceiptSvg(refNumber: string, senderName: string, amount: number, dateStr: string, method: string): string {
  const isCliQ = method.toLowerCase().includes('cliq');
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520">
    <rect width="400" height="520" fill="%23f8fafc" rx="16"/>
    <rect x="16" y="16" width="368" height="488" fill="%23ffffff" stroke="%23e2e8f0" stroke-width="1.5" rx="12"/>
    <rect x="16" y="16" width="368" height="85" fill="${isCliQ ? '%23059669' : '%232563eb'}" rx="12"/>
    <circle cx="200" cy="58" r="22" fill="%23ffffff" fill-opacity="0.2"/>
    <path d="M192 58 l5 5 l11 -11" stroke="%23ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <text x="200" y="90" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="%23ffffff" text-anchor="middle">
      ${isCliQ ? 'CliQ Instant Transfer - Verified' : 'Electronic Wallet Receipt'}
    </text>
    
    <text x="200" y="140" font-family="Arial, sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">Transfer Amount</text>
    <text x="200" y="172" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="%230f172a" text-anchor="middle">${amount.toFixed(2)} JOD</text>
    
    <line x1="40" y1="195" x2="360" y2="195" stroke="%23e2e8f0" stroke-dasharray="4"/>
    
    <text x="40" y="230" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">Sender (Member):</text>
    <text x="360" y="230" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="%230f172a" text-anchor="end">${encodeURIComponent(senderName)}</text>
    
    <text x="40" y="265" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">Receiver (Group Fund):</text>
    <text x="360" y="265" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="%230f172a" text-anchor="end">Amman Express Runners</text>
    
    <text x="40" y="300" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">CliQ Alias / IBAN:</text>
    <text x="360" y="300" font-family="Arial, sans-serif" font-size="13" font-mono="true" font-weight="bold" fill="%23059669" text-anchor="end">AMMAN_RUNNERS</text>
    
    <text x="40" y="335" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">Transaction Ref:</text>
    <text x="360" y="335" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="%23334155" text-anchor="end">${refNumber}</text>
    
    <text x="40" y="370" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">Date &amp; Time:</text>
    <text x="360" y="370" font-family="Arial, sans-serif" font-size="12" fill="%23334155" text-anchor="end">${dateStr}</text>
    
    <text x="40" y="405" font-family="Arial, sans-serif" font-size="12" fill="%2364748b">Purpose:</text>
    <text x="360" y="405" font-family="Arial, sans-serif" font-size="12" fill="%23334155" text-anchor="end">Monthly Subscription Oct 2026</text>
    
    <rect x="40" y="435" width="320" height="42" fill="%23f1f5f9" rx="8"/>
    <text x="200" y="461" font-family="Arial, sans-serif" font-size="11" fill="%23475569" text-anchor="middle">Central Bank of Jordan JoPACC CliQ Network</text>
  </svg>`;
}

// Generate the 230 members for Amman Express Runners
const ARABIC_FIRST_NAMES = [
  'Ahmad', 'Mohammad', 'Ali', 'Omar', 'Yousef', 'Khaled', 'Ibrahim', 'Mahmoud', 'Hamza', 'Tareq',
  'Mustafa', 'Zaid', 'Bilal', 'Fadi', 'Hassan', 'Hussein', 'Samer', 'Abdallah', 'Laith', 'Kareem',
  'Amr', 'Nasser', 'Yazan', 'Anas', 'Osama', 'Sami', 'Raed', 'Moath', 'Rami', 'Marwan'
];

const ARABIC_FIRST_NAMES_AR = [
  'أحمد', 'محمد', 'علي', 'عمر', 'يوسف', 'خالد', 'إبراهيم', 'محمود', 'حمزة', 'طارق',
  'مصطفى', 'زيد', 'بلال', 'فادي', 'حسن', 'حسين', 'سامر', 'عبدالله', 'ليث', 'كريم',
  'عمرو', 'ناصر', 'يزن', 'أنس', 'أسامة', 'سامي', 'رائد', 'معاذ', 'رامي', 'مروان'
];

const ARABIC_LAST_NAMES = [
  'Al-Khatib', 'Al-Masri', 'Hamdan', 'Al-Qaisi', 'Najjar', 'Zaid', 'Al-Sayed', 'Khalil',
  'Al-Majali', 'Al-Adwan', 'Al-Zoubi', 'Haddad', 'Al-Momani', 'Obeidat', 'Al-Tarawneh',
  'Al-Natsheh', 'Al-Shawabkeh', 'Al-Jabari', 'Ghanem', 'Al-Dabbas', 'Bani Hani', 'Al-Kilani'
];

const ARABIC_LAST_NAMES_AR = [
  'الخطيب', 'المصري', 'حمدان', 'القيسي', 'نجار', 'زيد', 'السيد', 'خليل',
  'المجالي', 'العدوان', 'الزعبي', 'حداد', 'المومني', 'عبيدات', 'الطراونة',
  'النتشة', 'الشوابكة', 'الجعبري', 'غانم', 'الدباس', 'بني هاني', 'الكيلاني'
];

// Seeded members generator for Amman Express Runners (230 total members)
export function generateMembers(): Member[] {
  const members: Member[] = [];

  // 1. Featured member: Ahmad Khalil (Unpaid)
  members.push({
    id: 'member_demo_unpaid',
    name: 'Ahmad Khalil Al-Rousan',
    nameAr: 'أحمد خليل الروسان',
    phone: '+962 7 9876 5432',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    registrationStatus: 'registered',
    registrationDate: '2025-08-15',
    currentSubscriptionStatus: 'unpaid',
    currentMonth: '2026-10',
    monthlyFee: 15,
    vehicleType: 'motorcycle',
    vehiclePlate: '44-9812',
    cliqAlias: 'AHMAD_KHALIL',
    notes: 'Khalda zone courier. Operates Suzuki GSX.',
    lastPaymentDate: '2026-09-22',
  });

  // 2. Featured member: Zaid Al-Najjar (Pending Review)
  members.push({
    id: 'member_demo_pending',
    name: 'Zaid Al-Najjar',
    nameAr: 'زيد النجار',
    phone: '+962 7 8765 4321',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    registrationStatus: 'registered',
    registrationDate: '2025-07-20',
    currentSubscriptionStatus: 'pending_review',
    currentMonth: '2026-10',
    monthlyFee: 15,
    vehicleType: 'car',
    vehiclePlate: '12-5544',
    cliqAlias: 'ZAID_NAJJAR',
    notes: 'Abdoun & 7th Circle deliveries.',
    pendingProofId: 'proof_demo_pending',
    lastPaymentDate: '2026-09-24',
  });

  // 3. Featured member: Mahmoud Al-Sayed (Paid)
  members.push({
    id: 'member_demo_paid',
    name: 'Mahmoud Al-Sayed',
    nameAr: 'محمود السيد',
    phone: '+962 7 7654 3210',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    registrationStatus: 'registered',
    registrationDate: '2025-06-10',
    currentSubscriptionStatus: 'paid',
    currentMonth: '2026-10',
    monthlyFee: 15,
    vehicleType: 'motorcycle',
    vehiclePlate: '18-9002',
    cliqAlias: 'MAHMOUD_SAYED',
    notes: 'Consistently pays early. Sweifieh specialist.',
    lastPaymentDate: '2026-10-02',
  });

  // 4. Featured member: Sami Haddad (Rejected)
  members.push({
    id: 'member_demo_rejected',
    name: 'Sami Haddad',
    nameAr: 'سامي حداد',
    phone: '+962 7 9123 9988',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    registrationStatus: 'registered',
    registrationDate: '2025-09-01',
    currentSubscriptionStatus: 'rejected',
    currentMonth: '2026-10',
    monthlyFee: 15,
    vehicleType: 'motorcycle',
    vehiclePlate: '23-7182',
    cliqAlias: 'SAMI_HADDAD',
    notes: 'Submitted blur screenshot without CliQ reference number.',
    pendingProofId: 'proof_demo_rejected',
    lastPaymentDate: '2026-08-25',
  });

  // 5. Featured member: Bilal Al-Adwan (Not Registered)
  members.push({
    id: 'member_demo_unregistered',
    name: 'Bilal Al-Adwan',
    nameAr: 'بلال العدوان',
    phone: '+962 7 9666 4321',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    registrationStatus: 'not_registered',
    currentSubscriptionStatus: 'unpaid',
    currentMonth: '2026-10',
    monthlyFee: 15,
    notes: 'Added from WhatsApp group chat, has not completed registration profile yet.',
  });

  // Now create the exact breakdown requested:
  // Total members: 230
  // Registered: 201
  // Not Registered: 29
  // Paid: 174
  // Pending Review: 17
  // Unpaid: 10
  // (Notice: 174 paid + 17 pending + 10 unpaid = 201 registered members!)
  // (28 more not registered = 29 total not registered)
  // Total = 201 + 29 = 230 members.

  // We already created:
  // - 1 Paid (Mahmoud) -> need 173 more Paid
  // - 1 Pending (Zaid) -> need 16 more Pending
  // - 1 Unpaid (Ahmad) -> need 9 more Unpaid
  // - 1 Rejected (Sami) -> we count in Unpaid/Rejected attention queue
  // - 1 Not Registered (Bilal) -> need 28 more Not Registered

  let memberCounter = 6;

  // Generate 173 more Paid members
  for (let i = 0; i < 173; i++) {
    const fnIdx = (i * 3 + 2) % ARABIC_FIRST_NAMES.length;
    const lnIdx = (i * 7 + 4) % ARABIC_LAST_NAMES.length;
    const phonePrefix = i % 3 === 0 ? '+962 7 9' : (i % 3 === 1 ? '+962 7 8' : '+962 7 7');
    const phoneNum = `${phonePrefix}${Math.floor(100 + (i * 19) % 900)} ${Math.floor(1000 + (i * 37) % 9000)}`;

    members.push({
      id: `member_paid_${i + 1}`,
      name: `${ARABIC_FIRST_NAMES[fnIdx]} ${ARABIC_LAST_NAMES[lnIdx]}`,
      nameAr: `${ARABIC_FIRST_NAMES_AR[fnIdx]} ${ARABIC_LAST_NAMES_AR[lnIdx]}`,
      phone: phoneNum,
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      registrationStatus: 'registered',
      registrationDate: `2025-${String((i % 10) + 1).padStart(2, '0')}-15`,
      currentSubscriptionStatus: 'paid',
      currentMonth: '2026-10',
      monthlyFee: 15,
      vehicleType: i % 4 === 0 ? 'car' : 'motorcycle',
      vehiclePlate: `${(i % 50) + 10}-${1000 + i * 13}`,
      cliqAlias: `CLIQ_${ARABIC_FIRST_NAMES[fnIdx].toUpperCase()}_${i + 1}`,
      lastPaymentDate: `2026-10-0${(i % 3) + 1}`,
    });
    memberCounter++;
  }

  // Generate 16 more Pending Review members
  for (let i = 0; i < 16; i++) {
    const fnIdx = (i * 2 + 5) % ARABIC_FIRST_NAMES.length;
    const lnIdx = (i * 5 + 1) % ARABIC_LAST_NAMES.length;
    const phonePrefix = '+962 7 8';
    const phoneNum = `${phonePrefix}${Math.floor(200 + (i * 23) % 800)} ${Math.floor(2000 + (i * 41) % 8000)}`;

    members.push({
      id: `member_pending_${i + 1}`,
      name: `${ARABIC_FIRST_NAMES[fnIdx]} ${ARABIC_LAST_NAMES[lnIdx]}`,
      nameAr: `${ARABIC_FIRST_NAMES_AR[fnIdx]} ${ARABIC_LAST_NAMES_AR[lnIdx]}`,
      phone: phoneNum,
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      registrationStatus: 'registered',
      registrationDate: `2025-06-18`,
      currentSubscriptionStatus: 'pending_review',
      currentMonth: '2026-10',
      monthlyFee: 15,
      vehicleType: i % 2 === 0 ? 'motorcycle' : 'car',
      vehiclePlate: `22-${3000 + i * 27}`,
      cliqAlias: `CLIQ_${ARABIC_FIRST_NAMES[fnIdx].toUpperCase()}`,
      pendingProofId: `proof_pending_${i + 1}`,
      lastPaymentDate: '2026-09-23',
    });
    memberCounter++;
  }

  // Generate 9 more Unpaid registered members
  for (let i = 0; i < 9; i++) {
    const fnIdx = (i * 4 + 7) % ARABIC_FIRST_NAMES.length;
    const lnIdx = (i * 3 + 8) % ARABIC_LAST_NAMES.length;
    const phonePrefix = '+962 7 9';
    const phoneNum = `${phonePrefix}${Math.floor(300 + (i * 31) % 700)} ${Math.floor(3000 + (i * 53) % 7000)}`;

    members.push({
      id: `member_unpaid_${i + 1}`,
      name: `${ARABIC_FIRST_NAMES[fnIdx]} ${ARABIC_LAST_NAMES[lnIdx]}`,
      nameAr: `${ARABIC_FIRST_NAMES_AR[fnIdx]} ${ARABIC_LAST_NAMES_AR[lnIdx]}`,
      phone: phoneNum,
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      registrationStatus: 'registered',
      registrationDate: `2025-05-12`,
      currentSubscriptionStatus: 'unpaid',
      currentMonth: '2026-10',
      monthlyFee: 15,
      vehicleType: 'motorcycle',
      vehiclePlate: `15-${4000 + i * 19}`,
      lastPaymentDate: '2026-09-18',
    });
    memberCounter++;
  }

  // Generate 28 more Not Registered members
  for (let i = 0; i < 28; i++) {
    const fnIdx = (i * 5 + 3) % ARABIC_FIRST_NAMES.length;
    const lnIdx = (i * 2 + 11) % ARABIC_LAST_NAMES.length;
    const phonePrefix = '+962 7 7';
    const phoneNum = `${phonePrefix}${Math.floor(400 + (i * 17) % 600)} ${Math.floor(4000 + (i * 61) % 6000)}`;

    members.push({
      id: `member_unreg_${i + 1}`,
      name: `${ARABIC_FIRST_NAMES[fnIdx]} ${ARABIC_LAST_NAMES[lnIdx]}`,
      nameAr: `${ARABIC_FIRST_NAMES_AR[fnIdx]} ${ARABIC_LAST_NAMES_AR[lnIdx]}`,
      phone: phoneNum,
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      registrationStatus: 'not_registered',
      currentSubscriptionStatus: 'unpaid',
      currentMonth: '2026-10',
      monthlyFee: 15,
      notes: 'Invited via WhatsApp link. Awaiting registration form submission.',
    });
    memberCounter++;
  }

  return members;
}

// Generate the 17 pending review payment proofs + demo proofs
export function generateInitialPaymentProofs(): PaymentProof[] {
  const proofs: PaymentProof[] = [
    {
      id: 'proof_demo_pending',
      memberId: 'member_demo_pending',
      memberName: 'Zaid Al-Najjar',
      memberNameAr: 'زيد النجار',
      memberPhone: '+962 7 8765 4321',
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      subscriptionMonth: '2026-10',
      amount: 15,
      currency: 'JOD',
      paymentMethod: 'cliq',
      referenceNumber: 'CLIQ-20261002-884920',
      proofImageUrl: generateReceiptSvg('CLIQ-20261002-884920', 'Zaid Al-Najjar', 15, '2026-10-02 14:28:10', 'cliq'),
      uploadedAt: '2026-10-02T14:30:00Z',
      status: 'pending_review',
      notes: 'Transferred via Arab Bank CliQ to AMMAN_RUNNERS',
    },
    {
      id: 'proof_demo_rejected',
      memberId: 'member_demo_rejected',
      memberName: 'Sami Haddad',
      memberNameAr: 'سامي حداد',
      memberPhone: '+962 7 9123 9988',
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      subscriptionMonth: '2026-10',
      amount: 15,
      currency: 'JOD',
      paymentMethod: 'zain_cash',
      referenceNumber: 'ZC-991823-INVALID',
      proofImageUrl: generateReceiptSvg('ZC-991823-INVALID', 'Sami Haddad', 15, '2026-10-01 09:15:00', 'zain_cash'),
      uploadedAt: '2026-10-01T09:20:00Z',
      status: 'rejected',
      reviewedByManagerId: 'user_manager_1',
      reviewedByManagerName: 'Omar Al-Khatib',
      reviewedAt: '2026-10-01T11:45:00Z',
      rejectionReason: 'Blurry screenshot; reference ID and transaction date are unreadable. Please re-upload clear proof or PDF statement.',
    },
    {
      id: 'proof_demo_paid',
      memberId: 'member_demo_paid',
      memberName: 'Mahmoud Al-Sayed',
      memberNameAr: 'محمود السيد',
      memberPhone: '+962 7 7654 3210',
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      subscriptionMonth: '2026-10',
      amount: 15,
      currency: 'JOD',
      paymentMethod: 'cliq',
      referenceNumber: 'CLIQ-20261001-334190',
      proofImageUrl: generateReceiptSvg('CLIQ-20261001-334190', 'Mahmoud Al-Sayed', 15, '2026-10-01 10:12:00', 'cliq'),
      uploadedAt: '2026-10-01T10:15:00Z',
      status: 'paid',
      reviewedByManagerId: 'user_manager_1',
      reviewedByManagerName: 'Omar Al-Khatib',
      reviewedAt: '2026-10-01T10:45:00Z',
      notes: 'Verified via Bank ABC account statement',
    }
  ];

  // 16 additional pending proofs for Amman Express Runners (1 + 16 = 17 total pending reviews)
  const pendingNames = [
    { en: 'Mohammad Al-Qaisi', ar: 'محمد القيسي' },
    { en: 'Ali Al-Zoubi', ar: 'علي الزعبي' },
    { en: 'Khaled Al-Momani', ar: 'خالد المومني' },
    { en: 'Ibrahim Obeidat', ar: 'إبراهيم عبيدات' },
    { en: 'Hamza Al-Tarawneh', ar: 'حمزة الطراونة' },
    { en: 'Mustafa Al-Natsheh', ar: 'مصطفى النتشة' },
    { en: 'Fadi Al-Shawabkeh', ar: 'فادي الشوابكة' },
    { en: 'Hassan Al-Jabari', ar: 'حسن الجعبري' },
    { en: 'Laith Ghanem', ar: 'ليث غانم' },
    { en: 'Kareem Al-Dabbas', ar: 'كريم الدباس' },
    { en: 'Yazan Bani Hani', ar: 'يزن بني هاني' },
    { en: 'Anas Al-Kilani', ar: 'أنس الكيلاني' },
    { en: 'Moath Al-Majali', ar: 'معاذ المجالي' },
    { en: 'Raed Al-Adwan', ar: 'رائد العدوان' },
    { en: 'Marwan Haddad', ar: 'مروان حداد' },
    { en: 'Osama Khalil', ar: 'أسامة خليل' },
  ];

  for (let i = 0; i < 16; i++) {
    const item = pendingNames[i];
    const ref = `CLIQ-2026100${(i % 3) + 1}-${700000 + i * 1142}`;
    proofs.push({
      id: `proof_pending_${i + 1}`,
      memberId: `member_pending_${i + 1}`,
      memberName: item.en,
      memberNameAr: item.ar,
      memberPhone: `+962 7 8${200 + i * 23} ${2000 + i * 41}`,
      groupId: 'group_amman',
      groupName: 'Amman Express Runners',
      subscriptionMonth: '2026-10',
      amount: 15,
      currency: 'JOD',
      paymentMethod: i % 3 === 0 ? 'cliq' : (i % 3 === 1 ? 'zain_cash' : 'orange_money'),
      referenceNumber: ref,
      proofImageUrl: generateReceiptSvg(ref, item.en, 15, `2026-10-02 1${i % 8}:2${i % 9}:15`, i % 3 === 0 ? 'cliq' : 'wallet'),
      uploadedAt: `2026-10-02T1${i % 8}:2${i % 9}:00Z`,
      status: 'pending_review',
      notes: `Submitted proof via ${i % 3 === 0 ? 'CliQ' : 'e-Wallet'}`,
    });
  }

  return proofs;
}

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act_1',
    timestamp: '2026-10-03T10:15:00Z',
    userId: 'user_manager_1',
    userName: 'Omar Al-Khatib (Abu Omar)',
    userRole: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    action: 'Approved Payment Proof',
    actionAr: 'تمت الموافقة على إشعار الدفع',
    details: 'Approved payment proof of 15 JOD for Mahmoud Al-Sayed (Ref: CLIQ-20261001-334190).',
    detailsAr: 'الموافقة على إشعار تحويل 15 دينار لمحمود السيد (مرجع: CLIQ-20261001-334190).',
    type: 'payment',
  },
  {
    id: 'act_2',
    timestamp: '2026-10-02T14:30:00Z',
    userId: 'member_demo_pending',
    userName: 'Zaid Al-Najjar',
    userRole: 'member',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    action: 'Uploaded Payment Proof',
    actionAr: 'رفع إشعار دفع جديد',
    details: 'Uploaded CliQ transfer receipt for October 2026 (15 JOD). Status changed to Pending Review.',
    detailsAr: 'قام برفع إشعار تحويل كليك لشهر أكتوبر 2026 (15 دينار). الحالة: قيد المراجعة.',
    type: 'payment',
  },
  {
    id: 'act_3',
    timestamp: '2026-10-01T11:45:00Z',
    userId: 'user_manager_1',
    userName: 'Omar Al-Khatib (Abu Omar)',
    userRole: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    action: 'Rejected Payment Proof',
    actionAr: 'رفض إشعار دفع',
    details: 'Rejected payment proof for Sami Haddad. Reason: Blurry screenshot, reference unreadable.',
    detailsAr: 'رفض إشعار دفع سامي حداد. السبب: الصورة غير واضحة ورقم المرجع غير مقروء.',
    type: 'payment',
  },
  {
    id: 'act_4',
    timestamp: '2026-09-30T16:00:00Z',
    userId: 'user_super_admin',
    userName: 'Tariq Al-Hashemi',
    userRole: 'super_admin',
    action: 'System Maintenance & Rules Updated',
    actionAr: 'تحديث قواعد المنصة والأنظمة',
    details: 'System audit completed. Generated monthly dues billing for October 2026 across 3 groups.',
    detailsAr: 'اكتمل التدقيق الشهري وإنشاء مطالبات شهر تشرين الأول / أكتوبر لجميع المجموعات.',
    type: 'system',
  },
  {
    id: 'act_5',
    timestamp: '2026-09-28T09:20:00Z',
    userId: 'user_manager_2',
    userName: 'Rami Al-Masri',
    userRole: 'group_manager',
    groupId: 'group_amman',
    groupName: 'Amman Express Runners',
    action: 'Bulk WhatsApp Reminders Dispatched',
    actionAr: 'إرسال تذكيرات عبر واتساب',
    details: 'Dispatched subscription reminders to 25 members due for October 2026.',
    detailsAr: 'إرسال تذكير سداد لـ 25 عضواً لاشتراك شهر تشرين الأول.',
    type: 'member',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    recipientId: 'user_manager_1',
    title: 'New Payment Proof Uploaded',
    titleAr: 'إشعار تحويل جديد بانتظار المراجعة',
    message: 'Zaid Al-Najjar submitted CliQ payment proof for October 2026 (15 JOD).',
    messageAr: 'قام العضو زيد النجار برفع إشعار تحويل كليك لشهر أكتوبر 2026 (15 دينار).',
    timestamp: '2026-10-02T14:30:00Z',
    read: false,
    type: 'proof_uploaded',
    relatedMemberId: 'member_demo_pending',
    relatedProofId: 'proof_demo_pending',
  },
  {
    id: 'notif_2',
    recipientId: 'member_demo_rejected',
    title: 'Payment Proof Rejected',
    titleAr: 'تم رفض إشعار الدفع الخاص بك',
    message: 'Your payment proof was rejected: Blurry screenshot. Please re-upload clear proof.',
    messageAr: 'تم رفض إشعار الدفع: الصورة غير واضحة. يرجى إعادة رفع صورة واضحة لإتمام الاشتراك.',
    timestamp: '2026-10-01T11:45:00Z',
    read: false,
    type: 'proof_rejected',
    relatedMemberId: 'member_demo_rejected',
    relatedProofId: 'proof_demo_rejected',
  },
  {
    id: 'notif_3',
    recipientId: 'member_demo_paid',
    title: 'Payment Approved ✓',
    titleAr: 'تم اعتماد اشتراكك الشهري بنجاح ✓',
    message: 'Your payment for October 2026 (15 JOD) has been approved by Abu Omar.',
    messageAr: 'تمت الموافقة على اشتراك شهر أكتوبر 2026 (15 دينار) من قِبل أبو عمر.',
    timestamp: '2026-10-01T10:45:00Z',
    read: true,
    type: 'proof_approved',
    relatedMemberId: 'member_demo_paid',
  },
  {
    id: 'notif_4',
    recipientId: 'member_demo_unpaid',
    title: 'Monthly Subscription Due',
    titleAr: 'تذكير: اشتراك شهر أكتوبر مستحق',
    message: 'Your monthly subscription of 15 JOD for Amman Express Runners is due on October 25.',
    messageAr: 'اشتراك شهر تشرين الأول / أكتوبر (15 دينار) مستحق لمجموعة فرسان عمّان.',
    timestamp: '2026-10-01T08:00:00Z',
    read: false,
    type: 'reminder',
    relatedMemberId: 'member_demo_unpaid',
  }
];

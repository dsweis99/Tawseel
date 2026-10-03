import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Member } from '../../types';
import {
  Search,
  Plus,
  Phone,
  MessageCircle,
  Eye,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Bike,
  Car,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

export const MembersList: React.FC = () => {
  const {
    members,
    currentGroup,
    setSelectedMemberForProfile,
    setSelectedProofForReview,
    paymentProofs,
    t,
    language,
    addMember,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('+962 7 9');
  const [newVehicle, setNewVehicle] = useState<'motorcycle' | 'car'>('motorcycle');
  const [newPlate, setNewPlate] = useState('');

  const itemsPerPage = 15;

  // Filter members for current group
  const groupMembers = useMemo(() => {
    return members.filter((m) => m.groupId === currentGroup.id);
  }, [members, currentGroup.id]);

  // Apply search & filter
  const filteredMembers = useMemo(() => {
    return groupMembers.filter((member) => {
      // Search term match
      const query = searchTerm.toLowerCase().trim();
      const nameMatch = member.name.toLowerCase().includes(query) || (member.nameAr && member.nameAr.includes(query));
      const phoneMatch = member.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
      const matchesSearch = !query || nameMatch || phoneMatch;

      // Filter match
      if (!matchesSearch) return false;

      if (statusFilter === 'all') return true;
      if (statusFilter === 'registered') return member.registrationStatus === 'registered';
      if (statusFilter === 'not_registered') return member.registrationStatus === 'not_registered';
      if (statusFilter === 'paid') return member.currentSubscriptionStatus === 'paid';
      if (statusFilter === 'unpaid') return member.currentSubscriptionStatus === 'unpaid';
      if (statusFilter === 'pending_review') return member.currentSubscriptionStatus === 'pending_review';
      if (statusFilter === 'expired') return member.currentSubscriptionStatus === 'expired';
      if (statusFilter === 'rejected') return member.currentSubscriptionStatus === 'rejected';

      return true;
    });
  }, [groupMembers, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    addMember({
      name: newName.trim(),
      nameAr: newName.trim(),
      phone: newPhone.trim(),
      vehicleType: newVehicle,
      vehiclePlate: newPlate.trim() || undefined,
      registrationStatus: 'registered',
      currentSubscriptionStatus: 'unpaid',
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('+962 7 9');
    setNewPlate('');
  };

  const getWaLink = (member: Member) => {
    const cleanPhone = member.phone.replace(/\D/g, '');
    const message = language === 'ar'
      ? `مرحباً كابتن ${member.nameAr || member.name}، معك إدارة مجموعة ${currentGroup.nameAr}...`
      : `Hello courier ${member.name}, this is ${currentGroup.name} management...`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
            {language === 'ar' ? 'إدارة أعضاء المجموعة' : 'Group Members Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {groupMembers.length} {language === 'ar' ? 'عضو مسجل في' : 'total couriers in'}{' '}
            {language === 'ar' ? currentGroup.nameAr : currentGroup.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs min-h-[44px] flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>{t.addNewMember}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
            />
          </div>

          {/* Status Filter Tabs / Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 -mx-1 px-1">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'paid', label: t.statusPaid },
              { id: 'pending_review', label: t.statusPendingReview },
              { id: 'unpaid', label: t.statusUnpaid },
              { id: 'rejected', label: t.statusRejected },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] flex items-center shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
          <span>
            {language === 'ar' ? 'عرض' : 'Showing'} {filteredMembers.length} {language === 'ar' ? 'عضو' : 'members'}
          </span>
          {statusFilter !== 'all' && (
            <button
              onClick={() => setStatusFilter('all')}
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              {language === 'ar' ? 'إعادة ضبط التصفية' : 'Reset filter'}
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3.5">{language === 'ar' ? 'الكابتن / العضو' : 'Member'}</th>
                <th className="px-5 py-3.5">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-5 py-3.5">{language === 'ar' ? 'التسجيل' : 'Registration'}</th>
                <th className="px-5 py-3.5">{language === 'ar' ? 'اشتراك تشرين الأول' : 'October Status'}</th>
                <th className="px-5 py-3.5">{language === 'ar' ? 'آخر سداد' : 'Last Payment'}</th>
                <th className="px-5 py-3.5 text-right rtl:text-left">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500 text-sm">
                    {t.noMembersFound}
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((member) => {
                  const proof = paymentProofs.find((p) => p.memberId === member.id && p.status === 'pending_review');

                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedMemberForProfile(member)}
                    >
                      {/* Name & Vehicle */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">
                              {language === 'ar' && member.nameAr ? member.nameAr : member.name}
                            </span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 capitalize">
                              {member.vehicleType === 'car' ? <Car className="w-3 h-3 text-blue-600" /> : <Bike className="w-3 h-3 text-emerald-600" />}
                              <span>{member.vehiclePlate || member.vehicleType || 'Motorcycle'}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-3.5 font-mono text-slate-600 text-xs">
                        {member.phone}
                      </td>

                      {/* Registration Status using StatusIndicator */}
                      <td className="px-5 py-3.5">
                        <StatusIndicator status={member.registrationStatus} size="sm" />
                      </td>

                      {/* Subscription Status using StatusIndicator */}
                      <td className="px-5 py-3.5">
                        <StatusIndicator status={member.currentSubscriptionStatus} size="sm" />
                      </td>

                      {/* Last Payment */}
                      <td className="px-5 py-3.5 text-xs text-slate-500 tabular-nums">
                        {member.lastPaymentDate || '—'}
                      </td>

                      {/* Actions */}
                      <td
                        className="px-5 py-3.5 text-right rtl:text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end rtl:justify-start gap-1.5">
                          {proof && (
                            <button
                              type="button"
                              onClick={() => setSelectedProofForReview(proof)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold min-h-[36px] flex items-center gap-1 shadow-2xs"
                              title="Review Pending Proof"
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              <span>{language === 'ar' ? 'مراجعة' : 'Review'}</span>
                            </button>
                          )}
                          <a
                            href={getWaLink(member)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-emerald-200 hover:bg-emerald-50 text-emerald-800 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedMemberForProfile(member)}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                            title="Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE RESPONSIVE CARDS VIEW */}
      <div className="md:hidden space-y-3">
        {paginatedMembers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm bg-white rounded-2xl border border-slate-200">
            {t.noMembersFound}
          </div>
        ) : (
          paginatedMembers.map((member) => {
            const proof = paymentProofs.find((p) => p.memberId === member.id && p.status === 'pending_review');

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMemberForProfile(member)}
                className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors active:bg-slate-50 space-y-3 cursor-pointer"
              >
                {/* Header: Name, Vehicle, Phone */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                        {language === 'ar' && member.nameAr ? member.nameAr : member.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-mono text-slate-500 mt-0.5 truncate">
                        {member.phone}
                      </p>
                    </div>
                  </div>
                  <StatusIndicator status={member.currentSubscriptionStatus} size="sm" />
                </div>

                {/* Meta details bar */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 text-slate-600">
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block">{language === 'ar' ? 'حالة التسجيل' : 'Registration'}</span>
                    <StatusIndicator status={member.registrationStatus} size="sm" className="mt-0.5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block">{language === 'ar' ? 'آخر دفعة' : 'Last Payment'}</span>
                    <span className="font-mono text-xs text-slate-800 font-semibold block mt-1 truncate">
                      {member.lastPaymentDate || '—'}
                    </span>
                  </div>
                </div>

                {/* Touch actions footer */}
                <div
                  className="flex items-center gap-2 pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {proof && (
                    <button
                      type="button"
                      onClick={() => setSelectedProofForReview(proof)}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <FileCheck className="w-4 h-4 shrink-0" />
                      <span>{language === 'ar' ? 'تدقيق' : 'Review'}</span>
                    </button>
                  )}
                  <a
                    href={getWaLink(member)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMemberForProfile(member)}
                    className="py-2 px-3 sm:px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold min-h-[44px] flex items-center justify-center"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 shadow-xs text-xs">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none min-h-[40px] flex items-center gap-1 font-semibold text-slate-700"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
          </button>

          <span className="font-semibold text-slate-600 tabular-nums">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none min-h-[40px] flex items-center gap-1 font-semibold text-slate-700"
          >
            <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}

      {/* Add New Member Modal (Full width on mobile) */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-5 sm:p-6 text-left rtl:text-right my-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              {t.addNewMember}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'ar' ? 'إضافة كابتن توصيل جديد لمجموعة' : 'Add courier to'}{' '}
              {language === 'ar' ? currentGroup.nameAr : currentGroup.name}
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {language === 'ar' ? 'اسم العضو / الكابتن' : 'Member Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: معتز المجالي' : 'e.g. Moataz Al-Majali'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {language === 'ar' ? 'رقم الهاتف (الواتساب)' : 'WhatsApp Phone Number'} *
                </label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+962 7 9XXX XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
                  </label>
                  <select
                    value={newVehicle}
                    onChange={(e) => setNewVehicle(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                  >
                    <option value="motorcycle">{language === 'ar' ? 'دراجة نارية' : 'Motorcycle'}</option>
                    <option value="car">{language === 'ar' ? 'سيارة' : 'Car'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ar' ? 'رقم اللوحة' : 'Plate No.'}
                  </label>
                  <input
                    type="text"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    placeholder="44-9021"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold min-h-[44px]"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm min-h-[44px]"
                >
                  {t.addNewMember}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

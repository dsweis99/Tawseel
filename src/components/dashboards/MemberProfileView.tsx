import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  Bike,
  Car,
  CreditCard,
  Calendar,
  Save,
  CheckCircle,
  Download,
  Building,
  QrCode,
} from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';

export const MemberProfileView: React.FC = () => {
  const { currentUser, currentGroup, members, updateMember, t, language, showToast } = useApp();

  const member = members.find((m) => m.id === currentUser.id) || {
    id: currentUser.id,
    name: currentUser.name,
    nameAr: currentUser.nameAr,
    phone: currentUser.phone,
    groupId: currentGroup.id,
    groupName: currentGroup.name,
    registrationStatus: 'registered' as const,
    registrationDate: '2025-08-15',
    currentSubscriptionStatus: 'unpaid' as const,
    currentMonth: '2026-10',
    monthlyFee: currentGroup.monthlyFee,
    vehicleType: 'motorcycle' as const,
    vehiclePlate: '44-9812',
    cliqAlias: 'AHMAD_KHALIL',
  };

  const [plate, setPlate] = useState(member.vehiclePlate || '');
  const [cliqAlias, setCliqAlias] = useState(member.cliqAlias || '');
  const [vehicle, setVehicle] = useState<'motorcycle' | 'car' | 'van'>(member.vehicleType || 'motorcycle');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMember(member.id, {
      vehiclePlate: plate,
      cliqAlias: cliqAlias,
      vehicleType: vehicle,
    });
    showToast(language === 'ar' ? 'تم حفظ بيانات الملف الشخصي' : 'Profile updated successfully', 'success');
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          {t.navProfile}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {language === 'ar' ? 'بيانات الكابتن المسجلة في منصة التوصيل' : 'Courier registration and membership card.'}
        </p>
      </div>

      {/* Digital Courier Membership Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-emerald-400 uppercase block truncate">
                {t.appName}
              </span>
              <span className="text-xs text-slate-300 truncate block">
                {language === 'ar' ? currentGroup.nameAr : currentGroup.name}
              </span>
            </div>
            <StatusIndicator status={member.currentSubscriptionStatus} size="sm" />
          </div>

          <div className="pt-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {language === 'ar' ? 'اسم الكابتن' : 'Courier Name'}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight truncate">
              {language === 'ar' && member.nameAr ? member.nameAr : member.name}
            </h3>
            <span className="text-xs font-mono text-emerald-300 block mt-0.5">
              {member.phone}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">
                {language === 'ar' ? 'المركبة واللوحة' : 'Vehicle & Plate'}
              </span>
              <span className="font-semibold block mt-0.5 truncate">
                {member.vehicleType || 'Motorcycle'} · {member.vehiclePlate || '44-9812'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">
                {language === 'ar' ? 'تاريخ التسجيل' : 'Registered Since'}
              </span>
              <span className="font-mono block mt-0.5 truncate">
                {member.registrationDate || '2025-08-15'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          {language === 'ar' ? 'تعديل بيانات المركبة والتحويل' : 'Update Courier Details'}
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            </label>
            <input
              type="text"
              disabled
              value={member.name}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-semibold cursor-not-allowed min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              {language === 'ar' ? 'رقم الهاتف المسجل (واتساب)' : 'Registered WhatsApp Phone'}
            </label>
            <input
              type="text"
              disabled
              value={member.phone}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono cursor-not-allowed min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'وسيلة التوصيل' : 'Vehicle Type'}
              </label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              >
                <option value="motorcycle">{language === 'ar' ? 'دراجة نارية' : 'Motorcycle'}</option>
                <option value="car">{language === 'ar' ? 'سيارة' : 'Car'}</option>
                <option value="van">{language === 'ar' ? 'فان بضائع' : 'Van'}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'رقم لوحة المركبة' : 'Plate Number'}
              </label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="44-9812"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              {language === 'ar' ? 'اسم كليك الخاص بك (CliQ Alias)' : 'Your Personal CliQ Alias'}
            </label>
            <input
              type="text"
              value={cliqAlias}
              onChange={(e) => setCliqAlias(e.target.value)}
              placeholder="e.g. AHMAD_KHALIL"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 uppercase focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs min-h-[44px] shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveChanges}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CreditCard,
  MessageCircle,
  Phone,
  Save,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';

export const GroupSettingsView: React.FC = () => {
  const { currentGroup, users, t, language, showToast } = useApp();

  const [monthlyFee, setMonthlyFee] = useState(currentGroup.monthlyFee);
  const [cliqAlias, setCliqAlias] = useState('AMMAN_RUNNERS');
  const [waLink, setWaLink] = useState(currentGroup.whatsappGroupLink || '');
  const [phoneContact, setPhoneContact] = useState(currentGroup.contactPhone || '+962 7 9123 4567');
  const [dueDay, setDueDay] = useState(currentGroup.dueDayOfMonth);

  // Group managers for this group
  const managers = users.filter((u) => u.groupId === currentGroup.id && u.role === 'group_manager');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      language === 'ar' ? 'تم تحديث إعدادات المجموعة وبيانات التحويل بنجاح' : 'Group settings saved successfully',
      'success'
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          {language === 'ar' ? 'إعدادات مجموعة التوصيل' : 'Delivery Group Settings'}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {language === 'ar'
            ? 'تعديل رسوم الاشتراك، حساب كليك لصندوق المجموعة، وإدارة المدراء المصرح لهم'
            : 'Configure subscription parameters, payment fund coordinates, and manager access.'}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Group Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>{language === 'ar' ? 'بيانات المجموعة الأساسية' : 'General Group Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Group Name (English)
              </label>
              <input
                type="text"
                disabled
                value={currentGroup.name}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold cursor-not-allowed min-h-[44px]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                اسم المجموعة (بالعربية)
              </label>
              <input
                type="text"
                disabled
                value={currentGroup.nameAr}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold cursor-not-allowed min-h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* Subscription & Payment Coordinates */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-700" />
            <span>{language === 'ar' ? 'بيانات الاشتراك الشهري والتحصيل' : 'Subscription & Payment Settings'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'قيمة الاشتراك الشهري (JOD)' : 'Monthly Fee (JOD)'} *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'اسم كليك المعتمد (CliQ Alias)' : 'CliQ Fund Alias'} *
              </label>
              <input
                type="text"
                required
                value={cliqAlias}
                onChange={(e) => setCliqAlias(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-emerald-800 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'يوم الاستحقاق الشهري' : 'Due Day of Month'}
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={dueDay}
                onChange={(e) => setDueDay(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'رابط محادثة مجموعة الواتساب' : 'WhatsApp Group Invite Link'}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={waLink}
                  onChange={(e) => setWaLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                {language === 'ar' ? 'هاتف المحفظة / الاتصال بالمدير' : 'Manager Wallet Phone'}
              </label>
              <input
                type="text"
                value={phoneContact}
                onChange={(e) => setPhoneContact(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* Multi-Manager Governance (Section 2C: 6 managers with synchronized info) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                <span>{language === 'ar' ? 'مدراء المجموعة المصرح لهم' : 'Authorized Group Managers'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ar'
                  ? 'جميع المدراء الـ 6 يشتركون بنفس الصلاحيات وتتزامن إجراءاتهم تلقائياً'
                  : 'All managers in this group share synchronized real-time permissions.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {managers.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {language === 'ar' && m.nameAr ? m.nameAr : m.name}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                      {m.phone}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 min-h-[44px] shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveChanges}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

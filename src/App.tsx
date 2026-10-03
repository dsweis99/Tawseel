import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { GroupManagerDashboard } from './components/dashboards/GroupManagerDashboard';
import { MemberDashboard } from './components/dashboards/MemberDashboard';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { MemberProfileView } from './components/dashboards/MemberProfileView';
import { MembersList } from './components/members/MembersList';
import { PaymentReviewsQueue } from './components/payments/PaymentReviewsQueue';
import { ReportsView } from './components/reports/ReportsView';
import { GroupSettingsView } from './components/groups/GroupSettingsView';
import { ActivityLogView } from './components/activity/ActivityLogView';
import { PaymentProofModal } from './components/payments/PaymentProofModal';
import { UploadPaymentModal } from './components/payments/UploadPaymentModal';
import { MemberProfileModal } from './components/members/MemberProfileModal';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  User,
  Settings,
  Home,
  Clock,
  Activity,
  Layers,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    selectedProofForReview,
    setSelectedProofForReview,
    selectedMemberForProfile,
    setSelectedMemberForProfile,
    t,
    language,
  } = useApp();

  // Render view depending on role and active tab
  const renderContent = () => {
    if (currentUser.role === 'member') {
      switch (activeTab) {
        case 'home':
        case 'subscription':
        case 'history':
          return <MemberDashboard />;
        case 'profile':
          return <MemberProfileView />;
        default:
          return <MemberDashboard />;
      }
    }

    if (currentUser.role === 'super_admin' || currentUser.role === 'platform_admin') {
      switch (activeTab) {
        case 'dashboard':
        case 'groups':
        case 'managers':
          return <SuperAdminDashboard />;
        case 'members':
          return <MembersList />;
        case 'subscriptions':
        case 'payments':
          return <PaymentReviewsQueue />;
        case 'reports':
          return <ReportsView />;
        case 'activity':
          return <ActivityLogView />;
        default:
          return <SuperAdminDashboard />;
      }
    }

    // Group Manager
    switch (activeTab) {
      case 'dashboard':
        return <GroupManagerDashboard />;
      case 'members':
        return <MembersList />;
      case 'payments':
        return <PaymentReviewsQueue />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <GroupSettingsView />;
      case 'activity':
        return <ActivityLogView />;
      default:
        return <GroupManagerDashboard />;
    }
  };

  // Mobile Bottom Tab destinations (3 to 4 destinations max, 44px min touch target)
  const getMobileTabs = () => {
    if (currentUser.role === 'member') {
      return [
        { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
        { id: 'subscription', label: t.navMySubscription, icon: <CreditCard className="w-5 h-5" /> },
        { id: 'history', label: t.navPaymentHistory, icon: <Clock className="w-5 h-5" /> },
        { id: 'profile', label: t.navProfile, icon: <User className="w-5 h-5" /> },
      ];
    }
    if (currentUser.role === 'group_manager') {
      return [
        { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'members', label: t.navMembers, icon: <Users className="w-5 h-5" /> },
        { id: 'payments', label: language === 'ar' ? 'الإيصالات' : 'Reviews', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'reports', label: language === 'ar' ? 'التقارير' : 'Reports', icon: <FileText className="w-5 h-5" /> },
      ];
    }
    // Super & Platform Admin
    return [
      { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'members', label: t.navMembers, icon: <Users className="w-5 h-5" /> },
      { id: 'reports', label: language === 'ar' ? 'التقارير' : 'Reports', icon: <FileText className="w-5 h-5" /> },
      { id: 'activity', label: language === 'ar' ? 'السجل' : 'Audit', icon: <Activity className="w-5 h-5" /> },
    ];
  };

  const mobileTabs = getMobileTabs();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 lg:pb-8">
      {/* Top Bar (One row, 3-zone contract) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {renderContent()}
      </main>

      {/* Footer: Quiet copyright and operational statement */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 py-4 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">{t.appName}</span>
            <span>·</span>
            <span>{t.appTagline}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            JoPACC CliQ Ready · Jo-Delivery Standards
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar (Natural Thumb Zone, 15% Max Height Cap) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
          {mobileTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
                  isActive ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-100'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-700 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-1 line-clamp-1">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Modals & Notifications */}
      <PaymentProofModal
        proof={selectedProofForReview}
        onClose={() => setSelectedProofForReview(null)}
      />

      <MemberProfileModal
        member={selectedMemberForProfile}
        onClose={() => setSelectedMemberForProfile(null)}
      />

      <UploadPaymentModal />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

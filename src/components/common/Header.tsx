import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Globe,
  ChevronDown,
  Check,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { MOCK_USERS } from '../../data/mockData';
import { StatusIndicator } from './StatusIndicator';

export const Header: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    activeTab,
    setActiveTab,
    currentGroup,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications for current user
  const userNotifications = notifications.filter(
    (n) =>
      n.recipientId === currentUser.id ||
      (currentUser.role === 'group_manager' && n.recipientId === 'all_managers') ||
      (currentUser.role === 'super_admin')
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Role nav links
  const getNavLinks = () => {
    if (currentUser.role === 'super_admin') {
      return [
        { id: 'dashboard', label: t.navDashboard },
        { id: 'groups', label: t.navGroups },
        { id: 'managers', label: t.navManagers },
        { id: 'members', label: t.navMembers },
        { id: 'subscriptions', label: t.navSubscriptions },
        { id: 'reports', label: t.navReports },
        { id: 'activity', label: t.navActivity },
      ];
    }
    if (currentUser.role === 'platform_admin') {
      return [
        { id: 'dashboard', label: t.navDashboard },
        { id: 'groups', label: t.navGroups },
        { id: 'managers', label: t.navManagers },
        { id: 'members', label: t.navMembers },
        { id: 'subscriptions', label: t.navSubscriptions },
        { id: 'reports', label: t.navReports },
      ];
    }
    if (currentUser.role === 'group_manager') {
      return [
        { id: 'dashboard', label: t.navDashboard },
        { id: 'members', label: t.navMembers },
        { id: 'payments', label: t.navPayments },
        { id: 'reports', label: t.navReports },
        { id: 'settings', label: t.navSettings },
      ];
    }
    // Member
    return [
      { id: 'home', label: t.navHome },
      { id: 'subscription', label: t.navMySubscription },
      { id: 'history', label: t.navPaymentHistory },
      { id: 'profile', label: t.navProfile },
    ];
  };

  const navLinks = getNavLinks();

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <span className="text-purple-700 dark:text-purple-400 font-semibold text-[11px] sm:text-xs">{t.superAdmin}</span>;
      case 'platform_admin':
        return <span className="text-blue-700 dark:text-blue-400 font-semibold text-[11px] sm:text-xs">{t.platformAdmin}</span>;
      case 'group_manager':
        return <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] sm:text-xs">{t.groupManager}</span>;
      default:
        return <span className="text-slate-600 dark:text-slate-300 font-semibold text-[11px] sm:text-xs">{t.member}</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center min-w-0">
            <button
              onClick={() => setActiveTab(currentUser.role === 'member' ? 'home' : 'dashboard')}
              className="text-left rtl:text-right group flex items-center gap-2 sm:gap-2.5 min-h-[44px] min-w-0"
              aria-label="Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-xs shrink-0">
                W
              </div>
              <div className="min-w-0">
                <span className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 block leading-tight truncate">
                  {t.appName}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium block leading-none truncate max-w-[130px] sm:max-w-[180px]">
                  {currentUser.role === 'member'
                    ? (language === 'ar' ? currentGroup.nameAr : currentGroup.name)
                    : (currentUser.role === 'group_manager' ? (language === 'ar' ? currentGroup.nameAr : currentGroup.name) : 'SaaS Platform')}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Role Switcher, Notifications, Language) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 min-h-[44px] min-w-[44px] justify-center transition-colors"
              title="Toggle English / Arabic"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">{language === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            {/* Appearance switcher — familiar sun/moon control with explicit accessible label */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              title={theme === 'light' ? (language === 'ar' ? 'الوضع الداكن' : 'Dark mode') : (language === 'ar' ? 'الوضع الفاتح' : 'Light mode')}
              aria-label={theme === 'light' ? (language === 'ar' ? 'تفعيل الوضع الداكن' : 'Enable dark mode') : (language === 'ar' ? 'تفعيل الوضع الفاتح' : 'Enable light mode')}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Notification Center */}
            <div className="relative" ref={notifDropdownRef}>
              <button
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  setIsRoleDropdownOpen(false);
                }}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label="Notifications"
                aria-expanded={isNotifDropdownOpen}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 rtl:right-auto rtl:left-2 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover (Mobile Responsive Width) */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {language === 'ar' ? 'التنبيهات' : 'Notifications'}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {unreadCount > 0
                          ? `${unreadCount} ${language === 'ar' ? 'غير مقروءة' : 'unread'}`
                          : t.noNotifications}
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:text-emerald-300 font-semibold"
                      >
                        {t.markAsRead}
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {userNotifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        {t.noNotifications}
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3.5 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-emerald-50 dark:bg-emerald-950/40/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                              {language === 'ar' ? notif.titleAr : notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">
                              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {language === 'ar' ? notif.messageAr : notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role / Persona Switcher */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => {
                  setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  setIsNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:pl-2 sm:pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 min-h-[44px] transition-colors"
                aria-label={t.switchRole}
                aria-expanded={isRoleDropdownOpen}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left rtl:text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[110px] md:max-w-[140px]">
                    {language === 'ar' && currentUser.nameAr ? currentUser.nameAr : currentUser.name}
                  </div>
                  <div>{getRoleBadge(currentUser.role)}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500 shrink-0" />
              </button>

              {/* Persona Switcher Dropdown (Constrained for mobile screen width) */}
              {isRoleDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      {t.switchRole}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'اختر دوراً لمعاينة النظام من منظوره' : 'Select a persona to test role permissions'}
                    </span>
                  </div>

                  <div className="py-1 max-h-[60vh] overflow-y-auto">
                    {MOCK_USERS.map((user) => {
                      const isSelected = user.id === currentUser.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            setCurrentUser(user);
                            setIsRoleDropdownOpen(false);
                            if (user.role === 'member') {
                              setActiveTab('home');
                            } else {
                              setActiveTab('dashboard');
                            }
                          }}
                          className={`w-full px-4 py-2.5 text-left rtl:text-right flex items-center justify-between hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors min-h-[44px] ${
                            isSelected ? 'bg-slate-50 dark:bg-slate-950' : ''
                          }`}
                        >
                          <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {language === 'ar' && user.nameAr ? user.nameAr : user.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                              {getRoleBadge(user.role)}
                              {user.id === 'member_demo_unpaid' && (
                                <StatusIndicator status="unpaid" size="sm" showIcon={false} />
                              )}
                              {user.id === 'member_demo_pending' && (
                                <StatusIndicator status="pending_review" size="sm" showIcon={false} />
                              )}
                              {user.id === 'member_demo_paid' && (
                                <StatusIndicator status="paid" size="sm" showIcon={false} />
                              )}
                              {user.id === 'member_demo_rejected' && (
                                <StatusIndicator status="rejected" size="sm" showIcon={false} />
                              )}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Subnav Header (Touch scrollable) */}
      <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 min-h-[38px] flex items-center transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

import React, { useEffect, useState } from 'react';
import { Settings as SettingsIcon, User, Bell, ShieldCheck, HelpCircle, Save } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Settings: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Settings | SmartCart';
  }, []);

  // User preferences
  const [preferences, setPreferences] = useState({
    notifications: {
      expiryAlerts: true,
      budgetAlerts: true,
      weeklyReports: false,
    },
    display: {
      darkMode: false,
      compactView: false,
    },
    budget: {
      startDay: 1, // Monday
      defaultPeriod: 'monthly',
    }
  });

  // Personal info
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof typeof preferences.notifications) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      }
    });
  };

  // Handle display toggle
  const handleDisplayToggle = (key: keyof typeof preferences.display) => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        [key]: !preferences.display[key],
      }
    });
  };

  // Handle budget preference change
  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      budget: {
        ...preferences.budget,
        [name]: name === 'startDay' ? parseInt(value, 10) : value,
      }
    });
  };

  // Handle personal info change
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  return (
    <div className="pt-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card 
            title="Account Settings" 
            subtitle="Manage your personal information"
            icon={<User size={24} />}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="pt-2">
                <Button variant="primary" icon={<Save size={16} />}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card 
              title="Notifications" 
              subtitle="Configure your notification preferences"
              icon={<Bell size={24} />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Expiry Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified when food is about to expire</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="expiry-alerts"
                      className="opacity-0 w-0 h-0"
                      checked={preferences.notifications.expiryAlerts}
                      onChange={() => handleNotificationToggle('expiryAlerts')}
                    />
                    <label
                      htmlFor="expiry-alerts"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        preferences.notifications.expiryAlerts ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          preferences.notifications.expiryAlerts ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Budget Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified when you're approaching your budget limit</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="budget-alerts"
                      className="opacity-0 w-0 h-0"
                      checked={preferences.notifications.budgetAlerts}
                      onChange={() => handleNotificationToggle('budgetAlerts')}
                    />
                    <label
                      htmlFor="budget-alerts"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        preferences.notifications.budgetAlerts ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          preferences.notifications.budgetAlerts ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Weekly Reports</h4>
                    <p className="text-sm text-gray-600">Receive a weekly summary of your spending and pantry</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="weekly-reports"
                      className="opacity-0 w-0 h-0"
                      checked={preferences.notifications.weeklyReports}
                      onChange={() => handleNotificationToggle('weeklyReports')}
                    />
                    <label
                      htmlFor="weekly-reports"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        preferences.notifications.weeklyReports ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          preferences.notifications.weeklyReports ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div>
          <Card 
            title="Budget Preferences" 
            subtitle="Configure your budget settings"
            icon={<SettingsIcon size={24} />}
            className="h-full"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Period
                </label>
                <select
                  name="defaultPeriod"
                  value={preferences.budget.defaultPeriod}
                  onChange={handleBudgetChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Start Day
                </label>
                <select
                  name="startDay"
                  value={preferences.budget.startDay}
                  onChange={handleBudgetChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                  <option value={0}>Sunday</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button variant="primary" fullWidth>
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card 
              title="Need Help?" 
              subtitle="Get support for SmartCart"
              icon={<HelpCircle size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  Having trouble with the app? Check out our knowledge base or contact support.
                </p>
                <Button variant="outline" fullWidth>
                  View Help Center
                </Button>
                <Button variant="ghost" fullWidth>
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card 
              title="Privacy & Data" 
              subtitle="Manage your data and privacy"
              icon={<ShieldCheck size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  Control your data and privacy settings for the SmartCart application.
                </p>
                <Button variant="outline" fullWidth>
                  Download My Data
                </Button>
                <Button variant="ghost" fullWidth>
                  Privacy Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
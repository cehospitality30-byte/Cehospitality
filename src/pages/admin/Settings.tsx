import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Bell, Shield, Globe, Database } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      bookingAlerts: true,
      contactAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
    },
    general: {
      siteName: 'Cozmo Cafe Bistro Lounge',
      siteUrl: 'https://cozmocafe.com',
      adminEmail: 'admin@cehospitalitygroup.com',
    },
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <AdminLayout title="Settings" description="Manage admin panel settings">
      <div className="space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts for important events
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="bookingAlerts">Booking Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new bookings are received
                </p>
              </div>
              <Switch
                id="bookingAlerts"
                checked={settings.notifications.bookingAlerts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, bookingAlerts: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="contactAlerts">Contact Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new contact messages arrive
                </p>
              </div>
              <Switch
                id="contactAlerts"
                checked={settings.notifications.contactAlerts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, contactAlerts: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: checked },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: e.target.value },
                  })
                }
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>Website and admin panel settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.general.siteName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, siteName: e.target.value },
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={settings.general.siteUrl}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, siteUrl: e.target.value },
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.general.adminEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, adminEmail: e.target.value },
                  })
                }
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}


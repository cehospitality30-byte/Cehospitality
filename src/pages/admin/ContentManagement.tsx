import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface ContentData {
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutDescription: string;
  };
  about: {
    companyName: string;
    companyDescription: string;
    vision: string;
    mission: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

const initialContent: ContentData = {
  homepage: {
    heroTitle: 'Welcome to Cozmo Cafe',
    heroSubtitle: 'Premium cafe & lounge experience',
    aboutTitle: 'About Cozmo Cafe',
    aboutDescription: 'Welcome to Cozmo Cafe Bistro Lounge – Hyderabad\'s premier destination...',
  },
  about: {
    companyName: 'C E Hospitality',
    companyDescription: 'C E Hospitality is a startup hospitality brand...',
    vision: 'To become the most loved cafe and lounge brand...',
    mission: 'To deliver premium cafe and lounge experiences...',
  },
  contact: {
    address: '2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD, Hyderabad, Telangana 500072',
    phone: '+91 9703266969',
    email: 'sam@cehospitalitygroup.com',
    hours: 'Daily: 9:00 AM – 4:00 AM',
  },
};

export default function ContentManagement() {
  const [content, setContent] = useState<ContentData>(initialContent);
  const [activeTab, setActiveTab] = useState('homepage');

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast.success('Content saved successfully');
  };

  const updateContent = (section: keyof ContentData, field: string, value: string) => {
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    });
  };

  return (
    <AdminLayout title="Content Management" description="Manage website content and text">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          {/* Homepage Content */}
          <TabsContent value="homepage" className="space-y-6">
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl">Hero Section</h3>
              <div>
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={content.homepage.heroTitle}
                  onChange={(e) => updateContent('homepage', 'heroTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Input
                  id="heroSubtitle"
                  value={content.homepage.heroSubtitle}
                  onChange={(e) => updateContent('homepage', 'heroSubtitle', e.target.value)}
                />
              </div>
            </div>
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl">About Section</h3>
              <div>
                <Label htmlFor="aboutTitle">About Title</Label>
                <Input
                  id="aboutTitle"
                  value={content.homepage.aboutTitle}
                  onChange={(e) => updateContent('homepage', 'aboutTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="aboutDescription">About Description</Label>
                <Textarea
                  id="aboutDescription"
                  value={content.homepage.aboutDescription}
                  onChange={(e) => updateContent('homepage', 'aboutDescription', e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          </TabsContent>

          {/* About Page Content */}
          <TabsContent value="about" className="space-y-6">
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl">Company Information</h3>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={content.about.companyName}
                  onChange={(e) => updateContent('about', 'companyName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  value={content.about.companyDescription}
                  onChange={(e) => updateContent('about', 'companyDescription', e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl">Vision & Mission</h3>
              <div>
                <Label htmlFor="vision">Vision</Label>
                <Textarea
                  id="vision"
                  value={content.about.vision}
                  onChange={(e) => updateContent('about', 'vision', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="mission">Mission</Label>
                <Textarea
                  id="mission"
                  value={content.about.mission}
                  onChange={(e) => updateContent('about', 'mission', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          {/* Contact Info */}
          <TabsContent value="contact" className="space-y-6">
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl">Contact Information</h3>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={content.contact.address}
                  onChange={(e) => updateContent('contact', 'address', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={content.contact.phone}
                    onChange={(e) => updateContent('contact', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => updateContent('contact', 'email', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="hours">Opening Hours</Label>
                <Input
                  id="hours"
                  value={content.contact.hours}
                  onChange={(e) => updateContent('contact', 'hours', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}


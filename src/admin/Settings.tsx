import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const Settings = () => {
  const [commissionRate, setCommissionRate] = useState(15); // Default 15%
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [siteTitle, setSiteTitle] = useState('AGA Tech Studios');
  const [siteDescription, setSiteDescription] = useState('Engineering the Digital Future.');

  const saveSettings = () => {
    // In a real app, this would save to a backend
    console.log('Settings saved:', {
      commissionRate,
      maintenanceMode,
      adsEnabled,
      siteTitle,
      siteDescription
    });
    
    // Show a success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F6FF]">Settings</h1>
        <p className="text-[#A7B0C8]">Configure site settings and preferences</p>
      </div>

      {/* Site Settings */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteTitle" className="text-[#A7B0C8]">Site Title</Label>
              <Input
                id="siteTitle"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
              />
            </div>
            <div>
              <Label htmlFor="commissionRate" className="text-[#A7B0C8]">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                min="0"
                max="100"
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseInt(e.target.value) || 0)}
                className="bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
              />
              <p className="text-xs text-[#A7B0C8] mt-1">Commission percentage taken from each sale</p>
            </div>
          </div>
          <div>
            <Label htmlFor="siteDescription" className="text-[#A7B0C8]">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-[#F4F6FF]">Advertisement System</Label>
              <p className="text-xs text-[#A7B0C8]">Enable or disable advertisements on the site</p>
            </div>
            <Switch checked={adsEnabled} onCheckedChange={setAdsEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-[#F4F6FF]">Maintenance Mode</Label>
              <p className="text-xs text-[#A7B0C8]">Temporarily disable site for maintenance</p>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>
        </CardContent>
      </Card>

      {/* Advertisement Management */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">Advertisement Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#A7B0C8] mb-4">Add and manage advertisements to boost financials</p>
          <Button className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B]">
            Add New Advertisement
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={saveSettings}
          className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B] px-6"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
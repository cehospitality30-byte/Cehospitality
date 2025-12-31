import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BookingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Reservation Request Received",
      description: "We'll confirm your booking shortly via email or phone.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <Input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="bg-card border-border focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="bg-card border-border focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
          <Input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+123 456 7890"
            required
            className="bg-card border-border focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="2"
              min="1"
              max="20"
              required
              className="bg-card border-border focus:border-primary pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="bg-card border-border focus:border-primary pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Preferred Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="bg-card border-border focus:border-primary pl-10"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Special Requests (Optional)</label>
        <Textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any dietary requirements, special occasions, or preferences..."
          rows={4}
          className="bg-card border-border focus:border-primary resize-none"
        />
      </div>

      <Button type="submit" variant="gold" size="xl" className="w-full">
        <Send className="w-5 h-5 mr-2" />
        Request Reservation
      </Button>
    </form>
  );
}

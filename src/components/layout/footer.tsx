
import Link from 'next/link';
import { Bed, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 8.5v5.5a4 4 0 1 1-4-4V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5Z"/>
        <path d="M11.5 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
        <path d="M13 5v12"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="sm:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4">
                <Bed className="h-7 w-7 text-primary" />
                <span className="text-xl font-headline font-bold text-foreground">
                    ilka Wabe Hotel
                </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Experience comfort, elegance, and tranquility. Your perfect stay awaits.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon /></Link>
              <Link href="#" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors"><WhatsAppIcon /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-md font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/rooms" className="text-muted-foreground hover:text-primary transition-colors">Rooms</Link></li>
              <li><Link href="/bookings" className="text-muted-foreground hover:text-primary transition-colors">Reservation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

           <div>
            <h3 className="text-md font-headline font-semibold mb-4">Contact</h3>
             <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">123 Hotel Avenue, Sheger, Ethiopia</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">(+251) 911 223 344</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">contact@ilkawabehotel.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-headline font-semibold mb-4">Opening Hours</h3>
            <div className="text-sm space-y-3 text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Restaurant:</p>
                <p>7:00 AM - 10:00 PM</p>
              </div>
               <div>
                <p className="font-semibold text-foreground">Booking Desk:</p>
                <p>24/7 Available</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
                <p className="text-center md:text-left">&copy; {currentYear} ilka Wabe Hotel. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Cancellation Policy</Link>
                </div>
                 <p className="text-center md:text-right">Developed by <a href="#" className="hover:text-primary transition-colors font-medium">EvaDevStudio</a></p>
            </div>
        </div>
      </div>
    </footer>
  );
}

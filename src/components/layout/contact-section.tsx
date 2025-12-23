import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="bg-secondary/50 py-12 md:py-20 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help you with any questions or to assist with your booking.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>123 Hotel Avenue, Sheger, Ethiopia</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>(+251) 911 223 344</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>contact@ilkawabehotel.com</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15781.879339171917!2d39.26536186738281!3d8.550737409813138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1fda21fb07d5%3A0x51e32f233a33b318!2sIlka%20Wabe%20Hotel!5e0!3m2!1sen!2set!4v1766474911782!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

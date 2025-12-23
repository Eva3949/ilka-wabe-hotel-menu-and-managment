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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.07663479824!2d38.69176344335939!3d9.0222046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1720539315578!5m2!1sen!2sus"
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

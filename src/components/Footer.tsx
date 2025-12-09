import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.jpeg';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="IZ Institut" 
                className="h-12 w-12 rounded-full object-cover shadow-soft"
              />
              <span className="text-xl font-bold text-gradient">IZ_Institut</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('nav.courses')}</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/course/nursing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('course.nursing')}
              </Link>
              <Link to="/course/pharmacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('course.pharmacy')}
              </Link>
              <Link to="/course/laboratory" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('course.laboratory')}
              </Link>
              <Link to="/course/emergency" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('course.emergency')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('nav.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">+213 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@iz-institut.dz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} IZ_Institut. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

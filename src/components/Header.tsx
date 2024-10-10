import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  logoSrc: string;
  companyName: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, companyName }) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="fixed z-10 top-0 w-full flex items-center justify-between p-3 bg-custom-brown text-white">
      <div className="relative h-4 mt-2">
        <div className="absolute -top-1 -right-5 w-16 h-16 bee-animation">
          <a href="/">
            <img 
              src={logoSrc} 
              alt="Company Logo" 
              className="h-15 w-auto" 
            />
          </a>
        </div>
        {/* Second bee */}
        <div className="absolute top-1 left-0 w-16 h-16 bee-animation">
          <a href="/">
            <img 
              src={logoSrc} 
              alt="Company Logo" 
              className="h-15 w-auto" 
            />
          </a>
        </div>
        {/* Third bee */}
        <div className="absolute top-9 right-0 w-16 h-16 bee-animation">
          <a href="/">
            <img 
              src={logoSrc} 
              alt="Company Logo" 
              className="h-15 w-auto" 
            />
          </a>
        </div>
      </div>
      <a href="/">
        <h1 className="text-2xl font-bold flex-1 text-center">{companyName}</h1>
      </a>
      <div className="flex space-x-2">
        <img
          src="/nl_flag.webp"
          alt="Dutch"
          className="h-8 w-8 object-contain cursor-pointer"
          title="Dutch"
          onClick={() => handleChangeLanguage('nl')}
        />
        <img
          src="/uk_flag.png"
          alt="English"
          className="h-8 w-8 object-contain cursor-pointer"
          title="English"
          onClick={() => handleChangeLanguage('en')}
        />
        <img
          src="/br_flag.png"
          alt="Portuguese"
          className="h-8 w-8 object-contain cursor-pointer"
          title="Portuguese"
          onClick={() => handleChangeLanguage('pt')}
        />
         <img
          src="/de_flag.png"
          alt="Portuguese"
          className="h-8 w-8 object-contain cursor-pointer"
          title="Portuguese"
          onClick={() => handleChangeLanguage('de')}
        />
      </div>
    </header>
  );
};

export default Header;

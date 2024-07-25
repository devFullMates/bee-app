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
    <header className="flex items-center justify-between p-4 bg-custom-brown text-white">
      <img src={logoSrc} alt="Company Logo" className="h-10 w-auto" />
      <h1 className="text-2xl font-bold flex-1 text-center">{companyName}</h1>
      <div className="flex space-x-2">
        <img
          src="/nl_flag.webp"
          alt="Dutch"
          className="h-6 w-6 object-contain cursor-pointer"
          title="Dutch"
          onClick={() => handleChangeLanguage('nl')}
        />
        <img
          src="/uk_flag.png"
          alt="English"
          className="h-6 w-6 object-contain cursor-pointer"
          title="English"
          onClick={() => handleChangeLanguage('en')}
        />
        <img
          src="/br_flag.png"
          alt="Portuguese"
          className="h-6 w-6 object-contain cursor-pointer"
          title="Portuguese"
          onClick={() => handleChangeLanguage('pt')}
        />
         <img
          src="/de_flag.png"
          alt="Portuguese"
          className="h-6 w-6 object-contain cursor-pointer"
          title="Portuguese"
          onClick={() => handleChangeLanguage('de')}
        />
      </div>
    </header>
  );
};

export default Header;

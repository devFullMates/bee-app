import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface CardProps {
  productName: string;
  productImage: string;
  description: React.ReactNode;
  isInStock: boolean;
  onNotify: (email: string) => void;
}

const Card: React.FC<CardProps> = ({
  productName,
  productImage,
  description,
  isInStock,
  onNotify,
}) => {
  const [email, setEmail] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { t } = useTranslation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNotifyClick = () => {
    if (isValidEmail(email)) {
      onNotify(email);
      setEmail("");
      setEmailError("");
      setShowNotifyModal(false);
    } else {
      setEmailError(t("invalidEmail"));
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal((prev) => !prev);
  };

  const handleToggleNotifyModal = () => {
    setShowNotifyModal((prev) => !prev);
  };

  const translatedName = t(`products.${productName}.name`, {
    defaultValue: productName,
  });

  const translatedDescription: React.ReactNode = t(`products.${productName}.description`, {
    defaultValue: description,
  });

  return (
    <div className="w-full max-w-xs bg-opacity-80 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-[465px]">
      <h2 className="text-lg font-bold text-center mb-2">{translatedName}</h2>
      <img
        src={productImage}
        alt={translatedName}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-center">
        <span
          className="text-yellow-500 text-center font-bold underline cursor-pointer"
          onClick={handleToggleInfoModal}
        >
          {t("moreInfo")}
        </span>
      </p>

      <div
        className={`flex items-center justify-center font-bold ${
          isInStock ? "text-green-500 text-xl mb-4" : "text-red-500"
        }`}
      >
        {isInStock ? (
          <div className="flex items-center space-x-2">
            <img src="/bee.png" alt={t("inStock")} className="h-12 w-auto" />
            <span>{t("inStock")}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <img src="/sad-bee.webp" alt={t("outOfStock")} className="h-12 w-auto" />
              <span className="text-xl">{t("outOfStock")}</span>
            </div>
            <button
              className="bg-custom-orange cursor-pointer text-white p-1 rounded-md hover:bg-brown-700 transition duration-300 w-full"
              onClick={handleToggleNotifyModal}
            >
              {t("notifyMe")}
            </button>
          </div>
        )}
      </div>

      {showInfoModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={handleToggleInfoModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{translatedName}</h2>
              <span
                onClick={handleToggleInfoModal}
                className="text-red-500 font-bold cursor-pointer"
              >
                {t("X")}
              </span>
            </div>
            <div className="text-gray-700">{translatedDescription}</div>
          </div>
        </div>
      )}

      {showNotifyModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={handleToggleNotifyModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t("Notify me")}</h2>
              <span
                onClick={handleToggleNotifyModal}
                className="text-red-500 cursor-pointer font-bold"
              >
                {t("X")}
              </span>
            </div>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <div className="text-red-500 text-sm mb-2">{emailError}</div>
            )}
            <button
              onClick={handleNotifyClick}
              className="bg-custom-orange text-white p-2 rounded-md hover:bg-brown-700 transition duration-300 w-full"
            >
              {t("notifyMe")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

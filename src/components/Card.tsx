import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

interface CardProps {
  productId: string;
  productName: string;
  productImage: string;
  description: React.ReactNode;
  isInStock: boolean;
  onNotify: (email: string, productId: string) => void;
}

const Card: React.FC<CardProps> = ({
  productId,
  productName,
  productImage,
  description,
  isInStock,
  onNotify,
}) => {
  const [email, setEmail] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useTranslation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleNotifyClick = () => {
    if (email !== "" && validator.isEmail(email)) {
      onNotify(email, productId);
      setShowNotifyModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal((prev) => !prev);
  };

  const handleToggleNotifyModal = () => {
    setShowNotifyModal((prev) => !prev);
    setEmail("");
  };

  const handleToggleSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const translatedName = t(`products.${productName}.name`, {
    defaultValue: productName,
  });

  const translatedDescription: React.ReactNode = t(
    `products.${productName}.description`,
    {
      defaultValue: description,
    }
  );

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
              <img
                src="/sad-bee.webp"
                alt={t("outOfStock")}
                className="h-12 w-auto"
              />
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
                className="text-red-900 text-xl cursor-pointer font-bold"
              >
                {t("X")}
              </span>
            </div>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className={`border p-2 rounded-md w-full mb-0.5 ${
                email === "" || validator.isEmail(email)
                  ? "border-green-500"
                  : "border-red-500"
              }`}
              value={email}
              onChange={handleEmailChange}
            />
            {email !== "" && !validator.isEmail(email) && (
              <span className="text-red-500 text-sm p-1 font-semibold">
                {t("This is not a valid email ")}<span className="text-lg">&#128683;</span>
              </span>
            )}
            {email !== "" && validator.isEmail(email) && (
              <span className="text-green-500 text-sm p-1 font-semibold">
                {t("This is a valid email ")}<span className="text-lg">&#128079;</span>
              </span>
            )}
            <button
              onClick={handleNotifyClick}
              disabled={email !== "" && !validator.isEmail(email)}
              className={`text-white p-2 mt-2 rounded-md transition duration-300 w-full ${
                email !== "" && !validator.isEmail(email)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-custom-orange hover:bg-brown-700"
              }`}
            >
              {t("notifyMe")}
            </button>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={handleToggleSuccessModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {t("Congrats! You will be notified!")}
              </h2>
              <span
                onClick={handleToggleSuccessModal}
                className="text-red-900 text-xl cursor-pointer font-bold"
              >
                {t("X")}
              </span>
            </div>
            <div className="text-center text-gray-700">
            {t("Don't worry! I've noted the product you want, and we'll notify you at {{email}} when it's back in stock.", { email })}</div>

            <div className="relative h-48 mt-4">
                <img
                  src="/worker-bee.gif"
                  alt="Happy Bee"
                  className="h-full w-full object-none"
                />
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

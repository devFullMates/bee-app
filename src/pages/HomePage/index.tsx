import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../services/contentfulService";
import { Product } from "../../services/types";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
import { registerEmailContentful } from "../../services/contentfulService";
import { throttle } from "lodash";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bees, setBees] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const beesRef = useRef<{ x: number; y: number }[]>([]);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [beeImage, setBeeImage] = useState<HTMLImageElement | null>(null);

  const languageMapping = {
    nl: {
      name: 'productNameDutch',
      description: 'descriptionDutch',
    },
    en: {
      name: 'productNameEnglish',
      description: 'descriptionEnglish',
    },
    pt: {
      name: 'productNamePortuguese',
      description: 'descriptionPortuguese',
    },
    de: {
      name: 'productNameGerman',
      description: 'descriptionGerman',
    },
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    const handleMouseMove = (event: MouseEvent) => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      const newBee = {
        x: event.clientX + scrollX,
        y: event.clientY + scrollY
      };
      
      beesRef.current = [...beesRef.current, newBee];
      if (beesRef.current.length > 6) {
        beesRef.current.shift();
      }
      setBees(beesRef.current);
    };

    const throttledMouseMove = throttle(handleMouseMove, 50);
    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = '/bee.png';
    img.onload = () => setBeeImage(img);
  }, []);

  if (!beeImage) return null;

  const handleNotify = async (email: string, productId: string) => {
    try {
      await registerEmailContentful(email, productId, currentLanguage);
    } catch (error) {
      console.error("Failed to submit notification request", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
          {products.map((product) => {
            const selectedLanguage = languageMapping[currentLanguage as keyof typeof languageMapping] || languageMapping.nl;
            const productName = product[selectedLanguage.name as keyof Product] as string || "";
            const productDescription = product[selectedLanguage.description as keyof Product] as string || "";

            return (
              <Card
                key={product.id}
                productId={product.id}
                productName={productName}
                productImage={product.image.url}
                description={productDescription || t("noDescription")}
                isInStock={product.isInStock}
                onNotify={handleNotify}
              />
            );
          })}

          {bees.map((bee, index) => {
            const scrollY = window.scrollY || window.pageYOffset;
            const adjustedY = bee.y - scrollY;
            
            return (
              <img
                key={index}
                src="/bee.png"
                alt="Flying bee"
                style={{
                  position: 'fixed',
                  left: `${bee.x}px`,
                  top: `${adjustedY}px`,
                  width: '20px',
                  height: '20px',
                  pointerEvents: 'none',
                  transform: `translate(-50%, -50%)`,
                  transition: 'all 0.1s ease-out',
                  zIndex: 1000
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomePage;

import React from 'react';
import Card from "../../components/Card";
import productsData from '../../locales/nl/translation.json';

const HomePage: React.FC = () => {
  const handleNotify = (email: string) => {
    alert(`Notification request submitted for: ${email}`);
  };

  const getImageSrc = (imagePath: string) => {
    return new URL(`../../${imagePath}`, import.meta.url).href;
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
      {Object.entries(productsData.products).map(([key, product], index) => (
        <Card
          key={index}
          productName={product.name}
          productImage={getImageSrc(product.productImage)}
          description={product.description}
          isInStock={product.isInStock}
          onNotify={handleNotify}
        />
      ))}
    </div>
  );
};

export default HomePage;

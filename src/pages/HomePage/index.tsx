import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "../../services/contentfulGraphQLService";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Card from "../../components/Card";
import { createEmail } from "../../services/contentfulGraphQLService";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const handleNotify = async (email: string, productId: string) => {
    try {
      await createEmail(email, productId);
    } catch (error) {
      console.error("Failed to submit notification request", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          productId={product.id} 
          productName={product.name}
          productImage={product.image.url}
          description={documentToReactComponents(product.description.json, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => (
                <p className="text-gray-700">{children}</p>
              ),
            },
          })}
          isInStock={product.isInStock}
          onNotify={handleNotify}
        />
      ))}
    </div>
  );
};

export default HomePage;

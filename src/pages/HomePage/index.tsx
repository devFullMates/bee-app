import React, { useEffect, useState } from "react";
import { fetchProducts, Product, updateProductEmails } from "../../services/contentfulGraphQLService";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Card from "../../components/Card";

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
      const product = products.find((p) => p.id === productId);
      if (!product) return;
  
      const existingEmails = product.notifyEmails[productId] || [];
  
      if (!existingEmails.includes(email)) {
        const updatedEmails = { ...product.notifyEmails, [productId]: [...existingEmails, email] };
  
        await updateProductEmails(productId, updatedEmails);
        alert(`Notification request submitted for: ${email}`);
      } else {
        alert(`You are already subscribed to notifications for this product.`);
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    }
  };
  

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
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
          onNotify={(email) => handleNotify(email, product.id)}
        />
      ))}
    </div>
  );
};

export default HomePage;

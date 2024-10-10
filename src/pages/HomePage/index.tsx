import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "../../services/contentfulGraphQLService";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Card from "../../components/Card";
import { registerEmailContentful } from "../../services/contentfulGraphQLService";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bees, setBees] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();

    let animationFrameId: number;

  const handleMouseMove = (event: MouseEvent) => {
    const newBee = { x: event.clientX, y: event.clientY };
    setBees((prev) => {
      const updatedBees = [...prev, newBee];
      if (updatedBees.length > 6) {
        updatedBees.shift();
      }
      return updatedBees;
    });
    animationFrameId = requestAnimationFrame(() => {});
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(animationFrameId);
  };
  }, []);

  const handleNotify = async (email: string, productId: string) => {
    try {
      await registerEmailContentful(email, productId);
    } catch (error) {
      console.error("Failed to submit notification request", error);
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
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
      
      {bees.map((bee, index) => (
        <img
          key={index}
          src="/bee.png"
          alt="bee"
          className="absolute w-8 h-8 pointer-events-none"
          style={{
            left: bee.x,
            top: bee.y,
            transform: "translate(-50%, -50%)",
            transition: "left 0.1s, top 0.1s",
          }}
        />
      ))}
    </div>
  );
};

export default HomePage;

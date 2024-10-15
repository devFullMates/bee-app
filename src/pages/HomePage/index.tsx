import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/contentfulService";
import { Product } from "../../services/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Card from "../../components/Card";
import { registerEmailContentful } from "../../services/contentfulService";
import { throttle } from "lodash";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bees, setBees] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
      const newBee = { x: event.clientX, y: event.clientY };
      setBees((prev) => {
        const updatedBees = [...prev, newBee];
        if (updatedBees.length > 6) {
          updatedBees.shift();
        }
        return updatedBees;
      });
    };

    const throttledMouseMove = throttle(handleMouseMove, 100);
    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative flex flex-col sm:flex-row flex-wrap justify-center items-center p-6 gap-6">
          {products.map((product) => (
        <Card
          key={product.id}
          productId={product.id}
          productName={product.name}
          productImage={product.image.url}
          description={
            product.description
              ? documentToReactComponents(product.description.json, {
                  renderNode: {
                    [BLOCKS.PARAGRAPH]: (node, children) => (
                      <p className="text-gray-700">{children}</p>
                    ),
                  },
                })
              : <p>{t("noDescription")}</p>
          }
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
              loading="lazy"
              style={{
                left: bee.x,
                top: bee.y,
                transform: "translate(-50%, -50%)",
                transition: "left 0.1s, top 0.1s",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;

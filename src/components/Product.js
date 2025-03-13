import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MIN_RATING = 1;
const MAX_RATING = 5;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
    setIsMounted(true); // Mark component as mounted
  }, []);

  const formattedPrice = `${price.toFixed(2)}`;

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price: parseFloat(price.toFixed(2)), // Round price to 2 decimal places
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    // Sending the product as an action to the REDUX store (the basket slice)
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        width={200}
        height={200}
        alt="random product image"
        style={{ objectFit: "contain" }} // No cropping, but might leave gaps
        className="w-[200px] h-[200px] bg-white p-2" // Add padding or background color
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs mt-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <p>{formattedPrice}</p>
      </div>

      {/* Render Prime image only after hydration */}
      {isMounted && hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            className="w-12"
            src="https://upload.wikimedia.org/wikipedia/commons/7/72/Amazon_Prime_logo_%282022%29.svg"
            width={50}
            height={50}
            alt="Amazon Prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;

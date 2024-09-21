import Image from "next/image";
import React from "react";
const Card = ({ title, description, price }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            fill
            style={{ objectFit: "cover" }}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{price}</div>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export const SIZE_VARIANTS = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

const ProductCard = ({ 
  product, 
  addToCart,
  showVariantOptions = true,
  variantOptions = []
}) => {
  const {
    id,
    title,
    price,
    image,
    description,
    available = true
  } = product;

  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100">
        <div className="card-img-container" style={{ height: '300px', overflow: 'hidden' }}>
          <img
            className="card-img-top p-3 img-fluid"
            src={image}
            alt={title}
            style={{ 
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {title.length > 12 ? `${title.substring(0, 12)}...` : title}
          </h5>
          <p className="card-text flex-grow-1">
            {description.length > 90 
              ? `${description.substring(0, 90)}...` 
              : description}
          </p>

          {showVariantOptions && variantOptions.length > 0 && (
            <div className="mb-3">
              <select className="form-select form-select-sm">
                {variantOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-auto">
            <div className="list-group-item lead mb-3">${price.toFixed(2)}</div>

            <div className="d-flex justify-content-center">
              <Link
                to={`/product/${id}`}
                className="btn btn-dark m-1 flex-grow-1"
              >
                View Details
              </Link>
              
              {available ? (
                <button
                  className="btn btn-dark m-1 flex-grow-1"
                  onClick={() => {
                    toast.success("Added to cart");
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <button 
                  className="btn btn-outline-secondary m-1 flex-grow-1" 
                  disabled
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
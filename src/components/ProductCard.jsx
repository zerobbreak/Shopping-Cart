// ProductCard.js
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/shop/${product.id}`}
      className="group bg-surface rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden p-8 bg-white flex items-center justify-center">
        <img
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h2 className="text-sm font-bold text-primary mb-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {product.title}
        </h2>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-lg font-bold text-primary">${product.price}</p>
          <span className="text-xs font-medium text-secondary group-hover:text-accent transition-colors flex items-center gap-1">
            View Details <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;

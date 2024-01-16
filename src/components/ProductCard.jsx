// ProductCard.js
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const shortenContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength).trim() + "..."
      : content;
  };

  return (
    <Link to={`/shop/${product.id}`} className="w-64 h-96 m-5 shadow p-8">
      <img className="w-24" src={product.image} alt={product.title} />
      <h2 className="text-base font-bold">
        {shortenContent(product.title, 20)}
      </h2>
      <p className="font-light mt-5">{product.category}</p>
      <p className="text-sm font-light my-3">{shortenContent(product.description, 50)}</p>
      <p>${product.price}</p>
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

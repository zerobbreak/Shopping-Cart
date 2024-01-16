import PropTypes from "prop-types";

const FeaturedCard = ({ title, image, category}) => {
  return (
  <div className="w-56 rounded-sm flex flex-col justify-center items-center">
    <img className="w-28 rounded mb-4" src={image} alt="" />
    <h3 className="text-1xl font-medium ml-2">{title}</h3>
    <p>{category}</p>
  </div>
  );
};

FeaturedCard.propTypes = {
    title: PropTypes.string, 
    image: PropTypes.string, 
    category: PropTypes.string,
}

export default FeaturedCard;

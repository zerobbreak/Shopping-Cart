import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogPost = ({ date, title, para, image }) => {
  const MAX_CONTENT_LENGTH = 150; //Adjust the character limit as needed

  const shortenContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength).trim() + "..."
      : content;
  };

  return (
    <div>
      <img className="w-64 rounded-xl" src={image} alt="blog image" />
      <p className="text-sm font-light my-2">{date}</p>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="font-light my-2 mb-7">{shortenContent(para, MAX_CONTENT_LENGTH)}</p>
      <Link className="underline mt-10 shadow rounded p-2 px-10" to="/blog">
        Read more
      </Link>
    </div>
  );
};

BlogPost.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  para: PropTypes.string,
  image: PropTypes.string,
};

export default BlogPost;

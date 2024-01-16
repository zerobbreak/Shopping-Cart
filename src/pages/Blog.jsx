import Navbar from "../components/Navbar";
import BlogPost from "../components/BlogPost";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: '/assets/background-image.jpg',
      date: 'January 1, 2022',
      headline: 'Exploring the Wonders of React',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 2,
      image: '/assets/blog-2.jpg',
      date: 'February 15, 2022',
      headline: 'Getting Started with Tailwind CSS',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 3,
      image: '/assets/blog-3.jpg',
      date: 'March 10, 2022',
      headline: 'Building a Responsive Web Design',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ];

  return (
    <div className="w-full h-full ">
      <Navbar />
      <h2 className="text-center text-2xl font-bold mt-5">Blog</h2>
      <div className="flex justify-center items-center gap-20 p-8 mt-7">
        {blogPosts.map((item) => (
          <BlogPost key={item.id} date={item.date} title={item.headline} para={item.content} image={item.image}/>
        ))}
      </div>
    </div>
  );
};

export default Blog;

import Footer from '../components/footer';
import Header from '../components/header';

export default function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: "Latest Trends in Sneakers 2025",
      summary: "Discover the hottest sneaker trends this year and how to style them.",
      date: "October 17, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500213/shoe-16_mtgrir.png"
    },
    {
      id: 2,
      title: "How to Care for Your Shoes",
      summary: "A complete guide to keep your sneakers looking brand new.",
      date: "October 15, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-2_ftuwjg.png"
    },
    {
      id: 3,
      title: "Top 5 Must-Have Accessories",
      summary: "Enhance your outfit with these trending accessories.",
      date: "October 10, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500213/shoe-6_astyfl.png"
    },
    {
      id: 4, // Fixed duplicate IDs in your array
      title: "Latest Trends in Sneakers 2025",
      summary: "Discover the hottest sneaker trends this year and how to style them.",
      date: "October 17, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-1_n1chzz.png"
    },
    {
      id: 5,
      title: "How to Care for Your Shoes",
      summary: "A complete guide to keep your sneakers looking brand new.",
      date: "October 15, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759510265/i7cjmhdpiinynrfdmogf.png "
    },
    {
      id: 6,
      title: "Top 5 Must-Have Accessories",
      summary: "Enhance your outfit with these trending accessories.",
      date: "October 10, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500213/shoe-6_astyfl.png"
    },
    {
      id: 7,
      title: "Latest Trends in Sneakers 2025",
      summary: "Discover the hottest sneaker trends this year and how to style them.",
      date: "October 17, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-2_ftuwjg.png"
    },
    {
      id: 8,
      title: "How to Care for Your Shoes",
      summary: "A complete guide to keep your sneakers looking brand new.",
      date: "October 15, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500214/shoe-23_f2iggz.png"
    },
    {
      id: 9,
      title: "Top 5 Must-Have Accessories",
      summary: "Enhance your outfit with these trending accessories.",
      date: "October 10, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-2_ftuwjg.png"
    }
  ];

  return (
    <>
      <Header />
      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto my-[100px] px-8 font-sans">
        
        {/* Title */}
        <h1 className="text-center text-4xl font-bold mb-12 text-gray-800">
          Explore Products
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="w-full h-[200px] bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="max-w-[80%] max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {post.date}
                  </span>
                  <button className="text-xs font-bold text-gray-900 hover:underline">
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
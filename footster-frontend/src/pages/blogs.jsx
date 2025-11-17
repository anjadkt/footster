import Header from '../components/header';
import '../styles/blog.css'

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
      id: 1,
      title: "Latest Trends in Sneakers 2025",
      summary: "Discover the hottest sneaker trends this year and how to style them.",
      date: "October 17, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-1_n1chzz.png"
    },
    {
      id: 2,
      title: "How to Care for Your Shoes",
      summary: "A complete guide to keep your sneakers looking brand new.",
      date: "October 15, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759510265/i7cjmhdpiinynrfdmogf.png "
    },
    {
      id: 3,
      title: "Top 5 Must-Have Accessories",
      summary: "Enhance your outfit with these trending accessories.",
      date: "October 10, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500213/shoe-6_astyfl.png"
    },
     {
      id: 1,
      title: "Latest Trends in Sneakers 2025",
      summary: "Discover the hottest sneaker trends this year and how to style them.",
      date: "October 17, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-2_ftuwjg.png"
    },
    {
      id: 2,
      title: "How to Care for Your Shoes",
      summary: "A complete guide to keep your sneakers looking brand new.",
      date: "October 15, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500214/shoe-23_f2iggz.png"
    },
    {
      id: 3,
      title: "Top 5 Must-Have Accessories",
      summary: "Enhance your outfit with these trending accessories.",
      date: "October 10, 2025",
      img: "https://res.cloudinary.com/dcsmtagf7/image/upload/v1759500212/shoe-2_ftuwjg.png"
    }
  ];

  return (
    <>
      <Header />
      <main className="blog-container">
        <h1 className="blog-title">Explore Products</h1>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="image-container">
                <img src={post.img} alt={post.title} />
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-summary">{post.summary}</p>
              <span className="post-date">{post.date}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

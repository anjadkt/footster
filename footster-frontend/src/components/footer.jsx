export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-3xl font-black tracking-tighter italic">FootSter.</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Step into style. Premium footwear for everyday champions.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-gray-900 uppercase tracking-wider text-xs md:text-sm">Shop</h4>
          <ul className="space-y-3 text-gray-500 text-sm font-medium">
            <li><a href="/products" className="hover:text-black transition-colors">All Products</a></li>
            <li><a href="/products?category=casuals" className="hover:text-black transition-colors">Casuals</a></li>
            <li><a href="/products?category=sports" className="hover:text-black transition-colors">Sports</a></li>
            <li><a href="/products?category=heavyduty" className="hover:text-black transition-colors">Heavy-duty</a></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-gray-900 uppercase tracking-wider text-xs md:text-sm">Help</h4>
          <ul className="space-y-3 text-gray-500 text-sm font-medium">
            <li><a href="/help" className="hover:text-black transition-colors">Support</a></li>
            <li><a href="/returns" className="hover:text-black transition-colors">Returns & Refunds</a></li>
            <li><a href="/shipping" className="hover:text-black transition-colors">Shipping</a></li>
            <li><a href="/faq" className="hover:text-black transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h4 className="font-bold text-lg text-gray-900 uppercase tracking-wider text-xs md:text-sm">Contact</h4>
          <ul className="space-y-2 text-gray-500 text-sm font-medium">
            <li>support@footster.com</li>
            <li>+91-98765-43210</li>
          </ul>
          
          <div className="flex flex-col items-center md:items-start space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Follow us</span>
            <div className="flex gap-4">
              {['IG', 'X', 'Fb'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400">
        <p>© {year} FootSter. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-black uppercase">Privacy Policy</a>
          <span className="text-gray-200">|</span>
          <a href="/terms" className="hover:text-black uppercase">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-[#1f1f1f] text-white overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#1f1f1f] to-[#1f1f1f]"></div>
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Create and customize content with AI tools <br className="hidden md:block" />{" "}
          and unlimited creative assets.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10">
          From $16.50/m. Cancel anytime.
        </p>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-1 flex items-center shadow-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <select className="bg-transparent border-none text-gray-700 font-medium px-4 py-3 outline-none border-r border-gray-200 hidden md:block w-48 appearance-none cursor-pointer text-sm">
            <option>All Items</option>
            <option>Stock Video</option>
            <option>Video Templates</option>
            <option>Music</option>
          </select>
          <div className="flex-1 flex items-center px-4">
            <input 
              type="text" 
              placeholder="Search for templates, videos, and more..." 
              className="w-full bg-transparent border-none text-gray-900 placeholder-gray-500 outline-none text-base py-3"
            />
          </div>
          <button className="bg-[#0084ff] hover:bg-[#006bce] text-white px-8 py-3 rounded-md font-semibold transition-colors flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-400">
          <span>Popular searches:</span>
          <a href="#" className="hover:text-white transition-colors">halloween</a>
          <a href="#" className="hover:text-white transition-colors">black friday</a>
          <a href="#" className="hover:text-white transition-colors">background</a>
          <a href="#" className="hover:text-white transition-colors">instagram</a>
        </div>
      </div>
    </div>
  );
}

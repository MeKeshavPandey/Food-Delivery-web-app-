import React from 'react';

const Header = () => {
  return (
    <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid md:grid-cols-2 gap-8 items-center h-full py-12">
          
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Order your
              <span className="block text-orange-500">
                favorite food
              </span>
              <span className="block">here</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-md">
              Choose from a diverse menu featuring a delicious variety of dishes made with quality ingredients.
            </p>

            <a
              href="#explore-menu"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg"
            >
              View Menu
            </a>
          </div>

          {/* Right Image */}
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop"
              alt="Food"
              className="rounded-3xl shadow-2xl object-cover w-full h-96"
            />

            {/* Fixed Floating Card (VISIBLE now) */}
            <div className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Top Rated</p>
                  <p className="text-xs text-gray-500">4.8/5.0</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z"
          />
        </svg>
      </div>

    </div>
  );
};

export default Header;
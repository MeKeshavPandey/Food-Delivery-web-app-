import React from 'react';

const menuList = [
  { menu_name: 'Salad', menu_image: '🥗' },
  { menu_name: 'Rolls', menu_image: '🌯' },
  { menu_name: 'Deserts', menu_image: '🍰' },
  { menu_name: 'Sandwich', menu_image: '🥪' },
  { menu_name: 'Cake', menu_image: '🎂' },
  { menu_name: 'Pure Veg', menu_image: '🥬' },
  { menu_name: 'Pasta', menu_image: '🍝' },
  { menu_name: 'Noodles', menu_image: '🍜' },
];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="my-12 md:my-16" id="explore-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">
            Explore Our Menu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {menuList.map((item, index) => (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                category === item.menu_name ? 'transform scale-110' : 'hover:transform hover:scale-105'
              }`}
            >
              <div
                className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                  category === item.menu_name
                    ? 'bg-gradient-to-br from-primary to-accent shadow-lg'
                    : 'bg-white shadow-card hover:shadow-card-hover'
                }`}
              >
                <div className={`text-5xl mb-2 transition-transform ${
                  category === item.menu_name ? 'animate-bounce' : ''
                }`}>
                  {item.menu_image}
                </div>
                <p
                  className={`text-sm font-semibold text-center ${
                    category === item.menu_name ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {item.menu_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;

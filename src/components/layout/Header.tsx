import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LineChart, Book, Wind, Heart } from 'lucide-react';

function Header() {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/mood-tracker', icon: LineChart, label: 'Mood Tracker' },
    { to: '/journal', icon: Book, label: 'Journal' },
    { to: '/breathing', icon: Wind, label: 'Breathing' },
    { to: '/coping', icon: Heart, label: 'Coping' },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 hover:text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-1.5" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
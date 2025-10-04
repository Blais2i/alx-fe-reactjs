import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-xl text-gray-600">
            Share and discover amazing recipes from around the world
          </p>
        </header>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Your Recipe Community!
          </h2>
          <p className="text-gray-600 mb-6">
            This is your starting point for building an amazing recipe sharing platform. 
            Tailwind CSS is successfully integrated and ready to use.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              React
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Tailwind CSS
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Vite
            </span>
          </div>
          
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Get Started
          </button>
        </div>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Recipe Sharing Platform - Built with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
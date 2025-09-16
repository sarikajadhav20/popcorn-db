import React from 'react'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-red-100 to-purple-100">
      <div className="text-8xl mb-4 animate-bounce">
        🍿🎬🎥
      </div>
      <h1 className="text-6xl font-extrabold text-yellow-700 drop-shadow-lg mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Looks like you’ve reached the end credits.<br />
        The page you’re looking for isn’t showing at <span className="font-bold text-yellow-600">popcornDB</span>.<br />
        Grab some popcorn and head back to the homepage!
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out"
      >
        🍿 Go Home
      </a>
      <div className="mt-10 flex space-x-4 text-4xl">
        <span className="animate-spin">🎞️</span>
        <span className="animate-pulse">🍿</span>
        <span className="animate-bounce">🎟️</span>
        <span className="animate-wiggle">📽️</span>
      </div>
    </div>
  )
}

export default NotFound
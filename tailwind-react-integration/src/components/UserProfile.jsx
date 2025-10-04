function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-sm md:max-w-sm mx-auto my-8 sm:my-12 md:my-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:bg-white">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out border-4 border-white hover:border-blue-200"
      />
      <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 my-3 sm:my-4 md:my-4 text-center hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm sm:text-sm md:text-base text-center leading-relaxed hover:text-gray-800 transition-colors duration-300">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
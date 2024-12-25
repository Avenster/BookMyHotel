const Navbar = () => (
  <header className="border-b">
    <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-start items-center">
      <div className="text-xl font-bold text-blue-600"> <a href="/"><img src="/logo.svg" alt="" /></a></div>
      <div className=" space-x-6 flex flex-row justify-center gap-10 w-[30rem]">
        <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="/hotel" className="text-gray-600 hover:text-blue-600">Hotels</a>
        <a href="*" className="text-gray-600 hover:text-blue-600">Places</a>
        
      </div>

      <div className='flex justify-end items-center w-[40rem]'>
      <a href="*" className="text-gray-600 hover:text-blue-600 ">Sign in</a>
      </div>
    </nav>
  </header>
);

export default Navbar;
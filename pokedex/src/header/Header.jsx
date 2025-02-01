export default function Header() {
    return (
      <>
        {}
        <div className="w-full bg-red-600">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center">
              <img 
                src="/pokemonpng.png"
                alt="Pokemon Logo"
                className="h-8"
              />
            </div>
          </div>
        </div>
        {}
        <div className="w-full bg-black h-10 relative">
          <div className="absolute -bottom-4 right-4 w-16 h-16 bg-white rounded-full border-[6px] border-black">
          </div>
        </div>
      </>
    );
  }
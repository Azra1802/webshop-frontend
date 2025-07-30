export default function HeroSection({ title, subtitle, backgroundImage }) {
    return (
      <div
        className="relative w-full h-96 flex items-center justify-center text-center bg-cover bg-center mb-12"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
  
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-gray-200 max-w-xl mx-auto drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }
  
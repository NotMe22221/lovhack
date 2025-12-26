const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/50 to-rose-100/30" />
      
      {/* Animated gradient blobs */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-pink-200/60 via-rose-100/40 to-transparent blur-3xl animate-float"
      />
      <div 
        className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-rose-200/50 via-pink-100/30 to-transparent blur-3xl animate-float-delayed"
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-pink-100/50 via-rose-50/40 to-transparent blur-3xl animate-float-slow"
      />
      <div 
        className="absolute bottom-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-gradient-to-tl from-rose-100/40 via-pink-50/30 to-transparent blur-3xl animate-float"
        style={{ animationDelay: '-2s' }}
      />
      
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default AnimatedBackground;

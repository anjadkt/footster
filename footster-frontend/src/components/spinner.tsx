export default function Spinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-200 border-t-black animate-spin">
        
        <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-black [animation-direction:reverse] animate-[spin_0.8s_linear_infinite]">
        </div>
        
      </div>
    </div>
  );
}
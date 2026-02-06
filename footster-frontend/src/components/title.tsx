export default function Title({ title }:{title:string}) {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
      <div className="flex gap-2">
        <img className="h-8 w-8 p-2 border border-gray-200 rounded-full cursor-pointer hover:bg-black hover:invert transition-all" src="./icons/left-arrow.png" alt="left" />
        <img className="h-8 w-8 p-2 border border-gray-200 rounded-full cursor-pointer hover:bg-black hover:invert transition-all" src="./icons/right-arrow.png" alt="right" />
      </div>
    </div>
  );
}
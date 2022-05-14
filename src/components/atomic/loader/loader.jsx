import "./loader.css";
import { SkeletonLoader } from "./skeleton-loader";
export function Loader() {
  return (
    <div className="flex flex-[5] text-primary flex-col pt-2 px-5 gap-8 pb-2 bg-bgColor">
      <h2 className="text-center opacity-0 font-bold text-2xl">tag</h2>
      <h1 className="text-xl font-bold opacity-0">Pinned Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {[1,2,3].map((iteration) => (
          <SkeletonLoader key={iteration.toString()} />
        ))}
      </div>
      <h1 className="text-xl opacity-0 font-bold">UnPinned Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {[1, 2, 3].map((iteration) => (
          <SkeletonLoader key={iteration.toString()} />
        ))}
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 6, type = 'poster' }) {
  if (type === 'poster') {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="poster-aspect bg-bg-elevated rounded-lg" />
            <div className="h-2.5 bg-bg-elevated rounded mt-2 w-3/4" />
            <div className="h-2 bg-bg-elevated rounded mt-1 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-24 bg-bg-elevated rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-20 bg-bg-elevated rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return null;
}


import React from 'react';

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
    <div className="mt-4 w-3/4 h-6 bg-gray-200 rounded-lg"></div>
  </div>
);

export default SkeletonLoader;

import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';

export const NewsCarousel: React.FC = () => {
  const { articles, loading, error } = useNews('sports', '');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (loading || articles.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-400/30 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-blue-400/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">Sports News</h2>
          <p className="text-blue-100 mb-6">Stay updated with the latest sports news!</p>
        </div>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-100">LIVE NEWS</span>
          </div>
          <div className="flex space-x-1">
            {articles.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="transition-all duration-500 ease-in-out">
          <h2 className="text-3xl font-bold mb-2 line-clamp-2">
            {currentArticle.title}
          </h2>
          <p className="text-blue-100 mb-4 line-clamp-2">
            {currentArticle.description || 'Latest sports news and updates'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-200">
                {currentArticle.source?.name || 'Sports News'}
              </span>
              <span className="text-sm text-blue-300">
                {new Date(currentArticle.publishedAt).toLocaleDateString()}
              </span>
            </div>
            
            <a
              href={currentArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-300 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-400/20 to-transparent"></div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400/20">
        <div 
          className="h-full bg-blue-300 transition-all duration-[6000ms] ease-linear"
          style={{ 
            width: `${((currentIndex + 1) / Math.min(articles.length, 5)) * 100}%`,
            animation: 'progress 6s linear infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

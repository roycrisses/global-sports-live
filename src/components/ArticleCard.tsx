import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <article className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label={`Read article: ${article.title}`}
      >
        {article.urlToImage && !imageError && (
          <div className="relative">
            {!imageLoaded && (
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
              {article.description}
            </p>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">{article.source.name}</span>
            <time dateTime={article.publishedAt}>
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </time>
          </div>
        </div>
      </a>
    </article>
  );
};

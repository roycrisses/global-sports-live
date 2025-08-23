import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Generate mock match data for sports-like appearance
  const generateMatchData = () => {
    const teams = ['AC Milan', 'Inter', 'Juventus', 'Roma', 'Napoli', 'Lazio', 'Atalanta', 'Fiorentina'];
    const team1 = teams[Math.floor(Math.random() * teams.length)];
    let team2 = teams[Math.floor(Math.random() * teams.length)];
    while (team2 === team1) {
      team2 = teams[Math.floor(Math.random() * teams.length)];
    }
    
    const score1 = Math.floor(Math.random() * 4);
    const score2 = Math.floor(Math.random() * 4);
    const minute = Math.floor(Math.random() * 90) + 1;
    
    return { team1, team2, score1, score2, minute };
  };

  const matchData = generateMatchData();

  return (
    <article 
      className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        aria-label={`Read article: ${article.title}`}
      >
        {article.urlToImage && !imageError && (
          <div className="relative h-48 overflow-hidden">
            {!imageLoaded && (
              <div className="w-full h-48 bg-gray-700/50 animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-48 object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            
            {/* Match Score Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-white font-bold text-lg">
                    {matchData.score1}-{matchData.score2}
                  </span>
                </div>
                
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {Math.random() > 0.5 ? 'Live' : 'FT'}
                </div>
              </div>
            </div>

            {/* Bottom overlay with team info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {matchData.team1.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white font-medium text-sm">{matchData.team1}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{matchData.minute}'</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
              {article.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {article.source.name.substring(0, 1).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-400 text-xs font-medium">
                {article.source.name}
              </span>
            </div>
            
            <time 
              dateTime={article.publishedAt}
              className="text-gray-500 text-xs flex items-center space-x-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            </time>
          </div>
        </div>
      </a>
    </article>
  );
};

import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log(content); // To confirm the structure during debugging

  // Safely access the nested array
  const contentItems = content?.content?.content ?? [];

  return (
    <div className='p-10'>
      <h2 className='font-medium'>{chapter?.name}</h2>
      <p className='text-gray-500'>{chapter?.description}</p>

      <div className='flex justify-center my-6'>
        {content?.videoId ? (
          <YouTube videoId={content?.videoId} opts={opts} />
        ) : (
          <p className='text-red-500'>No video available</p>
        )}
      </div>

      <div>
        {contentItems.length > 0 ? (
          contentItems.map((item, index) => (
            <div key={index} className='p-5 bg-sky-50 mb-3 rounded-lg'>
              <h2 className='font-medium text-lg'>{item.title}</h2>
              <ReactMarkdown>{item.description}</ReactMarkdown>
              {item.code_example && (
                <div className='p-4 bg-black text-white rounded-md mt-3'>
                  <pre>
                    <code>{item.code_example}</code>
                  </pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No content available</p>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;

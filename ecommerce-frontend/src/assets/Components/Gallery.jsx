import React, { useState } from 'react';
import BeforeAfterViewer from "./BeforeAfterGallery";
import blog from '../../img/blog-2.jpg';
import img1 from '../../img/blog-1.jpg';
import img2 from '../../img/blog-3.jpg';
import img3 from '../../img/single.jpg'; // repeat for demo

const imagePairs = [
  { before: blog, after: img1},
  { before: img1, after: img2 },
  { before: img2, after: img3 },
  { before: img1, after: blog },
  { before: img1, after: img3 },
  { before: img3, after: blog },
];

const ITEMS_PER_PAGE = 4;

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPair, setSelectedPair] = useState(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePairs = imagePairs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(imagePairs.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">Before & After Gallery</h1>

      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visiblePairs.map((pair, idx) => (
          <div key={idx} className="cursor-pointer" onClick={() => setSelectedPair(pair)}>
            <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
              <img src={pair.after} alt="After" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition" />
              <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">Click to view</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium px-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Viewer */}
      {selectedPair && (
        <BeforeAfterViewer
          beforeImg={selectedPair.before}
          afterImg={selectedPair.after}
          onClose={() => setSelectedPair(null)}
        />
      )}
    </div>
  );
};

export default Gallery;

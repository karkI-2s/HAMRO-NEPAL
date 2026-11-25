import React, { useState } from 'react';

const branches = [
  { name: 'Nepal', location: 'Kathmandu, Nepal' },
  { name: 'Japan', location: 'Tokyo, Japan' },
  { name: 'India', location: 'New Delhi, India' },
  { name: 'Korea', location: 'Seoul, South Korea' },
  { name: 'USA', location: 'New York, USA' },
];

export default function LocationPage() {
  // Show Nepal branch map by default
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Branch Locations</h2>

      {/* Branch buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {branches.map((branch, index) => (
          <button
            key={index}
            onClick={() => setSelectedBranch(branch)}
            className={`px-4 py-2 rounded transition ${
              selectedBranch.name === branch.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {branch.name}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-center">{selectedBranch.name} Branch</h3>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(selectedBranch.location)}&output=embed`}
          width="100%"
          height="500"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen
          loading="lazy"
          title={`${selectedBranch.name} Branch Location`}
        ></iframe>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

// Sample data to display in the list
const itemList = [
  { id: 1, name: 'John Doe', category: 'Admin' },
  { id: 2, name: 'Jane Smith', category: 'User' },
  { id: 3, name: 'Mike Johnson', category: 'Admin' },
  { id: 4, name: 'Emily Davis', category: 'User' },
  { id: 5, name: 'Sarah Wilson', category: 'Admin' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [categoryFilter, setCategoryFilter] = useState('All'); // State for category filter

  // Filtered list based on search and category filter
  const filteredList = itemList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    console.log(matchesCategory , matchesSearch)
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2>Search and Filter List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      />

      {/* Category Filter Dropdown */}
      <select
        value={categoryFilter}
        onChange={e => setCategoryFilter(e.target.value)}
        style={{ padding: '8px', marginLeft: '10px' }}
      >
        <option value="All">All Categories</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>

      {/* Filtered List Display */}
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {filteredList.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.name} - <strong>{item.category}</strong>
          </li>
        ))}
      </ul>

      {/* No Results Message */}
      {filteredList.length === 0 && <p>No results found</p>}
    </div>
  );
};

export default App;

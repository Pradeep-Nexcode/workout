import { useState } from "react";

const SearchInput = ({
  placeholder = "Search exercises...",
  onSearch,
  defaultValue = "",
}) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchInput;

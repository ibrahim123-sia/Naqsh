import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6 flex items-center justify-end">
      <label htmlFor="sort" className="mr-2 text-sm text-naqsh-umber/70">
        Sort by:
      </label>
      <select
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
        id="sort"
        className="border border-naqsh-sand p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-naqsh-gold focus:border-naqsh-gold transition duration-200 text-sm text-naqsh-umber bg-white"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low To High</option>
        <option value="priceDesc">Price: High To Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;

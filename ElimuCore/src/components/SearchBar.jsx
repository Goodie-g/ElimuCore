import { FaSearch, FaSortAmountDown } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="table-controls">
      <button className="sort-btn">
        <FaSortAmountDown /> Sort
      </button>

      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}
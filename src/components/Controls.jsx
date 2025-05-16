function Controls({ countries, selectedCountry, setSelectedCountry, season, setSeason }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
      
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Select Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Select Season</label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Seasons</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

    </div>
  );
}

export default Controls;

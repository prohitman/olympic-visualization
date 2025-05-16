import { useEffect, useState } from 'react';
import { loadCSV } from './components/CSVLoader';
import Chart from './components/Chart';
import Controls from './components/Controls';

function App() {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [season, setSeason] = useState('All');
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const [summer, winter, dict] = await Promise.all([
        loadCSV('/data/summer.csv'),
        loadCSV('/data/winter.csv'),
        loadCSV('/data/dictionary.csv'),
      ]);

      const dictMap = dict.reduce((acc, cur) => {
        acc[cur.Code] = cur.Country;
        return acc;
      }, {});

      setDictionary(dictMap);

      const allData = [
        ...summer.map(d => ({ ...d, Season: 'Summer' })),
        ...winter.map(d => ({ ...d, Season: 'Winter' })),
      ];

      const filtered = allData.filter(d => d.Medal && dictMap[d.Country]);

      const medalsByYear = {};

      filtered.forEach(row => {
        const { Year, Medal, Country, Season } = row;
        const name = dictMap[Country];
        const key = `${Year}-${Season}`;

        if (!medalsByYear[name]) medalsByYear[name] = {};
        if (!medalsByYear[name][key]) {
          medalsByYear[name][key] = {
            Gold: 0,
            Silver: 0,
            Bronze: 0,
            Year: parseInt(Year),
            Season,
          };
        }

        medalsByYear[name][key][Medal]++;
      });

      const formattedData = {};
      Object.keys(medalsByYear).forEach(country => {
        formattedData[country] = Object.values(medalsByYear[country])
          .sort((a, b) => a.Year - b.Year);
      });

      setCountries(Object.keys(formattedData));
      setData(formattedData);
    };

    loadData();
  }, []);

  const displayedData = selectedCountry && data[selectedCountry]
    ? data[selectedCountry].filter(d => season === 'All' || d.Season === season)
    : [];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-100">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-900">Olympic Medal Trends Over Time</h1>
      <Controls
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        season={season}
        setSeason={setSeason}
      />
      <Chart data={displayedData} />
    </div>
  );
}

export default App;

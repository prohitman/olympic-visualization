import {
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Chart({ data }) {
  if (!data.length) return <p className="text-center text-gray-500">No data to display</p>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4">
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data}>
          <XAxis dataKey="Year" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value, name) => [`${value}`, `${name}`]}
            labelFormatter={(label, payload) => {
            const season = payload[0]?.payload?.Season;
            return `Year: ${label} (${season})`;
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="Gold" stackId="1" stroke="#FFD700" fill="#FFD700" />
          <Area type="monotone" dataKey="Silver" stackId="1" stroke="#C0C0C0" fill="#C0C0C0" />
          <Area type="monotone" dataKey="Bronze" stackId="1" stroke="#CD7F32" fill="#CD7F32" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

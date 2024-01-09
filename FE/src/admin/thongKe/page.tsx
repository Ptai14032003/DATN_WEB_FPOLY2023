import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
    {
        "name": "Page A",
        "total_money": 4000,
    },
    {
        "name": "Page B",
        "total_money": 3000,
    },
    {
        "name": "Page C",
        "total_money": 2000,
    },
    {
        "name": "Page D",
        "total_money": 2000,
    },
    {
        "name": "Page K",
        "total_money": 1000,
    },
    {
        "name": "Page L",
        "total_money": 2000,
    },
    {
        "name": "Tháng 12",
        "total_money": 2000,
    },
]
const ThongKe = () => {

    return (
        <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" values='Tháng' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_money" stroke="#8884d8" />
        </LineChart>
    )
}

export default ThongKe
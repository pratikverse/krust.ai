import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CreditCard } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseTracker = () => {
  const budgetData = [6120.21, 8000, 6000];
  const totalExpenses = 27850;
  const upcomingPayments = [15500, 15500, 15500, 15500, 15500];

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Assets',
        backgroundColor: '#4CAF50',
        data: [1000, 1500, 2000, 1200, 1800, 500],
      },
      {
        label: 'Liabilities',
        backgroundColor: '#FF7043',
        data: [1200, 1300, 1700, 800, 1500, 700],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen p-10">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">Expense Tracker</h1>
        <div className="flex items-center">
          <span className="mr-2">Kushagra Gaur</span>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </div>
      </header>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-neutral-800 p-5 col-span-2">
          <h2 className="text-xl mb-4">Budget for the Month</h2>
          <div className="space-y-2">
            <div className="bg-blue-700 rounded-md h-6 w-full relative">
              <div className="absolute top-0 left-0 h-6 bg-blue-400" style={{ width: `${(budgetData[0] / 10000) * 100}%` }}>
                <span className="absolute right-2 text-sm">&#8377; {budgetData[0]}</span>
              </div>
            </div>
            <div className="bg-red-700 rounded-md h-6 w-full relative">
              <div className="absolute top-0 left-0 h-6 bg-red-400" style={{ width: `${(budgetData[1] / 10000) * 100}%` }}>
                <span className="absolute right-2 text-sm">&#8377; {budgetData[1]}</span>
              </div>
            </div>
            <div className="bg-purple-700 rounded-md h-6 w-full relative">
              <div className="absolute top-0 left-0 h-6 bg-purple-400" style={{ width: `${(budgetData[2] / 10000) * 100}%` }}>
                <span className="absolute right-2 text-sm">&#8377; {budgetData[2]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-5">
          <h2 className="text-xl">Total Expenses</h2>
          <div className="text-4xl font-bold text-green-400 mt-3">
            &#8377; {totalExpenses}
          </div>
        </div>

        <div className="bg-neutral-800 p-5 col-span-2">
          <h2 className="text-xl mb-4">Weekly Asset-Liability Chart</h2>
          <div style={{ height: 200 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-neutral-800 p-5 col-span-2">
          <h2 className="text-xl mb-4">Upcoming Payments</h2>
          <div className="space-y-3">
            {upcomingPayments.map((amount, index) => (
              <div key={index} className="flex justify-between bg-neutral-700 p-3 rounded-md">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-orange-400 mr-3" />
                  Zerodha (AAPL)
                </div>
                <div className="text-green-400 font-semibold">&#8377; {amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;

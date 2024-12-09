import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import Settings from './components/Settings';
import ContactUs from './components/ContactUs';
import Graph from './components/Graph';
import MyChartComponent from './components/MyChartComponent';
import { ProfileProvider } from './context/ProfileContext';  // Import ProfileProvider

function App() {
  const [selectedSection, setSelectedSection] = useState('Home');
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [budget, setBudget] = useState(10000); // Budget state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Notification state
  const [showNotification, setShowNotification] = useState(false); // State to show/hide notification
  
  // Add the notificationShown state to track if the notification has already been shown
  const [notificationShown, setNotificationShown] = useState(false);

  const addIncome = (amount) => {
    setIncome((prevIncome) => prevIncome + amount);
    const newTransaction = { id: Date.now(), type: 'income', amount };
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

    // Hide notification if balance becomes non-negative
    if (income + amount - expense >= 0) {
      setShowNotification(false);  // Hide notification if balance is no longer negative
      setNotificationShown(false); // Reset the notification status
    }
  };

  const addExpense = (amount, category) => {
    setExpense((prevExpense) => prevExpense + amount);
    const newTransaction = { id: Date.now(), type: 'expense', amount, category };
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

    // Show notification if balance becomes negative
    if (notificationsEnabled && income - (expense + amount) < 0 && !notificationShown) {
      setShowNotification(true);  // Show notification if balance is negative
      setNotificationShown(true); // Mark notification as shown
    }
  };

  const resetData = () => {
    setIncome(0);
    setExpense(0);
    setTransactions([]);
    alert('All data has been reset.');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document.body.className = isDarkTheme ? 'light-theme' : 'dark-theme';
  };

  const balance = income - expense;

  // Watch for changes in the balance and show/hide notification based on balance
  useEffect(() => {
    if (balance < 0 && !notificationShown) {
      setShowNotification(true);  // Show notification when balance is negative
      setNotificationShown(true); // Mark notification as shown
    } else if (balance >= 0 && notificationShown) {
      setShowNotification(false);  // Hide notification when balance is non-negative
      setNotificationShown(false); // Reset the notification shown status
    }
  }, [balance, notificationShown]);

  const renderContent = () => {
    switch (selectedSection) {
      case 'Home':
        return <Dashboard income={income} expense={expense} balance={balance} addIncome={addIncome} addExpense={addExpense} showNotification={showNotification} />;
      case 'Add Income':
        return <AddIncome addIncome={addIncome} />;
      case 'Add Expense':
        return <AddExpense addExpense={addExpense} />;
      case 'History':
        return <ExpenseList transactions={transactions} />;
      case 'Graphs':
        return (
          <>
            <Graph transactions={transactions} />
            <MyChartComponent />
          </>
        );
      case 'Settings':
        return <Settings resetData={resetData} toggleTheme={toggleTheme} setBudget={setBudget} setNotificationsEnabled={setNotificationsEnabled} />;
      case 'Contact Us':
        return <ContactUs />;
      default:
        return <Dashboard income={income} expense={expense} balance={balance} addIncome={addIncome} addExpense={addExpense} showNotification={showNotification} />;
    }
  };

  return (
    <ProfileProvider>
      <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>
        <Sidebar onSelect={(section) => setSelectedSection(section)} />
        <div className="main-content">
          {renderContent()}
          {showNotification && <div className="notification">Heads up! Your balance has gone negative</div>}
        </div>
      </div>
    </ProfileProvider>
  );
}

export default App;


import React, { useEffect, useState } from 'react'
import { useUserAuth } from "../../Hooks/useUserAuth"
import DashboardLayout from '../../Components/Layout/DashboardLayout';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../Components/expense/ExpenseOverview';
import Modal from '../../Components/Layout/Modal';
import AddexpenseForm from '../../Components/expense/AddexpenseForm';
import axios from 'axios';
import ExpenseList from '../../Components/expense/ExpenseList';
import DeleteAlert from '../../Components/Layout/DeleteAlert';


const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //Get all expense Details
  const fetchExpenseDetails = async () => {

    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Error fetching income details:", error);
    } finally {
      setLoading(false);
    }
  }

  //Handle Add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //validation check
    if (!category || !category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Valid income amount is required");
      return;
    }
    if (!date) {
      toast.error("date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }
    catch (error) {
      console.log("Error adding income:", error.response?.message || error.message);
      toast.error("Failed to add income, please try again");
    }
  };

  
  //Delete Expense
  const deleteExpense = async (id) => {

    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    }
    catch (error) {
      console.log("Error deleting expense:", error.response?.message || error.message);
    }

  }

  //Handle download expense details
  const handleDownloadExpenseDetails = async () => {
   try {
    const response = await axiosInstance.get(API_PATHS.EXPENSE. DOWNLOAD_EXPENSE, {
      responseType: 'blob', // Important
    }); 
 
    //handle download expense details
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expense_details.xlxs');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
   } catch (error) {
    console.log("Error downloading expense details:", error);
    toast.error("Failed to download expense details, please try again");
   }
  }

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <div>
      <DashboardLayout activeMenu="Expense">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview
                transactions={expenseData}
                onExpenseIncome={() => setOpenAddExpenseModal(true)}
              />
            </div>

            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}

              onDownload={handleDownloadExpenseDetails}
            />
          </div>

          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddexpenseForm onAddExpense={handleAddExpense} />
          </Modal>

          <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete expense"
        >
          <DeleteAlert
            content="Are you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Expense

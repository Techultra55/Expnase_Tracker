import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layout/DashboardLayout'
import IncomeOverview from '../../Components/income/IncomeOverview'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import Modal from '../../Components/Layout/Modal';
import AddIncomeForm from '../../Components/income/AddIncomeForm';
import { toast } from 'react-hot-toast';
// ...existing code...
import IncomeList from '../../Components/income/IncomeList';
import { useUserAuth } from '../../Hooks/useUserAuth'
import DeleteAlert from '../../Components/Layout/DeleteAlert';

const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });


  //Get all Income Details
  const fetchIncomeDetails = async () => {

    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Error fetching income details:", error);
    } finally {
      setLoading(false);
    }
  }

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation check
    if (!source || !source.trim()) {
      toast.error("Income source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }
    catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error("Failed to add income, please try again");
    }
  }

  //Delete Income
  const deleteIncome = async (id) => {

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    }
    catch (error) {
      console.log("Error deleting income:", error.response?.message || error.message);
    }

  }

  //Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME_DETAILS, {
      responseType: 'blob', // Important
    }); 
 
    //handle download income details
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'income_details.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
   } catch (error) {
    console.log("Error downloading income details:", error);
    toast.error("Failed to download income details, please try again");
   }
  }

  useEffect(() => {
    fetchIncomeDetails();

    return () => { }
  }, []);


  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}

            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete income"
        >
          <DeleteAlert
            content="Are you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>
  )


}


export default Income
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layout/DashboardLayout'
import IncomeOverview from '../../Components/income/IncomeOverview'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import Modal from '../../Components/Layout/Modal';
import AddIncomeForm from '../../Components/income/AddIncomeForm';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState({ Show: false, data: null });

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);


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

  }

  //Delete Income
  const deleteIncome = async (id) => {

  }

  //Handle download income details
  const handleDownloadIncomeDetails = async () => {

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
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income

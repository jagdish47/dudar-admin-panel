import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CCardText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
} from '@mui/material';

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, currentPage }) => {
  console.log("initialData", initialData, 'formData', formData);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        role_name: '',
        access: '',
      });
    }
  }, [initialData, setFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const accessArray = (prevData.access || '').split(',').filter(Boolean);
      if (checked) {
        accessArray.push(name);
      } else {
        const index = accessArray.indexOf(name);
        if (index > -1) {
          accessArray.splice(index, 1);
        }
      }
      return {
        ...prevData,
        access: accessArray.join(','),
      };
    });
  };

  const onSubmit = async () => {
    await handleSubmit(formData);
    getData(currentPage); // Fetch the updated data
    handleClose();
  };

  const isChecked = (name) => {
    return formData.access ? formData.access.split(',').includes(name) : false;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Role Name Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="role_name"
          label="Role Name *"
          type="text"
          fullWidth
          value={formData.role_name}
          onChange={handleChange}
        />
        <FormControl component="fieldset" margin="dense" fullWidth>
          <FormLabel component="legend">Access Permission *</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked('view')}
                  onChange={handleCheckboxChange}
                  name="view"
                />
              }
              label="View"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked('add')}
                  onChange={handleCheckboxChange}
                  name="add"
                />
              }
              label="Add"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked('edit')}
                  onChange={handleCheckboxChange}
                  name="edit"
                />
              }
              label="Edit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked('delete')}
                  onChange={handleCheckboxChange}
                  name="delete"
                />
              }
              label="Delete"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};



const UserRole = () => {

  const [data, setData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    role_name: '',
    access: '',
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/userRole?page=${currentPage}`; // Replace with your API endpoint
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setLoading(false);
        // console.log(json.totalRecords);
        setTotalPages(json.totalPages)
        setTotalRecords(json.totalRecords);

        console.log(json);
        setData(json.data); // Update state with response data
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const searchData = async (searchQuery) => {
    const url = `https://live.solvedudar.com/api/admin/userRole?search=${encodeURIComponent(searchQuery)}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setData(json.data); // Directly set the data without pagination
        setLoading(false);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/userRole/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
        getData(currentPage)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting role:', error.message);
    }
  };



  const handleOpenAlert = (id) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteRole(deleteId);
    handleCloseAlert();
  };


  const handleAddRole = async (formData) => {
    const { role_name, access } = formData;

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/userRole/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role_name, access }),
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]); // Assuming the API returns the new role in result.data
        console.log('Role added:', result, "formData", formData);
      
        setFormData('')
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };
  const handleEditRole = async (id, formData) => {
    const { role_name, access } = formData;

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/userRole/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role_name, access }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage)

        // setData((prevData) =>
        //   prevData.map((item) => (item.id === id ? result : item))
        // );
        setData((prevData) => [...prevData, result]);
        console.log('Role updated:', result);
        getData(currentPage)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };


  const handleSubmit = async (formData) => {
    console.log("formdata in handlesubmit", formData, "dialogData", dialogData)
    if (dialogData) {
      console.log('handleEditRole')
      await handleEditRole(dialogData.id, formData);

    } else {
      console.log('handleAddRole')
      await handleAddRole(formData);
    }
    handleClose(); // Close the dialog after submission
  };

  const handleClickOpen = (data = null) => {
    setDialogData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage in handlePAge Changne", newPage)
    setCurrentPage(newPage);
    getData(newPage)
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    searchData(search)

  };

  const itemsPerPage = 10;
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Role</strong> <small style={{ fontSize: '17px' }}>List</small>
              </CCol>

              <CCol md="auto">
                <CInputGroup className="mb-3" style={{ width: '200px' }}>
                  <CInputGroupText id="basic-addon1">
                    <CIcon icon={cilSearch} height={17} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={search}
                    onChange={handleSearch}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs lg={1}>
                <CButton color='secondary' onClick={() => handleClickOpen()} className='d-flex align-items-center' style={{ padding: '4px 8px' }}>Add
                  <CIcon icon={cilPlus} height={16} />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <Dialog open={openAlert} onClose={handleCloseAlert}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to remove this item? This action is irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlert}>Cancel</Button>
              <Button onClick={handleConfirmDelete} >Confirm</Button>
            </DialogActions>
          </Dialog>

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} />


          {!loading ? (
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Access</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>
                        {(currentPage - 1) * itemsPerPage + index + 1}

                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.role_name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.access}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>List of user Roles {totalRecords}</CTableCaption>
              </CTable>
              <CPagination className="justify-content-center" aria-label="Page navigation example">
                <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</CPaginationItem>
                <CPaginationItem active>{currentPage}</CPaginationItem>
                <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</CPaginationItem>
              </CPagination>
            </CCardBody>
          ) : (
            <div>Loading...</div>
          )}


        </CCard>
      </CCol>
    </CRow>
  );
}

export default UserRole;

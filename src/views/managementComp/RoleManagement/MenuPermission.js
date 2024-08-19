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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, currentPage, token }) => {
  console.log("initialData", initialData, 'formData', formData);

  const [roleData, setRoleData] = useState([]);
  const [roleLoading, setRoleLoading] = useState(false);

  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        role_id: '',
        menu_id: '',
        submenu_id: '',
        url: '',
      });
    }
  }, [initialData, setFormData]);

  useEffect(() => {
    if (open) {
      getRole();
    }
  }, [open]);

  const getRole = async () => {
    const url = `https://live.solvedudar.com/api/admin/userRole`; // Replace with your API endpoint
    setRoleLoading(true);
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
        setRoleData(json.data);
        setRoleLoading(false);
        console.log(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setRoleLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    await handleSubmit(formData);
    getData(currentPage);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '500px' } }}>
      <DialogTitle>Add Menu</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="role_id"
          label="Select Role*"
          type="text"
          fullWidth
          select
          value={formData.role_id}
          onChange={handleChange}
          disabled={roleLoading}
        >
          {!roleLoading ? (
            roleData.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.role_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Loading...</MenuItem>
          )}
        </TextField>
        <TextField
          margin="dense"
          name="menu_id"
          label="Select Menu *"
          type="text"
          fullWidth
          select
          value={formData.menu_id}
          onChange={handleChange}
        >
          <MenuItem value="Content">Content</MenuItem>
          <MenuItem value="Role">Role</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          name="submenu_id"
          label="Select Submenu*"
          type="number"
          fullWidth6
          select
          value={formData.submenu_id}
          onChange={handleChange}
        >
          <MenuItem value="admin/exam">Admin/Exam</MenuItem>
          <MenuItem value="admin/class">Admin/Class</MenuItem>
          <MenuItem value="admin/student">Admin/Student</MenuItem>
          <MenuItem value="admin/teacher">Admin/Teacher</MenuItem>
        </TextField>
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


const MenuPermission = () => {
 
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
    role_id: '',
    menu_id: '',
    submenu_id: '',
    url: '',
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/menuPermissions?page=${currentPage}`; // Replace with your API endpoint
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
    const url = `https://live.solvedudar.com/api/admin/menuPermissions?search=${encodeURIComponent(searchQuery)}`;
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
      const response = await fetch(`https://live.solvedudar.com/api/admin/menuPermissions/${id}`, {
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
    const {  role_id , menu_id, submenu_id, url } = formData;

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/menuPermissions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role_id , menu_id, submenu_id , url }),
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]); // Assuming the API returns the new role in result.data
        console.log('Role added:', result);
        setFormData('')
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };
  const handleEditRole = async (id, formData) => {
    const { role_id , menu_id, submenu_id, url  } = formData;

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/menuPermissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({role_id , menu_id, submenu_id , url }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage)

        setData((prevData) =>
          prevData.map((item) => (item.id === id ? result : item))
        );
        // setData((prevData) => [...prevData, result]);
        console.log('Role updated:', result);
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Menu </strong> <small style={{ fontSize: '17px' }}>List</small>
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
                <CButton color='secondary' onClick={() => handleClickOpen()} className='d-flex align-items-center'style={{ padding: '4px 8px' }}>Add
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

          <ExamDialog   open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} token={token}/>

          {!loading ? (
              <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Menu</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Submenu</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Url</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.role_id}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.menu_id}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.submenu_id}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.url}</CTableDataCell>
                    
                      <CTableDataCell style={{ padding: '20px' }}>
                          <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                            <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>List of Exam {totalRecords}</CTableCaption>
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

export default MenuPermission;

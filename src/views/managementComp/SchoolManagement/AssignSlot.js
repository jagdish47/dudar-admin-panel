import React, { useState } from 'react'
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
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        role: '',
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        image: '',
        status: '',
       
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setSelectedFileName(files[0].name);
      console.log(files[0], formData);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User data</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Select Role"
            >
              <MenuItem value=""><em>--select role--</em></MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="subadmin">Sub Admin</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phoneNo"
            label="Phone Number"
            type="tel"
            fullWidth
            required
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            name="image"
            required
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file" style={{margin: "8px 12px 6px 0"}}>
            <Button variant="contained" component="span">
              choose file
            </Button>
          </label>
          <span>{selectedFileName ? `${selectedFileName}` : '*No file chosen'}</span>

          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            select
            required
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const AssignSlot = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    exam: '',
    email: '',
    phoneNo: '',
    image:'',
    status: '',
  });

  const [tableData, setTableData] = useState([  
    {
      id: 1,
      role: 'admin',
      name: 'Admin',
      email: 'solvedudar@gmail.com',
      phoneNo: '7800151777',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',
      status: 'Active'
    },
    {
      id: 2,
      role: 'teacher',
      name: 'Sandeep Kumar Singh',
      email: 'singhsandeep3137@gmail.com',
      phoneNo: '8010161320',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

    status: 'Active'
    },
    {
      id: 3,
      role: 'teacher',
      name: 'Devraj Singh',
      email: 'devrajsingh86313@gmail.com',
      phoneNo: '7905341307',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

      status: 'Active'
    },
    {
      id: 4,
      role: 'teacher',
      name: 'Saket Jha',
      email: 'saketjha2020@gmail.com',
      phoneNo: '9821708922',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

      status: 'Active'
    },
    {
      id: 5,
      role: 'teacher',
      name: 'Varun Upadhyay',
      email: 'vvekraiji@gmail.com',
      phoneNo: '7086887291',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

      status: 'Active'
    },
    {
      id: 6,
      role: 'teacher',
      name: 'Amit Sharma',
      email: 'amitsharma@gmail.com',
      phoneNo: '9801234567',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

      status: 'Active'
    },
    {
      id: 7,
      role: 'teacher',
      name: 'Ravi Kumar',
      email: 'ravikumar@gmail.com',
      phoneNo: '9812345678',
      image:'https://dev-v1.solvedudar.com/assets/master/profile/default.png',

      status: 'Inactive'
    },
    
  ]);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClickOpen = (data = null) => {
    setDialogData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handleOpenAlert = (id) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    setTableData((prevData) => prevData.filter((item) => item.id !== deleteId));
    handleCloseAlert();
  };

  const handleSubmit = (formData) => {
    if (dialogData) {
      // Update existing item
      setTableData((prevData) =>
        prevData.map((item) => (item.id === dialogData.id ? { ...item, ...formData } : item))
      );
    } else {
      // Add new item
      setTableData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...formData },
      ]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <CRow>
      <CCol xs={12} >
        <CCard className="mb-4" > 
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Assign slot to Teachers</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                  />
                </CInputGroup>
              </CCol>
              <CCol xs lg={1}>
                <CButton color='secondary' onClick={() => handleClickOpen()} className='pt-1 pb-1'>Add
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

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData}  formData={formData}/>

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Role </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Name </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>phone No.</CTableHeaderCell>
                
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Profile Pic</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.role}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.name}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.email}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.phoneNo}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color={row.status === 'Active' ? 'success' : 'danger'} size="sm" style={{ color: 'white' }}>
                        {row.status}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                    <CImage rounded thumbnail src={row.image} width={100} height={100} />
                
                    </CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                      <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
              <CTableCaption>List of Exam {tableData.length}</CTableCaption>
            </CTable>

            <CPagination className="justify-content-center" aria-label="Page navigation example">
              <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</CPaginationItem>
              <CPaginationItem active>{currentPage}</CPaginationItem>
              <CPaginationItem disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)} onClick={() => handlePageChange(currentPage + 1)}>Next</CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default AssignSlot;

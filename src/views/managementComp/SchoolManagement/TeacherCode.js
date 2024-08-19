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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilSearch, cilPlus } from '@coreui/icons'

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
    Select,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio,
    Box
  } from '@mui/material';

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        school: '',
        branch: '',
        startTime: '',
        endTime: '',
        trial: '',
        discount: '',
        subscription: '',
        status: '',
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

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>School & Branch data</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="school-label">Select school</InputLabel>
            <Select
              labelId="school-label"
              name="school"
              value={formData.school}
              onChange={handleChange}
              label="Select school"
            >
              <MenuItem value=""><em>--select school --</em></MenuItem>
              <MenuItem value="B-Tier2">Saraswati vidya mandir</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            name="branch"
            label="Branch"
            type="text"
            fullWidth
            required
            value={formData.branch}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="startTime"
            label="Start Time"
            type="time"
            fullWidth
            required
            value={formData.startTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="endTime"
            label="End Time"
            type="time"
            fullWidth
            required
            value={formData.endTime}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="trial-label">Select trial</InputLabel>
            <Select
              labelId="trial-label"
              name="trial"
              value={formData.trial}
              onChange={handleChange}
              label="Trial"
            >
              <MenuItem value=""><em>N/A</em></MenuItem>
              <MenuItem value="3 Days">3 Days</MenuItem>
              <MenuItem value="7 Days">7 Days</MenuItem>
              <MenuItem value="15 Days">15 Days</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="discount-label">Select discount</InputLabel>
            <Select
              labelId="discount-label"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              label="Discount"
            >
              <MenuItem value=""><em>N/A</em></MenuItem>
              <MenuItem value="5%">5%</MenuItem>
              <MenuItem value="10%">10%</MenuItem>
              <MenuItem value="15%">15%</MenuItem>
              <MenuItem value="20%">20%</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="subscription-label">Select subscription</InputLabel>
            <Select
              labelId="subscription-label"
              name="subscription"
              value={formData.subscription}
              onChange={handleChange}
              label="Subscription"
            >
              <MenuItem value=""><em>N/A</em></MenuItem>
              <MenuItem value="3 Month">3 Month</MenuItem>
              <MenuItem value="7 Month">7 Month</MenuItem>
              <MenuItem value="15 Month">15 Month</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" required>
            <FormLabel component="legend">Call Send To *</FormLabel>
            <RadioGroup
              aria-label="callSendTo"
              name="callSendTo"
              value={formData.callSendTo}
              onChange={handleChange}
              row // Add this to make the radio buttons appear in a row
            >
              <Box display="flex" justifyContent="space-between" width="100%">
                <FormControlLabel value="allTeacher" control={<Radio />} label="All Teacher" />
                <FormControlLabel value="premiumTeacher" control={<Radio />} label="Premium Teacher" />
                <FormControlLabel value="schoolTeacher" control={<Radio />} label="School Teacher" />
              </Box>
            </RadioGroup>
          </FormControl>

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

const TeacherCode = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    school: '',
    branch: '',
    startTime: '',
    endTime: '',
    trial: '',
    discount: '',
    subscription: '',
    status: '',
  });

  const [tableData, setTableData] = useState([
  
    {
        id: 1,
        school: "Springfield High",
        branch: "North Campus",
        startTime: "08:00",
        endTime: "14:00",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 2,
        school: "Riverside Elementary",
        branch: "Main Campus",
        startTime: "09:00",
        endTime: "15:00",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 3,
        school: "Greenwood Academy",
        branch: "West Wing",
        startTime: "07:30",
        endTime: "13:30",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 4,
        school: "Lakeside High",
        branch: "East Campus",
        startTime: "08:30",
        endTime: "14:30",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 5,
        school: "Mountainview Middle",
        branch: "South Campus",
        startTime: "09:30",
        endTime: "15:30",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 6,
        school: "Pinecrest High",
        branch: "Central Campus",
        startTime: "08:45",
        endTime: "14:45",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      },
      {
        id: 7,
        school: "Sunset Elementary",
        branch: "North Wing",
        startTime: "09:15",
        endTime: "15:15",
        trial: "N/A",
        discount: "N/A",
        subscription: "N/A"
      }
    // ... (other table data)
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
      <CCol xs={12}>
        <CCard className="mb-4"  >
          <CCardHeader style={{ padding: '10px' }}>
            <CRow>
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Teacher Code</strong> <small style={{ fontSize: '17px' }}>List</small>
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
              <Button onClick={handleConfirmDelete}>Confirm</Button>
            </DialogActions>
          </Dialog>

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>School </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Branch</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Start Time </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>End Time</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Trial</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Discount </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Subscription</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Call send to All Teachers</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Call send to School Teachers</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.school}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.branch}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.startTime}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.endTime}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.trial}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.discount}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.subscription}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color='success' size="sm" style={{ color: 'white' }}>
                        Yes
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color='success' size="sm" style={{ color: 'white' }}>
                        Yes
                      </CButton>
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

export default TeacherCode;
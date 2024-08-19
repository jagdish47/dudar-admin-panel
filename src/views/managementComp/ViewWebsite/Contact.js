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

import BasicDatePicker from '../../../components/BasicDatePicker'
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



const Contact = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    SclName: '',
    city: '',
    Address: '',
    name: '',
    designation: '',
    phone: '',
    email: '',
    student: '',
    medium: '',
    demoDate: '',
    entryDate: '',
  });

  const [tableData, setTableData] = useState([
    {
        id: 1,
        sclName: "Greenwood High School",
        city: "New York",
        Address: "123 Main St, New York, NY 10001",
        name: "John Doe",
        designation: "Teacher",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        student: "Emily Johnson",
        medium: "English",
        demoDate: "2023-06-01",
        entryDate: "2023-05-20"
      },
      {
        id: 2,
        sclName: "Sunrise Academy",
        city: "Los Angeles",
        Address: "456 Elm St, Los Angeles, CA 90001",
        name: "Jane Smith",
        designation: "Principal",
        phone: "987-654-3210",
        email: "jane.smith@example.com",
        student: "Michael Brown",
        medium: "Spanish",
        demoDate: "2023-06-02",
        entryDate: "2023-05-21"
      },
      {
        id: 3,
        sclName: "Maple Leaf School",
        city: "Chicago",
        Address: "789 Oak St, Chicago, IL 60601",
        name: "Robert Johnson",
        designation: "Vice Principal",
        phone: "456-789-0123",
        email: "robert.johnson@example.com",
        student: "Sarah Davis",
        medium: "French",
        demoDate: "2023-06-03",
        entryDate: "2023-05-22"
      },
      {
        id: 4,
        sclName: "River Valley School",
        city: "Houston",
        Address: "101 Pine St, Houston, TX 77001",
        name: "Laura Wilson",
        designation: "Counselor",
        phone: "321-654-0987",
        email: "laura.wilson@example.com",
        student: "David Martinez",
        medium: "English",
        demoDate: "2023-06-04",
        entryDate: "2023-05-23"
      },
      {
        id: 5,
        sclName: "Cedar Park School",
        city: "Phoenix",
        Address: "202 Birch St, Phoenix, AZ 85001",
        name: "Michael Clark",
        designation: "Math Teacher",
        phone: "654-321-7890",
        email: "michael.clark@example.com",
        student: "Sophia Rodriguez",
        medium: "English",
        demoDate: "2023-06-05",
        entryDate: "2023-05-24"
      },
      {
        id: 6,
        sclName: "Hillcrest School",
        city: "Philadelphia",
        Address: "303 Cedar St, Philadelphia, PA 19019",
        name: "Emily Walker",
        designation: "Science Teacher",
        phone: "789-012-3456",
        email: "emily.walker@example.com",
        student: "James Lopez",
        medium: "Spanish",
        demoDate: "2023-06-06",
        entryDate: "2023-05-25"
      },
      {
        id: 7,
        sclName: "Pine Ridge School",
        city: "San Antonio",
        Address: "404 Walnut St, San Antonio, TX 78201",
        name: "David Harris",
        designation: "History Teacher",
        phone: "012-345-6789",
        email: "david.harris@example.com",
        student: "Emma Gonzalez",
        medium: "English",
        demoDate: "2023-06-07",
        entryDate: "2023-05-26"
      },
      {
        id: 8,
        sclName: "Brookside School",
        city: "San Diego",
        Address: "505 Maple St, San Diego, CA 92101",
        name: "Sophia Martinez",
        designation: "English Teacher",
        phone: "345-678-9012",
        email: "sophia.martinez@example.com",
        student: "Olivia Perez",
        medium: "Spanish",
        demoDate: "2023-06-08",
        entryDate: "2023-05-27"
      },
      {
        id: 9,
        sclName: "Lakeside School",
        city: "Dallas",
        Address: "606 Cherry St, Dallas, TX 75201",
        name: "James Anderson",
        designation: "Physical Education Teacher",
        phone: "678-901-2345",
        email: "james.anderson@example.com",
        student: "Liam Sanchez",
        medium: "English",
        demoDate: "2023-06-09",
        entryDate: "2023-05-28"
      },
      {
        id: 10,
        sclName: "Mountain View School",
        city: "San Jose",
        Address: "707 Poplar St, San Jose, CA 95101",
        name: "Olivia Thompson",
        designation: "Music Teacher",
        phone: "901-234-5678",
        email: "olivia.thompson@example.com",
        student: "William Ramirez",
        medium: "French",
        demoDate: "2023-06-10",
        entryDate: "2023-05-29"
      }

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
      <CCard className="mb-4" >
        <CCardHeader>
          <CRow>
            <CCol>
              <CIcon icon={cilAddressBook} height={25} />
              <strong style={{ marginLeft: '18px', fontSize: '20px' }}>Contact with Us</strong>
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
            <CRow className="mt--2">
              <BasicDatePicker />
            </CRow>
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
  
        <CCardBody  style={{ maxwidth: '100%', overflowX: 'auto' }}>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Sr.No.</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>School Name</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>City</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Address</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Email</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>No. of Students</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Medium</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Demo Date</CTableHeaderCell>
                <CTableHeaderCell scope="col"  style={{ padding: '20px', whiteSpace: 'nowrap' }}>Entry Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems.map((row, index) => (
                <CTableRow key={row.id}>
                  <CTableHeaderCell scope="row" style={{ padding: '20px', whiteSpace: 'nowrap' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.sclName}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.city}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.Address}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.name}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.designation}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.phone}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.email}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.student}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.medium}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.demoDate}</CTableDataCell>
                  <CTableDataCell  style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.entryDate}</CTableDataCell>
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

export default Contact;

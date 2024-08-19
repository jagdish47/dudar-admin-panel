import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
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

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, currentPage ,token }) => {
  console.log("initialData", initialData, 'formData', formData);
  const [classData, setClassData] = useState([]);

  const [subjectData, setSubjectData] = useState([]);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.class_id) {
        getSubject(initialData.class_id);
      }
    } else {
      setFormData({
        id:'',
        class_id: '',
        subject_id:'',
        chapter_name:'',
        description:'',
        status:1,

      });
    }
  }, [initialData, setFormData]);

  useEffect(() => {
    if (open) {
      getClass();
    }
  }, [open]);

  const getClass = async () => {
    const url = `https://live.solvedudar.com/api/admin/class/data`;

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
        setClassData(json.data);
     
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSubject = async (classId) => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${classId}/subjects`;

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
        setSubjectData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      class_id: selectedClassId,
      subject_id: '', // Reset subject when class changes
    }));
    getSubject(selectedClassId);
    
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
    
   
  };

 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chapter Form</DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          margin="dense"
          name="class_id"
          label="Class Name *"
          select
          fullWidth
          value={formData.class_id}
          onChange={handleClassChange}
        >
          {classData.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.class}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          
          margin="dense"
          name="subject_id"
          label="Subject Name *"
          select
          fullWidth
          value={formData.subject_id}
          onChange={handleChange}
        >
          {subjectData.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="chapter_name"
          label="chapter name"
          type="text"
          fullWidth
          value={formData.chapter_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description *"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          select
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Pending</MenuItem>
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




const Chapter = () => {

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
    id:'',
    class_id: '',
    subject_id:'',
    chapter_name:'',
    description:'',
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/chapter/data?page=${currentPage}`; // Replace with your API endpoint
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
        setTotalPages(json.data.totalPages)
        setTotalRecords(json.data.totalRecords);

        console.log(json.data.data);
        setData(json.data.data); // Update state with response data
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
    console.log('searchQuery', searchQuery);
    // const statusMap = {
    //   pending: 0,
    //   active: 1,
    // };

    // // Check if searchQuery matches any keyword in statusMap
    // const transformedQuery = statusMap[searchQuery.toLowerCase()] !== undefined
    //   ? statusMap[searchQuery.toLowerCase()]
    //   : searchQuery;

    const url = `https://live.solvedudar.com/api/admin/chapter/data?search=${encodeURIComponent(searchQuery)}`;
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
        setData(json.data.data); // Directly set the data without pagination
        setLoading(false);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(debounce((query) => {
    searchData(query);
  }, 500), []); // 300ms debounce time

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debouncedFetchData(value);
  };
  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/chapter/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
       
        if (data.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
          getData(currentPage - 1);
        } else {
          getData(currentPage);
        }
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
    const { class_id, subject_id, chapter_name, description, status } = formData; // Destructure class as className

    console.log('formDataAdd', formData);

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/chapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ class_id, subject_id, chapter_name, description, status }), // Correct JSON structure
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]); // Assuming the API returns the new role in result

        console.log('Role added:', result, "formData", formData);

        // setFormData({ class: '', status: 1 }); 
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };

  const handleEditRole = async (id, formData) => {
    const { class_id, subject_id, chapter_name, description, status } = formData;

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/chapter`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, class_id, subject_id, chapter_name, description, status}), // Ensure proper formatting
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage);

        // Update the data properly
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? result : item))
        );

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
    handleClose(); 
    getData(currentPage);
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






  const renderPaginationItems = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <CPaginationItem
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </CPaginationItem>
        );
      }
    } else {
      // Always add first page
      pageNumbers.push(
        <CPaginationItem
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </CPaginationItem>
      );

      // Add ellipsis if currentPage is > 3
      if (currentPage > 3) {
        pageNumbers.push(<CPaginationItem key="ellipsis-1">...</CPaginationItem>);
      }

      // Add one page before current page if possible
      if (currentPage > 2) {
        pageNumbers.push(
          <CPaginationItem
            key={currentPage - 1}
            active={false}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </CPaginationItem>
        );
      }

      // Add current page if not the first or last page
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(
          <CPaginationItem
            key={currentPage}
            active={true}
          >
            {currentPage}
          </CPaginationItem>
        );
      }

      // Add one page after current page if possible
      if (currentPage < totalPages - 1) {
        pageNumbers.push(
          <CPaginationItem
            key={currentPage + 1}
            active={false}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </CPaginationItem>
        );
      }

      // Add ellipsis if currentPage is < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<CPaginationItem key="ellipsis-2">...</CPaginationItem>);
      }

      // Always add last page
      if (totalPages > 1) {
        pageNumbers.push(
          <CPaginationItem
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </CPaginationItem>
        );
      }
    }

    return pageNumbers;
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Chapter</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                    onChange={handleSearchChange}
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

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} token={token}/>


          {!loading ? (
            <CCardBody style={{ maxwidth: '100%', overflowX: 'auto' }}>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Class Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Subject Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Chapter Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Status </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Manage</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {(currentPage - 1) * itemsPerPage + index + 1}

                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.class}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.subject_name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.chapter_name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.description}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton color='success' size="sm" style={{ color: 'white' }}>
                          Active
                        </CButton>
                      </CTableDataCell>

                      {/* <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton color={row.status === 1 ? 'success' : 'danger'} size="sm" style={{ color: 'white' }}>
                          {row.status === 1 ? 'Active' : 'Pending'}
                        </CButton>
                      </CTableDataCell> */}
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                         {/* Use "auto" to size columns based on their content */}
                            <CButton color='secondary'>
                              Topic
                            </CButton>
                         
                      </CTableDataCell>

                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>Showing 1 to 10 of {totalRecords} entries</CTableCaption>
              </CTable>
              <CPagination className="justify-content-center" aria-label="Page navigation example">
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </CPaginationItem>
                {renderPaginationItems()}
                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </CPaginationItem>
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

export default Chapter;

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
  CImage
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
  const [examData, setExamData] = useState([]);
  const [examLoading, setExamLoading] = useState(true);
  const [classData, setClassData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imageData, setImageData] = useState(false);
  console.log("formdata1", formData)
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImageData(true);
    } else {
      setFormData({
        id: '',
        class_id: '',
        subject_name: '',
        description: '',
        status: 1,
        image: '',
      });
    }
  }, [initialData]);

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
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      setSelectedFileName(file.name);
    } else {
      alert('Please select an image file.');
      setSelectedFileName('');
    }
  };

  const onSubmit = async () => {
  
    await handleSubmit(formData);
   
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subject Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="class_id"
          label="Class Name *"
          select
          fullWidth
          value={formData.class_id}
          onChange={handleChange}
        >
          {classData.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.class}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="subject_name"
          label="Subject Name *"

          fullWidth
          value={formData.subject_name}
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
        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            name="image"

            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file" style={{ margin: '8px 12px 6px 0' }}>
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          <span>{selectedFileName || '*No file chosen'}</span>
          {imageData && (
  <div style={{ marginTop: '10px' }}>
    <img src={formData.imageUrl}  style={{ maxWidth: '20%', height: 'auto' }} />
  </div>
)}
         
        </div>

        <TextField
          margin="dense"
          name="status"
          label="Status"
          select
          fullWidth
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
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



const Subject = () => {
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
    id: '',
    class_id: '',
    subject_name: '',
    description: '',
    status: 1,
    image: '',
  });

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/subject/data?page=${currentPage}`; // Replace with your API endpoint
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

    const url = `https://live.solvedudar.com/api/admin/subject/data?search=${encodeURIComponent(searchQuery)}`;
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
      const response = await fetch(`https://live.solvedudar.com/api/admin/subject/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
  
        // Check if the current page has no data after the delete
        if (data.length === 1 && currentPage > 1) {
          // Decrement the current page and fetch the data for the previous page
          setCurrentPage(currentPage - 1);
          getData(currentPage - 1);
        } else {
          // Fetch the data for the current page
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
    const { class_id, subject_name, description, status, image } = formData; // Destructure class as className

    console.log('formData2', formData);


    const formDataToSend = new FormData();
    formDataToSend.append('class_id', class_id);
    formDataToSend.append('subject_name', subject_name);
    formDataToSend.append('description', description);
    formDataToSend.append('status', status);


    if (image instanceof File) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/subject', {
        method: 'POST',
        headers: {

          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();

        setData((prevData) => [...prevData, result]);
        console.log('Role added:', result, "formData", formData);

      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };

  const handleEditRole = async (id, formData) => {
    const { class_id, subject_name, description, status, image } = formData;
    console.log('formData3', formData);
    console.log("image", image);
    const formDataToUpdate = new FormData();
    formDataToUpdate.append('id', id);
    formDataToUpdate.append('class_id', class_id);
    formDataToUpdate.append('subject_name', subject_name);
    formDataToUpdate.append('description', description);
    formDataToUpdate.append('status', status);

    if (image instanceof File) {
      formDataToUpdate.append('image', image);
    }

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/subject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToUpdate, // Ensure proper formatting
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage);

        // Update the data properly
        // setData((prevData) =>
        //   prevData.map((item) => (item.id === id ? result : item))
        // );

        console.log('Role updated:', result);
        console.log("updated data", data);
        // getData(currentPage);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };



  const handleSubmit = async (formData) => {
    if (dialogData) {
      await handleEditRole(dialogData.id, formData);
    } else {
      await handleAddRole(formData);
    }
    handleClose();
    getData(currentPage); // Refetch data to reflect changes
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Subject</strong> <small style={{ fontSize: '17px' }}>List</small>
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

          <ExamDialog open={open} token={token} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} />
          {!loading ? (
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Class Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Subject Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.class}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.subject_name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.description}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>
                        <CImage rounded thumbnail src={row.imageUrl} width={80} height={80} />
                      </CTableDataCell>


                      <CTableDataCell style={{ padding: '20px' }}>
                        <CButton color='success' size="sm" style={{ color: 'white' }}>
                          Active
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>
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

export default Subject;

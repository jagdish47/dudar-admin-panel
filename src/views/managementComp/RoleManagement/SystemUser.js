import React, { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';

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


const ExamDialog = ({
  open,
  handleClose,
  initialData,
  handleSubmit,
  selectedFileName,
  setSelectedFileName,
  setFormData,
  formData,
  setData,
  data,
  getData,
  currentPage,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(true)
  const [searchTeacher, setSearchTeacher] = useState('');
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`
  const [imageData, setImageData] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [showTeacherSearch, setShowTeacherSearch] = useState(false);



  useEffect(() => {
    if (initialData) {
      console.log("formData in useEffect", formData, "initialData", initialData)
      setFormData(initialData);
      setImageData(true);
    } else {
      setFormData({
        role: null,
        name: '',
        email: '',
        password: '',
        phone: '',
        user_type: 1,
        user_type_id: 0,
        status: '',
        userImage: null,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (open) {
      getRoleData();
    }
  }, [open]);

  const getRoleData = async () => {
    const url = `https://live.solvedudar.com/api/admin/userRole`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        },
      });

      if (response.ok) {
        const json = await response.json();
        setRoleData(json.data);
        console.log("json.data",json.data)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };
      
      if (name === 'role') {
        setShowTeacherSearch(value === '4');
      }
      
      console.log("Updated formData:", newFormData); // Log the updated formData
      return newFormData;
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file.name,
      });
      setSelectedFileName(file.name);
    } else {
      alert('Please select an image file.');
      setSelectedFileName('');
    }
  }



  const handleSearchTeachers = (event) => {
    setSearchTeacher(event.target.value);
    searchDataFunction(event.target.value); // Use event.target.value here
  };

  const searchDataFunction = async (searchQuery) => {
    console.log("searchQuery", searchQuery);
    const url = `https://live.solvedudar.com/api/admin/teacherData?search=${encodeURIComponent(searchQuery)}`;
    setTeacherLoading(true);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Ensure 'token' is defined or passed as prop
        },
      });

      if (response.ok) {
        const json = await response.json();
        setSearchResults(json.data);
        console.log("Search Results:", json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Search error:", error.message);
    } finally {
      setTeacherLoading(false);
    }
  };
  const handleRowClick = (result) => {
    setFormData({
      role: '4',
      name: result.name || '',
      email: result.email || '',
      phone: result.phone || '',
      name: result.name || '',
      password: result.password || '',
      user_type: 1,
      user_type_id: result.id || null,
      status: '1',
      userImage: result.userImage || null,
    });
    setSelectedFileName(result.userImage || '');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    getData(currentPage);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User Data</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            name="role"
            label="Role Name *"
            select
            fullWidth
            value={formData.role}
            onChange={handleChange}
          >
            {roleData.map(option => (
              <MenuItem key={option.id} value={option.id.toString()}>
                {option.role_name}
              </MenuItem>
            ))}
          </TextField>

          {showTeacherSearch   && (
            <div>
              <CInputGroup className="mt-2 mb-2" style={{ height: '50px' }}>
                <CInputGroupText id="basic-addon1">
                  <CIcon icon={cilSearch} height={17} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Search Teacher Name"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTeacher}
                  onChange={handleSearchTeachers}
                />
              </CInputGroup>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',

                      // borderBottom: '1px solid #ddd', // Light separator line
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRowClick(result)}
                  >
                    <div style={{ flex: 2 }}>
                      <p><strong>Name:</strong> {result.name}</p>
                    </div>
                    <div style={{ flex: 2 }}>
                      <p><strong>Phone:</strong> {result.phone}</p>
                    </div>

                    <div style={{ flex: 1 }}>
                      <img
                        src={result.image === null ? "https://dev-v1.solvedudar.com/assets/master/profile/default.png" : result.profile_pic}
                        alt="Profile"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}



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
          {initialData === null && (
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
          )}

          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
          />

          {['1', '2', '3'].includes(formData.role) && (
            <div>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                name="userImage"

                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file" style={{ margin: '8px 12px 6px 0' }}>
                <Button variant="contained" component="span">
                  Choose File
                </Button>
              </label>
              <span>{selectedFileName || '*No file chosen'}</span>
            </div>
          )}
          
          {initialData && initialData.role !== 4 && (
            <div>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                name="userImage"

                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file" style={{ margin: '8px 12px 6px 0' }}>
                <Button variant="contained" component="span">
                  Choose File
                </Button>
              </label>
              <span>{selectedFileName || '*No file chosen'}</span>

              <div>
                {imageData && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={formData.image} style={{ maxWidth: '20%', height: 'auto' }} />
                  </div>
                )}
              </div>
            </div>



          )}

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
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
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

const SystemUser = () => {
  const [data, setData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    user_type: '',
    user_type_id: 0,
    status: '',
    userImage: '',
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`


  const getData = async (currentPage) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/systemUser?page=${currentPage}`; // Replace with your API endpoint
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
    const url = `https://live.solvedudar.com/api/admin/systemUser?search=${encodeURIComponent(searchQuery)}`;
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
      const response = await fetch(`https://live.solvedudar.com/api/admin/systemUser/${id}`, {
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
    const { role, name, email, password, phone, user_type, user_type_id, userImage, status } = formData;
    console.log("formData in handleRole", formData);

    const newFormData = new FormData();
    newFormData.append('role_id', role);
    newFormData.append('name', name);
    newFormData.append('email', email);
    newFormData.append('password', password);
    newFormData.append('phone', phone);
    newFormData.append('user_type_id', user_type_id);
    newFormData.append('user_type', user_type);
    newFormData.append('status', status);

    if (userImage instanceof File) {
      newFormData.append('image', userImage);
    }

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/systemUser/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Do not set Content-Type header when sending FormData
        },
        body: newFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]);
        console.log('Role added:', result);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };
  // const handleEditRole = async (id, formData) => {
  //   const { role, name, email, password, phone, user_type, user_type_id, status, userImage } = formData;
  //   console.log("formData in edit role", formData)
  //   try {
  //     const response = await fetch(`https://live.solvedudar.com/api/admin/systemUser/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ role, name, email, password, phone, user_type, user_type_id, status, userImage }),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("current page in edit", currentPage)

  //       setData((prevData) =>
  //         prevData.map((item) => (item.id === id ? result : item))
  //       );


  //       setFormData("")
  //       setSelectedFileName('')
  //       console.log('Role updated:', result);
  //     } else {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating role:', error.message);
  //   }
  // };
  const handleEditRole = async (id, formData) => {
    const { role, name, email, phone, status, userImage } = formData;
    console.log("formData in edit role", formData);

    const updatedFormData = new FormData();
    updatedFormData.append('role_id', role);
    updatedFormData.append('email', email);
    updatedFormData.append('name', name);
    updatedFormData.append('phone', phone);
    updatedFormData.append('status', status);
    if (userImage instanceof File) {
      updatedFormData.append('image', userImage, userImage.name);
    }

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/systemUser/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Do not set Content-Type header when sending FormData
        },
        body: updatedFormData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage);

        setData((prevData) =>
          prevData.map((item) => (item.id === id ? result : item))
        );

        // setFormData("");
        // setSelectedFileName('');
        console.log('Role updated:', result);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };


  const handleSubmit = async (formData) => {
    console.log("formdata in handlesubmit", formData)
    if (dialogData) {
      console.log('handleEditRole')
      await handleEditRole(dialogData.id, formData);

    } else {
      console.log('handleAddRole')
      await handleAddRole(formData);
    }
    handleClose();
    getData(currentPage) // Close the dialog after submission
  };

  const handleClickOpen = (data = null) => {
    setDialogData(data);
    console.log("setDialogData", data)
    console.log("formdata updated", formData)
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

  const handleAddClick = () => {
    setDialogData(null); // Reset dialog data for new entry
    setOpen(true); // Open the dialog
  };

  const handleEditClick = (rowData) => {
    setDialogData(rowData); // Set dialog data to the selected row data
    setOpen(true); // Open the dialog
  };

  const itemsPerPage = 10;

  const roleMap = {
    1: 'Admin',
    2: 'Subadmin',
    3: 'Staff',
    4: 'Teacher'
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
  return (
    <CRow>
      <CCol xs={12} >
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>System user</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                <CButton color='secondary' onClick={handleAddClick} className='d-flex align-items-center' style={{ padding: '4px 8px' }}>Add
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

          <ExamDialog open={open} selectedFileName={selectedFileName} setSelectedFileName={setSelectedFileName} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} />
          {!loading ? (
            <CCardBody style={{ maxwidth: '100%', overflowX: 'auto' }}>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Role </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Name </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Email </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >phone No.</CTableHeaderCell>

                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Profile Pic</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }} >Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px', whiteSpace: 'nowrap' }} >{(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >{roleMap[row.role] || 'Unknown'}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >{row.name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >{row.email}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >{row.phone}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >
                        <CButton color={row.status === 1 ? 'success' : 'danger'} size="sm" style={{ color: 'white' }}>
                          {row.status === 1 ? 'Active' : 'Inactive'}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >
                        <CImage rounded thumbnail src={row.userImage} width={80} height={80} />

                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleEditClick(row)} />
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>List of Exam {totalRecords}</CTableCaption>
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

export default SystemUser;

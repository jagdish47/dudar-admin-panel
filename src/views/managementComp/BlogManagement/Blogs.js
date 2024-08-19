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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
        author: '',
        title: '',
        tags: '',
        photo:'',
        content:'',
        fbRoot:'',
        fbcomments:'',
        post:'',
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
      <DialogTitle>Blogs data</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
        <FormControl fullWidth margin="dense" required>
            <InputLabel id="role-label"> Author</InputLabel>
            <Select
              labelId="role-label"
               name="author"
              value={formData.author}
              onChange={handleChange}
              label="Author"
            >
              <MenuItem value=""><em>--select Author--</em></MenuItem>
              <MenuItem value="B-Tier2">Vivek Rai</MenuItem>

            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="author"
            label="Author"
            type="text"
            fullWidth
            required
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
          />
           
<TextField
            margin="dense"
            name="tags"
            label="Tags"
            type="text"
            fullWidth
            required
            value={formData.tags}
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
            value={formData.photo}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file" style={{margin: "8px 12px 6px 0"}}>
            <Button variant="contained" component="span">
              choose profile image
            </Button>
          </label>
          <span>{selectedFileName ? `${selectedFileName}` : '*No file chosen'}</span>
          <ReactQuill value={formData.content} onChange={handleChange} />
          <TextField
            margin="dense"
            name="fbRoot"
            label="FB Root"
            type="text"
            fullWidth
            required
            value={formData.fbRoot}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fbcomments"
            label="FB Comments"
            type="text"
            fullWidth
            required
            value={formData.fbcomments}
            onChange={handleChange}
          />

<FormControl fullWidth margin="dense" required>
            <FormLabel component="legend">Call Send To *</FormLabel>
            <RadioGroup
              aria-label="callSendTo"
              name="post"
              value={formData.post}
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

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    tags: '',
    photo:'',
    content:'',
    fbRoot:'',
    fbcomments:'',
    post:'',
  
  });

  const [tableData, setTableData] = useState([  
    {
      id: 1,
      author: 'Vivek Rai',
      title: 'Refinement In Tutor\'s Onboarding Process',
      tags: 'https://dev-v1.solvedudar.com/uploads/blog/author/b3252d64ff9843ec9e41da1315130317.jpg',
      photo: 'https://dev-v1.solvedudar.com/uploads/blog/8b88537b5a0bf73453bb3ed3c8abf414.jpg'
  },
  {
      id: 2,
      author: 'Vivek Rai',
      title: 'New Updates Are Rolling Out Soon',
      tags: 'Exciting Times Ahead: Sneak Peek into Upcoming Dudar App Updates for Students and Tutors!',
      photo: 'https://dev-v1.solvedudar.com/uploads/blog/f9cf90bf7955daffeeed658d84fd364b.jpg'
  },
  {
      id: 3,
      author: 'Vivek Rai',
      title: 'Dudar Making Learning Hassle Free',
      tags: 'Dudar: Making learning Hassle free',
      photo: 'https://dev-v1.solvedudar.com/uploads/blog/72c3f7ee4ee1b13ec0a58b5e9b69e74e.jpg'
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
      <CCol xs={12} >
        <CCard className="mb-4" > 
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Blogs</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                  
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Author </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Title </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Tags</CTableHeaderCell>

                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Photo</CTableHeaderCell>
                
               
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                  
                    <CTableDataCell style={{ padding: '20px' }}>{row.author}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.title}</CTableDataCell>
                   
                    <CTableDataCell style={{ padding: '20px' }}>{row.tags}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                    <CImage rounded thumbnail src={row.photo} width={100} height={100} />
                
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

export default Blogs;

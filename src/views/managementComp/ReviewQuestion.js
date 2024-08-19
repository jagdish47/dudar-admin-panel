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
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
import {
  Typography,
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
  Divider,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  Radio,
  Paper,
  ListItemIcon,
  Fade,
  Box

} from '@mui/material';





const ReviewQuestion = () => {

  const [data, setData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('approve');
  const [rejectionReasons, setRejectionReasons] = useState({
    formattingError: false,
    typingError: false,
    conceptualError: false,
    answerKeyError: false
  });
  const [comment, setComment] = useState('');

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [particularData, setParticularData] = useState(null);
  
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage, teacherId) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/teacher/${teacherId}/review-question?page=${currentPage}`; // Replace with your API endpoint
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
        setTotalPages(json.questions.totalPages)
        setTotalRecords(json.questions.totalRecords);

        console.log("json", json.questions.data);
        setData(json.questions.data); // Update state with response data
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

  const searchData = async (searchQuery, teacherId = 1) => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${teacherId}/review-question?search=${encodeURIComponent(searchQuery)}`;
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
        setData(json.questions.data); // Directly set the data without pagination
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
      const response = await fetch(`https://live.solvedudar.com/api/admin/teacher/question/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
        getData(currentPage, teacherId)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting role:', error.message);
    }
  };






  const fetchOptions = async (questionId) => {
    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/question/options/${questionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer your_token_here` 
        }
      });
      const data = await response.json();
      if (response.ok) {

        setOptions(data.data);
        setDialogOpen(true);
      } else {
        console.error('Error fetching options:', data.msg);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
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


  // //////////////////////////////////////////////////////////
  const handleOpenDialog = (questionId, row) => {
    fetchOptions(questionId);
    console.log("row", row)
    setParticularData(row)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOption('approve');
    setRejectionReasons({
      formattingError: false,
      typingError: false,
      conceptualError: false,
      answerKeyError: false
    });
    setComment('');
  };

  const handleSave = () => {
    console.log('Selected Option:', selectedOption);
    if (selectedOption === 'reject') {
      console.log('Rejection Reasons:', rejectionReasons);
      console.log('Comment:', comment);
      handleDeleteRole(particularData?.id)
    }
    handleCloseDialog();
  };

  const handleCheckboxChange = (event) => {
    setRejectionReasons({
      ...rejectionReasons,
      [event.target.name]: event.target.checked
    });
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Review Question</strong>
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
             
            </CRow>
          </CCardHeader>

         

          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
              Question Review
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Question</Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'grey.100' }}>
                <Typography>{particularData?.question}</Typography>
              </Paper>

              <Typography variant="h6" gutterBottom>Options</Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'grey.100' }}>
                <List>
                  {options.map((option, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText
                        primary={option.option}
                        sx={{
                          color: option.correct ? 'success.main' : 'text.primary',
                          fontWeight: option.correct ? 'bold' : 'normal'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Typography variant="h6" gutterBottom>Solution</Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'grey.100' }}>
                <Typography>{particularData?.solution}</Typography>
              </Paper>

              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Review Decision</FormLabel>
                <RadioGroup
                  row
                  value={selectedOption}
                  onChange={(event) => setSelectedOption(event.target.value)}
                >
                  <FormControlLabel value="approve" control={<Radio />} label="Approve" />
                  <FormControlLabel value="reject" control={<Radio />} label="Reject" />
                </RadioGroup>
              </FormControl>

              {selectedOption === 'reject' && (
                <Fade in={selectedOption === 'reject'}>
                  <Box>
                    <Typography variant="h6" gutterBottom>Rejection Reasons</Typography>
                    <FormGroup sx={{ mb: 2 }}>
                      {Object.entries(rejectionReasons).map(([key, value]) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              checked={value}
                              onChange={handleCheckboxChange}
                              name={key}
                            />
                          }
                          label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        />
                      ))}
                    </FormGroup>

                    <TextField
                      label="Additional Comments"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                  </Box>
                </Fade>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save Decision
              </Button>
            </DialogActions>
          </Dialog>

          {!loading ? (
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Question</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Solution</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Created By</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>View Question/status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>
                        {(currentPage - 1) * itemsPerPage + index + 1}

                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.question}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.solution}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.teacher_name}</CTableDataCell>
                      <CTableDataCell>
                        <CImage
                          src="https://imgs.search.brave.com/-NUAJ4R6-LN9-UVLQcs7fTrxjm9TTNWeXLdaA5_Jy9o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzEzLzk1LzQ2/LzM2MF9GXzgxMzk1/NDY0OV9vNjlSbXVS/WWl3eGFhbFliS3NZ/Sm1sOXpwNW1XSGhD/Yy5qcGc" // Replace with your image URL
                          alt="Sample Image"
                          fluid // This will make the image responsive
                          width={50} // Set custom width
                          height={50} // Set custom height
                          thumbnail
                          onClick={() => handleOpenDialog(row.id, row)}
                        />
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

export default ReviewQuestion;

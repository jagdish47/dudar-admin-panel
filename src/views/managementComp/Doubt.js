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
        SclGroup: '',
        name: '',
        sclName: '',
        sclCode: '',
        email: '',
        image: '',
        password: '',
        status: '',
        instruction: '',
        keyThings: '',
        rewards: '',

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
      <DialogTitle>Doubt data</DialogTitle>
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
              <MenuItem value=""><em>--select school group--</em></MenuItem>
              <MenuItem value="B-Tier2">B-Tier2</MenuItem>

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
            name="instruction"
            label="Quiz instructions"
            multiline
            rows={2}
            maxRows={Infinity}
            fullWidth
            required
            value={formData.instruction}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="keyThings"
            label="KeyThings"
            multiline
            rows={2}
            maxRows={Infinity}
            fullWidth
            required
            value={formData.keyThings}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rewards"
            label="Rewards"
            multiline
            rows={2}
            maxRows={Infinity}
            fullWidth
            required
            value={formData.rewards}
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
          <label htmlFor="raised-button-file" style={{ margin: "8px 12px 6px 0" }}>
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

const Doubt = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    SclGroup: '',
    name: '',
    sclName: '',
    sclCode: '',
    email: '',
    image: '',
    password: '',
    status: '',
    instruction: '',
    keyThings: '',
    rewards: '',
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      SclGroup: 'B-Tier2',
      SclName: 'International Demo',
      SclCode: 'INTE3311',
      email: 'internationaldemo@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 2,
      SclGroup: 'B-Tier2',
      SclName: 'SBS CONVENT',
      SclCode: 'SBSC4956',
      email: 'cbsconvent@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 3,
      SclGroup: 'B-Tier2',
      SclName: 'K.V. RAE BARELI',
      SclCode: 'KEND2875',
      email: 'kv@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 4,
      SclGroup: 'B-Tier2',
      SclName: 'K N Public School',
      SclCode: 'KNPU2876',
      email: 'knpublicschool@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 5,
      SclGroup: 'B-Tier2',
      SclName: 'MM Public School',
      SclCode: 'MMPU2138',
      email: 'mmpublic@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 6,
      SclGroup: 'B-Tier2',
      SclName: 'Student Public School',
      SclCode: 'STUD3424',
      email: 'studentpublic@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 7,
      SclGroup: 'B-Tier2',
      SclName: 'D.A.V',
      SclCode: 'DAVP9150',
      email: 'dav@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 8,
      SclGroup: 'B-Tier2',
      SclName: 'Manav Rachna School',
      SclCode: 'MANA2327',
      email: 'manav@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 9,
      SclGroup: 'B-Tier2',
      SclName: 'St. Paul Public School',
      SclCode: 'STPA4149',
      email: 'st@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 10,
      SclGroup: 'B-Tier2',
      SclName: 'Bright Future School',
      SclCode: 'BRIG1234',
      email: 'brightfuture@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 11,
      SclGroup: 'B-Tier2',
      SclName: 'Sunrise Academy',
      SclCode: 'SUNR5678',
      email: 'sunriseacademy@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 12,
      SclGroup: 'B-Tier2',
      SclName: 'Green Valley School',
      SclCode: 'GREE9101',
      email: 'greenvalley@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 13,
      SclGroup: 'B-Tier2',
      SclName: 'Blue Ridge School',
      SclCode: 'BLUE1123',
      email: 'blueridge@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 14,
      SclGroup: 'B-Tier2',
      SclName: 'Happy Days School',
      SclCode: 'HAPP1415',
      email: 'happydays@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 15,
      SclGroup: 'B-Tier2',
      SclName: 'Rainbow International',
      SclCode: 'RAIN1617',
      email: 'rainbowintl@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 16,
      SclGroup: 'B-Tier2',
      SclName: 'Springfield School',
      SclCode: 'SPRI1819',
      email: 'springfield@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 17,
      SclGroup: 'B-Tier2',
      SclName: 'Crescent Public School',
      SclCode: 'CRES2021',
      email: 'crescentpublic@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 18,
      SclGroup: 'B-Tier2',
      SclName: 'Glory Heights School',
      SclCode: 'GLOR2223',
      email: 'gloryheights@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 19,
      SclGroup: 'B-Tier2',
      SclName: 'Elite Scholars School',
      SclCode: 'ELIT2425',
      email: 'elitescholars@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
    },
    {
      id: 20,
      SclGroup: 'B-Tier2',
      SclName: 'Heritage International School',
      SclCode: 'HERI2627',
      email: 'heritageintl@gmail.com',
      image: 'https://dev-v1.solvedudar.com/uploads/doubt_question/159e8214b4b3169bc03dc9527a931cc4.png'
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Doubt</strong> <small style={{ fontSize: '17px' }}>List</small>
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

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Group Name </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>School Name </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>School code </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Email</CTableHeaderCell>


                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Image</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.SclGroup}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.SclName}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.SclCode}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.email}</CTableDataCell>

                    <CTableDataCell style={{ padding: '20px' }}>
                      <CImage rounded thumbnail src={row.image} width={100} height={100} />

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

export default Doubt;

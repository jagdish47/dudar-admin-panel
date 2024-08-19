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
  Select,
  InputLabel,
  ListItemText,
  RadioGroup,
  Radio,
  Typography,
  Grid
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, currentPage, token, isEditing }) => {
  console.log("initialData", initialData, 'formData', formData);

  const [selectedFileName, setSelectedFileName] = useState('');
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [imageData, setImageData] = useState(false);
  
  const [validationStatus, setValidationStatus] = useState({
    email: null,
    phone: null,
    userId: null,
    aadhar: null
  });

  const [inputErrors, setInputErrors] = useState({
    email: '',
    phone: '',
    aadhar: ''
  });

  useEffect(() => {
    if (open) {
      getClass();
      getSubject();
      getLanguage();
      getBoards();
      getState();
      if (initialData && initialData.class_id) {
        getExam(initialData.class_id.split(',').map(Number));
      }
    }
  }, [open, initialData]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        userId: initialData.user_id || '',
        mpin: initialData.mpin || '',
        classIds: initialData.class_id ? initialData.class_id.split(',').map(Number) : [],
        status: initialData.status || '',
        subjectId: initialData.subject_id || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        countryCode: initialData.countryCode || '',
        gender: initialData.gender || '',
        city: initialData.city || '',
        image: initialData.image || null,
        college: initialData.college || '',
        devices: initialData.device ? initialData.device.split(',') : [],
        level: initialData.level || '',
        languageIds: initialData.language_id ? initialData.language_id.split(',').map(Number) : [],
        boardsIds: initialData.board_id ? initialData.board_id.split(',').map(Number) : [],
        examIds: initialData.exam_id ? initialData.exam_id.split(',').map(Number) : [],
        new_user: initialData.new_user || '',
        aadhar: initialData.aadhar || '',
        qualification: initialData.qualification || '',
        experience: initialData.experience || '',
        state: initialData.state || '',
        eduStatus: initialData.eduStatus || '',
      });
      setImageData(true);
    } else {
      setFormData({
        name: '',
        userId: '',
        mpin: '',
        classIds: [],
        status: '',
        subjectId: '',
        email: '',
        phone: '',
        countryCode: '',
        gender: '',
        city: '',
        image: null,
        college: '',
        level: '',
        devices: [],
        languageIds: [],
        boardsIds: [],
        examIds: [],
        aadhar: '',
        qualification: '',
        experience: '',
        state: '',
        eduStatus: '',
      });
    }
  }, [initialData, setFormData]);

  const getClass = async () => {
    const url = `https://live.solvedudar.com/api/admin/classes`;

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
        // console.log("classes", json.data)
        setClassData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getLanguage = async () => {
    const url = `https://live.solvedudar.com/api/admin/languages`;

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
        setLanguageData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getSubject = async () => {
    const url = `https://live.solvedudar.com/api/admin/subjects`;

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
        setSubjectData(json.selectable_subject);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getExam = async (classIds) => {
    console.log("classIds", classIds)
    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/target-exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ classIds }),
      });

      if (response.ok) {
        const result = await response.json();
        setExamData(result.exam_data);
        console.log('result.exam_data', result.exam_data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching exams:', error.message);
    }
  };
  const getBoards = async () => {
    const url = `https://live.solvedudar.com/api/admin/boards`;

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
        setBoardData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getState = async () => {
    const url = `https://dev-api.solvedudar.com/api/admin/states`;

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
        setStateData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCity = async (stateId) => {
    const url = `https://dev-api.solvedudar.com/api/admin/${stateId}/cities`;

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
        setCityData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const validateField = async (fieldName) => {
    console.log("fieldName",fieldName)
    const value = formData[fieldName];
    console.log("value",value)
    if (!value) return;

    const url = 'https://dev-api.solvedudar.com/api/admin/valid';
    const body = {
      userType: 'teacher',
      checkType: fieldName,
      [fieldName]: value
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Validation result for ${fieldName}:`, result);
        setValidationStatus(prev => ({
          ...prev,
          [fieldName]: result.status ? 'Available' : 'Not Available'
        }));
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error validating ${fieldName}:`, error.message);
      setValidationStatus(prev => ({
        ...prev,
        [fieldName]: 'Not Available'
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let error = '';
    if (name === 'phone') {
      if (!/^\d{10}$/.test(value)) {
        error = 'Phone number must be exactly 10 digits';
      }
    } else if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email format';
      }
    } else if (name === 'aadhar') {
      if (!/^\d{12}$/.test(value)) {
        error = 'Aadhar number must be exactly 12 digits';
      }
    }

    setInputErrors(prev => ({
      ...prev,
      [name]: error
    }));

    setFormData(prevData => {
      let newValue = value;

      if (['classIds', 'languageIds', 'boardsIds', 'examIds'].includes(name)) {
        newValue = Array.isArray(value) ? value : [value];
        if (name === 'classIds') {
          getExam(newValue);
        }
      }

      if (name === 'devices') {
        newValue = Array.isArray(value) ? value : [value];
      }

      if (name === 'state') {
        getCity(value);
      }

      return {
        ...prevData,
        [name]: newValue
      };
    });
  };


  const renderTextField = (name, label, type = 'text') => (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          margin="dense"
          name={name}
          label={label}
          type={type}
          fullWidth
          value={formData[name]}
          onChange={handleChange}
          error={!!inputErrors[name]}
          helperText={inputErrors[name]}
          InputProps={{
            readOnly: isEditing && !isFieldEditable(name),
            style: isEditing && !isFieldEditable(name) ? readOnlyStyle : {},
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => validateField(name)}
          disabled={!!inputErrors[name]}
        >
          Validate
        </Button>
      </Grid>
      {validationStatus[name] && (
        <Grid item xs={12}>
          <Typography color={validationStatus[name] === 'Available' ? 'green' : 'red'}>
            {validationStatus[name]}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,  // Store the actual File object, not just the name
      });
      setSelectedFileName(file.name);
    } else {
      alert('Please select an image file.');
      setSelectedFileName('');
      setFormData({
        ...formData,
        [name]: null,
      });
    }
  }
  const deviceOptions = ["laptop", "smartphone", "desktop", "tablet", "pen tablet"];
  const levelOptions = ["premium", "Ultra premium", "normal"];
 
  const qualificationOptions = ["High School", "Bachelor's", "Master's", "PhD", "Other"];
  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
  const eduStatusOptions = ["Student", "Working Professional", "Unemployed", "Retired"];


  const onSubmit = async () => {
    await handleSubmit(formData);
    getData(currentPage);
    handleClose();
  };

  const isFieldEditable = (fieldName) => {
    if (!isEditing) return true; // All fields editable when adding new teacher

    const newUserEditableFields = ['devices', 'subjectId', 'examIds', 'classIds', 'college', 'level'];
    const oldUserEditableFields = ['userId', 'mpin', 'classIds', 'status', 'subjectId', 'college', 'examIds', 'devices', 'level'];

    if (formData.new_user === 1) {
      return newUserEditableFields.includes(fieldName);
    } else {
      return oldUserEditableFields.includes(fieldName);
    }
  };
  const readOnlyStyle = {
    color: '#666', // Lighter text for disabled fields
    opacity: 0.6,


  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('name'),
            style: isEditing && !isFieldEditable('name') ? readOnlyStyle : {},
          }}
        />
      
        <TextField
          margin="dense"
          name="countryCode"
          label="Country Code"
          type="text"
          fullWidth
          value={formData.countryCode}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('countryCode'),
            style: isEditing && !isFieldEditable('countryCode') ? readOnlyStyle : {},
          }}
        />
       
       {renderTextField('email', 'Email', 'email')}
        {renderTextField('phone', 'Phone')}
        {renderTextField('userId', 'User ID')}
        {renderTextField('aadhar', 'Aadhar')}

        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
       
    
        <TextField
          margin="dense"
          name="state"
          label="State"
          select
          fullWidth
          value={formData.state}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('state'),
            style: isEditing && !isFieldEditable('state') ? readOnlyStyle : {},
          }}
        >
          {stateData.map((state) => (
            <MenuItem key={state.state_id} value={state.state_id}>
              {state.state_title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="city"
          label="City"
          select
          fullWidth
          value={formData.city}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('city'),
            style: isEditing && !isFieldEditable('city') ? readOnlyStyle : {},
          }}
        >
          {cityData.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="college"
          label="College"
          type="text"
          fullWidth
          value={formData.college}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('college'),
            style: isEditing && !isFieldEditable('college') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="classIds"
          label="Class"
          select
          fullWidth

          value={formData.classIds}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('classIds'),
            style: isEditing && !isFieldEditable('classIds') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              classData
                .filter(option => selected.includes(option.id))
                .map(option => option.class)
                .join(', '),
          }}
        >

          {classData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={formData.classIds.includes(option.id)} />
              <ListItemText primary={option.class} />
            </MenuItem>
          ))}
        </TextField>





        <TextField
          margin="dense"
          name="subjectId"
          label="Subject Name"
          select
          fullWidth
          value={formData.subjectId}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('subjectId'),
            style: isEditing && !isFieldEditable('subjectId') ? readOnlyStyle : {},
          }}
        >
          {subjectData.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.subject_name}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          margin="dense"
          name="languageIds"
          label="Languages"
          select
          fullWidth

          value={formData.languageIds}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('languageIds'),
            style: isEditing && !isFieldEditable('languageIds') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              languageData
                .filter(language => selected.includes(language.id))
                .map(language => language.language)
                .join(', '),
          }}
        >
          {languageData.map((language) => (
            <MenuItem key={language.id} value={language.id}>
              <Checkbox checked={formData.languageIds.includes(language.id)} />
              <ListItemText primary={language.language} />
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="boardsIds"
          label="Boards"
          select
          fullWidth

          value={formData.boardsIds}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('boardsIds'),
            style: isEditing && !isFieldEditable('boardsIds') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              boardData
                .filter(option => selected.includes(option.id))
                .map(option => option.board_name)
                .join(', '),
          }}
        >

          {boardData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={formData.boardsIds.includes(option.id)} />
              <ListItemText primary={option.board_name} />
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="examIds"
          label="Exams"
          select
          fullWidth
          value={formData.examIds}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('examIds'),
            style: isEditing && !isFieldEditable('examIds') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              examData
                .filter(option => selected.includes(option.id))
                .map(option => option.exam_name)
                .join(', '),
          }}
        >
          {examData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={formData.examIds.includes(option.id)} />
              <ListItemText primary={option.exam_name} />
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="devices"
          label="Devices"
          select
          fullWidth
          value={formData.devices}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('devices'),
            style: isEditing && !isFieldEditable('devices') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => selected.join(', '),
          }}
        >
          {deviceOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={formData.devices.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </TextField>
        <TextField

          margin="dense"
          name="level"
          label="Level"
          select
          fullWidth
          value={formData.level}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('level'),
            style: isEditing && !isFieldEditable('level') ? readOnlyStyle : {},
          }}
        >
          {levelOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="qualification"
          label="Qualification"
          select
          fullWidth
          value={formData.qualification}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('qualification'),
            style: isEditing && !isFieldEditable('qualification') ? readOnlyStyle : {},
          }}
        >
          {qualificationOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="experience"
          label="Experience"
          select
          fullWidth
          value={formData.experience}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('experience'),
            style: isEditing && !isFieldEditable('experience') ? readOnlyStyle : {},
          }}
        >
          {experienceOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="eduStatus"
          label="Educational Status"
          select
          fullWidth
          value={formData.eduStatus}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('eduStatus'),
            style: isEditing && !isFieldEditable('eduStatus') ? readOnlyStyle : {},
          }}
        >
          {eduStatusOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
          margin="dense"
          name="status"
          label="Status"
          select
          fullWidth
          value={formData.status}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('status'),
            style: isEditing && !isFieldEditable('status') ? readOnlyStyle : {},
          }}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Deactive</MenuItem>
        </TextField>

        {!imageData && (
          <div style={{ marginTop: "2%" }}>
            <FormLabel component="legend">Image<span>*</span></FormLabel>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file" style={{ margin: '5px 12px 6px 0' }}>
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <span>{selectedFileName || '*No file chosen'}</span>
          </div>
        )}
        {imageData && (
          <div style={{ marginBottom: '12px' }}>
            <FormLabel component="legend">User Image</FormLabel>
            <img src={formData.image} style={{ maxWidth: '20%', height: 'auto' }} alt="User" />
          </div>
        )}
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



const TeacherManagement = () => {

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
    name: '',
    userId: '',
    mpin: '',
    classIds: [],
    status: '',
    subjectId: '',
    email: '',
    phone: '',
    countryCode: '',
    gender: '',
    city: '',
    image: null,
    college: '',
    level: '',
    devices: [],
    languageIds: [],
    boardsIds: [],
    examIds: [],
    aadhar: '',
    qualification: '',
    experience: '',
    state: '',
    eduStatus: '',
  });
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [planType, setPlanType] = useState('Monthly');
  const [studentId, setStudentId] = useState('');
  const [activeStudent, setActiveStudent] = useState(null);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const handleSubscriptionOpen = () => setSubscriptionDialogOpen(true);

  const handleSubscriptionClose = () => setSubscriptionDialogOpen(false);

  const handleDeactivateOpen = (student) => {
    setActiveStudent(student);
    setDeactivateDialogOpen(true);
  };
  const handleDeactivateClose = () => setDeactivateDialogOpen(false);

  const handlePlanChange = (event) => setPlanType(event.target.value);

  const handleDeactivate = async () => {
    if (!activeStudent) return;

    const newStatus = activeStudent.status === 1 ? 0 : 1;

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/teacher-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          teacherId: activeStudent.id,
          status: newStatus
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update the local data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === activeStudent.id ? { ...item, status: newStatus } : item
          )
        );

        console.log('Student status updated:', result);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating student status:', error);
    }
    handleDeactivateClose();
  };

  const getData = async (currentPage) => {

    setLoading(true); // Set loading to true before making the request
    const url = `https://live.solvedudar.com/api/admin/teacher/data?page=${currentPage}`; // Replace with your API endpoint

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

        setTotalPages(json.data.totalPages);
        setTotalRecords(json.data.totalRecords);
        setData(json.data.data); // Update state with response data

      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const searchData = async (searchQuery) => {


    const url = `https://live.solvedudar.com/api/admin/teacher/data?search=${encodeURIComponent(searchQuery)}`;

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
        setData(json.data.data);
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
      const response = await fetch(`https://live.solvedudar.com/api/admin/teacher/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));

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
    console.log("formdata2", formData);
    const newFormData = new FormData();
  
    // Append single value fields
    newFormData.append('name', formData.name);
    newFormData.append('userId', formData.userId);
    newFormData.append('mpin', formData.mpin);
    newFormData.append('status', formData.status);
    newFormData.append('subjectId', formData.subjectId);
    newFormData.append('email', formData.email);
    newFormData.append('phone', formData.phone);
    newFormData.append('countryCode', formData.countryCode);
    newFormData.append('gender', formData.gender);
    newFormData.append('city', formData.city);
    newFormData.append('college', formData.college);
    newFormData.append('level', formData.level);
    newFormData.append('aadhar', formData.aadhar);
    newFormData.append('qualification', formData.qualification);
    newFormData.append('experience', formData.experience);
    newFormData.append('eduStatus', formData.eduStatus);
    newFormData.append('state', formData.state);
  
    // Handle arrays by appending each value separately
    formData.classIds.forEach(id => newFormData.append('classIds[]', id));
    formData.devices.forEach(device => newFormData.append('devices[]', device));
    formData.languageIds.forEach(id => newFormData.append('languageIds[]', id));
    formData.boardsIds.forEach(id => newFormData.append('boardsIds[]', id));
    formData.examIds.forEach(id => newFormData.append('examIds[]', id));
  
    // Handle image
    if (formData.image instanceof File) {
      newFormData.append('image', formData.image);
    }
  
    for (let [key, value] of newFormData.entries()) {
      console.log("append Data ", key, value);
    }
  
    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/teacher', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Remove 'Content-Type' header to let the browser set it automatically with the boundary
        },
        body: newFormData,
      });
  
      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]);
        toast.success(result.msg);
        console.log("result", result);
      } else {
        const errorData = await response.json();
        throw new Error(`Response status: ${response.status}, Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
      toast.error('Failed to add role. Please try again.');
    }
  };

  const handleEditRole = async (id, formData) => {
    const { userId, mpin, classIds, status, subjectId, college, examIds, devices, level, new_user } = formData;

    try {
      let url;
      let body;

      if (new_user === 1) {
        url = 'https://live.solvedudar.com/api/admin/teacher-new';
        body = { id, devices, subjectId, examIds, classIds, college, level };
      } else {
        url = 'https://live.solvedudar.com/api/admin/teacher-old';
        body = { id, userId, mpin, classIds, status, subjectId, college, examIds, devices, level };
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);

        // Update the data properly
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? result : item))
        );
        toast.success(result.msg);

        console.log('Role updated:', result);
        getData(currentPage);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
      toast.error('Failed to update student.');
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


  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handlePageChange = (newPage) => {

    setCurrentPage(newPage);
    getData(newPage)
  };
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  const handleAddClick = () => {
    setDialogData(null); // Reset dialog data for new entry
    setOpen(true); // Open the dialog
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
  const handleEditClick = async (id) => {

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/teacher/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fullStudentData = await response.json();
        console.log("fullStudentData", fullStudentData)
        setDialogData(fullStudentData.profile_data);
        setOpen(true)
        console.log("open", open)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching full student data:', error);
    }
  };
  const itemsPerPage = 10;
 console.log("setydata",data)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Teacher</strong> <small style={{ fontSize: '17px' }}>List</small>
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
          <ToastContainer />
          <ExamDialog open={open} isEditing={!!dialogData} token={token} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} />


          {!loading ? (
            <CCardBody style={{ maxwidth: '100%', overflowX: 'auto' }}>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Subject</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Average Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Qualification</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Experience</CTableHeaderCell>


                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Quiz Attempt</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Passing Status</CTableHeaderCell>

                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Action</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>New/Old User</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {(currentPage - 1) * itemsPerPage + index + 1}

                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.email}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.phone}</CTableDataCell>

                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.classes}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.subject}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.average_rating}</CTableDataCell>

                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >
                        <CImage rounded thumbnail src={row.image} width={80} height={80} />

                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.qualification}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.experience}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.quiz_attempt}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.passing_status}</CTableDataCell>

                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton
                          color={row.status === 1 ? 'success' : 'danger'}
                          size="sm"
                          style={{ color: 'white' }}
                          onClick={() => handleDeactivateOpen(row)}
                        >
                          {row.status === 1 ? 'Active' : 'Deactivate'}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleEditClick(row.id)} />
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          fontFamily: 'Roboto, sans-serif',
                          color: 'orange',
                          backgroundColor: '#fff7e6', // Light orange background
                          padding: '5px 10px', // Padding for a button-like appearance
                          borderRadius: '8px', // Rounded corners
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth

                        }}>
                          {row.new_user === 1 ? 'New User' : 'Old User'}
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>Showing 1 to 10 of {totalRecords} entries</CTableCaption>
              </CTable>
              {/* dialog box for Subscription plan */}
              <Dialog open={subscriptionDialogOpen} onClose={handleSubscriptionClose}
                PaperProps={{
                  style: {
                    width: '500px', // Set the fixed width you want here
                    maxWidth: '500px', // Ensure the max-width does not override your width
                  },
                }}>
                <DialogTitle>Subscription Plan</DialogTitle>
                <DialogContent>
                  <Select value={planType} onChange={handlePlanChange} style={{ width: '100%' }}>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annually">Annually</MenuItem>
                    <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                  </Select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubscriptionClose}>Close</Button>
                  <Button onClick={handleSubscriptionClose} color="primary">Save</Button>
                </DialogActions>
              </Dialog>

              {/* dialog box for deactivate  */}
              <Dialog open={deactivateDialogOpen} onClose={handleDeactivateClose}>
                <DialogTitle>
                  {activeStudent && activeStudent.status === 1
                    ? "Do you want to deactivate this student?"
                    : "Do you want to activate this student?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleDeactivate} color="primary">Yes</Button>
                  <Button onClick={handleDeactivateClose}>No</Button>
                </DialogActions>
              </Dialog>
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

export default TeacherManagement;

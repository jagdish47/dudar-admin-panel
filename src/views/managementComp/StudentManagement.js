import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'
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
} from '@mui/material'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ExamDialog = ({
  open,
  handleClose,
  initialData,
  handleSubmit,
  setFormData,
  formData,
  getData,
  currentPage,
  token,
  isEditing,
  data,
}) => {
  console.log('initialData', initialData, 'formData', formData)

  const [selectedFileName, setSelectedFileName] = useState('')
  const [classData, setClassData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [examData, setExamData] = useState([])
  const [languageData, setLanguageData] = useState([])
  const [imageData, setImageData] = useState(false)
  const [temp, setTemp] = useState(data)

  useEffect(() => {
    if (open) {
      getClass()
      getSubject()
      getLanguage()
      if (formData.class_id) {
        getexam(formData.class_id)
      }
    }
  }, [open, formData.class_id])

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        mpin: initialData.mpin || '',
        user_id: initialData.user_id || '',
        class_id: initialData.class_id || '',
        target_exam_id: initialData.target_exam_id || '',
        status: initialData.status || '',
        subjects: initialData.subject_id ? initialData.subject_id.split(',') : [], // Convert subject_id string to array
        name: initialData.name || '',
        email: initialData.email || '',
        countryCode: initialData.countryCode || '',
        gender: initialData.gender || '',
        board_id: initialData.board_id || '',
        location: initialData.location || '',
        languages: initialData.language_id ? initialData.language_id.split(',') : [],
        school: initialData.school || '',
        phone: initialData.phone || '',
        image: initialData.image || null,
        new_user: initialData.new_user || '',
      })

      if (initialData.class_id) {
        getexam(initialData.class_id)
      }
      setImageData(true)
    } else {
      setFormData({
        name: '',
        user_id: '',
        mpin: '',
        class_id: '',
        target_exam_id: '',
        status: '',
        subjects: [],
        email: '',
        countryCode: '',
        gender: '',
        board_id: '',
        location: '',
        languages: [],
        school: '',
        phone: '',
        image: null,
        new_user: '',
      })
    }
  }, [initialData, setFormData])

  useEffect(() => {
    if (open) {
      getClass()
      getSubject()
      getLanguage()
    }
  }, [open])

  const getClass = async () => {
    const url = 'https://live.solvedudar.com/api/admin/classes'

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch classes: ${response.status} ${response.statusText}`)
      }

      const { data } = await response.json()
      console.log('Classes:', data)
      setClassData(data)
    } catch (error) {
      console.error('Error fetching classes:', error.message)
    }
  }

  const getLanguage = async () => {
    const url = 'https://live.solvedudar.com/api/admin/languages'

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`)
      }

      const { data } = await response.json()
      setLanguageData(data)
    } catch (error) {
      console.error('Error fetching languages:', error.message)
    }
  }

  const getSubject = async () => {
    const url = `https://live.solvedudar.com/api/admin/subjects`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setSubjectData(json.selectable_subject)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  const handleClassChange = (event) => {
    const selectedClassId = event.target.value
    setFormData((prevData) => ({
      ...prevData,
      class_id: selectedClassId,
    }))
    getexam(selectedClassId)
  }

  const getexam = async (classId) => {
    const url = `https://live.solvedudar.com/api/admin/${classId}/exams`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setExamData(json.data)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    if (files.length > 0) {
      const file = files[0]
      setFormData({
        ...formData,
        [name]: file, // Store the actual File object, not just the name
      })
      setSelectedFileName(file.name)
    } else {
      alert('Please select an image file.')
      setSelectedFileName('')
      setFormData({
        ...formData,
        [name]: null,
      })
    }
  }

  const onSubmit = async () => {
    console.log('submitted bro')

    await handleSubmit(formData)
    getData(currentPage)
    handleClose()
  }

  const isFieldEditable = (fieldName) => {
    const user = data.find((ele) => ele.id === initialData.id)

    console.log('Finally User :: ', user)

    if (!isEditing) return true // All fields editable when adding new student
    const editableFields = !user.new_user
      ? ['mpin', 'user_id', 'class_id', 'target_exam_id', 'status', 'subjects']
      : [
          'id',
          'name',
          'email',
          'mpin',
          'location',
          'board_id',
          'languages',
          'school',
          'class_id',
          'target_exam_id',
          'status',
          'subjects',
        ]
    return editableFields.includes(fieldName)
  }
  const readOnlyStyle = {
    color: '#666', // Lighter text for disabled fields
    opacity: 0.6,
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
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
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('email'),
            style: isEditing && !isFieldEditable('email') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          required
          value={formData.phone}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('phone'),
            style: isEditing && !isFieldEditable('phone') ? readOnlyStyle : {},
          }}
        />
        <FormControl component="fieldset" margin="dense" required>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            InputProps={{
              readOnly: isEditing && !isFieldEditable('gender'),
              style: isEditing && !isFieldEditable('gender') ? readOnlyStyle : {},
            }}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <TextField
          margin="dense"
          name="user_id"
          label="User ID"
          type="text"
          fullWidth
          required
          value={formData.user_id}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('user_id'),
            style: isEditing && !isFieldEditable('user_id') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="mpin"
          label="MPIN"
          type="text"
          fullWidth
          required
          value={formData.mpin}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('mpin'),
            style: isEditing && !isFieldEditable('mpin') ? readOnlyStyle : {},
          }}
        />
        {!imageData && (
          <div style={{ marginTop: '2%' }}>
            <FormLabel component="legend">
              Image<span>*</span>
            </FormLabel>
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
        <div>
          {imageData && (
            <div style={{ marginBottom: '12px' }}>
              <FormLabel component="legend">User Image</FormLabel>
              <img src={formData.image} style={{ maxWidth: '20%', height: 'auto' }} />
            </div>
          )}
        </div>

        <TextField
          margin="dense"
          name="countryCode"
          label="Country Code"
          type="text"
          fullWidth
          required
          value={formData.countryCode}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('countryCode'),
            style: isEditing && !isFieldEditable('countryCode') ? readOnlyStyle : {},
          }}
        />

        <TextField
          margin="dense"
          name="board_id"
          label="Board ID"
          type="text"
          fullWidth
          required
          value={formData.board_id}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('board_id'),
            style: isEditing && !isFieldEditable('board_id') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          required
          value={formData.location}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('location'),
            style: isEditing && !isFieldEditable('location') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="school"
          label="School"
          type="text"
          fullWidth
          required
          value={formData.school}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('school'),
            style: isEditing && !isFieldEditable('school') ? readOnlyStyle : {},
          }}
        />
        <TextField
          margin="dense"
          name="class_id"
          label="Class Name *"
          select
          fullWidth
          value={formData.class_id}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('class_id'),
            style: isEditing && !isFieldEditable('class_id') ? readOnlyStyle : {},
          }}
        >
          {classData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.class}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="target_exam_id"
          label="Exam Name *"
          select
          fullWidth
          value={formData.target_exam_id}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('target_exam_id'),
            style: isEditing && !isFieldEditable('target_exam_id') ? readOnlyStyle : {},
          }}
        >
          {examData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="subjects"
          label="Subjects"
          type="text"
          fullWidth
          select
          multiple
          value={formData.subjects} // Ensure this reflects the correct state
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('subjects'),
            style: isEditing && !isFieldEditable('subjects') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              subjectData
                .filter((subject) => selected.includes(subject.id.toString()))
                .map((subject) => subject.subject_name)
                .join(', '),
          }}
        >
          {subjectData.map((subject) => (
            <MenuItem key={subject.id} value={subject.id.toString()}>
              <Checkbox checked={formData.subjects.includes(subject.id.toString())} />
              <ListItemText primary={subject.subject_name} />
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          name="languages"
          label="Languages"
          type="text"
          fullWidth
          select
          multiple
          value={formData.languages}
          onChange={handleChange}
          InputProps={{
            readOnly: isEditing && !isFieldEditable('languages'),
            style: isEditing && !isFieldEditable('languages') ? readOnlyStyle : {},
          }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              languageData
                .filter((language) => selected.includes(language.id.toString()))
                .map((language) => language.language)
                .join(', '),
          }}
        >
          {languageData.map((language) => (
            <MenuItem key={language.id} value={language.id.toString()}>
              <Checkbox checked={formData.languages.includes(language.id.toString())} />
              <ListItemText primary={language.language} />
            </MenuItem>
          ))}
        </TextField>

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
          InputProps={{
            readOnly: isEditing && !isFieldEditable('status'),
            style: isEditing && !isFieldEditable('status') ? readOnlyStyle : {},
          }}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Deactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const StudentManagements = () => {
  const [data, setData] = useState(null)
  const [totalRecords, setTotalRecords] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)

  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [dialogData, setDialogData] = useState(null)
  const [openAlert, setOpenAlert] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    mpin: '',
    class_id: '',
    target_exam_id: '',
    status: '',
    subjects: [],
    email: '',
    countryCode: '',
    gender: '',
    board_id: '',
    location: '',
    languages: [],
    new_user: '',
    phone: '',
    image: null,
    school: '',
  })
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [planType, setPlanType] = useState('Monthly')
  const [studentId, setStudentId] = useState('')
  const [activeStudent, setActiveStudent] = useState(null)
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQsInRpbWUiOjE3MjM5ODk4ODU4NjAsImlhdCI6MTcyMzk4OTg4NX0.g5BhwgWFOVWqSTJ64Om-5PLhi9xlirqb4AtvVdTgvHI`

  const handleSubscriptionOpen = () => setSubscriptionDialogOpen(true)

  const handleSubscriptionClose = () => setSubscriptionDialogOpen(false)

  const handleDeactivateOpen = (student) => {
    setActiveStudent(student)
    setDeactivateDialogOpen(true)
  }
  const handleDeactivateClose = () => setDeactivateDialogOpen(false)

  const handlePlanChange = (event) => setPlanType(event.target.value)

  console.log('DATA :: ', data)

  const handleDeactivate = async () => {
    if (!activeStudent) return

    const newStatus = activeStudent.status === 1 ? 0 : 1

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/student-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: activeStudent.id,
          status: newStatus,
        }),
      })

      if (response.ok) {
        const result = await response.json()

        // Update the local data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === activeStudent.id ? { ...item, status: newStatus } : item,
          ),
        )

        console.log('Student status updated:', result)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating student status:', error)
    }
    handleDeactivateClose()
  }

  const getData = async (currentPage) => {
    setLoading(true) // Set loading to true before making the request
    const url = `https://live.solvedudar.com/api/admin/student/data?page=${currentPage}` // Replace with your API endpoint

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setLoading(false)

        setTotalPages(json.students.totalPages)
        setTotalRecords(json.students.totalRecords)
        setData(json.students.data) // Update state with response data
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error(error.message)
      setLoading(false) // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    getData(currentPage)
  }, [currentPage])

  const searchData = async (searchQuery) => {
    const url = `https://live.solvedudar.com/api/admin/student/data?search=${encodeURIComponent(searchQuery)}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setData(json.students.data)
        setLoading(false)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error(error.message)
      setLoading(false)
    }
  }

  const debouncedFetchData = useCallback(
    debounce((query) => {
      searchData(query)
    }, 500),
    [],
  ) // 300ms debounce time

  const handleSearchChange = (e) => {
    const { value } = e.target
    setSearch(value)
    debouncedFetchData(value)
  }
  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/student/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id))
        getData(currentPage)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting role:', error.message)
    }
  }

  const handleOpenAlert = (id) => {
    setDeleteId(id)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
    setDeleteId(null)
  }

  const handleConfirmDelete = async () => {
    await handleDeleteRole(deleteId)
    handleCloseAlert()
  }

  const handleAddRole = async (formData) => {
    const {
      name,
      email,
      phone,
      countryCode,
      gender,
      board_id,
      location,
      languages,
      school,
      mpin,
      user_id,
      class_id,
      target_exam_id,
      status,
      subjects,
      image,
    } = formData

    const newFormData = new FormData()
    newFormData.append('name', name)
    newFormData.append('email', email)
    newFormData.append('phone', phone)
    newFormData.append('countryCode', countryCode)
    newFormData.append('gender', gender)
    newFormData.append('board_id', board_id)
    newFormData.append('location', location)
    newFormData.append('school', school)
    newFormData.append('mpin', mpin)
    newFormData.append('user_id', user_id)
    newFormData.append('class_id', class_id)
    newFormData.append('target_exam_id', target_exam_id)
    newFormData.append('status', status)

    // Handle arrays
    if (Array.isArray(languages)) {
      languages.forEach((lang) => newFormData.append('languages[]', lang))
    }
    if (Array.isArray(subjects)) {
      subjects.forEach((subject) => newFormData.append('subjects[]', subject))
    }

    // Handle image
    if (image instanceof File) {
      newFormData.append('image', image)
    }

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/student', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data', // Do not set this header
        },
        body: newFormData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('RESULT :: ', result)
        setData((prevData) => [...prevData, result])
        toast.success(result.msg)
      } else {
        const errorData = await response.json()
        console.log('ERROR DATA :: ', errorData)
        throw new Error(`Response status: ${response.status}, Error: ${JSON.stringify(errorData)}`)
      }
    } catch (error) {
      console.error('Error adding role:', error.message)
    }
  }

  const handleEditRole = async (id, formData) => {
    console.log('Clicked on handle Edit role')
    console.log(id)

    const {
      name,
      email,
      mpin,
      location,
      board_id,
      languages,
      school,
      user_id,
      new_user,
      class_id,
      target_exam_id,
      status,
      subjects,
    } = formData

    console.log('EDIT FORM DATA :: ', formData)

    try {
      let url
      let body

      if (new_user === 1) {
        url = 'https://live.solvedudar.com/api/admin/student-new'
        body = {
          id,
          name,
          email,
          mpin,
          location,
          board_id,
          languages,
          school,
          class_id,
          target_exam_id,
          status,
          subjects,
        }
      } else {
        url = 'https://live.solvedudar.com/api/admin/student-old'
        body = { id, mpin, user_id, class_id, target_exam_id, status, subjects }
      }

      console.log('URL:', url)
      console.log('Request Body:', JSON.stringify(body))

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      console.log('Response Status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('Result:', result)

        // Update the data properly
        setData((prevData) => prevData.map((item) => (item.id === id ? result : item)))
        toast.success(result.msg)

        console.log('Role updated:', result)
        getData(currentPage)
      } else {
        const errorData = await response.json()
        console.error('Error Data:', errorData)
        throw new Error(`Response status: ${response.status}, Error: ${JSON.stringify(errorData)}`)
      }
    } catch (error) {
      console.error('Error updating role:', error.message)
      toast.error('Failed to update student.')
    }
  }

  const handleSubmit = async (formData) => {
    console.log('formdata in handlesubmit', formData)
    if (dialogData) {
      console.log('handleEditRole')
      await handleEditRole(dialogData.id, formData)
    } else {
      console.log('handleAddRole')
      await handleAddRole(formData)
    }
    handleClose()
    getData(currentPage) // Close the dialog after submission
  }

  const handleClickOpen = (data = null) => {
    setDialogData(data)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setDialogData(null)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    getData(newPage)
  }
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    searchData(search)
  }
  const handleAddClick = () => {
    setDialogData(null) // Reset dialog data for new entry
    setOpen(true) // Open the dialog
  }

  const renderPaginationItems = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <CPaginationItem key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
            {i}
          </CPaginationItem>,
        )
      }
    } else {
      // Always add first page
      pageNumbers.push(
        <CPaginationItem key={1} active={1 === currentPage} onClick={() => handlePageChange(1)}>
          1
        </CPaginationItem>,
      )

      // Add ellipsis if currentPage is > 3
      if (currentPage > 3) {
        pageNumbers.push(<CPaginationItem key="ellipsis-1">...</CPaginationItem>)
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
          </CPaginationItem>,
        )
      }

      // Add current page if not the first or last page
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(
          <CPaginationItem key={currentPage} active={true}>
            {currentPage}
          </CPaginationItem>,
        )
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
          </CPaginationItem>,
        )
      }

      // Add ellipsis if currentPage is < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<CPaginationItem key="ellipsis-2">...</CPaginationItem>)
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
          </CPaginationItem>,
        )
      }
    }

    return pageNumbers
  }
  const handleEditClick = async (id) => {
    const user = data.find((ele) => ele.id === id)

    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/student/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const fullStudentData = await response.json()
        console.log('fullStudentData', fullStudentData)
        setDialogData(fullStudentData.profile_data)
        setOpen(true)
        console.log('open', open)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching full student data:', error)
    }
  }
  const itemsPerPage = 10
  console.log('loading', loading, 'data', data)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow>
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Student</strong>{' '}
                <small style={{ fontSize: '17px' }}>List</small>
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
                <CButton
                  color="secondary"
                  onClick={handleAddClick}
                  className="d-flex align-items-center"
                  style={{ padding: '4px 8px' }}
                >
                  Add
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
          <ToastContainer />
          <ExamDialog
            open={open}
            isEditing={!!dialogData}
            token={token}
            handleClose={handleClose}
            initialData={dialogData}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            setdata={setData}
            data={data}
            getData={getData}
            currentPage={currentPage}
          />

          {!loading ? (
            <CCardBody style={{ maxwidth: '100%', overflowX: 'auto' }}>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Sr.No.
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Phone
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Image
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      City
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Class
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Exam Planning For
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Subscription
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Phone Verify
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Status
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      Action
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                      New/Old User
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell
                        scope="row"
                        style={{ padding: '20px', whiteSpace: 'nowrap' }}
                      >
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {row.name}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {row.email}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {row.phone}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CImage rounded thumbnail src={row.studentImage} width={80} height={80} />
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {/* {row.location} */}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {row.class}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {row.target_exam}
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton
                          color="secondary"
                          className="d-flex align-items-center"
                          style={{ padding: '4px 8px' }}
                          onClick={handleSubscriptionOpen}
                        >
                          Add
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton
                          color="success"
                          active="active"
                          size="sm"
                          style={{ color: 'white' }}
                        >
                          {' '}
                          verified
                        </CButton>
                      </CTableDataCell>
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
                        <CIcon
                          icon={cilColorBorder}
                          height={20}
                          style={{ marginRight: '30px' }}
                          onClick={() => handleEditClick(row.id)}
                        />
                        <CIcon
                          icon={cilTrash}
                          height={20}
                          onClick={() => handleOpenAlert(row.id)}
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontFamily: 'Roboto, sans-serif',
                            color: 'orange',
                            backgroundColor: '#fff7e6', // Light orange background
                            padding: '5px 10px', // Padding for a button-like appearance
                            borderRadius: '8px', // Rounded corners
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                          }}
                        >
                          {row.new_user === 1 ? 'New User' : 'Old User'}
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>Showing 1 to 10 of {totalRecords} entries</CTableCaption>
              </CTable>
              {/* dialog box for Subscription plan */}
              <Dialog
                open={subscriptionDialogOpen}
                onClose={handleSubscriptionClose}
                PaperProps={{
                  style: {
                    width: '500px', // Set the fixed width you want here
                    maxWidth: '500px', // Ensure the max-width does not override your width
                  },
                }}
              >
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
                  <Button onClick={handleSubscriptionClose} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              {/* dialog box for deactivate  */}
              <Dialog open={deactivateDialogOpen} onClose={handleDeactivateClose}>
                <DialogTitle>Do you want to deactivate this student?</DialogTitle>
                <DialogActions>
                  <Button onClick={handleDeactivate} color="primary">
                    Yes
                  </Button>
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
  )
}

export default StudentManagements

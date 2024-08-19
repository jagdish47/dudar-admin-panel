import React, { useState, useEffect } from 'react'
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
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
// import Ckeditor from "../base/Ckeditor/Ckeditor"
import { CKEditor } from 'ckeditor4-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
  Grid,
  Typography,
  styled,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  DialogContentText
} from '@mui/material';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),

}));

const StyledHeading = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  backgroundColor: '#1976d2',  // Using the specified color
  borderRadius: 4,
  color: 'white',  // Setting text color to white for better contrast
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  '& .MuiToggleButton-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    flex: '1 0 18%', // Allows for 5 buttons per row on most screen sizes
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));





const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, setdata, data, currentPage, teacherId  }) => {


  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [classLoading, setClassLoading] = useState(false);
  const [subjectLoading, setSubjectLoading] = useState(false);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [examLoading, setExamLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  // console.log("formData", formData,"initialData",initialData)

  useEffect(() => {
    if (open) {
      getClass();
    }
  }, [open]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        class_id: initialData.classId,
        subject_id: initialData.subjectId,
        chapter_id: initialData.chapterId,
        teacher_id: initialData.teacherId,
        topic_id: initialData.topicId,
        target_exams: initialData.targetExams[0], // Assuming it's a single exam
        difficulty: initialData.difficulty,
        duration: initialData.duration,
        type: initialData.type,
        e_question: initialData.question,
        solution: initialData.solution,
        options: initialData.options
      });
  
      // Fetch related data (subjects, chapters, etc.) based on the initial data
      localStorage.setItem('questionOptions', JSON.stringify(initialData.options));

      if (initialData.classId) {
        getSubject(initialData.classId);
        getExam(initialData.classId);
      }
      if (initialData.subjectId) {
        getChapter(initialData.subjectId);
      }
      if (initialData.chapterId) {
        getTopics(initialData.chapterId);
      }
    } else {
      setFormData({
        class_id: '',
        subject_id: '',
        chapter_id: '',
        teacher_id: teacherId,
        topic_id: '',
        target_exams: '',
        difficulty: '',
        duration: '',
        type: '',
        e_question: '',
        solution: '',
        options: [
          { option: '', correct: 0 },
          { option: '', correct: 0 },
          { option: '', correct: 0 },
          { option: '', correct: 0 },
        ]
      });
      localStorage.removeItem('questionOptions');

    }
    
  }, [initialData]);
console.log("teacherId",teacherId)
  const getClass = async () => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${teacherId}/class`;
    setClassLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setClassData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setClassLoading(false);
    }
  };

  const getSubject = async (classId) => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${classId}/subjects`;
    setSubjectLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setSubjectData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubjectLoading(false);
    }
  };
  const getChapter = async (subjectId) => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${subjectId}/chapters`;
    setChapterLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setChapterData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setChapterLoading(false);
    }
  };

  const getTopics = async (chapterId) => {
    const url = `https://live.solvedudar.com/api/admin/chapter/${chapterId}/topics`; // Replace with your API endpoint

    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setTopicsData(json.data);
        console.log("topic data ", json.data)
        setTopicsLoading(false);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setTopicsLoading(true);
    }
  };
  const getExam = async (classId) => {
    const url = `https://live.solvedudar.com/api/admin/teacher/${classId}/exams`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setExamData(json.data);
        setExamLoading(false)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubjectLoading(false);
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      subject_id: selectedSubjectId,
      chapter_id: '', // Reset chapter when subject changes
    }));
    getChapter(selectedSubjectId);
  };

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      class_id: selectedClassId,
      subject_id: '', // Reset subject when class changes
    }));
    getSubject(selectedClassId);
    getExam(selectedClassId);
  };
  const handleChapterChange = (event) => {
    const selectedChapterId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      chapter_id: selectedChapterId,
      topic_id: '', // Reset topic when chapter changes
    }));
    getTopics(7); // Use selectedChapterId instead of selectedClassId
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      ...(name === 'type'),
    }));
  };

  // const handleCorrectOptionChange = (event, newOptions) => {
  //   const updatedOptions = formData.type === 'single'
  //     ? newOptions.slice(-1) // Only keep the last selected option for single choice
  //     : newOptions;

  //   setCorrectOption(updatedOptions)
  // };

  const handleOptionChange = (index) => (event) => {
    const htmlData = event.editor.getData();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, 'text/html');
    let textData = doc.body.textContent || '';
    const cleanedText = textData.replace(/\n+/g, '');
    const updatedOptions = [...formData.options];
    updatedOptions[index] = { ...updatedOptions[index], option: cleanedText };

    setFormData(prevData => ({
      ...prevData,
      options: updatedOptions
    }));
    localStorage.setItem('questionOptions', JSON.stringify(updatedOptions));

  };

 
  const handleCorrectOptionChange = (index) => (event) => {
    const updatedOptions = formData.options.map((opt, i) =>
      i === index ? { ...opt, correct: event.target.checked ? 1 : 0 } : opt
    );

    setFormData(prevData => ({
      ...prevData,
      options: updatedOptions
    }));

    // Update options in local storage
    localStorage.setItem('questionOptions', JSON.stringify(updatedOptions));
  };

  const handleEditorChange = (editorKey) =>      (event) => {
    console.log("editorKey",editorKey)
    const htmlData = event.editor.getData();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, 'text/html');
    let textData = doc.body.textContent || '';
    const cleanedText = textData.replace(/\n+/g, '');
    console.log("cleanedText",cleanedText)

    setFormData(prev => ({ ...prev, [editorKey]: cleanedText }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (initialData) {
      handleSubmit({ ...formData, questionId: initialData.id });
    } else {
      handleSubmit(formData);
    }
    handleClose();
  };







  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <StyledDialogTitle>Add Questions</StyledDialogTitle>

      <form onSubmit={onSubmit}>
        <StyledDialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl fullWidth required>
                <InputLabel id="class-label">Select Class</InputLabel>
                <Select
                  labelId="class-label"
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleClassChange}
                  label="Select Class"
                >
                  <MenuItem disabled><em>-- Select Class --</em></MenuItem>


                  {!classLoading ? (
                    classData && classData.length > 0 ? (
                      classData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No classes available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </StyledFormControl>
            </Grid>


            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel id="subject-label">Select Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  name="subject_id"
                  value={formData.subject_id}
                  onChange={handleSubjectChange}
                  label="Select Subject"
                  disabled={!formData.class_id}
                >
                  <MenuItem value="" disabled><em>-- Select Subject --</em></MenuItem>
                  {!subjectLoading ? (
                    subjectData.length > 0 ? (
                      subjectData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No subjects available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* chapter */}
            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel id="chapter-label">Select Chapter</InputLabel>
                <Select
                  labelId="chapter-label"
                  name="chapter_id"
                  value={formData.chapter_id}
                  onChange={handleChapterChange}
                  label="Select Chapter"
                  disabled={!formData.subject_id}
                >
                  <MenuItem value="" disabled><em>-- Select Chapter --</em></MenuItem>
                  {!chapterLoading ? (
                    chapterData.length > 0 ? (
                      chapterData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No chapters available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* topics */}



          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl fullWidth required>
                <InputLabel id="class-label">Select Topics</InputLabel>
                <Select
                  labelId="topic-label"
                  name="topic_id"
                  value={formData.topic_id}
                  onChange={handleChange}
                  label="Select Topic"
                  disabled={!formData.chapter_id}
                >
                  <MenuItem value=""><em>-- Select Topic --</em></MenuItem>

                  {!topicsLoading ? (
                    topicsData.length > 0 ? (
                      topicsData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="0">No topics available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}

                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel id="exam-label">Select Exam</InputLabel>
                <Select
                  labelId="exam-label"
                  name="target_exams"
                  value={formData.target_exams}
                  onChange={handleChange}
                  label="Select Exam"

                >
                  <MenuItem value=""><em>-- Select Exam --</em></MenuItem>

                  {!examLoading ? (
                    examData.length > 0 ? (
                      examData.map((i) => (
                        <MenuItem key={i.id} value={i.name}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No exams available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}

                </Select>
              </FormControl>
            </Grid>




          </Grid>



          <StyledHeading>
            <Typography variant="body2" style={{ color: '#ffffff' }}>
              Please Enter Correct Data
            </Typography>
          </StyledHeading>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledFormControl fullWidth required>
                <InputLabel id="type-label">Select Question Type</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Select Question Type"
                >
                  <MenuItem value="single">Single </MenuItem>
                  <MenuItem value="multiple">Multiple </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={6}>
              <StyledFormControl fullWidth required>
                <InputLabel id="time-label">Select Time</InputLabel>
                <Select
                  labelId="time-label"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  label="Select Time"
                >
                  {[60, 120, 180, 240, 300].map(time => (
                    <MenuItem key={time} value={time}>{time} seconds</MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Difficulty Level</FormLabel>
                <RadioGroup
                  aria-label="difficultyLevel"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="3" control={<Radio />} label="Hard" />
                  <FormControlLabel value="2" control={<Radio />} label="Medium" />
                  <FormControlLabel value="1" control={<Radio />} label="Easy" />
                </RadioGroup>
              </FormControl>
            </Grid>



          </Grid>


<StyledHeading>Write Question:</StyledHeading>
          <CKEditor
            editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js"
            data={formData.e_question}
            onChange={handleEditorChange('e_question')}
          />

          <Grid container spacing={4}>
            <Grid item xs={12}>
             
              <StyledHeading>Select Option to Edit:</StyledHeading>
              <StyledToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={(event, newValue) => setSelectedOption(newValue)}
                aria-label="select option"
              >
                {['Option1', 'Option2', 'Option3', 'Option4'].map((option, index) => (
                  <ToggleButton key={option} value={index} aria-label={`option ${option}`}>
                    {option}
                  </ToggleButton>
                ))}
              </StyledToggleButtonGroup>
            </Grid>
          </Grid>

           {selectedOption !== null && (
            <>
              <Typography variant="subtitle1">Edit Option {selectedOption + 1}</Typography>
              <CKEditor
                key={`editor-${selectedOption}`}
                data={formData.options[selectedOption].option}
                onChange={handleOptionChange(selectedOption)}
              />
              <FormControlLabel
                 control={
              <Checkbox
                checked={formData.options[selectedOption].correct === 1}
                onChange={handleCorrectOptionChange(selectedOption)}
              />
            }
            label={`Option ${selectedOption + 1} is correct`}
              />
            </>
          )} 

          <StyledHeading >Solution</StyledHeading>
          <CKEditor
            data={formData.solution}
            onChange={handleEditorChange('solution')}
          />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <StyledSubmitButton type="submit" variant="contained" color="primary">
            Submit
          </StyledSubmitButton>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};

const Question = () => {
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
  const teacherId = 7;
  const [formData, setFormData] = useState({
    class_id: '',
    subject_id: '',
    chapter_id: '',
    teacher_id: teacherId,
    topic_id: '',
    target_exams: '',
    difficulty: '',
    duration: '',
    type: '',
    e_question: '',
    solution: '',
    options: [
      { option: '', correct: 0 },
      { option: '', correct: 0 },
      { option: '', correct: 0 },
      { option: '', correct: 0 },
    ]
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`


  const getData = async (currentPage, teacherId) => {
    console.log('page', currentPage)
    const url = `https://live.solvedudar.com/api/admin/teacher/${teacherId}/questions?page=${currentPage}`; // Replace with your API endpoint
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
    getData(currentPage, teacherId);
  }, [currentPage]);






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
        // setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
        getData(currentPage, teacherId)
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
    const { class_id, subject_id, chapter_id, teacher_id, topic_id, e_question, target_exams, difficulty, type, duration, solution, options } = formData;
    console.log('formData', formData)

    try {
      const response = await fetch('https://live.solvedudar.com/api/admin/teacher/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ class_id, subject_id, chapter_id, teacher_id, topic_id, e_question, target_exams, difficulty, type, duration, solution, options }),
      });

      if (response.ok) {
        const result = await response.json();
        // setData((prevData) => [...prevData, result]); 
        console.log('Role added:', result, "formData", formData);
        getData(currentPage, teacherId);
      

      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };
  const handleEditRole = async (questionId, formData) => {
    const { class_id, subject_id, chapter_id, teacher_id, topic_id, e_question, target_exams, difficulty, type, duration, solution, options } = formData;
  
    try {
      const response = await fetch(`https://live.solvedudar.com/api/admin/teacher/question`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          questionId,
          class_id, 
          subject_id, 
          chapter_id, 
          teacher_id, 
          topic_id, 
          e_question, 
          target_exams, 
          difficulty, 
          type, 
          duration, 
          solution, 
          options 
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        // setData((prevData) =>
        //   prevData.map((item) => (item.id === questionId ? result.data : item))
        // );
        console.log('Question updated:', result);
        getData(currentPage, teacherId);
      
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating question:', error.message);
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
    handleClose(); // Close the dialog after submission
  };

  const handleClickOpen = async (data = null) => {
    if (data) {
      try {
        const response = await fetch(`https://live.solvedudar.com/api/admin/teacher/questions/${data.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const singleData = await response.json();
          setDialogData(singleData.data);
        } else {
          console.error('Failed to fetch question data');
        }
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    } else {
      setDialogData(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage in handlePAge Changne", newPage)
    setCurrentPage(newPage);
    getData(newPage, teacherId)
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    searchData(search)

  };


  const itemsPerPage = 10;

console.log("data",data)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4" >
          <CCardHeader style={{ padding: '10px' }}>
            <CRow>
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Question</strong> <small style={{ fontSize: '17px' }}>List</small>
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
              <CCol xs lg={2}>
                <CButton color='primary' onClick={() => handleClickOpen()} className='d-flex align-items-center' style={{ padding: '4px 8px' }}>Add Question
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

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} teacherId={teacherId} />
          {!loading ? (
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Question </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>


                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>  {(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.e_question}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>
                        <CButton color={row.status === 'Active' ? 'success' : 'warning'} size="sm" style={{ color: 'white' }}>
                          {row.status}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px' }}>
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} /> 
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>

                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>List of Exam {totalRecords}</CTableCaption>
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

export default Question;
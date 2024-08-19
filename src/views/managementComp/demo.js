const ExamDialog = ({
    open,
    handleClose,
    initialData,
    handleSubmit,
    setFormData,
    formData,
    getData,
    currentPage,
    teacherId,
}) => {
    const [classData, setClassData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [topicsData, setTopicsData] = useState([]);
    const [examData, setExamData] = useState([]);
    const [loading, setLoading] = useState({
        class: false,
        subject: false,
        chapter: false,
        topics: false,
        exam: false,
    });

    console.log("formdata", formData)
    useEffect(() => {
        if (open) {
            fetchClassData();
        }
    }, [open]);

    const fetchData = async (url, setData, loadingKey) => {
        setLoading((prevLoading) => ({ ...prevLoading, [loadingKey]: true }));
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const json = await response.json();
                setData(json.data);
            } else {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, [loadingKey]: false }));
        }
    };

    const fetchClassData = () => fetchData(`http://localhost:3000/api/admin/teacher/${teacherId}/class`, setClassData, 'class');
    const fetchSubjectData = (classId) => fetchData(`http://localhost:3000/api/admin/teacher/${classId}/subjects`, setSubjectData, 'subject');
    const fetchChapterData = (subjectId) => fetchData(`http://localhost:3000/api/admin/teacher/${subjectId}/chapters`, setChapterData, 'chapter');
    const fetchTopicsData = (chapterId) => fetchData(`http://localhost:3000/api/admin/chapter/${chapterId}/topics`, setTopicsData, 'topics');
    const fetchExamData = (classId) => fetchData(`http://localhost:3000/api/admin/teacher/${classId}/exams`, setExamData, 'exam');

    const handleSelectChange = (name, value, nextSteps = []) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        nextSteps.forEach((step) => {
            setFormData((prevData) => ({ ...prevData, [step.key]: step.value }));
            step.fetch && step.fetch(value);
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        handleSubmit(formData);
        getData(currentPage, teacherId);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Add Questions</DialogTitle>
            <form onSubmit={handleSubmitForm}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="class-label">Select Class</InputLabel>
                                <Select
                                    labelId="class-label"
                                    name="classId"
                                    value={formData.classId}
                                    onChange={(e) => handleSelectChange('classId', e.target.value, [
                                        { key: 'subjectId', value: '' },
                                        { key: 'chapterId', value: '' },
                                        { key: 'topicId', value: '' },
                                        { fetch: fetchSubjectData },
                                        { fetch: fetchExamData }
                                    ])}
                                    label="Select Class"
                                >
                                    <MenuItem disabled><em>-- Select Class --</em></MenuItem>
                                    {loading.class ? (
                                        <MenuItem disabled>Loading...</MenuItem>
                                    ) : (
                                        classData.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="subject-label">Select Subject</InputLabel>
                                <Select
                                    labelId="subject-label"
                                    name="subjectId"
                                    value={formData.subjectId}
                                    onChange={(e) => handleSelectChange('subjectId', e.target.value, [
                                        { key: 'chapterId', value: '' },
                                        { key: 'topicId', value: '' },
                                        { fetch: fetchChapterData }
                                    ])}
                                    label="Select Subject"
                                    disabled={!formData.classId}
                                >
                                    <MenuItem value="" disabled><em>-- Select Subject --</em></MenuItem>
                                    {loading.subject ? (
                                        <MenuItem disabled>Loading...</MenuItem>
                                    ) : (
                                        subjectData.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="chapter-label">Select Chapter</InputLabel>
                                <Select
                                    labelId="chapter-label"
                                    name="chapterId"
                                    value={formData.chapterId}
                                    onChange={(e) => handleSelectChange('chapterId', e.target.value, [
                                        { key: 'topicId', value: '' },
                                        { fetch: fetchTopicsData }
                                    ])}
                                    label="Select Chapter"
                                    disabled={!formData.subjectId}
                                >
                                    <MenuItem value="" disabled><em>-- Select Chapter --</em></MenuItem>
                                    {loading.chapter ? (
                                        <MenuItem disabled>Loading...</MenuItem>
                                    ) : (
                                        chapterData.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="topic-label">Select Topic</InputLabel>
                                <Select
                                    labelId="topic-label"
                                    name="topicId"
                                    value={formData.topicId}
                                    onChange={(e) => handleSelectChange('topicId', e.target.value)}
                                    label="Select Topic"
                                    disabled={!formData.chapterId}
                                >
                                    <MenuItem disabled><em>-- Select Topic --</em></MenuItem>
                                    {loading.topics ? (
                                        <MenuItem disabled>Loading...</MenuItem>
                                    ) : (
                                        topicsData.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="exam-label">Select Exam</InputLabel>
                                <Select
                                    labelId="exam-label"
                                    name="targetExams"
                                    value={formData.targetExams}
                                    onChange={(e) => handleSelectChange('targetExams', e.target.value)}
                                    label="Select Exam"
                                    disabled={!formData.classId}
                                >
                                    <MenuItem disabled><em>-- Select Exam --</em></MenuItem>
                                    {loading.exam ? (
                                        <MenuItem disabled>Loading...</MenuItem>
                                    ) : (
                                        examData.map((item) => (
                                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" sx={{ margin: '10px 0' }}>Write Question:</Typography>
                    <CKEditor editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js" />
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Select Correct Option{formData.type === 'multiple' ? 's' : ''}:
                            </Typography>
                            <ToggleButtonGroup
                                value={formData.options}
                                onChange={(e, value) => handleSelectChange('options', value)}
                                aria-label="correct options"
                                exclusive={formData.type === 'single'}
                            >
                                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                                    <ToggleButton key={option} value={option} aria-label={`option ${option}`}>
                                        {option}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Question Level:
                            </Typography>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Difficulty</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="difficulty"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={(e) => handleSelectChange('difficulty', e.target.value)}
                                >
                                    {['Easy', 'Medium', 'Hard'].map((level) => (
                                        <FormControlLabel
                                            key={level}
                                            value={level}
                                            control={<Radio />}
                                            label={level}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};




class_id: '',
subject_id: '',
chapter_id: '',
teacher_id: teacherId,
topic_id: '',
target_exams: '',
difficulty: '',
duration: '',
type: '',
question: '',
solution: '',
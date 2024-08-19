import React from 'react'


const Question = React.lazy(() => import('./views/managementComp/Question'))

const Class = React.lazy(() => import('./views/managementComp/ContentManagement/Class'))
const Contact = React.lazy(() => import('./views/managementComp/ViewWebsite/Contact'))

const Collab = React.lazy(() => import('./views/managementComp/ViewWebsite/Collab'))

const SclDoubt = React.lazy(() => import('./views/managementComp/DoubtHistory/SclDoubt'))
const AllDoubt = React.lazy(() => import('./views/managementComp/DoubtHistory/All'))

const ReviewQuestion = React.lazy(() => import('./views/managementComp/ReviewQuestion'))
const Doubt = React.lazy(() => import('./views/managementComp/Doubt'))

const MessageManagements = React.lazy(() => import('./views/managementComp/MesaageManagement'))
const OnlineTeachers = React.lazy(() => import('./views/managementComp/OnlineTeachers'))


const StudentManagements = React.lazy(() => import('./views/managementComp/StudentManagement'))
const TeacherManagement = React.lazy(() => import('./views/managementComp/TeacherManagement'))

const Blogs = React.lazy(() => import('./views/managementComp/BlogManagement/Blogs'))

// const Login = React.lazy(() => import('./views/pages/login/Login'))
const TeacherCode = React.lazy(() => import('./views/managementComp/SchoolManagement/TeacherCode'))
const AssignSlot = React.lazy(() => import('./views/managementComp/SchoolManagement/AssignSlot'))

const SchoolGroup = React.lazy(() => import('./views/managementComp/SchoolManagement/SchoolGroup'))
const AuthorCom = React.lazy(() => import('./views/managementComp/BlogManagement/Author'))

const MenuPermission = React.lazy(() => import('./views/managementComp/RoleManagement/MenuPermission'))
const Branch = React.lazy(() => import('./views/managementComp/SchoolManagement/Branch'))
const StudentCode = React.lazy(() => import('./views/managementComp/SchoolManagement/StudentCode'))
const School = React.lazy(() => import('./views/managementComp/SchoolManagement/School'))
const UserRole = React.lazy(() => import('./views/managementComp/RoleManagement/UserRole'))
const SystemUser = React.lazy(() => import('./views/managementComp/RoleManagement/SystemUser'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Topic = React.lazy(() => import('./views/managementComp/ContentManagement/Topic'))
const Chapter = React.lazy(() => import('./views/managementComp/ContentManagement/Chapter'))
const Subject = React.lazy(() => import('./views/managementComp/ContentManagement/Subject'))
const Exam = React.lazy(() => import('./views/managementComp/ContentManagement/Exam'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const StudentManagement = React.lazy(() => import('./views/managementComp/StudentManagement'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/managementComp/ContentManagement/Exam', name: 'Exam', element:Exam},
  {path: '/managementComp/ContentManagement/Topic', name: 'Topic', element:Topic},
  {path: '/managementComp/ContentManagement/Chapter', name: 'Chapter', element:Chapter},
  {path: '/managementComp/ContentManagement/Subject', name: 'Subject', element:Subject},
  {path: '/managementComp/ContentManagement/Class', name: 'Class', element:Class},
  { path: '/managementComp/StudentManagement', name: 'StudentManagement', element: StudentManagement },
  {path: '/managementComp/RoleManagement/UserRole', name: 'UserRole', element:UserRole},
  {path: '/managementComp/RoleManagement/MenuPermission', name: 'MenuPermission', element:MenuPermission},
  {path: '/managementComp/RoleManagement/SystemUser', name: 'SystemUser', element:SystemUser},
  {path: '/managementComp/SchoolManagement/School', name: 'School', element:School},
  {path: '/managementComp/SchoolManagement/Branch', name: 'Branch', element:Branch},
  // {path: 'pages/login/Login', name: 'Branch', element:Login},
  {path: '/managementComp/SchoolManagement/StudentCode', name: 'StudentCode', element:StudentCode},
  {path: '/managementComp/SchoolManagement/TeacherCode', name: 'TeacherCode', element:TeacherCode},
  {path: '/managementComp/SchoolManagement/AssignSlot', name: 'AssignSlot', element:AssignSlot},
  {path: '/managementComp/SchoolManagement/SchoolGroup', name: 'SchoolGroup', element:SchoolGroup},
  {path: '/managementComp/BlogManagement/Author', name: 'Author', element:AuthorCom},
  {path: '/managementComp/BlogManagement/Blogs', name: 'Blogs', element:Blogs},

  {path: '/managementComp/StudentManagements', name: 'StudentManagements', element:StudentManagements},
  {path: '/managementComp/TeacherManagement', name: 'TeacherManagement', element:TeacherManagement},
  {path: '/managementComp/OnlineTeachers', name: 'OnlineTeachers', element:OnlineTeachers},
 
  {path: '/managementComp/MesaageManagement', name: 'MessageManagements', element:MessageManagements},
  {path: '/managementComp/ReviewQuestion', name: 'ReviewQuestion', element:ReviewQuestion},
  {path: '/managementComp/Doubt', name: 'Doubt', element:Doubt},
  {path: '/managementComp/DoubtHistory/SclDoubt', name: 'Doubt', element:SclDoubt},
  {path: '/managementComp/DoubtHistory/All', name: 'Doubt', element:AllDoubt},
  {path: '/managementComp/ViewWebsite/Collab', name: 'Collab', element:Collab},
  {path: '/managementComp/ViewWebsite/Contact', name: 'Contact', element:Contact},
  
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  {path: '/managementComp/Question', name: 'Question', element:Question},

  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes

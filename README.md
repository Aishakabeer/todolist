# 📋 Todo List Application

A modern, vibrant task management application built with Django and featuring a beautiful calendar-based interface with real-time task management capabilities.

![Django](https://img.shields.io/badge/Django-4.x-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with title, description, and due dates
- ✅ **Edit Tasks** - Modify existing task details anytime
- ✅ **Delete Tasks** - Remove tasks with confirmation dialog
- ✅ **Mark Complete** - Toggle task completion status with one click
- ✅ **Task Filtering** - View all, pending, or completed tasks
- ✅ **Calendar View** - Interactive monthly calendar with tasks displayed by date
- ✅ **Task Details** - View comprehensive task information

### User Interface
- 🎨 **Vibrant Design** - Modern, colorful UI with smooth animations
- 📱 **Responsive Layout** - Works seamlessly on desktop and mobile devices
- 🔄 **Real-time Updates** - AJAX-powered task toggling without page reload
- 💡 **Intuitive Navigation** - Easy-to-use interface with clear call-to-action buttons
- ⚡ **Fast Performance** - Optimized CSS with smooth transitions

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- SQLite3 (included with Python)

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd c:\Users\aisha\OneDrive\Desktop\WISTORA\pro\todolist
```

2. **Create a virtual environment (optional but recommended):**
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
```

3. **Install dependencies:**
```bash
pip install django
```

4. **Apply database migrations:**
```bash
python manage.py migrate
```

5. **Create a superuser (optional for admin access):**
```bash
python manage.py createsuperuser
```

---

## 📖 Usage

### Running the Application

1. **Start the development server:**
```bash
python manage.py runserver
```

2. **Open your browser and navigate to:**
```
http://127.0.0.1:8000
```

3. **You'll see the calendar view with all your tasks**

### Main Views

#### 📅 Calendar View (Home)
- Monthly calendar display
- Tasks grouped by due date
- Quick task toggle with checkbox
- Edit button for each task
- Quick add form for new tasks
- Navigation buttons for previous/next month

#### 📝 Task List View
- All tasks in a list format
- Filter by status (All, Pending, Completed)
- View, Edit, and Delete buttons for each task
- Task status badge (Pending/Completed)
- Due date display

#### ➕ Add Task
- Form to create new tasks
- Fields: Title, Description, Due Date
- Form validation
- Cancel option

#### ✏️ Edit Task
- Modify existing task details
- Same fields as Add Task
- Cancel option
- Back button

#### 🗑️ Delete Task
- Confirmation dialog
- Shows task title being deleted
- Confirm or Cancel option
- Safety warning about permanent deletion

#### 📋 Task Detail
- Full task information
- Created and updated timestamps
- Task status display
- Edit, Delete, and Back buttons
- Checkbox to toggle completion

---

## 🏗️ Project Structure

```
todolist/
├── manage.py                 # Django management script
├── db.sqlite3               # SQLite database
├── README.md               # This file
│
├── todolist/               # Project settings
│   ├── settings.py        # Django settings
│   ├── urls.py           # Main URL configuration
│   ├── wsgi.py          # WSGI configuration
│   └── asgi.py          # ASGI configuration
│
├── tasks/                 # Main app
│   ├── migrations/       # Database migrations
│   ├── templatetags/     # Custom template tags
│   │   └── custom_filters.py  # Dictionary access filter
│   ├── models.py         # Task model
│   ├── views.py          # View functions
│   ├── forms.py          # Task form
│   ├── urls.py           # App URL patterns
│   ├── admin.py          # Django admin config
│   └── apps.py           # App configuration
│
├── template/             # HTML templates
│   └── tasks/
│       ├── base.html         # Base template
│       ├── calendar.html      # Calendar view
│       ├── task_list.html     # Task list view
│       ├── add_task.html      # Add task form
│       ├── edit_task.html     # Edit task form
│       ├── delete_task.html   # Delete confirmation
│       └── task_detail.html   # Task detail view
│
└── static/              # Static files
    └── css/
        └── style.css    # Main stylesheet
```

---

## 🛠️ Technologies Used

### Backend
- **Django 4.x** - Web framework
- **Python 3.8+** - Programming language
- **SQLite** - Database

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with gradients and animations
- **JavaScript** - Interactive features and AJAX
- **Bootstrap Grid** - Responsive layout

### Key Libraries
- `django` - Web framework
- `python-calendar` - Calendar generation

---

## 📊 Database Models

### Task Model
```python
- id (Primary Key)
- title (CharField, max_length=200)
- description (TextField, optional)
- due_date (DateField)
- completed (BooleanField, default=False)
- created_at (DateTimeField, auto_now_add=True)
- updated_at (DateTimeField, auto_now=True)
```

---

## 🎨 Color Scheme

The application uses a vibrant, modern color palette:

- **Primary Red**: `#ff6b6b` - Main action buttons and headings
- **Teal**: `#4ecdc4` - Success and positive actions
- **Cyan Blue**: `#45b7d1` - Secondary actions
- **Bright Red**: `#ff4757` - Danger/Delete actions
- **Orange**: `#ffa502` - Warnings

---

## 🔧 API Endpoints

### Views & Routes

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Calendar view (home) |
| GET | `/tasks/` | Task list view |
| GET/POST | `/task/add/` | Add task form |
| GET | `/task/<id>/` | Task detail view |
| GET/POST | `/task/<id>/edit/` | Edit task form |
| GET/POST | `/task/<id>/delete/` | Delete task confirmation |
| POST | `/task/<id>/toggle/` | Toggle task completion (AJAX) |

---

## ⚙️ Configuration

### Settings (settings.py)
- `DEBUG = True` - Set to False in production
- `ALLOWED_HOSTS = ['*']` - Configure for production
- `INSTALLED_APPS` - Includes tasks app
- `STATIC_URL = '/static/'` - Static files path

---

## 🐛 Error Handling

The application includes:
- ✅ Validation for empty form fields
- ✅ Proper error handling for invalid URL parameters
- ✅ 404 page for missing tasks
- ✅ CSRF protection on all forms
- ✅ Safe deletion confirmation

---

## 📝 Form Validation

### Task Form
- **Title**: Required, max 200 characters
- **Description**: Optional
- **Due Date**: Required, valid date format

---

## 🚀 Future Enhancements

- [ ] User authentication and accounts
- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Drag-and-drop task management
- [ ] Dark mode theme
- [ ] Export tasks to PDF/CSV
- [ ] Collaborative task sharing
- [ ] Mobile app
- [ ] Task search functionality
- [ ] Task comments/notes

---

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: Full calendar and list views
- **Tablet**: Adjusted layout and spacing
- **Mobile**: Optimized touch interface with larger buttons

---

## 🔐 Security Features

- CSRF token protection on all forms
- Secure POST requests for data modification
- XSS protection
- SQL injection prevention (Django ORM)
- Safe database queries

---

## 📄 Admin Interface

Access Django admin panel at: `http://127.0.0.1:8000/admin/`

Features:
- View all tasks
- Create/edit/delete tasks
- Filter tasks by completion status
- Search tasks by title

---

## 🐚 Django Commands

Useful commands for development:

```bash
# Start development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access Django shell
python manage.py shell

# Collect static files (production)
python manage.py collectstatic

# Run tests (if implemented)
python manage.py test
```

---

## 📸 Screenshots

### Calendar View
- Monthly calendar with tasks
- Color-coded task items
- Quick task toggling
- Easy navigation

### Task List
- All tasks displayed
- Filter options (All, Pending, Completed)
- Status badges
- Action buttons

### Task Forms
- Clean, centered forms
- Vibrant color scheme
- Form validation
- Clear button labels

---

## 💡 Tips & Tricks

1. **Quick Task Addition**: Use the "Add New Task" form in the calendar view
2. **Task Filtering**: Click filter buttons to view specific task statuses
3. **Calendar Navigation**: Use Previous/Today/Next buttons to navigate months
4. **Quick Toggle**: Click the checkbox to mark tasks complete instantly
5. **Task Details**: Click "View" on any task to see full details

---

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Project Name**: Todo List Application  
**Created**: December 2025  
**Version**: 1.0.0

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Review the code comments
3. Test in different browsers
4. Check Django error logs

---

## 🎯 Quick Start Checklist

- [ ] Install Python 3.8+
- [ ] Navigate to project directory
- [ ] Install Django: `pip install django`
- [ ] Run migrations: `python manage.py migrate`
- [ ] Start server: `python manage.py runserver`
- [ ] Open `http://127.0.0.1:8000` in browser
- [ ] Start managing your tasks!

---

**Happy Task Management! 🎉**

For any questions or improvements, feel free to reach out or create an issue.

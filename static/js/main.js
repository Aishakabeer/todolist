// Main JavaScript file for Todo List Calendar

// Get CSRF token from the DOM
function getCsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value || 
           document.querySelector('input[name=csrfmiddlewaretoken]')?.value || '';
}

// Toggle task completion via AJAX
function toggleTask(taskId) {
    const csrftoken = getCsrfToken();
    
    fetch(`/task/${taskId}/toggle/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskElement) {
                taskElement.classList.toggle('completed');
                const checkbox = taskElement.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = data.completed;
                }
            }
        }
    })
    .catch(error => {
        console.error('Error toggling task:', error);
    });
}

// Toggle task and refresh page
function toggleTaskAndRefresh(taskId) {
    const csrftoken = getCsrfToken();
    
    fetch(`/task/${taskId}/toggle/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Small delay for visual feedback
            setTimeout(() => {
                location.reload();
            }, 200);
        }
    })
    .catch(error => {
        console.error('Error toggling task:', error);
    });
}

// Toggle task detail
function toggleTaskDetail(taskId) {
    const csrftoken = getCsrfToken();
    
    fetch(`/task/${taskId}/toggle/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            setTimeout(() => {
                location.reload();
            }, 200);
        }
    })
    .catch(error => {
        console.error('Error toggling task:', error);
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Ctrl+N or Cmd+N to add new task
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            const addTaskLink = document.querySelector('a[href*="/task/add/"]');
            if (addTaskLink) {
                window.location.href = addTaskLink.href;
            }
        }
    });

    // Add confirm dialog for delete actions
    const deleteLinks = document.querySelectorAll('a.btn-delete');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this task?')) {
                e.preventDefault();
            }
        });
    });

    // Add visual feedback for form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
            }
        });
    });

    // Add date input validation
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                console.warn('Selected date is in the past');
            }
        });
    });
});

// Utility function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Utility function to get task status
function getTaskStatus(task) {
    return task.completed ? 'Completed' : 'Pending';
}

// Utility function to calculate days until due
function daysUntilDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

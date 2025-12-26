from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils import timezone
from datetime import datetime, timedelta
import calendar as cal
from .models import Task
from .forms import TaskForm

def get_calendar(year, month):
    """Generate calendar data for a given month"""
    first_day = datetime(year, month, 1)
    last_day = datetime(year, month, cal.monthrange(year, month)[1])
    
    calendar_data = []
    for week in cal.monthcalendar(year, month):
        week_data = []
        for day in week:
            if day == 0:
                week_data.append(None)
            else:
                week_data.append({
                    'day': day,
                    'date': datetime(year, month, day).date(),
                    'is_today': datetime(year, month, day).date() == timezone.now().date()
                })
        calendar_data.append(week_data)
    
    return calendar_data

def calendar_view(request):
    """Display calendar with tasks"""
    now = timezone.now()
    year = request.GET.get('year', '')
    month = request.GET.get('month', '')
    
    try:
        year = int(year) if year else now.year
        month = int(month) if month else now.month
    except (ValueError, TypeError):
        year = now.year
        month = now.month
    
    # Navigation
    prev_month = month - 1 if month > 1 else 12
    prev_year = year if month > 1 else year - 1
    next_month = month + 1 if month < 12 else 1
    next_year = year if month < 12 else year + 1
    
    # Get calendar data
    calendar_data = get_calendar(year, month)
    
    # Get all tasks for the month
    first_day = datetime(year, month, 1).date()
    last_day = datetime(year, month, cal.monthrange(year, month)[1]).date()
    tasks = Task.objects.filter(due_date__range=[first_day, last_day]).order_by('due_date')
    
    # Group tasks by date
    tasks_by_date = {}
    for task in tasks:
        date_key = task.due_date.isoformat()
        if date_key not in tasks_by_date:
            tasks_by_date[date_key] = []
        tasks_by_date[date_key].append(task)
    
    context = {
        'calendar_data': calendar_data,
        'month_name': cal.month_name[month],
        'year': year,
        'month': month,
        'prev_month': prev_month,
        'prev_year': prev_year,
        'next_month': next_month,
        'next_year': next_year,
        'tasks_by_date': tasks_by_date,
    }
    
    return render(request, 'tasks/calendar.html', context)

def task_list(request):
    """Display list of all tasks"""
    tasks = Task.objects.all().order_by('-due_date')
    completed_filter = request.GET.get('completed')
    
    if completed_filter == 'true':
        tasks = tasks.filter(completed=True)
    elif completed_filter == 'false':
        tasks = tasks.filter(completed=False)
    
    context = {
        'tasks': tasks,
        'completed_filter': completed_filter,
    }
    return render(request, 'tasks/task_list.html', context)

def add_task(request):
    """Add a new task"""
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('calendar')
    else:
        form = TaskForm()
    
    context = {'form': form}
    return render(request, 'tasks/add_task.html', context)

def edit_task(request, pk):
    """Edit a task"""
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('calendar')
    else:
        form = TaskForm(instance=task)
    
    context = {'form': form, 'task': task}
    return render(request, 'tasks/edit_task.html', context)

def delete_task(request, pk):
    """Delete a task"""
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        task.delete()
        return redirect('calendar')
    
    context = {'task': task}
    return render(request, 'tasks/delete_task.html', context)

@require_POST
def toggle_task(request, pk):
    """Toggle task completion status (AJAX)"""
    task = get_object_or_404(Task, pk=pk)
    task.completed = not task.completed
    task.save()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'success': True, 'completed': task.completed})
    
    return redirect('calendar')

def task_detail(request, pk):
    """View task details"""
    task = get_object_or_404(Task, pk=pk)
    context = {'task': task}
    return render(request, 'tasks/task_detail.html', context)

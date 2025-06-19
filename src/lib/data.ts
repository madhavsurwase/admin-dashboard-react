import type { KanbanTask, KanbanColumn, TableRowData, BarChartData, LineChartData, PieChartData } from './types';

export const initialKanbanTasks: KanbanTask[] = [
  { id: 'task-1', title: 'Design Homepage UI', description: 'Create mockups and prototypes for the new homepage.', status: 'todo', priority: 'high', dueDate: '2024-08-15' },
  { id: 'task-2', title: 'Develop API Endpoints', description: 'Implement REST APIs for user authentication and data management.', status: 'todo', priority: 'high' },
  { id: 'task-3', title: 'Setup Database Schema', description: 'Define and create the database schema for the project.', status: 'inprogress', priority: 'medium', dueDate: '2024-08-10' },
  { id: 'task-4', title: 'Write Unit Tests for API', description: 'Ensure API endpoints are working correctly with comprehensive tests.', status: 'inprogress' },
  { id: 'task-5', title: 'User Acceptance Testing', description: 'Conduct UAT with stakeholders.', status: 'done', priority: 'medium' },
  { id: 'task-6', title: 'Deploy to Staging', description: 'Deploy the latest build to the staging environment for review.', status: 'done' },
  { id: 'task-7', title: 'Plan Q4 Marketing Campaign', status: 'todo', priority: 'low' },
  { id: 'task-8', title: 'Review Feature Requests', status: 'inprogress', description: 'Go through all incoming feature requests and prioritize.' },
];

export const initialKanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    taskIds: initialKanbanTasks.filter(t => t.status === 'todo').map(t => t.id),
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    taskIds: initialKanbanTasks.filter(t => t.status === 'inprogress').map(t => t.id),
  },
  {
    id: 'done',
    title: 'Done',
    taskIds: initialKanbanTasks.filter(t => t.status === 'done').map(t => t.id),
  },
];


export const sampleTableData: TableRowData[] = [
  { id: 'user-1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'Admin', lastLogin: '2024-07-28 10:00 AM', status: 'active' },
  { id: 'user-2', name: 'Bob The Builder', email: 'bob@example.com', role: 'Editor', lastLogin: '2024-07-27 02:30 PM', status: 'active' },
  { id: 'user-3', name: 'Charlie Chaplin', email: 'charlie@example.com', role: 'Viewer', lastLogin: '2024-07-28 09:15 AM', status: 'inactive' },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', lastLogin: '2024-07-25 11:00 AM', status: 'pending' },
  { id: 'user-5', name: 'Edward Scissorhands', email: 'edward@example.com', role: 'Viewer', lastLogin: '2024-07-26 05:45 PM', status: 'active' },
  { id: 'user-6', name: 'Fiona Apple', email: 'fiona@example.com', role: 'Admin', lastLogin: '2024-07-28 08:00 AM', status: 'active' },
  { id: 'user-7', name: 'George Orwell', email: 'george@example.com', role: 'Editor', lastLogin: '2024-07-20 01:00 PM', status: 'inactive' },
];

export const sampleBarChartData: BarChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const sampleLineChartData: LineChartData = [
  { month: 'Jan', sales: 65 },
  { month: 'Feb', sales: 59 },
  { month: 'Mar', sales: 80 },
  { month: 'Apr', sales: 81 },
  { month: 'May', sales: 56 },
  { month: 'Jun', sales: 55 },
  { month: 'Jul', sales: 40 },
];

export const samplePieChartData: PieChartData = [
  { category: 'Electronics', count: 400, fill: 'hsl(var(--chart-1))' },
  { category: 'Clothing', count: 300, fill: 'hsl(var(--chart-2))' },
  { category: 'Groceries', count: 300, fill: 'hsl(var(--chart-3))' },
  { category: 'Books', count: 200, fill: 'hsl(var(--chart-4))' },
  { category: 'Home Goods', count: 278, fill: 'hsl(var(--chart-5))' },
];

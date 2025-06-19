
export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string; // Corresponds to columnId
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface TableRowData {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  lastLogin: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface ChartDataItem {
  name: string;
  value: number;
  // Optional fill color for pie/bar charts
  fill?: string;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}

export type BarChartData = ChartDataItem[];
export type LineChartData = MonthlySales[];
export type PieChartData = CategoryDistribution[];

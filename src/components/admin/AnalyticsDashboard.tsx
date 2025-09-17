import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Users, Calendar, FileText, MessageSquare, Download, Eye } from "lucide-react";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Sample data for charts
  const usageData = [
    { date: "2024-11-01", bookings: 12, resources: 45, forum: 23, sos: 2 },
    { date: "2024-11-08", bookings: 18, resources: 52, forum: 31, sos: 1 },
    { date: "2024-11-15", bookings: 24, resources: 38, forum: 28, sos: 3 },
    { date: "2024-11-22", bookings: 31, resources: 67, forum: 42, sos: 1 },
    { date: "2024-11-29", bookings: 28, resources: 58, forum: 35, sos: 4 },
    { date: "2024-12-06", bookings: 35, resources: 71, forum: 48, sos: 2 }
  ];

  const departmentData = [
    { department: "Computer Science", students: 245, bookings: 67, resources: 156 },
    { department: "Mechanical Engineering", students: 198, bookings: 43, resources: 98 },
    { department: "Electronics", students: 167, bookings: 38, resources: 87 },
    { department: "Civil Engineering", students: 134, bookings: 28, resources: 64 },
    { department: "Chemical Engineering", students: 98, bookings: 21, resources: 45 }
  ];

  const categoryData = [
    { name: "Academic Stress", value: 35, color: "#8884d8" },
    { name: "Anxiety", value: 28, color: "#82ca9d" },
    { name: "Depression", value: 18, color: "#ffc658" },
    { name: "Relationship Issues", value: 12, color: "#ff7300" },
    { name: "Other", value: 7, color: "#0088fe" }
  ];

  const monthlyTrends = [
    { month: "Aug", users: 145, sessions: 423, bookings: 67 },
    { month: "Sep", users: 167, sessions: 489, bookings: 78 },
    { month: "Oct", users: 189, sessions: 534, bookings: 89 },
    { month: "Nov", users: 234, sessions: 612, bookings: 102 },
    { month: "Dec", users: 267, sessions: 698, bookings: 118 }
  ];

  const insights = [
    {
      title: "Booking Increase",
      value: "+23.5%",
      change: "vs last month",
      trend: "up",
      description: "More students are seeking professional help"
    },
    {
      title: "Resource Usage",
      value: "+18.2%",
      change: "vs last month",
      trend: "up",
      description: "Higher engagement with educational content"
    },
    {
      title: "Forum Activity",
      value: "+31.4%",
      change: "vs last month",
      trend: "up",
      description: "Increased peer-to-peer support"
    },
    {
      title: "Response Time",
      value: "-12.3%",
      change: "vs last month",
      trend: "down",
      description: "Faster emergency response times"
    }
  ];

  const exportData = (format: string) => {
    // In a real app, this would generate and download the actual file
    alert(`Exporting analytics data as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor system usage and student engagement patterns</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {insight.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${insight.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {insight.change}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Usage Trends</CardTitle>
          <CardDescription>Weekly breakdown of platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="resources" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="forum" stackId="1" stroke="#ffc658" fill="#ffc658" />
              <Area type="monotone" dataKey="sos" stackId="1" stroke="#ff7300" fill="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Department Engagement</CardTitle>
            <CardDescription>Bookings by academic department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Support Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Support Categories</CardTitle>
            <CardDescription>Distribution of support requests by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>User growth and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="sessions" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="bookings" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
            <CardDescription>Real-time platform metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Active Users</span>
                </div>
                <Badge variant="outline">267 students</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Appointments This Week</span>
                </div>
                <Badge variant="outline">43 bookings</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Resources Accessed</span>
                </div>
                <Badge variant="outline">1,234 views</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Forum Posts</span>
                </div>
                <Badge variant="outline">89 posts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Average Response Time</span>
                </div>
                <Badge variant="outline">4.2 minutes</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
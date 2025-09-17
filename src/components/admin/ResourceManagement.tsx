import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Video, Headphones, Plus, Edit, Trash2, Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ResourceManagement = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Managing Academic Stress",
      description: "Learn effective techniques to handle academic pressure and maintain mental well-being during exams.",
      type: "video",
      category: "Stress Management",
      language: "English",
      duration: "15 minutes",
      uploadDate: "2024-11-15",
      downloads: 234,
      views: 567,
      isActive: true
    },
    {
      id: 2,
      title: "Deep Breathing Exercise",
      description: "Guided meditation and breathing exercises to reduce anxiety and promote relaxation.",
      type: "audio",
      category: "Anxiety",
      language: "Hindi",
      duration: "10 minutes",
      uploadDate: "2024-11-20",
      downloads: 189,
      views: 423,
      isActive: true
    },
    {
      id: 3,
      title: "Understanding Depression",
      description: "Comprehensive guide about recognizing symptoms and seeking help for depression.",
      type: "guide",
      category: "Depression",
      language: "English",
      duration: "20 pages",
      uploadDate: "2024-11-10",
      downloads: 145,
      views: 321,
      isActive: true
    },
    {
      id: 4,
      title: "Sleep Hygiene Tips",
      description: "Practical strategies for better sleep quality and managing sleep-related anxiety.",
      type: "guide",
      category: "Sleep",
      language: "Regional",
      duration: "8 pages",
      uploadDate: "2024-11-25",
      downloads: 98,
      views: 201,
      isActive: false
    }
  ]);

  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "video",
    category: "Stress Management",
    language: "English",
    duration: ""
  });

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const categories = ["Stress Management", "Anxiety", "Depression", "Sleep", "Academic", "Social"];
  const languages = ["English", "Hindi", "Regional"];
  const types = ["video", "audio", "guide"];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    const matchesType = filterType === "all" || resource.type === filterType;
    return matchesCategory && matchesType;
  });

  const handleAddResource = () => {
    if (!newResource.title || !newResource.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const resource = {
      id: resources.length + 1,
      ...newResource,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      views: 0,
      isActive: true
    };

    setResources([...resources, resource]);
    setNewResource({
      title: "",
      description: "",
      type: "video",
      category: "Stress Management",
      language: "English",
      duration: ""
    });
    setIsAddResourceOpen(false);
    
    toast({
      title: "Resource Added",
      description: `${resource.title} has been added successfully`
    });
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
    toast({
      title: "Resource Deleted",
      description: "Resource has been deleted successfully"
    });
  };

  const toggleResourceStatus = (id: number) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, isActive: !resource.isActive } : resource
    ));
    toast({
      title: "Status Updated",
      description: "Resource status has been updated"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'guide': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'audio': return 'bg-green-100 text-green-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: resources.length,
    active: resources.filter(r => r.isActive).length,
    totalViews: resources.reduce((sum, r) => sum + r.views, 0),
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Resources</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalViews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(type)}
                        <span className="capitalize">{type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isAddResourceOpen} onOpenChange={setIsAddResourceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>
                    Upload a new educational resource for students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newResource.title}
                      onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                      placeholder="Enter resource title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                      placeholder="Enter resource description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newResource.type} onValueChange={(value) => setNewResource({...newResource, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(type)}
                              <span className="capitalize">{type}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newResource.category} onValueChange={(value) => setNewResource({...newResource, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={newResource.language} onValueChange={(value) => setNewResource({...newResource, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>{language}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newResource.duration}
                      onChange={(e) => setNewResource({...newResource, duration: e.target.value})}
                      placeholder="e.g., 15 minutes, 10 pages"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddResource} className="flex-1">Add Resource</Button>
                    <Button variant="outline" onClick={() => setIsAddResourceOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>Resources ({filteredResources.length})</CardTitle>
          <CardDescription>Manage educational content and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                        <Badge variant={resource.isActive ? "default" : "secondary"}>
                          {resource.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>📅 {resource.uploadDate}</span>
                        <span>🌐 {resource.language}</span>
                        <span>⏱️ {resource.duration}</span>
                        <span>👁️ {resource.views} views</span>
                        <span>📥 {resource.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleResourceStatus(resource.id)}
                    >
                      {resource.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceManagement;
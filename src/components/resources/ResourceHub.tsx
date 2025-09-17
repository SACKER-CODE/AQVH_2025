import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Video, 
  Headphones, 
  FileText, 
  Download, 
  Play, 
  Clock,
  Star,
  Eye,
  Heart,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  category: 'stress' | 'anxiety' | 'depression' | 'wellness' | 'other';
  language: string;
  duration: string;
  rating: number;
  views: number;
  thumbnail: string;
  featured: boolean;
}

const ResourceHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources: Resource[] = [
    {
      id: "1",
      title: "Managing Exam Stress Effectively",
      description: "Learn practical techniques to handle academic pressure and perform better during exams.",
      type: "video",
      category: "stress",
      language: "English",
      duration: "15 min",
      rating: 4.8,
      views: 1250,
      thumbnail: "/video-thumb-1.jpg",
      featured: true
    },
    {
      id: "2", 
      title: "Mindfulness Meditation for Students",
      description: "A guided meditation session designed specifically for student stress relief.",
      type: "audio",
      category: "wellness",
      language: "English",
      duration: "20 min",
      rating: 4.9,
      views: 890,
      thumbnail: "/audio-thumb-1.jpg",
      featured: true
    },
    {
      id: "3",
      title: "Overcoming Social Anxiety",
      description: "Step-by-step guide to build confidence and overcome social anxiety in college settings.",
      type: "guide",
      category: "anxiety",
      language: "English", 
      duration: "10 min read",
      rating: 4.7,
      views: 675,
      thumbnail: "/guide-thumb-1.jpg",
      featured: false
    },
    {
      id: "4",
      title: "Sleep Hygiene for Better Mental Health",
      description: "Understanding the connection between sleep and mental wellness with practical tips.",
      type: "video",
      category: "wellness",
      language: "English",
      duration: "12 min",
      rating: 4.6,
      views: 1100,
      thumbnail: "/video-thumb-2.jpg",
      featured: false
    },
    {
      id: "5",
      title: "Breathing Exercises for Panic Attacks",
      description: "Quick and effective breathing techniques to manage panic attacks and acute anxiety.",
      type: "audio",
      category: "anxiety",
      language: "Hindi",
      duration: "8 min",
      rating: 4.8,
      views: 540,
      thumbnail: "/audio-thumb-2.jpg",
      featured: false
    },
    {
      id: "6",
      title: "Building Resilience in College",
      description: "Comprehensive guide to developing emotional resilience and coping strategies.",
      type: "guide",
      category: "wellness",
      language: "English",
      duration: "25 min read",
      rating: 4.9,
      views: 820,
      thumbnail: "/guide-thumb-2.jpg",
      featured: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'anxiety', label: 'Anxiety Support' },
    { value: 'depression', label: 'Depression Help' },
    { value: 'wellness', label: 'General Wellness' },
    { value: 'other', label: 'Other' }
  ];

  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Spanish', label: 'Spanish' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'guide', label: 'Guides' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesType = selectedType === 'all' || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'guide': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'anxiety': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'depression': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'wellness': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-primary-soft to-tertiary-soft rounded-t-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
            {getTypeIcon(resource.type)}
          </div>
        </div>
        {resource.featured && (
          <Badge className="absolute top-2 left-2 bg-tertiary text-tertiary-foreground">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <Button 
          size="icon" 
          variant="outline" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {resource.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getCategoryColor(resource.category)}>
              {resource.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{resource.language}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{resource.duration}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{resource.views}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Button className="flex-1" size="sm">
              <Play className="w-4 h-4 mr-2" />
              {resource.type === 'guide' ? 'Read' : 'Play'}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Wellness Resource Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access our comprehensive library of mental health resources including videos, 
          audio sessions, and guides designed to support your wellbeing journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredResources.length} resources
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceHub;
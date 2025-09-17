import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Heart, 
  Flag, 
  Clock, 
  TrendingUp,
  Shield,
  Users,
  Eye,
  ThumbsUp,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'student_volunteer';
    isAnonymous: boolean;
  };
  category: string;
  replies: number;
  likes: number;
  views: number;
  createdAt: string;
  isSticky: boolean;
  isFlagged: boolean;
  tags: string[];
}

const PeerSupportForum = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    isAnonymous: false,
    tags: ''
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic Stress' },
    { value: 'social', label: 'Social Issues' },
    { value: 'anxiety', label: 'Anxiety Support' },
    { value: 'motivation', label: 'Motivation' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'general', label: 'General Discussion' }
  ];

  const posts: ForumPost[] = [
    {
      id: "1",
      title: "Struggling with final exam anxiety - need support",
      content: "Hey everyone, I'm finding it really hard to manage my anxiety with final exams coming up. The pressure is overwhelming and I can't seem to focus on studying. Has anyone else experienced this?",
      author: {
        name: "Sarah M.",
        role: "student",
        isAnonymous: false
      },
      category: "academic",
      replies: 12,
      likes: 8,
      views: 45,
      createdAt: "2 hours ago",
      isSticky: false,
      isFlagged: false,
      tags: ["anxiety", "exams", "stress"]
    },
    {
      id: "2",
      title: "Tips for maintaining friendships while dealing with depression",
      content: "I've been going through a tough time with depression and I'm worried about losing my friends. How do you balance taking care of your mental health while maintaining relationships?",
      author: {
        name: "Anonymous",
        role: "student",
        isAnonymous: true
      },
      category: "relationships",
      replies: 18,
      likes: 24,
      views: 89,
      createdAt: "5 hours ago",
      isSticky: true,
      isFlagged: false,
      tags: ["depression", "friendship", "relationships"]
    },
    {
      id: "3",
      title: "Study techniques that helped me overcome procrastination",
      content: "After struggling with procrastination for months, I finally found some techniques that work. I wanted to share them in case they help others here...",
      author: {
        name: "Alex Johnson",
        avatar: "/student-avatar-1.jpg",
        role: "student_volunteer",
        isAnonymous: false
      },
      category: "motivation",
      replies: 7,
      likes: 15,
      views: 67,
      createdAt: "1 day ago",
      isSticky: false,
      isFlagged: false,
      tags: ["study", "procrastination", "productivity"]
    },
    {
      id: "4",
      title: "Feeling overwhelmed with social situations",
      content: "I find it really difficult to be in group settings and social events. The anxiety becomes too much sometimes. Anyone have similar experiences?",
      author: {
        name: "Anonymous",
        role: "student",
        isAnonymous: true
      },
      category: "social",
      replies: 9,
      likes: 6,
      views: 34,
      createdAt: "2 days ago",
      isSticky: false,
      isFlagged: false,
      tags: ["social-anxiety", "groups"]
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'replies':
        return b.replies - a.replies;
      case 'recent':
      default:
        return 0; // Simplified for demo
    }
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post created successfully!",
      description: "Your post has been submitted and will be reviewed by moderators."
    });

    setNewPost({
      title: '',
      content: '',
      category: '',
      isAnonymous: false,
      tags: ''
    });
    setShowCreatePost(false);
  };

  const PostCard = ({ post }: { post: ForumPost }) => (
    <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {post.author.isAnonymous ? '?' : post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">
                    {post.author.isAnonymous ? 'Anonymous' : post.author.name}
                  </p>
                  {post.author.role === 'student_volunteer' && (
                    <Badge variant="outline" className="text-xs bg-tertiary-soft border-tertiary">
                      <Shield className="w-3 h-3 mr-1" />
                      Volunteer
                    </Badge>
                  )}
                  {post.isSticky && (
                    <Badge variant="outline" className="text-xs bg-primary-soft border-primary">
                      Pinned
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{post.createdAt}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-accent">
              {categories.find(c => c.value === post.category)?.label}
            </Badge>
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.replies}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Peer Support Forum</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow students, share experiences, and support each other 
          in a safe and moderated environment.
        </p>
      </div>

      {/* Stats and Create Post */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-tertiary mx-auto mb-2" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-muted-foreground">Posts Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold">456</p>
            <p className="text-sm text-muted-foreground">Replies Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Button 
              className="w-full" 
              onClick={() => setShowCreatePost(!showCreatePost)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>
              Share your thoughts, ask for support, or start a discussion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="What's on your mind?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={newPost.category} 
                  onValueChange={(value) => setNewPost({...newPost, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== 'all').map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, experiences, or questions..."
                rows={4}
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                placeholder="anxiety, support, study-tips (separate with commas)"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="anonymous"
                checked={newPost.isAnonymous}
                onCheckedChange={(checked) => setNewPost({...newPost, isAnonymous: checked})}
              />
              <Label htmlFor="anonymous">Post anonymously</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCreatePost(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to start a conversation!
              </p>
              <Button onClick={() => setShowCreatePost(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PeerSupportForum;
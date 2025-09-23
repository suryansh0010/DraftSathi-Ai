import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  Plus, 
  MessageCircle, 
  Scale, 
  Heart,
  Building2,
  Download,
  AlertTriangle,
  X,
  Menu,
  ExternalLink,
  Shield,
  Lock,
  Star
} from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import legalHeroBg from '@/assets/legal-hero-bg.jpg';

interface DomainCard {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const domains: DomainCard[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: <Heart className="w-8 h-8" />,
    description: 'Medical contracts, compliance documents, and healthcare agreements',
    color: 'from-red-100 to-pink-100'
  },
  {
    id: 'land-registry',
    name: 'Land Registry',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Property deeds, land agreements, and real estate documentation',
    color: 'from-green-100 to-emerald-100'
  }
];

const DraftSathiLanding = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    setUploadedFile(null);
    setResults(null);
    setProgress(0);
  };

  const handleFileUpload = useCallback((file: File) => {
    const allowedTypes = ['.doc', '.docx', '.pdf'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload only .doc, .docx, or .pdf files');
      return;
    }
    
    setUploadedFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    // Mock results
    setResults({
      summary: "This document contains 12 clauses. Key risk areas: termination clause (ambiguous), indemnity (missing), and jurisdiction clause (favors counterparty).",
      issues: [
        { 
          clause: "Clause 4.2 - Termination", 
          severity: "High", 
          issue: "Ambiguous notice period", 
          suggestion: "Replace with '30 days written notice'" 
        },
        { 
          clause: "Clause 7.1 - Indemnity", 
          severity: "Medium", 
          issue: "Missing mutual indemnification", 
          suggestion: "Add reciprocal indemnity clause" 
        },
        { 
          clause: "Clause 9.3 - Jurisdiction", 
          severity: "Low", 
          issue: "Favors counterparty location", 
          suggestion: "Consider neutral jurisdiction" 
        }
      ]
    });
    
    setIsProcessing(false);
  };

  const downloadRevisedDocument = () => {
    if (!uploadedFile) return;
    
    const revisedContent = `Revised Document: ${uploadedFile.name}\n\nThis is a mock revised document with AI suggestions applied.`;
    const blob = new Blob([revisedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${uploadedFile.name.split('.')[0]}-reviewed.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const DomainSelector = () => (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 text-shadow">
          Choose Your Domain
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Select a specialized domain for AI-powered document review, drafting suggestions, and clause analysis
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 slide-up">
        {domains.map((domain, index) => (
          <Card 
            key={domain.id}
            className={`domain-card group bg-white/95 backdrop-blur-sm border-white/20 animate-delay-${index * 100}`}
            onClick={() => handleDomainSelect(domain.id)}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {domain.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                {domain.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
            </div>
          </Card>
        ))}
        
        <Card className="domain-card-add group bg-white/90 backdrop-blur-sm border-2 border-dashed border-accent/50 hover:border-accent hover:bg-white/95">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Plus className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-accent mb-4">
              Add New Domain
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Request a new specialized domain for your specific legal needs
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const DocumentUploader = () => (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-8">
        <Button 
          variant="outline" 
          onClick={() => setSelectedDomain(null)}
          className="mb-6 bg-white/90 border-white/20 text-primary hover:bg-white"
        >
          ← Back to Domains
        </Button>
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Upload Your {domains.find(d => d.id === selectedDomain)?.name} Document
        </h2>
        <p className="text-lg text-white/90">
          Drag & drop or click to upload your .docx, .doc, or .pdf file
        </p>
      </div>

      <Card className="p-8 mb-8 bg-white/95 backdrop-blur-sm">
        {!uploadedFile ? (
          <div
            className="border-2 border-dashed border-accent/50 rounded-2xl p-12 text-center hover:border-accent transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-accent mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-primary mb-4">
              Upload Document
            </h3>
            <p className="text-muted-foreground mb-6">
              Supported formats: .doc, .docx, .pdf (Max 20MB)
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Demo mode: Files processed locally</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <FileText className="w-8 h-8 text-accent" />
              <div>
                <h4 className="font-semibold text-primary">{uploadedFile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUploadedFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {!isProcessing && !results && (
              <Button onClick={simulateProcessing} className="btn-primary">
                Start AI Review
              </Button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".doc,.docx,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />
      </Card>

      {isProcessing && (
        <Card className="p-6 mb-8 bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <Brain className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-primary mb-4">
              AI is analyzing your document...
            </h3>
            <div className="progress-bar mb-2">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        </Card>
      )}

      {results && (
        <Card className="p-8 fade-in bg-white/95 backdrop-blur-sm">
          <h3 className="text-2xl font-serif font-bold text-primary mb-6">
            Analysis Results
          </h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-2">Executive Summary</h4>
            <p className="text-muted-foreground bg-secondary/50 p-4 rounded-xl">
              {results.summary}
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="font-semibold text-primary mb-4">Key Issues Found</h4>
            <div className="space-y-4">
              {results.issues.map((issue: any, index: number) => (
                <div key={index} className="border border-border/50 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge 
                      variant={issue.severity === 'High' ? 'destructive' : 
                              issue.severity === 'Medium' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {issue.severity}
                    </Badge>
                    <div>
                      <h5 className="font-semibold text-primary">{issue.clause}</h5>
                      <p className="text-sm text-muted-foreground">{issue.issue}</p>
                    </div>
                  </div>
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                    <p className="text-sm text-success-foreground">
                      <strong>Suggestion:</strong> {issue.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={downloadRevisedDocument} className="btn-primary">
              <Download className="w-4 h-4 mr-2" />
              Download Revised Document
            </Button>
            <Button variant="outline" onClick={() => setChatOpen(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Request Human Review
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-accent" />
              <h1 className="text-2xl font-serif font-bold text-primary">
                DraftSathi AI
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="#login" className="text-foreground hover:text-primary transition-colors">Login</a>
              <Button className="btn-hero">Get Started</Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${legalHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Strong overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/85"></div>
        <div className="container mx-auto relative z-10">
          {selectedDomain ? <DocumentUploader /> : <DomainSelector />}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to get professional legal document assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: <Upload className="w-12 h-12" />,
                title: "Upload File",
                description: "Drag & drop your .docx. We'll parse it instantly with enterprise-grade security."
              },
              {
                icon: <Brain className="w-12 h-12" />,
                title: "AI Processing", 
                description: "AI analyzes clauses, flags risk, and suggests edits based on legal best practices."
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: "Get Assistance",
                description: "Accept changes, download revised doc, or request a lawyer review for complex cases."
              }
            ].map((step, index) => (
              <Card key={index} className="p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-serif font-bold">DraftSathi AI</h3>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Professional AI-powered legal document assistance for healthcare, property, and more.
              </p>
              <p className="text-primary-foreground/60 text-sm">
                contact@draftsathi.ai
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'About', 'Services', 'FAQ', 'Get Started'].map(link => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Legal Resources</h4>
              <div className="space-y-3">
                {[
                  { name: 'NALSA', url: 'https://nalsa.gov.in' },
                  { name: 'Ministry of Law', url: 'https://lawmin.gov.in' },
                  { name: 'Indian Code', url: 'https://indiancode.nic.in' },
                  { name: 'eCourts', url: 'https://ecourts.gov.in' },
                  { name: 'Bar Council of India', url: 'https://barcouncilofindia.org' },
                  { name: 'Supreme Court', url: 'https://supremecourtofindia.nic.in' }
                ].map(link => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 DraftSathi AI. Files processed locally. Privacy policy applies in production.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-bubble"
          aria-label="Open chat support"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-primary">Legal Assistant</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-secondary/50 p-3 rounded-xl">
              <p className="text-sm text-foreground">
                Hi! I'm here to help. Choose a quick option:
              </p>
            </div>
            <div className="space-y-2">
              {[
                "How do I upload a document?",
                "Is my data safe?",
                "Request human review"
              ].map(option => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-sm"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftSathiLanding;
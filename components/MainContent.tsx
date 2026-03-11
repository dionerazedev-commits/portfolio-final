
import React, { useState } from 'react';
import { LayoutGrid, Square, ArrowUpRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface CaseStudy {
  overview: string;
  problem: string;
  solution: string[];
  impact: string[];
}

const CaseStudyModal = ({ isOpen, onClose, title, caseStudy }: { isOpen: boolean; onClose: () => void; title: string; caseStudy: CaseStudy | null }) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-[#222] overflow-y-auto custom-scrollbar"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0c0c0c] border-b border-[#222]">
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-12">
              <section className="space-y-4">
                <h3 className="text-xs mono-font text-yellow-500 uppercase tracking-widest font-bold">Project Overview</h3>
                <p className="text-lg text-gray-300 leading-relaxed mono-font">{caseStudy.overview}</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs mono-font text-yellow-500 uppercase tracking-widest font-bold">Problem</h3>
                <p className="text-lg text-gray-300 leading-relaxed mono-font">{caseStudy.problem}</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs mono-font text-yellow-500 uppercase tracking-widest font-bold">Solution</h3>
                <ul className="space-y-3">
                  {caseStudy.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 mono-font">
                      <span className="text-yellow-500 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs mono-font text-yellow-500 uppercase tracking-widest font-bold">Impact</h3>
                <ul className="space-y-3">
                  {caseStudy.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 mono-font">
                      <span className="text-yellow-500 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ImageLightbox = ({ isOpen, onClose, imageUrl, title }: { isOpen: boolean; onClose: () => void; imageUrl: string; title: string }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-7xl max-h-full flex items-center justify-center"
        >
          <img 
            src={imageUrl} 
            alt={title} 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#333]"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 mono-font text-xs uppercase tracking-widest"
          >
            <span>Close Zoom</span>
            <X size={20} />
          </button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  link?: string;
  caseStudy?: CaseStudy;
  onCaseStudyClick?: (title: string, caseStudy: CaseStudy) => void;
  onZoomClick?: (url: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, link, caseStudy, onCaseStudyClick, onZoomClick }) => (
  <motion.div 
    variants={revealVariants}
    className="flex flex-col border border-[#222] bg-[#0c0c0c] hover:border-[#333] transition-all group h-full relative"
  >
    <div 
      onClick={() => {
        if (caseStudy && onCaseStudyClick) {
          onCaseStudyClick(title, caseStudy);
        } else if (link) {
          window.open(link, '_blank');
        }
      }}
      className="flex items-start justify-between p-4 border-b border-[#222] min-h-[80px] cursor-pointer"
    >
      <h3 className="mono-font text-xs text-white font-medium tracking-tight leading-relaxed uppercase pr-4">{title}</h3>
      <div className="text-yellow-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform mt-1 flex-shrink-0">
        <ArrowUpRight size={18} />
      </div>
    </div>
    <div className="aspect-[16/11] overflow-hidden bg-[#1a1a1a] relative group/img">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Zoom Overlay */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onZoomClick?.(imageUrl);
        }}
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
      >
        <div className="bg-yellow-500 text-black p-3 rounded-full transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
          <ZoomIn size={20} />
        </div>
      </div>
    </div>
  </motion.div>
);

const ServiceList = ({ items }: { items: string[] }) => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12"
  >
    {items.map((item, idx) => (
      <motion.div key={idx} variants={revealVariants} className="flex items-start gap-3">
        <span className="text-gray-600 mt-1.5 flex-shrink-0">•</span>
        <span className="text-gray-400 mono-font text-base leading-relaxed">{item}</span>
      </motion.div>
    ))}
  </motion.div>
);

interface TechCardProps {
  name: string;
  category: string;
  logo: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, category, logo }) => (
  <motion.div 
    variants={revealVariants}
    className="aspect-square border-r border-b border-[#222] bg-[#0c0c0c] p-6 flex flex-col justify-between hover:bg-[#121212] transition-colors group"
  >
    <span className="text-xs mono-font text-gray-500 uppercase tracking-tighter">{name}</span>
    <div className="flex-1 flex items-center justify-center p-2">
      <img 
        src={logo} 
        alt={name} 
        className="w-16 h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
        referrerPolicy="no-referrer" 
      />
    </div>
    <span className="text-[10px] mono-font text-gray-600 self-end uppercase tracking-widest">{category}</span>
  </motion.div>
);

const AwardItem = ({ title, year }: { title: string; year: string }) => (
  <motion.div variants={revealVariants} className="flex items-end gap-2 group cursor-default">
    <span className="text-white font-bold text-lg mono-font flex-shrink-0">{title}</span>
    <div className="flex-1 border-b border-dashed border-[#333] mb-1.5 group-hover:border-gray-500 transition-colors"></div>
    <span className="text-gray-400 font-bold text-lg mono-font flex-shrink-0">{year}</span>
  </motion.div>
);

const Testimonial = ({ text, name, role, avatar, reverse = false }: { text: string; name: string; role: string; avatar: string; reverse?: boolean }) => (
  <motion.div 
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''} max-w-4xl mx-auto mb-16 relative z-10`}
  >
    <div className="flex-shrink-0">
      <div className="w-20 h-20 rounded-full border-2 border-[#333] overflow-hidden grayscale">
        <img src={avatar} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
    </div>
    <div className="flex-1 bg-[#0c0c0c] border border-[#222] p-8 md:p-12 relative">
      <p className="text-gray-400 mono-font text-lg leading-relaxed mb-6">
        {text}
      </p>
      <div className="mono-font">
        <span className="text-white font-bold">{name}</span>
        <span className="text-gray-600">, {role}</span>
      </div>
    </div>
  </motion.div>
);

const Input = ({ label, placeholder, type = "text", required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) => (
  <motion.div variants={revealVariants} className="space-y-3">
    <label className="block text-gray-400 mono-font text-sm">{label}{required ? '*' : ''}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#121212] border border-[#222] p-5 text-white mono-font placeholder:text-gray-700 focus:outline-none focus:border-gray-500 transition-colors"
    />
  </motion.div>
);

const FrontendProjectCard = ({ title, description, link }: { title: string; description: string; link: string }) => (
  <motion.div 
    variants={revealVariants}
    className="flex flex-col border border-[#222] bg-[#0c0c0c] hover:border-[#333] transition-all group h-full p-8"
  >
    <div className="flex justify-between items-start mb-6">
      <h3 className="text-xl font-bold text-white uppercase tracking-tighter leading-none">{title}</h3>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-yellow-500 hover:text-yellow-400 transition-colors"
      >
        <ArrowUpRight size={24} />
      </a>
    </div>
    <p className="text-sm text-gray-400 mono-font leading-relaxed mb-8 flex-1">
      {description}
    </p>
    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#222]/50">
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[10px] mono-font text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
      >
        Live Demo <ArrowUpRight size={12} />
      </a>
      <div className="w-2 h-2 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors"></div>
    </div>
  </motion.div>
);

export const MainContent: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<{ title: string; data: CaseStudy } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);

  const handleCaseStudyClick = (title: string, data: CaseStudy) => {
    setSelectedCaseStudy({ title, data });
    setIsModalOpen(true);
  };

  const handleZoomClick = (url: string, title: string) => {
    setZoomedImage({ url, title });
  };

  // Generate line numbers up to 426
  const lines = Array.from({ length: 426 }, (_, i) => i + 1);

  return (
    <main className="flex-1 bg-[#0e0e0e] flex relative overflow-y-auto">
      {/* Line Numbers Column */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 border-r border-[#333] flex-shrink-0 py-8 hidden sm:flex flex-col items-center select-none bg-[#0e0e0e] z-10"
      >
        {lines.map((num) => (
          <div key={num} className="line-numbers mono-font text-[12px] leading-[1.8] opacity-40">
            {num}
          </div>
        ))}
      </motion.div>

      {/* Actual Content Wrapper */}
      <div className="flex-1">
        <div className="max-w-[1400px]">
          {/* Hero Section */}
          <section id="home" className="p-8 lg:px-16 lg:py-24 min-h-[70vh] flex flex-col justify-center border-b border-[#222]/50">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- Hero section -->"}</motion.div>
              <motion.div variants={revealVariants} className="space-y-0 mb-12">
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.85] tracking-tighter uppercase">AI Automation</h2>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-gray-600 leading-[0.85] tracking-tighter uppercase">& Frontend Developer</h2>
              </motion.div>
              <motion.div variants={revealVariants} className="max-w-4xl space-y-6">
                <p className="text-xl md:text-2xl mono-font leading-relaxed text-gray-400">
                  I build intelligent systems and modern web applications that streamline operations and turn complex workflows into simple, automated experiences. From AI-powered automation and CRM systems to responsive SaaS dashboards and analytics platforms, I help businesses operate faster, smarter, and more efficiently.
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* Featured Work Section */}
          <section id="work" className="p-6 lg:p-12 lg:px-16 border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-8 text-sm italic">{"<!-- Featured work & Experience -->"}</motion.div>
              <motion.div variants={revealVariants} className="flex justify-end gap-1 mb-10">
                <button className="p-1.5 bg-[#1a1a1a] text-gray-400 border border-[#333] hover:text-white transition-colors"><LayoutGrid size={16} /></button>
                <button className="p-1.5 bg-transparent text-gray-600 border border-[#222] hover:bg-[#1a1a1a] transition-colors"><Square size={16} /></button>
              </motion.div>
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <ProjectCard 
                  title="AI Content Repurposing" 
                  imageUrl="https://lh3.googleusercontent.com/d/1ugBCixWhFkzd4NrFMaXzi4zAGp0_OdZz" 
                  onZoomClick={(url) => handleZoomClick(url, "AI Content Repurposing")}
                  caseStudy={{
                    overview: "Automated Content Repurposing Engine built in both Zapier and Make.com. Transforms raw audio/video files into 2 blog posts, Instagram & LinkedIn posts, plus logging — fully no-code with AI transcription, generation, conditional paths, and multi-platform distribution.",
                    problem: "Content creators and teams spend 4–6 hours manually transcribing, rewriting, formatting, and posting each audio/video piece — leading to inconsistent output, burnout, delayed distribution, and missed reach across blogs and social channels.",
                    solution: [
                      "Trigger: New file in Google Drive / OneDrive folder",
                      "AI transcription → Generate 2 unique blog variants",
                      "Create platform-specific social posts (Instagram + LinkedIn)",
                      "Log everything to Google Sheets",
                      "Conditional Paths/Router: Filter by keywords or quality to control auto-posting",
                      "Identical logic implemented in Zapier (simple, beginner-friendly) and Make.com (advanced branching/visual flows) with strong AI prompt engineering."
                    ],
                    impact: [
                      "Reduced repurposing time from hours to ~5–10 minutes of review",
                      "Scaled output: 1 file → 2 blogs + 2 social posts + log automatically",
                      "Improved consistency, brand alignment, and weekly reach",
                      "Enabled safe, reliable automation with filters preventing unwanted posts",
                      "Demonstrated cross-platform no-code expertise (Zapier + Make.com) for content marketing efficiency."
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="Smart Lead Qualification & Automated Follow-Up" 
                  imageUrl="https://lh3.googleusercontent.com/d/1RLxdzix2yesNEzvqNrMOquUM3flnu8PT" 
                  onZoomClick={(url) => handleZoomClick(url, "Smart Lead Qualification & Automated Follow-Up")}
                  caseStudy={{
                    overview: "Automated B2B Lead Qualification & Outreach Workflow built in Zapier. Triggers in real-time via Webhooks by Zapier, enriches leads using Apollo.io integration, scores/prioritizes based on firmographics (company size, revenue, industry fit), stores high-priority leads in a SQL database (e.g., SQL Server, MySQL, or PostgreSQL), notifies the sales team via Slack/email, and (bonus) generates personalized email drafts via AI (OpenAI/ChatGPT or Google AI Studio/Gemini). High-priority leads receive full automated handling; lower-priority ones get lighter routing.",
                    problem: "Sales teams receive real-time inbound leads from various sources but spend excessive time on manual enrichment, qualification, prioritization, and personalized outreach. Without automation, low-fit leads waste resources, high-value opportunities get delayed, and outreach lacks consistency — resulting in inefficient pipelines and lost revenue in B2B sales.",
                    solution: [
                      "Trigger: Webhooks by Zapier receives real-time lead data (first_name, last_name, email, company_name, company_size, website, lead_source).",
                      "Enrichment: Use Apollo.io action to enrich with revenue, employee count, industry, tech stack, and other firmographics via Apollo's API integration.",
                      "Scoring & Prioritization: Formatter by Zapier + Paths by Zapier for conditional logic — score based on company size (e.g., 100–5,000 employees = high), revenue bands, industry match to ICP, and lead source.",
                      "Routing: Paths split flow — high-priority: save to SQL database (via SQL Server/MySQL/PostgreSQL integration), notify team via Slack/email, generate personalized email draft with AI by Zapier (OpenAI or Gemini) using enriched data + tailored prompt, then send draft or email via Gmail/Outlook. Low-priority: basic notification or log only.",
                      "Storage & Notification: Insert enriched/qualified leads into SQL database rows. Send instant Slack/email alerts for high-priority leads.",
                      "Bonus LLM Step: AI by Zapier (OpenAI/ChatGPT or Google AI Studio/Gemini) creates short, context-aware outreach emails highlighting value prop, pain points, and company-specific insights.",
                      "Fully no-code in Zapier with webhook triggers, Apollo actions, Paths for branching, SQL writes, notifications, and built-in AI for scalable, real-time sales automation."
                    ],
                    impact: [
                      "Reduced manual lead processing from hours to seconds per lead.",
                      "Automatically prioritized high-fit leads — focusing sales on the top 20–30% with strongest conversion potential.",
                      "Boosted outreach quality and response rates through AI-personalized, data-enriched email drafts.",
                      "Centralized SQL storage for clean reporting, CRM syncing, and pipeline analytics.",
                      "Tiered routing ensured safe, targeted follow-up without over-contacting low-priority leads.",
                      "Showcased advanced Zapier skills: webhooks, Apollo enrichment, Paths logic, SQL integration, team notifications, and AI generation for modern B2B sales efficiency."
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="Asana CRM Automation System" 
                  imageUrl="https://lh3.googleusercontent.com/d/1WyrHA7qSum4-X6GSHXtUPiQpqmdL6e8K" 
                  onZoomClick={(url) => handleZoomClick(url, "Asana CRM Automation System")}
                  link="https://docs.google.com/presentation/d/1iOBihJxwTDRk25ZBTCw8qaBGiM8iu_gd_O5cO8kQt5o/edit?slide=id.g3b08b12231d_0_0#slide=id.g3b08b12231d_0_0"
                />
                <ProjectCard 
                  title="Automated Gmail Attachment Intelligence & Routing" 
                  imageUrl="https://lh3.googleusercontent.com/d/1GplsktqoLPIaYU40ZRu-1rd3K1-MGWyt" 
                  onZoomClick={(url) => handleZoomClick(url, "Automated Gmail Attachment Intelligence & Routing")}
                  caseStudy={{
                    overview: "Intelligent Gmail Attachment Processor. Built a fully automated workflow using Make.com (formerly Integromat) that monitors incoming Gmail emails, intelligently analyzes attachments (PDFs, XLSX, CSV, DOCX, etc.) with AI, renames files descriptively based on content, uploads them to a designated Google Drive folder, logs key details in Google Sheets, and optionally sends confirmation emails. The scenario integrates Gmail, Google Drive, Google Sheets, and Google Gemini AI (or OpenAI/ChatGPT) for content review and smart renaming.",
                    problem: "Manual handling of incoming email attachments was time-consuming and error-prone. Team members had to: constantly monitor Gmail for new emails with files, download and open each attachment to understand its content, manually rename files meaningfully, upload to the correct Google Drive folder, and track processing history and details. This led to delays, misfiled documents, lost time, and inconsistent organization—especially in high-volume scenarios like real estate, invoicing, or document-heavy workflows.",
                    solution: [
                      "Trigger: Gmail → Watch Emails for new messages with attachments.",
                      "Extract: List attachments and download file data.",
                      "AI Analysis: Upload file to Google Gemini AI (or OpenAI API) to generate a short, descriptive summary of the content.",
                      "Rename: Dynamically create intelligent filenames (e.g., 'Q4_Invoice_ClientX_2025.pdf') based on AI output.",
                      "Store: Upload renamed file to a specific Google Drive folder.",
                      "Log: Append timestamp, original filename, new filename, file type, and AI summary to a Google Sheet row.",
                      "Notify (optional): Send Gmail confirmation after successful processing."
                    ],
                    impact: [
                      "Time saved: Reduced manual processing from 5–10 minutes per attachment to near-zero hands-on time.",
                      "Accuracy & consistency: AI-driven renaming eliminated guesswork and ensured uniform, searchable filenames.",
                      "Organization: Centralized, properly named files in Drive + full audit trail in Sheets improved document retrieval and compliance.",
                      "Scalability: Handles high volumes effortlessly; client reported reliable 24/7 operation with zero missed files.",
                      "Client outcome: Streamlined real estate/document workflow, allowing focus on core business instead of admin tasks."
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="Automated Financial Export Pipeline" 
                  imageUrl="https://lh3.googleusercontent.com/d/1fQ4oH6VMDDT3ACweWzyNXQZ-i679Mc-Y" 
                  onZoomClick={(url) => handleZoomClick(url, "Automated Financial Export Pipeline")}
                  caseStudy={{
                    overview: "Automated Xero General Ledger Attachment to Asana Tasks. Developed a no-code automation in Make.com that triggers when a task in Asana is marked complete, pulls detailed transaction data from Xero (via API as a substitute for the unavailable General Ledger Detail report), formats it into a CSV file mirroring the standard downloaded 'Account Transactions' report, and attaches the CSV directly to the completed Asana task for archival and reference.",
                    problem: "Clients needed an automatic record of the General Ledger Detail for tasks (e.g., financial reviews or year-end processes) once marked complete in Asana. Xero's API lacks direct support for the General Ledger Detail report or easy transaction exports in human-readable CSV format. Manual steps involved: Logging into Xero, Navigating to Reports > Account Transactions, Filtering for the desired period (e.g., last calendar year), Downloading CSV, Uploading/attaching to Asana. This was repetitive, time-consuming, and prone to oversight or inconsistency.",
                    solution: [
                      "Trigger: Asana → Watch Completed Tasks.",
                      "Fetch Data: Xero → Make an API Call to retrieve transaction-level data (using Reports endpoint or aggregated calls for bank transactions/journals/invoices to approximate Account Transactions for the last calendar year: Jan 1 – Dec 31).",
                      "Process & Format: Use Router, Iterators, Google Sheets (temporary staging), Text Aggregator, and Tools to structure data into CSV format matching Xero's downloaded report layout (columns like Date, Description, Reference, Account, Amount, etc.).",
                      "Attach: Asana → Upload Attachment to attach the generated CSV file to the completed task.",
                      "Cleanup: Clear temporary Google Sheets ranges and add logging/sleeps for reliability."
                    ],
                    impact: [
                      "Time saved: Eliminated 10–20 minutes of manual Xero navigation, export, and Asana upload per completed task.",
                      "Accuracy & consistency: CSV mirrors exact Xero report format → zero formatting errors, reliable audit trail attached directly to task.",
                      "Compliance & visibility: Automatic attachment ensures financial transaction history is preserved in project context (e.g., real estate closings, audits, client deliverables).",
                      "Scalability: Handles multiple tasks daily with no added effort; client gained hands-free archival for year-end/general ledger processes."
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="AI Jobs Scraper + Resume Optimizer System" 
                  imageUrl="https://lh3.googleusercontent.com/d/1iENI_54wQ7DnJ3xrRj1a6AAgFUIU9Kse" 
                  onZoomClick={(url) => handleZoomClick(url, "AI Jobs Scraper + Resume Optimizer System")}
                  caseStudy={{
                    overview: "AI Jobs Scraper + Resume Optimizer System (built with n8n). This intelligent automation pipeline streamlines the job application workflow end-to-end. It monitors incoming job requests via Slack, scrapes tailored job listings from relevant sources, uses AI to customize resumes for each role, stores optimized versions in Google Drive, drafts personalized application emails, and sends completion reports back to Slack — fully automated in a single n8n workflow.",
                    problem: "Manual job applications are highly repetitive and inefficient. Searching for suitable listings, tailoring resumes to match job descriptions, organizing files, and writing customized emails take hours per application. This leads to fatigue, inconsistent tailoring, disorganized tracking, and missed opportunities in competitive markets.",
                    solution: [
                      "Triggers on Slack job requests",
                      "Scrapes and filters relevant job postings",
                      "Analyzes job descriptions with AI to tailor resumes (keyword optimization, skill highlighting, ATS-friendly adjustments)",
                      "Saves customized resumes to Google Drive with clear naming",
                      "Generates draft application emails",
                      "Notifies results via Slack"
                    ],
                    impact: [
                      "Time savings — Reduced application time from hours to minutes per job, enabling 10x+ more applications without added effort",
                      "Consistency & quality — AI-driven tailoring improves ATS compatibility and relevance; studies show tailored/AI-assisted resumes boost interview rates by 40–300% (e.g., from ~30% to 70% callbacks in real cases, or 3x more interviews with fewer submissions)",
                      "Scalability — Supports high-volume job searches while keeping applications professional and organized",
                      "Personal productivity — Frees up time for interviews, skill-building, and networking instead of repetitive tasks"
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="AI Webhook Agent & Customer Intake Automation" 
                  imageUrl="https://lh3.googleusercontent.com/d/19LSO-CxBQUFNDZHi6ECzWgNallGZyNiQ" 
                  onZoomClick={(url) => handleZoomClick(url, "AI Webhook Agent & Customer Intake Automation")}
                  caseStudy={{
                    overview: "AI Webhook Agent & Customer Intake Automation (built with n8n). A fully autonomous, webhook-triggered AI agent that instantly handles incoming customer inquiries and applications. It classifies intent, answers FAQs in real time, extracts and structures application data, saves records cleanly, and sends personalized confirmation emails — all without human involvement.",
                    problem: "Manual processing of customer inquiries and applications creates major bottlenecks: Slow response times frustrate users and lose leads; Inconsistent answers damage brand trust; Fragmented data entry leads to errors and lost information; Delayed or forgotten follow-ups reduce conversion rates. These issues scale poorly and consume significant staff time.",
                    solution: [
                      "Analyzes incoming messages with AI to detect intent",
                      "Instantly replies to common FAQs with accurate, branded responses",
                      "Extracts key data from applications (name, email, preferences, documents, etc.)",
                      "Structures and stores clean records (Google Sheets, Airtable, database)",
                      "Triggers personalized confirmation & next-step emails via SMTP/Mailgun",
                      "All executed in seconds, 24/7, with zero manual touch."
                    ],
                    impact: [
                      "Response time — Reduced from hours/days to under 10 seconds for most inquiries",
                      "Lead capture & quality — 100% structured data collection; eliminated missed or incomplete submissions",
                      "Operational efficiency — Removed 80–95% of repetitive inquiry/application handling work",
                      "Customer experience — Instant, consistent, professional communication → higher satisfaction and trust",
                      "Conversion lift — Faster follow-up and better data quality typically increase application completion and downstream conversion rates by 20–50% (industry benchmarks for automated intake flows)"
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="AI Voice Receptionist & Dynamic Appointment Manager" 
                  imageUrl="https://lh3.googleusercontent.com/d/1n929yATdP0dtjO1ZEZoCRHvO1c9U6bUo" 
                  onZoomClick={(url) => handleZoomClick(url, "AI Voice Receptionist & Dynamic Appointment Manager")}
                  caseStudy={{
                    overview: "AI Voice Receptionist & Dynamic Appointment Manager (built with n8n). A production-grade, fully autonomous AI receptionist that exposes multiple webhook/API endpoints to handle real-time voice and system-driven appointment workflows. It instantly checks calendar availability, books new slots, updates or reschedules existing appointments, processes cancellations, and stores call recordings + metadata in Airtable — all without any human intervention.",
                    problem: "Traditional appointment scheduling via phone or manual entry suffered from: Long wait times and after-hours unavailability; Human errors in double-booking, miscommunication, or missed cancellations; High staff burden for routine tasks (checking slots, updating calendars, logging calls); Limited scalability during peak demand or outside business hours. These issues led to lost bookings, frustrated customers, and inefficient operations.",
                    solution: [
                      "Get Availability — Real-time slot checking across calendars",
                      "Book Appointment — Validates input, creates calendar event, confirms via voice/text",
                      "Update Appointment — Modifies existing bookings with conflict detection",
                      "Cancel Appointment — Safely deletes/cancels slots and notifies parties",
                      "Call Logging — Automatically captures recordings and metadata in Airtable"
                    ],
                    impact: [
                      "Availability — 24/7 instant booking & management (no more missed after-hours opportunities)",
                      "Staff time saved — Eliminated 90–100% of routine phone and scheduling work",
                      "Error reduction — Near-zero double-bookings or data-entry mistakes through automated validation",
                      "Customer experience — Instant responses and consistent, professional handling → higher satisfaction and booking completion rates",
                      "Business scalability — Handles unlimited concurrent requests without adding headcount; enables growth in appointment volume without proportional cost increase"
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
                <ProjectCard 
                  title="AI ASMR Video Production & Multi-Platform Publishing" 
                  imageUrl="https://lh3.googleusercontent.com/d/1nfdD2zKiYYTHTDn0PeO0WyxnaA5T_1B8" 
                  onZoomClick={(url) => handleZoomClick(url, "AI ASMR Video Production & Multi-Platform Publishing")}
                  caseStudy={{
                    overview: "AI ASMR Video Production & Multi-Platform Publishing (built with n8n). A completely autonomous pipeline that turns high-level ideas into ready-to-watch short-form ASMR videos and publishes them across platforms. The system auto-generates creative prompts, renders videos using AI video generation tools, validates output quality, converts formats, adds metadata, and uploads directly to YouTube and Facebook — fully hands-free.",
                    problem: "Creating and distributing short-form ASMR content is extremely labor-intensive: Manually writing detailed prompts for each video; Waiting for renders, checking quality, fixing errors; Editing/exporting in correct formats; Uploading, titling, describing, and scheduling on multiple platforms. This cycle limits output to a few videos per week, causes burnout, and prevents consistent posting schedules needed for algorithm growth.",
                    solution: [
                      "Generates varied, high-quality ASMR prompts (triggers, themes, durations)",
                      "Submits to AI video generation engine and monitors rendering",
                      "Validates successful output (length, audio presence, no errors)",
                      "Converts & optimizes files for platform specs",
                      "Auto-uploads with SEO-optimized titles, descriptions, tags, thumbnails",
                      "Publishes simultaneously to YouTube Shorts and Facebook Reels",
                      "The entire process executes unattended, producing polished content at scale."
                    ],
                    impact: [
                      "Production speed — From idea to published video in minutes instead of hours/days",
                      "Output volume — 10–30× increase in weekly content (e.g., daily posts vs. 2–3 per week)",
                      "Consistency — Uniform quality, branding, posting cadence → stronger algorithm favor and audience retention",
                      "Time & cost savings — Eliminated 95%+ of manual creative and publishing labor",
                      "Growth potential — Enables rapid experimentation with themes/triggers and sustained high-frequency posting, accelerating channel/subscriber growth in competitive short-form niches"
                    ]
                  }}
                  onCaseStudyClick={handleCaseStudyClick}
                />
              </motion.div>
            </motion.div>
          </section>

          {/* Frontend Development Projects Section */}
          <section id="frontend-dev" className="p-8 lg:px-16 lg:py-24 border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- Frontend Development Projects -->"}</motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-4">
                  <motion.h2 variants={revealVariants} className="text-4xl font-bold text-white uppercase tracking-tighter mb-4">Frontend Developer</motion.h2>
                  <motion.div variants={revealVariants} className="w-12 h-1 bg-yellow-500 mb-8"></motion.div>
                </div>
                <div className="lg:col-span-8">
                  <motion.p variants={revealVariants} className="text-xl mono-font leading-relaxed text-gray-400">
                    I build modern, responsive web applications and SaaS interfaces focused on automation, analytics, and productivity tools. My work focuses on clean UI, functional dashboards, and real-world business systems such as invoicing, analytics, booking platforms, and operations dashboards.
                  </motion.p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                <FrontendProjectCard 
                  title="BookWise Pickleball Booking System"
                  link="https://book-wise-pickleball.vercel.app/"
                  description="A modern booking and reservation platform designed for sports facilities. Users can schedule court reservations, manage availability, and streamline bookings through a clean and responsive interface."
                />
                <FrontendProjectCard 
                  title="Flow Invoice – Smart Invoice Generator"
                  link="https://flow-invoice-kit-khq6.vercel.app/"
                  description="A lightweight invoicing tool that allows users to generate professional invoices quickly. Includes structured invoice layouts, automated calculations, and export-ready invoice formats for freelancers and businesses."
                />
                <FrontendProjectCard 
                  title="FlowMetrics – SaaS Automation Dashboard"
                  link="https://flowmetrics-saas-sim.vercel.app/dashboard/automations"
                  description="A SaaS-style analytics and automation dashboard designed to monitor workflows, track KPIs, and manage automated processes. Built with a focus on operational insights and real-time performance monitoring."
                />
                <FrontendProjectCard 
                  title="RedditOps – Community Operations Dashboard"
                  link="https://reddit-ops-psi.vercel.app/"
                  description="An operations dashboard designed to monitor Reddit community metrics, moderation activity, and engagement trends. Helps teams manage community growth and operational workflows."
                />
                <FrontendProjectCard 
                  title="Nexus Analytics Platform"
                  link="https://nexus-analytics-zeta.vercel.app/"
                  description="A data analytics platform that visualizes business metrics through modern dashboards and interactive data components. Built to help teams understand trends, performance, and operational insights."
                />
              </div>

              <motion.div variants={revealVariants} className="border-t border-[#222] pt-8">
                <p className="text-sm text-gray-600 mono-font italic">
                  These projects demonstrate my ability to design and build **production-style web applications, SaaS dashboards, and automation-focused interfaces** using modern frontend development practices.
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* About Me Section */}
          <section id="about-me" className="relative p-8 lg:px-16 lg:py-24 overflow-hidden border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <div className="absolute top-10 left-16 select-none pointer-events-none opacity-[0.06] flex flex-col gap-4">
                 <div className="text-[180px] font-black leading-none text-white tracking-tighter">EST.</div>
                 <div className="text-[180px] font-black leading-none text-white tracking-tighter ml-32">2024</div>
              </div>
              <div className="absolute top-20 right-20 select-none pointer-events-none opacity-[0.1] text-4xl mono-font tracking-widest text-white leading-none">
                ////////////////////////////////////<br/>////////////////////////////////////<br/>////////////////////////////////////<br/>////////////////////////////////////
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7">
                  <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- About me section -->"}</motion.div>
                  <motion.h2 variants={revealVariants} className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
                    <span className="text-white">Automation</span> <span className="text-gray-500">Meets</span><br/><span className="text-white">Frontend Systems</span>
                  </motion.h2>
                  <div className="space-y-8 max-w-2xl">
                    <motion.h3 variants={revealVariants} className="text-xl md:text-2xl font-bold text-yellow-500 uppercase tracking-tighter mb-2">Executive Ops Meets Intelligent Systems</motion.h3>
                    <motion.p variants={revealVariants} className="text-lg md:text-xl mono-font leading-relaxed text-gray-400">
                      I'm an AI Automation Specialist and Frontend Developer who builds systems that streamline operations and power modern digital products. I combine workflow automation with clean, scalable interfaces to create tools that help businesses operate faster and smarter.
                    </motion.p>
                    <motion.p variants={revealVariants} className="text-lg md:text-xl mono-font leading-relaxed text-gray-400">
                      My work includes building automation pipelines using platforms like <span className="bg-yellow-900/40 text-yellow-200 px-1 py-0.5">Zapier, Make.com, and n8n</span>, as well as developing SaaS dashboards, analytics platforms, booking systems, and internal operations tools.
                    </motion.p>
                    <motion.p variants={revealVariants} className="text-lg md:text-xl mono-font leading-relaxed text-gray-400">
                      I focus on designing systems that not only automate repetitive work but also provide clear interfaces for teams to monitor, manage, and scale their operations efficiently.
                    </motion.p>
                  </div>
                </div>
                <motion.div variants={revealVariants} className="lg:col-span-5 flex flex-col">
                  <div className="relative border border-[#222] bg-[#121212] overflow-hidden group">
                    <div className="aspect-square overflow-hidden bg-[#0a0a0a]">
                      <img src="https://i.imgur.com/nd8aQcp.jpeg" alt="Dione Profile" className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* What I Do Section */}
          <section id="what-i-do" className="p-8 lg:px-16 lg:py-24 border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- What I do -->"}</motion.div>
              <div className="space-y-24">
                <div className="space-y-10">
                  <motion.h2 variants={revealVariants} className="text-4xl font-bold text-white uppercase tracking-tighter">01. AI & Automation</motion.h2>
                  <ServiceList items={["Workflow Automation Architecture", "AI Tool Integration", "Prompt Engineering", "Process Optimization Audit", "Content Summarization Automations", "Data Cleaning & Transformation"]} />
                </div>
                <div className="space-y-10">
                  <motion.h2 variants={revealVariants} className="text-4xl font-bold text-white uppercase tracking-tighter">02. CRM & Sales Support</motion.h2>
                  <ServiceList items={["HubSpot & Zoho CRM Management", "GoHighLevel (GHL) Setup", "Lead Tracking & Distribution", "Automated Pipeline Management", "Activity Log Auditing", "Data Synchronization"]} />
                </div>
                <div className="space-y-10">
                  <motion.h2 variants={revealVariants} className="text-4xl font-bold text-white uppercase tracking-tighter">03. FRONTEND DEVELOPMENT</motion.h2>
                  <ServiceList items={["Modern Web Application Development", "SaaS Dashboard Interfaces", "Responsive UI / Mobile-First Design", "Data Visualization Interfaces", "API Integration for Frontend Systems", "Interactive User Experiences", "Product Landing Pages", "Booking & Reservation Platforms", "Analytics & Operations Dashboards"]} />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech-stack" className="p-8 lg:px-16 lg:py-24 border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- My technical tools -->"}</motion.div>
              <motion.div variants={containerVariants} className="border-l border-t border-[#222] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <TechCard name="Zapier" category="Automate" logo="https://cdn.simpleicons.org/zapier/FF6719" />
                <TechCard name="Make.com" category="Automate" logo="https://cdn.simpleicons.org/make/6D28D9" />
                <TechCard name="n8n" category="Automate" logo="https://cdn.simpleicons.org/n8n/FF6D5A" />
                <TechCard name="Airtable" category="Data" logo="https://cdn.simpleicons.org/airtable/18BFFF" />
                <TechCard name="HubSpot" category="CRM" logo="https://cdn.simpleicons.org/hubspot/FF7A59" />
                <TechCard name="GoHighLevel" category="CRM" logo="https://lh3.googleusercontent.com/d/1dPxIfIDrY3drVBS30lwOf8fg_7UsFA4k" />
                <TechCard name="Notion" category="Docs" logo="https://cdn.simpleicons.org/notion/white" />
                <TechCard name="Google Workspace" category="Suite" logo="https://lh3.googleusercontent.com/d/15VMe3gS36JAjrQ9UMJBsO3xPTPmYKMH7" />
                <TechCard name="Slack" category="Comms" logo="https://cdn.simpleicons.org/slack/4A154B" />
                <TechCard name="Asana" category="Project" logo="https://cdn.simpleicons.org/asana/F06B66" />
                <TechCard name="Calendly" category="Scheduling" logo="https://cdn.simpleicons.org/calendly/006BFF" />
                <TechCard name="OpenAI" category="AI" logo="https://lh3.googleusercontent.com/d/1GMkcA0JzpaxvV4Jo7orXs_kQI1c0ZB8n" />
                <TechCard name="JotForm" category="Forms" logo="https://lh3.googleusercontent.com/d/1-LtRBIHqmnLW60nC8SkjwvXN7KAEKFXY" />
              </motion.div>
            </motion.div>
          </section>

          {/* Certifications Section */}
          <section id="awards" className="p-8 lg:px-16 lg:py-24 border-b border-[#222]/50">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-16 text-sm italic">{"<!-- Certifications & Credentials -->"}</motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                <motion.div variants={containerVariants} className="space-y-10">
                  <motion.div variants={revealVariants} className="border border-[#222] bg-[#0c0c0c] py-4 px-8 inline-block min-w-[300px] text-center mb-4">
                    <h3 className="text-gray-400 font-bold text-xl mono-font uppercase tracking-tight">Professional Credentials</h3>
                  </motion.div>
                  <div className="space-y-6">
                    <AwardItem title="Google Data Analytics Professional" year="2025" />
                    <AwardItem title="MS Office Specialist: Excel Associate" year="2025" />
                    <AwardItem title="AI Fundamentals – IBM SkillsBuild" year="2025" />
                    <AwardItem title="Digital Marketing Certification – HubSpot" year="2025" />
                    <AwardItem title="Administrative Professional Foundations" year="2025" />
                  </div>
                </motion.div>
                <motion.div variants={containerVariants} className="space-y-10">
                  <motion.div variants={revealVariants} className="border border-[#222] bg-[#0c0c0c] py-4 px-8 inline-block min-w-[300px] text-center mb-4">
                    <h3 className="text-gray-400 font-bold text-xl mono-font uppercase tracking-tight">Performance metrics</h3>
                  </motion.div>
                  <div className="space-y-6">
                    <AwardItem title="40% Manual Workload Reduction" year="2024" />
                    <AwardItem title="80% Data Accuracy Maintained" year="2024" />
                    <AwardItem title="Multi-CRM Mastery" year="2025" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Client's Word Section */}
          <section id="client-s-word" className="relative p-8 lg:px-16 lg:py-40 border-b border-[#222]/50 overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <div className="absolute top-20 left-10 select-none pointer-events-none opacity-[0.06] flex flex-col gap-4">
                 <div className="text-[220px] font-black leading-none text-white tracking-tighter">WORDS</div>
              </div>
              <div className="relative z-10 text-center mb-32">
                <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- Client Feedback -->"}</motion.div>
                <motion.h2 variants={revealVariants} className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Feedback</motion.h2>
              </div>
              <div className="space-y-24">
                <Testimonial 
                  text="Dione implemented AI-powered workflow automations that reduced our manual data processing by 40%. He is reliable and exceptionally detail-oriented."
                  name="International Client"
                  role="Operations Lead on Upwork"
                  avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Upwork&backgroundColor=1a1a1a"
                />
                <Testimonial 
                  text="The CRM synchronization and lead routing built by Dione have transformed our response times. Highly recommended for any scaling business."
                  name="Strategic Partner"
                  role="Founder at Tech Scaleup"
                  avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Founder&backgroundColor=1a1a1a"
                  reverse={true}
                />
              </div>
            </motion.div>
          </section>

          {/* Contact Me Section - Final section */}
          <section id="contact-me" className="p-8 lg:px-16 lg:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={revealVariants} className="mono-font text-gray-600 mb-12 text-sm italic">{"<!-- Get in Touch -->"}</motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <motion.h2 variants={revealVariants} className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter uppercase">
                    Let's Build<br/>Efficiently
                  </motion.h2>
                </div>

                <motion.div variants={revealVariants} className="w-full h-[600px] border border-[#222] bg-[#0c0c0c] overflow-hidden">
                  <iframe
                    src="https://calendly.com/dioneoro11/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0c0c0c&text_color=ffffff&primary_color=ffffff"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a Consultation"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      <CaseStudyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCaseStudy?.title || ''}
        caseStudy={selectedCaseStudy?.data || null}
      />

      <ImageLightbox 
        isOpen={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
        imageUrl={zoomedImage?.url || ''}
        title={zoomedImage?.title || ''}
      />
    </main>
  );
};

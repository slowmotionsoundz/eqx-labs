/**
 * @file Data Module for EQX Agency Project Management System.
 * Pre-populates projects and typical task templates tailored to all agency services:
 * - 🎙️ Recording & Tracking
 * - 🎵 Music & Audio Production
 * - 💻 Digital Engineering & Platforms
 * - 🎧 DJ Gigs & Live Performance
 * - 🎛️ Live Sound Engineering
 * - 📢 Marketing & Content Campaigns
 * - 🎼 Facility & Studio Rentals
 */

export const INITIAL_PROJECTS = [
  {
    id: "p1",
    title: "Neumann U87 Vocal Tracking Session",
    client: "Eva Robinson (Alabama Machinery)",
    category: "recording",
    categoryLabel: "Recording & Tracking",
    icon: "🎙️",
    iconBg: "rgba(59, 130, 246, 0.15)",
    iconColor: "#3B82F6",
    progress: 80,
    status: "In Session",
    statusBg: "rgba(59, 130, 246, 0.15)",
    statusColor: "#60A5FA",
    dealValue: "21,300 SEK",
    notes: "Main vocal tracks recorded. Backup harmonies scheduled for 15:00."
  },
  {
    id: "p2",
    title: "Analog SSL Stem Mixing & Master",
    client: "Christian Bass (Nordic Operations)",
    category: "production",
    categoryLabel: "Music Production",
    icon: "🎵",
    iconBg: "rgba(0, 210, 211, 0.15)",
    iconColor: "#00D2D3",
    progress: 60,
    status: "Mixing Phase",
    statusBg: "rgba(0, 210, 211, 0.15)",
    statusColor: "#00D2D3",
    dealValue: "14,500 SEK",
    notes: "SSL G-Bus compressor applied. Stem exports ready for client review."
  },
  {
    id: "p3",
    title: "Custom Studio Reservation Portal",
    client: "Helna Julie (Skania Creative Hub)",
    category: "digital",
    categoryLabel: "Digital Engineering",
    icon: "💻",
    iconBg: "rgba(147, 51, 234, 0.15)",
    iconColor: "#C084FC",
    progress: 90,
    status: "Client Review",
    statusBg: "rgba(147, 51, 234, 0.15)",
    statusColor: "#C084FC",
    dealValue: "45,000 SEK",
    notes: "Next.js frontend deployed. Stripe Webhooks verified live."
  },
  {
    id: "p4",
    title: "Skania Club Peak House DJ Gig",
    client: "Skania Nightclub Copenhagen",
    category: "dj-gig",
    categoryLabel: "DJ Gig & Set",
    icon: "🎧",
    iconBg: "rgba(16, 185, 129, 0.15)",
    iconColor: "#34D399",
    progress: 35,
    status: "Preparation",
    statusBg: "rgba(16, 185, 129, 0.15)",
    statusColor: "#34D399",
    dealValue: "18,000 SEK",
    notes: "Peak-time 4-hour tracklist prepared. Rekordbox USB exported."
  },
  {
    id: "p5",
    title: "Concert Hall Front-of-House Sound",
    client: "Huntsville Music Festival",
    category: "live-sound",
    categoryLabel: "Live Sound Eng.",
    icon: "🎛️",
    iconBg: "rgba(245, 158, 11, 0.15)",
    iconColor: "#FBBF24",
    progress: 45,
    status: "Sound Check",
    statusBg: "rgba(245, 158, 11, 0.15)",
    statusColor: "#FBBF24",
    dealValue: "28,500 SEK",
    notes: "Line array system tuned. Wireless mic frequency scan complete."
  },
  {
    id: "p6",
    title: "LP Album Launch & Spotify Pitching",
    client: "Sophia Lee (EQX Records)",
    category: "marketing",
    categoryLabel: "Marketing Campaign",
    icon: "📢",
    iconBg: "rgba(255, 87, 51, 0.15)",
    iconColor: "#FF7D5E",
    progress: 70,
    status: "Active Release",
    statusBg: "rgba(255, 87, 51, 0.15)",
    statusColor: "#FF7D5E",
    dealValue: "12,000 SEK",
    notes: "Teaser video clips posted. Press release sent to Scandinavian media."
  }
];

export const INITIAL_TASKS = [
  // Recording & Tracking Tasks
  { id: "t1", projectId: "p1", title: "Neumann U87 Mic Positioning & Phase Alignment", category: "Recording", completed: true },
  { id: "t2", projectId: "p1", title: "Lead Vocal Take Comping & Pitch Correction", category: "Recording", completed: false },
  { id: "t3", projectId: "p1", title: "Multitrack WAV Backup Export (24-bit/96kHz)", category: "Recording", completed: false },

  // Music Production Tasks
  { id: "t4", projectId: "p2", title: "Analog SSL G-Master Bus Compression Calibration", category: "Production", completed: true },
  { id: "t5", projectId: "p2", title: "Stereo Width & Spatial Atmos Stem Balance", category: "Production", completed: true },
  { id: "t6", projectId: "p2", title: "DDP Image & Master CD Text Export", category: "Production", completed: false },

  // Digital Engineering Tasks
  { id: "t7", projectId: "p3", title: "Figma Interactive UI/UX Design Approval", category: "Digital", completed: true },
  { id: "t8", projectId: "p3", title: "Next.js & Tailwind CSS Studio Portal Frontend", category: "Digital", completed: true },
  { id: "t9", projectId: "p3", title: "Stripe Payment Gateway Integration Test", category: "Digital", completed: false },

  // DJ Gig Tasks
  { id: "t10", projectId: "p4", title: "4-Hour Peak Time Playlist Curation & Cue Points", category: "DJ Gig", completed: true },
  { id: "t11", projectId: "p4", title: "Pioneer CDJ-3000 & DJM-A9 USB Export", category: "DJ Gig", completed: false },

  // Live Sound Tasks
  { id: "t12", projectId: "p5", title: "Line Array Speaker System Calibration & RTA Analysis", category: "Live Sound", completed: true },
  { id: "t13", projectId: "p5", title: "Stage Monitor Mixes & Wireless Mic Frequency Scan", category: "Live Sound", completed: false },

  // Marketing Tasks
  { id: "t14", projectId: "p6", title: "Spotify Editorial Playlist Pitching & Press Release", category: "Marketing", completed: true },
  { id: "t15", projectId: "p6", title: "Social Media 15s Teaser Video Clips & Artwork", category: "Marketing", completed: false }
];

export const INITIAL_CALENDAR_SESSIONS = [
  { id: "c1", title: "Vocal Recording Session", client: "Eva Robinson", room: "Studio A", day: "Mon", time: "10:00 - 13:00", color: "#3B82F6" },
  { id: "c2", title: "Analog Stem Mixing Review", client: "Christian Bass", room: "Console Suite", day: "Wed", time: "14:00 - 16:30", color: "#00D2D3" },
  { id: "c3", title: "Skania Club DJ Performance", client: "Skania Nightclub", room: "Copenhagen Venue", day: "Fri", time: "22:00 - 02:00", color: "#34D399" },
  { id: "c4", title: "FOH Sound Check & Tuning", client: "Huntsville Fest", room: "Concert Hall", day: "Sat", time: "15:00 - 19:00", color: "#FBBF24" }
];

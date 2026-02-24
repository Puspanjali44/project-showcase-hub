export interface NGO {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  verified: boolean;
  raised: number;
  goal: number;
  donors: number;
  image: string;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  progress: number;
  updatesCount: number;
}

export interface DonationRecord {
  id: string;
  ngoName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "recurring";
  project: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export const mockNGOs: NGO[] = [
  {
    id: "1",
    name: "Nepal Education Foundation",
    description: "Providing quality education to underprivileged children in rural Nepal through school construction, teacher training, and scholarship programs.",
    category: "Education",
    location: "Kathmandu",
    verified: true,
    raised: 1250000,
    goal: 2000000,
    donors: 342,
    image: "",
    projects: [
      { id: "p1", title: "Build 5 Schools in Gorkha", description: "Constructing earthquake-resistant schools", raised: 750000, goal: 1000000, progress: 75, updatesCount: 12 },
      { id: "p2", title: "Teacher Training Program", description: "Training 100 rural teachers", raised: 500000, goal: 800000, progress: 62, updatesCount: 8 },
    ],
  },
  {
    id: "2",
    name: "Green Nepal Initiative",
    description: "Environmental conservation and reforestation projects across Nepal, fighting climate change through community-driven tree planting campaigns.",
    category: "Environment",
    location: "Pokhara",
    verified: true,
    raised: 890000,
    goal: 1500000,
    donors: 215,
    image: "",
    projects: [
      { id: "p3", title: "Plant 10,000 Trees", description: "Reforestation in Chitwan", raised: 450000, goal: 600000, progress: 75, updatesCount: 6 },
    ],
  },
  {
    id: "3",
    name: "Nepal Health Access",
    description: "Bringing healthcare services to remote mountain communities through mobile clinics, telemedicine, and community health worker programs.",
    category: "Healthcare",
    location: "Biratnagar",
    verified: true,
    raised: 2100000,
    goal: 3000000,
    donors: 567,
    image: "",
    projects: [
      { id: "p4", title: "Mobile Health Clinic", description: "Healthcare for 20 remote villages", raised: 1200000, goal: 1500000, progress: 80, updatesCount: 15 },
      { id: "p5", title: "Clean Water Project", description: "Installing water purification systems", raised: 900000, goal: 1200000, progress: 75, updatesCount: 10 },
    ],
  },
  {
    id: "4",
    name: "Women Empowerment Nepal",
    description: "Empowering women through skill development, micro-loans, and entrepreneurship training in rural communities across Nepal.",
    category: "Women",
    location: "Lalitpur",
    verified: true,
    raised: 680000,
    goal: 1000000,
    donors: 189,
    image: "",
    projects: [
      { id: "p6", title: "Skill Training for 200 Women", description: "Vocational training programs", raised: 380000, goal: 500000, progress: 76, updatesCount: 7 },
    ],
  },
  {
    id: "5",
    name: "Disaster Relief Nepal",
    description: "Providing immediate relief and long-term recovery support to communities affected by natural disasters in Nepal.",
    category: "Disaster Relief",
    location: "Dhading",
    verified: false,
    raised: 450000,
    goal: 800000,
    donors: 124,
    image: "",
    projects: [
      { id: "p7", title: "Emergency Shelter Program", description: "Temporary housing for displaced families", raised: 300000, goal: 500000, progress: 60, updatesCount: 4 },
    ],
  },
  {
    id: "6",
    name: "Nepal Cultural Heritage",
    description: "Preserving and restoring Nepal's rich cultural heritage, including temples, monuments, and traditional arts and crafts.",
    category: "Culture",
    location: "Bhaktapur",
    verified: true,
    raised: 560000,
    goal: 900000,
    donors: 156,
    image: "",
    projects: [
      { id: "p8", title: "Restore Ancient Temple", description: "Heritage preservation in Bhaktapur", raised: 360000, goal: 500000, progress: 72, updatesCount: 9 },
    ],
  },
];

export const mockDonations: DonationRecord[] = [
  { id: "d1", ngoName: "Nepal Education Foundation", amount: 5000, date: "2025-11-15", status: "completed", project: "Build 5 Schools in Gorkha" },
  { id: "d2", ngoName: "Green Nepal Initiative", amount: 2500, date: "2025-11-10", status: "completed", project: "Plant 10,000 Trees" },
  { id: "d3", ngoName: "Nepal Health Access", amount: 10000, date: "2025-10-20", status: "recurring", project: "Mobile Health Clinic" },
  { id: "d4", ngoName: "Women Empowerment Nepal", amount: 3000, date: "2025-09-05", status: "completed", project: "Skill Training for 200 Women" },
  { id: "d5", ngoName: "Nepal Education Foundation", amount: 5000, date: "2025-08-12", status: "completed", project: "Teacher Training Program" },
];

export const mockBadges: Badge[] = [
  { id: "b1", name: "First Donation", description: "Made your first donation", icon: "🌱", earned: true },
  { id: "b2", name: "Generous Heart", description: "Donated over NPR 10,000", icon: "💛", earned: true },
  { id: "b3", name: "Education Champion", description: "Supported 3 education projects", icon: "📚", earned: true },
  { id: "b4", name: "Recurring Hero", description: "Set up recurring donations", icon: "🔄", earned: true },
  { id: "b5", name: "Top Donor", description: "Ranked in top 10 donors", icon: "🏆", earned: false },
  { id: "b6", name: "Community Builder", description: "Donated to 5 different NGOs", icon: "🤝", earned: false },
];

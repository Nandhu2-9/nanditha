export interface ProjectCodeSnippet {
  language: string;
  title: string;
  description: string;
  code: string;
}

export interface ResumeData {
  name: string;
  title: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  summary: string;
  skills: {
    programming: string[];
    frontend: string[];
    backend: string[];
    database: string[];
    technologies: string[];
    tools: string[];
    web: string[];
  };
  project: {
    title: string;
    subtitle: string;
    technologies: string[];
    bullets: string[];
    architecture: {
      layer: string;
      tech: string;
      description: string;
    }[];
    snippets: ProjectCodeSnippet[];
  };
  education: {
    degree: string;
    institution?: string;
    board?: string;
    status?: string;
    percentage: string;
    expectedGraduation?: string;
    keyCourses?: string[];
  }[];
  strengths: string[];
  certifications: string;
  internship: string;
  languages: { language: string; proficiency: string }[];
}

export const RESUME_DATA: ResumeData = {
  name: "NANDITHA H",
  title: "Software Developer",
  headline: "Software Developer | Python | React JS | Django | BCA Final Year",
  location: "Bengaluru, Karnataka",
  phone: "7795925251",
  email: "nandithah0402@gmail.com",
  linkedin: "www.linkedin.com/in/nanditha-h-h-b0964638a",
  linkedinUrl: "https://www.linkedin.com/in/nanditha-h-h-b0964638a",
  github: "github.com/nandhu2-9",
  githubUrl: "https://github.com/nandhu2-9",
  summary:
    "Motivated BCA final-year student with a strong interest in software development and web technologies. Familiar with Python, JavaScript, HTML, CSS, React JS, Django, and database technologies. Developed an academic project integrating web development, Machine Learning, and IoT concepts. Eager to apply technical knowledge, strengthen development skills, and contribute to real-world software projects as an entry-level Software Developer.",
  skills: {
    programming: ["Python", "JavaScript"],
    frontend: ["HTML5", "CSS3", "React JS"],
    backend: ["Django"],
    database: ["MySQL", "SQLite"],
    technologies: ["Machine Learning", "OpenCV", "IoT"],
    tools: ["VS Code", "Git", "GitHub"],
    web: ["Responsive Web Development"],
  },
  project: {
    title: "VoteSync – IoT & ML Smart Voting System",
    subtitle: "Full-Stack Web Development, Computer Vision & IoT Device Integration",
    technologies: [
      "Python",
      "Django",
      "HTML5",
      "CSS3",
      "JavaScript",
      "OpenCV",
      "Machine Learning",
      "IoT",
      "SQLite/MySQL",
      "Chart.js",
    ],
    bullets: [
      "Developed a prototype smart voting system combining web development, IoT, and Machine Learning concepts.",
      "Designed voter registration and authentication functionality with encrypted credentials.",
      "Implemented a voter verification concept using Python and OpenCV for facial biometric matching.",
      "Designed IoT monitoring functionality for device status, booth connectivity, and system telemetry.",
      "Developed modules for elections, candidates, voting, and real-time result visualization via dynamic charts.",
      "Used Django for backend development and SQLite/MySQL concepts for relational data management.",
      "Designed the system as an academic prototype that can be further developed with appropriate security, testing, and compliance requirements.",
    ],
    architecture: [
      {
        layer: "Voter Interface Tier",
        tech: "HTML5, CSS3, JavaScript, Chart.js",
        description:
          "Responsive ballot terminal interface providing intuitive voter guidance, dynamic election status, and live encrypted vote casting visualization.",
      },
      {
        layer: "Backend & Business Logic",
        tech: "Python & Django Framework",
        description:
          "Modular MVC architecture handling voter tokenization, election lifecycle management, audit logs, and secure RESTful endpoints.",
      },
      {
        layer: "Biometric Verification Engine",
        tech: "OpenCV & Machine Learning (Python)",
        description:
          "Facial detection and feature extraction pipeline comparing live camera frames against registered voter biometric embeddings to prevent double voting.",
      },
      {
        layer: "IoT Hardware & Telemetry",
        tech: "IoT Sensor Node & Heartbeat Monitor",
        description:
          "Terminal hardware integrity verification checking booth connectivity, tamper detection switches, and offline queue status.",
      },
      {
        layer: "Persistence & Audit Storage",
        tech: "SQLite & MySQL",
        description:
          "Normalized relational schema isolating voter demographic records from anonymized ballot ledger entries for voter privacy.",
      },
    ],
    snippets: [
      {
        language: "python",
        title: "OpenCV Voter Facial Verification Concept",
        description: "Captures camera frame, detects face landmarks, and computes similarity score against registered voter vector.",
        code: `import cv2
import numpy as np

def verify_voter_biometric(live_frame, registered_face_template):
    """
    Detects face in live camera stream and validates identity against stored template.
    Returns: (is_verified: bool, confidence_score: float)
    """
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(live_frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))
    
    if len(faces) == 0:
        return False, 0.0
        
    (x, y, w, h) = faces[0]
    face_roi = gray[y:y+h, x:x+w]
    face_resized = cv2.resize(face_roi, (120, 120))
    
    # Calculate normalized correlation coefficient
    res = cv2.matchTemplate(face_resized, registered_face_template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    
    confidence = float(max_val) * 100
    is_verified = confidence >= 85.0
    return is_verified, confidence`,
      },
      {
        language: "python",
        title: "Django Ballot Cast & Anonymized Ledger View",
        description: "Validates voter eligibility, records ballot anonymously, and marks voter status as completed.",
        code: `from django.http import JsonResponse
from django.db import transaction
from .models import Voter, Candidate, BallotLedger

@transaction.atomic
def cast_ballot(request, election_id):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
        
    voter_token = request.POST.get("voter_token")
    candidate_id = request.POST.get("candidate_id")
    
    # 1. Verify voter has not voted in this election
    voter = Voter.objects.select_for_update().get(token=voter_token)
    if voter.has_voted:
        return JsonResponse({"status": "rejected", "message": "Vote already cast"}, status=400)
        
    # 2. Record vote in anonymized ledger (no voter foreign key to preserve secret ballot)
    candidate = Candidate.objects.get(id=candidate_id, election_id=election_id)
    BallotLedger.objects.create(
        election_id=election_id,
        candidate_code=candidate.code
    )
    
    # 3. Mark voter as voted to prevent duplicate voting
    voter.has_voted = True
    voter.save()
    
    return JsonResponse({"status": "success", "message": "Ballot verified & recorded"})`,
      },
      {
        language: "javascript",
        title: "Chart.js Live Election Results Telemetry",
        description: "Renders real-time tally visualization with dynamic percentage calculations.",
        code: `const updateElectionTelemetry = (canvasId, candidates) => {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const labels = candidates.map(c => c.name);
  const data = candidates.map(c => c.voteCount);
  
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Verified Votes',
        data: data,
        backgroundColor: ['#2563EB', '#0D9488', '#F59E0B'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });
};`,
      },
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SSMRV College, Bengaluru",
      status: "Final Year Student",
      percentage: "65.95%",
      expectedGraduation: "2027",
      keyCourses: [
        "Data Structures & Algorithms in Python",
        "Web Application Development (Full Stack)",
        "Database Management Systems & SQL",
        "Object Oriented Programming & Software Engineering",
      ],
    },
    {
      degree: "Pre-University Course (PUC)",
      board: "Karnataka State Board",
      percentage: "67.5%",
      status: "Completed",
      keyCourses: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      board: "Karnataka Secondary Education Examination Board",
      percentage: "53.96%",
      status: "Completed",
    },
  ],
  strengths: [
    "Problem Solving",
    "Quick Learning",
    "Teamwork",
    "Communication",
    "Adaptability",
    "Willingness to Learn",
    "Time Management",
  ],
  certifications: "Currently building technical certifications and practical project experience in Python & Web Technologies.",
  internship: "Fresher — No prior internship experience. Highly eager to contribute to real-world software engineering teams.",
  languages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Kannada", proficiency: "Native / Bilingual" },
  ],
};

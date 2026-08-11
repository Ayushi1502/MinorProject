export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SubjectDetail {
  name: string;
  description: string;
  keyTopics: string[];
  importantFormulasOrNotes: string[];
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  channel: string;
  url: string;
  videoCount: string;
}

export interface FieldItem {
  id: string;
  title: string;
  category: "competitive-exams" | "programming" | "foundational";
  badge: string;
  iconName: string;
  shortDescription: string;
  overview: string;
  examPatternOrStructure: {
    duration?: string;
    totalMarks?: string;
    mode?: string;
    eligibility?: string;
    subjectsList: string[];
  };
  subjects: SubjectDetail[];
  youtubePlaylists: YouTubePlaylist[];
  quizQuestions: QuizQuestion[];
  roadmapRoleName: string;
  skillName: string;
}

export const fieldsData: FieldItem[] = [
  // --- COMPETITIVE EXAMS ---
  {
    id: "nda",
    title: "NDA (National Defence Academy)",
    category: "competitive-exams",
    badge: "Defense Exam",
    iconName: "Shield",
    shortDescription: "Entry into Indian Army, Navy, and Air Force. Test covers Mathematics and General Ability (GAT).",
    overview: "NDA exam is conducted twice a year by UPSC for 10+2 students aspiring to join the Armed Forces. It evaluates mathematical problem-solving, English language, physics, chemistry, general science, history, geography, and current affairs.",
    examPatternOrStructure: {
      duration: "5 Hours Total (2.5h Math + 2.5h GAT)",
      totalMarks: "900 Marks (300 Math + 600 GAT) + 900 Marks SSB Interview",
      mode: "Offline (Pen & Paper)",
      eligibility: "10+2 passed / appearing (Unmarried Male/Female, 16.5 to 19.5 yrs)",
      subjectsList: ["Mathematics (10+2 Level)", "English", "General Science & Physics", "Chemistry", "History & Geography", "Current Affairs"],
    },
    subjects: [
      {
        name: "Mathematics",
        description: "Focuses on 11th & 12th level Algebra, Matrices, Trigonometry, Calculus, and Statistics.",
        keyTopics: ["Algebra & Quadratic Equations", "Matrices & Determinants", "Trigonometric Ratios & Identities", "Differential & Integral Calculus", "Vectors & 3D Geometry", "Probability & Statistics"],
        importantFormulasOrNotes: [
          "Sin^2(x) + Cos^2(x) = 1 | Tan(A+B) = (Tan A + Tan B) / (1 - Tan A Tan B)",
          "Quadratic Roots: x = (-b ± √(b² - 4ac)) / (2a)",
          "Derivative of x^n = n*x^(n-1) | ∫ x^n dx = (x^(n+1))/(n+1) + C",
          "Dot Product: A · B = |A||B|cos(θ)"
        ]
      },
      {
        name: "General Ability Test (GAT) - English & Science",
        description: "Tests vocabulary, grammar, basic Physics, Chemistry, and Current National Events.",
        keyTopics: ["Spotting Errors & Sentence Completion", "Synonyms & Antonyms", "Newton's Laws of Motion & Electricity", "Chemical Reactions & Acids/Bases", "Indian History & Constitution", "Current National Affairs"],
        importantFormulasOrNotes: [
          "Ohm's Law: V = I * R | Power: P = V * I = I² * R",
          "Newton's 2nd Law: F = m * a | Kinetic Energy: KE = 1/2 * m * v²",
          "pH Scale: pH = -log10[H+] (Acidic < 7, Basic > 7, Neutral = 7)"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "nda-yt-1",
        title: "NDA 1 2026 Mathematics Complete Course Playlist",
        channel: "Unacademy Defence / Physics Wallah",
        url: "https://www.youtube.com/results?search_query=NDA+Maths+complete+playlist",
        videoCount: "45 Lectures"
      },
      {
        id: "nda-yt-2",
        title: "NDA GAT English, Science & History Full Course",
        channel: "Defence Wallah PW",
        url: "https://www.youtube.com/results?search_query=NDA+GAT+complete+playlist",
        videoCount: "38 Lectures"
      }
    ],
    quizQuestions: [
      {
        id: "nda-1",
        question: "What is the value of ∫ (1/x) dx?",
        options: ["x² / 2", "ln|x| + C", "e^x + C", "1/x²"],
        correctAnswer: 1,
        explanation: "The indefinite integral of 1/x with respect to x is natural logarithm ln|x| + C."
      },
      {
        id: "nda-2",
        question: "Which Newton's Law defines force explicitly as F = ma?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
        correctAnswer: 1,
        explanation: "Newton's Second Law states that force equals mass times acceleration (F = ma)."
      }
    ],
    roadmapRoleName: "NDA Exam Aspirant",
    skillName: "NDA Mathematics & General Ability"
  },

  {
    id: "jee",
    title: "JEE Main & Advanced",
    category: "competitive-exams",
    badge: "Engineering Entrance",
    iconName: "Zap",
    shortDescription: "India's premier engineering entrance exam for IITs, NITs, and IIITs.",
    overview: "JEE Main and Advanced test conceptual clarity, analytical thinking, and speed in Physics, Chemistry, and Mathematics for entrance into top engineering institutes like IITs and NITs.",
    examPatternOrStructure: {
      duration: "3 Hours (JEE Main)",
      totalMarks: "300 Marks (75 Questions)",
      mode: "Computer Based Test (CBT)",
      eligibility: "10+2 with Physics, Chemistry, Mathematics",
      subjectsList: ["Physics", "Chemistry (Physical, Organic, Inorganic)", "Mathematics"],
    },
    subjects: [
      {
        name: "Physics",
        description: "Covers Mechanics, Electrodynamics, Optics, Thermodynamics, and Modern Physics.",
        keyTopics: ["Kinematics & Rotational Dynamics", "Work, Energy & Power", "Thermodynamics & Kinetic Theory", "Electrostatics & Magnetism", "Ray & Wave Optics", "Modern Physics & Semiconductors"],
        importantFormulasOrNotes: [
          "v = u + at | s = ut + 1/2 at² | v² = u² + 2as",
          "Coulomb's Law: F = k * (q1 * q2) / r²",
          "De Broglie Wavelength: λ = h / p = h / (m*v)",
          "First Law of Thermodynamics: ΔQ = ΔU + W"
        ]
      },
      {
        name: "Chemistry",
        description: "Physical (numericals), Organic (reaction mechanisms), and Inorganic (periodic trends).",
        keyTopics: ["Mole Concept & Chemical Kinetics", "Atomic Structure & Thermodynamics", "Periodic Table & Chemical Bonding", "Coordination Compounds", "Organic Hydrocarbons & Reaction Mechanisms", "Biomolecules & Polymers"],
        importantFormulasOrNotes: [
          "Ideal Gas Equation: P * V = n * R * T",
          "pH + pOH = 14 | Nernst Equation: E = E° - (0.0591/n) log Q",
          "Molarity = Moles of Solute / Volume of Solution (L)"
        ]
      },
      {
        name: "Mathematics",
        description: "Advanced problem solving in Calculus, Algebra, Coordinate Geometry, and Vectors.",
        keyTopics: ["Functions, Limits & Continuity", "Definite Integration & Area Under Curves", "Coordinate Geometry (Circles, Conics)", "Complex Numbers & Quadratic Equations", "Permutations & Combinations", "Vectors & 3D"],
        importantFormulasOrNotes: [
          "Limit definition: lim(x->0) (sin x / x) = 1",
          "Euler's Formula: e^(iθ) = cos(θ) + i sin(θ)",
          "Distance Formula in 3D: d = √((x2-x1)² + (y2-y1)² + (z2-z1)²)"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "jee-yt-1",
        title: "JEE Main Physics Full Revision & Problem Solving",
        channel: "Physics Wallah / Unacademy JEE",
        url: "https://www.youtube.com/results?search_query=JEE+Physics+complete+playlist",
        videoCount: "60 Lectures"
      },
      {
        id: "jee-yt-2",
        title: "JEE Chemistry Complete Organic & Physical Course",
        channel: "Unacademy JEE",
        url: "https://www.youtube.com/results?search_query=JEE+Chemistry+complete+playlist",
        videoCount: "52 Lectures"
      },
      {
        id: "jee-yt-3",
        title: "JEE Mathematics Complete One-Shot & PYQ Series",
        channel: "MathonGo / Vedantu JEE",
        url: "https://www.youtube.com/results?search_query=JEE+Maths+complete+playlist",
        videoCount: "48 Lectures"
      }
    ],
    quizQuestions: [
      {
        id: "jee-1",
        question: "What is the pH of a neutral aqueous solution at 25°C?",
        options: ["0", "7", "14", "1"],
        correctAnswer: 1,
        explanation: "At 25°C, [H+] = 10^-7 M, making pH = -log(10^-7) = 7."
      },
      {
        id: "jee-2",
        question: "What is the limit of (sin x / x) as x approaches 0?",
        options: ["0", "1", "Infinity", "Undefined"],
        correctAnswer: 1,
        explanation: "Standard trigonometric limit lim(x->0) (sin x / x) = 1."
      }
    ],
    roadmapRoleName: "JEE Main & Advanced Aspirant",
    skillName: "JEE Advanced Physics, Chemistry & Mathematics"
  },

  {
    id: "gate",
    title: "GATE Exam",
    category: "competitive-exams",
    badge: "Post-Graduate / PSU",
    iconName: "Cpu",
    shortDescription: "Entrance for M.Tech at IITs/IISc and recruitment in premier PSUs.",
    overview: "GATE tests comprehensive understanding of undergraduate engineering subjects, Engineering Mathematics, and General Aptitude. High scores open pathways to M.Tech, Direct PhD, and PSU jobs (ONGC, NTPC, IOCL, BHEL).",
    examPatternOrStructure: {
      duration: "3 Hours",
      totalMarks: "100 Marks (65 Questions)",
      mode: "Computer Based Test (CBT)",
      eligibility: "Bachelor's degree in Engineering / Science or 3rd year students",
      subjectsList: ["General Aptitude (15 Marks)", "Engineering Mathematics (13 Marks)", "Core Engineering Subject (72 Marks)"],
    },
    subjects: [
      {
        name: "General Aptitude & Engineering Math",
        description: "Numerical ability, verbal reasoning, linear algebra, calculus, and differential equations.",
        keyTopics: ["Verbal & Quantitative Aptitude", "Linear Algebra (Eigenvalues, Rank)", "Calculus & Vector Calculus", "Differential Equations & Laplace Transforms", "Probability & Numerical Methods"],
        importantFormulasOrNotes: [
          "Sum of Eigenvalues = Trace of Matrix | Product = Determinant",
          "Cauchy-Riemann Equations: du/dx = dv/dy and du/dy = -dv/dx",
          "Bayes' Theorem: P(A|B) = P(B|A)P(A) / P(B)"
        ]
      },
      {
        name: "Core Computer Science / Engineering Topics",
        description: "Data Structures, Algorithms, OS, DBMS, Computer Networks, Theory of Computation.",
        keyTopics: ["Data Structures & Algorithms Complexity", "Operating Systems (Process Scheduling, Paging)", "Database Management (SQL, Normalization, ACID)", "Computer Networks (TCP/IP, Routing)", "Theory of Computation & Compilers"],
        importantFormulasOrNotes: [
          "Master Theorem for Recurrence: T(n) = aT(n/b) + f(n)",
          "Page Faults & Page Replacement (LRU, FIFO, Optimal)",
          "TCP Handshake: SYN -> SYN-ACK -> ACK"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "gate-yt-1",
        title: "GATE Computer Science Complete Subject Wise Playlist",
        channel: "Gate Smashers / NPTEL",
        url: "https://www.youtube.com/results?search_query=GATE+CS+complete+playlist",
        videoCount: "75 Lectures"
      },
      {
        id: "gate-yt-2",
        title: "GATE Engineering Mathematics & Aptitude Full Course",
        channel: "Gate Smashers",
        url: "https://www.youtube.com/results?search_query=GATE+Engineering+Maths+playlist",
        videoCount: "30 Lectures"
      }
    ],
    quizQuestions: [
      {
        id: "gate-1",
        question: "The sum of eigenvalues of a matrix is equal to its:",
        options: ["Determinant", "Trace", "Rank", "Transpose"],
        correctAnswer: 1,
        explanation: "The sum of all eigenvalues of any square matrix equals the trace (sum of main diagonal elements)."
      }
    ],
    roadmapRoleName: "GATE Aspirant (Computer Science & Engineering)",
    skillName: "GATE CS Engineering & Mathematics"
  },

  {
    id: "ssc",
    title: "SSC CGL / CHSL",
    category: "competitive-exams",
    badge: "Govt Jobs",
    iconName: "Building",
    shortDescription: "Staff Selection Commission exams for Central Government officer & ministerial roles.",
    overview: "SSC exams select staff for various posts in Ministries, Departments, and Subordinate Offices of the Government of India. The exam tests Quant, Reasoning, English, and General Awareness.",
    examPatternOrStructure: {
      duration: "1 Hour (Tier 1)",
      totalMarks: "200 Marks (100 Questions)",
      mode: "Online CBT",
      eligibility: "Graduation (for CGL) / 10+2 (for CHSL)",
      subjectsList: ["Quantitative Aptitude", "General Intelligence & Reasoning", "English Comprehension", "General Awareness (GK, Current Affairs)"],
    },
    subjects: [
      {
        name: "Quantitative Aptitude",
        description: "Arithmetic, Algebra, Geometry, Mensuration, Trigonometry, and Data Interpretation.",
        keyTopics: ["Percentage, Profit & Loss, Simple/Compound Interest", "Ratio & Proportion, Time & Work, Speed-Distance", "Basic Algebra & Quadratic Equations", "Geometry (Triangles, Circles) & Mensuration 2D/3D", "Trigonometry & Heights/Distances"],
        importantFormulasOrNotes: [
          "Simple Interest = (P * R * T) / 100",
          "Compound Interest Amount = P(1 + R/100)^T",
          "Speed = Distance / Time | Relative Speed (opposite) = S1 + S2",
          "Profit % = (Profit / Cost Price) * 100"
        ]
      },
      {
        name: "General Awareness & Reasoning",
        description: "Indian History, Polity, Geography, Economy, Science, and Logical Deductions.",
        keyTopics: ["Indian Constitution & Fundamental Rights", "History (Ancient, Medieval, Modern Freedom Struggle)", "Geography (Rivers, Climate, Soil)", "Syllogism, Blood Relations & Coding-Decoding", "Current Affairs & Static GK"],
        importantFormulasOrNotes: [
          "Article 14-18: Right to Equality | Article 21: Right to Life",
          "Preamble: Sovereign, Socialist, Secular, Democratic, Republic",
          "Coding/Decoding trick: EJOTY = 5, 10, 15, 20, 25 position numbers"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "ssc-yt-1",
        title: "SSC CGL Complete Maths & Quant Playlist",
        channel: "Aditya Ranjan Sir / Abhinay Maths",
        url: "https://www.youtube.com/results?search_query=SSC+CGL+Maths+complete+playlist",
        videoCount: "50 Lectures"
      },
      {
        id: "ssc-yt-2",
        title: "SSC CGL English Grammar & Vocab Series",
        channel: "Rani Mam English / SSC Adda247",
        url: "https://www.youtube.com/results?search_query=SSC+English+complete+playlist",
        videoCount: "40 Lectures"
      }
    ],
    quizQuestions: [
      {
        id: "ssc-1",
        question: "If a shirt costing Rs 500 is sold for Rs 600, what is the profit percentage?",
        options: ["10%", "15%", "20%", "25%"],
        correctAnswer: 2,
        explanation: "Profit = 600 - 500 = 100. Profit % = (100 / 500) * 100 = 20%."
      }
    ],
    roadmapRoleName: "SSC CGL Candidate",
    skillName: "SSC Quantitative Aptitude & Reasoning"
  },

  {
    id: "neet",
    title: "NEET UG",
    category: "competitive-exams",
    badge: "Medical Entrance",
    iconName: "HeartPulse",
    shortDescription: "National Level Entrance Test for MBBS, BDS, AYUSH, and medical courses.",
    overview: "NEET is the single medical entrance exam in India for admission into medical institutions. It strictly tests NCERT syllabus across Biology (Botany & Zoology), Physics, and Chemistry.",
    examPatternOrStructure: {
      duration: "3 Hours 20 Minutes",
      totalMarks: "720 Marks (180 Questions)",
      mode: "Pen & Paper (OMR)",
      eligibility: "10+2 with Physics, Chemistry, Biology/Biotechnology (Min 50%)",
      subjectsList: ["Biology (Botany + Zoology) - 360 Marks", "Physics - 180 Marks", "Chemistry - 180 Marks"],
    },
    subjects: [
      {
        name: "Biology (Botany & Zoology)",
        description: "Accounts for 50% of the total score. Covers Human Physiology, Genetics, Cell Biology, and Ecology.",
        keyTopics: ["Cell Structure & Function", "Plant Physiology & Photosynthesis", "Human Physiology (Digestive, Nervous, Circulatory)", "Genetics & Molecular Basis of Inheritance", "Ecology, Environment & Biotechnology"],
        importantFormulasOrNotes: [
          "Photosynthesis Equation: 6CO2 + 6H2O + light -> C6H12O6 + 6O2",
          "Mendelian Ratio (Monohybrid): Genotypic 1:2:1, Phenotypic 3:1",
          "DNA Structure: Double Helix, Base Pairs A-T (2 bonds), G-C (3 bonds)",
          "Human Blood Groups: ABO system (Co-dominance and Multiple Alleles)"
        ]
      },
      {
        name: "Physics & Chemistry for NEET",
        description: "NCERT-focused numerical problems, organic reactions, and inorganic periodic trends.",
        keyTopics: ["Mechanics, Fluid Dynamics & Thermal Physics", "Optics, Current Electricity & Magnetism", "Physical Chemistry (Solutions, Equilibrium, Electrochemistry)", "Organic Reactions & Biomolecules", "Inorganic Coordination Chemistry"],
        importantFormulasOrNotes: [
          "Universal Law of Gravitation: F = G * m1 * m2 / r²",
          "Wave Velocity: v = f * λ",
          "Avogadro's Number: 6.022 x 10^23 particles/mole"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "neet-yt-1",
        title: "NEET Biology Complete NCERT One Shot Playlist",
        channel: "Physics Wallah / Competition Wallah",
        url: "https://www.youtube.com/results?search_query=NEET+Biology+NCERT+complete+playlist",
        videoCount: "55 Lectures"
      },
      {
        id: "neet-yt-2",
        title: "NEET Physics & Chemistry One Shot Revision",
        channel: "Unacademy NEET",
        url: "https://www.youtube.com/results?search_query=NEET+Physics+Chemistry+complete+playlist",
        videoCount: "45 Lectures"
      }
    ],
    quizQuestions: [
      {
        id: "neet-1",
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
        correctAnswer: 2,
        explanation: "Mitochondria generate ATP through cellular respiration, earning the name 'powerhouse of the cell'."
      }
    ],
    roadmapRoleName: "NEET Medical Aspirant",
    skillName: "NCERT Biology, Physics & Chemistry"
  },

  // --- PROGRAMMING & TECH LANGUAGES ---
  {
    id: "python",
    title: "Python Programming",
    category: "programming",
    badge: "Most Popular",
    iconName: "Code",
    shortDescription: "Versatile language widely used in AI, Data Science, Web Backend, and Automation.",
    overview: "Python is a high-level, interpreted, general-purpose language praised for its readable syntax and massive ecosystem of libraries like NumPy, Pandas, PyTorch, and Django.",
    examPatternOrStructure: {
      eligibility: "Beginner to Advanced (No prior coding required)",
      subjectsList: ["Python Basics & Syntax", "Data Structures (Lists, Dicts, Sets)", "OOPs in Python", "File Handling & Modules", "Data Science / Web Frameworks"],
    },
    subjects: [
      {
        name: "Python Fundamentals & Syntax",
        description: "Variables, control flow, functions, and list comprehensions.",
        keyTopics: ["Data Types (int, float, str, bool)", "Control Flow (if, elif, else, for, while)", "Functions & Lambda Expressions", "List, Set & Dictionary Comprehensions", "Error & Exception Handling (try-except)"],
        importantFormulasOrNotes: [
          "Syntax: def my_func(a, b): return a + b",
          "List Comprehension: [x**2 for x in range(10) if x % 2 == 0]",
          "Dictionary lookup: my_dict.get('key', default_val)",
          "Virtual Environment: python -m venv venv"
        ]
      },
      {
        name: "OOPs & Popular Libraries",
        description: "Object-Oriented Programming, NumPy, Pandas, and API integration.",
        keyTopics: ["Classes, __init__, Inheritance, Polymorphism", "Decorators & Generators", "NumPy arrays & Pandas DataFrames", "Requests & Rest API integration"],
        importantFormulasOrNotes: [
          "Class definition: class Student:\n    def __init__(self, name):\n        self.name = name",
          "Pandas read CSV: df = pd.read_csv('data.csv')",
          "NumPy array creation: np.zeros((3, 3))"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "py-yt-1",
        title: "Python for Beginners Full Course (10+ Hours)",
        channel: "CodeWithHarry / FreeCodeCamp",
        url: "https://www.youtube.com/results?search_query=Python+complete+course+playlist",
        videoCount: "35 Videos"
      },
      {
        id: "py-yt-2",
        title: "Python OOPs & Data Science (NumPy, Pandas, Matplotlib)",
        channel: "Apna College / Krish Naik",
        url: "https://www.youtube.com/results?search_query=Python+Data+Science+playlist",
        videoCount: "25 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "py-1",
        question: "What is the output of len([1, 2, 3, 4]) in Python?",
        options: ["3", "4", "5", "Error"],
        correctAnswer: 1,
        explanation: "len() returns the total number of items in a sequence. The list has 4 elements."
      }
    ],
    roadmapRoleName: "Python Developer & Data Engineer",
    skillName: "Python Programming & Data Structures"
  },

  {
    id: "cpp",
    title: "C++ & Competitive Programming",
    category: "programming",
    badge: "Core Tech",
    iconName: "Terminal",
    shortDescription: "High-performance language essential for Competitive Programming, System Design, and Game Dev.",
    overview: "C++ offers direct memory management, ultra-fast execution, and the Standard Template Library (STL), making it the gold standard for algorithms, DSA, and high-performance applications.",
    examPatternOrStructure: {
      eligibility: "Beginner to Advanced",
      subjectsList: ["C++ Basics & Pointers", "Standard Template Library (STL)", "Object-Oriented Programming", "Memory Management & Pointers", "Data Structures & Algorithms"],
    },
    subjects: [
      {
        name: "C++ Core & STL",
        description: "Vectors, Maps, Sets, Pointers, and Memory Allocation.",
        keyTopics: ["Pointers & References (&, *)", "Dynamic Memory (new/delete)", "STL Vectors, Pairs, Maps, Sets, Priority Queue", "Iterators & STL Algorithms (sort, binary_search)"],
        importantFormulasOrNotes: [
          "Fast I/O: ios_base::sync_with_stdio(false); cin.tie(NULL);",
          "Sort vector: sort(vec.begin(), vec.end());",
          "Pointer declaration: int val = 10; int* ptr = &val;",
          "Vector push: vec.push_back(5);"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "cpp-yt-1",
        title: "Complete C++ Placement Course & STL Playlist",
        channel: "Apna College / CodeHelp by Babbar",
        url: "https://www.youtube.com/results?search_query=C%2B%2B+complete+course+playlist",
        videoCount: "42 Videos"
      },
      {
        id: "cpp-yt-2",
        title: "C++ Competitive Programming & STL Mastery",
        channel: "Luv / takeUforward",
        url: "https://www.youtube.com/results?search_query=C%2B%2B+STL+Luv+playlist",
        videoCount: "30 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "cpp-1",
        question: "Which STL container in C++ stores key-value pairs sorted by key?",
        options: ["std::vector", "std::unordered_map", "std::map", "std::queue"],
        correctAnswer: 2,
        explanation: "std::map is implemented as a self-balancing Red-Black Tree and stores unique keys in sorted order."
      }
    ],
    roadmapRoleName: "C++ Developer & Competitive Programmer",
    skillName: "C++ & STL Competitive Programming"
  },

  {
    id: "java",
    title: "Java Programming",
    category: "programming",
    badge: "Enterprise Standard",
    iconName: "FileCode",
    shortDescription: "Object-oriented, platform-independent language powering Enterprise apps, Spring Boot, and Android.",
    overview: "Java runs on the Java Virtual Machine (JVM) with the 'Write Once, Run Anywhere' paradigm. It is used extensively in enterprise software, backend services, and Android app development.",
    examPatternOrStructure: {
      eligibility: "Beginner to Advanced",
      subjectsList: ["Java Basics & JVM Architecture", "Object-Oriented Programming (OOP)", "Java Collections Framework", "Multithreading & Exception Handling", "Spring Boot & REST APIs"],
    },
    subjects: [
      {
        name: "Java Core & OOP Principles",
        description: "Encapsulation, Inheritance, Polymorphism, Abstraction, Collections.",
        keyTopics: ["Classes, Objects & Constructors", "4 Pillars of OOP (Encapsulation, Inheritance, Abstraction, Polymorphism)", "Interfaces vs Abstract Classes", "Java Collections (ArrayList, HashMap, HashSet)", "Java Streams API & Lambdas"],
        importantFormulasOrNotes: [
          "Main Method: public static void main(String[] args)",
          "HashMap Operations: map.put(key, val); map.get(key);",
          "Stream Filter: list.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "java-yt-1",
        title: "Java Placement Course (Basics to Advanced OOPs)",
        channel: "Apna College / Kunal Kushwaha",
        url: "https://www.youtube.com/results?search_query=Java+complete+course+playlist",
        videoCount: "40 Videos"
      },
      {
        id: "java-yt-2",
        title: "Java Spring Boot & Microservices Full Course",
        channel: "Telusko / Amigoscode",
        url: "https://www.youtube.com/results?search_query=Java+Spring+Boot+playlist",
        videoCount: "28 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "java-1",
        question: "Which concept allows a class to have multiple methods with the same name but different parameters?",
        options: ["Method Overriding", "Method Overloading", "Abstraction", "Encapsulation"],
        correctAnswer: 1,
        explanation: "Method Overloading happens when methods share the same name with different parameter signatures in the same class."
      }
    ],
    roadmapRoleName: "Java Full Stack Developer",
    skillName: "Java Programming & Object-Oriented Design"
  },

  {
    id: "webdev",
    title: "Full Stack Web Development",
    category: "programming",
    badge: "High Demand",
    iconName: "Globe",
    shortDescription: "Build modern web apps using HTML, CSS, JavaScript, React, Node.js, and Next.js.",
    overview: "Full Stack Web Development covers creating interactive frontends and scalable backend servers, APIs, databases, and modern deployment pipelines.",
    examPatternOrStructure: {
      eligibility: "Beginner Friendly",
      subjectsList: ["HTML5 & CSS3 Flexbox/Grid", "Modern JavaScript (ES6+)", "React.js & Hooks", "Node.js & Express APIs", "MongoDB / PostgreSQL Databases"],
    },
    subjects: [
      {
        name: "Frontend: HTML, CSS, JS & React",
        description: "DOM manipulation, flexbox, grid, Async JS, React Hooks (useState, useEffect).",
        keyTopics: ["Semantic HTML5 & Responsive Design", "CSS Flexbox & CSS Grid", "JavaScript Async/Await, Promises & Fetch API", "React Components, Props, State & Hooks", "Next.js App Router & Server Components"],
        importantFormulasOrNotes: [
          "CSS Flex Centering: display: flex; justify-content: center; align-items: center;",
          "Fetch API: const res = await fetch(url); const data = await res.json();",
          "useState Hook: const [count, setCount] = useState(0);"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "web-yt-1",
        title: "Full Stack Web Development Course (HTML, CSS, JS, React, Node)",
        channel: "CodeWithHarry / Apna College",
        url: "https://www.youtube.com/results?search_query=Full+Stack+Web+Development+playlist",
        videoCount: "60 Videos"
      },
      {
        id: "web-yt-2",
        title: "React.js & Next.js Modern Frontend Playlist",
        channel: "Traversy Media / JS Mastery",
        url: "https://www.youtube.com/results?search_query=React+Nextjs+complete+playlist",
        videoCount: "32 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "web-1",
        question: "Which React hook is used to handle side-effects such as fetching data or setting subscriptions?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useEffect is specifically designed for side-effects in functional React components."
      }
    ],
    roadmapRoleName: "Full Stack Web Developer",
    skillName: "Full Stack Web Development (React & Node)"
  },

  {
    id: "dsa",
    title: "Data Structures & Algorithms (DSA)",
    category: "programming",
    badge: "Interview Must",
    iconName: "Layers",
    shortDescription: "Essential problem-solving framework required for technical interviews at FAANG / top tech companies.",
    overview: "DSA forms the backbone of software engineering interviews. Mastering Arrays, Strings, Trees, Graphs, Dynamic Programming, and Big-O notation is crucial for crack tech jobs.",
    examPatternOrStructure: {
      eligibility: "Basic programming knowledge required",
      subjectsList: ["Time & Space Complexity (Big-O)", "Arrays, Linked Lists, Stacks, Queues", "Trees, Binary Search Trees & Heaps", "Graphs (BFS, DFS, Dijkstra)", "Dynamic Programming & Recursion"],
    },
    subjects: [
      {
        name: "Core Data Structures & Algorithms",
        description: "Complexity analysis, searching/sorting, trees, graphs, dynamic programming.",
        keyTopics: ["Big-O Time & Space Complexity", "Two Pointers & Sliding Window Technique", "Binary Search & Recursion", "Binary Tree Traversals (Inorder, Preorder, Postorder)", "Graph Traversal (BFS, DFS)", "Dynamic Programming (Memoization & Tabulation)"],
        importantFormulasOrNotes: [
          "Binary Search Time Complexity: O(log N)",
          "QuickSort / MergeSort Average Time: O(N log N)",
          "Graph BFS uses Queue | DFS uses Stack / Recursion",
          "Fibonacci DP: dp[i] = dp[i-1] + dp[i-2]"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "dsa-yt-1",
        title: "A2Z DSA Sheet Complete Course",
        channel: "striver (takeUforward)",
        url: "https://www.youtube.com/results?search_query=Striver+A2Z+DSA+playlist",
        videoCount: "80 Videos"
      },
      {
        id: "dsa-yt-2",
        title: "Data Structures & Algorithms in Java / C++",
        channel: "Kunal Kushwaha / Babbar",
        url: "https://www.youtube.com/results?search_query=DSA+complete+course+playlist",
        videoCount: "55 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "dsa-1",
        question: "What is the worst-case time complexity of Binary Search on a sorted array of size N?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
        correctAnswer: 2,
        explanation: "Binary Search halves the search space at each step, resulting in logarithmic time complexity O(log N)."
      }
    ],
    roadmapRoleName: "Software Engineer / DSA Specialist",
    skillName: "Data Structures & Algorithms (DSA)"
  },

  {
    id: "aiml",
    title: "AI & Machine Learning",
    category: "programming",
    badge: "Future Tech",
    iconName: "Brain",
    shortDescription: "Build intelligent systems, neural networks, LLMs, and predictive models using Python.",
    overview: "Explore Artificial Intelligence, Machine Learning algorithms (Regression, Classification, Clustering), Deep Learning, PyTorch, TensorFlow, and Large Language Models (LLMs).",
    examPatternOrStructure: {
      eligibility: "Python & basic Math (Linear Algebra, Statistics)",
      subjectsList: ["Linear Algebra & Statistics for ML", "Supervised & Unsupervised Learning", "Deep Learning & Neural Networks", "Natural Language Processing (NLP) & LLMs", "PyTorch & Scikit-Learn Frameworks"],
    },
    subjects: [
      {
        name: "Machine Learning Fundamentals",
        description: "Data preprocessing, regression, classification, neural networks, evaluate metrics.",
        keyTopics: ["Supervised Learning (Linear/Logistic Regression, Decision Trees)", "Unsupervised Learning (K-Means Clustering, PCA)", "Model Evaluation (Accuracy, Precision, Recall, F1-score)", "Deep Learning (CNNs, RNNs, Transformers)", "Prompt Engineering & Generative AI"],
        importantFormulasOrNotes: [
          "Mean Squared Error (MSE): 1/N * Σ(y_true - y_pred)²",
          "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
          "Precision = TP / (TP + FP) | Recall = TP / (TP + FN)"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "aiml-yt-1",
        title: "Complete Machine Learning & Data Science Playlist",
        channel: "Krish Naik / CampusX",
        url: "https://www.youtube.com/results?search_query=Machine+Learning+complete+playlist",
        videoCount: "50 Videos"
      },
      {
        id: "aiml-yt-2",
        title: "Deep Learning & Generative AI / LLMs Course",
        channel: "FreeCodeCamp / Andrej Karpathy",
        url: "https://www.youtube.com/results?search_query=Deep+Learning+Generative+AI+playlist",
        videoCount: "30 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "aiml-1",
        question: "Which metric is calculated as TP / (TP + FP)?",
        options: ["Recall", "Precision", "Accuracy", "F1 Score"],
        correctAnswer: 1,
        explanation: "Precision measures the proportion of positive predictions that were actually correct."
      }
    ],
    roadmapRoleName: "AI & Machine Learning Engineer",
    skillName: "Machine Learning & Artificial Intelligence"
  },

  // --- FOUNDATIONAL SKILLS ---
  {
    id: "aptitude",
    title: "Quantitative Aptitude & Reasoning",
    category: "foundational",
    badge: "Universal Skill",
    iconName: "Calculator",
    shortDescription: "Essential problem solving for Campus Placements, Banking, CAT, and Govt exams.",
    overview: "Quantitative Aptitude and Logical Reasoning test mental agility, mathematical speed, pattern identification, and logical decision-making.",
    examPatternOrStructure: {
      eligibility: "Open to all students & job seekers",
      subjectsList: ["Aptitude (Number System, Percentages, Interest, Speed)", "Logical Reasoning (Coding, Blood Relations, Syllogisms)", "Data Interpretation (Bar Graphs, Pie Charts)"],
    },
    subjects: [
      {
        name: "Quant & Logical Reasoning Essentials",
        description: "Speed math shortcuts, logical puzzles, data interpretation.",
        keyTopics: ["Averages, Ratios & Percentages", "Time & Work, Pipes & Cisterns", "Distance, Time & Speed", "Blood Relations, Direction Sense & Seating Arrangement", "Bar Chart & Pie Chart Data Interpretation"],
        importantFormulasOrNotes: [
          "Work Done = Rate * Time | If A does work in x days, A's 1 day work = 1/x",
          "Average Speed (equal distances) = (2 * S1 * S2) / (S1 + S2)",
          "A % of B = B % of A"
        ]
      }
    ],
    youtubePlaylists: [
      {
        id: "apt-yt-1",
        title: "Quantitative Aptitude & Reasoning Full Placement Course",
        channel: "Careerride / Feel Free to Learn",
        url: "https://www.youtube.com/results?search_query=Quantitative+Aptitude+complete+playlist",
        videoCount: "45 Videos"
      }
    ],
    quizQuestions: [
      {
        id: "apt-1",
        question: "If A can finish a work in 10 days and B in 15 days, in how many days can they finish it together?",
        options: ["5 days", "6 days", "8 days", "12 days"],
        correctAnswer: 1,
        explanation: "Combined 1-day work = 1/10 + 1/15 = 5/30 = 1/6. So together they take 6 days."
      }
    ],
    roadmapRoleName: "Aptitude & Placements Preparation",
    skillName: "Quantitative Aptitude & Logical Reasoning"
  }
];

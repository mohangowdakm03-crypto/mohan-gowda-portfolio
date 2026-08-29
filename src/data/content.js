export const PORTFOLIO_DATA = {
  hero: {
    name: "Mohan Gowda K M",
    tagline: "AI & Machine Learning Engineer | Full Stack Developer",
  },
  about: {
    text: "Resourceful Artificial Intelligence and Machine Learning (AIML) engineering student with comprehensive experience across the full software stack. Proficient in developing predictive Machine Learning models, integrating Generative AI APIs, and building responsive full-stack web applications using Next.js and Python. Experienced in cross-functional leadership, multimedia design, open-source collaborative workflows, and technical community building."
  },
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL"]
    },
    {
      category: "AI, ML & Data Science",
      items: ["Large Language Models (LLMs)", "Generative AI", "RAG", "Prompt Engineering", "XGBoost", "Pandas", "NumPy", "Predictive Modeling"]
    },
    {
      category: "Full Stack & Web",
      items: ["React.js", "Next.js 15", "FastAPI", "REST APIs", "HTML", "CSS", "Tailwind CSS", "Framer Motion", "D3.js", "Asynchronous I/O"]
    },
    {
      category: "Tools & Workflows",
      items: ["Git", "GitHub", "Docker", "Vector Databases (ChromaDB)", "NetworkX", "Vercel", "UI/UX Implementation", "Developer Experience (DX)"]
    }
  ],
  experience: [
    {
      role: "AI Training Contractor",
      company: "Outlier AI",
      date: "2025 – 2026",
      description: "Gained practical experience in AI evaluation by rigorously testing, analyzing, and grading the outputs of state-of-the-art Large Language Models (LLMs) using advanced prompt engineering protocols."
    },
    {
      role: "Freelance Multimedia & Digital Design",
      company: "Spandana Creations",
      date: "Oct 2025 – Present",
      description: "Leverage advanced digital video editing and graphic design expertise to create engaging multimedia content, product demonstrations, and promotional materials."
    },
    {
      role: "Engineering Team Lead & Event Coordinator",
      company: "P.A. College of Engineering",
      date: "2025 – 2026",
      description: "Led a 4-person engineering team for a 24-hour regional development hackathon, managing technical planning and execution. Acted as student coordinator for college-level events, streamlining campus activities and operational tracking."
    }
  ],
  projects: [
    {
      title: "Telco Customer Churn Prediction Pipeline",
      description: "Architected an enterprise-grade, end-to-end Machine Learning pipeline and serving solution for telecom customer churn prediction. Engineered automated 3-tier data ingestion, domain feature engineering, and multi-model selection. Deployed a champion HistGradientBoosting model achieving 83.32% test accuracy, integrated with SHAP explainability and a production FastAPI REST API.",
      techStack: ["Python", "FastAPI", "scikit-learn", "HistGradientBoosting", "SHAP"],
      github: "https://github.com/mohangowdakm03-crypto/churn-classifier-sklearn-baseline-with-notebook"
    },
    {
      title: "x-Diagnostix (Predictive Machine Learning Pipeline)",
      description: "Spearheaded data collection, cleaning, and preprocessing on NASA CMAPSS telemetry datasets using Pandas and NumPy to eliminate dimensional noise. Designed and evaluated a predictive ML model (XGBoost regression) to forecast engine Remaining Useful Life (RUL) with high accuracy, mathematically optimizing algorithm convergence.",
      techStack: ["Python", "Machine Learning", "XGBoost", "Pandas", "NumPy"],
      github: "https://github.com/mohangowdakm03-crypto/x-Diagnostix"
    },
    {
      title: "GraphRAG Brain (Full Stack Generative AI Platform)",
      description: "Architected an enterprise air-gapped AI platform converting unstructured data into structured Knowledge Graphs. Engineered a custom Retrieval-Augmented Generation (RAG) pipeline combining ChromaDB vector embeddings with NetworkX topological traversal to power accurate, zero-hallucination causal reasoning. Designed a responsive user-facing frontend with React/Tailwind, integrated via modular REST APIs to a Python backend, supporting real-time data visualization via D3.js.",
      techStack: ["Python", "Next.js 15", "FastAPI", "RAG", "ChromaDB", "Llama 3.1", "Tailwind CSS", "D3.js"],
      github: "https://github.com/mohangowdakm03-crypto/AI-HAckerZ"
    },
    {
      title: "Med-Triage (End-to-End AI Web Application)",
      description: "Architected and deployed a live healthcare routing system, managing the complete Full Stack lifecycle from a responsive React.js frontend to a Docker-containerized Python backend. Reduced processing latency to seconds by engineering an asynchronous data pipeline integrating third-party AI APIs (Groq, Whisper, Llama 3.1) for real-time speech-to-text and medical severity analysis.",
      techStack: ["TypeScript", "React (Next.js)", "Python", "FastAPI", "Groq API", "Docker", "Vercel"],
      link: "https://med-triage-two.vercel.app",
      github: "https://github.com/mohangowdakm03-crypto/Med-Triage"
    },
    {
      title: "Pace Skill Connect (Client-Server Integration)",
      description: "Developed structural HTML/CSS frontends for a campus-wide student portal and integrated it deeply with a pure Java backend architecture, ensuring robust client-server communication.",
      techStack: ["HTML", "CSS", "Java"],
      github: "https://github.com/mohangowdakm03-crypto/Pace-Skill-Connect"
    },
    {
      title: "NoirBrew",
      description: "A premium Coffee E-Kart platform delivering a seamless, high-aesthetic e-commerce experience.",
      techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      link: "https://noirbrew.vercel.app/",
      github: "https://github.com/mohangowdakm03-crypto/noirbrew"
    },
    {
      title: "AI Interview Simulator",
      description: "An interactive simulation tool utilizing natural language processing and voice integration to conduct realistic technical and behavioral interviews.",
      techStack: ["Python", "Streamlit", "PostgreSQL", "Render", "Voice Processing Architecture"],
      link: "https://ai-new-interview-simulator.streamlit.app",
      github: "https://github.com/mohangowdakm03-crypto/AI-Interview-Simulator"
    },
    {
      title: "Vidya-Setu",
      description: "An autonomous agent engineered for intelligent educational assistance and video translation.",
      techStack: ["Python", "OpenAI Whisper", "AI4Bharat IndicTrans2", "Edge-TTS/VITS", "FFmpeg", "MoviePy"],
      github: "https://github.com/mohangowdakm03-crypto/Vidya-Setu"
    }
  ],
  contact: {
    email: "mohangowdakm03@gmail.com",
    github: "https://github.com/mohangowdakm03-crypto/",
    linkedin: "https://www.linkedin.com/in/mohan-gowda-k-m-9a71b7395?"
  }
};

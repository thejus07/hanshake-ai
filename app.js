/**
 * Handshake AI - Candidate Experience & Project Verification Platform
 * Core Application Logic
 */

// Application State
const state = {
  candidate: {
    name: "Thejus",
    role: "Gen AI Engineer",
    place: "India",
    duration: "6 Months",
    projectsDone: 3,
    credentialId: "HSAI-EXP-GENAI-2026-9812",
    ledgerHash: "8b73f2a1b94c03de9401ab6c78eef01192847d8120faecb2",
    joinDate: "14 April 2026"
  },
  
  // 3 Completed Projects Database
  completedProjects: [
    {
      id: 1,
      client: "FinEdge Global",
      sector: "FinTech & Wealth Management",
      title: "Autonomous Multi-Agent RAG Financial Analyst",
      duration: "7 Weeks",
      accuracy: "99.4%",
      techStack: ["LangGraph", "Llama-3.3 70B", "Qdrant Vector DB", "FastAPI", "Docker"],
      description: "Architected a multi-agent LangGraph system with autonomous citation verification, vector semantic search over 10-K SEC filings, and real-time financial sentiment analysis. Deployed with FastAPI microservices capable of processing 250+ simultaneous analyst queries under 1.2s latency.",
      review: "Thejus demonstrated exceptional architectural understanding of multi-agent orchestration. The automated citations and sub-query decomposition reduced our financial research turnaround time by 74%.",
      rating: "5.0 / 5.0",
      completionDate: "August 2026"
    },
    {
      id: 2,
      client: "NeoAuto Robotics",
      sector: "Autonomous Systems & IoT",
      title: "Real-Time Multimodal Vision Defect Detection Engine",
      duration: "8 Weeks",
      accuracy: "99.1%",
      techStack: ["Qwen2-VL", "PyTorch", "TensorRT", "OpenCV", "Edge AI"],
      description: "Engineered an edge-optimized Vision-Language inference pipeline for autonomous manufacturing lines. Quantized vision transformers using TensorRT, achieving sub-35ms inference on NVIDIA Orin industrial boards to detect micro-fractures and surface anomalies.",
      review: "Thejus solved our edge latency bottleneck while maintaining 99%+ precision on microscopic defect classification. A truly world-class Gen AI Engineer.",
      rating: "4.9 / 5.0",
      completionDate: "June 2026"
    },
    {
      id: 3,
      client: "Medix Health Technologies",
      sector: "Healthcare & Clinical EHR",
      title: "HIPAA-Compliant Clinical Ambient Voice & SOAP Note Summarizer",
      duration: "9 Weeks",
      accuracy: "100% HIPAA Audit Pass",
      techStack: ["Whisper v3", "Fine-Tuned LLaMA-Med", "FHIR API", "vLLM", "HIPAA Guardrails"],
      description: "Engineered a low-latency ambient clinical recording processor. Streamed live doctor-patient dialogues into Whisper large-v3 with automated PHI de-identification before passing to fine-tuned medical reasoning models to format structured SOAP notes into FHIR schemas.",
      review: "Passing our HIPAA and clinical safety audit on the first pass is extremely rare for freelance contractors. Thejus's engineering caliber and attention to data privacy were exemplary.",
      rating: "5.0 / 5.0",
      completionDate: "May 2026"
    }
  ],

  // Active Freelance Projects available for allocation
  freelanceProjects: [
    {
      id: "rag-biomed",
      category: "rag",
      client: "ScaleVector Global",
      location: "Zurich, Switzerland (Remote)",
      stipend: "₹1,40,000",
      title: "GraphRAG Knowledge Engine for Biomedical Patents",
      duration: "5 Weeks",
      tech: ["GraphRAG", "Neo4j", "LangChain", "Knowledge Graphs"],
      scope: "Designing a hierarchical knowledge graph connecting patent claims with clinical trials. Requires structuring cross-entity relationships and hybrid vector/cypher querying."
    },
    {
      id: "video-semantic",
      category: "multimodal",
      client: "PixelVision AI",
      location: "Singapore (Remote)",
      stipend: "₹1,75,000",
      title: "Multimodal Video Semantic Search & Keyframe Summarizer",
      duration: "6 Weeks",
      tech: ["ColPali", "PyTorch", "Milvus", "FastAPI"],
      scope: "Embedding 1080p surveillance video feeds with ColPali vision encoders to support natural language queries like 'find red backpack left near gate 4'."
    },
    {
      id: "legal-lora",
      category: "finetune",
      client: "LegalFlow Systems",
      location: "London, UK (Remote)",
      stipend: "₹2,10,000",
      title: "Domain Specific LoRA Fine-Tuning for Commercial Contract Review",
      duration: "6 Weeks",
      tech: ["QLoRA", "Unsloth", "HuggingFace", "vLLM"],
      scope: "Parameter-efficient fine-tuning on 15,000 curated commercial contracts to identify ambiguous indemnification clauses and liability caps."
    },
    {
      id: "support-agent",
      category: "rag",
      client: "CogniX Omnichannel",
      location: "Bengaluru, India",
      stipend: "₹1,20,000",
      title: "Autonomous Customer Support Agent with Self-Correcting Reflection",
      duration: "4 Weeks",
      tech: ["LangGraph", "Reflexion", "REST Webhooks", "Redis"],
      scope: "Constructing multi-turn conversation memory with reflective tool execution against Zendesk and Shopify API endpoints."
    }
  ]
};

// DOM Initializer
document.addEventListener('DOMContentLoaded', () => {
  setupTabNavigation();
  setupModals();
  setupProjectDetails();
  setupFreelanceFiltering();
  setupActions();
  setupVerificationSearch();
  syncCandidateDataAcrossUI();
});

// Tab Navigation
function setupTabNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[data-tab]');
  const panes = document.querySelectorAll('.tab-pane');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTab = link.getAttribute('data-tab');
      
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active');
        }
      });

      // Smooth scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Direct buttons that switch tab
  const quickCertBtn = document.getElementById('quickCertBtn');
  const openCertModalBtn = document.getElementById('openCertModalBtn');
  const dossierCertBtn = document.getElementById('dossierCertBtn');

  const goToCertTab = () => {
    const certTabBtn = document.querySelector('.nav-link[data-tab="certificate"]');
    if (certTabBtn) certTabBtn.click();
  };

  if (quickCertBtn) quickCertBtn.addEventListener('click', goToCertTab);
  if (openCertModalBtn) openCertModalBtn.addEventListener('click', goToCertTab);
  if (dossierCertBtn) dossierCertBtn.addEventListener('click', goToCertTab);
}

// Project Details Modal Handler
function setupProjectDetails() {
  const modal = document.getElementById('projectDetailModal');
  const closeBtns = [
    document.getElementById('closeProjectModalBtn'),
    document.getElementById('closeProjectModalBtn2')
  ];

  closeBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Attach click listeners to "View Contract Brief" buttons
  const viewBtns = document.querySelectorAll('.view-project-details-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = parseInt(btn.getAttribute('data-project-id'), 10);
      const project = state.completedProjects.find(p => p.id === projectId);
      if (project) {
        populateProjectModal(project);
        modal.classList.add('active');
      }
    });
  });

  // Direct button inside modal to jump to certificate
  const modalViewCertDirectBtn = document.getElementById('modalViewCertDirectBtn');
  if (modalViewCertDirectBtn) {
    modalViewCertDirectBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      const certTabBtn = document.querySelector('.nav-link[data-tab="certificate"]');
      if (certTabBtn) certTabBtn.click();
    });
  }
}

function populateProjectModal(project) {
  document.getElementById('mProjectClient').textContent = `${project.client} (${project.sector})`;
  document.getElementById('mProjectTitle').textContent = project.title;
  document.getElementById('mProjectCandidate').textContent = `${state.candidate.name} (${state.candidate.role})`;
  document.getElementById('mProjectDate').textContent = project.completionDate;
  document.getElementById('mProjectDesc').textContent = project.description;
  document.getElementById('mProjectReview').textContent = `"${project.review}"`;

  const techContainer = document.getElementById('mProjectTech');
  techContainer.innerHTML = '';
  project.techStack.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    techContainer.appendChild(span);
  });
}

// Freelance Project Filtering & Actions
function setupFreelanceFiltering() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.freelance-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Apply to project buttons
  const applyBtns = document.querySelectorAll('.apply-project-btn');
  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectTitle = btn.getAttribute('data-title');
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Contract Accepted`;
        btn.classList.remove('btn-gold');
        btn.classList.add('btn-cyan');
        showToast(`🎉 Contract Accepted: "${projectTitle}" assigned to ${state.candidate.name}. Handshake AI Escrow activated!`, 'gold');
      }, 750);
    });
  });

  // Scope of work buttons
  const scopeBtns = document.querySelectorAll('.details-project-btn');
  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const item = state.freelanceProjects.find(f => f.id === modalKey);
      if (item) {
        alert(`Contract Scope of Work:\n\nProject: ${item.title}\nClient: ${item.client}\nLocation: ${item.location}\nStipend: ${item.stipend}\n\nDetails: ${item.scope}`);
      }
    });
  });
}

// Core User Actions (Print Certificate, Verify Link, Submit Milestone)
function setupActions() {
  // Print Certificate Button
  const printCertBtn = document.getElementById('printCertBtn');
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      showToast(`Preparing high-resolution certificate for print/PDF export...`, 'cyan');
      setTimeout(() => {
        window.print();
      }, 400);
    });
  }

  // Copy Verification URL Button
  const copyCertLinkBtn = document.getElementById('copyCertLinkBtn');
  if (copyCertLinkBtn) {
    copyCertLinkBtn.addEventListener('click', () => {
      const url = `https://handshake.ai/verify?id=${state.candidate.credentialId}&candidate=${encodeURIComponent(state.candidate.name)}`;
      navigator.clipboard.writeText(url).then(() => {
        showToast(`Copied credential verification link to clipboard!`, 'gold');
      }).catch(() => {
        showToast(`Verification Link: ${url}`, 'cyan');
      });
    });
  }

  // Download Badge Simulation
  const downloadBadgeBtn = document.getElementById('downloadBadgeBtn');
  if (downloadBadgeBtn) {
    downloadBadgeBtn.addEventListener('click', () => {
      showToast(`Generated verifiable credential badge (PNG) for ${state.candidate.name}`, 'cyan');
    });
  }

  // Milestone submission
  const submitMilestoneBtn = document.getElementById('submitMilestoneBtn');
  if (submitMilestoneBtn) {
    submitMilestoneBtn.addEventListener('click', () => {
      submitMilestoneBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running Test Suite & LLM Audit...`;
      submitMilestoneBtn.disabled = true;

      setTimeout(() => {
        submitMilestoneBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Milestone 4 Approved (100%)`;
        submitMilestoneBtn.classList.remove('btn-cyan');
        submitMilestoneBtn.classList.add('btn-gold');
        
        const fill = document.querySelector('.active-assignment-card .progress-fill');
        const label = document.querySelector('.active-assignment-card .progress-bar-label strong');
        if (fill) fill.style.width = '100%';
        if (label) label.textContent = '100%';

        showToast(`Milestone Approved! ₹95,000 stipend released to escrow for ${state.candidate.name}.`, 'gold');
      }, 1000);
    });
  }

  // Verify Ledger Button on Dossier
  const verifyHashBtn = document.getElementById('verifyHashBtn');
  if (verifyHashBtn) {
    verifyHashBtn.addEventListener('click', () => {
      const certTabBtn = document.querySelector('.nav-link[data-tab="certificate"]');
      if (certTabBtn) certTabBtn.click();
      
      const searchInput = document.getElementById('credentialSearchInput');
      if (searchInput) searchInput.value = state.candidate.credentialId;
      
      const searchBtn = document.getElementById('runVerifySearchBtn');
      if (searchBtn) searchBtn.click();
    });
  }
}

// Verification Search Handler
function setupVerificationSearch() {
  const searchBtn = document.getElementById('runVerifySearchBtn');
  const searchInput = document.getElementById('credentialSearchInput');
  const resultBox = document.getElementById('verifyResultBox');

  if (searchBtn && searchInput && resultBox) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        showToast('Please enter a credential ID or candidate name.', 'cyan');
        return;
      }

      const matchId = state.candidate.credentialId.toLowerCase().includes(query);
      const matchName = state.candidate.name.toLowerCase().includes(query);

      if (matchId || matchName) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div class="verify-status-banner">
            <i class="fa-solid fa-circle-check text-success"></i>
            <div>
              <strong>Official Handshake AI Verification: Valid &amp; Authentic Record</strong>
              <p>
                Matches Candidate: <strong>${state.candidate.name}</strong> | 
                Role: <strong>${state.candidate.role}</strong> | 
                Place: <strong>${state.candidate.place}</strong> | 
                Duration: <strong>${state.candidate.duration}</strong> | 
                Projects: <strong>${state.candidate.projectsDone} Completed</strong>
              </p>
              <p style="font-family: var(--font-mono); font-size: 0.72rem; color: #94a3b8; margin-top: 0.35rem;">
                Cryptographic Signature: ${state.candidate.ledgerHash} (Block #8,941,209)
              </p>
            </div>
          </div>
        `;
        showToast('Verification record confirmed on Handshake AI Enterprise Ledger!', 'gold');
      } else {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div class="verify-status-banner" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">
            <i class="fa-solid fa-circle-xmark text-danger" style="color: #ef4444;"></i>
            <div>
              <strong style="color: #ef4444;">Verification Failed: Record Not Found</strong>
              <p>No matching candidate found for "${searchInput.value}". Please double check the credential identifier.</p>
            </div>
          </div>
        `;
      }
    });
  }
}

// Candidate Profile Editor Modal
function setupModals() {
  const profileModal = document.getElementById('profileModal');
  const userPillBtn = document.getElementById('userPillBtn');
  const closeProfileBtns = [
    document.getElementById('closeProfileModalBtn'),
    document.getElementById('closeProfileModalBtn2')
  ];
  const saveProfileBtn = document.getElementById('saveProfileBtn');

  if (userPillBtn && profileModal) {
    userPillBtn.addEventListener('click', () => {
      // Pre-populate
      document.getElementById('inputCandidateName').value = state.candidate.name;
      document.getElementById('inputCandidateRole').value = state.candidate.role;
      document.getElementById('inputCandidatePlace').value = state.candidate.place;
      document.getElementById('inputCandidateDuration').value = state.candidate.duration;
      document.getElementById('inputCandidateProjects').value = state.candidate.projectsDone;
      profileModal.classList.add('active');
    });
  }

  closeProfileBtns.forEach(btn => {
    if (btn && profileModal) {
      btn.addEventListener('click', () => {
        profileModal.classList.remove('active');
      });
    }
  });

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) profileModal.classList.remove('active');
    });
  }

  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      const name = document.getElementById('inputCandidateName').value.trim();
      const role = document.getElementById('inputCandidateRole').value.trim();
      const place = document.getElementById('inputCandidatePlace').value.trim();
      const duration = document.getElementById('inputCandidateDuration').value.trim();
      const projects = parseInt(document.getElementById('inputCandidateProjects').value, 10);

      if (name && role && place && duration) {
        state.candidate.name = name;
        state.candidate.role = role;
        state.candidate.place = place;
        state.candidate.duration = duration;
        state.candidate.projectsDone = isNaN(projects) ? 3 : projects;

        syncCandidateDataAcrossUI();
        profileModal.classList.remove('active');
        showToast(`Candidate details for ${state.candidate.name} updated successfully!`, 'gold');
      }
    });
  }
}

// Synchronize Candidate state across all UI sections & Certificate
function syncCandidateDataAcrossUI() {
  const { name, role, place, duration, projectsDone, credentialId } = state.candidate;

  // Header Pill
  const userNameEl = document.querySelector('.user-info .user-name');
  if (userNameEl) userNameEl.textContent = name;
  const userRoleEl = document.querySelector('.user-info .user-role');
  if (userRoleEl) userRoleEl.textContent = role;
  const userLocEl = document.querySelector('.location-badge');
  if (userLocEl) userLocEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${place}`;

  // Dashboard Hero
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = `Candidate Experience Portal <span class="text-gradient">— ${name}</span>`;
  }

  const metaVals = document.querySelectorAll('.hero-meta-strip .meta-val');
  if (metaVals.length >= 5) {
    metaVals[0].textContent = name;
    metaVals[1].textContent = role;
    metaVals[2].textContent = `${place} 🇮🇳`;
    metaVals[3].textContent = `${duration} (Active)`;
    metaVals[4].textContent = `${projectsDone} Projects`;
  }

  // Hero Certificate Preview
  const heroCertText = document.querySelector('.cert-summary p');
  if (heroCertText) {
    heroCertText.innerHTML = `Awarded to <strong>${name}</strong> for ${duration} tenure as <strong>${role}</strong> with ${projectsDone} completed production deployments.`;
  }

  // Metric Card for projects
  const metricProjects = document.getElementById('metricProjects');
  if (metricProjects) metricProjects.textContent = projectsDone;

  // Candidate Dossier Card
  const dossierName = document.querySelector('.candidate-fullname');
  if (dossierName) dossierName.textContent = name;
  const dossierRole = document.querySelector('.candidate-track');
  if (dossierRole) dossierRole.textContent = `${role} Fellow`;

  const specRows = document.querySelectorAll('.candidate-specs-table .spec-row .spec-data');
  if (specRows.length >= 5) {
    specRows[0].textContent = place;
    specRows[1].textContent = `${role} Track`;
    specRows[3].textContent = `${duration} Completed`;
    specRows[4].textContent = `${projectsDone} Completed`;
  }

  // Printable Physical Certificate
  const certRecipient = document.querySelector('.cert-recipient-name');
  if (certRecipient) certRecipient.textContent = name;

  const certLoc = document.querySelector('.cert-location-line');
  if (certLoc) {
    certLoc.innerHTML = `Jurisdiction: <strong>${place}</strong> &nbsp;|&nbsp; Fellow ID: <strong>${credentialId}</strong>`;
  }

  const certNarrative = document.querySelector('.cert-body-narrative');
  if (certNarrative) {
    certNarrative.innerHTML = `
      in recognition of distinguished professional tenure as a <strong>${role}</strong> 
      spanning an active duration of <strong>${duration}</strong> (April 2026 – October 2026). 
      During this fellowship, the candidate has successfully architected, deployed, and verified 
      <strong>${projectsDone} (${numberToWords(projectsDone)}) Enterprise Freelance AI Production Deployments</strong> 
      with exemplary engineering rigor, client satisfaction, and compliance standards.
    `;
  }

  // Verification result box if present
  const verifyResult = document.getElementById('verifyResultBox');
  if (verifyResult) {
    verifyResult.innerHTML = `
      <div class="verify-status-banner">
        <i class="fa-solid fa-circle-check text-success"></i>
        <div>
          <strong>Official Handshake AI Verification: Valid &amp; Authentic Record</strong>
          <p>Matches Candidate: <strong>${name}</strong> | Role: <strong>${role}</strong> | Place: <strong>${place}</strong> | Duration: <strong>${duration}</strong> | Projects: <strong>${projectsDone} Completed</strong></p>
        </div>
      </div>
    `;
  }
}

function numberToWords(num) {
  const map = { 1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six" };
  return map[num] || num.toString();
}

// Toast Notifications helper
function showToast(message, theme = 'gold') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${theme}`;
  const icon = theme === 'gold' ? 'fa-award text-gold' : 'fa-circle-info text-cyan';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

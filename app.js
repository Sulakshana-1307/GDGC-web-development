// ======== JOBS DATA ========
const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York",
    type: "Full Time",
    salary: "$120,000",
    description: "Work on modern frontend projects with React and Angular."
  },
  {
    title: "Backend Engineer",
    company: "InnoSoft",
    location: "San Francisco",
    type: "Part Time",
    salary: "$90,000",
    description: "Develop and maintain APIs and microservices."
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "London",
    type: "Contract",
    salary: "$70,000",
    description: "Design intuitive user interfaces for web apps."
  },
  {
    title: "Data Scientist",
    company: "DataWorks",
    location: "Berlin",
    type: "Remote",
    salary: "$110,000",
    description: "Analyze data and build ML models."
  }
];

// ======== RENDERING ========
function renderJobs(list) {
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = "";
  list.forEach((job, i) => {
    const div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><b>${job.company}</b> - ${job.location}</p>
      <p>${job.type} | ${job.salary}</p>
      <button onclick="showJobDetail(${i})">View Details</button>
      <button onclick="openModal('applyModal')">Apply</button>
    `;
    jobList.appendChild(div);
  });
}

function renderCompanies() {
  document.getElementById("companies-section").innerHTML = `
    <h2>Top Companies Hiring</h2>
    <ul>
      <li>Google</li>
      <li>Amazon</li>
      <li>Microsoft</li>
      <li>Meta</li>
    </ul>
  `;
}

function renderSalaries() {
  document.getElementById("salaries-section").innerHTML = `
    <h2>Salary Insights</h2>
    <table border="1" cellpadding="8">
      <tr><th>Role</th><th>Average Salary</th></tr>
      <tr><td>Frontend Developer</td><td>$120,000</td></tr>
      <tr><td>Backend Engineer</td><td>$100,000</td></tr>
      <tr><td>Data Scientist</td><td>$110,000</td></tr>
      <tr><td>UI/UX Designer</td><td>$85,000</td></tr>
    </table>
  `;
}

function showJobDetail(i) {
  const job = jobs[i];
  const detail = document.getElementById("job-detail");
  detail.innerHTML = `
    <h3>${job.title}</h3>
    <p><b>${job.company}</b></p>
    <p>${job.location} | ${job.type}</p>
    <p>${job.salary}</p>
    <p>${job.description}</p>
  `;
}

// ======== NAVIGATION ========
function showSection(section) {
  document.querySelectorAll(".tab-section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(section + "-section").classList.remove("hidden");

  if (section === "jobs") renderJobs(jobs);
  else if (section === "companies") renderCompanies();
  else if (section === "salaries") renderSalaries();
}

// ======== FILTERS ========
function clearFilters() {
  document.querySelectorAll(".filters input[type=checkbox]").forEach(c => (c.checked = false));
  renderJobs(jobs);
}

// ======== MODALS ========
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  clearModalInputs(id);
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  clearModalInputs(id);
}

function clearModalInputs(id) {
  const modal = document.getElementById(id);
  modal.querySelectorAll("input, textarea, select").forEach(el => el.value = "");
  const successMsg = modal.querySelector(".success");
  if (successMsg) successMsg.classList.add("hidden");
}

// ======== PASSWORD TOGGLE ========
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// ======== AUTH ========
function validatePassword(pass) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/;
  return regex.test(pass);
}

function login() {
  const pass = document.getElementById("loginPass").value;
  if (!validatePassword(pass)) {
    alert("Password must have 8+ chars, uppercase, lowercase, number/symbol.");
    return;
  }
  alert("Login successful");
  closeModal("loginModal");
  document.getElementById("postJobBtn").disabled = false;
}

function signup() {
  const pass = document.getElementById("signupPass").value;
  if (!validatePassword(pass)) {
    alert("Password must have 8+ chars, uppercase, lowercase, number/symbol.");
    return;
  }
  alert("Signup successful");
  closeModal("signupModal");
}

// ======== POST JOB ========
function postJob() {
  const title = document.getElementById("post-title").value;
  const company = document.getElementById("post-company").value;
  const location = document.getElementById("post-location").value;
  const type = document.getElementById("post-type").value;
  const salary = document.getElementById("post-salary").value;
  const desc = document.getElementById("post-desc").value;

  if (title && company && location && type && salary && desc) {
    jobs.push({ title, company, location, type, salary, description: desc });
    renderJobs(jobs);
    alert("Job posted successfully!");
    closeModal("postJobModal");
  } else {
    alert("Please fill all fields.");
  }
}

// ======== APPLY ========
document.getElementById("appSubmit").addEventListener("click", () => {
  document.getElementById("appSuccess").innerText = "Application Submitted ✅";
  document.getElementById("appSuccess").classList.remove("hidden");
});




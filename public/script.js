// Handle job application form visibility
function applyForJob(jobId) {
    const jobElement = document.getElementById(jobId);
    const applicationForm = document.getElementById('application-form');
    
    // Show the application form
    applicationForm.style.display = 'block';

    // Optionally, populate job details in the form (if needed)
    document.getElementById('worker-name').focus();
}

// Handle form submission for the worker
document.getElementById('worker-apply-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your application has been submitted!');
    document.getElementById('application-form').style.display = 'none';
});

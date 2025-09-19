function copyServerAddress() {
    const serverAddress = document.getElementById('serverAddress').textContent;
    const successMessage = document.getElementById('copySuccessMessage');
    const copyBtn = document.querySelector('.copy-server-btn');
    
    // Copy to clipboard
    navigator.clipboard.writeText(serverAddress).then(function() {
        // Show success message
        showSuccessMessage();
        
        // Animate copy button
        animateCopyButton(copyBtn);
        
    }).catch(function(err) {
        console.error('Copy failed: ', err);
        // Fallback method for older browsers
        fallbackCopy(serverAddress);
        showSuccessMessage();
        animateCopyButton(copyBtn);
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('copySuccessMessage');
    successMessage.classList.add('show');
    
    // Hide message after 3 seconds
    setTimeout(function() {
        successMessage.classList.remove('show');
    }, 3000);
}

function animateCopyButton(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const originalIcon = copyIcon.textContent;
    
    // Change icon to checkmark
    copyIcon.textContent = '✓';
    button.style.color = '#28a745';
    
    // Reset after 2 seconds
    setTimeout(function() {
        copyIcon.textContent = originalIcon;
        button.style.color = '';
    }, 2000);
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}
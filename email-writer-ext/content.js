// Content script for Gmail AI Reply Extension
// Injects an "AI Reply" button into Gmail's compose toolbar and generates replies using a local API.

console.log("Content script loaded");

/**
 * Creates the AI Reply button element styled to match Gmail's UI.
 * @returns {HTMLDivElement} The button element.
 */
function createAIbutton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3'; // Gmail send button classes for style
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

/**
 * Attempts to extract the main content of the currently open email.
 * Tries several selectors to maximize compatibility with Gmail layouts.
 * @returns {string} The email content, or an empty string if not found.
 */
function getEmailContent() {
    const selectors = [
        '.h7',                 // Subject
        '.a3s.aiL',            // Main email body
        '.gmail_quote',        // Quoted text in replies
        '[role="presentation"]', // Fallback for some Gmail layouts
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}

/**
 * Finds the Gmail compose toolbar element where the AI Reply button will be injected.
 * Tries multiple selectors for robustness.
 * @returns {HTMLElement|null} The toolbar element, or null if not found.
 */
function findComposeToolbar() {
    const selectors = [
        '.btC',            // Compose window toolbar
        '.aDh',            // Alternative toolbar
        '[role="toolbar"]',// ARIA toolbar
        '.gU.Up'           // Another Gmail toolbar class
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

/**
 * Injects the AI Reply button into the Gmail compose toolbar.
 * Handles button click to call the local AI API and insert the generated reply.
 */
function injectButton() {
    // Remove any existing AI Reply button to avoid duplicates
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) {
        existingButton.remove();
    }

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found, creating AI button");
    const button = createAIbutton();
    button.classList.add('ai-reply-button'); // For easy future reference/removal

    // Button click handler: calls the API and inserts the reply
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: 'professional'
                })
            });
            if (!response.ok) {
                throw new Error('API response was not ok');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                // Insert the generated reply at the cursor position
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error("Compose box not found");
            }

        } catch (error) {
            console.error(error);
            alert("Failed to generate reply:");
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    // Insert the button at the beginning of the toolbar
    toolbar.insertBefore(button, toolbar.firstChild);
}

/**
 * Observes DOM mutations to detect when a Gmail compose window appears,
 * then injects the AI Reply button.
 */
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        // Check if any added node is a compose window or contains one
        const hasComposeElement = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElement) {
            console.log("Compose Window Detected");
            // Delay to ensure toolbar is rendered
            setTimeout(injectButton, 500);
        }
    }
});

// Start observing the body for added compose windows
observer.observe(document.body, {
    childList: true,
    subtree: true
});

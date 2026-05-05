/* chatbot.js */

// Question bank: 5 diving questions
const questionBank = [
    {
        keywords: ["scuba", "scuba diving", "diving", "dive"],
        answer: "Scuba diving is an underwater activity where a diver uses a self-contained breathing apparatus (scuba) to breathe underwater. It is used for recreation, research, and exploration."
    },
    {
        keywords: ["equipment", "gear", "bcd", "regulator", "wetsuit", "tank", "cylinder"],
        answer: "Basic scuba equipment includes a mask, fins, wetsuit or drysuit, BCD (buoyancy control device), regulator, dive computer, and a compressed air or nitrox tank."
    },
    {
        keywords: ["depth", "deep", "limit", "recreational"],
        answer: "The recreational diving depth limit is 40 metres (130 ft). Below that, technical diving certification is required. Most beginner dives stay between 10 and 20 metres."
    },
    {
        keywords: ["certification", "padi", "course", "license", "open water"],
        answer: "To dive independently you need a certification such as PADI Open Water or SSI Open Water. The course takes about 3-4 days and covers theory, pool skills, and open-water dives."
    },
    {
        keywords: ["decompression", "decompression sickness", "bends", "nitrogen", "safety stop"],
        answer: "Decompression sickness (the bends) happens when a diver ascends too quickly and nitrogen forms bubbles in the body. Always ascend slowly and do a 3-minute safety stop at 5 metres."
    },
    {
        keywords: ["help", "what can you ask", "topics", "questions"],
        answer: "You can ask me about:\n1. What is scuba diving?\n2. What equipment do I need?\n3. How deep can I dive?\n4. How do I get certified?\n5. What is decompression sickness?\nType any keyword from those topics!"
    }
];

/**
 * Finds the best answer for a user message by checking keywords.
 * Returns null if no match is found.
 */
function findAnswer(userText) {
    const lower = userText.toLowerCase();
    
    for (const entry of questionBank) {
        for (const keyword of entry.keywords) {
            if (lower.includes(keyword)) {
                return entry.answer;
            }
        }
    }
    return null;
}

/**
 * Creates and appends a message bubble to the chat display.
 */
function addMessage(text, type) {
    const chatDisplay = document.getElementById("chat-display");

    const wrapper = document.createElement("div");
    wrapper.classList.add("message", "message--" + type);

    const label = document.createElement("span");
    label.classList.add("message-label");
    label.textContent = type === "user" ? "You" : "Bot";

    const content = document.createElement("p");
    content.textContent = text;

    wrapper.appendChild(label);
    wrapper.appendChild(content);
    chatDisplay.appendChild(wrapper);

    // Scroll to latest message
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Form submit event handler
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userText = chatInput.value.trim();
    if (!userText) return;

    // Add user message to chat
    addMessage(userText, "user");

    // Find and add bot response
    const answer = findAnswer(userText);
    if (answer) {
        addMessage(answer, "bot");
    } else {
        addMessage(
            "Sorry, I don't know that one. Try asking about: scuba diving, equipment, depth limits, certification, or decompression sickness. Type 'help' to see all topics.",
            "error"
        );
    }

    // Clear the input field
    chatInput.value = "";
    chatInput.focus();
});

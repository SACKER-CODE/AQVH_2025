
// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    let currentStepIndex = 0;

    const showNextStep = (stepIndex) => {
        const currentStep = steps[currentStepIndex];
        if (currentStep) {
            // Disable the main action button of the completed step
            const actionButton = currentStep.querySelector('.details-section > .btn:not(.reveal-btn)');
            if(actionButton) actionButton.style.display = 'none';
        }

        const nextStep = steps[stepIndex];
        if (nextStep) {
            nextStep.classList.add('active');
            nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        currentStepIndex = stepIndex;
    };

    const handleApiError = (error, errorElementId) => {
        console.error('API Error:', error);
        const errorDiv = document.getElementById(errorElementId);
        if (errorDiv) {
            errorDiv.textContent = error.error || 'An unknown error occurred. Please try again.';
        }
    };

    // Add event listeners for all "Reveal" buttons
    document.querySelectorAll('.reveal-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const parentStep = e.target.closest('.step');
            const details = parentStep.querySelector('.details-section');
            if (details) {
                details.style.display = 'block';
            }
            e.target.style.display = 'none'; // Hide the reveal button itself
        });
    });

    // --- Step 1 to 2 ---
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', async () => {
        const keyLength = document.getElementById('key_length').value;
        startBtn.disabled = true;
        startBtn.textContent = 'Generating...';
        
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key_length: keyLength })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('step2-info').innerHTML = `To generate a secure key of length <strong>${data.key_length}</strong>, we started with <strong>${data.bits_length}</strong> random bits and bases for Alice.`;
            document.getElementById('alice-bits-label').textContent = `Random Bits (${data.bits_length}):`;
            document.getElementById('alice-bits').textContent = data.alice_bits;
            document.getElementById('alice-bases-label').textContent = `Random Bases (${data.bits_length}):`;
            document.getElementById('alice-bases').textContent = data.alice_bases;
            showNextStep(1);
        } else {
            const error = await response.json();
            handleApiError(error, 'error-step1');
            startBtn.disabled = false;
            startBtn.textContent = 'Start Simulation »';
        }
    });

    // --- Step 2 to 3 ---
    document.getElementById('goToStep3Btn').addEventListener('click', () => showNextStep(2));

    // --- Step 3 to 4 ---
    const handleEavesdropChoice = async (eavesdrop) => {
        const eavesdropBtn = document.getElementById('eavesdropBtn');
        const noEavesdropBtn = document.getElementById('noEavesdropBtn');
        eavesdropBtn.disabled = true;
        noEavesdropBtn.disabled = true;
        
        const response = await fetch('/api/run_channel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eavesdrop: eavesdrop })
        });
        
        if (response.ok) {
            const data = await response.json();
            const step4Info = document.getElementById('step4-info');
            const eveSection = document.getElementById('eve-section');

            if (data.eavesdrop) {
                step4Info.innerHTML = `<div class="info-box danger"><strong>Eavesdropper Active!</strong> Eve intercepted the qubits, measured them, and sent new ones to Bob.</div>`;
                eveSection.style.display = 'block';
                document.getElementById('eve-bases').textContent = data.eve_bases;
                document.getElementById('eve-bits').textContent = data.eve_bits;
            } else {
                step4Info.innerHTML = `<div class="info-box safe"><strong>Channel Secure.</strong> Bob received the qubits directly from Alice.</div>`;
                eveSection.style.display = 'none';
            }
            document.getElementById('bob-bases').textContent = data.bob_bases;
            document.getElementById('bob-bits').textContent = data.bob_bits;
            showNextStep(3);
        } else {
            alert('An error occurred. Please restart the simulation.');
            eavesdropBtn.disabled = false;
            noEavesdropBtn.disabled = false;
        }
    };
    document.getElementById('eavesdropBtn').addEventListener('click', () => handleEavesdropChoice(true));
    document.getElementById('noEavesdropBtn').addEventListener('click', () => handleEavesdropChoice(false));

    // --- Step 4 to 5 ---
    document.getElementById('goToStep5Btn').addEventListener('click', async () => {
        const response = await fetch('/api/sift', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            document.getElementById('match-count').textContent = data.match_count;
            const tableBody = document.getElementById('sifting-table-body');
            tableBody.innerHTML = ''; // Clear previous results
            data.comparisons.forEach(item => {
                const row = document.createElement('tr');
                row.className = item.is_match ? 'match' : 'mismatch';
                row.innerHTML = `
                    <td>${item.qubit_index}</td>
                    <td>${item.alice_basis}</td>
                    <td>${item.bob_basis}</td>
                    <td>${item.is_match ? '<strong>Match (Keep)</strong>' : 'Mismatch (Discard)'}</td>
                `;
                tableBody.appendChild(row);
            });
            showNextStep(4);
        }
    });

    // --- Step 5 to Results ---
    document.getElementById('goToResultsBtn').addEventListener('click', async () => {
        const response = await fetch('/api/results', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            document.getElementById('sifted-key-alice').textContent = data.sifted_key_alice;
            document.getElementById('sifted-key-bob').textContent = data.sifted_key_bob;
            document.getElementById('qber-value').textContent = `${data.qber}%`;
            
            const resultsInfo = document.getElementById('results-info');
            if (data.eavesdrop && parseFloat(data.qber) > 0) {
                resultsInfo.innerHTML = `<div class="info-box danger"><strong>High QBER Detected!</strong> The error rate is above zero, indicating an eavesdropper.</div>`;
            } else if (data.eavesdrop && parseFloat(data.qber) === 0) {
                resultsInfo.innerHTML = `<div class="info-box warning"><strong>QBER is 0%, but Eve was present.</strong> By sheer luck, Eve's measurements didn't introduce detectable errors in the sample.</div>`;
            } else {
                resultsInfo.innerHTML = `<div class="info-box safe"><strong>QBER is 0%.</strong> The channel appears secure.</div>`;
            }

            const finalKeyInfo = document.getElementById('final-key-info');
            const finalKeyDisplay = document.getElementById('final-key-display');
            if (data.is_secure) {
                finalKeyInfo.textContent = 'The QBER is within a safe threshold. Alice and Bob can now use the first part of their sifted key as a shared secret.';
                finalKeyDisplay.className = 'final-key success';
                finalKeyDisplay.innerHTML = `<strong>SUCCESS:</strong> ${data.final_key_alice}`;
            } else {
                finalKeyInfo.textContent = 'The QBER is too high or not enough matching bits were found! The key is insecure, and the process must be aborted.';
                finalKeyDisplay.className = 'final-key failure';
                finalKeyDisplay.innerHTML = '<strong>COMPROMISED:</strong> Communication Aborted!';
            }
            showNextStep(5);
        }
    });
});

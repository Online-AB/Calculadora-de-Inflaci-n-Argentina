// Navigation function for country dropdown
function navigateToCountry() {
    const select = document.getElementById('country-select');
    const selectedValue = select.value;
    if (selectedValue && selectedValue !== window.location.pathname.split('/').pop()) {
        window.location.href = selectedValue;
    }
}

// Inflation Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inflation-form');
    const resultSection = document.getElementById('result-section');
    const resultValue = document.getElementById('result-value');
    const resultDescription = document.getElementById('result-description');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateInflation();
        });
    }

    function calculateInflation() {
        // Get input values
        const initialAmount = parseFloat(document.getElementById('initial-amount').value);
        const inflationRate = parseFloat(document.getElementById('inflation-rate').value);
        const years = parseInt(document.getElementById('years').value);

        // Validate inputs
        if (isNaN(initialAmount) || isNaN(inflationRate) || isNaN(years)) {
            alert('Por favor, ingresa valores válidos en todos los campos.');
            return;
        }

        if (initialAmount <= 0 || years <= 0) {
            alert('El monto inicial y el número de años deben ser mayores a cero.');
            return;
        }

        // Calculate inflation impact
        const inflationDecimal = inflationRate / 100;
        const futureValue = initialAmount * Math.pow(1 + inflationDecimal, years);
        const inflationImpact = futureValue - initialAmount;
        const purchasingPowerLoss = initialAmount - (initialAmount / Math.pow(1 + inflationDecimal, years));

        // Format results
        const currency = getCurrencySymbol();
        const formattedInitial = formatCurrency(initialAmount, currency);
        const formattedFuture = formatCurrency(futureValue, currency);
        const formattedLoss = formatCurrency(purchasingPowerLoss, currency);

        // Display results
        resultValue.innerHTML = `
            <div style="margin-bottom: 15px;">
                <strong>Valor futuro:</strong> ${formattedFuture}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Pérdida de poder adquisitivo:</strong> ${formattedLoss}
            </div>
        `;

        resultDescription.innerHTML = `
            Tu ${formattedInitial} de hoy tendrán un valor equivalente a ${formatCurrency(initialAmount / Math.pow(1 + inflationDecimal, years), currency)} 
            en poder adquisitivo después de ${years} año${years > 1 ? 's' : ''} con una inflación del ${inflationRate}% anual.
        `;

        // Show result section
        resultSection.classList.add('show');
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function getCurrencySymbol() {
        const currentPage = window.location.pathname.split('/').pop();
        const currencyMap = {
            'index.html': 'ARS',
            'calculadora-ipc-chile.html': 'CLP',
            'colombia.html': 'COP',
            'mexico.html': 'MXN',
            'paraguay.html': 'PYG',
            'peru.html': 'PEN',
            'uruguay.html': 'UYU',
            'united-state.html': 'USD'
        };
        return currencyMap[currentPage] || 'ARS';
    }

    function formatCurrency(amount, currency) {
        const currencySymbols = {
            'ARS': '$',
            'CLP': '$',
            'COP': '$',
            'MXN': '$',
            'PYG': '₲',
            'PEN': 'S/',
            'UYU': '$U',
            'USD': '$'
        };
        
        const symbol = currencySymbols[currency] || '$';
        return `${symbol} ${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
});

// Set the correct option in dropdown based on current page
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('country-select');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (select) {
        select.value = currentPage;
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inflation-form');
    const submitBtn = form ? form.querySelector('.calculate-btn') : null;
    
    if (form && submitBtn) {
        form.addEventListener('submit', function() {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Calculando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});


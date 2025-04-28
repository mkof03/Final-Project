//Password generator:
//Declare varaibles and consts needed:
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');
const strengthInput = document.getElementById('strengthInput');
const strengthBadge = document.getElementById('strengthBadge');

const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~\`|}{[]:;?><,./-=';

//Bootstrap toast for warning
const charsetToastEl = document.getElementById('charsetToast');
const charsetToast = new bootstrap.Toast(charsetToastEl);

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

//Generate pw event listener
generateBtn.addEventListener('click', () => {
    const length = +lengthSlider.value;
    let charset = '';
    if (document.getElementById('lowercase').checked) charset += lowerChars;
    if (document.getElementById('uppercase').checked) charset += upperChars;
    if (document.getElementById('numbers').checked) charset += numberChars;
    if (document.getElementById('symbols').checked) charset += symbolChars;
    if (!charset) {
    charsetToast.show();
    return;
    }
    let pwd = '';
    for (let i = 0; i < length; i++) {
    pwd += charset[Math.floor(Math.random() * charset.length)];
    }
    generatedPassword.value = pwd;
});

//Copy to clipboard even listener
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPassword.value)
    .then(() => { copyBtn.textContent = 'Copied!'; setTimeout(() => copyBtn.textContent = 'Copy', 1500); })
    .catch(() => { copyBtn.textContent = 'Error'; });
});

//Fuction to determine strength of password
function evaluateStrength(pwd) {
    let score = 0;
    if (!pwd) return {text: 'N/A', class: 'bg-secondary'};
    score += Math.min(10, pwd.length) * 2;
    const variants = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d]/];
    const varCount = variants.reduce((count, re) => count + (re.test(pwd) ? 1 : 0), 0);
    score += (varCount - 1) * 10;

    if (score < 20) return {text: 'Weak', class: 'bg-danger'};
    if (score < 40) return {text: 'Moderate', class: 'bg-warning'};
    if (score < 60) return {text: 'Strong', class: 'bg-info'};
    return {text: 'Very Strong', class: 'bg-success'};
}

//Event listening for each key stroke
strengthInput.addEventListener('input', () => {
    const {text, class: cls} = evaluateStrength(strengthInput.value);
    strengthBadge.textContent = text;
    strengthBadge.className = `badge ${cls}`;
});

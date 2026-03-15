function enterApp() {
    const welcome = document.getElementById('welcomeScreen');
    welcome.style.opacity = '0';
    welcome.style.transform = 'scale(1.1)';
    setTimeout(() => {
        welcome.style.display = 'none';
        document.getElementById('mainApp').classList.remove('hidden');
    }, 600);
}

window.onload = () => { 
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-GB'); 
};

function tab(mode) {
    if(mode === 'view') {
        document.getElementById('editArea').classList.add('hidden');
        document.getElementById('viewArea').classList.remove('hidden');
        document.getElementById('btnView').classList.add('active');
        document.getElementById('btnEdit').classList.remove('active');
        
        // Trigger skill bar animations
        setTimeout(() => { 
            document.querySelectorAll('.progress-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-percent') + "%";
            });
        }, 300);
    } else {
        document.getElementById('editArea').classList.remove('hidden');
        document.getElementById('viewArea').classList.add('hidden');
        document.getElementById('btnEdit').classList.add('active');
        document.getElementById('btnView').classList.remove('active');
    }
}

function sync() {
    document.getElementById('oName').innerText = document.getElementById('iName').value.toUpperCase() || "YOUR NAME";
    document.getElementById('oTitle').innerText = document.getElementById('iTitle').value || "PROFESSIONAL TITLE";
    document.getElementById('oPhone').innerText = document.getElementById('iPhone').value;
    document.getElementById('oEmail').innerText = document.getElementById('iEmail').value;
    document.getElementById('oAddr').innerText = document.getElementById('iAddr').value;
    document.getElementById('oEdu').innerText = document.getElementById('iEdu').value;
    document.getElementById('oExp').innerText = document.getElementById('iExp').value;
    document.getElementById('oRef').innerText = document.getElementById('iRef').value;
    
    const skillStr = document.getElementById('iSkills').value;
    const container = document.getElementById('skillBars');
    container.innerHTML = "";
    if(skillStr) {
        skillStr.split(',').forEach(item => {
            const p = item.split(':');
            if(p.length === 2) {
                container.innerHTML += `
                    <div class="skill-container">
                        <div class="skill-info">
                            <span>${p[0].trim()}</span>
                            <span>${p[1].trim()}%</span>
                        </div>
                        <div class="progress-bg">
                            <div class="progress-fill" data-percent="${p[1].trim()}"></div>
                        </div>
                    </div>`;
            }
        });
    }
}

function updateImg(e) { 
    if(e.target.files[0]) document.getElementById('oImg').src = URL.createObjectURL(e.target.files[0]); 
}

// DOWNLOAD AS IMAGE
function downloadImage() {
    if(document.getElementById('viewArea').classList.contains('hidden')) tab('view');
    
    const footer = document.querySelector('.cv-footer');
    footer.style.opacity = '0'; // Hide branding during capture for a cleaner look

    setTimeout(() => {
        html2canvas(document.getElementById('captureArea'), { 
            scale: 3, 
            useCORS: true,
            backgroundColor: "#ffffff"
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'CareerCanvas_CV_6ANIK9.png';
            link.href = canvas.toDataURL("image/png");
            link.click();
            
            footer.style.opacity = '1'; // Show branding again
        });
    }, 800);
}

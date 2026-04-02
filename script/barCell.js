function bars(val, target, dest) {
    const form = document.getElementById(dest);
    if (!form) {
        console.error(`Container with id ${dest} not found`);
        return;
    }
    form.innerHTML = '';
    var percent = (val/target)*100

    const container = document.createElement('div');
    container.className = 'progressBarContainer';

    const bar = document.createElement('div');
    bar.className = 'progressBar';

    const value = document.createElement('span');
    value.className = 'progressValue';
    var jam = Math.floor(val);
    var menit = Math.floor((((val*100)%100)*60)/100);
    console.log('data:'+val); 
    console.log('hitung:'+jam+'.'+menit);
    if (menit < 10) menit = '0'+menit;
    if (jam < 10) jam = '0'+jam;
    value.textContent = jam +':'+menit;

    if(val>target){
        bar.style.background = '#f51212';
        value.style.color = 'white';
    }else{
        const fillBar = document.createElement('div');
        fillBar.className = 'fill';
        fillBar.style.width = percent + '%';
        bar.appendChild(fillBar);
    }
    
    // Put the value inside the fill bar
    bar.appendChild(value);
    container.appendChild(bar);
    form.appendChild(container);
}

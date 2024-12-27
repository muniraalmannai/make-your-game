export function Win(){

    let reset = document.createElement('button');
    reset.onclick = () => location.reload();
    reset.textContent = 'Restart'; 
    reset.style.padding = '10px 20px'; 
    reset.style.backgroundColor = 'darkblue'; 
    reset.style.color = 'white'; 
    reset.style.border = 'none'; 
    reset.style.borderRadius = '10px';
    reset.style.fontSize = '24px';
    reset.style.cursor = 'pointer';
    reset.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    reset.style.transition = 'all 0.3s ease';

    
    reset.onmouseover = () => {
        reset.style.backgroundColor = 'darkblue';
        reset.style.transform = 'scale(1.1)';
    };
    reset.onmouseout = () => {
        reset.style.backgroundColor = 'darkblue';
        reset.style.transform = 'scale(1)';
    };



    let wining = document.createElement('div');
    wining.id = 'win';
    wining.style.position = 'absolute';
    wining.style.top = '0';
    wining.style.left = '0';
    wining.style.width = '100%';
    wining.style.height = '100%';
    wining.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    wining.style.color = 'white';
    wining.style.fontFamily = 'Helvetica, Arial, sans-serif';
    wining.style.fontSize = '60px';
    wining.style.textAlign = 'center';
    wining.style.display = 'flex';
    wining.style.alignItems = 'center';
    wining.style.justifyContent = 'center';
    wining.textContent = 'You won!';
    wining.appendChild(reset)

    document.body.appendChild(wining);

}

export function Loss(){

    let reset = document.createElement('button');
    reset.onclick = () => location.reload();
    reset.textContent = 'Restart'; 
    reset.style.padding = '10px 20px'; 
    reset.style.backgroundColor = 'darkblue'; 
    reset.style.color = 'white'; 
    reset.style.border = 'none'; 
    reset.style.borderRadius = '10px';
    reset.style.fontSize = '24px';
    reset.style.cursor = 'pointer';
    reset.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    reset.style.transition = 'all 0.3s ease';

    
    reset.onmouseover = () => {
        reset.style.backgroundColor = 'darkblue';
        reset.style.transform = 'scale(1.1)';
    };
    reset.onmouseout = () => {
        reset.style.backgroundColor = 'darkblue';
        reset.style.transform = 'scale(1)';
    };



    let losing = document.createElement('div');
    losing.id = 'loss';
    losing.style.position = 'absolute';
    losing.style.top = '0';
    losing.style.left = '0';
    losing.style.width = '100%';
    losing.style.height = '100%';
    losing.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    losing.style.color = 'white';
    losing.style.fontFamily = 'Helvetica, Arial, sans-serif';
    losing.style.fontSize = '60px';
    losing.style.textAlign = 'center';
    losing.style.display = 'flex';
    losing.style.alignItems = 'center';
    losing.style.justifyContent = 'center';
    losing.textContent = 'Game over!';
    losing.appendChild(reset)

    document.body.appendChild(losing);

}
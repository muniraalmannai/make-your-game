export function Win() {
    let reset = document.createElement('button');
    reset.onclick = () => location.reload();
    reset.textContent = 'Restart';
    reset.style.padding = '15px 30px';
    reset.style.backgroundColor = '#007BFF';
    reset.style.color = 'white';
    reset.style.border = 'none';
    reset.style.borderRadius = '8px';
    reset.style.fontSize = '24px';
    reset.style.cursor = 'pointer';
    reset.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    reset.style.transition = 'background-color 0.3s, transform 0.2s';
    reset.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";


    reset.onmouseover = () => {
        reset.style.backgroundColor = '#0056b3';
        reset.style.transform = 'scale(1.1)';
    };
    reset.onmouseout = () => {
        reset.style.backgroundColor = '#007BFF';
        reset.style.transform = 'scale(1)';
    };

    let winning = document.createElement('div');
    winning.id = 'win';
    winning.style.position = 'fixed';
    winning.style.top = '0';
    winning.style.left = '0';
    winning.style.width = '100%';
    winning.style.height = '100%';
    winning.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    winning.style.color = 'white';
    winning.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
    winning.style.textAlign = 'center';
    winning.style.display = 'flex';
    winning.style.flexDirection = 'column';
    winning.style.alignItems = 'center';
    winning.style.justifyContent = 'center';
    winning.style.zIndex = '1000';
    winning.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.9)';

    const winText = document.createElement('div');
    winText.textContent = 'You Won!';
    winText.style.fontSize = '80px';
    winText.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
    winText.style.marginBottom = '30px';

    winning.appendChild(winText);
    winning.appendChild(reset);
    document.body.appendChild(winning);
}

export function Loss() {
    let reset = document.createElement('button');
    reset.onclick = () => location.reload();
    reset.textContent = 'Restart';
    reset.style.padding = '15px 30px';
    reset.style.backgroundColor = '#007BFF';
    reset.style.color = 'white';
    reset.style.border = 'none';
    reset.style.borderRadius = '8px';
    reset.style.fontSize = '24px';
    reset.style.cursor = 'pointer';
    reset.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    reset.style.transition = 'background-color 0.3s, transform 0.2s';
    reset.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";

    reset.onmouseover = () => {
        reset.style.backgroundColor = '#0056b3';
        reset.style.transform = 'scale(1.1)';
    };
    reset.onmouseout = () => {
        reset.style.backgroundColor = '#007BFF';
        reset.style.transform = 'scale(1)';
    };

    let losing = document.createElement('div');
    losing.id = 'loss';
    losing.style.position = 'fixed';
    losing.style.top = '0';
    losing.style.left = '0';
    losing.style.width = '100%';
    losing.style.height = '100%';
    losing.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    losing.style.color = 'white';
    losing.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
    losing.style.textAlign = 'center';
    losing.style.display = 'flex';
    losing.style.flexDirection = 'column';
    losing.style.alignItems = 'center';
    losing.style.justifyContent = 'center';
    losing.style.zIndex = '1000';
    losing.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.9)';

    const lossText = document.createElement('div');
    lossText.textContent = 'Game Over!';
    lossText.style.fontSize = '80px';
    lossText.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
    lossText.style.marginBottom = '30px';

    losing.appendChild(lossText);
    losing.appendChild(reset);
    document.body.appendChild(losing);
}

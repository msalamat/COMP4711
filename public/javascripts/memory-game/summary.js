window.onload = () => {
    let element = document.getElementById('score')
    let score = localStorage.getItem('score')

    if (score <= 1) {
        element.innerText = 'Maybe not with your score of ' + score + '..'
    } else {
        element.innerText = 'You scored ' + score + '!'
    }
}

restartGame = () => {
    window.location.href = '/memory-game';
}

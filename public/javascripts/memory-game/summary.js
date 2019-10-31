window.onload = () => {
    let element = document.getElementById('score')
    let score = localStorage.getItem('score')

    if (score <= 1) {
        element.innerText = 'Maybe not with your score of ' + score + '..'
    } else {
        element.innerText = 'You scored ' + score + '!'
    }
}

const restartGame = () => {
    window.location.href = '/memory-game';
}

const submitToLeaderboard = () => {
    const url = '/memory-game'

    let el = document.getElementById('username')

    let data = {
        name: el.value,
        score: localStorage.getItem('score'),
    }

    try {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error:', error)
    }

    setTimeout(() => {
        window.location.href = '/memory-game/leaderboard?user='+data.name;    
    }, 1000);
    
}
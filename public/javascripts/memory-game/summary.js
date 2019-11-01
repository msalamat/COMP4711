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
    let url2 = '/memory-game/leaderboard?user='+data.name;

   
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((lol) => {
            console.log(url2)
            console.log('hi ' + lol)
            window.location.href = url2;
            
        })
    


     

    // setTimeout(() => {
    //     window.location.href = '/memory-game/leaderboard?user='+data.name;    
    // }, 5000);
    
}
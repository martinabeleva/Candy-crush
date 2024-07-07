document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8;
    const squares = [];
    const candyColors = [
        '#e1fafb',
        'rgb(253, 232, 214)',
        'rgba(215, 241, 211, 0.938)',
        'rgb(233, 220, 250)',
        'rgb(255, 253, 196)',
        '#f7d7e3ee'
    ]

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randomColor]
            grid.appendChild(square);
            squares.push(square);

        }
    }
    createBoard()

    let colorDragged;
    let replacedColor;
    let squareIdDragged;
    let squareIdReplaced;


    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
     colorDragged = this.style.backgroundColor;
     squareIdDragged = parseInt(this.id)

    }

    function dragDrop() {

        replacedColor = this.style.backgroundColor;
        squareIdReplaced = parseInt(this.id);
        this.style.backgroundColor = colorDragged
        squares[squareIdDragged].style.backgroundColor = replacedColor
    }

    function dragEnter(e) {
        e.preventDefault() 
    }
    function dragLeave() {

    }

    function dragOver(e){
        e.preventDefault() 

    }
    function dragEnd(){
        let validMoves = [
            squareIdDragged - 1,
            squareIdDragged - width,
            squareIdDragged + 1,
            squareIdDragged + width
        ]

    
        let validMove = validMoves.includes(squareIdReplaced);
    
        if(squareIdReplaced && validMove){
            squareIdReplaced = null;
        } else if (squareIdReplaced && !validMove){
            squares[squareIdReplaced].style.backgroundColor = replacedColor;
            squares[squareIdDragged].style.backgroundColor = colorDragged;
        } else {
            squares[squareIdDragged].style.backgroundColor = colorDragged
        }
    
    
    
    }





})
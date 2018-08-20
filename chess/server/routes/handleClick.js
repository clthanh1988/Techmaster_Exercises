var express = require('express');
var router = express.Router();


const isMovePossible = (typeofpiece, src, dest) => {
    switch (typeofpiece) {

        case 'R':
            isMovePossible(src, dest) {
                let mod = src % 8;
                let diff = 8 - mod;
                return (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
            }
            break;
        case 'B':
            isMovePossible(src, dest) {
                return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
            }
            break;
        case 'Q':
            isMovePossible(src, dest) {
                let mod = src % 8;
                let diff = 8 - mod;

                return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0) ||
                    (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
            }

            break;

        case 'K':
            isMovePossible(src, dest) {
                return (src - 9 === dest ||
                    src - 8 === dest ||
                    src - 7 === dest ||
                    src + 1 === dest ||
                    src + 9 === dest ||
                    src + 8 === dest ||
                    src + 7 === dest ||
                    src - 1 === dest);
            }


        case 'N':
            isMovePossible(src, dest) {
                return (src - 17 === dest ||
                    src - 10 === dest ||
                    src + 6 === dest ||
                    src + 15 === dest ||
                    src - 15 === dest ||
                    src - 6 === dest ||
                    src + 10 === dest ||
                    src + 17 === dest);
            }

            break;
        case 'P':

            isMovePossible(src, dest, isDestEnemyOccupied) {

                if (this.player === 1) {
                    if ((dest === src - 8 && !isDestEnemyOccupied) || (dest === src - 16 && this.initialPositions[1].indexOf(src) > -1)) {
                        return true;
                    } else if (isDestEnemyOccupied && (dest === src - 9 || dest === src - 7)) {
                        return true;
                    }
                } else if (this.player === 2) {
                    if ((dest === src + 8 && !isDestEnemyOccupied) || (dest === src + 16 && this.initialPositions[2].indexOf(src) > -1)) {
                        return true;
                    } else if (isDestEnemyOccupied && (dest === src + 9 || dest === src + 7)) {
                        return true;
                    }
                }
                return false;
            }
            break;
    }


}

const isMoveLegal = (playerid, pieceid, typeofpiece, src, dest) => {
    if (isMovePossible(typeofpiece, src, dest) == true) {
        
    }
    else {
        false
    }
    


}

router.post('/:move', function (req, res, next) {
    if (move = legalMove) {
        currentPos = dest
    } else {
        return;
    }


})
import { CANVAS } from '../Assets/Other.js';
import { game } from '../../app.js';
import { Debris } from './Friendly/Debris.js';

export class LaserPool {
    constructor() {
        this.liveLasers = [];
    }

    add(laser) {
        this.liveLasers.push(laser);
        if (game.state.slowmo) {
            game.slowmocontroller.applyToOneLaser(laser);
        }
    }

    clear() {
        this.liveLasers.forEach((laser) => laser.shatter());
    }

    move() {
        if (!game.player.clock.active) {
            this.liveLasers.forEach((laser) => laser.move());
        }
    }

    // only keep lasers that meet the below conditions:
    // - not shattered
    // - still on-screen
    // - out of screen, but is a space debris
    refresh() {
        this.liveLasers = this.liveLasers.filter((laser) => {
            const isShattered = laser.shattered;
            const isDebris = laser.constructor === Debris;
            const isInScreen = laser.y >= 0 && laser.y <= CANVAS.height && laser.x >= 0 && laser.x <= CANVAS.width;

            if (isShattered) {
                return false;
            }

            if (isDebris) {
                return true;
            }

            if (!isInScreen) {
                return false;
            }

            return true;
        });
    }
}

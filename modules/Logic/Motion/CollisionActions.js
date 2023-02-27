import { game } from '../../../app.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';
import { Movement } from './Movement.js';
import { flashScreen, randomInRange } from '../Helpers.js';
import { Drone } from '../../Lasers/Friendly/Drone.js';
import { Airstrike } from '../../Lasers/Friendly/Airstrike.js';
import { Dart } from '../../Lasers/Friendly/Dart.js';
import { Slash } from '../../Effects/Misc/Slash.js';

export class CollisionActions {
    // BLUELASERS AND ENEMIES
    static BluelasersEnemies(enemy, laser) {
        if (!game.state.variables.blankbullets) {
            // Pushback & play sound if the laser is not a drone
            if (laser.constructor !== Drone && laser.constructor !== Dart) {
                enemy.pushBack();
                game.audiocontroller.playHitSound(enemy);
            }

            enemy.takeDamage(laser.damage);
            game.effects.add(new DamageNumber(enemy.x, enemy.y, laser.damage));
            game.effects.add(new Slash(enemy.x, enemy.y));

            // Check if Bomb upgraded
            if (game.state.variables.bomb) {
                game.enemies.damageAll(laser.damage * game.state.variables.bombdamagerate);
            }

            // Airstrike
            if (game.state.variables.airstrike) {
                const airstrikeroll = randomInRange(0, 100);
                if (
                    game.enemies.enemiesOnScreen() &&
                    airstrikeroll < game.state.variables.airstrikechance &&
                    laser.constructor !== Airstrike &&
                    laser.constructor !== Drone
                ) {
                    game.enemies.liveEnemies.forEach((enemy, index) => {
                        setTimeout(() => {
                            game.bluelasers.add(new Airstrike(enemy));
                        }, 100 * index);
                    });
                }
            }

            // Darts
            if (game.state.variables.darts && !enemy.name) {
                const stunroll = randomInRange(0, 100);
                if (stunroll < game.state.variables.dartsstunchance) {
                    enemy.stun();
                    enemy.takeDamage(laser.damage * game.state.variables.dartsrate);
                }
            }
        }
        laser.shatter();
    }

    // PLAYER AND ENEMIES
    static PlayerEnemies(enemy) {
        if (game.player.shield.isCharged() && !enemy.name && !game.player.clock.active) {
            flashScreen();
            enemy.takeDamage(enemy.hp);
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                game.enemies.damageAll(
                    randomInRange(2, 6) * game.state.variables.damageMultiplier * game.state.variables.emprate
                );
                game.firelasers.clear();
            }
        }
        // If clock not active but ready, activate it.
        else if (game.player.clock.owned && !game.player.clock.active && game.player.clock.ready) {
            game.player.clock.activate();
        } else if (!game.player.clock.active) {
            game.state.setGameOver();
        }
    }

    // PLAYER AND ENEMY LASERS
    static PlayerLasers(firelaser) {
        if (game.player.shield.isCharged() && !game.player.clock.active) {
            flashScreen();
            firelaser.shatter();
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                game.enemies.damageAll(
                    randomInRange(2, 6) * game.state.variables.damageMultiplier * game.state.variables.emprate
                );
                game.firelasers.clear();
            }
        }
        // If clock not active but ready, activate it.
        else if (game.player.clock.owned && !game.player.clock.active && game.player.clock.ready) {
            game.player.clock.activate();
        } else if (!game.player.clock.active) {
            game.state.setGameOver();
        }
    }

    // ENEMIES AND ENEMIES
    static EnemiesEnemies(enemy1, enemy2) {
        Movement.moveAway(enemy1, enemy2);
    }

    // COIN AND PLAYER
    static CoinPlayer(coin, player) {
        coin.removeAndCount();
    }

    // BLUELASERS AND FIRELASERS
    static BluelasersFirelasers(bluelaser, firelaser) {
        // OVERPOWERED - Removed for now
    }

    // ENEMIES AND CANVAS LIMITS
    static EnemyCanvas(enemy) {
        Movement.moveToCanvas(enemy);
    }
}

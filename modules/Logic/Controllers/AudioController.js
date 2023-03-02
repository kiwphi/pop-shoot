import { game } from '../../../app.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import {
    LASERSOUND,
    RELOADSOUND,
    SHIELDDOWNSOUND,
    SHIELDUPSOUND,
    MUSICS0,
    MUSICS1,
    MUSICS2,
    MUSICS3,
    MUSICBOSS0,
    MUSICBOSS1,
    MUSICBOSS2,
    MUSICSLOWMO,
    MUSICGAMEOVER,
    HITSOUND,
    HITQUADSOUND,
    HITMETALSOUND,
    MUSICCLOCK,
    MUSICBOSS3,
    MUSICBOSS4,
    MUSICS4,
    DIVERSOUND,
    SLOWMOCHARGESOUND,
    SLOWMOEMPTYSOUND,
    RAINSOUND,
    THUNDER0SOUND,
    THUNDER1SOUND,
    WINDSOUND,
    SANDSOUND,
    MIRAGESOUND,
    VORTEXSOUND,
    GLITCHSOUND,
    MATRIXSOUND,
    ANXIETYSOUND,
    PHASESOUND,
    SPLASHSOUND,
    PHEWSOUND,
    EXPLOSIONNORMALSOUND,
    EXPLOSIONBIGSOUND,
    SMOKESOUND,
    SWOOSHSOUND,
    STEAMSOUND,
    BEEPREDSOUND,
    BEEPORANGESOUND,
    POWERDOWNSOUND,
    FAMILIARMGSOUND,
    SIRENSOUND,
    COINSOUND,
} from '../../Assets/Audio.js';

const MUSIC = {
    stage0: MUSICS0,
    stage1: MUSICS1,
    stage2: MUSICS2,
    stage3: MUSICS3,
    stage4: MUSICS4,
    boss0: MUSICBOSS0,
    boss1: MUSICBOSS1,
    boss2: MUSICBOSS2,
    boss3: MUSICBOSS3,
    boss4: MUSICBOSS4,
    slowmo: MUSICSLOWMO,
    gameover: MUSICGAMEOVER,
    clock: MUSICCLOCK,
};

const SOUNDS = {
    anxiety: {
        audio: ANXIETYSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    beepRed: {
        audio: BEEPREDSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    beepOrange: {
        audio: BEEPORANGESOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    bigThunder: {
        audio: THUNDER0SOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    diver: {
        audio: DIVERSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    exp_big: {
        audio: EXPLOSIONBIGSOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    exp_normal: {
        audio: EXPLOSIONNORMALSOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    familiarMg: {
        audio: FAMILIARMGSOUND,
        rewind: true,
        clone: false,
        volume: 1,
    },
    glitch: {
        audio: GLITCHSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    hit: {
        audio: HITSOUND,
        rewind: false,
        clone: true,
        volume: 0.5,
    },
    hitMetal: {
        audio: HITMETALSOUND,
        rewind: false,
        clone: true,
        volume: 0.5,
    },
    hitQuad: {
        audio: HITQUADSOUND,
        rewind: false,
        clone: true,
        volume: 0.5,
    },
    laser: {
        audio: LASERSOUND,
        rewind: false,
        clone: true,
        volume: 0.7,
    },
    matrix: {
        audio: MATRIXSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    mirage: {
        audio: MIRAGESOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    phase: {
        audio: PHASESOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    phew: {
        audio: PHEWSOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    powerDown: {
        audio: POWERDOWNSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    rain: {
        audio: RAINSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    reload: {
        audio: RELOADSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    sand: {
        audio: SANDSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    shieldDown: {
        audio: SHIELDDOWNSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    shieldUp: {
        audio: SHIELDUPSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    slowmoEmpty: {
        audio: SLOWMOEMPTYSOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    siren: {
        audio: SIRENSOUND,
        rewind: true,
        clone: false,
        volume: 1,
    },
    slowmoCharge: {
        audio: SLOWMOCHARGESOUND,
        rewind: true,
        clone: false,
        volume: 1,
    },
    smallThunder: {
        audio: THUNDER1SOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    smoke: {
        audio: SMOKESOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    splash: {
        audio: SPLASHSOUND,
        rewind: false,
        clone: true,
        volume: 1,
    },
    steam: {
        audio: STEAMSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    swoosh: {
        audio: SWOOSHSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    vortex: {
        audio: VORTEXSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
    wind: {
        audio: WINDSOUND,
        rewind: false,
        clone: false,
        volume: 1,
    },
};

// LIMITS
const MAX_CONCURRENT_HITS = 5;
const MAX_CONCURRENT_COINS = 10;

export class AudioController {
    constructor() {
        for (const key in MUSIC) {
            MUSIC[key].loop = true;
            MUSIC[key].volume = 0;
        }

        RAINSOUND.loop = true;
        WINDSOUND.loop = true;
        SANDSOUND.loop = true;
        VORTEXSOUND.loop = true;
        MATRIXSOUND.loop = true;
        SIRENSOUND.loop = true;

        this.currentlyPlayingHits = 0;
        this.currentlyPlayingCoins = 0;
    }

    playTrack(track) {
        for (const key in MUSIC)
            if (key === track) {
                if (key === 'slowmo') {
                    MUSIC[key].currentTime = 0;
                }
                MUSIC[key].play();
            } else {
                MUSIC[key].pause();
            }
    }

    rewindMusic() {
        for (const key in MUSIC) {
            MUSIC[key].currentTime = 0;
        }
    }

    playSound(type) {
        const sound = SOUNDS[type].clone ? SOUNDS[type].audio.cloneNode() : SOUNDS[type].audio;
        sound.volume = SOUNDS[type].volume;
        sound.play();
    }

    stopSound(type) {
        const sound = SOUNDS[type];
        if (sound.rewind) {
            sound.audio.currentTime = 0;
        }
        sound.audio.pause();
    }

    // EDGE CASES

    playCoinSound() {
        this.queueCoinSound(COINSOUND.cloneNode(true));
    }

    queueCoinSound(coinSound) {
        coinSound.onended = () => {
            this.currentlyPlayingCoins--;
        };

        if (this.currentlyPlayingCoins <= MAX_CONCURRENT_COINS) {
            this.currentlyPlayingCoins++;
            coinSound.play();
        }
    }

    playHitSound(enemy) {
        // PACKAGES
        if (enemy.constructor === RedPackage || enemy.constructor === OrangePackage) {
            const metalSound = SOUNDS['hitMetal'].audio.cloneNode(true);
            metalSound.volume = SOUNDS['hitMetal'].volume;
            return this.queueHitSound(metalSound);
        }

        // QUAD-DAMAGE
        if (game.state.variables.quaddamage) {
            const quadSound = SOUNDS['hitQuad'].audio.cloneNode(true);
            quadSound.volume = SOUNDS['hitQuad'].volume;
            return this.queueHitSound(quadSound);
        }

        // NORMAL ENEMIES
        const hitSound = SOUNDS['hit'].audio.cloneNode(true);
        hitSound.volume = SOUNDS['hit'].volume;
        this.queueHitSound(hitSound);
    }

    queueHitSound(hitSound) {
        hitSound.onended = () => {
            this.currentlyPlayingHits--;
        };

        if (this.currentlyPlayingHits <= MAX_CONCURRENT_HITS) {
            this.currentlyPlayingHits++;
            hitSound.play();
        }
    }
}

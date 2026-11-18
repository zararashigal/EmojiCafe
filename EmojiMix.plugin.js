/**
 * @name EmojiMix
 * @description Mix two emojis into one right from the chat bar, like Google's Emoji Kitchen. Sends them as small images or as inline server emojis.
 * @version 1.0.0
 * @author Ashley Orion
 * @source https://github.com/zararashigal/EmojiMix
 * @website https://github.com/zararashigal/EmojiMix
 */

"use strict";

/* ------------------------------------------------------------------------- *
 * Data
 * ------------------------------------------------------------------------- */

// "hex codepoints|date folder|keywords". The date is the Emoji Kitchen folder the emoji was added in.
const EMOJI_DATA = [
	"1f604|20201001|smile happy",
	"1f600|20201001|smile happy",
	"1f642|20201001|smile happy",
	"1f643|20201001|smile happy upsidedown",
	"1f603|20201001|smile happy",
	"1f601|20201001|smile happy cheese teeth grin",
	"1f60a|20201001|smile happy innocent blush",
	"263a-fe0f|20201001|smile happy innocent blush",
	"1f607|20201001|smile happy innocent angel holy halo",
	"1f606|20201001|smile happy laugh xd",
	"1f602|20201001|smile happy laugh cry lol lmao rofl",
	"1f923|20201001|smile happy laugh cry side lol lmao rofl",
	"1f605|20201001|smile happy sweat nervous awkward uncomfortable",
	"1f609|20201001|smile happy wink",
	"1f617|20201001|kiss",
	"1f619|20201001|kiss",
	"1f61a|20201001|kiss blush",
	"1f618|20201001|kiss heart love wink",
	"1f60d|20201001|smile happy heart love eyes",
	"1f970|20201001|smile happy heart love",
	"1f929|20201001|smile happy star eyes",
	"1f61b|20201001|smile happy tongue",
	"1f61d|20201001|smile happy tongue laugh xd",
	"1f60b|20201001|smile happy tongue yum",
	"1f61c|20201001|smile happy tongue wink",
	"1f92a|20201001|smile happy tongue eyes joking funny",
	"1f911|20201001|smile happy money dollar currency tongue eyes",
	"1f972|20201001|smile cry dying inside sad",
	"1f917|20201001|smile happy blush hug hand",
	"1f92b|20201001|smile whisper shush quiet secret silent",
	"1f92d|20201001|blush embarrass hand cover quiet",
	"1fae2|20211115|hand cover quiet secret",
	"1fae3|20211115|hand cover eye peeking secret",
	"1f910|20201001|quiet zip silent",
	"1f636|20201001|speechless silent quiet no mouth",
	"1f914|20201001|think ponder question thought confuse hand",
	"1f928|20201001|confuse question suspicious distrust eyebrow",
	"1f610|20201001|neutral blank straight bored",
	"1f611|20201001|neutral blank straight bored eyes shut tired annoyed",
	"1f636-200d-1f32b-fe0f|20210218|clouds peekaboo spy hidden",
	"1f60f|20201001|suspicious sus funtimes mischievous suggestive smirk smug",
	"1f60c|20201001|happy satisf relaxed chill relieved calm peace thank",
	"1f62c|20201001|uncomfortable awkward eek icky",
	"1f644|20201001|rolling eyes omg done with life",
	"1f612|20201001|annoyed grump side eye skeptic tired negative",
	"2639-fe0f|20201001|sad upset",
	"1f62e-200d-1f4a8|20210218|sad tired depress sigh exhale air cloud",
	"1f61e|20201001|sad depress upset disappoint",
	"1f614|20201001|sad depress upset remorse",
	"1f925|20201001|lie liar nose pinocchio disbelief",
	"1f971|20201001|yawn tired bored sleepy uninterested",
	"1f62a|20201001|sleepy tired bored uninterested",
	"1f634|20201001|sleepy tired bored uninterested z",
	"1f924|20201001|happy smile drooling hunger hungry drool",
	"1f637|20201001|sick mask covid corona virus hospital face cover",
	"1f912|20201001|sick fever thermometer heat warm hot sad",
	"1f915|20201001|sick hurt bandage injury sad",
	"1f922|20201001|sick green shrek vomit puke nausea",
	"1f92e|20201001|sick green vomit puke icky",
	"1f927|20201001|sick nose tissue sad xd",
	"1f975|20201001|warm hot heat horny sweat tongue red",
	"1f976|20201001|cold freeze frozen chill snow snowflake ice teeth blue",
	"1f635|20201001|dead cross x eyes shook shock",
	"1f974|20201001|happy smile drunk intoxicted woozy blush horny",
	"1fae0|20211115|melt happy smile heat warm hot dying acceptance",
	"1f92f|20201001|shook shock mindblow explosion eyes permanent brain damage",
	"1f920|20201001|happy cowboy hat",
	"1f973|20201001|party hat happy celebrate",
	"1f978|20201001|disguised detective glasses nose moustache mustache",
	"1f9d0|20201001|monocle frown curious detective",
	"1f60e|20201001|cool glasses sun hot",
	"1f615|20201001|sad unsure hesitate frown disappoint",
	"1fae4|20211115|sad unsure hesitate frown disappoint",
	"1f61f|20201001|sad worry frown concern disappoint",
	"1f641|20201001|sad upset",
	"1f62e|20201001|shook shock",
	"1f62f|20201001|shook shock astonish surprise",
	"1f632|20201001|shook shock astonish surprise",
	"1f627|20201001|shook shock astonish surprise worry",
	"1f626|20201001|shook shock astonish surprise worry",
	"1f628|20201001|fear cold worry shook shock concern",
	"1f630|20201001|fear cold worry shook shock concern sweat",
	"1f631|20201001|fear cold worry petrify shook shocked surprise haunt scared",
	"1f633|20201001|blush flush embarrass surprise",
	"1fae1|20211115|army salute hand",
	"1fae5|20211115|transparent faded fading dotted dashed see through",
	"1f979|20211115|happy tear cry puppy eyes",
	"1f97a|20201001|sad beg plead puppy eyes",
	"1f913|20201001|nerd glasses smile smart intelligent harry potter",
	"1f622|20201001|sad tear cry",
	"1f62d|20201001|sad tear cry flood loud",
	"1f625|20201001|sad sweat",
	"1f613|20201001|sad sweat",
	"1f62b|20201001|loud scream shout moan",
	"1f629|20201001|loud scream shout moan",
	"1f623|20201001|sad uncomfortable icky",
	"1f616|20201001|anger angry grr x eyes",
	"1f620|20201001|anger angry grr",
	"1f621|20201001|anger angry grr red",
	"1f92c|20201001|swear anger censor vulgar curse red",
	"1f624|20201001|anger exhale cloud smoke bull",
	"1f44d|20220823|hand thumb ok finger yes like",
	"1f937|20220815|shrug person hands",
	"1f608|20201001|happy devil horn purple mischievous",
	"1f47f|20201001|angry devil horn purple annoyed",
	"1f4a9|20201001|shit poop excrements brown smile",
	"1f480|20201001|spook dead skull skeleton forgor funny halloween",
	"1f47d|20201001|spook alien supernatural ufo halloween",
	"1f47e|20230803|alien space invader ufo halloween",
	"1f6f8|20231113|alien space ship flying saucer ufo halloween",
	"1f47b|20201001|spook ghost laugh boo tongue",
	"1f916|20201001|spook robot machine teeth android",
	"1f921|20201001|spook clown funny laugh blush fool halloween",
	"1f383|20201001|spook pumpkin jack lantern carve halloween",
	"1f339|20201001|plant flower rose red",
	"1f33c|20201001|plant flower yellow",
	"1f337|20201001|plant flower tulip pink",
	"1f338|20210218|plant flower cherry blossom pink",
	"1f490|20201001|plant flower bouquet",
	"1f4ae|20231113|flower white cherry",
	"1f335|20201001|plant cactus spiky boi desert",
	"1f332|20201001|plant tree christmas xmas spruce forest",
	"1fab5|20211115|plant tree wood log chop stump forest",
	"1f344|20220406|mushroom shroom fungus amanita forest",
	"1faa8|20220406|rock stone boulder pebble",
	"1f34d|20201001|food fruit plant pineapple",
	"1f951|20201001|food fruit plant vegetable avocado",
	"1f336-fe0f|20201001|food fruit plant vegetable pepper chilli red hot spicy jalapeno",
	"1f34c|20211115|food fruit plant banana",
	"1f353|20210831|food fruit plant strawberry",
	"1f34b|20210521|food fruit plant citrus lemon sour",
	"1f34a|20211115|food fruit plant citrus orange",
	"1f349|20220406|food fruit watermelon melon",
	"1f352|20220406|food fruit cherry",
	"1f382|20201001|food sweet cake candle",
	"1f9c1|20201001|food sweet cup cake sprinkle",
	"1f36c|20220815|food sweet candy halloween",
	"1f9c0|20201001|food cheese",
	"1f32d|20201001|food hot dog",
	"1f35e|20210831|food bread bake yum chleb pyszny",
	"2615|20201001|food drink coffee hot",
	"1f37d-fe0f|20201001|food plate dish fork knife cutlery kitchen",
	"1f96b|20240530|food tomato soup can",
	"1f9c3|20231113|food juice drink beverage carton box",
	"1f9ca|20231113|food ice cold cube",
	"1f365|20240206|food fish cake swirl",
	"1f960|20240530|food fortune cookie chinese",
	"1f9a0|20201001|covid corona virus microbe organism germ bacteria sick",
	"26c4|20201001|snow snowman cold ice hat christmas",
	"1f38a|20201001|confetti ball popper party celebrate pinata",
	"1f388|20201001|balloon red fly",
	"1f48e|20201001|diamond shiny jewel gem hard rock crystal minecraft",
	"1f48b|20201001|kiss love lips mark",
	"1fae6|20220203|lips biting nervous flirting love",
	"1f494|20201001|heart broken love crack",
	"1f48c|20201001|heart letter paper mail post message love",
	"1f498|20201001|heart struck arrow love pink",
	"1f49f|20201001|heart box purple love",
	"1f495|20201001|heart double love pink",
	"1f49e|20201001|heart double spin love pink",
	"1f493|20201001|heart vibration station throb beat love pink",
	"1f497|20201001|heart growing love pink",
	"2764-fe0f-200d-1fa79|20210218|injury bandage heart broken fix red love",
	"2763-fe0f|20201001|heart dot love red",
	"2665-fe0f|20201001|heart love red",
	"2764-fe0f|20201001|heart rainbow colour color love red",
	"1f9e1|20201001|heart rainbow colour color love orange",
	"1f49b|20201001|heart rainbow colour color love yellow",
	"1f49a|20201001|heart rainbow colour color love green",
	"1f499|20201001|heart rainbow colour color love blue",
	"1f49c|20201001|heart rainbow colour color love purple",
	"1f90e|20201001|heart rainbow colour color love brown",
	"1f90d|20201001|heart rainbow colour color love white",
	"1f5a4|20201001|heart rainbow colour color love black",
	"1f496|20201001|heart love sparkle",
	"1f49d|20201001|heart love ribbon bow tie",
	"1f381|20211115|gift present ribbon bow tie box",
	"1f397-fe0f|20201001|yellow ribbon",
	"1f4da|20231113|book school lean study",
	"1f3c6|20211115|trophy cup gold celebrate gold win award",
	"26bd|20220406|sport football ball soccer",
	"1f3c0|20230126|sport basketball ball orange",
	"1f3b3|20240206|sport bowl pin ball",
	"1f3c8|20231113|sport american foot ball rugby",
	"1f945|20231113|sport goal net foot ball",
	"26f3|20240530|sport golf flag hole goal",
	"1f3bf|20231113|sport ski snow",
	"1f3af|20240530|sport dart bull goal",
	"1fa82|20231113|sport parachute glide fly",
	"1f3b0|20231113|slot machine gambl game",
	"1f0cf|20240530|card game joker gambl",
	"1f9e9|20240206|game puzzle jigsaw",
	"1f947|20220203|first place medal win award gold one 1st",
	"1f948|20220203|second place medal win award silver one 2nd",
	"1f949|20220203|third place medal win award bronze one 3rd",
	"1f3c5|20220203|gold medal win award star",
	"1f3fa|20240206|amphora jar ceramic artefact",
	"1f4f0|20201001|news paper",
	"1f4ac|20220203|chat speech text message balloon bubble cartoon",
	"1f3ac|20240206|movie tv clapper board studio",
	"1f3b6|20240530|music notes sound",
	"1f514|20240530|music bell sound notif",
	"1f4af|20201001|100 percent % one hundred",
	"1f440|20201001|eyes look side",
	"1f441-fe0f|20201001|eye look",
	"1f573-fe0f|20201001|hole ground dark void",
	"1fa84|20210521|magic wand star sparkle",
	"1f52e|20201001|magic crystal ball purple",
	"1f525|20201001|fire burn hot heat",
	"1f4a5|20220203|explosion fire bang collision crash impact",
	"1f6a8|20240530|alarm warning",
	"2757|20240530|warning exclamation mark symbol",
	"1f463|20240530|foot print feet",
	"1f6d1|20240206|stop sign octagon traffic",
	"1f6a6|20240530|traffic light infratech",
	"1f4a1|20231113|light bulb idea",
	"1f4c9|20240530|stock graph up positive rise",
	"1f4c8|20240530|stock graph down negative fall",
	"1f4be|20240206|electronic tech save icon floppy disk",
	"1f4e0|20240610|electronic tech tele phone fax",
	"1f3a7|20210521|electronic tech laptop head ear phone",
	"1f4bb|20240206|electronic tech laptop computer pc",
	"1f4df|20231113|electronic tech pager screen",
	"1f69a|20240530|vehicle truck transport car lorry",
	"26fd|20231113|fuel pump gas",
	"1f451|20201001|crown gold royal",
	"1f455|20240530|cloth material t shirt",
	"1f460|20240530|cloth shoe high heel",
	"1f9b4|20220203|bone skeleton osteo anatomy body",
	"1f9b7|20220203|tooth dentist mouth anatomy body",
	"1f9e0|20220203|brain thought mind think head organ anatomy body",
	"1fac1|20220203|lungs breathing air organ anatomy body",
	"1fac0|20220203|heart blood pump anatomy body pulse",
	"1f431|20201001|animal cat kitten pussy meowtle",
	"1f981|20201001|animal big cat lion rawr",
	"1f42f|20220110|animal big cat tiger",
	"1f435|20201001|animal monkey",
	"1f648|20201001|animal monkey eye cover",
	"1f437|20201001|animal pig",
	"1f984|20210831|animal horse unicorn",
	"1f98c|20201001|animal deer christmas xmas rudolf",
	"1f410|20210831|animal goat horn mountain",
	"1f999|20201001|animal llama alpaca",
	"1f426|20210831|animal bird blue twitter fly",
	"1f414|20230126|animal bird chicken hen rooster",
	"1f989|20210831|animal bird owl fly wise night",
	"1f427|20211115|animal bird penguin pingu ice cold",
	"1f9a9|20240530|animal bird flamingo pink",
	"1f987|20201001|animal bat batman fly vampire night halloween",
	"1f41d|20201001|animal honey insect arachnid bee pollen bzz black yellow queen fly stinger bitch",
	"1f577-fe0f|20201001|spider insect arachnid spooky halloween",
	"1f422|20201001|animal turtle god best meowtle",
	"1f419|20201001|animal octopus squid",
	"1f43c|20201001|animal panda bear asian kungfu",
	"1f43b|20210831|animal brown bear",
	"1f428|20201001|animal koala bear dumb",
	"1f9a5|20201001|animal sloth slow",
	"1f430|20201001|animal rabbit hare ear rodent",
	"1f42d|20201001|animal mouse rat ear rodent cheese",
	"1faa4|20231113|animal mouse trap catch box cheese",
	"1f994|20201001|animal hedgehog sonic sanic",
	"1f436|20211115|animal dog mikra",
	"1f429|20211115|animal dog poodle",
	"1f43a|20221101|animal dog wolf howl",
	"1f98a|20221101|animal dog fox",
	"1f99d|20211115|animal raccoon",
	"1f40c|20210218|animal snail slow",
	"1f982|20210218|animal scorpion",
	"1f41f|20210831|animal fish swim water sea ocean",
	"1f433|20230418|animal fish swim water sea ocean shark",
	"1f988|20230418|animal fish swim water sea ocean whale",
	"1f3a3|20240206|animal fish pole catch",
	"1f40e|20240530|animal horse pony",
	"1f42e|20230803|animal cow cattle bull",
	"1f438|20230803|animal frog green",
	"1f40d|20240530|animal snake green",
	"1f409|20240610|animal dinosaur dragon green",
	"1f307|20210831|city sun set building",
	"1f304|20240206|sun rise mountains view",
	"1f386|20231113|firework spark explosion",
	"1f30d|20201001|earth planet",
	"1f30b|20240206|volcano lava erupt disaster magma hot",
	"1f31e|20201001|sun star sky day light",
	"1f31f|20201001|star shiny night sky",
	"2b50|20201001|star shiny night sky",
	"1f30c|20240530|space milky way galaxy star",
	"1f31c|20201001|moon night sky right halloween",
	"1f31b|20201001|moon night sky left halloween",
	"1f4ab|20201001|star sparkle spin night sky",
	"1f308|20201001|rain bow gay homosexual sky lgbt pride weather",
	"1f32a-fe0f|20201001|tornado wind sky weather",
	"1f30a|20230418|sea ocean water wave",
	"2601-fe0f|20201001|cloud sky air weather rain fluff",
	"26c5|20240530|cloud sky air weather sun",
	"231a|20240530|clock watch time"
];

const API = "https://www.gstatic.com/android/keyboard/emojikitchen/";
const DB_NAME = "EmojiMix";
const STORE = "mixes";
const MISS_TTL = 60 * 24 * 60 * 60 * 1000;
const MAX_CONCURRENT = 6;
const MAX_RECENTS = 24;
const GENERATED_SIZE = 256;
const EMOJI_FONT = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";

const DEFAULTS = {
    renderInline: true,
    jumbo: true,
    closeOnSelect: true,
    officialOnly: false,
    delivery: "upload",
    uploadSize: 48,
    emojiGuilds: [],
    poolSize: 10,
    pool: [],
    recents: []
};

const toGlyph = hex => hex.split("-").map(h => String.fromCodePoint(parseInt(h, 16))).join("");

const EMOJIS = EMOJI_DATA.map((row, index) => {
    const [hex, date, keywords] = row.split("|");
    return {
        index,
        hex,
        date,
        keywords,
        glyph: toGlyph(hex),
        name: keywords.split(" ").slice(0, 2).join(" ") || hex,
        urlId: hex.split("-").map(c => "u" + c).join("-")
    };
});
const BY_HEX = new Map(EMOJIS.map(e => [e.hex, e]));

/* ------------------------------------------------------------------------- *
 * Selectors
 * ------------------------------------------------------------------------- */

const BUTTONS_SELECTOR = '[class*="channelTextArea"] [class*="buttons_"]';
const TEXTAREA_SELECTOR = '[class*="channelTextArea"]';
const TEXTBOX_SELECTOR = '[role="textbox"]';
const CONTENT_SELECTOR = '[id^="message-content-"]';
const LINK_SELECTOR = `${CONTENT_SELECTOR} a[href*="emojikitchen/"]`;
const LINK_PATTERN = /^https:\/\/www\.gstatic\.com\/android\/keyboard\/emojikitchen\/\d+\/u[0-9a-f-]+\/u[0-9a-f-]+_u[0-9a-f-]+\.png$/;

/* ------------------------------------------------------------------------- *
 * Helpers
 * ------------------------------------------------------------------------- */

function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
        if (value === undefined || value === null || value === false) continue;
        if (key.startsWith("on") && typeof value === "function") el.addEventListener(key.slice(2), value);
        else if (key === "class") el.className = value;
        else el.setAttribute(key, value === true ? "" : value);
    }
    for (const child of children.flat()) {
        if (child === undefined || child === null || child === false) continue;
        el.append(child);
    }
    return el;
}

const ICONS = {
    mix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 6.8A6 6 0 0 1 12 17.2A6 6 0 0 1 12 6.8Z" fill="currentColor" stroke="none"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'
};

function icon(name) {
    const span = document.createElement("span");
    span.className = "emojimix-icon";
    span.innerHTML = ICONS[name];
    return span;
}

function canvasToBlob(canvas) {
    return new Promise(resolve => canvas.toBlob(resolve, "image/png"));
}

async function resizeBlob(blob, size) {
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, size, size);
    bitmap.close?.();
    return canvasToBlob(canvas);
}

/* ------------------------------------------------------------------------- *
 * Mix service: official art (cached on disk via IndexedDB) with a local fallback
 * ------------------------------------------------------------------------- */

class MixService {
    constructor() {
        this.memory = new Map();
        this.objectUrls = new Set();
        this.queue = [];
        this.active = 0;
        this.dbPromise = null;
    }

    db() {
        if (!this.dbPromise) {
            this.dbPromise = new Promise(resolve => {
                try {
                    const request = indexedDB.open(DB_NAME, 1);
                    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = request.onblocked = () => resolve(null);
                } catch {
                    resolve(null);
                }
            });
        }
        return this.dbPromise;
    }

    async dbGet(key) {
        const db = await this.db();
        if (!db) return undefined;
        return new Promise(resolve => {
            try {
                const request = db.transaction(STORE).objectStore(STORE).get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(undefined);
            } catch {
                resolve(undefined);
            }
        });
    }

    async dbPut(key, value) {
        const db = await this.db();
        if (!db) return;
        return new Promise(resolve => {
            try {
                const tx = db.transaction(STORE, "readwrite");
                tx.objectStore(STORE).put(value, key);
                tx.oncomplete = tx.onerror = tx.onabort = () => resolve();
            } catch {
                resolve();
            }
        });
    }

    schedule(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({task, resolve, reject});
            this.pump();
        });
    }

    pump() {
        while (this.active < MAX_CONCURRENT && this.queue.length) {
            const {task, resolve, reject} = this.queue.shift();
            this.active++;
            task().then(resolve, reject).finally(() => {
                this.active--;
                this.pump();
            });
        }
    }

    resolve(a, b) {
        const [x, y] = a.hex <= b.hex ? [a, b] : [b, a];
        const key = `${x.hex}_${y.hex}`;
        let promise = this.memory.get(key);
        if (!promise) {
            promise = this.schedule(() => this.load(x, y, key));
            this.memory.set(key, promise);
            // Unreachable network is not a verdict, so let the next request retry.
            promise.then(result => {
                if (result.offline && this.memory.get(key) === promise) this.memory.delete(key);
            }, () => this.memory.delete(key));
        }
        return promise;
    }

    async load(x, y, key) {
        const stored = await this.dbGet(key);
        if (stored?.blob) return this.official(x, y, stored.blob, stored.url);

        let offline = false;
        const knownMiss = stored?.miss && Date.now() - stored.t < MISS_TTL;
        if (!knownMiss) {
            const found = await this.fetchOfficial(x, y);
            if (found) {
                this.dbPut(key, {blob: found.blob, url: found.url});
                return this.official(x, y, found.blob, found.url);
            }
            if (found === null) this.dbPut(key, {miss: true, t: Date.now()});
            else offline = true;
        }
        return this.generate(x, y, offline);
    }

    officialUrls(x, y) {
        const urls = [];
        const add = (date, p, q) => {
            const url = `${API}${date}/${p.urlId}/${p.urlId}_${q.urlId}.png`;
            if (!urls.includes(url)) urls.push(url);
        };
        add(x.date, x, y);
        add(y.date, y, x);
        add(y.date, x, y);
        add(x.date, y, x);
        return urls;
    }

    async request(url) {
        try {
            return await fetch(url);
        } catch (error) {
            const netFetch = BdApi.Net?.fetch;
            if (!netFetch) throw error;
            return await netFetch(url);
        }
    }

    // Resolves to {blob, url} when found, null when the combination does not exist, undefined when unreachable.
    async fetchOfficial(x, y) {
        try {
            for (const url of this.officialUrls(x, y)) {
                const response = await this.request(url);
                if (response.ok) {
                    const blob = await response.blob();
                    if (blob.type.startsWith("image/")) return {blob, url};
                    continue;
                }
                if (response.status === 404 || response.status === 403) continue;
                return undefined;
            }
            return null;
        } catch {
            return undefined;
        }
    }

    createUrl(blob) {
        const url = URL.createObjectURL(blob);
        this.objectUrls.add(url);
        return url;
    }

    official(a, b, blob, remoteUrl) {
        return {a, b, blob, remoteUrl, url: this.createUrl(blob), source: "google", generated: false, offline: false};
    }

    async generate(a, b, offline) {
        const size = GENERATED_SIZE;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = size * 0.04;
        ctx.shadowOffsetY = size * 0.012;

        const draw = (glyph, cx, cy, span, angle) => {
            ctx.font = `100px ${EMOJI_FONT}`;
            const width = ctx.measureText(glyph).width || 100;
            const fontSize = 100 * span / width;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.font = `${fontSize}px ${EMOJI_FONT}`;
            ctx.fillText(glyph, 0, fontSize * 0.06);
            ctx.restore();
        };
        draw(a.glyph, size * 0.4, size * 0.4, size * 0.62, -0.12);
        draw(b.glyph, size * 0.62, size * 0.62, size * 0.52, 0.1);

        const blob = await canvasToBlob(canvas);
        return {a, b, blob, remoteUrl: null, url: this.createUrl(blob), source: "local", generated: true, offline};
    }

    destroy() {
        this.queue.length = 0;
        this.memory.clear();
        this.objectUrls.forEach(url => URL.revokeObjectURL(url));
        this.objectUrls.clear();
        this.dbPromise?.then(db => db?.close());
        this.dbPromise = null;
    }
}

/* ------------------------------------------------------------------------- *
 * Picker UI
 * ------------------------------------------------------------------------- */

class Picker {
    constructor(plugin) {
        this.plugin = plugin;
        this.el = null;
        this.button = null;
        this.box = null;
        this.first = null;
        this.query = "";
        this.token = 0;
        this.io = null;

        this.onDocumentDown = e => {
            if (this.el.contains(e.target) || this.button?.contains(e.target)) return;
            this.close();
        };
        this.onDocumentKey = e => {
            if (e.key !== "Escape") return;
            e.preventDefault();
            e.stopPropagation();
            this.close();
            this.box?.focus();
        };
        this.onResize = () => this.position();
    }

    get service() { return this.plugin.service; }
    get settings() { return this.plugin.settings; }
    isOpen() { return !!this.el; }

    toggle(button, box) {
        if (this.isOpen()) this.close();
        else this.open(button, box);
    }

    open(button, box) {
        this.button = button;
        this.box = box;
        this.first = null;
        this.query = "";
        button.setAttribute("aria-expanded", "true");

        this.search = h("input", {
            class: "emojimix-search",
            type: "text",
            placeholder: "Search emojis to mix",
            "aria-label": "Search emojis",
            autocomplete: "off",
            spellcheck: "false",
            oninput: () => {
                this.query = this.search.value;
                this.render();
            },
            onkeydown: e => this.onSearchKey(e)
        });
        this.subbar = h("div", {class: "emojimix-subbar", hidden: true});
        this.content = h("div", {class: "emojimix-content"});
        this.scroller = h("div", {class: "emojimix-scroller"}, this.content);
        this.footerPreview = h("div", {class: "emojimix-footer-preview"});
        this.footerTitle = h("div", {class: "emojimix-footer-title"});
        this.footerSub = h("div", {class: "emojimix-footer-sub"});
        this.footer = h("div", {class: "emojimix-footer"},
            this.footerPreview,
            h("div", {class: "emojimix-footer-text"}, this.footerTitle, this.footerSub));

        this.el = h("div", {
            class: "emojimix-picker",
            role: "dialog",
            "aria-label": "Emoji Mix",
            onkeydown: e => this.onPickerKey(e)
        },
        h("div", {class: "emojimix-header"}, h("div", {class: "emojimix-search-wrap"}, this.search, icon("search"))),
        this.subbar,
        this.scroller,
        this.footer);

        document.body.append(this.el);
        this.position();
        this.render();
        this.search.focus();

        document.addEventListener("mousedown", this.onDocumentDown, true);
        document.addEventListener("keydown", this.onDocumentKey, true);
        window.addEventListener("resize", this.onResize);
    }

    close() {
        if (!this.el) return;
        this.token++;
        this.io?.disconnect();
        this.io = null;
        this.el.remove();
        this.el = null;
        this.button?.setAttribute("aria-expanded", "false");
        document.removeEventListener("mousedown", this.onDocumentDown, true);
        document.removeEventListener("keydown", this.onDocumentKey, true);
        window.removeEventListener("resize", this.onResize);
    }

    position() {
        if (!this.el || !this.button?.isConnected) return;
        const rect = this.button.getBoundingClientRect();
        const right = Math.max(8, window.innerWidth - rect.right);
        this.el.style.right = `${right}px`;
        this.el.style.bottom = `${Math.max(8, window.innerHeight - rect.top + 8)}px`;
    }

    /* ----- rendering ----- */

    render() {
        this.token++;
        this.io?.disconnect();
        const token = this.token;
        this.io = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                this.io.unobserve(entry.target);
                const tile = entry.target;
                this.service.resolve(tile._a, tile._b).then(res => {
                    if (token === this.token) this.applyResult(tile, res);
                });
            }
        }, {root: this.scroller, rootMargin: "400px 0px"});

        this.content.replaceChildren();
        this.search.placeholder = this.first === null ? "Search emojis to mix" : "Search for the second emoji";
        this.renderSubbar();
        if (this.first === null) this.renderFirstStep();
        else this.renderSecondStep();
        this.scroller.scrollTop = 0;
        this.setFooter(null);
    }

    matches(emoji) {
        const q = this.query.trim().toLowerCase();
        return !q || emoji.keywords.includes(q) || emoji.glyph === q;
    }

    section(title, action) {
        return h("div", {class: "emojimix-section-title"}, h("span", {}, title), action);
    }

    renderFirstStep() {
        const searching = this.query.trim() !== "";
        const recents = searching ? [] : this.settings.recents
            .map(([a, b]) => [BY_HEX.get(a), BY_HEX.get(b)])
            .filter(([a, b]) => a && b);

        if (recents.length) {
            const clear = h("button", {
                class: "emojimix-link-button",
                type: "button",
                onclick: () => {
                    this.plugin.settings.recents = [];
                    this.plugin.saveSettings();
                    this.render();
                }
            }, "Clear");
            const grid = h("div", {class: "emojimix-grid"});
            for (const [a, b] of recents) grid.append(this.mixTile(a, b, false));
            this.content.append(this.section("Recent mixes", clear), grid);
        }

        const grid = h("div", {class: "emojimix-grid emojimix-main"});
        for (const emoji of EMOJIS) {
            if (!this.matches(emoji)) continue;
            grid.append(h("button", {
                class: "emojimix-tile",
                type: "button",
                tabindex: "-1",
                "aria-label": emoji.name,
                onclick: () => this.pickFirst(emoji),
                onmouseenter: () => this.setFooter({emoji}),
                onfocus: () => this.setFooter({emoji})
            }, h("span", {class: "emojimix-glyph"}, emoji.glyph)));
        }
        this.content.append(this.section(searching ? "Results" : "Pick an emoji to start mixing"), grid);
        if (!grid.children.length) this.content.append(h("div", {class: "emojimix-empty"}, "No emojis found"));
    }

    renderSecondStep() {
        const first = EMOJIS[this.first];
        const toggle = h("button", {
            class: "emojimix-toggle",
            type: "button",
            "aria-pressed": String(this.settings.officialOnly),
            title: "Hide combinations that Google doesn't have official art for",
            onclick: () => {
                this.settings.officialOnly = !this.settings.officialOnly;
                this.plugin.saveSettings();
                toggle.setAttribute("aria-pressed", String(this.settings.officialOnly));
                this.content.querySelectorAll(".emojimix-tile").forEach(tile => this.applyFilter(tile));
            }
        }, "Official only");

        this.subbar.hidden = false;
        this.subbar.replaceChildren(
            h("button", {
                class: "emojimix-back",
                type: "button",
                "aria-label": "Back",
                title: "Back",
                onclick: () => this.goBack()
            }, icon("back")),
            h("span", {class: "emojimix-chip"}, h("span", {class: "emojimix-glyph"}, first.glyph)),
            h("span", {class: "emojimix-plus"}, "+"),
            h("span", {class: "emojimix-subbar-hint"}, "pick another"),
            toggle);

        const grid = h("div", {class: "emojimix-grid emojimix-main"});
        for (const emoji of EMOJIS) {
            if (this.matches(emoji)) grid.append(this.mixTile(first, emoji, true));
        }
        this.content.append(this.section(`Mix with ${first.name}`), grid);
        if (!grid.children.length) this.content.append(h("div", {class: "emojimix-empty"}, "No emojis found"));
    }

    renderSubbar() {
        if (this.first === null) {
            this.subbar.hidden = true;
            this.subbar.replaceChildren();
        }
    }

    mixTile(a, b, filterable) {
        const tile = h("button", {
            class: "emojimix-tile is-pending",
            type: "button",
            tabindex: "-1",
            "aria-label": `${a.name} + ${b.name}`,
            onclick: e => this.pickMix(tile, e.shiftKey),
            onmouseenter: () => this.setFooter({tile}),
            onfocus: () => this.setFooter({tile})
        });
        tile._a = a;
        tile._b = b;
        tile._filterable = filterable;
        this.io.observe(tile);
        return tile;
    }

    applyResult(tile, res) {
        tile._res = res;
        tile.classList.remove("is-pending");
        tile.classList.toggle("is-generated", res.generated);
        tile.replaceChildren(h("img", {class: "emojimix-img", src: res.url, alt: "", draggable: "false"}));
        this.applyFilter(tile);
        if (tile.matches(":hover")) this.setFooter({tile});
    }

    applyFilter(tile) {
        tile.hidden = !!(tile._filterable && tile._res && tile._res.generated && this.settings.officialOnly);
    }

    setFooter(info) {
        this.footerPreview.replaceChildren();
        if (!info) {
            this.footerPreview.append(icon("mix"));
            this.footerTitle.textContent = this.first === null ? "Pick two emojis to mix" : "Now pick the second emoji";
            this.footerSub.textContent = "Hold Shift while choosing to keep this open";
            return;
        }
        if (info.emoji) {
            this.footerPreview.append(h("span", {class: "emojimix-glyph emojimix-glyph-large"}, info.emoji.glyph));
            this.footerTitle.textContent = info.emoji.name;
            this.footerSub.textContent = "Click to mix with another emoji";
            return;
        }
        const {tile} = info;
        const res = tile._res;
        if (res) this.footerPreview.append(h("img", {class: "emojimix-img", src: res.url, alt: "", draggable: "false"}));
        this.footerTitle.textContent = `${tile._a.name} + ${tile._b.name}`;
        this.footerSub.textContent = !res ? "Loading…"
            : res.generated ? (res.offline ? "Google art unreachable – generated locally" : "No official art – generated locally")
                : "Emoji Kitchen";
    }

    /* ----- interaction ----- */

    pickFirst(emoji) {
        this.first = emoji.index;
        this.query = "";
        this.search.value = "";
        this.render();
        this.search.focus();
    }

    goBack() {
        this.first = null;
        this.query = "";
        this.search.value = "";
        this.render();
        this.search.focus();
    }

    async pickMix(tile, keepOpen) {
        const res = tile._res || await this.service.resolve(tile._a, tile._b);
        this.plugin.addRecent(res);
        if (!keepOpen && this.settings.closeOnSelect) this.close();
        this.plugin.deliver(res, this.box);
    }

    visibleTiles() {
        return [...this.content.querySelectorAll(".emojimix-tile:not([hidden])")];
    }

    onSearchKey(e) {
        if (e.key === "Backspace" && this.first !== null && !this.search.value) {
            e.preventDefault();
            this.goBack();
        } else if (e.key === "Enter") {
            e.preventDefault();
            this.content.querySelector(".emojimix-main .emojimix-tile:not([hidden])")?.click();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            this.visibleTiles()[0]?.focus();
        }
    }

    onPickerKey(e) {
        if (!e.target.classList?.contains("emojimix-tile")) return;
        const moves = {ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1};
        if (!(e.key in moves)) return;
        e.preventDefault();
        const tiles = this.visibleTiles();
        const columns = getComputedStyle(e.target.parentElement).gridTemplateColumns.split(" ").length || 1;
        const step = e.key === "ArrowUp" || e.key === "ArrowDown" ? columns : 1;
        const next = tiles.indexOf(e.target) + moves[e.key] * step;
        if (next < 0) this.search.focus();
        else tiles[Math.min(next, tiles.length - 1)]?.focus();
        document.activeElement?.scrollIntoView?.({block: "nearest"});
    }
}

/* ------------------------------------------------------------------------- *
 * Styles
 * ------------------------------------------------------------------------- */

const CSS = `
.emojimix-wrap { display: flex; align-items: center; flex: 0 0 auto; }
.emojimix-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin: 0 2px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--interactive-normal, #b5bac1); cursor: pointer; }
.emojimix-btn:hover { color: var(--interactive-hover, #dbdee1); }
.emojimix-btn:active, .emojimix-btn[aria-expanded="true"] { color: var(--interactive-active, #fff); }
.emojimix-btn:focus-visible { outline: 2px solid var(--focus-primary, #00a8fc); }
.emojimix-btn .emojimix-icon svg { width: 24px; height: 24px; }
.emojimix-icon { display: inline-flex; }
.emojimix-icon svg { width: 20px; height: 20px; }

.emojimix-picker { position: fixed; z-index: 1002; display: flex; flex-direction: column; box-sizing: border-box; width: 424px; max-width: calc(100vw - 16px); height: 450px; max-height: calc(100vh - 100px); overflow: hidden; border: 1px solid var(--border-subtle, var(--background-modifier-accent, rgba(255, 255, 255, 0.08))); border-radius: 8px; background: var(--background-surface-high, var(--background-floating, var(--background-secondary, #2b2d31))); box-shadow: var(--elevation-high, 0 8px 16px rgba(0, 0, 0, 0.24)); color: var(--text-default, var(--text-normal, #dbdee1)); font-family: var(--font-primary, "gg sans", "Noto Sans", sans-serif); font-size: 14px; animation: emojimix-pop 0.12s ease-out; transform-origin: bottom right; }
.emojimix-picker [hidden] { display: none !important; }
.emojimix-picker button { font-family: inherit; }
@keyframes emojimix-pop { from { opacity: 0; transform: scale(0.96); } }
@keyframes emojimix-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .emojimix-picker, .emojimix-tile.is-pending::before { animation: none; } }

.emojimix-header { flex: none; padding: 12px; }
.emojimix-search-wrap { position: relative; display: flex; align-items: center; }
.emojimix-search { box-sizing: border-box; width: 100%; height: 32px; padding: 0 32px 0 8px; border: 0; border-radius: 4px; outline: none; background: var(--input-background, var(--background-base-lowest, var(--background-tertiary, #1e1f22))); color: inherit; font-size: 14px; }
.emojimix-search::placeholder { color: var(--text-muted, #949ba4); }
.emojimix-search-wrap > .emojimix-icon { position: absolute; right: 8px; color: var(--text-muted, #949ba4); pointer-events: none; }

.emojimix-subbar { flex: none; display: flex; align-items: center; gap: 8px; padding: 0 12px 8px; }
.emojimix-back { display: inline-flex; padding: 4px; border: 0; border-radius: 4px; background: transparent; color: var(--interactive-normal, #b5bac1); cursor: pointer; }
.emojimix-back:hover { color: var(--interactive-hover, #dbdee1); background: var(--background-modifier-hover, rgba(78, 80, 88, 0.3)); }
.emojimix-chip { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 6px; background: var(--background-modifier-selected, rgba(78, 80, 88, 0.6)); }
.emojimix-plus { color: var(--text-muted, #949ba4); font-weight: 700; }
.emojimix-subbar-hint { flex: 1; color: var(--text-muted, #949ba4); }
.emojimix-toggle { padding: 2px 10px; border: 1px solid var(--border-subtle, var(--background-modifier-accent, rgba(255, 255, 255, 0.16))); border-radius: 12px; background: transparent; color: var(--text-muted, #949ba4); font-size: 12px; cursor: pointer; }
.emojimix-toggle:hover { color: var(--text-default, var(--text-normal, #dbdee1)); }
.emojimix-toggle[aria-pressed="true"] { border-color: var(--brand-500, var(--brand-experiment, #5865f2)); background: var(--brand-500, var(--brand-experiment, #5865f2)); color: #fff; }

.emojimix-scroller { flex: 1; min-height: 0; overflow-y: auto; padding: 0 4px 8px 12px; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thin-thumb, #1a1b1e) transparent; }
.emojimix-section-title { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; padding: 8px 4px 6px 0; background: var(--background-surface-high, var(--background-floating, var(--background-secondary, #2b2d31))); color: var(--header-secondary, #b5bac1); font-size: 12px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; }
.emojimix-link-button { padding: 0; border: 0; background: transparent; color: var(--text-link, #00a8fc); font-size: 12px; text-transform: none; cursor: pointer; }
.emojimix-link-button:hover { text-decoration: underline; }
.emojimix-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); }
.emojimix-empty { padding: 32px 0; color: var(--text-muted, #949ba4); text-align: center; }

.emojimix-tile { position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 4px; background: transparent; cursor: pointer; justify-self: center; }
.emojimix-tile:hover, .emojimix-tile:focus-visible { outline: none; background: var(--background-modifier-selected, rgba(78, 80, 88, 0.6)); }
.emojimix-tile.is-pending { cursor: default; }
.emojimix-tile.is-pending::before { content: ""; width: 22px; height: 22px; border-radius: 50%; background: var(--background-modifier-hover, rgba(78, 80, 88, 0.3)); animation: emojimix-pulse 1.2s ease-in-out infinite; }
.emojimix-tile.is-generated::after { content: ""; position: absolute; right: 4px; bottom: 4px; width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted, #949ba4); opacity: 0.8; }
.emojimix-img { width: 32px; height: 32px; object-fit: contain; }
.emojimix-glyph { font-family: ${EMOJI_FONT}; font-size: 26px; line-height: 1; }
.emojimix-glyph-large { font-size: 34px; }

.emojimix-footer { flex: none; display: flex; align-items: center; gap: 12px; box-sizing: border-box; height: 56px; padding: 0 16px; border-top: 1px solid var(--border-subtle, var(--background-modifier-accent, rgba(255, 255, 255, 0.08))); background: var(--background-base-lower, var(--background-secondary-alt, #232428)); }
.emojimix-footer-preview { display: flex; align-items: center; justify-content: center; flex: none; width: 40px; height: 40px; color: var(--text-muted, #949ba4); }
.emojimix-footer-preview .emojimix-img { width: 40px; height: 40px; }
.emojimix-footer-preview .emojimix-icon svg { width: 28px; height: 28px; }
.emojimix-footer-text { min-width: 0; }
.emojimix-footer-title { overflow: hidden; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.emojimix-footer-sub { overflow: hidden; color: var(--text-muted, #949ba4); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }

body:not(.emojimix-no-inline) a.emojimix-link { display: inline-block; width: 1.375em; height: 1.375em; margin: 0 0.05em; overflow: hidden; vertical-align: bottom; background: var(--emojimix-src) center / contain no-repeat; text-indent: -9999px; white-space: nowrap; text-decoration: none !important; }
body:not(.emojimix-no-inline):not(.emojimix-no-jumbo) a.emojimix-link.emojimix-jumbo { width: 3rem; height: 3rem; }
body:not(.emojimix-no-inline) li:has(a.emojimix-link) [id^="message-accessories-"] > *:has(img[src*="emojikitchen"]) { display: none; }
body:not(.emojimix-no-inline) { --emojimix-embed: 48px; }
body:not(.emojimix-no-inline).emojimix-no-jumbo { --emojimix-embed: 1.375em; }
body:not(.emojimix-no-inline) [id^="message-accessories-"] :is(*:has(img[src*="emojikitchen"]), *:has(img[src*="/emojimix_"])) { width: var(--emojimix-embed) !important; height: var(--emojimix-embed) !important; min-width: 0 !important; min-height: 0 !important; max-width: var(--emojimix-embed) !important; max-height: var(--emojimix-embed) !important; }
body:not(.emojimix-no-inline) [id^="message-accessories-"] :is(img[src*="emojikitchen"], img[src*="/emojimix_"]) { width: 100% !important; height: 100% !important; max-width: 100% !important; max-height: 100% !important; object-fit: contain; }
`;

/* ------------------------------------------------------------------------- *
 * Plugin
 * ------------------------------------------------------------------------- */

module.exports = class EmojiMix {
    constructor(meta) {
        this.meta = meta;
    }

    start() {
        this.settings = {...DEFAULTS, ...(BdApi.Data.load(this.meta.name, "settings") || {})};
        this.service = new MixService();
        this.picker = new Picker(this);
        this.pending = new Set();
        this.frame = 0;

        BdApi.DOM.addStyle(this.meta.name, CSS);
        this.applyBodyClasses();

        this.observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) this.pending.add(node);
                }
            }
            if (!this.frame) this.frame = requestAnimationFrame(() => this.flush());
        });
        this.observer.observe(document.body, {childList: true, subtree: true});

        this.ensureButtons();
        this.scan(document.body);
    }

    stop() {
        this.observer?.disconnect();
        cancelAnimationFrame(this.frame);
        this.picker?.close();
        this.service?.destroy();
        BdApi.DOM.removeStyle(this.meta.name);
        document.body.classList.remove("emojimix-no-inline", "emojimix-no-jumbo");
        document.querySelectorAll(".emojimix-wrap").forEach(el => el.remove());
        document.querySelectorAll("a.emojimix-link").forEach(link => {
            link.classList.remove("emojimix-link", "emojimix-jumbo");
            link.style.removeProperty("--emojimix-src");
        });
        this.pending = null;
    }

    getSettingsPanel() {
        return BdApi.UI.buildSettingsPanel({
            settings: [
                {type: "switch", id: "renderInline", name: "Show mixes as emojis in chat", note: "Renders Emoji Kitchen links at the size of a normal emoji and hides their image preview. Only you see this; others still get the link.", value: this.settings.renderInline},
                {type: "switch", id: "jumbo", name: "Enlarge mix-only messages", note: "Like vanilla emojis, a message made only of mixes is shown larger.", value: this.settings.jumbo},
                {type: "switch", id: "closeOnSelect", name: "Close the picker after choosing", note: "Hold Shift while choosing to keep it open for one pick.", value: this.settings.closeOnSelect},
                {
                    type: "dropdown",
                    id: "delivery",
                    name: "How to send a mix",
                    note: "Uploads look like an emoji for everyone. Server emojis are real inline emojis, but you need Nitro to send them in DMs and other servers. Links only look like one for people running this plugin. Mixes generated locally are always uploaded.",
                    value: this.settings.delivery,
                    options: [
                        {label: "Image upload (emoji-sized for everyone)", value: "upload"},
                        {label: "Server emoji (real inline emoji, rotates slots)", value: "emoji"},
                        {label: "Link (small only for EmojiMix users)", value: "link"}
                    ]
                },
                {
                    type: "category",
                    id: "emojiServers",
                    name: "Emoji slot servers",
                    shown: false,
                    collapsible: true,
                    settings: [
                        ...this.manageableGuilds().map(g => ({type: "switch", id: `guild:${g.id}`, name: g.name, value: this.settings.emojiGuilds.includes(g.id)})),
                        {
                            type: "slider",
                            id: "poolSize",
                            name: "Slots to rotate per server",
                            note: "Once a server holds this many mixes, the oldest one is deleted for each new mix. Messages that used a deleted mix lose their emoji. Keep this below the server's free emoji slots.",
                            value: this.settings.poolSize,
                            min: 1,
                            max: 50,
                            markers: [1, 5, 10, 20, 30, 50],
                            stickToMarkers: false
                        }
                    ]
                },
                {
                    type: "dropdown",
                    id: "uploadSize",
                    name: "Uploaded image size",
                    note: "Discord shows uploads at their real pixel size. 48 matches a large vanilla emoji.",
                    value: this.settings.uploadSize,
                    options: [
                        {label: "32 px (inline emoji)", value: 32},
                        {label: "48 px (large emoji)", value: 48},
                        {label: "64 px", value: 64},
                        {label: "96 px", value: 96}
                    ]
                }
            ],
            onChange: (...args) => {
                const value = args[args.length - 1];
                const id = args[args.length - 2];
                if (id.startsWith("guild:")) {
                    const guild = id.slice(6);
                    const rest = this.settings.emojiGuilds.filter(g => g !== guild);
                    this.settings.emojiGuilds = value ? [...rest, guild] : rest;
                } else this.settings[id] = value;
                this.saveSettings();
                this.applyBodyClasses();
            }
        });
    }

    manageableGuilds() {
        const {GuildStore, PermissionStore} = BdApi.Webpack.Stores;
        const guilds = Object.values(GuildStore?.getGuilds() ?? {});
        // MANAGE_GUILD_EXPRESSIONS
        const canManage = g => PermissionStore?.can(1n << 30n, g) ?? true;
        return guilds.filter(canManage).sort((a, b) => a.name.localeCompare(b.name));
    }

    /* ----- server emoji pool ----- */

    get restModules() {
        const methods = ["get", "post", "put", "patch", "del"];
        const found = BdApi.Webpack.getModule(m => methods.every(k => typeof m?.[k] === "function"), {first: false, searchExports: true}) ?? [];
        return found.sort((a, b) => (typeof b.getAPIBaseURL === "function") - (typeof a.getAPIBaseURL === "function"));
    }

    toDataUrl(blob) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    dropEmoji(entry) {
        this.settings.pool = this.settings.pool.filter(e => e !== entry);
        return this._api?.rest.del({url: `${this._api.prefix}/guilds/${entry.guild}/emojis/${entry.id}`}).catch(() => {});
    }

    async serverEmoji(res) {
        const {SelectedGuildStore, EmojiStore} = BdApi.Webpack.Stores;
        const guilds = this.settings.emojiGuilds.filter(id => BdApi.Webpack.Stores.GuildStore.getGuild(id));
        if (!guilds.length) throw new Error("no emoji servers selected");
        if (!this.restModules.length) throw new Error("Discord's HTTP module wasn't found");

        // Without Nitro an emoji only works in its own server, so prefer the one you're typing in.
        const current = SelectedGuildStore?.getGuildId();
        const key = `${res.a.hex}_${res.b.hex}`;
        const count = id => this.settings.pool.filter(e => e.guild === id).length;
        const usable = guilds.includes(current) ? [current] : guilds;

        const known = this.settings.pool.find(e => e.key === key && usable.includes(e.guild));
        if (known && EmojiStore?.getCustomEmojiById(known.id)) return known;
        if (known) this.settings.pool = this.settings.pool.filter(e => e !== known);

        // Spread new mixes over the chosen servers by filling the emptiest one first.
        const guild = known?.guild ?? usable.reduce((a, b) => count(b) < count(a) ? b : a);
        const mine = () => this.settings.pool.filter(e => e.guild === guild);
        while (mine().length >= this.settings.poolSize) await this.dropEmoji(mine()[0]);

        const image = await this.toDataUrl(await resizeBlob(res.blob, 128));
        const name = `mix_${Math.random().toString(36).slice(2, 8)}`;
        let created;
        try {
            created = await this.createEmoji(guild, name, image);
        } catch (error) {
            // 30008: the server has no free emoji slots left, so make room from our own pool and try once more.
            if (error?.body?.code !== 30008 || !mine().length) throw error;
            await this.dropEmoji(mine()[0]);
            created = await this.createEmoji(guild, name, image);
        }

        const entry = {key, guild, id: created.id, name};
        this.settings.pool.push(entry);
        this.saveSettings();
        return entry;
    }

    async createEmoji(guild, name, image) {
        let reply;
        const combos = this._api ? [this._api] : this.restModules.flatMap(rest => ["", "/api/v9"].map(prefix => ({rest, prefix})));
        for (const api of combos) {
            try {
                reply = await api.rest.post({url: `${api.prefix}/guilds/${guild}/emojis`, body: {name, image}});
            } catch (error) {
                if (error?.body?.code || error?.status) throw error;
                continue;
            }
            let body = reply?.body ?? reply;
            if (typeof body === "string") body = JSON.parse(body);
            if (!body?.id && typeof reply?.text === "string") {
                try {
                    body = JSON.parse(reply.text);
                } catch {}
            }
            if (body?.id) {
                this._api = api;
                return body;
            }
            if (body?.message) throw new Error(body.message);
        }
        throw new Error(`no working Discord API module (${combos.length} tried, last status ${reply?.status ?? "none"})`);
    }

    saveSettings() {
        BdApi.Data.save(this.meta.name, "settings", this.settings);
    }

    applyBodyClasses() {
        document.body.classList.toggle("emojimix-no-inline", !this.settings.renderInline);
        document.body.classList.toggle("emojimix-no-jumbo", !this.settings.jumbo);
    }

    addRecent(res) {
        const pair = [res.a.hex, res.b.hex];
        this.settings.recents = [pair, ...this.settings.recents.filter(([a, b]) => !(a === pair[0] && b === pair[1]))].slice(0, MAX_RECENTS);
        this.saveSettings();
    }

    /* ----- chat bar button ----- */

    flush() {
        this.frame = 0;
        if (!this.pending) return;
        const nodes = [...this.pending];
        this.pending.clear();
        this.ensureButtons();
        for (const node of nodes) {
            if (node.isConnected) this.scan(node);
        }
    }

    ensureButtons() {
        for (const container of document.querySelectorAll(BUTTONS_SELECTOR)) {
            if (container.querySelector(".emojimix-wrap") || !container.lastElementChild) continue;

            const button = h("button", {
                class: "emojimix-btn",
                type: "button",
                "aria-label": "Mix emojis",
                "aria-haspopup": "dialog",
                "aria-expanded": "false",
                onclick: () => {
                    const area = button.closest(TEXTAREA_SELECTOR);
                    this.picker.toggle(button, area?.querySelector(TEXTBOX_SELECTOR));
                }
            }, icon("mix"));
            try {
                BdApi.UI.createTooltip(button, "Mix emojis", {side: "top"});
            } catch {
                button.title = "Mix emojis";
            }
            container.insertBefore(h("div", {class: "emojimix-wrap"}, button), container.lastElementChild);
        }
    }

    /* ----- inline rendering of mixes ----- */

    scan(root) {
        const links = new Set();
        if (root.matches?.(LINK_SELECTOR)) links.add(root);
        root.querySelectorAll?.(LINK_SELECTOR).forEach(link => links.add(link));

        const contents = new Set();
        for (const link of links) {
            const href = link.getAttribute("href");
            // Leave masked links ([text](url)) alone.
            if (!LINK_PATTERN.test(href) || link.textContent.trim() !== href) continue;
            link.classList.add("emojimix-link");
            link.style.setProperty("--emojimix-src", `url("${href}")`);
            contents.add(link.closest(CONTENT_SELECTOR));
        }
        contents.forEach(content => this.updateJumbo(content));
    }

    updateJumbo(content) {
        const clone = content.cloneNode(true);
        clone.querySelectorAll("a.emojimix-link, time, [class*='edited']").forEach(node => node.remove());
        const onlyMixes = clone.textContent.trim() === "";
        content.querySelectorAll("a.emojimix-link").forEach(link => link.classList.toggle("emojimix-jumbo", onlyMixes));
    }

    /* ----- sending ----- */

    async deliver(res, box) {
        box = box?.isConnected ? box : document.querySelector(`${TEXTAREA_SELECTOR} ${TEXTBOX_SELECTOR}`);
        try {
            if (this.settings.delivery === "emoji") {
                try {
                    const emoji = await this.serverEmoji(res);
                    if (!this.insertText(box, `<:${emoji.name}:${emoji.id}> `)) throw new Error("no message box");
                    return;
                } catch (error) {
                    console.error(`[${this.meta.name}]`, error);
                    const reason = error?.body?.message ?? error?.message ?? "unknown error";
                    BdApi.UI.showToast(`Server emoji failed (${reason}), sending an image instead.`, {type: "warning"});
                }
            }
            if (res.source === "google" && this.settings.delivery === "link") {
                if (!this.insertText(box, `${res.remoteUrl} `)) throw new Error("no message box");
                return;
            }
            const blob = await resizeBlob(res.blob, this.settings.uploadSize);
            const file = new File([blob], `emojimix_${res.a.hex}_${res.b.hex}.png`, {type: "image/png"});
            if (!this.pasteFile(box, file)) throw new Error("no message box");
        } catch (error) {
            console.error(`[${this.meta.name}]`, error);
            BdApi.UI.showToast("EmojiMix couldn't add the emoji to your message.", {type: "error"});
        }
    }

    insertText(box, text) {
        if (!box) return false;
        box.focus();

        // Writing straight into the DOM leaves Slate's state empty, so Enter would send nothing.
        const dispatcher = BdApi.Webpack.getModule(m => typeof m?.dispatchToLastSubscribed === "function" && m.emitter, {searchExports: true});
        if (dispatcher) {
            dispatcher.dispatchToLastSubscribed("INSERT_TEXT", {plainText: text, rawText: text});
            return true;
        }

        const data = new DataTransfer();
        data.setData("text/plain", text);
        return !box.dispatchEvent(new ClipboardEvent("paste", {clipboardData: data, bubbles: true, cancelable: true}));
    }

    pasteFile(box, file) {
        if (!box) return false;
        box.focus();
        const data = new DataTransfer();
        data.items.add(file);
        box.dispatchEvent(new ClipboardEvent("paste", {clipboardData: data, bubbles: true, cancelable: true}));
        return true;
    }
};

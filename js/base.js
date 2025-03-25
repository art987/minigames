// 请求链接并处理响应
async function fetchAndTransform() {
    const url = "https://gamemonetize.com/rssfeed.php?format=json&category=All&type=mobile&popularity=newest&company=All&amount=487";
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 转换为目标格式
        const transformedData = data.map((item,index) => ({
            index: index+1,
            star: "image/star-3.png",
            img: item.thumb,
            name: item.title,
            url: item.url,
            text: item.description
        }));

        console.log(transformedData);
    } catch (error) {
        console.error("Error fetching or transforming data:", error);
    }
}

// 调用函数
//fetchAndTransform();

let listJson = [
    {
        "index": 1,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dh1hgwbe6zn2m30w34n9n131yj7jcgvr/512x384.jpg",
        "name": "Nutcracker New Years Adventures",
        "url": "https://html5.gamemonetize.com/dh1hgwbe6zn2m30w34n9n131yj7jcgvr/",
        "text": "Welcome to the world of a fairy tale, where two princesses are preparing for a series of winter holidays. Each of the princesses is working on creating her own unique New Years outfit, inspired by Hoffmanns mystical fairy tales and Tchaikovskys classical ballet. Bright colors, shiny fabrics and exquisite details make each dress a real work of art. Princesses can experiment with various fashion trends: from elegant evening dresses to playful costumes full of naive coquetry. Immersing themselves in the atmosphere of New Years magic, players will be able not only to dress princesses, but also to develop their sense of style. Get ready for an unforgettable adventure and create your own New Years style!"
    },
    {
        "index": 2,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l1ebwf76jffgm1hsrgkzve1tydb73xj8/512x384.jpg",
        "name": "Toddler Baby Phone",
        "url": "https://html5.gamemonetize.com/l1ebwf76jffgm1hsrgkzve1tydb73xj8/",
        "text": "This is an educational game for children. Have you ever wanted to have a virtual cell phone? Our game can fulfill your wish. There are many interesting things you can do in this game. You can learn numbers and letters, you can choose any color to paint."
    },
    {
        "index": 3,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0du49lp1g248zrrik250flasgk9qrohx/512x384.jpg",
        "name": "Sweet Dolls Mermaid Princess",
        "url": "https://html5.gamemonetize.com/0du49lp1g248zrrik250flasgk9qrohx/",
        "text": "This is a dress-up and decorating game for girls. In the mysterious bottom of the sea lives this group of cute mermaids, you need to create your ocean world. You can create new characters and dress them up."
    },
    {
        "index": 4,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/038aejszc2ni0o38yb5anhwxj531eb7r/512x384.jpg",
        "name": "Horror Minecraft Partytime",
        "url": "https://html5.gamemonetize.com/038aejszc2ni0o38yb5anhwxj531eb7r/",
        "text": "Horror Minecraft Partytime is a spooky and interesting horror survival game. This time you will enter a familiar world of blocks. In this hide-and-seek mode, you will be the pursuer, looking for every corner. Find the weirdo in disguise and catch him."
    },
    {
        "index": 5,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4smrtwpkxaisb3cywlk7nw583013pmu1/512x384.jpg",
        "name": "SPRUNKI ESCAPE 3D",
        "url": "https://html5.gamemonetize.com/4smrtwpkxaisb3cywlk7nw583013pmu1/",
        "text": "Sprunki Phase 10 lets players experiment with various musical elements represented by characters, each producing sounds like beats, melodies, or effects. Players create original compositions or follow sequences by combining these elements to unlock special musical bonuses. This edition in the Sprunki series adds new layers, making it a refreshing iteration for fans of the music-mixing genre."
    },
    {
        "index": 6,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3b3xkthbrw6p09xea5qrjr0zxkr9b0gc/512x384.jpg",
        "name": "Brain Game Battery Color Sort Puzzle",
        "url": "https://html5.gamemonetize.com/3b3xkthbrw6p09xea5qrjr0zxkr9b0gc/",
        "text": "Match batteries of the same color to power up the grid and illuminate the room. With vibrant visuals and engaging gameplay, Battery Color Sort 3D will keep you hooked for hours."
    },
    {
        "index": 7,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/w285bgoyt5q5sfeu9hwydx26u10z1ooc/512x384.jpg",
        "name": "ZhangFei Legend",
        "url": "https://html5.gamemonetize.com/w285bgoyt5q5sfeu9hwydx26u10z1ooc/",
        "text": "An H5 action game featuring Zhang Fei, a renowned general from the Three Kingdoms, where players take control of Zhang Fei and embark on a heroic adventure. The game employs a smooth combo system and unique character skill designs, showcasing Zhang Feis distinctive bold and powerful fighting style. With simple and intuitive controls, players can experience the thrill of Zhang Fei wielding his mighty spear and unleashing his thunderous roars to overwhelm his enemies."
    },
    {
        "index": 8,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/135nsbm8dq5vivwk71a9tg9g7jjqstst/512x384.jpg",
        "name": "Sprunki Jigsaw Puzzle",
        "url": "https://html5.gamemonetize.com/135nsbm8dq5vivwk71a9tg9g7jjqstst/",
        "text": "Welcome to Sprunki Jigsaw Puzzle Game! Drag and drop the Sprunki Jigsaw pieces to complete the amazing pictures. Challenge your brain! Start with the edges and remember the colors in the pictures to finish quickly. Can you solve all the puzzles?"
    },
    {
        "index": 9,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5jy0jdl8roiawboguxgfk5l1d6job5ba/512x384.jpg",
        "name": "Grimace Shake Jigsaw Puzzlef",
        "url": "https://html5.gamemonetize.com/5jy0jdl8roiawboguxgfk5l1d6job5ba/",
        "text": "Grimace Shake Jigsaw is a brain puzzle assembly Game. Grimace Shake Jigsaw comes with amazing puzzle image pack. Just arrange the pieces of puzzles to get the right image. Looking for puzzle games for adults or kids? You found it! enjoy and relax!"
    },
    {
        "index": 10,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y51x5nb673umhgqzva6jz2596cd57cqc/512x384.jpg",
        "name": "Jelly Run 2048",
        "url": "https://html5.gamemonetize.com/y51x5nb673umhgqzva6jz2596cd57cqc/",
        "text": "Jelly Run 2048 is a challenging casual puzzle game that combines the classic 2048 number merging with exciting parkour gameplay. Guide your jelly block by swiping left or right to connect and disconnect cubes. Merge cubes to get double the number, reaching 2048 or greater. When the jelly block collides with tiles of the same number, they merge into a larger number."
    },
    {
        "index": 11,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2prwfwgqxzt9jj9qcsihcu6oym126roa/512x384.jpg",
        "name": "Roblox Christmas Dressup",
        "url": "https://html5.gamemonetize.com/2prwfwgqxzt9jj9qcsihcu6oym126roa/",
        "text": "Roblox Christmas Dressup is a delightful dress-up game where players embrace the festive spirit by customizing their avatars with Christmas-themed outfits and accessories. The game offers a wide variety of styles to explore, from cozy winter wear to glamorous holiday ensembles. Perfect for fashion enthusiasts and Roblox fans alike, Roblox Christmas Dressup brings creativity and joy to the holiday season."
    },
    {
        "index": 12,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/24gnovw92p6d8dz6lr9jg0sp3ug9xrmd/512x384.jpg",
        "name": "Slenderman Lost at School",
        "url": "https://html5.gamemonetize.com/24gnovw92p6d8dz6lr9jg0sp3ug9xrmd/",
        "text": "Slenderman Lost at School is a chilling online horror game that thrusts players into a dark and eerie school where the infamous Slenderman roams. Your objective is to explore the abandoned school, solve puzzles, and collect items to escape Slendermans clutches. The game combines elements of stealth, strategy, and horror to deliver a truly immersive and terrifying experience."
    },
    {
        "index": 13,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/okhzhykl4c44o92f2ojcsac8c9oteujs/512x384.jpg",
        "name": "Sniper Shot Camo Enemies",
        "url": "https://html5.gamemonetize.com/okhzhykl4c44o92f2ojcsac8c9oteujs/",
        "text": "Sniper Shot: Camo Enemies is a wonderful sniper game where precision and patience are your best weapons. Become a skilled sniper and kill hidden villains with precision. Youll face intense missions that test your sniper skills to the max."
    },
    {
        "index": 14,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8ze15rudl04u3ugrn13965oquot6qdns/512x384.jpg",
        "name": "Sweetsu Tile Puzzle",
        "url": "https://html5.gamemonetize.com/8ze15rudl04u3ugrn13965oquot6qdns/",
        "text": "Sweet Tile Puzzle is a relaxing yet strategic game. Match 3 identical Japanese-themed tiles by drawing them into a limited stack. Clear the board by collecting all tiles while managing space wisely. With each level, challenges grow as the stack shrinks and more tiles appear. Can you master the art of tile matching?"
    },
    {
        "index": 15,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/flzmqb79sbnmw8wsxobm4l2bqj65t798/512x384.jpg",
        "name": "Snowmans Naughty Trap",
        "url": "https://html5.gamemonetize.com/flzmqb79sbnmw8wsxobm4l2bqj65t798/",
        "text": "Welcome to Snowman&amp;rsquo;s Naughty Trap! Santa Claus is in trouble, and only you can help! A mischievous snowman has trapped Santa in a snowy maze, and now it&amp;rsquo;s up to you to save him. Jump over tricky blocks, dodge icy obstacles, and slide through snowy tunnels to reach Santa before its too late."
    },
    {
        "index": 16,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zxj7rznt6ljamaxaitum0fhzx7lt0ztt/512x384.jpg",
        "name": "Anime Girls In Red Dress Tile Puzzle",
        "url": "https://html5.gamemonetize.com/zxj7rznt6ljamaxaitum0fhzx7lt0ztt/",
        "text": "Anime in red dress with cold snow and snowmen. Relax by solving a puzzle and unlock 5 anime girls in red dress. No timer, you can solve at your own pace, with relaxing music."
    },
    {
        "index": 17,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ibv4lfieflmtlfpq172rhreav1kltf23/512x384.jpg",
        "name": "Grand Hotel",
        "url": "https://html5.gamemonetize.com/ibv4lfieflmtlfpq172rhreav1kltf23/",
        "text": "Grand Hotel is an idle game where you get to run your dream hotel! Check in guests, clean rooms, collect payments and tips, and ensure the bathrooms are always stocked with toilet paper. Upgrade your hotel rooms, expand your business, and hire employees to assist with various tasks. Develop your skills as a manager, investor, and designer! Are you ready to build your own accommodation empire?"
    },
    {
        "index": 18,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dgca7uu3ypx71up4opyg9try95iic4zm/512x384.jpg",
        "name": "Sprunki Puzzles",
        "url": "https://html5.gamemonetize.com/dgca7uu3ypx71up4opyg9try95iic4zm/",
        "text": "Play with 6 images in this perfect jigsaw puzzle game: Sprunki Puzzles. All images is with theme Sprunki. Solve all puzzles and keep your brain sharp. You have four modes for each picture, 16 pieces, 36 pieces, 64 pieces and 100 pieces. Enjoy and have fun."
    },
    {
        "index": 19,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/51asxylvl2gygjvenc0e1v3frystypd6/512x384.jpg",
        "name": "Boss Hunter Run",
        "url": "https://html5.gamemonetize.com/51asxylvl2gygjvenc0e1v3frystypd6/",
        "text": "Boss Hunter Run is an exciting parkour adventure game that blends battling, and high-speed running into one thrilling experience! As a brave hunter, you&amp;rsquo;ll sprint through challenging platforms. Battle powerful bosses and avoid obstacles released by bosses like spikes, cutters,minions, etc."
    },
    {
        "index": 20,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/oqs0yddepvccu05lu6pibq21lthwt8ia/512x384.jpg",
        "name": "Traffic Jam Hop On",
        "url": "https://html5.gamemonetize.com/oqs0yddepvccu05lu6pibq21lthwt8ia/",
        "text": "In Traffic Jam: Hop On, challenge your strategy thinking and quick reflexes! This wonderful puzzle game will take you into a colorful parking lot. Your task is to help all kinds of vehicles get out of traffic jams and start smoothly."
    },
    {
        "index": 21,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hjit5lzhyttgtlk7uy770g7boxk2yhr8/512x384.jpg",
        "name": "Fish Shooting Fish Hunter",
        "url": "https://html5.gamemonetize.com/hjit5lzhyttgtlk7uy770g7boxk2yhr8/",
        "text": "Want to begin a fun and relaxing fishing adventure? In Fish Shooting - Fish Hunter, you&amp;rsquo;ll become a fishing master. Use your skills and quick reflexes to catch various fish while enjoying a laid-back casual experience!"
    },
    {
        "index": 22,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/v29dwjwuxciuhl65t60naf29f4lhx82l/512x384.jpg",
        "name": "Kids Animal Doctor",
        "url": "https://html5.gamemonetize.com/v29dwjwuxciuhl65t60naf29f4lhx82l/",
        "text": "This is a creative and fun doctor simulation game. Have you ever wanted to be a doctor? If you ever want to save others, this game for girls will fulfill your desire. You will be a doctor and rescue cute characters like puppies, tigers, and pandas, providing them with the urgent medical care they need to help them recover."
    },
    {
        "index": 23,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xfzzs4ort448i2mdecaqjbr28yt6j6oe/512x384.jpg",
        "name": "Survival Pumpkin",
        "url": "https://html5.gamemonetize.com/xfzzs4ort448i2mdecaqjbr28yt6j6oe/",
        "text": "Survival Pumpkin is a fun and addictive Halloween-themed endless survival game where you control a cheerful pumpkin as it jumps to escape spooky enemies and obstacles! Tap the screen to make your pumpkin jump and avoid creepy bats, skulls, zombie hands, and magical cauldrons. Stay alive for as long as you can to score the highest points and challenge your reflexes in this spooky yet thrilling gameplay. Perfect for players of all ages, Survival Pumpkin offers simple one-tap controls and visually vibrant Halloween graphics. Enjoy endless hours of fun as you test your skills, timing, and patience to survive in the haunted night!"
    },
    {
        "index": 24,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/f8p53afrxzvzswyvillbj2oz2mxv9e7m/512x384.jpg",
        "name": "The Grench Couple Holiday Dress up",
        "url": "https://html5.gamemonetize.com/f8p53afrxzvzswyvillbj2oz2mxv9e7m/",
        "text": "Get ready to immerse yourself in a delightful holiday-themed game with The Grinch Couple Holiday Dress Up! This unique dress-up game combines festive fun with creative fashion choices, letting you design the perfect holiday outfits for the Grinch and his partner. Whether you&amp;rsquo;re a fan of dressing up games or just love the Grinch&amp;rsquo;s mischievous charm, this game promises a memorable and entertaining experience."
    },
    {
        "index": 25,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2vq7yxallkglyg3flbbrsj0b3icvg0d4/512x384.jpg",
        "name": "Chicken Crosser",
        "url": "https://html5.gamemonetize.com/2vq7yxallkglyg3flbbrsj0b3icvg0d4/",
        "text": "In Chicken Crosser, help a plucky little chicken dodge oncoming cars and other dangerous obstacles as it crosses busy roads, rivers, and hazardous fields! The chicken&amp;rsquo;s quest to find new lands is filled with peril, as it must navigate through traffic-filled streets, making quick decisions to avoid crashes. But the chicken doesn&amp;rsquo;t have to cross alone! Unlock a variety of adorable animals&amp;mdash;like a speedy dog or a nimble cat&amp;mdash;each with their own abilities to help you survive the chaotic roads."
    },
    {
        "index": 26,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/eagni5lugkqfhn023fg4mrvcog50tl06/512x384.jpg",
        "name": "Sprunki Clicker Master",
        "url": "https://html5.gamemonetize.com/eagni5lugkqfhn023fg4mrvcog50tl06/",
        "text": "Sprunki Clicker Master is an addictive online incremental game where players embark on a fun-filled adventure to collect and upgrade a variety of quirky characters called Sprunkis. Key Features: Incremental Gameplay: Click to earn coins and upgrade your Sprunkis."
    },
    {
        "index": 27,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/d4plzs93ybdbf9zceijapf1z9wwo2he6/512x384.jpg",
        "name": "Battle Of Tank Steel",
        "url": "https://html5.gamemonetize.com/d4plzs93ybdbf9zceijapf1z9wwo2he6/",
        "text": "Are you ready to enter the world of tank battles? In Battle of Tank Steel, you&amp;rsquo;ll drive powerful tanks into intense battles. Experience endless action and shooting fun! This game puts you on a battlefield filled with challenges and strategy. You can unblock various types of tanks, each with unique capabilities and weapons."
    },
    {
        "index": 28,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6hjszik1u2u42mo6pg1yqxfabgsf9ob6/512x384.jpg",
        "name": "Christmas Gift Match",
        "url": "https://html5.gamemonetize.com/6hjszik1u2u42mo6pg1yqxfabgsf9ob6/",
        "text": "Celebrate the joy of the holiday season with Christmas Gift Match, a delightful gift-matching puzzle game! Dive into the enchanting world of Christmas as you match beautifully wrapped gifts, candy canes, and festive ornaments to spread cheer and unlock exciting surprises. Match three or more identical gifts to score points and clear the board. Explore a variety of fun and challenging levels, all inspired by the magic of Christmas. Immerse yourself in stunning holiday visuals with cheerful music to match the mood. Enjoy seamless gameplay on mobile and desktop platforms. Spread the holiday spirit as you conquer each level in the Christmas Gift"
    },
    {
        "index": 29,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/erivy13qn3ldebvmzotazb6iyhva1tvz/512x384.jpg",
        "name": "Stick Rope Hero",
        "url": "https://html5.gamemonetize.com/erivy13qn3ldebvmzotazb6iyhva1tvz/",
        "text": "Are you ready to become a super stickman hero? In Stick Rope Hero, you enter an exciting sandbox world filled with adventures and challenges. Swing around the open city with your powerful rope skills and completing many action tasks."
    },
    {
        "index": 30,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/15np8vrelvi04qplmlk3f9rrdl9tw1y3/512x384.jpg",
        "name": "Talking IShowSpeed",
        "url": "https://html5.gamemonetize.com/15np8vrelvi04qplmlk3f9rrdl9tw1y3/",
        "text": "Talking IShowSpeed is an exciting and entertaining online game designed especially for kids! Simply type any words into the text box, and watch as IShowSpeed brings them to life by talking. But that&amp;rsquo;s not all&amp;mdash;there&amp;rsquo;s even more fun to explore within the game! So, what are you waiting for? Dive in, start playing, and enjoy endless laughter and excitement!"
    },
    {
        "index": 31,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/az4fzkv1ynqr09w0fknfnv7ptwtpp8ii/512x384.jpg",
        "name": "Xmas Balls",
        "url": "https://html5.gamemonetize.com/az4fzkv1ynqr09w0fknfnv7ptwtpp8ii/",
        "text": "In Xmas Balls, your goal is to aim carefully and shoot the falling gift blocks to destroy them. Each successful shot earns you extra balls, allowing you to clear even more blocks in your quest to save the gifts. But beware&amp;mdash; the blocks fall faster and faster as the game progresses, so you&amp;rsquo;ll need quick reflexes and perfect timing to keep up! The more blocks you destroy, the higher your score. Keep an eye out for special blocks that grant power-ups, and aim for those to give yourself an edge in the game. Can you help Santa keep the holiday season joyful by clearing all the gift blocks?"
    },
    {
        "index": 32,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hax4sf4gh0h9x1geblco3u3u99i3lnvc/512x384.jpg",
        "name": "Christmas Spot differences",
        "url": "https://html5.gamemonetize.com/hax4sf4gh0h9x1geblco3u3u99i3lnvc/",
        "text": "Welcome to Christmas Spot differences Puzzle Game! Celebrate the holiday season with this fun Christmas Spot the Differences game! Challenge your observation skills by finding the differences between two festive images. Each level comes with 3 helpful hints to guide you along the way. Can you spot them all and complete the levels in time? Enjoy the holiday-themed puzzles and get into the Christmas spirit!"
    },
    {
        "index": 33,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/86nvuq9kpejinx49fv27relwo1b8ulrz/512x384.jpg",
        "name": "Real Driving Simulator",
        "url": "https://html5.gamemonetize.com/86nvuq9kpejinx49fv27relwo1b8ulrz/",
        "text": "Real Driving Simulator is a realistic driving simulation game that lets you fully enjoy the thrill of driving and racing! In this game, you can unblock various vehicles and drive them through cities and tracks. Experience the real feel of being behind the wheel."
    },
    {
        "index": 34,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3mx18l36kv4noegmr15bgtv6ckfuta6f/512x384.jpg",
        "name": "Crazy Car Stunt Descent GT",
        "url": "https://html5.gamemonetize.com/3mx18l36kv4noegmr15bgtv6ckfuta6f/",
        "text": "Crazy Car Stunt Descent is an exciting driving car game that puts you behind the wheel of fully customizable super-sport cars, featuring heart-stopping mega ramps, vibrant giant bosses, and intense head-to-head races. Experience a one-of-a-kind adventure as you launch yourself off towering ramps, execute daring stunts, and outmaneuver colossal bosses in electrifying showdowns. With stylized cars and thrilling gameplay, you&amp;rsquo;ll race to conquer the ultimate title of driver extraordinaire."
    },
    {
        "index": 35,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0zbplzck4osta8j5w8mteg6u4vuznk6w/512x384.jpg",
        "name": "Santas Gift Haul",
        "url": "https://html5.gamemonetize.com/0zbplzck4osta8j5w8mteg6u4vuznk6w/",
        "text": "Help Santa gather gifts and spread joy! Play Santas Gift Haul for festive fun now! Dive into the Festive Fun with Santas Gift Haul. Experience the magic of Christmas in Santas Gift Haul, where joy, adventure, and holiday cheer come together. Perfect for players of all ages, this enchanting game lets you join Santa as he embarks on a gift collecting journey to ensure every child has a magical Christmas. If youre looking to celebrate the holidays with a touch of fun, strategy, and cheer, look no further than Santas Gift Haul."
    },
    {
        "index": 36,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8j9zm6uvcwv010udpf3vbmdmmyx6v3d2/512x384.jpg",
        "name": "Charming Hair Salon Make Up",
        "url": "https://html5.gamemonetize.com/8j9zm6uvcwv010udpf3vbmdmmyx6v3d2/",
        "text": "This is a free design hairstyle game designed for girls. Have you ever wanted to design a fashion hairstyle for yourself? If you want to do everything yourself, our game is for you. In this game, you will become a star hairstylist and run your salon."
    },
    {
        "index": 37,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/twq47apmwo98gqxz06j4ayvycngyijdy/512x384.jpg",
        "name": "Holiday Hex Sort",
        "url": "https://html5.gamemonetize.com/twq47apmwo98gqxz06j4ayvycngyijdy/",
        "text": "In Holiday Hex Sort, drag and drop hex tile stacks onto the board. Merge tiles to form stacks of 10 and collect them. As levels progress, more tile types appear. If there are 10 similar tiles on a stack, they will be collected. Clear all tiles by making stacks of 10 before time runs out !"
    },
    {
        "index": 38,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rjofcei81c1r61653868olqnbwlzub1a/512x384.jpg",
        "name": "Xmas Plinkio",
        "url": "https://html5.gamemonetize.com/rjofcei81c1r61653868olqnbwlzub1a/",
        "text": "Drop the magical yellow Christmas Sphere into the festive Pachinko board and watch as it bounces through a dazzling winter wonderland! Navigate a maze of candy canes, sparkling ornaments, and jingling bells to rack up points. Aim for glowing snowflakes to unlock bonus rewards and hit the Santa Hat Zone for the ultimate Christmas jackpot! With every drop, you&amp;rsquo;ll spread holiday cheer&amp;mdash;can you score enough to top Santa&amp;rsquo;s Nice List? Let the Xmas Plinkio fun begin - tap, drop, and win!"
    },
    {
        "index": 39,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hk5qyxw04dzhp7hasacv3tji0a9ww4zb/512x384.jpg",
        "name": "Christmas Tic Tac Toe",
        "url": "https://html5.gamemonetize.com/hk5qyxw04dzhp7hasacv3tji0a9ww4zb/",
        "text": "Christmas Tic Tac Toe is a festive twist on the classic game that brings the holiday spirit to life. Play against friends or challenge yourself in single-player mode as you compete to line up snowmen and Christmas trees instead of the traditional Xs and Os. The game features vibrant holiday graphics with frosty designs, cheerful characters, and falling snowflakes that create a magical winter atmosphere. With quick rounds and easy-to-learn gameplay, its perfect for short bursts of fun or competitive challenges. Track your scores to see who becomes the ultimate Christmas Tic Tac Toe champion."
    },
    {
        "index": 40,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qrhgbfr1w00q0woj8d9sd0k1100ma9jh/512x384.jpg",
        "name": "Sprunki Coloring Books",
        "url": "https://html5.gamemonetize.com/qrhgbfr1w00q0woj8d9sd0k1100ma9jh/",
        "text": "Dive into a colorful adventure with Sprunki Coloring Book, a delightful game designed for kids and adults alike. Choose from a wide variety of adorable Sprunki characters, captivating landscapes, and fun designs to color your way. Whether youre a budding artist or simply looking to relax, Sprunki Coloring Book offers endless possibilities for self-expression. Start coloring today and discover the joy of creativity with Sprunki Coloring Book!"
    },
    {
        "index": 41,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jjddtwyiaognc6ay1ddfv7ltdbdfcnun/512x384.jpg",
        "name": "Violent shooter",
        "url": "https://html5.gamemonetize.com/jjddtwyiaognc6ay1ddfv7ltdbdfcnun/",
        "text": "Very fun casual shooting game. Use Sniper, Gatling, RPG, and your piggy buddies to defeat enemies, get treasure chests, and challenge new levels."
    },
    {
        "index": 42,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l3qu58sxna0pqizngsxs8c6m261s2u8o/512x384.jpg",
        "name": "Christmas Gift Unlock",
        "url": "https://html5.gamemonetize.com/l3qu58sxna0pqizngsxs8c6m261s2u8o/",
        "text": "Dive into the festive spirit with the delightful Christmas Gift Unlock Game! Slide and strategize your way through challenging puzzles to unlock the ultimate Christmas present. This game features vibrant holiday-themed graphics, a cheerful soundtrack, and progressively challenging levels that keep players engaged. Perfect for the holiday season, this brain-teasing game combines fun and mental exercise. Players can enjoy smooth gameplay with intuitive controls and an immersive Christmas environment. Whether you&amp;rsquo;re solving puzzles to pass the time or aiming for a high score, Christmas Gift Unlock Game is the perfect holiday treat for players o"
    },
    {
        "index": 43,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pf79v5e5281dxe63ze8wkwj9ruzssaj8/512x384.jpg",
        "name": "Christmas Gift Jump",
        "url": "https://html5.gamemonetize.com/pf79v5e5281dxe63ze8wkwj9ruzssaj8/",
        "text": "Christmas Gift Jumpis a fun and festive arcade game designed to bring holiday cheer! Help Santa collect gifts by jumping from platform to platform, avoiding obstacles, and reaching the highest score possible. With vibrant Christmas-themed graphics, cheerful music, and intuitive controls, this game is perfect for players of all ages. Challenge yourself or compete with friends to see who can climb the highest and collect the most gifts this holiday season. Get into the Christmas spirit and enjoy hours of entertainment with Christmas Gift Jump!"
    },
    {
        "index": 44,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xo6x40k7g518buz04t5oq4t5wsvqcbxm/512x384.jpg",
        "name": "Rainbow Glitter Slime",
        "url": "https://html5.gamemonetize.com/xo6x40k7g518buz04t5oq4t5wsvqcbxm/",
        "text": "Do you like making, touching, and stretching Slimes? Do you want to make your rainbow glitter slime? This DIY girls game will meet your needs. You can make your own desired colors and styles starting from the ingredients."
    },
    {
        "index": 45,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/h3dk9cad3vatmgbll4frufe6zral0o1u/512x384.jpg",
        "name": "Flappy Zombie Santa Christmas Game",
        "url": "https://html5.gamemonetize.com/h3dk9cad3vatmgbll4frufe6zral0o1u/",
        "text": "Dive into the holiday madness with Flappy Zombie Santa Christmas Game! In this thrilling arcade adventure, you take control of Zombie Santa, soaring through the frosty skies to save&amp;mdash;or ruin&amp;mdash;Christmas! Dodge icy obstacles, collect spooky gifts, and survive the snowy traps as you flap your way to victory. Experience a unique blend of festive cheer and undead action. With simple tap-to-fly controls, the game is easy to pick up but challenging to master. Perfect for players of all ages looking for some holiday fun with a twist! Will Zombie Santa bring joy or chaos this Christmas? Play now and find out!"
    },
    {
        "index": 46,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dfks3ov5rz1pnx8i30ahwwknfpi0d7gw/512x384.jpg",
        "name": "Rushy Racing",
        "url": "https://html5.gamemonetize.com/dfks3ov5rz1pnx8i30ahwwknfpi0d7gw/",
        "text": "Welcome to Rushy Racing: Online Cars Game! Hold your mouse to tap and control your car while dodging other vehicles to collect coins and lives. If you hit another vehicle, youll lose some of your life. Use coins to unlock new cars and powers."
    },
    {
        "index": 47,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/slrxe38x6845ol68bkcrtet7yqe728g9/512x384.jpg",
        "name": "Gomoku: five stones in a row",
        "url": "https://html5.gamemonetize.com/slrxe38x6845ol68bkcrtet7yqe728g9/",
        "text": "Gomoku: Five Stones in a Row is a board logic game for two players. On a square board measuring 19x19 (in the traditional version) or 15x15 (in the modern sports version) points, players alternately place stones of two colors. The winner is the one who is the first to build a continuous row of five stones of his color vertically, horizontally or diagonally. It has many options, differing in individual details of the rules. The game is believed to have been invented in China more than two thousand years ago. Currently, the game is known all over the world; sporting competitions are held based on it."
    },
    {
        "index": 48,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mo4dmfvsrwe2ra49uit0eifv3sxn459c/512x384.jpg",
        "name": "Speed Math",
        "url": "https://html5.gamemonetize.com/mo4dmfvsrwe2ra49uit0eifv3sxn459c/",
        "text": "Dive into the exciting world of Speed Math, a brain-teasing puzzle game designed to make math thrilling and improve your calculation skills. Perfect for kids and math lovers of all ages, this game combines education with entertainment for an experience you won&amp;rsquo;t forget! Here&amp;rsquo;s the challenge: At the top of the screen, you&amp;rsquo;ll see a &amp;ldquo;?&amp;rdquo; symbol &amp;ndash; your mission is to fill in the blank with the correct number or operator from the provided options. Think fast, because time is ticking! Each equation or puzzle you solve will put your mental math and problem-solving skills to the ultimate test. Are you ready to master the numbers?"
    },
    {
        "index": 49,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rm2hp72x1u9zw1escgy9w83uj7zdjano/512x384.jpg",
        "name": "Nails Stack",
        "url": "https://html5.gamemonetize.com/rm2hp72x1u9zw1escgy9w83uj7zdjano/",
        "text": "Welcome to Nails Stack Game: Collect nails and paint then from paint areas as you progress through the track. Get ready for Nails Stack fun! Color your nails on the platform and join the fun."
    },
    {
        "index": 50,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/47s9m0brc0yi9uxuiox53uov9hoyy40n/512x384.jpg",
        "name": "Basketball Life 3d",
        "url": "https://html5.gamemonetize.com/47s9m0brc0yi9uxuiox53uov9hoyy40n/",
        "text": "Ready for the wonderful basketball challenge? Basketball Life 3D is a fun and creative sports game that tests your skills and timing! From classic hoop challenges to trick shots, every level is packed with excitement."
    },
    {
        "index": 51,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7im5z5sp4512qpsp9x6q0mgp1vbsqz10/512x384.jpg",
        "name": "Dentist Doctor Game For Kids",
        "url": "https://html5.gamemonetize.com/7im5z5sp4512qpsp9x6q0mgp1vbsqz10/",
        "text": "Have you ever wanted to be a dentist? Our game can fulfill your desire if you want to be a doctor. In the game, you will play as an oral care doctor who performs different types of dental surgery in a dental clinic. You must perform fillings, cleanings, extractions, stain removal, teeth whitening, and other operations to provide the best oral care for the animals."
    },
    {
        "index": 52,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lodtpwycil6m0709hs85amsftefj7w9y/512x384.jpg",
        "name": "Charlie the Talking Steak",
        "url": "https://html5.gamemonetize.com/lodtpwycil6m0709hs85amsftefj7w9y/",
        "text": "Charlie the Steak is a quirky and humorous simulation game where players interact with a piece of steak named Charlie. The game offers a unique blend of dark humor and unconventional gameplay, as the goal is to prepare, manipulate, or even torture the steak in various ways."
    },
    {
        "index": 53,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/x29pn13vni978ucifsnbs7sxha6n31mk/512x384.jpg",
        "name": "Red Clicker Game",
        "url": "https://html5.gamemonetize.com/x29pn13vni978ucifsnbs7sxha6n31mk/",
        "text": "In this game, all you have to do is click/touch on the screen. You can see your clicks per second and your total clicks. Its a very simple game, enjoy it!"
    },
    {
        "index": 54,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ecl4umbfntze1yt9v5wbov4b89f3nipb/512x384.jpg",
        "name": "Lily Style Dress Up",
        "url": "https://html5.gamemonetize.com/ecl4umbfntze1yt9v5wbov4b89f3nipb/",
        "text": "This is a doll dress-up game for girls. Do you like to dress up dolls? Do you want to make a unique doll for yourself? Our game can fulfill your needs."
    },
    {
        "index": 55,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wlw4fy6yuuazzvblnru0uupy7ekhfij4/512x384.jpg",
        "name": "Cute Christmas Animals Jigsaw",
        "url": "https://html5.gamemonetize.com/wlw4fy6yuuazzvblnru0uupy7ekhfij4/",
        "text": "Cute Christmas Animals Jigsaw is a fun and festive puzzle game designed for kids! It features three adorable animals dressed in cheerful Christmas costumes: a raccoon in a Santa hat, a bunny with a holiday scarf, and a squirrel holding a gift. Kids can choose from three colorful puzzles, improving their problem-solving skills and hand-eye coordination as they play. The game offers simple controls for young players, vibrant illustrations, and a cheerful holiday soundtrack to set the perfect Christmas mood."
    },
    {
        "index": 56,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y34098moqvr8ueuddbb4vnwxmtorlq4i/512x384.jpg",
        "name": "MR RACER : Car Racing",
        "url": "https://html5.gamemonetize.com/y34098moqvr8ueuddbb4vnwxmtorlq4i/",
        "text": "MR RACER - Car Racing is a thrilling and challenging racing game that will excite you! Race at high speed with stunning supercars and beat the traffic. This game provides a very easy-to-control car movement and is extremely fun to race. Key features: 100 levels in Challenge Mode. Unlimited levels in Chase Mode. Best of race, chase your opponents and show them that you are a Master! Career Race Mode: Beat your rivals and be the legend! 15 Supercars available Upgrade cars to gear up the performance! Customize cars with attractive car paint and wheels Stunning 3D graphics &amp;amp; realistic lighting Different Camera angles"
    },
    {
        "index": 57,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fnp0ngnsuu5x0bh4lnve42hwx4vc3wcm/512x384.jpg",
        "name": "Sprunki Incredibox Memory",
        "url": "https://html5.gamemonetize.com/fnp0ngnsuu5x0bh4lnve42hwx4vc3wcm/",
        "text": "This time in the game Sprunki Incredibox Memory you will need to improve your memory. Cards with the image of Sprunki will appear on the playing field. Each character has a double. Remember the location of the heroes. After a few seconds, the cards will turn towards you with the side that will be the same for everyone. You must click on the cards to find paired Sprunks. Please note that you have a limited number of steps, you will find their limit at the top in Sprunki Incredibox Memory."
    },
    {
        "index": 58,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xg9x94wxgkn2jzndhoielaq4b7jvsxap/512x384.jpg",
        "name": "Brick Breaker Ball",
        "url": "https://html5.gamemonetize.com/xg9x94wxgkn2jzndhoielaq4b7jvsxap/",
        "text": "Brick Breaker is a classic high-paced game of brick-smashing action. Grab power-ups and extra lives before they fall. Can you set a new high score?"
    },
    {
        "index": 59,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/92rgvlnfyvms2w91puiip5hr27x4y3uj/512x384.jpg",
        "name": "Colorful Assort Game",
        "url": "https://html5.gamemonetize.com/92rgvlnfyvms2w91puiip5hr27x4y3uj/",
        "text": "Colorful Assort is a fun and vibrant puzzle game where you match and sort colorful balls. Test your strategy skills as you tackle various levels and challenges. Perfect for a quick and relaxing brain teaser!"
    },
    {
        "index": 60,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/03apdilu81bow5i7jv48mq3kno8ahl02/512x384.jpg",
        "name": "Park The Taxi 3",
        "url": "https://html5.gamemonetize.com/03apdilu81bow5i7jv48mq3kno8ahl02/",
        "text": "Park The Taxi 3 is a car driving game. Your task is to drive a taxi and park it into marked parking space. Park the taxi quickly to earn score points and unlock various achievements."
    },
    {
        "index": 61,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hb6b8tf7j4ot7v6qaia64199f2kvqtgu/512x384.jpg",
        "name": "Santa Dentist",
        "url": "https://html5.gamemonetize.com/hb6b8tf7j4ot7v6qaia64199f2kvqtgu/",
        "text": "Get ready for a toothy holiday adventure with Santa Dentist! Step into Santas dental clinic and help him and his festive friends achieve sparkling smiles. Clean cavities, fix broken teeth, and apply braces to naughty or nice patients like Rudolph, elves, and even the Grinch! With colorful tools, fun mini-games, and holiday cheer, youll keep Santas smile shining bright for Christmas. Perfect for kids and families, this game combines learning and laughter for hours of fun. Download Santa Dentist and spread smiles this holiday season!"
    },
    {
        "index": 62,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pj94bkx8k8tu202htdwf1dc0u1mdgaz5/512x384.jpg",
        "name": "Heroic Dash World",
        "url": "https://html5.gamemonetize.com/pj94bkx8k8tu202htdwf1dc0u1mdgaz5/",
        "text": "This new game brings a whole new world of adventure. In Hero Dash World, youll go on an adventure with a little hero as he explores a fantastical realm in search of the most exciting levels! Play free, brand-new games on kiz10.com every day. The heros adventure begins when he or she turns around and jumps from platform to platform. To purchase heroes, amass as much gems as possible. Following the arrows will show you when to turn, so you can guide the small character down the path. Get the most coins and unlock more characters as you go."
    },
    {
        "index": 63,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/q9xrmuceu30pey8llzop5cr0p1p2fbx9/512x384.jpg",
        "name": "Survev.io",
        "url": "https://html5.gamemonetize.com/q9xrmuceu30pey8llzop5cr0p1p2fbx9/",
        "text": "Survev.io Battle Royale is a thrilling multiplayer game where you fight to be the last character standing on a shrinking island. Start with nothing but your fists, scavenge for weapons and supplies, and stay within the safe zone. Choose between solo, duo, or squad modes, and use strategy and skills to outlast up to 50 opponents."
    },
    {
        "index": 64,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8gjrfuo4objslb0okt96n8qo41flqrpj/512x384.jpg",
        "name": "Hoop KIngs",
        "url": "https://html5.gamemonetize.com/8gjrfuo4objslb0okt96n8qo41flqrpj/",
        "text": "Hoop Kings is a casual puzzle game where players aim to score points by solving basketball-themed challenges. With engaging gameplay, vibrant graphics, and a mix of strategy and fun, it&amp;rsquo;s perfect for quick entertainment or longer play sessions."
    },
    {
        "index": 65,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wigmwb0qrjycip6o6p7of5984t77ydql/512x384.jpg",
        "name": "Connect the Images",
        "url": "https://html5.gamemonetize.com/wigmwb0qrjycip6o6p7of5984t77ydql/",
        "text": "In Connect Image, players are challenged to complete fragmented pictures by matching pieces to their corresponding shaded outlines. The objective is simple but engaging: arrange various parts of an image onto the shaded areas, gradually revealing the full picture as you progress. Each puzzle features distinct sections that need to be carefully connected, testing both your visual perception and problem-solving skills. As you place the image parts in the right spots, the incomplete image slowly transforms into a complete and vivid picture, offering a satisfying sense of accomplishment. The difficulty increases with each level, introducing more complex images and intricate pieces, providing a fun and rewarding experience for players of all skill levels. Whether youre looking to relax or challenge your mind, Connect Image offers an addictive puzzle experience that will keep you hooked for hours!"
    },
    {
        "index": 66,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0e8bl4kywmf7kikoysg3y06o0ymk0gi2/512x384.jpg",
        "name": "Checkmate Clash",
        "url": "https://html5.gamemonetize.com/0e8bl4kywmf7kikoysg3y06o0ymk0gi2/",
        "text": "Checkmate Clash is the ultimate online chess experience where strategy meets competition! Outsmart opponent in thrilling matches and show off your tactical brilliance. Whether youre a chess master or a beginner, this game offers exciting challenges to sharpen your skills. Plan your moves, dominate the board, and deliver the perfect checkmate. Are you ready to claim victory? The battle for the crown begins now!"
    },
    {
        "index": 67,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l9ysbr2ma4jmf0y0ozewsaucx4d187am/512x384.jpg",
        "name": "Bee keeper",
        "url": "https://html5.gamemonetize.com/l9ysbr2ma4jmf0y0ozewsaucx4d187am/",
        "text": "In Beekeeper, begin an exciting adventure in the world of bee farming! This fun simulation game lets you become a beekeeping expert. You need to collect honey and sell it to traders. After you get gold you can upgrade scythe damage and bottle capacity."
    },
    {
        "index": 68,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/iesodo60w0iclgtr4m4schime7fk1tbw/512x384.jpg",
        "name": "Endless Cat Climb",
        "url": "https://html5.gamemonetize.com/iesodo60w0iclgtr4m4schime7fk1tbw/",
        "text": "If you liked Only Up, Then this game is for you! A game where cat climb up in a tree collecting coins while avoiding obstacles to get score. The cat climbs faster as time passes. Will you be able to get 3 stars and score 1,000 points?"
    },
    {
        "index": 69,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/v7zd6ic9geztkdepv2fbxrq9mu45s7tj/512x384.jpg",
        "name": "Sprunki Pop It",
        "url": "https://html5.gamemonetize.com/v7zd6ic9geztkdepv2fbxrq9mu45s7tj/",
        "text": "Go into the vibrant, fast-paced world of Sprunki Pop It, the addictive free-to-play online game that&amp;rsquo;s a hit with kids everywhere! Packed with dazzling visuals, dynamic gameplay, and endless fun, it&amp;rsquo;s the ultimate test of speed and strategy. Your challenge? Pop every bubble, dodge unpredictable obstacles, and rise through increasingly tricky levels. Whether you&amp;rsquo;re aiming for a high score or just love the satisfying pop of bubbles, Sprunki Pop It guarantees hours of pure excitement. Are you ready to take on the popping frenzy?"
    },
    {
        "index": 70,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ywgj9hhauky1dwqqquy5q37tldkfps8p/512x384.jpg",
        "name": "Digital Circus Find The Differences",
        "url": "https://html5.gamemonetize.com/ywgj9hhauky1dwqqquy5q37tldkfps8p/",
        "text": "Step into the whimsical and wacky world of Amazing Digital Circus: Find The Differences, where fun meets challenge! Explore vibrant and surreal circus scenes filled with unique characters and zany details, all while sharpening your observation skills. Can you spot the subtle changes between two seemingly identical pictures? Features: Stunning and imaginative circus-themed visuals. A variety of levels, from easy to mind-bendingly tricky. Helpful hints for those tough-to-spot differences. A fun and relaxing experience for all ages. Immerse yourself in the quirky charm of the Amazing Digital Circus."
    },
    {
        "index": 71,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/suleu3k047wd4uxeaxrhirot4az9l48n/512x384.jpg",
        "name": "Truefalse",
        "url": "https://html5.gamemonetize.com/suleu3k047wd4uxeaxrhirot4az9l48n/",
        "text": "Truefalse players are presented with a series of statements or scenarios, and their task is to discern whether each one is true or false. The catch? The game dynamically generates these statements, mixing truths and falsehoods seamlessly to challenge players perception and intuition."
    },
    {
        "index": 72,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xw0lx0mol959ec8vy6mj5mg06y8h2f20/512x384.jpg",
        "name": "Euro Freekick Frenzy",
        "url": "https://html5.gamemonetize.com/xw0lx0mol959ec8vy6mj5mg06y8h2f20/",
        "text": "Get ready to experience the ultimate thrill of free-kick frenzy in Euro Freekick Frenzy! Put your precision and timing to the test in this high-intensity penalty-kick based soccer game with a twist. In this adrenaline-fueled competition, scoring early goals is key as they hold higher value than goals scored later in the game. With precise control over your target using a combination of horizontal and vertical direction controls fixed by pressing SPACE, every kick requires skill and finesse. Can you master the art of the perfect free-kick and lead your team to victory?"
    },
    {
        "index": 73,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ww9kzir5202mimwipvq5fwziveg0fzi5/512x384.jpg",
        "name": "Noob vs Pro Chicken",
        "url": "https://html5.gamemonetize.com/ww9kzir5202mimwipvq5fwziveg0fzi5/",
        "text": "Are you ready to compete with your friend in this adventure? One of you will be a NOOB, and the other will be a PRO. The player who collects the fastest chickens will win. To win this fun competition, you need to collect all the chickens before your friend does. Gather the chickens and bring them to the coop to win. The player who collects the fastest chickens wins the game. Be careful, the chickens are very fast and may escape, so catching them will be a bit challenging. Play with your friend and win this fun competition."
    },
    {
        "index": 74,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qbt2cmlqn6ia2t1dss5tm6kuzpfq7ovi/512x384.jpg",
        "name": "Poler Match",
        "url": "https://html5.gamemonetize.com/qbt2cmlqn6ia2t1dss5tm6kuzpfq7ovi/",
        "text": "Poler Match is an electrifying puzzle game that challenges players to connect circuits and light up bulbs using limited moves. Set in a futuristic neon world, players must strategically connect energy sources to light up all the bulbs on each level. With increasingly complex puzzles, Poler Match offers hours of brain-teasing fun, testing your logic and problem-solving skills."
    },
    {
        "index": 75,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dhr00x5lotec0haavfstc5gmy8p1b6ue/512x384.jpg",
        "name": "Fashion Battle for Survival",
        "url": "https://html5.gamemonetize.com/dhr00x5lotec0haavfstc5gmy8p1b6ue/",
        "text": "In this puzzle game you have to test your memory by guessing the cards in pairs. Each correctly guessed pair brings you closer to winning the game round. And each successfully completed round opens the doors to the world of fashion, allowing you to dress up the main character of the game - an Asian beauty with a daring character. Collect a complete collection of hairstyles and clothing items for the girl that will emphasize her personality. Remember that the time to complete the round is limited by a timer."
    },
    {
        "index": 76,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/i2u9l4ki42txwifuy15pfy71w2vji3s6/512x384.jpg",
        "name": "CANDY DREAM",
        "url": "https://html5.gamemonetize.com/i2u9l4ki42txwifuy15pfy71w2vji3s6/",
        "text": "Welcome to Candy Dream, the ultimate candy matching puzzle adventure! Dive into a world filled with delicious candies and embark on a sweet journey through various levels packed with fun and challenging puzzles. Match and collect different candies to progress through levels, achieve high scores, and unlock special power-ups. With its vibrant graphics and engaging gameplay, Candy Dream is perfect for players of all ages who love a sweet challenge."
    },
    {
        "index": 77,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t5c480dikv2812p9xfjhn0vud0yf684b/512x384.jpg",
        "name": "Clicker Time Game",
        "url": "https://html5.gamemonetize.com/t5c480dikv2812p9xfjhn0vud0yf684b/",
        "text": "In this game, you have 30 seconds to make as many clicks as you can! All you have to do is click on the screen or mouse. You can track your clicks per second and see your total best clicks. Its a very simple yet addictive game and a great way to challenge yourself while having fun. Perfect for a quick, entertaining break!"
    },
    {
        "index": 78,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rhzt2oifywtesbedt3qfgcvjblufbqej/512x384.jpg",
        "name": "Santa Fake Call",
        "url": "https://html5.gamemonetize.com/rhzt2oifywtesbedt3qfgcvjblufbqej/",
        "text": "Santa Fake Call is a fun and interactive game that lets you fake call, video call, and text with Santa! Tap to see the surprise from santa-claus."
    },
    {
        "index": 79,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fvzr892y3w3n3sa4p98dbwdw08lht8m6/512x384.jpg",
        "name": "SpongeBob Find The Differences",
        "url": "https://html5.gamemonetize.com/fvzr892y3w3n3sa4p98dbwdw08lht8m6/",
        "text": "Dive into the underwater fun with Sponge Find The Differences, a thrilling puzzle game inspired by the lovable world of SpongeBob! Challenge your observation skills as you explore 30 exciting levels filled with colorful and quirky scenes. Can you spot all the differences between two seemingly identical images before time runs out? 30 Levels of engaging find the difference puzzles. Timed Challenges to test your focus and speed. Vibrant visuals inspired by underwater adventures. Suitable for all ages &amp;ndash; fun for the whole family!"
    },
    {
        "index": 80,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pn2lkci8w2ty65o0ivrn9qguwjmj68mh/512x384.jpg",
        "name": "Block Puzzle 2048 Game",
        "url": "https://html5.gamemonetize.com/pn2lkci8w2ty65o0ivrn9qguwjmj68mh/",
        "text": "Block Puzzle 2048 Game is a puzzle game that combines 2048 and merged cubes. Combine the corresponding numbers and the number of squares as required. The higher the level, the greater the difficulty, which requires your brainstorming! Can you pass the level without props? Props are limited!"
    },
    {
        "index": 81,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nlf6fa3jwf6tc9xiv7h1scifx73ek2aa/512x384.jpg",
        "name": "Snowball The Cat Christmas Fun",
        "url": "https://html5.gamemonetize.com/nlf6fa3jwf6tc9xiv7h1scifx73ek2aa/",
        "text": "Welcome to the difficult and distant world of the brave Snowball the Cat. will start your adventure! In this Christmas fun game, Snowball the Cat will start your adventure! Snowball the Cat is lost and needs your help to find his way home in time for dinner. And on the way home, you need catch all the birds and rats of their world. Find the key and go through the door that leads to a new level!"
    },
    {
        "index": 82,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cln4ti44d79qau30tqotnngfoedbm1gb/512x384.jpg",
        "name": "Hidden Objects Bakery",
        "url": "https://html5.gamemonetize.com/cln4ti44d79qau30tqotnngfoedbm1gb/",
        "text": "Explore 6 charming bakery shops in this fun hidden object game! With 24 exciting levels, find 6 hidden bakery items in each shop before time runs out. Perfect for all ages, enjoy the challenge and discover delicious treats in every corner. Can you find them all before time runs out?"
    },
    {
        "index": 83,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0y53x0g8e50ny0k6g99p4cv3x0sqfe4i/512x384.jpg",
        "name": "Talking Tom Coloring Books",
        "url": "https://html5.gamemonetize.com/0y53x0g8e50ny0k6g99p4cv3x0sqfe4i/",
        "text": "Get ready for a fun and creative journey with Tom Coloring Book! Explore 20 delightful levels featuring the lovable Tom and his charming companion Angela. This exciting coloring game is perfect for kids and adults alike, offering a relaxing way to bring your favorite characters to life with vibrant colors and your artistic flair. With an easy-to-use interface and a variety of coloring tools, you can create unique masterpieces while spending time with Tom and Angela in their playful world. Let your imagination run wild and enjoy hours of creative fun!"
    },
    {
        "index": 84,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tgsetdb6p6hq5xt6a1uz2se32gfjeo4l/512x384.jpg",
        "name": "2 Player Online Chess",
        "url": "https://html5.gamemonetize.com/tgsetdb6p6hq5xt6a1uz2se32gfjeo4l/",
        "text": "Jump into the timeless fun of chess with 2 Player Online Chess! Play solo against the computer or team up with a friend for a match in 2 Player mode. With a simple, easy-to-use design, it&amp;rsquo;s all about having a great time while sharpening your skills. Ready to make your first move? Let the game begin!"
    },
    {
        "index": 85,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wzvqulczdz8mc9ylbllloe3cnfx4wzo3/512x384.jpg",
        "name": "Christmas Clicker Game",
        "url": "https://html5.gamemonetize.com/wzvqulczdz8mc9ylbllloe3cnfx4wzo3/",
        "text": "Click to your hearts content in this holiday-themed version of Super Clicker Game! With a festive Christmas atmosphere, enjoy snowy backgrounds, twinkling lights, and holiday music as you track your clicks per second (CPS) and total clicks. It&amp;rsquo;s a simple and fun game made even more exciting with Christmas cheer! Keep clicking and beat your record while enjoying the cozy holiday vibes."
    },
    {
        "index": 86,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ekpksdkqxeysgtua9ji2d1uv27ajtpwt/512x384.jpg",
        "name": "Classic Hang Wordplay",
        "url": "https://html5.gamemonetize.com/ekpksdkqxeysgtua9ji2d1uv27ajtpwt/",
        "text": "Classic Hang Wordplay is a timeless twist on the classic hangman game! Test your word-solving skills with a variety of categories and difficulty levels. Guess letters to reveal the secret word before your hangman gets completed. Enjoy challenging yourself or play with friends in this fun and educational word game. Web Dev &lt;a href='https://www.coolcrazygames.com/'&gt;https://www.coolcrazygames.com/&lt;/a&gt;"
    },
    {
        "index": 87,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4ffxennbgf8psg1sermfk67g3ydqhq0r/512x384.jpg",
        "name": "Sprunki Clicker Game",
        "url": "https://html5.gamemonetize.com/4ffxennbgf8psg1sermfk67g3ydqhq0r/",
        "text": "In Sprunki Clicker, youve got 60 seconds to make as many clicks as possible to make a great score. The faster you click, the more loot you uncover! Keep an eye out for special time bonuses that can extend your run and boost your score. How much clicks can you make before times up? Its a simple Spunki thrilling game for the fastest clickers!"
    },
    {
        "index": 88,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/izvsssakmeknfnpk19hdpk0a7e3gudwn/512x384.jpg",
        "name": "Santa Girl Running",
        "url": "https://html5.gamemonetize.com/izvsssakmeknfnpk19hdpk0a7e3gudwn/",
        "text": "Go Santa Girl, run! The daughter of Santa Claus has a task, and it is to collect all present gifts in North Pole that are scattered. But be careful, there are lot of enemies, challenges, and obstacles along the way. Your goals are to collect gifts on your way but avoid all the deadly obstacles to the finish line. You will collect the sleigh power up to blast through walls. Go to your goal right now and run, remember to collect sleigh bonuses, and make sure that you will do all the best of your abilities and jumping skills, to make this adventure even more exciting!"
    },
    {
        "index": 89,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/oo4uv2pkn1qdilhyyi5bugtx35dljgcs/512x384.jpg",
        "name": "Toca Find The Differences",
        "url": "https://html5.gamemonetize.com/oo4uv2pkn1qdilhyyi5bugtx35dljgcs/",
        "text": "Dive into a fun and colorful world of puzzles with Toca Find The Differences, inspired by the creativity and charm of the popular Toca Boca games! This game offers an exciting way to sharpen your observation skills while exploring vibrant and engaging scenes. Features: Three Difficulty Levels: Choose from Easy, Medium, or Difficult levels, catering to players of all ages and skill levels. Creative and Unique Scenes: Explore playful and whimsical settings filled with delightful details. Addictive Gameplay: Spot the differences between two similar pictures before time runs out!"
    },
    {
        "index": 90,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/giot1874bxde80idjmxs1npskcj1nava/512x384.jpg",
        "name": "Ellie Christmas Makeup",
        "url": "https://html5.gamemonetize.com/giot1874bxde80idjmxs1npskcj1nava/",
        "text": "Experience the joy of festive makeovers with the Ellie Christmas Makeup game! This fun, holiday game lets you guide Ellie to create three Christmas-themed makeup looks: Candy Cane Queen, Christmas Queen, and iconic character-inspired. Perfect for makeup lovers and enthusiasts of holiday-themed games alike, this girl game takes you on a journey filled with creativity, color, and Christmas cheer! Craft Ellies look using assorted eyeshadows, lipsticks, patterned blushes, accessories, and more. Get ready for a holly jolly transformation!"
    },
    {
        "index": 91,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cos8jycvrmpcaiobfswp3db2ixyskgql/512x384.jpg",
        "name": "WinterWonder Symbol Merge",
        "url": "https://html5.gamemonetize.com/cos8jycvrmpcaiobfswp3db2ixyskgql/",
        "text": "Dive into the enchanting world of WinterWonder Symbol Merge, a festive puzzle adventure where your fingertips guide the merry merging of Christmas magic. Swipe and match identical tiles to unlock the merry symbols hidden in the game. Playing is easy: Swipe to connect 2 or more identical symbols. But be careful that there are always possible matches, otherwise you lose! Experience the joy of merging Christmas elements, from snowflakes to merry baubles. Dive into the merry challenge and let the festive merging begin in WinterWonder Symbol Merge!"
    },
    {
        "index": 92,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/q8go7h1v2v6jwc27krjrrr1wk07hzfj8/512x384.jpg",
        "name": "Flappy Santa Claus",
        "url": "https://html5.gamemonetize.com/q8go7h1v2v6jwc27krjrrr1wk07hzfj8/",
        "text": "Flappy Santa Claus is a fun and festive arcade game that will put you in the holiday spirit! Guide Santa Claus as he flies on his magical sleigh, dodging obstacles and collecting gifts. Tap the screen to keep Santa in the air, navigate through snowy pipes, and rack up points. The game is perfect for players of all ages, combining simple one-tap controls with a challenge that&amp;rsquo;s hard to master. It&amp;rsquo;s easy to learn but offers endless fun as you try to beat your high score!"
    },
    {
        "index": 93,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t1qdsz3i1yd886wwi69nmgzucb6m7etz/512x384.jpg",
        "name": "Super Dog Hero Dash",
        "url": "https://html5.gamemonetize.com/t1qdsz3i1yd886wwi69nmgzucb6m7etz/",
        "text": "Super Dog Hero Dash is an interesting 3D running game with endless adventure and fun! You&amp;rsquo;ll become a brave dog hero running through a colorful city in this cartoonish world. Begin exciting challenges across various platforms!"
    },
    {
        "index": 94,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zbnxhs1adn93q3a3cls2uanq7ivzoa6p/512x384.jpg",
        "name": "Swipe and Clear",
        "url": "https://html5.gamemonetize.com/zbnxhs1adn93q3a3cls2uanq7ivzoa6p/",
        "text": "Swipe and Clear is a challenging and addictive puzzle game that puts your strategic skills to the test! In each level, you&amp;rsquo;ll face a grid filled with scattered colorful blocks. Your goal is simple: drag and move the blocks to form matches of 3 or more of the same color, making them disappear. But beware! If a single block of any color is left behind, the level will restart. Plan every move carefully to clear all the blocks and progress through 20 uniquely designed levels. With intuitive mechanics and engaging puzzles, Swipe and Clear will keep you thinking and entertained for hours!"
    },
    {
        "index": 95,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ypk4vwpjaia00rdje91pp17emhjv3tmb/512x384.jpg",
        "name": "Nubiks build a defense vs zombies",
        "url": "https://html5.gamemonetize.com/ypk4vwpjaia00rdje91pp17emhjv3tmb/",
        "text": "Nubiks build a defense vs zombies - a game with elements of construction and survival. Build defenses and survive against waves of zombies! Who will be eaten first? The game has a single player mode. But the whole game is focused on a two-person mode, and all the fun is there, so lets call friends and have fun!"
    },
    {
        "index": 96,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gvfdczltlaud6ornrsjwyogtvz74ydri/512x384.jpg",
        "name": "Soccer Clicker Game",
        "url": "https://html5.gamemonetize.com/gvfdczltlaud6ornrsjwyogtvz74ydri/",
        "text": "Step onto the pitch! In this match, all you have to do is score goals by clicking on the screen or mouse! Track your goals per second and your total goals as you aim to dominate the field. The clock is set to 45 seconds, and every few seconds, youll get a time bonus to boost your score. Can you become the ultimate striker? Its a simple and fun game - perfect for soccer fans!"
    },
    {
        "index": 97,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8s1gh7ir8ry54goeg8ls6l6qn834rysx/512x384.jpg",
        "name": "Kids Guitar Music Time",
        "url": "https://html5.gamemonetize.com/8s1gh7ir8ry54goeg8ls6l6qn834rysx/",
        "text": "Kids Guitar Music Time is a delightful and free online game designed especially for kids! Enjoy playing the guitar, customize its look to match your style, and even sort some letter boxes along the way. Its all about creativity and fun! Dive in and start playing today!"
    },
    {
        "index": 98,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ndquyizxi4o6ba8w9pocs35ikjovf7si/512x384.jpg",
        "name": "Permutation Transport",
        "url": "https://html5.gamemonetize.com/ndquyizxi4o6ba8w9pocs35ikjovf7si/",
        "text": "In this game, there are 9 card slots and each slot can hold 12 fruits. Various fruits are randomly generated. When a card slot is filled with the same kind of fruit, it can be transported away by a truck. The goal is to reach the target number of transportation trips to win the game. It challenges your strategic planning and management skills as you arrange and transport fruits efficiently to achieve victory."
    },
    {
        "index": 99,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9llrfmi4nkeek3mtwv0cnnbkfap3tj7y/512x384.jpg",
        "name": "Level Demon",
        "url": "https://html5.gamemonetize.com/9llrfmi4nkeek3mtwv0cnnbkfap3tj7y/",
        "text": "Get ready to embark on the ultimate gaming adventure with Level Demon! Dive into a world filled with thrilling levels, mind-bending puzzles, and relentless challenges that will test your skills to the limit."
    },
    {
        "index": 100,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p3d8xqiumpzddfpd7d55jiiv13a54o71/512x384.jpg",
        "name": "Cop Run 3d",
        "url": "https://html5.gamemonetize.com/p3d8xqiumpzddfpd7d55jiiv13a54o71/",
        "text": "Cop Run 3D is an arcade-style parkour game that brings you on an exciting chase adventure! In this 3D game world, youll play as a cop, running and jumping through the city streets. Avoid obstacles, and collect various rewards!"
    },
    {
        "index": 101,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/w9h0ox73ecodjfss7y26nqxyrntaz37c/512x384.jpg",
        "name": "Zombie Survival Escape USA",
        "url": "https://html5.gamemonetize.com/w9h0ox73ecodjfss7y26nqxyrntaz37c/",
        "text": "With this entertaining game you will have to run throughout the city, run and shoot because the zombies are fast and dangerous, they will not stop chasing you to devour you.The zombie apocalypse has arrived and the terror of surviving has arrived with this new game. Zombie Survival Escape USA is a 3D game with impressive and realistic graphics that will make your hair stand on end and you will feel the true fear of being devoured."
    },
    {
        "index": 102,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/plnt97wgr1109zx7wo0dengs210ihdyt/512x384.jpg",
        "name": "Sausage Game",
        "url": "https://html5.gamemonetize.com/plnt97wgr1109zx7wo0dengs210ihdyt/",
        "text": "Sausage Flip is a fun arcade game that lets you fling a silly sausage with googly eyes! To play, just drag your finger or mouse back to aim, then let go to shoot your sausage into the air"
    },
    {
        "index": 103,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nzbgv7nqrxacjg5d0lfl2zx24v90vmpv/512x384.jpg",
        "name": "Sprunki Jigsaw",
        "url": "https://html5.gamemonetize.com/nzbgv7nqrxacjg5d0lfl2zx24v90vmpv/",
        "text": "Sprunki Jigsaw is a free online jigsaw puzzle game. You can choose one of fifteen images and then select one of the four modes (16, 36, 64 and 100 pieces). Select your favorite picture and complete the jigsaw in the shortest time possible! Have fun and enjoy!"
    },
    {
        "index": 104,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/z5n072q7gj0w969r5ul4ignnxe0fzsun/512x384.jpg",
        "name": "Cookie Clicker : clicker games",
        "url": "https://html5.gamemonetize.com/z5n072q7gj0w969r5ul4ignnxe0fzsun/",
        "text": "Play Cookie Clicker Online for Free,Its an incredibly fun game where your goal is to bake as many cookies as possible. You start by clicking to produce cookies, and then you can unlock exciting upgrades and achievements to increase your baking speed! If you enjoy games that keep you engaged and wanting to come back for more, Cookie Clicker is an excellent choice for you To become a master cookie maker, its essential to understand how the game works and to implement the best strategies. This guide will provide you with all the basics you need to get started"
    },
    {
        "index": 105,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cmtzbjqrvj0phn80gxdsoxsu8gcmijv5/512x384.jpg",
        "name": "Xmas Presents Mahjong",
        "url": "https://html5.gamemonetize.com/cmtzbjqrvj0phn80gxdsoxsu8gcmijv5/",
        "text": "Match three of the same tiles. Click on a tile to move it to the collection spots at the bottom. If you have collected three of the same tiles there, they will be removed."
    },
    {
        "index": 106,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ltudt7xim7febwgerrkzf13rt8jhb0xw/512x384.jpg",
        "name": "Toca Life Coloring Book",
        "url": "https://html5.gamemonetize.com/ltudt7xim7febwgerrkzf13rt8jhb0xw/",
        "text": "Unleash your creativity with Toca Life Coloring Book, a vibrant and engaging coloring game inspired by the whimsical world of Toca Boca Life! Dive into 20 delightful levels filled with charming characters and captivating scenes, designed to spark your imagination and bring your artwork to life. Perfect for kids and adults, Toca Life Coloring Book offers a relaxing and fun way to express yourself through color. Whether you&amp;rsquo;re exploring playful worlds or adding your personal touch to adorable characters, the possibilities are endless!"
    },
    {
        "index": 107,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cyutrw1qu2iev4482clsbx4yrj0fsy2r/512x384.jpg",
        "name": "Farm Tiles Harvest",
        "url": "https://html5.gamemonetize.com/cyutrw1qu2iev4482clsbx4yrj0fsy2r/",
        "text": "Experience top-rated farm-themed tile matching in Farm Tile Harvest! Draw up to 9 tiles featuring fruits, veggies, and tools in a quaint countryside setting. Match three identical tiles to clear them and avoid ending the game by drawing the 9th tile. Shuffle to reveal hidden tiles and race against the clock. Harvest all the crops! Play Farm Tile Harvest on lofgames.com."
    },
    {
        "index": 108,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5f9qej2bjoo8fz7adojidf7vu0rdaqrb/512x384.jpg",
        "name": "Piano simulator online",
        "url": "https://html5.gamemonetize.com/5f9qej2bjoo8fz7adojidf7vu0rdaqrb/",
        "text": "Piano Simulator Online is a musical game, on the desktop you play using a letters keyboard, and on touch-screen devices use your fingers. Also, you can record what you play only on desktop devices and download it in any format you like."
    },
    {
        "index": 109,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jdoc54g6b199hg3sb6ysoef165k5i93w/512x384.jpg",
        "name": "Advanced Green Clicker Game",
        "url": "https://html5.gamemonetize.com/jdoc54g6b199hg3sb6ysoef165k5i93w/",
        "text": "Click to earn coins, submit your high score, and compete for the top rank! View and refresh the leaderboard to see how you stack up against other players. Add your name only the first time you play. Keep clicking to improve your score and challenge others for the #1 spot. Who will rise to the top?"
    },
    {
        "index": 110,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cmh9kth9kooc0khga3xgq5f6rvspf2mt/512x384.jpg",
        "name": "Colors Clicker Game",
        "url": "https://html5.gamemonetize.com/cmh9kth9kooc0khga3xgq5f6rvspf2mt/",
        "text": "In this game, all you have to do is click on the screen or mouse. You can see your clicks per second and your total clicks. Its a very simple game."
    },
    {
        "index": 111,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ttd3uhgfyfzzf3p70i0zr6edb9im0lfa/512x384.jpg",
        "name": "Brawl Stars Coloring Books",
        "url": "https://html5.gamemonetize.com/ttd3uhgfyfzzf3p70i0zr6edb9im0lfa/",
        "text": "Unleash your creativity with Brawl Stars Coloring Book! Dive into a colorful adventure featuring 20 exciting levels packed with your favorite characters inspired by Brawl Stars. Perfect for fans of coloring games and battle-themed fun, this game lets you bring your imagination to life as you fill in each character with vibrant colors of your choice. Choose from a variety of brushes, tools, and a rich palette of colors to customize each design. Whether you&amp;rsquo;re a seasoned artist or just looking for relaxing fun, Battle Stars Coloring Book offers endless entertainment for all ages."
    },
    {
        "index": 112,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zovn2qqvlxcealoc9nbtj78blzmccbxl/512x384.jpg",
        "name": "Friends Battle Knock Down",
        "url": "https://html5.gamemonetize.com/zovn2qqvlxcealoc9nbtj78blzmccbxl/",
        "text": "In this adventure, two fighting friends need to push each other off a cliff. In this fun game, push your friend off the cliff. To throw them off, just push them. Be careful as TNT falls from the sky, and if it explodes, it can knock you down too. Avoid the TNT to stay safe and win the game by being the one who knocks the most enemies down."
    },
    {
        "index": 113,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/98ieb2tvbgxy6pqt17bdkww2gh2e5dcw/512x384.jpg",
        "name": "Crazy Christmas Fun",
        "url": "https://html5.gamemonetize.com/98ieb2tvbgxy6pqt17bdkww2gh2e5dcw/",
        "text": "Christmas adventure game, many balloons have invaded the North Pole, and Santa must run to catch the gifts. But Santa changed his sleigh, and he is now fast and furious! He and his reindeer need your help! Your task is to fly through the sky dodging obstacles and collecting gifts. Once you reach the Christmas tree you will level up! Have Fun!"
    },
    {
        "index": 114,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yh3wzyq425bal5d753p5fl0or0itaj8e/512x384.jpg",
        "name": "Enemy AirShot",
        "url": "https://html5.gamemonetize.com/yh3wzyq425bal5d753p5fl0or0itaj8e/",
        "text": "Prepare for high-flying action in Enemy AirShot! Take control of advanced anti-aircraft weaponry as you defend your territory from a relentless aerial assault. Engage in heart-pounding dogfights against enemy aircraft, strategically aiming and firing to protect your skies. With stunning visuals, realistic physics, and a variety of powerful weapons at your disposal, Enemy AirShot delivers an adrenaline-pumping experience. Test your reflexes and tactical skills to survive wave after wave of airborne threats. Can you become the ultimate sky defender?"
    },
    {
        "index": 115,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/39ypfvhxe3j3zzbixcetxhinn0cs4ze1/512x384.jpg",
        "name": "Roblox Draw to Escape Online",
        "url": "https://html5.gamemonetize.com/39ypfvhxe3j3zzbixcetxhinn0cs4ze1/",
        "text": "Have fun drawing your way to the goal in Roblox Draw to Escape Online, an entertaining casual game where you can use your imagination to solve the problems in each level. Draw the platforms, or blocks for the obstacles and get to the end of each level. Keep in mind that you have a time limit to get there. With each level you can collect coins, and with each star discovered, you can earn some extra coins when you complete your level. Check each level carefully because you will come across objects that can disappear or explode and eliminate you."
    },
    {
        "index": 116,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jp9eeo31qfpkx19s3o6w5u0vjk9115xg/512x384.jpg",
        "name": "Retro Santa",
        "url": "https://html5.gamemonetize.com/jp9eeo31qfpkx19s3o6w5u0vjk9115xg/",
        "text": "In this exciting game, Santa Claus runs and jumps to recover the lost gifts from his sack. Along the way, two enemies throw stones at him, which Santa must skillfully avoid. The goal is to survive as long as possible while collecting all the fallen gifts. Occasionally, eating a fruit will restore some of Santas energy, helping him to continue his journey. The faster you act, the more gifts you collect, but beware of the enemies attacks! Can you help Santa recover all the presents and save Christmas?"
    },
    {
        "index": 117,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4q6u7fh9mk90ajsomr5be9supycqkg1l/512x384.jpg",
        "name": "Bffs E Girl vs Soft Girl",
        "url": "https://html5.gamemonetize.com/4q6u7fh9mk90ajsomr5be9supycqkg1l/",
        "text": "Welcome to BFFs E Girl Vs Soft Girl. Ellie and her friends love to try a new fashions. Everyone is talking about the Soft Girl and the E-girl style nowadays, which are the trending fashion styles preferred by teens worldwide. Both are trendy and have opposite aesthetics. The Soft Girl style embraces the girly girl look, sweet and cute, wearing lots of pinks. Ellie and her friends will explore both styles and you must help them out by creating their Soft Girl versus E-girl look!"
    },
    {
        "index": 118,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/su9js9cbxsemfqtnx7c4gm2v33g88amk/512x384.jpg",
        "name": "Triple Tile Match Fever Game",
        "url": "https://html5.gamemonetize.com/su9js9cbxsemfqtnx7c4gm2v33g88amk/",
        "text": "In Triple Tile Match Fever Game, your goal is simple yet captivating: match three or more tiles to clear them from the board. The engaging tile-matching puzzle game that will immerse you in a world of triple tile challenges and brain-teasing fun."
    },
    {
        "index": 119,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rknengrq9tntzjn84bsav8hlq1x2o50t/512x384.jpg",
        "name": "Santa Dash",
        "url": "https://html5.gamemonetize.com/rknengrq9tntzjn84bsav8hlq1x2o50t/",
        "text": "Join Santa on a thrilling dash through snowy landscapes! Help him collect coins and avoid obstacles in this festive and fun endless runner game. With simple controls and charming graphics, Santa Dash is perfect for players of all ages. Get ready to spread holiday cheer and see how far you can go!"
    },
    {
        "index": 120,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lyvvl1x30cqyuurfg52g4i7xt9d03mos/512x384.jpg",
        "name": "Anime Witchcraft",
        "url": "https://html5.gamemonetize.com/lyvvl1x30cqyuurfg52g4i7xt9d03mos/",
        "text": "Do you want to become a witch? Try Anime Witchcraft Mix Ingredients to make your ideal anime pictures, use 2 combinations to get more result, 3 combinations most of the time get no result. By mixing 2 ingredients you can craft your anime. Can you get all the pictures?"
    },
    {
        "index": 121,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/61ur3yqtjcj0hzv0wgrf5jakent38u03/512x384.jpg",
        "name": "Granny House Escape",
        "url": "https://html5.gamemonetize.com/61ur3yqtjcj0hzv0wgrf5jakent38u03/",
        "text": "Enter the spine-chilling world of Granny House Escape, a 3D horror game where your mission is to escape a creepy house controlled by an angry, evil Granny. Search for keys to unlock rooms, each leading to more keys and greater challenges as you try to find your way out. In Granny House Escape, tense game play and eerie visuals create an atmosphere of constant fear. Use your wits to hide from Granny, avoid her wrath, and stay one step ahead as you explore the haunted house. Can you collect all the keys and escape before its too late? Download Granny House Escape now and face your fears!"
    },
    {
        "index": 122,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/k0372lchijqv0ta15ylqjdv1ban0id0f/512x384.jpg",
        "name": "Shape of Shadow",
        "url": "https://html5.gamemonetize.com/k0372lchijqv0ta15ylqjdv1ban0id0f/",
        "text": "Shape of Shadow is a thrilling puzzle-platformer where players navigate a world cloaked in darkness. Using light and shadow manipulation, you must solve intricate puzzles and traverse treacherous landscapes. Transform shadows into solid platforms, reveal hidden paths, and outsmart shadowy foes. With stunning visuals and a captivating storyline, Shape of Shadow challenges your wits and reflexes in an immersive adventure that brings light to the darkest corners."
    },
    {
        "index": 123,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/vqhi6n4h4rifpx7a87m9d3kzzwo8njm0/512x384.jpg",
        "name": "Horror Eyes Escape",
        "url": "https://html5.gamemonetize.com/vqhi6n4h4rifpx7a87m9d3kzzwo8njm0/",
        "text": "Step into a chilling world of terror in Horror Eyes Escape, a spine-tingling horror adventure where the past refuses to stay buried. Explore two haunting locations&amp;mdash;a desolate morgue and a shadowy school&amp;mdash;each filled with unspeakable horrors. Encounter the restless spirit of a vengeful dead woman and evade the clutches of savage cannibal enemies lurking in the shadows. With every corner you turn, a new nightmare awaits. Solve sinister puzzles, unravel dark secrets"
    },
    {
        "index": 124,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/by0a117lf3xqsxizyuwe554wt5z5k9wj/512x384.jpg",
        "name": "Wrench Unlock Puzzle",
        "url": "https://html5.gamemonetize.com/by0a117lf3xqsxizyuwe554wt5z5k9wj/",
        "text": "In this captivating journey, multiple wrenches perform an intricate dance with numerous screws, requiring both nimble coordination and clever sequencing. Step into the role of the unscrewing master, adding your unique flair to each stage and advancing through a series of thrilling challenges. Web Dev &lt;a href='https://www.funcrazygames.com/'&gt;https://www.funcrazygames.com/&lt;/a&gt;"
    },
    {
        "index": 125,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9est4un0uh2xttklnhwgj59jddfp197a/512x384.jpg",
        "name": "Doctor Foot Kids",
        "url": "https://html5.gamemonetize.com/9est4un0uh2xttklnhwgj59jddfp197a/",
        "text": "Ouch! My feet hurt! Can you help me, doctor? I know you have the best tools to make them feel better. Your foot doctor place has cute patients and free medical tools. Plus, you can give out free gifts to make patients feel better."
    },
    {
        "index": 126,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y7ha45y5tsd8ses04wblim7ovs73s3kh/512x384.jpg",
        "name": "4 Colors Card Mania",
        "url": "https://html5.gamemonetize.com/y7ha45y5tsd8ses04wblim7ovs73s3kh/",
        "text": "4 Colors Card Mania is a thrilling and fast-paced card game inspired by the uno gameplay. Challenge against AI opponents in this colorful and strategic showdown. Can you outwit your opponents and become the 4 Colors Card Mania champion? Shuffle the deck, deal the cards, and get ready for a colorful adventure! Match Colors and Numbers: Play your cards by matching their color or number to the one on the discard pile. Special Action Cards: Use cards like Reverse, Skip, Draw Two, and Wild to outsmart your opponents. Strategic Play: Plan your moves carefully and keep an eye on your opponents&amp;rsquo; cards."
    },
    {
        "index": 127,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gg1mo6y9a8lbe4vr5wvtqa9c1n6bo3zm/512x384.jpg",
        "name": "Super Girls Ready To Adventure",
        "url": "https://html5.gamemonetize.com/gg1mo6y9a8lbe4vr5wvtqa9c1n6bo3zm/",
        "text": "Welcome to Super Girls Ready To Adventure. Winx Girls loves magical and adventurous fashion. They planned to participate in superheroes cosplay events. Help them to pick some interesting Outfits. Browse their wardrobe for cute outfits and pick a suitable outfit for each one. Don&amp;rsquo;t forget try unique hairstyles and accessories. Play and have fun!"
    },
    {
        "index": 128,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/08g52hfq31xhdc73b4dr3zm6254ci1lq/512x384.jpg",
        "name": "Santa Stick",
        "url": "https://html5.gamemonetize.com/08g52hfq31xhdc73b4dr3zm6254ci1lq/",
        "text": "Join Santa in Santa Stick, an exciting HTML5 game where precision is key! Help Santa cross from one platform to another by stretching his magical stick to the perfect length. Be careful if the stick is too short or too long, Santa will tumble into the abyss, and the journey ends! This endless challenge gets harder with every step, testing your timing and skill. Earn points for each successful crossing and aim for the highest score. How far can you go? Play Santa Stick and find out in this fun, addictive game for all ages!"
    },
    {
        "index": 129,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/24yyt4by983swdw4kro3p9qngpbpqwb2/512x384.jpg",
        "name": "Unicorn Find The Differences",
        "url": "https://html5.gamemonetize.com/24yyt4by983swdw4kro3p9qngpbpqwb2/",
        "text": "Unicorn Find The Differences is a magical spot-the-difference game designed to test your observation skills and bring a bit of fantasy into your day! Each level offers beautifully crafted images with subtle differences that make every game exciting and engaging. Perfect for both kids and adults, this game is a delightful way to relax, challenge your attention to detail, and enjoy charming unicorn illustrations. See if you can spot all the differences and reach the next level of mythical fun!"
    },
    {
        "index": 130,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mkyrvvrsq6dwa4dw8ir279utxymumt4u/512x384.jpg",
        "name": "Super Wuggy",
        "url": "https://html5.gamemonetize.com/mkyrvvrsq6dwa4dw8ir279utxymumt4u/",
        "text": "Welcome to Super Wuggy Adventure! Embark on an exciting journey through the jungle and other worlds. Run, jump, and avoid obstacles and enemies along the way. Collect fruits and coins to purchase bullets and extra lives. Explore a variety of challenging levels and aim to complete them all. Get ready for hours of fun and adventure!"
    },
    {
        "index": 131,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/q2fw7p70k4lir0gee4af5jssenoa2kts/512x384.jpg",
        "name": "Fruit Merge : Juice Jumble",
        "url": "https://html5.gamemonetize.com/q2fw7p70k4lir0gee4af5jssenoa2kts/",
        "text": "Instructions: Drop fruits into the box and merge two of the same fruit to create a larger one! Click and drag to move the fruit to your desired spot, then release to let it fall into place and combine with any matching fruit below. Goal: Score as high as possible by merging fruits. When the box fills up, it&amp;rsquo;s game over! Tips for Success: Keep Similar Fruits Together: Position larger fruits close to each other. For example, if a pear and cherry are adjacent, dropping another pear could trigger a chain reaction."
    },
    {
        "index": 132,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yd58zz6o7w850i70ck0ifktf73buc8wh/512x384.jpg",
        "name": "SantaGames",
        "url": "https://html5.gamemonetize.com/yd58zz6o7w850i70ck0ifktf73buc8wh/",
        "text": "Santas Games is a fun, action-packed game thats perfect for the whole family! Tap the balloons on your screen to pop them - dont let them float away! Help Santa Claus burst as many Christmas balloons as possible in this addictive holiday challenge. With simple controls and a cheerful festive vibe, youll find it hard to stop playing. Enjoy endless fun while spreading the holiday spirit! Get into the Christmas mood, pop balloons, and make this season even more joyful. Ready to join Santa? Let&amp;rsquo;s play!"
    },
    {
        "index": 133,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qw1dtdsdhq3cgjs60aa29g3y6cguwapv/512x384.jpg",
        "name": "Christmas Find The Differences",
        "url": "https://html5.gamemonetize.com/qw1dtdsdhq3cgjs60aa29g3y6cguwapv/",
        "text": "Get into the festive spirit with Christmas Find The Differences, the ultimate holiday-themed puzzle game! Test your observation skills as you compare two seemingly identical pictures filled with Christmas cheer. Spot all the differences in magical settings featuring Christmas trees, snowy landscapes, stockings, and Santa himself!"
    },
    {
        "index": 134,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wqokz2j4q2iqsmhfgy1ablq82cxpmcvo/512x384.jpg",
        "name": "Sprunki PopIt",
        "url": "https://html5.gamemonetize.com/wqokz2j4q2iqsmhfgy1ablq82cxpmcvo/",
        "text": "Sprunki PopIt: The Ultimate Bubble-Popping Adventure! Get ready for hours of bubbly fun with Sprunki PopIt, the free-to-play online game that kids everywhere are going crazy for! It&amp;rsquo;s fast, colorful, and packed with exciting challenges. Your goal? Pop all the bubbles, dodge obstacles, and conquer level after level of pure popping chaos!"
    },
    {
        "index": 135,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ffzll2njchqkdk5r5hdye8jlia072qr6/512x384.jpg",
        "name": "Hero Bounce",
        "url": "https://html5.gamemonetize.com/ffzll2njchqkdk5r5hdye8jlia072qr6/",
        "text": "Hero Bounce is an engaging online platformer game that blends elements of classic games like Super Mario with fresh mechanics. In this game, you control a bouncy hero navigating through colorful, challenging levels filled with enemies, obstacles, and surprises. The core gameplay focuses on jumping and destroying enemies by landing on them. Timing your jumps is critical to avoid hazards while maintaining a high score. Whether youre a fan of retro-style platformers or just looking for a casual game to pass the time, Hero Bounce delivers a fun and addictive experience."
    },
    {
        "index": 136,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ywlcgobsusmt8glsay6ticjcy64nzd3i/512x384.jpg",
        "name": "Crazy Basketball Shots",
        "url": "https://html5.gamemonetize.com/ywlcgobsusmt8glsay6ticjcy64nzd3i/",
        "text": "Step into the thrilling world of Crazy Basketball Shots, where precision meets fun! Test your skills as you aim, shoot, and score in this exciting basketball challenge. The game features a basket hoop and a basketball, providing the perfect setup for endless shooting action. With every shot, the difficulty increases, keeping you on your toes as you perfect your aim and timing. Whether youre a basketball enthusiast or just looking for a quick and engaging way to pass the time, Crazy Basketball Shots is the ultimate game for you! Are you ready to make those epic shots and set high scores? Let the hoops frenzy begin!"
    },
    {
        "index": 137,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/aaubvnris6mflicefmtln994mf4d4r7m/512x384.jpg",
        "name": "Christmas Sledge Rider 3D",
        "url": "https://html5.gamemonetize.com/aaubvnris6mflicefmtln994mf4d4r7m/",
        "text": "Embark on a thrilling winter adventure with winter sledge adventure, the ultimate christmas game for all ages! Jump onto your sledge and race through stunning, snow landscapes filled with festive cheer. With high-quality graphics that bring the winter wonderland to life, you&amp;rsquo;ll feel the excitement of the season as you sled down icy hills, dodge obstacles, and enjoy endless gameplay. Start playing now and join the fun&amp;mdash;sled your way to victory this holiday season!"
    },
    {
        "index": 138,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/e7bb8tctmo99bxm1uzkdbi62f4s3im2e/512x384.jpg",
        "name": "Santa Whack a Mole",
        "url": "https://html5.gamemonetize.com/e7bb8tctmo99bxm1uzkdbi62f4s3im2e/",
        "text": "This is a fun and exciting game for you, your friends, and your family! Get ready to test your reflexes and have a blast as your objective is to hit all the popping monsters to score as many points as you can. The more you hit, the higher your score climbs! If you enjoy games like Whack A Mole, then youll absolutely love this action-packed adventure. And here&amp;rsquo;s a festive twist &amp;ndash; Santa Claus himself might make a surprise appearance, so keep your eyes peeled! Challenge your loved ones and see who can top the leaderboard in this holiday-themed fun!"
    },
    {
        "index": 139,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yo9op4gkqybt7xskkoomvq5cfmttpyv4/512x384.jpg",
        "name": "Balloon Archer Challenge",
        "url": "https://html5.gamemonetize.com/yo9op4gkqybt7xskkoomvq5cfmttpyv4/",
        "text": "Balloon Archer Challenge puts your precision and focus to the test! Take control of an archer and shoot arrows at balloons floating upward. The game randomly selects a target balloon color, and its up to you to hit the right one! Try dont miss your shot or hit the wrong balloon. As the pace picks up, your skills will be pushed to the limit in this exciting test of accuracy. Simple to play but challenging to master, Balloon Archer Challenge is perfect for quick, action-packed fun! How long can you survive?"
    },
    {
        "index": 140,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9yl9uju495h6efflh23nza5w6oh5e6o1/512x384.jpg",
        "name": "Sweet Girl Halloween Dress Up",
        "url": "https://html5.gamemonetize.com/9yl9uju495h6efflh23nza5w6oh5e6o1/",
        "text": "This is a holiday dress-up game designed for girls. Do you like to celebrate Halloween? Do you like to respond to the holiday spirit? If you like all this, our game can fulfill your needs."
    },
    {
        "index": 141,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wd4mvm483q4x1ehm1ix3apdu0qvlpisv/512x384.jpg",
        "name": "World Flags Trivia",
        "url": "https://html5.gamemonetize.com/wd4mvm483q4x1ehm1ix3apdu0qvlpisv/",
        "text": "Challenge your geography skills in World Flags Trivia! Identify the nation for each flag from three choices across 100 questions. Perfect your skills as you progress through increasingly tricky questions. Can you score a perfect game and become a true flag expert? Play now and find out!"
    },
    {
        "index": 142,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/99jii4lxz3ycefg51kstp3od8x1jjfab/512x384.jpg",
        "name": "College Girls Team Fashion Makeover",
        "url": "https://html5.gamemonetize.com/99jii4lxz3ycefg51kstp3od8x1jjfab/",
        "text": "College Girls Team Fashion Makeover is an exciting dress-up and makeover game where players become the stylist for a group of college friends. You have access to a wide range of outfits, makeup options, and accessories to give each girl a unique, fashionable look. The game allows you to experiment with different styles, from casual day wear to glamorous evening outfits, helping the girls prepare for various college events. Players can mix and match clothing, hairstyles, and accessories to showcase their creativity and fashion sense, creating the perfect look for each character. In addition to dressing up, players can compete in fashion challenges and share their styled characters with friends. With an easy-to-use interface and numerous customization options, College Girls Team Fashion Makeover offers endless fun for those who love fashion and style."
    },
    {
        "index": 143,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5t839qnetuk8tcjh0f8dhhn922gpkbdl/512x384.jpg",
        "name": "Astro Hop",
        "url": "https://html5.gamemonetize.com/5t839qnetuk8tcjh0f8dhhn922gpkbdl/",
        "text": "Astro Hop is a thrilling space-themed jumping game where players control a brave astronaut leaping across platforms in the vastness of space. Your goal is to avoid obstacles and collect points by reaching the highest platforms. With stunning space backgrounds and colorful platforms, players must time their jumps carefully and avoid getting hit by fast-moving dangers. Its an engaging arcade experience that tests your reaction and strategy skills as you aim for the best score!"
    },
    {
        "index": 144,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ibdahpzhiyatdd5fyvlbcgv4c9fj7sgz/512x384.jpg",
        "name": "Winter Blast",
        "url": "https://html5.gamemonetize.com/ibdahpzhiyatdd5fyvlbcgv4c9fj7sgz/",
        "text": "Welcome to Winter Blast Match3 puzzle Game. Swipe to match 3 or more identical Christmas winter items to eleminate them and keep matching to win the level. Match 4 or 5 items to get super boosters. Explore tons of amazing and chellenging levels and try to finish them all. Enjoy Winter Blast Christmas match3 game."
    },
    {
        "index": 145,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2pzz150ueqkyep3uzcox1alq16xx2i5k/512x384.jpg",
        "name": "GT Racing",
        "url": "https://html5.gamemonetize.com/2pzz150ueqkyep3uzcox1alq16xx2i5k/",
        "text": "Immerse yourself in the heart-racing excitement of GT Racing, a game that captures the essence of classic 80s arcade racing. Offering exhilarating gameplay and an intuitive car control system, it takes you across 21 dynamic circuits filled with hidden surprises. The game&amp;rsquo;s vibrant, detailed graphics and flawless handling create an immersive racing experience. Feel the roar of the engine as you push for maximum speed, expertly using the turbo boost for those critical moments. With its compelling features and intense action, GT Racing is a must-play for any rally arcade racing fan."
    },
    {
        "index": 146,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dpmf8vy4w6ehyn00ljqneuylr0usajgf/512x384.jpg",
        "name": "Brickbox",
        "url": "https://html5.gamemonetize.com/dpmf8vy4w6ehyn00ljqneuylr0usajgf/",
        "text": "BrickBox is a captivating 2D puzzle game where players must strategically push a dime to a designated finish zone within a confined play area filled with brick walls. With intuitive grid-based mechanics and touch-based movement, BrickBox challenges players to think critically and maneuver skillfully through three uniquely designed levels. Objective: Push the diamond to the finish zone to complete each level. Challenges: Navigate through brick walls and obstacles that block the path to the finish zone."
    },
    {
        "index": 147,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/44z7cekal1224m2ngzkxkekhgdmn001d/512x384.jpg",
        "name": "Scary House Clown Evil",
        "url": "https://html5.gamemonetize.com/44z7cekal1224m2ngzkxkekhgdmn001d/",
        "text": "Scary House Clown Evil is an Exciting Thriller 3D horror game, inspired by all horror films about the best serial killers in their creepy Mansion. You wake up and find yourself trapped inside a scary House with blood and dark feelings, with deadly silence and a dangerous clown murderer whos looking around for his next victim to kill. On Scary House Clown Evil horror game you have to Sneak with stealth and explore the scary Mansion, discover and escape rooms and find Every single key for each Room and watch out for the Creepy Clown killer, whos always so suspicious about an intruders presence Nobody escaped the dark pursuer. Dare you?"
    },
    {
        "index": 148,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3m15irev7dru3ps10ferleycfsu0v30n/512x384.jpg",
        "name": "Baby Piano Children Song",
        "url": "https://html5.gamemonetize.com/3m15irev7dru3ps10ferleycfsu0v30n/",
        "text": "Do you like playing musical instruments? If you love music, we have just the game for you. This educational game offers 5 musical instruments to choose from. They are piano, xylophone, flute, drums, and guitar. You can select the instrument you are interested in playing. Apart from offering a wide range of instruments, this game lets you choose your favorite music."
    },
    {
        "index": 149,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/sij6niosk21moo20lnljevjvtkn5l7vx/512x384.jpg",
        "name": "Division Bird Image Uncover",
        "url": "https://html5.gamemonetize.com/sij6niosk21moo20lnljevjvtkn5l7vx/",
        "text": "In this game, a bird image is hidden beneath division expression tiles. Players must drag and drop the correct number bubbles onto the matching tiles to solve the expressions. As each expression is solved, the bird image gradually gets revealed. The goal is to uncover the entire image by completing all the math problems correctly."
    },
    {
        "index": 150,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fkl51gyhmd5ldbn918v8xs72gpaolbwn/512x384.jpg",
        "name": "Astro Destroyer",
        "url": "https://html5.gamemonetize.com/fkl51gyhmd5ldbn918v8xs72gpaolbwn/",
        "text": "Embark on an intergalactic journey with Astro Destroyer, a thrilling arcade-style space shooter where you pilot a futuristic spaceship through the vast expanse of space. Your mission is to destroy the endless waves of asteroids hurtling toward you while avoiding collisions and collecting power-ups to enhance your ship&amp;rsquo;s capabilities."
    },
    {
        "index": 151,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4p7di6iayu94eggwmzfbsrseq53n4b7a/512x384.jpg",
        "name": "Gold Miner Undersea",
        "url": "https://html5.gamemonetize.com/4p7di6iayu94eggwmzfbsrseq53n4b7a/",
        "text": "Gold Miner is a fun and addictive arcade game where you play as a miner on a quest to strike it rich! Use your claw to grab gold nuggets, precious gems, and hidden treasures while avoiding rocks and junk. How to Play &amp;bull; Tap or click to drop your claw at the right moment. &amp;bull; Aim for the biggest gold nuggets and rare gems for higher points. &amp;bull; Power up with shop items between levels to maximize your haul. Tip: Plan your moves carefully &amp;ndash; time and resources are limited! Are you ready to dig deep and uncover your fortune? Start mining now and strike gold!"
    },
    {
        "index": 152,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yrj2f8dy1oszmu7fq4si9u9ajz6pkrb5/512x384.jpg",
        "name": "Lollipop Stack Run",
        "url": "https://html5.gamemonetize.com/yrj2f8dy1oszmu7fq4si9u9ajz6pkrb5/",
        "text": "Dive into a sweet adventure in Lollipop Stack Run which is a colorful parkour game! In this fun arcade game, keep running while collecting vibrant lollipops to stack your sweet tower. You need to be flexible and glide between various obstacles, making sure to collect as many lollipops as possible during the run."
    },
    {
        "index": 153,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/djhxmee66ztiky6p2to9j6o3wk75p452/512x384.jpg",
        "name": "What kind of Santa Claus are you",
        "url": "https://html5.gamemonetize.com/djhxmee66ztiky6p2to9j6o3wk75p452/",
        "text": "Santa Clauses are different: strict, funny and even a little strange. Have you ever thought about which of the main wizards of the new year you are most like? There is Santa Claus syndrome. This is the time when you want to put on a hat, sing Christmas songs and have fun. If you have such &amp;ldquo;symptoms,&amp;rdquo; then quickly take our test to understand: &amp;ldquo;What kind of Santa Claus are you?!&amp;rdquo; and how to live with it!!"
    },
    {
        "index": 154,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6mw96kdp3ketqjyafnad8t2099h4z9tv/512x384.jpg",
        "name": "Adventure Home",
        "url": "https://html5.gamemonetize.com/6mw96kdp3ketqjyafnad8t2099h4z9tv/",
        "text": "Welcome to Adventure Home: Run Adventure, the ultimate mobile game that will take you on a thrilling journey of running, jumping, and treasure collecting! If you like genres such as adventure, action, rpg, platform, quests or just want to have a good time then this game is for you. Features of this game: High Quality graphics will leave only positive feedback Game size is minimal (but not compromised the graphics) and it is good for your device health Super simple controls make it easy to start playing Interesting quests will not let you get bored while playing the game"
    },
    {
        "index": 155,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tmyamchzaxtodvpsb6ncrrs1ck32g4du/512x384.jpg",
        "name": "Santa Racing",
        "url": "https://html5.gamemonetize.com/tmyamchzaxtodvpsb6ncrrs1ck32g4du/",
        "text": "Its Christmas Eve, and Santa&amp;rsquo;s sleigh has gone haywire, spilling presents all over the streets! Now, it&amp;rsquo;s up to you to help Santa collect as many scattered presents as possible while navigating through the bustling city. Dodge speeding cars, avoid piles of trash, and stay alert as obstacles come at you from all directions. The challenge ramps up as the game progresses, with faster-moving traffic and trickier hazards testing your reflexes. Will you be able to save Christmas and deliver joy to children everywhere? Grab the reins and help Santa clean up this festive mess!"
    },
    {
        "index": 156,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/10bkxqpja3z7chovl2o7aqlwut1zm9q2/512x384.jpg",
        "name": "Christmas Food Click 2024",
        "url": "https://html5.gamemonetize.com/10bkxqpja3z7chovl2o7aqlwut1zm9q2/",
        "text": "Christmas Food Click is a simple and fun click puzzle game. Click 2 or more christmas food to match them. The more food you match in a single click - the more points you earn for every item. Whats your best score?"
    },
    {
        "index": 157,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y7pwif6rxy0sn74qsl8cb0o1m3h2y0nt/512x384.jpg",
        "name": "Cleaner Race",
        "url": "https://html5.gamemonetize.com/y7pwif6rxy0sn74qsl8cb0o1m3h2y0nt/",
        "text": "Your opponents are not idle bystanders; they are formidable adversaries hell-bent on thwarting your efforts. They deploy tactics designed to disrupt your rhythm, to throw you off course. Yet, you remain steadfast, adapting to their maneuvers with grace and composure. Web Dev &lt;a href='https://www.kizi10.org/'&gt;https://www.kizi10.org/&lt;/a&gt;"
    },
    {
        "index": 158,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6oksnxniq3756mkszruc2sj8f6oh6o80/512x384.jpg",
        "name": "War Machine",
        "url": "https://html5.gamemonetize.com/6oksnxniq3756mkszruc2sj8f6oh6o80/",
        "text": "You have to command a destructive weapon - a trebuchet. Find and attack weak points of fortifications. Destroy the enemy using various types of projectiles. Liberate your lands from the enemy hordes!"
    },
    {
        "index": 159,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dpnk0do4wordmnhcmejlqly9horc8dpi/512x384.jpg",
        "name": "Jewel Miner Quest",
        "url": "https://html5.gamemonetize.com/dpnk0do4wordmnhcmejlqly9horc8dpi/",
        "text": "The dazzling world of gems awaits! Participate in thrilling events within limited moves or time. Solve captivating puzzles, complete fun tasks, and enjoy daily bonuses. Discover many terrific surprises with every move and see how far you can go."
    },
    {
        "index": 160,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zs4qr814hhhcnizbj872n9ecuvb0n0ri/512x384.jpg",
        "name": "Princess Pomni Cosplay ASMR",
        "url": "https://html5.gamemonetize.com/zs4qr814hhhcnizbj872n9ecuvb0n0ri/",
        "text": "This is a dress-up game designed for girls. If you like to dress up virtual dolls, our game will fulfill your wishes. The game offers a large number of different kinds of costumes and accessories for you to choose from, so you will be overwhelmed."
    },
    {
        "index": 161,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8c9lxadlobjsnx41j7rh0ee11ytz8b5s/512x384.jpg",
        "name": "CubeCombo",
        "url": "https://html5.gamemonetize.com/8c9lxadlobjsnx41j7rh0ee11ytz8b5s/",
        "text": "CubeCombo is a casual puzzle game. In this game, players need to use their wits by moving blocks with numbers, and merge the same blocks together until only one block is left, to complete the challenge. When only one number block is left in the panel or the target number block is synthesized, the current level is passed and a new level is opened."
    },
    {
        "index": 162,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/leiasg9oe4sc50inmnmdp4lg328pc5f5/512x384.jpg",
        "name": "Sweet Solve",
        "url": "https://html5.gamemonetize.com/leiasg9oe4sc50inmnmdp4lg328pc5f5/",
        "text": "Collect strawberry to the bucket using your brain This game consists of a challenge to collect strawberries in each level by solving the way to get it. Physics based game where you have to destroy blocks and make the way or progress so that strawberries can be collected easily. Think carefully before taking any steps. Either dropping strawberries or destroying them will be the game over. Don&amp;rsquo;t forget to collect stars. If you like genres such as puzzles, physics based games or just want to have a good time then this game is for you. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests"
    },
    {
        "index": 163,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tm4djwmsgxua64fxwbmn26bqryh60f6h/512x384.jpg",
        "name": "Tic Tac Toe Puzzle",
        "url": "https://html5.gamemonetize.com/tm4djwmsgxua64fxwbmn26bqryh60f6h/",
        "text": "Do you want new fun with the classic Tic Tac Toe Puzzle game? This game provides you with an intellectually challenging leisure experience! Every game tests your brain power and logical thinking! The gameplay is simple but challenging!"
    },
    {
        "index": 164,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tn3qwy8ivrill13ccmu3hdnwyfdxp6ry/512x384.jpg",
        "name": "Cartoon Pimple Pop",
        "url": "https://html5.gamemonetize.com/tn3qwy8ivrill13ccmu3hdnwyfdxp6ry/",
        "text": "Cartoon Pimple Pop is a quirky and amusing online game that offers a fun and satisfying experience for players of all ages. Step into the world of celebrity skincare, where your mission is to pop all the pimples on a celebritys face. The gameplay is lighthearted and addictive, designed to keep you entertained with each new level. As you progress through the game, the challenges become more complex, introducing different types of pimples and perhaps even unique celebrity faces to work on. Players will encounter various tools and techniques to use, such as tweezers, face masks, or creams, adding a strategic element to the game."
    },
    {
        "index": 165,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6x5iq6cnf029jhte5e88eflxeepclnd7/512x384.jpg",
        "name": "Xiblba Match",
        "url": "https://html5.gamemonetize.com/6x5iq6cnf029jhte5e88eflxeepclnd7/",
        "text": "Xiblba Match Seasons 1 is one of the new Match 3 games from the creators of the SIDM GAMES STUDIO, Xiblba Match Seasons. The most beautiful Xiblba Match. The second sequel features a BIG content update with new levels and a relaxing soundtrack to enjoy!"
    },
    {
        "index": 166,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cxu4dpr5uspgzim70lf6t4p6milazwr0/512x384.jpg",
        "name": "Battle Jitsu",
        "url": "https://html5.gamemonetize.com/cxu4dpr5uspgzim70lf6t4p6milazwr0/",
        "text": "In Battle Jitsu, you enter intense multiplayer online battles where strategy is everything. Carefully choose your cards and play the right element to beat your opponent. Fire, water, and ice face each other in a fast and dynamic duel. Master the elements, predict your opponents movements and prove yourself to be the true master of Battle Jitsu!"
    },
    {
        "index": 167,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ksppsx3qn2ihdlu6kpzz6l53hiwj4tsl/512x384.jpg",
        "name": "Sprunki Coloring Book",
        "url": "https://html5.gamemonetize.com/ksppsx3qn2ihdlu6kpzz6l53hiwj4tsl/",
        "text": "Welcome to the game Sprunki Coloring Book where you will find 12 different pictures that need to be colored. They need to be colored and for this you are provided with a set of fifteen felt-tip pens of different bright colors. On the left you will see a set of circles of different diameters. You can also save the colored image. Have fun!"
    },
    {
        "index": 168,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ibxh9nrcp3829n579aq6ecih5ovori0y/512x384.jpg",
        "name": "MiawDoku",
        "url": "https://html5.gamemonetize.com/ibxh9nrcp3829n579aq6ecih5ovori0y/",
        "text": "MiawDoku! &amp;ndash; the purrfect Sudoku-inspired puzzle game for cat lovers! Swap out numbers for adorable cat characters and challenge your mind by solving each grid with a unique twist. This game combines classic logic puzzles with a playful, feline theme, offering hours of fun for both cat enthusiasts and puzzle fans. Dive into MiawDoku! and let the puzzle-solving begin with a touch of whiskers and paws!"
    },
    {
        "index": 169,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zx1x0yknh5emq3mzop2fvbpimsxgpz9h/512x384.jpg",
        "name": "Stickman Night Survive",
        "url": "https://html5.gamemonetize.com/zx1x0yknh5emq3mzop2fvbpimsxgpz9h/",
        "text": "Now that Halloween is here, the gloomiest day of the year, its time to bring back the courageous white stickman who is an expert at vanquishing monsters. Stop procrastinating and start enjoying Stickman Night Survive right now on your preferred mobile device. Its a fun and free online game. Every living thing on Earth is frightened to death when monsters emerge from their underground lairs on Halloween night."
    },
    {
        "index": 170,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/66m25m8w23jo0y0jrhb5g88188suqpwd/512x384.jpg",
        "name": "BFFs Golden Hour",
        "url": "https://html5.gamemonetize.com/66m25m8w23jo0y0jrhb5g88188suqpwd/",
        "text": "Get ready to conquer the fashion world with Fall Aesthetics! Travel the globe alongside our stylish crew and unlock your inner fashionista. Mix and match outfits inspired by the vibrant streets of New York, the golden sunsets of Tuscany, the mesmerizing festivals, the traditional beauty of Japan, and the enchanting charm of Scotland. With endless options for dressing up and a touch of wit and fun, Fall Aesthetics will keep you entertained for hours. Play now and let your fashion sense shine like never before!"
    },
    {
        "index": 171,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/kvflm9cp71z5lt83dqyp6nn3yw8a6ub4/512x384.jpg",
        "name": "Squid Maze Challenge",
        "url": "https://html5.gamemonetize.com/kvflm9cp71z5lt83dqyp6nn3yw8a6ub4/",
        "text": "Looking for the most realistic Squid game Experience? Well, squid game Maze challenge is the best choice for you! Just like candy and a pin challenge and like Run green and red light with The girl who stands towards the tree and saying green light red light challenge. In this Squid, players are forced to Run inside some mystery Mazes and the goal is to find the Exit Key and go to the finish Door in this squid task 2022, its called squid game Maze challenge. Some glass is easy to break and some are so strong. Be Smart while choosing your steps and paths or you will be Eliminated!"
    },
    {
        "index": 172,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7zoawxqu9m4lg1d02ew9z3t7bmktj5bw/512x384.jpg",
        "name": "Fidget Trading Card Toy",
        "url": "https://html5.gamemonetize.com/7zoawxqu9m4lg1d02ew9z3t7bmktj5bw/",
        "text": "Fidget Trading Card Toy is a fidget trading game that allows you to feel the fun of collecting toy cards! In the game, you will flip cards against opponents and even use the slap feature to set off a fierce trading duel! Your goal is to collect as many rare cards as possible, increase your card collection, and gain more advantages in trading!"
    },
    {
        "index": 173,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/sme8rz5qvjf5if0ss3nbztssufmikaoj/512x384.jpg",
        "name": "Hungry Crab",
        "url": "https://html5.gamemonetize.com/sme8rz5qvjf5if0ss3nbztssufmikaoj/",
        "text": "In &amp;ldquo;Hungry Crab&amp;rdquo; your objective is to guide the candy to the crab&amp;rsquo;s mouth by strategically cutting ropes while collecting the stars. Simply swipe your finger across the screen to cut the ropes to play. The candy will then be released and begin its descent toward the crab. However, you must be careful not to let the candy flow away. Features of this game: High Quality graphics will leave only positive feedback Game size is minimal (but not compromised the graphics) and it is good for your device health Super simple controls make it easy to start playing Interesting quests will not let you get bored while playing the game."
    },
    {
        "index": 174,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/af23zt3k068xb5iqq9j1p3ym3w13umsr/512x384.jpg",
        "name": "High Heels Collect Run",
        "url": "https://html5.gamemonetize.com/af23zt3k068xb5iqq9j1p3ym3w13umsr/",
        "text": "Ready to begin a stylish running adventure in High Heels Collect Run! In this casual game, you&amp;rsquo;ll run through various fun environments. Stepping on heels can make you feel like a queen! Everyone loves to look perfect, and these heels will make you shine like a star!"
    },
    {
        "index": 175,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tk2ert02yjyjon1ro7334t4avnouer4x/512x384.jpg",
        "name": "Pokemon Coloring Books",
        "url": "https://html5.gamemonetize.com/tk2ert02yjyjon1ro7334t4avnouer4x/",
        "text": "Jump into the world of Pok&amp;eacute;mon with the Pok&amp;eacute;mon Coloring Book! Perfect for Pok&amp;eacute;mon fans of all ages, this coloring app lets you bring your favorite Pok&amp;eacute;mon characters to life with vibrant colors and creative brush styles. Color Pikachu, Charizard, Bulbasaur, and many more beloved Pok&amp;eacute;mon as you explore a world of endless color possibilities. Choose from a variety of brushes like pastel, watercolor, and pencil to add a unique flair to each Pok&amp;eacute;mon. With pages featuring classic Pok&amp;eacute;mon and fun scenes, it&amp;rsquo;s a relaxing and creative way to experience the Pok&amp;eacute;mon universe."
    },
    {
        "index": 176,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/e1vhwqi5y1aah95qnjlkfbbhrehlfr3v/512x384.jpg",
        "name": "Choco Blocks",
        "url": "https://html5.gamemonetize.com/e1vhwqi5y1aah95qnjlkfbbhrehlfr3v/",
        "text": "Enter the delightful world of Choco Blocks, a tantalizing puzzle adventure where strategy meets sweetness! In this engaging game, your task is to pick and drop sets of blocks to complete rows. But there&amp;rsquo;s a sweet twist: special chocolate blocks are hidden within the rows, waiting to be collected. Your mission is to strategically arrange the blocks and collect all the specific choco blocks from the board before time runs out."
    },
    {
        "index": 177,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mchfzh9g182yybyhfi41zrvr9v1zyu90/512x384.jpg",
        "name": "BTS Sprunki Coloring Book",
        "url": "https://html5.gamemonetize.com/mchfzh9g182yybyhfi41zrvr9v1zyu90/",
        "text": "BTS Sprunki Coloring Book is the ultimate coloring adventure for kids! This lively and creative game lets you dive into the colorful world of BTS and bring Sprunki to life. Choose one of four awesome, hand-drawn images featuring fun characters and scenes inspired by BTS. Then, get ready to unleash your inner artist! Pick your favorite colors, mix and match, and color each picture however you like&amp;mdash;it&amp;rsquo;s all up to you! Easy to Play: Simple controls make it easy to jump in and start coloring right away."
    },
    {
        "index": 178,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/v95y3tnx0r9zhi5d47d10g3wkvr6d8s9/512x384.jpg",
        "name": "Dino Hide N Shoot",
        "url": "https://html5.gamemonetize.com/v95y3tnx0r9zhi5d47d10g3wkvr6d8s9/",
        "text": "Do you want to begin a fun dinosaur-themed shooting game in Dino Hide N Shoot? Play a brave gunman on an exciting adventure! In this game, you will constantly run to avoid the attack of dinosaurs.And pick up the bullets, accumulate enough firepower. Pay attention to using the box as cover,seize the moment to shoot at the dinosaur! The gameplay is simple yet challenging."
    },
    {
        "index": 179,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cbbuwzr1c212oik583tijc9j87tvnrex/512x384.jpg",
        "name": "Pop Drag",
        "url": "https://html5.gamemonetize.com/cbbuwzr1c212oik583tijc9j87tvnrex/",
        "text": "**Pop Drag** is a fast-paced, competitive party game where players compete to create the most dazzling drag queen persona! Each round, a deck of colorful, quirky cards is drawn, offering pop culture references, fashion items, or challenges. Players must combine cards to create extravagant outfits, hilarious backstories, or hilarious lip-sync battles. Web Dev &lt;a href='https://www.coolcrazygames.com/'&gt;https://www.coolcrazygames.com/&lt;/a&gt;"
    },
    {
        "index": 180,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/vmirvs6d0gpc7b69osiwgexrjcstfjkw/512x384.jpg",
        "name": "Unscrew Them All",
        "url": "https://html5.gamemonetize.com/vmirvs6d0gpc7b69osiwgexrjcstfjkw/",
        "text": "Unscrew Them All is a challenging puzzle game where players must strategically unscrew all the screws securing large wooden planks to the board. After removing each screw, place it into the correct open slot. Unscrew all the planks before time runs out to complete each level. Master every level to win the game!"
    },
    {
        "index": 181,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1kysk0lf5jk4e9qsqfcyuymkcgng7cjy/512x384.jpg",
        "name": "Cheerful Challenge",
        "url": "https://html5.gamemonetize.com/1kysk0lf5jk4e9qsqfcyuymkcgng7cjy/",
        "text": "Match the animal blocks with Sarah, a girl who would like to match tile blocks There were many animal blocks available, the player had to match them by simple swiping. Don&amp;rsquo;t forget to get help from the special power tools available in this game. If you like genres such as puzzle games, tile matching games or just want to have a good time then this game is for you. Features of this game: High Quality graphics will leave only positive feedback Game size is minimal (but not compromised the graphics) and it is good for your device health Super simple controls make it easy to start playing Interesting levels will not let you get bored"
    },
    {
        "index": 182,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/li60xx9s36usl56nx2dlv3oitnwlbrux/512x384.jpg",
        "name": "Lady Pool",
        "url": "https://html5.gamemonetize.com/li60xx9s36usl56nx2dlv3oitnwlbrux/",
        "text": "Welcome to the vibrant world of a humorous dress up game where fashion collides with the comic book universe! Get ready for a creative reinterpretation of your favorite comic book antiheros costumes: bold color combinations, unexpected prints and fun accessories are available to you. You can practice your imagination in creating shocking images: from playful pajamas for parties to spectacular outfits for bold runway shows. There is everything here: from funny hats that emphasize individuality to stylish superhero jumpsuits. Unleash your imagination and let your character become a style icon!"
    },
    {
        "index": 183,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ruo79w2sou93vce16h1whf9gs3isiy3z/512x384.jpg",
        "name": "Connect 2 Cars",
        "url": "https://html5.gamemonetize.com/ruo79w2sou93vce16h1whf9gs3isiy3z/",
        "text": "Connect 2 Cars is the ultimate puzzle game designed to entertain kids and adults alike! Whether you&amp;rsquo;re a puzzle enthusiast or simply looking for a relaxing and free-to-play game, Connect 2 Cars has something for everyone. Get ready to immerse yourself in hours of engaging gameplay as you challenge your brain and enjoy connecting adorable car tiles."
    },
    {
        "index": 184,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1ye2ka2gz2m1wsy539bi6q5ev2eaqd96/512x384.jpg",
        "name": "Percys Froggy Frenzy",
        "url": "https://html5.gamemonetize.com/1ye2ka2gz2m1wsy539bi6q5ev2eaqd96/",
        "text": "Jump into the vibrant world of Percys Froggy Frenzy! Guide Percy, a daring frog, through a non-stop adventure where he shoots bubbles. Move Percy left and right as he auto-fires bouncing shots to pop falling bubbles. Along the way, jump across dynamic platforming levels to gather even more coins, boosting Percy&amp;rsquo;s shooting speed, power, and health. Beware&amp;mdash;if Percy takes hits, maybe you&amp;rsquo;ll need to restart the level. With endless progression and varied challenges, this game is perfect for fans of fast-paced, action-packed platformers!"
    },
    {
        "index": 185,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7rqz6ji1okgid9e6zqt6jq7bc6wt3e2s/512x384.jpg",
        "name": "Among Knights",
        "url": "https://html5.gamemonetize.com/7rqz6ji1okgid9e6zqt6jq7bc6wt3e2s/",
        "text": "Among Knights is an Adventure Arcade 2D Game that tells a wonderful story of an ancient war between Knights and mutants. Among Knights comes with easy and enjoyable gameplay in an amazing 2D environment, with several places following the story. the games story tells the destiny of a young Knight who was fated to revenge the death of his father and finds out some truth about the ancident. Dive into the story of Among Knights, with the young knight, and defeat some of those mutants in pursuit of their leaders who called the Giant Mutant! Theres plenty to find, but one misstep and its all over."
    },
    {
        "index": 186,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/c0px6f8vk2vv3jkjn7u3ohdeylc141l0/512x384.jpg",
        "name": "Dancing Race Match",
        "url": "https://html5.gamemonetize.com/c0px6f8vk2vv3jkjn7u3ohdeylc141l0/",
        "text": "Dancing Race Match is a colorful parkour game that perfectly blends dance and racing. Allow you to show your skills to a lively rhythm! In this fun arcade-style game, youll run along colorful tracks. There will be a variety of dance positions for you to do on the track, complete the dance correctly and pass the wall. When the action matches successfully, you will get more star ratings and likes."
    },
    {
        "index": 187,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t6f07c891x0hamvbgdy0lk4baaue7imc/512x384.jpg",
        "name": "Mad Joker",
        "url": "https://html5.gamemonetize.com/t6f07c891x0hamvbgdy0lk4baaue7imc/",
        "text": "Looking for a new 2d games with interesting and engaging story? Or are you looking for breakneck immersive Fire battles in 2D setting? Or maybe your aim is to find something with the joker role playing? If so, then Mad Joker is best choice for you! Mad Joker: Action Game 2d is a new Comic 2D Adventure indie game, free and Gives the best 2d gaming experience. playing across a significant place heading the city ruled by the power of the cops. Features: Ultra HD Joker Game Unique and fun gameplay Original Levels Weapons and fun shooting experience 2D Adventure and platformer game Enjoy the experience of Mad Joker: Action Game"
    },
    {
        "index": 188,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3bokg9gmjbegu118i7l1q3jkgt38pzsm/512x384.jpg",
        "name": "Paint with Santa",
        "url": "https://html5.gamemonetize.com/3bokg9gmjbegu118i7l1q3jkgt38pzsm/",
        "text": "This game is a Christmas-themed painting, drawing, and coloring tool for kids. Choose colors and start creating with your mouse. Kids can explore their creativity with ease! Features: -Simple to use -Over 40 objects to color -Fun and engaging characters -A relaxing game for kids With Christmas music and festive designs, this game brings the magic of Santa Claus and his friends to life, transporting children to a joyful holiday world. Merry Christmas and Happy New Year!"
    },
    {
        "index": 189,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tloh1r8i3pywjg2n3wyemj2uqjlktcnj/512x384.jpg",
        "name": "Heli Monsters Giant Hunter",
        "url": "https://html5.gamemonetize.com/tloh1r8i3pywjg2n3wyemj2uqjlktcnj/",
        "text": "Ready to face the massive challenge? In Heli Monsters - Giant Hunter, you will face crazy monsters and begin an exciting shooting adventure! You will use your gun to aim at the monster and fight them. Your task is to destroy them and keep the city safe! Buy higher-damage guns and bullets with gold. Such as AWM, M200, M24, etc."
    },
    {
        "index": 190,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y0w71ih9pfamj46q2kcmi17qk6kgnbd2/512x384.jpg",
        "name": "Shoot Run Monster Hunting",
        "url": "https://html5.gamemonetize.com/y0w71ih9pfamj46q2kcmi17qk6kgnbd2/",
        "text": "Welcome to the interesting parkour world of Shoot Run: Monster Hunting! In this challenging game,you will be a brave shooter. Run, collect, fight and shoot all kinds of scary monsters, show your courage and skill! Enjoy running in a variety of scenarios, challenging speed and agility."
    },
    {
        "index": 191,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7l0r130moqw77439s9l48rjpwg6me57i/512x384.jpg",
        "name": "Pirates Mahjong",
        "url": "https://html5.gamemonetize.com/7l0r130moqw77439s9l48rjpwg6me57i/",
        "text": "Set sail with Pirates Mahjong, a deluxe tile-matching game packed with pirate-themed puzzles. Match pairs of tiles adorned with pirate symbols to clear the board, uncover hidden treasures, and solve challenging levels. Ideal for puzzle fans and pirate enthusiasts alike, this top-rated game offers endless high-seas adventure. Play Pirates Mahjong on lofgames.com."
    },
    {
        "index": 192,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/390ok4pjvfy8m5mnb6tn3erqejuwdpp2/512x384.jpg",
        "name": "Tic Tac Toe Pro",
        "url": "https://html5.gamemonetize.com/390ok4pjvfy8m5mnb6tn3erqejuwdpp2/",
        "text": "Tic Tac Toe Pro is an enhanced version of the classic game, featuring a sleek design, various difficulty levels, and multiplayer options. Play against AI with different skill settings or challenge friends in a competitive environment. Perfect for quick, strategic gameplay on the go. Fun for all ages!"
    },
    {
        "index": 193,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/80whi1rzhhbrxn1f4le2ll0cf5vx5wv2/512x384.jpg",
        "name": "Ping Pong Battle Table Tennis",
        "url": "https://html5.gamemonetize.com/80whi1rzhhbrxn1f4le2ll0cf5vx5wv2/",
        "text": "Want to have an intense table tennis battle? In Ping Pong Battle - Table Tennis, you will become a ping pong pro and compete with your opponents in a fierce competition! This game combines realistic paddle manipulation with exciting match simulation."
    },
    {
        "index": 194,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jjtfdsgt4uulryp9lcecfikcq9o8pp68/512x384.jpg",
        "name": "Celebrity Pimple Pop",
        "url": "https://html5.gamemonetize.com/jjtfdsgt4uulryp9lcecfikcq9o8pp68/",
        "text": "Celebrity Pimple Pop is a hilarious and addictive online game, free to play for both kids and adults! Step into the quirky world of celebrity skincare and get ready for some satisfying pimple-popping action. Your goal is simple: pop every pimple on the celebrity&amp;rsquo;s face to move on to the next level! Each level brings new challenges, keeping the fun going as you work your way up to become the ultimate pimple-popping pro."
    },
    {
        "index": 195,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nbcvemo84x6gzvb6h1zbnwbr9dq1fjmj/512x384.jpg",
        "name": "Color Block Puzzle",
        "url": "https://html5.gamemonetize.com/nbcvemo84x6gzvb6h1zbnwbr9dq1fjmj/",
        "text": "Challenge your mind with our puzzle game! In Color Block Puzzle, players face a series of exciting challenges, where they must paint squares according to the patterns presented. With increasingly complex levels, your puzzle-solving skills will be put to the test. Get ready to dive into a world of challenges and colors!"
    },
    {
        "index": 196,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5jbf4sg3nvjk7oog9wi0088nq5tcu7f1/512x384.jpg",
        "name": "Among Us Coloring Books",
        "url": "https://html5.gamemonetize.com/5jbf4sg3nvjk7oog9wi0088nq5tcu7f1/",
        "text": "Get ready for a colorful twist on the mystery and excitement of the Imposter Coloring Book! Inspired by the thrilling world of imposters, this coloring app lets you bring your favorite characters to life with vibrant colors and unique brush styles. Choose from various brushes, including pastel, watercolor, and pencil, to add a unique touch to each crewmate, imposter, and spaceship scene. Whether you prefer bold colors or a soft pastel look, every coloring page is yours to make unique."
    },
    {
        "index": 197,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/c0yfpiu9kpq8xebj1xftafb179n01sep/512x384.jpg",
        "name": "Marine Match Up",
        "url": "https://html5.gamemonetize.com/c0yfpiu9kpq8xebj1xftafb179n01sep/",
        "text": "Explore the fun and underwater tile matching game. Match the same tile and execute them. Not be lazy as the countdown will be finished if you can&amp;rsquo;t match them quickly. Don&amp;rsquo;t forget to collect the time stamp as this will add some time addition to the countdown. If you like genres such as tile matching, puzzle solving or just want to have a good time then this game is for you Features of this game: High Quality graphics will leave only positive feedback Game size is minimal (but not compromised the graphics) Super simple controls make it easy to start playing Interesting levels will not let you get bored"
    },
    {
        "index": 198,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hm8cers6azm5r8txkwezpakvprcf7aaj/512x384.jpg",
        "name": "Xmas Memory Match",
        "url": "https://html5.gamemonetize.com/hm8cers6azm5r8txkwezpakvprcf7aaj/",
        "text": "Get into the holiday spirit with this simple yet exciting memory card matching game, perfect for anyone looking to give their brain a boost! Designed with joy in mind, our Christmas-themed pairs game offers Easy and Medium modes, making it fun for all ages. Flip the cards, find the matching Christmas images - maybe a snowman, reindeer, or even Santa himself! Its a delightful way to celebrate the season while sharpening your memory. Gather with friends or family, and enjoy the magic of Christmas in every match. Happy holidays and happy matching!"
    },
    {
        "index": 199,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t2g2zoolw99aaoy8seep0ebtuk56phv9/512x384.jpg",
        "name": "Light Stream",
        "url": "https://html5.gamemonetize.com/t2g2zoolw99aaoy8seep0ebtuk56phv9/",
        "text": "Pass through the laser beam by reflecting in the mirror to unlock the gate. At the beginning we see a boy, who reveals how the door will be unlocked by Laser beam to reach the next level. Now its the players turn to accept the challenge and solve the door unlock process by setting the laser beam to the correct position. Don&amp;rsquo;t forget to collect 3 stars. If you like genres such as physics based games, laser beam games or just want to have a good time then this game is for you. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests"
    },
    {
        "index": 200,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mak258eeak9s5x0um9vjkb0zqgx4m3pv/512x384.jpg",
        "name": "Mob Control Shoot",
        "url": "https://html5.gamemonetize.com/mak258eeak9s5x0um9vjkb0zqgx4m3pv/",
        "text": "Mob Control Shoot is an exciting arcade shooter where you can have endless shooting fun in fast-paced combat! You will control a cannonball firing hordes of heroic characters, facing many enemies. A quick click to launch more heroes and help you generate more heroes through the digital gate."
    },
    {
        "index": 201,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gi0ey9uo7b54a7pqsbf7irz9sctveqqi/512x384.jpg",
        "name": "Match The Figures",
        "url": "https://html5.gamemonetize.com/gi0ey9uo7b54a7pqsbf7irz9sctveqqi/",
        "text": "In Match the Figures, players race against the clock to fit various shapes and figures into their correct spots. Each level presents a set of unique figures and outlines, challenging players to drag and match each piece before time runs out. As the levels progress, the shapes get more intricate, and the timer shortens, making for a fast-paced and engaging puzzle experience. With intuitive controls, bright graphics, and increasingly complex levels, Match the Figures keeps players on their toes, sharpening spatial awareness and reflexes. Can you beat the clock and match them all?"
    },
    {
        "index": 202,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/prfb590rganon88i3v5tlznhn9jmbu0u/512x384.jpg",
        "name": "Gift Glide",
        "url": "https://html5.gamemonetize.com/prfb590rganon88i3v5tlznhn9jmbu0u/",
        "text": "Take to the skies with Santa in Gift Glide, the ultimate holiday delivery adventure! Glide through snowy villages and aim carefully to drop presents down chimneys, spreading cheer to every household. As Santa&amp;rsquo;s trusted helper, youll need precision timing and sharp aim to deliver gifts without missing a rooftop! Earn points with every perfect toss, unlock festive upgrades, and face new challenges as the journey continues. With increasing speed and tricky obstacles, Gift Glide will test your reflexes in this magical race against time. Can you make every delivery before dawn?"
    },
    {
        "index": 203,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/10kelat16nt4bxaogtsn2ft0t70kg6jg/512x384.jpg",
        "name": "Halloween Store Sort",
        "url": "https://html5.gamemonetize.com/10kelat16nt4bxaogtsn2ft0t70kg6jg/",
        "text": "In Halloween Store Sort, match spooky toys and Halloween decorations by dragging them between shelves. Create sets of three to clear the shelves and reveal hidden ones above or to the sides of the screen. With many levels and increasing difficulty, each level has a time limit, so think fast! Use the shuffle button if you get stuck. Complete all levels to win and become the ultimate Halloween sorting champion!"
    },
    {
        "index": 204,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/oki61504wqe7msf67opq42oqj99oqf1w/512x384.jpg",
        "name": "Noob Rocket Punch",
        "url": "https://html5.gamemonetize.com/oki61504wqe7msf67opq42oqj99oqf1w/",
        "text": "Enjoy this new game. Rocket Punch is a stunning journey on the ring where you may demonstrate your talents for combat with gloves. If you like boxing games, this game is suitable for you. Train your mind and agility with this amusing and interesting game again. Kiz10 offers the best action games and fights. With the money you have earned from completing levels, you can unlock new gloves and upgrade your fighting abilities."
    },
    {
        "index": 205,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/07n6jpvf5geevrnnlpwzpa7pfuntyrhz/512x384.jpg",
        "name": "Badger Runner",
        "url": "https://html5.gamemonetize.com/07n6jpvf5geevrnnlpwzpa7pfuntyrhz/",
        "text": "Help to feed the hungry Mr. badger and save him from Mrs. Hen Game story begins with an argument between Mr. Badger and Mrs. Hen, Mr. Badger is quite hungry and want to eat one chick of Mrs. Hen; but she didn&amp;rsquo;t agree with him and felt very angry. Mr. Badger warns her that he would do anything to feed himself. Now the player has to play the role of badger and eat chicks until you reach the next level. Be careful! Mr. Hen is very wise and powerful and she will chase you all the time. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests"
    },
    {
        "index": 206,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mnqj10l3wzrla0pcc7jdw7lqo2wbwiq9/512x384.jpg",
        "name": "Bunny Goal",
        "url": "https://html5.gamemonetize.com/mnqj10l3wzrla0pcc7jdw7lqo2wbwiq9/",
        "text": "Are you ready to kick, bounce, and score? Bunny Goal combines the thrill of soccer with the fast-paced fun of pinball, creating a unique game that&amp;rsquo;s perfect for all ages! Join our adorable bunny character on a journey to become a soccer superstar. Each level is packed with vibrant environments, challenging obstacles, and dynamic pinball action that requires quick reflexes and sharp strategy. Whether you&amp;rsquo;re looking for a quick fun game to pass the time or aiming to beat every level and set a high score, Bunny Goal has something for everyone. Are you ready to take on the pinball soccer challenge and lead the bunny to victory?"
    },
    {
        "index": 207,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/k5qkomnng89vxh33jgswau4et63unte9/512x384.jpg",
        "name": "Gift Drop",
        "url": "https://html5.gamemonetize.com/k5qkomnng89vxh33jgswau4et63unte9/",
        "text": "Help Santa to escape from dark forest prison! Gift Drop is a 60 levels of fun physics puzzle game! all boxes except the grass must be removed where the prison is standing. Simply click or tap on the boxes or blocks to destroy them; carefully use the set blocks in what ever way you can to get the Gift Drop safely into the grass. Solve this fun physics game and help Santa to escape from a dark forest!"
    },
    {
        "index": 208,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tgt3c8qbfbrtxbkovwubcxu6akx5rt2d/512x384.jpg",
        "name": "Duet Cats Halloween Cat Music",
        "url": "https://html5.gamemonetize.com/tgt3c8qbfbrtxbkovwubcxu6akx5rt2d/",
        "text": "Welcome to Duet Cats Halloween Cat Music, a game feast for 2 players filled with fun and music!Join your friends in this Halloween-inspired game to challenge the cats music and have fun! With the rhythm of the music, control the cute cat to move. Let them eat more ice cream. You can choose a different musical challenge. You should accurately move to collect ice cream, and get the highest high score!"
    },
    {
        "index": 209,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/imaqq34l0iw90484l470rs0cfu7pofze/512x384.jpg",
        "name": "Coin Sort Puzzle",
        "url": "https://html5.gamemonetize.com/imaqq34l0iw90484l470rs0cfu7pofze/",
        "text": "Play now for free&amp;mdash;fun and addictive grid gameplay. Sort and merge coins to clear the board. Test your skills and earn coins. Fun for all ages! Welcome to the exhilarating world of Coin Sort, where speed, precision, and strategy come together in a captivating arcade-style puzzle game. As a Coin Sorter in a match game, your mission is to efficiently organize an ever-growing flow of coins into their respective lines based on their denominations. Are you ready to put your decision-making skills and reflexes to the test? Embark on a thrilling sorting adventure and unlock new levels."
    },
    {
        "index": 210,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wlb9vj2y6oazlm6q8vvostlu8w649f71/512x384.jpg",
        "name": "Bus Jam Sort",
        "url": "https://html5.gamemonetize.com/wlb9vj2y6oazlm6q8vvostlu8w649f71/",
        "text": "The passengers are waiting for their bus, sort them out based on their color! Visually, Bus Jam Game is a visual treat, imagine colorful buses, a diverse passengers, and a lively backdrop setting the stage for your bustling triple match puzzle adventure. Smooth animations elevate the fun, making each move a delightful experience in puzzle games."
    },
    {
        "index": 211,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/c0iute06224rvf22x1sccy86960odfci/512x384.jpg",
        "name": "Hexa Tile Master",
        "url": "https://html5.gamemonetize.com/c0iute06224rvf22x1sccy86960odfci/",
        "text": "Welcome to Hexa Tile Master! Drag stacks of hex tiles from the bottom of your screen to empty spots on the board. Watch as similar tiles merge into bigger stacks, and collect stacks of 10 or more matching tiles to clear them. Your goal is to clear all the hex tiles before time runs out. Each level gets more challenging, but dont worry&amp;mdash;fun animations and exciting rewards will keep you engaged. Enjoy the strategic fun and see how far you can go!"
    },
    {
        "index": 212,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/a63gjnbyhaljru308qlenvrhnxzeajk9/512x384.jpg",
        "name": "Halloween crosswords HTML5",
        "url": "https://html5.gamemonetize.com/a63gjnbyhaljru308qlenvrhnxzeajk9/",
        "text": "Halloween crosswords is a game with words and clues. Read the clue first and click on the number block you like to write. For across, click once on the block number, and for down, twice. Watch the green arrow position beside the clue to ensure you are not wrong. The game consists of three levels 2 about Halloween and the last about movie thrillers. The game works on mobile and tablets, but you must use the arrows to navigate the crossword blocks."
    },
    {
        "index": 213,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qtzaemfmdj5ovmh1jekjq4bltpnlbjd5/512x384.jpg",
        "name": "Colors Grid",
        "url": "https://html5.gamemonetize.com/qtzaemfmdj5ovmh1jekjq4bltpnlbjd5/",
        "text": "Colors Grid you face visual puzzle challenges. Organize colored squares to match a specific pattern. With each level, complexity increases, testing your analytical skills and problem-solving ability. Explore color nuances and spatial relationships as you progress. With simple controls, &amp;ldquo;Colors Grid&amp;rdquo; offers an immersive experience for all ages. Unravel the mysteries of the color grid and showcase your mental dexterity!"
    },
    {
        "index": 214,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/q80sjppcgrmh9yq3x5orcmhrwf8ltqaa/512x384.jpg",
        "name": "MergeMaster",
        "url": "https://html5.gamemonetize.com/q80sjppcgrmh9yq3x5orcmhrwf8ltqaa/",
        "text": "A casual mobile game centered around matching and elimination. The game features vibrant colors, coupled with a visual style rich in beach elements. With background music and sound effects reminiscent of leisurely walks along the beach, it creates a relaxed beach-strolling environment that immerses players in an auditory experience."
    },
    {
        "index": 215,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ddb4oinisy5gur76nix440fy1xhjp8nw/512x384.jpg",
        "name": "Blackpink Black Friday Fever",
        "url": "https://html5.gamemonetize.com/ddb4oinisy5gur76nix440fy1xhjp8nw/",
        "text": "Blackpink Black Friday Fever is a fun dress-up game designed for K-pop and Blackpink fans! Dive into the world of style by creating unique looks for Jisoo, Jennie, Ros&amp;eacute;, and Lisa, inspired by Black Friday&amp;rsquo;s biggest fashion trends. As a fan, you&amp;rsquo;ll get to style each member of Blackpink with a range of outfits and accessories that perfectly suit their personalities."
    },
    {
        "index": 216,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9prltg366ftrjuuvkyow792209ye37bg/512x384.jpg",
        "name": "Count Masters Superhero",
        "url": "https://html5.gamemonetize.com/9prltg366ftrjuuvkyow792209ye37bg/",
        "text": "In Count Masters: Superhero, begin an interesting parkour adventure like no other! As a superhero,youre constantly running, jumping, and avoiding obstacles throughout the level. Such as avoiding rotating mace, cutting machine and so on."
    },
    {
        "index": 217,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0g1lbwa9t0i9se2gx1a15f0x1j5eto2t/512x384.jpg",
        "name": "Mini Tennis",
        "url": "https://html5.gamemonetize.com/0g1lbwa9t0i9se2gx1a15f0x1j5eto2t/",
        "text": "This exciting arcade sports game is easy to pick up but challenging to master if youre aiming for high scores! Like in a classic tennis match, returning the balls demands speed and precision one misstep, and its game over! The longer you stay on the court, the faster the tennis balls come flying at you, and its up to you to return each one while dodging airborne bottles. Be warned: earning the Platinum medal is a true test of skill! Only those with grand slam-worthy reflexes can claim it!"
    },
    {
        "index": 218,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pr2p1clt6clmexk3u5e06vpmxexivku0/512x384.jpg",
        "name": "BTS Winter Coloring",
        "url": "https://html5.gamemonetize.com/pr2p1clt6clmexk3u5e06vpmxexivku0/",
        "text": "BTS Winter Coloring is a delightful, free online coloring game made just for kids! Step into a snowy wonderland filled with adorable images and magical winter scenes just waiting for a splash of color. This game is perfect for young artists who want to explore their creativity in a winter-themed environment. BTS Winter Coloring is not only fun but also helps develop creativity, color recognition, and fine motor skills. Plus, it&amp;rsquo;s mess-free and can be played anywhere, anytime!"
    },
    {
        "index": 219,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7hd69nd6fkv70epx1d4kwjkx2ymxd3yk/512x384.jpg",
        "name": "Halloween Merge",
        "url": "https://html5.gamemonetize.com/7hd69nd6fkv70epx1d4kwjkx2ymxd3yk/",
        "text": "Merge spooky items, unlock haunted treasures, and celebrate Halloween in this addictive puzzle game. Get ready for a spooky adventure with Halloween Merge: Haunted Puzzle! Dive into a mysterious world filled with Halloween-themed puzzles, spooky items, and eerie challenges that will test your merging skills. Combine haunted artifacts like pumpkins, potions, and ghostly decorations to unlock chilling treasures and transform your haunted mansion. Enjoy a unique merge game experience with Halloween vibes around every corner. Match and merge items to complete levels, reveal secrets, and win daily rewards!"
    },
    {
        "index": 220,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ttig4tj1axodc6zcnc88fon5qm27yprt/512x384.jpg",
        "name": "Mini Goalie",
        "url": "https://html5.gamemonetize.com/ttig4tj1axodc6zcnc88fon5qm27yprt/",
        "text": "Jump into the action as the goalie in Mini Goalie! In this exciting game, put your reflexes to the test as you slide the goalkeeper across the goal line to block every penalty kick. Your mission as the ultimate goalie is clear: defend the net against an endless wave of incoming shots. Make incredible saves, hone your skills, and keep those goals out! How to Play: The computer will launch soccer balls toward the goal. Swipe on the screen to control your mini goalie and intercept each shot. Get ready to dive, block, and defend! Play Mini Goalie now and become the ultimate Soccer Goalkeeper Superstar!"
    },
    {
        "index": 221,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nsuj9l7hotazamfmbvt36c1xneya84pk/512x384.jpg",
        "name": "Plinko Ballon Archery Pop",
        "url": "https://html5.gamemonetize.com/nsuj9l7hotazamfmbvt36c1xneya84pk/",
        "text": "Plink Balloon: Archery Pop blends the thrill of archery with the fun of Plinko! Take aim and pop balloons as they float upward, each releasing colored balls with unique effects on your score. Green balloons add points, red ones subtract, and yellow balloons keep you guessing! Balls stay in place until the 75-second round ends, then tumble down the Plinko board to determine your final score. Challenge yourself to maximize points and hone your skills in training mode. Easy to learn but tricky to master, Plink Balloon: Archery Pop is endless fun for players of all ages!"
    },
    {
        "index": 222,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ynpmxdspl2anc9kliluolgjahjla7mjd/512x384.jpg",
        "name": "Zigzag Adventure",
        "url": "https://html5.gamemonetize.com/ynpmxdspl2anc9kliluolgjahjla7mjd/",
        "text": "A new adaptive endless car game where car run in zigzag. Stay on the road and do as many zigzags as you can! Tap to change the direction of the car. Try NOT to crash! The speed increases over time. Collect enough cash to beat current level. Earn more cash by unlock new better cars. Game Features: * Endless Zigzag Running. * 50 levels to challenge. * Simple But Fun. * 10 advanced cars to unlock."
    },
    {
        "index": 223,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gvs7p4se8dr3j7wk21fhojo6b8m43mhq/512x384.jpg",
        "name": "ABC Halloween",
        "url": "https://html5.gamemonetize.com/gvs7p4se8dr3j7wk21fhojo6b8m43mhq/",
        "text": "ABC Halloween is a delightful educational game for kids ages 2-6, combining alphabet learning with Halloween fun! Children explore a magical world filled with friendly ghosts, pumpkins, and witches, learning letters through interactive visuals and exciting mini-games. With an easy-to-use interface, safe ad-free environment, and adorable characters, ABC Halloween makes learning the ABCs a treat! Download ABC Halloween and let your child enjoy a spooky, educational adventure!"
    },
    {
        "index": 224,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5i0vrym62yzsweueas3avpgrccn6lwun/512x384.jpg",
        "name": "Baby Smartphone",
        "url": "https://html5.gamemonetize.com/5i0vrym62yzsweueas3avpgrccn6lwun/",
        "text": "This fun educational game is the perfect tool to engage your little one in a world of learning and entertainment! With its colorful and adorable images, it will teach them numbers and songs through classic rhymes that they can sing along with for hours. It&amp;rsquo;s designed to captivate young minds, fostering both creativity and memory skills as they associate visuals with sounds and learn in a playful, interactive environment. Plus, it&amp;rsquo;s totally free, so you can enjoy all the benefits without any cost. Give it a try today - it&amp;rsquo;s a fun way for your child to discover the joy of learning while having a blast! You won&amp;rsquo;t regret it!"
    },
    {
        "index": 225,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xhcyeuuown2tyz55w6ookuyf4hqszk9j/512x384.jpg",
        "name": "Layer Man 3d Run Collect",
        "url": "https://html5.gamemonetize.com/xhcyeuuown2tyz55w6ookuyf4hqszk9j/",
        "text": "Ready for an exciting running adventure in Layer Man 3D: Run Collect! Here, you will play as a collection expert. Run around various obstacle courses, collect items, and improve yourself! All you have to do is collect as many coil springs as possible on the track. The more layers you collect, the larger the coil will become."
    },
    {
        "index": 226,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lktavtmelnunk2sl1erg9q4hsn85islm/512x384.jpg",
        "name": "3D Golf Adventure",
        "url": "https://html5.gamemonetize.com/lktavtmelnunk2sl1erg9q4hsn85islm/",
        "text": "3D Golf Adventure is a fun and engaging online game designed for players of all ages. This game combines elements of mini-golf with an exciting 3D environment, bringing a fresh twist to the traditional golfing experience.The goal in 3D Golf Adventure is simple: get the golf ball into the hole. Players need to carefully aim and control the power of their shots to navigate through each course. Avoiding Obstacles: Watch out for water hazards and walls scattered around the terrain. These obstacles add a layer of challenge, requiring players to strategize their shots to avoid losing strokes or getting stuck."
    },
    {
        "index": 227,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9vrdlxdyokgp8hwhi7eseyg72k3pa54w/512x384.jpg",
        "name": "4color swipe",
        "url": "https://html5.gamemonetize.com/9vrdlxdyokgp8hwhi7eseyg72k3pa54w/",
        "text": "4color swipe is simple, yet highly engaging game challenges players to swipe on the screen to send a ball in the correct direction based on its color. As the game progresses, the difficulty ramps up, offering an increasingly challenging experience that keeps you on your toes. The objective is to accurately swipe the ball in the right direction when it reaches the central circle, according to its color. You only get one chance to make the right move, so quick reflexes and sharp focus are key to success!"
    },
    {
        "index": 228,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3p0c5gp13e1cmlw7dew2pvjulv2akyxu/512x384.jpg",
        "name": "Army Truck Simulator 2024",
        "url": "https://html5.gamemonetize.com/3p0c5gp13e1cmlw7dew2pvjulv2akyxu/",
        "text": "Take control of a cargo army truck in a military game and deliver high-ranking soldiers to their camp. Carrying out your assignment as an army truck driver cargo in this military game is no easy feat, especially when youre an officer. The highways are filled with hazards and obstacles. Nonetheless, as a fearless soldier and expert driver, you must carry out your responsibilities and drive the army truck games fearlessly to transport your ammo and troops to an alternate military station. Web Dev &lt;a href='https://kiz10.com//'&gt;https://kiz10.com//&lt;/a&gt;"
    },
    {
        "index": 229,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9vz6x0b5dmyk48s8nalz74iupnzh3tyq/512x384.jpg",
        "name": "Plane Crash Ragdoll Simulator",
        "url": "https://html5.gamemonetize.com/9vz6x0b5dmyk48s8nalz74iupnzh3tyq/",
        "text": "As a fearless pilot, your mission is simple: survive a relentless onslaught of rockets targeting your aircraft. But dont be fooled by how easy it looks. Youll feel the rush of adrenaline as you fire rockets at your enemies and fly through dangerous skies! Features: - Many Game Modes: Avoid Rockets, Destroy Enemies and Low Fuel Landing! - Variety of Aircraft: from planes to helicopters - Customizable Skins: unlock various skins for character and aircraft - Realistic Physics &amp;amp; Ragdoll Pilot! - Challenging Levels and Scenarios"
    },
    {
        "index": 230,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hrwkashqoo7fhvppv99z1ri63xxj70qd/512x384.jpg",
        "name": "Cell Escape",
        "url": "https://html5.gamemonetize.com/hrwkashqoo7fhvppv99z1ri63xxj70qd/",
        "text": "Cell Escape is an engaging physics-based puzzle game featuring 60 exciting levels! Your objective is to eliminate all boxes and blocks&amp;mdash;except for the grassy area&amp;mdash;where the prisoner is located. Just click or tap on the blocks to destroy them strategically. Use the remaining blocks creatively to guide the prisoner safely onto the grass. If you make a mistake, don&amp;rsquo;t worry&amp;mdash;you can easily reset the level and try again. Challenge yourself to solve each puzzle and help the prisoner escape in this captivating physics adventure! Web Dev &lt;a href='https://www.giugames.com/'&gt;https://www.giugames.com/&lt;/a&gt;"
    },
    {
        "index": 231,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/594795s0fh64izkmnelrpracbmz1we3t/512x384.jpg",
        "name": "Giveaway Checkers",
        "url": "https://html5.gamemonetize.com/594795s0fh64izkmnelrpracbmz1we3t/",
        "text": "Giveaway Checkers or AntiCheckers or Reversed Checkers. Play with computer, online with friends, or together on same screen. - Selection of time control modes: unlimited, bullet, blitz, rapid, classic - 8 difficulty levels from Beginner to World Champion - Display of possible moves when choosing a piece - Interactive tips on how to play better during the game - Cancel the move, if there was a yawn, you can go back - The ability to replay the game from the right place - Interact with the opponent through funny cartoon emotions - Real live players - Saving the rating, you can compete with leaders"
    },
    {
        "index": 232,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yshmlvi9nfvclrsb5717cormnog76789/512x384.jpg",
        "name": "Quiz Goose Math",
        "url": "https://html5.gamemonetize.com/yshmlvi9nfvclrsb5717cormnog76789/",
        "text": "Looking for a fun and educational game? Look no further than Quiz Goose Math! Roll the dice and step into the boxes, but watch out for the quiz boxes that will test your math skills. Answer correctly to advance further, but be careful - incorrect answers will set you back. With challenging questions and entertaining gameplay, Quiz Goose Math is the perfect blend of learning and fun. Play now and see how far you can go!"
    },
    {
        "index": 233,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/e472eyiyyaeamdjqjipbl1txpuf2soto/512x384.jpg",
        "name": "Shopaholic Black Friday",
        "url": "https://html5.gamemonetize.com/e472eyiyyaeamdjqjipbl1txpuf2soto/",
        "text": "Experience fashion fun like never before with the Shopaholic Black Friday game! This online dress-up game stars Selena Gomez, ready for a shopping spree. Navigate through a variety of makeup products, and indulge in chic fashion pieces. Hit the mall, shop as many items before the time runs out, and then return for another styling adventure. Explore an array of lipstick hues, experiment with smoky eyes, or go for colorful shadows, and browse through fashionable dresses, trendy tops, and stylish shoes. Complete the look with dazzling accessories and designer bags. Have a blast!"
    },
    {
        "index": 234,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/silz8kmpkeyd6wdwtkirsv1dijinroaf/512x384.jpg",
        "name": "Mega Fall Ragdoll Simulator",
        "url": "https://html5.gamemonetize.com/silz8kmpkeyd6wdwtkirsv1dijinroaf/",
        "text": "Want to relax? In this stress-relieving game, you need to break as many bones as possible on your ragdoll doll by falling from tall buildings and points across a variety of levels. - Stress-relief: Push your ragdoll dummy off towering buildings for maximum damage! - Ultra Destroy: Realistic ragdoll impact physics! - Totally immersive: Feel every bone of your character with audio and modern graphics - Strategic gameplay: Test your strategic thinking as you navigate complex levels and devise creative solutions to overcome obstacles and earn more coins. - Customize your experience: Unlock new levels and skins to personalize your ragdoll."
    },
    {
        "index": 235,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/986fun05qwydiarux83m6eoy6bv94voc/512x384.jpg",
        "name": "Mythic Auto Chess Realms",
        "url": "https://html5.gamemonetize.com/986fun05qwydiarux83m6eoy6bv94voc/",
        "text": "Mythic Auto Chess Realms is an auto chess strategy adventure game that combines the classic auto chess gameplay with a relaxing idle playstyle, offering players a brand-new gaming experience. In Mythic Auto Chess Realms, diverse team compositions and countless strategies await for you to unlock and enjoy a different kind of fun."
    },
    {
        "index": 236,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/iyxx3kkaeraxzs9vi3b1lj85na9bjpyq/512x384.jpg",
        "name": "Bouncy Ball Vanishing Bars",
        "url": "https://html5.gamemonetize.com/iyxx3kkaeraxzs9vi3b1lj85na9bjpyq/",
        "text": "Get ready for a bouncing challenge in Bouncy Ball - Vanishing Bars! Keep your ball bouncing over a set of bars that appear and disappear at random. Time your jumps perfectly to avoid falling through the gaps and see how long you can last. The higher you bounce, the more points you score! Test your reflexes and timing in this addictive and fast-paced game!"
    },
    {
        "index": 237,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p6awx5njobc4v40mxq7eljvskqw28u57/512x384.jpg",
        "name": "Santa In a Pot",
        "url": "https://html5.gamemonetize.com/p6awx5njobc4v40mxq7eljvskqw28u57/",
        "text": "Today is Christmas! and Santa needs your help! Try to help santo to go int to the pot and complete each level! Enjoy this xmas puzzle theme physic game! Web Dev &lt;a href='https://www.giugames.com/'&gt;https://www.giugames.com/&lt;/a&gt;"
    },
    {
        "index": 238,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/r4dpgggva8y5dexih070qs3jyzi7uup5/512x384.jpg",
        "name": "Penty",
        "url": "https://html5.gamemonetize.com/r4dpgggva8y5dexih070qs3jyzi7uup5/",
        "text": "Penty is a fun and addictive HTML5 game where you need to connect adjacent gems of the same color to score big. With its simple yet challenging gameplay, Penty is sure to keep you entertained for hours. Play now and see how high you can score!"
    },
    {
        "index": 239,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/grcoj83culvapsxit0uaznoyk1yqf6a0/512x384.jpg",
        "name": "Emoji Skill Puzzles",
        "url": "https://html5.gamemonetize.com/grcoj83culvapsxit0uaznoyk1yqf6a0/",
        "text": "Emoji Skill Puzzles is an engaging skill game. Featuring levels constructed entirely with popular emojis. The game offers six distinct puzzle types: link puzzle, memory puzzle, word quiz, related puzzle, shadow puzzle, and crop puzzle. This game is perfect for players who enjoy brain teasers and want to test their problem-solving skills."
    },
    {
        "index": 240,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/txwl3520lsglou2w07efd3tlymvue57o/512x384.jpg",
        "name": "Jump and Fly",
        "url": "https://html5.gamemonetize.com/txwl3520lsglou2w07efd3tlymvue57o/",
        "text": "Join the adventure in Jump and Fly, where youll guide an energetic squirrel and a cheerful bee through a vibrant and whimsical forest! Jump from platform to platform, collect coins, and grab power-ups to boost your abilities in this action-packed game. Embark on a magical journey and help our adorable characters reach new heights. Whether you&amp;rsquo;re a seasoned gamer or new to mobile gaming, Jump and Fly offers endless fun and excitement."
    },
    {
        "index": 241,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/m9rmolvne3a31grtkcbwj0s6b123aq8v/512x384.jpg",
        "name": "Horror Ban Ban 1 2 Player Parkour",
        "url": "https://html5.gamemonetize.com/m9rmolvne3a31grtkcbwj0s6b123aq8v/",
        "text": "The terrifying siblings need to escape the haunted house. They must face their fears and collect what they need to get away. Choose one of the two siblings and escape together. Each sibling has specific items to gather, and you&amp;rsquo;ll need to find the red and blue remotes to unlock the door. Be very careful&amp;mdash;there are thorns and sharp knives everywhere in this frightening house. Make sure to reach the door safely!"
    },
    {
        "index": 242,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gkqfxpc88k3u5ac09dslws82ivboob75/512x384.jpg",
        "name": "Spooky Links",
        "url": "https://html5.gamemonetize.com/gkqfxpc88k3u5ac09dslws82ivboob75/",
        "text": "Spooky Link is a relaxing Halloween-themed game where you connect matching spooky tiles. Tap a tile, then tap its match. If the path between them has two or fewer turns, the tiles are cleared. Each cleared tile creates more space to connect others. Enjoy many levels of fun with Halloween surprises!"
    },
    {
        "index": 243,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/d41vzzxrgz9tzrkmdeezt7e8vxnrjfy0/512x384.jpg",
        "name": "Candy Cascade",
        "url": "https://html5.gamemonetize.com/d41vzzxrgz9tzrkmdeezt7e8vxnrjfy0/",
        "text": "Click on groups of two or more candies to destroy them. You need to collect certain amount of different sweets on every level. Wooden blocks, honey and jam should be cleared from the game field. If there is a key on the game field it should be dropped down. The moves are limited for each level. If you have hard time with a task you can use bonuses that can be received when you collect jam. here are 40 levels in the game. And if the first levels seem simple to you, then I have strong doubts that many people will pass the last one. But I think that if you have a lot of bonuses, it can really be done"
    },
    {
        "index": 244,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xvuzcyxxdd4wtc95j2kxe6afp4tppwio/512x384.jpg",
        "name": "Alien Buster",
        "url": "https://html5.gamemonetize.com/xvuzcyxxdd4wtc95j2kxe6afp4tppwio/",
        "text": "Alien Buster is an adrenaline-fueled shooting game that pits players against a relentless alien invasion in a quest to save Earth. Equipped with an arsenal of futuristic weapons, players face off against waves of powerful extraterrestrial enemies across a variety of intense levels and visually stunning landscapes. Alien Buster is perfect for fans of space combat and shooter games, offering hours of thrilling gameplay. Do you have what it takes to defend Earth and become the ultimate alien-bursting hero? Download Alien Buster today and join the battle!"
    },
    {
        "index": 245,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ny4cfrf39v7lm3xk6yata4uyu9nxho6g/512x384.jpg",
        "name": "Crash Em Zombies",
        "url": "https://html5.gamemonetize.com/ny4cfrf39v7lm3xk6yata4uyu9nxho6g/",
        "text": "Welcome to Crash Em Zombies Game! Tap or click to change the car direction and start crashing zombies along the way. Avoid obstacles and collect boosters to reach the highest score. Good luck!"
    },
    {
        "index": 246,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6wdmcd732arglt1snp6usmsdan4wuhhp/512x384.jpg",
        "name": "Spot Unique Animal",
        "url": "https://html5.gamemonetize.com/6wdmcd732arglt1snp6usmsdan4wuhhp/",
        "text": "Test your observation skills in Spot Unique Animal! Find the one animal without a duplicate among a group of wild creatures like lions, tigers, and elephants. Each level gets harder as more animals appear. Can you spot the unique one? A fun challenge for all ages!"
    },
    {
        "index": 247,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jayv1ip186ga9nfzx9z5nm2f5tjkycfs/512x384.jpg",
        "name": "Purple Clicker Game",
        "url": "https://html5.gamemonetize.com/jayv1ip186ga9nfzx9z5nm2f5tjkycfs/",
        "text": "In this game, all you have to do is click on the screen or mouse. You can see your clicks per second and your total clicks. Its a very simple game."
    },
    {
        "index": 248,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5xdhv37nxb6dpd7chw33kb82sjrgh8rs/512x384.jpg",
        "name": "Retro Jack",
        "url": "https://html5.gamemonetize.com/5xdhv37nxb6dpd7chw33kb82sjrgh8rs/",
        "text": "Retro Jack is a pixel-style adventure game where players guide a lively pumpkin character named Jack through eerie forests and spooky landscapes. The main objective is to collect sparkling jewels scattered across each level while skillfully avoiding rolling stones that appear suddenly and threaten to crush Jack. With increasing levels of difficulty, intuitive controls, and nostalgic pixel graphics, Retro Jack combines classic arcade gameplay with a Halloween twist, offering an engaging experience as players help Jack complete his thrilling jewel-collecting quest."
    },
    {
        "index": 249,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4k579xvfap5w0zh3j1uk9gznj41c51r5/512x384.jpg",
        "name": "Mona Lisa Fashion Experiments",
        "url": "https://html5.gamemonetize.com/4k579xvfap5w0zh3j1uk9gznj41c51r5/",
        "text": "Welcome to a small humorous adventure in which you will try on the role of a stylist for the most mysterious lady of all time - Mona Lisa Gioconda. Connect the past and the present by mocking trends and memes. Each of your changes is a small work of art, and each outfit immediately causes fireworks of pleasant emotions!"
    },
    {
        "index": 250,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/50o3tezgwknif6v8in5lghl0mt3pxwke/512x384.jpg",
        "name": "Cube Master",
        "url": "https://html5.gamemonetize.com/50o3tezgwknif6v8in5lghl0mt3pxwke/",
        "text": "Dive into the world of Cube Master, the ultimate cube-matching adventure! Match, blast, and conquer your way through challenging levels filled with vibrant cubes and exciting power-ups. Cube Master brings you hours of engaging gameplay, where your puzzle skills will be put to the test with each new level!Get ready to swipe, match, and blast in Cube Master! Perfect for puzzle lovers of all ages, this game promises endless fun and excitement. Are you ready to become the ultimate Cube Master? Download now and start matching!"
    },
    {
        "index": 251,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t5dupwqivsoahc1au7vpiei6q640cmzu/512x384.jpg",
        "name": "Screw Jam",
        "url": "https://html5.gamemonetize.com/t5dupwqivsoahc1au7vpiei6q640cmzu/",
        "text": "Move your fingers to solve the screw puzzle! This game is very stress relieving, you can have a different kind of fun in the game, come and try it!"
    },
    {
        "index": 252,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dtkbzxwyvrgtd7wecflu5dvnlldo9l41/512x384.jpg",
        "name": "Kids Dentist Asmr Salon",
        "url": "https://html5.gamemonetize.com/dtkbzxwyvrgtd7wecflu5dvnlldo9l41/",
        "text": "Do you like dentist games? Or do you dream of opening a dental clinic? Then you will enjoy playing this educational doctor game. You can learn how to perform dental procedures such as fillings, dentures, cleaning, extractions, stain removal, dental implants, teeth whitening, and much more in a dental clinic. You can perform the best oral braces dental surgery with this surgery simulation game. You need to perform dental surgeries to remove cavities and fill them. After all, they all just need your expertise and a little help."
    },
    {
        "index": 253,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/vi9vyf7fpagibh2ydio5mkdr010olwr3/512x384.jpg",
        "name": "Baby Bella Braid Hair Salon",
        "url": "https://html5.gamemonetize.com/vi9vyf7fpagibh2ydio5mkdr010olwr3/",
        "text": "This is a make-up and hair game for girls. Do you want to design your favorite hairstyle? If youre going to design a hairstyle that suits you, our game can fulfill your desire. The game will offer a cool hair spa, weaving, and back hair coloring."
    },
    {
        "index": 254,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/vgvjnzi0s2per2w33lfs0w1eu5icwy93/512x384.jpg",
        "name": "Toops",
        "url": "https://html5.gamemonetize.com/vgvjnzi0s2per2w33lfs0w1eu5icwy93/",
        "text": "Toops is the ultimate HTML5 game that challenges players to break different shapes by swiping their finger and throwing balls down. With new gameplay elements and endless fun, try to break as many shapes as possible before they move to the top. Play now and test your skills!"
    },
    {
        "index": 255,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mcu1qexvqwksgoby0bw05y01hqzxlfsu/512x384.jpg",
        "name": "Cubble on top",
        "url": "https://html5.gamemonetize.com/mcu1qexvqwksgoby0bw05y01hqzxlfsu/",
        "text": "cubble on top is a very unique jumping game, you have to jump onto the cliff walls to get to the top and get to the finish, your patience will be tested in this game"
    },
    {
        "index": 256,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9vwyi3z5ew1y0fkt7sl3veu7z8gg9hfy/512x384.jpg",
        "name": "Bubble Merge 2048",
        "url": "https://html5.gamemonetize.com/9vwyi3z5ew1y0fkt7sl3veu7z8gg9hfy/",
        "text": "Welcome to Bubble Merge 2048, where classic 2048 meets exciting bubble-blasting action! Shoot, merge, and blast through puzzles filled with colourful bubbles and challenges. Match numbers and colours, solve brain-teasing puzzles, and smash obstacles as you journey through this one-of-a-kind adventure. Features: - Unique Challenges: Every level introduces fresh puzzles, obstacles, and surprises. - Boosters &amp;amp; Power-Ups: Unlock dynamite, rockets, and more to clear tricky stages. - Win Rewards: Collect stars on each level to open Star Chests with rewards. - Realistic Physics: Watch the bubbles bounce and interact like real life!"
    },
    {
        "index": 257,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3muhrlhyqf4lpdux52p7buuegacaspf7/512x384.jpg",
        "name": "Lucy Makeup And Dress Up",
        "url": "https://html5.gamemonetize.com/3muhrlhyqf4lpdux52p7buuegacaspf7/",
        "text": "Are you a fan of makeup games and dress-up games for girls? Do you dream of being a make-up artist for a princess? If you want to get the princess a makeover, our game is perfect for you. You can start with a relaxing facial and add eye shadow to make the princesss eyes sparkle."
    },
    {
        "index": 258,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rsamlcd9ez1drgzppwadisina1ptps25/512x384.jpg",
        "name": "Spot The Unique Halloween",
        "url": "https://html5.gamemonetize.com/rsamlcd9ez1drgzppwadisina1ptps25/",
        "text": "Test your observation skills in Spot the Unique Halloween! Look through spooky characters like ghosts, witches, and vampires to find the one that is different. Each level gets harder with more portraits to search. Can you find the unique one? A fun Halloween game for all ages!"
    },
    {
        "index": 259,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/szb7rfuwk4wnsktxfcpoa49d7r1ircbq/512x384.jpg",
        "name": "Point to Merge",
        "url": "https://html5.gamemonetize.com/szb7rfuwk4wnsktxfcpoa49d7r1ircbq/",
        "text": "Point to Merge is an engaging puzzle game where player must strategically connect numbered blocks to reach the highest value possible. Starting with two blocks numbered 2, the player must point arrows to direct each block towards its match, merging numbers in a sequence (2, 4, 8, 16, etc.). Precision is key&amp;mdash;one wrong move or pointing outside the level restarts the puzzle! With 50 progressively challenging levels, Point to Merge combines sharp thinking and skillful direction to master the art of merging. Can you reach the final number?"
    },
    {
        "index": 260,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yt8kpi3lpnk6r62jpn7cckge4h9us3ux/512x384.jpg",
        "name": "Crab Penalty",
        "url": "https://html5.gamemonetize.com/yt8kpi3lpnk6r62jpn7cckge4h9us3ux/",
        "text": "Step into the sandy arena of Crab Penalty, where you take on the challenge of scoring goals with an unlikely yet charming player&amp;mdash; a crab! Set on a picturesque beach, this fun and engaging game combines the thrill of penalty shooting with the unique twist of controlling a crab. Aim carefully and use your skills to outsmart the goalie, ensuring your crab kicks the ball into the net. Crab Penalty offers endless entertainment and a delightful seaside adventure."
    },
    {
        "index": 261,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y1u8kfpu0lymi72uz9s4nqzs9oztmcot/512x384.jpg",
        "name": "Roblox Climb Motorbike",
        "url": "https://html5.gamemonetize.com/y1u8kfpu0lymi72uz9s4nqzs9oztmcot/",
        "text": "In the adventure game Roblox Climb Motorbike, players may spend a lot of time racing on insane roads, acquiring interesting skins, improving Obbys bike, and completing difficult parkour courses. For fans of fast-paced, skill-based games, this is a must-play because of the thrilling combination of racing, platforming, and character advancement. In this adrenaline-pumping game, youll have to crank your engines, level up your character, and complete parkour tasks. Play this fun obstacle course game on your bike and try to complete each level. Make sure you dont contact the hazardous obstacles in each level before the timer runs out; doing so"
    },
    {
        "index": 262,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qahsfosbapnzdo3ya16hjf9uudzw7eob/512x384.jpg",
        "name": "Football Leauge",
        "url": "https://html5.gamemonetize.com/qahsfosbapnzdo3ya16hjf9uudzw7eob/",
        "text": "Step into the thrill of the stadium with Football League, a fast-paced, action-packed soccer game where you lead your team to victory! Choose your players, master your tactics, and score incredible goals to climb the ranks and become the champion. With intuitive controls, stunning graphics, and dynamic gameplay, Football League delivers an immersive soccer experience for players of all skill levels."
    },
    {
        "index": 263,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3iszjm1ew73xv6nwpnjly72o7jsezlu9/512x384.jpg",
        "name": "Hexa Dots",
        "url": "https://html5.gamemonetize.com/3iszjm1ew73xv6nwpnjly72o7jsezlu9/",
        "text": "Match colorful dots in this addictive hexagonal puzzle game. Challenge your mind with Hexa Dots! Dive into the vibrant world of Hexa Dots: Color Match Puzzle, the ultimate color-matching challenge designed to test your brain and keep you entertained for hours! Arrange and match colorful hexagonal dots to solve intricate puzzles and unlock new levels. With smooth gameplay, stunning graphics, and hundreds of levels, Hexa Dots is the perfect game to sharpen your strategic skills and unwind."
    },
    {
        "index": 264,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l6by3mxcqrjf5hagenq9oh0d4rpixwh1/512x384.jpg",
        "name": "Jigsaw Halloween",
        "url": "https://html5.gamemonetize.com/l6by3mxcqrjf5hagenq9oh0d4rpixwh1/",
        "text": "Get into the Halloween spirit with our spooky jigsaw puzzle game! Choose from a collection of hauntingly fun images, from creepy castles to grinning jack-o&amp;rsquo;-lanterns, eerie graveyards, and adorable monsters. Each puzzle has different difficulty levels, so you can piece together a quick fright or tackle a tricky masterpiece. Perfect for all ages, this game is full of Halloween magic and mystery! Sharpen your mind as you enjoy festive music, atmospheric sounds, and vibrant visuals. Can you complete all the puzzles before Halloween night?"
    },
    {
        "index": 265,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2m43hd8iyydapf3qp4ogzbhm50aem850/512x384.jpg",
        "name": "Hippo Good Morning",
        "url": "https://html5.gamemonetize.com/2m43hd8iyydapf3qp4ogzbhm50aem850/",
        "text": "This is an educational game designed for kids. Each citizen has his interesting tasks in the morning. We will bush our teeth, bathe, exercise, clean up, and prepare meals with the characters. It would help if you woke up the hippo family in the morning."
    },
    {
        "index": 266,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mblvj47zl43zklf6ylwc480dm93id6pj/512x384.jpg",
        "name": "Bubble Wheel Halloween",
        "url": "https://html5.gamemonetize.com/mblvj47zl43zklf6ylwc480dm93id6pj/",
        "text": "Play Bubble Wheel Halloween and get ready for spooky bubble-shooting fun! Aim and shoot to match Halloween-themed bubbles on a rotating wheel. Line up groups of 3 or more to collect them all and clear the board. With each spin, new bubbles appear, adding excitement to every shot!"
    },
    {
        "index": 267,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/aeej2k3czrlzgs7vf32b8uza49cxmyr0/512x384.jpg",
        "name": "ASMR Doll Repair",
        "url": "https://html5.gamemonetize.com/aeej2k3czrlzgs7vf32b8uza49cxmyr0/",
        "text": "Do you like dolls? Have you been looking for a fun make-up doll-making game for girls? This DIY doll game is for you. You can choose your favorite model, repair it, dress it up, and finally choose a box to put it in. The game has interesting actions that give you a real experience of fixing the doll."
    },
    {
        "index": 268,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qyatso0vkjq5zz2e0lbzwua064bhfz3y/512x384.jpg",
        "name": "Cars Movement",
        "url": "https://html5.gamemonetize.com/qyatso0vkjq5zz2e0lbzwua064bhfz3y/",
        "text": "Experience the thrill of Cars Movement, the exciting arcade game where you must blast bad guys before they get too close. Use balls in the right color to succeed, but beware - using the wrong color could cost you. Enjoy endless hours of fun and challenge your skills in this action-packed adventure. Play Cars Movement today and have a blast!"
    },
    {
        "index": 269,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dknfzlo018fucv5igyifvwuiprwrhtxy/512x384.jpg",
        "name": "Match 3D Puzzle Mania",
        "url": "https://html5.gamemonetize.com/dknfzlo018fucv5igyifvwuiprwrhtxy/",
        "text": "Enter the world of match-3 game brought to life in 3D. Solve captivating puzzles and collect coins to acquire power-ups. Complete daily tasks to earn fantastic bonuses and experience endless fun with every move you make!"
    },
    {
        "index": 270,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/92la82a07m5svdcghv5t1ytio7bf4q9j/512x384.jpg",
        "name": "Ping Pong Table Tennis",
        "url": "https://html5.gamemonetize.com/92la82a07m5svdcghv5t1ytio7bf4q9j/",
        "text": "In Ping Pong: Table Tennis, you&amp;rsquo;ll enter the exciting world of table tennis matches! This game allows you to enjoy the fun of sports! It&amp;rsquo;s a perfect casual game for every Ping Pong enthusiast.The gameplay is simple and easy to play. Control the ping-pong racket, hit the ball accurately,and react quickly! In every game, use skill and tactics. Beat your opponent and fight for every point. Your opponents will get tougher, try to adjust your strategy and find their weaknesses!"
    },
    {
        "index": 271,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gh4fsyibqblnmxoguql3xlknayx6kkyd/512x384.jpg",
        "name": "Baby Panda Hurricane Safety",
        "url": "https://html5.gamemonetize.com/gh4fsyibqblnmxoguql3xlknayx6kkyd/",
        "text": "This is an educational game about typhoon safety. When typhoon weather comes, gusty winds can blow down trees and torrential rains cause floods and mudslides."
    },
    {
        "index": 272,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/f14b5re8k0zdeyk543fe5tddex4rtmc4/512x384.jpg",
        "name": "Dots   Line",
        "url": "https://html5.gamemonetize.com/f14b5re8k0zdeyk543fe5tddex4rtmc4/",
        "text": "An interesting puzzle in the Connect the dots genre. On intelligence and ingenuity. Connect the lines without lifting your hands; you cannot draw along the same line twice. If you liked this game, I would appreciate your support! Just write a positive review and tell us what inspired you about it! What needs to be added or removed in the game, write too! 1 Connect the lines without lifting your hands. 2 You cannot draw along the same line twice. 3 A game of intelligence and ingenuity. A puzzle game in the Connect the dots genre. The goal is to connect all the points with lines without drawing the same line twice."
    },
    {
        "index": 273,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/44sxsynioman2bc97v1vg6u97jn12o1x/512x384.jpg",
        "name": "Pet Health Care",
        "url": "https://html5.gamemonetize.com/44sxsynioman2bc97v1vg6u97jn12o1x/",
        "text": "Do you love caring for pets? Have you ever wanted to be a doctor to treat animals? Our game will satisfy all your needs and hobbies. Three little animals are waiting for your care, they are a panda, a cat, and a unicorn. They are injured and you need to help them to look at the injured part and do surgery."
    },
    {
        "index": 274,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ey7uu8dzuyzmb2at9e361p4qhjvm7feh/512x384.jpg",
        "name": "Leap Legends",
        "url": "https://html5.gamemonetize.com/ey7uu8dzuyzmb2at9e361p4qhjvm7feh/",
        "text": "Embark on a thrilling jungle adventure with Leap Legends! In this action-packed game, you play as an agile monkey, leaping up and down across treacherous platforms, dense forests, and towering trees to collect delicious fruits. Dodge obstacles, time your jumps perfectly, and explore vibrant jungle landscapes while gathering bananas, apples, and more to power up your monkey."
    },
    {
        "index": 275,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/d78x9t15gep72yqiq9kg7h664wslh3iv/512x384.jpg",
        "name": "Grapple Grip",
        "url": "https://html5.gamemonetize.com/d78x9t15gep72yqiq9kg7h664wslh3iv/",
        "text": "Grapple Grip is a puzzle platformer that puts your grapple skills to the test! Equipped with a versatile grapple, youll climb your way through challenging levels. Use the grapple to attach to platforms, hoisting yourself higher and navigating tricky obstacles. Solve puzzles, find the exit, and dont worry if you get stuck&amp;mdash;you can always use the hint button for help. Can you grip your way to the end and conquer every level? Can I play Grapple Grip on mobile devices and desktop? Grapple Grip can be played on your computer and mobil"
    },
    {
        "index": 276,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/f4p7pbnpjvuurax3yvz5s7sl8dxycsnd/512x384.jpg",
        "name": "Fling Jack",
        "url": "https://html5.gamemonetize.com/f4p7pbnpjvuurax3yvz5s7sl8dxycsnd/",
        "text": "Fling Jack is an exciting Halloween-themed game where players launch Jack, a mischievous jack-o-lantern, from platform to platform, collecting coins along the way. Set in spooky environments like haunted forests and eerie graveyards, the goal is to navigate through challenges and avoid spooky obstacles, all while gathering as many coins as possible. The game&amp;rsquo;s simple yet engaging mechanics make it a fun and thrilling adventure, offering endless entertainment for players of all ages, especially during the Halloween season."
    },
    {
        "index": 277,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/kwu9zzh8awehnmc5uio2uugm0n7vffpu/512x384.jpg",
        "name": "Color Parking Drifter",
        "url": "https://html5.gamemonetize.com/kwu9zzh8awehnmc5uio2uugm0n7vffpu/",
        "text": "Drive your car drifting the requested colored parking spaces with precision. Dont get the wrong color or go out of the arena. Also be careful of other car passing by."
    },
    {
        "index": 278,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/w333wv3uafd4lpi7agv25hgsjmeyl2jk/512x384.jpg",
        "name": "Traffic Escape",
        "url": "https://html5.gamemonetize.com/w333wv3uafd4lpi7agv25hgsjmeyl2jk/",
        "text": "Get ready for Traffic Escape &amp;ndash; the ultimate mobile game where you take control of the chaotic city streets and free cars from traffic jams! Every second matters, and your decisions can make or break the game. Will you be able to get all the cars out of the jam? In Traffic Escape, you&amp;rsquo;ll need to check the path for each car by looking at the arrows on top of them. Tap the cars and guide them in the right direction, making sure you avoid other vehicles along the way. Timing and strategy are everything, as even one wrong move could lead to a crash and block the way."
    },
    {
        "index": 279,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/q30u6v6btpdt5qkbkkn4afaqv1a98z73/512x384.jpg",
        "name": "Princess Makeup Hair Salon",
        "url": "https://html5.gamemonetize.com/q30u6v6btpdt5qkbkkn4afaqv1a98z73/",
        "text": "This is a make-up game designed for girls. There are 3 princesses with very different styles in the castle and you need to make up and dress them up to give them a makeover. Princess Emma is a princess with fair skin, big eyes, and an outgoing personality. Princess Isabella is a lovely princess. Princess Ava is an oriental princess with a shy and quiet personality."
    },
    {
        "index": 280,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/beeqqibt1tslj686m48hu07zoftzk7ne/512x384.jpg",
        "name": "Trick Or Spot",
        "url": "https://html5.gamemonetize.com/beeqqibt1tslj686m48hu07zoftzk7ne/",
        "text": "Trick or Spot is a Halloween-themed spot-the-difference game where players must find the subtle differences between two spooky images. Challenge your observation skills as you explore haunted scenes filled with ghosts, pumpkins, and eerie details. Spot all the differences before time runs out in this fun and festive puzzle adventure! Suitable for all ages."
    },
    {
        "index": 281,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/536750dztmchi4cvr7lluh32ckzibqnw/512x384.jpg",
        "name": "Frog Feast",
        "url": "https://html5.gamemonetize.com/536750dztmchi4cvr7lluh32ckzibqnw/",
        "text": "Dive into the vibrant world of Hungry Frog, a fast-paced and addictive game where quick reflexes and sharp attention are your best allies. In this lively adventure, you take on the role of a ravenous frog living in a lush, bustling pond teeming with life and energy. Your mission is simple yet challenging: devour as many flying insects as possible to keep your frog happy and healthy. As insects buzz across the screen, your frog must leap with precision to catch them with its sticky tongue. The more insects you catch, the higher your score climbs. But beware! Missing these elusive bugs will cost you a life."
    },
    {
        "index": 282,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/cd4hjkqwg8pgx61kolqxllt3x4rj7v1j/512x384.jpg",
        "name": "Push The Frog",
        "url": "https://html5.gamemonetize.com/cd4hjkqwg8pgx61kolqxllt3x4rj7v1j/",
        "text": "Control your little frog to eat all the mosquitoes. Master the length of the frogs tongue and make the frog reach the appropriate position to eat the mosquitoes. Think carefully about planning the route. The game has a simple and interesting style, and the gameplay is educational and novel. It is very suitable for playing when killing time."
    },
    {
        "index": 283,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fxepsv92kt9ixrliv43ydy5svre0sqi1/512x384.jpg",
        "name": "Monster High Spooky Fashion",
        "url": "https://html5.gamemonetize.com/fxepsv92kt9ixrliv43ydy5svre0sqi1/",
        "text": "Roblox Halloween Costume Party is the ultimate dress-up experience! Create your spookiest, funniest, or most creative Halloween looks using a variety of Roblox-inspired costumes and accessories. Mix and match outfits to stand out at the party, and get into the Halloween spirit by competing in costume contests with friends. Show off your unique style in this festive and fun-filled game!"
    },
    {
        "index": 284,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4xgsn47qa0ddcrg8jkwqvh9gpesrwbfq/512x384.jpg",
        "name": "Monster Traps Escape",
        "url": "https://html5.gamemonetize.com/4xgsn47qa0ddcrg8jkwqvh9gpesrwbfq/",
        "text": "A laid-back puzzle game where your objective is to descend securely. The gameplay is straightforward at first glance but reveals a surprising depth upon further engagement. Progress through the numerous levels, honing your intellect while enjoying yourself. Web Dev &lt;a href='https://www.brightestgames.com/'&gt;https://www.brightestgames.com/&lt;/a&gt;"
    },
    {
        "index": 285,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/icbj0206w8roveu8tv60mtvyy5txacfw/512x384.jpg",
        "name": "Smashy Bird",
        "url": "https://html5.gamemonetize.com/icbj0206w8roveu8tv60mtvyy5txacfw/",
        "text": "Smashy Bird is a fun and addictive arcade-style game where you take control of two powerful green pipes to crush a tiny, yellow birds as it tries to fly through the gaps. Your goal is to time your smashes perfectly, avoiding letting the bird escape. Each successful smash earns you points, and the difficulty increases as the birds speed ramps up! Easy to pick up but hard to master, Smashy Bird is the ultimate test of timing, precision, and reflexes. How many birds can you smash before they fly away?"
    },
    {
        "index": 286,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hc9izf5pjm906xbakcp4gxv5joe2frtk/512x384.jpg",
        "name": "City Banana Man Agent",
        "url": "https://html5.gamemonetize.com/hc9izf5pjm906xbakcp4gxv5joe2frtk/",
        "text": "Begin an interesting fighting experience in City Banana Man Agent! Youll play as a strange banana agent passing busy city streets. Choose a spot to land and start exploring this wonderful city. Find the target and complete the task. And show your driving skills. Equipped with many powerful weapons and shoot enemies. Aim your gun at the enemy and attack him."
    },
    {
        "index": 287,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/umtbluz413x341ikud89od5qbqllth6q/512x384.jpg",
        "name": "My Cat Town",
        "url": "https://html5.gamemonetize.com/umtbluz413x341ikud89od5qbqllth6q/",
        "text": "Welcome to the Cat Town. Do you like doll placement games? Do you want to know what the world of cats is like? If youre curious about everything, our game will solve your doubts and satisfy your curiosity. The game contains 8 scenes, including a train station, a cats home, a flower garden, a shop, etc."
    },
    {
        "index": 288,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8enw4z5e3vhschgwpwb3gce4g88ezyb9/512x384.jpg",
        "name": "Elemental Domination",
        "url": "https://html5.gamemonetize.com/8enw4z5e3vhschgwpwb3gce4g88ezyb9/",
        "text": "With 145 levels, Elemental Domination is a puzzle game where you, as an alchemist, must unify the elements. Set in a mystical world of alchemy, each level presents a grid filled with different elemental blocks, such as fire, water, earth, and air. Your goal is to transform all the blocks into a single grid element by strategically touching blocks to spread the active element. With increasingly challenging levels, youll need sharp thinking and precise moves to dominate the elements and achieve true alchemical mastery. Can you bring balance to all?"
    },
    {
        "index": 289,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/buhjq6n3d368324rbdfdviun0hu1hyz1/512x384.jpg",
        "name": "Juicy Match",
        "url": "https://html5.gamemonetize.com/buhjq6n3d368324rbdfdviun0hu1hyz1/",
        "text": "Welcome to Juicy Match! Dive into a vibrant world of fruits and fun in this exciting match-3 puzzle adventure. Swap and match delicious fruits to score big and unlock powerful combos! With each level, the challenges increase, pushing your puzzle-solving skills to the limit. Collect stars, achieve the highest scores, and progress through a series of juicy levels. Can you become the ultimate match-3 master?"
    },
    {
        "index": 290,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/govh3xheo7xcct4h7lkbiu5ka4ts1b3h/512x384.jpg",
        "name": "Rolling Ball Halloween Escape",
        "url": "https://html5.gamemonetize.com/govh3xheo7xcct4h7lkbiu5ka4ts1b3h/",
        "text": "Want to have a terrifying adventure in Rolling Ball Halloween scape? This exciting game invites you to roll through a scary world. Here is full of many vivid Halloween decorations! Roll your ball through the eerie sky, avoid obstacles, and escape the haunted landscape! Control your ball,speeding it up or backing it through many obstacles.Pay attention to avoiding swinging pendulums,shattering boxes and so on."
    },
    {
        "index": 291,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l97eqobidhids1gdhpa2tnc2qr49azof/512x384.jpg",
        "name": "Cool Man Adventure",
        "url": "https://html5.gamemonetize.com/l97eqobidhids1gdhpa2tnc2qr49azof/",
        "text": "Hi there! It sounds like youre interested in playing Cool Man Adventure, To play, youll need to jump &amp;amp; run on platforms, avoid obstacles and fire gas , robo, gear ring , and defeat enemies. Dont forget to collect key along the way! The game has 10 levels for you to explore, so theres plenty of adventure to be had."
    },
    {
        "index": 292,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4qiw5byquz6wkyoqrx3uzzc23ak4bmba/512x384.jpg",
        "name": "Jumping Obby",
        "url": "https://html5.gamemonetize.com/4qiw5byquz6wkyoqrx3uzzc23ak4bmba/",
        "text": "Take control of an obby as it jumps through a world filled with platforms and obstacles. Tap to make the obby leap, avoid obstacles, and reach new heights. As you progress, the game gets increasingly challenging with faster speeds and more complex levels. How high can you leap in Jumping Obby?"
    },
    {
        "index": 293,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/17zhjad19qrb0ao3mj1dkzlusgq94i5m/512x384.jpg",
        "name": "Obby Skate Forever Parkour",
        "url": "https://html5.gamemonetize.com/17zhjad19qrb0ao3mj1dkzlusgq94i5m/",
        "text": "In this adventure, youre skating through a very dangerous course, and you must, under no circumstances, fall off. Obby is mastering the art of skateboarding and is navigating through extremely perilous areas. He&amp;rsquo;s skating on top of building rooftops or construction blocks, and sometimes performing very risky moves. The only thing he needs to do is collect all the coins and reach the finish line at the end of the level."
    },
    {
        "index": 294,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/yc1txjkk2iif9u3ycrg580cokdevot1g/512x384.jpg",
        "name": "Little Fingers",
        "url": "https://html5.gamemonetize.com/yc1txjkk2iif9u3ycrg580cokdevot1g/",
        "text": "Little fingers is a casual themed game about pickpocketing in a museum. Players must collect required amounts for each level without getting caught to progress into another level."
    },
    {
        "index": 295,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9ab396domiv6jz15oy33sy75i9j895ax/512x384.jpg",
        "name": "HALLOWEEN 2024 FPS SHOOTER",
        "url": "https://html5.gamemonetize.com/9ab396domiv6jz15oy33sy75i9j895ax/",
        "text": "HALLOWEEN 2024 FPS SHOOTER is an exciting and free-to-play first-person shooting game. Your mission is to shoot as many zombies as possible to unlock new levels. If you run out of bullets, search the ground for more ammo to keep going. Get ready for some spooky, action-packed fun!"
    },
    {
        "index": 296,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/bm57pfcx9wun729i5z0nl4xfelok6g88/512x384.jpg",
        "name": "Launch Jack",
        "url": "https://html5.gamemonetize.com/bm57pfcx9wun729i5z0nl4xfelok6g88/",
        "text": "Launch Jack is an exciting physics-based game where you catapult pumpkins to destroy zombie heads and save Halloween night! As Jack, the fearless pumpkin, you&amp;rsquo;ll launch yourself through spooky, haunted landscapes, aiming to eliminate all zombie heads standing in your way. Strategize your shots, break through tricky obstacles, and unleash powerful combos to clear each level. With increasing challenges, eerie settings, and special power-ups, your goal is simple: destroy all the zombie heads and rescue Halloween from disaster!"
    },
    {
        "index": 297,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/sau8efctplff566hb06hzx5jyhgu6xyd/512x384.jpg",
        "name": "Stick Archer Champion",
        "url": "https://html5.gamemonetize.com/sau8efctplff566hb06hzx5jyhgu6xyd/",
        "text": "Defeat other stick figures and show the world whos the finest archer in Stick Archer Champion, an action game. Delve into the realm of stick figures and unearth their secret meanings. Arm yourself with better bows, arrows, quivers, and shields. Learn new talents and unlock new effects to unlock more arrows. Add personality to your stickman by letting him wear a variety of caps, masks, hairdos, beards, and animations. Add more stickers to the stickman flag collection."
    },
    {
        "index": 298,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lvwa0lm5eaaldyhz43m0rma5oic4ucw6/512x384.jpg",
        "name": "Halloween Run Cat Evolution",
        "url": "https://html5.gamemonetize.com/lvwa0lm5eaaldyhz43m0rma5oic4ucw6/",
        "text": "Want to dive into the festive fun of Halloween Run Cat Evolution? In this challenging parkour game, you&amp;rsquo;ll be a cute cat. Keep running and jumping through the spooky Halloween night while avoiding obstacles to achieve the highest high score!"
    },
    {
        "index": 299,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/anmx97a28zeucvdolw194vdhno0ftjqd/512x384.jpg",
        "name": "Save Woman",
        "url": "https://html5.gamemonetize.com/anmx97a28zeucvdolw194vdhno0ftjqd/",
        "text": "Save Woman - is an exciting game where you have to play the role of a hero rescuing a girl from various dangerous situations. There are many levels waiting for you, each of which represents a unique challenge. In each scenario you are given two options for action, and only one of them will lead to a successful rescue. You will have to think carefully about your decisions, because the wrong choice can lead to failure."
    },
    {
        "index": 300,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hcc3l4hlgfj61qi0os589jin5gcikq1g/512x384.jpg",
        "name": "Hexa Tile Trio",
        "url": "https://html5.gamemonetize.com/hcc3l4hlgfj61qi0os589jin5gcikq1g/",
        "text": "Welcome to Hexa Tile Trio! Your goal is to clear the board by sorting hex tiles into groups of three. Tap a tile to move it to an empty or matching spot below. If no tiles fit, or you run out of space, the level fails. With a ticking clock and unique puzzles, can you master the hex tiles before time runs out?"
    },
    {
        "index": 301,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ztlszg3khe9tmj5ytadql3p1v2hhy4yp/512x384.jpg",
        "name": "Halloween Match Story",
        "url": "https://html5.gamemonetize.com/ztlszg3khe9tmj5ytadql3p1v2hhy4yp/",
        "text": "Embark on a spooky journey with Halloween Match Story, a captivating match-3 puzzle game set in a haunted world filled with eerie delights. As you progress, youll match icons such as skulls, eyeballs, and candy to complete challenging levels. Each successful match leads to unlocking more Halloween surprises and facing exciting new challenges. Be quick, as the clock is ticking! Use helpful power-ups like hammers and bombs to master each level. Immerse yourself in this Halloween adventure brimming with spooky fun and brain-teasing puzzles."
    },
    {
        "index": 302,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/72xlebxuwi7ur2qsggw5f3eyggskf64c/512x384.jpg",
        "name": "Roblox Halloween Costume Party",
        "url": "https://html5.gamemonetize.com/72xlebxuwi7ur2qsggw5f3eyggskf64c/",
        "text": "Roblox Halloween Costume Party is the ultimate dress-up experience! Create your spookiest, funniest, or most creative Halloween looks using a variety of Roblox-inspired costumes and accessories. Mix and match outfits to stand out at the party, and get into the Halloween spirit by competing in costume contests with friends. Show off your unique style in this festive and fun-filled game!"
    },
    {
        "index": 303,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l7tkpn3wgno7kal7vrpb5ghib26y0xjs/512x384.jpg",
        "name": "Scary Halloween Adventure",
        "url": "https://html5.gamemonetize.com/l7tkpn3wgno7kal7vrpb5ghib26y0xjs/",
        "text": "Scary Halloween Adventure takes you on a spooky journey through eerie landscapes filled with ghosts, ghouls, and terrifying surprises. Navigate through haunted houses, creepy forests, and dark caves while solving puzzles and escaping monsters. Can you make it through the night in this spine-chilling Halloween-themed adventure? Test your courage and see if you have what it takes to survive!"
    },
    {
        "index": 304,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zzmd60946ofjq4eyfq9dmdjyaqrkd8pt/512x384.jpg",
        "name": "Black Sphere",
        "url": "https://html5.gamemonetize.com/zzmd60946ofjq4eyfq9dmdjyaqrkd8pt/",
        "text": "In front of you on the screen you will see a playing field on which you will see several round cells. One of them will contain a white ball. One of the cells will be highlighted in a specific color. A black ball will appear at the top of the playing field. You can use the mouse to move it to one of the cells. This must be done in such a way that the black ball then pushes the white one, and it ends up in the selected cell. If you manage to do this, then you will be given points in the Black Sphere game and you will move to the next level of the game."
    },
    {
        "index": 305,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rmy4iqp1ez5wwwn47dfbz23f02pqsghr/512x384.jpg",
        "name": "Wiz Maze",
        "url": "https://html5.gamemonetize.com/rmy4iqp1ez5wwwn47dfbz23f02pqsghr/",
        "text": "Enter the enchanting world of Wiz Maze, where magic and strategy combine in an exciting adventure through mystical mazes. Navigate through intricate levels filled with hidden traps, magical potions, and ancient symbols."
    },
    {
        "index": 306,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6u33n5g5ox2z2llvq6y0wg16lx2brb8g/512x384.jpg",
        "name": "Baby Panda Ice Cream Truck",
        "url": "https://html5.gamemonetize.com/6u33n5g5ox2z2llvq6y0wg16lx2brb8g/",
        "text": "This is a cooking game for all ages. Do you like to eat desserts? Have you ever thought of making a dessert yourself? This game will fulfill your desire. Our game has 3 desserts and you can make any one of them. Summer is here, you can make a smoothie with a cute straw to keep you cool in the summer heat. You can make your cotton candy."
    },
    {
        "index": 307,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/oaun644s4oe19zs7gkzrp6ku0msnr8kz/512x384.jpg",
        "name": "Baby Supermarket For Kids",
        "url": "https://html5.gamemonetize.com/oaun644s4oe19zs7gkzrp6ku0msnr8kz/",
        "text": "Baby Supermarket is a vibrant and educational game designed for young children, offering a fun and interactive virtual shopping experience. Kids can explore colorful aisles, select items, and play educational mini-games that teach numbers, colors, shapes, and basic math skills. Friendly characters guide children through the supermarket, providing tips and encouragement in a safe, ad-free environment. With easy-to-use controls and customization options, Baby Supermarket makes learning enjoyable and engaging for kids. Download Baby Supermarket today and let your child embark on an exciting shopping adventure!"
    },
    {
        "index": 308,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/82hd30wmmyaib1ugyebheafq877zbog2/512x384.jpg",
        "name": "Halloween Murder",
        "url": "https://html5.gamemonetize.com/82hd30wmmyaib1ugyebheafq877zbog2/",
        "text": "Ready for the scary world of Halloween Murder? Colorful Halloween scenes, accompanied by scary ghosts and jack-o -lanterns, enhance the immersion of the game. On this most mysterious night,let you try a nervous assassination adventure! You will be a cunning assassin who will seize the moment to kill the king. Play the king when you kill successfully."
    },
    {
        "index": 309,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lw83yeu8lwx2gjpso3ggowc5kzct9vga/512x384.jpg",
        "name": "Halloween Burst",
        "url": "https://html5.gamemonetize.com/lw83yeu8lwx2gjpso3ggowc5kzct9vga/",
        "text": "Welcome to Halloween Burst Match3 Puzzle Game! Swipe to match 3 or more identical halloween elements to eleminate them and finish your mission. Explore tons of amazing and challenging halloween match3 levels and try to complete them all. Good luck!"
    },
    {
        "index": 310,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ll6shxxye9hg2xbvzjm9oifguz3d62zp/512x384.jpg",
        "name": "Two Colored Ballz ",
        "url": "https://html5.gamemonetize.com/ll6shxxye9hg2xbvzjm9oifguz3d62zp/",
        "text": "In this fast-paced, action-packed game, you control a player ball that changes color between black and white. The goal of the game is to match the color of the player ball with the color of the small balls coming from two directions. If you match the colors, you score points. The game gets faster and more challenging as you progress, so youll need to be quick and nimble to keep up. Features: Fast-paced action: The game is fast-paced and challenging, requiring quick reflexes and good hand-eye coordination. Simple controls: The game is easy to learn and play."
    },
    {
        "index": 311,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tfkxlhdu5tr1ahlm6seozjulmgb4lw5l/512x384.jpg",
        "name": "Adventure Of Tommy",
        "url": "https://html5.gamemonetize.com/tfkxlhdu5tr1ahlm6seozjulmgb4lw5l/",
        "text": "Explore the adventure and fun game Adventure of Tommy. In this adventure many mysterious traps and dangers were waiting for the carter. Player has to play the role of Carter and finish each level and collect gold stars If you like genres such as adventure, action, rpg, platform, quests or just want to have a good time then this game is for you. Features of this game: High Quality graphics. Game size is minimal. Super simple controls. Interesting quests."
    },
    {
        "index": 312,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/sh1osv4nk50eo1inbi27sotw1ox166gc/512x384.jpg",
        "name": "Little Panda Fashion Model",
        "url": "https://html5.gamemonetize.com/sh1osv4nk50eo1inbi27sotw1ox166gc/",
        "text": "Lucy, like many girls, dreams of becoming a fashion model. A new season of modeling competitions is about to begin and she decides to sign up. What preparations does she need?"
    },
    {
        "index": 313,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gm5lqtbe459qocbz21zgkc3nkllqxs9o/512x384.jpg",
        "name": "Dino Jump Game",
        "url": "https://html5.gamemonetize.com/gm5lqtbe459qocbz21zgkc3nkllqxs9o/",
        "text": "Dino Runner is an exciting endless jumping game where your goal is to leap from platform to platform while avoiding villainous frogs. With every successful jump, you earn a point, but beware&amp;mdash;if you touch a frog, its game over! To help you survive, there are two power-ups: a shield that allows you to collide with frogs without dying, and a bomb that clears all enemies on the screen. The challenge is simple&amp;mdash;jump, avoid enemies, and aim to score as many points as possible. How far can you go in Dino Runner?"
    },
    {
        "index": 314,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pd9q3boz8slcln87yeygdy8iuys4hskg/512x384.jpg",
        "name": "Nightmare Couple Halloween Party",
        "url": "https://html5.gamemonetize.com/pd9q3boz8slcln87yeygdy8iuys4hskg/",
        "text": "Nightmare Couple Halloween Party is a spooky and stylish dress-up game where you can help the ultimate nightmare couple prepare for their eerie Halloween bash. Select from a variety of creepy costumes, haunting accessories, and makeup styles to give the couple their perfect spine-chilling look. Unleash your creativity and fashion sense to make this Halloween party an unforgettable one for the nightmare couple!"
    },
    {
        "index": 315,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/99ow7ukt7dgmy1anrbyv8bet1qahu80s/512x384.jpg",
        "name": "Survival Rpg Island Escape",
        "url": "https://html5.gamemonetize.com/99ow7ukt7dgmy1anrbyv8bet1qahu80s/",
        "text": "Do you want to have an exciting island survival adventure in Survival RPG: Island Escape? You will be the last survivor and on a mysterious island of pixels. Collect many resources and make tools.For example, water bottles are used to hold water, knives for defense, fruit for energy and so on."
    },
    {
        "index": 316,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mc3f8eh6sqnelupms1u6ffbwg0b0ua8m/512x384.jpg",
        "name": "Hand Over Hand",
        "url": "https://html5.gamemonetize.com/mc3f8eh6sqnelupms1u6ffbwg0b0ua8m/",
        "text": "Embark on an exhilarating climbing adventure in Hand Over Hand, the ultimate physics-based simulator game! Test your skills as you navigate through challenging levels filled with dynamic obstacles, strategic climbing mechanics, and thrilling ragdoll action. Race to the summit and grab the red flag, but beware of slippery surfaces and tricky terrain that will test your agility and determination. Enjoy dynamic climbing challenges, strategic ragdoll mechanics, and thrilling physics-based action. Collect stars to unlock customization options and enhance your gameplay experience."
    },
    {
        "index": 317,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tfkzhuedplm6zd1zn2gm9wykovhziqei/512x384.jpg",
        "name": "Fruit Picking Fun Game",
        "url": "https://html5.gamemonetize.com/tfkzhuedplm6zd1zn2gm9wykovhziqei/",
        "text": "Welcome to Fruit Picking Fun, a delightful and engaging game for all ages! Dive into the vibrant world of a lush orchard where your goal is to pick as many fruits as possible before time runs out. The orchard is teeming with juicy apples, ripe oranges, succulent strawberries, and many more delicious fruits waiting to be picked."
    },
    {
        "index": 318,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p5qyjh1h8tt4ogt6jxnzg1ckr4ong5x1/512x384.jpg",
        "name": "Flap Up",
        "url": "https://html5.gamemonetize.com/p5qyjh1h8tt4ogt6jxnzg1ckr4ong5x1/",
        "text": "Welcome to the Flap Up game! Tap to jump higher between obstacles and achieve the highest score! Collect coins to unlock amazing new characters! Good luck!"
    },
    {
        "index": 319,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hv0l8i5pkb01048y381d0kt1uu90yr7p/512x384.jpg",
        "name": "Halloween Merge Promax",
        "url": "https://html5.gamemonetize.com/hv0l8i5pkb01048y381d0kt1uu90yr7p/",
        "text": "Drop Halloween-themed balls like wizards, pumpkins, and more! Merge matching balls to create bigger ones in this endless puzzle. Don&amp;rsquo;t let the board fill up! Plan your moves, merge balls, and keep the fun going!"
    },
    {
        "index": 320,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/bpr7anihmy74bfj2r0dyt3hpu2q99j40/512x384.jpg",
        "name": "Spooky Halloween Hidden Pumpkin",
        "url": "https://html5.gamemonetize.com/bpr7anihmy74bfj2r0dyt3hpu2q99j40/",
        "text": "Spooky Halloween Hidden Pumpkin is a thrilling hidden object game where your task is to find all the hidden pumpkins in various haunted locations. Explore eerie landscapes filled with ghosts, skeletons, and spooky surprises while searching for the elusive pumpkins. The levels get more challenging as you progress, with more hidden items and trickier spots. Can you spot all the pumpkins before time runs out in this Halloween adventure?"
    },
    {
        "index": 321,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rjsrfqpejj77m06ociymjtgpm63rrdwz/512x384.jpg",
        "name": "Flappy Bird Classic Pro",
        "url": "https://html5.gamemonetize.com/rjsrfqpejj77m06ociymjtgpm63rrdwz/",
        "text": "Flappy Bird is an arcade game where you control a likeable bird that has to fly through many obstacles all made up of pipes. The mechanics are very simple: you have to tap the screen so that the bird flaps its wings, trying to keep a steady rhythm in order to pass through the pipes scattered through its path. It wont be at all easy to do."
    },
    {
        "index": 322,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l66p6uc8ivvlisk6ussl9gxvuarq46w2/512x384.jpg",
        "name": "Old School Billard Pool",
        "url": "https://html5.gamemonetize.com/l66p6uc8ivvlisk6ussl9gxvuarq46w2/",
        "text": "Simple and casual billiards game, with a classic childhood theme, with some featured characters and small references, have fun! You can be either the red ball or the yellow ball, its your choice!"
    },
    {
        "index": 323,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1efz36e01atydhsch8bhyfletd6dglje/512x384.jpg",
        "name": "Find Ghost",
        "url": "https://html5.gamemonetize.com/1efz36e01atydhsch8bhyfletd6dglje/",
        "text": "Welcome to the Find Ghost Memory Brain Game! Try to remember the orange ghost cards before they are flipped. Once the cards are flipped, tap on the correct cards where the ghosts are hiding. How much levels can you solve?"
    },
    {
        "index": 324,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1n7eufky9udoq7ran8na3nc3n4jv3000/512x384.jpg",
        "name": "Mechangelion Robot Fight",
        "url": "https://html5.gamemonetize.com/1n7eufky9udoq7ran8na3nc3n4jv3000/",
        "text": "Want to fight robots in a mechanical arena? Mechangelion: Robot Fight is a 3D robot action game full of blood. Let you incarnate as a powerful mechanical warrior, and set foot on the peak of the fight! You will as a super robot and engage in fierce battles with enemies."
    },
    {
        "index": 325,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/i1rdur4laoxgp1dk6gviv7stsl05i6ur/512x384.jpg",
        "name": "Skinfluencer Beauty Routine",
        "url": "https://html5.gamemonetize.com/i1rdur4laoxgp1dk6gviv7stsl05i6ur/",
        "text": "Embark on an extraordinary journey of self-expression and embracing imperfections with Skinfluencer Beauty Routine. Guided by Emma, discover the true meaning of beauty from within and embrace confidence in your own skin. Dive into the enchanting world of beauty, fashion, and self-discovery. Unleash your creativity, join Emmas quest to become the ultimate #skinfluencer, and conquer the virtual realm! Experience this brand-new makeover game for girls and let your unique beauty shine through."
    },
    {
        "index": 326,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/a94kuni1z3dj5y89l9oge8ewl6um1b4v/512x384.jpg",
        "name": "Smashy Jack",
        "url": "https://html5.gamemonetize.com/a94kuni1z3dj5y89l9oge8ewl6um1b4v/",
        "text": "Are you tired of so many jacks and jack-o-lantern-like figures creeping through the eerie night? Their spooky reign is over! Now you can vanquish them in this fast-paced, spine-chilling action game. These cursed pumpkins are drawn to the narrow gaps between towering tree trunks, trying to slip through unnoticed. See a glowing pumpkin with fiery eyes moving through the moonlit fog, sneaking between the trunks? Smash it before it escapes! Hear the unsettling rustle as they creep closer? Don&amp;rsquo;t hesitate&amp;mdash;act fast! Time your strike perfectly to crush them between the trees in this ghoulish anti-creeper nightmare. In this reversed Halloween arcade!"
    },
    {
        "index": 327,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4z28t510vr3wakmxq4k6nb8zvxqsnupq/512x384.jpg",
        "name": "Haunted Puzzle Pieces",
        "url": "https://html5.gamemonetize.com/4z28t510vr3wakmxq4k6nb8zvxqsnupq/",
        "text": "Haunted Puzzle Pieces is a spooky jigsaw game with two challenging modes: 16 pieces and 32 pieces. Assemble eerie images piece by piece and enjoy a hauntingly fun puzzle experience. Can you complete the puzzles before the ghosts catch up?"
    },
    {
        "index": 328,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/25tyqwmk5tr9q5jxqpx581usf369udx5/512x384.jpg",
        "name": "Granny Halloween House",
        "url": "https://html5.gamemonetize.com/25tyqwmk5tr9q5jxqpx581usf369udx5/",
        "text": "Want an exciting and scary adventure? Granny: Halloween House is a 3D survival horror game with a Halloween vibe. You will enter a mysterious granny house, where many incredible secrets and terrifying challenges are hidden! Your goal is to escape this creepy place possibly. By exploring Grannys home, look for clues and props to help you escape."
    },
    {
        "index": 329,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/37bnymju4ipw3hmy0faa4jxk46r9pg32/512x384.jpg",
        "name": "Sniper Town",
        "url": "https://html5.gamemonetize.com/37bnymju4ipw3hmy0faa4jxk46r9pg32/",
        "text": "Welcome to Sniper Town, the ultimate gun shooting game! In this game, you play as a sniper on a mission to eliminate your enemies without being detected. Explore a variety of amazing and challenging levels, and strive to complete them all. Good luck!"
    },
    {
        "index": 330,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/snp8lwxavb0cshj020ua2u60oonbty2q/512x384.jpg",
        "name": "Halloween Merge Mania",
        "url": "https://html5.gamemonetize.com/snp8lwxavb0cshj020ua2u60oonbty2q/",
        "text": "Halloween is the season for thrills, chills, and tons of fun games! If youre a fan of puzzle games with a spooky twist, Halloween Merge Mania is the perfect treat for you. Inspired by the popular gameplay style of Suikagame, this addictive game lets you merge creepy Halloween characters to unlock higher-level creatures. Start by combining classic pumpkins and bats, then work your way up to merging iconic monsters like Frankenstein and Jack Skellington. With each new merge, you&amp;rsquo;ll uncover a world packed with eerie fun and excitement. Get ready for a hauntingly good time in Halloween Merge Mania!"
    },
    {
        "index": 331,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8dxdjcvcg6tblpc6oe63eo0b5jqy8o43/512x384.jpg",
        "name": "Blaze Breakout",
        "url": "https://html5.gamemonetize.com/8dxdjcvcg6tblpc6oe63eo0b5jqy8o43/",
        "text": "Blaze Breakout is an intense and thrilling arcade-style game where players navigate through a fiery landscape filled with molten lava and dangerous obstacles. The objective is to guide your character safely through the breakable platforms and avoid falling into the lava below. With its stunning visuals and challenging gameplay, Blaze Breakout is sure to keep you on the edge of your seat as you try to achieve the highest score."
    },
    {
        "index": 332,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zqguki05fu0puclmj5q5pdpef6l8c3kp/512x384.jpg",
        "name": "Halloween Simon",
        "url": "https://html5.gamemonetize.com/zqguki05fu0puclmj5q5pdpef6l8c3kp/",
        "text": "Test your memory in Halloween Simon, where the spooky season comes to life! Watch as a series of eerie Halloween characters&amp;mdash;like witches, ghosts, and vampires&amp;mdash;perform spooky actions on the screen. Your task is simple: memorize the sequence of these haunting movements and repeat them in the exact order! Each round, the sequence grows longer, and the challenge intensifies. Mess up, and you&amp;rsquo;re out! Can you keep up with the creepy creatures and prove your memory skills? Perfect for all ages, this hauntingly fun game will make your Halloween party unforgettable!"
    },
    {
        "index": 333,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qez8kkh1bn1ron3m1sjohncbpkmz2nas/512x384.jpg",
        "name": "Cat Jumper 1",
        "url": "https://html5.gamemonetize.com/qez8kkh1bn1ron3m1sjohncbpkmz2nas/",
        "text": "You play as a nimble cat on a perilous journey. Your mission is to reach the top score by jumping from block to block, avoiding traps. The higher you climb, the more points you earn. Can you beat The First Challenge and prove your feline agility?"
    },
    {
        "index": 334,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rl1akpmqfs4i5y2lxla2dzljqybrv3m4/512x384.jpg",
        "name": "Little Panda Coffee Shop",
        "url": "https://html5.gamemonetize.com/rl1akpmqfs4i5y2lxla2dzljqybrv3m4/",
        "text": "Do you want to have your cafe-restaurant? This dessert-making game takes you to the fun of cooking. As a small shopkeeper, you must make drinks, desserts, and all kinds of delicacies your guests like to eat according to their needs."
    },
    {
        "index": 335,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/m9borgv0blojredyfc0ui6m5wk193nra/512x384.jpg",
        "name": "Spider Evolution Runner",
        "url": "https://html5.gamemonetize.com/m9borgv0blojredyfc0ui6m5wk193nra/",
        "text": "Spider Evolution Runner is a casual 3D running game in which you will become an evolving spider and embark on an exciting adventure! Running on the track, avoid obstacles and collect energy. Evolve into a more powerful spider form."
    },
    {
        "index": 336,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1q8gtpd9hk04ry75punqmrvkgn78tmus/512x384.jpg",
        "name": "Skateboard Obby 2 Player",
        "url": "https://html5.gamemonetize.com/1q8gtpd9hk04ry75punqmrvkgn78tmus/",
        "text": "In this adventure, Obby and his friend Bacon need to navigate through a challenging world filled with skateboards and obstacles to reach the finish line. Stay alert, as you might fall off while skating at high altitudes. Skateboarding has never been this difficult. Be very cautious of the obstacles on the path. Avoid them and make it to the finish line with your friend."
    },
    {
        "index": 337,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/j3a9bdajchqcaca8hztgb37a89baazdo/512x384.jpg",
        "name": "321 Diferent Patch",
        "url": "https://html5.gamemonetize.com/j3a9bdajchqcaca8hztgb37a89baazdo/",
        "text": "321 Diferent Patch is a casual, quick-play game in which you have to discover the different figure among several that look the same. You have three seconds to find the different figure. Look at every detail, that can make the difference. The difficulty increases with every step. And be careful, the figure that is wrong once, may be the right one the next time. Do you want to play quietly? Relax mode is for you. Just like Normal mode, but with plenty of time to examine the figures. And if youre ready, try the Extreme mode."
    },
    {
        "index": 338,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9nx9lsjeruitogiggkk8wf69437t92bz/512x384.jpg",
        "name": "Halloween Pop It",
        "url": "https://html5.gamemonetize.com/9nx9lsjeruitogiggkk8wf69437t92bz/",
        "text": "Enjoy this exciting Halloween season with a fun and spooky twist by playing with this cool Halloween-themed Pop It fidget toy! Perfect for relieving stress or simply keeping your hands busy, this Pop It features vibrant, festive colors and shapes like pumpkins, ghosts, or bats to add to the spooky vibes. Whether youre trick-or-treating, attending a Halloween party, or just relaxing at home, this fidget toy is a great companion for kids and adults alike. Get into the Halloween spirit and enjoy endless popping fun all season long!"
    },
    {
        "index": 339,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ux1yq1sjbqc4m8wh0v2zscp6rg7m117i/512x384.jpg",
        "name": "Hoppy Rushy",
        "url": "https://html5.gamemonetize.com/ux1yq1sjbqc4m8wh0v2zscp6rg7m117i/",
        "text": "Welcome to Hoppy Rushy, a Pixel Platform Game! Tap or click to jump over platforms and avoid falling from the edges. Can you achieve the highest score? Good luck!"
    },
    {
        "index": 340,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/i7ajex45uq13xqubkm8hoi15x51tfoqj/512x384.jpg",
        "name": "Marine Spot The Difference",
        "url": "https://html5.gamemonetize.com/i7ajex45uq13xqubkm8hoi15x51tfoqj/",
        "text": "In Marine Spot the Difference players compare two portraits of sea creatures, identifying the subtle differences between them. Dive into captivating underwater worlds and put your observation skills to the test!"
    },
    {
        "index": 341,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qx51xl07kbaq0a3ky3xw9l0putrhhq1s/512x384.jpg",
        "name": "Perfect Pair",
        "url": "https://html5.gamemonetize.com/qx51xl07kbaq0a3ky3xw9l0putrhhq1s/",
        "text": "Perfect Pair is an electrifying puzzle game that challenges players to connect circuits and light up bulbs using limited moves. Set in a futuristic neon world, players must strategically connect energy sources to light up all the bulbs on each level. With increasingly complex puzzles, Perfect Pair offers hours of brain-teasing fun, testing your logic and problem-solving skills."
    },
    {
        "index": 342,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dtfziaj2zz4xglbzcdctg1uqyttpkj3y/512x384.jpg",
        "name": "Princesses at Horror School",
        "url": "https://html5.gamemonetize.com/dtfziaj2zz4xglbzcdctg1uqyttpkj3y/",
        "text": "In this game, you will meet Laura and Frankie, two charming monsters who study at a school for young monsters. Every morning, the girls carefully think over their images, mixing elements of a classic princess and a creepy monster. Each of the girls has their own special fashion preferences, but when going to class, Laura and Frankie always attract the admiring glances of classmates. After all, they are not just princesses, but real monsters whose terrifying style makes even the bravest tremble!"
    },
    {
        "index": 343,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l9w1m0l09kkykmzfkcfzwayutrwt6u6h/512x384.jpg",
        "name": "Scary Memory",
        "url": "https://html5.gamemonetize.com/l9w1m0l09kkykmzfkcfzwayutrwt6u6h/",
        "text": "Halloween is coming! Are you ready to plunge into the spine-chilling atmosphere of Halloween and test your memory skills? Look no further than Scary Memory, an exhilarating Halloween-themed memory puzzle game. This captivating game will not only entertain you but also challenge your memory retention abilities. Get ready to embark on a thrilling adventure as you strive to eliminate pairs of Halloween elements within a limited number of steps."
    },
    {
        "index": 344,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2tun038tqrgt5410cqk9uc9if0w6a6bi/512x384.jpg",
        "name": "Spooky Halloween Jigsaw Puzzle",
        "url": "https://html5.gamemonetize.com/2tun038tqrgt5410cqk9uc9if0w6a6bi/",
        "text": "Welcome to Spooky Halloween Jigsaw Puzzle, the perfect game to get you in the Halloween spirit! Dive into 15 spooky and fun-filled levels as you piece together eerie Halloween-themed puzzles. From haunted houses to creepy creatures, each puzzle brings a new festive challenge. Perfect for kids and puzzle lovers alike, enjoy the thrill of solving jigsaw puzzles with a spooky twist. Can you complete all 15 levels before Halloween night?"
    },
    {
        "index": 345,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qonrxxtprdpm1s2fwu5g3nkftrepjkdo/512x384.jpg",
        "name": "Centipede Attack 2D ",
        "url": "https://html5.gamemonetize.com/qonrxxtprdpm1s2fwu5g3nkftrepjkdo/",
        "text": "This side-scrolling shooter offered players a unique and addictive gameplay experience that involved guiding a small bug through a maze of mushrooms, avoiding deadly centipedes While the Centipede game may seem old-fashioned by todays standards, it remains a timeless classic. Its innovative gameplay and addictive nature have cemented its place in gaming history"
    },
    {
        "index": 346,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/g7cmii0dc26kv9i9id7v6wrih72p3al9/512x384.jpg",
        "name": "Halloween Theet",
        "url": "https://html5.gamemonetize.com/g7cmii0dc26kv9i9id7v6wrih72p3al9/",
        "text": "Play this adorable variation of a classic video game in halloween theme, Your goal is to avoid the sharp, menacing teeth of the ugly monster chasing you down. The monster gets faster and more aggressive as time goes on, so your reflexes will be put to the ultimate test. Hold out as long as possible, dodge the monster&amp;rsquo;s teeth, and try to set the highest score! Can you survive long enough to achieve the best possible record and outlast your friends in this fun, addictive game? Give it a try!"
    },
    {
        "index": 347,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mwbuw38d15yg9rswqzk3u9mnd8irm129/512x384.jpg",
        "name": "Halloween Zombie Cannon",
        "url": "https://html5.gamemonetize.com/mwbuw38d15yg9rswqzk3u9mnd8irm129/",
        "text": "Throw balls at structures to make them collapse but be careful not to exceed the allowed limit! Each saved ball will count double at the next level, take advantage of it to apply you! One-tap easy-to-learn controls with stunning visual effects and addictive Halloween gameplay mechanics."
    },
    {
        "index": 348,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qt9jxy4clkxrv1zharuv23dr2vl4ohhe/512x384.jpg",
        "name": " Kitchen Sorting",
        "url": "https://html5.gamemonetize.com/qt9jxy4clkxrv1zharuv23dr2vl4ohhe/",
        "text": "Kitchen Sorting uses well known meachanics of ball and water sorting games. Sort cooking ingredients into glass jars right in your comfortable kitchen. When sorted, pour them into the pot a cook meals."
    },
    {
        "index": 349,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2yli3z70eg9svayi4273imn3dh7b0yr7/512x384.jpg",
        "name": "Baby Pandas Juice Maker",
        "url": "https://html5.gamemonetize.com/2yli3z70eg9svayi4273imn3dh7b0yr7/",
        "text": "If you are a fan of cooking games, then make sure you dont miss this juice cooking game. The juice shop has many fruits, including watermelon, mango, blueberry, and more. You can mix any fruit and see what amazing flavors you can combine."
    },
    {
        "index": 350,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jwrsy3u3pe26a9duc6houu4ouc0bsad5/512x384.jpg",
        "name": "Sawblade Fest Run",
        "url": "https://html5.gamemonetize.com/jwrsy3u3pe26a9duc6houu4ouc0bsad5/",
        "text": "Like cutting things into many pieces? Challenge your reflexes in Sawblade Fest Run! In this intense arcade game, your goal is very simple. Keep running, avoiding deadly obstacles like iron sheets, walls, and other giant fruit monsters!"
    },
    {
        "index": 351,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mutwxcwf3ogzpshfolrarstlb5n5s5og/512x384.jpg",
        "name": "Scary Train Station",
        "url": "https://html5.gamemonetize.com/mutwxcwf3ogzpshfolrarstlb5n5s5og/",
        "text": "Scary Train Station is a hidden object game playable on all devices. The game objective is to discover all hidden objects before time expires. Every twenty seconds you can use the hint button to get help."
    },
    {
        "index": 352,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qabskgidienvrps2zvsvl4qs4bhsugzv/512x384.jpg",
        "name": "Block Number Puzzle",
        "url": "https://html5.gamemonetize.com/qabskgidienvrps2zvsvl4qs4bhsugzv/",
        "text": "Block Number Slide is a fun and engaging online puzzle game where players slide numbered blocks on a grid to arrange them in a specific order. The goal is to move the blocks strategically, using the space to shift adjacent blocks, to align the numbers in the correct sequence or pattern. The game tests your logic, planning, and spatial awareness as you try to complete each level with the fewest possible moves. The difficulty increases as the grids get larger, and the numbers become more challenging to organize."
    },
    {
        "index": 353,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gcadn1bjp4rcvz4sb0t7sl794qr193n2/512x384.jpg",
        "name": "Infinity Cat Adventure Runner",
        "url": "https://html5.gamemonetize.com/gcadn1bjp4rcvz4sb0t7sl794qr193n2/",
        "text": "Welcome to Infinity Cat Adventure Runner! Get ready for a thrilling journey where brave cats dash, leap, and explore through endless worlds! Infinity Cat Adventure Runner combines fast-paced action, arcade-style challenges, and platformer mechanics to create an exciting runner experience. Perfect for fans of casual games who love a mix of action and adventure! Run, jump, and navigate through endless levels filled with obstacles, platforms, and surprises."
    },
    {
        "index": 354,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ad1stvvwwyp3lwr2rdxvpfbw956vkrwk/512x384.jpg",
        "name": "Clumpsy Frogger 2D",
        "url": "https://html5.gamemonetize.com/ad1stvvwwyp3lwr2rdxvpfbw956vkrwk/",
        "text": "A timeless arcade game has captivated players for decades with its simple yet addictive gameplay. The objective is to guide a frog safely across a busy road and a treacherous river to its home. Whether youre a seasoned gamer or just discovering Frogger for the first time, this iconic title offers a fun and challenging experience that will keep you coming back for more."
    },
    {
        "index": 355,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zu7j59kykrdfyu7408dg9u89ukgkw8hy/512x384.jpg",
        "name": "Napoleon Solitaire",
        "url": "https://html5.gamemonetize.com/zu7j59kykrdfyu7408dg9u89ukgkw8hy/",
        "text": "A Classic Napoleon Solitaire Card Game. Move all the cards from bottom to the top. Beautiful graphics and a lot of fun for everyone! Move all cards from the tableau (bottom of the screen) and the stock (middle of the screen) to the foundations (top of the screen). Cards can be placed onto the foundations if they are one rank higher and of the same suit as the top card. Similarly, cards can be moved within the tableau if they are one rank lower and of the same suit as the card theyre placed on. Its simple, and youll quickly pick it up as you play. Have fun!"
    },
    {
        "index": 356,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/s9jzgojbt292a1e0gkcts6bguzw7jko7/512x384.jpg",
        "name": "My Hospital Learn Care",
        "url": "https://html5.gamemonetize.com/s9jzgojbt292a1e0gkcts6bguzw7jko7/",
        "text": "This is a doll placement simulation game. Have you ever wanted to run a hospital by yourself? Do you want to be a doctor? This game of ours can fulfill your wish. You can build a hospital Avatar world of your own."
    },
    {
        "index": 357,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/j2g2nsq5l8hyku6wdvy96pyfjuf2jl4v/512x384.jpg",
        "name": "Funny Walk Fail Run",
        "url": "https://html5.gamemonetize.com/j2g2nsq5l8hyku6wdvy96pyfjuf2jl4v/",
        "text": "Funny Walk Fail Run is a fun-filled arcade action game with funny and magical gameplay! You will control a villain in the game to do challenges. But dont expect him to walk steadily, because he always falls and bumps in all sorts of funny positions! Your job is to help him navigate each step of the shaky road."
    },
    {
        "index": 358,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/0nfy14ng1ltqdxupj8vumbrqrz8kcnur/512x384.jpg",
        "name": "Cooking Fever Happy Chef",
        "url": "https://html5.gamemonetize.com/0nfy14ng1ltqdxupj8vumbrqrz8kcnur/",
        "text": "Are you ready to make your mark on Cooking Fever: Happy Chef? This interesting simulation lets you feel the fun of cooking, serving and managing your restaurant! With colorful graphics and special gameplay, put yourself in the food world and try to become the ultimate chef!"
    },
    {
        "index": 359,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/d4beig27o4iobqgk4jzdsztlbuzvzpqv/512x384.jpg",
        "name": "Baby Taylor Fun Park",
        "url": "https://html5.gamemonetize.com/d4beig27o4iobqgk4jzdsztlbuzvzpqv/",
        "text": "Baby Taylor Fun Park is an educational game for young children. In the fascinating game, you will go to the amusement park to have fun with the cute Baby Taylor."
    },
    {
        "index": 360,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lzwuv84mvz0tpplwfemmkykdv4rld53a/512x384.jpg",
        "name": "Ninja Drop",
        "url": "https://html5.gamemonetize.com/lzwuv84mvz0tpplwfemmkykdv4rld53a/",
        "text": "Ninja Drop is a game in which you drop your ninja star (shuriken) for popping the incoming balls. Be aware! The bomb explodes in 3 turns once it appears. So you have to eliminate as soon as you see it, or its game over. Can you beat the highscore?"
    },
    {
        "index": 361,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qcv771x8bg9jzhiv7fthslim75ckm8e3/512x384.jpg",
        "name": "Get Ready With Me Concert Day",
        "url": "https://html5.gamemonetize.com/qcv771x8bg9jzhiv7fthslim75ckm8e3/",
        "text": "oin us in the excitement as you follow the thrilling journey of teen Riri, who is preparing for the concert of a lifetime. From choosing the perfect outfit to applying stunning makeup, youll get to walk her through all the steps of this beautifying process. But before you start the fun, be sure to help her customize her cowgirl hat, a signature item for the concert she will attend. Then go crazy with the makeup, dress her up in a jaw-dropping outfit, and accessorize for a complete look. Dont be afraid to take your fashion game to the next level by experimenting with different hair color options. From bold and vibrant hues to subtle highlights, the choice is yours. Try out different hair color options to truly stand out from the crowd. Have fun!"
    },
    {
        "index": 362,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dy40z6ca0qmuqvi9cqat4fb17q1bxvw1/512x384.jpg",
        "name": "Crystal Diamond",
        "url": "https://html5.gamemonetize.com/dy40z6ca0qmuqvi9cqat4fb17q1bxvw1/",
        "text": "Crystal Diamond is a fun 2D puzzle game where players match and collect shiny diamonds in a colorful world. The goal is to line up three or more of the same diamonds to clear them and score points. As players move through levels, the puzzles get harder, making them think carefully to solve each one. The game has bright graphics, catchy sound effects, and special power-ups that add to the excitement. Crystal Diamond is perfect for anyone who loves puzzles and wants to enjoy hours of entertainment. Can you gather all the diamonds and become the top player?"
    },
    {
        "index": 363,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zvluq2l3w4mxywskmoca63u5mm21uvd6/512x384.jpg",
        "name": "Animate.Space: Create Animated GIF!",
        "url": "https://html5.gamemonetize.com/zvluq2l3w4mxywskmoca63u5mm21uvd6/",
        "text": "Animate.Space is a game where you can create cartoons, GIFs, and flipbooks directly in your browser. With almost unlimited frames and a variety of drawing tools (paint bucket, eraser, pixel and vector shapes), you can bring your ideas to life through frame-by-frame animation. Easily manage frames (copy, paste, delete), select, move, rotate, resize objects, and undo actions without limits. Save your projects as animated GIFs or share them online, while features like autoframe drawing, ghost preview, and line control help you create smooth, professional-looking animations. No watermarks, no sign-up required &amp;mdash; just pure creativity!"
    },
    {
        "index": 364,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6dalx2wh6hkcv4fj2vu6c87ss8b0wtqx/512x384.jpg",
        "name": "Zombie Idle Defense",
        "url": "https://html5.gamemonetize.com/6dalx2wh6hkcv4fj2vu6c87ss8b0wtqx/",
        "text": "Prepare for a zombie showdown in Zombie Idle Defense! In this exciting idle defense game, you will be the last line of defense against wave after wave of zombie attacks! Build your defenses,upgrade your weapons, put your automatic turrets on fire, and fight off the undead!"
    },
    {
        "index": 365,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/u4ajue1r7o22cowjl091skp4igcb2aw9/512x384.jpg",
        "name": "Stealth Master Sneak Cat",
        "url": "https://html5.gamemonetize.com/u4ajue1r7o22cowjl091skp4igcb2aw9/",
        "text": "Stealth Master: Sneak Cat is a fun stealth adventure game that lets you play the role of a cute cat. You will sneak through various missions! Move quietly under the close watch of enemies and surveillance equipment."
    },
    {
        "index": 366,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pzn5c388ig1lls7xwgwekbdnhfutjnmu/512x384.jpg",
        "name": "Solitaire Card Sort Puzzle",
        "url": "https://html5.gamemonetize.com/pzn5c388ig1lls7xwgwekbdnhfutjnmu/",
        "text": "Solitaire Card Sort Puzzle is a clever color matching and sorting game designed to test your organizational and puzzle solving skills. Your mission in this gentle gaming experience is to sort the cards on the board and place them in perfect color order. However, dont be fooled by the seemingly simple concept. As you progress through the levels, each level becomes progressively more demanding and requires careful planning and strategic thinking to conquer. With user-friendly gameplay and an impressive array of colors, Color Card Sort is a must-try for lovers of matching games, sorting challenges, or fun brain teasers that everyone can enjoy."
    },
    {
        "index": 367,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ujlx1cbzxe7huntq9ph0kw76gwtxw3g6/512x384.jpg",
        "name": "2048 Cube Run",
        "url": "https://html5.gamemonetize.com/ujlx1cbzxe7huntq9ph0kw76gwtxw3g6/",
        "text": "Gather 2048 cubes in this top-notch 2048 runner game! Enjoy thrilling action and unwind as you play. Merge cubes of the same number and colour to grow bigger on your journey. Aim for 2048 or beyond and dominate the track!"
    },
    {
        "index": 368,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p0drtafx16rvpskky5768gbl38vr81sz/512x384.jpg",
        "name": "Hamster Puzzle Keys",
        "url": "https://html5.gamemonetize.com/p0drtafx16rvpskky5768gbl38vr81sz/",
        "text": "Complete the puzzles, move the candles to release the keys. The game Hamster - Puzzle Keys is waiting for you, compete with other players for the title of the best tracker! Puzzle about keys in the style of a Haster Combat! Feel like a detective! - Suitable for all ages. - Suitable for playing in any places and situations. - The game will appeal to boys and girls. - You can compete with other players in the game!"
    },
    {
        "index": 369,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3m043n1cb8et8w63mdahpdqao96trr6u/512x384.jpg",
        "name": "Find The  Correct Shadow",
        "url": "https://html5.gamemonetize.com/3m043n1cb8et8w63mdahpdqao96trr6u/",
        "text": "Find The Correct Shadow is a fun and educational puzzle game designed to challenge your visual skills! In each round, youll be presented with a picture and three shadow options. Only one of the shadows matches the picture perfectly&amp;mdash;can you find the correct one? With three exciting game modes to choose from: Streak Mode: Test how long you can maintain a perfect streak of correct answers! Timed Mode: Race against the clock and see how many correct shadows you can find in a limited time! Learning Mode: A relaxed mode designed to help you practice and improve your visual recognition skills."
    },
    {
        "index": 370,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5tuf1dnz1lq475pw7jyq3s70jq11u8u2/512x384.jpg",
        "name": "Steve SurvivalCraft Easy",
        "url": "https://html5.gamemonetize.com/5tuf1dnz1lq475pw7jyq3s70jq11u8u2/",
        "text": "In this adventure, Steve mounts his horse and wants to go to the villagers. The villagers are waiting for him to show him the chest they found. Steve must collect all the gold, defeat all the monsters in the forest, and reach the chest. When he opens the chest, he will become the king of the entire world. The chest contains a very valuable item. Steve must be very careful, as the forest is filled with monsters and obstacles."
    },
    {
        "index": 371,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/24paorwkdzcm278tat3fhj9a1gskfc5s/512x384.jpg",
        "name": "Lovely Dog Daycare",
        "url": "https://html5.gamemonetize.com/24paorwkdzcm278tat3fhj9a1gskfc5s/",
        "text": "This is an educational pet care game. If you love caring for puppies, then this game is for you.You can feed your puppy his favorite food and play with him. You can bathe your fluffy puppy and make him sparkle. When your puppy is bored, you can play fun and sweet games with him on the playground."
    },
    {
        "index": 372,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/h8cmo5l81vk6qzn8lf0ua8khf8xgpfgf/512x384.jpg",
        "name": "Baby Cooking Chef",
        "url": "https://html5.gamemonetize.com/h8cmo5l81vk6qzn8lf0ua8khf8xgpfgf/",
        "text": "Baby Cooking Chef is a fun cooking game for all kids who love to cook. In this game, you are going to play as a little chef and make all kinds of delicious food in a virtual kitchen. You will make white chocolate cake, banana chips, and unicorn cake from scratch."
    },
    {
        "index": 373,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ys1ivxz3lmwxz4k05gk3m20z7tzre5e5/512x384.jpg",
        "name": "Table Pong 2D",
        "url": "https://html5.gamemonetize.com/ys1ivxz3lmwxz4k05gk3m20z7tzre5e5/",
        "text": "It is a simple yet addictive game that involves two players controlling paddles on opposite sides of a screen, trying to hit a ball back and forth. The first player to score a certain number of points wins the game."
    },
    {
        "index": 374,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3c6ufox6i3i8cp5o8fdzl6dl8r2zvklf/512x384.jpg",
        "name": "Little Panda Space Journey",
        "url": "https://html5.gamemonetize.com/3c6ufox6i3i8cp5o8fdzl6dl8r2zvklf/",
        "text": "Have you ever wondered what space is like? Do you want to know how astronauts live in the space station? Little Panda Space Journey takes you to experience the life of astronauts and explore the mysterious outer space. The Earth is surrounded by space junk. Its time for Little Astronaut to go out."
    },
    {
        "index": 375,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wdtjawc8i0nprzqdtfuvibwx2w7p6k8l/512x384.jpg",
        "name": "Keep Prime Numbers",
        "url": "https://html5.gamemonetize.com/wdtjawc8i0nprzqdtfuvibwx2w7p6k8l/",
        "text": "Remove all the blocks to make the composite number going out but keep the prime number. Click or tap the unused block to drop the composite numbers."
    },
    {
        "index": 376,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3v6tl312l20s3wfi1glwriwpls169yu6/512x384.jpg",
        "name": "Don Kong Fury",
        "url": "https://html5.gamemonetize.com/3v6tl312l20s3wfi1glwriwpls169yu6/",
        "text": "Don Kong Fury is a side-scrolling platformer that requires quick reflexes and strategic thinking. Players must carefully navigate the levels, jumping over barrels, climbing ladders, and avoiding other obstacles. The games simplicity and addictive gameplay made it an instant hit."
    },
    {
        "index": 377,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/o31f2iks57rh1uzsxyr90cvxof9dbgxf/512x384.jpg",
        "name": "Deep Fishing",
        "url": "https://html5.gamemonetize.com/o31f2iks57rh1uzsxyr90cvxof9dbgxf/",
        "text": "Dive into the fun with Deep Fishing! Explore the deep blue, cast your line, and reel in a variety of exciting fish species. Upgrade your gear, unlock rare catches, and become the ultimate fishing legend! Easy to pick up, but hard to put down &amp;ndash; can you score the rarest fish and show off your skills?"
    },
    {
        "index": 378,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/clmoutvpmkolj8hpcwc3nxcxhes8ft72/512x384.jpg",
        "name": "Frosty Quest",
        "url": "https://html5.gamemonetize.com/clmoutvpmkolj8hpcwc3nxcxhes8ft72/",
        "text": "Frosty Quest is a fun and exciting match-3 puzzle game set in a magical winter wonderland. In this icy adventure, players must match and align adorable winter-themed characters to score points and clear the board. As the levels progress, the difficulty increases, making every new stage a thrilling challenge. With charming graphics, festive music, and easy-to-learn mechanics, Frosty Quest offers an entertaining and addictive experience for players of all ages. Key Features: Winter-Themed Graphics: Enjoy beautifully designed characters and environments inspired by winter and snow. Match-3 Puzzle Gameplay: Engage in classic match-3 mechanics wh"
    },
    {
        "index": 379,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/mw42ckil2itvtyqolx0fjv9exwmeg7ge/512x384.jpg",
        "name": "Spooky Tile Master",
        "url": "https://html5.gamemonetize.com/mw42ckil2itvtyqolx0fjv9exwmeg7ge/",
        "text": "Spooky Tile Master is a Halloween-themed game where you clear the board by grouping spooky hex tiles in sets of three. Tap to move tiles to a matching or empty spot. But beware! If no tiles fit or space runs out, the level is over. Race against the clock to master each eerie puzzle!"
    },
    {
        "index": 380,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/c5pksbzte8crudpe3dddpu57ds9549eh/512x384.jpg",
        "name": "Kids Musical Instruments",
        "url": "https://html5.gamemonetize.com/c5pksbzte8crudpe3dddpu57ds9549eh/",
        "text": "This engaging game is designed to spark creativity and musical interest in young minds. With a variety of 9 different musical instruments, children can explore and enjoy the unique sounds of each instrument, making learning both fun and educational. Children can tap on the instruments to hear their notes, fostering an interactive and immersive learning experience. This hands-on approach helps kids to better understand and appreciate music. The game includes a Piano, Cat Piano, Pan Flute, Harp, Xylophone, Flute, Guitar, Saxophone, and Platillo, each with its distinct sound. This variety ensures that children can explore different musical genres and styles."
    },
    {
        "index": 381,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5zf2l6ec0cef43uo7ftxbr0l386h0o6i/512x384.jpg",
        "name": "Noobik Battlegrounds",
        "url": "https://html5.gamemonetize.com/5zf2l6ec0cef43uo7ftxbr0l386h0o6i/",
        "text": "The tactical shooter Noobik Battlegrounds is waiting for you in its ranks, fighter. Online game in which you appear at a random point on the map, and then collect weapons and equipment, after which you kill the other players on map along the way. Game tasks: 1) Find weapons, equipment. 2) Gradually the zone will narrow to the center, you need to go to the center, otherwise you will be killed by zone that narrows. 3) There will be other survivors on your way, you will need to kill them all to win. 4) If you are killed, you can either watch other survivors or find a new session. 5) Winner is the one who remains the only one alive on map."
    },
    {
        "index": 382,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/75l24udg4dx5xvvdefwrx7kkuibxy42h/512x384.jpg",
        "name": "Blast Bird",
        "url": "https://html5.gamemonetize.com/75l24udg4dx5xvvdefwrx7kkuibxy42h/",
        "text": "Hey, the cute Green Bird need your help to escape from this dark world! Your mission is to land the Bird in the safe area with the least number of attempts. Use strategically placed explosives to move the Bird in the right direction, but beware of the dangerous spikes and obstacles that can end your journey prematurely. Each level presents unique challenges that will test your timing and precision. Can you navigate the danger terrain and guide the Bird to safety? Additionally, challenge yourself to earn three stars on each level by optimizing your moves and minimizing your attempts."
    },
    {
        "index": 383,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/azw4229kwthheq313u8j1g42cjvm6c7x/512x384.jpg",
        "name": "Blocks Merge",
        "url": "https://html5.gamemonetize.com/azw4229kwthheq313u8j1g42cjvm6c7x/",
        "text": "Remove all the blocks before the timer turns off. The same colored blocks explode when they come near to each other. You can drag the block to possible vacant locations."
    },
    {
        "index": 384,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/1r1xtgybfs46lrr9r5rntmn5ww8vlb63/512x384.jpg",
        "name": "Good Slice",
        "url": "https://html5.gamemonetize.com/1r1xtgybfs46lrr9r5rntmn5ww8vlb63/",
        "text": "Come to start a juicy cut fruit journey at Good Slice! This is a casual puzzle game that will test your cutting skills. Your task is to swipe the screen to cut the fruit into perfect pieces and let them fall smoothly into the juicer. The more precise the cut, the more juice youll get!"
    },
    {
        "index": 385,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5q2hi88nygzibgvsyrduea8u5zuk60zr/512x384.jpg",
        "name": "Daily Bento Organizer",
        "url": "https://html5.gamemonetize.com/5q2hi88nygzibgvsyrduea8u5zuk60zr/",
        "text": "Do you want to be a bento box master? Using your creativity in the world of the Daily Bento Organizer. To create the most delicious bento box in this casual game. There is the art of food arrangement and the storage management challenge."
    },
    {
        "index": 386,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/m5mus04bpq7npftl23fepia9ux7k1t9u/512x384.jpg",
        "name": "Happy Glass Draw lines",
        "url": "https://html5.gamemonetize.com/m5mus04bpq7npftl23fepia9ux7k1t9u/",
        "text": "Draw something with lines so that the glass fills with water. Your task is to draw a line so that the glass fills up and youll smile again! Try to find the best solution to get to the next level. You can find your own way, so be creative and dont be afraid to think outside the box! Some levels may seem simple. Features: + Extremely smooth napkin control. + Different characters with lots of items in the store system. + Simple rules and easy controls + Beautiful graphics. + Unique challenging levels. + Game for boys and girls."
    },
    {
        "index": 387,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l8t6erjoip3935d7pj3v613vd3gv0knn/512x384.jpg",
        "name": "Bloody Nightmare",
        "url": "https://html5.gamemonetize.com/l8t6erjoip3935d7pj3v613vd3gv0knn/",
        "text": "The game is intended for players over the age of 18, as in it, you will need to feel like killers and kill live targets from the computer game Schoolboy runaway. - Beautiful graphics and effects. - Addictive gameplay. - 20 levels. When all living targets are destroyed, the level will be completed."
    },
    {
        "index": 388,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dfwg7trzhiez8k2it5u2asg00l1py9aq/512x384.jpg",
        "name": "Lip Art Lipstick Makeup",
        "url": "https://html5.gamemonetize.com/dfwg7trzhiez8k2it5u2asg00l1py9aq/",
        "text": "This is a lipstick makeup game for girls. In this game, you can make beautiful lip gloss and use smooth and perfect makeup tools to make your lips more glowing. Our game has 18 stylish lip gloss makeup models and you can choose your favourite look. Each makeup model has different lip gloss colours and fashion painting designs."
    },
    {
        "index": 389,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/42h0kejg22yh6x4wkihnjlhhyrngyqsy/512x384.jpg",
        "name": "Princess Baby Phone",
        "url": "https://html5.gamemonetize.com/42h0kejg22yh6x4wkihnjlhhyrngyqsy/",
        "text": "This is an educational mobile phone simulator for girls. In this game, kids can pretend they are princesses and take care of their mobile phones."
    },
    {
        "index": 390,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8as41up1xk95hz2wra6xvck7ihqx1xyi/512x384.jpg",
        "name": "Galactic Leap",
        "url": "https://html5.gamemonetize.com/8as41up1xk95hz2wra6xvck7ihqx1xyi/",
        "text": "In Galactic Leap, players embark on an interstellar journey as a charming alien character, aiming to leap between platforms suspended in a mesmerizing cosmic landscape. Set against the backdrop of floating islands, twinkling stars, and distant planets, this visually vibrant game challenges your precision and timing. Navigate your way upward, avoiding hazardous obstacles like dangerous spinning wheels. Reach new heights and score the best record as you soar through the galaxy!"
    },
    {
        "index": 391,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lozglcdafdwpr50z95p7o221d5pozgqw/512x384.jpg",
        "name": "Giddy Jacks",
        "url": "https://html5.gamemonetize.com/lozglcdafdwpr50z95p7o221d5pozgqw/",
        "text": "Tap to match the crazy pumpkins as many as you can! It&amp;rsquo;s Giddy Jacks, the hottest game on the charts at the moment! Get into a world of colorful chaos and endless fun with Giddy Jacks. This game is not just about speed; it&amp;rsquo;s a test of your memory and skills! Memory Test: Giddy Jacks offers a new mix of speed, memory, and skills! Want to know how sharp your memory skills are? Use the memory test in this game to find out! Track your progress and see how you improve over time. It&amp;rsquo;s the perfect way to challenge yourself and keep your mind sharp."
    },
    {
        "index": 392,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/7jn6qofzp5wdnx00l2sxnx4tqkjv80y3/512x384.jpg",
        "name": "Pop Culture Halloween Makeup",
        "url": "https://html5.gamemonetize.com/7jn6qofzp5wdnx00l2sxnx4tqkjv80y3/",
        "text": "Immerse yourself in the world of Pop Culture Halloween Makeup, where you can transform into your favorite pop culture icons. With a wide array of hairstyles, eyeshadows, mascaras, lipsticks, blush options, neck paint, tops, and accessories, you can create stunning Halloween makeup looks that will leave everyone in awe. Unleash your imagination, experiment with different styles, and become the ultimate makeup artist. Tap into the spirit of Halloween and play Pop Culture Halloween Makeup now to embark on a spooktacular journey!"
    },
    {
        "index": 393,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2vflyjqlfrpi5rtaajlvtb08bketj8sg/512x384.jpg",
        "name": "Fairy Blossom Quest",
        "url": "https://html5.gamemonetize.com/2vflyjqlfrpi5rtaajlvtb08bketj8sg/",
        "text": "Fairy Blossom Quest is a captivating puzzle game set in an enchanting fairy-tale garden filled with vibrant flora, soothing lights, and whimsical creatures. Players embark on a magical journey through lush fairy gardens, waterfalls, and meadows to solve unique challenges. The game features charming levels and an immersive, soothing atmosphere that draws players deeper into the fairy world. The goal is to complete each level by matching pairs of magical creatures and elements like fire spirits, fairies, and more. The progression through various levels unlocks new areas in the fairy garden with increasing difficulty."
    },
    {
        "index": 394,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nmge4m6yl0jaiiyu03sfjswhg742k6rv/512x384.jpg",
        "name": "Avatar World  Dream City ",
        "url": "https://html5.gamemonetize.com/nmge4m6yl0jaiiyu03sfjswhg742k6rv/",
        "text": "Welcome to Avatar World: Dream City, where creativity and imagination come to life! You can use your dressing up and decorating talents to your hearts content! Your dream city is waiting for you to make it the most unique place. Choose the princess you like, dress her in a fashionable costume,and make your character unique."
    },
    {
        "index": 395,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/paj3xw35fdetgd871gd1tiz6c2mso6y0/512x384.jpg",
        "name": "Card Battle",
        "url": "https://html5.gamemonetize.com/paj3xw35fdetgd871gd1tiz6c2mso6y0/",
        "text": "Come to enter the exciting world of card battles, where strategy is combined with passion! In this card puzzle game, each card has its unique powers. Before the game. Choose to upgrade your coins or strength."
    },
    {
        "index": 396,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y610ae7x8dvdis9ertudfnqkxbv810v5/512x384.jpg",
        "name": "Cut Cut Game",
        "url": "https://html5.gamemonetize.com/y610ae7x8dvdis9ertudfnqkxbv810v5/",
        "text": "The rabbit Dorote, owner of an orchard, was preparing for an event in her village. When inspecting his oranges, he noticed that some of them were hiding explosive surprises, left by someone. However, she was in a hurry and couldnt handle it now, as she needed to prepare the juice for the event. Help her cut the oranges carefully, avoid cutting the wrong things!"
    },
    {
        "index": 397,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rymudepfhh7mv50opz9og32xo7mfxgw3/512x384.jpg",
        "name": "Makeup Kit   Makeup Game",
        "url": "https://html5.gamemonetize.com/rymudepfhh7mv50opz9og32xo7mfxgw3/",
        "text": "Makeup Kit - Makeup Game is a type of casual game where players can create their own makeup looks on a virtual model. The game typically includes a wide variety of makeup options, such as foundation, concealer, eyeshadow, eyeliner, mascara, blush, bronzer, and lipstick. Players can also choose from a variety of different hairstyles and accessories."
    },
    {
        "index": 398,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p90xlik2d70zhis3djsoifasq3ytfxjw/512x384.jpg",
        "name": "Footy Frenzy",
        "url": "https://html5.gamemonetize.com/p90xlik2d70zhis3djsoifasq3ytfxjw/",
        "text": "Step onto the pitch with Footy Frenzy, the ultimate football gaming experience that brings the excitement of the beautiful game to your fingertips! Dive into fast-paced matches, strategize your plays, and score stunning goals. Whether youre playing solo, competing against friends, or taking on opponents from around the world, Footy Frenzy offers immersive gameplay, realistic graphics, and smooth controls that will keep you on the edge of your seat. Get ready to experience the frenzy of football like never before!"
    },
    {
        "index": 399,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ir6wuo2njuydmpqxttv5a00so8r6hfys/512x384.jpg",
        "name": "Mathcopter Word",
        "url": "https://html5.gamemonetize.com/ir6wuo2njuydmpqxttv5a00so8r6hfys/",
        "text": "Take flying letters one by one in order following the clue mentioned. Keep the math copter flying by pressing the button which is the result of solving mathematical problems."
    },
    {
        "index": 400,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qh3txdgtpfbhelrwrqj6dycjuo2p3n2p/512x384.jpg",
        "name": "Farmer Noob Super Hero",
        "url": "https://html5.gamemonetize.com/qh3txdgtpfbhelrwrqj6dycjuo2p3n2p/",
        "text": "The farmers noob has all his animals escaping from the barn and hiding in the forest out of fear. The noob needs to find all his animals. Help the noob find his missing animals: the pig, the sheep, and the chicken. After finding them, run back home and to the barn. Be careful, as there are dangerous monsters in the forest that can kill you!"
    },
    {
        "index": 401,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/up0g5nxb9omtul98vwn3kfxhtej32tb9/512x384.jpg",
        "name": "Bir In a Pot",
        "url": "https://html5.gamemonetize.com/up0g5nxb9omtul98vwn3kfxhtej32tb9/",
        "text": "Play at Bird In A Pot and getinto a spooky, fun-filled puzzle adventure set in a Darktoon atmosphere! Your goal is to guide the little green bird into the magic pot without letting it touch the ground. Complete all 24 challenging levels filled with tricky obstacles and surprises! How do you do it? Simply destroy the wooden boxes strategically and use the principles of physics to roll the pumpkins into the pot. With its vibrant Dark-themed graphics and addictive gameplay, its a simple yet captivating puzzle game that will delight players of all ages."
    },
    {
        "index": 402,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dy2tps9hmgrhuwhk557cdykcx3puevbb/512x384.jpg",
        "name": "American Block Sniper Survival Online",
        "url": "https://html5.gamemonetize.com/dy2tps9hmgrhuwhk557cdykcx3puevbb/",
        "text": "In the first-person action game American Block Sniper Online, set in the Minecraft universe, your objective is to clear each level of all adversaries before the timer runs out. You begin each level with only a rifle, but youll discover and equip a wide variety of weaponry as you go. It takes anything from two to five minutes to complete a level, give or take depending on your score. At this point, you should aim to vanquish every enemy that shows up on the map."
    },
    {
        "index": 403,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/oecwutlajti4fdybzaalob072h1jlkvg/512x384.jpg",
        "name": "Unblock Ball Slide Puzzle 2",
        "url": "https://html5.gamemonetize.com/oecwutlajti4fdybzaalob072h1jlkvg/",
        "text": "Welcome to Unblock Ball: Slide Puzzle, a classic sliding puzzle game that lets you use your mind.You can feel a sense of accomplishment! Sliding the board to create the channel for the ball to roll smoothly to the end. You should use your logical mind to cleverly move blocks, avoid obstacles, and solve every puzzle!"
    },
    {
        "index": 404,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/xfay06bsvgkb7miooy6kqjx0yphy51l0/512x384.jpg",
        "name": "Super Star Body Race",
        "url": "https://html5.gamemonetize.com/xfay06bsvgkb7miooy6kqjx0yphy51l0/",
        "text": "Welcome to the Superstar Body Race, the collecting and running adventure! This casual running game invites you to collect various beautiful objects and customize your superstar runner. Race with friends on a colorful track full of fun obstacles and surprises!"
    },
    {
        "index": 405,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qn2gtuios4ntpivujnkos67flmmcuu5r/512x384.jpg",
        "name": "Memory Mystery",
        "url": "https://html5.gamemonetize.com/qn2gtuios4ntpivujnkos67flmmcuu5r/",
        "text": "Memory Mystery is an engaging and challenging memory game designed to test and improve your memory skills. The game presents a series of cards, each with unique images, which are initially displayed for a brief period before being turned face down. Your task is to match pairs of cards by remembering their positions and uncovering them one by one. With multiple levels of increasing difficulty, Memory Mystery provides endless fun and mental stimulation for players of all ages."
    },
    {
        "index": 406,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/tpfvbgcyqy5wzsklzb9bykqldr4ut6hw/512x384.jpg",
        "name": "Do not enter this game at night",
        "url": "https://html5.gamemonetize.com/tpfvbgcyqy5wzsklzb9bykqldr4ut6hw/",
        "text": "Do not enter this game at night, because in this game you will find the most creepy screamers during the passage of the maze, playing for the ball. But if you decide to go in, then you will find a lot of levels, puzzles and, of course, screamers."
    },
    {
        "index": 407,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/9xa5tfoih6vphdexzk034fl8ycjwzffz/512x384.jpg",
        "name": "Warfare Area 3",
        "url": "https://html5.gamemonetize.com/9xa5tfoih6vphdexzk034fl8ycjwzffz/",
        "text": "Play 3D first person shooter game Warfare Area 3. Your mission is to explore the enemy base and take down all the guards in the area. Shoot enemies, pick up first aid kits and earn money to upgrade the armor and guns."
    },
    {
        "index": 408,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/76kn0zqb9ti95c31997em839qaaq0bj2/512x384.jpg",
        "name": "Draw Save Puzzle",
        "url": "https://html5.gamemonetize.com/76kn0zqb9ti95c31997em839qaaq0bj2/",
        "text": "Draw Save Puzzle - draw one line to save Stickman from the threat! Are you a good artist or Do you want to test your creative skills? Are you a fan of puzzles? Now you have a good chance! Draw a line to help the little man and protect him from swords, bullets, bombs.... and many other life-threatening attacks! You are free to draw any cover and protection to help the little man survive. Learn to draw lines creatively, develop logic and grow your brain! GAME FEATURES + Lots of levels and endless fun! + Never be bored again! + Simple but amazing physics system! + Improve your brain! + Exciting and relaxing gameplay."
    },
    {
        "index": 409,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/w0gxmwazvk9bgchsryzul3en0jhcffko/512x384.jpg",
        "name": "KingRedLand",
        "url": "https://html5.gamemonetize.com/w0gxmwazvk9bgchsryzul3en0jhcffko/",
        "text": "The owner of the red kingdom, Red Man, needs to rescue the Blue Men captured by the skeleton army to save his kingdom. The Red King must be very careful because skeleton monsters are everywhere, and killing them is impossible. You must escape from the skeleton monsters. Remember, every second is precious, and the water is slowly rising. Rescue all the Blue Men before you get submerged. Save the Blue Men and reach the Blue Kingdom. Maintain the brotherhood between red and blue."
    },
    {
        "index": 410,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/nh1fkdmnyv5zm017g9psk4zjh3cd3tqo/512x384.jpg",
        "name": "Spooky Slider",
        "url": "https://html5.gamemonetize.com/nh1fkdmnyv5zm017g9psk4zjh3cd3tqo/",
        "text": "Slide the puzzle pieces to complete eerie Halloween images in *Spooky Slider*! Test your skills in this spooky-themed sliding jigsaw puzzle game with multiple levels and hauntingly fun challenges. Can you solve the puzzles before time runs out?"
    },
    {
        "index": 411,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ios1voqqksw9k3g3hucay5tj2u8inahq/512x384.jpg",
        "name": "Halloween Math Shot",
        "url": "https://html5.gamemonetize.com/ios1voqqksw9k3g3hucay5tj2u8inahq/",
        "text": "Shoot the bats on Halloween night with the pumpkin contains the right comparison sign for the numbers on the bat wings. Shoot them at least as the numbers of the target on each level before time runs out."
    },
    {
        "index": 412,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/b73q639qxj13xnfh3hlrhnh65q2ny1hb/512x384.jpg",
        "name": "King of Ball",
        "url": "https://html5.gamemonetize.com/b73q639qxj13xnfh3hlrhnh65q2ny1hb/",
        "text": "Explore the adventure and fun game Journey Of Carter Game story begins with two friends conversation. Carters friend suggests visiting a wonder of adventure. He tried many times before but failed, also his belief in Carter that he can do this. In this adventure many mysterious traps and dangers were waiting for the carter. Player has to play the role of Carter and finish each level and collect gold coins. Features of this game: High Quality graphics. Game size is minimal. Super simple controls. Interesting quests."
    },
    {
        "index": 413,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pyuyhhci3z0f9ajc8wg3vqymlsmnjemf/512x384.jpg",
        "name": "Find Sort Match",
        "url": "https://html5.gamemonetize.com/pyuyhhci3z0f9ajc8wg3vqymlsmnjemf/",
        "text": "Find Sort Match is a fun and creative puzzle that combines sort and match elements. Let you experience the joy of DIY! In the game, sort and match items of various shapes, colors, and types. And complete each level of the challenge."
    },
    {
        "index": 414,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fk1tepx4fvyw0f5fvokaxeruqv2kwcaf/512x384.jpg",
        "name": "Cloak Master Shooter Run",
        "url": "https://html5.gamemonetize.com/fk1tepx4fvyw0f5fvokaxeruqv2kwcaf/",
        "text": "Cloak Master-Shooter Run allows you to show your shooting and running skills in an exciting environment! In this casual game, you will be transformed into a mysterious hero. Navigate through different scenarios, avoid obstacles and complete challenges."
    },
    {
        "index": 415,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/4k9zgzscmnpx3o0is15jqoy4mj1r170v/512x384.jpg",
        "name": "Newborn Puppy Baby Shower",
        "url": "https://html5.gamemonetize.com/4k9zgzscmnpx3o0is15jqoy4mj1r170v/",
        "text": "This is a fun and educational game for taking care of puppies. If you usually like to take care of pets, this game is just right for you."
    },
    {
        "index": 416,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/qpmotl0hv4pexlblweieiwqo2fl9fl3u/512x384.jpg",
        "name": "Castle Crusade",
        "url": "https://html5.gamemonetize.com/qpmotl0hv4pexlblweieiwqo2fl9fl3u/",
        "text": "Castle Crusade is an exciting tower defense game where you defend your castle against waves of enemies, including skeleton soldiers, flying dragons, and airborne threats. As the player, you control a heroic archer, and your goal is to protect your fortress from being overwhelmed by these relentless foes. Upgrade your abilities and choose strategic upgrades like fire arrows, bombs, and speed enhancements to fend off increasingly challenging waves. The game features engaging graphics with classic medieval elements combined with a touch of fantasy, like skeleton armies and flying creatures. The objective is to survive each level by eliminating"
    },
    {
        "index": 417,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p5gf29xqjrpk3339cu4rz6yg5bquysyg/512x384.jpg",
        "name": "Kids Geometry",
        "url": "https://html5.gamemonetize.com/p5gf29xqjrpk3339cu4rz6yg5bquysyg/",
        "text": "Description: Kids Geometry is an educational game designed to help children learn and recognize various geometric shapes in a fun and interactive way. Through colorful and engaging gameplay, kids will explore different shapes, understand their properties, and improve their spatial awareness. The game features multiple levels, each with increasing complexity, to keep young learners challenged and motivated. With vibrant graphics and playful sound effects, Kids Geometry makes learning about shapes an enjoyable adventure."
    },
    {
        "index": 418,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/powo2ec9hp63jax497aur0n9qfysejas/512x384.jpg",
        "name": "Super Ball Rush",
        "url": "https://html5.gamemonetize.com/powo2ec9hp63jax497aur0n9qfysejas/",
        "text": "Master ball control and score the maximum number of game points to complete all levels. Avoid obstacles and high-level balls to reach the end."
    },
    {
        "index": 419,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8jhvx2ac35237zj7xs9vnwuj8kehuq4u/512x384.jpg",
        "name": "Twist Knots Challenge",
        "url": "https://html5.gamemonetize.com/8jhvx2ac35237zj7xs9vnwuj8kehuq4u/",
        "text": "Twist Knots Challenge is a fun and challenging 3D puzzle game where you untangle ropes in the right order. Each level offers unique puzzles, starting with two ropes and gradually increasing up to four, making every stage more complex. With endless levels and vibrant 3D graphics, youll constantly test your problem-solving skills. Easy to pick up with simple controls but difficult to master, its perfect for anyone looking to tease their brain and become the ultimate Tangle Master!"
    },
    {
        "index": 420,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/souihl4o9tpdd7xadmz778waakj6m29m/512x384.jpg",
        "name": "Math Driving Test",
        "url": "https://html5.gamemonetize.com/souihl4o9tpdd7xadmz778waakj6m29m/",
        "text": "Drive and grab the objects to get the requested amount of unit cubes as quickly as possible. You have to get a medal to pass each level. Hitting tree or building or fence 3 times fails the game. Use the arrow keys I WASD or arrow buttons (mobile) to accelarate and steer the car."
    },
    {
        "index": 421,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/g45oun182v0z15v23idgjiicemshnw6s/512x384.jpg",
        "name": "Load The Dishes ASMR",
        "url": "https://html5.gamemonetize.com/g45oun182v0z15v23idgjiicemshnw6s/",
        "text": "Load The Dishes ASMR is a puzzle game that puts you in comfort and fun! Your task is to sort different colored dishes and put them in the dishwasher. By organizing your cutlery in an organized way, you will find that this is not just a simple puzzle challenge, but also a super relaxing ASMR sound experience."
    },
    {
        "index": 422,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dv93rn471aq2m0mcdyn3wcraxfxpco1x/512x384.jpg",
        "name": "Paper Doll For Girls Dress Up",
        "url": "https://html5.gamemonetize.com/dv93rn471aq2m0mcdyn3wcraxfxpco1x/",
        "text": "This is a decorating and dress-up game for girls. In the game, you have the opportunity to play the role of a fashion designer and choose a variety of different outfits, hairstyles, and accessories for the cute paper dolls."
    },
    {
        "index": 423,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/uwq4yvsrzz9bbi85xv6ig2tio3ejf7s4/512x384.jpg",
        "name": "Spiderlox Theme Park Battle",
        "url": "https://html5.gamemonetize.com/uwq4yvsrzz9bbi85xv6ig2tio3ejf7s4/",
        "text": "Join a creative and action sandbox adventure in Spiderlox Theme Park Battle! Youll play the role of a superhero Spiderman. Explore a huge theme park. Begin an exciting fight. In the game, you will face many enemies. Use your agility and strategy to win."
    },
    {
        "index": 424,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/a7cluq0o6e7zkuq25exq04c8gc8e9yb6/512x384.jpg",
        "name": "Starbust Strike",
        "url": "https://html5.gamemonetize.com/a7cluq0o6e7zkuq25exq04c8gc8e9yb6/",
        "text": "Control your ship and overcome all the barriers with thrilling adventure. Starburst Strike game is a ship controlling game where you have to cross the thrilling barriers and spikes. Be careful! While controlling the ship, you have to collect coins and avoid collisions with the barriers either game will be over. If you like genres such as adventure, quests or just want to have a good time then this game is for you. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting quests"
    },
    {
        "index": 425,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/s55d6j0cgotj27ubx6olac782qpr929f/512x384.jpg",
        "name": "Veggie Friends Game",
        "url": "https://html5.gamemonetize.com/s55d6j0cgotj27ubx6olac782qpr929f/",
        "text": "Veggie Friends is an engaging and educational game designed to teach kids about different vegetables while providing hours of fun. In this colorful and interactive game, players are introduced to a variety of vegetable characters, each with their own unique personalities and stories. The objective is to match and collect different veggies by solving puzzles and completing tasks. As players progress, they learn interesting facts about each vegetable and unlock new levels and challenges. The game promotes healthy eating habits and cognitive skills through playful learning."
    },
    {
        "index": 426,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ft78m76xexl2hoqe1s79ews90c7x9lb0/512x384.jpg",
        "name": "Parkour Rush",
        "url": "https://html5.gamemonetize.com/ft78m76xexl2hoqe1s79ews90c7x9lb0/",
        "text": "Run forward and look for a shortcut to outrun your rivals. Use the flight button to overtake your rivals, but steer carefully, its easy to miss and you wont be able to finish. The game also has obstacles that slow down the player, try to avoid them."
    },
    {
        "index": 427,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/iwrj5foh9vvbt7tw78fy1kwyl5chga75/512x384.jpg",
        "name": "Undead Mahjong",
        "url": "https://html5.gamemonetize.com/iwrj5foh9vvbt7tw78fy1kwyl5chga75/",
        "text": "Undead Mahjong is a thrilling Halloween-themed puzzle game where players match spooky tiles featuring ghosts, skeletons, and eerie symbols. Challenge yourself to clear the board by connecting identical tiles and unlock haunted levels filled with Halloween vibes. Perfect for fans of Mahjong and Halloween, this puzzle offers fun and frights in every level!"
    },
    {
        "index": 428,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zt9kw0rl1ev6onqgiumhrcx2taik9ag6/512x384.jpg",
        "name": "Merge Happy Planets!",
        "url": "https://html5.gamemonetize.com/zt9kw0rl1ev6onqgiumhrcx2taik9ag6/",
        "text": "Classic merge games are coming back with the Merge Happy Planets! Throw the planets and let them merge! Be careful for meteor showers and some mad planets! Use Big Bang Bombs, Rainbow Planets and Black Holes to achieve victory! Try your best. Can you be the number one!?"
    },
    {
        "index": 429,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/fvjp9obhregh67131r2fz47r2vsaoaoj/512x384.jpg",
        "name": "Wall Of Danger Dash",
        "url": "https://html5.gamemonetize.com/fvjp9obhregh67131r2fz47r2vsaoaoj/",
        "text": "A journey to save a Friend and to teach a lesson to the bad monster. Game story begins with Jake and Lily, among them Lily was snatched by a bad monster named Shadow Loomed. Monster gave a challenge to Jack to come and get his friend Lily. Jack is brave enough to accept the challenge. Now the player has to play the role of Jack and help toward his journey. There are many traps and monsters waiting for him but you have to overcome and kill all the enemies to save his friend. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests"
    },
    {
        "index": 430,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y0fe6m34dwew292ezc3a14t43882m4w7/512x384.jpg",
        "name": "Zumba Quest",
        "url": "https://html5.gamemonetize.com/y0fe6m34dwew292ezc3a14t43882m4w7/",
        "text": "Explore a vibrant world with never-ending puzzles and diverse environments in each chapter. Push your limits with exciting timed challenges with special types of marbles to help you along the way. Unlock new marble shooters as you advance through exciting levels."
    },
    {
        "index": 431,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/78buhui9gefu0ha2h7ifsw2898p1tsex/512x384.jpg",
        "name": "Huge Slap Run",
        "url": "https://html5.gamemonetize.com/78buhui9gefu0ha2h7ifsw2898p1tsex/",
        "text": "Welcome to the wonderful world of Huge Slap Run! Here you will begin interesting arcade parkour. Run and across many wonderful platforms! Sprint fast, avoid traps, and enjoy the fun of speed!"
    },
    {
        "index": 432,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/zd14u44mw7fbs7day2tovihldqavfxa2/512x384.jpg",
        "name": "Diamond Painting Asmr Coloring 2",
        "url": "https://html5.gamemonetize.com/zd14u44mw7fbs7day2tovihldqavfxa2/",
        "text": "Diamond Painting ASMR Coloring 2 is a relaxing puzzle coloring game designed for those who love relaxation! In this game, you can draw the way through diamonds. Bring beautiful pictures to life and enjoy a wonderful ASMR experience."
    },
    {
        "index": 433,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pkzpz6rydlh39ix5wcm0vw71fvdpq3jn/512x384.jpg",
        "name": "Meet The Birds",
        "url": "https://html5.gamemonetize.com/pkzpz6rydlh39ix5wcm0vw71fvdpq3jn/",
        "text": "Meet the Birds is an engaging and educational game designed for children to learn about different bird species in a fun and interactive way. The game features a vibrant and colorful environment where players can explore various habitats and meet a variety of birds. Each bird introduces itself with interesting facts and playful animations, making learning enjoyable and memorable. The game aims to enhance childrens knowledge about birds, their sounds, and their habitats while encouraging curiosity and exploration."
    },
    {
        "index": 434,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/g5tg9kxhio4ed81kt3pxv333y2mn4fuh/512x384.jpg",
        "name": "Multiplication: Bird Image Uncover",
        "url": "https://html5.gamemonetize.com/g5tg9kxhio4ed81kt3pxv333y2mn4fuh/",
        "text": "In this game, a bird image is hidden beneath multiplication expression tiles. Players must drag and drop the correct number bubbles onto the matching tiles to solve the expressions. As each expression is solved, the bird image gradually gets revealed. The goal is to uncover the entire image by completing all the math problems correctly."
    },
    {
        "index": 435,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/kt7gguvb3y32ofvegei28wbnvfwnms81/512x384.jpg",
        "name": "Hamster Kombat Pairs",
        "url": "https://html5.gamemonetize.com/kt7gguvb3y32ofvegei28wbnvfwnms81/",
        "text": "Hamster Kombat Pairs is an entertaining brain memory puzzle game where the objective is to match pairs of identical hamsters by flipping over the cards. Youll be racing against the clock, so focus on flipping the right cards to find matching hamsters. Each level presents an increasing difficulty, requiring quick thinking and fast actions to win."
    },
    {
        "index": 436,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/pxhxk8smb3daovcdj2fhb0a5qk2dc4mc/512x384.jpg",
        "name": "Kids Safety Tips",
        "url": "https://html5.gamemonetize.com/pxhxk8smb3daovcdj2fhb0a5qk2dc4mc/",
        "text": "This educational safety game has three modes: child seats, winter outfits, and building fire. The game has three modes, child seat, winter outfits, and building fire, in three simulated scenarios to teach children safety knowledge in different scenarios. When parents are driving, we should not make a lot of noise and fasten our seat belts."
    },
    {
        "index": 437,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/btz9licz9m47pmchg428tms9pp8q9zxw/512x384.jpg",
        "name": "Baby Unicorn Phone",
        "url": "https://html5.gamemonetize.com/btz9licz9m47pmchg428tms9pp8q9zxw/",
        "text": "Do you love unicorns? Do you want to care for a unicorn? If you want to do so, our unicorn care game for girls is just right for you. You will have the opportunity to make calls and talk to the unicorn."
    },
    {
        "index": 438,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lyqrzmhsa4gdejjhe2c1fadi6uw6gaen/512x384.jpg",
        "name": "Stick Man Battle Fighting",
        "url": "https://html5.gamemonetize.com/lyqrzmhsa4gdejjhe2c1fadi6uw6gaen/",
        "text": "Enter the world of Stick Man Battle Fighting and every move matters! This casual fighting game lets you unleash your skills in dynamic stickman battles against enemies. Master various fighting styles and begin exciting single-mode combat. Choose a weapon and customize your hero."
    },
    {
        "index": 439,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wgdaxwl09pqgakqlidsvnv9ah5wdk2lc/512x384.jpg",
        "name": "Mini Boxing",
        "url": "https://html5.gamemonetize.com/wgdaxwl09pqgakqlidsvnv9ah5wdk2lc/",
        "text": "Mini Boxing is a fantastic super-deformed boxing game where you control the boxer Nick-Joe and help him win the Boxer Championship Tournament! To claim victory, youll need to face and defeat six unique and quirky boxers, each with their own fighting style. The game is incredibly easy to play, with three main moves: Mini Boxing is inspired by classic 1980s arcade games, featuring charming super-deformed graphics and smooth animations."
    },
    {
        "index": 440,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8ikan0mc0jnznyb3v17wklbhqjiw3t64/512x384.jpg",
        "name": "Number kids",
        "url": "https://html5.gamemonetize.com/8ikan0mc0jnznyb3v17wklbhqjiw3t64/",
        "text": "Number Kids is an engaging and educational game designed to help children enhance their number recognition and counting skills. Perfect for young learners, this game combines fun animations and interactive gameplay to make learning numbers enjoyable. As kids progress through different levels, they are challenged to identify and count numbers, improving their numerical abilities in a playful and entertaining environment. With colorful graphics and easy-to-understand instructions, Number Kids is an excellent tool for early childhood education."
    },
    {
        "index": 441,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/g2057jxww1ceygb9jkajg0fydqe5he4y/512x384.jpg",
        "name": "Wanderer Liam",
        "url": "https://html5.gamemonetize.com/g2057jxww1ceygb9jkajg0fydqe5he4y/",
        "text": "Game story begins with Liam&amp;rsquo;s amazing explorer mindsets, he wants to explore a nearby mysterious forest so he starts his journey towards that unknown beauty of nature but also new challenges. Player has to help Liam to reach his desired destination by controlling Liam. He would like to cross the whole forest by his energetic jumping and flipping. Be careful! Don&amp;rsquo;t forget to control Liam&amp;rsquo;s jumping and flipping power, either he will fall or collide with enemies and the game will be over. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests."
    },
    {
        "index": 442,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/gxropu31452995t0os1hzy1jh5grogtx/512x384.jpg",
        "name": "Redpool Skyblock 2 Player",
        "url": "https://html5.gamemonetize.com/gxropu31452995t0os1hzy1jh5grogtx/",
        "text": "You must take your place in the adventure of the men in red and yellow costumes, as an action-packed journey awaits you. The red and yellow players need to collect purple potion boxes. If you gather all the potion boxes, the yellow player will claim them and can activate the portal with the potion. The red player can see and eliminate invisible enemies. You must be very careful&amp;mdash;monsters are everywhere, and they want to eat you!"
    },
    {
        "index": 443,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/s91zye5bu8xsdv9jrbafqo9ihupc3ra2/512x384.jpg",
        "name": "Dino Run Magic 2D",
        "url": "https://html5.gamemonetize.com/s91zye5bu8xsdv9jrbafqo9ihupc3ra2/",
        "text": "Dino Run Magic 2D is an exhilarating online web game where players take control of a charming dinosaur character on a quest for the highest score! Set in a vibrant prehistoric world, players navigate through a series of challenging obstacles"
    },
    {
        "index": 444,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/kgf2sm8cd48ns214pd3epy2pls48kjkd/512x384.jpg",
        "name": "Baby Panda Earthquake Safety",
        "url": "https://html5.gamemonetize.com/kgf2sm8cd48ns214pd3epy2pls48kjkd/",
        "text": "This is an educational game designed for children. Do you know what to do when there is an earthquake? Our game will tell you the answer. The game has 3 scenarios: home, supermarket, and school. When the earthquake comes, you must choose where to hide so the collapsing objects wont hit you."
    },
    {
        "index": 445,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/c3vu0azi00kixuug0mtgu14crk9vzato/512x384.jpg",
        "name": "Jungle Bubble Drop",
        "url": "https://html5.gamemonetize.com/c3vu0azi00kixuug0mtgu14crk9vzato/",
        "text": "Immerse yourself in the jungle-themed Bubble shooter game, Jungle Bubble Drop! Aim and fire bubbles to match and collect them while keeping them away from the danger line. Choose between Arcade Mode, where endless survival is key, or Challenge Mode, where each level brings new goals. Prepare for an exciting bubble-popping adventure!"
    },
    {
        "index": 446,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ladqxht8dr0lltmcxpoio25r4onan6l0/512x384.jpg",
        "name": "Coastal defense",
        "url": "https://html5.gamemonetize.com/ladqxht8dr0lltmcxpoio25r4onan6l0/",
        "text": "Protect the seashore from the invasion of enemies. Use all the weapons to stop the invasion of soldiers from the sea and from the air."
    },
    {
        "index": 447,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/h26rup059n8tunamx3uc8cg4i17uaocc/512x384.jpg",
        "name": "Draw to Save my Hero",
        "url": "https://html5.gamemonetize.com/h26rup059n8tunamx3uc8cg4i17uaocc/",
        "text": "Players may enjoy a unique gaming experience in Draw to Save my Hero Online, an engaging puzzle game that revolves on drawing lines. You take on the role of a superhero under assault from missiles in the game. It is your responsibility to create lines to stop these projectiles and shield the hero. Finish every level and attempt to rescue the superheroes, such as Iron Man, Batman, Spider-Man, and so on. Heroes rely on you to draw to shield them from the rockets that will be launched, but you must use caution and a thorough understanding of the level to prevent any heroes from suffering harm."
    },
    {
        "index": 448,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/t473gwtp5vaopcujpycubqik3a675svt/512x384.jpg",
        "name": "Dot Shooter",
        "url": "https://html5.gamemonetize.com/t473gwtp5vaopcujpycubqik3a675svt/",
        "text": "Dot Shot is an engaging online game that will test your skills and precision. Similar to a brick-breaking game, your objective is to destroy beams without allowing the ball to fall. With each level presenting new challenges and obstacles, you must strategically aim your shots to break through the beams and progress further in the game. As you navigate through various levels, you will encounter different arrangements of beams that will require quick reflexes and accurate timing to conquer. The intuitive controls make it easy to control the balls movement."
    },
    {
        "index": 449,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/5ehehmkiwpq3l563xsfwxvqtlk7alhvp/512x384.jpg",
        "name": "Woodoku Block Puzzle",
        "url": "https://html5.gamemonetize.com/5ehehmkiwpq3l563xsfwxvqtlk7alhvp/",
        "text": "Welcome to experience the Woodoku Block Puzzle! This is a super fun casual puzzle game, especially for relaxing in your free time. The gameplay is very simple and very challenging! There are four modes you can choose from."
    },
    {
        "index": 450,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/z9gmyi01i5dsgspg3lb1mdp5m882w1mt/512x384.jpg",
        "name": "Advanture Of Tommy",
        "url": "https://html5.gamemonetize.com/z9gmyi01i5dsgspg3lb1mdp5m882w1mt/",
        "text": "Explore the adventure and fun game Adventure of Tommy In this adventure many mysterious traps and dangers were waiting for The main character Tommy Player has to play the role of Tommy and finish each level and collect gold coins. If you like genres such as adventure, action, rpg, platform, quests or just want to have a good time then this game is for you. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting Quests"
    },
    {
        "index": 451,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ascprolxlhra0m3fzic1fdzp3t3g59kk/512x384.jpg",
        "name": "Number Quest",
        "url": "https://html5.gamemonetize.com/ascprolxlhra0m3fzic1fdzp3t3g59kk/",
        "text": "Embark on a thrilling adventure with Number Quest, an engaging and educational puzzle game designed to sharpen your math skills! In this game, players navigate through various levels filled with challenging number puzzles. Each level presents a unique set of problems that require quick thinking and problem-solving abilities. As you progress, the puzzles become more complex, providing endless fun and learning opportunities. Suitable for all ages, Number Quest is the perfect blend of entertainment and education, making math enjoyable for everyone."
    },
    {
        "index": 452,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/k0b0y7a66ccmyavl0q6cc1joi0gp6el3/512x384.jpg",
        "name": "OverProtective Boyfriend",
        "url": "https://html5.gamemonetize.com/k0b0y7a66ccmyavl0q6cc1joi0gp6el3/",
        "text": "Imagine the beautiful Princess Marie standing in front of a mirror, looking at her reflection. Her eyes are shining, and a sly smile plays on her lips. She is ready to put on an outfit that will emphasize her grace and charm. But then her lover appears and frowns: &amp;laquo;My dear, are you really going to wear such an open dress?&amp;raquo; Marie knows that her faithful knight sometimes takes too much care of her, but today she intends to look dazzling!"
    },
    {
        "index": 453,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/vi4f4xiuguam5hir11p0d6p8o89e183o/512x384.jpg",
        "name": "Escape Ancient Egypt",
        "url": "https://html5.gamemonetize.com/vi4f4xiuguam5hir11p0d6p8o89e183o/",
        "text": "Escape Ancient Egypt is an Adventure 3D puzzle game in the mysterious ruins of the ancient Egypt, on the footsteps of Cleopatra and the pharaohs. Can you escape from the pharaohs curse? Solve the puzzles and unlock the next room, turn on the brain, youll need it to open all the doors that will allow you to escape. Main Features in Ancient Egypt: puzzle escape * beautiful and eye catching graphic theme representing the mystery of the ancient egyptian temples, lets take a dive in the history of Cleopatra and the pharaohs. *Many rooms to explore and doors to unlock, the pyramids hide the mystery. Play now Escape Ancient Egypt: Adventure!"
    },
    {
        "index": 454,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/blzpt7ulfvnz6envxa7o51wgoio6akmu/512x384.jpg",
        "name": "Color Blocks Collapse 24",
        "url": "https://html5.gamemonetize.com/blzpt7ulfvnz6envxa7o51wgoio6akmu/",
        "text": "This is another free puzzle game developed by Myhiddengame. In this game, you will be given a large playing field that contains many blocks of different colors, and your goal is to clear the playing field by removing all the blocks. Collapse blocks by clicking groups of blocks of the same color. The larger the group you collapse, the higher the score you will get. But if you collapse only 1 block, you will lose 100 points. Click on the colored globe to collapse all the blocks of the same color. Click on the bomb to collapse a group of 3x3 blocks. Click on the shurikens to collapse the vertical and horizontal row of blocks. Your progress will"
    },
    {
        "index": 455,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/hrajsm21xojrfiveokcb8bwh9rk91clh/512x384.jpg",
        "name": "Cosmic Sprint",
        "url": "https://html5.gamemonetize.com/hrajsm21xojrfiveokcb8bwh9rk91clh/",
        "text": "Cosmic Sprint is an exhilarating space-themed action game where you guide your UFO through a galaxy filled with obstacles and dangers. Navigate through an asteroid field while avoiding space mines and meteor showers, all while collecting cosmic energy to unlock new spacecrafts. The vibrant cosmic environment and thrilling gameplay make it a fast-paced, addictive experience that will test your reflexes and keep you on the edge of your seat! Key Features: Explore the galaxy with multiple unlockable spacecrafts. Navigate through various space-themed obstacles, including meteors and space mines. Collect cosmic energy to unlock more advanced ship"
    },
    {
        "index": 456,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ukcyc9vpff2jus19qjkt6gbxxoyo84qw/512x384.jpg",
        "name": "Gold Miner Tower Defense",
        "url": "https://html5.gamemonetize.com/ukcyc9vpff2jus19qjkt6gbxxoyo84qw/",
        "text": "Gold Miner Tower Defense is a wonderful combination of tower defense, card strategy and upgrade combat. You will play as a brave miner protecting gold from enemies. Protect your precious treasures strategically with many unique defense towers!"
    },
    {
        "index": 457,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/6pb58yxizvrukc8x8wvbf3tqnaoffbtq/512x384.jpg",
        "name": "Z Machine",
        "url": "https://html5.gamemonetize.com/6pb58yxizvrukc8x8wvbf3tqnaoffbtq/",
        "text": "In the Z-Machine, you will be in a vibrant arcade world. Take on hordes of zombies in a powerful tank! Your mission is to destroy the zombie and get the money, and then ship it back to the warehouse.Upgrade your vehicle at the same time to improve combat effectiveness and defense!"
    },
    {
        "index": 458,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2xy063qgy3crylipep1qpyvw3gxbjzc5/512x384.jpg",
        "name": "Cake Maker Kids Cooking",
        "url": "https://html5.gamemonetize.com/2xy063qgy3crylipep1qpyvw3gxbjzc5/",
        "text": "This is a cake-making game for girls on BabyGames.com. You may learn to mix ingredients, bake in the oven, and decorate your creations with sugar crumbs, candies, and delicious icing. The game has 3 types of cakes for you to make."
    },
    {
        "index": 459,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/bvp3ndb3kmg2w1kky9wd4nr39105kcnr/512x384.jpg",
        "name": "Nightmare Float",
        "url": "https://html5.gamemonetize.com/bvp3ndb3kmg2w1kky9wd4nr39105kcnr/",
        "text": "Nightmare Float is an exciting, spooky arcade game where players guide a creepy balloon character through a haunted forest. With chilling visuals and atmospheric sound effects, the objective is to float upwards while avoiding various haunting obstacles like shurikens, spikes, and eerie clouds. Collect potions along the way to unlock new characters and stay afloat as long as possible in this spooky adventure. The more you float, the higher your score, but beware&amp;mdash;the forest gets more dangerous the higher you go! Key Features: Spooky Atmosphere: Explore a haunted forest with eerie backgrounds and haun"
    },
    {
        "index": 460,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/s6kp2cgj3m6vuqf9o8dp2bmmrnh6ptzn/512x384.jpg",
        "name": "Memory Exclusive",
        "url": "https://html5.gamemonetize.com/s6kp2cgj3m6vuqf9o8dp2bmmrnh6ptzn/",
        "text": "Memory Exclusive, get ready to dive into thrilling and stimulating memory challenges! This memory game takes you on a journey of concentration and quick reflexes, testing your memorization skills across various difficulty levels. With vibrant graphics and an immersive soundtrack, each match is an opportunity to sharpen your mind while having fun. Unlock achievements, challenge your friends in multiplayer matches, and become the true master of memory."
    },
    {
        "index": 461,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3u86sd48o7wxn5ws7hf4gjfxhot064wj/512x384.jpg",
        "name": "The Memory Matrix",
        "url": "https://html5.gamemonetize.com/3u86sd48o7wxn5ws7hf4gjfxhot064wj/",
        "text": "Game story begins with Two friends named Rina and Rai, Rine getting kidnapped by a bad person. Now Rai takes the responsibility to save her friend. Player has to help Rai to reach the nearest of the Rina by selecting the correct bridge block to cross the river. Bridge blocks will be shown for a few seconds and you&amp;rsquo;ve to remember it and select the same bridge which was shown previously. Be careful! If your memory is not strong or you can&amp;rsquo;t find the correct bridge step, Rai will have fallen into the water and the Game will be over. Features of this game: High Quality graphics Game size is minimal Super simple controls Interesting quests"
    },
    {
        "index": 462,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l1b5lvgf49i1s7s6s9onfrjs5uprml8k/512x384.jpg",
        "name": "Air Space Shooter",
        "url": "https://html5.gamemonetize.com/l1b5lvgf49i1s7s6s9onfrjs5uprml8k/",
        "text": "Defend the galaxy in epic air battles! Blast enemies, upgrade ships, and conquer the universe. Prepare for intense space combat in Galactic Air Strike: Space Shooter! Join the fight to defend the galaxy from ruthless alien invaders in this action-packed arcade game. Take control of powerful spaceships, upgrade your weapons, and unleash devastating attacks in dynamic air battles."
    },
    {
        "index": 463,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/jgb69uo5ihhe9yuqt3kvpr16uz773hoe/512x384.jpg",
        "name": "Pin Puzzle Love Story",
        "url": "https://html5.gamemonetize.com/jgb69uo5ihhe9yuqt3kvpr16uz773hoe/",
        "text": "Are you ready to use your logical mind to save love? In Pin Puzzle-Love Story, you face a series of interesting and challenging levels. Pull pins in the right order to solve puzzles and help couples reunite. Each level is a new Logic puzzle that can only be successfully completed by pulling the right latch!"
    },
    {
        "index": 464,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/llkmrfjrms7ea79b5v88qs7zdinboryu/512x384.jpg",
        "name": "Cocktail Party 3D ",
        "url": "https://html5.gamemonetize.com/llkmrfjrms7ea79b5v88qs7zdinboryu/",
        "text": "Cocktail Party 3D is an excellent puzzle game where you progress by matching cocktails. Match cocktails, take pictures and become the ladies favorite! Progress a little more for each level you pass and capture beautiful shots of gorgeous women by taking various photos and they will pose for you!"
    },
    {
        "index": 465,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wxuz5wfkjhaiil16e47b3nnesbo12aid/512x384.jpg",
        "name": "Back 2 School Makeover",
        "url": "https://html5.gamemonetize.com/wxuz5wfkjhaiil16e47b3nnesbo12aid/",
        "text": "Embrace the nostalgia and dive into our Back 2 School Makeover game, where you can fashionably express yourself, experiment with stunning looks, and relish into the feeling of heading back to school with style! Embark on a fabulous journey with our character, Amelia, as she transforms from an edgy e-girl to a chic, school-ready fashionista. Revamp her entire look starting with a haircare routine and a new haircut, a complete skincare routine, and a new, school makeup."
    },
    {
        "index": 466,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/n56k5tl9uexomj9880qz1y5mjqocydjo/512x384.jpg",
        "name": "My Animal Hair Salon",
        "url": "https://html5.gamemonetize.com/n56k5tl9uexomj9880qz1y5mjqocydjo/",
        "text": "This is a game to design hairstyles and outfits for your pet. You will have the opportunity to try all the salon tools to create the most exciting hairstyles for animals. You can freely comb and move the hair in any direction. Dye it to any color of the rainbow."
    },
    {
        "index": 467,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/lyr8bd5viu6jt8in21s5qyz9lim5ep5l/512x384.jpg",
        "name": "Baby Taylor Toy Master",
        "url": "https://html5.gamemonetize.com/lyr8bd5viu6jt8in21s5qyz9lim5ep5l/",
        "text": "This is a DIY toy-making game. There are two studios in the game and the choice of where to start is up to you. One studio is fully equipped to make quality wooden toys. You can assemble them with puzzle parts and design different toy colors."
    },
    {
        "index": 468,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/ic8o64eot1bewdh0e2l8b0ong4y9j1q0/512x384.jpg",
        "name": "Car Driving 3D Champ 2024",
        "url": "https://html5.gamemonetize.com/ic8o64eot1bewdh0e2l8b0ong4y9j1q0/",
        "text": "Get ready to burn rubber and conquer the bustling city streets in this thrilling online car driving game! Navigate through a vibrant metropolis filled with traffic, pedestrians, and unexpected challenges. Choose from a variety of high-performance vehicles, each with unique handling characteristics, and customize them with a wide range of upgrades and accessories. Race against time in thrilling missions, compete against other players in intense multiplayer races, or simply cruise the streets at your own pace. Drift around corners, perform stunts, and show off your driving skills. With realistic physics and stunning graphics, City Streets:"
    },
    {
        "index": 469,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/wh6wjs0rik5apfr88fmrhsmevw070fsf/512x384.jpg",
        "name": "Tile Puzzle Game",
        "url": "https://html5.gamemonetize.com/wh6wjs0rik5apfr88fmrhsmevw070fsf/",
        "text": "Tile Puzzle Game is an engaging and visually appealing tile-based puzzle game that tests your spatial reasoning and problem-solving skills. The game starts with a shuffled grid of numbered tiles and an empty space. Your objective is to rearrange the tiles by sliding them into the empty space to achieve the correct numerical order. With a built-in timer and move counter, you&amp;rsquo;ll need to think quickly and strategically to solve the puzzle before time runs out."
    },
    {
        "index": 470,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3t8x4ihe9epjpjet2us28h45zs5ss3bf/512x384.jpg",
        "name": "Tic Tac Toe Fun Game",
        "url": "https://html5.gamemonetize.com/3t8x4ihe9epjpjet2us28h45zs5ss3bf/",
        "text": "Tic Tac Toe-Fun Game is a vibrant and modern twist on the classic game. With a sleek interface, smooth animations, and exciting sound effects, players can enjoy challenging matches against a smart computer or a friend. Align three symbols in a row, column, or diagonal to win, and experience dynamic effects that enhance the classic gameplay."
    },
    {
        "index": 471,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/se6clex6m0cn5hqdj7j0rvz8ykt91mb5/512x384.jpg",
        "name": "The Wizard Elion : Halloween Edition ",
        "url": "https://html5.gamemonetize.com/se6clex6m0cn5hqdj7j0rvz8ykt91mb5/",
        "text": "Although you may have lived this little adventure, you will live it again but in a different climate! Take the wizard Elion back home ------------------- Updates to some arts and optimization of scenarios. available languages: English Portuguese Italian"
    },
    {
        "index": 472,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/512x384.jpg",
        "name": "Sky Glide",
        "url": "https://html5.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/",
        "text": "Sky Glide is a visually captivating sky adventure where players guide a paper plane through a serene, cloud-filled world. The goal is to soar through the bright skies, collecting floating paper planes and avoiding dangerous obstacles like spinning gears and dark void planes. With each level, the challenge increases as the sky becomes more crowded with hazards, testing your precision and reflexes. The peaceful, picturesque setting with fluffy clouds and a soft blue sky creates a relaxing and immersive experience that will keep you engaged as you aim to glide further and achieve a high score in the endless sky."
    },
    {
        "index": 473,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/512x384.jpg",
        "name": "Matching Donuts",
        "url": "https://html5.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/",
        "text": "Matching Donuts is a fun and fast-paced puzzle game where you connect colorful donuts to score big! Swipe and match the same donuts in a row before time runs out, challenging your reflexes and strategy. Unlock special power-ups and crazy combos for extra points and higher scores. With vibrant graphics and addictive gameplay, dive into this sugary challenge, master each level, and see how many delicious donuts you can match! Get ready for a sweet adventure that will test your speed, precision, and donut-matching skills!"
    },
    {
        "index": 474,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/512x384.jpg",
        "name": "Quiz: marvel",
        "url": "https://html5.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/",
        "text": "This quiz is dedicated to the amazing and diverse Marvel Universe. You will face over 100 questions that will test how well you know this world. As you progress, you will encounter Superheroes many times who have valuable advice prepared for you. They will help you move forward. Remember, each question has exactly one correct answer. And each mistake will cost you hearts. Additionally, each mistake will keep you from your next meeting with a Superhero. But dont despair if you lose all your hearts. Youll always have one last chance. Be attentive! And good luck!"
    },
    {
        "index": 475,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/rcz0gvd31rqanf4mwwzvhhlpeiiejdko/512x384.jpg",
        "name": "Spaceflight Simulator",
        "url": "https://html5.gamemonetize.com/rcz0gvd31rqanf4mwwzvhhlpeiiejdko/",
        "text": "Do you have a space dream? Spaceflight Simulator is a challenging spaceflight simulation game suitable for boys who love to build and launch rockets."
    },
    {
        "index": 476,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/v9ob2716ed3lgcooazkcuovdk6h3qvn9/512x384.jpg",
        "name": "Baby Taylor Home Stories",
        "url": "https://html5.gamemonetize.com/v9ob2716ed3lgcooazkcuovdk6h3qvn9/",
        "text": "This is a family care and cleaning game for girls. You need to help Tyler prepare a birthday cake for his mum, clean the yard for the kittens and puppies, and bath them."
    },
    {
        "index": 477,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/2a8vm0oxepsrr4isi7l9azrj5kb9x0dn/512x384.jpg",
        "name": "Galaxy Particles Calm",
        "url": "https://html5.gamemonetize.com/2a8vm0oxepsrr4isi7l9azrj5kb9x0dn/",
        "text": "ome to the fascinating world of Galaxy Particles Calm. Galaxy Particles is one of the best relaxing games and it uses physical gravity for space simulation. There is an incredible anti-stress effect as a calming and relaxing game."
    },
    {
        "index": 478,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/23mitfuj0ehf9kgntvsdzc03b8ru8e1n/512x384.jpg",
        "name": "Magical Match",
        "url": "https://html5.gamemonetize.com/23mitfuj0ehf9kgntvsdzc03b8ru8e1n/",
        "text": "Match the magical item block tiles and help the witch to get a new magical spell. There were many magical item blocks available, the player had to match them by simple swiping. Don&amp;rsquo;t forget to get help from the special power tools available in this game. If you like genres such as puzzle games, tile matching games or just want to have a good time then this game is for you. Features of this game: High Quality graphics. Game size is minimal. Super simple controls. Interesting quests."
    },
    {
        "index": 479,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/feek54dnzhhn9053brvevtz6p3xblwp2/512x384.jpg",
        "name": "This Time For Africa",
        "url": "https://html5.gamemonetize.com/feek54dnzhhn9053brvevtz6p3xblwp2/",
        "text": "Explore Africa, One Maze at a Time: This Time For Africa! Embark on a captivating journey through the vibrant continent of Africa in This Time For Africa, a unique maze puzzle game! Unveil the Wonders of Africa: Travel Through Time: Progress through a map of Africa, unlocking new countries in a specific order. Each country becomes a level with a unique maze puzzle waiting to be solved. Challenge Your Mind: Navigate intricately designed mazes inspired by each countrys landmarks, landscapes, or cultural elements."
    },
    {
        "index": 480,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8gzyhvwka62g0bsz4prfi18bk6er9l6q/512x384.jpg",
        "name": "Kids Animal Farm",
        "url": "https://html5.gamemonetize.com/8gzyhvwka62g0bsz4prfi18bk6er9l6q/",
        "text": "Kids Animal Farm is an educational game. I believe you must have dreamed of owning a farm, producing fresh food, and caring for cute animals. In this game, you will realize your dream and own your farm. As a farm owner, you need to work hard while enjoying the beautiful scenery. Choose a level you like, such as making strawberry jam, taking care of lambs, picking carrots, etc., and start to experience the wonderful farm life. This game has bright colors, smooth animations, and humanized interactive design, which will definitely make you love it. Come and try it!"
    },
    {
        "index": 481,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/8jzn8gkzr6o80rc6hpp4aksxztuztcyq/512x384.jpg",
        "name": "Adventure Jungle",
        "url": "https://html5.gamemonetize.com/8jzn8gkzr6o80rc6hpp4aksxztuztcyq/",
        "text": "Embark on an exciting journey through the Adventure Jungle! Guide your character through various terrains, dodge obstacles, and overcome challenges. Adventure Jungle is a thrilling endless runner game that tests your reflexes and strategic thinking. With vibrant graphics and engaging gameplay, this game is perfect for players of all ages. Are you ready to conquer the jungle?"
    },
    {
        "index": 482,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/y6mou29avqu65cm4ez552kq8agfvoynj/512x384.jpg",
        "name": "Escape Noob",
        "url": "https://html5.gamemonetize.com/y6mou29avqu65cm4ez552kq8agfvoynj/",
        "text": "In this adventure, the noob is escaping from his own clone. The clone is a very evil character and wants to kill the real noob. He has tamed a bear and is trying to have the bear kill the noob. You must avoid the clone and the bear, collecting all the gold along the way. Remember to get the key. Once you have the key, use it to lower the iron bars at the finish line. Lowering the iron bars will prevent the bear and the evil noob from attacking you, and youll be able to escape as you wish. Don&amp;rsquo;t look back&amp;mdash;just keep running and escaping."
    },
    {
        "index": 483,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3b0tl6qq98yogdsy8wuxmrpoyurst2m0/512x384.jpg",
        "name": "Mystic Quest",
        "url": "https://html5.gamemonetize.com/3b0tl6qq98yogdsy8wuxmrpoyurst2m0/",
        "text": "Solve the word game by finding the words Use your word finding capability and solve each level.There was a hint given in each level, you have to look carefully and select them. If you like genres such as Puzzle Games,Word Quest Games or just want to have a good time then this game is for you. Features of this game: High Quality graphics will leave only positive feedback Game size is minimal (but not compromised the graphics) and it is good for your device health Super simple controls make it easy to start playing Interesting quests will not let you get bored while playing the game."
    },
    {
        "index": 484,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/kk91s3entdvy6b57qnumhbrryzq3f7u9/512x384.jpg",
        "name": "Water Sort Bottle 2024",
        "url": "https://html5.gamemonetize.com/kk91s3entdvy6b57qnumhbrryzq3f7u9/",
        "text": "Here&amp;rsquo;s a more straightforward, human-friendly version of your description: Water Sort Bottle 2024 Game is a fun and relaxing puzzle game that challenges you to sort colorful liquids into their own bottles. Get ready to dive into thousands of levels where youll pour and organize different colored waters. Enjoy the peaceful sound of water while you play, and watch as the colors come together in satisfying harmony. How to Play: 1 Sort the colored water into separate bottles so each bottle only holds one color. 2 Simply tap a bottle to pour its contents into another one &amp;ndash; but remember, you can only mix colors that match! 3 Lev"
    },
    {
        "index": 485,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dpei1y1bfdd6vsgthkjwfnk7u7g0xu4s/512x384.jpg",
        "name": "Escape Mystic Castle Mobile version ",
        "url": "https://html5.gamemonetize.com/dpei1y1bfdd6vsgthkjwfnk7u7g0xu4s/",
        "text": "A villager was taken to a castle and was trapped there, now try to get out of there if you can! Of course you will have to look for a way out so look carefully and use the items wisely! Its a short adventure, but I think youll like it... #metroidvania #studiosagbr"
    },
    {
        "index": 486,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/473hhqxielr67bfqa3w8e2isxy76yeyv/512x384.jpg",
        "name": "The wizard Elion",
        "url": "https://html5.gamemonetize.com/473hhqxielr67bfqa3w8e2isxy76yeyv/",
        "text": "When the old wizard Elion tried to conjure a sphere of light, a mistake transported him to a modern shopping mall full of monsters. Now, lost among shop windows and strange creatures, Elion needs to find a way to correct his spell and return to his kingdom, before the chaos spreads further and the monsters are completely released. ---------The game has 3 languages: Portuguese, English and Italian ---------You can play on your mobile device too. Good fun!"
    },
    {
        "index": 487,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/d1xdfk9djnblr991p77c2eb6jgnsd40d/512x384.jpg",
        "name": "The snake Game",
        "url": "https://html5.gamemonetize.com/d1xdfk9djnblr991p77c2eb6jgnsd40d/",
        "text": "Classic and nostalgic snake game but how about you help? Help this little snake eat 100 fruits to grow and become strong. Can you do this?"
    },
    {
        "index": 488,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/3krtityw2w7zic69zyaf6smc47u1cxda/512x384.jpg",
        "name": "Call Of Duty Free Fire",
        "url": "https://html5.gamemonetize.com/3krtityw2w7zic69zyaf6smc47u1cxda/",
        "text": "Call of Duty: Free Fire brings you into a nervous battle royale. Only the strongest shooters survive! Like PUBG, this game is filled with intense and exciting firefighting and shooting experiences. Youll be parachuted into a vast battlefield and battle fiercely against opponents."
    }
]



let navcation = [
	{
		img: "image/l1.png",
		text: 'New ',
		index: 1
	},
	{
		img: "image/l2.png",
		text: 'Best ',
		index: 2
	},
	{
		img: "image/l3.png",
		text: 'Hot ',
		index: 3
	},
	{
		img: "image/l4.png",
		text: 'Favorite',
		index: 4
	},

]
let typeList = [
	{

		text: 'Action',
		img: "image/m1.svg",
		index: 1
	},
	{

		text: 'Adventure',
		img: "image/m2.svg",
		index: 2
	},
	{

		text: 'Car',
		img: "image/m3.svg",
		index: 3
	},
	{

		text: 'Class',
		img: "image/m4.svg",
		index: 4
	},
	{

		text: 'Collection',
		img: "image/m5.svg",
		index: 5
	},
	{

		text: 'Management',
		img: "image/m6.svg",
		index: 6
	},
	{

		text: 'Kids',
		img: "image/m7.svg",
		index: 7
	},
	{

		text: 'Chess',
		img: "image/m8.svg",
		index: 8
	}

]

//random
function getArrayItems(arr, num) {
	var temp_arr = arr.slice(0);
	// 取出的数值项，保存在此数组
	var return_arr = [];
	for (var i = 0; i < num; i++) {
		// 判断如果数组还有可以取出的元素，以防下标越界
		if (temp_arr.length > 0) {
			// 在数组中产生一个随机索引
			var arrIndex = Math.floor(Math.random() * temp_arr.length);
			// 将此随机索引的对应数组元素值复制出来
			return_arr[i] = temp_arr[arrIndex];
			// 然后删掉此索引的数组元素，这时候temp_arr变为新的数组
			temp_arr.splice(arrIndex, 1)
		} else {
			// 数组中数据项取完后，退出循环，比如数组本来只有10项，但要求取出20项
			break;
		}
	}
	return return_arr;
}

function detai(url) {
	window.location.href = url
}
let title = document.querySelector(".title")
title.onclick = () => {
	detai("index.html")
}
$(".f-inner img").click(function () {
	detai("index.html")
})




function menuListFun() {
	let str = ""
	let menuJson = window.innerWidth > 960 ? navcation : typeList
	menuJson.forEach((item) => {
		str += `
				<a href="class.html?type=${item.text}">
					<img src="${item.img}">
					${item.text} games
				</a>
				`
	})
	$(".menu_list").html(str)
}
menuListFun()

function typeListFun(num) {
	let str = ""
	typeList.forEach((item) => {
		str += `
				<a href="class.html?type=${item.text}">
					<img src="${item.img}">
					<p>${item.text} Game</p>
				</a>
				`
	})
	$(".type-box").html(str)
}
let type_box = $(".type-box")
if (type_box) {
	typeListFun()
}
var item_state = 0
$(".all_item").click(function () {
	if (item_state == 0) {
		$(".type-box").css("height", "250px")
		item_state = 1
	} else {
		$(".type-box").css("height", "70px")
		item_state = 0
	}
})


let randomNum = (min, max) => {
	return (parseInt(Math.random() * (max - min + 0) + min));
}
let randomToFixedNum = (min, max) => {
	return (Math.random() * (max - min + 0) + min).toFixed(1);
}

/**
 * ELECTRICAL INSTALLATION ANIMATION - PRO VERSION
 * Animation du parcours complet d'une installation électrique
 * Compteur extérieur → Façade → Intérieur (coupe isométrique)
 * Scroll-triggered avec séquence chronologique et effets néon
 */

class ElectricalAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn('ElectricalAnimation: container not found:', containerId);
            return;
        }

        this.svg = null;
        this.paths = [];
        this.junctions = [];
        this.outlets = [];
        this.switches = [];
        this.particles = [];
        this.progress = 0;
        this.isActive = false;
        this.meter = null;
        this.panel = null;
        this.animationFrame = null;
        this.lastTime = 0;

        console.log('ElectricalAnimation: initializing...');
        this.init();
    }

    init() {
        try {
            this.createSVG();
            this.createElements();
            this.createParticles();
            this.setupScrollTrigger();
            this.animate();
            console.log('ElectricalAnimation: initialized successfully');
        } catch (error) {
            console.error('ElectricalAnimation: initialization error:', error);
        }
    }

    createSVG() {
        const svgNS = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(svgNS, 'svg');
        this.svg.setAttribute('viewBox', '0 0 480 720');
        this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        this.svg.classList.add('electrical-svg');

        // Fond avec effet glassmorphism
        const bgRect = document.createElementNS(svgNS, 'rect');
        bgRect.setAttribute('x', '5');
        bgRect.setAttribute('y', '5');
        bgRect.setAttribute('width', '470');
        bgRect.setAttribute('height', '710');
        bgRect.setAttribute('fill', 'rgba(15, 23, 42, 0.6)');
        bgRect.setAttribute('stroke', 'rgba(0, 85, 170, 0.3)');
        bgRect.setAttribute('stroke-width', '1');
        bgRect.setAttribute('rx', '12');
        this.svg.appendChild(bgRect);

        // Définitions pour les gradients et filtres améliorés
        const defs = document.createElementNS(svgNS, 'defs');
        defs.innerHTML = `
            <!-- Gradient pour les câbles actifs -->
            <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#0055AA;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#3388FF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0055AA;stop-opacity:1" />
            </linearGradient>
            
            <!-- Gradient néon bleu -->
            <linearGradient id="neonBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0055AA;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#3388FF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0055AA;stop-opacity:1" />
            </linearGradient>
            
            <!-- Gradient néon vert -->
            <linearGradient id="neonGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#34D399;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
            </linearGradient>
            
            <!-- Gradient néon orange -->
            <linearGradient id="neonOrangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:1" />
            </linearGradient>
            
            <!-- Filtre de glow intense pour les câbles -->
            <filter id="cableGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur1"/>
                <feGaussianBlur stdDeviation="6" result="blur2"/>
                <feMerge>
                    <feMergeNode in="blur2"/>
                    <feMergeNode in="blur1"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Filtre de glow ultra intense pour les étincelles -->
            <filter id="sparkGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur1"/>
                <feGaussianBlur stdDeviation="8" result="blur2"/>
                <feGaussianBlur stdDeviation="12" result="blur3"/>
                <feMerge>
                    <feMergeNode in="blur3"/>
                    <feMergeNode in="blur2"/>
                    <feMergeNode in="blur1"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Filtre de glow néon pour les éléments actifs -->
            <filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur1"/>
                <feGaussianBlur stdDeviation="4" result="blur2"/>
                <feMerge>
                    <feMergeNode in="blur2"/>
                    <feMergeNode in="blur1"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Pattern pour les gaines -->
            <pattern id="conduitPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#374151"/>
                <circle cx="5" cy="5" r="2" fill="#4B5563"/>
            </pattern>
            
            <!-- Gradient pour le tableau électrique -->
            <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1F2937;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#111827;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0A0A0F;stop-opacity:1" />
            </linearGradient>
            
            <!-- Gradient métallique -->
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#6B7280;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#9CA3AF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#6B7280;stop-opacity:1" />
            </linearGradient>
            
            <!-- Gradient pour l'effet de brillance -->
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
            </linearGradient>
        `;
        this.svg.appendChild(defs);

        // Groupe principal
        this.mainGroup = document.createElementNS(svgNS, 'g');
        this.mainGroup.classList.add('electrical-main');
        this.svg.appendChild(this.mainGroup);

        this.container.appendChild(this.svg);
    }

    createElements() {
        const svgNS = 'http://www.w3.org/2000/svg';

        // 1. Compteur extérieur (Enedis) - en haut à gauche
        this.createMeter(45, 40);

        // 2. Façade de la maison - côté gauche
        this.createFacade(25, 100, 170, 580);

        // 3. Coupe isométrique de la maison - côté droit
        this.createHouseCutaway(210, 130, 240, 520);

        // 4. Création des chemins de câbles
        this.createCablePaths();

        // 5. Création des jonctions (points d'étincelles)
        this.createJunctions();

        // 6. Création des prises et interrupteurs
        this.createOutletsAndSwitches();

        // 7. Tableau électrique
        this.createElectricalPanel(270, 180);
    }

    createMeter(x, y) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('meter-group');
        group.setAttribute('transform', `translate(${x}, ${y})`);

        // Boîtier du compteur avec effet 3D
        const box = document.createElementNS(svgNS, 'rect');
        box.setAttribute('x', 0);
        box.setAttribute('y', 0);
        box.setAttribute('width', 85);
        box.setAttribute('height', 55);
        box.setAttribute('rx', 6);
        box.setAttribute('fill', '#1F2937');
        box.setAttribute('stroke', '#4B5563');
        box.setAttribute('stroke-width', '2');
        box.setAttribute('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))');
        group.appendChild(box);

        // Écran LCD avec effet néon
        const screen = document.createElementNS(svgNS, 'rect');
        screen.setAttribute('x', 10);
        screen.setAttribute('y', 12);
        screen.setAttribute('width', 48);
        screen.setAttribute('height', 28);
        screen.setAttribute('rx', 3);
        screen.setAttribute('fill', '#0A0A0F');
        screen.setAttribute('stroke', '#0055AA');
        screen.setAttribute('stroke-width', '1.5');
        screen.setAttribute('filter', 'drop-shadow(0 0 8px rgba(0, 85, 170, 0.5))');
        group.appendChild(screen);

        // Chiffres LCD avec effet néon
        const digits = document.createElementNS(svgNS, 'text');
        digits.setAttribute('x', 34);
        digits.setAttribute('y', 32);
        digits.setAttribute('text-anchor', 'middle');
        digits.setAttribute('fill', '#10B981');
        digits.setAttribute('font-family', 'monospace');
        digits.setAttribute('font-size', '15');
        digits.setAttribute('font-weight', 'bold');
        digits.setAttribute('class', 'meter-digits');
        digits.setAttribute('filter', 'drop-shadow(0 0 4px #10B981)');
        digits.textContent = '01245';
        group.appendChild(digits);

        // LED témoin avec effet pulsant
        const led = document.createElementNS(svgNS, 'circle');
        led.setAttribute('cx', 68);
        led.setAttribute('cy', 18);
        led.setAttribute('r', 5);
        led.setAttribute('fill', '#10B981');
        led.setAttribute('class', 'meter-led');
        led.setAttribute('filter', 'drop-shadow(0 0 6px #10B981)');
        group.appendChild(led);

        // Logo Linky style
        const logo = document.createElementNS(svgNS, 'text');
        logo.setAttribute('x', 68);
        logo.setAttribute('y', 43);
        logo.setAttribute('text-anchor', 'middle');
        logo.setAttribute('fill', '#9CA3AF');
        logo.setAttribute('font-size', '9');
        logo.setAttribute('font-weight', 'bold');
        logo.textContent = 'LINKY';
        group.appendChild(logo);

        // Borne de connexion
        const terminal = document.createElementNS(svgNS, 'rect');
        terminal.setAttribute('x', 32);
        terminal.setAttribute('y', 55);
        terminal.setAttribute('width', 22);
        terminal.setAttribute('height', 10);
        terminal.setAttribute('fill', '#6B7280');
        terminal.setAttribute('stroke', '#4B5563');
        group.appendChild(terminal);

        this.mainGroup.appendChild(group);
        this.meter = group;
    }

    createFacade(x, y, width, height) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('facade-group');

        // Mur extérieur avec effet de profondeur
        const wall = document.createElementNS(svgNS, 'rect');
        wall.setAttribute('x', x);
        wall.setAttribute('y', y);
        wall.setAttribute('width', width);
        wall.setAttribute('height', height);
        wall.setAttribute('fill', '#374151');
        wall.setAttribute('stroke', '#4B5563');
        wall.setAttribute('stroke-width', '2');
        wall.setAttribute('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))');
        group.appendChild(wall);

        // Texture de briques améliorée
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 8; col++) {
                const brick = document.createElementNS(svgNS, 'rect');
                brick.setAttribute('x', x + 5 + col * 22);
                brick.setAttribute('y', y + 10 + row * 30);
                brick.setAttribute('width', 20);
                brick.setAttribute('height', 28);
                brick.setAttribute('fill', row % 2 === col % 2 ? '#4B5563' : '#374151');
                brick.setAttribute('opacity', '0.4');
                brick.setAttribute('rx', '1');
                group.appendChild(brick);
            }
        }

        // Disjoncteur de branchement (DB) avec effet 3D
        const db = document.createElementNS(svgNS, 'rect');
        db.setAttribute('x', x + 20);
        db.setAttribute('y', y + 80);
        db.setAttribute('width', 65);
        db.setAttribute('height', 85);
        db.setAttribute('rx', 4);
        db.setAttribute('fill', '#1F2937');
        db.setAttribute('stroke', '#6B7280');
        db.setAttribute('stroke-width', '2');
        db.setAttribute('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))');
        group.appendChild(db);

        // Étiquette DB
        const dbLabel = document.createElementNS(svgNS, 'text');
        dbLabel.setAttribute('x', x + 52);
        dbLabel.setAttribute('y', y + 105);
        dbLabel.setAttribute('text-anchor', 'middle');
        dbLabel.setAttribute('fill', '#9CA3AF');
        dbLabel.setAttribute('font-size', '11');
        dbLabel.setAttribute('font-weight', 'bold');
        dbLabel.textContent = 'DB';
        group.appendChild(dbLabel);

        // Interrupteur différentiel dans DB avec effet néon
        const diffSwitch = document.createElementNS(svgNS, 'rect');
        diffSwitch.setAttribute('x', x + 30);
        diffSwitch.setAttribute('y', y + 115);
        diffSwitch.setAttribute('width', 45);
        diffSwitch.setAttribute('height', 28);
        diffSwitch.setAttribute('rx', 3);
        diffSwitch.setAttribute('fill', '#0055AA');
        diffSwitch.setAttribute('class', 'diff-switch');
        diffSwitch.setAttribute('filter', 'drop-shadow(0 0 4px rgba(0, 85, 170, 0.5))');
        group.appendChild(diffSwitch);

        // Label 500mA
        const diffLabel = document.createElementNS(svgNS, 'text');
        diffLabel.setAttribute('x', x + 52);
        diffLabel.setAttribute('y', y + 133);
        diffLabel.setAttribute('text-anchor', 'middle');
        diffLabel.setAttribute('fill', '#FFFFFF');
        diffLabel.setAttribute('font-size', '9');
        diffLabel.setAttribute('font-weight', 'bold');
        diffLabel.textContent = '500mA';
        group.appendChild(diffLabel);

        // Gaine technique verticale avec effet métallique
        const conduit = document.createElementNS(svgNS, 'rect');
        conduit.setAttribute('x', x + 105);
        conduit.setAttribute('y', y + 50);
        conduit.setAttribute('width', 28);
        conduit.setAttribute('height', 220);
        conduit.setAttribute('fill', 'url(#conduitPattern)');
        conduit.setAttribute('stroke', '#6B7280');
        conduit.setAttribute('stroke-width', '1.5');
        conduit.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');
        group.appendChild(conduit);

        // Étiquette gaine
        const conduitLabel = document.createElementNS(svgNS, 'text');
        conduitLabel.setAttribute('x', x + 119);
        conduitLabel.setAttribute('y', y + 40);
        conduitLabel.setAttribute('text-anchor', 'middle');
        conduitLabel.setAttribute('fill', '#9CA3AF');
        conduitLabel.setAttribute('font-size', '9');
        conduitLabel.setAttribute('font-weight', 'bold');
        conduitLabel.setAttribute('transform', `rotate(-90, ${x + 119}, ${y + 40})`);
        conduitLabel.textContent = 'GAINE TECHNIQUE';
        group.appendChild(conduitLabel);

        this.mainGroup.appendChild(group);
        this.facade = group;
    }

    createHouseCutaway(x, y, width, height) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('house-cutaway');

        // Sol du rez-de-chaussée avec effet 3D
        const groundFloor = document.createElementNS(svgNS, 'rect');
        groundFloor.setAttribute('x', x);
        groundFloor.setAttribute('y', y + 300);
        groundFloor.setAttribute('width', width);
        groundFloor.setAttribute('height', 12);
        groundFloor.setAttribute('fill', '#6B7280');
        groundFloor.setAttribute('stroke', '#4B5563');
        groundFloor.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');
        group.appendChild(groundFloor);

        // Sol du 1er étage
        const firstFloor = document.createElementNS(svgNS, 'rect');
        firstFloor.setAttribute('x', x);
        firstFloor.setAttribute('y', y + 150);
        firstFloor.setAttribute('width', width);
        firstFloor.setAttribute('height', 12);
        firstFloor.setAttribute('fill', '#6B7280');
        firstFloor.setAttribute('stroke', '#4B5563');
        firstFloor.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');
        group.appendChild(firstFloor);

        // Toit (perspective isométrique) avec effet 3D
        const roof = document.createElementNS(svgNS, 'polygon');
        roof.setAttribute('points', `${x},${y} ${x + width / 2},${y - 60} ${x + width},${y}`);
        roof.setAttribute('fill', '#374151');
        roof.setAttribute('stroke', '#4B5563');
        roof.setAttribute('stroke-width', '2');
        roof.setAttribute('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))');
        group.appendChild(roof);

        // Murs intérieurs - Rez-de-chaussée
        const wall1 = document.createElementNS(svgNS, 'rect');
        wall1.setAttribute('x', x + 80);
        wall1.setAttribute('y', y + 312);
        wall1.setAttribute('width', 10);
        wall1.setAttribute('height', 138);
        wall1.setAttribute('fill', '#4B5563');
        wall1.setAttribute('stroke', '#374151');
        group.appendChild(wall1);

        // Murs intérieurs - 1er étage
        const wall2 = document.createElementNS(svgNS, 'rect');
        wall2.setAttribute('x', x + 120);
        wall2.setAttribute('y', y + 162);
        wall2.setAttribute('width', 10);
        wall2.setAttribute('height', 138);
        wall2.setAttribute('fill', '#4B5563');
        wall2.setAttribute('stroke', '#374151');
        group.appendChild(wall2);

        // Labels des pièces améliorés
        const rooms = [
            { x: x + 40, y: y + 385, label: 'Séjour' },
            { x: x + 170, y: y + 385, label: 'Cuisine' },
            { x: x + 40, y: y + 235, label: 'Chambre 1' },
            { x: x + 180, y: y + 235, label: 'Chambre 2' },
            { x: x + 100, y: y + 105, label: 'Grenier' }
        ];

        rooms.forEach(room => {
            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('x', room.x);
            text.setAttribute('y', room.y);
            text.setAttribute('fill', '#6B7280');
            text.setAttribute('font-size', '12');
            text.setAttribute('font-style', 'italic');
            text.setAttribute('font-weight', '500');
            text.textContent = room.label;
            group.appendChild(text);
        });

        this.mainGroup.appendChild(group);
        this.house = group;
    }

    createCablePaths() {
        const svgNS = 'http://www.w3.org/2000/svg';

        // Définition des chemins de câbles avec couleurs néon - coordonnées ajustées
        const cableData = [
            // 1. Compteur → DB (descente façade)
            {
                id: 'cable-1',
                d: `M 87 95 L 87 125 L 77 165 L 77 185`,
                color: '#F59E0B',
                glowColor: '#FFD700',
                width: 4
            },
            // 2. DB → Gaine technique (traversée mur)
            {
                id: 'cable-2',
                d: `M 137 225 L 157 225 L 157 205 L 247 205`,
                color: '#0055AA',
                glowColor: '#3388FF',
                width: 5
            },
            // 3. Gaine → Tableau électrique (montée)
            {
                id: 'cable-3',
                d: `M 247 205 L 337 205 L 337 225`,
                color: '#0055AA',
                glowColor: '#3388FF',
                width: 5
            },
            // 4. Tableau → Distribution RDC (séjour)
            {
                id: 'cable-4',
                d: `M 337 305 L 337 425 L 297 425`,
                color: '#10B981',
                glowColor: '#34D399',
                width: 3
            },
            // 5. Tableau → Distribution RDC (cuisine)
            {
                id: 'cable-5',
                d: `M 357 305 L 357 445 L 397 445`,
                color: '#10B981',
                glowColor: '#34D399',
                width: 3
            },
            // 6. Tableau → Distribution 1er étage
            {
                id: 'cable-6',
                d: `M 347 225 L 347 155 L 297 155 L 297 185`,
                color: '#3388FF',
                glowColor: '#60A5FA',
                width: 3
            },
            // 7. Distribution 1er → Chambre 2
            {
                id: 'cable-7',
                d: `M 347 155 L 417 155 L 417 215`,
                color: '#3388FF',
                glowColor: '#60A5FA',
                width: 2.5
            },
            // 8. Tableau → Grenier (éclairage)
            {
                id: 'cable-8',
                d: `M 367 225 L 367 105 L 317 105`,
                color: '#F59E0B',
                glowColor: '#FFD700',
                width: 2.5
            }
        ];

        cableData.forEach((cable, index) => {
            // Câble de fond (gris)
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', cable.d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', '#374151');
            path.setAttribute('stroke-width', cable.width + 2);
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.classList.add('cable-bg');
            this.mainGroup.appendChild(path);

            // Câble actif avec effet néon
            const activePath = document.createElementNS(svgNS, 'path');
            activePath.setAttribute('d', cable.d);
            activePath.setAttribute('fill', 'none');
            activePath.setAttribute('stroke', cable.color);
            activePath.setAttribute('stroke-width', cable.width);
            activePath.setAttribute('stroke-linecap', 'round');
            activePath.setAttribute('stroke-linejoin', 'round');
            activePath.setAttribute('filter', 'url(#cableGlow)');
            activePath.setAttribute('data-glow-color', cable.glowColor);
            activePath.classList.add('cable-active');
            activePath.dataset.index = index;
            activePath.dataset.progress = '0';

            // Calcul de la longueur pour l'animation
            const length = activePath.getTotalLength ? 500 : 300;
            activePath.style.strokeDasharray = length;
            activePath.style.strokeDashoffset = length;

            this.mainGroup.appendChild(activePath);
            this.paths.push({
                element: activePath,
                bgElement: path,
                length: length,
                index: index,
                triggerPoint: index * 0.12,
                glowColor: cable.glowColor
            });
        });
    }

    createJunctions() {
        const svgNS = 'http://www.w3.org/2000/svg';

        const junctionPoints = [
            { x: 87, y: 125, label: 'J1', color: '#F59E0B' },      // Sortie compteur
            { x: 157, y: 205, label: 'J2', color: '#0055AA' },     // Entrée gaine
            { x: 337, y: 205, label: 'J3', color: '#3388FF' },     // Tableau
            { x: 337, y: 305, label: 'J4', color: '#10B981' },     // Distrib RDC
            { x: 347, y: 155, label: 'J5', color: '#3388FF' },     // Distrib 1er
            { x: 367, y: 105, label: 'J6', color: '#F59E0B' }      // Grenier
        ];

        junctionPoints.forEach((point, index) => {
            const group = document.createElementNS(svgNS, 'g');
            group.classList.add('junction');
            group.dataset.index = index;

            // Cercle de jonction avec effet néon
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            circle.setAttribute('r', 7);
            circle.setAttribute('fill', '#1F2937');
            circle.setAttribute('stroke', point.color);
            circle.setAttribute('stroke-width', '2.5');
            circle.setAttribute('filter', `drop-shadow(0 0 6px ${point.color})`);
            circle.classList.add('junction-circle');
            group.appendChild(circle);

            // Étincelle (cachée par défaut) avec effet ultra glow
            const spark = document.createElementNS(svgNS, 'circle');
            spark.setAttribute('cx', point.x);
            spark.setAttribute('cy', point.y);
            spark.setAttribute('r', 0);
            spark.setAttribute('fill', point.color);
            spark.setAttribute('filter', 'url(#sparkGlow)');
            spark.classList.add('junction-spark');
            group.appendChild(spark);

            this.mainGroup.appendChild(group);
            this.junctions.push({
                element: group,
                circle: circle,
                spark: spark,
                x: point.x,
                y: point.y,
                color: point.color,
                triggered: false
            });
        });
    }

    createOutletsAndSwitches() {
        const svgNS = 'http://www.w3.org/2000/svg';

        // Prises (rectangles avec cercles) - coordonnées ajustées
        const outlets = [
            { x: 277, y: 415, type: 'outlet', floor: 'rdc' },      // Séjour
            { x: 387, y: 435, type: 'outlet', floor: 'rdc' },      // Cuisine
            { x: 277, y: 175, type: 'outlet', floor: '1er' },      // Chambre 1
            { x: 407, y: 205, type: 'outlet', floor: '1er' }       // Chambre 2
        ];

        outlets.forEach((outlet, index) => {
            const group = document.createElementNS(svgNS, 'g');
            group.classList.add('outlet');
            group.dataset.index = index;

            // Plaque avec effet 3D
            const plate = document.createElementNS(svgNS, 'rect');
            plate.setAttribute('x', outlet.x);
            plate.setAttribute('y', outlet.y);
            plate.setAttribute('width', 26);
            plate.setAttribute('height', 26);
            plate.setAttribute('rx', 4);
            plate.setAttribute('fill', '#F9FAFB');
            plate.setAttribute('stroke', '#D1D5DB');
            plate.setAttribute('stroke-width', '1.5');
            plate.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');
            plate.classList.add('outlet-plate');
            group.appendChild(plate);

            // Cercles de prise
            const circle1 = document.createElementNS(svgNS, 'circle');
            circle1.setAttribute('cx', outlet.x + 8);
            circle1.setAttribute('cy', outlet.y + 10);
            circle1.setAttribute('r', 2.5);
            circle1.setAttribute('fill', '#374151');
            group.appendChild(circle1);

            const circle2 = document.createElementNS(svgNS, 'circle');
            circle2.setAttribute('cx', outlet.x + 18);
            circle2.setAttribute('cy', outlet.y + 10);
            circle2.setAttribute('r', 2.5);
            circle2.setAttribute('fill', '#374151');
            group.appendChild(circle2);

            // Terre
            const earth = document.createElementNS(svgNS, 'circle');
            earth.setAttribute('cx', outlet.x + 13);
            earth.setAttribute('cy', outlet.y + 18);
            earth.setAttribute('r', 2);
            earth.setAttribute('fill', '#374151');
            group.appendChild(earth);

            // Glow d'activation (caché) avec effet néon
            const glow = document.createElementNS(svgNS, 'circle');
            glow.setAttribute('cx', outlet.x + 13);
            glow.setAttribute('cy', outlet.y + 13);
            glow.setAttribute('r', 18);
            glow.setAttribute('fill', '#10B981');
            glow.setAttribute('opacity', '0');
            glow.setAttribute('filter', 'url(#neonGlow)');
            glow.classList.add('outlet-glow');
            group.appendChild(glow);

            this.mainGroup.appendChild(group);
            this.outlets.push({
                element: group,
                glow: glow,
                triggered: false
            });
        });

        // Interrupteurs - coordonnées ajustées
        const switches = [
            { x: 297, y: 385, label: 'I1' },      // Séjour
            { x: 397, y: 405, label: 'I2' },      // Cuisine
            { x: 297, y: 145, label: 'I3' },      // Chambre 1
            { x: 417, y: 175, label: 'I4' },      // Chambre 2
            { x: 297, y: 85, label: 'I5' }        // Grenier
        ];

        switches.forEach((sw, index) => {
            const group = document.createElementNS(svgNS, 'g');
            group.classList.add('switch');
            group.dataset.index = index;

            // Plaque avec effet 3D
            const plate = document.createElementNS(svgNS, 'rect');
            plate.setAttribute('x', sw.x);
            plate.setAttribute('y', sw.y);
            plate.setAttribute('width', 22);
            plate.setAttribute('height', 30);
            plate.setAttribute('rx', 3);
            plate.setAttribute('fill', '#F9FAFB');
            plate.setAttribute('stroke', '#D1D5DB');
            plate.setAttribute('stroke-width', '1.5');
            plate.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');
            plate.classList.add('switch-plate');
            group.appendChild(plate);

            // Bouton
            const button = document.createElementNS(svgNS, 'rect');
            button.setAttribute('x', sw.x + 7);
            button.setAttribute('y', sw.y + 7);
            button.setAttribute('width', 8);
            button.setAttribute('height', 16);
            button.setAttribute('rx', 2);
            button.setAttribute('fill', '#E5E7EB');
            button.setAttribute('stroke', '#D1D5DB');
            button.classList.add('switch-button');
            group.appendChild(button);

            // LED témoin
            const led = document.createElementNS(svgNS, 'circle');
            led.setAttribute('cx', sw.x + 11);
            led.setAttribute('cy', sw.y + 24);
            led.setAttribute('r', 2.5);
            led.setAttribute('fill', '#374151');
            led.classList.add('switch-led');
            group.appendChild(led);

            // Glow d'activation avec effet néon
            const glow = document.createElementNS(svgNS, 'circle');
            glow.setAttribute('cx', sw.x + 11);
            glow.setAttribute('cy', sw.y + 15);
            glow.setAttribute('r', 20);
            glow.setAttribute('fill', '#F59E0B');
            glow.setAttribute('opacity', '0');
            glow.setAttribute('filter', 'url(#neonGlow)');
            glow.classList.add('switch-glow');
            group.appendChild(glow);

            this.mainGroup.appendChild(group);
            this.switches.push({
                element: group,
                led: led,
                glow: glow,
                triggered: false
            });
        });
    }

    createElectricalPanel(x, y) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('electrical-panel');

        // Boîtier du tableau avec effet 3D
        const box = document.createElementNS(svgNS, 'rect');
        box.setAttribute('x', x);
        box.setAttribute('y', y);
        box.setAttribute('width', 105);
        box.setAttribute('height', 130);
        box.setAttribute('rx', 6);
        box.setAttribute('fill', 'url(#panelGradient)');
        box.setAttribute('stroke', '#6B7280');
        box.setAttribute('stroke-width', '2');
        box.setAttribute('filter', 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))');
        group.appendChild(box);

        // Porte transparente
        const door = document.createElementNS(svgNS, 'rect');
        door.setAttribute('x', x + 5);
        door.setAttribute('y', y + 5);
        door.setAttribute('width', 95);
        door.setAttribute('height', 120);
        door.setAttribute('rx', 4);
        door.setAttribute('fill', 'rgba(31, 41, 55, 0.85)');
        door.setAttribute('stroke', '#4B5563');
        door.setAttribute('stroke-width', '1');
        group.appendChild(door);

        // Disjoncteur principal avec effet néon rouge
        const mainBreaker = document.createElementNS(svgNS, 'rect');
        mainBreaker.setAttribute('x', x + 15);
        mainBreaker.setAttribute('y', y + 15);
        mainBreaker.setAttribute('width', 75);
        mainBreaker.setAttribute('height', 22);
        mainBreaker.setAttribute('rx', 3);
        mainBreaker.setAttribute('fill', '#DC2626');
        mainBreaker.setAttribute('filter', 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.5))');
        mainBreaker.classList.add('panel-breaker', 'main-breaker');
        group.appendChild(mainBreaker);

        // Label principal
        const mainLabel = document.createElementNS(svgNS, 'text');
        mainLabel.setAttribute('x', x + 52);
        mainLabel.setAttribute('y', y + 30);
        mainLabel.setAttribute('text-anchor', 'middle');
        mainLabel.setAttribute('fill', '#FFFFFF');
        mainLabel.setAttribute('font-size', '10');
        mainLabel.setAttribute('font-weight', 'bold');
        mainLabel.textContent = '500mA';
        group.appendChild(mainLabel);

        // Disjoncteurs divisionnaires avec effets néon
        const breakers = [
            { y: y + 48, label: '20A', color: '#0055AA' },
            { y: y + 76, label: '16A', color: '#0055AA' },
            { y: y + 104, label: '10A', color: '#10B981' }
        ];

        breakers.forEach((breaker, index) => {
            const rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', x + 15);
            rect.setAttribute('y', breaker.y);
            rect.setAttribute('width', 75);
            rect.setAttribute('height', 20);
            rect.setAttribute('rx', 3);
            rect.setAttribute('fill', breaker.color);
            rect.setAttribute('filter', `drop-shadow(0 0 4px ${breaker.color}80)`);
            rect.classList.add('panel-breaker', `breaker-${index}`);
            group.appendChild(rect);

            const label = document.createElementNS(svgNS, 'text');
            label.setAttribute('x', x + 52);
            label.setAttribute('y', breaker.y + 13);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#FFFFFF');
            label.setAttribute('font-size', '9');
            label.setAttribute('font-weight', 'bold');
            label.textContent = breaker.label;
            group.appendChild(label);
        });

        // Label tableau
        const panelLabel = document.createElementNS(svgNS, 'text');
        panelLabel.setAttribute('x', x + 52);
        panelLabel.setAttribute('y', y - 12);
        panelLabel.setAttribute('text-anchor', 'middle');
        panelLabel.setAttribute('fill', '#9CA3AF');
        panelLabel.setAttribute('font-size', '11');
        panelLabel.setAttribute('font-weight', 'bold');
        panelLabel.textContent = 'TABLEAU ÉLECTRIQUE';
        group.appendChild(panelLabel);

        // Glow d'activation avec effet néon bleu
        const glow = document.createElementNS(svgNS, 'rect');
        glow.setAttribute('x', x - 5);
        glow.setAttribute('y', y - 5);
        glow.setAttribute('width', 115);
        glow.setAttribute('height', 140);
        glow.setAttribute('rx', 8);
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', '#3388FF');
        glow.setAttribute('stroke-width', '3');
        glow.setAttribute('opacity', '0');
        glow.setAttribute('filter', 'url(#cableGlow)');
        glow.classList.add('panel-glow');
        group.appendChild(glow);

        this.mainGroup.appendChild(group);
        this.panel = {
            element: group,
            glow: glow,
            triggered: false
        };
    }

    createParticles() {
        // Créer des particules flottantes autour de l'animation
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(i);
        }
    }

    createParticle(index) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const particle = document.createElementNS(svgNS, 'circle');

        // Position aléatoire autour de l'animation - ajustée pour le nouveau viewBox
        const x = 80 + Math.random() * 320;
        const y = 80 + Math.random() * 560;

        particle.setAttribute('cx', x);
        particle.setAttribute('cy', y);
        particle.setAttribute('r', 2 + Math.random() * 2);
        particle.setAttribute('fill', '#3388FF');
        particle.setAttribute('opacity', '0');
        particle.setAttribute('filter', 'drop-shadow(0 0 6px #3388FF)');
        particle.classList.add('electric-particle');
        particle.dataset.index = index;
        particle.dataset.baseX = x;
        particle.dataset.baseY = y;
        particle.dataset.speed = 0.5 + Math.random() * 1;
        particle.dataset.offset = Math.random() * Math.PI * 2;

        this.mainGroup.appendChild(particle);
        this.particles.push(particle);
    }

    setupScrollTrigger() {
        // Écouter le scroll sur la fenêtre
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        // Observer pour détecter quand l'animation est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isActive = entry.isIntersecting;
                if (this.isActive) {
                    this.onScroll();
                }
            });
        }, { threshold: 0 });

        observer.observe(this.container);

        // Initialiser l'animation
        this.isActive = true;
        this.onScroll();
    }

    onScroll() {
        // Calculer la progression basée sur le scroll de la page entière
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? Math.min(1, scrollTop / (docHeight * 0.5)) : 0;

        // Limiter la progression pour l'animation électrique (0 à 1 sur la première moitié du scroll)
        this.progress = Math.max(0, Math.min(1, scrollProgress * 2));

        // Mettre à jour la barre de progression
        const progressBar = document.getElementById('animation-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${this.progress * 100}%`;
        }

        this.updateAnimation();
    }

    updateAnimation() {
        const p = this.progress;

        // Animation des câbles (séquence chronologique)
        this.paths.forEach((path, index) => {
            const triggerStart = index * 0.1;
            const triggerEnd = triggerStart + 0.15;

            if (p >= triggerStart) {
                const localProgress = Math.min(1, (p - triggerStart) / (triggerEnd - triggerStart));
                const offset = path.length * (1 - localProgress);
                path.element.style.strokeDashoffset = offset;

                // Effet de pulsation néon
                if (localProgress > 0.5) {
                    path.element.classList.add('pulsing');
                } else {
                    path.element.classList.remove('pulsing');
                }
            } else {
                path.element.style.strokeDashoffset = path.length;
                path.element.classList.remove('pulsing');
            }
        });

        // Animation des jonctions (étincelles)
        this.junctions.forEach((junction, index) => {
            const triggerPoint = (index + 1) * 0.1;

            if (p >= triggerPoint && !junction.triggered) {
                junction.triggered = true;
                this.triggerSpark(junction);
            } else if (p < triggerPoint) {
                junction.triggered = false;
            }
        });

        // Animation du tableau électrique
        if (p >= 0.25 && !this.panel.triggered) {
            this.panel.triggered = true;
            this.panel.element.classList.add('active');
            this.panel.glow.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.panel.glow.style.opacity = '0.9';
        } else if (p < 0.25) {
            this.panel.triggered = false;
            this.panel.element.classList.remove('active');
            this.panel.glow.style.opacity = '0';
        }

        // Animation des prises (illumination finale)
        this.outlets.forEach((outlet, index) => {
            const triggerPoint = 0.6 + (index * 0.05);

            if (p >= triggerPoint && !outlet.triggered) {
                outlet.triggered = true;
                outlet.element.classList.add('active');
                outlet.glow.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                outlet.glow.style.opacity = '0.8';
            } else if (p < triggerPoint) {
                outlet.triggered = false;
                outlet.element.classList.remove('active');
                outlet.glow.style.opacity = '0';
            }
        });

        // Animation des interrupteurs
        this.switches.forEach((sw, index) => {
            const triggerPoint = 0.65 + (index * 0.04);

            if (p >= triggerPoint && !sw.triggered) {
                sw.triggered = true;
                sw.element.classList.add('active');
                sw.led.setAttribute('fill', '#F59E0B');
                sw.led.setAttribute('filter', 'drop-shadow(0 0 6px #F59E0B)');
                sw.glow.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                sw.glow.style.opacity = '0.8';
            } else if (p < triggerPoint) {
                sw.triggered = false;
                sw.element.classList.remove('active');
                sw.led.setAttribute('fill', '#374151');
                sw.led.removeAttribute('filter');
                sw.glow.style.opacity = '0';
            }
        });
    }

    triggerSpark(junction) {
        const spark = junction.spark;

        // Animation d'étincelle améliorée
        let frame = 0;
        const animateSpark = () => {
            frame++;
            const progress = frame / 25;

            if (progress <= 1) {
                const radius = 6 + Math.sin(progress * Math.PI) * 12;
                const opacity = Math.sin(progress * Math.PI);

                spark.setAttribute('r', radius);
                spark.setAttribute('opacity', opacity);

                requestAnimationFrame(animateSpark);
            } else {
                spark.setAttribute('r', 0);
                spark.setAttribute('opacity', 0);
            }
        };

        animateSpark();
    }

    animate(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Animation continue pour les effets de pulsation
        if (this.isActive && this.progress > 0) {
            this.updatePulsingEffects(currentTime);
            this.updateParticles(currentTime);
        }

        this.animationFrame = requestAnimationFrame((time) => this.animate(time));
    }

    updatePulsingEffects(time) {
        // Pulsation des câbles actifs avec effet néon
        this.paths.forEach((path, index) => {
            const triggerStart = index * 0.1;
            if (this.progress >= triggerStart + 0.1) {
                const pulse = 0.6 + 0.4 * Math.sin(time / 150 + index);
                path.element.style.opacity = pulse;
            }
        });

        // Pulsation du compteur avec effet néon
        if (this.progress > 0.05) {
            const led = this.meter.querySelector('.meter-led');
            if (led) {
                const blink = Math.sin(time / 250) > 0 ? '#10B981' : '#059669';
                const glowIntensity = Math.sin(time / 250) > 0 ? '8' : '4';
                led.setAttribute('fill', blink);
                led.setAttribute('filter', `drop-shadow(0 0 ${glowIntensity}px ${blink})`);
            }

            // Animation des chiffres du compteur
            const digits = this.meter.querySelector('.meter-digits');
            if (digits && Math.random() > 0.95) {
                const baseValue = 1245;
                const variation = Math.floor(Math.random() * 10);
                digits.textContent = String(baseValue + variation).padStart(5, '0');
            }
        }
    }

    updateParticles(time) {
        // Animer les particules flottantes
        this.particles.forEach((particle, index) => {
            if (this.progress > 0.1) {
                const baseX = parseFloat(particle.dataset.baseX);
                const baseY = parseFloat(particle.dataset.baseY);
                const speed = parseFloat(particle.dataset.speed);
                const offset = parseFloat(particle.dataset.offset);

                const newY = baseY - ((time * speed / 50) % 100);
                const newX = baseX + Math.sin(time / 500 + offset) * 20;
                const opacity = Math.max(0, 1 - ((time * speed / 50) % 100) / 100);

                particle.setAttribute('cx', newX);
                particle.setAttribute('cy', newY);
                particle.setAttribute('opacity', opacity * 0.6);
            } else {
                particle.setAttribute('opacity', 0);
            }
        });
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    console.log('ElectricalAnimation: DOMContentLoaded - waiting for loader.js to initialize');
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElectricalAnimation;
}

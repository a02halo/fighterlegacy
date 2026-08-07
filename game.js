(() => {
  const STORAGE_META = "fightLegacy.meta.v1";
  const STORAGE_CAREER = "fightLegacy.currentCareer.v1";
  const STORAGE_CAREER_ARCHIVE = "fightLegacy.careerArchive.v1";
  const STORAGE_CREATOR = "fightLegacy.creatorDraft.v1";
  const STORAGE_ONLINE = "fightLegacy.online.v1";
  const SUPABASE_URL = "https://cytsfvhwbsesbywwythu.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_c7QqKxM8m7jn3n41zPp8dQ_CHKF35Vk";
  const CURRENT_YEAR = 2026;
  const SAVE_VERSION = 2;
  const LEGEND_TIER = 6;
  const LEGEND_STAT_CAP = 340;
  const ASSET_VERSION = "20260807-legend-assets";
  const IMAGE_ASSETS = {
    home: "./assets/home-fight-legacy.png",
    press: "./assets/press-conference-fight-legacy.png",
    doping: "./assets/doping-fight-legacy.png",
  };

  const CREATOR_STEPS = [
    "country",
    "weight",
    "style",
    "origin",
    "lifestyle",
    "entourage",
    "identity",
  ];

  const STAT_LABELS = {
    striking: "Striking",
    wrestling: "Lutte",
    grappling: "Sol",
    cardio: "Cardio",
    power: "Puissance",
    chin: "Menton",
    iq: "Fight IQ",
    charisma: "Charisme",
    discipline: "Discipline",
    durability: "Sante",
  };

  const STAT_HELP = {
    striking: "Qualite debout: jab, kicks, precision et defense en striking.",
    wrestling: "Takedowns, defense de takedown, controle cage et capacite a imposer le rythme.",
    grappling: "Soumissions, transitions, controle au sol et sorties de mauvaises positions.",
    cardio: "Volume, recuperation entre rounds et capacite a tenir une saison chargee.",
    power: "Degats par frappe, probabilite de knockdown et peur imposee debout.",
    chin: "Resistance aux gros coups. Reduit le risque de KO et l'usure prise en combat.",
    iq: "Lecture tactique: meilleurs choix de round, adaptation et decisions serrees.",
    charisma: "Hype, sponsors, grosses affiches et argent gagne hors de la cage.",
    discipline: "Regularite du camp, poids, progression et resistance aux mauvais choix.",
    durability: "Capital physique restant. Trop bas, la retraite arrive vite.",
  };

	  const VALUE_LABELS = {
	    money: "Gains",
	    rep: "Reputation",
	    hype: "Hype",
	    morale: "Moral",
	    condition: "Forme",
	    rivalry: "Rivalite",
	    locked: "Contrat bloque",
	    doublePath: "Double categorie",
	    injuryRisk: "Risque blessure",
	    medicalCare: "Recuperation",
	    restWeeks: "Repos medical",
		    scandal: "Scandale",
		    dopingRisk: "Risque dopage",
		    doping: "Dopage",
		    suspension: "Date bloquee",
		    credit: "Credit",
		  };

  const COUNTRIES = [
    { id: "fr", label: "France", tag: "MMA moderne", summary: "Scene technique, public bruyant, bons profils hybrides.", names: ["Nassim Morel", "Hugo Serrano", "Malik Garnier", "Theo Costa"], stats: { iq: 2, striking: 1, charisma: 1 }, preferredStyles: ["boxing", "muay", "karate"] },
    { id: "br", label: "Bresil", tag: "Jiu-jitsu", summary: "Sol naturel, culture de vale-tudo, aura internationale.", names: ["Diego Nascimento", "Caio Almeida", "Rafael Duarte", "Luan Freitas"], stats: { grappling: 5, charisma: 1, wrestling: -1 }, preferredStyles: ["bjj", "sambo"] },
    { id: "us", label: "Etats-Unis", tag: "Wrestling NCAA", summary: "Lutte scolaire, gros camps, business tres vite present.", names: ["Marcus Hale", "Tyson Brooks", "Cody Mercer", "Dante Hayes"], stats: { wrestling: 3, power: 1, charisma: 1 }, preferredStyles: ["wrestling", "boxing"] },
    { id: "ng", label: "Nigeria", tag: "Athletique", summary: "Puissance, explosivite, presence qui se vend bien.", names: ["Tunde Okoro", "Ike Mensah", "Ayo Balogun", "Kelechi Danjuma"], stats: { power: 4, cardio: 1, chin: 1 }, preferredStyles: ["boxing", "muay"] },
    { id: "jp", label: "Japon", tag: "Discipline", summary: "Karate, judo, rigueur de salle et lecture tactique.", names: ["Ren Takeda", "Daichi Mori", "Kaito Sato", "Haru Okami"], stats: { iq: 3, discipline: 2, grappling: 1 }, preferredStyles: ["karate", "bjj", "sambo"] },
    { id: "mx", label: "Mexique", tag: "Boxe dure", summary: "Menton, pression, volume et public fidele.", names: ["Emilio Vargas", "Santos Rojas", "Mateo Cruz", "Tomas Aguilar"], stats: { chin: 3, cardio: 2, striking: 1 }, preferredStyles: ["boxing", "muay"] },
    { id: "ma", label: "Maroc", tag: "Pieds-poings", summary: "Kickboxing, cardio nerveux, mental de salle populaire.", names: ["Yanis El Idrissi", "Samir Ait Ben", "Rayan Hakimi", "Ilyas Mansouri"], stats: { striking: 3, cardio: 1, discipline: 1 }, preferredStyles: ["kickboxing", "muay", "boxing", "karate"] },
    { id: "uk", label: "Angleterre", tag: "Boxing base", summary: "Boxe, trash-talk, grandes cartes europeennes.", names: ["Leon Price", "Callum Shaw", "Reece Donovan", "Jude Barker"], stats: { striking: 2, charisma: 2, chin: 1 }, preferredStyles: ["boxing", "muay"] },
    { id: "nl", label: "Pays-Bas", tag: "Dutch kickboxing", summary: "Low kicks, combinaisons lourdes, pression debout.", names: ["Daan Vermeer", "Milan De Vries", "Rens Bakker", "Joris Van Dijk"], stats: { striking: 5, power: 2, grappling: -2 }, preferredStyles: ["kickboxing", "muay", "boxing"] },
    { id: "dag", label: "Daghestan", tag: "Wrestling machine", summary: "Lutte, sambo, controle au sol et discipline de montagne.", names: ["Magomed Karimov", "Rustam Nurali", "Ilyas Gadzhiev", "Kamil Sultanov"], stats: { wrestling: 6, grappling: 4, discipline: 3, striking: -3, charisma: -1 }, preferredStyles: ["wrestling", "sambo", "bjj"] },
    { id: "th", label: "Thailande", tag: "Muay thai", summary: "Clinch, genoux, kicks, endurance de camps tres jeunes.", names: ["Anan Srisuk", "Prakob Channarong", "Niran Phrom", "Tawan Kiet"], stats: { striking: 4, cardio: 2, power: 1, wrestling: -2 }, preferredStyles: ["muay", "karate"] },
    { id: "cu", label: "Cuba", tag: "Boxe olympique", summary: "Boxe, appuis, rythme et culture amateur tres technique.", names: ["Ramon Castillo", "Yordan Reyes", "Luis Montalvo", "Adrian Valdes"], stats: { striking: 4, iq: 2, wrestling: 1 }, preferredStyles: ["boxing", "wrestling"] },
    { id: "ge", label: "Georgie", tag: "Lutte caucasienne", summary: "Judo, lutte, force de clinch et projections lourdes.", names: ["Giorgi Kapanadze", "Levan Maisuradze", "Beka Tsereteli", "Nika Beridze"], stats: { wrestling: 4, grappling: 2, power: 2, cardio: -1 }, preferredStyles: ["wrestling", "sambo"] },
  ];

  const WEIGHTS = [
    { id: "bw", label: "Bantamweight", summary: "Rapide, technique, peu de marge a la puissance.", stats: { cardio: 5, iq: 2, power: -4, chin: -1 } },
    { id: "fw", label: "Featherweight", summary: "Equilibre vitesse, volume et finitions.", stats: { cardio: 3, striking: 2, power: -1 } },
    { id: "lw", label: "Lightweight", summary: "La jungle: beaucoup de talents, aucun combat facile.", stats: { striking: 2, wrestling: 2, grappling: 2 } },
    { id: "ww", label: "Welterweight", summary: "Physique, spectaculaire, parfait pour devenir une star.", stats: { power: 3, chin: 2, charisma: 2 } },
    { id: "mw", label: "Middleweight", summary: "Moins de rythme, plus de danger a chaque echange.", stats: { power: 5, cardio: -2, chin: 2 } },
    { id: "hw", label: "Heavyweight", summary: "Tout peut se terminer en une frappe.", stats: { power: 9, chin: 4, cardio: -6, iq: -1 } },
  ];

  const STYLES = [
    {
      id: "boxing",
      label: "Boxeur",
      tag: "Stand-up",
      summary: "Jab, timing, contre. Vous vivez debout.",
      stats: { striking: 12, power: 5, wrestling: -4, grappling: -5, iq: 2 },
    },
    {
      id: "muay",
      label: "Muay thai",
      tag: "Clinch",
      summary: "Coudes, genoux, pression. Les rounds laissent des marques.",
      stats: { striking: 9, power: 4, cardio: 3, grappling: -3 },
    },
    {
	      id: "kickboxing",
	      label: "Kickboxing",
      tag: "Pieds-poings",
      summary: "Low kicks, combinaisons et pression debout sans clinch long.",
      stats: { striking: 11, power: 4, cardio: 2, wrestling: -3, grappling: -4, chin: 1 },
    },
    {
      id: "wrestling",
      label: "Lutteur",
      tag: "Controle",
      summary: "Takedowns, cage control, adversaires frustres.",
      stats: { wrestling: 13, cardio: 5, striking: -5, grappling: 1, discipline: 2 },
    },
    {
      id: "bjj",
      label: "BJJ",
      tag: "Soumission",
      summary: "Un dos pris, un bras isole, et le combat bascule.",
      stats: { grappling: 13, iq: 4, wrestling: 1, striking: -6, power: -2 },
    },
    {
      id: "sambo",
      label: "Sambo",
      tag: "Hybride",
      summary: "Transitions sales, projections, ground and pound.",
      stats: { wrestling: 7, grappling: 7, power: 2, charisma: -2 },
    },
    {
      id: "karate",
      label: "Karateka",
      tag: "Distance",
      summary: "Entrees explosives, angles bizarres, highlights.",
      stats: { striking: 8, iq: 5, cardio: 1, chin: -4, charisma: 2 },
    },
  ];

  const ORIGINS = [
    {
      id: "small-gym",
      label: "Petit club de quartier",
      summary: "Pas de luxe, beaucoup de rounds, une faim impossible a apprendre.",
      stats: { cardio: 5, durability: 4, discipline: 2, charisma: -3 },
      rep: 2,
      money: 1000,
    },
    {
      id: "family",
      label: "Famille de combattants",
      summary: "Le nom ouvre des portes, mais la pression arrive avec.",
      stats: { iq: 4, discipline: 3, charisma: 4, durability: -1 },
      rep: 8,
      money: 6000,
    },
    {
      id: "street",
      label: "Bagarreur reconverti",
      summary: "Instinct et puissance. Le vrai defi: apprendre a respirer.",
      stats: { power: 8, chin: 6, discipline: -7, grappling: -2 },
      rep: 4,
      money: 800,
    },
    {
      id: "olympic",
      label: "Ancien espoir olympique",
      summary: "Base athletique enorme, mais vous devez devenir complet.",
      stats: { wrestling: 8, cardio: 6, discipline: 5, charisma: -2, striking: -3 },
      rep: 7,
      money: 3000,
    },
    {
      id: "late",
      label: "Revele sur le tard",
      summary: "Moins de temps devant vous, plus de rage dans chaque camp.",
      stats: { power: 4, iq: 4, cardio: 2, durability: -5 },
      rep: 1,
      money: 500,
      age: 22,
      potentialPenalty: -4,
    },
  ];

  const LIFESTYLES = [
    {
      id: "monk",
      label: "Moine du fight camp",
      summary: "Sommeil, dietetique, journaux d'entrainement. Pas sexy, tres efficace.",
      stats: { discipline: 9, cardio: 5, charisma: -2 },
      morale: -2,
    },
    {
      id: "balanced",
      label: "Equilibre",
      summary: "Vous bossez fort, mais vous gardez une vie.",
      stats: { discipline: 3, charisma: 2, iq: 2 },
      morale: 4,
    },
    {
      id: "spotlight",
      label: "Star des reseaux",
      summary: "Vlogs, punchlines, clips de sparring. La hype monte vite.",
      stats: { charisma: 9, discipline: -5, durability: -2 },
      hype: 10,
    },
  ];

  const ENTOURAGES = [
    {
      id: "loyal-coach",
      label: "Coach historique",
      summary: "Il vous connait par coeur et vous protege des mauvais choix.",
      stats: { iq: 4, discipline: 3 },
      morale: 7,
    },
    {
      id: "shark-manager",
      label: "Manager agressif",
      summary: "Il prend sa part, mais il sait obtenir les combats qui changent une vie.",
      stats: { charisma: 5 },
      hype: 8,
      money: 5000,
      rep: 3,
    },
    {
      id: "elite-camp",
      label: "Camp elite",
      summary: "Sparrings terribles, coachs chers, progression acceleree.",
      stats: { striking: 2, wrestling: 2, grappling: 2, cardio: 2, discipline: 2 },
      money: -3000,
    },
    {
      id: "family-team",
      label: "Clan familial",
      summary: "Beaucoup d'amour, parfois trop d'avis autour de la cage.",
      stats: { morale: 0, charisma: 2, discipline: -1 },
      morale: 10,
    },
  ];

  const ORGS = [
    { tier: 0, id: "underground", label: "Souterrain", belt: "Roi des hangars", threshold: 0, summary: "Cartes discretes, petites bourses, progression rapide si vous gagnez.", purseScale: 0.82, hypeScale: 0.9 },
    { tier: 1, id: "regional", label: "Regional", belt: "Ceinture regionale", threshold: 12, summary: "Circuit local structure. Les victoires propres ouvrent vite le National.", purseScale: 0.95, hypeScale: 0.96 },
    { tier: 2, id: "national", label: "National", belt: "Titre national", threshold: 26, summary: "Dernier palier domestique avant une vraie signature internationale.", purseScale: 1.08, hypeScale: 1 },
    { tier: 3, id: "ksw", label: "KSW", belt: "Ceinture KSW", threshold: 38, summary: "Organisation internationale tres europeenne. Opposition au-dessus du National, hype plus lente, bonnes bourses pour les champions.", purseScale: 1.15, hypeScale: 0.82 },
    { tier: 4, id: "pfl", label: "PFL", belt: "Ceinture PFL", threshold: 42, summary: "Organisation internationale plus riche et un peu plus dure que KSW. Grosses bourses, image moins explosive que l'UFC.", purseScale: 1.45, hypeScale: 0.9 },
    { tier: 5, id: "ufc", label: "UFC", belt: "Ceinture UFC", threshold: 58, summary: "Sommet mondial. Opposition elite, bourses de base plus petites, chaque victoire fait exploser hype et charisme.", purseScale: 0.92, hypeScale: 1.34, charismaWin: 1 },
    { tier: 6, id: "legend", label: "Legende", belt: "Statut Legende", threshold: 90, summary: "Circuit mythique. Vous ne grimpez plus un ranking: vous affrontez des noms impossibles et vos stats peuvent depasser les limites humaines.", purseScale: 1.75, hypeScale: 1.55, charismaWin: 2 },
  ];

  const LEGACY_ORG_LABELS = {
    International: "KSW",
    "Major League": "PFL",
    "Apex Global": "UFC",
  };

  const LEGACY_BELT_LABELS = new Set([
    "Ceinture internationale",
    "Titre majeur",
    "Champion du monde",
  ]);

  function orgForTier(tier = 0) {
    return ORGS[clamp(Number(tier) || 0, 0, ORGS.length - 1)] || ORGS[0];
  }

  function migrateOrgLabel(label, tier = 0) {
    return LEGACY_ORG_LABELS[label] || label || orgForTier(tier).label;
  }

  function promotionTargets(career) {
    const tier = clamp(Number(career?.tier || 0), 0, ORGS.length - 1);
    if (tier < 2) return [orgForTier(tier + 1)];
    if (tier === 2) return [orgForTier(3), orgForTier(4)];
    if (tier === 3 || tier === 4) return [orgForTier(5)];
    if (tier === 5) return [orgForTier(LEGEND_TIER)];
    return [];
  }

  function nextPromotionThreshold(career) {
    const targets = promotionTargets(career);
    if (!targets.length) return null;
    return Math.min(...targets.map(org => org.threshold || 0));
  }

  function opponentBaseForTier(tier = 0) {
    const baseByTier = [48, 55, 63, 74, 81, 96, 214];
    return baseByTier[clamp(Number(tier) || 0, 0, baseByTier.length - 1)] || 48;
  }

  function blueprintBase(blueprint) {
    const tier = Number(blueprint?.tier || 0);
    if (tier >= LEGEND_TIER) return Number(blueprint?.base || 0);
    const boostByTier = [0, 0, 0, 5, 7, 11];
    return Number(blueprint?.base || 0) + (boostByTier[clamp(tier, 0, boostByTier.length - 1)] || 0);
  }

  const OPPONENT_BLUEPRINTS = [
    { id: "eliot-vasseur", name: "Eliot Vasseur", country: "fr", style: "boxing", age: 24, tier: 0, base: 46, record: "3-1", trait: "contreur patient" },
    { id: "omar-belkacem", name: "Omar Belkacem", country: "ma", style: "wrestling", age: 27, tier: 0, base: 48, record: "4-2", trait: "lutte lourde" },
    { id: "reece-donovan", name: "Reece Donovan", country: "uk", style: "muay", age: 23, tier: 0, base: 47, record: "2-0", trait: "clinch violent" },
    { id: "santos-rojas", name: "Santos Rojas", country: "mx", style: "boxing", age: 25, tier: 1, base: 54, record: "7-2", trait: "pression constante" },
    { id: "hugo-serrano", name: "Hugo Serrano", country: "fr", style: "karate", age: 26, tier: 1, base: 55, record: "6-1", trait: "angles bizarres" },
    { id: "kaito-sato", name: "Kaito Sato", country: "jp", style: "bjj", age: 28, tier: 1, base: 56, record: "8-3", trait: "menaces de dos" },
    { id: "tyson-brooks", name: "Tyson Brooks", country: "us", style: "wrestling", age: 29, tier: 2, base: 62, record: "11-4", trait: "cage control" },
    { id: "rafael-duarte", name: "Rafael Duarte", country: "br", style: "bjj", age: 30, tier: 2, base: 63, record: "14-3", trait: "soumissions rapides" },
    { id: "yanis-el-idrissi", name: "Yanis El Idrissi", country: "ma", style: "muay", age: 27, tier: 2, base: 61, record: "10-2", trait: "genoux en clinch" },
	    { id: "dante-hayes", name: "Dante Hayes", country: "us", style: "boxing", age: 31, tier: 3, base: 69, record: "16-5", trait: "main droite dangereuse" },
	    { id: "caio-almeida", name: "Caio Almeida", country: "br", style: "sambo", age: 28, tier: 3, base: 70, record: "15-2", trait: "transitions sales" },
	    { id: "callum-shaw", name: "Callum Shaw", country: "uk", style: "karate", age: 29, tier: 3, base: 68, record: "13-3", trait: "distance longue" },
	    { id: "milan-de-vries", name: "Milan De Vries", country: "nl", style: "kickboxing", age: 24, tier: 0, base: 45, record: "2-1", trait: "low kicks lourds" },
	    { id: "ilyas-mansouri", name: "Ilyas Mansouri", country: "ma", style: "boxing", age: 22, tier: 0, base: 44, record: "1-0", trait: "volume nerveux" },
	    { id: "tomas-aguilar", name: "Tomas Aguilar", country: "mx", style: "boxing", age: 28, tier: 0, base: 49, record: "5-3", trait: "menton dur" },
	    { id: "mika-hoshino", name: "Mika Hoshino", country: "jp", style: "karate", age: 23, tier: 0, base: 46, record: "3-0", trait: "entrees rapides" },
	    { id: "ravil-bataev", name: "Ravil Bataev", country: "dag", style: "sambo", age: 25, tier: 1, base: 57, record: "7-0", trait: "chain wrestling" },
	    { id: "joao-figueira", name: "Joao Figueira", country: "br", style: "bjj", age: 24, tier: 1, base: 53, record: "5-1", trait: "menaces au sol" },
	    { id: "matt-parker", name: "Matt Parker", country: "us", style: "wrestling", age: 26, tier: 1, base: 55, record: "6-2", trait: "double leg sec" },
	    { id: "somchai-vira", name: "Somchai Vira", country: "th", style: "muay", age: 27, tier: 1, base: 56, record: "9-4", trait: "coudes courts" },
	    { id: "niko-japaridze", name: "Niko Japaridze", country: "ge", style: "wrestling", age: 26, tier: 2, base: 64, record: "10-1", trait: "hanche lourde" },
	    { id: "dorian-keller", name: "Dorian Keller", country: "fr", style: "karate", age: 29, tier: 2, base: 60, record: "9-3", trait: "contre en reculant" },
	    { id: "carlos-madera", name: "Carlos Madera", country: "cu", style: "boxing", age: 30, tier: 2, base: 63, record: "12-4", trait: "boxe olympique" },
	    { id: "rayan-hakimi", name: "Rayan Hakimi", country: "ma", style: "kickboxing", age: 25, tier: 2, base: 62, record: "8-1", trait: "pression pieds-poings" },
	    { id: "azamat-garunov", name: "Azamat Garunov", country: "dag", style: "sambo", age: 27, tier: 3, base: 72, record: "14-1", trait: "controle et mat returns" },
	    { id: "jude-barker", name: "Jude Barker", country: "uk", style: "boxing", age: 27, tier: 3, base: 67, record: "12-2", trait: "jab tres propre" },
	    { id: "lorenzo-vitali", name: "Lorenzo Vitali", country: "fr", style: "bjj", age: 31, tier: 3, base: 71, record: "17-6", trait: "veteran opportuniste" },
	    { id: "sasha-volkovic", name: "Sasha Volkovic", country: "ge", style: "wrestling", age: 28, tier: 3, base: 69, record: "13-3", trait: "pression cage" },
	    { id: "ayo-balogun", name: "Ayo Balogun", country: "ng", style: "boxing", age: 28, tier: 4, base: 77, record: "18-2", trait: "puissance seche" },
	    { id: "diego-nascimento", name: "Diego Nascimento", country: "br", style: "muay", age: 32, tier: 4, base: 78, record: "21-4", trait: "championship rounds" },
	    { id: "ren-takeda", name: "Ren Takeda", country: "jp", style: "wrestling", age: 30, tier: 4, base: 79, record: "19-1", trait: "controle total" },
	    { id: "daan-vermeer", name: "Daan Vermeer", country: "nl", style: "kickboxing", age: 31, tier: 4, base: 76, record: "20-5", trait: "kickboxing mecanique" },
	    { id: "keon-walker", name: "Keon Walker", country: "us", style: "wrestling", age: 29, tier: 4, base: 80, record: "17-2", trait: "top control froid" },
	    { id: "mateo-cruz", name: "Mateo Cruz", country: "mx", style: "boxing", age: 30, tier: 4, base: 75, record: "18-4", trait: "crochets au corps" },
	    { id: "bekhan-saidov", name: "Bekhan Saidov", country: "dag", style: "sambo", age: 30, tier: 4, base: 81, record: "22-1", trait: "sambo et pression" },
	    { id: "marcus-hale", name: "Marcus Hale", country: "us", style: "sambo", age: 33, tier: 5, base: 86, record: "26-3", trait: "roi du chaos" },
	    { id: "tunde-okoro", name: "Tunde Okoro", country: "ng", style: "boxing", age: 31, tier: 5, base: 87, record: "23-1", trait: "KO threat" },
	    { id: "daichi-mori", name: "Daichi Mori", country: "jp", style: "bjj", age: 34, tier: 5, base: 85, record: "28-5", trait: "veteran froid" },
	    { id: "luis-arantes", name: "Luis Arantes", country: "br", style: "bjj", age: 32, tier: 5, base: 84, record: "24-2", trait: "dos clinique" },
	    { id: "jamal-briggs", name: "Jamal Briggs", country: "us", style: "boxing", age: 34, tier: 5, base: 88, record: "29-4", trait: "gros main event" },
	    { id: "giorgi-mchedli", name: "Giorgi Mchedli", country: "ge", style: "wrestling", age: 30, tier: 5, base: 85, record: "21-0", trait: "lutte invaincue" },
	    { id: "sam-renaud", name: "Sam Renaud", country: "fr", style: "kickboxing", age: 25, tier: 0, base: 47, record: "4-1", trait: "rythme sec" },
	    { id: "nadir-khelif", name: "Nadir Khelif", country: "ma", style: "wrestling", age: 23, tier: 0, base: 46, record: "2-0", trait: "lutte nerveuse" },
	    { id: "pavel-orlov", name: "Pavel Orlov", country: "ge", style: "sambo", age: 27, tier: 0, base: 49, record: "5-2", trait: "projections lourdes" },
	    { id: "bruno-silva", name: "Bruno Silva", country: "br", style: "bjj", age: 24, tier: 0, base: 48, record: "3-0", trait: "jeu de garde actif" },
	    { id: "connor-price", name: "Connor Price", country: "uk", style: "boxing", age: 22, tier: 0, base: 45, record: "1-1", trait: "jab long" },
	    { id: "kenji-watanabe", name: "Kenji Watanabe", country: "jp", style: "karate", age: 25, tier: 0, base: 47, record: "4-0", trait: "distance propre" },
	    { id: "lars-van-holt", name: "Lars Van Holt", country: "nl", style: "kickboxing", age: 26, tier: 0, base: 48, record: "5-3", trait: "low kicks patients" },
	    { id: "idris-kane", name: "Idris Kane", country: "ng", style: "wrestling", age: 23, tier: 0, base: 46, record: "2-1", trait: "pression jeune" },
	    { id: "bruno-azevedo", name: "Bruno Azevedo", country: "br", style: "muay", age: 27, tier: 1, base: 55, record: "8-3", trait: "clinch dur" },
	    { id: "adam-foley", name: "Adam Foley", country: "us", style: "boxing", age: 25, tier: 1, base: 56, record: "7-1", trait: "contre propre" },
	    { id: "tarek-nouri", name: "Tarek Nouri", country: "ma", style: "kickboxing", age: 24, tier: 1, base: 54, record: "6-2", trait: "volume pieds-poings" },
	    { id: "lev-muradi", name: "Lev Muradi", country: "ge", style: "wrestling", age: 26, tier: 1, base: 57, record: "9-1", trait: "pression hanche" },
	    { id: "pieter-vos", name: "Pieter Vos", country: "nl", style: "kickboxing", age: 28, tier: 1, base: 56, record: "8-4", trait: "jambe avant active" },
	    { id: "jalen-rivers", name: "Jalen Rivers", country: "us", style: "wrestling", age: 24, tier: 1, base: 54, record: "5-0", trait: "double-leg rapide" },
	    { id: "mehdi-rolland", name: "Mehdi Rolland", country: "fr", style: "bjj", age: 29, tier: 1, base: 55, record: "9-5", trait: "veteran malin" },
	    { id: "anucha-pradit", name: "Anucha Pradit", country: "th", style: "muay", age: 26, tier: 1, base: 57, record: "10-3", trait: "genoux courts" },
	    { id: "stefan-cole", name: "Stefan Cole", country: "uk", style: "kickboxing", age: 28, tier: 2, base: 62, record: "11-3", trait: "cadence longue" },
	    { id: "makoto-imai", name: "Makoto Imai", country: "jp", style: "karate", age: 27, tier: 2, base: 63, record: "10-1", trait: "entrees au timing" },
	    { id: "arman-dadaev", name: "Arman Dadaev", country: "dag", style: "sambo", age: 25, tier: 2, base: 65, record: "12-0", trait: "controle lourd" },
	    { id: "felipe-costa", name: "Felipe Costa", country: "br", style: "bjj", age: 30, tier: 2, base: 64, record: "15-4", trait: "dos clinique" },
	    { id: "cedric-valmont", name: "Cedric Valmont", country: "fr", style: "boxing", age: 29, tier: 2, base: 61, record: "9-2", trait: "crochet gauche" },
	    { id: "andres-vega", name: "Andres Vega", country: "mx", style: "boxing", age: 26, tier: 2, base: 63, record: "12-2", trait: "body shots" },
	    { id: "omar-sissoko", name: "Omar Sissoko", country: "ng", style: "wrestling", age: 28, tier: 2, base: 62, record: "10-3", trait: "cage control" },
	    { id: "youssef-amar", name: "Youssef Amar", country: "ma", style: "muay", age: 25, tier: 2, base: 61, record: "8-0", trait: "pression en clinch" },
	    { id: "nate-colson", name: "Nate Colson", country: "us", style: "wrestling", age: 30, tier: 3, base: 70, record: "16-4", trait: "grappling lourd" },
	    { id: "thiago-farias", name: "Thiago Farias", country: "br", style: "muay", age: 29, tier: 3, base: 71, record: "17-3", trait: "coudes sales" },
	    { id: "farid-kerimov", name: "Farid Kerimov", country: "dag", style: "sambo", age: 27, tier: 3, base: 72, record: "15-0", trait: "chaine de lutte" },
	    { id: "enzo-mariani", name: "Enzo Mariani", country: "fr", style: "kickboxing", age: 31, tier: 3, base: 69, record: "14-4", trait: "kickboxing fin" },
	    { id: "sefu-adama", name: "Sefu Adama", country: "ng", style: "boxing", age: 28, tier: 3, base: 70, record: "13-1", trait: "explosivite courte" },
	    { id: "mateus-rocha", name: "Mateus Rocha", country: "br", style: "bjj", age: 32, tier: 3, base: 68, record: "18-6", trait: "transitions rapides" },
	    { id: "joris-dekker", name: "Joris Dekker", country: "nl", style: "kickboxing", age: 30, tier: 3, base: 70, record: "16-5", trait: "low kicks froids" },
	    { id: "haruki-inoue", name: "Haruki Inoue", country: "jp", style: "karate", age: 29, tier: 3, base: 68, record: "13-2", trait: "distance longue" },
	    { id: "kamar-sane", name: "Kamar Sane", country: "ng", style: "wrestling", age: 29, tier: 4, base: 78, record: "19-3", trait: "pression cage" },
	    { id: "victor-snow", name: "Victor Snow", country: "us", style: "boxing", age: 30, tier: 4, base: 79, record: "20-2", trait: "main droite" },
	    { id: "murad-askhanov", name: "Murad Askhanov", country: "dag", style: "sambo", age: 28, tier: 4, base: 82, record: "23-0", trait: "sambo froid" },
	    { id: "shinji-kuroda", name: "Shinji Kuroda", country: "jp", style: "karate", age: 31, tier: 4, base: 77, record: "18-3", trait: "contre long" },
	    { id: "pieter-kroon", name: "Pieter Kroon", country: "nl", style: "kickboxing", age: 32, tier: 4, base: 78, record: "21-5", trait: "kickboxing dur" },
	    { id: "leandro-matos", name: "Leandro Matos", country: "br", style: "bjj", age: 30, tier: 4, base: 79, record: "22-4", trait: "dos et bras" },
	    { id: "idriss-ferrand", name: "Idriss Ferrand", country: "fr", style: "muay", age: 28, tier: 4, base: 76, record: "17-2", trait: "clinch agressif" },
	    { id: "santiago-reyes", name: "Santiago Reyes", country: "mx", style: "boxing", age: 33, tier: 4, base: 77, record: "24-6", trait: "guerre au corps" },
	    { id: "rocco-stone", name: "Rocco Stone", country: "us", style: "boxing", age: 32, tier: 5, base: 86, record: "27-2", trait: "pay-per-view" },
	    { id: "karim-saidi", name: "Karim Saidi", country: "ma", style: "kickboxing", age: 31, tier: 5, base: 85, record: "25-3", trait: "volume elite" },
	    { id: "mikhail-baranov", name: "Mikhail Baranov", country: "ge", style: "sambo", age: 33, tier: 5, base: 87, record: "28-2", trait: "sambo clinique" },
	    { id: "bastian-kruger", name: "Bastian Kruger", country: "nl", style: "kickboxing", age: 30, tier: 5, base: 86, record: "24-1", trait: "kickboxing royal" },
	    { id: "theo-ashford", name: "Theo Ashford", country: "uk", style: "boxing", age: 34, tier: 5, base: 85, record: "30-5", trait: "vieux renard" },
	    { id: "akira-hayashi", name: "Akira Hayashi", country: "jp", style: "karate", age: 32, tier: 5, base: 84, record: "26-4", trait: "angles rares" },
	    { id: "paulo-varela", name: "Paulo Varela", country: "br", style: "bjj", age: 35, tier: 5, base: 86, record: "31-6", trait: "sol legendaire" },
	    { id: "musa-diarra", name: "Musa Diarra", country: "ng", style: "wrestling", age: 31, tier: 5, base: 87, record: "25-0", trait: "athlete total" },
	    { id: "zaur-kadyrov", name: "Zaur Kadyrov", country: "dag", style: "sambo", age: 29, tier: 5, base: 88, record: "26-0", trait: "controle absolu" },
  ];

  const LEGEND_BLUEPRINTS = [
    { id: "rocco-balbo", name: "Rocco Balbo", country: "us", style: "boxing", age: 34, tier: LEGEND_TIER, base: 128, record: "57-24", trait: "coeur impossible" },
    { id: "apollo-crowne", name: "Apollo Crowne", country: "us", style: "boxing", age: 33, tier: LEGEND_TIER, base: 136, record: "48-3", trait: "showman imperial" },
    { id: "jax-dempsey", name: "Jax Dempsey", country: "us", style: "boxing", age: 36, tier: LEGEND_TIER, base: 144, record: "61-6", trait: "pression antique" },
    { id: "bruno-li", name: "Bruno Li", country: "jp", style: "karate", age: 32, tier: LEGEND_TIER, base: 149, record: "29-0", trait: "vitesse irreelle" },
    { id: "roy-gracia", name: "Roy Gracia", country: "br", style: "bjj", age: 35, tier: LEGEND_TIER, base: 153, record: "21-2", trait: "garde mystique" },
    { id: "carlo-gracia", name: "Carlo Gracia", country: "br", style: "bjj", age: 38, tier: LEGEND_TIER, base: 159, record: "35-1", trait: "jiu-jitsu fondateur" },
    { id: "oscar-delahoya", name: "Oscar Delahoya", country: "mx", style: "boxing", age: 34, tier: LEGEND_TIER, base: 164, record: "39-6", trait: "main gauche doree" },
    { id: "jo-frazer", name: "Jo Frazer", country: "us", style: "boxing", age: 34, tier: LEGEND_TIER, base: 170, record: "32-4", trait: "crochet au foie" },
    { id: "jerom-banneret", name: "Jerom Banneret", country: "fr", style: "kickboxing", age: 37, tier: LEGEND_TIER, base: 176, record: "86-22", trait: "guerre de ring" },
    { id: "miran-crokop", name: "Miran Crokop", country: "ge", style: "kickboxing", age: 35, tier: LEGEND_TIER, base: 181, record: "38-11", trait: "high kick funeste" },
    { id: "chuck-lidwell", name: "Chuck Lidwell", country: "us", style: "boxing", age: 36, tier: LEGEND_TIER, base: 186, record: "27-9", trait: "contre en bombe" },
    { id: "wander-sileira", name: "Wander Sileira", country: "br", style: "muay", age: 35, tier: LEGEND_TIER, base: 191, record: "42-13", trait: "tempete au corps a corps" },
    { id: "ray-leonardis", name: "Ray Leonardis", country: "us", style: "boxing", age: 32, tier: LEGEND_TIER, base: 198, record: "36-3", trait: "mains de sucre" },
    { id: "george-foreland", name: "George Foreland", country: "us", style: "boxing", age: 40, tier: LEGEND_TIER, base: 204, record: "76-5", trait: "enclume souriante" },
    { id: "mika-taison", name: "Mika Taison", country: "us", style: "boxing", age: 29, tier: LEGEND_TIER, base: 210, record: "50-6", trait: "peekaboo violent" },
    { id: "muhsin-alee", name: "Muhsin Alee", country: "us", style: "boxing", age: 32, tier: LEGEND_TIER, base: 216, record: "56-5", trait: "jab et theatre" },
    { id: "joris-saint-perrin", name: "Joris Saint-Perrin", country: "fr", style: "wrestling", age: 33, tier: LEGEND_TIER, base: 222, record: "26-2", trait: "athlete complet" },
    { id: "floyd-weatherly", name: "Floyd Weatherly", country: "us", style: "boxing", age: 36, tier: LEGEND_TIER, base: 228, record: "50-0", trait: "defense intouchable" },
    { id: "naoto-inari", name: "Naoto Inari", country: "jp", style: "boxing", age: 30, tier: LEGEND_TIER, base: 232, record: "31-0", trait: "precision atomique" },
    { id: "anderson-silvera", name: "Anderson Silvera", country: "br", style: "muay", age: 36, tier: LEGEND_TIER, base: 238, record: "34-11", trait: "matrix debout" },
    { id: "fedor-emelyan", name: "Fedor Emelyan", country: "ge", style: "sambo", age: 35, tier: LEGEND_TIER, base: 244, record: "40-7", trait: "calme glacial" },
    { id: "kabir-nurali", name: "Kabir Nurali", country: "dag", style: "sambo", age: 31, tier: LEGEND_TIER, base: 250, record: "29-0", trait: "controle de montagne" },
    { id: "john-boneson", name: "John Boneson", country: "us", style: "wrestling", age: 34, tier: LEGEND_TIER, base: 256, record: "27-1", trait: "coudes et portee" },
    { id: "alek-pereiro", name: "Alek Pereiro", country: "br", style: "kickboxing", age: 35, tier: LEGEND_TIER, base: 262, record: "12-2", trait: "pierre dans les gants" },
    { id: "ismael-adesani", name: "Ismael Adesani", country: "ng", style: "kickboxing", age: 33, tier: LEGEND_TIER, base: 268, record: "24-4", trait: "distance de sniper" },
    { id: "riko-vermeer", name: "Riko Vermeer", country: "nl", style: "kickboxing", age: 34, tier: LEGEND_TIER, base: 274, record: "61-10", trait: "roi du kickboxing" },
    { id: "ernest-hoste", name: "Ernest Hoste", country: "nl", style: "kickboxing", age: 36, tier: LEGEND_TIER, base: 280, record: "99-21", trait: "science du K-1" },
    { id: "bader-hadi", name: "Bader Hadi", country: "ma", style: "kickboxing", age: 33, tier: LEGEND_TIER, base: 286, record: "106-17", trait: "orage instable" },
    { id: "buak-khao", name: "Buak Khao", country: "th", style: "muay", age: 34, tier: LEGEND_TIER, base: 292, record: "240-24", trait: "genoux de beton" },
    { id: "saen-chaiyut", name: "Saen Chaiyut", country: "th", style: "muay", age: 35, tier: LEGEND_TIER, base: 298, record: "315-43", trait: "angle impossible" },
    { id: "dimitri-jonsson", name: "Dimitri Jonsson", country: "us", style: "wrestling", age: 32, tier: LEGEND_TIER, base: 306, record: "25-4", trait: "metronome total" },
    { id: "lennox-luce", name: "Lennox Luce", country: "uk", style: "boxing", age: 36, tier: LEGEND_TIER, base: 315, record: "41-2", trait: "roi des lourds" },
  ];

  const GYMS = [
    { id: "iron", label: "Iron Basement", org: 0, summary: "Une cave, des rounds durs, aucune camera.", stats: { cardio: 2, chin: 2 } },
    { id: "atlas", label: "Atlas Fight Club", org: 1, summary: "Structure serieuse, scouts regionaux dans les gradins.", stats: { discipline: 2, wrestling: 1 } },
    { id: "cobra", label: "Cobra Lab", org: 1, summary: "Coachs creatifs, plan de jeu agressif, buzz facile.", stats: { striking: 2, charisma: 2 } },
    { id: "summit", label: "Summit MMA", org: 2, summary: "Gros sparrings et partenaires classes.", stats: { grappling: 2, iq: 2, durability: -1 } },
  ];

  const PLANS = [
    { id: "balanced", label: "Plan equilibre", tag: "Sur", summary: "Tester partout, prendre le round proprement.", stats: { iq: 3, discipline: 2 }, finish: -0.02 },
    { id: "strike", label: "Debout et angles", tag: "KO", summary: "Jab, low kicks, chercher le contre fort.", stats: { striking: 8, power: 2, wrestling: -4 }, finish: 0.05 },
    { id: "wrestle", label: "Coller a la cage", tag: "Controle", summary: "Pression, takedowns, casser son rythme.", stats: { wrestling: 9, cardio: -3, striking: -3 }, finish: 0.01 },
    { id: "grapple", label: "Chasser le dos", tag: "Sub", summary: "Transitions au sol, menaces de soumission.", stats: { grappling: 9, iq: 2, striking: -4 }, finish: 0.04 },
    { id: "pressure", label: "Tempete round 1", tag: "Risque", summary: "Mettre le feu tout de suite. Ca gagne vite ou ca coute cher.", stats: { power: 6, charisma: 2, cardio: -7, chin: -2 }, finish: 0.08 },
    { id: "measured", label: "Approche froide", tag: "Decision", summary: "Peu d'erreurs, volume controle, cardio preserve.", stats: { iq: 8, cardio: 3, power: -4 }, finish: -0.05 },
  ];

  const FIGHT_MOMENTS = [
    {
      id: "opening-storm",
      category: "Terrain",
      icon: "flame",
      round: 1,
      title: "Debut sous pression",
      text: "{opponent} avance tout de suite. La cage recule derriere ton dos, le public sent que le premier gros choix arrive.",
      options: [
        { label: "Rendre coup pour coup", tag: "Chaos", result: "Tu refuses de reculer. Les highlights sont possibles, la facture physique aussi.", effects: { hype: 3, condition: -4, injuryRisk: 3 }, fight: { score: 4, finish: 0.045, damage: 2 } },
        { label: "Casser en clinch", tag: "Controle", result: "Tu colles, tu ralentis, tu imposes une minute sale contre la cage.", effects: { condition: -2, morale: 1 }, fight: { score: 3, finish: 0.01, damage: -1 } },
        { label: "Tourner au jab", tag: "Calme", result: "Tu acceptes moins de bruit pour reprendre de l'air et lire le timing.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.015, damage: -2 } },
      ],
    },
    {
      id: "hand-swells",
      category: "Coin",
      icon: "hand",
      round: 2,
      planIds: ["boxing", "strike", "pressure", "balanced"],
      title: "Main qui gonfle",
      text: "Entre deux rounds, le coin regarde ta main droite. Elle gonfle, mais {opponent} mord encore aux feintes.",
      options: [
        { label: "Forcer le KO", tag: "Tete dure", result: "Tu caches la douleur et charges la droite. Si ca passe, ca finit. Sinon la main prend cher.", effects: { condition: -5, injuryRisk: 6, morale: 2 }, fight: { score: 3, finish: 0.06, damage: 3 } },
        { label: "Varier low kicks", tag: "Ajuster", result: "Tu changes d'arme, moins spectaculaire mais beaucoup plus propre pour survivre.", effects: { condition: -1, medicalCare: 2 }, fight: { score: 2, finish: -0.005, damage: -2 } },
        { label: "Le dire au coin", tag: "Prudent", result: "Le coin protege la main et accepte de perdre un peu de danger.", effects: { hype: -1, medicalCare: 4, condition: 1 }, fight: { score: 0, finish: -0.025, damage: -3 } },
      ],
    },
    {
      id: "back-threat",
      category: "Sol",
      icon: "shield-alert",
      round: 2,
      opponentStyles: ["bjj", "sambo", "wrestling"],
      title: "Dos menace",
      text: "{opponent} verrouille une hanche et cherche le dos. Une mauvaise decision peut transformer le round en cauchemar.",
      options: [
        { label: "Scramble total", tag: "Sortie", result: "Tu exploses pour sortir. Gros gain si ca marche, mais ca brule le cardio.", effects: { condition: -4, injuryRisk: 2 }, fight: { score: 3, finish: 0.015, damage: 1 } },
        { label: "Fermer et respirer", tag: "Survie", result: "Tu acceptes de perdre du temps pour tuer les menaces de soumission.", effects: { morale: -1, condition: 1 }, fight: { score: 0, finish: -0.02, damage: -2 } },
        { label: "Renverser au timing", tag: "IQ", result: "Tu attends son passage de jambe et tentes le renversement au bon moment.", effects: { condition: -2, morale: 2 }, fight: { score: 4, finish: 0.02, damage: 0 } },
      ],
    },
    {
      id: "last-round-swing",
      category: "Moment decisif",
      icon: "target",
      round: 3,
      title: "Dernier round serre",
      text: "Le coin annonce que le combat est peut-etre a egalite. {opponent} respire fort, toi aussi. Il faut choisir une fin.",
      options: [
        { label: "Tout envoyer", tag: "Finir", result: "Tu joues la fin avant la limite. C'est dangereux, mais le public se leve.", effects: { hype: 4, condition: -6, injuryRisk: 4 }, fight: { score: 5, finish: 0.07, damage: 2 } },
        { label: "Voler les points", tag: "Propre", result: "Tu touches, tu sors, tu forces les juges a cocher ta colonne.", effects: { condition: -2, morale: 1 }, fight: { score: 3, finish: -0.02, damage: -1 } },
        { label: "Takedown final", tag: "Controle", result: "Tu cherches la cage et le dernier controle. Pas sexy, souvent efficace.", effects: { condition: -3 }, fight: { score: 4, finish: -0.005, damage: 0 } },
      ],
    },
    {
      id: "hostile-crowd",
      category: "Mental",
      icon: "radio",
      round: 2,
      fightRisks: ["high"],
      title: "Salle contre toi",
      text: "Chaque entree de {opponent} fait hurler la salle. Le bruit peut te pousser a combattre son combat.",
      options: [
        { label: "Chambrer la foule", tag: "Show", result: "Tu retournes l'energie contre eux. La hype monte, le calme descend.", effects: { hype: 5, morale: 2, condition: -3 }, fight: { score: 2, finish: 0.025, damage: 1 } },
        { label: "Regarder le coin", tag: "Discipline", result: "Tu coupes le bruit et reviens au plan annonce avant le combat.", effects: { morale: 1 }, fight: { score: 3, finish: -0.005, damage: -1 } },
        { label: "Faire taire avec un shoot", tag: "Message", result: "Tu imposes une phase lourde pour calmer tout le monde.", effects: { condition: -3, hype: 2 }, fight: { score: 4, finish: 0.005, damage: 0 } },
      ],
    },
    {
      id: "calf-kicks",
      category: "Terrain",
      icon: "footprints",
      round: 2,
      opponentStyles: ["muay", "kickboxing", "karate"],
      title: "Mollet en feu",
      text: "{opponent} trouve le low kick exterieur. Ta jambe avant repond moins bien et le coin demande une correction tout de suite.",
      options: [
        { label: "Changer de garde", tag: "Adaptation", result: "Tu changes l'angle et caches mieux la jambe, quitte a perdre un peu de volume.", effects: { condition: -1, medicalCare: 1 }, fight: { score: 2, finish: -0.01, damage: -1 } },
        { label: "Avancer en ligne droite", tag: "Pression", result: "Tu refuses de donner du respect. Le round devient intense et les deux coins retiennent leur souffle.", effects: { hype: 3, condition: -4, injuryRisk: 2 }, fight: { score: 3, finish: 0.03, damage: 2 } },
        { label: "Chercher la lutte", tag: "Sol", result: "Tu transformes le probleme de jambe en sequence de cage. C'est moins brillant, beaucoup plus rationnel.", effects: { condition: -2 }, fight: { score: 4, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "stuffed-shot",
      category: "Cage",
      icon: "shield",
      round: 1,
      planIds: ["wrestle", "grapple", "balanced"],
      title: "Shoot stoppe",
      text: "Premier gros shoot, premier mur. {opponent} defend fort et la salle sent que ton plan peut se gripper.",
      options: [
        { label: "Re-shoot immediat", tag: "Insister", result: "Tu remets la pression avant qu'il ne respire. Si la deuxieme entree passe, le round change.", effects: { condition: -4, morale: 1 }, fight: { score: 4, finish: 0.015, damage: 1 } },
        { label: "Feinter et boxer", tag: "Varier", result: "Tu lui fais payer sa defense de lutte avec des mains courtes et une sortie propre.", effects: { condition: -1 }, fight: { score: 3, finish: 0.005, damage: -1 } },
        { label: "Coller a la cage", tag: "Controle", result: "Tu abandonnes le gros takedown pour casser son rythme contre le grillage.", effects: { condition: -2, hype: -1 }, fight: { score: 2, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "opponent-rocked",
      category: "Moment decisif",
      icon: "zap",
      round: 2,
      planIds: ["strike", "pressure", "balanced", "kickboxing"],
      title: "Adversaire touche",
      text: "Une droite courte fait vaciller {opponent}. Le public se leve, le coin crie de rester intelligent.",
      options: [
        { label: "Finir maintenant", tag: "KO", result: "Tu sens le highlight et tu vides le chargeur. C'est le choix qui fait des clips, ou des retours de flammes.", effects: { hype: 5, condition: -5, injuryRisk: 2 }, fight: { score: 5, finish: 0.085, damage: 1 } },
        { label: "Couper la cage", tag: "Propre", result: "Tu gardes la tete froide: pression, angles, pas de sprint inutile.", effects: { morale: 1, condition: -2 }, fight: { score: 4, finish: 0.035, damage: -1 } },
        { label: "Assurer le round", tag: "Points", result: "Tu refuses le piege du chaos et prends le round sans te decouvrir.", effects: { hype: -1, condition: 1 }, fight: { score: 2, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "cut-over-eye",
      category: "Coin",
      icon: "bandage",
      round: 2,
      title: "Arcade ouverte",
      text: "Le cutman travaille vite. Le sang ne coule pas beaucoup, mais {opponent} a vu la cible.",
      options: [
        { label: "Accelerer avant l'arret", tag: "Urgence", result: "Tu prends le risque de finir avant que l'arbitre ne regarde trop longtemps.", effects: { hype: 4, condition: -4, injuryRisk: 2 }, fight: { score: 4, finish: 0.05, damage: 2 } },
        { label: "Proteger et scorer", tag: "Lucide", result: "Tu montes la garde, touches propre, puis sors avant les echanges sales.", effects: { medicalCare: 2, condition: -1 }, fight: { score: 3, finish: -0.01, damage: -2 } },
        { label: "Entrer en lutte", tag: "Cage", result: "Moins de distance, moins de cible. Tu transformes le round en bataille de positions.", effects: { condition: -2 }, fight: { score: 2, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "corner-demands-change",
      category: "Coin",
      icon: "message-circle",
      round: 3,
      title: "Le coin change le plan",
      text: "Entre deux rounds, le coach coupe court: le plan initial ne suffit plus. Il faut choisir ce que tu acceptes de sacrifier.",
      options: [
        { label: "Suivre le coin", tag: "Discipline", result: "Tu avales l'ego et appliques la consigne. Pas glorieux, mais le round se clarifie.", effects: { morale: 1, stats: { iq: 1 } }, fight: { score: 3, finish: -0.005, damage: -1 } },
        { label: "Garder ton instinct", tag: "Ego", result: "Tu restes sur tes sensations. Le vestiaire aime le courage, le tableau de score moins.", effects: { morale: 2, condition: -2 }, fight: { score: 1, finish: 0.015, damage: 1 } },
        { label: "Mixer les deux", tag: "Lecture", result: "Tu prends la consigne et la replies a ton style. La fin de combat devient plus lisible.", effects: { condition: -1, stats: { iq: 1 } }, fight: { score: 4, finish: 0.01, damage: 0 } },
      ],
    },
    {
      id: "ref-warning",
      category: "Arbitre",
      icon: "badge-alert",
      round: 2,
      planIds: ["wrestle", "grapple", "pressure"],
      title: "Avertissement de l'arbitre",
      text: "L'arbitre te previent pour doigts dans la cage et phases trop sales. Encore une limite et le round peut t'echapper.",
      options: [
        { label: "Rester sale mais discret", tag: "Limite", result: "Tu flirtes avec la ligne. Le controle reste lourd, l'arbitre reste proche.", effects: { hype: 2, rep: -1, condition: -2 }, fight: { score: 3, finish: 0.005, damage: 0 } },
        { label: "Rentrer dans les regles", tag: "Pro", result: "Tu relaches les doigts, tu montres les mains ouvertes et tu gardes l'arbitre hors du round.", effects: { rep: 1, condition: -1 }, fight: { score: 2, finish: -0.01, damage: -1 } },
        { label: "Revenir debout", tag: "Reset", result: "Tu rends la position pour eviter le point retire. La foule adore, le coin grince un peu.", effects: { hype: 2, morale: -1 }, fight: { score: 1, finish: 0.015, damage: 1 } },
      ],
    },
    {
      id: "body-shot-freeze",
      category: "Terrain",
      icon: "activity",
      round: 2,
      opponentStyles: ["boxing", "kickboxing", "muay"],
      title: "Coup au corps",
      text: "{opponent} touche au foie. Une seconde de trop sans reponse et tout le monde saura que ca a pique.",
      options: [
        { label: "Cacher et avancer", tag: "Mental", result: "Tu souris pour vendre que rien ne s'est passe. Le corps, lui, sait tres bien.", effects: { morale: 2, condition: -4, injuryRisk: 1 }, fight: { score: 2, finish: 0.02, damage: 2 } },
        { label: "Accrocher le clinch", tag: "Respirer", result: "Tu prends quinze secondes sales, exactement celles qu'il fallait.", effects: { condition: -1, medicalCare: 1 }, fight: { score: 2, finish: -0.015, damage: -2 } },
        { label: "Changer de rythme", tag: "IQ", result: "Tu refuses de montrer la douleur et ralentis l'echange avec des feintes.", effects: { stats: { iq: 1 } }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "mouthpiece-out",
      category: "Arbitre",
      icon: "badge-alert",
      round: 1,
      title: "Protege-dents au sol",
      text: "Un echange sale fait sauter ton protege-dents. L'arbitre hesite a stopper, {opponent} avance deja pour voler le moment.",
      options: [
        { label: "Reclamer l'arret", tag: "Lucide", result: "Tu forces l'arbitre a intervenir. Le public siffle un peu, le cerveau remercie.", effects: { medicalCare: 2, hype: -1 }, fight: { score: 0, finish: -0.02, damage: -2 } },
        { label: "Rendre tout de suite", tag: "Feu", result: "Tu reponds sans attendre. La sequence chauffe la salle, mais tu prends le risque inutile.", effects: { hype: 3, condition: -3, injuryRisk: 1 }, fight: { score: 3, finish: 0.035, damage: 2 } },
        { label: "Accrocher et temporiser", tag: "Pro", result: "Tu colles a la cage le temps que l'arbitre comprenne. Pas beau, mais intelligent.", effects: { condition: -1, stats: { iq: 1 } }, fight: { score: 2, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "doctor-check",
      category: "Coin",
      icon: "stethoscope",
      round: 2,
      title: "Medecin appele",
      text: "L'arbitre appelle le medecin pour regarder une marque pres de l'oeil. Le combat peut continuer, mais il faut vendre que tout va bien.",
      options: [
        { label: "Sourire au medecin", tag: "Calme", result: "Tu controles la respiration et obtiens le feu vert sans paniquer.", effects: { morale: 1, medicalCare: 1 }, fight: { score: 1, finish: -0.01, damage: -1 } },
        { label: "Repartir en furie", tag: "Urgence", result: "Tu refuses que l'image de faiblesse reste a l'ecran. Le round devient plus dangereux.", effects: { hype: 4, condition: -4, injuryRisk: 2 }, fight: { score: 4, finish: 0.045, damage: 2 } },
        { label: "Ecouter le coin", tag: "Discipline", result: "Tu proteges la zone, touches propre et retires du chaos au combat.", effects: { stats: { discipline: 1 }, condition: -1 }, fight: { score: 3, finish: -0.015, damage: -2 } },
      ],
    },
    {
      id: "glove-grab",
      category: "Cage",
      icon: "hand",
      round: 2,
      planIds: ["wrestle", "grapple", "balanced"],
      title: "Gant accroche",
      text: "Dans un scramble, {opponent} accroche ton gant. Tu peux jouer l'arbitre, ou punir la triche toi-meme.",
      options: [
        { label: "Montrer le gant", tag: "Arbitre", result: "Tu signales la faute. Le round ralentit, mais l'arbitre commence a surveiller ses mains.", effects: { rep: 1, morale: -1 }, fight: { score: 1, finish: -0.015, damage: -1 } },
        { label: "Punir au sol", tag: "Sale", result: "Tu reponds par une minute lourde. C'est limite, mais le message passe.", effects: { hype: 2, condition: -3, rep: -1 }, fight: { score: 4, finish: 0.015, damage: 1 } },
        { label: "Sortir et reset", tag: "IQ", result: "Tu refuses le piege et remets le combat a distance.", effects: { stats: { iq: 1 }, condition: -1 }, fight: { score: 2, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "knee-in-clinch",
      category: "Clinch",
      icon: "activity",
      round: 2,
      opponentStyles: ["muay", "kickboxing", "wrestling"],
      title: "Genou dans le clinch",
      text: "{opponent} trouve un genou court au corps. Le coin veut que tu changes la bataille de positions maintenant.",
      options: [
        { label: "Pousser la tete", tag: "Technique", result: "Tu ajustes la posture et coupes ses genoux. La sequence devient moins dangereuse.", effects: { condition: -1, stats: { iq: 1 } }, fight: { score: 3, finish: -0.005, damage: -1 } },
        { label: "Repondre au coude", tag: "Dur", result: "Tu rends un coup qui marque. Le risque d'echange sale monte avec la temperature.", effects: { hype: 3, condition: -3, injuryRisk: 1 }, fight: { score: 4, finish: 0.035, damage: 2 } },
        { label: "Decrocher", tag: "Respirer", result: "Tu abandonnes la position pour respirer et retrouver la distance.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "submission-scare",
      category: "Sol",
      icon: "shield-alert",
      round: 2,
      opponentStyles: ["bjj", "sambo"],
      title: "Soumission qui serre",
      text: "{opponent} verrouille une menace au bras. Ce n'est pas encore fini, mais la mauvaise defense peut laisser une trace.",
      options: [
        { label: "Arracher le bras", tag: "Urgence", result: "Tu sors en force. Le public explose, l'articulation aime moins.", effects: { hype: 3, condition: -4, injuryRisk: 3 }, fight: { score: 2, finish: 0.015, damage: 2 } },
        { label: "Defendre propre", tag: "Calme", result: "Tu fermes l'angle, gagnes du temps et fais sauter la prise sans panique.", effects: { stats: { grappling: 1, iq: 1 }, condition: -1 }, fight: { score: 3, finish: -0.01, damage: -1 } },
        { label: "Rouler dessus", tag: "Gamble", result: "Tu tentes le renversement spectaculaire. Ca peut voler le round ou offrir le dos.", effects: { hype: 2, condition: -3 }, fight: { score: 4, finish: 0.025, damage: 1 } },
      ],
    },
    {
      id: "slippery-canvas",
      category: "Terrain",
      icon: "footprints",
      round: 1,
      title: "Cage glissante",
      text: "Le logo au centre est humide. Tes appuis partent un peu, {opponent} aussi. Le combat demande un choix simple et rapide.",
      options: [
        { label: "Rester au centre", tag: "Controle", result: "Tu ralentis les echanges et refuses les grands pivots. Moins de highlight, plus de securite.", effects: { condition: 1, medicalCare: 1 }, fight: { score: 2, finish: -0.02, damage: -2 } },
        { label: "Forcer les angles", tag: "Risque", result: "Tu joues ton footwork malgre le sol. Si ca passe, {opponent} court apres toi.", effects: { hype: 2, condition: -3, injuryRisk: 2 }, fight: { score: 3, finish: 0.02, damage: 1 } },
        { label: "Amener contre la cage", tag: "Pragmatique", result: "Tu retires les appuis du probleme et transformes la reprise en pression physique.", effects: { condition: -2 }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "gas-tank-empty",
      category: "Mental",
      icon: "battery-low",
      round: 3,
      title: "Reservoir presque vide",
      text: "Le souffle devient court. {opponent} le voit et commence a pointer la fatigue du doigt.",
      options: [
        { label: "Bluffer la fraicheur", tag: "Charisme", result: "Tu souris, tu provoques et tu caches la panne. Le mental adverse hesite.", effects: { hype: 2, morale: 2, condition: -2 }, fight: { score: 2, finish: 0.015, damage: 1 } },
        { label: "Voler une minute", tag: "Gestion", result: "Tu ralentis tout: clinch, feintes, respiration. Ce n'est pas glorieux, c'est vital.", effects: { condition: 2, hype: -1 }, fight: { score: 1, finish: -0.025, damage: -2 } },
        { label: "Derniere rafale", tag: "Tout ou rien", result: "Tu mises le reste du reservoir sur une sequence qui peut sauver le combat.", effects: { hype: 4, condition: -6, injuryRisk: 3 }, fight: { score: 5, finish: 0.06, damage: 2 } },
      ],
    },
    {
      id: "early-check-hook",
      category: "Debout",
      icon: "crosshair",
      round: 1,
      planIds: ["strike", "pressure", "balanced", "measured"],
      title: "Check hook disponible",
      text: "{opponent} entre large sur ses premieres attaques. Le contre est la, mais il faut accepter l'echange.",
      options: [
        { label: "Declencher le crochet", tag: "Contre", result: "Tu le cueilles en entree. Le round prend de la valeur, mais tu restes dans la poche.", effects: { hype: 3, condition: -2 }, fight: { score: 4, finish: 0.04, damage: 1 } },
        { label: "Jab et sortie", tag: "Propre", result: "Tu marques sans t'enflammer. Le coin aime la discipline plus que les highlights.", effects: { stats: { discipline: 1 }, condition: -1 }, fight: { score: 2, finish: -0.01, damage: -1 } },
        { label: "Le laisser venir", tag: "Piege", result: "Tu recules pour charger un contre plus gros. Le timing peut payer, ou couter le centre.", effects: { morale: 1 }, fight: { score: 2, finish: 0.025, damage: 1 } },
      ],
    },
    {
      id: "open-stance-puzzle",
      category: "Debout",
      icon: "footprints",
      round: 1,
      opponentStyles: ["karate", "kickboxing", "boxing"],
      title: "Garde opposee",
      text: "{opponent} change de garde et brouille la ligne du jab. Les premieres minutes peuvent devenir un jeu de distance.",
      options: [
        { label: "Attaquer la jambe avant", tag: "Low kick", result: "Tu simplifies l'equation: toucher la jambe, casser les sorties.", effects: { condition: -2 }, fight: { score: 3, finish: 0.005, damage: 0 } },
        { label: "Feinter le shoot", tag: "Mix", result: "Tu fais baisser ses mains avec la menace de lutte. Le combat devient plus complet.", effects: { stats: { iq: 1 }, condition: -1 }, fight: { score: 3, finish: 0.01, damage: -1 } },
        { label: "Observer une minute", tag: "Lecture", result: "Tu refuses de courir dans le piege. Moins de volume, plus d'information.", effects: { stats: { iq: 1 }, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "first-minute-adrenaline",
      category: "Mental",
      icon: "zap",
      round: 1,
      title: "Trop d'adrenaline",
      text: "Les jambes repondent trop vite, les epaules montent. Le premier round peut partir en sprint inutile.",
      options: [
        { label: "Canaliser au jab", tag: "Calme", result: "Tu poses le rythme et laisses le coeur redescendre.", effects: { condition: 1, morale: 1 }, fight: { score: 2, finish: -0.015, damage: -1 } },
        { label: "Embrasser le chaos", tag: "Show", result: "Tu transformes la nervosite en feu. La salle adore, le cardio moins.", effects: { hype: 4, condition: -4, injuryRisk: 1 }, fight: { score: 4, finish: 0.045, damage: 2 } },
        { label: "Accrocher la cage", tag: "Pause", result: "Tu prends le clinch pour eteindre l'exces d'energie.", effects: { hype: -1, condition: -1 }, fight: { score: 2, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "coach-calls-audible",
      category: "Coin",
      icon: "ear",
      round: 1,
      title: "Consigne hurlee",
      text: "Ton coach voit une ouverture et hurle un ajustement. Tu peux suivre tout de suite ou garder le plan signe.",
      options: [
        { label: "Suivre l'appel", tag: "Coin", result: "Tu fais confiance au coin et changes le rythme avant {opponent}.", effects: { morale: 1, stats: { iq: 1 } }, fight: { score: 3, finish: 0.005, damage: -1 } },
        { label: "Garder le plan", tag: "Structure", result: "Tu refuses le bruit et restes sur la preparation.", effects: { stats: { discipline: 1 }, condition: -1 }, fight: { score: 2, finish: -0.005, damage: 0 } },
        { label: "Faire signe au public", tag: "Show", result: "Tu montres que tu controles. L'image monte, la concentration se disperse.", effects: { hype: 3, morale: 1, condition: -2 }, fight: { score: 1, finish: 0.015, damage: 1 } },
      ],
    },
    {
      id: "fence-cut",
      category: "Cage",
      icon: "scissors",
      round: 2,
      title: "Coupe contre la cage",
      text: "{opponent} sort toujours du meme cote. Le coin demande de fermer la porte avant qu'il ne reprenne confiance.",
      options: [
        { label: "Couper fort", tag: "Pression", result: "Tu fermes l'angle et forces l'echange lourd contre le grillage.", effects: { condition: -3, hype: 2 }, fight: { score: 4, finish: 0.025, damage: 1 } },
        { label: "Pieger au centre", tag: "IQ", result: "Tu le laisses croire a la sortie puis changes l'angle au dernier moment.", effects: { stats: { iq: 1 }, condition: -1 }, fight: { score: 3, finish: 0.01, damage: -1 } },
        { label: "Rester patient", tag: "Volume", result: "Tu gardes le centre et acceptes un round plus lent.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -1 } },
      ],
    },
    {
      id: "elbow-scramble",
      category: "Clinch",
      icon: "activity",
      round: 2,
      title: "Coude en sortie",
      text: "A chaque separation, {opponent} laisse une demi-seconde. Le coude est tentant, mais la distance est courte.",
      options: [
        { label: "Lancer le coude", tag: "Degats", result: "Tu marques une image forte. Le risque de collision monte aussi.", effects: { hype: 4, condition: -3, injuryRisk: 2 }, fight: { score: 4, finish: 0.04, damage: 2 } },
        { label: "Sortir au crochet", tag: "Simple", result: "Moins spectaculaire, plus propre. Le round reste dans ton rythme.", effects: { condition: -1 }, fight: { score: 3, finish: 0.01, damage: 0 } },
        { label: "Reclencher le clinch", tag: "Controle", result: "Tu retires l'echange ouvert et remets du poids contre la cage.", effects: { hype: -1, condition: -2 }, fight: { score: 2, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "eye-poke-pause",
      category: "Arbitre",
      icon: "eye",
      round: 2,
      title: "Doigt dans l'oeil",
      text: "Un doigt adverse touche l'oeil. Tu as quelques secondes pour decider si tu reprends vite ou si tu casses son elan.",
      options: [
        { label: "Prendre le temps", tag: "Sante", result: "Tu recuperes vraiment la vision. Le rythme retombe, mais le risque baisse.", effects: { medicalCare: 3, hype: -1 }, fight: { score: 0, finish: -0.025, damage: -2 } },
        { label: "Reprendre vite", tag: "Dur", result: "Tu refuses d'offrir une pause mentale. Le public respecte, l'oeil reste fragile.", effects: { hype: 2, condition: -2, injuryRisk: 1 }, fight: { score: 2, finish: 0.015, damage: 1 } },
        { label: "Mettre la pression a l'arbitre", tag: "Politique", result: "Tu fais comprendre que la prochaine faute devra couter.", effects: { rep: 1, morale: -1 }, fight: { score: 1, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "spinning-kick-read",
      category: "Debout",
      icon: "rotate-ccw",
      round: 2,
      opponentStyles: ["karate", "kickboxing", "muay"],
      title: "Coup retourne annonce",
      text: "{opponent} charge un coup retourne. Si tu lis bien, la sequence peut basculer d'un coup.",
      options: [
        { label: "Entrer en lutte", tag: "Punir", result: "Tu passes sous la rotation et prends les hanches. Le coin exulte.", effects: { condition: -2 }, fight: { score: 4, finish: 0.01, damage: -1 } },
        { label: "Contrer plein axe", tag: "Highlight", result: "Tu cherches le contre qui tourne partout. C'est beau si le timing existe.", effects: { hype: 5, condition: -3, injuryRisk: 1 }, fight: { score: 3, finish: 0.06, damage: 1 } },
        { label: "Sortir loin", tag: "Prudent", result: "Tu refuses le piege et le laisses finir dans le vide.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "corner-says-behind",
      category: "Coin",
      icon: "message-circle-warning",
      round: 3,
      title: "Le coin te dit derriere",
      text: "Avant le dernier round, le coach est direct: selon lui, tu es derriere aux points.",
      options: [
        { label: "Chercher le finish", tag: "Urgence", result: "Tu joues la fin avant la limite. Le combat devient violent et lisible.", effects: { hype: 4, condition: -6, injuryRisk: 3 }, fight: { score: 5, finish: 0.075, damage: 2 } },
        { label: "Voler un 10-8", tag: "Controle", result: "Tu veux dominer sans te decouvrir: pression, cage, volume.", effects: { condition: -4 }, fight: { score: 5, finish: 0.01, damage: 0 } },
        { label: "Ne pas paniquer", tag: "Lucide", result: "Tu refuses de transformer un retard possible en erreur certaine.", effects: { morale: 1, stats: { iq: 1 } }, fight: { score: 3, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "cage-control-stall",
      category: "Arbitre",
      icon: "badge-alert",
      round: 3,
      planIds: ["wrestle", "grapple", "balanced"],
      title: "Arbitre menace de separer",
      text: "Tu controles contre la cage, mais l'arbitre demande plus de travail. Encore dix secondes molles et il separe.",
      options: [
        { label: "Travailler au corps", tag: "Actif", result: "Tu ajoutes des frappes courtes pour garder la position vivante.", effects: { condition: -2 }, fight: { score: 3, finish: -0.005, damage: 0 } },
        { label: "Forcer le takedown", tag: "Lutte", result: "Tu transformes le controle en vraie chute. Gros effort, gros signal.", effects: { condition: -4, hype: 1 }, fight: { score: 5, finish: 0.01, damage: 1 } },
        { label: "Accepter le reset", tag: "Calme", result: "Tu ne brules pas le reservoir pour une position qui cale.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -1 } },
      ],
    },
    {
      id: "broken-rhythm",
      category: "Mental",
      icon: "metronome",
      round: 3,
      title: "Rythme casse",
      text: "Le combat devient hache: pauses, resets, petites fautes. Tu peux remettre du volume ou accepter la bataille moche.",
      options: [
        { label: "Remettre du volume", tag: "Juge", result: "Tu forces les juges a voir ton activite. Ca coute du souffle, mais ca parle.", effects: { condition: -3 }, fight: { score: 4, finish: -0.005, damage: 0 } },
        { label: "Rester moche", tag: "Veteran", result: "Tu gagnes des secondes, des positions et peut-etre le combat sans image propre.", effects: { rep: -1, condition: -1 }, fight: { score: 3, finish: -0.02, damage: -1 } },
        { label: "Provoquer l'echange", tag: "Public", result: "Tu cherches une sequence claire pour reveiller la salle.", effects: { hype: 3, condition: -3, injuryRisk: 1 }, fight: { score: 3, finish: 0.035, damage: 1 } },
      ],
    },
    {
      id: "round4-swelling",
      category: "Ceinture",
      icon: "heart-pulse",
      round: 4,
      titleOnly: true,
      title: "Visage qui ferme",
      text: "Quatrieme round: une zone du visage gonfle. Le coin peut encore gerer, mais le medecin regarde plus souvent.",
      options: [
        { label: "Proteger la zone", tag: "Survie", result: "Tu adaptes la garde et gardes le combat ouvert.", effects: { medicalCare: 3, condition: -1 }, fight: { score: 2, finish: -0.02, damage: -2 } },
        { label: "Accelerer avant examen", tag: "Pression", result: "Tu veux marquer avant que le medecin ne pese trop lourd.", effects: { hype: 3, condition: -5, injuryRisk: 2 }, fight: { score: 4, finish: 0.045, damage: 2 } },
        { label: "Coller au sol", tag: "Controle", result: "Tu retires la cible du regard et cherches le controle long.", effects: { condition: -3 }, fight: { score: 4, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "round5-empty-corner",
      category: "Ceinture",
      icon: "battery-low",
      round: 5,
      titleOnly: true,
      title: "Dernieres consignes",
      text: "Cinquieme round. Le coin n'a plus de grande phrase: juste respirer, choisir et assumer.",
      options: [
        { label: "Tout laisser dans la cage", tag: "Legacy", result: "Tu acceptes de payer le prix pour finir plus fort que lui.", effects: { hype: 5, rep: 2, condition: -7, injuryRisk: 3 }, fight: { score: 6, finish: 0.06, damage: 2 } },
        { label: "Gerer comme champion", tag: "Maitrise", result: "Tu fermes les portes, gagnes les petites positions et refuses le chaos.", effects: { rep: 2, condition: -3 }, fight: { score: 4, finish: -0.02, damage: -1 } },
        { label: "Chercher une soumission tardive", tag: "Surprise", result: "Tu changes le langage du combat au dernier moment.", effects: { hype: 3, condition: -5 }, fight: { score: 5, finish: 0.055, damage: 1 } },
      ],
    },
    {
      id: "no-air-left",
      category: "Fatigue",
      icon: "lungs",
      round: 2,
      maxCondition: 56,
      title: "Plus assez d'air",
      text: "La bouche reste ouverte apres chaque echange. Le coin voit que le reservoir descend plus vite que prevu.",
      options: [
        { label: "Ralentir tout de suite", tag: "Gestion", result: "Tu casses le rythme et recuperes un peu d'air, meme si le round perd en danger.", effects: { condition: 2, hype: -1 }, fight: { score: 1, finish: -0.025, damage: -2 } },
        { label: "Bluffer au centre", tag: "Mental", result: "Tu restes au centre pour cacher la panne. Le public ne voit rien, le corps si.", effects: { morale: 2, condition: -3, injuryRisk: 2 }, fight: { score: 2, finish: 0.01, damage: 1 } },
        { label: "Chercher le clinch", tag: "Respirer", result: "Tu poses du poids contre la cage et gagnes les secondes qui manquaient.", effects: { condition: -1 }, fight: { score: 3, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "cardio-wall",
      category: "Fatigue",
      icon: "activity",
      round: 3,
      maxStats: { cardio: 58 },
      title: "Mur cardio",
      text: "Troisieme round: les jambes repondent avec une demi-seconde de retard. Le cardio du camp arrive au tribunal.",
      options: [
        { label: "Un gros effort", tag: "All-in", result: "Tu mets tout dans une sequence. Si elle marque, elle sauve le round. Sinon il ne reste presque rien.", effects: { hype: 3, condition: -6, injuryRisk: 3 }, fight: { score: 5, finish: 0.045, damage: 2 } },
        { label: "Economiser les gestes", tag: "Survie", result: "Tu retires les mouvements inutiles et gardes un round defendable.", effects: { condition: 1, hype: -1 }, fight: { score: 2, finish: -0.025, damage: -2 } },
        { label: "Faire travailler le coin", tag: "IQ", result: "Tu appliques uniquement les consignes courtes: jab, angle, reset.", effects: { stats: { iq: 1 } }, fight: { score: 3, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "dead-leg",
      category: "Jambes",
      icon: "footprints",
      round: 2,
      opponentStyles: ["muay", "kickboxing", "karate"],
      title: "Jambe morte",
      text: "Les low kicks s'accumulent. La jambe avant ne pousse plus pareil et chaque changement d'appui devient visible.",
      options: [
        { label: "Changer de garde", tag: "Adaptation", result: "Tu caches la jambe abimee et acceptes de perdre certains automatismes.", effects: { medicalCare: 1, condition: -1 }, fight: { score: 2, finish: -0.015, damage: -1 } },
        { label: "Avancer sans appui", tag: "Dur", result: "Tu refuses de montrer la blessure. L'image est forte, le risque aussi.", effects: { hype: 3, condition: -4, injuryRisk: 3 }, fight: { score: 3, finish: 0.025, damage: 2 } },
        { label: "Shooter bas", tag: "Lutte", result: "Tu retires la jambe du duel de kicks et transformes le probleme en lutte.", effects: { condition: -2 }, fight: { score: 4, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "checked-kick",
      category: "Jambes",
      icon: "bone",
      round: 1,
      planIds: ["strike", "pressure", "balanced", "kickboxing"],
      title: "Kick checke",
      text: "Ton low kick tombe sur le tibia adverse. Le bruit est sec, et la jambe te rappelle tout de suite le prix.",
      options: [
        { label: "Arreter les low kicks", tag: "Lucide", result: "Tu retires l'arme du plan et cherches des mains plus propres.", effects: { medicalCare: 2, condition: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
        { label: "Remonter au corps", tag: "Ajuster", result: "Tu changes la cible sans abandonner le debout.", effects: { condition: -2 }, fight: { score: 3, finish: 0.015, damage: 0 } },
        { label: "Insister quand meme", tag: "Tetu", result: "Tu veux casser sa defense avant qu'elle ne casse ta jambe.", effects: { hype: 2, condition: -4, injuryRisk: 4 }, fight: { score: 3, finish: 0.025, damage: 3 } },
      ],
    },
    {
      id: "ankle-roll",
      category: "Jambes",
      icon: "footprints",
      round: 2,
      minCampFatigue: 7,
      title: "Cheville qui tourne",
      text: "Sur une sortie d'angle, la cheville part legerement. Rien de spectaculaire, mais les appuis deviennent moins francs.",
      options: [
        { label: "Revenir au centre", tag: "Stable", result: "Tu limites les pivots et gardes un sol plus simple.", effects: { medicalCare: 2, hype: -1 }, fight: { score: 1, finish: -0.025, damage: -2 } },
        { label: "Cacher la gene", tag: "Poker", result: "Tu continues comme si de rien n'etait. L'adversaire ne lit pas tout, mais le corps paie.", effects: { condition: -3, injuryRisk: 3 }, fight: { score: 2, finish: 0.005, damage: 1 } },
        { label: "Coller au corps", tag: "Clinch", result: "Tu enleves les grands deplacements du round et travailles court.", effects: { condition: -1 }, fight: { score: 3, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "knee-wobbles",
      category: "Jambes",
      icon: "triangle-alert",
      round: 3,
      minInjuryRisk: 28,
      title: "Genou qui flotte",
      text: "Au moment de pousser pour changer d'axe, le genou flotte une fraction de seconde. Le staff medical va regarder cette sequence.",
      options: [
        { label: "Couper les pivots", tag: "Sante", result: "Tu retires les sorties explosives et reduis le risque de vraie casse.", effects: { medicalCare: 4, hype: -1 }, fight: { score: 1, finish: -0.03, damage: -2 } },
        { label: "Tenir la ligne", tag: "Courage", result: "Tu refuses de reculer. Le round garde de la valeur, la dette medicale aussi.", effects: { hype: 3, condition: -4, injuryRisk: 4 }, fight: { score: 3, finish: 0.02, damage: 2 } },
        { label: "Chercher le sol", tag: "Controle", result: "Tu transformes l'alerte en bataille de hanches plus stable.", effects: { condition: -2 }, fight: { score: 4, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "balance-lost",
      category: "Equilibre",
      icon: "move-diagonal",
      round: 1,
      maxStats: { discipline: 60 },
      title: "Perte d'equilibre",
      text: "Tu charges trop loin sur une entree. Pendant une seconde, les pieds ne sont plus sous toi.",
      options: [
        { label: "Tomber en single", tag: "Sauver", result: "Tu transformes la perte d'equilibre en tentative de lutte. Pas elegant, mais utile.", effects: { condition: -2 }, fight: { score: 2, finish: -0.005, damage: -1 } },
        { label: "Remonter en crochet", tag: "Chaos", result: "Tu reviens avec un coup large pour faire oublier l'erreur.", effects: { hype: 3, condition: -3, injuryRisk: 1 }, fight: { score: 3, finish: 0.035, damage: 1 } },
        { label: "Reset complet", tag: "Propre", result: "Tu acceptes de perdre le centre pour retrouver tes appuis.", effects: { morale: -1, medicalCare: 1 }, fight: { score: 0, finish: -0.025, damage: -2 } },
      ],
    },
    {
      id: "head-clash",
      category: "Tete",
      icon: "shield-alert",
      round: 2,
      title: "Choc de tetes",
      text: "Une entree de clinch finit tete contre tete. Le bruit coupe le public, l'arbitre regarde les deux visages.",
      options: [
        { label: "Demander le temps", tag: "Medical", result: "Tu forces la pause et verifies que la vision reste nette.", effects: { medicalCare: 3, hype: -1 }, fight: { score: 0, finish: -0.025, damage: -2 } },
        { label: "Reprendre plus fort", tag: "Dur", result: "Tu transformes l'accident en guerre mentale.", effects: { hype: 3, condition: -3, injuryRisk: 2 }, fight: { score: 3, finish: 0.025, damage: 2 } },
        { label: "Changer les entrees", tag: "IQ", result: "Tu ajustes la hauteur de tete et retires le risque de collision.", effects: { stats: { iq: 1 }, condition: -1 }, fight: { score: 2, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "temple-shot",
      category: "Tete",
      icon: "brain",
      round: 2,
      title: "Tempe touchee",
      text: "Un crochet touche la tempe. Ce n'est pas un knockdown, mais le monde ralentit juste assez pour faire peur.",
      options: [
        { label: "Couvrir et respirer", tag: "Survie", result: "Tu acceptes une minute moins ambitieuse pour remettre le cerveau droit.", effects: { medicalCare: 3, condition: -1 }, fight: { score: 0, finish: -0.03, damage: -2 } },
        { label: "Rendre immediatement", tag: "Instinct", result: "Tu refuses que l'adversaire sente la faille. Le danger reste des deux cotes.", effects: { hype: 3, condition: -4, injuryRisk: 3 }, fight: { score: 3, finish: 0.04, damage: 2 } },
        { label: "Descendre sur les jambes", tag: "Lutte", result: "Tu retires le duel de boxe et fais parler les hanches.", effects: { condition: -2 }, fight: { score: 4, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "nose-busted",
      category: "Visage",
      icon: "droplets",
      round: 2,
      title: "Nez en sang",
      text: "Le jab de {opponent} ouvre le nez. Tu respires moins bien et le coin voit le probleme venir.",
      options: [
        { label: "Respirer par la bouche", tag: "Gestion", result: "Tu acceptes un rythme plus court pour ne pas exploser le cardio.", effects: { condition: -1, medicalCare: 1 }, fight: { score: 1, finish: -0.02, damage: -1 } },
        { label: "Presser sans respirer", tag: "Orgueil", result: "Tu refuses de laisser le nez dicter le round.", effects: { hype: 2, condition: -4, injuryRisk: 2 }, fight: { score: 3, finish: 0.025, damage: 1 } },
        { label: "Casser la distance", tag: "Clinch", result: "Tu retires le jab de l'equation en rentrant sur le corps.", effects: { condition: -2 }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "cut-reopens",
      category: "Visage",
      icon: "bandage",
      round: 3,
      minInjuryRisk: 18,
      title: "Arcade qui se rouvre",
      text: "Une ancienne zone fragile s'ouvre a nouveau. Le cutman peut gerer, mais le medecin commence a compter les secondes.",
      options: [
        { label: "Proteger l'arcade", tag: "Survie", result: "Tu changes la garde et limites les echanges ouverts.", effects: { medicalCare: 4, condition: -1 }, fight: { score: 1, finish: -0.03, damage: -2 } },
        { label: "Finir avant le medecin", tag: "Urgence", result: "Tu mets la pression pour que la blessure ne decide pas a ta place.", effects: { hype: 4, condition: -5, injuryRisk: 3 }, fight: { score: 4, finish: 0.055, damage: 2 } },
        { label: "Coller au grillage", tag: "Controle", result: "Tu caches l'arcade dans une bataille de positions.", effects: { condition: -2 }, fight: { score: 3, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "vision-narrow",
      category: "Visage",
      icon: "eye-off",
      round: 3,
      title: "Vision qui se ferme",
      text: "Le gonflement reduit ton champ de vision d'un cote. Les crochets larges deviennent beaucoup plus dangereux.",
      options: [
        { label: "Tourner du bon cote", tag: "Lecture", result: "Tu orientes le combat vers l'oeil encore clair.", effects: { stats: { iq: 1 }, condition: -1 }, fight: { score: 3, finish: -0.01, damage: -1 } },
        { label: "Avancer plein centre", tag: "Dur", result: "Tu retires les angles, mais tu prends une vraie dose de collision.", effects: { hype: 3, condition: -4, injuryRisk: 2 }, fight: { score: 3, finish: 0.025, damage: 2 } },
        { label: "Demander au coin", tag: "Prudent", result: "Tu ecoutes les indications simples et sauves la fin de round.", effects: { medicalCare: 2, morale: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
      ],
    },
    {
      id: "ear-ringing",
      category: "Tete",
      icon: "ear",
      round: 2,
      maxStats: { chin: 62 },
      title: "Oreille qui siffle",
      text: "Une frappe courte derriere la garde fait siffler l'oreille. L'equilibre reste la, mais il faut rester simple.",
      options: [
        { label: "Simplifier le plan", tag: "Calme", result: "Tu coupes les gestes compliques et gardes la garde haute.", effects: { medicalCare: 2, condition: -1 }, fight: { score: 2, finish: -0.02, damage: -2 } },
        { label: "Repondre en volume", tag: "Masquer", result: "Tu couvres le signal par de l'activite. Les juges voient du feu, le staff voit le risque.", effects: { hype: 2, condition: -3, injuryRisk: 2 }, fight: { score: 3, finish: 0.02, damage: 1 } },
        { label: "Chercher le body lock", tag: "Stabiliser", result: "Tu colles au buste et retires l'equilibre du probleme.", effects: { condition: -2 }, fight: { score: 3, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "shoulder-post",
      category: "Bras",
      icon: "bone",
      round: 2,
      opponentStyles: ["wrestling", "sambo", "bjj"],
      title: "Epaule en appui",
      text: "Sur une defense de takedown, ton bras poste fort au sol. L'epaule tient, mais la prochaine chute peut faire mal.",
      options: [
        { label: "Arreter de poster", tag: "Sante", result: "Tu acceptes parfois la chute pour sauver l'epaule.", effects: { medicalCare: 3, condition: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
        { label: "Scramble quand meme", tag: "Urgence", result: "Tu refuses le controle au sol. L'effort est payant, mais brutal.", effects: { condition: -4, injuryRisk: 3 }, fight: { score: 4, finish: 0.015, damage: 2 } },
        { label: "Underhook et cage", tag: "Technique", result: "Tu changes la defense et travailles plus proprement.", effects: { stats: { wrestling: 1 }, condition: -2 }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "wrist-trap",
      category: "Sol",
      icon: "hand",
      round: 2,
      opponentStyles: ["bjj", "sambo", "wrestling"],
      title: "Poignet piege",
      text: "{opponent} isole un poignet au sol. Si tu paniques, le ground and pound ou la soumission arrive.",
      options: [
        { label: "Casser la prise", tag: "Technique", result: "Tu reviens aux bases: coude colle, hanche dehors, poignet libere.", effects: { stats: { grappling: 1 }, condition: -1 }, fight: { score: 3, finish: -0.005, damage: -1 } },
        { label: "Explosion de hanche", tag: "Scramble", result: "Tu sors fort. Le public aime, le cardio prend une claque.", effects: { hype: 2, condition: -4 }, fight: { score: 4, finish: 0.015, damage: 1 } },
        { label: "Fermer la garde", tag: "Survie", result: "Tu ralentis les degats et forces l'arbitre a observer.", effects: { condition: 1, hype: -1 }, fight: { score: 0, finish: -0.025, damage: -2 } },
      ],
    },
    {
      id: "rib-kick",
      category: "Corps",
      icon: "shield-alert",
      round: 2,
      opponentStyles: ["muay", "kickboxing", "karate"],
      title: "Cote touchee",
      text: "Un middle kick arrive sous le coude. La cote n'est pas cassee, mais chaque inspiration pique.",
      options: [
        { label: "Fermer le coude", tag: "Defense", result: "Tu reduis la cible et acceptes moins de counters.", effects: { medicalCare: 2, condition: -1 }, fight: { score: 1, finish: -0.02, damage: -2 } },
        { label: "Contrer en direct", tag: "Timing", result: "Tu veux lui faire payer le prochain kick au moment ou il part.", effects: { condition: -2 }, fight: { score: 4, finish: 0.025, damage: 0 } },
        { label: "Entrer en lutte", tag: "Corps-a-corps", result: "Tu coupes la distance et retires les middles du round.", effects: { condition: -3 }, fight: { score: 3, finish: -0.01, damage: -1 } },
      ],
    },
    {
      id: "solar-plexus-delay",
      category: "Corps",
      icon: "timer",
      round: 3,
      title: "Impact au plexus",
      text: "Le coup n'a pas l'air enorme, puis l'air sort d'un coup. Tu dois survivre a trente secondes tres longues.",
      options: [
        { label: "Accrocher la taille", tag: "Survie", result: "Tu verrouilles le corps et voles l'air necessaire.", effects: { condition: -1, medicalCare: 1 }, fight: { score: 1, finish: -0.025, damage: -2 } },
        { label: "Rendre au corps", tag: "Reponse", result: "Tu veux lui faire sentir la meme facture.", effects: { hype: 2, condition: -3 }, fight: { score: 3, finish: 0.025, damage: 1 } },
        { label: "Bouger sans frapper", tag: "Calme", result: "Tu sauves le moment avec des pas et des feintes.", effects: { condition: 1, hype: -1 }, fight: { score: 1, finish: -0.02, damage: -1 } },
      ],
    },
    {
      id: "fence-grab-choice",
      category: "Arbitre",
      icon: "grip",
      round: 2,
      planIds: ["wrestle", "grapple", "pressure", "balanced"],
      title: "Main dans la cage",
      text: "Sur une defense de takedown, tes doigts trouvent la cage. L'arbitre l'a peut-etre vu.",
      options: [
        { label: "Lacher tout de suite", tag: "Propre", result: "Tu perds un peu de position, mais tu gardes le round sans menace de point.", effects: { rep: 1, condition: -1 }, fight: { score: 1, finish: -0.015, damage: -1 } },
        { label: "Tenir une seconde", tag: "Limite", result: "Tu sauves la position en flirtant avec la faute.", effects: { hype: 1, rep: -2, condition: -2 }, fight: { score: 4, finish: 0.005, damage: 0 } },
        { label: "Tourner en underhook", tag: "Technique", result: "Tu remplaces la faute potentielle par une vraie position.", effects: { stats: { wrestling: 1 }, condition: -2 }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "grounded-knee-line",
      category: "Arbitre",
      icon: "badge-alert",
      round: 2,
      planIds: ["pressure", "wrestle", "balanced"],
      title: "Genou limite",
      text: "{opponent} a une main au sol pendant une sequence de cage. Le genou ferait exploser la salle, mais la regle est dangereuse.",
      options: [
        { label: "Verifier la main", tag: "Lucide", result: "Tu retiens le genou et choisis une frappe legale.", effects: { rep: 1, condition: -1 }, fight: { score: 2, finish: -0.005, damage: -1 } },
        { label: "Envoyer au corps", tag: "Legal", result: "Tu gardes l'agressivite sans offrir de faute gratuite.", effects: { condition: -2 }, fight: { score: 3, finish: 0.015, damage: 0 } },
        { label: "Prendre le risque", tag: "Dangereux", result: "Le public rugit, l'arbitre aussi. Si ca passe, le round marque fort.", effects: { hype: 4, rep: -4, injuryRisk: 2 }, fight: { score: 4, finish: 0.03, damage: 2 } },
      ],
    },
    {
      id: "stool-delay",
      category: "Coin",
      icon: "timer-reset",
      round: 3,
      maxCondition: 50,
      title: "Trop lent a quitter le tabouret",
      text: "Le coin sent que tu veux rester assis une seconde de plus. L'arbitre te regarde deja.",
      options: [
        { label: "Te lever net", tag: "Mental", result: "Tu caches la fatigue et sauves l'image.", effects: { morale: 2, condition: -2 }, fight: { score: 2, finish: 0.005, damage: 0 } },
        { label: "Gagner deux secondes", tag: "Recup", result: "Tu prends l'air qui manque, mais l'arbitre note le signal.", effects: { condition: 2, rep: -1, hype: -1 }, fight: { score: 0, finish: -0.025, damage: -1 } },
        { label: "Demander une consigne", tag: "Coin", result: "Tu maquilles la fatigue en clarification tactique.", effects: { stats: { iq: 1 }, condition: 1 }, fight: { score: 1, finish: -0.015, damage: -1 } },
      ],
    },
    {
      id: "durability-warning",
      category: "Sante",
      icon: "heart-crack",
      round: 3,
      maxStats: { durability: 55 },
      title: "Corps qui encaisse mal",
      text: "Chaque impact semble rester plus longtemps que d'habitude. La sante durable commence a parler en plein combat.",
      options: [
        { label: "Reduire les echanges", tag: "Long terme", result: "Tu acceptes moins de spectacle pour ne pas rajouter une couche a la dette physique.", effects: { medicalCare: 4, hype: -1 }, fight: { score: 1, finish: -0.03, damage: -3 } },
        { label: "Serrer les dents", tag: "Court terme", result: "Tu gardes le round vivant, mais le staff va detester le prix.", effects: { hype: 3, condition: -4, injuryRisk: 4 }, fight: { score: 3, finish: 0.025, damage: 2 } },
        { label: "Changer en lutte lente", tag: "Controle", result: "Tu ralentis le combat et cherches les positions qui frappent moins.", effects: { condition: -2 }, fight: { score: 3, finish: -0.015, damage: -2 } },
      ],
    },
    {
      id: "mental-freeze",
      category: "Mental",
      icon: "snowflake",
      round: 1,
      maxMorale: 42,
      title: "Blocage mental",
      text: "Les premieres feintes adverses te font hesiter. Le corps est la, la decision arrive trop tard.",
      options: [
        { label: "Revenir au plan A", tag: "Simple", result: "Tu t'accroches aux consignes de base et retires le brouillard.", effects: { morale: 2, stats: { discipline: 1 } }, fight: { score: 2, finish: -0.01, damage: -1 } },
        { label: "Provoquer pour te reveiller", tag: "Ego", result: "Tu utilises le theatre pour rallumer l'instinct.", effects: { hype: 3, morale: 2, condition: -2 }, fight: { score: 2, finish: 0.02, damage: 1 } },
        { label: "Ecouter seulement le coin", tag: "Cadre", result: "Tu coupes le bruit et suis les mots courts.", effects: { morale: 1, stats: { iq: 1 } }, fight: { score: 3, finish: -0.005, damage: -1 } },
      ],
    },
    {
      id: "championship-rounds",
      category: "Ceinture",
      icon: "trophy",
      round: 4,
      titleOnly: true,
      title: "Round de champion",
      text: "Quatrieme round. {opponent} a encore du souffle, toi aussi moins que prevu. C'est le genre de reprise qui decide une ceinture.",
      options: [
        { label: "Marquer l'histoire", tag: "Legacy", result: "Tu forces le rythme pour montrer qui possede la ceinture. Les juges adorent, le corps paie.", effects: { hype: 4, rep: 2, condition: -5, injuryRisk: 3 }, fight: { score: 5, finish: 0.035, damage: 2 } },
        { label: "Gerer en patron", tag: "Champion", result: "Tu acceptes moins de spectacle pour garder chaque minute sous controle.", effects: { rep: 1, condition: -2 }, fight: { score: 4, finish: -0.015, damage: -1 } },
        { label: "Chercher la finition", tag: "Finish", result: "Tu veux une defense qui reste dans les compilations. C'est magnifique si ca passe.", effects: { hype: 6, condition: -7, injuryRisk: 4 }, fight: { score: 4, finish: 0.075, damage: 3 } },
      ],
    },
  ];

  const SEASON_PLANS = [
    {
	      id: "standard",
	      label: "Saison construite",
	      tag: "4 a 5 combats",
	      summary: "Rythme stable, progression propre, usure controlee.",
      target: 4,
      purseMult: 1,
      effects: { morale: 2, condition: 2 },
    },
    {
	      id: "spotlight",
	      label: "Saison media",
	      tag: "4 a 6 combats",
	      summary: "Plus de media et de hype entre les camps.",
      target: 4,
      purseMult: 1.12,
      effects: { hype: 5, money: 5000, condition: -2, injuryRisk: 4 },
    },
    {
	      id: "marathon",
	      label: "Calendrier agressif",
	      tag: "6 a 8 combats",
	      summary: "Rythme charge, ranking plus rapide, corps expose.",
      target: 6,
      purseMult: 1.24,
      effects: { hype: 6, morale: -3, condition: -3, injuryRisk: 14 },
    },
    {
	      id: "clean",
	      label: "Saison propre",
	      tag: "3 a 4 combats",
	      summary: "Bourses plus faibles, corps protege, saison durable.",
	      target: 3,
	      purseMult: 0.85,
      effects: { condition: 5, medicalCare: 10, morale: -1, stats: { discipline: 1, durability: 1 } },
    },
  ];

  const TRAINING_FOCI = [
    {
      id: "striking",
      label: "Boxe et pieds-poings",
      tag: "Debout",
      summary: "Pattes d'ours, sparring leger, sorties d'angle. Meilleur debout, un peu plus d'usure.",
      result: "Le camp sonne plus propre: vos entrees debout deviennent moins lisibles.",
      load: 2,
      risk: 7,
      effects: { condition: -3, stats: { striking: 3, power: 1, durability: -1 } },
    },
    {
      id: "wrestling",
      label: "Lutte et cage control",
      tag: "Pression",
      summary: "Sprawls, chain wrestling, rounds contre la cage. Ca construit un moteur, mais ca fatigue.",
      result: "Vous imposez mieux les phases sales contre la cage.",
      load: 3,
      risk: 9,
      effects: { condition: -4, stats: { wrestling: 3, cardio: 1, durability: -1 } },
    },
    {
      id: "grappling",
      label: "Sol et soumissions",
      tag: "Sub",
      summary: "Scrambles, sorties de dos, attaques de bras. Progression technique nette.",
      result: "Votre sol devient plus menaçant, surtout dans les combats longs.",
      load: 2,
      risk: 5,
      effects: { condition: -2, stats: { grappling: 3, iq: 1 } },
    },
    {
      id: "conditioning",
      label: "Cardio et puissance",
      tag: "Moteur",
      summary: "Fractionne, sprints, musculation. Gros impact physique, moral moins haut.",
      result: "Le reservoir monte. Les fins de round deviennent moins floues.",
      load: 3,
      risk: 8,
      effects: { morale: -3, condition: -2, injuryRisk: 3, stats: { cardio: 3, power: 1, discipline: 1 } },
    },
	    {
	      id: "tactics",
	      label: "Video et game plan",
      tag: "IQ",
      summary: "Analyse adverse, repetitions tactiques, coin plus clair. Peu d'usure.",
      result: "Vous lisez mieux les adversaires et les decisions serrees.",
      load: 1,
      risk: 2,
	      effects: { condition: 2, stats: { iq: 3, discipline: 1 } },
	    },
	    {
	      id: "trash-media",
	      label: "Trash-talk reseaux",
	      tag: "Hype",
	      summary: "Clips, stories et piques ciblees. Tu vends le combat, tu perds une vraie semaine technique.",
	      result: "Les extraits tournent. Le public regarde plus, le coin travaille moins.",
	      load: 0,
	      risk: 1,
	      effects: { hype: 9, rep: -1, morale: 1, rivalry: 1, stats: { charisma: 2, discipline: -1 } },
	    },
	    {
	      id: "sparring",
      label: "Sparring partenaire",
      tag: "Live",
      summary: "Partenaire qui mime l'adversaire. Tres utile, parfois trop reel.",
      result: "Le timing contre ce style devient plus naturel, mais les rounds laissent des marques.",
      load: 3,
      risk: 11,
      effects: { condition: -5, morale: 1, injuryRisk: 5, stats: { iq: 2, chin: 1, durability: -1 } },
    },
    {
      id: "specialist",
      label: "Coach specialiste",
      tag: "Staff",
      summary: "Un coach externe corrige un secteur precis. Cher, puissant, limite a une fois par camp.",
      result: "Le coin gagne en clarte. La facture pique, mais le plan devient meilleur.",
      load: 1,
      risk: 1,
      effects: { money: -6500, condition: 1, medicalCare: 2, stats: { iq: 2, discipline: 1 } },
    },
    {
      id: "recovery",
      label: "Recuperation active",
      tag: "Sante",
      summary: "Physio, sommeil, mobilité. Moins de progression, plus de fraicheur.",
      result: "Le corps revient. Vous perdez un peu de tranchant, mais la saison respire.",
      load: -2,
      risk: 0,
      effects: { morale: 3, condition: 9, medicalCare: 8, stats: { durability: 3, cardio: -1 } },
    },
  ];

  const BOXING_OPPONENTS = [
    { name: "Mason Vale", record: "49-0", trait: "roi du pay-per-view" },
    { name: "Ciro Bellini", record: "42-1", trait: "technicien clinique" },
    { name: "Oskar Flint", record: "38-0", trait: "trash-talker invaincu" },
    { name: "Viktor Lanes", record: "44-2", trait: "veteran des megafights" },
  ];

  const BOXING_PREP = [
    {
      id: "boxing-footwork",
      label: "Appuis d'anglaise",
      tag: "Ring",
      summary: "Cordes, angles courts, sorties de coin. Le MMA ne sauvera personne ici.",
      result: "Les appuis deviennent moins paniques sous les gants de boxe.",
      load: 2,
      risk: 5,
      chance: 3,
      effects: { condition: -2, stats: { striking: 2, iq: 1 } },
    },
    {
      id: "boxing-defense",
      label: "Defense haute",
      tag: "Survie",
      summary: "Gants colles, epaules hautes, lecture des feintes. Objectif: tenir dans la tempete.",
      result: "Vous absorbez mieux les sequences longues, meme si le camp devient mentalement lourd.",
      load: 1,
      risk: 2,
      chance: 2,
      effects: { morale: -1, condition: 1, stats: { chin: 2, iq: 1 } },
    },
    {
      id: "dirty-clinch",
      label: "Clinch sale",
      tag: "Limite",
      summary: "Casser le rythme, coller, pousser, faire raler l'arbitre sans perdre de point.",
      result: "Le plan devient plus rugueux. Les sparrings aussi.",
      load: 3,
      risk: 11,
      chance: 4,
      effects: { rep: -1, condition: -4, injuryRisk: 4, stats: { power: 1, chin: 1 } },
    },
    {
      id: "mma-detox",
      label: "Detox MMA",
      tag: "Focus",
      summary: "Trois semaines sans kicks, sans shoots reflexes, sans grappling interdit.",
      result: "Le cerveau arrete de chercher la double-leg au mauvais moment.",
      load: 0,
      risk: 1,
      chance: 2,
      effects: { hype: -1, condition: 3, stats: { discipline: 2, cardio: 1 } },
    },
  ];

	  const BOXING_PRESS_OPTIONS = [
    {
      id: "respect",
      label: "Respect glacial",
      tag: "Pro",
      result: "Vous vendez le combat sans perdre le camp. Moins de clips, plus de calme.",
      chance: 2,
      effects: { rep: 3, hype: -2, condition: 2, stats: { iq: 1, discipline: 1 } },
    },
    {
      id: "trash",
      label: "Punchlines partout",
      tag: "Buzz",
      result: "Les extraits tournent. Le public veut voir le boxeur vous punir.",
      chance: 0,
      effects: { hype: 10, morale: 3, injuryRisk: 3, stats: { charisma: 2 } },
    },
    {
      id: "staredown-chaos",
      label: "Face-off qui derape",
      tag: "Chaos",
      result: "Les vigiles se jettent entre les camps. La bourse survit, l'amende aussi.",
      chance: -1,
      effects: { hype: 15, money: -12000, rep: -5, injuryRisk: 6, scandal: 8 },
    },
	  ];

	  const PRESS_OPTIONS = [
	    {
	      id: "calm-respect",
	      label: "Calme respectueux",
	      tag: "Pro",
	      summary: "Tu vends le niveau sportif, sans fabriquer de haine.",
	      result: "La conference reste propre. Moins de clips, plus de credibilite aupres des officiels et des sponsors prudents.",
	      effects: { rep: 3, hype: -1, condition: 1, stats: { iq: 1, discipline: 1 } },
	      fight: { score: 1, damage: -1 },
	    },
	    {
	      id: "sharp-punchline",
	      label: "Punchline maitrisee",
	      tag: "Buzz",
	      summary: "Une phrase courte, reprise partout, sans partir en vrille.",
	      result: "La phrase tourne toute la nuit. Le combat grossit sans que la commission ne sorte le carnet.",
	      effects: { hype: 7, morale: 2, rivalry: 1, stats: { charisma: 2 } },
	      fight: { score: 1, finish: 0.01 },
	    },
	    {
	      id: "personal-trash",
	      label: "Attaque personnelle",
	      tag: "Risque",
	      summary: "Tu piques l'ego adverse et tu acceptes le retour de flamme.",
	      result: "La salle reagit fort. Le combat se vend mieux, mais l'adversaire arrive avec plus de carburant.",
	      effects: { hype: 11, rep: -3, morale: 2, rivalry: 2, injuryRisk: 2, stats: { charisma: 2, discipline: -1 } },
	      fight: { score: 0, finish: 0.018, damage: 1 },
	    },
	    {
	      id: "bottle-chaos",
	      label: "Lancer une bouteille",
	      tag: "Chaos",
	      summary: "Image virale immediate, amende probable, entourage sous tension.",
	      result: "Les vigiles coupent la conference. Les clips explosent, les officiels notent votre nom en rouge.",
	      effects: { hype: 16, rep: -8, money: -9000, scandal: 10, injuryRisk: 5, stats: { charisma: -1, discipline: -2 } },
	      fight: { score: -1, finish: 0.025, damage: 2 },
	    },
	    {
	      id: "staredown-push",
	      label: "Bousculade au face-off",
	      tag: "Commission",
	      summary: "Tu ne recules pas au front contre front. Tout peut deraper.",
	      result: "Le face-off devient une melee courte. L'affiche chauffe, la commission aussi.",
	      effects: { hype: 13, rep: -5, money: -6000, scandal: 7, injuryRisk: 4, rivalry: 2, stats: { discipline: -2 } },
	      fight: { score: 0, finish: 0.02, damage: 2 },
	    },
	  ];

	  const MEDICAL_PROTOCOLS = [
    {
      id: "expert-team",
      label: "Equipe medicale premium",
      tag: "Cher",
      summary: "Imagerie, physio, reprise au capteur et coach charge de travail.",
      result: "Le retour est propre. Le compte bancaire encaisse, le corps remercie.",
      effects: { money: -18000, condition: 12, medicalCare: 18, stats: { durability: 3, discipline: 1 } },
    },
    {
      id: "specialist-abroad",
      label: "Specialiste a l'etranger",
      tag: "Elite",
      summary: "Un expert repute accepte le dossier, avec voyage et protocole sur mesure.",
      result: "Le diagnostic est plus fin et la reprise gagne en securite.",
      effects: { money: -42000, hype: 2, condition: 15, medicalCare: 26, stats: { durability: 5, iq: 1 } },
    },
    {
      id: "mental-reset",
      label: "Reset mental",
      tag: "Calme",
      summary: "Repos, psy du sport, sommeil, respiration. Moins spectaculaire, tres utile.",
      result: "La tete revient avec le corps. Le camp suivant partira de plus bas en stress.",
      effects: { money: -8000, morale: 11, condition: 8, medicalCare: 10, stats: { discipline: 2, iq: 1 } },
    },
    {
      id: "old-school",
      label: "A l'ancienne",
      tag: "Risque",
      summary: "Glace, strap, mental dur. Peu cher, mais le risque residuel reste dans les articulations.",
      result: "Vous gagnez du temps et gardez votre cash, mais le corps n'oublie pas.",
      effects: { money: -1200, morale: 6, condition: 4, injuryRisk: 12, stats: { discipline: -1 } },
      relapseChance: 18,
    },
  ];

  const LIFE_EVENTS = [
    {
      id: "diet-cheat",
      category: "Diete",
      title: "Ecart pendant le camp",
      text: "Apres deux semaines strictes, le clan commande burgers et desserts. Vous etes a quelques jours du combat.",
      options: [
        { label: "Se faire plaisir", tag: "Joie", result: "Le moral remonte. Le cardio du camp prend une petite claque.", effects: { morale: 8, condition: -3, stats: { cardio: -1, discipline: -1 } } },
        { label: "Rester strict", tag: "Pro", result: "Personne ne vous applaudit, mais la pesee devient plus simple.", effects: { condition: 3, stats: { discipline: 2, cardio: 1 }, morale: -2 } },
      ],
    },
    {
      id: "manager-loyalty",
      category: "Relations",
      title: "Manager historique",
      text: "Votre manager des debuts veut prolonger. Un gros agent promet plus d'argent, mais moins de patience.",
      options: [
        { label: "Garder l'historique", tag: "Loyal", result: "Les negotiations restent calmes. Vous perdez peut-etre un raccourci.", effects: { morale: 6, rep: 2, hype: -2, stats: { discipline: 1 } } },
        { label: "Signer le gros agent", tag: "Business", result: "Les coups de fil changent de niveau. La relation avec l'ancien camp se refroidit.", effects: { money: 18000, hype: 7, morale: -4, rep: -1 } },
      ],
    },
    {
      id: "friend-restaurant",
      category: "Argent",
      title: "Le restaurant du pote",
      text: "Un ami d'enfance veut ouvrir un restaurant healthy pour combattants. Il lui manque un investisseur.",
      options: [
        { label: "Investir", tag: "Risque", result: "Tout le quartier vous remercie. Le compte bancaire respire moins.", effects: { money: -20000, morale: 6, rep: 3, stats: { charisma: 1 } }, delayed: { kind: "restaurant", title: "Restaurant du pote", stake: 20000 } },
        { label: "Refuser doucement", tag: "Prudent", result: "Vous gardez votre cash. L'ambiance au groupe est un peu moins chaude.", effects: { money: 3000, morale: -3, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "local-gym-shares",
      category: "Argent",
      title: "Parts dans une salle locale",
      text: "Un ancien partenaire ouvre une salle MMA dans votre quartier. Il propose de vous laisser entrer au capital avant l'ouverture.",
      minTier: 1,
      options: [
        { label: "Entrer au capital", tag: "Investir", result: "Vous devenez plus qu'un combattant dans le quartier. Le compte baisse, le nom reste sur la vitrine.", effects: { money: -30000, morale: 3, rep: 4, stats: { charisma: 1 } }, delayed: { kind: "gym", title: "Salle locale", stake: 30000 } },
        { label: "Garder le cash", tag: "Prudent", result: "Vous soutenez le projet sans signer de cheque. Le staff prefere garder une marge pour les camps.", effects: { money: 2000, stats: { discipline: 1 }, morale: -1 } },
      ],
    },
    {
      id: "streetwear-drop",
      category: "Business",
      title: "Marque de fringues du crew",
      text: "Un pote lance une capsule streetwear autour du combat. Les maquettes sont propres, le business plan beaucoup moins.",
      minHype: 12,
      options: [
        { label: "Financer le drop", tag: "Image", result: "Le crew a son logo, les fans veulent le hoodie. Reste a voir si les stocks partent vraiment.", effects: { money: -15000, hype: 5, morale: 4, stats: { charisma: 2, discipline: -1 } }, delayed: { kind: "clothing", title: "Drop du crew", stake: 15000 } },
        { label: "Faire juste la promo", tag: "Sobre", result: "Vous postez la capsule sans prendre le risque financier.", effects: { hype: 2, rep: 1, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "media-channel",
      category: "Business",
      title: "Emission MMA du cousin",
      text: "Votre cousin veut monter une emission YouTube de coulisses. Il demande un petit billet et un acces au camp.",
      minHype: 8,
      options: [
        { label: "Ouvrir le camp", tag: "Media", result: "Les cameras gagnent une place au bord du tapis. Ca peut fabriquer une fanbase, ou aspirer votre calme.", effects: { money: -10000, hype: 4, morale: -1, stats: { charisma: 2, discipline: -1 } }, delayed: { kind: "media", title: "Emission du cousin", stake: 10000 } },
        { label: "Refuser l'acces", tag: "Focus", result: "Le camp reste ferme. Pas de contenu, pas de distraction.", effects: { condition: 2, stats: { discipline: 2 }, hype: -1 } },
      ],
    },
    {
      id: "sparring-app",
      category: "Business",
      title: "Appli de sparring",
      text: "Un jeune manager veut lancer une appli qui reserve des partenaires de sparring fiables. Le concept est malin, le marche encore flou.",
      minTier: 1,
      options: [
        { label: "Mettre un ticket", tag: "Investir", result: "Votre nom devient la caution combat du projet. Si les clubs suivent, le retour peut etre propre.", effects: { money: -12000, rep: 2, hype: 2, stats: { charisma: 1 } }, delayed: { kind: "sparringApp", title: "Appli de sparring", stake: 12000 } },
        { label: "Tester sans payer", tag: "Prudent", result: "Vous gardez le contact sans mettre la tresorerie en danger.", effects: { rep: 1, condition: 1, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "physio-studio",
      category: "Recuperation",
      title: "Cabinet de recup du kine",
      text: "Votre kine ouvre un cabinet specialise combattants: cryo, mobilite, suivi sommeil. Il propose une petite part contre votre soutien.",
      minTier: 1,
      options: [
        { label: "Entrer au projet", tag: "Sante", result: "Vous payez cher, mais le staff gagne un vrai point d'appui medical pour la suite.", effects: { money: -24000, medicalCare: 7, rep: 2, morale: 2, stats: { durability: 1 } }, delayed: { kind: "physioStudio", title: "Cabinet de recup", stake: 24000 } },
        { label: "Rester simple client", tag: "Budget", result: "Vous profitez du soin sans porter le risque financier du local.", effects: { money: -3000, medicalCare: 4, condition: 2 } },
      ],
    },
    {
      id: "mouthguard-brand",
      category: "Business",
      title: "Marque de protege-dents",
      text: "Un equipementier local veut sortir un protege-dents a votre nom. Les marges peuvent etre bonnes, mais un produit rate se paie en image.",
      minHype: 10,
      options: [
        { label: "Signer en royalties", tag: "Image", result: "Vous prenez moins de cash tout de suite, mais chaque vente peut compter a la fin de saison.", effects: { hype: 3, rep: 1, stats: { charisma: 1 } }, delayed: { kind: "mouthguard", title: "Protege-dents signature", stake: 0 } },
        { label: "Acheter du stock", tag: "Risque", result: "Le gain potentiel monte, les cartons dans le garage aussi.", effects: { money: -18000, hype: 5, stats: { charisma: 2, discipline: -1 } }, delayed: { kind: "mouthguardStock", title: "Stock protege-dents", stake: 18000 } },
      ],
    },
    {
      id: "family-night",
      category: "Vie perso",
      title: "Anniversaire familial",
      text: "Votre famille organise une grande soiree la veille d'un gros sparring. Y aller compte vraiment pour eux.",
      options: [
        { label: "Y aller vraiment", tag: "Humain", result: "Le coeur est plein, les jambes un peu lourdes.", effects: { morale: 9, condition: -4, stats: { charisma: 1 } } },
        { label: "Passer une heure", tag: "Equilibre", result: "Vous sauvez le lien sans casser le camp.", effects: { morale: 3, condition: 1, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "relationship-pressure",
      category: "Relations",
      title: "Couple sous pression",
      text: "Votre relation supporte mal les absences et la coupe de poids. Il faut choisir comment gerer.",
      options: [
        { label: "Prendre une vraie journee off", tag: "Calme", result: "Le moral revient. Le camp perd une repetition.", effects: { morale: 8, condition: 3, stats: { striking: -1, wrestling: -1 } } },
        { label: "Rester au camp", tag: "Obsede", result: "Le staff adore votre focus. A la maison, beaucoup moins.", effects: { stats: { discipline: 2, cardio: 1 }, morale: -6 } },
      ],
    },
    {
      id: "old-coach-offer",
      category: "Staff",
      title: "Changer de coach principal",
      text: "Un coach plus cote propose de prendre les commandes. Votre coach actuel vous a construit.",
      options: [
        { label: "Changer de coach", tag: "Upgrade", result: "Les seances deviennent plus modernes, mais le vestiaire tousse.", effects: { money: -12000, morale: -5, stats: { iq: 3, striking: 1, wrestling: 1 } } },
        { label: "Rester fidele", tag: "Confiance", result: "La progression est moins spectaculaire, la relation plus forte.", effects: { morale: 6, stats: { discipline: 2, durability: 1 } } },
      ],
    },
    {
      id: "media-beef",
      category: "Image",
      title: "Podcast qui provoque",
      text: "Un podcast MMA veut vous faire reagir a une attaque d'un rival. La punchline est facile.",
      options: [
        { label: "Allumer le rival", tag: "Buzz", result: "Les extraits tournent. Le prochain combat se vend tout seul.", effects: { hype: 9, rep: 2, morale: 1, rivalry: 1 } },
        { label: "Rester froid", tag: "Pro", result: "Moins de clics, plus de respect dans les salles.", effects: { rep: 3, stats: { iq: 1, discipline: 1 }, hype: -1 } },
      ],
    },
	    {
	      id: "bad-friends",
	      category: "Entourage",
	      title: "Mauvais entourage",
	      text: "Des amis veulent vous trainer en club apres une victoire. Le camp reprend lundi matin.",
	      options: [
	        { label: "Sortir avec eux", tag: "Joie", result: "Super nuit. Lundi matin, moins super.", effects: { morale: 7, hype: 2, condition: -7, injuryRisk: 10, stats: { discipline: -2 } }, risk: { injuryChance: 12, severity: 5, source: "sortie en club" } },
	        { label: "Rentrer dormir", tag: "Discipline", result: "Pas d'histoire a raconter, mais le corps remercie.", effects: { condition: 5, stats: { discipline: 2, cardio: 1 }, morale: -1 } },
	      ],
	    },
	    {
	      id: "boxing-crossover",
	      category: "People",
	      title: "Gala de boxe contre le maitre des billets",
	      text: "Un champion invaincu de boxe anglaise vous propose une nuit sous les projecteurs. Le cheque est absurde, les regles ne sont pas les votres.",
	      standalone: true,
	      minTier: 2,
	      minHype: 28,
	      options: [
	        { label: "Signer en anglaise", tag: "Cash", result: "Vous partez sur son terrain. Presque personne ne vous donne gagnant, mais la bourse change une vie.", effects: { money: 220000, hype: 16, condition: -5, injuryRisk: 8, stats: { charisma: 4, cardio: -2 } }, special: { kind: "boxing-crossover", winChance: 8 }, risk: { injuryChance: 8, severity: 5, source: "gala de boxe" } },
	        { label: "Refuser et chambrer", tag: "MMA", result: "Vous gardez votre sport et transformez le refus en punchline.", effects: { rep: 4, morale: 4, hype: -3, stats: { discipline: 1, iq: 1 } } },
	      ],
	    },
	    {
	      id: "foot-shard",
	      category: "Incident",
	      title: "Eclat dans la semelle",
	      text: "Pendant l'echauffement, un petit corps etranger vous gene sous le pied. Ridicule a expliquer, tres reel quand il faut pivoter.",
	      requiresFight: true,
	      options: [
	        { label: "Signaler tout de suite", tag: "Prudent", result: "Le staff nettoie, les cameras se moquent un peu, mais vous evitez le pire.", effects: { rep: -1, hype: -2, condition: 1, medicalCare: 3, stats: { discipline: 1 } } },
	        { label: "Faire comme si de rien n'etait", tag: "Orgueil", result: "Vous refusez de donner une excuse au public. Chaque appui devient un pari.", effects: { hype: 2, condition: -3, injuryRisk: 12, stats: { striking: -1, cardio: -1 } }, risk: { injuryChance: 22, severity: 7, source: "appui blesse" } },
	      ],
	    },
	    {
	      id: "night-test",
	      category: "Scandale",
	      title: "Controle a l'aube",
	      text: "Un controle hors competition tombe apres une periode de nuits floues. Les sponsors demandent une explication avant meme le manager.",
	      minTier: 2,
	      minHype: 20,
	      options: [
	        { label: "Tout dire et entrer en protocole", tag: "Rehab", result: "L'image prend un coup, mais le camp accepte de vous remettre droit.", effects: { rep: -8, hype: -5, morale: -4, medicalCare: 8, restWeeks: 4, scandal: 8, stats: { charisma: -6, discipline: 1 } } },
	        { label: "Nier et attaquer", tag: "Avocats", result: "La defense occupe les emissions. Le stress, lui, reste dans les jambes.", effects: { money: -35000, hype: 4, rep: -12, injuryRisk: 16, scandal: 14, stats: { charisma: -4, discipline: -2 } }, risk: { injuryChance: 16, severity: 5, source: "stress de scandale" } },
	      ],
	    },
	    {
	      id: "media-bus-melee",
	      category: "Scandale",
	      title: "Chariot dans le parking",
	      text: "Fight week derape: ton clan croise le bus adverse dans les coulisses. Un chariot traine, les telephones filment deja.",
	      requiresFight: true,
	      minFightHype: 12,
	      options: [
	        { label: "Suivre le clan", tag: "Chaos", result: "Le clip explose. La commission aussi.", effects: { hype: 15, rep: -8, money: -25000, restWeeks: 3, rivalry: 2, injuryRisk: 6, scandal: 14 } },
	        { label: "Bloquer tout le monde", tag: "Pro", result: "Vous perdez un moment viral, mais le vestiaire sait qui tient la laisse.", effects: { rep: 5, hype: -2, morale: -3, stats: { discipline: 2, iq: 1 }, rivalry: -1 } },
	      ],
	    },
	    {
	      id: "cage-jump",
	      category: "Scandale",
	      title: "La barriere disparait",
	      text: "Apres une semaine de provocations, un rival insulte votre coin. Une seconde de trop, et tout le monde regarde la barriere.",
	      needsRival: true,
	      minHype: 25,
	      options: [
	        { label: "Sauter dans le bruit", tag: "Viral", result: "L'image fait le tour du monde. Le cheque de la commission aussi.", effects: { hype: 18, rep: -10, restWeeks: 2, rivalry: 2, injuryRisk: 4, scandal: 12 } },
	        { label: "Rester dans la cage", tag: "Champion", result: "La rivalite chauffe, mais vous laissez l'autre passer pour l'amateur.", effects: { rep: 5, morale: 2, stats: { iq: 2, discipline: 2 }, rivalry: 1 } },
	      ],
	    },
		    {
		      id: "tainted-supplement",
		      category: "Diete",
		      title: "Complement trouble",
		      text: "Un complement legal ressort suspect au labo. Le produit vient d'une marque que tout le vestiaire utilise.",
	      minTier: 1,
	      options: [
	        { label: "Publier les analyses", tag: "Transparence", result: "Vous exposez le dossier, payez les tests et sauvez une partie de l'image.", effects: { money: -8000, rep: 5, hype: -2, medicalCare: 4, stats: { discipline: 1 } } },
		        { label: "Garder ca discret", tag: "Court terme", result: "Le combat reste en vie, mais la suspicion colle aux gants.", effects: { rep: -6, hype: 2, scandal: 8, injuryRisk: 10, stats: { charisma: -2 } }, risk: { injuryChance: 12, severity: 5, source: "protocole supplement" } },
		      ],
		    },
		    {
		      id: "doctor-protocol",
		      category: "Dopage",
		      title: "Protocole trop efficace",
		      text: "Un preparateur discret promet une recuperation anormale et une puissance qui revient trop vite. Le manager comprend sans demander le nom des produits.",
		      minTier: 1,
		      options: [
		        { label: "Refuser net", tag: "Propre", result: "Vous perdez le raccourci, mais le vestiaire comprend que la carriere restera defendable.", effects: { rep: 2, condition: -1, stats: { discipline: 2, durability: 1 } } },
		        { label: "Prendre le protocole", tag: "Interdit", result: "La forme revient comme par magie. Le dossier anti-dopage, lui, commence a peser sur chaque sonnette du matin.", effects: { condition: 8, injuryRisk: 8, scandal: 5, dopingRisk: 24, doping: 1, stats: { cardio: 3, power: 2, durability: -2, discipline: -3 } }, risk: { injuryChance: 10, severity: 5, source: "protocole interdit" } },
		      ],
		    },
		    {
		      id: "under-cage-control",
		      category: "Dopage",
		      title: "Inspecteurs a la porte",
		      text: "Des agents de controle arrivent a la salle sans prevenir. Un coach panique montre la cage du doigt et souffle: personne ne regarde dessous.",
		      minTier: 1,
		      minDopingRisk: 12,
		      options: [
		        { label: "Ouvrir la porte", tag: "Assumer", result: "Vous acceptez le controle. Si le dossier est propre, l'image respire. Sinon, la commission aura la main.", effects: { dopingRisk: -10, rep: 1, morale: -2, medicalCare: 2 }, risk: { dopingChance: 18, source: "controle hors competition" } },
		        { label: "Se cacher sous la cage", tag: "Panique", result: "Le controle est evite aujourd'hui, mais l'histoire fuit dans les salles. Les memes agents reviendront moins polis.", effects: { dopingRisk: 14, scandal: 10, rep: -5, morale: -4, stats: { discipline: -2, charisma: -2 } } },
		      ],
		    },
		    {
		      id: "steakhouse-beef",
		      category: "Relations",
		      title: "Embrouille au steakhouse",
	      text: "Un ancien partenaire devenu rival dine a quelques tables. Il parle trop fort de votre famille et de votre camp.",
	      needsRival: true,
	      options: [
	        { label: "Regler ca dehors", tag: "Rue", result: "Le public adore le folklore, les avocats beaucoup moins.", effects: { hype: 9, rep: -7, money: -15000, restWeeks: 2, rivalry: 2, injuryRisk: 4, scandal: 10 } },
	        { label: "Laisser la securite", tag: "Froid", result: "Vous avalez votre ego. Le camp reste propre.", effects: { rep: 4, morale: -2, stats: { iq: 1, discipline: 2 } } },
	      ],
	    },
	    {
	      id: "sponsor-night",
	      category: "People",
	      title: "Nuit sponsorisee",
	      text: "Une marque paie une soiree privee avec influenceurs, flashs et bouteilles. Le lendemain, sparring dur.",
	      minHype: 15,
	      options: [
	        { label: "Faire la tournee", tag: "Cash", result: "Argent facile, buzz facile, recuperation beaucoup moins facile.", effects: { money: 14000, hype: 7, morale: 5, condition: -8, injuryRisk: 14, scandal: 4, stats: { discipline: -2 } }, risk: { injuryChance: 18, severity: 5, source: "nuit sponsorisee" } },
	        { label: "Rentrer tot", tag: "Focus", result: "Le sponsor rale, le cardio non.", effects: { hype: -2, morale: -1, condition: 3, stats: { discipline: 2, cardio: 1 } } },
	      ],
	    },
	    {
	      id: "recovery-clinic",
	      category: "Recuperation",
	      title: "Clinique de recuperation",
	      text: "Votre corps commence a envoyer des factures. Un medecin du sport propose un vrai bilan: imagerie, physio, protocole sommeil.",
	      minInjuryRisk: 10,
	      options: [
	        { label: "Payer le protocole complet", tag: "Sante", result: "La note pique, mais vous retirez de la dette invisible du corps.", effects: { money: -18000, condition: 8, medicalCare: 16, stats: { durability: 4, discipline: 1 }, morale: -1 } },
	        { label: "Faire le minimum", tag: "Budget", result: "Un strap, deux seances, et on espere que ca tienne.", effects: { money: -2000, condition: 2, medicalCare: 5, morale: 2 } },
	      ],
	    },
	    {
	      id: "sleep-coach",
	      category: "Recuperation",
	      title: "Coach sommeil et nutrition",
	      text: "Un specialiste veut couper les sorties, regler les repas et imposer des heures de coucher ridicules.",
	      minInjuryRisk: 8,
	      options: [
	        { label: "Accepter le cadre", tag: "Pro", result: "La vie devient moins fun. Le corps, lui, applaudit en silence.", effects: { morale: -3, condition: 7, medicalCare: 10, stats: { cardio: 1, discipline: 2, durability: 2 } } },
	        { label: "Garder votre rythme", tag: "Libre", result: "Vous gardez le controle de vos soirees, et un peu trop de hasard.", effects: { morale: 4, hype: 1, injuryRisk: 6, stats: { discipline: -1 } } },
	      ],
	    },
	    {
	      id: "hotel-extinguisher",
	      category: "Scandale",
	      title: "Suite d'hotel retournee",
		      text: "Apres une carte a l'etranger, ton entourage transforme l'etage en after. Meubles casses, extincteurs vides, reception en panique.",
		      minHype: 10,
		      options: [
		        { label: "Regler les degats", tag: "Discret", result: "Tu paies l'hotel, tu coupes l'after et le staff impose un couvre-feu. L'affaire reste locale, mais les insiders savent que tu as assume.", effects: { money: -18000, morale: -3, rep: 1, hype: 2, scandal: 5, medicalCare: 2, stats: { discipline: 1, charisma: 1 } } },
		        { label: "Assumer la nuit en story", tag: "Chaos", result: "Les videos tournent partout. Sportivement c'est sale, mediatiquement tout le monde parle de toi.", effects: { hype: 16, money: -28000, rep: 2, condition: -6, injuryRisk: 8, scandal: 16, stats: { charisma: 3, discipline: -2 } } },
		      ],
		    },
	    {
	      id: "fan-phone",
	      category: "People",
	      title: "Telephone devant l'hotel",
	      text: "A cinq heures du matin, un fan insiste pour filmer. Le flash part trop pres du visage. Les vigiles regardent ta main.",
	      minHype: 18,
	      options: [
	        { label: "Respirer et signer la coque", tag: "Controle", result: "Le clip devient presque sympathique. Le manager souffle enfin.", effects: { rep: 4, morale: -1, stats: { discipline: 2, charisma: 1 } } },
	        { label: "Exploser le telephone", tag: "Amende", result: "Le geste devient viral avant le petit-dejeuner. Police, amende, sponsor nerveux.", effects: { hype: 8, money: -12000, rep: -9, scandal: 12, stats: { charisma: -2, discipline: -1 } } },
	      ],
	    },
	    {
	      id: "airport-drunk",
	      category: "Scandale",
	      title: "Incident a l'aeroport",
	      text: "Apres une tournee media, une altercation alcoolisee eclate a l'aeroport. L'organisation propose un programme d'aide avant que l'histoire ne grossisse.",
	      minHype: 14,
	      options: [
	        { label: "Accepter le programme", tag: "Aide", result: "L'image prend une gifle, mais le vestiaire respecte la prise de controle.", effects: { rep: -4, hype: -2, morale: -2, medicalCare: 10, restWeeks: 2, scandal: 6, stats: { discipline: 2 } } },
	        { label: "Tout nier en story", tag: "Ego", result: "Les fans commentent, les sponsors relisent le contrat, le sommeil part en morceaux.", effects: { hype: 6, rep: -10, condition: -5, injuryRisk: 10, scandal: 14, stats: { charisma: -3, discipline: -2 } } },
	      ],
	    },
	    {
	      id: "parking-incident",
	      category: "Justice",
	      title: "Accrochage au parking",
	      text: "La sortie d'un gala tourne mal: voiture touchee, camera de securite, staff qui te demande de rester sur place.",
	      minTier: 2,
	      options: [
	        { label: "Rester et cooperer", tag: "Responsable", result: "Tu rates une semaine de camp, mais le dossier reste sous controle.", effects: { money: -15000, rep: -2, restWeeks: 1, scandal: 4, stats: { discipline: 1 } } },
	        { label: "Partir avant la police", tag: "Tres risque", result: "La fuite coute plus cher que l'accident. La commission bloque ton agenda.", effects: { money: -45000, rep: -18, hype: -8, restWeeks: 6, locked: 1, scandal: 24, stats: { charisma: -5, discipline: -3 } } },
	      ],
	    },
	    {
	      id: "presser-bottles",
	      category: "Media",
	      title: "Conference annulee",
	      text: "Backstage, deux camps se croisent avant les face-offs. Une bouteille vole, puis une deuxieme. La prod coupe les micros.",
	      requiresFight: true,
	      minFightHype: 14,
	      options: [
	        { label: "Rester derriere la securite", tag: "Pro", result: "Moins de viral, plus de controle. La commission note le calme.", effects: { rep: 4, hype: -1, stats: { iq: 1, discipline: 2 } } },
	        { label: "Rejoindre le chaos", tag: "Viral", result: "La conference saute. Les images vendent le combat, les officiels detestent.", effects: { hype: 14, rep: -7, money: -10000, rivalry: 2, injuryRisk: 6, scandal: 12 }, risk: { injuryChance: 14, severity: 4, source: "melee backstage" } },
	      ],
	    },
	    {
	      id: "taxi-joyride",
	      category: "People",
	      title: "Taxi devant l'hotel",
	      text: "Fin de soiree. Un taxi attend moteur allume devant l'hotel pendant que le chauffeur parle au receptionniste. Un ami veut te filmer en train de faire semblant de partir avec.",
	      minHype: 12,
	      options: [
	        { label: "Suivre le coach", tag: "Propre", result: "Tu rentres sans clip viral. Le staff garde le camp calme et ton corps recupere.", effects: { condition: 3, medicalCare: 4, morale: -1, stats: { discipline: 1 } } },
	        { label: "Faire la blague au volant", tag: "Viral sale", result: "La video donne l'impression que tu voles un taxi. Amende, excuses publiques et sommeil ruine.", effects: { hype: 9, money: -9000, rep: -6, condition: -4, scandal: 9, injuryRisk: 7, stats: { discipline: -2 } }, risk: { injuryChance: 10, severity: 4, source: "retour de soiree" } },
	      ],
	    },
	  ];

  const EVENTS = [
    {
      id: "viral-sparring",
      title: "Sparring viral",
      text: "Un partenaire fuit la salle apres un knockdown en sparring. La video peut sortir ce soir.",
      options: [
        { label: "Publier le clip", tag: "Hype", result: "Le public adore. Le coach, beaucoup moins.", effects: { hype: 9, rep: 3, morale: -4, stats: { discipline: -1 } } },
        { label: "Proteger la salle", tag: "Loyal", result: "Le vestiaire vous respecte. Personne ne verra le highlight.", effects: { morale: 5, stats: { discipline: 2 }, hype: -2 } },
      ],
    },
    {
      id: "weight-cut",
      title: "Coupe de poids sale",
      text: "A trois jours de la pesee, il reste trop de kilos. Le staff propose une coupe brutale.",
      requiresFight: true,
      options: [
        { label: "Forcer la coupe", tag: "Pro", result: "Vous faites le poids, mais le corps encaisse.", effects: { rep: 2, stats: { durability: -4, cardio: -2 }, morale: -3 } },
        { label: "Monter de categorie", tag: "Sante", result: "Les puristes critiquent, vos reins disent merci.", effects: { hype: -2, stats: { durability: 3, chin: 1 }, morale: 4 } },
      ],
    },
    {
      id: "short-notice",
      title: "Appel a minuit",
      text: "Une grosse organisation cherche un remplacant. Dix jours de camp, adversaire dangereux.",
      options: [
        { label: "Signer tout de suite", tag: "Audace", result: "Le telephone chauffe. Tout le monde connait votre nom avant meme le combat.", effects: { hype: 12, rep: 4, stats: { durability: -2 } } },
        { label: "Refuser le piege", tag: "Patient", result: "Le manager rale, mais votre progression reste intacte.", effects: { morale: 3, stats: { discipline: 3, iq: 1 }, hype: -3 } },
      ],
    },
    {
      id: "new-coach",
      title: "Nouveau coach striking",
      text: "Un technicien repute veut integrer le camp. Il coute cher et casse vos habitudes.",
      options: [
        { label: "Payer le coach", tag: "Investir", result: "Les pattes d'ours changent de son. Votre stand-up prend une autre dimension.", effects: { money: -12000, stats: { striking: 5, iq: 1 } } },
        { label: "Garder l'equipe", tag: "Stable", result: "Pas de miracle, pas de friction.", effects: { morale: 5, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "trash-talk",
      title: "Conference sous tension",
      text: "Votre prochain adversaire vous traite de produit marketing. La salle attend votre reponse.",
      requiresFight: true,
      minFightHype: 10,
      options: [
        { label: "Rendre coup pour coup", tag: "Buzz", result: "Le clip tourne partout. La rivalite est nee.", effects: { hype: 10, rep: 2, morale: 2, rivalry: 1 } },
        { label: "Sourire et partir", tag: "Froid", result: "Les fans veulent du feu, les juges aiment les pros.", effects: { stats: { iq: 2, discipline: 2 }, hype: -2 } },
      ],
    },
    {
      id: "injury-hide",
      title: "Genou douteux",
      text: "Le genou grince pendant les sprawls. Le title shot approche.",
      requiresFight: true,
      maxCondition: 72,
      options: [
        { label: "Cacher la blessure", tag: "Titre", result: "Personne ne sait. Sauf votre corps.", effects: { stats: { durability: -6, wrestling: -2 }, hype: 2 } },
        { label: "Reporter le combat", tag: "Long terme", result: "La hype baisse, mais votre carriere respire.", effects: { hype: -7, morale: 2, stats: { durability: 5, cardio: 1 } } },
      ],
    },
    {
      id: "media-tour",
      title: "Tournee media",
      text: "Podcasts, plateaux, photos. Une semaine entiere loin du tatami.",
      requiresFight: true,
      minFightHype: 12,
      options: [
        { label: "Jouer le jeu", tag: "Star", result: "Vous devenez vendable. Le camp perd du tranchant.", effects: { hype: 9, money: 8000, stats: { cardio: -2, discipline: -2 } } },
        { label: "Limiter les cameras", tag: "Focus", result: "Moins de buzz, plus de sueur.", effects: { stats: { cardio: 3, discipline: 2 }, hype: -3 } },
      ],
    },
    {
      id: "bjj-seminar",
      title: "Stage au sol",
      text: "Un specialiste propose dix jours de grappling pur. Votre boxe va attendre.",
      campOnly: true,
      options: [
        { label: "Partir au stage", tag: "Sol", result: "Vous ajoutez des attaques au sol plus nettes: dos, bras et guillotines deviennent de vraies options. Le striking perd une semaine.", load: 2, risk: 5, effects: { condition: -3, stats: { grappling: 5, iq: 1, striking: -1 }, money: -4000 } },
        { label: "Refuser le stage", tag: "Refus", result: "Vous refusez le detour. Le camp reprend son fil normal: choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
      ],
    },
    {
      id: "striking-seminar",
      title: "Stage de striking",
      text: "Un coach de pieds-poings propose une semaine entiere de pads, low kicks et sparring leger. Le sol attendra.",
      campOnly: true,
      options: [
        { label: "Prendre la semaine debout", tag: "Striking", result: "Votre distance devient plus nette et les entrees adverses se paient plus cher. Le grappling perd du volume.", load: 2, risk: 6, effects: { money: -5000, condition: -3, stats: { striking: 5, power: 1, grappling: -1 } } },
        { label: "Refuser le stage", tag: "Refus", result: "Vous ne partez pas sur ce tunnel debout. Le camp reprend son fil normal: choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
      ],
    },
    {
      id: "dagestan-years",
      title: "Deux ou trois ans au Daghestan",
      text: "Un coach de sambo vous vend une immersion de montagne: lutte, sorties de cage, controle au sol. Version acceleree, douleur incluse.",
      campOnly: true,
      minTier: 1,
      options: [
	        { label: "Accepter la montagne", tag: "Sambo", result: "Le corps prend cher, mais votre controle cage-sol change de densite. Debout, une semaine disparait.", load: 4, risk: 13, effects: { money: -14000, morale: -3, condition: -8, injuryRisk: 5, stats: { wrestling: 5, grappling: 4, discipline: 2, striking: -2, charisma: -1 } } },
	        { label: "Refuser le stage", tag: "Refus", result: "Vous refusez l'immersion. Pas de compromis bizarre: le camp reprend son fil normal et vous choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
	      ],
	    },
    {
      id: "forest-camp",
      title: "Entrainement dans les bois",
      text: "Un preparateur old-school veut couper les telephones: cotes, troncs, sprints, froid, silence. Personne ne parle de technique.",
      campOnly: true,
      options: [
        { label: "Partir couper le bruit", tag: "Moteur", result: "Le moteur monte et le corps devient plus dur. Les articulations, elles, protestent un peu.", load: 3, risk: 9, effects: { morale: 2, condition: -5, injuryRisk: 4, stats: { cardio: 4, power: 3, discipline: 1, iq: -1 } } },
        { label: "Refuser le stage", tag: "Refus", result: "Vous ne partez pas dans les bois. Le camp reprend son fil normal: choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
      ],
    },
    {
      id: "rocky-back-to-roots",
      title: "Tu t'es embourgeoise, Rocky",
      text: "Apres une defaite, un ancien du club historique vous accuse d'avoir troque la sueur contre le confort. Il propose une semaine retour aux origines.",
      campOnly: true,
      minTier: 2,
      requiresRecentLoss: true,
      requiresCareerShift: true,
      options: [
        { label: "Retour aux origines", tag: "Faim", result: "Le camp redevient simple: sacs uses, lutte dure, ego dehors. Le moral et la discipline reviennent.", load: 2, risk: 7, effects: { rep: 2, morale: 8, money: -3000, stats: { discipline: 3, cardio: 2, charisma: -1 } } },
        { label: "Refuser le retour", tag: "Refus", result: "Vous refusez la lecon de nostalgie. Le camp reprend son fil normal: choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
      ],
    },
    {
      id: "russia-camp",
      title: "Camp en Russie",
      text: "Un camp ferme promet sparrings durs, lutte lourde et recuperation miraculeuse. Le staff parle bas quand les flacons arrivent.",
      campOnly: true,
      minTier: 1,
      options: [
        { label: "Partir au camp ferme", tag: "Interdit", result: "Les rounds sont durs, la recuperation trop rapide pour etre innocente. Vous revenez plus dangereux, mais le dossier anti-dopage commence a respirer dans votre nuque.", load: 3, risk: 9, effects: { money: -16000, condition: 4, injuryRisk: 7, scandal: 4, dopingRisk: 22, doping: 1, stats: { wrestling: 3, cardio: 3, power: 2, durability: -1, discipline: -2 } } },
        { label: "Refuser le camp", tag: "Refus", result: "Vous laissez le camp ferme a d'autres. Le camp reprend son fil normal: choisissez l'entrainement de la semaine.", load: 0, risk: 0, effects: {}, skipOpportunity: true },
      ],
    },
    {
      id: "rival-help",
      title: "Le rival demande un round",
      text: "Votre rival de generation cherche un sparring discret avant son grand combat.",
      needsRival: true,
      options: [
        { label: "L'aider vraiment", tag: "Respect", result: "La scene MMA adore ce geste. Lui aussi a appris de vous.", effects: { rep: 5, morale: 4, rivalry: -1 } },
        { label: "Refuser poliment", tag: "Business", result: "Personne ne vous donnera ceinture et respect gratuitement.", effects: { stats: { discipline: 2 }, hype: 2, rivalry: 1 } },
      ],
    },
    {
      id: "diet-sponsor",
      title: "Sponsor douteux",
      text: "Une marque de complements veut votre visage. L'argent est bon, la reputation moins.",
      options: [
        { label: "Signer", tag: "Cash", result: "Le virement arrive. Les commentaires aussi.", effects: { money: 22000, hype: 3, rep: -4 } },
        { label: "Passer votre tour", tag: "Image", result: "Vous perdez un cheque, gagnez une aura.", effects: { rep: 4, stats: { discipline: 1 } } },
      ],
    },
    {
      id: "camp-war",
      title: "Guerre de vestiaire",
      text: "Deux coachs ne se parlent plus. Le camp devient une reunion de famille qui a mal tourne.",
      options: [
        { label: "Trancher brutalement", tag: "Chef", result: "Une personne part. L'ambiance aussi, mais le cadre revient.", effects: { stats: { discipline: 3, iq: 1 }, morale: -4 } },
        { label: "Reparer le groupe", tag: "Humain", result: "Ca prend du temps, mais l'equipe vous suit.", effects: { morale: 7, stats: { charisma: 2, cardio: -1 } } },
      ],
    },
    {
      id: "move-up",
      title: "Double champion ?",
      text: "La categorie du dessus manque de stars. Votre manager voit une legende en deux ceintures.",
      minTier: 3,
      options: [
        { label: "Monter chercher l'histoire", tag: "Legacy", result: "Les affiches sont enormes. Les adversaires aussi.", effects: { hype: 12, rep: 6, stats: { power: 1, cardio: -2, chin: -1 }, doublePath: 1 } },
        { label: "Defendre votre territoire", tag: "Dynastie", result: "Vous choisissez le regne plutot que le vertige.", effects: { rep: 4, stats: { discipline: 3, durability: 1 } } },
      ],
    },
    {
      id: "old-damage",
      title: "Les annees parlent",
      text: "Apres un sparring dur, vous sentez que recuperer prend plus longtemps qu'avant.",
      minAge: 31,
      options: [
        { label: "Reduire la charge", tag: "Durable", result: "Moins de volume, plus de precision.", effects: { stats: { durability: 4, iq: 2, cardio: -1 }, morale: 2 } },
        { label: "Continuer comme avant", tag: "Dur", result: "Le camp respecte votre folie. Votre corps prend note.", effects: { hype: 3, stats: { durability: -5, cardio: 2 } } },
      ],
    },
    {
      id: "documentary",
      title: "Documentaire",
      text: "Une plateforme veut suivre votre saison. Cameras au petit dejeuner, cameras au vestiaire.",
      options: [
        { label: "Ouvrir les portes", tag: "Public", result: "Les fans voient l'humain derriere les gants.", effects: { hype: 8, rep: 4, money: 10000, morale: -2 } },
        { label: "Garder le mystere", tag: "Prive", result: "Moins de projecteurs. Plus de calme.", effects: { morale: 5, stats: { discipline: 2 }, hype: -2 } },
      ],
    },
    {
      id: "new-contract",
      title: "Clause piege",
      text: "Le nouveau contrat paie mieux, mais bloque vos negociations pendant trois ans.",
      options: [
        { label: "Prendre l'argent", tag: "Cash", result: "La banque sourit. La liberte moins.", effects: { money: 35000, morale: -2, locked: 1 } },
        { label: "Rester libre", tag: "Vision", result: "Votre manager souffle, mais le futur reste ouvert.", effects: { rep: 2, hype: 2, money: -3000 } },
      ],
    },
    {
      id: "fan-pressure",
      title: "La foule veut un KO",
      text: "Votre dernier combat etait tactique. Les fans reclament du sang et des highlights.",
      requiresFight: true,
      minFightHype: 8,
      options: [
        { label: "Promettre le finish", tag: "Show", result: "La pression monte. Impossible de se cacher.", effects: { hype: 7, stats: { power: 2, iq: -1 } } },
        { label: "Parler de victoire", tag: "Pro", result: "Pas de punchline, mais un cap clair.", effects: { stats: { iq: 2, discipline: 2 }, hype: -1 } },
      ],
    },
    {
      id: "homecoming",
      title: "Combat a domicile",
      text: "Une carte dans votre ville natale se monte. Toute la famille veut des places.",
      postFightOnly: true,
      requiresMmaResult: true,
      options: [
        { label: "Porter la ville", tag: "Coeur", result: "Le promoteur verrouille une affiche locale. Vous combattez devant votre public, avec toute la pression qui va avec.", effects: { hype: 6, rep: 5, morale: 5, money: -3000 } },
        { label: "Couper le bruit", tag: "Focus", result: "Vous acceptez l'affiche locale, mais le staff filtre famille, places et sollicitations pour garder un camp propre.", effects: { stats: { discipline: 3, iq: 1 }, morale: -2, hype: 2 } },
      ],
    },
  ];

	  const BADGES = [
	    { id: "first-fight", title: "Premiere entree", text: "Disputer un premier combat professionnel.", check: c => c.fights.length >= 1 },
	    { id: "first-win", title: "Premier bras leve", text: "Gagner un premier combat.", check: c => c.record.w >= 1 },
    { id: "finisher", title: "Finisseur", text: "Signer au moins 6 fins avant la limite.", check: c => c.record.ko + c.record.sub >= 6 },
    { id: "perfect-ten", title: "10-0", text: "Atteindre dix victoires sans defaite.", check: c => c.record.w >= 10 && c.record.l === 0 },
    { id: "regional-belt", title: "Ceinture locale", text: "Remporter une ceinture regionale.", check: c => c.titles.some(t => t.tier >= 1) },
    { id: "world-champ", title: "Champion mondial", text: "Remporter la ceinture UFC.", check: c => c.titles.some(t => t.tier >= 5) },
    { id: "double-champ", title: "Double champion", text: "Gagner deux titres majeurs.", check: c => c.titles.filter(t => t.tier >= 4).length >= 2 || c.flags.doubleChamp },
    { id: "money-fight", title: "Money fight", text: "Depasser 1 M de gains.", check: c => c.money >= 1000000 },
	    { id: "iron-chin", title: "Menton d'acier", text: "Finir avec 75+ en menton.", finalOnly: true, check: c => c.stats.chin >= 75 },
	    { id: "late-legend", title: "Derniere danse", text: "Combattre apres 38 ans.", check: c => c.age >= 39 },
	    { id: "goat", title: "GOAT talk", text: "Terminer a 240 pts ou plus.", finalOnly: true, check: c => scoreCareer(c).score >= 240 },
	  ];

  const CAREER_OBJECTIVES = [
    { id: "first-win", label: "Gagner le premier combat", target: 1, value: c => c.record.w },
    { id: "positive-record", label: "Construire un record positif", target: 1, value: c => Math.max(0, c.record.w - c.record.l) },
    { id: "top-ten", label: "Entrer dans le top 10", target: 1, value: c => c.rank <= 10 ? 1 : 0 },
    { id: "title-shot", label: "Obtenir une opportunite de ceinture", target: 1, value: c => c.rank <= 3 || c.titles.length ? 1 : 0 },
    { id: "finishes", label: "Signer 3 finitions", target: 3, value: c => c.record.ko + c.record.sub },
    { id: "six-figures", label: "Atteindre 100k de gains", target: 100000, value: c => c.money },
  ];

  const SHOP = [
    { id: "known-name", title: "Nom deja connu", cost: 120, text: "+10 hype au depart.", apply: c => { c.hype += 10; } },
    { id: "premium-camp", title: "Camp premium", cost: 180, text: "+2 dans chaque stat de combat.", apply: c => applyStats(c.stats, { striking: 2, wrestling: 2, grappling: 2, cardio: 2, iq: 1 }) },
    { id: "cutman", title: "Cutman veteran", cost: 220, text: "+8 sante et +3 menton.", apply: c => applyStats(c.stats, { durability: 8, chin: 3 }) },
    { id: "media-team", title: "Equipe media", cost: 260, text: "+12 charisme, +15k au depart.", apply: c => { c.money += 15000; applyStats(c.stats, { charisma: 12 }); } },
  ];

  const DEFAULT_META = {
    saveVersion: SAVE_VERSION,
    tokens: 0,
    record: 0,
    totalCareers: 0,
    badges: {},
    hall: [],
    unlocked: {},
    equipped: [],
  };

  const SETTLEMENT_NEWS_TITLES = ["Saison reussie", "Saison solide", "Saison compliquee", "Saison a digerer"];

  const WORLD_NEWS_TEMPLATES = {
    results: [
      ctx => ({ title: "Resultat express", text: `${ctx.name} termine ${ctx.rival} au round 1 et demande une place dans le top 10.`, tone: "hot" }),
      ctx => ({ title: "Decision serree", text: `${ctx.name} gagne une decision contestee. Le camp de ${ctx.rival} reclame deja la revanche.`, tone: "neutral" }),
      ctx => ({ title: "Upset regional", text: `${ctx.rival} surprend ${ctx.name}; les bookmakers se font retourner sur la carte ${ctx.org}.`, tone: "hot" }),
    ],
    injuries: [
      ctx => ({ title: "Forfait medical", text: `${ctx.name} sort de la carte apres une blessure au genou. ${ctx.rival} cherche un remplacant short notice.`, tone: "bad" }),
      ctx => ({ title: "Coupe de poids ratee", text: `${ctx.name} manque la limite et abandonne une partie de sa bourse.`, tone: "bad" }),
      ctx => ({ title: "Retour de protocole", text: `${ctx.name} reprend l'entrainement apres huit semaines de soins et un staff medical renforce.`, tone: "good" }),
    ],
    scandals: [
      ctx => ({ title: "Controle trouble", text: `${ctx.name} est retire du ranking apres un controle hors competition suspect. L'equipe parle de complement contamine.`, tone: "bad" }),
      ctx => ({ title: "Nuit d'hotel", text: `${ctx.name} paie une grosse note apres meubles casses, extincteurs vides et depart tres matinal.`, tone: "bad" }),
      ctx => ({ title: "Telephone au sol", text: `Un contender de ${ctx.org} s'excuse apres avoir arrache le telephone d'un fan devant l'hotel.`, tone: "bad" }),
      ctx => ({ title: "Terminal sous tension", text: `${ctx.name} est sorti d'un vol apres une altercation alcoolisee. L'organisation propose un programme d'aide.`, tone: "bad" }),
      ctx => ({ title: "Parking bloque", text: `La securite separe deux camps apres un chariot lance pres du bus de la carte ${ctx.org}.`, tone: "hot" }),
      ctx => ({ title: "Conference annulee", text: `Bouteilles, bousculades, equipes separees: la conference de presse ${ctx.org} saute avant meme les face-offs.`, tone: "hot" }),
    ],
    business: [
      ctx => ({ title: "Grosse signature", text: `${ctx.name} signe un contrat media; les sponsors veulent plus de cameras dans son camp.`, tone: "good" }),
      ctx => ({ title: "Money fight propose", text: `${ctx.name} recoit une offre de boxe anglaise. Le risque sportif est enorme, le cheque aussi.`, tone: "hot" }),
      ctx => ({ title: "Salle en feu", text: `La video de sparring de ${ctx.rival} depasse le million de vues avant son prochain combat.`, tone: "good" }),
    ],
  };

  if (new URLSearchParams(window.location.search).has("reset")) {
    localStorage.removeItem(STORAGE_META);
    localStorage.removeItem(STORAGE_CAREER);
    localStorage.removeItem(STORAGE_CREATOR);
    window.history.replaceState(null, "", window.location.pathname);
  }

  const app = document.querySelector("#app");
  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);

  const savedCareer = loadCareer();
  const savedCreatorDraft = savedCareer ? null : loadCreatorDraft();
  const savedOnlinePrefs = loadOnlinePrefs();

  let ui = {
    view: savedCareer ? viewForPhase(savedCareer.phase) : savedCreatorDraft ? "creator" : "menu",
    creatorStep: savedCreatorDraft?.creatorStep || 0,
    creator: savedCreatorDraft?.creator || {},
    career: null,
    resultChoice: null,
    finalCareer: null,
    activeTab: "badges",
    mobileMenuOpen: false,
    meta: loadMeta(),
    online: {
      client: null,
      session: null,
      profile: null,
      managerName: savedOnlinePrefs.managerName,
      email: savedOnlinePrefs.email,
      authMode: "signin",
	      loading: false,
	      ready: false,
	      error: "",
	      success: "",
	      leaderboard: [],
	      leaderboardLoaded: false,
	      selectedFighterId: null,
	      myFighters: [],
	      selectedOwnFighterId: null,
	      activeFighterId: savedOnlinePrefs.activeFighterId,
	      notifications: [],
	      challenges: [],
	      accountTab: "fighters",
	      challengeFight: null,
	      challengeResult: null,
	      lastPublish: null,
	      lastSyncKey: "",
	      syncTimer: null,
	      syncInFlight: false,
	      authOpen: false,
	    },
	  };

	  if (savedCareer) {
	    ui.career = savedCareer;
	    const catchUp = syncBadges(ui.career, { notify: false });
	    if (catchUp.unlockedNow.length) saveCareer();
	  }

	  function esc(value) {
	    return String(value ?? "")
	      .replaceAll("&", "&amp;")
	      .replaceAll("<", "&lt;")
	      .replaceAll(">", "&gt;")
	      .replaceAll('"', "&quot;")
	      .replaceAll("'", "&#039;");
	  }

	  function iconOnly(name, fallback = "") {
	    return `<i class="icon" data-lucide="${esc(name)}" data-fallback="${esc(fallback)}" aria-hidden="true"></i>`;
	  }

	  function iconText(name, text, fallback = "") {
	    return `${iconOnly(name, fallback)}<span>${esc(text)}</span>`;
	  }

  function assetUrl(key) {
    const src = IMAGE_ASSETS[key] || key;
    return `${src}?v=${ASSET_VERSION}`;
  }

  function preloadGameAssets(...keys) {
    keys.forEach(key => {
      const src = assetUrl(key);
      if (!src || preloadGameAssets.seen?.has(src)) return;
      preloadGameAssets.seen = preloadGameAssets.seen || new Set();
      preloadGameAssets.seen.add(src);
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    });
  }

	  function hydrateIcons() {
	    if (window.lucide?.createIcons) {
	      window.lucide.createIcons({
	        attrs: {
	          "stroke-width": 2.35,
	        },
	      });
	    }
	  }

	  window.FightLegacyHydrateIcons = hydrateIcons;

	  function statIcon(key) {
	    const icons = {
	      striking: "target",
	      wrestling: "shield",
	      grappling: "hand",
	      cardio: "activity",
	      power: "zap",
	      chin: "shield-check",
	      iq: "brain",
	      charisma: "sparkles",
	      discipline: "clipboard-check",
	      durability: "heart-pulse",
	    };
	    return icons[key] || "circle";
	  }

	  function effectIcon(key, value = 0) {
	    const icons = {
	      money: "circle-dollar-sign",
	      rep: "badge-check",
	      hype: "flame",
	      morale: value >= 0 ? "smile" : "frown",
	      condition: "heart-pulse",
	      rivalry: "swords",
	      locked: "lock",
	      doublePath: "move-up-right",
	      injuryRisk: "activity",
	      medicalCare: "heart-pulse",
		      restWeeks: "calendar-clock",
		      scandal: "triangle-alert",
		      dopingRisk: "flask-conical",
		      doping: "syringe",
		      suspension: "ban",
		      credit: "wallet-cards",
			    };
		    return icons[key] || statIcon(key);
		  }

	  function choiceIcon(type, id = "", tag = "") {
	    const byType = {
	      country: "flag",
	      weight: "scale",
	      style: "swords",
	      origin: "map-pin",
	      lifestyle: "heart",
	      entourage: "users",
	      gym: "warehouse",
	    };
	    const byId = {
	      boxing: "target",
	      muay: "footprints",
	      kickboxing: "badge",
	      wrestling: "shield",
	      bjj: "hand",
	      sambo: "combine",
	      karate: "move-diagonal",
	      monk: "moon",
	      balanced: "gauge",
	      spotlight: "camera",
	      bw: "rabbit",
	      fw: "feather",
	      lw: "gauge",
	      ww: "dumbbell",
	      mw: "shield",
	      hw: "anvil",
	      fr: "flag",
	      br: "hand",
	      us: "shield",
	      ng: "zap",
	      jp: "circle-dot",
	      mx: "heart-pulse",
	      ma: "footprints",
	      uk: "target",
	      nl: "footprints",
	      dag: "mountain",
	      th: "badge",
	      cu: "medal",
	      ge: "shield-check",
	      "loyal-coach": "handshake",
	      "shark-manager": "briefcase-business",
	      "elite-camp": "dumbbell",
	      "family-team": "users",
	      "small-gym": "warehouse",
	      family: "users",
	      street: "flame",
	      olympic: "medal",
	      late: "clock",
	      iron: "warehouse",
	      atlas: "mountain",
	      cobra: "target",
	      summit: "dumbbell",
	      strike: "target",
	      wrestle: "shield",
	      grapple: "hand",
	      pressure: "flame",
	      measured: "scan-search",
	    };
	    if (byId[id]) return byId[id];
	    if (byType[type]) return byType[type];
	    if (tag === "KO") return "zap";
	    if (tag === "Sub") return "hand";
	    return "circle-dot";
	  }

  function countryFlag(id = "") {
    const flags = {
      fr: "🇫🇷",
      br: "🇧🇷",
      us: "🇺🇸",
      ng: "🇳🇬",
      jp: "🇯🇵",
      mx: "🇲🇽",
      ma: "🇲🇦",
      uk: "🇬🇧",
      nl: "🇳🇱",
      dag: "🏔️",
      th: "🇹🇭",
      cu: "🇨🇺",
      ge: "🇬🇪",
    };
    return flags[id] || "🏳️";
  }

	  function trainingIcon(id) {
	    const icons = {
	      striking: "target",
	      wrestling: "shield",
	      grappling: "hand",
	      conditioning: "activity",
		      tactics: "brain",
		      "trash-media": "megaphone",
		      sparring: "swords",
	      specialist: "graduation-cap",
	      recovery: "heart-pulse",
	    };
		    return icons[id] || "dumbbell";
		  }

		  function campOpportunityIcon(id = "", tag = "") {
		    if (tag === "Refus") return "circle-x";
		    if (tag === "Interdit") return "flask-conical";
		    const icons = {
		      "bjj-seminar": "hand",
		      "striking-seminar": "target",
		      "dagestan-years": "mountain-snow",
		      "forest-camp": "trees",
		      "rocky-back-to-roots": "home",
		      "russia-camp": "flask-conical",
		    };
		    return icons[id] || "sparkles";
		  }

	  function specialTrainingIcon(id) {
	    const icons = {
	      "boxing-footwork": "footprints",
	      "boxing-defense": "shield",
	      "dirty-clinch": "hand",
	      "mma-detox": "brain",
	    };
	    return icons[id] || "dumbbell";
	  }

	  function protocolIcon(id) {
	    const icons = {
	      "expert-team": "stethoscope",
	      "specialist-abroad": "plane",
	      "mental-reset": "brain",
	      "old-school": "bandage",
	    };
	    return icons[id] || "heart-pulse";
	  }

	  function toneIcon(tone) {
	    if (tone === "good") return "circle-check";
	    if (tone === "bad") return "triangle-alert";
	    if (tone === "hot") return "flame";
	    return "radio";
	  }

	  function riskIcon(fight) {
	    if (fight?.title) return "trophy";
	    if (fight?.rematch) return "repeat-2";
	    if (fight?.risk === "high") return "flame";
	    if (fight?.risk === "mid") return "gauge";
	    return "shield-check";
	  }

	  function optionImpactIcon(option) {
	    const effects = option?.effects || {};
	    const statKey = Object.keys(effects.stats || {})[0];
	    const directKey = ["money", "rep", "hype", "morale", "condition", "injuryRisk", "medicalCare", "restWeeks", "scandal", "rivalry", "locked", "doublePath", "credit"].find(key => effects[key]);
	    return effectIcon(statKey || directKey || "morale", effects[directKey] || 1);
	  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2100);
  }

  function viewForPhase(phase) {
    const phaseMap = {
      "gym-offer": "gymOffer",
      "season-setup": "seasonSetup",
      training: "training",
      "decision-result": "decisionResult",
      "life-event": "lifeEvent",
      event: "event",
      "event-result": "eventResult",
      "career-special": "careerSpecial",
      "special-camp": "specialCamp",
	      "special-press": "specialPress",
	      "special-result": "specialResult",
		      "fight-offer": "fightOffer",
		      "press-conference": "pressConference",
		      "fight-plan": "fightPlan",
	      "fight-moment": "fightMoment",
	      "fight-result": "fightResult",
      "medical-rest": "medicalRest",
      "career-save-choice": "careerSaveChoice",
      "season-pause-choice": "seasonPauseChoice",
      "season-progress": "seasonProgress",
      "season-summary": "seasonSummary",
      "retirement-choice": "retirementChoice",
    };
    return phaseMap[phase] || "menu";
  }

  function loadMeta() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_META)) || {};
      return {
        ...DEFAULT_META,
        ...parsed,
        saveVersion: SAVE_VERSION,
        badges: parsed.badges || {},
        hall: Array.isArray(parsed.hall) ? parsed.hall : [],
        unlocked: parsed.unlocked || {},
        equipped: Array.isArray(parsed.equipped) ? parsed.equipped : [],
      };
    } catch {
      return { ...DEFAULT_META };
    }
  }

  function loadOnlinePrefs() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_ONLINE)) || {};
      return {
        managerName: parsed.managerName || "",
        email: parsed.email || "",
        activeFighterId: parsed.activeFighterId || "",
      };
    } catch {
      return { managerName: "", email: "", activeFighterId: "" };
    }
  }

	  function saveMeta() {
	    localStorage.setItem(STORAGE_META, JSON.stringify(ui.meta));
	  }

	  function saveOnlinePrefs() {
	    localStorage.setItem(STORAGE_ONLINE, JSON.stringify({
	      managerName: ui.online?.managerName || "",
	      email: ui.online?.email || "",
	      activeFighterId: ui.online?.activeFighterId || "",
	    }));
	  }

	  function syncBadges(career, options = {}) {
	    if (!career || !ui?.meta) return { unlockedNow: [], tokenGain: 0 };
	    const final = Boolean(options.final);
	    const notify = options.notify !== false;
	    const awardTokens = options.awardTokens !== false;
	    const unlockedNow = [];
	    BADGES.forEach(badge => {
	      if (!final && badge.finalOnly) return;
	      if (badge.check(career) && !ui.meta.badges[badge.id]) {
	        ui.meta.badges[badge.id] = {
	          at: new Date().toISOString(),
	          fighter: career.name,
	        };
	        unlockedNow.push(badge);
	      }
	    });
	    const tokenGain = awardTokens ? unlockedNow.length * 35 : 0;
	    if (tokenGain) ui.meta.tokens += tokenGain;
	    if (unlockedNow.length) {
	      if (career.active !== false) {
	        const names = unlockedNow.map(badge => badge.title).join(", ");
	        addNews(career, "Badge debloque", `${career.name} debloque: ${names}.`, "good", { system: true });
	      }
	      saveMeta();
	      if (notify) {
	        showToast(unlockedNow.length === 1 ? `Badge debloque: ${unlockedNow[0].title}` : `${unlockedNow.length} badges debloques`);
	      }
	    }
	    return { unlockedNow, tokenGain };
	  }

	  function loadCareer() {
    try {
      const career = JSON.parse(localStorage.getItem(STORAGE_CAREER));
      return career && career.active !== false ? withCareerDefaults(career) : null;
    } catch {
      return null;
    }
  }

  function withCareerDefaults(career) {
    career.saveVersion = SAVE_VERSION;
    career.active = career.active !== false;
    career.name = String(career.name || "Combattant sans nom").trim() || "Combattant sans nom";
    career.country = getById(COUNTRIES, career.country?.id) || career.country || COUNTRIES[0];
    career.weight = career.weight || WEIGHTS[2];
    career.style = career.style || STYLES[0];
    career.origin = career.origin || ORIGINS[0];
    career.lifestyle = career.lifestyle || LIFESTYLES[1];
    career.entourage = career.entourage || ENTOURAGES[0];
    career.age = career.age || 18;
    career.year = career.year || CURRENT_YEAR;
    career.seed = career.seed || hashSeed(`${career.name}-${career.year}`);
    career.rngSeed = career.rngSeed || career.seed;
    career.condition = career.condition ?? 72;
    career.stats = { ...newEmptyStats(), ...(career.stats || {}) };
    career.potential = career.potential || 78;
    career.money = career.money ?? 2500;
    career.rep = career.rep ?? 8;
    career.hype = career.hype ?? 5;
    career.morale = career.morale ?? 60;
    career.org = career.org || GYMS[0];
    career.tier = clamp(Number(career.tier ?? career.org.org ?? 0), 0, ORGS.length - 1);
    {
      const org = orgForTier(career.tier);
      career.org = {
        ...(career.org || {}),
        id: org.id,
        label: org.label,
        org: org.tier,
        summary: org.summary,
      };
    }
	    career.rank = career.rank || 26;
	    career.flags = career.flags || {};
		    career.flags.dopingRisk = clamp(Number(career.flags.dopingRisk || 0), 0, 100);
		    career.flags.doping = clamp(Number(career.flags.doping || 0), 0, 10);
			    career.flags.suspensionFights = Math.max(0, Math.round(career.flags.suspensionFights || 0));
			    career.flags.debtSeasons = Math.max(0, Math.round(career.flags.debtSeasons || 0));
			    career.flags.missedSeasonFights = Math.max(0, Math.round(career.flags.missedSeasonFights || 0));
			    career.flags.campInjuryGrace = Math.max(0, Math.round(career.flags.campInjuryGrace || 0));
			    career.flags.seasonPauseOfferedYear = Number(career.flags.seasonPauseOfferedYear || 0);
			    career.flags.seasonPauseDeclinedYear = Number(career.flags.seasonPauseDeclinedYear || 0);
			    career.flags.smallCreditOpen = Boolean(career.flags.smallCreditOpen && (career.money || 0) < 0);
			    career.flags.smallCreditAmount = career.flags.smallCreditOpen ? Math.max(0, Math.round(career.flags.smallCreditAmount || 0)) : 0;
			    career.flags.recentLifeEventIds = Array.isArray(career.flags.recentLifeEventIds) ? career.flags.recentLifeEventIds.slice(-8) : [];
			    career.flags.recentDelayedLifeEventIds = Array.isArray(career.flags.recentDelayedLifeEventIds) ? career.flags.recentDelayedLifeEventIds.slice(-6) : [];
			    career.flags.recentFightMomentIds = Array.isArray(career.flags.recentFightMomentIds) ? career.flags.recentFightMomentIds.slice(-8) : [];
			    if (career.tier >= LEGEND_TIER || career.flags.legendMode) {
			      career.flags.legendMode = true;
			      career.potential = Math.max(career.potential || 0, LEGEND_STAT_CAP);
			    }
	    career.record = career.record || { w: 0, l: 0, d: 0, ko: 0, sub: 0, dec: 0 };
    career.titles = (career.titles || []).map(title => {
      const tier = clamp(Number(title.tier || 0), 0, ORGS.length - 1);
      const org = orgForTier(tier);
      return {
        ...title,
        tier,
        label: !title.label || LEGACY_BELT_LABELS.has(title.label) ? org.belt : title.label,
        defenses: Math.max(0, Math.round(title.defenses || 0)),
        lost: Boolean(title.lost),
      };
    });
    career.fights = career.fights || [];
    career.exhibitions = Array.isArray(career.exhibitions) ? career.exhibitions : [];
    career.history = career.history || [];
    career.moments = career.moments || [];
	    career.news = career.news || [];
	    career.rivals = career.rivals || [];
	    career.pendingConsequences = Array.isArray(career.pendingConsequences) ? career.pendingConsequences : [];
	    career.contract = career.contract || null;
	    if (career.contract) {
	      career.contract.org = migrateOrgLabel(career.contract.org, career.tier);
	      career.contract.tier = clamp(Number(career.contract.tier ?? career.tier), 0, ORGS.length - 1);
	      career.contract.orgId = career.contract.orgId || orgForTier(career.contract.tier).id;
      const declaredFights = Math.max(0, Math.round(Number(career.contract.fights ?? career.contract.remainingFights ?? 0)));
      career.contract.fights = declaredFights;
      career.contract.remainingFights = clamp(Number(career.contract.remainingFights ?? declaredFights), 0, Math.max(declaredFights, 0));
      career.contract.purseBoost = career.contract.purseBoost || 1;
      career.contract.signedYear = Number(career.contract.signedYear || career.year);
      if ((career.contract.signedYear < career.year || career.contract.tier < career.tier) && career.contract.remainingFights > 0) {
        career.contract.remainingFights = 0;
      }
	      const clauseNeedsWins = /contender/i.test(career.contract.titleClause || "");
	      career.contract.contenderWinsRequired = Math.max(0, Math.round(career.contract.contenderWinsRequired || (clauseNeedsWins ? 2 : 0)));
	      if (career.contract.contenderWinsRequired && !career.contract.contenderWins) {
	        const since = career.contract.signedYear || career.year;
	        const contractWins = (career.fights || []).filter(fight => fight.year >= since && fight.result === "Victoire").length;
	        career.contract.contenderWins = Math.min(career.contract.contenderWinsRequired, contractWins);
	      }
	      career.contract.contenderWins = clamp(Math.round(career.contract.contenderWins || 0), 0, Math.max(0, career.contract.contenderWinsRequired || 0));
	      if (career.contract.contenderWinsRequired && career.contract.contenderWins >= career.contract.contenderWinsRequired) {
	        career.flags.contenderClauseReady = true;
	      }
	    }
	    career.medical = {
	      injuryRisk: 0,
	      restWeeks: 0,
	      activeInjury: null,
	      injuries: [],
	      rehabLog: [],
	      careerWarnings: 0,
	      ...(career.medical || {}),
	    };
	    career.medical.injuries = Array.isArray(career.medical.injuries) ? career.medical.injuries : [];
	    career.medical.rehabLog = Array.isArray(career.medical.rehabLog) ? career.medical.rehabLog : [];
	    career.medical.injuryRisk = clamp(career.medical.injuryRisk || 0, 0, 90);
	    career.medical.restWeeks = Math.max(0, Math.round(career.medical.restWeeks || 0));
	    career.phase = career.phase || "gym-offer";
    career.season = career.season || null;
    career.camp = career.camp || null;
    if (career.camp) {
      career.camp.week = career.camp.week || 1;
      career.camp.maxWeeks = career.camp.maxWeeks || campLength(career.pendingFight);
      career.camp.fatigue = career.camp.fatigue || 0;
      career.camp.log = career.camp.log || [];
      career.camp.injury = career.camp.injury || null;
      career.camp.opportunity = career.camp.opportunity || null;
    }
    career.pendingTraining = career.pendingTraining || null;
    career.pendingLifeEvent = career.pendingLifeEvent || null;
    career.pendingEvent = refreshEventDefinition(career.pendingEvent || null);
    if (career.pendingEvent?.id === "boxing-crossover") career.pendingEvent = null;
    career.pendingSpecial = career.pendingSpecial || null;
    career.specialFight = career.specialFight || null;
    career.specialCamp = career.specialCamp || null;
    if (career.specialCamp) {
      career.specialCamp.week = career.specialCamp.week || 1;
      career.specialCamp.maxWeeks = career.specialCamp.maxWeeks || 3;
      career.specialCamp.log = career.specialCamp.log || [];
      career.specialCamp.fatigue = career.specialCamp.fatigue || 0;
    }
    if (career.specialFight) {
      career.specialFight.prepBonus = career.specialFight.prepBonus || 0;
      career.specialFight.pressBonus = career.specialFight.pressBonus || 0;
      career.specialFight.log = career.specialFight.log || [];
    }
		    career.pendingFightOptions = career.pendingFightOptions || null;
		    career.pendingFight = career.pendingFight || null;
		    career.pendingPressChoice = career.pendingPressChoice || null;
		    career.pendingFightMoment = career.pendingFightMoment || null;
		    career.liveFight = career.liveFight || null;
		    career.pendingFightMomentQueue = Array.isArray(career.pendingFightMomentQueue) ? career.pendingFightMomentQueue : (career.pendingFightMoment ? [career.pendingFightMoment] : null);
		    career.pendingFightMomentIndex = Math.max(0, Math.round(career.pendingFightMomentIndex || 0));
		    career.fightMomentChoices = Array.isArray(career.fightMomentChoices) ? career.fightMomentChoices : [];
		    if (career.pendingFightMomentQueue?.length) {
		      career.pendingFightMomentIndex = clamp(career.pendingFightMomentIndex, 0, career.pendingFightMomentQueue.length - 1);
		      career.pendingFightMoment = career.pendingFightMomentQueue[career.pendingFightMomentIndex] || career.pendingFightMoment;
		    }
	    if (fightIsInvalidForCareer(career, career.pendingFight)) {
		      career.pendingFight = null;
		      career.pendingPressChoice = null;
		      career.pendingFightMoment = null;
		      career.pendingFightMomentQueue = null;
		      career.pendingFightMomentIndex = 0;
		      career.fightMomentChoices = [];
		      career.liveFight = null;
	      career.pendingTraining = null;
	      career.pendingEvent = null;
	      career.choiceResult = null;
    }
    if (fightOptionsNeedRefresh(career, career.pendingFightOptions)) {
      career.pendingFightOptions = null;
    }
	    career.pendingPlan = career.pendingPlan || null;
    career.pendingContracts = career.pendingContracts || null;
    career.choiceResult = career.choiceResult || null;
    if (career.season) {
      career.season.strategy = career.season.strategy || (career.season.fightsDone || career.pendingFight || career.pendingFightOptions || career.phase !== "season-setup" ? "standard" : null);
      career.season.planLabel = career.season.planLabel || (career.season.strategy ? seasonPlanById(career.season.strategy).label : "");
      career.season.fightsTarget = career.season.fightsTarget || seasonFightTarget(career);
      career.season.fightsDone = career.season.fightsDone || 0;
      career.season.trainingBlocks = career.season.trainingBlocks || 0;
      career.season.trainingLog = career.season.trainingLog || [];
      career.season.lifeLog = career.season.lifeLog || [];
      career.season.fightLog = career.season.fightLog || [];
      career.season.news = career.season.news || [];
      career.season.postFightEvents = career.season.postFightEvents || 0;
      career.season.settlement = career.season.settlement || null;
      career.season.delayedResults = Array.isArray(career.season.delayedResults) ? career.season.delayedResults : [];
      career.season.recentLifeEventIds = Array.isArray(career.season.recentLifeEventIds) ? career.season.recentLifeEventIds.slice(-8) : [];
      career.season.recentDelayedLifeEventIds = Array.isArray(career.season.recentDelayedLifeEventIds) ? career.season.recentDelayedLifeEventIds.slice(-6) : [];
      career.season.fightMomentHistory = Array.isArray(career.season.fightMomentHistory) ? career.season.fightMomentHistory.slice(-8) : [];
    } else if (career.phase !== "gym-offer") {
      career.season = {
        year: career.year || CURRENT_YEAR,
        age: career.age || 18,
        fightsTarget: seasonFightTarget(career),
        fightsDone: 0,
        strategy: "standard",
        planLabel: seasonPlanById("standard").label,
        trainingBlocks: 0,
        trainingLog: [],
        lifeLog: [],
        fightLog: [],
        news: [],
        postFightEvents: 0,
        delayedResults: [],
        recentLifeEventIds: [],
        recentDelayedLifeEventIds: [],
        fightMomentHistory: [],
        settlement: null,
        recap: "",
      };
      career.phase = "fight-offer";
    }
    if (!phaseCanRender(career)) career.phase = recoverPhase(career);
    return career;
  }

  function phaseCanRender(career) {
    const checks = {
      "gym-offer": () => true,
      "season-setup": () => Boolean(career.season),
      training: () => Boolean(career.season && career.pendingFight),
      "decision-result": () => Boolean(career.choiceResult),
      "life-event": () => Boolean(career.pendingEvent),
      event: () => Boolean(career.pendingEvent && career.pendingFight),
      "event-result": () => false,
      "career-special": () => Boolean(career.pendingSpecial),
      "special-camp": () => Boolean(career.specialFight && career.specialCamp),
      "special-press": () => Boolean(career.specialFight),
	      "special-result": () => Boolean(career.lastResult?.special),
		      "fight-offer": () => Boolean(career.season),
		      "press-conference": () => Boolean(career.pendingFight),
		      "fight-plan": () => Boolean(career.pendingFight),
	      "fight-moment": () => Boolean(career.pendingFight && career.pendingPlan && (career.pendingFightMoment || career.pendingFightMomentQueue?.length)),
	      "fight-result": () => Boolean(career.lastResult),
      "medical-rest": () => hasMedicalRest(career),
      "career-save-choice": () => canOfferCareerSave(career),
      "season-pause-choice": () => Boolean(career.season && career.season.fightsDone < career.season.fightsTarget),
      "season-progress": () => Boolean(career.season && career.lastResult),
      "season-summary": () => Boolean(career.season),
      "retirement-choice": () => true,
    };
    return (checks[career.phase] || (() => false))();
  }

  function recoverPhase(career) {
    if (!career.season) return "gym-offer";
    if (career.phase === "career-save-choice" && canOfferCareerSave(career)) return "career-save-choice";
    if (hasMedicalRest(career)) return "medical-rest";
    if (career.phase === "season-pause-choice" && career.season?.fightsDone < career.season?.fightsTarget) return "season-pause-choice";
    if (!career.season.strategy) return "season-setup";
    if (career.lastResult?.special && career.season.fightsDone < career.season.fightsTarget) return "season-progress";
    if (career.lastResult?.special && career.season.fightsDone >= career.season.fightsTarget) return "season-summary";
    if (career.specialFight && career.specialCamp) return "special-camp";
		    if (career.specialFight) return "special-press";
		    if (career.pendingSpecial) return "career-special";
		    if (career.lastResult && career.season.fightsDone < career.season.fightsTarget) return "season-progress";
		    if (career.lastResult && career.season.fightsDone >= career.season.fightsTarget) return "season-summary";
			    if (career.pendingEvent) return "life-event";
			    if ((career.pendingFightMoment || career.pendingFightMomentQueue?.length) && career.pendingPlan && career.pendingFight) return "fight-moment";
			    if (career.pendingFight && career.pendingPressChoice) return "fight-plan";
			    if (career.pendingFight && career.camp && career.camp.week >= career.camp.maxWeeks) return "press-conference";
			    if (career.pendingFight && career.pendingTraining) return "fight-plan";
    if (career.pendingFight) return "training";
    return "fight-offer";
  }

  function saveCareer() {
    if (ui.career && ui.career.active) {
      localStorage.setItem(STORAGE_CAREER, JSON.stringify(ui.career));
      archiveCareerLocally(ui.career);
      scheduleOnlineCareerSync();
    }
  }

  function clearCareer() {
    localStorage.removeItem(STORAGE_CAREER);
  }

  function clonePlain(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      return null;
    }
  }

  function loadCareerArchive() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_CAREER_ARCHIVE)) || {};
      return {
        saveVersion: SAVE_VERSION,
        fighters: parsed.fighters && typeof parsed.fighters === "object" ? parsed.fighters : {},
      };
    } catch {
      return { saveVersion: SAVE_VERSION, fighters: {} };
    }
  }

  function saveCareerArchive(archive) {
    localStorage.setItem(STORAGE_CAREER_ARCHIVE, JSON.stringify({
      saveVersion: SAVE_VERSION,
      fighters: archive.fighters || {},
    }));
  }

  function onlineArchiveKeyFromParts(source, name) {
    const clean = normalizeFighterName(name);
    return clean ? `${source || "beta_import"}:${clean}` : "";
  }

  function onlineArchiveKeys(row = {}) {
    const keys = [];
    if (row.id || row.fighter_id) keys.push(row.id || row.fighter_id);
    const name = row.fighter_name || row.name;
    const source = row.source || "beta_import";
    const nameKey = onlineArchiveKeyFromParts(source, name);
    if (nameKey) keys.push(nameKey);
    return [...new Set(keys.filter(Boolean))];
  }

  function archiveCareerLocally(career, row = null) {
    if (!career?.active) return;
    const keys = onlineArchiveKeys({
      id: row?.id || row?.fighter_id || career.onlineFighterId,
      source: row?.source || career.onlineSource || "beta_import",
      fighter_name: row?.fighter_name || career.name,
    });
    if (!keys.length) return;
    const copy = clonePlain({
      ...career,
      onlineFighterId: keys[0],
      onlineSource: row?.source || career.onlineSource || "beta_import",
      archivedAt: new Date().toISOString(),
    });
    if (!copy) return;
    const archive = loadCareerArchive();
    keys.forEach(key => {
      archive.fighters[key] = {
        fighterId: row?.id || row?.fighter_id || career.onlineFighterId || "",
        source: row?.source || career.onlineSource || "beta_import",
        fighterName: row?.fighter_name || career.name,
        updatedAt: new Date().toISOString(),
        career: copy,
      };
    });
    saveCareerArchive(archive);
  }

  function archivedCareerForOnlineRow(row = {}) {
    const archive = loadCareerArchive();
    for (const key of onlineArchiveKeys(row)) {
      const item = archive.fighters[key];
      if (item?.career) return clonePlain(item.career);
    }
    return null;
  }

  function startNewCareerCreation() {
    ui.career = null;
    ui.finalCareer = null;
    ui.resultChoice = null;
    ui.creator = {};
    ui.creatorStep = 0;
    clearCareer();
    clearCreatorDraft();
    ui.view = "creator";
    render();
  }

  function loadCreatorDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(STORAGE_CREATOR));
      if (!draft || !draft.creator) return null;
      return {
        creator: draft.creator,
        creatorStep: clamp(Number(draft.creatorStep) || 0, 0, CREATOR_STEPS.length - 1),
      };
    } catch {
      return null;
    }
  }

  function saveCreatorDraft() {
    localStorage.setItem(STORAGE_CREATOR, JSON.stringify({
      creator: ui.creator,
      creatorStep: ui.creatorStep,
      updatedAt: new Date().toISOString(),
    }));
  }

  function clearCreatorDraft() {
    localStorage.removeItem(STORAGE_CREATOR);
  }

  function addNews(career, title, text, tone = "neutral", meta = {}) {
    const item = {
      id: `${career.year}-${career.news.length}-${Math.floor(nextRand(career) * 100000)}`,
      year: career.year,
      title,
      text,
      tone,
      ...meta,
    };
    career.news.unshift(item);
    career.news = career.news.slice(0, 18);
    if (career.season) {
      career.season.news = career.season.news || [];
      career.season.news.unshift(item);
      career.season.news = career.season.news.slice(0, 8);
    }
  }

  function visibleNewsItems(career) {
    return (career.news || []).filter(item => (
      !item.system &&
      !SETTLEMENT_NEWS_TITLES.includes(item.title) &&
      item.title !== "Badge debloque" &&
      !/^Saison \d+/.test(item.title)
    ));
  }

  function worldFighterName(career, blocked = []) {
    const blockedNames = [career.name, ...blocked].map(normalizeFighterName);
    const pool = COUNTRIES.flatMap(country => country.names.map(name => ({ name, country })))
      .filter(item => !blockedNames.includes(normalizeFighterName(item.name)));
    return pick(career, pool.length ? pool : [{ name: "Adversaire mystere", country: COUNTRIES[0] }]).name;
  }

  function addWorldNews(career, count = 1, topic = "any") {
    const groups = topic === "any"
      ? Object.values(WORLD_NEWS_TEMPLATES).flat()
      : WORLD_NEWS_TEMPLATES[topic] || Object.values(WORLD_NEWS_TEMPLATES).flat();
    for (let index = 0; index < count; index += 1) {
      const name = worldFighterName(career);
      const rival = worldFighterName(career, [name]);
      const template = pick(career, groups);
      const item = template({ name, rival, org: ORGS[clamp(career.tier + Math.floor(nextRand(career) * 2), 0, ORGS.length - 1)].label });
      addNews(career, item.title, item.text, item.tone, { world: true });
    }
  }

  function objectiveState(career, objective) {
    const value = objective.value(career);
    const done = value >= objective.target;
    const percent = clamp((value / objective.target) * 100, 0, 100);
    return { ...objective, value, done, percent };
  }

  function visibleObjectives(career) {
    return CAREER_OBJECTIVES.map(objective => objectiveState(career, objective))
      .filter(item => !item.done)
      .slice(0, 4);
  }

  function rosterForTier(tier) {
    if (Number(tier || 0) >= LEGEND_TIER) {
      return LEGEND_BLUEPRINTS
        .slice()
        .sort((a, b) => b.base - a.base);
    }
    return OPPONENT_BLUEPRINTS
      .filter(item => item.tier <= tier + 1 && item.tier >= Math.max(0, tier - 1))
      .sort((a, b) => b.base - a.base);
  }

  function rankingRows(career) {
    const roster = rosterForTier(career.tier);
    const rows = roster.slice(0, 6).map((item, index) => ({
      rank: index + 1,
      name: item.name,
      record: item.record,
      tag: getById(STYLES, item.style)?.label || "MMA",
      you: false,
    }));
    rows.push({
      rank: career.rank,
      name: career.name,
      record: `${career.record.w}-${career.record.l}`,
      tag: "Vous",
      you: true,
    });
    return rows
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 8);
  }

  function markRival(career, opponent, intensity = 1) {
    if (!opponent?.name || sameFighterName(opponent.name, career.name)) return;
    const existing = career.rivals.find(item => item.id === opponent.id || sameFighterName(item.name, opponent.name));
    if (existing) {
      existing.heat = clamp((existing.heat || 1) + intensity, 0, 10);
      existing.lastYear = career.year;
      existing.record = opponent.record || existing.record;
      existing.style = opponent.style?.label || existing.style;
      return;
    }
    career.rivals.unshift({
      id: opponent.id || normalizeFighterName(opponent.name),
      name: opponent.name,
      heat: clamp(2 + intensity, 0, 10),
      lastYear: career.year,
      record: opponent.record || "0-0",
      style: opponent.style?.label || "MMA",
      country: opponent.country?.label || "",
      base: opponent.overall || 60,
    });
    career.rivals = career.rivals.slice(0, 5);
  }

  function hashSeed(input) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function nextRand(career) {
    career.rngSeed = (Math.imul(career.rngSeed, 1664525) + 1013904223) >>> 0;
    return career.rngSeed / 4294967296;
  }

  function pick(career, list) {
    return list[Math.floor(nextRand(career) * list.length)];
  }

  function clamp(value, min = 0, max = 99) {
    return Math.max(min, Math.min(max, Math.round(value)));
  }

  function isLegendCareer(career) {
    return Number(career?.tier || 0) >= LEGEND_TIER || Boolean(career?.flags?.legendMode);
  }

  function statCapForCareer(career) {
    return isLegendCareer(career) ? LEGEND_STAT_CAP : 99;
  }

  function applyStats(stats, mods = {}, max = 99) {
    Object.entries(mods).forEach(([key, value]) => {
      if (stats[key] === undefined) stats[key] = 50;
      stats[key] = clamp(stats[key] + value, 1, max);
    });
  }

	  function formatMoney(value) {
	    const sign = value < 0 ? "-" : "";
	    const abs = Math.abs(value);
	    if (abs >= 1000000) return `${sign}${(abs / 1000000).toFixed(abs >= 10000000 ? 0 : 1)} M`;
	    if (abs >= 1000) return `${sign}${Math.round(abs / 1000)} k`;
	    return `${sign}${Math.round(abs)}`;
	  }

		  function formatCombats(value) {
		    const count = Math.max(0, Math.round(value || 0));
		    return `${count} combat${count > 1 ? "s" : ""}`;
		  }

		  function formatWeeks(value) {
		    const count = Math.max(0, Math.round(value || 0));
		    return `${count} semaine${count > 1 ? "s" : ""}`;
		  }

  function statAverage(stats) {
    const keys = ["striking", "wrestling", "grappling", "cardio", "power", "chin", "iq", "discipline"];
    return Math.round(keys.reduce((sum, key) => sum + (stats[key] || 0), 0) / keys.length);
  }

  function overall(career) {
    const avg = statAverage(career.stats);
    const cap = statCapForCareer(career);
    const hypeBonus = isLegendCareer(career)
      ? Math.min(24, Math.floor((career.hype + career.rep) / 18))
      : Math.min(6, Math.floor((career.hype + career.rep) / 35));
    const ageTax = career.age > 34 ? Math.floor((career.age - 34) * 1.2) : 0;
    return clamp(avg + hypeBonus - ageTax, 1, cap);
  }

  function getById(list, id) {
    return list.find(item => item.id === id);
  }

  function dailySeed() {
    const now = new Date();
    const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return hashSeed(`daily-${key}`);
  }

  function newEmptyStats() {
    return {
      striking: 50,
      wrestling: 50,
      grappling: 50,
      cardio: 50,
      power: 50,
      chin: 50,
      iq: 50,
      charisma: 50,
      discipline: 50,
      durability: 78,
    };
  }

  function randomName(country, seedSource) {
    const temp = { rngSeed: seedSource || hashSeed(`${Date.now()}`) };
    return pick(temp, country.names);
  }

  function normalizeFighterName(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function sameFighterName(a, b) {
    return normalizeFighterName(a) === normalizeFighterName(b);
  }

  function fightIsInvalidForCareer(career, fight) {
    return Boolean(fight?.opponent?.name && sameFighterName(fight.opponent.name, career.name));
  }

  function fightOptionsNeedRefresh(career, options) {
    if (!Array.isArray(options)) return false;
    const seen = new Set([normalizeFighterName(career.name)]);
    return options.some(option => {
      const name = normalizeFighterName(option?.opponent?.name);
      if (!name || seen.has(name)) return true;
      seen.add(name);
      return false;
    });
  }

  function opponentName(career, country, blockedNames = []) {
    const blocked = [career.name, ...blockedNames].map(normalizeFighterName);
    const localPool = (country.names || []).filter(name => !blocked.includes(normalizeFighterName(name)));
    if (localPool.length) return localPool[Math.floor(nextRand(career) * localPool.length)];
    const globalPool = COUNTRIES
      .flatMap(item => item.names)
      .filter(name => !blocked.includes(normalizeFighterName(name)));
    if (globalPool.length) return globalPool[Math.floor(nextRand(career) * globalPool.length)];
    return `Adversaire ${100 + Math.floor(nextRand(career) * 900)}`;
  }

  function legendOpponentTargetBase(career, difficulty = 0) {
    const legendWins = (career.fights || []).filter(fight => Number(fight.tier || 0) >= LEGEND_TIER && fight.result === "Victoire").length;
    const target = Math.max(
      128,
      Math.min(
        315,
        overall(career) + 20 + legendWins * 9 + Math.max(0, career.streak || 0) * 3 + difficulty
      )
    );
    return target;
  }

  function blueprintToOpponent(career, blueprint, difficulty = 0) {
    const country = getById(COUNTRIES, blueprint.country) || COUNTRIES[0];
    const style = getById(STYLES, blueprint.style) || STYLES[0];
    const isLegend = Number(blueprint.tier || 0) >= LEGEND_TIER;
    const variance = isLegend ? 25 : 7;
    const base = blueprintBase(blueprint) + difficulty + Math.floor(nextRand(career) * variance - Math.floor(variance / 2));
    const floor = isLegend ? Math.max(95, base - 42) : 24;
    const ceiling = isLegend ? LEGEND_STAT_CAP : 97;
    const spread = isLegend ? 54 : 14;
    const stats = newEmptyStats();
    Object.keys(stats).forEach(key => {
      stats[key] = clamp(base + Math.floor(nextRand(career) * spread - Math.floor(spread / 2)), floor, ceiling);
    });
    applyStats(stats, style.stats, isLegend ? LEGEND_STAT_CAP : 99);
    return {
      id: blueprint.id,
      name: blueprint.name,
      age: blueprint.age,
      country,
      style,
      trait: blueprint.trait,
      stats,
      overall: statAverage(stats),
      record: blueprint.record,
      blueprintTier: blueprint.tier,
    };
  }

  function rivalToOpponent(career, rival, difficulty = 0) {
    const blueprint = OPPONENT_BLUEPRINTS.find(item => item.id === rival.id || sameFighterName(item.name, rival.name));
    if (blueprint) return blueprintToOpponent(career, blueprint, difficulty + Math.min(4, rival.heat || 0));
    const country = COUNTRIES.find(item => item.label === rival.country) || pick(career, COUNTRIES);
    const style = STYLES.find(item => item.label === rival.style) || pick(career, STYLES);
    const base = (rival.base || 62) + difficulty + Math.min(4, rival.heat || 0);
    const stats = newEmptyStats();
    const ceiling = isLegendCareer(career) ? LEGEND_STAT_CAP : 97;
    Object.keys(stats).forEach(key => {
      stats[key] = clamp(base + Math.floor(nextRand(career) * 12 - 5), 24, ceiling);
    });
    applyStats(stats, style.stats, isLegendCareer(career) ? LEGEND_STAT_CAP : 99);
    return {
      id: rival.id,
      name: rival.name,
      age: career.age + Math.floor(nextRand(career) * 5 - 2),
      country,
      style,
      trait: "rivalite active",
      stats,
      overall: statAverage(stats),
      record: rival.record || "0-0",
    };
  }

  function creatorComplete() {
    return CREATOR_STEPS.slice(0, -1).every(step => ui.creator[step]);
  }

  function createCareer(options = {}) {
    const country = getById(COUNTRIES, options.country || ui.creator.country || "fr");
    const weight = getById(WEIGHTS, options.weight || ui.creator.weight || "lw");
    const style = getById(STYLES, options.style || ui.creator.style || "boxing");
    const origin = getById(ORIGINS, options.origin || ui.creator.origin || "small-gym");
    const lifestyle = getById(LIFESTYLES, options.lifestyle || ui.creator.lifestyle || "balanced");
    const entourage = getById(ENTOURAGES, options.entourage || ui.creator.entourage || "loyal-coach");
    const seed = options.seed || hashSeed(`${Date.now()}-${Math.random()}`);
    const stats = newEmptyStats();
    applyStats(stats, country.stats);
    applyStats(stats, weight.stats);
    applyStats(stats, style.stats);
    applyStats(stats, origin.stats);
    applyStats(stats, lifestyle.stats);
    applyStats(stats, entourage.stats);

    const career = {
      saveVersion: SAVE_VERSION,
      active: true,
      name: (options.name || ui.creator.name || randomName(country, seed)).trim(),
      nickname: options.nickname || "",
      country,
      weight,
      style,
      origin,
      lifestyle,
      entourage,
      age: origin.age || 18,
      year: CURRENT_YEAR,
      seed,
      rngSeed: seed,
      stats,
      potential: clamp(76 + Math.floor((seed % 21) - 10) + (origin.potentialPenalty || 0), 60, 96),
      money: Math.max(0, 2500 + (origin.money || 0) + (entourage.money || 0)),
      rep: clamp(8 + (origin.rep || 0) + (entourage.rep || 0), 0, 120),
      hype: clamp(5 + (lifestyle.hype || 0) + (entourage.hype || 0), 0, 140),
      morale: clamp(60 + (lifestyle.morale || 0) + (entourage.morale || 0), 0, 100),
      condition: 72,
      org: GYMS[0],
      tier: 0,
      rank: 26,
      record: { w: 0, l: 0, d: 0, ko: 0, sub: 0, dec: 0 },
      titles: [],
      streak: 0,
      lastResult: null,
      fights: [],
      exhibitions: [],
      history: [],
      moments: [],
	      news: [],
	      rivals: [],
	      contract: null,
	      medical: {
	        injuryRisk: 0,
	        restWeeks: 0,
	        activeInjury: null,
	        injuries: [],
	        rehabLog: [],
	        careerWarnings: 0,
	      },
		      flags: { statsNudge: true },
      pendingConsequences: [],
      phase: "gym-offer",
      season: null,
      camp: null,
      pendingEvent: null,
      pendingSpecial: null,
      specialFight: null,
      specialCamp: null,
      pendingTraining: null,
	      pendingLifeEvent: null,
	      pendingFightOptions: null,
	      pendingFight: null,
	      pendingPressChoice: null,
	      pendingPlan: null,
      pendingContracts: null,
      choiceResult: null,
      startSummary: {
        country: country.label,
        weight: weight.label,
        style: style.label,
        origin: origin.label,
      },
    };

	    const equippedPerks = ui.meta.equipped
	      .map(id => SHOP.find(item => item.id === id))
	      .filter(Boolean);
	    equippedPerks.forEach(item => item.apply(career));
	    career.startSummary.perks = equippedPerks.map(item => item.title);
	    if (equippedPerks.length) {
	      career.moments.push(`Bonus equipes au depart: ${equippedPerks.map(item => item.title).join(", ")}.`);
	    }

    ui.career = career;
    ui.finalCareer = null;
    ui.view = "gymOffer";
    clearCreatorDraft();
    saveCareer();
    render();
  }

  function startDaily() {
    const seed = dailySeed();
    const temp = { rngSeed: seed };
    const country = pick(temp, COUNTRIES);
    const weight = pick(temp, WEIGHTS);
    const style = pick(temp, STYLES);
    const origin = pick(temp, ORIGINS);
    const lifestyle = pick(temp, LIFESTYLES);
    const entourage = pick(temp, ENTOURAGES);
    createCareer({
      country: country.id,
      weight: weight.id,
      style: style.id,
      origin: origin.id,
      lifestyle: lifestyle.id,
      entourage: entourage.id,
      seed,
      name: randomName(country, seed + 13),
    });
    ui.career.flags.daily = true;
    ui.career.moments.push("Defi du soir: meme seed pour tout le monde.");
    saveCareer();
  }

  function chooseGym(index) {
    const career = ui.career;
	    const gym = GYMS[index] || GYMS[0];
	    career.org = gym;
	    career.tier = gym.org;
	    career.flags.initialTier = gym.org;
	    career.flags.initialGymId = gym.id;
	    applyStats(career.stats, gym.stats);
    career.history.push({
      year: career.year,
      age: career.age,
      text: `Debut au club ${gym.label}. ${gym.summary}`,
    });
    career.phase = "event";
    startSeason();
  }

	  function eventEligible(event, career) {
	    if (event.minAge && career.age < event.minAge) return false;
	    if (event.maxAge && career.age > event.maxAge) return false;
	    if (event.minTier && career.tier < event.minTier) return false;
	    if (event.minHype && career.hype < event.minHype) return false;
	    if (event.minRep && career.rep < event.minRep) return false;
	    if (event.requiresRecentLoss && career.lastResult?.won !== false) return false;
	    if (event.requiresCareerShift) {
	      const initialTier = Number.isFinite(career.flags?.initialTier)
	        ? career.flags.initialTier
	        : Math.max(0, (career.tier || 0) - 2);
	      const movedUp = (career.tier || 0) - initialTier >= 2;
	      const changedClub = Boolean(career.flags?.initialGymId && career.org?.id && career.org.id !== career.flags.initialGymId);
	      if (!movedUp && !changedClub) return false;
	    }
	    const dopingSignal = (career.flags?.dopingRisk || 0) + (career.flags?.doping || 0) * 12;
	    if (event.minDopingRisk && dopingSignal < event.minDopingRisk) return false;
	    if (event.requiresDoping && dopingSignal <= 0) return false;
	    if (event.requiresMmaResult && (!career.lastResult || career.lastResult.special)) return false;
	    if (event.requiresFight && !career.pendingFight) return false;
	    if (event.minFightHype && (career.pendingFight?.hype || 0) < event.minFightHype) return false;
	    if (event.titleOnly && !career.pendingFight?.title) return false;
    if (event.needsRival && !(career.rivals || []).some(rival => (rival.heat || 0) > 0)) return false;
    if (event.maxCondition && (career.condition || 70) > event.maxCondition) return false;
    if (event.minCondition && (career.condition || 70) < event.minCondition) return false;
    if (event.minInjuryRisk && (career.medical?.injuryRisk || 0) < event.minInjuryRisk) return false;
    if (event.requiresInjury && !career.medical?.activeInjury && !(career.medical?.injuries || []).length) return false;
    return true;
  }

	  function availableEvents(career) {
	    return EVENTS.filter(event => !event.campOnly && eventEligible(event, career));
	  }

  function eventDefinitionById(id) {
    return [...LIFE_EVENTS, ...EVENTS].find(event => event.id === id) || null;
  }

  function refreshEventDefinition(event) {
    if (!event?.id) return event || null;
    return eventDefinitionById(event.id) || event;
  }

	  function availableCampOpportunities(career) {
	    return EVENTS.filter(event => event.campOnly && eventEligible(event, career));
	  }

  function seasonFightTarget(career) {
    const plan = SEASON_PLANS.find(item => item.id === career.season?.strategy) || SEASON_PLANS.find(item => item.id === "standard");
    const medical = ensureMedical(career);
    const medicallyReduced = career.stats.durability <= 28 || medical.injuryRisk >= 65 || career.age >= 37;
    if (medicallyReduced) return 3;
    if (plan?.id === "marathon") {
      let target = 6;
      if (career.tier >= 2 && career.age < 34 && (career.condition || 70) >= 62) target += 1;
      if (career.tier >= 4 && career.hype >= 58 && career.stats.durability >= 42) target += 1;
      return clamp(target, 6, 8);
    }
    if (plan?.id === "spotlight") {
      let target = plan.target || 4;
      if (career.tier >= 3 && career.hype >= 42 && career.age < 34) target += 1;
      if (career.tier >= 4 && career.hype >= 74 && (career.condition || 70) >= 64) target += 1;
      return clamp(target, 4, 6);
    }
    if (plan?.id === "clean") {
      let target = plan.target || 3;
      if (career.tier >= 3 && career.stats.durability >= 55 && medical.injuryRisk <= 18) target += 1;
      return clamp(target, 3, 4);
    }
    let target = plan?.target || 4;
    if (career.tier >= 3 && career.hype >= 42 && career.age < 34) target = Math.max(target, 5);
    return clamp(target, 4, 5);
  }

  function seasonPlanById(id) {
    return SEASON_PLANS.find(plan => plan.id === id) || SEASON_PLANS[0];
  }

	  function seasonPlanImplication(career, plan, target) {
	    const parts = [formatCombats(target)];
	    if (plan.purseMult !== 1) parts.push(`bourses x${plan.purseMult.toFixed(2)}`);
	    if (plan.id === "marathon") parts.push("fatigue et blessures en hausse");
	    else if (plan.id === "spotlight") parts.push("hype et sollicitations en hausse");
	    else if (plan.id === "clean") parts.push("risque reduit");
	    else parts.push("rythme stable");
	    return parts.join(" | ");
	  }

  function seasonPurseMultiplier(career) {
    const plan = seasonPlanById(career.season?.strategy || "standard");
    return plan.purseMult || 1;
  }

  function adjustedFightHype(career, base = 0, fight = {}) {
    const org = orgForTier(career?.tier || 0);
    const titleBonus = fight.title ? 2 : 0;
    return Math.max(1, Math.round((base + titleBonus) * (org.hypeScale || 1)));
  }

  function adjustedFightMoney(career, base, fight = {}) {
    const proScale = career.tier >= 4 ? 1.38 : career.tier >= 2 ? 1.2 : 1;
    const orgScale = orgForTier(career.tier).purseScale || 1;
    const charismaScale = 1 + Math.min(0.18, (career.stats.charisma || 50) / 650);
    const contractScale = career.contract?.purseBoost || 1;
    const eventScale = fight.title ? 1.25 : fight.rematch ? 1.12 : fight.short ? 1.08 : 1;
    return Math.round(base * proScale * orgScale * charismaScale * contractScale * seasonPurseMultiplier(career) * eventScale / 500) * 500;
  }

  function campLength(fight) {
    if (fight?.short) return 2;
    if (fight?.title) return 5;
    return 4;
  }

	  function createCamp(career) {
	    const maxWeeks = campLength(career.pendingFight);
	    const opportunities = availableCampOpportunities(career);
	    const hasOpportunity = maxWeeks >= 3 && opportunities.length && nextRand(career) < 0.58;
	    const opportunity = hasOpportunity ? pick(career, opportunities) : null;
	    return {
	      fightId: career.pendingFight?.opponent?.id || normalizeFighterName(career.pendingFight?.opponent?.name),
	      week: 1,
	      maxWeeks,
	      fatigue: 0,
	      log: [],
	      injury: null,
	      opportunity: opportunity
	        ? {
	          id: opportunity.id,
	          week: clamp(2 + Math.floor(nextRand(career) * Math.max(1, maxWeeks - 1)), 2, maxWeeks),
	          used: false,
	        }
        : null,
    };
  }

  function campFatigueImpactFromValue(value = 0) {
    const fatigue = clamp(Math.round(value || 0), 0, 12);
    if (fatigue >= 12) {
      return {
        fatigue,
        label: "Cuit",
        score: -8,
        cardio: -12,
        conditionLoss: 10,
	        roundTax: 3,
	        finish: -0.04,
	        damage: 4,
	        injuryRisk: 14,
	        text: "A 12/12, le corps arrive vide: cardio, lucidite tardive, finish et resistance chutent fortement.",
      };
    }
    if (fatigue >= 10) {
      return {
        fatigue,
        label: "Dans le rouge",
        score: -5,
        cardio: -8,
        conditionLoss: 7,
	        roundTax: 2,
	        finish: -0.025,
	        damage: 2,
	        injuryRisk: 9,
	        text: "A 10/12 ou plus, chaque round coute plus cher et le risque de blessure augmente.",
      };
    }
    if (fatigue >= 8) {
      return {
        fatigue,
        label: "Fatigue haute",
        score: -3,
        cardio: -5,
        conditionLoss: 4,
	        roundTax: 1.2,
	        finish: -0.015,
	        damage: 1,
	        injuryRisk: fatigue >= 9 ? 6 : 4,
	        text: fatigue >= 9 ? "A 9/12, le cardio tient encore, mais le risque de blessure au combat monte franchement." : "A partir de 8/12, le cardio et les rounds tardifs deviennent moins fiables.",
      };
    }
    if (fatigue >= 6) {
      return {
        fatigue,
        label: "Fatigue moderee",
        score: -1,
        cardio: -2,
        conditionLoss: 1,
        roundTax: 0.55,
        finish: -0.006,
        damage: 0,
        injuryRisk: 1,
        text: "Entre 6 et 7/12, l'impact reste leger mais le camp commence a peser.",
      };
    }
    if (fatigue <= 2) {
      return {
        fatigue,
        label: "Frais",
        score: 1,
        cardio: 2,
        conditionLoss: 0,
        roundTax: 0,
        finish: 0.006,
        damage: -1,
        injuryRisk: -1,
        text: "Camp frais: petit bonus cardio et meilleure resistance aux degats.",
      };
    }
    return {
      fatigue,
      label: "Controle",
      score: 0,
      cardio: 0,
      conditionLoss: 0,
      roundTax: 0,
      finish: 0,
      damage: 0,
      injuryRisk: 0,
      text: "Fatigue controlee: pas d'impact notable en combat.",
    };
  }

  function campFatigueImpact(career) {
    return campFatigueImpactFromValue(career?.camp?.fatigue || 0);
  }

  function specialistTrainingPrice(career) {
    return Math.round((12000 + career.tier * 5500 + Math.min(28000, (career.hype || 0) * 240)) / 500) * 500;
  }

  function campHasSpecialist(camp) {
    return Boolean(camp?.log?.some(entry => entry.id === "specialist" || entry.label === "Coach specialiste"));
  }

  function trainingFocusEffects(career, focus) {
    if (focus.id !== "specialist") return focus.effects;
    return {
      ...focus.effects,
      money: -specialistTrainingPrice(career),
    };
  }

	  function trainingActionLabel(career, focus, camp) {
	    if (focus.id === "specialist") {
	      if (campHasSpecialist(camp)) return "Deja pris ce camp";
	      return `${focus.tag} | ${formatMoney(specialistTrainingPrice(career))} | fatigue +${focus.load || 0} | 1/camp`;
	    }
	    return `${focus.tag} | fatigue ${focus.load > 0 ? "+" : ""}${focus.load}`;
	  }

	  function choiceCost(effects = {}) {
	    return Math.max(0, -(effects.money || 0));
	  }

	  function creditShortage(career, amount = 0) {
	    return Math.max(0, Math.round(amount - Math.max(0, career?.money || 0)));
	  }

	  function canUseSmallCredit(career, amount = 0) {
	    const shortage = creditShortage(career, amount);
	    return shortage > 0 && shortage <= 6000 && (career.money || 0) >= 0 && !career.flags?.smallCreditOpen;
	  }

	  function canPay(career, amount = 0) {
	    return amount <= 0 || (career.money || 0) >= amount || canUseSmallCredit(career, amount);
	  }

	  function markSmallCreditIfNeeded(career, amount = 0) {
	    if (!canUseSmallCredit(career, amount)) return [];
	    const shortage = creditShortage(career, amount);
	    career.flags = career.flags || {};
	    career.flags.smallCreditOpen = true;
	    career.flags.smallCreditAmount = shortage;
	    return [{ key: "credit", value: shortage }];
	  }

	  function blockPaidChoice(career, title, amount, nextAction = "next-training-week", nextLabel = "Retour") {
	    showDecisionResult(career, {
	      title: "Budget insuffisant",
	      text: `${title} coute ${formatMoney(amount)}. Le staff accepte une petite avance seulement jusqu'a 6 k. La, il faut d'abord refaire rentrer du cash.`,
	      effects: [],
	      nextAction,
	      nextLabel,
	    });
	  }

  function startSeason() {
    const career = ui.career;
    career.season = {
      year: career.year,
      age: career.age,
      fightsTarget: 4,
      fightsDone: 0,
      strategy: null,
      planLabel: "",
      trainingBlocks: 0,
      trainingLog: [],
      lifeLog: [],
      fightLog: [],
      news: [],
      postFightEvents: 0,
      delayedResults: [],
      recentLifeEventIds: [],
      recentDelayedLifeEventIds: [],
      fightMomentHistory: [],
      settlement: null,
      recap: "",
    };
    career.condition = clamp(Math.max(career.condition || 70, 66) + Math.floor((career.morale - 55) / 10), 35, 96);
    career.phase = "season-setup";
    ui.view = "seasonSetup";
    saveCareer();
    render();
  }

	  function chooseSeasonPlan(id) {
	    const career = ui.career;
	    const plan = seasonPlanById(id);
    career.season.strategy = plan.id;
    career.season.planLabel = plan.label;
    career.season.fightsTarget = seasonFightTarget(career);
    const effects = applyEffects(career, plan.effects);
	    addNews(career, "Calendrier annonce", `${career.name} vise ${formatCombats(career.season.fightsTarget)}: ${plan.label.toLowerCase()}.`, plan.id === "marathon" ? "hot" : "neutral");
    addWorldNews(career, 2, "any");
    career.history.push({
      year: career.year,
      age: career.age,
	      text: `Plan de saison: ${plan.label}, ${formatCombats(career.season.fightsTarget)} prevus.`,
    });
    career.choiceResult = null;
    if (effects.length) {
      showDecisionResult(career, {
        title: plan.label,
        text: `Le camp organise l'annee autour de ce cap. ${seasonPlanImplication(career, plan, career.season.fightsTarget)}.`,
        effects,
        nextAction: "to-fight-offer",
        nextLabel: "Choisir le premier combat",
      });
      return;
    }
	    startFightSelection();
	  }

	  function routeSeasonProgress() {
	    const career = ui.career;
	    if (!career?.season) return;
	    if (career.season.fightsDone >= career.season.fightsTarget) {
	      routeSeasonSummary();
	      return;
	    }
	    if (maybeOfferSeasonPause(career)) return;
	    career.phase = "season-progress";
	    ui.view = "seasonProgress";
	    saveCareer();
	    render();
	  }

	  function routeSeasonSummary() {
	    const career = ui.career;
	    if (!career?.season) return;
	    if (!career.season.settled) settleSeason(career);
	    if (ensureContractOffers(career)) saveCareer();
	    career.phase = "season-summary";
	    ui.view = "seasonSummary";
	    saveCareer();
	    render();
	  }

	  function blockSeasonFightForSuspension(career, reason = "La commission bloque une date.") {
	    career.flags = career.flags || {};
	    if (!career.season || career.season.fightsDone >= career.season.fightsTarget) return null;
	    const before = career.season.fightsTarget;
	    const after = Math.max(career.season.fightsDone, before - 1);
	    career.season.fightsTarget = after;
	    career.flags.suspensionFights = Math.max(0, Math.round((career.flags.suspensionFights || 0) - 1));
		    career.pendingFight = null;
		    career.pendingFightOptions = null;
		    career.pendingTraining = null;
		    career.pendingPlan = null;
		    career.pendingPressChoice = null;
		    clearFightMomentState(career);
	    career.camp = null;
	    const text = `${reason} Le calendrier passe de ${formatCombats(before)} a ${formatCombats(after)} prevus cette saison.`;
	    addNews(career, "Date retiree du calendrier", text, "bad");
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text,
	    });
	    return {
	      before,
	      after,
	      complete: career.season.fightsDone >= career.season.fightsTarget,
	    };
	  }

	  function clearFightPreparation(career) {
	    career.pendingFight = null;
	    career.pendingFightOptions = null;
	    career.pendingTraining = null;
	    career.pendingEvent = null;
	    career.pendingLifeEvent = null;
	    career.pendingPlan = null;
	    career.pendingPressChoice = null;
	    clearFightMomentState(career);
	    career.camp = null;
	  }

	  function servePendingSuspension(career) {
	    if ((career.flags?.suspensionFights || 0) <= 0) return false;
	    const suspension = blockSeasonFightForSuspension(career, "La suspension administrative tombe au moment de signer.");
	    if (!suspension) return false;
	    showDecisionResult(career, {
	      title: "Date bloquee par la commission",
	      text: `Le promoteur retire une affiche du calendrier. Objectif saison: ${formatCombats(suspension.after)} maintenus sur ${formatCombats(suspension.before)}.`,
	      effects: [{ key: "suspension", value: 1 }],
	      nextAction: suspension.complete ? "to-season-summary" : "to-season-progress",
	      nextLabel: suspension.complete ? "Bilan de saison" : "Retour saison",
	    });
	    return true;
	  }

	  function shouldOfferSeasonPause(career) {
	    if (!career?.season || hasMedicalRest(career)) return false;
	    if (career.season.fightsDone <= 0 || career.season.fightsDone >= career.season.fightsTarget) return false;
	    if (career.pendingFight || career.camp || career.specialFight || career.pendingSpecial) return false;
	    if (career.flags?.seasonPauseDeclinedYear === career.year) return false;
	    if (career.flags?.seasonPauseOfferedYear === career.year) return false;
	    const medical = ensureMedical(career);
	    const risk = medical.injuryRisk || 0;
	    const health = career.stats?.durability || 78;
	    return risk >= 75 || health <= 32 || (risk >= 65 && health <= 45);
	  }

	  function maybeOfferSeasonPause(career) {
	    if (!shouldOfferSeasonPause(career)) return false;
	    career.flags.seasonPauseOfferedYear = career.year;
	    career.phase = "season-pause-choice";
	    ui.view = "seasonPauseChoice";
	    saveCareer();
	    render();
	    return true;
	  }

	  function chooseSeasonPauseOption(choice) {
	    const career = ui.career;
	    if (!career?.season) return;
	    if (choice === "pause") {
	      const before = career.season.fightsTarget;
	      const done = Math.max(1, career.season.fightsDone || 0);
	      career.season.healthPaused = true;
	      career.season.fightsTarget = done;
	      clearFightPreparation(career);
	      const effects = applyEffects(career, {
	        hype: -6,
	        rep: -2,
	        morale: -2,
	        condition: 8,
	        medicalCare: 18,
	        stats: { durability: 3, discipline: 1 },
	      });
	      const text = `Pause medicale: saison ecourtee de ${formatCombats(before)} a ${formatCombats(done)} pour sauver la carriere.`;
	      addNews(career, "Saison mise en pause", `${career.name} met le calendrier en pause pour faire redescendre le risque medical.`, "neutral");
	      career.history.push({ year: career.year, age: career.age, text });
	      settleSeason(career);
	      career.pendingContracts = buildContractOffers();
	      showDecisionResult(career, {
	        title: "Saison mise en pause",
	        text: "Le staff annule la suite de la saison. Le public rale un peu, mais le corps obtient enfin une vraie fenetre de securite.",
	        effects,
	        nextAction: "to-season-summary",
	        nextLabel: "Bilan de saison",
	      });
	      return;
	    }
	    career.flags.seasonPauseDeclinedYear = career.year;
	    const effects = applyEffects(career, { hype: 2, morale: -1, injuryRisk: 2 });
	    addNews(career, "Feu vert force", `${career.name} refuse de mettre la saison en pause malgre les voyants medicaux.`, "hot");
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: "Pause medicale refusee: le staff continue la saison sous surveillance.",
	    });
	    showDecisionResult(career, {
	      title: "Saison maintenue",
	      text: "Vous refusez de couper la saison. Le calendrier continue, mais le staff notera chaque exces de fatigue.",
	      effects,
	      nextAction: "to-season-progress",
	      nextLabel: "Continuer",
	    });
	  }

	  function chooseCareerSaveOption(choice) {
	    const career = ui.career;
	    if (!career) return;
	    if (choice === "retire") {
	      finishCareer("medical");
	      return;
	    }
	    if (!canOfferCareerSave(career)) {
	      finishCareer("medical");
	      return;
	    }
	    const medical = ensureMedical(career);
	    if (choice === "surgery") {
	      const cost = 55000;
	      if (!canPay(career, cost)) {
	        blockPaidChoice(career, "Operation privee", cost, "to-career-save-choice", "Autre solution");
	        return;
	      }
	      const effects = [
	        ...markSmallCreditIfNeeded(career, cost),
	        ...applyEffects(career, {
	          money: -cost,
	          hype: -4,
	          rep: -1,
	          morale: -3,
	          condition: 18,
	          medicalCare: 46,
	          stats: { durability: 11, discipline: 1 },
	        }),
	      ];
	      career.flags.medicalRetirement = false;
	      career.flags.careerSaveUsed = (career.flags.careerSaveUsed || 0) + 1;
	      career.flags.campInjuryGrace = Math.max(career.flags.campInjuryGrace || 0, 5);
	      medical.restWeeks = 0;
	      medical.activeInjury = null;
	      medical.careerWarnings = Math.max(0, (medical.careerWarnings || 0) - 1);
	      clearFightPreparation(career);
	      addNews(career, "Operation de sauvetage", `${career.name} finance une operation privee pour eviter une retraite medicale immediate.`, "neutral");
	      career.history.push({
	        year: career.year,
	        age: career.age,
	        text: `Operation privee: carriere sauvee, ${formatMoney(cost)} investis dans le corps.`,
	      });
	      showDecisionResult(career, {
	        title: "Operation privee",
	        text: "Le staff paie cher pour remettre le corps dans le circuit. La saison peut reprendre, mais le prochain camp devra etre propre.",
	        effects,
	        nextAction: career.season && career.season.fightsDone < career.season.fightsTarget ? "to-season-progress" : "to-season-summary",
	        nextLabel: career.season && career.season.fightsDone < career.season.fightsTarget ? "Reprendre prudemment" : "Bilan de saison",
	      });
	      return;
	    }
	    const currentSeason = career.season;
	    const effects = applyEffects(career, {
	      hype: -12,
	      rep: -4,
	      morale: -8,
	      condition: 24,
	      medicalCare: 58,
	      stats: { durability: 15, discipline: 2, cardio: -1 },
	    });
	    career.flags.medicalRetirement = false;
	    career.flags.careerSaveUsed = (career.flags.careerSaveUsed || 0) + 1;
	    career.flags.campInjuryGrace = Math.max(career.flags.campInjuryGrace || 0, 6);
	    if (currentSeason) {
	      currentSeason.healthPaused = true;
	      currentSeason.fightsTarget = currentSeason.fightsDone || currentSeason.fightsTarget || 0;
	    }
	    medical.restWeeks = 0;
	    medical.activeInjury = null;
	    medical.careerWarnings = Math.max(0, (medical.careerWarnings || 0) - 1);
	    clearFightPreparation(career);
	    addNews(career, "Saison blanche medicale", `${career.name} coupe une annee complete pour sauver sa carriere professionnelle.`, "bad");
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: "Saison blanche medicale: un an de recuperation pour eviter la retraite forcee.",
	    });
	    career.age += 1;
	    career.year += 1;
	    showDecisionResult(career, {
	      title: "Saison blanche",
	      text: "Vous disparaissez du calendrier pendant un an. Le corps respire enfin, mais le public et les promoteurs passent a autre chose.",
	      effects,
	      nextAction: "after-career-save-season",
	      nextLabel: "Nouvelle saison",
	    });
	  }

	  function startFightSelection() {
	    const career = ui.career;
	    if (hasMedicalRest(career)) {
	      routeMedicalRest("Repos obligatoire avant une nouvelle signature.");
	      return;
	    }
	    if (servePendingSuspension(career)) return;
	    if (maybeOfferSeasonPause(career)) return;
	    career.pendingTraining = null;
    career.pendingEvent = null;
    career.pendingLifeEvent = null;
	    career.pendingFightOptions = null;
	    career.pendingFight = null;
	    career.pendingPressChoice = null;
	    career.pendingPlan = null;
    clearFightMomentState(career);
    career.pendingContracts = null;
    career.choiceResult = null;
    career.camp = null;
    ui.resultChoice = null;
    if (maybeStartCareerSpecial()) return;
    buildFightOptions();
  }

  function createBoxingSpecial(career) {
    const opponent = pick(career, BOXING_OPPONENTS);
    const purseBase = 150000 + career.tier * 72000 + Math.floor((career.hype || 0) * 1250);
    const purse = adjustedFightMoney(career, purseBase, { title: true });
    return {
      id: "boxing-crossover",
      title: "Gala de boxe anglaise",
      opponent,
      purse,
      baseWinChance: 7 + Math.floor(nextRand(career) * 4),
      maxWeeks: 3,
      prepBonus: 0,
      pressBonus: 0,
      log: [],
      text: `${opponent.name}, ${opponent.trait}, veut vous attirer sur un ring de boxe anglaise. C'est une affiche hors MMA: gros cheque, peu de chances de gagner, et une vraie preparation a part.`,
    };
  }

  function maybeStartCareerSpecial() {
    const career = ui.career;
    if (!career?.season || !career.season.strategy) return false;
    if (career.pendingSpecial || career.specialFight || career.pendingFight || career.pendingFightOptions) return false;
    if (career.season.fightsDone >= career.season.fightsTarget) return false;
    if (career.tier < 2 || career.hype < 28) return false;
    if (career.flags.boxingOfferYear === career.year && !career.flags.forceBoxingOffer) return false;
    const chance = career.flags.forceBoxingOffer
      ? 1
      : 0.18 + Math.min(0.12, Math.max(0, career.hype - 28) / 360) + (career.tier >= 4 ? 0.05 : 0);
    if (nextRand(career) > chance) return false;
    career.pendingSpecial = createBoxingSpecial(career);
    career.flags.boxingOfferYear = career.year;
    career.flags.forceBoxingOffer = false;
    addNews(career, "Offre hors MMA", `${career.name} recoit une proposition de gala en boxe anglaise avant la prochaine signature MMA.`, "hot");
    career.phase = "career-special";
    ui.view = "careerSpecial";
    saveCareer();
    render();
    return true;
  }

  function chooseCareerSpecialOption(index) {
    const career = ui.career;
    const special = career?.pendingSpecial;
    if (!special) {
      startFightSelection();
      return;
    }
    if (index === 0) {
      const effects = applyEffects(career, { hype: 6, morale: 2, injuryRisk: 2, stats: { charisma: 1 } });
      career.specialFight = {
        ...special,
        stage: "camp",
        prepBonus: 0,
        pressBonus: 0,
        log: [],
      };
      career.specialCamp = {
        week: 1,
        maxWeeks: special.maxWeeks || 3,
        fatigue: 0,
        log: [],
      };
      career.pendingSpecial = null;
      career.pendingFightOptions = null;
      addNews(career, "Gala signe", `${career.name} signe un combat de boxe anglaise contre ${special.opponent.name}. Bourse annoncee: ${formatMoney(special.purse)}.`, "hot");
      showDecisionResult(career, {
        title: "Contrat de boxe signe",
        text: "Le calendrier MMA s'arrete net: place a trois semaines de preparation specifique, puis conference de presse, puis combat.",
        effects,
        nextAction: "to-special-camp",
        nextLabel: "Camp de boxe",
      });
      return;
    }
    const effects = applyEffects(career, { rep: 4, morale: 4, hype: -3, stats: { discipline: 1, iq: 1 } });
    career.pendingSpecial = null;
    addNews(career, "Gala refuse", `${career.name} refuse le ring d'anglaise et remet le focus sur le MMA.`, "neutral");
    showDecisionResult(career, {
      title: "Retour au MMA",
      text: "Vous gardez votre sport et transformez le refus en punchline. Le manager relance les offres MMA.",
      effects,
      nextAction: "to-fight-offer",
      nextLabel: "Choisir un combat MMA",
    });
  }

  function startSpecialCamp() {
    const career = ui.career;
    if (hasMedicalRest(career)) {
      routeMedicalRest("Pas de camp de boxe avant le feu vert medical.");
      return;
    }
    if (!career.specialFight) {
      startFightSelection();
      return;
    }
    if (!career.specialCamp) {
      career.specialCamp = { week: 1, maxWeeks: career.specialFight.maxWeeks || 3, fatigue: 0, log: [] };
    }
    career.specialFight.stage = "camp";
    career.phase = "special-camp";
    ui.view = "specialCamp";
    saveCareer();
    render();
  }

  function cancelSpecialFightForMedical(career, reason = "Le staff medical annule le gala.") {
    const special = career?.specialFight;
    if (!special) return;
    addNews(career, "Gala reporte", `${career.name} ne peut plus tenir le gala contre ${special.opponent.name}. ${reason}`, "bad");
    career.history.push({
      year: career.year,
      age: career.age,
      text: `Gala de boxe contre ${special.opponent.name} annule: ${reason}`,
    });
    career.pendingSpecial = null;
    career.specialFight = null;
    career.specialCamp = null;
  }

  function chooseSpecialTraining(id) {
    const career = ui.career;
    if (!career?.specialFight) {
      startFightSelection();
      return;
    }
    if (hasMedicalRest(career)) {
      routeMedicalRest("Le gala attendra le feu vert medical.");
      return;
    }
    const camp = career.specialCamp || { week: 1, maxWeeks: career.specialFight.maxWeeks || 3, fatigue: 0, log: [] };
    career.specialCamp = camp;
    const focus = BOXING_PREP.find(item => item.id === id) || BOXING_PREP[0];
    const week = camp.week;
    let effects = applyEffects(career, focus.effects);
    career.specialFight.prepBonus = (career.specialFight.prepBonus || 0) + (focus.chance || 0);
    camp.fatigue = clamp((camp.fatigue || 0) + (focus.load || 0), 0, 12);
    let interrupted = false;
    let interruptionText = "";
    const riskPressure = hasCompletedFight(career)
      ? (focus.risk || 0) * 0.55 + medicalRiskChanceContribution(career) * 0.35 + Math.max(0, camp.fatigue - 5) * 2 + conditionRiskPressure(career, 55)
      : 0;
    if (riskPressure > 0 && nextRand(career) * 100 < riskPressure) {
      const injury = registerInjury(career, `camp boxe ${focus.label}`, Math.max(4, Math.round(riskPressure / 6)), { label: "Alerte au camp de boxe" });
      effects = [...effects, ...injury.effects];
      interrupted = injury.restWeeks > 0;
      interruptionText = injury.restWeeks ? `${injury.label}: le gala saute, repos ${formatRestWeeks(injury.restWeeks)}.` : `${injury.label}: le staff surveille la suite.`;
    }
    camp.log.push({
      week,
      label: focus.label,
      effects,
      chance: focus.chance || 0,
      fatigue: camp.fatigue,
    });
    if (career.season) {
      career.season.trainingBlocks += 1;
      career.season.trainingLog.push({
        block: career.season.trainingBlocks,
        week,
        label: `Boxe: ${focus.label}`,
        text: focus.result,
        effects,
      });
    }
    career.history.push({
      year: career.year,
      age: career.age,
      text: `Camp de boxe semaine ${week}/${camp.maxWeeks}: ${focus.label}.`,
    });
    const campDone = week >= camp.maxWeeks;
    camp.week = Math.min(camp.maxWeeks, week + 1);
    if (interrupted) cancelSpecialFightForMedical(career, interruptionText);
    showDecisionResult(career, {
      title: `Boxe S${week}: ${focus.label}`,
	      text: interrupted ? `${focus.result} ${interruptionText}` : campDone ? `${focus.result} Le camp de boxe est boucle: les cameras arrivent.` : `${focus.result} Il reste ${formatWeeks(camp.maxWeeks - week)} avant la conference.`,
      effects,
      nextAction: hasMedicalRest(career) ? "to-medical-rest" : campDone ? "to-special-press" : "next-special-training-week",
      nextLabel: hasMedicalRest(career) ? "Repos medical" : campDone ? "Conference de presse" : `Semaine ${week + 1}`,
    });
  }

	  function chooseSpecialPress(id) {
    const career = ui.career;
    const special = career?.specialFight;
    if (!special) {
      startFightSelection();
      return;
    }
    const option = BOXING_PRESS_OPTIONS.find(item => item.id === id) || BOXING_PRESS_OPTIONS[0];
    let effects = applyEffects(career, option.effects);
    special.stage = "press";
    special.pressChoice = option.id;
    special.pressBonus = (special.pressBonus || 0) + (option.chance || 0);
    special.log.push({ stage: "press", label: option.label, effects });
    const extraText = "";
    if (career.season) {
      career.season.lifeLog.push({
        block: career.season.trainingBlocks,
        category: "Crossover",
        title: "Conference de presse boxe",
        choice: option.label,
        result: [option.result, extraText].filter(Boolean).join(" "),
        effects,
      });
    }
    addNews(career, "Conference de gala", `${career.name}: ${option.label}. ${option.result}`, option.effects?.hype > 0 ? "hot" : "neutral");
    career.specialCamp = null;
    if (hasMedicalRest(career)) cancelSpecialFightForMedical(career, extraText || "Incident pendant la conference.");
    showDecisionResult(career, {
      title: "Conference de presse",
      text: [option.result, extraText].filter(Boolean).join(" "),
      effects,
      visual: "press",
      nextAction: hasMedicalRest(career) ? "to-medical-rest" : "to-special-fight",
	      nextLabel: hasMedicalRest(career) ? "Repos medical" : "Combat de boxe",
	    });
	  }

	  function pressOptionIcon(id) {
	    if (id === "calm-respect") return "shield-check";
	    if (id === "sharp-punchline") return "message-circle";
	    if (id === "personal-trash") return "flame";
	    if (id === "bottle-chaos") return "glass-water";
	    if (id === "staredown-push") return "triangle-alert";
	    return "mic";
	  }

	  function pressNews(career, option, tone, consequences = {}) {
	    const name = career.name;
	    const opponent = career.pendingFight?.opponent?.name || "son adversaire";
	    if (consequences.injury) {
	      return {
	        title: "Conference interrompue",
	        text: `${name} quitte la salle avec une alerte physique apres une conference partie trop loin contre ${opponent}. La commission surveille la date.`,
	      };
	    }
	    const byOption = {
	      "calm-respect": {
	        title: "Conference sous controle",
	        text: `${name} refuse le theatre et vend surtout le niveau sportif contre ${opponent}. Les sponsors prudents apprecient le ton.`,
	      },
	      "sharp-punchline": {
	        title: "Phrase reprise partout",
	        text: `${name} glisse une punchline courte face a ${opponent}. Les clips tournent, sans donner de pretexte a la commission.`,
	      },
	      "personal-trash": {
	        title: "Conference qui pique",
	        text: `${name} attaque l'ego de ${opponent}. L'affiche chauffe, mais l'adversaire repart avec du carburant.`,
	      },
	      "bottle-chaos": {
	        title: "Bouteille et securite",
	        text: `La conference de ${name} vire au chaos apres un projectile lance vers le clan adverse. L'affiche explose, la facture aussi.`,
	      },
	      "staredown-push": {
	        title: "Face-off sous tension",
	        text: `${name} et ${opponent} sont separes apres une bousculade au face-off. La video vend le combat, les officiels notent tout.`,
	      },
	    };
	    return byOption[option.id] || {
	      title: tone === "bad" ? "Conference tendue" : "Conference de combat",
	      text: `${name} choisit une posture mediatique avant ${opponent}. Les premieres retombees arrivent deja.`,
	    };
	  }

	  function startPressConference() {
	    const career = ui.career;
	    if (!career?.pendingFight) {
	      startFightSelection();
	      return;
	    }
	    preloadGameAssets("press");
	    if (hasMedicalRest(career)) {
	      routeMedicalRest("La conference attendra le feu vert medical.");
	      return;
	    }
	    career.phase = "press-conference";
	    ui.view = "pressConference";
	    saveCareer();
	    render();
	  }

	  function choosePressOption(id) {
	    const career = ui.career;
	    const fight = career?.pendingFight;
	    if (!fight) {
	      startFightSelection();
	      return;
	    }
	    const option = PRESS_OPTIONS.find(item => item.id === id) || PRESS_OPTIONS[0];
	    let effects = applyEffects(career, option.effects || {});
	    const consequences = { text: "", effects: [], injury: null };
	    effects = [...effects, ...consequences.effects];
	    const resultText = [option.result, consequences.text].filter(Boolean).join(" ");
	    const tone = consequences.injury || option.effects?.scandal > 0 || option.effects?.rep < 0 ? "bad" : option.effects?.hype > 4 ? "hot" : "neutral";
	    if (option.effects?.rivalry > 0) markRival(career, fight.opponent, option.effects.rivalry);
	    career.pendingPressChoice = {
	      id: option.id,
	      label: option.label,
	      result: resultText,
	      fight: option.fight || {},
	      effects,
	    };
	    if (career.season) {
	      career.season.lifeLog.push({
	        block: career.season.trainingBlocks,
	        category: "Media",
	        title: "Conference de presse",
	        choice: option.label,
	        result: resultText,
	        effects,
	      });
	    }
	    const news = pressNews(career, option, tone, consequences);
	    addNews(career, news.title, news.text, tone);
	    if (option.effects?.hype >= 10 || option.effects?.scandal > 0) addWorldNews(career, 1, option.effects.scandal > 0 ? "scandals" : "business");
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: `Conference contre ${fight.opponent.name}: ${option.label}.`,
	    });
	    if (hasMedicalRest(career)) cancelPendingFightForMedical(career, "Incident en conference de presse.");
	    preloadGameAssets("press");
	    showDecisionResult(career, {
	      title: "Conference de presse",
	      text: resultText,
	      effects,
	      visual: "press",
	      nextAction: hasMedicalRest(career) ? "to-medical-rest" : "to-fight-plan",
	      nextLabel: hasMedicalRest(career) ? "Repos medical" : "Plan de coin",
	    });
	  }

	  function simulateSpecialFight() {
    const career = ui.career;
    const special = career?.specialFight;
    if (!special) {
      startFightSelection();
      return;
    }
    if (hasMedicalRest(career)) {
      routeMedicalRest("Impossible de boxer sans feu vert medical.");
      return;
    }
    const medical = ensureMedical(career);
    const chance = clamp(
      Math.round(
        (special.baseWinChance || 8) +
        (special.prepBonus || 0) +
        (special.pressBonus || 0) +
        Math.max(0, (career.stats.striking || 50) - 60) * 0.16 +
        Math.max(0, (career.stats.power || 50) - 65) * 0.07 +
        Math.max(0, (career.stats.iq || 50) - 70) * 0.05 +
        Math.max(-4, ((career.condition || 70) - 65) * 0.05) -
        medical.injuryRisk * 0.04
      ),
      3,
      32
    );
    const won = nextRand(career) * 100 < chance;
    const method = won
      ? (nextRand(career) > 0.42 ? "Decision" : "TKO")
      : (nextRand(career) > 0.32 ? "TKO" : "Decision");
    const round = method === "Decision" ? 8 : 3 + Math.floor(nextRand(career) * 5);
    const scoreText = method === "Decision" ? (won ? "77-75" : "72-80") : `${method} R${round}`;
    let effects = applyEffects(career, won
      ? { money: special.purse, rep: 14, hype: 18, morale: 8, injuryRisk: 4, stats: { striking: 3, charisma: 3, iq: 1 } }
      : { money: special.purse, rep: -4, hype: 8, morale: -6, injuryRisk: 7, stats: { charisma: 2, cardio: -1 } }
    );
    const damage = Math.max(3, Math.round((won ? 5 : 9) + medical.injuryRisk / 18 + (special.pressChoice === "staredown-chaos" ? 1 : 0)));
    career.stats.durability = clamp((career.stats.durability || 55) - damage, 1, statCapForCareer(career));
    career.condition = clamp((career.condition || 70) - damage - (won ? 4 : 8), 0, 100);
    effects = [
      ...effects,
      { key: "durability", value: -damage },
      { key: "condition", value: -(damage + (won ? 4 : 8)) },
    ];
    const report = won
      ? [
        { round: 1, winner: "Vous", text: "Vous survivez aux premieres feintes sans chercher le takedown reflexe." },
        { round: 3, winner: special.opponent.name, text: "Le boxeur touche plus propre, mais les appuis travaillent enfin." },
        { round: round, winner: "Vous", text: method === "Decision" ? "Le volume et le clinch discret volent des rounds improbables." : "Un contre court secoue le favori et l'arbitre stoppe le bruit." },
      ]
      : [
        { round: 1, winner: special.opponent.name, text: "La difference de ring craft saute aux yeux des les premieres minutes." },
        { round: 3, winner: special.opponent.name, text: "Vous tenez au mental, mais chaque jab vous remet a votre vrai sport." },
        { round: round, winner: special.opponent.name, text: method === "Decision" ? "Vous allez au bout, le score ne ment pas." : "La pression finit par casser la garde." },
      ];
    const analysis = [
      `Chance reelle estimee: ${chance}%. En anglaise pure, votre marge reste minuscule.`,
      special.prepBonus > 0 ? `Le camp specifique a ajoute ${special.prepBonus} point(s) de chance.` : "Le manque de prep specifique s'est senti.",
      won ? "L'upset change votre valeur de star au-dela du MMA." : "La defaite etait probable, mais la bourse finance la suite de carriere.",
      `Bourse encaissee: ${formatMoney(special.purse)}.`,
    ];
    let injury = null;
    const lowMedicalGate = medical.injuryRisk < 35 ? 0.6 : 1;
    const injuryChance = clamp((5 + damage * 1.8 + (won ? 0 : 4)) * lowMedicalGate + medicalRiskChanceContribution(career) + conditionRiskPressure(career, 48) * 0.45, 0, 66);
    if (nextRand(career) * 100 < injuryChance) {
      injury = registerInjury(career, `combat de boxe contre ${special.opponent.name}`, Math.max(5, Math.round(injuryChance / 5)), { label: won ? "Main abimee" : "Arcade ouverte" });
      effects = [...effects, ...injury.effects];
      analysis.push(`${injury.label}: le gala ajoute une vraie dette physique.`);
    }
    addNews(
      career,
      won ? "Miracle en anglaise" : "Money fight",
      `${career.name} ${won ? "renverse" : "perd contre"} ${special.opponent.name} en boxe anglaise (${scoreText}).`,
      won ? "hot" : "neutral"
    );
    career.moments.push(won ? "Upset improbable sur un ring de boxe anglaise." : "Money fight en anglaise: defaite attendue, bourse enorme.");
    career.exhibitions.push({
      year: career.year,
      age: career.age,
      sport: "Boxe anglaise",
      opponent: special.opponent.name,
      result: won ? "Victoire" : "Defaite",
      method,
      round,
      money: special.purse,
    });
    if (career.season) {
      career.season.fightsDone += 1;
      career.season.fightLog.push({
        number: career.season.fightsDone,
        opponent: special.opponent.name,
        result: won ? "Victoire" : "Defaite",
        method,
        round,
        title: false,
        special: "Boxe anglaise",
        scoreText,
        analysis,
      });
    }
    career.history.push({
      year: career.year,
      age: career.age,
      text: `${won ? "Victoire" : "Defaite"} en boxe anglaise contre ${special.opponent.name} (${scoreText}).`,
    });
    career.lastResult = {
      special: true,
      won,
      method,
      round,
      scoreText,
      opponent: special.opponent,
      report,
      fight: { tag: "Boxe anglaise", money: special.purse },
      damage,
      analysis,
      injury,
      effects,
      chance,
    };
    career.pendingSpecial = null;
    career.specialFight = null;
    career.specialCamp = null;
    career.pendingFightOptions = null;
    career.pendingFight = null;
    career.phase = "special-result";
    ui.view = "specialResult";
    saveCareer();
    render();
  }

  function advanceAfterSpecialFight() {
    const career = ui.career;
    career.pendingSpecial = null;
    career.specialFight = null;
    career.specialCamp = null;
	    career.pendingFightOptions = null;
	    career.pendingFight = null;
	    clearFightMomentState(career);
	    career.pendingTraining = null;
    career.pendingEvent = null;
    career.choiceResult = null;
    if (career.flags.medicalRetirement) {
      addNews(career, "Commission medicale", `${career.name} est arrete par le staff medical apres des blessures repetees.`, "bad");
	      routeCareerSaveChoice(career);
      return;
    }
    if (hasMedicalRest(career)) {
      career.phase = "medical-rest";
      ui.view = "medicalRest";
      saveCareer();
      render();
      return;
    }
    if (career.season && career.season.fightsDone < career.season.fightsTarget) {
      if (maybeOfferSeasonPause(career)) return;
      if (maybePreparePostFightLifeEvent(career)) return;
      career.phase = "season-progress";
      ui.view = "seasonProgress";
      saveCareer();
      render();
      return;
    }
    settleSeason(career);
    career.pendingContracts = buildContractOffers();
    career.phase = "season-summary";
    ui.view = "seasonSummary";
    saveCareer();
    render();
  }

  function startTrainingBlock() {
    const career = ui.career;
    if (hasMedicalRest(career)) {
      routeMedicalRest("Pas de camp avant le feu vert medical.");
      return;
    }
    if (!career.pendingFight) {
      startFightSelection();
      return;
    }
    career.pendingTraining = null;
    career.pendingEvent = null;
    career.pendingLifeEvent = null;
    career.pendingPlan = null;
    career.pendingContracts = null;
    career.choiceResult = null;
    const fightId = career.pendingFight?.opponent?.id || normalizeFighterName(career.pendingFight?.opponent?.name);
    if (!career.camp || career.camp.fightId !== fightId) career.camp = createCamp(career);
    career.phase = "training";
    ui.resultChoice = null;
    ui.view = "training";
    saveCareer();
    render();
  }

  function availableLifeEvents(career) {
    return [
      ...LIFE_EVENTS.filter(event => !event.standalone && !event.postFightOnly && eventEligible(event, career)),
      ...availableEvents(career).filter(event => event.id !== "short-notice" && !event.postFightOnly),
    ];
  }

  function availablePostFightLifeEvents(career) {
    const blocked = ["diet-cheat", "foot-shard", "media-bus-melee", "presser-bottles", "weight-cut", "trash-talk", "injury-hide", "media-tour", "fan-pressure"];
    const postFightOnly = [
      ...LIFE_EVENTS.filter(event => event.postFightOnly && eventEligible(event, career)),
      ...EVENTS.filter(event => event.postFightOnly && eventEligible(event, career)),
    ];
    const seen = new Set();
    return [...availableLifeEvents(career), ...postFightOnly].filter(event => {
      if (!event || seen.has(event.id)) return false;
      seen.add(event.id);
      return (
      !event.requiresFight &&
      !event.standalone &&
      !blocked.includes(event.id)
      );
    });
  }

  function hasDelayedChoice(event) {
    return Boolean(event?.options?.some(option => option.delayed));
  }

  function rememberRecentId(target, key, id, limit = 8) {
    if (!target || !id) return;
    const previous = Array.isArray(target[key]) ? target[key].filter(item => item !== id) : [];
    target[key] = [...previous, id].slice(-limit);
  }

  function rememberLifeEvent(career, event) {
    if (!career || !event?.id) return;
    career.flags = career.flags || {};
    if (career.flags.lastLifeEventId === event.id) return;
    rememberRecentId(career.flags, "recentLifeEventIds", event.id, 8);
    career.flags.lastLifeEventId = event.id;
    if (career.season) {
      rememberRecentId(career.season, "recentLifeEventIds", event.id, 8);
    }
    if (hasDelayedChoice(event)) {
      rememberRecentId(career.flags, "recentDelayedLifeEventIds", event.id, 6);
      if (career.season) rememberRecentId(career.season, "recentDelayedLifeEventIds", event.id, 6);
    }
  }

  function filterRepeatedLifeEvents(career, events) {
    if (!Array.isArray(events) || events.length <= 1) return events || [];
    const recent = new Set([
      ...((career.flags?.recentLifeEventIds || []).slice(-5)),
      ...((career.season?.recentLifeEventIds || []).slice(-5)),
    ]);
    const recentDelayed = new Set([
      ...((career.flags?.recentDelayedLifeEventIds || []).slice(-4)),
      ...((career.season?.recentDelayedLifeEventIds || []).slice(-4)),
    ]);
    const fresh = events.filter(event => !recent.has(event.id) && !(hasDelayedChoice(event) && recentDelayed.has(event.id)));
    if (fresh.length) return fresh;
    const notLast = events.filter(event => event.id !== career.flags?.lastLifeEventId);
    return notLast.length ? notLast : events;
  }

  function pickLifeEvent(career, events) {
    const pool = filterRepeatedLifeEvents(career, events);
    const event = pick(career, pool.length ? pool : events);
    rememberLifeEvent(career, event);
    return event;
  }

  function maybePreparePostFightLifeEvent(career) {
    if (!career?.season || career.season.fightsDone >= career.season.fightsTarget) return false;
    const events = availablePostFightLifeEvents(career);
    if (!events.length) return false;
    const plan = seasonPlanById(career.season.strategy || "standard");
    const alreadySeen = career.season.postFightEvents || 0;
    const expectedMinimum = Math.floor((career.season.fightsDone || 0) / 2);
    let chance = 0.42;
    if (plan.id === "marathon") chance += 0.26;
    if (plan.id === "spotlight") chance += 0.18;
    if ((career.flags.scandal || 0) > 8 || ensureMedical(career).injuryRisk > 20) chance += 0.14;
    if (alreadySeen < expectedMinimum) chance = 1;
    if (nextRand(career) > chance) return false;
    career.pendingEvent = pickLifeEvent(career, events);
    career.season.postFightEvents = alreadySeen + 1;
    career.phase = "life-event";
    ui.view = "lifeEvent";
    saveCareer();
    render();
    return true;
  }

	  function applyEffects(career, effects = {}) {
	    const shown = [];
	    const direct = ["money", "rep", "hype", "morale", "condition"];
	    career.flags = career.flags || {};
	    direct.forEach(key => {
	      if (effects[key]) {
	        const max = key === "money" ? 99999999 : key === "morale" || key === "condition" ? 100 : 160;
	        career[key] = clamp((career[key] || 0) + effects[key], key === "money" ? -999999 : 0, max);
	        if (key === "money" && career.money >= 0) {
	          career.flags.smallCreditOpen = false;
	          career.flags.smallCreditAmount = 0;
	        }
	        shown.push({ key, value: effects[key] });
      }
    });
    if (effects.stats) {
      const statCap = statCapForCareer(career);
      Object.entries(effects.stats).forEach(([key, value]) => {
        career.stats[key] = clamp((career.stats[key] || 50) + value, 1, statCap);
        shown.push({ key, value });
      });
    }
    career.medical = career.medical || { injuryRisk: 0, restWeeks: 0, injuries: [], rehabLog: [] };
    if (effects.injuryRisk) {
      career.medical.injuryRisk = clamp((career.medical.injuryRisk || 0) + effects.injuryRisk, 0, 90);
      shown.push({ key: "injuryRisk", value: effects.injuryRisk });
    }
    if (effects.medicalCare) {
      career.medical.injuryRisk = clamp((career.medical.injuryRisk || 0) - effects.medicalCare, 0, 90);
      shown.push({ key: "medicalCare", value: effects.medicalCare });
    }
    if (effects.restWeeks) {
      career.medical.restWeeks = Math.max(0, Math.round((career.medical.restWeeks || 0) + effects.restWeeks));
      shown.push({ key: "restWeeks", value: effects.restWeeks });
    }
	    if (effects.scandal) {
	      career.flags.scandal = clamp((career.flags.scandal || 0) + effects.scandal, 0, 60);
	      shown.push({ key: "scandal", value: effects.scandal });
	    }
	    if (effects.dopingRisk) {
	      career.flags.dopingRisk = clamp((career.flags.dopingRisk || 0) + effects.dopingRisk, 0, 100);
	      shown.push({ key: "dopingRisk", value: effects.dopingRisk });
	    }
	    if (effects.doping) {
	      career.flags.doping = clamp((career.flags.doping || 0) + effects.doping, 0, 10);
	      shown.push({ key: "doping", value: effects.doping });
	    }
	    if (effects.suspension) {
	      career.flags.suspensionFights = Math.max(0, Math.round((career.flags.suspensionFights || 0) + effects.suspension));
	      shown.push({ key: "suspension", value: effects.suspension });
	    }
	    if (effects.rivalry) {
	      career.flags.rivalry = clamp((career.flags.rivalry || 0) + effects.rivalry, 0, 40);
      shown.push({ key: "rivalry", value: effects.rivalry });
    }
    if (effects.doublePath) {
      career.flags.doublePath = true;
      shown.push({ key: "doublePath", value: 1 });
    }
    if (effects.locked) {
      career.flags.lockedContract = (career.flags.lockedContract || 0) + 1;
      shown.push({ key: "locked", value: effects.locked });
    }
    return shown;
  }

  function addDelayedConsequence(career, item = {}) {
    career.pendingConsequences = Array.isArray(career.pendingConsequences) ? career.pendingConsequences : [];
    const consequence = {
      id: `${item.kind || "event"}-${career.year}-${career.pendingConsequences.length + 1}-${Math.floor(nextRand(career) * 100000)}`,
      kind: item.kind || "generic",
      title: item.title || "Consequence differee",
      source: item.source || "",
      stake: item.stake || 0,
      createdYear: career.year,
      resolveYear: item.resolveYear || career.year,
      choice: item.choice || "",
    };
    career.pendingConsequences.push(consequence);
    return consequence;
  }

  function resolveDelayedConsequence(career, item) {
    if (item.kind === "restaurant") {
      const edge = Math.max(-10, Math.min(12, ((career.stats.charisma || 50) - 50) * 0.14 + ((career.stats.discipline || 50) - 50) * 0.08 + ((career.rep || 0) - 40) * 0.04));
      const roll = nextRand(career) * 100;
      if (roll < 42 + edge) {
        const effects = applyEffects(career, { money: 46000, morale: 8, rep: 5, stats: { charisma: 1 } });
        return {
          title: item.title,
          outcome: "Succes",
          text: "Le restaurant devient le spot healthy des camps locaux. Votre mise revient avec une vraie plus-value.",
          effects,
        };
      }
      if (roll < 74 + edge) {
        const effects = applyEffects(career, { money: 6000, morale: 3, rep: 1 });
        return {
          title: item.title,
          outcome: "A l'equilibre",
          text: "Le restaurant survit. Pas le jackpot, mais votre pote tient debout et le quartier respecte le geste.",
          effects,
        };
      }
      const effects = applyEffects(career, { money: -12000, morale: -5, rep: -1 });
      return {
        title: item.title,
        outcome: "Echec",
        text: "Les travaux derapent, la salle reste vide et votre pote demande encore du temps. L'argent ne revient pas.",
        effects,
      };
    }
    const delayedProfiles = {
      gym: {
        edge: ((career.stats.discipline || 50) - 50) * 0.1 + ((career.rep || 0) - 35) * 0.06,
        success: {
          effects: { money: 62000, rep: 7, morale: 5, stats: { discipline: 1, charisma: 1 } },
          text: "La salle remplit ses cours et devient un spot credible pour les jeunes du quartier. Votre mise revient avec une vraie plus-value.",
        },
        middle: {
          effects: { money: 10000, rep: 3, morale: 2 },
          text: "La salle tient debout. Pas encore une machine a cash, mais le nom gagne du poids localement.",
        },
        fail: {
          effects: { money: -16000, rep: -2, morale: -4 },
          text: "Les loyers, les travaux et les coachs coutent plus que prevu. La salle survit mal et votre tresorerie encaisse.",
        },
      },
      clothing: {
        edge: ((career.stats.charisma || 50) - 50) * 0.16 + ((career.hype || 0) - 25) * 0.08,
        success: {
          effects: { money: 42000, hype: 8, rep: 3, stats: { charisma: 2 } },
          text: "Le drop part vite. Les fans portent le logo et une marque plus grosse appelle deja.",
        },
        middle: {
          effects: { money: 4000, hype: 3, morale: 2 },
          text: "La capsule ne casse pas internet, mais elle trouve son public. Le crew evite le trou financier.",
        },
        fail: {
          effects: { money: -9000, hype: -2, morale: -3, stats: { discipline: -1 } },
          text: "Trop de stock, pas assez de commandes. Les cartons restent au local et le staff demande de revenir au combat.",
        },
      },
      media: {
        edge: ((career.stats.charisma || 50) - 50) * 0.14 + ((career.hype || 0) - 20) * 0.06 - ((career.flags.scandal || 0) * 0.08),
        success: {
          effects: { money: 26000, hype: 9, rep: 2, stats: { charisma: 2 } },
          text: "Les episodes de coulisses prennent. Le public comprend mieux votre camp et les sponsors adorent le format.",
        },
        middle: {
          effects: { hype: 4, morale: 2, money: 2000 },
          text: "L'emission reste niche mais utile. Les fans les plus chauds suivent, sans transformer la tresorerie.",
        },
        fail: {
          effects: { hype: -3, morale: -4, condition: -2 },
          text: "Les cameras fatiguent le camp et l'audience ne suit pas. Le staff ferme la porte aux tournages.",
        },
      },
      sparringApp: {
        edge: ((career.stats.charisma || 50) - 50) * 0.1 + ((career.rep || 0) - 30) * 0.08 + ((career.stats.iq || 50) - 50) * 0.05,
        success: {
          effects: { money: 34000, rep: 4, hype: 3, stats: { iq: 1 } },
          text: "L'appli trouve des clubs partenaires et devient un outil credible pour organiser les sparrings. Votre mise revient avec bonus.",
        },
        middle: {
          effects: { money: 6000, rep: 2, morale: 1 },
          text: "Quelques salles utilisent l'appli. Ce n'est pas encore gros, mais le projet reste vivant et votre nom circule proprement.",
        },
        fail: {
          effects: { money: -7000, morale: -3, rep: -1 },
          text: "Les clubs preferent les groupes prives et les coups de fil. L'appli cale, votre ticket aussi.",
        },
      },
      physioStudio: {
        edge: ((career.rep || 0) - 35) * 0.05 + ((career.stats.discipline || 50) - 50) * 0.08 + ((career.stats.durability || 50) - 50) * 0.03,
        success: {
          effects: { money: 42000, medicalCare: 12, rep: 4, stats: { durability: 2 } },
          text: "Le cabinet devient une adresse serieuse pour les combattants. Vous recuperez de l'argent et un acces prioritaire aux soins.",
        },
        middle: {
          effects: { money: 5000, medicalCare: 7, morale: 2 },
          text: "Le cabinet tourne lentement. Pas de gros gain, mais le suivi medical de votre camp s'ameliore.",
        },
        fail: {
          effects: { money: -12000, morale: -4, medicalCare: 2 },
          text: "Le loyer et le materiel mangent la marge. Le soin reste utile, l'investissement beaucoup moins.",
        },
      },
      mouthguard: {
        edge: ((career.hype || 0) - 20) * 0.08 + ((career.stats.charisma || 50) - 50) * 0.12,
        success: {
          effects: { money: 18000, hype: 5, rep: 2, stats: { charisma: 1 } },
          text: "Le protege-dents signature se vend mieux que prevu. Les royalties arrivent sans avoir bloque votre cash.",
        },
        middle: {
          effects: { money: 4000, hype: 2 },
          text: "Les ventes restent modestes, mais l'objet circule chez les fans les plus fideles.",
        },
        fail: {
          effects: { hype: -2, rep: -1, morale: -1 },
          text: "Le produit passe inapercu. Pas de trou financier, mais la marque evite de prolonger l'operation.",
        },
      },
      mouthguardStock: {
        edge: ((career.hype || 0) - 25) * 0.1 + ((career.stats.charisma || 50) - 50) * 0.14 - ((career.flags.scandal || 0) * 0.06),
        success: {
          effects: { money: 48000, hype: 7, rep: 3, stats: { charisma: 2 } },
          text: "Le stock part pendant la fight week. Le pari commercial devient un vrai coup de com.",
        },
        middle: {
          effects: { money: 9000, hype: 3, morale: 1 },
          text: "Une partie du stock se vend. Ce n'est pas le jackpot, mais le garage respire.",
        },
        fail: {
          effects: { money: -10000, hype: -3, morale: -3, stats: { discipline: -1 } },
          text: "Trop de boites, pas assez de fans acheteurs. Le staff vous demande de revenir aux rounds, pas aux cartons.",
        },
      },
    };
    const profile = delayedProfiles[item.kind];
    if (profile) {
      const edge = clamp(profile.edge || 0, -12, 14);
      const roll = nextRand(career) * 100;
      const selected = roll < 40 + edge
        ? { outcome: "Succes", ...profile.success }
        : roll < 74 + edge
          ? { outcome: "Mitige", ...profile.middle }
          : { outcome: "Echec", ...profile.fail };
      const effects = applyEffects(career, selected.effects);
      return {
        title: item.title,
        outcome: selected.outcome,
        text: selected.text,
        effects,
      };
    }
    const effects = applyEffects(career, { morale: 1 });
    return {
      title: item.title || "Consequence differee",
      outcome: "Retombee",
      text: "La decision laisse une trace discrete dans l'entourage.",
      effects,
    };
  }

  function resolveSeasonConsequences(career) {
    career.pendingConsequences = Array.isArray(career.pendingConsequences) ? career.pendingConsequences : [];
    const due = career.pendingConsequences.filter(item => (item.resolveYear || career.year) <= career.year);
    if (!due.length) return [];
    career.pendingConsequences = career.pendingConsequences.filter(item => !due.includes(item));
    const results = due.map(item => resolveDelayedConsequence(career, item));
    results.forEach(result => {
      addNews(career, result.title, `${result.outcome}: ${result.text}`, result.outcome === "Echec" ? "bad" : result.outcome === "Succes" ? "good" : "neutral");
      career.history.push({
        year: career.year,
        age: career.age,
        text: `${result.title}: ${result.outcome}. ${result.text}`,
      });
    });
    if (career.season) {
      career.season.delayedResults = [
        ...(career.season.delayedResults || []),
        ...results,
      ];
    }
    return results;
  }

  function effectLabel(key) {
    return STAT_LABELS[key] || VALUE_LABELS[key] || key;
  }

  function formatEffectMoney(value) {
    const abs = Math.abs(Math.round(value || 0));
    if (abs >= 1000000) return formatMoney(abs);
    return String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function effectText(key, value) {
    if (key === "money") {
      return value < 0
        ? `Cout = ${formatEffectMoney(value)}`
        : `${effectLabel(key)} +${formatEffectMoney(value)}`;
    }
    return `${effectLabel(key)} ${value > 0 ? "+" : ""}${value}`;
  }

	  function effectIsGood(key, value) {
		    if (["injuryRisk", "restWeeks", "scandal", "locked", "dopingRisk", "doping", "suspension", "credit"].includes(key)) return value < 0;
	    return value >= 0;
	  }

  function objectiveValueLabel(item) {
    const value = Math.min(item.value, item.target);
    if (item.target >= 1000) return `${formatMoney(value)}/${formatMoney(item.target)}`;
    return `${value}/${item.target}`;
  }

  function ensureMedical(career) {
    career.medical = {
      injuryRisk: 0,
      restWeeks: 0,
      activeInjury: null,
      injuries: [],
      rehabLog: [],
      careerWarnings: 0,
      ...(career.medical || {}),
    };
    career.medical.injuries = Array.isArray(career.medical.injuries) ? career.medical.injuries : [];
    career.medical.rehabLog = Array.isArray(career.medical.rehabLog) ? career.medical.rehabLog : [];
    career.medical.injuryRisk = clamp(career.medical.injuryRisk || 0, 0, 90);
    career.medical.restWeeks = Math.max(0, Math.round(career.medical.restWeeks || 0));
    return career.medical;
  }

  function hasMedicalRest(career) {
    return Boolean(career && ensureMedical(career).restWeeks > 0);
  }

  function careerFightCount(career) {
    if (!career) return 0;
    const recordCount = (career.record?.w || 0) + (career.record?.l || 0) + (career.record?.d || 0);
    return Math.max(recordCount, Array.isArray(career.fights) ? career.fights.length : 0);
  }

  function hasCompletedFight(career) {
    return careerFightCount(career) > 0;
  }

  function medicalRiskChanceContribution(career) {
    const risk = ensureMedical(career).injuryRisk || 0;
    if (risk < 35) return risk * 0.035;
    if (risk < 75) return 1.25 + (risk - 35) * 0.75;
    return 31.25 + (risk - 75) * 0.9;
  }

  function conditionRiskPressure(career, baseline = 55) {
    const condition = career?.condition ?? 70;
    if (condition >= baseline) return 0;
    if (condition >= 45) return (baseline - condition) * 0.14;
    if (condition >= 30) return (baseline - 45) * 0.14 + (45 - condition) * 0.32;
    return (baseline - 45) * 0.14 + 15 * 0.32 + (30 - condition) * 0.55;
  }

  function formatRestWeeks(weeks) {
    const value = Math.max(0, Math.round(weeks || 0));
    return `${value} semaine${value > 1 ? "s" : ""}`;
  }

  function injurySeverityLabel(severity) {
    return ({
      alerte: "Alerte medicale",
      legere: "Blessure legere",
      serieuse: "Blessure serieuse",
      grave: "Blessure grave",
      critique: "Blessure critique",
    })[severity] || "Blessure";
  }

  function injurySourceText(source = "") {
    const clean = String(source || "").trim();
    if (!clean) return "detectee par le staff medical";
    if (/^combat contre /i.test(clean) || /^combat de boxe contre /i.test(clean)) return `apres le ${clean}`;
    if (/^camp /i.test(clean) || /^stage /i.test(clean) || /^camp boxe /i.test(clean)) return `pendant le ${clean}`;
    return `apres ${clean}`;
  }

  function injurySentence(injury = {}) {
    const rest = injury.restWeeks
      ? ` Repos impose: ${formatRestWeeks(injury.restWeeks)}.`
      : " Surveillance medicale.";
    return `${injurySeverityLabel(injury.severity)} ${injurySourceText(injury.source)}.${rest}`;
  }

  function cancelPendingFightForMedical(career, reason = "Le staff impose une pause.") {
    if (!career?.pendingFight) return;
    const fight = career.pendingFight;
    const fightId = fight.opponent?.id || normalizeFighterName(fight.opponent?.name || fight.id || "");
    if (career.flags.cancelledFightId !== fightId) {
      addNews(career, "Combat annule", `${career.name} repousse le combat contre ${fight.opponent.name}. ${reason}`, "bad");
      career.history.push({
        year: career.year,
        age: career.age,
        text: `Combat contre ${fight.opponent.name} annule: ${reason}`,
      });
      career.flags.cancelledFightId = fightId;
    }
	    career.pendingFight = null;
	    career.pendingFightOptions = null;
	    career.pendingTraining = null;
	    career.pendingEvent = null;
	    career.pendingLifeEvent = null;
	    career.pendingPressChoice = null;
	    career.pendingPlan = null;
    career.camp = null;
  }

	  function registerInjury(career, source, severityScore = 5, options = {}) {
    const medical = ensureMedical(career);
    const priorMajor = medical.injuries.filter(injury => ["grave", "critique"].includes(injury.severity)).length;
    const repeatTax = Math.min(5, Math.floor((medical.injuries || []).length / 2));
    const riskTax = Math.floor((medical.injuryRisk || 0) / 12);
    const roll = severityScore + Math.floor(nextRand(career) * 6) + riskTax + repeatTax + (options.severe ? 4 : 0);
    let severity = "alerte";
    let restWeeks = 0;
    let durabilityLoss = 1;
    let conditionLoss = 3;
    if (roll >= 18) {
      severity = "critique";
      restWeeks = 12;
      durabilityLoss = 10;
      conditionLoss = 20;
    } else if (roll >= 14) {
      severity = "grave";
      restWeeks = 8;
      durabilityLoss = 7;
      conditionLoss = 15;
    } else if (roll >= 10) {
      severity = "serieuse";
      restWeeks = 4;
      durabilityLoss = 4;
      conditionLoss = 10;
    } else if (roll >= 6) {
      severity = "legere";
      restWeeks = 2;
      durabilityLoss = 2;
      conditionLoss = 6;
    }
    const labels = {
      alerte: "Alerte musculaire",
      legere: "Entorse legere",
      serieuse: "Genou douloureux",
      grave: "Fracture de fatigue",
      critique: "Trauma recurrent",
    };
    const riskGain = 4 + Math.floor(restWeeks / 2);
    const injury = {
      id: `${career.year}-${Date.now()}-${medical.injuries.length}`,
      label: options.label || labels[severity],
      source,
      severity,
      restWeeks,
      year: career.year,
      age: career.age,
      effects: [
        { key: "condition", value: -conditionLoss },
        { key: "durability", value: -durabilityLoss },
        { key: "injuryRisk", value: riskGain },
        ...(restWeeks ? [{ key: "restWeeks", value: restWeeks }] : []),
      ],
    };
    medical.restWeeks = Math.max(medical.restWeeks || 0, restWeeks);
    medical.injuryRisk = clamp((medical.injuryRisk || 0) + riskGain, 0, 90);
    if (restWeeks) medical.activeInjury = injury;
    medical.injuries.unshift(injury);
    medical.injuries = medical.injuries.slice(0, 12);
    career.condition = clamp((career.condition || 70) - conditionLoss, 0, 100);
    career.stats.durability = clamp((career.stats.durability || 70) - durabilityLoss, 1, statCapForCareer(career));
    career.history.push({
      year: career.year,
      age: career.age,
      text: `${injury.label}: ${injurySentence(injury)}`,
    });
    const majorCount = priorMajor + (["grave", "critique"].includes(severity) ? 1 : 0);
    if ((severity === "critique" && majorCount >= 2) || majorCount >= 3 || career.stats.durability <= 6) {
      career.flags.medicalRetirement = true;
      medical.careerWarnings = (medical.careerWarnings || 0) + 1;
      if (!injury.restWeeks) {
        injury.restWeeks = 4;
        injury.effects.push({ key: "restWeeks", value: 4 });
        medical.restWeeks = Math.max(medical.restWeeks || 0, 4);
        medical.activeInjury = injury;
      }
      addNews(career, "Alerte carriere", `${career.name} doit passer devant une commission medicale apres des blessures repetees.`, "bad");
    }
    addNews(
      career,
      "Blessure",
      `${career.name}: ${injury.label}. ${injurySentence(injury)}`,
      severity === "alerte" ? "neutral" : "bad"
    );
	    return injury;
	  }

		  function campFatigueInjuryPressure(fatigue = 0) {
		    const value = clamp(Math.round(fatigue || 0), 0, 12);
		    if (value >= 12) return 18;
		    if (value >= 11) return 13;
		    if (value >= 10) return 9;
		    if (value >= 9) return 5;
		    if (value >= 8) return 2;
		    return 0;
		  }

	  function rollCampInjury(career, camp, source, baseRisk = 0) {
		    if (!hasCompletedFight(career)) return null;
		    const medical = ensureMedical(career);
		    const fatigue = camp?.fatigue || 0;
		    const grace = Math.max(0, career.flags?.campInjuryGrace || 0);
		    const conditionPenalty = conditionRiskPressure(career, 55) * (grace ? 0.35 : 0.75);
		    const medicalPressure = medicalRiskChanceContribution(career) * (grace ? 0.08 : 0.28);
		    const chance = clamp(
		      (baseRisk || 0) * 0.45 + campFatigueInjuryPressure(fatigue) + medicalPressure + conditionPenalty,
		      0,
		      grace ? 12 : 28
		    );
		    if (chance <= 0 || nextRand(career) * 100 >= chance) return null;
		    return registerInjury(career, source, Math.max(3, Math.round(chance / 5)), { label: "Blessure pendant le camp" });
		  }

		  function consumeCampInjuryGrace(career) {
		    if (!career?.flags?.campInjuryGrace) return;
		    career.flags.campInjuryGrace = Math.max(0, Math.round(career.flags.campInjuryGrace) - 1);
		  }

		  function cancelFightForCampInjury(career, injury, reason = "Le staff annule la date.") {
	    if (!career?.pendingFight) return [];
	    const fight = career.pendingFight;
	    const season = career.season;
	    const penaltyEffects = applyEffects(career, {
	      hype: -11,
	      rep: -6,
	      morale: -7,
	      condition: -4,
	      locked: 1,
	      stats: { discipline: -1, charisma: -1 },
	    });
	    career.flags = career.flags || {};
	    career.flags.missedSeasonFights = (career.flags.missedSeasonFights || 0) + 1;
	    if (career.contract?.remainingFights > 0) {
	      career.contract.remainingFights = Math.max(0, career.contract.remainingFights - 1);
	    }
	    if (season && season.fightsDone < season.fightsTarget) {
	      season.fightsDone += 1;
	      season.fightLog.push({
	        number: season.fightsDone,
	        opponent: fight.opponent.name,
	        result: "Forfait",
	        method: "Blessure camp",
	        round: 0,
	        title: fight.title,
	        scoreText: "Combat non honore",
	        analysis: [
	          `${injury.label}: ${reason}`,
	          "Le combat est annule, compte dans le calendrier et ne genere aucune bourse.",
	          "Les promoteurs sanctionnent la fiabilite: hype, business et chances de montee reculent.",
	        ],
	        missed: true,
	      });
	    }
	    addNews(
	      career,
	      "Blessure pendant le camp",
	      `${career.name} declare forfait contre ${fight.opponent.name}. Le combat compte comme non honore et l'organisation refroidit les discussions.`,
	      "bad"
	    );
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: `Forfait contre ${fight.opponent.name}: blessure pendant le camp.`,
	    });
	    career.pendingFight = null;
	    career.pendingFightOptions = null;
	    career.pendingTraining = null;
	    career.pendingEvent = null;
	    career.pendingLifeEvent = null;
	    career.pendingPlan = null;
	    career.pendingPressChoice = null;
	    clearFightMomentState(career);
	    career.camp = null;
	    return penaltyEffects;
	  }

	  function routeMedicalRest(reason = "Le staff medical reprend la main.") {
    const career = ui.career;
    if (!career) return;
    cancelPendingFightForMedical(career, reason);
    cancelSpecialFightForMedical(career, reason);
    career.phase = "medical-rest";
    ui.view = "medicalRest";
    saveCareer();
    render();
  }

	  function resolveChoiceConsequences(career, event, option) {
	    const extraText = [];
	    const extraEffects = [];
	    let injury = null;
	    let dopingPositive = false;
	    if (option.risk?.injuryChance) {
	      extraText.push("Pas de blessure declaree: le staff note surtout une recuperation degradee et une dette corporelle plus haute.");
	    }
	    if (option.risk?.dopingChance) {
	      const dopingSignal = (career.flags?.dopingRisk || 0) + (career.flags?.doping || 0) * 12;
	      const scandalPressure = Math.min(12, (career.flags?.scandal || 0) * 0.25);
	      const chance = option.risk.dopingChance + dopingSignal * 0.65 + scandalPressure;
	      if (nextRand(career) * 100 < chance) {
	        dopingPositive = true;
	        const positiveEffects = applyEffects(career, {
	          rep: -18,
	          hype: -10,
	          morale: -8,
	          scandal: 24,
	          dopingRisk: -18,
	          doping: -1,
	          suspension: 1,
	          locked: 1,
	          stats: { charisma: -5, discipline: -3 },
	        });
	        extraEffects.push(...positiveEffects);
	        extraText.push("Controle positif: la commission bloque une date, les sponsors reculent et la suspicion devient publique.");
	        addNews(career, "Controle positif", `${career.name} est rattrape par un controle hors competition. Une date de combat saute et le clan doit reconstruire l'image.`, "bad");
	      }
	    }
	    return {
	      text: extraText.join(" "),
	      effects: extraEffects,
	      injury,
	      dopingPositive,
	    };
	  }

  function eventNewsFallback(career, event, option, tone, consequences = {}) {
    const name = career.name;
    const fightName = career.pendingFight?.opponent?.name;
    const context = fightName ? ` avant le combat contre ${fightName}` : " pendant sa saison";
    const effects = option.effects || {};
	    if (consequences.injury) {
	      return {
	        title: "Alerte physique au camp",
	        text: `${name} a quitte une sequence de camp avec ${consequences.injury.label.toLowerCase()}. Le staff temporise publiquement, mais le calendrier est sous surveillance.`,
	      };
	    }
	    if (consequences.dopingPositive) {
	      return {
	        title: "Controle positif confirme",
	        text: `${name} manque une date apres un controle hors competition. Les sponsors se mettent a distance et le clan prepare une reponse officielle.`,
	      };
	    }
	    if (effects.dopingRisk > 0 || effects.doping > 0) {
	      return {
	        title: "Zone grise au camp",
	        text: `${name} est associe a une preparation qui fait tousser plusieurs proches du circuit. Rien n'est officiel, mais les controleurs suivent le dossier.`,
	      };
	    }
    if (effects.scandal > 0 || tone === "bad" && effects.rep < 0) {
      return {
        title: "Coulisses sous tension",
        text: `${name} se retrouve cite dans un dossier de coulisses autour de "${event.title}". L'entourage tente de calmer l'histoire${context}.`,
      };
    }
    if (effects.medicalCare > 0 || effects.condition > 0) {
      return {
        title: "Le staff reprend la main",
        text: `${name} a resserre son cadre de preparation. Les proches du camp parlent d'un choix prudent pour proteger la suite de la saison.`,
      };
    }
    if (effects.hype > 0 || effects.money > 0) {
      return {
        title: "La cote media grimpe",
        text: `${name} gagne en exposition apres une decision de camp qui fait parler. Les promoteurs suivent deja les retombees.`,
      };
    }
    if (effects.money < 0) {
      return {
        title: "Decision couteuse en coulisses",
        text: `${name} accepte une facture sportive ou personnelle pour garder le controle de son environnement.`,
      };
    }
    return {
      title: "Ajustement de camp",
      text: `${name} modifie son quotidien autour de "${event.title}". Rien de spectaculaire en facade, mais le vestiaire note le signal.`,
    };
  }

  function buildEventNews(career, event, option, tone, consequences = {}) {
    const name = career.name;
    const fightName = career.pendingFight?.opponent?.name;
    const byEvent = {
      "diet-cheat": option.label === "Se faire plaisir"
        ? { title: "Ecart signale au camp", text: `${name} s'est accorde une coupure dans sa diete. L'ambiance remonte, mais le staff surveille deja le cardio sur les derniers rounds.` }
        : { title: "Coupe de poids sous controle", text: `${name} reste strict malgre la pression du clan. Le camp mise sur une pesee propre et une forme plus stable.` },
      "manager-loyalty": option.label === "Garder l'historique"
        ? { title: "Loyaute confirmee", text: `${name} prolonge avec son manager historique. Le choix rassure le vestiaire, meme si certains agents voyaient deja une operation plus agressive.` }
        : { title: "Nouveau clan business", text: `${name} change d'interlocuteur pour accelerer les negociations. Les appels vont monter en gamme, la confiance du premier cercle moins.` },
      "friend-restaurant": option.label === "Investir"
        ? { title: "Investissement hors cage", text: `${name} met de l'argent dans un restaurant monte par un proche. Le dossier sera juge plus tard, mais l'entourage salue le geste.` }
        : { title: "Priorite au cash de carriere", text: `${name} refuse d'entrer dans un projet de restaurant familial. Le choix evite un risque financier, pas quelques regards froids.` },
      "local-gym-shares": option.label === "Entrer au capital"
        ? { title: "Projet de salle locale", text: `${name} prend des parts dans une salle MMA de quartier. Les coachs aiment le signal, le banquier attend le bilan de saison.` }
        : { title: "Cash garde pour le camp", text: `${name} refuse d'investir dans une nouvelle salle locale. Le choix evite un risque, mais ferme une porte business.` },
      "streetwear-drop": option.label === "Financer le drop"
        ? { title: "Drop streetwear annonce", text: `${name} finance une capsule de fringues lancee par son entourage. Les fans demandent le lien, le staff surveille les stocks.` }
        : { title: "Promo sans cheque", text: `${name} donne de la visibilite a la marque du crew sans mettre d'argent personnel dans le projet.` },
      "media-channel": option.label === "Ouvrir le camp"
        ? { title: "Cameras au camp", text: `Une emission de coulisses obtient l'acces au camp de ${name}. Le contenu peut creer de la proximite, ou prendre trop de place.` }
        : { title: "Camp ferme aux cameras", text: `${name} refuse de transformer la preparation en plateau. Les fans auront moins d'images, le coin plus de calme.` },
      "sparring-app": option.label === "Mettre un ticket"
        ? { title: "Investissement dans une appli de sparring", text: `${name} soutient une appli qui veut simplifier les reservations de sparring entre clubs. Le projet a du sens, reste a savoir si le milieu suivra.` }
        : { title: "Appli de sparring testee sans cheque", text: `${name} garde un oeil sur une nouvelle appli de sparring, mais refuse de bloquer du cash avant les premiers vrais clients.` },
      "physio-studio": option.label === "Entrer au projet"
        ? { title: "Mise dans un cabinet de recuperation", text: `${name} investit dans un cabinet de recup specialise combattants. Le staff espere que le pari paiera autant sur le corps que sur le compte.` }
        : { title: "Recuperation sans risque business", text: `${name} reste simple client d'un cabinet de recup. Moins d'ambition business, plus de marge pour le camp.` },
      "mouthguard-brand": option.label === "Signer en royalties"
        ? { title: "Protege-dents signature annonce", text: `${name} associe son nom a un protege-dents local avec un deal en royalties. Les ventes diront si l'image vaut vraiment quelque chose.` }
        : { title: "Stock de protege-dents en pari", text: `${name} achete du stock pour pousser une marque de protege-dents. La boutique peut tourner, ou remplir un garage.` },
      "bad-friends": option.label === "Sortir avec eux"
        ? { title: "Soiree qui inquiete le staff", text: `${name} a ete vu en club alors que le camp devait reprendre. Le moral grimpe, mais les coachs craignent une note physique.` }
        : { title: "Couvre-feu respecte", text: `${name} coupe court a une sortie apres victoire. Peu de buzz, mais le staff retient surtout le signal de discipline.` },
      "foot-shard": option.label === "Signaler tout de suite"
        ? { title: "Incident mineur evite", text: `${name} signale une gene au pied pendant la fight week. L'image prete a sourire, mais le staff evite un vrai piege d'appuis.` }
        : { title: "Appui fragile avant combat", text: `${name} choisit de ne rien dire malgre une gene au pied. Dans le camp, certains redoutent un detail ridicule capable de peser lourd.` },
      "night-test": option.label === "Tout dire et entrer en protocole"
        ? { title: "Controle trouble et protocole", text: `${name} reconnait une derive hors competition et accepte un cadre medical. L'image souffre, mais la saison reste sauvable.` }
        : { title: "Defense agressive apres controle", text: `${name} conteste publiquement un controle suspect. Les avocats prennent la lumiere, les sponsors demandent des garanties.` },
      "media-bus-melee": option.label === "Suivre le clan"
        ? { title: "Parking sous haute tension", text: `Des images de l'entourage de ${name} pres du bus adverse circulent deja. La commission prepare une facture, la rivalite vend le combat.` }
        : { title: "Le camp calme l'incident", text: `${name} retient son clan dans le parking. Les cameras perdent un clip viral, mais les officiels notent le sang-froid.` },
      "cage-jump": option.label === "Sauter dans le bruit"
        ? { title: "Debordement apres combat", text: `${name} est au centre d'une sequence de cage devenue virale. La popularite grimpe, la commission aussi.` }
        : { title: "Calme dans la cage", text: `${name} refuse de suivre la provocation d'un rival. Le geste nourrit la rivalite sans offrir de sanction facile.` },
	      "tainted-supplement": option.label === "Publier les analyses"
	        ? { title: "Transparence sur les complements", text: `${name} publie des analyses pour couper court aux soupcons. La demarche coute cher, mais protege une partie de l'image.` }
	        : { title: "Soupcon dans le vestiaire", text: `Le camp de ${name} tente de garder discret un complement suspect. Plusieurs equipes commencent deja a poser des questions.` },
	      "doctor-protocol": option.label === "Refuser net"
	        ? { title: "Preparation defendable", text: `${name} refuse un protocole de recuperation juge trop flou par son entourage. Le choix coute une semaine facile, mais rassure les partenaires.` }
	        : { title: "Preparation sous soupcon", text: `Plusieurs proches du circuit s'interrogent sur le regain physique de ${name}. Le camp parle de recuperation, les controleurs notent l'adresse de la salle.` },
	      "under-cage-control": consequences.dopingPositive
	        ? { title: "Controle positif confirme", text: `${name} est rattrape par un controle hors competition. Une date saute, l'organisation observe et les sponsors demandent des garanties.` }
	        : option.label === "Ouvrir la porte"
	          ? { title: "Controle hors competition accepte", text: `${name} laisse entrer les inspecteurs a la salle. La sequence calme une partie des soupcons, meme si le stress reste visible.` }
	          : { title: "Salle sous tension apres controle evite", text: `Le clan de ${name} aurait temporise face a des inspecteurs arrives sans prevenir. Dans les salles, l'histoire circule deja.` },
	      "steakhouse-beef": option.label === "Regler ca dehors"
	        ? { title: "Embrouille sortie du restaurant", text: `${name} se retrouve dans un incident de steakhouse avec un rival. Les fans adorent le folklore, les avocats beaucoup moins.` }
        : { title: "Securite appelee au steakhouse", text: `${name} laisse la securite gerer une provocation en public. Le camp perd une video virale, gagne une soiree sans commission.` },
      "sponsor-night": option.label === "Faire la tournee"
        ? { title: "Nuit sponsorisee, matin lourd", text: `${name} encaisse un cheque apres une soiree privee tres visible. Le sponsor est ravi, le preparateur physique nettement moins.` }
        : { title: "Sponsor frustre, camp protege", text: `${name} quitte tot une soiree sponsorisee. La marque grince, mais le staff garde une preparation propre.` },
      "recovery-clinic": option.label === "Payer le protocole complet"
        ? { title: "Bilan medical complet", text: `${name} investit dans une clinique de recuperation. Les proches du camp parlent d'une decision de carriere, pas de confort.` }
        : { title: "Recuperation minimale", text: `${name} choisit un protocole leger pour tenir le budget. Le staff garde un oeil sur le risque residuel.` },
      "sleep-coach": option.label === "Accepter le cadre"
        ? { title: "Couvre-feu impose au camp", text: `${name} accepte un cadre strict sommeil-nutrition. Moins de sorties, plus de controle sur le corps.` }
        : { title: "Routine personnelle conservee", text: `${name} refuse de confier son rythme a un specialiste. Le vestiaire y voit un choix de liberte, avec une part de hasard.` },
      "hotel-extinguisher": option.label === "Regler les degats"
        ? { title: "Facture sale dans un palace", text: `Selon plusieurs sources locales, ${name} a regle discretement les degats d'une suite apres une after privee. Son staff annonce un cadre plus strict sur les sorties.` }
        : { title: "After d'hotel devenue virale", text: `Des videos d'une suite retournee impliquant l'entourage de ${name} tournent dans le milieu. L'organisation attend des explications et la facture promet d'etre lourde.` },
      "fan-phone": option.label === "Respirer et signer la coque"
        ? { title: "Incident fan desamorce", text: `${name} transforme une interaction tendue devant l'hotel en moment presque sympathique. Le manager peut enfin respirer.` }
        : { title: "Telephone casse, image brouillee", text: `${name} est filme dans un accrochage avec un fan devant l'hotel. Police, amende et sponsor nerveux: la sequence coute plus qu'un mauvais round.` },
      "airport-drunk": option.label === "Accepter le programme"
        ? { title: "Programme d'aide accepte", text: `${name} accepte un cadre d'accompagnement apres un incident en aeroport. L'image prend un coup, mais le vestiaire respecte la prise de controle.` }
        : { title: "Story risquee apres aeroport", text: `${name} nie en bloc un incident de voyage deja commente partout. Les sponsors observent, le camp encaisse le bruit.` },
      "parking-incident": option.label === "Rester et cooperer"
        ? { title: "Accrochage gere sans fuite", text: `${name} coopere apres un incident de parking. La semaine de camp est perturbee, mais le dossier reste contenu.` }
        : { title: "Parking: dossier aggrave", text: `${name} quitte les lieux avant l'arrivee des autorites selon plusieurs temoins. La commission pourrait bloquer son calendrier.` },
      "presser-bottles": option.label === "Rester derriere la securite"
        ? { title: "Conference sauvee par le calme", text: `${name} reste derriere la securite pendant une sequence tendue de face-off. Moins de viral, plus de credibilite aupres des officiels.` }
        : { title: "Conference coupee, images partout", text: `${name} rejoint le chaos backstage avant les face-offs${fightName ? ` contre ${fightName}` : ""}. Les clips vendent l'affiche, les officiels preparent les sanctions.` },
	      "taxi-joyride": option.label === "Suivre le coach"
	        ? { title: "Retour de soiree sous controle", text: `${name} laisse son coach couper court a une mauvaise blague devant l'hotel. Le camp evite une video ridicule et garde la preparation propre.` }
	        : { title: "Fausse blague, vraie sanction", text: `${name} apparait dans une video ou il fait semblant de partir avec un taxi devant l'hotel. L'organisation demande des excuses, l'amende tombe vite.` },
      "homecoming": option.label === "Porter la ville"
        ? { title: "Affiche locale surprise", text: `${name} accepte de mener une carte montee dans sa ville natale${fightName ? ` contre ${fightName}` : ""}. La salle va pousser fort, la pression aussi.` }
        : { title: "Retour local sous controle", text: `${name} signe une affiche a domicile${fightName ? ` contre ${fightName}` : ""}, mais son staff verrouille les invitations et les sollicitations familiales.` },
    };
    return byEvent[event.id] || eventNewsFallback(career, event, option, tone, consequences);
  }

  function rollPostFightInjury(career, fight, damage, won) {
    const fatigueImpact = campFatigueImpact(career);
    const fatiguePressure = fatigueImpact.fatigue >= 10 ? 3 : fatigueImpact.fatigue >= 8 ? 1.5 : 0;
    const lowMedicalGate = ensureMedical(career).injuryRisk < 35 ? 0.55 : 1;
    const conditionPenalty = conditionRiskPressure(career, 48) * 0.55;
    const chance = clamp(
      (2 + damage * 1.65 + (fight.short ? 5 : 0) + (won ? 0 : 3)) * lowMedicalGate + medicalRiskChanceContribution(career) + fatiguePressure + conditionPenalty,
      0,
      62
    );
    if (nextRand(career) * 100 >= chance) return null;
    const labels = won
      ? ["Main gonflee", "Cheville tournee", "Arcade a surveiller"]
      : ["Commotion suspecte", "Cotes touchees", "Genou instable"];
    const label = labels[Math.floor(nextRand(career) * labels.length)];
    return registerInjury(
      career,
      `combat contre ${fight.opponent.name}`,
      Math.round(chance / 5) + Math.min(5, damage),
      { label }
    );
  }

  function continueAfterMedicalRest() {
    const career = ui.career;
    if (!career) return;
    if (career.flags.medicalRetirement) {
      addNews(career, "Retraite medicale", `${career.name} ne recoit pas le feu vert pour continuer la competition.`, "bad");
	      routeCareerSaveChoice(career);
      return;
    }
    if (career.season && career.season.fightsDone < career.season.fightsTarget) {
      if (career.lastResult) {
        career.phase = "season-progress";
        ui.view = "seasonProgress";
        saveCareer();
        render();
        return;
      }
      startFightSelection();
      return;
    }
    career.pendingContracts = buildContractOffers();
    career.phase = "season-summary";
    ui.view = "seasonSummary";
    saveCareer();
    render();
  }

	  function completeMedicalRest(protocolInput = null, upfrontEffects = []) {
    const career = ui.career;
    if (!career) return;
    const protocol = protocolInput || MEDICAL_PROTOCOLS.find(item => item.id === "expert-team") || MEDICAL_PROTOCOLS[0];
    const medical = ensureMedical(career);
    const weeks = Math.max(0, medical.restWeeks || 0);
    const activeLabel = medical.activeInjury?.label || "Repos impose";
	    let effects = [...upfrontEffects, ...applyEffects(career, protocol.effects || {})];
    let complicationText = "";
    if (protocol.relapseChance) {
      const chance = protocol.relapseChance + medical.injuryRisk * 0.18 + Math.max(0, 55 - (career.condition || 70)) * 0.2;
      if (nextRand(career) * 100 < chance) {
        const relapseEffects = applyEffects(career, { condition: -5, injuryRisk: 7 });
        effects = [...effects, ...relapseEffects];
        complicationText = " La reprise a l'ancienne laisse une douleur residuelle: le risque de rechute augmente.";
      }
    }
    const baseConditionGain = Math.min(28, 10 + Math.round(weeks * 2.4));
    const baseDurabilityGain = Math.min(13, 2 + Math.ceil(weeks * 0.8));
    const baseMedicalCare = 18 + Math.round(weeks * 1.4);
    career.condition = clamp(Math.max(career.condition || 60, 60) + baseConditionGain, 0, 100);
    career.stats.durability = clamp((career.stats.durability || 55) + baseDurabilityGain, 1, statCapForCareer(career));
    medical.injuryRisk = clamp((medical.injuryRisk || 0) - baseMedicalCare, 0, 90);
    effects = [
      ...effects,
      { key: "condition", value: baseConditionGain },
      { key: "durability", value: baseDurabilityGain },
      { key: "medicalCare", value: baseMedicalCare },
    ];
    medical.rehabLog.unshift({
      year: career.year,
      age: career.age,
      weeks,
      label: activeLabel,
      protocol: protocol.label,
      text: `${protocol.result} Risque residuel: ${medical.injuryRisk}/90.`,
    });
    medical.rehabLog = medical.rehabLog.slice(0, 8);
	    medical.restWeeks = 0;
	    medical.activeInjury = null;
	    career.flags.campInjuryGrace = Math.max(career.flags.campInjuryGrace || 0, 4);
	    addNews(career, "Retour medical", `${career.name} termine ${formatRestWeeks(weeks)} avec ${protocol.label.toLowerCase()}.`, "good");
    if (weeks >= 6 && career.season && career.season.fightsDone < career.season.fightsTarget && career.season.fightsTarget > career.season.fightsDone + 1) {
      career.season.fightsTarget -= 1;
	      addNews(career, "Calendrier allege", `Le staff reduit la saison a ${formatCombats(career.season.fightsTarget)} pour proteger la carriere.`, "neutral");
    }
    if (career.flags.medicalRetirement) {
      addNews(career, "Retraite medicale", `${career.name} ne recoit pas le feu vert pour continuer la competition.`, "bad");
	      routeCareerSaveChoice(career);
      return;
    }
    showDecisionResult(career, {
      title: protocol.label,
      text: `${protocol.result}${complicationText} Le staff donne le feu vert progressif.`,
      effects,
      nextAction: "after-medical-rest",
      nextLabel: career.season && career.season.fightsDone < career.season.fightsTarget ? "Reprendre la saison" : "Bilan de saison",
    });
  }

	  function chooseMedicalProtocol(id) {
	    const protocol = MEDICAL_PROTOCOLS.find(item => item.id === id) || MEDICAL_PROTOCOLS[0];
	    const cost = choiceCost(protocol.effects || {});
	    if (protocol.id !== "old-school" && !canPay(ui.career, cost)) {
	      blockPaidChoice(ui.career, protocol.label, cost, "to-medical-rest", "Autre protocole");
	      return;
	    }
	    const creditEffects = protocol.id !== "old-school" ? markSmallCreditIfNeeded(ui.career, cost) : [];
	    completeMedicalRest(protocol, creditEffects);
	  }

  function mergeVisibleEffects(effects = []) {
    const totals = new Map();
    const order = [];
    effects.forEach(effect => {
      if (!effect?.key) return;
      if (!totals.has(effect.key)) order.push(effect.key);
      totals.set(effect.key, (totals.get(effect.key) || 0) + (Number(effect.value) || 0));
    });
    return order
      .map(key => ({ key, value: totals.get(key) }))
      .filter(effect => effect.value !== 0);
  }

  function showDecisionResult(career, payload) {
    const resultPayload = {
      ...payload,
      effects: mergeVisibleEffects(payload.effects || []),
    };
    career.choiceResult = resultPayload;
    career.phase = "decision-result";
    ui.resultChoice = resultPayload;
    ui.view = "decisionResult";
    saveCareer();
    render();
  }

  function eventResultVisual(event) {
    if (!event) return null;
    if (["night-test", "tainted-supplement", "doctor-protocol", "under-cage-control"].includes(event.id)) return "doping";
    return null;
  }

  function campOpportunityById(id) {
    return EVENTS.find(event => event.campOnly && event.id === id);
  }

	  function currentCampOpportunity(career) {
	    const camp = career?.camp;
	    if (!camp?.opportunity || camp.opportunity.used || camp.opportunity.week !== camp.week) return null;
	    return campOpportunityById(camp.opportunity.id);
	  }

	  function campOpportunityChoiceSummary(option = {}) {
	    if (option.skipOpportunity) return "Gratuit. La semaine reste disponible pour un entrainement classique.";
	    const load = option.load || 0;
	    const fatigueText = `Fatigue ${load > 0 ? "+" : ""}${load}`;
	    const effects = effectLine(option.effects) || "Aucun effet visible";
	    return `${fatigueText}. ${effects}`;
	  }

		  function campOpportunityBinaryChoices(opportunity) {
		    const entries = (opportunity?.options || []).map((option, index) => ({ option, index }));
		    if (!entries.length) return [];
		    const refuse = entries.find(entry => entry.option.skipOpportunity) || entries[1] || entries[0];
		    const accept = entries.find(entry => !entry.option.skipOpportunity) || entries[0] || refuse;
		    return [
		      { ...refuse.option, index: refuse.index, binaryLabel: "Je n'y vais pas", binaryIntent: "Refuser", binarySummary: refuse.option.result, summary: campOpportunityChoiceSummary(refuse.option) },
		      { ...accept.option, index: accept.index, binaryLabel: "J'y vais", binaryIntent: "Accepter", binarySummary: accept.option.result, summary: campOpportunityChoiceSummary(accept.option) },
		    ];
		  }

	  function chooseCampOpportunityOption(index) {
	    const career = ui.career;
    if (!career.pendingFight) {
      startFightSelection();
      return;
    }
    if (!career.camp) career.camp = createCamp(career);
    const camp = career.camp;
	    const event = currentCampOpportunity(career);
	    const option = event?.options?.[index];
	    if (!event || !option) {
	      startTrainingBlock();
	      return;
	    }
	    if (option.skipOpportunity) {
	      camp.opportunity.used = true;
	      career.pendingTraining = null;
	      showDecisionResult(career, {
	        title: `${event.title}: refuse`,
	        text: option.result,
	        effects: [],
	        nextAction: "next-training-week",
	        nextLabel: `Entrainement semaine ${camp.week}`,
	      });
	      return;
	    }
	    const cost = choiceCost(option.effects || {});
	    if (!canPay(career, cost)) {
	      blockPaidChoice(career, `${event.title}: ${option.label}`, cost, "next-training-week", "Retour entrainement");
	      return;
	    }
	    const week = camp.week;
	    const opponentName = career.pendingFight.opponent.name;
	    let effects = [...markSmallCreditIfNeeded(career, cost), ...applyEffects(career, option.effects || {})];
	    camp.fatigue = clamp((camp.fatigue || 0) + (option.load || 0), 0, 12);
	    const injury = rollCampInjury(career, camp, `stage ${event.title}`, option.risk || 0);
	    consumeCampInjuryGrace(career);
	    let campInterrupted = false;
	    let interruptionText = "";
	    if (injury) {
	      effects = [...effects, ...injury.effects];
	      camp.injury = injury.label;
	      campInterrupted = injury.restWeeks > 0;
	      interruptionText = injury.restWeeks ? `Blessure pendant le camp: le combat est annule, repos ${formatRestWeeks(injury.restWeeks)}.` : "Blessure pendant le camp: le staff surveille la suite du camp.";
	    }
    camp.opportunity.used = true;
    career.pendingTraining = null;
    career.season.trainingBlocks += 1;
    camp.log.push({
      id: `opportunity-${event.id}`,
      week,
      label: `${event.title}: ${option.label}`,
      fatigue: camp.fatigue,
      effects,
    });
    career.season.trainingLog.push({
      block: career.season.trainingBlocks,
      week,
      label: `${event.title}: ${option.label}`,
      text: option.result,
      effects,
    });
    career.history.push({
      year: career.year,
      age: career.age,
      text: `Camp de preparation contre ${opponentName}: ${event.title} (${option.label}).`,
    });
	    const campDone = week >= camp.maxWeeks;
	    camp.week = Math.min(camp.maxWeeks, week + 1);
	    if (campInterrupted) {
	      effects = [...effects, ...cancelFightForCampInjury(career, injury, interruptionText)];
	    }
	    const needsRest = hasMedicalRest(career);
    showDecisionResult(career, {
      title: `${event.title}: ${option.label}`,
	      text: needsRest ? `${option.result} ${interruptionText}` : campDone ? `${option.result} Le camp est termine: place a la fight week.` : `${option.result} Il reste ${formatWeeks(camp.maxWeeks - week)} de preparation.`,
      effects,
      nextAction: needsRest ? "to-medical-rest" : campDone ? "to-life-event" : "next-training-week",
      nextLabel: needsRest ? "Repos medical" : campDone ? "Fight week" : `Semaine ${week + 1}`,
    });
  }

  function chooseTraining(id) {
    const career = ui.career;
    if (!career.pendingFight) {
      startFightSelection();
      return;
    }
    if (!career.camp) career.camp = createCamp(career);
    const camp = career.camp;
	    const focus = TRAINING_FOCI.find(item => item.id === id) || TRAINING_FOCI[0];
	    if (focus.id === "specialist" && campHasSpecialist(camp)) {
      showDecisionResult(career, {
        title: "Coach deja reserve",
        text: "Le specialiste a deja travaille sur ce camp. Le staff refuse d'empiler les coachs externes: choisissez un autre axe pour cette semaine.",
        effects: [],
        nextAction: "next-training-week",
        nextLabel: "Retour entrainement",
      });
      return;
    }
	    const week = camp.week;
	    const opponentName = career.pendingFight.opponent.name;
	    const focusEffects = trainingFocusEffects(career, focus);
	    const cost = choiceCost(focusEffects);
	    if (!canPay(career, cost)) {
	      blockPaidChoice(career, focus.label, cost, "next-training-week", "Retour entrainement");
	      return;
	    }
	    let effects = [...markSmallCreditIfNeeded(career, cost), ...applyEffects(career, focusEffects)];
	    camp.fatigue = clamp((camp.fatigue || 0) + (focus.load || 0), 0, 12);
	    const injury = focus.id === "recovery" ? null : rollCampInjury(career, camp, `camp ${focus.label}`, focus.risk || 0);
	    consumeCampInjuryGrace(career);
	    let campInterrupted = false;
	    let interruptionText = "";
	    if (injury) {
	      effects = [...effects, ...injury.effects];
	      camp.injury = injury.label;
	      campInterrupted = injury.restWeeks > 0;
	      interruptionText = injury.restWeeks ? `Blessure pendant le camp: le combat est annule, repos ${formatRestWeeks(injury.restWeeks)}.` : "Blessure pendant le camp: le staff surveille la suite du camp.";
	    }
    career.pendingTraining = campInterrupted ? null : focus;
    career.season.trainingBlocks += 1;
    camp.log.push({
      id: focus.id,
      week,
      label: focus.label,
      fatigue: camp.fatigue,
      effects,
    });
    career.season.trainingLog.push({
      block: career.season.trainingBlocks,
      week,
      label: focus.label,
      text: focus.result,
      effects,
    });
    career.history.push({
      year: career.year,
      age: career.age,
      text: `Camp de preparation contre ${opponentName}: ${focus.label}.`,
    });
	    const campDone = week >= camp.maxWeeks;
	    camp.week = Math.min(camp.maxWeeks, week + 1);
	    if (campInterrupted) {
	      effects = [...effects, ...cancelFightForCampInjury(career, injury, interruptionText)];
	    }
    const needsRest = hasMedicalRest(career);
    showDecisionResult(career, {
      title: `Semaine ${week}: ${focus.label}`,
	      text: needsRest ? `${focus.result} ${interruptionText}` : campDone ? `${focus.result} Le camp est termine: place a la fight week.` : `${focus.result} Il reste ${formatWeeks(camp.maxWeeks - week)} de preparation.`,
      effects,
      nextAction: needsRest ? "to-medical-rest" : campDone ? "to-life-event" : "next-training-week",
      nextLabel: needsRest ? "Repos medical" : campDone ? "Fight week" : `Semaine ${week + 1}`,
    });
  }

	  function prepareLifeEvent() {
	    const career = ui.career;
	    const events = availableLifeEvents(career);
	    if (!events.length) {
	      startPressConference();
	      return;
	    }
	    career.pendingEvent = pickLifeEvent(career, events);
	    career.phase = "life-event";
    ui.view = "lifeEvent";
    saveCareer();
    render();
  }

  function createHomecomingFight(career) {
    const recentOpponents = (career.fights || []).slice(-6).map(fight => fight.opponent);
    const opponent = generateOpponent(career, 2 + career.tier * 1.5, recentOpponents);
    const fight = {
      id: "homecoming",
      label: "Affiche a domicile",
      tag: "Local",
      summary: "Combat ajoute par le promoteur local: exposition forte, pression familiale, preparation normale obligatoire.",
      opponent,
      risk: career.tier >= 3 ? "mid" : "low",
      hype: 10 + career.tier * 2,
      money: adjustedFightMoney(career, 12000 + career.tier * 14000, { risk: "mid" }),
      rankMove: 4,
      title: false,
      local: true,
    };
	    career.pendingFight = fight;
	    career.pendingFightOptions = null;
	    career.pendingTraining = null;
	    career.pendingPlan = null;
	    career.pendingPressChoice = null;
	    clearFightMomentState(career);
    career.camp = null;
    career.flags.cancelledFightId = null;
    addNews(career, "Combat a domicile signe", `${career.name} affrontera ${opponent.name} sur une carte locale. Le camp demarre autour de cette affiche surprise.`, "hot");
    return fight;
  }

  function chooseEventOption(index) {
    const career = ui.career;
    const event = career.pendingEvent;
    const option = event.options[index];
    rememberLifeEvent(career, event);
    const hadPendingFight = Boolean(career.pendingFight);
    const createsHomecomingFight = event.id === "homecoming" && !hadPendingFight;
    let effects = applyEffects(career, option.effects);
    const consequences = resolveChoiceConsequences(career, event, option);
    effects = [...effects, ...consequences.effects];
    let delayedText = "";
	    if (option.delayed) {
	      const delayed = addDelayedConsequence(career, {
	        ...option.delayed,
	        source: event.title,
	        choice: option.label,
	      });
	      delayedText = `${delayed.title}: le vrai resultat tombera au bilan de saison.`;
	    }
	    const suspension = consequences.dopingPositive
	      ? blockSeasonFightForSuspension(career, "La commission transforme le controle positif en date retiree.")
	      : null;
	    const suspensionText = suspension
	      ? `Calendrier ajuste: on passe de ${formatCombats(suspension.before)} a ${formatCombats(suspension.after)} prevus cette saison.`
	      : "";
	    const resultText = [option.result, delayedText, consequences.text, suspensionText].filter(Boolean).join(" ");
	    if (option.effects?.rivalry > 0 && career.pendingFight) {
	      markRival(career, career.pendingFight.opponent, option.effects.rivalry);
	    } else if (option.effects?.rivalry < 0 && career.rivals?.length) {
	      career.rivals[0].heat = clamp((career.rivals[0].heat || 1) + option.effects.rivalry, 0, 10);
	    }
    if (hasMedicalRest(career)) cancelPendingFightForMedical(career, `Repos impose apres "${event.title}".`);
    const homecomingFight = !hasMedicalRest(career) && createsHomecomingFight ? createHomecomingFight(career) : null;
	    const tone = hasMedicalRest(career) || consequences.dopingPositive || option.effects?.scandal > 0 || option.effects?.injuryRisk > 0 || option.effects?.dopingRisk > 0 || option.effects?.doping > 0
	      ? "bad"
      : option.effects?.hype > 0
        ? "good"
        : option.effects?.morale < 0
          ? "bad"
          : "neutral";
    const eventNews = buildEventNews(career, event, option, tone, consequences);
    addNews(career, eventNews.title, eventNews.text, tone);
    career.moments.push(`${event.title}: ${option.label}.`);
    if (career.season) {
      career.season.lifeLog.push({
        block: career.season.trainingBlocks,
        category: event.category || "Carriere",
        title: event.title,
        choice: option.label,
        result: resultText,
        effects,
      });
    }
	    const nextAction = hasMedicalRest(career)
	      ? "to-medical-rest"
	      : suspension?.complete
	        ? "to-season-summary"
	        : suspension
	          ? "to-season-progress"
		          : homecomingFight
		            ? "to-training"
		            : hadPendingFight
		              ? "to-press-conference"
		              : "to-fight-offer";
	    const nextLabel = hasMedicalRest(career)
	      ? "Repos medical"
	      : suspension?.complete
	        ? "Bilan de saison"
	        : suspension
	          ? "Retour saison"
		          : homecomingFight
		            ? "Lancer le camp local"
		            : hadPendingFight
		              ? "Conference de presse"
		              : "Choisir un combat";
    career.pendingEvent = null;
    showDecisionResult(career, {
      title: event.title,
      text: resultText,
      effects,
      nextAction,
      nextLabel,
      visual: eventResultVisual(event),
    });
  }

  function generateOpponent(career, difficulty = 0, blockedNames = []) {
    const blocked = [career.name, ...blockedNames].map(normalizeFighterName);
    if (isLegendCareer(career)) {
      const legendPool = LEGEND_BLUEPRINTS.filter(item => !blocked.includes(normalizeFighterName(item.name)));
      if (legendPool.length) {
        const targetBase = legendOpponentTargetBase(career, difficulty);
        const sorted = legendPool.sort((a, b) => Math.abs((blueprintBase(a) + difficulty) - targetBase) - Math.abs((blueprintBase(b) + difficulty) - targetBase));
        const pickIndex = Math.floor(nextRand(career) * Math.min(10, sorted.length));
        return blueprintToOpponent(career, sorted[pickIndex], difficulty);
      }
    }
    const tierWindow = OPPONENT_BLUEPRINTS.filter(item => {
      if (blocked.includes(normalizeFighterName(item.name))) return false;
      return item.tier >= Math.max(0, career.tier - 1) && item.tier <= Math.min(5, career.tier + 1);
    });
    if (tierWindow.length) {
      const targetBase = opponentBaseForTier(career.tier);
      const sorted = tierWindow.sort((a, b) => Math.abs((blueprintBase(a) + difficulty) - targetBase) - Math.abs((blueprintBase(b) + difficulty) - targetBase));
      const pickIndex = Math.floor(nextRand(career) * Math.min(12, sorted.length));
      return blueprintToOpponent(career, sorted[pickIndex], difficulty);
    }
    const style = pick(career, STYLES);
    const country = pick(career, COUNTRIES);
    const base = opponentBaseForTier(career.tier) - 5 + Math.max(0, career.age - 18) * 1.15 + difficulty + Math.floor(nextRand(career) * 12 - 4);
    const stats = newEmptyStats();
    Object.keys(stats).forEach(key => {
      stats[key] = clamp(base + Math.floor(nextRand(career) * 18 - 8), 22, 96);
    });
    applyStats(stats, style.stats);
    return {
      name: opponentName(career, country, blockedNames),
      country,
      style,
      stats,
      overall: statAverage(stats),
      record: `${Math.max(0, Math.floor(base / 5) + Math.floor(nextRand(career) * 7))}-${Math.floor(nextRand(career) * 5)}`,
    };
  }

  function currentTierTitle(career) {
    return (career?.titles || []).find(title => title.tier === career.tier && !title.lost) || null;
  }

  function hasCurrentTierTitle(career) {
    return Boolean(currentTierTitle(career));
  }

  function contenderClauseReady(career) {
    const contract = career?.contract;
    return Boolean(
      career?.flags?.contenderClauseReady ||
      (contract?.contenderWinsRequired && (contract.contenderWins || 0) >= contract.contenderWinsRequired)
    );
  }

  function noteContenderClauseProgress(career, won) {
    const contract = career?.contract;
    if (!won || !contract?.contenderWinsRequired || contenderClauseReady(career)) return;
    contract.contenderWins = clamp((contract.contenderWins || 0) + 1, 0, contract.contenderWinsRequired);
    if (contract.contenderWins >= contract.contenderWinsRequired) {
      career.flags = career.flags || {};
      career.flags.contenderClauseReady = true;
      addNews(
        career,
        "Clause contender activee",
        `${career.name} valide ${contract.contenderWinsRequired} victoires de clause. Le manager peut exiger une marche sportive superieure au prochain bilan.`,
        "good"
      );
    }
  }

  function promotionStatus(career) {
    const targets = promotionTargets(career);
    const nextOrg = targets[0] || null;
    const season = career.season || {};
    const fightLog = season.fightLog || [];
    const wins = fightLog.filter(row => row.result === "Victoire").length;
    const honored = fightLog.filter(row => !row.missed).length;
    const missed = fightLog.filter(row => row.missed).length + (career.flags?.missedSeasonFights || 0);
    const winRate = honored ? wins / honored : career.lastResult?.won ? 1 : 0;
    const hasBelt = hasCurrentTierTitle(career);
    const clauseReady = contenderClauseReady(career);
    const perfectSeason = honored >= 3 && wins === honored;
    const strongSeason = honored >= 3 && winRate >= 0.75;
    const unbeatenRun = career.record.w >= 2 && career.record.l === 0;
    const ufcWins = (career.fights || []).filter(fight => String(fight.org || "").toLowerCase().includes("ufc") && fight.result === "Victoire").length;
    const internationalStep = career.tier === 2;
    const ufcStep = career.tier === 3 || career.tier === 4;
    const legendStep = career.tier === 5;
    const activeContractBlock = (career.contract?.remainingFights || 0) > 0 && !clauseReady && !hasBelt;
    const nationalBreakout = internationalStep && !missed && career.lastResult?.won && (
      perfectSeason ||
      strongSeason ||
      unbeatenRun ||
      career.streak >= 3 ||
      (career.record.w >= 4 && career.record.l <= 1) ||
      career.rank <= 6 ||
      hasBelt ||
      clauseReady
    );
    const winningRecord = career.record.w >= career.record.l || career.streak >= 3;
    const cageSuccess = winningRecord && (
      perfectSeason ||
      strongSeason ||
      unbeatenRun ||
      career.streak >= 2 ||
      career.rank <= 8 ||
      winRate >= 0.66 ||
      career.lastResult?.fight?.title ||
      career.flags.fastTrack ||
      hasBelt ||
      clauseReady
    );
    const hypeTarget = career.tier <= 2 ? 16 + career.tier * 5 : 30 + career.tier * 7;
    const charismaTarget = career.tier <= 2 ? 52 + career.tier * 3 : 58 + career.tier * 4;
    const businessSuccess = (
      perfectSeason ||
      hasBelt ||
      clauseReady ||
      (career.hype || 0) >= hypeTarget ||
      (career.stats.charisma || 50) >= charismaTarget ||
      (career.money || 0) >= 65000 + career.tier * 28000 ||
      hasBelt
    );
    const nationalPerfectOverride = internationalStep && (perfectSeason || nationalBreakout);
    const financialDrag = (career.money || 0) < -5000 || (career.flags?.debtSeasons || 0) > 0 || (career.flags?.lockedContract || 0) > 0;
    const reliabilityBlock = missed > 0 || (activeContractBlock && !nationalPerfectOverride);
    const debtTrouble = financialDrag || reliabilityBlock;
    const threshold = targets.length ? Math.min(...targets.map(org => org.threshold || 0)) : 0;
    const visibilityAccess = (
      targets.length &&
      (
        perfectSeason ||
        strongSeason ||
        career.rep >= threshold * 0.65 ||
        career.rank <= 6 ||
        career.flags.fastTrack ||
        career.streak >= 4 ||
        hasBelt ||
        clauseReady
      )
    );
    const localEligible = career.tier <= 2 && (
      clauseReady ||
      hasBelt ||
      nationalBreakout ||
      perfectSeason ||
      (cageSuccess && businessSuccess && visibilityAccess)
    );
    const ufcEligible = ufcStep && hasBelt && !missed && career.lastResult?.won;
    const titleDefenses = currentTierTitle(career)?.defenses || 0;
    const legendOvrReady = overall(career) >= 99;
    const ufcDominance = (
      perfectSeason ||
      strongSeason ||
      career.streak >= 5 ||
      ufcWins >= 5 ||
      career.rank <= 1 ||
      titleDefenses >= 2
    );
    const legendAccess = hasBelt || career.rank <= 1 || ufcWins >= 7;
    const legendEligible = legendStep && legendOvrReady && legendAccess && !missed && career.lastResult?.won && ufcDominance;
    const cleanEnoughForPromotion = !reliabilityBlock && (!financialDrag || nationalPerfectOverride || clauseReady || hasBelt);
    const promotionEligible = Boolean(targets.length) && (
      (!debtTrouble && (legendStep ? legendEligible : ufcStep ? ufcEligible : localEligible)) ||
      (cleanEnoughForPromotion && localEligible)
    );
    const targetLabel = targets.map(org => org.label).join(" / ");
    return {
      nextOrg,
      targets,
      targetLabel,
      wins,
      honored,
      missed,
      winRate,
      hasBelt,
      clauseReady,
      perfectSeason,
      strongSeason,
      unbeatenRun,
      nationalBreakout,
      nationalPerfectOverride,
      internationalStep,
      ufcStep,
      legendStep,
      legendEligible,
      legendOvrReady,
      ufcDominance,
      legendAccess,
      ufcWins,
      hypeTarget,
      charismaTarget,
      activeContractBlock,
      financialDrag,
      reliabilityBlock,
      cageSuccess,
      businessSuccess,
      debtTrouble,
      visibilityAccess,
      promotionEligible,
    };
  }

  function contractNegotiationReady(career, status = promotionStatus(career)) {
    return Boolean(
      career?.lastResult?.won ||
      status.perfectSeason ||
      status.strongSeason ||
      status.nationalBreakout ||
      status.hasBelt
    );
  }

		  function buildFightOptions() {
	    const career = ui.career;
	    const championAtTier = hasCurrentTierTitle(career);
	    const titleReady = championAtTier || (career.record.w >= 3 && career.streak >= 2 && career.rank <= 5 + Math.max(0, 5 - career.tier));
	    const titleLabel = ORGS[career.tier]?.belt || "Ceinture";
	    const activeRival = (career.rivals || []).find(rival => (rival.heat || 0) >= 3);
	    const recentOpponentNames = (career.fights || [])
	      .slice(-10)
	      .map(fight => fight.opponent)
	      .filter(Boolean);
	    const usedOpponentNames = activeRival
	      ? [...recentOpponentNames.filter(name => !sameFighterName(name, activeRival.name)), activeRival.name]
	      : recentOpponentNames;
    const makeOpponent = difficulty => {
      const opponent = generateOpponent(career, difficulty, usedOpponentNames);
      usedOpponentNames.push(opponent.name);
      return opponent;
    };
    const options = [
      {
        id: "build",
        label: "Combat construit",
        tag: "Sur",
        summary: "Adversaire prenable, progression propre, risque limite.",
        opponent: makeOpponent(-6),
        risk: "low",
        hype: adjustedFightHype(career, 4 + career.tier),
        money: adjustedFightMoney(career, 8000 + career.tier * 9000, { risk: "low" }),
        rankMove: 2,
        title: false,
      },
      {
        id: "ranked",
        label: "Combat classe",
        tag: "Ranking",
        summary: "Un vrai test. Gagner vous rapproche des affiches importantes.",
        opponent: makeOpponent(1),
        risk: "mid",
        hype: adjustedFightHype(career, 9 + career.tier * 2),
        money: adjustedFightMoney(career, 15000 + career.tier * 18000, { risk: "mid" }),
        rankMove: 5,
        title: false,
      },
      {
        id: titleReady ? "title" : activeRival ? "rematch" : "short",
        label: titleReady ? championAtTier ? `Defense de ${titleLabel}` : `Combat pour ${titleLabel}` : activeRival ? `Rematch: ${activeRival.name}` : "Short notice dangereux",
        tag: titleReady ? "Ceinture" : activeRival ? "Rivalite" : "Audace",
        summary: titleReady
          ? championAtTier
            ? "Vous avez la ceinture: elle est remise en jeu sur cette affiche."
            : "Cinq rounds possibles. Une ligne qui change la carte finale."
          : activeRival
            ? "La tension vend le combat. Gagner ferme un chapitre, perdre ouvre une obsession."
            : "Peu de preparation, grosse lumiere, grosse menace.",
        opponent: activeRival && !titleReady ? rivalToOpponent(career, activeRival, 5) : makeOpponent(titleReady ? 7 : 9),
        risk: "high",
        hype: adjustedFightHype(career, titleReady ? 18 + career.tier * 3 : 16, { title: titleReady }),
        money: adjustedFightMoney(career, titleReady ? 30000 + career.tier * 35000 : 22000 + career.tier * 16000, {
          title: titleReady,
          rematch: Boolean(activeRival && !titleReady),
          short: !titleReady && !activeRival,
        }),
        rankMove: titleReady ? 12 : 7,
        title: titleReady,
        short: !titleReady && !activeRival,
        rematch: Boolean(activeRival && !titleReady),
      },
    ];
    if (championAtTier) {
      const defenseBase = ORGS[career.tier]?.belt || "Ceinture";
      options[0] = {
        ...options[0],
        id: "defense-safe",
        label: "Defense controlee",
        tag: "Defense",
        summary: `${defenseBase} en jeu contre un profil prenable. Moins de lumiere, mais le titre reste expose.`,
        title: true,
        hype: adjustedFightHype(career, 10 + career.tier * 2, { title: true }),
        money: adjustedFightMoney(career, 14000 + career.tier * 16000, { title: true, risk: "low" }),
        rankMove: 5,
      };
      options[1] = {
        ...options[1],
        id: "defense-contender",
        label: "Defense contre contender",
        tag: "Defense",
        summary: `${defenseBase} en jeu contre un vrai pretendant. Gagner nourrit la montee, perdre coute tout.`,
        title: true,
        hype: adjustedFightHype(career, 15 + career.tier * 3, { title: true }),
        money: adjustedFightMoney(career, 23000 + career.tier * 26000, { title: true, risk: "mid" }),
        rankMove: 8,
      };
    }
    options.forEach(option => {
      if (option.opponent?.name && !usedOpponentNames.includes(option.opponent.name)) usedOpponentNames.push(option.opponent.name);
    });
    career.pendingFightOptions = options;
    career.phase = "fight-offer";
    ui.view = "fightOffer";
    saveCareer();
    render();
  }

  function chooseFight(index) {
    const career = ui.career;
    if (hasMedicalRest(career)) {
      routeMedicalRest("Le staff refuse de signer un combat pendant le protocole.");
      return;
    }
    const fight = career.pendingFightOptions?.[index];
    if (!fight || fightIsInvalidForCareer(career, fight)) {
      startFightSelection();
      return;
    }
	    career.pendingFight = fight;
	    career.pendingPlan = null;
	    career.pendingPressChoice = null;
	    clearFightMomentState(career);
    career.flags.cancelledFightId = null;
    career.pendingFightOptions = null;
    addNews(career, "Combat signe", `${career.name} affrontera ${fight.opponent.name} (${fight.opponent.record}) en ${ORGS[career.tier].label}.`, fight.risk === "high" ? "hot" : "neutral");
    startTrainingBlock();
  }

  function adjustedStats(baseStats, plan, cap = 99) {
    const stats = { ...baseStats };
    if (plan) applyStats(stats, plan.stats, cap);
    return stats;
  }

  function styleFromOnline(value = "") {
    const clean = normalizeFighterName(value);
    return STYLES.find(style => style.id === clean || normalizeFighterName(style.label) === clean) || STYLES[0];
  }

	  function weightIndexFromLabel(value = "") {
	    const clean = normalizeFighterName(value);
	    const index = WEIGHTS.findIndex(weight => weight.id === clean || normalizeFighterName(weight.label) === clean);
	    return index >= 0 ? index : -1;
	  }

	  function findCountryFromOnline(value = "") {
	    const clean = normalizeFighterName(value);
	    return COUNTRIES.find(country => country.id === clean || normalizeFighterName(country.label) === clean) || COUNTRIES[0];
	  }

	  function findWeightFromOnline(value = "") {
	    const clean = normalizeFighterName(value);
	    return WEIGHTS.find(weight => weight.id === clean || normalizeFighterName(weight.label) === clean) || WEIGHTS[2];
	  }

	  function findStyleFromOnline(value = "") {
	    const clean = normalizeFighterName(value);
	    return STYLES.find(style => style.id === clean || normalizeFighterName(style.label) === clean) || STYLES[0];
	  }

	  function onlineFighterSnapshot(row = {}) {
	    const snapshot = row.snapshot && typeof row.snapshot === "object" ? row.snapshot : {};
	    const stats = row.stats && typeof row.stats === "object" ? row.stats : snapshot.stats || {};
	    const styleId = snapshot.styleId || snapshot.style?.id || row.style;
    const weightLabel = row.weight_class || snapshot.weightClass || snapshot.weight?.label || "";
    const record = snapshot.record || { w: row.record_w || 0, l: row.record_l || 0, ko: row.finishes_ko || 0, sub: row.finishes_sub || 0 };
    return {
      id: row.fighter_id || row.id || "",
      userId: row.user_id || row.userId || "",
      source: row.source || snapshot.source || "beta_import",
      manager: row.manager_name || row.managerName || "",
      name: row.fighter_name || row.name || "Combattant",
      weightClass: weightLabel,
      weightIndex: weightIndexFromLabel(weightLabel),
      style: styleFromOnline(styleId),
      stats: { ...newEmptyStats(), ...stats },
      overall: row.overall || snapshot.overall || 50,
      score: row.score || 0,
      record,
      org: row.org || snapshot.org || "Organisation",
	      retired: Boolean(row.retired || snapshot.retired),
	    };
	  }

	  function onlineFighterBelts(row = {}) {
	    const belts = Array.isArray(row.belts) ? row.belts : [];
	    const count = Math.max(0, Math.round(row.titles_count || belts.length || 0));
	    if (belts.length) {
	      return belts.slice(0, 8).map(belt => {
	        const tier = clamp(Number(belt.tier ?? row.org_tier ?? 0), 0, ORGS.length - 1);
	        return {
	          label: belt.label || orgForTier(tier).belt,
	          tier,
	          defenses: Math.max(0, Math.round(belt.defenses || 0)),
	          lost: Boolean(belt.lost),
	        };
	      });
	    }
	    return Array.from({ length: count }, (_, index) => {
	      const tier = clamp(Number(row.org_tier ?? 0), 0, ORGS.length - 1);
	      return {
	        label: index ? `${orgForTier(tier).belt} ${index + 1}` : orgForTier(tier).belt,
	        tier,
	        defenses: 0,
	        lost: false,
	      };
	    });
	  }

	  function onlineRowMatchesCareer(row, career) {
	    if (!row || !career) return false;
	    if ((row.id || row.fighter_id) && career.onlineFighterId === (row.id || row.fighter_id)) return true;
	    return row.source === (career.onlineSource || "beta_import") && sameFighterName(row.fighter_name || row.name, career.name);
	  }

	  function careerFromOnlineFighter(row = {}) {
	    const archived = archivedCareerForOnlineRow(row);
	    if (archived) {
	      archived.onlineFighterId = row.id || row.fighter_id || archived.onlineFighterId;
	      archived.onlineSource = row.source || archived.onlineSource || "beta_import";
	      archived.active = archived.active !== false;
	      return withCareerDefaults(archived);
	    }
	    const snapshot = onlineFighterSnapshot(row);
	    const country = findCountryFromOnline(row.country || snapshot.country);
	    const weight = findWeightFromOnline(row.weight_class || snapshot.weightClass);
	    const style = findStyleFromOnline(row.style || snapshot.style?.label);
	    const tier = clamp(Number(row.org_tier ?? snapshot.orgTier ?? 0), 0, ORGS.length - 1);
	    const org = orgForTier(tier);
	    const wins = Math.max(0, Math.round(row.record_w ?? snapshot.record?.w ?? 0));
	    const losses = Math.max(0, Math.round(row.record_l ?? snapshot.record?.l ?? 0));
	    const ko = Math.max(0, Math.round(row.finishes_ko ?? snapshot.record?.ko ?? 0));
	    const sub = Math.max(0, Math.round(row.finishes_sub ?? snapshot.record?.sub ?? 0));
	    const seed = Number(snapshot.seed || hashSeed(`${row.fighter_name || snapshot.name}-${row.updated_at || Date.now()}`));
	    const career = {
	      saveVersion: SAVE_VERSION,
	      active: !row.retired,
	      name: row.fighter_name || snapshot.name || "Combattant",
	      nickname: "",
	      country,
	      weight,
	      style,
	      origin: ORIGINS[0],
	      lifestyle: LIFESTYLES[1],
	      entourage: ENTOURAGES[0],
	      age: row.career_age || snapshot.age || 18,
	      year: snapshot.year || row.season_year || CURRENT_YEAR,
	      seed,
	      rngSeed: seed,
	      stats: { ...newEmptyStats(), ...(row.stats || snapshot.stats || {}) },
	      potential: 78,
	      money: row.money || 0,
	      rep: row.reputation || snapshot.rep || 8,
	      hype: row.hype || snapshot.hype || 5,
	      morale: 62,
	      condition: row.condition ?? snapshot.condition ?? 72,
	      org: {
	        id: org.id,
	        label: org.label,
	        org: org.tier,
	        summary: org.summary,
	      },
	      tier,
	      rank: snapshot.rank || 25,
	      record: { w: wins, l: losses, d: 0, ko, sub, dec: Math.max(0, wins - ko - sub) },
	      titles: onlineFighterBelts(row),
	      streak: 0,
	      lastResult: null,
	      fights: [],
	      exhibitions: [],
	      history: [`Carriere restauree depuis votre ecurie en ligne (${row.updated_at ? new Date(row.updated_at).toLocaleDateString("fr-FR") : "date inconnue"}).`],
	      moments: [],
	      news: [],
	      rivals: [],
	      contract: null,
	      medical: {
	        injuryRisk: 0,
	        restWeeks: 0,
	        activeInjury: null,
	        injuries: [],
	        rehabLog: [],
	        careerWarnings: 0,
	      },
	      flags: { statsNudge: true, restoredFromOnline: true },
	      pendingConsequences: [],
	      phase: row.retired ? "retirement-choice" : "season-setup",
	      season: null,
	      camp: null,
	      pendingEvent: null,
	      pendingSpecial: null,
	      specialFight: null,
	      specialCamp: null,
	      pendingTraining: null,
	      pendingLifeEvent: null,
	      pendingFightOptions: null,
	      pendingFight: null,
	      pendingPressChoice: null,
	      pendingPlan: null,
	      pendingContracts: null,
	      choiceResult: null,
	      onlineFighterId: row.id || row.fighter_id || "",
	      onlineSource: row.source || "beta_import",
	      startSummary: {
	        country: country.label,
	        weight: weight.label,
	        style: style.label,
	        origin: "Ecurie en ligne",
	      },
	    };
	    return withCareerDefaults(career);
	  }

	  function challengeWeightCompatible(a, b) {
    const left = typeof a === "number" ? a : onlineFighterSnapshot(a).weightIndex;
    const right = typeof b === "number" ? b : onlineFighterSnapshot(b).weightIndex;
    if (left < 0 || right < 0) return false;
    return Math.abs(left - right) <= 1;
  }

  function styleEdge(aStyle, bStyle) {
	    const table = {
	      wrestling: { boxing: 5, kickboxing: 5, karate: 4, bjj: -2 },
	      bjj: { wrestling: 2, boxing: 3, muay: 2, kickboxing: 3 },
	      boxing: { muay: 2, kickboxing: -1, karate: -2, wrestling: -4 },
	      muay: { karate: 3, wrestling: -2, boxing: -1, kickboxing: 1 },
	      kickboxing: { boxing: 2, karate: 2, muay: -1, wrestling: -4, bjj: -3 },
	      sambo: { bjj: 2, wrestling: 1, karate: 2, kickboxing: 3 },
	      karate: { boxing: 2, kickboxing: -1, bjj: 1, wrestling: -4 },
	    };
    return table[aStyle.id]?.[bStyle.id] || 0;
  }

  function buildFightAnalysis(career, opponent, plan, won, method, edge, condition, damage) {
    const lines = [];
    if (condition >= 78) lines.push("Votre forme de camp a tenu dans les moments longs.");
    else if (condition <= 48) lines.push("La forme basse a rendu chaque round plus couteux.");
    if (edge > 0) lines.push(`${career.style.label} avait un leger avantage de style sur ${opponent.style.label}.`);
    else if (edge < 0) lines.push(`${opponent.style.label} posait un vrai probleme stylistique.`);
    if (method !== "Decision") lines.push(won ? "Le plan a cree assez de danger pour finir avant la limite." : "L'adversaire a transforme une erreur en fin de combat.");
    if (plan.id === "pressure") lines.push("Le plan agressif a augmente la variance: gros upside, gros risque.");
    if (damage >= 7) lines.push("Le combat laisse une trace physique importante sur la saison.");
    if (!lines.length) lines.push(won ? "Vous avez gagne les details: volume, calme et adaptation." : "Le combat s'est joue sur les details et l'adversaire les a mieux pris.");
    return lines.slice(0, 4);
  }

  function roundNarrative(career, opponent, plan, round, won, diff, fighterStats, oppStats) {
    const close = Math.abs(diff) < 7;
    const late = round >= 3;
    const yourGround = fighterStats.grappling + fighterStats.wrestling >= fighterStats.striking + fighterStats.power;
    const opponentGround = oppStats.grappling + oppStats.wrestling >= oppStats.striking + oppStats.power;
    const winLines = {
      balanced: [
        "Vous touchez assez debout pour ouvrir le clinch, puis vous finissez le round sans panique.",
        "Le plan reste propre: deux entrees, une sortie propre, et les juges voient le controle.",
        close ? "Le round est serre, mais vos dernieres trente secondes font basculer l'impression." : "Vous gagnez les echanges utiles sans vous exposer inutilement.",
      ],
      strike: [
        "Le jab trouve la cible, les low kicks ralentissent les appuis adverses.",
        "Votre contre arrive au bon moment et force l'adversaire a hesiter avant d'entrer.",
        late ? "Malgre la fatigue, vos angles debout restent plus nets." : "Vous marquez debout sans laisser le centre trop longtemps.",
      ],
      wrestle: [
        "Vous collez a la cage, forcez les appuis lourds et volez le temps de travail.",
        "Le takedown arrive apres deux feintes. L'adversaire se releve, mais le round est deja sale.",
        late ? "Vous transformez la fatigue en controle contre le grillage." : "La pression en lutte casse son rythme avant qu'il ne puisse poser ses frappes.",
      ],
      grapple: [
        "Une transition au sol oblige l'adversaire a defendre au lieu de marquer.",
        "Vous menacez le dos, perdez la position, puis repartez avec le controle utile.",
        late ? "Le sol pese dans ses bras. Chaque sortie lui coute plus cher." : "Votre grappling force un round prudent dans son coin.",
      ],
      pressure: [
        "Vous mettez le feu d'entree et l'adversaire passe plus de temps a survivre qu'a construire.",
        "La pression fait reculer, les frappes ne sont pas toutes propres mais les juges sentent le danger.",
        close ? "Vous payez un peu votre volume, mais l'agressivite emporte le round." : "Le chaos vous appartient sur cette reprise.",
      ],
      measured: [
        "Vous refusez l'echange inutile et marquez avec des touches propres.",
        "Le round manque de bruit, pas de controle: vous scorez puis vous sortez.",
        late ? "Votre calme devient une arme pendant que l'autre force ses entrees." : "Vous lisez les reactions avant de choisir les bonnes cibles.",
      ],
    };
    const lossLines = {
      bjj: [
        "L'adversaire ralentit le combat au sol et vous oblige a defendre avant d'attaquer.",
        "Une menace de dos casse votre rythme. Vous survivez, mais le round lui echappe peu a peu.",
        "Vous sortez d'une mauvaise position trop tard pour reprendre les points.",
      ],
      wrestling: [
        "La lutte adverse vous colle au grillage et coupe vos relances.",
        "Vous defendez le premier takedown, pas le deuxieme. Le round devient long.",
        "Son controle cage transforme vos frappes en intentions sans volume.",
      ],
      boxing: [
        "Sa boxe arrive plus vite que vos entrees. Chaque jab ferme une option.",
        "Vous cherchez le clinch, mais il marque en reculant et garde le centre visuel.",
        "Le round se joue debout et son timing prend l'avantage.",
      ],
      muay: [
        "Les low kicks et le clinch adverse rendent vos appuis moins propres.",
        "Il casse la distance avec les genoux et vole les moments de corps-a-corps.",
        "Votre defense tient, mais ses frappes courtes marquent plus fort.",
      ],
      default: [
        "L'adversaire prend le centre et vous fait payer chaque entree.",
        "Vous avez des moments, mais pas assez longs pour convaincre les juges.",
        "Le round glisse sur des details: distance, timing, dernier echange.",
      ],
    };
    const lines = won
      ? (winLines[plan.id] || (yourGround ? winLines.wrestle : winLines.strike))
      : (lossLines[opponent.style.id] || (opponentGround ? lossLines.wrestling : lossLines.default));
    const index = (round + Math.floor(Math.abs(diff)) + career.name.length + opponent.name.length) % lines.length;
    return lines[index];
  }

  function fightRoundsFor(career, fight) {
    return fight?.title || career?.tier >= 4 ? 5 : 3;
  }

  function clearFightMomentState(career) {
    if (!career) return;
    career.pendingFightMoment = null;
    career.pendingFightMomentQueue = null;
    career.pendingFightMomentIndex = 0;
    career.fightMomentChoices = [];
    career.liveFight = null;
  }

  function fightMomentApplies(moment, career, fight, plan) {
    if (moment.titleOnly && !fight.title) return false;
    if (moment.planIds && !moment.planIds.includes(plan.id)) return false;
    if (moment.opponentStyles && !moment.opponentStyles.includes(fight.opponent.style.id)) return false;
    if (moment.fightRisks && !moment.fightRisks.includes(fight.risk)) return false;
    if (moment.minCondition && (career.condition || 0) < moment.minCondition) return false;
    if (moment.maxCondition && (career.condition || 0) > moment.maxCondition) return false;
    if (moment.minMorale && (career.morale || 0) < moment.minMorale) return false;
    if (moment.maxMorale && (career.morale || 0) > moment.maxMorale) return false;
    const fatigue = campFatigueImpact(career).fatigue || 0;
    if (moment.minCampFatigue && fatigue < moment.minCampFatigue) return false;
    if (moment.maxCampFatigue && fatigue > moment.maxCampFatigue) return false;
    const medicalRisk = ensureMedical(career).injuryRisk || 0;
    if (moment.minInjuryRisk && medicalRisk < moment.minInjuryRisk) return false;
    if (moment.maxInjuryRisk && medicalRisk > moment.maxInjuryRisk) return false;
    const stats = career.stats || {};
    if (moment.minStats && Object.entries(moment.minStats).some(([key, value]) => (stats[key] || 0) < value)) return false;
    if (moment.maxStats && Object.entries(moment.maxStats).some(([key, value]) => (stats[key] || 0) > value)) return false;
    return true;
  }

  function fightMomentRoundMatches(moment, targetRound, rounds) {
    if (!targetRound) return true;
    if ((moment.round || targetRound) === targetRound) return true;
    if (targetRound === rounds && rounds === 3 && [3, 5].includes(moment.round)) return true;
    if (targetRound === rounds && rounds === 5 && [3, 5].includes(moment.round)) return true;
    return false;
  }

  function rememberFightMoment(career, id) {
    if (!career || !id) return;
    career.flags = career.flags || {};
    rememberRecentId(career.flags, "recentFightMomentIds", id, 8);
    career.flags.lastFightMomentId = id;
    if (career.season) rememberRecentId(career.season, "fightMomentHistory", id, 8);
  }

  function filterRepeatedFightMoments(career, moments, usedIds = []) {
    if (!Array.isArray(moments) || moments.length <= 1) return moments || [];
    const recent = new Set([
      ...((career.flags?.recentFightMomentIds || []).slice(-4)),
      ...((career.season?.fightMomentHistory || []).slice(-4)),
    ]);
    const used = new Set(usedIds);
    const fresh = moments.filter(moment => !used.has(moment.id) && !recent.has(moment.id));
    if (fresh.length) return fresh;
    const notUsed = moments.filter(moment => !used.has(moment.id));
    if (notUsed.length) return notUsed;
    const notLast = moments.filter(moment => moment.id !== career.flags?.lastFightMomentId);
    return notLast.length ? notLast : moments;
  }

  function fightOptionEngagementScore(option = {}) {
    const fight = option.fight || {};
    const effects = option.effects || {};
    return (
      (fight.score || 0) * 4 +
      (fight.finish || 0) * 90 +
      (fight.damage || 0) * 1.4 +
      (effects.hype || 0) * 1.2 +
      (effects.rep || 0) * 0.8 +
      Math.max(0, -(effects.condition || 0)) * 0.45 +
      (effects.injuryRisk || 0) * 0.65 -
      (effects.medicalCare || 0) * 0.8
    );
  }

	  function fightOptionSafetyScore(option = {}) {
	    const fight = option.fight || {};
	    const effects = option.effects || {};
    return (
      (effects.medicalCare || 0) * 2.2 +
      (effects.condition || 0) * 1.3 +
      Math.max(0, -(fight.damage || 0)) * 2 +
      Math.max(0, -(fight.finish || 0)) * 45 +
      Math.max(0, -(effects.injuryRisk || 0)) * 1.2 -
      Math.max(0, fight.damage || 0) * 1.8 -
      Math.max(0, effects.injuryRisk || 0) * 2.4 -
      Math.max(0, -(effects.condition || 0)) * 0.8
	    );
	  }

	  function fightMomentActionSummary(option = {}, intent = "prudent") {
	    const prefix = intent === "risk" ? "Engager le danger" : "Gerer le risque";
	    return `${prefix}: ${option.result || option.label || "Decision de combat."}`;
	  }

	  function fightMomentBinaryOptions(options = [], opponentName = "") {
	    const hydrated = options.map(option => ({
	      ...option,
      label: String(option.label || "").replaceAll("{opponent}", opponentName),
      result: String(option.result || "").replaceAll("{opponent}", opponentName),
      effects: option.effects || {},
      fight: option.fight || {},
    }));
	    if (hydrated.length <= 2) {
	      const left = hydrated[0] || { label: "Temporiser", result: "Tu choisis la gestion.", effects: {}, fight: {} };
	      const right = hydrated[1] || hydrated[0] || left;
	      return [
	        { ...left, label: left.label, binaryLabel: left.label, binaryIntent: "Prudent", binarySummary: fightMomentActionSummary(left, "safe") },
	        { ...right, label: right.label, binaryLabel: right.label, binaryIntent: "Engager", binarySummary: fightMomentActionSummary(right, "risk") },
	      ];
	    }
	    const yes = [...hydrated].sort((a, b) => fightOptionEngagementScore(b) - fightOptionEngagementScore(a))[0];
	    const no = [...hydrated]
	      .sort((a, b) => fightOptionSafetyScore(b) - fightOptionSafetyScore(a))
	      .find(option => option !== yes) || hydrated.find(option => option !== yes) || yes;
	    return [
	      { ...no, label: no.label, binaryLabel: no.label, binaryIntent: "Prudent", binarySummary: fightMomentActionSummary(no, "safe") },
	      { ...yes, label: yes.label, binaryLabel: yes.label, binaryIntent: "Engager", binarySummary: fightMomentActionSummary(yes, "risk") },
	    ];
	  }

  function buildFightMoment(career, fight, plan, targetRound = null, usedIds = []) {
    const rounds = fightRoundsFor(career, fight);
    const baseCandidates = FIGHT_MOMENTS.filter(moment => fightMomentApplies(moment, career, fight, plan));
    const roundCandidates = baseCandidates.filter(moment => fightMomentRoundMatches(moment, targetRound, rounds));
    const candidates = roundCandidates.length ? roundCandidates : baseCandidates;
    const sourcePool = candidates.length ? candidates : FIGHT_MOMENTS;
    const source = pick(career, filterRepeatedFightMoments(career, sourcePool, usedIds));
    rememberFightMoment(career, source.id);
    return {
      id: source.id,
      category: source.category,
      icon: source.icon,
      round: clamp(targetRound || source.round || Math.ceil(rounds / 2), 1, rounds),
      title: source.title,
      text: source.text.replaceAll("{opponent}", fight.opponent.name),
      opponent: fight.opponent.name,
      options: fightMomentBinaryOptions(source.options, fight.opponent.name),
    };
  }

  function buildFightMomentQueue(career, fight, plan) {
    const rounds = fightRoundsFor(career, fight);
    const usedIds = [];
    return Array.from({ length: rounds }, (_, index) => {
      const round = index + 1;
      const moment = buildFightMoment(career, fight, plan, round, usedIds);
      usedIds.push(moment.id);
      return moment;
    });
  }

  function startFightMoment(planId) {
    const career = ui.career;
    if (hasMedicalRest(career)) {
      routeMedicalRest("Le combat ne peut pas etre lance sans feu vert medical.");
      return;
    }
    const fight = career.pendingFight;
    if (!fight) {
      startFightSelection();
      return;
    }
    const plan = PLANS.find(item => item.id === planId) || PLANS[0];
    clearFightMomentState(career);
    career.pendingPlan = plan;
    career.liveFight = {
      planId: plan.id,
      round: 1,
      rounds: fightRoundsFor(career, fight),
      fighterScore: 0,
      opponentScore: 0,
      report: [],
      finish: null,
    };
    career.pendingFightMomentIndex = 0;
    career.pendingFightMoment = buildFightMoment(career, fight, plan, 1);
    career.phase = "fight-moment";
    ui.view = "fightMoment";
    saveCareer();
    render();
  }

  function chooseFightMoment(index) {
    const career = ui.career;
    const moment = career.pendingFightMoment;
    const option = moment?.options?.[index] || moment?.options?.[0];
    const plan = PLANS.find(item => item.id === (career.pendingPlan?.id || career.pendingPlan)) || PLANS[0];
    if (!moment || !option) {
      simulateFight(plan.id);
      return;
    }
    const effects = applyEffects(career, option.effects);
    career.fightMomentChoices = Array.isArray(career.fightMomentChoices) ? career.fightMomentChoices : [];
    const context = { moment, option, effects };
    career.fightMomentChoices.push(context);
    if (!career.liveFight) {
      simulateFight(plan.id, { moments: career.fightMomentChoices });
      return;
    }
    const shouldFinalize = simulateLiveFightRound(career, context);
    if (shouldFinalize) {
      finalizeLiveFight(career);
      return;
    }
    const nextRound = career.liveFight.round;
    const usedIds = career.fightMomentChoices.map(item => item.moment.id);
    career.pendingFightMomentIndex = nextRound - 1;
    career.pendingFightMoment = buildFightMoment(career, career.pendingFight, plan, nextRound, usedIds);
    saveCareer();
    render();
  }

  function simulateLiveFightRound(career, momentContext) {
    const fight = career.pendingFight;
    const live = career.liveFight;
    if (!fight || !live) return true;
    const plan = PLANS.find(item => item.id === (career.pendingPlan?.id || career.pendingPlan || live.planId)) || PLANS[0];
    const opponent = fight.opponent;
    const rounds = live.rounds || fightRoundsFor(career, fight);
    const round = clamp(live.round || 1, 1, rounds);
    const fighterStats = adjustedStats(career.stats, plan, statCapForCareer(career));
    const oppStats = opponent.stats;
    const fatigueImpact = campFatigueImpact(career);
    const effectiveCondition = clamp((career.condition ?? 70) - fatigueImpact.conditionLoss, 0, 100);
    const conditionFactor = 0.86 + effectiveCondition / 360;
    const edge = styleEdge(career.style, opponent.style);
    const oppEdge = styleEdge(opponent.style, career.style);
    const fatigue = (round - 1) * 2.7;
    const fighterGas = (fighterStats.cardio + fatigueImpact.cardio + effectiveCondition * 0.22 + career.morale * 0.1 - fatigue) / 100;
    const oppGas = (oppStats.cardio - fatigue) / 100;
    const stand = fighterStats.striking * 0.28 + fighterStats.power * 0.18 + fighterStats.iq * 0.18 + fighterStats.chin * 0.1 + edge;
    const wrestle = fighterStats.wrestling * 0.25 + fighterStats.grappling * 0.18 + fighterStats.cardio * 0.14 + fighterStats.iq * 0.16 + edge;
    const oppStand = oppStats.striking * 0.28 + oppStats.power * 0.18 + oppStats.iq * 0.18 + oppStats.chin * 0.1 + oppEdge;
    const oppWrestle = oppStats.wrestling * 0.25 + oppStats.grappling * 0.18 + oppStats.cardio * 0.14 + oppStats.iq * 0.16 + oppEdge;
    const momentFight = momentContext?.option?.fight || {};
    const pressChoice = career.pendingPressChoice || null;
    const pressFight = pressChoice?.fight || {};
    let fighterRound = Math.max(1, (stand + wrestle) * (0.86 + fighterGas * 0.28) * conditionFactor + nextRand(career) * 28);
    fighterRound += fatigueImpact.score - fatigueImpact.roundTax * Math.max(0, round - 1);
    fighterRound += (momentFight.score || 0) * 2.6;
    if (round === 1 && pressChoice) fighterRound += (pressFight.score || 0) * 2.2;
    const oppRound = Math.max(1, (oppStand + oppWrestle) * (0.86 + oppGas * 0.28) + nextRand(career) * 28);
    const diff = fighterRound - oppRound;
    const won = diff >= 0;
    if (won) live.fighterScore += 10;
    else live.opponentScore += 10;
    if (won && Math.abs(diff) > 11) live.opponentScore += 8;
    else if (!won && Math.abs(diff) > 11) live.fighterScore += 8;
    else {
      live.fighterScore += won ? 9 : 9;
      live.opponentScore += won ? 9 : 10;
    }

    let narrative = roundNarrative(career, opponent, plan, round, won, diff, fighterStats, oppStats);
    let retry = 0;
    while ((live.report || []).some(line => line.text === narrative) && retry < 3) {
      retry += 1;
      narrative = roundNarrative(career, opponent, plan, round + retry, won, diff + retry * 3, fighterStats, oppStats);
    }
    live.report = Array.isArray(live.report) ? live.report : [];
    live.report.push({
      round,
      winner: won ? "Vous" : opponent.name,
      text: narrative,
    });

    const finishChance = Math.max(
      0.005,
      0.02 + (plan.finish || 0) + fatigueImpact.finish + (momentFight.finish || 0) + (round === 1 ? (pressFight.finish || 0) : 0) + Math.max(0, Math.abs(diff) - 13) / 175
    );
    if (nextRand(career) < finishChance) {
      const byYou = diff > 0;
      const submissionBias = byYou
        ? fighterStats.grappling + fighterStats.wrestling - fighterStats.striking - fighterStats.power
        : oppStats.grappling + oppStats.wrestling - oppStats.striking - oppStats.power;
      const method = submissionBias > 16 && nextRand(career) > 0.28 ? "Soumission" : nextRand(career) > 0.62 ? "TKO" : "KO";
      live.finish = { byYou, round, method };
      return true;
    }
    live.round = round + 1;
    return live.round > rounds;
  }

  function finalizeLiveFight(career) {
    const fight = career.pendingFight;
    const live = career.liveFight;
    if (!fight || !live) {
      startFightSelection();
      return;
    }
    const plan = PLANS.find(item => item.id === (career.pendingPlan?.id || career.pendingPlan || live.planId)) || PLANS[0];
    const opponent = fight.opponent;
    const rounds = live.rounds || fightRoundsFor(career, fight);
    const fighterScore = live.fighterScore || 0;
    const opponentScore = live.opponentScore || 0;
    const report = Array.isArray(live.report) ? live.report : [];
    const finish = live.finish || null;
    const decisionWin = fighterScore >= opponentScore;
    const won = finish ? finish.byYou : decisionWin;
    const method = finish ? finish.method : "Decision";
    const round = finish ? finish.round : rounds;
    const scoreText = finish ? `${method} R${round}` : `${fighterScore}-${opponentScore}`;
    const heldTitleBefore = currentTierTitle(career);
    const momentContexts = Array.isArray(career.fightMomentChoices) ? career.fightMomentChoices : [];
    const fatigueImpact = campFatigueImpact(career);
    const effectiveCondition = clamp((career.condition ?? 70) - fatigueImpact.conditionLoss, 0, 100);
    const edge = styleEdge(career.style, opponent.style);
    const pressChoice = career.pendingPressChoice || null;
    const pressFight = pressChoice?.fight || {};
    const pressDamage = pressFight.damage || 0;
    const momentDamage = momentContexts.reduce((sum, context) => sum + ((context.option?.fight || {}).damage || 0), 0);

    if (won) {
      career.record.w += 1;
      career.streak += 1;
      career.rank = Math.max(1, career.rank - fight.rankMove);
      career.rep = clamp(career.rep + fight.hype * 0.7 + (fight.title ? 8 : 1), 0, 160);
      career.hype = clamp(career.hype + fight.hype, 0, 160);
      career.money += fight.money;
      if (orgForTier(career.tier).charismaWin) {
        career.stats.charisma = clamp((career.stats.charisma || 50) + orgForTier(career.tier).charismaWin, 1, statCapForCareer(career));
      }
      if (method === "KO" || method === "TKO") career.record.ko += 1;
      else if (method === "Soumission") career.record.sub += 1;
      else career.record.dec += 1;
      if (fight.title) {
        const belt = ORGS[career.tier]?.belt || "Ceinture";
        if (heldTitleBefore) {
          heldTitleBefore.defenses = (heldTitleBefore.defenses || 0) + 1;
          heldTitleBefore.lastDefense = career.year;
          career.moments.push(`${belt} defendue contre ${opponent.name}.`);
          addNews(career, "Ceinture defendue", `${career.name} conserve ${belt} contre ${opponent.name}.`, "good");
        } else {
          career.titles.push({ tier: career.tier, label: belt, year: career.year, defenses: 0, lost: false });
          career.moments.push(`${belt} remportee contre ${opponent.name}.`);
        }
        if (career.flags.doublePath && career.titles.filter(t => t.tier >= 4).length >= 2) career.flags.doubleChamp = true;
      }
      {
        const threshold = nextPromotionThreshold(career);
        if (fight.short && threshold !== null && career.rep >= threshold - 8) {
          career.flags.fastTrack = true;
        }
      }
    } else {
      career.record.l += 1;
      career.streak = 0;
      career.rank = Math.min(30, career.rank + 3);
      career.rep = clamp(career.rep - 4 + fight.hype * 0.25, 0, 160);
      career.hype = clamp(career.hype - 6 + (fight.title ? 3 : 0), 0, 160);
      career.morale = clamp(career.morale - 8, 0, 100);
      if (fight.title && heldTitleBefore) {
        heldTitleBefore.lost = true;
        heldTitleBefore.lostYear = career.year;
        heldTitleBefore.lostTo = opponent.name;
        career.moments.push(`${heldTitleBefore.label} perdue contre ${opponent.name}.`);
        addNews(career, "Ceinture perdue", `${career.name} perd ${heldTitleBefore.label} contre ${opponent.name}.`, "bad");
      }
    }

    const damage = Math.max(1, Math.round((opponent.overall / 18) + (won ? 1 : 5) + (fight.short ? 3 : 0) + momentDamage + pressDamage + fatigueImpact.damage - career.stats.chin / 35));
    const conditionLoss = Math.max(0, damage + (won ? 5 : 9) + (fight.short ? 4 : 0) + Math.ceil(fatigueImpact.conditionLoss * 0.55));
    career.stats.durability = clamp(career.stats.durability - damage, 1, statCapForCareer(career));
    career.condition = clamp((career.condition || 70) - conditionLoss, 0, 100);
    if (fatigueImpact.injuryRisk) {
      const medical = ensureMedical(career);
      medical.injuryRisk = clamp((medical.injuryRisk || 0) + fatigueImpact.injuryRisk, 0, 90);
    }
    const growthBase = won ? 4 : 2;
    const ageSlow = career.age > 31 ? -1 : career.age < 24 ? 2 : 0;
    growCareer(career, growthBase + ageSlow, plan);
    career.morale = clamp(career.morale + (won ? 4 : -4), 0, 100);
    let analysis = buildFightAnalysis(career, opponent, plan, won, method, edge, effectiveCondition, damage);
    if (won && orgForTier(career.tier).charismaWin) {
      analysis = [`Victoire UFC: charisme +${orgForTier(career.tier).charismaWin}, la lumiere media change d'echelle.`, ...analysis].slice(0, 5);
    }
    if (fatigueImpact.fatigue <= 2 || fatigueImpact.fatigue >= 6) {
      analysis = [
        `Fatigue ${fatigueImpact.fatigue}/12 (${fatigueImpact.label}): ${fatigueImpact.text}`,
        ...analysis,
      ].slice(0, 5);
    }
    if (momentContexts.length) {
      analysis = [
        ...momentContexts.slice(0, 3).map(context => `R${context.moment.round} - ${context.moment.title}: ${context.option.result}`),
        ...analysis,
      ].slice(0, 5);
    }
    if (pressChoice) {
      analysis = [
        `Conference de presse (${pressChoice.label}): ${pressChoice.result}`,
        ...analysis,
      ].slice(0, 5);
    }
    if (fight.rematch || fight.risk === "high" || (!finish && Math.abs(fighterScore - opponentScore) <= 2)) {
      markRival(career, opponent, won ? 1 : 2);
    }
    addNews(
      career,
      won ? "Victoire importante" : "Soiree compliquee",
      `${career.name} ${won ? "bat" : "s'incline contre"} ${opponent.name} par ${scoreText}.`,
      won ? "good" : "bad"
    );
    addWorldNews(career, 1, won ? "results" : "scandals");
    const postFightInjury = rollPostFightInjury(career, fight, damage, won);
    if (postFightInjury) {
      analysis = [
        ...analysis,
        `${postFightInjury.label}: le staff medical impose ${postFightInjury.restWeeks ? formatRestWeeks(postFightInjury.restWeeks) : "une surveillance"} avant la suite.`,
      ].slice(0, 5);
    }
    const momentSummaries = momentContexts.map(context => ({
      category: context.moment.category,
      title: context.moment.title,
      round: clamp(context.moment.round, 1, rounds),
      choice: context.option.label,
      result: context.option.result,
      effects: context.effects || [],
    }));
    career.lastResult = {
      won,
      method,
      round,
      scoreText,
      opponent,
      plan,
      report,
      fight,
      damage,
      conditionLoss,
      analysis,
      fatigueImpact,
      moment: momentSummaries[0] || null,
      moments: momentSummaries,
      press: pressChoice ? {
        choice: pressChoice.label,
        result: pressChoice.result,
        effects: pressChoice.effects || [],
      } : null,
      injury: postFightInjury,
      badgeUnlocks: [],
      badgeTokenGain: 0,
    };
    career.fights.push({
      year: career.year,
      age: career.age,
      opponent: opponent.name,
      result: won ? "Victoire" : "Defaite",
      method,
      round,
      title: fight.title,
      org: ORGS[career.tier].label,
    });
    if (career.contract?.remainingFights > 0) {
      career.contract.remainingFights = Math.max(0, career.contract.remainingFights - 1);
    }
    noteContenderClauseProgress(career, won);
    if (career.season) {
      career.season.fightsDone += 1;
      career.season.fightLog.push({
        number: career.season.fightsDone,
        opponent: opponent.name,
        result: won ? "Victoire" : "Defaite",
        method,
        round,
        title: fight.title,
        scoreText,
        analysis,
        moment: momentSummaries.length ? momentSummaries.map(item => `R${item.round} ${item.title}: ${item.choice}`).join(" / ") : "",
        press: pressChoice?.label || "",
      });
    }
    career.history.push({
      year: career.year,
      age: career.age,
      text: `${won ? "Victoire" : "Defaite"} contre ${opponent.name} (${method}, R${round}).`,
    });
    const badgeSync = syncBadges(career, { notify: true });
    career.lastResult.badgeUnlocks = badgeSync.unlockedNow.map(badge => badge.id);
    career.lastResult.badgeTokenGain = badgeSync.tokenGain;
    career.phase = "fight-result";
    career.pendingPressChoice = null;
    clearFightMomentState(career);
    ui.view = "fightResult";
    saveCareer();
    render();
  }

  function simulateFight(planId, momentContext = null) {
    const career = ui.career;
    if (hasMedicalRest(career)) {
      routeMedicalRest("Le combat ne peut pas etre lance sans feu vert medical.");
      return;
    }
    const plan = PLANS.find(item => item.id === planId) || PLANS[0];
    const fight = career.pendingFight;
    if (!fight) {
      startFightSelection();
      return;
    }
    const opponent = fight.opponent;
    const rounds = fightRoundsFor(career, fight);
    const fighterStats = adjustedStats(career.stats, plan, statCapForCareer(career));
    const oppStats = opponent.stats;
    const condition = career.condition ?? 70;
    const fatigueImpact = campFatigueImpact(career);
    const effectiveCondition = clamp(condition - fatigueImpact.conditionLoss, 0, 100);
    const conditionFactor = 0.86 + effectiveCondition / 360;
	    const momentContexts = Array.isArray(momentContext?.moments)
	      ? momentContext.moments
	      : momentContext
	        ? [momentContext]
	        : [];
	    const momentBonuses = momentContexts.reduce((acc, context) => {
	      const momentRound = context?.moment ? clamp(context.moment.round, 1, rounds) : 0;
	      if (!momentRound) return acc;
	      const fightBonus = context.option?.fight || {};
	      acc[momentRound] = acc[momentRound] || { score: 0, finish: 0, damage: 0 };
	      acc[momentRound].score += (fightBonus.score || 0) * 2.6;
	      acc[momentRound].finish += fightBonus.finish || 0;
	      acc[momentRound].damage += fightBonus.damage || 0;
	      return acc;
	    }, {});
	    const momentDamage = Object.values(momentBonuses).reduce((sum, bonus) => sum + (bonus.damage || 0), 0);
	    const pressChoice = career.pendingPressChoice || null;
	    const pressFight = pressChoice?.fight || {};
	    const pressScoreBonus = (pressFight.score || 0) * 2.2;
	    const pressFinishBonus = pressFight.finish || 0;
	    const pressDamage = pressFight.damage || 0;
    let fighterScore = 0;
    let opponentScore = 0;
    let finish = null;
    const report = [];
    const edge = styleEdge(career.style, opponent.style);
    const oppEdge = styleEdge(opponent.style, career.style);

    for (let round = 1; round <= rounds; round += 1) {
      const fatigue = (round - 1) * 2.7;
      const fighterGas = (fighterStats.cardio + fatigueImpact.cardio + effectiveCondition * 0.22 + career.morale * 0.1 - fatigue) / 100;
      const oppGas = (oppStats.cardio - fatigue) / 100;
      const stand = fighterStats.striking * 0.28 + fighterStats.power * 0.18 + fighterStats.iq * 0.18 + fighterStats.chin * 0.1 + edge;
      const wrestle = fighterStats.wrestling * 0.25 + fighterStats.grappling * 0.18 + fighterStats.cardio * 0.14 + fighterStats.iq * 0.16 + edge;
      const oppStand = oppStats.striking * 0.28 + oppStats.power * 0.18 + oppStats.iq * 0.18 + oppStats.chin * 0.1 + oppEdge;
      const oppWrestle = oppStats.wrestling * 0.25 + oppStats.grappling * 0.18 + oppStats.cardio * 0.14 + oppStats.iq * 0.16 + oppEdge;
      let fighterRound = Math.max(1, (stand + wrestle) * (0.86 + fighterGas * 0.28) * conditionFactor + nextRand(career) * 28);
      fighterRound += fatigueImpact.score - fatigueImpact.roundTax * Math.max(0, round - 1);
	      const oppRound = Math.max(1, (oppStand + oppWrestle) * (0.86 + oppGas * 0.28) + nextRand(career) * 28);
	      const roundMomentBonus = momentBonuses[round] || null;
	      if (roundMomentBonus) fighterRound += roundMomentBonus.score || 0;
	      if (round === 1 && pressChoice) fighterRound += pressScoreBonus;
	      const diff = fighterRound - oppRound;
      const won = diff >= 0;
      if (won) fighterScore += 10;
      else opponentScore += 10;
      if (won && Math.abs(diff) > 11) opponentScore += 8;
      else if (!won && Math.abs(diff) > 11) fighterScore += 8;
      else {
        fighterScore += won ? 9 : 9;
        opponentScore += won ? 9 : 10;
      }

	      let narrative = roundNarrative(career, opponent, plan, round, won, diff, fighterStats, oppStats);
	      let retry = 0;
	      while (report.some(line => line.text === narrative) && retry < 3) {
	        retry += 1;
	        narrative = roundNarrative(career, opponent, plan, round + retry, won, diff + retry * 3, fighterStats, oppStats);
	      }
	      report.push({
	        round,
	        winner: won ? "Vous" : opponent.name,
	        text: narrative,
	      });

	      const finishChance = Math.max(0.005, 0.02 + (plan.finish || 0) + fatigueImpact.finish + (roundMomentBonus?.finish || 0) + (round === 1 ? pressFinishBonus : 0) + Math.max(0, Math.abs(diff) - 13) / 175);
      if (!finish && nextRand(career) < finishChance) {
        const byYou = diff > 0;
        const submissionBias = byYou
          ? fighterStats.grappling + fighterStats.wrestling - fighterStats.striking - fighterStats.power
          : oppStats.grappling + oppStats.wrestling - oppStats.striking - oppStats.power;
        const method = submissionBias > 16 && nextRand(career) > 0.28 ? "Soumission" : nextRand(career) > 0.62 ? "TKO" : "KO";
        finish = { byYou, round, method };
        break;
      }
    }

    const decisionWin = fighterScore >= opponentScore;
    const won = finish ? finish.byYou : decisionWin;
    const method = finish ? finish.method : "Decision";
    const round = finish ? finish.round : rounds;
    const scoreText = finish ? `${method} R${round}` : `${fighterScore}-${opponentScore}`;
    const heldTitleBefore = currentTierTitle(career);

    if (won) {
      career.record.w += 1;
      career.streak += 1;
      career.rank = Math.max(1, career.rank - fight.rankMove);
      career.rep = clamp(career.rep + fight.hype * 0.7 + (fight.title ? 8 : 1), 0, 160);
      career.hype = clamp(career.hype + fight.hype, 0, 160);
      career.money += fight.money;
      if (orgForTier(career.tier).charismaWin) {
        career.stats.charisma = clamp((career.stats.charisma || 50) + orgForTier(career.tier).charismaWin, 1, statCapForCareer(career));
      }
      if (method === "KO" || method === "TKO") career.record.ko += 1;
      else if (method === "Soumission") career.record.sub += 1;
      else career.record.dec += 1;
      if (fight.title) {
        const belt = ORGS[career.tier]?.belt || "Ceinture";
        if (heldTitleBefore) {
          heldTitleBefore.defenses = (heldTitleBefore.defenses || 0) + 1;
          heldTitleBefore.lastDefense = career.year;
          career.moments.push(`${belt} defendue contre ${opponent.name}.`);
          addNews(career, "Ceinture defendue", `${career.name} conserve ${belt} contre ${opponent.name}.`, "good");
        } else {
          career.titles.push({ tier: career.tier, label: belt, year: career.year, defenses: 0, lost: false });
          career.moments.push(`${belt} remportee contre ${opponent.name}.`);
        }
        if (career.flags.doublePath && career.titles.filter(t => t.tier >= 4).length >= 2) career.flags.doubleChamp = true;
      }
      {
        const threshold = nextPromotionThreshold(career);
        if (fight.short && threshold !== null && career.rep >= threshold - 8) {
          career.flags.fastTrack = true;
        }
      }
    } else {
      career.record.l += 1;
      career.streak = 0;
      career.rank = Math.min(30, career.rank + 3);
      career.rep = clamp(career.rep - 4 + fight.hype * 0.25, 0, 160);
      career.hype = clamp(career.hype - 6 + (fight.title ? 3 : 0), 0, 160);
      career.morale = clamp(career.morale - 8, 0, 100);
      if (fight.title && heldTitleBefore) {
        heldTitleBefore.lost = true;
        heldTitleBefore.lostYear = career.year;
        heldTitleBefore.lostTo = opponent.name;
        career.moments.push(`${heldTitleBefore.label} perdue contre ${opponent.name}.`);
        addNews(career, "Ceinture perdue", `${career.name} perd ${heldTitleBefore.label} contre ${opponent.name}.`, "bad");
      }
    }

	    const damage = Math.max(1, Math.round((opponent.overall / 18) + (won ? 1 : 5) + (fight.short ? 3 : 0) + momentDamage + pressDamage + fatigueImpact.damage - career.stats.chin / 35));
	    const conditionLoss = Math.max(0, damage + (won ? 5 : 9) + (fight.short ? 4 : 0) + Math.ceil(fatigueImpact.conditionLoss * 0.55));
    career.stats.durability = clamp(career.stats.durability - damage, 1, statCapForCareer(career));
    career.condition = clamp((career.condition || 70) - conditionLoss, 0, 100);
    if (fatigueImpact.injuryRisk) {
      const medical = ensureMedical(career);
      medical.injuryRisk = clamp((medical.injuryRisk || 0) + fatigueImpact.injuryRisk, 0, 90);
    }
    const growthBase = won ? 4 : 2;
    const ageSlow = career.age > 31 ? -1 : career.age < 24 ? 2 : 0;
    growCareer(career, growthBase + ageSlow, plan);
    career.morale = clamp(career.morale + (won ? 4 : -4), 0, 100);
    let analysis = buildFightAnalysis(career, opponent, plan, won, method, edge, effectiveCondition, damage);
    if (won && orgForTier(career.tier).charismaWin) {
      analysis = [`Victoire UFC: charisme +${orgForTier(career.tier).charismaWin}, la lumiere media change d'echelle.`, ...analysis].slice(0, 5);
    }
    if (fatigueImpact.fatigue <= 2 || fatigueImpact.fatigue >= 6) {
      analysis = [
        `Fatigue ${fatigueImpact.fatigue}/12 (${fatigueImpact.label}): ${fatigueImpact.text}`,
        ...analysis,
      ].slice(0, 5);
    }
	    if (momentContexts.length) {
	      analysis = [
	        ...momentContexts.slice(0, 3).map(context => `R${context.moment.round} - ${context.moment.title}: ${context.option.result}`),
	        ...analysis,
	      ].slice(0, 5);
	    }
	    if (pressChoice) {
	      analysis = [
	        `Conference de presse (${pressChoice.label}): ${pressChoice.result}`,
	        ...analysis,
	      ].slice(0, 5);
	    }
    if (fight.rematch || fight.risk === "high" || (!finish && Math.abs(fighterScore - opponentScore) <= 2)) {
      markRival(career, opponent, won ? 1 : 2);
    }
	    addNews(
	      career,
	      won ? "Victoire importante" : "Soiree compliquee",
	      `${career.name} ${won ? "bat" : "s'incline contre"} ${opponent.name} par ${scoreText}.`,
	      won ? "good" : "bad"
	    );
	    addWorldNews(career, 1, won ? "results" : "scandals");
	    const postFightInjury = rollPostFightInjury(career, fight, damage, won);
	    if (postFightInjury) {
	      analysis = [
	        ...analysis,
	        `${postFightInjury.label}: le staff medical impose ${postFightInjury.restWeeks ? formatRestWeeks(postFightInjury.restWeeks) : "une surveillance"} avant la suite.`,
	      ].slice(0, 5);
	    }
	    const momentSummaries = momentContexts.map(context => ({
	      category: context.moment.category,
	      title: context.moment.title,
	      round: clamp(context.moment.round, 1, rounds),
	      choice: context.option.label,
	      result: context.option.result,
	      effects: context.effects || [],
	    }));
	    career.lastResult = {
	      won,
	      method,
	      round,
	      scoreText,
	      opponent,
	      plan,
	      report,
		      fight,
		      damage,
		      conditionLoss,
		      analysis,
          fatigueImpact,
		      moment: momentSummaries[0] || null,
		      moments: momentSummaries,
			      press: pressChoice ? {
			        choice: pressChoice.label,
			        result: pressChoice.result,
			        effects: pressChoice.effects || [],
			      } : null,
			      injury: postFightInjury,
	      badgeUnlocks: [],
	      badgeTokenGain: 0,
	    };
	    career.fights.push({
	      year: career.year,
	      age: career.age,
	      opponent: opponent.name,
      result: won ? "Victoire" : "Defaite",
      method,
      round,
      title: fight.title,
	      org: ORGS[career.tier].label,
	    });
	    if (career.contract?.remainingFights > 0) {
	      career.contract.remainingFights = Math.max(0, career.contract.remainingFights - 1);
	    }
	    noteContenderClauseProgress(career, won);
	    if (career.season) {
      career.season.fightsDone += 1;
      career.season.fightLog.push({
        number: career.season.fightsDone,
        opponent: opponent.name,
        result: won ? "Victoire" : "Defaite",
        method,
        round,
        title: fight.title,
        scoreText,
	        analysis,
	        moment: momentSummaries.length ? momentSummaries.map(item => `R${item.round} ${item.title}: ${item.choice}`).join(" / ") : "",
	        press: pressChoice?.label || "",
	      });
    }
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: `${won ? "Victoire" : "Defaite"} contre ${opponent.name} (${method}, R${round}).`,
	    });
	    const badgeSync = syncBadges(career, { notify: true });
	    career.lastResult.badgeUnlocks = badgeSync.unlockedNow.map(badge => badge.id);
	    career.lastResult.badgeTokenGain = badgeSync.tokenGain;
		    career.phase = "fight-result";
		    career.pendingPressChoice = null;
		    clearFightMomentState(career);
	    ui.view = "fightResult";
    saveCareer();
    render();
  }

  function growCareer(career, points, plan) {
    const keysByPlan = {
      strike: ["striking", "power", "iq"],
      wrestle: ["wrestling", "cardio", "discipline"],
      grapple: ["grappling", "iq", "wrestling"],
      pressure: ["power", "striking", "cardio"],
      measured: ["iq", "discipline", "cardio"],
      balanced: ["striking", "wrestling", "grappling", "cardio", "iq"],
    };
    const keys = keysByPlan[plan.id] || keysByPlan.balanced;
    for (let i = 0; i < Math.max(1, points); i += 1) {
      const key = keys[Math.floor(nextRand(career) * keys.length)];
      const statCap = statCapForCareer(career);
      const cap = isLegendCareer(career) ? statCap : career.potential;
      const gain = career.stats[key] >= cap ? 0 : isLegendCareer(career) && career.stats[key] >= 120 ? 2 : 1;
      career.stats[key] = clamp(career.stats[key] + gain, 1, statCap);
    }
  }

  function promotionContractOffer(career, org, status) {
    const hype = career.hype || 0;
    const rep = career.rep || 0;
    const charisma = career.stats.charisma || 50;
    const common = {
      tier: org.tier,
      orgId: org.id,
      fights: org.id === "ufc" ? 3 : 4,
      sponsor: org.id === "ufc" ? "Partenaires US prudents" : "Equipementier international",
    };
    if (org.id === "legend") {
      return {
        ...common,
        id: "move-legend",
        label: "Entrer chez les Legendes",
        tag: "Endgame",
        summary: "Vous quittez le circuit normal: nouveaux adversaires mythiques, combats de prestige et plafond de stats ouvert au-dela de 100.",
        money: Math.round((160000 + hype * 920 + rep * 620 + charisma * 420) / 1000) * 1000,
        fights: 5,
        purseBoost: 1.62,
        titleClause: "Affiches de legende: chaque victoire compte au Pantheon",
        contenderWinsRequired: 0,
        entryRank: 1,
        sponsor: "Partenaires Hall of Fame",
        effects: { morale: 8, rep: 18, hype: 24, stats: { charisma: 3, iq: 2, discipline: 2 } },
      };
    }
    if (org.id === "ksw") {
      return {
        ...common,
        id: "move-ksw",
        label: "Signer au KSW",
        tag: "Europe de l'Est",
        summary: "Porte internationale accessible: opposition au-dessus du National, hype plus lente, bonnes bourses si vous prenez la ceinture.",
        money: Math.round((52000 + hype * 420 + rep * 260) / 1000) * 1000,
        purseBoost: 1.12,
        titleClause: "Title eliminator si 2 victoires",
        contenderWinsRequired: 2,
        entryRank: 16,
        effects: { morale: 1, rep: 5, hype: 3 },
      };
    }
    if (org.id === "pfl") {
      return {
        ...common,
        id: "move-pfl",
        label: "Signer au PFL",
        tag: "Europe centrale",
        summary: "Contrat plus riche et marche sportive plus dure que KSW. Gros cheque, moins de charisme et de hype qu'une trajectoire UFC.",
        money: Math.round((82000 + hype * 620 + rep * 360) / 1000) * 1000,
        purseBoost: 1.24,
        titleClause: "Contender serie si 2 victoires",
        contenderWinsRequired: 2,
        entryRank: 18,
        effects: { morale: -1, rep: 6, hype: 2 },
      };
    }
    if (org.id === "regional" || org.id === "national") {
      return {
        ...common,
        id: `move-${org.id}`,
        label: `Signer en ${org.label}`,
        tag: org.id === "national" ? "Palier national" : "Palier local",
        summary: org.id === "national"
          ? "Le circuit national vous donne des adversaires plus serieux et rend visible la prochaine bascule internationale."
          : "Vous quittez les cartes obscures pour un circuit regional plus lisible et mieux observe.",
        money: Math.round((24000 + org.tier * 18000 + hype * 260 + rep * 180) / 1000) * 1000,
        purseBoost: org.id === "national" ? 1.1 : 1.06,
        titleClause: "Progression ranking acceleree",
        contenderWinsRequired: 0,
        entryRank: org.id === "national" ? 18 : 20,
        sponsor: org.id === "national" ? "Equipementier national" : "Sponsor regional",
        effects: { morale: 3, rep: 4, hype: 4 },
      };
    }
    return {
      ...common,
      id: "move-ufc",
      label: "Signer a l'UFC",
      tag: "Sommet mondial",
      summary: "La ceinture KSW/PFL ouvre la porte. Bourse de base plus basse, mais chaque victoire UFC fait bondir hype et charisme.",
      money: Math.round((46000 + hype * 360 + charisma * 180) / 1000) * 1000,
      purseBoost: 0.96,
      titleClause: status.hasBelt ? "Champion international signe: top 15 a meriter" : "Top 15 a meriter",
      contenderWinsRequired: 0,
      entryRank: 15,
      sponsor: "Equipementier global",
      effects: { morale: 5, rep: 8, hype: 12, stats: { charisma: 1 } },
    };
  }

			  function buildContractOffers() {
			    const career = ui.career;
			    const status = promotionStatus(career);
			    if (status.activeContractBlock && !(status.internationalStep && (status.perfectSeason || status.nationalBreakout))) return [];
			    if (!contractNegotiationReady(career, status)) return [];
	    const debtTrouble = status.debtTrouble;
	    const promotionEligible = status.promotionEligible;
	    const currentOrg = orgForTier(career.tier);
	    const championStayingInternational = status.hasBelt && (currentOrg.id === "ksw" || currentOrg.id === "pfl");
	    const stayMoneyBase = championStayingInternational
	      ? currentOrg.id === "ksw" ? 92000 : 135000
	      : (debtTrouble ? 14000 : 22000) + career.tier * (debtTrouble ? 12000 : 21000);
	    const stayPurseBoost = championStayingInternational
	      ? currentOrg.id === "ksw" ? 1.28 : 1.34
	      : debtTrouble ? 1 : 1.05;
	    const sponsorEligible = !debtTrouble && (
	      (career.hype || 0) >= 28 + career.tier * 5 ||
	      (career.stats.charisma || 50) >= 58 + career.tier * 3 ||
	      (career.money || 0) >= 100000
	    );
	    const premiumSponsor = sponsorEligible && (career.hype || 0) >= 54 && (career.stats.charisma || 50) >= 66 && (career.money || 0) >= 50000;
	    const offers = [
	      {
	        id: "stay",
	        label: `Rester en ${currentOrg.label}`,
	        tag: debtTrouble ? "Relance" : championStayingInternational ? "Champion" : "Regne",
	        summary: debtTrouble
	          ? "Stabiliser comptes et image avant de viser plus haut."
	          : championStayingInternational
	            ? `${currentOrg.label} veut garder son champion: meilleure bourse, defense de ceinture, route UFC toujours ouverte si vous continuez a gagner.`
	            : "Defendre votre place, construire votre nom sans bruler les etapes.",
	        tier: career.tier,
	        orgId: currentOrg.id,
	        money: Math.round(stayMoneyBase / 1000) * 1000,
	        fights: career.tier >= 3 ? 4 : 3,
	        purseBoost: stayPurseBoost,
	        titleClause: debtTrouble ? "Contrat de confiance a reconstruire" : career.rank <= 5 || status.hasBelt ? "Title eliminator garanti" : "Progression ranking",
	        sponsor: debtTrouble ? "Sponsor local prudent" : championStayingInternational ? "Sponsor champion" : "Sponsors locaux",
	        effects: debtTrouble ? { morale: -1, rep: 1, hype: -2, locked: 1 } : { morale: championStayingInternational ? 2 : 4, rep: 3, hype: championStayingInternational ? 1 : -2 },
	      },
	    ];
	    if (promotionEligible) {
	      status.targets.forEach(org => {
	        offers.push(promotionContractOffer(career, org, status));
	      });
	    }
	    if (sponsorEligible) {
	      offers.push({
	        id: "sponsor",
	        label: premiumSponsor ? "Deal sponsor majeur" : "Deal sponsor + liberte",
	        tag: premiumSponsor ? "Mainstream" : "Business",
	        summary: premiumSponsor ? "Charisme, hype et image ouvrent une grosse enveloppe." : "Moins de securite sportive, plus de cash et de negociation.",
	        tier: career.tier,
	        orgId: currentOrg.id,
	        money: Math.round(((premiumSponsor ? 72000 : 36000) + career.tier * 32000 + Math.floor(career.stats.charisma * (premiumSponsor ? 780 : 520))) / 1000) * 1000,
	        fights: career.tier >= 2 ? 3 : 2,
	        purseBoost: premiumSponsor ? 1.34 : 1.24,
	        titleClause: premiumSponsor ? "Activation bonus si main event" : "Libre apres deux combats",
	        sponsor: premiumSponsor ? "Marque lifestyle nationale" : "Marque lifestyle",
	        effects: premiumSponsor ? { money: 14000, hype: 9, morale: 2, rep: 2 } : { money: 8000, hype: 6, morale: 1, rep: -1 },
	      });
	    }
	    return offers;
	  }

	  function contractOffersNeedRefresh(career) {
	    const status = promotionStatus(career);
	    if (!contractNegotiationReady(career, status)) return false;
	    const offers = Array.isArray(career.pendingContracts) ? career.pendingContracts : [];
	    if (!offers.length) return true;
	    if (!status.promotionEligible) return false;
    const expectedMoveIds = (status.targets || []).map(org => `move-${org.id}`);
    return expectedMoveIds.some(id => !offers.some(offer => offer.id === id));
  }

  function ensureContractOffers(career) {
    if (contractOffersNeedRefresh(career)) {
      career.pendingContracts = buildContractOffers();
      return true;
    }
    return false;
  }

  function unlockLegendMode(career) {
    career.flags = career.flags || {};
    if (career.flags.legendModeUnlocked) return;
    career.flags.legendMode = true;
    career.flags.legendModeUnlocked = true;
    career.potential = Math.max(career.potential || 0, LEGEND_STAT_CAP);
    career.moments.push("Statut Legende debloque: le plafond de progression explose et un nouveau pool d'adversaires apparait.");
    addNews(
      career,
      "Statut Legende",
      `${career.name} entre dans le circuit des legendes. Les stats peuvent maintenant depasser 100 et les affiches deviennent historiques.`,
      "good"
    );
  }

  function chooseContract(index) {
    const career = ui.career;
    const offer = career.pendingContracts[index];
    const org = orgForTier(offer.tier);
    career.tier = offer.tier;
    career.org = { id: offer.orgId || org.id, label: org.label, org: org.tier, summary: org.summary, stats: {} };
    career.money += offer.money;
    applyEffects(career, offer.effects);
	    career.contract = {
	      org: org.label,
	      orgId: offer.orgId || org.id,
	      tier: offer.tier,
	      fights: offer.fights,
	      remainingFights: offer.fights,
	      purseBoost: offer.purseBoost || 1,
	      titleClause: offer.titleClause,
	      sponsor: offer.sponsor,
	      contenderWinsRequired: offer.contenderWinsRequired || 0,
	      contenderWins: 0,
	      signedYear: career.year,
    };
    career.rank = offer.entryRank || (offer.tier > 0 && String(offer.id).startsWith("move") ? 18 : career.rank);
    career.flags.fastTrack = false;
    career.flags.contenderClauseReady = false;
    if (org.id === "legend") {
      unlockLegendMode(career);
    }
    career.history.push({
      year: career.year,
      age: career.age,
      text: `${offer.label}. Prime: ${formatMoney(offer.money)}.`,
    });
    addNews(career, "Contrat signe", `${career.name} signe: ${offer.fights} combats, ${offer.titleClause}, sponsor ${offer.sponsor}.`, "good");
    career.pendingContracts = null;
    advanceYear();
  }

	  function settleSeason(career) {
    const season = career.season;
    if (!season || season.settled) return;
    const plan = seasonPlanById(season.strategy || "standard");
    const wins = season.fightLog.filter(row => row.result === "Victoire").length;
    const finishes = season.fightLog.filter(row => row.method !== "Decision").length;
    const completed = season.fightsDone >= season.fightsTarget;
    const winRate = season.fightsDone ? wins / season.fightsDone : 0;
    const effects = {};
    let title = "Saison a digerer";
    let text = "Le staff garde une saison neutre au dossier: pas de rupture, pas de vraie acceleration.";
	    if (completed && winRate >= 0.75) {
	      title = "Saison reussie";
	      text = `${career.name} boucle ${formatCombats(season.fightsDone)} avec ${wins} victoire${wins > 1 ? "s" : ""}. Les promoteurs parlent d'un nom qui monte.`;
      effects.rep = 5 + Math.min(5, wins);
      effects.hype = 4 + finishes * 2;
      effects.money = 6000 + career.tier * 6000 + finishes * 2500;
      effects.morale = 5;
    } else if (completed && winRate >= 0.5) {
      title = "Saison solide";
      text = "Le bilan est utilisable: assez de combats pour progresser, assez de reponses pour negocier.";
      effects.rep = 3;
      effects.hype = 2 + finishes;
      effects.money = 3000 + career.tier * 3500;
      effects.morale = 2;
    } else {
      title = "Saison compliquee";
      text = "Le calendrier est termine, mais le vestiaire sait que la prochaine annee doit raconter autre chose.";
      effects.rep = -2;
      effects.morale = -5;
      effects.hype = Math.max(-6, -2 - season.fightLog.length);
    }
    if (plan.id === "marathon") {
      effects.money = (effects.money || 0) + 12000 + career.tier * 5000;
      effects.injuryRisk = (effects.injuryRisk || 0) + (completed ? 6 : 10);
      text += " Le calendrier agressif paie, mais laisse une dette physique.";
    }
    if (plan.id === "clean" && completed) {
      effects.medicalCare = (effects.medicalCare || 0) + 12;
      effects.condition = (effects.condition || 0) + 4;
      text += " La discipline medicale laisse le corps plus frais.";
    }
	    if (plan.id === "spotlight" && completed) {
	      effects.hype = (effects.hype || 0) + 5;
	      effects.money = (effects.money || 0) + 10000;
	      text += " Les medias ont transforme la saison en produit vendable.";
	    }
	    if (season.healthPaused) {
	      title = winRate >= 0.5 ? "Saison ecourtee, bilan utile" : "Saison ecourtee";
	      text += " Le staff a coupe le calendrier pour eviter que la dette medicale devienne une fin de carriere.";
	    }
	    const activeTitle = currentTierTitle(career);
	    if (activeTitle && completed) {
	      effects.rep = (effects.rep || 0) + 3;
	      effects.hype = (effects.hype || 0) + 4;
	      text += ` ${activeTitle.label} conservee: votre manager peut demander une marche au-dessus.`;
	    }
	    const missed = season.fightLog.filter(row => row.missed).length;
	    if (missed) {
	      effects.rep = (effects.rep || 0) - missed * 4;
	      effects.hype = (effects.hype || 0) - missed * 5;
	      effects.money = (effects.money || 0) - missed * 4000;
	      effects.locked = (effects.locked || 0) + 1;
	      text += ` ${missed} combat${missed > 1 ? "s" : ""} non honore${missed > 1 ? "s" : ""}: les signatures importantes se refroidissent.`;
	    }
    const delayedResults = resolveSeasonConsequences(career);
    const shown = applyEffects(career, effects);
    season.settled = true;
	    season.settlement = { title, text, effects: shown, delayed: delayedResults };
	    career.history.push({
	      year: career.year,
	      age: career.age,
	      text: `${title}: ${text}`,
		    });
		    addNews(
		      career,
		      "Bilan de saison",
		      text,
		      title === "Saison compliquee" ? "bad" : title === "Saison reussie" ? "good" : "neutral"
		    );
		  }

	  function applyFinancialPressure(career) {
	    career.flags = career.flags || {};
	    if ((career.money || 0) < 0) {
	      career.flags.debtSeasons = (career.flags.debtSeasons || 0) + 1;
	      const severe = career.money <= -20000 || career.flags.debtSeasons >= 2;
	      const effects = applyEffects(career, severe
	        ? { rep: -6, hype: -6, morale: -8, condition: -4, locked: 1, stats: { charisma: -2, discipline: -1 } }
	        : { rep: -3, hype: -3, morale: -4, stats: { charisma: -1 } }
	      );
	      addNews(
	        career,
	        severe ? "Dette qui freine" : "Finances sous pression",
	        severe
	          ? `${career.name} commence la saison avec une dette qui pese sur le staff, les sponsors et les signatures ambitieuses.`
	          : `${career.name} attaque la saison dans le rouge. Rien d'irreparable, mais le manager doit calmer les depenses.`,
	        "bad"
	      );
	      career.history.push({
	        year: career.year,
	        age: career.age,
	        text: `${severe ? "Dette lourde" : "Dette"}: ${formatMoney(career.money)}. ${effects.map(effect => effectText(effect.key, effect.value)).join(", ")}.`,
	      });
	      return;
	    }
	    career.flags.debtSeasons = 0;
	    if ((career.money || 0) >= 180000 && (career.hype || 0) >= 40 && career.flags.cashMomentumYear !== career.year) {
	      career.flags.cashMomentumYear = career.year;
	      const effects = applyEffects(career, { rep: 2, hype: 2, morale: 2 });
	      addNews(career, "Tresorerie solide", `${career.name} peut financer un camp propre et negocier sans courir apres chaque cheque. Les partenaires le sentent.`, "good");
	      career.history.push({
	        year: career.year,
	        age: career.age,
	        text: `Tresorerie solide: ${effects.map(effect => effectText(effect.key, effect.value)).join(", ")}.`,
	      });
	    }
	  }

	  function advanceAfterFight() {
    const career = ui.career;
    career.pendingTraining = null;
    career.pendingEvent = null;
    career.pendingLifeEvent = null;
	    career.pendingFightOptions = null;
		    career.pendingFight = null;
		    career.pendingPlan = null;
		    career.pendingPressChoice = null;
		    clearFightMomentState(career);
	    career.choiceResult = null;
    career.camp = null;
    if (career.flags.medicalRetirement) {
      addNews(career, "Commission medicale", `${career.name} est arrete par le staff medical apres des blessures repetees.`, "bad");
	      routeCareerSaveChoice(career);
      return;
    }
    if (hasMedicalRest(career)) {
      career.phase = "medical-rest";
      ui.view = "medicalRest";
      saveCareer();
      render();
      return;
    }
    if (career.season && career.season.fightsDone < career.season.fightsTarget) {
      if (maybePreparePostFightLifeEvent(career)) return;
      career.phase = "season-progress";
      ui.view = "seasonProgress";
      saveCareer();
      render();
      return;
    }
    settleSeason(career);
    career.pendingContracts = buildContractOffers();
    career.phase = "season-summary";
    ui.view = "seasonSummary";
    saveCareer();
    render();
  }

	  function retirementRecommended(career) {
	    return career.age >= 34 || career.stats.durability <= 25;
	  }

	  function voluntaryRetirementAvailable(career) {
	    const totalFights = (career.record?.w || 0) + (career.record?.l || 0) + (career.record?.d || 0);
	    return retirementRecommended(career) || career.age >= 30 || totalFights >= 16 || career.titles.length > 0 || career.tier >= 4;
	  }

	  function forcedRetirement(career) {
	    const medical = ensureMedical(career);
	    return (
	      career.flags.medicalRetirement ||
	      career.age >= 42 ||
	      (career.stats.durability <= 8 && (career.age >= 28 || (medical.careerWarnings || 0) > 0))
	    );
	  }

	  function medicalCareerBlocked(career) {
	    if (!career) return false;
	    const medical = ensureMedical(career);
	    return Boolean(
	      career.flags?.medicalRetirement ||
	      (career.stats?.durability <= 8 && (career.age >= 28 || (medical.careerWarnings || 0) > 0))
	    );
	  }

	  function canOfferCareerSave(career) {
	    return Boolean(
	      career?.active &&
	      career.age < 42 &&
	      medicalCareerBlocked(career) &&
	      (career.flags?.careerSaveUsed || 0) < 2
	    );
	  }

	  function routeCareerSaveChoice(career) {
	    if (!career) return false;
	    if (canOfferCareerSave(career)) {
	      career.flags = career.flags || {};
	      career.flags.medicalRetirement = true;
	      career.phase = "career-save-choice";
	      ui.view = "careerSaveChoice";
	      saveCareer();
	      render();
	      return true;
	    }
	    finishCareer("medical");
	    return true;
	  }

  function advanceYear(force = false) {
    const career = ui.career;
	    if (!force && forcedRetirement(career)) {
	      if (career.age >= 42) finishCareer("age");
	      else routeCareerSaveChoice(career);
	      return;
	    }
    if (!force && retirementRecommended(career)) {
      career.phase = "retirement-choice";
      ui.view = "retirementChoice";
      saveCareer();
      render();
      return;
    }
    career.age += 1;
    career.year += 1;
	    career.condition = clamp(70 + Math.floor((career.morale - 55) / 8), 35, 92);
	    ensureMedical(career).injuryRisk = clamp((career.medical.injuryRisk || 0) - 8, 0, 90);
	    career.flags.lockedContract = Math.max(0, (career.flags.lockedContract || 0) - 1);
	    applyFinancialPressure(career);
	    career.flags.missedSeasonFights = 0;
	    if (career.age > 33) {
      const statCap = statCapForCareer(career);
      career.stats.cardio = clamp(career.stats.cardio - 1, 1, statCap);
      career.stats.durability = clamp(career.stats.durability - 1, 1, statCap);
      career.stats.iq = clamp(career.stats.iq + 1, 1, statCap);
    }
    startSeason();
  }

	  function scoreCareer(career) {
	    const finishBonus = (career.record.ko + career.record.sub) * 4;
    const beltBonus = career.titles.reduce((sum, title) => sum + 14 + title.tier * 6, 0);
    const tierBonus = career.tier * 16;
    const recordBonus = career.record.w * 7 - career.record.l * 4;
    const fameBonus = Math.round((career.rep + career.hype) * 0.42);
    const moneyBonus = Math.min(42, Math.floor(career.money / 45000));
    const longevity = Math.max(0, career.age - 34) * 4;
    const score = Math.max(0, Math.round(recordBonus + finishBonus + beltBonus + tierBonus + fameBonus + moneyBonus + longevity));
    const rank = pantheonRankForScore(score);
	    return { score, rank };
	  }

	  function pantheonRankForScore(score = 0) {
	    if (score >= 260) return "Legende du MMA mondial";
	    if (score >= 220) return "Hall of Famer";
	    if (score >= 175) return "Champion reconnu";
	    if (score >= 125) return "Main eventer";
	    if (score >= 80) return "Veteran respecte";
	    return "Combattant local";
	  }

	  function pantheonNickname(entity = {}) {
	    const score = Number(entity.score) || 0;
	    const wins = Number(entity.wins ?? entity.record_w ?? entity.record?.w) || 0;
	    const losses = Number(entity.losses ?? entity.record_l ?? entity.record?.l) || 0;
	    const ko = Number(entity.ko ?? entity.finishes_ko ?? entity.record?.ko) || 0;
	    const sub = Number(entity.sub ?? entity.finishes_sub ?? entity.record?.sub) || 0;
	    const finishes = Number(entity.finishes) || ko + sub;
	    const titlesCount = Number(entity.titlesCount ?? entity.titles_count) || (Array.isArray(entity.titles) ? entity.titles.length : 0);
	    const orgTier = Number(entity.orgTier ?? entity.org_tier ?? entity.tier) || 0;
	    const hype = Number(entity.hype) || 0;
	    const money = Number(entity.money) || 0;
	    const style = String(entity.style || entity.styleLabel || "").toLowerCase();
	    if (orgTier >= 5 && titlesCount > 0 && score >= 240) return "Le Roi du pay-per-view";
	    if (titlesCount >= 3) return "Le Collectionneur de ceintures";
	    if (losses === 0 && wins >= 8) return "L'Invaincu";
	    if (finishes >= 8) return "Le Finisseur";
	    if (hype >= 160) return "Le Micro ouvert";
	    if (money >= 750000) return "Le Box-office";
	    if (style.includes("lutte") || style.includes("sambo") || style.includes("grappl")) return "Le Marteau du sol";
	    if (style.includes("kick") || style.includes("box") || style.includes("strik")) return "Le Casseur de distance";
	    if (score >= 175) return "Le Nom de l'affiche";
	    if (score >= 125) return "Le Main event";
	    return "L'Invite du Pantheon";
	  }

	  function pantheonEligible(entity = {}) {
	    const org = String(entity.org || entity.orgLabel || entity.organization || "").toLowerCase();
	    const orgTier = Number(entity.orgTier ?? entity.org_tier ?? entity.tier) || 0;
	    const titlesCount = Number(entity.titlesCount ?? entity.titles_count) || (Array.isArray(entity.titles) ? entity.titles.length : 0);
	    const score = Number(entity.score) || 0;
	    return orgTier >= 3 || ["ksw", "pfl", "ufc"].some(label => org.includes(label)) || titlesCount > 0 || score >= 125;
	  }

	  function careerHallEntry(career, options = {}) {
	    const scored = scoreCareer(career);
	    const retired = Boolean(options.retired || !career.active);
	    return {
	      id: `career-${career.seed}`,
	      sourceId: career.seed,
	      name: career.name,
	      nickname: pantheonNickname({
	        ...career,
	        score: scored.score,
	        wins: career.record.w,
	        losses: career.record.l,
	        ko: career.record.ko,
	        sub: career.record.sub,
	        titlesCount: career.titles.length,
	        orgTier: career.tier,
	        org: orgForTier(career.tier).label,
	        style: career.style?.label,
	      }),
	      score: scored.score,
	      rank: scored.rank,
	      record: `${career.record.w}-${career.record.l}`,
	      finishes: career.record.ko + career.record.sub,
	      titles: career.titles.map(t => t.label),
	      titlesCount: career.titles.length,
	      money: career.money,
	      age: career.age,
	      style: career.style?.label || "",
	      country: career.country?.label || "",
	      org: orgForTier(career.tier).label,
	      orgTier: career.tier,
	      overall: overall(career),
	      active: !retired,
	      retired,
	      date: options.date || new Date().toISOString(),
	    };
	  }

	  function upsertLocalPantheon(career, options = {}) {
	    if (!career || (!options.force && !pantheonEligible({ ...career, orgTier: career.tier, titlesCount: career.titles?.length || 0 }))) return false;
	    const entry = careerHallEntry(career, options);
	    const hall = Array.isArray(ui.meta.hall) ? ui.meta.hall : [];
	    const existingIndex = hall.findIndex(item => item.sourceId === entry.sourceId || item.id === entry.id);
	    if (existingIndex >= 0) {
	      hall[existingIndex] = {
	        ...hall[existingIndex],
	        ...entry,
	        date: hall[existingIndex].date || entry.date,
	      };
	    } else {
	      hall.push(entry);
	    }
	    ui.meta.hall = hall
	      .slice()
	      .sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0))
	      .slice(0, 24);
	    if (options.save) saveMeta();
	    return true;
	  }

	  function normalizeLocalPantheonEntry(item = {}) {
	    const score = Number(item.score) || 0;
	    const titles = Array.isArray(item.titles) ? item.titles : [];
	    return {
	      ...item,
	      score,
	      rank: item.rank || pantheonRankForScore(score),
	      nickname: item.nickname || pantheonNickname({
	        ...item,
	        score,
	        titlesCount: item.titlesCount ?? titles.length,
	      }),
	      record: item.record || "0-0",
	      finishes: Number(item.finishes) || 0,
	      titles,
	      titlesCount: Number(item.titlesCount) || titles.length,
	      org: item.org || "Local",
	      active: Boolean(item.active),
	      retired: item.retired !== false && !item.active,
	    };
	  }

	  function sharedPantheonEntries() {
	    return (ui.online.leaderboard || [])
	      .filter(row => pantheonEligible({
	        org: row.org,
	        orgTier: row.org_tier,
	        titlesCount: row.titles_count,
	        score: row.score,
	      }))
	      .map(row => {
	        const score = Number(row.score) || 0;
	        const finishes = (Number(row.finishes_ko) || 0) + (Number(row.finishes_sub) || 0);
	        return {
	          id: row.fighter_id,
	          name: row.fighter_name || "Combattant inconnu",
	          nickname: pantheonNickname({
	            ...row,
	            score,
	            finishes,
	            titlesCount: row.titles_count,
	            orgTier: row.org_tier,
	            wins: row.record_w,
	            losses: row.record_l,
	          }),
	          score,
	          rank: row.rank_label || pantheonRankForScore(score),
	          record: `${row.record_w || 0}-${row.record_l || 0}`,
	          finishes,
	          titlesCount: Number(row.titles_count) || 0,
	          money: Number(row.money) || 0,
	          style: row.style || "",
	          country: row.country || "",
	          org: row.org || "Organisation",
	          orgTier: Number(row.org_tier) || 0,
	          manager: row.manager_name || "Manager inconnu",
	          active: !row.retired,
	          retired: Boolean(row.retired),
	        };
	      })
	      .sort((a, b) => b.score - a.score)
	      .slice(0, 24);
	  }

	  function badgeById(id) {
	    return BADGES.find(badge => badge.id === id);
	  }

			  function careerEndReason(career, cause = "voluntary") {
			    if (cause === "age" || career.age >= 42) return "Carriere terminee: le temps gagne la derniere reprise";
			    if (cause === "medical" || career.flags?.medicalRetirement || career.stats?.durability <= 8) return "Carriere terminee: les blessures ferment les portes du circuit pro";
			    return "Retraite choisie";
			  }

		  function finishCareer(cause = "voluntary") {
		    const career = ui.career;
		    career.active = false;
		    const scored = scoreCareer(career);
	    const badgeSync = syncBadges(career, { final: true, notify: false, awardTokens: false });
	    const unlockedNow = badgeSync.unlockedNow;
	    const tokenGain = Math.max(25, Math.round(scored.score / 3)) + unlockedNow.length * 35;
    ui.meta.tokens += tokenGain;
    ui.meta.record = Math.max(ui.meta.record || 0, scored.score);
    ui.meta.totalCareers += 1;
    upsertLocalPantheon(career, { force: true, retired: true });
	    career.final = { ...scored, tokenGain, unlockedNow: unlockedNow.map(b => b.id), endReason: careerEndReason(career, cause) };
    ui.finalCareer = career;
    ui.career = null;
    ui.view = "final";
    saveMeta();
    clearCareer();
    render();
  }

  function fighterHeader(career) {
	    return `
	      <section class="fighter-strip" aria-label="Fiche combattant">
	        <div>
	          <h2>${esc(career.name)}</h2>
	          <p>${career.age} ans | ${career.weight.label} | ${ORGS[career.tier].label} | rang #${career.rank}</p>
	        </div>
	        <div class="strip-stat"><span>${iconOnly("gauge", "O")} OVR</span><strong>${overall(career)}</strong></div>
	        <div class="strip-stat"><span>${iconOnly("list-checks", "R")} Record</span><strong>${career.record.w}-${career.record.l}</strong></div>
	        <div class="strip-stat"><span>${iconOnly("heart-pulse", "F")} Forme</span><strong>${career.condition ?? 70}</strong></div>
	        <div class="strip-stat"><span>${iconOnly("flame", "H")} Hype</span><strong>${career.hype}</strong></div>
	        <div class="strip-stat"><span>${iconOnly("circle-dollar-sign", "$")} Gains</span><strong>${formatMoney(career.money)}</strong></div>
	      </section>
	    `;
	  }

	  function statBoard(career) {
	    const cap = statCapForCareer(career);
	    return `
	      <div class="stat-board" aria-label="Statistiques">
	        ${Object.entries(STAT_LABELS).map(([key, label]) => `
	          <div class="stat-pill">
	            <span>${iconOnly(statIcon(key), "#")} ${esc(label)}</span>
	            <strong>${career.stats[key]}</strong>
	            <div class="stat-bar"><i style="width: ${clamp(((career.stats[key] || 0) / cap) * 100, 0, 100)}%"></i></div>
	            <small>${esc(STAT_HELP[key])}${cap > 99 ? ` Plafond Legende: ${cap}.` : ""}</small>
          </div>
        `).join("")}
      </div>
	    `;
	  }

	  function statsNudgeActive() {
	    return Boolean(ui.career?.active && ui.career.flags?.statsNudge);
	  }

	  function renderStatsNudge() {
	    if (!statsNudgeActive()) return "";
	    return `
	      <div class="stats-nudge" role="status">
	        <span>${iconOnly("sparkles", "S")}</span>
	        <div>
	          <strong>Dossier complet disponible</strong>
	          <small>Toutes les stats cachees ou semi-cachees sont regroupees dans l'onglet Stats.</small>
	        </div>
	        <button class="btn btn-primary" data-action="show-stats">${iconText("activity", "Voir stats", "S")}</button>
	      </div>
	    `;
	  }

	  function renderTopbar() {
	    const statsNudge = statsNudgeActive();
	    return `
	      <header class="topbar ${ui.mobileMenuOpen ? "menu-open" : ""}">
        <button class="brand" data-action="menu" aria-label="Retour a l'accueil">
          <div class="brand-mark" aria-hidden="true">FL</div>
          <div>
            <h1 class="brand-title">Fight Legacy</h1>
            <p class="brand-subtitle">Prototype carriere MMA</p>
          </div>
        </button>
        <button class="mobile-menu-toggle" data-action="toggle-mobile-menu" aria-expanded="${ui.mobileMenuOpen ? "true" : "false"}" aria-label="Menu">
          ${iconOnly(ui.mobileMenuOpen ? "x" : "menu", "M")}
        </button>
		        <nav class="top-actions ${ui.mobileMenuOpen ? "is-open" : ""}" aria-label="Navigation">
		          <button class="btn btn-ghost" data-action="menu">${iconText("home", "Accueil", "H")}</button>
			          ${ui.career ? `<button class="btn btn-ghost" data-action="show-news">${iconText("newspaper", "Actu", "N")}</button>` : ""}
			          <button class="btn btn-ghost" data-action="show-online">${iconText("users", "Joueurs", "J")}</button>
			          <button class="btn btn-ghost" data-action="show-account">${iconText(ui.online?.session ? "user-round-cog" : "log-in", ui.online?.session ? "Compte" : "Se connecter", "C")}</button>
			          <button class="btn btn-ghost ${statsNudge ? "stats-nav-nudge" : ""}" data-action="show-stats">${iconText("activity", "Stats", "S")}</button>
		          <button class="btn btn-ghost" data-action="show-badges">${iconText("award", "Badges", "B")}</button>
		          <button class="btn btn-ghost" data-action="show-hall">${iconText("trophy", "Pantheon", "P")}</button>
	        </nav>
      </header>
    `;
  }

		  function renderShell(content) {
		    app.innerHTML = `<div class="app-shell">${renderTopbar()}${renderStatsNudge()}${content}</div>`;
		    hydrateIcons();
		  }

  function renderMenu() {
    const hasCareer = ui.career && ui.career.active;
    const hasCreatorDraft = !hasCareer && Object.keys(ui.creator || {}).length > 0;
    const badgeCount = Object.keys(ui.meta.badges || {}).length;
    renderShell(`
      <section class="grid-main">
        <div class="hero-play">
          <div class="hero-content">
            <div class="headline">
              <p class="eyebrow">Une vie de combattant en quelques minutes</p>
              <h2>De l'arriere-salle a la ceinture mondiale.</h2>
              <p>Creer un combattant, choisir le bon club, accepter ou refuser les combats dangereux, puis voir si votre nom finit au Hall of Fame.</p>
	            </div>
	            <div class="menu-actions">
	              <button class="btn btn-primary" data-action="new-career">${iconText("plus-circle", "Nouvelle carriere", "+")}</button>
	              ${hasCreatorDraft ? `<button class="btn btn-dark" data-action="continue-creator">${iconText("rotate-ccw", "Reprendre la creation", "R")}</button>` : ""}
	              ${hasCareer ? `<button class="btn btn-dark" data-action="continue-career">${iconText("play", "Continuer la carriere", ">")}</button>` : ""}
	            </div>
            <figure class="fight-stage home-art">
              <img src="${assetUrl("home")}" alt="Deux combattants de MMA dans la cage" decoding="async" fetchpriority="high" loading="eager">
            </figure>
          </div>
        </div>
	        <aside class="side-stack">
	          ${hasCareer ? renderObjectivesPanel(ui.career) : ""}
	          ${hasCareer ? renderContractPanel(ui.career) : ""}
	          ${hasCareer ? renderMedicalPanel(ui.career) : ""}
	          ${hasCareer ? `
	            <button class="panel-action" data-action="show-stats">
	              <strong>${iconText("activity", "Dossier complet", "S")}</strong>
	              <span>Reputation, hype, credit, scandale et dette medicale au meme endroit.</span>
	              <span class="metric">Stats</span>
	            </button>
	          ` : ""}
	          ${hasCareer ? renderNewsPanel(ui.career, 3) : ""}
	          <button class="panel-action" data-action="daily">
	            <strong>${iconText("calendar-days", "Defi du soir", "D")}</strong>
	            <span>Meme combattant, meme seed. Parfait pour se comparer.</span>
	            <span class="metric">Seed ${dailySeed().toString().slice(0, 5)}</span>
	          </button>
	          <button class="panel-action" data-action="show-online">
	            <strong>${iconText("users", "Classement joueurs", "J")}</strong>
	            <span>Manager, combattant, carriere en cours et tableau commun entre testeurs.</span>
	            <span class="metric">${ui.online?.session ? "Connecte" : "Online"}</span>
	          </button>
	          <button class="panel-action" data-action="show-badges">
	            <strong>${iconText("award", "Badges", "B")}</strong>
	            <span>Objectifs permanents pour donner une raison de relancer.</span>
	            <span class="metric">${badgeCount}/${BADGES.length}</span>
	          </button>
	          <button class="panel-action" data-action="show-shop">
	            <strong>${iconText("shopping-bag", "Boutique", "$")}</strong>
	            <span>Avantages legers equipes en carriere normale uniquement.</span>
	            <span class="metric">${ui.meta.tokens} jetons</span>
	          </button>
	          <button class="panel-action" data-action="show-hall">
	            <strong>${iconText("trophy", "Pantheon", "P")}</strong>
	            <span>Les meilleures legendes terminees sur cet appareil.</span>
	            <span class="metric">${ui.meta.record || 0} pts</span>
          </button>
        </aside>
      </section>
    `);
  }

  function renderCreator() {
    const step = CREATOR_STEPS[ui.creatorStep];
    const stepIndex = ui.creatorStep + 1;
    const dots = CREATOR_STEPS.map((_, index) => `<span class="step-dot ${index <= ui.creatorStep ? "active" : ""}"></span>`).join("");
    const backButton = stepIndex > 1
      ? `<button class="btn creator-back-btn" data-action="creator-back">${iconText("arrow-left", "Retour", "<")}</button>`
      : "";
    const screenHead = (title, lead) => `
      <section class="game-screen">
        <div class="screen-head">
          <div>
            <p class="eyebrow">Creation | ${stepIndex}/${CREATOR_STEPS.length}</p>
            <h2 class="screen-title">${title}</h2>
            <p class="screen-lead">${lead}</p>
          </div>
          <div class="creator-head-side">
            <div class="progress-steps" aria-label="Progression">${dots}</div>
            ${backButton}
          </div>
        </div>
    `;
    let body = "";
    if (step === "country") {
      body = `${screenHead("Nationalite", "Le public qui chantera votre nom, ou qui vous fera payer chaque defaite.")}
        <div class="choice-grid three">
          ${COUNTRIES.map(item => choiceButton("choose-creator", item.id, item.label, item.summary, statLine(item.stats), "country", item.tag)).join("")}
        </div>
      </section>`;
    } else if (step === "weight") {
      body = `${screenHead("Categorie", "Chaque division change la sensation: vitesse, puissance, marge d'erreur.")}
        <div class="choice-grid three">
          ${WEIGHTS.map(item => choiceButton("choose-creator", item.id, item.label, item.summary, statLine(item.stats), "weight")).join("")}
        </div>
      </section>`;
    } else if (step === "style") {
      const country = getById(COUNTRIES, ui.creator.country || "fr");
      body = `${screenHead("Base martiale", "Votre style de depart cree les forces, les failles et les plans de combat naturels.")}
        <div class="choice-grid three">
          ${STYLES.map(item => {
            const affinity = country?.preferredStyles?.includes(item.id) ? "Affinite pays | " : "";
            return choiceButton("choose-creator", item.id, item.label, item.summary, `${affinity}${statLine(item.stats)}`, "style", item.tag);
          }).join("")}
        </div>
      </section>`;
    } else if (step === "origin") {
      body = `${screenHead("Origine", "Le parcours avant les projecteurs: bagage mental, potentiel cache, reputation initiale.")}
        <div class="choice-grid">
          ${ORIGINS.map(item => choiceButton("choose-creator", item.id, item.label, item.summary, statLine(item.stats), "origin")).join("")}
        </div>
      </section>`;
    } else if (step === "lifestyle") {
      body = `${screenHead("Mode de vie", "La discipline gagne des rounds invisibles. La hype ouvre d'autres portes.")}
        <div class="choice-grid three">
          ${LIFESTYLES.map(item => choiceButton("choose-creator", item.id, item.label, item.summary, statLine(item.stats), "lifestyle")).join("")}
        </div>
      </section>`;
    } else if (step === "entourage") {
      body = `${screenHead("Entourage", "Qui vous protege, vous vend, ou vous pousse trop loin ?")}
        <div class="choice-grid">
          ${ENTOURAGES.map(item => choiceButton("choose-creator", item.id, item.label, item.summary, statLine(item.stats), "entourage")).join("")}
        </div>
      </section>`;
    } else {
      const selectedCountry = getById(COUNTRIES, ui.creator.country || "fr");
      const proposed = ui.creator.name || randomName(selectedCountry, hashSeed(JSON.stringify(ui.creator)));
      ui.creator.name = proposed;
      body = `${screenHead("Identite", "Derniere etape avant le premier club. Vous pouvez renommer le combattant.")}
	        <div class="name-row">
	          <input id="fighterName" aria-label="Nom du combattant" value="${esc(proposed)}" maxlength="34">
	          <button class="btn" data-action="random-name">${iconText("shuffle", "Nom aleatoire", "?")}</button>
	        </div>
        <div class="summary-grid">
          ${["country", "weight", "style", "origin"].map(key => {
            const source = key === "country" ? COUNTRIES : key === "weight" ? WEIGHTS : key === "style" ? STYLES : ORIGINS;
            const selected = getById(source, ui.creator[key]);
	            return `<div class="summary-item"><span>${iconOnly(choiceIcon(key), "#")} ${esc(key)}</span><strong>${esc(selected?.label || "-")}</strong></div>`;
          }).join("")}
        </div>
	        <div class="menu-actions">
	          <button class="btn btn-primary" data-action="begin-career">${iconText("door-open", "Entrer au club", ">")}</button>
	        </div>
      </section>`;
    }
    renderShell(body);
  }

	  function choiceButton(action, id, title, summary, small, type, tag = "") {
	    const selected = ui.creator[type] === id ? "selected" : "";
	    const meta = tag && small ? `${tag} | ${small}` : tag || small || "";
    const icon = type === "country"
      ? `<span class="choice-flag" aria-hidden="true">${countryFlag(id)}</span>`
      : iconOnly(choiceIcon(type, id, tag), "*");
	    return `
	      <button class="choice-btn choice-card ${selected}" data-action="${action}" data-type="${type}" data-id="${id}">
	        <span class="choice-head">
	          <span class="choice-icon ${type === "country" ? "flag-icon" : ""}">${icon}</span>
	          <strong>${esc(title)}</strong>
	        </span>
	        <span class="choice-summary">${esc(summary)}</span>
	        <small>${esc(meta)}</small>
	      </button>
	    `;
	  }

  function statLine(stats = {}) {
    return Object.entries(stats)
      .map(([key, value]) => `${STAT_LABELS[key] || key} ${value > 0 ? "+" : ""}${value}`)
      .join(" / ");
  }

	  function effectLine(effects = {}) {
		    const direct = ["money", "rep", "hype", "morale", "condition", "injuryRisk", "medicalCare", "restWeeks", "scandal", "dopingRisk", "doping", "suspension", "rivalry", "locked", "doublePath", "credit"]
		      .filter(key => effects[key])
		      .map(key => effectText(key, effects[key]));
    const stats = Object.entries(effects.stats || {})
      .map(([key, value]) => effectText(key, value));
    return [...direct, ...stats].join(" / ");
  }

		  function effectChips(effects = {}) {
		    const direct = ["money", "rep", "hype", "morale", "condition", "injuryRisk", "medicalCare", "restWeeks", "scandal", "dopingRisk", "doping", "suspension", "rivalry", "locked", "doublePath", "credit"]
		      .filter(key => effects[key])
	      .map(key => ({ key, value: effects[key] }));
    const stats = Object.entries(effects.stats || {})
      .map(([key, value]) => ({ key, value }));
	    return [...direct, ...stats]
	      .map(effect => `
	        <span class="effect-chip ${effectIsGood(effect.key, effect.value) ? "good" : "bad"}">
	          ${iconOnly(effectIcon(effect.key, effect.value), effectIsGood(effect.key, effect.value) ? "+" : "-")}
	          <span>${esc(effectText(effect.key, effect.value))}</span>
	        </span>
		      `).join("");
		  }

	  function attrsToString(attrs = {}) {
	    return Object.entries(attrs)
	      .map(([key, value]) => `data-${key}="${esc(value)}"`)
	      .join(" ");
	  }

	  function actionAttrs(action, attrs = {}) {
	    return `data-action="${esc(action)}"${Object.keys(attrs).length ? ` ${attrsToString(attrs)}` : ""}`;
	  }

	  function mobileSwipeDeck(choices = [], context = {}) {
	    if (choices.length !== 2) return "";
	    const left = choices[0];
		    const right = choices[1];
		    const title = context.title || "Decision";
		    const kicker = context.kicker || "Choix rapide";
		    const summary = context.summary || "Glisse la carte ou utilise les boutons.";
		    const leftIntent = left.intent || context.leftIntent || "Gauche";
		    const rightIntent = right.intent || context.rightIntent || "Droite";
		    return `
		      <div class="swipe-choice-deck" data-swipe-deck>
		        <div class="swipe-choice-card" data-swipe-card data-left-label="${esc(left.label)}" data-right-label="${esc(right.label)}">
	          <div class="swipe-card-top">
	            <span>${iconOnly("move-horizontal", "S")} ${esc(kicker)}</span>
	            <strong>${esc(title)}</strong>
	            <p>${esc(summary)}</p>
	          </div>
		          <div class="swipe-card-options">
		            <div>
		              <em>${iconOnly("arrow-left", "<")} ${esc(leftIntent)}</em>
		              <b>${esc(left.label)}</b>
		              <small>${esc(left.summary || left.meta || "")}</small>
		            </div>
		            <div>
		              <em>${esc(rightIntent)} ${iconOnly("arrow-right", ">")}</em>
		              <b>${esc(right.label)}</b>
		              <small>${esc(right.summary || right.meta || "")}</small>
	            </div>
	          </div>
	        </div>
	        <div class="swipe-choice-actions">
	          <button class="btn btn-dark" data-swipe-pick="left" ${actionAttrs(left.action, left.attrs)}>${iconText("arrow-left", left.label, "<")}</button>
	          <button class="btn btn-primary" data-swipe-pick="right" ${actionAttrs(right.action, right.attrs)}>${iconText("arrow-right", right.label, ">")}</button>
	        </div>
	      </div>
	    `;
	  }

	  function seasonPanel(career) {
    const season = career.season;
    if (!season) return "";
    const target = season.fightsTarget || seasonFightTarget(career);
    const done = Math.min(season.fightsDone || 0, target);
    const remaining = Math.max(0, target - done);
    const nextFight = Math.min(done + 1, target);
    const signedFight = career.pendingFight;
    const seasonStatus = signedFight
      ? `Signe ${nextFight}/${target}`
      : remaining
        ? `Prochain ${nextFight}/${target}`
        : `Termine ${done}/${target}`;
		    return `
		      <div class="season-panel">
		        <div>
		          <span>${iconOnly("calendar-days", "S")} Saison ${season.year}</span>
		          <strong>${esc(seasonStatus)}</strong>
		        </div>
	        <div>
	          <span>${iconOnly("heart-pulse", "F")} Forme</span>
	          <strong>${career.condition ?? 70}/100</strong>
	        </div>
	        <div>
	          <span>${iconOnly("smile", "M")} Moral</span>
	          <strong>${career.morale}/100</strong>
	        </div>
	        <div>
	          <span>${iconOnly(signedFight ? "swords" : "building-2", "O")} ${signedFight ? "Adversaire" : "Organisation"}</span>
	          <strong>${esc(signedFight ? signedFight.opponent.name : ORGS[career.tier].label)}</strong>
	        </div>
      </div>
    `;
  }

  function renderSeasonFocusPanel(career) {
    const season = career.season;
    if (!season) return "";
    const plan = seasonPlanById(season.strategy || "standard");
    const remaining = Math.max(0, season.fightsTarget - season.fightsDone);
    const status = career.pendingFight
      ? `Prochain: ${career.pendingFight.opponent.name}`
	        : remaining
	          ? `${formatCombats(remaining)} a signer`
	          : "Bilan pret";
    return `
      <div class="focus-panel compact">
        <div>
          <span>${iconOnly("calendar-check", "S")} Plan saison</span>
          <h3>${esc(season.planLabel || plan.label)}</h3>
          <p>${esc(status)} | bourses saison x${seasonPurseMultiplier(career).toFixed(2)}</p>
        </div>
		        <strong>${formatCombats(season.fightsDone)} fait${season.fightsDone > 1 ? "s" : ""}</strong>
	      </div>
	    `;
	  }

  function groupRating(stats, keys) {
    return Math.round(keys.reduce((sum, key) => sum + (stats[key] || 0), 0) / keys.length);
  }

  function campPrepPanel(career) {
    const fight = career.pendingFight;
    if (!fight) return "";
    const groups = [
      { label: "Debout", value: groupRating(career.stats, ["striking", "power", "chin"]), opp: groupRating(fight.opponent.stats, ["striking", "power", "chin"]) },
      { label: "Cage / sol", value: groupRating(career.stats, ["wrestling", "grappling", "iq"]), opp: groupRating(fight.opponent.stats, ["wrestling", "grappling", "iq"]) },
      { label: "Moteur", value: groupRating(career.stats, ["cardio", "discipline", "durability"]), opp: groupRating(fight.opponent.stats, ["cardio", "discipline", "durability"]) },
      { label: "Business", value: groupRating(career.stats, ["charisma", "iq", "discipline"]), opp: fight.opponent.overall },
    ];
    const meters = [
      { label: "Forme", value: career.condition ?? 70 },
      { label: "Moral", value: career.morale },
      { label: "Sante", value: career.stats.durability },
    ];
    return `
	      <div class="camp-prep">
	        <div class="camp-prep-main">
	          <span>Combat signe</span>
	          <strong>${esc(career.name)} vs ${esc(fight.opponent.name)}</strong>
	          <p>${esc(fight.opponent.country.label)} | ${esc(fight.opponent.style.label)} | record ${esc(fight.opponent.record || "?")} | ${esc(fight.tag)} | ${formatMoney(fight.money)}</p>
	        </div>
        <div class="camp-meters" aria-label="Etat du camp">
          ${meters.map(meter => `
            <div class="camp-meter">
              <span>${esc(meter.label)}</span>
              <div class="meter-track"><i style="width: ${clamp(meter.value, 0, 100)}%"></i></div>
              <strong>${meter.value}/100</strong>
            </div>
          `).join("")}
        </div>
        <div class="camp-matchup" aria-label="Comparaison tactique">
          ${groups.map(group => {
            const edge = group.value - group.opp;
            return `
              <div class="matchup-row">
                <span>${esc(group.label)}</span>
                <strong>${group.value}</strong>
                <em class="${edge >= 0 ? "good" : "bad"}">${edge >= 0 ? "+" : ""}${edge}</em>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderObjectivesPanel(career) {
    const objectives = visibleObjectives(career);
    if (!objectives.length) return `<div class="notice">Tous les objectifs majeurs visibles sont coches. La legende joue maintenant pour les ceintures et le score final.</div>`;
    return `
	      <div class="objective-panel">
	        <div class="panel-title">
	          <span>${iconOnly("list-checks", "O")} Objectifs</span>
	          <strong>Prochaine marche</strong>
	        </div>
		        ${objectives.map(item => `
		          <div class="objective-row">
		            <span>${iconOnly(item.done ? "circle-check" : "circle-dot", item.done ? "x" : "-")} ${esc(item.label)}</span>
		            <div class="objective-track"><i style="width: ${item.percent}%"></i></div>
		            <strong>${esc(objectiveValueLabel(item))}</strong>
		          </div>
	        `).join("")}
	      </div>
	    `;
  }

  function renderNewsPanel(career, limit = 4) {
    const items = visibleNewsItems(career).slice(0, limit);
    if (!items.length) return "";
    return `
	      <div class="news-panel">
	        <div class="panel-title">
	          <span>${iconOnly("newspaper", "N")} Actu MMA</span>
	          <strong>Ce qui se raconte</strong>
	        </div>
	        ${items.map(item => `
	          <div class="news-row ${esc(item.tone || "neutral")}">
	            <strong>${iconOnly(toneIcon(item.tone), "!")} ${esc(item.title)}</strong>
	            <span>${esc(item.text)}</span>
	          </div>
	        `).join("")}
      </div>
    `;
  }

  const SEASON_MONTHS = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"];

  function seasonFightMonth(index, target) {
    const count = Math.max(1, Number(target) || 1);
    if (count === 1) return 6;
    return clamp(Math.round(2 + index * (10 / (count - 1))), 1, 12);
  }

  function calendarCurrentMonth(career, season) {
    const target = season?.fightsTarget || seasonFightTarget(career);
    const done = Math.max(0, season?.fightsDone || 0);
    if (done >= target) return 12;
    return clamp(seasonFightMonth(done, target) - 1, 1, 12);
  }

  function addCalendarItem(months, month, item) {
    const index = clamp((Number(month) || 1) - 1, 0, 11);
    months[index].items.push(item);
  }

  function renderSeasonCalendarPanel(career) {
    const season = career.season;
    if (!season) return "";
    const months = SEASON_MONTHS.map(label => ({ label, items: [] }));
    const target = Math.max(1, season.fightsTarget || seasonFightTarget(career));
    const fightLog = Array.isArray(season.fightLog) ? season.fightLog : [];
    const trainingLog = Array.isArray(season.trainingLog) ? season.trainingLog : [];
    const lifeLog = Array.isArray(season.lifeLog) ? season.lifeLog : [];
    const medical = ensureMedical(career);
    const currentMonth = calendarCurrentMonth(career, season);

    addCalendarItem(months, 1, {
      type: "setup",
      title: "Saison",
      text: season.planLabel || seasonPlanById(season.strategy || "standard").label || "Construction de saison",
    });

    Array.from({ length: target }, (_, index) => {
      const number = index + 1;
      const fightMonth = seasonFightMonth(index, target);
      const campMonth = clamp(fightMonth - 1, 1, 12);
      const fight = fightLog.find(row => row.number === number);
      const isNext = number === (season.fightsDone || 0) + 1;
      const pendingOpponent = isNext && career.pendingFight?.opponent?.name ? career.pendingFight.opponent.name : "";
      addCalendarItem(months, campMonth, {
        type: fight ? "camp-done" : isNext && career.pendingFight ? "camp-current" : "camp",
        title: `Camp ${number}`,
        text: fight ? `Preparation terminee contre ${fight.opponent}.` : pendingOpponent ? `Preparation contre ${pendingOpponent}.` : "Camp a venir apres signature.",
      });
      addCalendarItem(months, fightMonth, {
        type: fight ? (fight.result === "Victoire" ? "fight-win" : "fight-loss") : isNext && career.pendingFight ? "fight-current" : "fight",
        title: `Combat ${number}`,
        text: fight
          ? `${fight.result} contre ${fight.opponent} (${fight.method}, R${fight.round}).`
          : pendingOpponent
            ? `Affiche signee contre ${pendingOpponent}.`
            : "Adversaire a signer.",
      });
    });

    trainingLog.forEach((row, index) => {
      const month = clamp(1 + Math.floor((index / Math.max(1, trainingLog.length)) * 10), 1, 11);
      addCalendarItem(months, month, {
        type: "training",
        title: `Semaine ${row.week || index + 1}`,
        text: row.label || "Entrainement",
      });
    });

    lifeLog.forEach((row, index) => {
      const month = clamp(currentMonth + index, 1, 12);
      addCalendarItem(months, month, {
        type: "life",
        title: row.title || "Vie de combattant",
        text: row.choice ? `${row.choice}.` : (row.result || "Decision hors cage."),
      });
    });

    if (medical.restWeeks > 0 || medical.activeInjury) {
      addCalendarItem(months, currentMonth, {
        type: "medical",
        title: "Repos medical",
        text: `${medical.activeInjury?.label || "Protocole"} | ${formatRestWeeks(medical.restWeeks || 0)}.`,
      });
    }

    (medical.rehabLog || [])
      .filter(row => row.year === season.year)
      .slice(0, 2)
      .forEach(row => {
        addCalendarItem(months, currentMonth, {
          type: "medical-done",
          title: "Retour medical",
          text: `${row.protocol || "Protocole"} | ${formatRestWeeks(row.weeks || 0)}.`,
        });
      });

    return `
      <div class="season-calendar-panel">
        <div class="panel-title">
          <span>${iconOnly("calendar-days", "C")} Calendrier ${season.year || career.year}</span>
          <strong>${formatCombats(target)}</strong>
        </div>
        <p class="online-help">Une saison dure un an. Les camps, combats et repos medicaux sont regroupes ici pour lire la trajectoire de la saison.</p>
        <div class="season-calendar-grid">
          ${months.map((month, index) => `
            <div class="season-calendar-month ${index + 1 === currentMonth ? "is-current" : ""}">
              <strong>${esc(month.label)}</strong>
              ${month.items.length ? month.items.map(item => `
                <span class="calendar-chip ${esc(item.type)}">
                  <b>${esc(item.title)}</b>
                  <em>${esc(item.text)}</em>
                </span>
              `).join("") : `<span class="calendar-empty">Respiration</span>`}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderRankingPanel(career) {
    return `
	      <div class="ranking-panel">
	        <div class="panel-title">
	          <span>${iconOnly("building-2", "O")} ${esc(ORGS[career.tier].label)}</span>
	          <strong>${iconOnly("trophy", "#")} Ranking</strong>
	        </div>
	        ${rankingRows(career).map(row => `
	          <div class="ranking-row ${row.you ? "you" : ""}">
            <strong>#${row.rank}</strong>
            <span>${esc(row.name)}</span>
            <em>${esc(row.tag)} | ${esc(row.record)}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderContractPanel(career) {
    const contract = career.contract;
    if (!contract) return "";
    const clauseProgress = contract.contenderWinsRequired
      ? `${Math.min(contract.contenderWins || 0, contract.contenderWinsRequired)}/${contract.contenderWinsRequired} victoires`
      : "";
    return `
	      <div class="contract-panel">
	        <div class="panel-title">
	          <span>${iconOnly("file-pen-line", "C")} Contrat</span>
	          <strong>${esc(contract.org)}</strong>
	        </div>
	        <div class="contract-row">
	          <span>${iconOnly("calendar-check", "N")} Combats restants</span>
	          <strong>${contract.remainingFights ?? contract.fights ?? 0}</strong>
	        </div>
	        <div class="contract-row">
	          <span>${iconOnly("scroll-text", "L")} Clause</span>
	          <strong>${esc(contract.titleClause || "Progression ranking")}</strong>
	        </div>
	        ${clauseProgress ? `
	          <div class="contract-row">
	            <span>${iconOnly(contenderClauseReady(career) ? "circle-check" : "target", "C")} Clause contender</span>
	            <strong>${esc(contenderClauseReady(career) ? "Activee" : clauseProgress)}</strong>
	          </div>
	        ` : ""}
	        <div class="contract-row">
	          <span>${iconOnly("badge-dollar-sign", "$")} Sponsor</span>
	          <strong>${esc(contract.sponsor || "Aucun")}</strong>
	        </div>
	        <div class="contract-row">
	          <span>${iconOnly("badge-dollar-sign", "B")} Bourses</span>
	          <strong>x${(contract.purseBoost || 1).toFixed(2)}</strong>
	        </div>
	        ${renderPromotionPath(career)}
      </div>
    `;
  }

  function renderPromotionPath(career) {
    const status = promotionStatus(career);
    if (!status.targets?.length) {
      const legendTop = isLegendCareer(career);
      return `
        <div class="promotion-path complete">
          <strong>${iconOnly("trophy", "P")} ${legendTop ? "Sommet Legende atteint" : "Sommet UFC atteint"}</strong>
          <span>${legendTop ? "Plus de plafond classique: l'enjeu devient Pantheon, defenses impossibles et adversaires mythiques." : "Plus d'organisation au-dessus. L'enjeu devient defense de ceinture, money fights et legacy."}</span>
        </div>
      `;
    }
    const clauseText = career.contract?.contenderWinsRequired
      ? `${Math.min(career.contract.contenderWins || 0, career.contract.contenderWinsRequired)}/${career.contract.contenderWinsRequired} victoires de clause`
      : "pas de clause active";
    const rows = [
      {
        ok: status.legendStep ? status.ufcDominance : status.cageSuccess,
        label: status.legendStep ? "Domination UFC" : "Resultats cage",
        value: status.legendStep
          ? `${status.ufcWins} victoires UFC, ${status.legendAccess ? "acces sportif valide" : "ceinture ou rang #1 requis"}`
          : status.perfectSeason ? `saison parfaite ${status.wins}/${status.honored}` : status.hasBelt ? "ceinture active" : `serie ${career.streak}, rang #${career.rank}`,
      },
      {
        ok: status.legendStep ? status.legendOvrReady : status.businessSuccess,
        label: status.legendStep ? "OVR 99" : "Hype et business",
        value: status.legendStep
          ? `OVR ${overall(career)}/99`
          : status.perfectSeason ? "bonus saison invaincue" : `hype ${career.hype}/${status.hypeTarget}, charisme ${career.stats.charisma}/${status.charismaTarget}`,
      },
      {
        ok: !status.reliabilityBlock && (!status.financialDrag || status.promotionEligible),
        label: "Fiabilite",
        value: status.reliabilityBlock
	          ? status.activeContractBlock ? "contrat encore actif" : "forfait au dossier"
	          : status.activeContractBlock && status.nationalPerfectOverride
	            ? "reliquat compense par les resultats"
          : status.financialDrag && status.promotionEligible
            ? "signal negatif compense par la saison"
            : status.financialDrag ? "finances ou image a reparer" : "dossier propre",
      },
      {
        ok: status.legendStep ? status.legendEligible : status.visibilityAccess || status.clauseReady,
        label: status.legendStep ? "Statut Legende" : status.ufcStep ? "Porte UFC" : status.internationalStep ? "Porte internationale" : "Acces superieur",
        value: status.legendStep
          ? status.legendEligible ? "offre de legende prete" : `serie ${career.streak}, defenses ${currentTierTitle(career)?.defenses || 0}/2`
          : status.ufcStep
          ? status.hasBelt ? "champion KSW/PFL" : "ceinture KSW/PFL requise"
          : status.internationalStep
            ? status.promotionEligible ? "KSW/PFL sur la table" : "saison forte ou invaincue"
            : status.clauseReady ? "clause activee" : clauseText,
      },
    ];
    return `
      <div class="promotion-path ${status.promotionEligible ? "ready" : ""}">
        <strong>${iconOnly(status.promotionEligible ? "circle-check" : "move-up-right", "P")} ${status.legendStep ? "Statut Legende" : status.internationalStep ? "Signature internationale" : `Montee vers ${esc(status.targetLabel)}`}</strong>
        <span>${status.promotionEligible ? `Offre ${esc(status.targetLabel)} possible au prochain bilan.` : status.legendStep ? "Le statut Legende demande OVR 99, domination UFC, acces sportif elite et dossier propre." : status.ufcStep ? "L'UFC attend un champion KSW/PFL fiable." : "Une grosse saison peut suffire: victoires, image minimale et dossier propre."}</span>
        <div class="promotion-checks">
          ${rows.map(row => `
            <div class="promotion-check ${row.ok ? "ok" : "todo"}">
              <span>${esc(row.label)}</span>
              <strong>${esc(row.value)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderContractOffersBlock(career) {
    if (!career.pendingContracts?.length) return "";
    const nextYear = (career.year || 2026) + 1;
    return `
      <div class="contract-offers-priority">
        <div class="focus-panel">
          <div>
            <span>${iconOnly("file-pen-line", "C")} Contrats sur la table</span>
            <h3>Signer la saison ${nextYear}</h3>
            <p>Choisir une carte signe directement le contrat, encaisse la prime et lance la saison suivante.</p>
          </div>
          <strong>Action requise</strong>
        </div>
        <div class="choice-grid contract-offer-grid mobile-option-stack">
          ${career.pendingContracts.map((offer, index) => `
            <button class="choice-btn contract-offer-card" data-action="choose-contract" data-index="${index}">
	              <span class="contract-offer-head">
	                <span class="choice-icon">${iconOnly(String(offer.id).startsWith("move") ? "circle-dollar-sign" : offer.id === "sponsor" ? "badge-dollar-sign" : "shield-check", "$")}</span>
	                <strong>${esc(offer.label)}</strong>
	              </span>
	              <span class="choice-summary">${esc(offer.summary)}</span>
	              <span class="contract-offer-meta">
	                <span>${iconOnly("calendar-check", "C")} ${offer.fights} combats</span>
	                <span>${iconOnly("badge-dollar-sign", "B")} x${(offer.purseBoost || 1).toFixed(2)}</span>
	                <span>${iconOnly("circle-dollar-sign", "$")} ${formatMoney(offer.money)}</span>
	              </span>
              <small>${esc(offer.tag || "Contrat")} | Sponsor: ${esc(offer.sponsor)}. Clause: ${esc(offer.titleClause)}</small>
            </button>
          `).join("")}
        </div>
        <div class="notice contract-sign-notice">
          ${iconOnly("mouse-pointer-click", "S")} Chaque offre change le cadre de la prochaine saison: organisation, nombre de combats, prime et multiplicateur de bourse.
        </div>
      </div>
    `;
  }

  function renderMedicalPanel(career) {
    const medical = ensureMedical(career);
    const active = medical.activeInjury;
    const last = active || medical.injuries[0];
    const risk = medical.injuryRisk || 0;
    const riskLabel = risk >= 75 ? "Dangereux" : risk >= 35 ? "A surveiller" : "Stable";
    return `
	      <div class="medical-panel">
	        <div class="panel-title">
	          <span>${iconOnly("heart-pulse", "M")} Medical</span>
	          <strong>${esc(riskLabel)}</strong>
	        </div>
	        <div class="medical-row">
	          <span>${iconOnly("activity", "R")} Risque blessure</span>
	          <strong>${risk}/90</strong>
	        </div>
	        <div class="medical-row">
	          <span>${iconOnly("calendar-clock", "P")} Repos restant</span>
	          <strong>${formatRestWeeks(medical.restWeeks || 0)}</strong>
	        </div>
	        <div class="medical-row">
	          <span>${iconOnly("heart", "S")} Sante durable</span>
	          <strong>${career.stats.durability}/99</strong>
	        </div>
		        ${last ? `
		          <div class="injury-note">
		            <span class="injury-tag ${esc(last.severity || "alerte")}">${esc(last.severity || "alerte")}</span>
		            <strong>${esc(last.label)}</strong>
		            <span>${esc(injurySentence(last))}</span>
		            <span class="injury-impact">${esc(medicalImpactText(career, last))}</span>
		          </div>
		        ` : `<div class="injury-note clean"><strong>Aucune blessure declaree</strong><span>La dette medicale vient surtout des camps, des combats et de la vie hors cage.</span></div>`}
		      </div>
		    `;
  }

	  function medicalImpactText(career, injury = null) {
	    const medical = ensureMedical(career);
	    const effects = (injury?.effects || [])
      .filter(effect => ["condition", "durability", "injuryRisk", "restWeeks"].includes(effect.key))
      .map(effect => {
        if (effect.key === "restWeeks") return `repos ${formatRestWeeks(effect.value)}`;
        const label = effect.key === "durability" ? "Sante" : effectLabel(effect.key);
        return `${label} ${effect.value > 0 ? "+" : ""}${effect.value}`;
      });
    if (effects.length) return `Impact: ${effects.join(", ")}.`;
    if (medical.restWeeks > 0) return `Impact: pas de camp ni signature avant ${formatRestWeeks(medical.restWeeks)}.`;
    if ((medical.injuryRisk || 0) >= 35) return `Impact: pression medicale ${medical.injuryRisk}/90, les camps durs deviennent plus dangereux.`;
	    return `Impact: surveillance medicale, risque ${medical.injuryRisk || 0}/90.`;
	  }

	  function medicalAlertCause(career, injury = null) {
	    const medical = ensureMedical(career);
	    const risk = medical.injuryRisk || 0;
	    const health = career.stats?.durability || 78;
	    const form = career.condition ?? 70;
	    if (medical.restWeeks > 0 || injury) {
	      return {
	        label: injury ? "Blessure active" : "Repos medical",
	        detail: injury ? `${injury.label || "Blessure"} | repos ${formatRestWeeks(medical.restWeeks || 0)}` : `Repos ${formatRestWeeks(medical.restWeeks || 0)}`,
	      };
	    }
	    const candidates = [
	      { label: "Risque blessure", detail: `${risk}/90`, score: risk >= 75 ? 4 : risk >= 55 ? 3 : risk >= 35 ? 2 : 0 },
	      { label: "Sante durable", detail: `${health}/99`, score: health <= 32 ? 4 : health <= 42 ? 3 : health <= 52 ? 2 : 0 },
	      { label: "Forme basse", detail: `${form}/100`, score: form <= 38 ? 4 : form <= 48 ? 3 : form <= 58 ? 2 : 0 },
	    ];
	    return candidates.sort((a, b) => b.score - a.score)[0] || { label: "Surveillance", detail: "Aucune stat critique" };
	  }

		  function medicalRiskExplanation(career) {
		    const medical = ensureMedical(career);
	    const risk = medical.injuryRisk || 0;
	    const health = career.stats?.durability || 78;
	    const form = career.condition ?? 70;
	    if (medical.restWeeks > 0) return "Consequence: aucune signature ni camp avant le feu vert medical.";
	    if (form <= 38) return "Consequence: la forme est trop basse; meme avec une dette medicale moderee, combat et sparring deviennent dangereux.";
	    if (risk >= 75 || health <= 32) return "Consequence: le prochain combat peut tourner au pile-ou-face medical; repos ou pause de saison conseille.";
	    if (risk >= 55 || health <= 42 || form <= 48) return "Consequence: fatigue haute, forme basse et sparring dur deviennent dangereux; recuperation conseillee.";
	    if (risk >= 35 || health <= 52 || form <= 58) return "Consequence: marge reduite; les choix fatigants s'accumulent plus vite.";
	    return "Consequence: surveillance simple, pas de danger immediat.";
	  }

	  function renderMedicalAlert(career) {
	    const medical = ensureMedical(career);
	    const active = medical.activeInjury;
	    const risk = medical.injuryRisk || 0;
	    const last = active || (medical.restWeeks > 0 ? medical.injuries[0] : null);
	    const hasIssue = Boolean(active || medical.restWeeks > 0 || risk >= 35);
	    if (!hasIssue) return "";
		    const title = last?.label || (risk >= 75 ? "Risque medical dangereux" : "Risque medical");
		    const severity = last?.severity || (risk >= 75 ? "dangereux" : "alerte");
		    const cause = medicalAlertCause(career, last);
	    const details = [
	      last?.source ? `Source: ${last.source}` : "",
	      medical.restWeeks > 0 ? `Repos: ${formatRestWeeks(medical.restWeeks)}` : "",
      `Risque: ${risk}/90`,
      `Sante: ${career.stats.durability}/99`,
      ].filter(Boolean).join(" | ");
	    return `
	      <div class="medical-alert medical-context-alert ${risk >= 75 ? "critical" : risk >= 35 ? "warning" : ""}">
	        <strong>${iconOnly("triangle-alert", "M")} Alerte medicale | ${esc(cause.label)}</strong>
	        <span><b>${esc(cause.detail)}</b> | ${esc(title)} | ${esc(severity)} | ${esc(details)}</span>
	        <small>Stat declencheuse: ${esc(cause.label)}. ${esc(medicalRiskExplanation(career))} ${esc(medicalImpactText(career, last))}</small>
	      </div>
	    `;
		  }

	  function campRiskCause(fatigue, risk, health, form) {
	    const candidates = [
	      { label: "Fatigue du camp", detail: `${fatigue}/12`, score: fatigue >= 10 ? 4 : fatigue >= 8 ? 3 : fatigue >= 6 ? 2 : 0 },
	      { label: "Risque blessure", detail: `${risk}/90`, score: risk >= 75 ? 4 : risk >= 55 ? 3 : risk >= 35 ? 2 : 0 },
	      { label: "Sante durable", detail: `${health}/99`, score: health <= 32 ? 4 : health <= 42 ? 3 : health <= 52 ? 2 : 0 },
	      { label: "Forme basse", detail: `${form}/100`, score: form <= 38 ? 4 : form <= 48 ? 3 : form <= 58 ? 2 : 0 },
	    ];
	    return candidates.sort((a, b) => b.score - a.score)[0] || { label: "Marge stable", detail: "Pas de stat critique", score: 0 };
	  }

		  function campRiskSnapshot(career, extraLoad = 0) {
		    const medical = ensureMedical(career);
		    const fatigue = clamp(Math.round((career.camp?.fatigue || 0) + (extraLoad || 0)), 0, 12);
	    const risk = medical.injuryRisk || 0;
	    const health = career.stats?.durability || 78;
	    const form = career.condition ?? 70;
	    let level = "stable";
	    if (fatigue >= 10 || risk >= 75 || health <= 32 || form <= 38) level = "danger";
	    else if (fatigue >= 8 || risk >= 55 || health <= 42 || form <= 48) level = "warning";
	    else if (fatigue >= 6 || risk >= 35 || health <= 52 || form <= 58) level = "watch";
	    const title = level === "danger"
	      ? "Voyant rouge"
	      : level === "warning"
	        ? "Voyant orange"
	        : level === "watch"
	          ? "A surveiller"
	          : "Stable";
	    const text = level === "danger"
	      ? "Un gros bloc supplementaire peut declencher blessure de camp ou combat degrade."
		      : level === "warning"
		        ? "Le corps tient encore, mais fatigue et dette medicale commencent a se cumuler."
		        : level === "watch"
		          ? "La marge existe, mais les choix tres charges vont vite la reduire."
		          : "Marge correcte pour travailler.";
		    return { fatigue, risk, health, form, level, title, text, cause: campRiskCause(fatigue, risk, health, form) };
		  }

	  function renderCampRiskWarning(career) {
	    const snapshot = campRiskSnapshot(career);
	    if (snapshot.level === "stable") return "";
		    return `
		      <div class="camp-risk-alert ${esc(snapshot.level)}">
		        <strong>${iconOnly(snapshot.level === "danger" ? "octagon-alert" : "triangle-alert", "R")} ${esc(snapshot.title)} | ${esc(snapshot.cause.label)}</strong>
		        <span class="alert-cause-pill">${esc(snapshot.cause.detail)}</span>
		        <span>Risque blessure ${snapshot.risk}/90 | Forme ${snapshot.form}/100 | Sante ${snapshot.health}/99</span>
		        <small>Cause principale: ${esc(snapshot.cause.label)}. ${esc(snapshot.text)} Option prudente: recuperation, technique legere ou refuser les stages trop lourds.</small>
		      </div>
		    `;
		  }

	  function renderSeasonPauseChoice() {
	    const career = ui.career;
	    if (!career?.season) {
	      renderMenu();
	      return;
	    }
	    const medical = ensureMedical(career);
	    const remaining = Math.max(0, career.season.fightsTarget - career.season.fightsDone);
	    renderShell(`
	      <section class="game-screen season-pause-screen">
	        ${fighterHeader(career)}
	        ${seasonPanel(career)}
	        <div class="medical-stop-card">
	          <span>${iconOnly("heart-pulse", "M")} Staff medical</span>
	          <h2>Mettre la saison en pause ?</h2>
	          <p>Les voyants sont hauts: risque blessure ${medical.injuryRisk}/90, sante ${career.stats.durability}/99. Il reste ${formatCombats(remaining)} au calendrier.</p>
	        </div>
	        <div class="choice-grid binary-choice-grid">
	          <button class="choice-btn" data-action="season-pause-option" data-choice="pause">
	            <span class="choice-icon">${iconOnly("shield-check", "P")}</span>
	            <strong>Mettre en pause</strong>
	            <span class="choice-summary">Annuler le reste de la saison, perdre un peu de hype, recuperer de la marge medicale.</span>
	            <small>Sante +3 | Recuperation +18 | Hype -6</small>
	          </button>
	          <button class="choice-btn" data-action="season-pause-option" data-choice="continue">
	            <span class="choice-icon">${iconOnly("flame", "C")}</span>
	            <strong>Continuer</strong>
	            <span class="choice-summary">Garder le calendrier et assumer le risque: chaque camp charge devient plus dangereux.</span>
	            <small>Hype +2 | Risque blessure +2</small>
	          </button>
	        </div>
	      </section>
	    `);
	  }

	  function renderCareerSaveChoice() {
	    const career = ui.career;
	    if (!career) {
	      renderMenu();
	      return;
	    }
	    if (!canOfferCareerSave(career)) {
	      finishCareer("medical");
	      return;
	    }
	    const medical = ensureMedical(career);
	    const surgeryCost = 55000;
	    const surgeryAvailable = canPay(career, surgeryCost);
	    renderShell(`
	      <section class="game-screen career-save-screen">
	        ${fighterHeader(career)}
	        ${seasonPanel(career)}
	        <div class="medical-stop-card">
	          <span>${iconOnly("heart-pulse", "M")} Commission medicale</span>
	          <h2>Sauver la carriere ?</h2>
	          <p>Le dossier est sur la table: risque ${medical.injuryRisk}/90, sante ${career.stats.durability}/99. Le staff peut encore tenter un vrai plan de recuperation, mais continuer comme si de rien n'etait n'est plus une option.</p>
	        </div>
	        ${renderMedicalAlert(career)}
	        <div class="choice-grid three career-save-options">
	          <button class="choice-btn" data-action="career-save-option" data-choice="season-off">
	            <span class="choice-icon">${iconOnly("calendar-x", "S")}</span>
	            <strong>Saison blanche</strong>
	            <span class="choice-summary">Un an hors circuit pour reconstruire le corps. Gros cout sportif et media, vraie marge medicale.</span>
	            <small>Sante +15 | Recuperation +58 | Hype -12 | +1 an</small>
	          </button>
	          <button class="choice-btn ${surgeryAvailable ? "" : "is-disabled"}" data-action="career-save-option" data-choice="surgery" ${surgeryAvailable ? "" : "disabled"}>
	            <span class="choice-icon">${iconOnly("stethoscope", "O")}</span>
	            <strong>Operation privee</strong>
	            <span class="choice-summary">Solution courte et chere: tu gardes la saison vivante si le budget suit.</span>
	            <small>${formatMoney(surgeryCost)} | Sante +11 | Recuperation +46${surgeryAvailable ? "" : " | budget insuffisant"}</small>
	          </button>
	          <button class="choice-btn" data-action="career-save-option" data-choice="retire">
	            <span class="choice-icon">${iconOnly("flag", "R")}</span>
	            <strong>Raccrocher</strong>
	            <span class="choice-summary">Accepter l'avis medical et transformer la carriere en carte finale maintenant.</span>
	            <small>Fin de carriere</small>
	          </button>
	        </div>
	      </section>
	    `);
	  }

  function renderCampStatus(career) {
    const camp = career.camp;
    if (!camp) return "";
    const current = Math.min(camp.week, camp.maxWeeks);
    const progress = camp.maxWeeks ? clamp((current / camp.maxWeeks) * 100, 0, 100) : 0;
    const completed = camp.log?.length || 0;
    const impact = campFatigueImpactFromValue(camp.fatigue || 0);
    return `
      <div class="camp-status">
        <div>
          <span>${iconOnly("timer", "C")} Camp en cours</span>
          <strong>Semaine ${current}/${camp.maxWeeks}</strong>
        </div>
        <div class="camp-status-track" aria-hidden="true"><i style="width: ${progress}%"></i></div>
        <em>${completed}/${camp.maxWeeks} choix poses | fatigue ${camp.fatigue || 0}/12 | ${esc(impact.label)} au combat</em>
      </div>
    `;
  }

  function renderCampTimeline(career) {
    const camp = career.camp;
    if (!camp) return "";
    const slots = Array.from({ length: camp.maxWeeks }, (_, index) => {
      const week = index + 1;
      const entry = camp.log?.find(item => item.week === week);
      const active = week === camp.week && !entry;
      return `
	        <div class="camp-slot ${entry ? "done" : active ? "active" : ""}">
	          <span>${iconOnly(entry ? "circle-check" : active ? "timer" : "circle", String(week))} S${week}</span>
	          <strong>${esc(entry?.label || (active ? "A choisir" : "A venir"))}</strong>
	        </div>
      `;
    }).join("");
    return `
	      <div class="camp-weeks camp-history">
	        <div class="panel-title">
	          <span>${iconOnly("list-checks", "C")} Historique du camp</span>
	          <strong>${camp.maxWeeks} semaines | fatigue ${camp.fatigue || 0}/12</strong>
	        </div>
        <div class="camp-slots">${slots}</div>
      </div>
    `;
  }

	  function renderGymOffer() {
	    const career = ui.career;
	    const perkNotice = career.startSummary?.perks?.length
	      ? `<div class="notice perk-active-notice">${iconOnly("sparkles", "B")} Bonus actifs sur cette carriere: ${esc(career.startSummary.perks.join(", "))}.</div>`
	      : "";
		    renderShell(`
		      <section class="game-screen fight-plan-screen gym-offer-screen">
	        ${fighterHeader(career)}
	        ${perkNotice}
	        <div class="story-panel">
          <h3>Premier club</h3>
          <p>Les coachs ont vu votre profil. Choisissez la structure qui va faconner les premieres annees.</p>
        </div>
        ${statBoard(career)}
        <div class="choice-grid">
	          ${GYMS.map((gym, index) => `
	            <button class="choice-btn choice-card gym-choice-card" data-action="choose-gym" data-index="${index}">
	              <span class="choice-head">
	                <span class="choice-icon">${iconOnly(choiceIcon("gym", gym.id), "G")}</span>
	                <strong>${esc(gym.label)}</strong>
	              </span>
	              <span class="choice-summary">${esc(gym.summary)}</span>
	              <small>${statLine(gym.stats)}</small>
	            </button>
	          `).join("")}
        </div>
      </section>
    `);
  }

  function renderSeasonSetup() {
    const career = ui.career;
    if (!career?.season) {
      startSeason();
      return;
    }
    const medical = ensureMedical(career);
    const reduced = career.stats.durability <= 28 || medical.injuryRisk >= 65 || career.age >= 37;
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        <div class="focus-panel">
          <div>
            <span>${iconOnly("calendar-days", "S")} Nouvelle saison</span>
            <h3>Choisir l'ambition de ${career.year}</h3>
            <p>${reduced ? "Le staff medical limite le calendrier: objectif plancher de 3 combats." : "Sans blessure majeure, la saison doit viser 4 ou 5 combats."}</p>
          </div>
          <strong>${reduced ? "Calendrier reduit" : `${ORGS[career.tier].label}`}</strong>
        </div>
        <div class="choice-grid two">
          ${SEASON_PLANS.map(plan => {
            const previewCareer = { ...career, season: { ...(career.season || {}), strategy: plan.id } };
            const target = seasonFightTarget(previewCareer);
            return `
              <button class="choice-btn choice-card season-choice" data-action="choose-season-plan" data-id="${plan.id}">
                <span class="choice-head">
                  <span class="choice-icon">${iconOnly(plan.id === "marathon" ? "flame" : plan.id === "clean" ? "heart-pulse" : plan.id === "spotlight" ? "camera" : "shield-check", "S")}</span>
                  <strong>${esc(plan.label)}</strong>
                </span>
                <span class="choice-summary">${esc(plan.summary)}</span>
                <small>${esc(seasonPlanImplication(career, plan, target))} | ${esc(effectLine(plan.effects))}</small>
              </button>
            `;
          }).join("")}
        </div>
	        <div class="context-grid fight-plan-secondary-context">
	          ${renderMedicalPanel(career)}
	          ${renderObjectivesPanel(career)}
	        </div>
      </section>
    `);
  }

  function renderTraining() {
    const career = ui.career;
    if (!career.pendingFight) {
      startFightSelection();
      return;
    }
    const fight = career.pendingFight;
	    const camp = career.camp || createCamp(career);
	    career.camp = camp;
	    const opportunity = currentCampOpportunity(career);
	    const opportunityChoices = opportunity ? campOpportunityBinaryChoices(opportunity) : [];
		    renderShell(`
			      <section class="game-screen training-screen ${opportunity ? "quick-choice-screen camp-stage-choice-screen" : ""}">
	        ${campPrepPanel(career)}
	        ${renderCampStatus(career)}
	        ${renderCampRiskWarning(career)}
        <div class="story-panel">
          <h3>${opportunity ? esc(opportunity.title) : `Semaine ${camp.week}/${camp.maxWeeks} pour ${esc(fight.opponent.name)}`}</h3>
          <p>${opportunity ? esc(opportunity.text) : "Chaque semaine ajoute une couche au camp. Les gros blocs progressent vite mais augmentent fatigue, blessures et baisse de forme."}</p>
        </div>
        ${opportunity ? `
          <div class="camp-bank-strip">
            <span>${iconOnly("wallet-cards", "$")} Banque disponible</span>
            <strong>${formatMoney(career.money)}</strong>
          </div>
        ` : ""}
	        ${opportunity ? `
	          <div class="choice-grid two binary-choice-grid camp-opportunity-grid camp-opportunity-binary">
	            ${opportunityChoices.map((option, index) => `
		              <button class="choice-btn choice-card camp-opportunity-card ${index === 0 ? "camp-opportunity-no" : "camp-opportunity-yes"}" data-action="camp-opportunity-option" data-index="${option.index}">
		                <span class="choice-head">
		                  <span class="choice-icon">${iconOnly(campOpportunityIcon(opportunity.id, option.tag), "C")}</span>
		                  <strong>${esc(option.binaryLabel)}</strong>
	                </span>
	                <span class="choice-summary">${esc(option.binarySummary || option.result)}</span>
	                <small>${esc(option.summary)}</small>
	              </button>
	            `).join("")}
	          </div>
		          ${mobileSwipeDeck(opportunityChoices.map(option => ({
		            label: option.binaryLabel,
		            intent: option.binaryIntent,
		            summary: `${option.binarySummary || option.result} | ${option.summary}`,
		            action: "camp-opportunity-option",
		            attrs: { index: option.index },
		          })), {
		            leftIntent: "Je n'y vais pas",
		            rightIntent: "J'y vais",
		            kicker: `Stage de camp | semaine ${camp.week}/${camp.maxWeeks}`,
		            title: opportunity.title,
		            summary: `${opportunity.text} Banque: ${formatMoney(career.money)}.`,
	          })}
	        ` : `
          <div class="training-board" role="list" aria-label="Choix d'entrainement">
	          ${TRAINING_FOCI.map(focus => {
              const disabled = focus.id === "specialist" && campHasSpecialist(camp);
              const effects = trainingFocusEffects(career, focus);
              return `
	            <button class="training-row ${disabled ? "is-disabled" : ""}" data-action="choose-training" data-id="${focus.id}" role="listitem" ${disabled ? "disabled" : ""}>
	              <span class="training-thumb">${iconOnly(trainingIcon(focus.id), "T")}</span>
	              <span class="training-main">
	                <strong>${esc(focus.label)}</strong>
	                <span>${esc(focus.summary)}</span>
              </span>
              <span class="training-effects">
                ${effectChips(effects)}
              </span>
              <span class="training-action">${esc(trainingActionLabel(career, focus, camp))}</span>
            </button>
          `;}).join("")}
          </div>
        `}
	        ${renderCampTimeline(career)}
	        <div class="context-grid training-secondary-context">
	          ${renderMedicalPanel(career)}
	          ${renderObjectivesPanel(career)}
	        </div>
      </section>
    `);
  }

  function renderDecisionResult() {
    const career = ui.career;
    const result = career.choiceResult || ui.resultChoice;
    if (!result) {
      career.phase = recoverPhase(career);
      ui.view = viewForPhase(career.phase);
      saveCareer();
      render();
      return;
    }
    const campContext = career.camp && career.pendingFight
      ? `${renderCampStatus(career)}${renderCampRiskWarning(career)}`
      : "";
    const visualResults = {
      press: {
        className: "press-result-card",
        image: assetUrl("press"),
        alt: "Conference de presse MMA stylisee",
        icon: "mic",
        kicker: "Conference de presse",
      },
      doping: {
        className: "doping-result-card",
        image: assetUrl("doping"),
        alt: "Controle anti-dopage stylise",
        icon: "syringe",
        kicker: "Protocole anti-dopage",
      },
    };
    const visualResult = visualResults[result.visual] || null;
    const effectsMarkup = (result.effects || []).map(effect => {
      const good = effectIsGood(effect.key, effect.value);
      return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
    }).join("") || `<span class="effect">Aucun effet visible</span>`;
    const nextButton = `<button class="btn btn-primary" data-action="${esc(result.nextAction)}">${iconText(result.nextAction === "to-life-event" ? "calendar-clock" : result.nextAction === "to-medical-rest" ? "heart-pulse" : "arrow-right", result.nextLabel, ">")}</button>`;
    renderShell(`
      <section class="game-screen decision-result-screen ${visualResult ? "visual-result-screen" : ""}">
        ${fighterHeader(career)}
        ${visualResult ? `
          <div class="visual-result-card ${visualResult.className}" style="--visual-image: url('${esc(visualResult.image)}')">
            <img src="${esc(visualResult.image)}" alt="${esc(visualResult.alt)}" decoding="async" fetchpriority="high" loading="eager">
            <div class="visual-result-content">
              <span class="visual-result-kicker">${iconOnly(visualResult.icon, "V")} ${esc(visualResult.kicker)}</span>
              <div class="visual-result-copy">
                <h3>${esc(result.title)}</h3>
                <p>${esc(result.text)}</p>
              </div>
              <div class="effect-list visual-result-effects">${effectsMarkup}</div>
              <div class="menu-actions visual-result-actions">${nextButton}</div>
            </div>
          </div>
        ` : ""}
        ${seasonPanel(career)}
        ${renderSeasonFocusPanel(career)}
        ${campContext}
        ${visualResult ? "" : `
          <div class="story-panel result-story">
            <h3>${esc(result.title)}</h3>
            <p>${esc(result.text)}</p>
          </div>
          <div class="effect-list">${effectsMarkup}</div>
          <div class="menu-actions" style="margin-top: 22px">${nextButton}</div>
        `}
      </section>
    `);
  }

	  function renderLifeEvent() {
	    const career = ui.career;
	    const event = career.pendingEvent;
	    if (!event) {
	      prepareLifeEvent();
	      return;
	    }
	    const quickChoice = event.options.length === 2;
	    const mobileChoices = event.options.map((option, index) => ({
	      label: option.label,
	      summary: option.result,
      meta: effectLine(option.effects) || "Aucun effet visible",
      action: "event-option",
	      attrs: { index },
	    }));
	    renderShell(`
	      <section class="game-screen ${quickChoice ? "quick-choice-screen life-choice-screen" : ""}">
	        ${fighterHeader(career)}
	        <div class="story-panel">
	          <h3>${esc(event.title)}</h3>
	          <p>${esc(event.text)}</p>
        </div>
        <div class="choice-grid ${event.options.length === 2 ? "binary-choice-grid" : "mobile-option-stack"}">
	          ${event.options.map((option, index) => `
	            <button class="choice-btn" data-action="event-option" data-index="${index}">
	              <span class="choice-icon">${iconOnly(optionImpactIcon(option), "?")}</span>
	              <strong>${esc(option.label)}</strong>
	              <span class="choice-summary">${esc(option.result)}</span>
	              <small>${esc(effectLine(option.effects) || "Aucun effet visible")}</small>
	            </button>
	          `).join("")}
        </div>
        ${mobileSwipeDeck(mobileChoices, {
          kicker: "Vie de combattant",
          title: event.title,
          summary: event.text,
        })}
      </section>
    `);
  }

	  function renderEvent() {
	    const career = ui.career;
	    const event = career.pendingEvent;
	    if (!event || !career.pendingFight) {
	      startFightSelection();
	      return;
	    }
	    const quickChoice = event.options.length === 2;
	    const mobileChoices = event.options.map((option, index) => ({
	      label: option.label,
	      summary: option.result,
      meta: effectLine(option.effects) || "Aucun effet visible",
      action: "event-option",
	      attrs: { index },
	    }));
	    renderShell(`
	      <section class="game-screen ${quickChoice ? "quick-choice-screen life-choice-screen" : ""}">
	        ${fighterHeader(career)}
	        <div class="story-panel">
	          <h3>${esc(event.title)}</h3>
          <p>${esc(event.text)}</p>
        </div>
        <div class="choice-grid ${event.options.length === 2 ? "binary-choice-grid" : "mobile-option-stack"}">
	          ${event.options.map((option, index) => `
	            <button class="choice-btn" data-action="event-option" data-index="${index}">
	              <span class="choice-icon">${iconOnly(optionImpactIcon(option), "?")}</span>
	              <strong>${esc(option.label)}</strong>
	              <span class="choice-summary">${esc(option.result)}</span>
	              <small>${esc(effectLine(option.effects) || "Aucun effet visible")}</small>
	            </button>
	          `).join("")}
        </div>
        ${mobileSwipeDeck(mobileChoices, {
          kicker: "Fight week",
          title: event.title,
          summary: event.text,
        })}
      </section>
    `);
  }

  function renderEventResult() {
    const career = ui.career;
    const { event, option, effects } = ui.resultChoice;
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        <div class="story-panel">
          <h3>${esc(event.title)}</h3>
          <p>${esc(option.result)}</p>
        </div>
        <div class="effect-list">
	          ${effects.map(effect => {
	            const good = effectIsGood(effect.key, effect.value);
	            return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
	          }).join("") || `<span class="effect">Aucun effet visible</span>`}
	        </div>
	        <div class="menu-actions" style="margin-top: 22px">
	          <button class="btn btn-primary" data-action="to-fight-plan">${iconText(career.pendingFight ? "clipboard-list" : "handshake", career.pendingFight ? "Plan de coin" : "Choisir le combat", ">")}</button>
	        </div>
      </section>
    `);
  }

  function renderCareerSpecial() {
    const career = ui.career;
    const special = career.pendingSpecial;
    if (!special) {
      startFightSelection();
      return;
    }
    const mobileChoices = [
      {
        label: "Signer en anglaise",
        summary: "Camp de boxe, conference, puis combat hors MMA.",
        action: "career-special-option",
        attrs: { index: 0 },
      },
      {
        label: "Revenir au MMA",
        summary: "Refuser le cheque et garder la saison propre.",
        action: "career-special-option",
        attrs: { index: 1 },
      },
    ];
    renderShell(`
      <section class="game-screen special-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        ${renderSeasonFocusPanel(career)}
        <div class="special-hero">
          <span>${iconOnly("ticket", "S")} Offre hors MMA</span>
          <h3>${esc(special.title)}</h3>
          <p>${esc(special.text)}</p>
        </div>
        <div class="summary-grid">
          <div class="summary-item"><span>${iconOnly("target", "B")} Adversaire</span><strong>${esc(special.opponent.name)}</strong></div>
          <div class="summary-item"><span>${iconOnly("list-checks", "R")} Record</span><strong>${esc(special.opponent.record)}</strong></div>
          <div class="summary-item"><span>${iconOnly("circle-dollar-sign", "$")} Bourse</span><strong>${formatMoney(special.purse)}</strong></div>
          <div class="summary-item"><span>${iconOnly("sparkles", "%")} Chance</span><strong>${special.baseWinChance}% base</strong></div>
        </div>
        <div class="choice-grid two binary-choice-grid">
          <button class="choice-btn special-choice" data-action="career-special-option" data-index="0">
            <span class="choice-icon">${iconOnly("badge-dollar-sign", "$")}</span>
            <strong>Signer en anglaise</strong>
            <span class="choice-summary">Vous suspendez la route MMA et lancez un mini-arc: camp de boxe, conference, puis combat.</span>
            <small>Gros cheque | tres faible chance de victoire</small>
          </button>
          <button class="choice-btn special-choice" data-action="career-special-option" data-index="1">
            <span class="choice-icon">${iconOnly("shield-check", "M")}</span>
            <strong>Refuser et revenir au MMA</strong>
            <span class="choice-summary">Vous gardez la saison MMA propre et utilisez le refus pour vendre votre discipline.</span>
            <small>Focus MMA | reputation + discipline</small>
          </button>
        </div>
        ${mobileSwipeDeck(mobileChoices, {
          kicker: "Offre hors MMA",
          title: special.title,
          summary: `${special.opponent.name} met ${formatMoney(special.purse)} sur la table.`,
        })}
      </section>
    `);
  }

  function renderSpecialCamp() {
    const career = ui.career;
    const special = career.specialFight;
    const camp = career.specialCamp;
    if (!special || !camp) {
      startFightSelection();
      return;
    }
    renderShell(`
      <section class="game-screen special-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        <div class="special-hero compact">
          <span>${iconOnly("dumbbell", "B")} Camp de boxe</span>
          <h3>${esc(special.opponent.name)}</h3>
          <p>Trois semaines pour arreter de penser comme un combattant MMA. Chaque choix augmente un peu vos chances, mais le corps paie vite.</p>
        </div>
        <div class="summary-grid">
          <div class="summary-item"><span>${iconOnly("calendar-clock", "S")} Semaine</span><strong>${camp.week}/${camp.maxWeeks}</strong></div>
          <div class="summary-item"><span>${iconOnly("activity", "F")} Fatigue</span><strong>${camp.fatigue || 0}/12</strong></div>
          <div class="summary-item"><span>${iconOnly("sparkles", "%")} Bonus</span><strong>+${special.prepBonus || 0}%</strong></div>
          <div class="summary-item"><span>${iconOnly("circle-dollar-sign", "$")} Bourse</span><strong>${formatMoney(special.purse)}</strong></div>
        </div>
        <div class="context-grid">
          ${renderMedicalPanel(career)}
          ${renderObjectivesPanel(career)}
        </div>
        <div class="training-board" role="list" aria-label="Preparation boxe anglaise">
          ${BOXING_PREP.map(focus => `
            <button class="training-row special-training" data-action="choose-special-training" data-id="${focus.id}" role="listitem">
              <span class="training-thumb">${iconOnly(specialTrainingIcon(focus.id), "B")}</span>
              <span class="training-main">
                <strong>${esc(focus.label)}</strong>
                <span>${esc(focus.summary)}</span>
              </span>
              <span class="training-effects">
                ${effectChips(focus.effects)}
              </span>
              <span class="training-action">${esc(focus.tag)} | chance +${focus.chance}</span>
            </button>
          `).join("")}
        </div>
      </section>
    `);
  }

  function renderSpecialPress() {
    const career = ui.career;
    const special = career.specialFight;
    if (!special) {
      startFightSelection();
      return;
    }
    renderShell(`
      <section class="game-screen special-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        <div class="special-hero compact">
          <span>${iconOnly("mic", "P")} Conference de presse</span>
          <h3>${esc(career.name)} vs ${esc(special.opponent.name)}</h3>
          <p>Le camp est termine. Il reste a vendre le gala sans casser la forme ni donner trop de carburant a l'adversaire.</p>
        </div>
        <div class="summary-grid press-summary">
          <div class="summary-item"><span>${iconOnly("sparkles", "%")} Chance estimee</span><strong>${clamp((special.baseWinChance || 8) + (special.prepBonus || 0), 3, 30)}%</strong></div>
          <div class="summary-item"><span>${iconOnly("flame", "H")} Hype</span><strong>${career.hype}/160</strong></div>
          <div class="summary-item"><span>${iconOnly("heart-pulse", "F")} Forme</span><strong>${career.condition}/100</strong></div>
          <div class="summary-item"><span>${iconOnly("activity", "R")} Risque</span><strong>${ensureMedical(career).injuryRisk}/90</strong></div>
        </div>
        <div class="choice-grid three">
          ${BOXING_PRESS_OPTIONS.map(option => `
            <button class="choice-btn" data-action="special-press-option" data-id="${option.id}">
              <span class="choice-icon">${iconOnly(option.id === "respect" ? "shield-check" : option.id === "trash" ? "flame" : "triangle-alert", "P")}</span>
              <strong>${esc(option.label)}</strong>
              <span class="choice-summary">${esc(option.result)}</span>
              <small>${esc(effectLine(option.effects))}</small>
            </button>
          `).join("")}
        </div>
      </section>
    `);
  }

  function renderSpecialResult() {
    const career = ui.career;
    const result = career.lastResult;
    if (!result?.special) {
      advanceAfterFight();
      return;
    }
    const needsRest = hasMedicalRest(career);
	    const nextLabel = career.flags.medicalRetirement
	      ? "Rapport medical"
	      : needsRest
	        ? "Repos medical"
	        : career.season && career.season.fightsDone < career.season.fightsTarget
	          ? "Continuer la saison"
	          : "Bilan de saison";
	    const specialDetails = `
	      ${result.press ? `
	        <div class="fight-moment-recap press-recap">
	          <span>${iconOnly("mic", "P")} Conference de presse</span>
	          <strong>${esc(result.press.choice)}</strong>
	          <p>${esc(result.press.result)}</p>
	          <div class="effect-list compact">
	            ${(result.press.effects || []).map(effect => {
	              const good = effectIsGood(effect.key, effect.value);
	              return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
	            }).join("") || `<span class="effect">Aucun effet visible</span>`}
	          </div>
	        </div>
	      ` : ""}
	      <div class="fight-report">
	        ${result.report.map(line => `
	          <div class="round-line">
	            <strong>${iconOnly(line.winner === "Vous" ? "circle-check" : "circle-dot", "R")} Round ${line.round} | ${esc(line.winner)}</strong>
	            <span>${esc(line.text)}</span>
	          </div>
	        `).join("")}
	      </div>
	      <div class="analysis-panel">
	        <div class="panel-title">
	          <span>${iconOnly("scan-search", "A")} Lecture du gala</span>
	          <strong>Pourquoi ca compte</strong>
	        </div>
	        ${(result.analysis || []).map(line => `<p>${esc(line)}</p>`).join("")}
	      </div>
	    `;
	    renderShell(`
	      <section class="game-screen special-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        <div class="result-banner ${result.won ? "win" : "loss"}">
          <span class="rank">Boxe anglaise | chance ${result.chance}%</span>
          <h3>${iconOnly(result.won ? "circle-check" : "x-circle", result.won ? "V" : "D")} ${result.won ? "Upset en anglaise" : "Money fight"} | ${esc(result.scoreText)}</h3>
        </div>
        ${result.injury ? `
          <div class="medical-alert">
            <strong>${iconOnly("heart-pulse", "M")} ${esc(result.injury.label)}</strong>
            <span>${esc(injurySentence(result.injury))}</span>
          </div>
			        ` : ""}
	        <div class="effect-list">
	          ${(result.effects || []).map(effect => {
	            const good = effectIsGood(effect.key, effect.value);
            return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
          }).join("")}
        </div>
	        <div class="menu-actions" style="margin-top: 22px">
	          <button class="btn btn-primary" data-action="after-special-fight">${iconText(needsRest ? "heart-pulse" : "arrow-right", nextLabel, ">")}</button>
	        </div>
	        <details class="fight-detail-toggle">
	          <summary>
	            <span>${iconOnly("file-text", "R")} Resume detaille du gala</span>
	            <span class="detail-chevron">${iconOnly("chevron-down", "v")}</span>
	          </summary>
	          <div class="fight-detail-content">${specialDetails}</div>
	        </details>
	      </section>
	    `);
	  }

	  function renderFightOffer() {
	    const career = ui.career;
	    if (!career.pendingFightOptions) {
	      startFightSelection();
	      return;
	    }
	    const options = career.pendingFightOptions || [];
	    renderShell(`
	      <section class="game-screen fight-offer-screen">
	        ${fighterHeader(career)}
	        ${seasonPanel(career)}
	        ${renderMedicalAlert(career)}
		        <div class="story-panel fight-offer-intro">
		          <h3>Signer le prochain combat</h3>
		          <p>Le manager pose trois dossiers sur la table. Une fois le combat signe, le camp commence autour de cet adversaire.</p>
		        </div>
		        <div class="choice-grid fight-offer-grid">
		          ${options.map((fight, index) => fightOptionButton(fight, index)).join("")}
		        </div>
	      </section>
    `);
  }

	  function fightOptionButton(fight, index) {
    const threat = fight.risk === "low" ? "low" : fight.risk === "mid" ? "mid" : "high";
    const opponent = fight.opponent;
    const meta = [
      opponent.country?.label,
      opponent.style?.label,
      opponent.age ? `${opponent.age} ans` : "",
      opponent.record ? `Record ${opponent.record}` : "",
      `OVR ${opponent.overall}`,
      fight.rematch ? "Rematch" : "",
    ].filter(Boolean);
	    return `
	      <button class="choice-btn fight-option risk-${threat}" data-action="choose-fight" data-index="${index}">
	        <span class="fight-kicker">${iconOnly(riskIcon(fight), "!")} ${esc(fight.label)}</span>
	        <strong class="fight-opponent">vs ${esc(opponent.name)}</strong>
	        <span class="choice-summary">${esc(fight.summary)}</span>
	        <div class="fight-meta">
	          ${meta.map(item => `<span>${esc(item)}</span>`).join("")}
	          <span>${formatMoney(fight.money)}</span>
	        </div>
	        <span class="threat ${threat}">${iconOnly(riskIcon(fight), "!")} ${fight.risk === "low" ? "Risque bas" : fight.risk === "mid" ? "Risque moyen" : "Risque haut"}</span>
	      </button>
		    `;
		  }

		  function renderPressConference() {
		    const career = ui.career;
		    const fight = career.pendingFight;
		    if (!fight) {
		      startFightSelection();
		      return;
		    }
		    const fatigueImpact = campFatigueImpact(career);
		    renderShell(`
		      <section class="game-screen press-conference-screen">
		        ${fighterHeader(career)}
		        ${seasonPanel(career)}
		        ${renderMedicalAlert(career)}
		        <div class="story-panel press-intro">
		          <h3>Conference de presse</h3>
		          <p>${esc(career.name)} vs ${esc(fight.opponent.name)}. Le camp est termine: il faut vendre le combat sans se mettre l'organisation, les sponsors ou l'adversaire completement a dos.</p>
		        </div>
		        <div class="summary-grid press-summary">
		          <div class="summary-item"><span>${iconOnly("target", "A")} Adversaire</span><strong>${esc(fight.opponent.name)}</strong></div>
		          <div class="summary-item"><span>${iconOnly("flame", "H")} Hype combat</span><strong>${fight.hype}</strong></div>
		          <div class="summary-item"><span>${iconOnly("activity", "F")} Fatigue</span><strong>${fatigueImpact.fatigue}/12</strong></div>
		          <div class="summary-item"><span>${iconOnly("circle-dollar-sign", "$")} Bourse</span><strong>${formatMoney(fight.money)}</strong></div>
		        </div>
		        <div class="choice-grid three press-grid">
		          ${PRESS_OPTIONS.map(option => `
		            <button class="choice-btn choice-card press-choice" data-action="press-option" data-id="${option.id}">
		              <span class="choice-head">
		                <span class="choice-icon">${iconOnly(pressOptionIcon(option.id), "P")}</span>
		                <strong>${esc(option.label)}</strong>
		              </span>
		              <span class="choice-summary">${esc(option.summary)}</span>
		              <small>${esc(effectLine(option.effects))}</small>
		            </button>
		          `).join("")}
		        </div>
		      </section>
		    `);
		  }

		  function renderFightPlan() {
	    const career = ui.career;
    const fight = career.pendingFight;
    if (!fight) {
      startFightSelection();
      return;
    }
    const fatigueImpact = campFatigueImpact(career);
    renderShell(`
      <section class="game-screen fight-plan-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
	        <div class="story-panel fight-plan-intro">
	          <h3>Plan contre ${esc(fight.opponent.name)}</h3>
	          <p>${esc(fight.opponent.country.label)} | ${esc(fight.opponent.style.label)} | record ${esc(fight.opponent.record)} | OVR ${fight.opponent.overall}</p>
	        </div>
        <div class="choice-grid three fight-plan-grid">
	          ${PLANS.map(plan => `
	            <button class="choice-btn" data-action="fight-plan" data-id="${plan.id}">
	              <span class="choice-icon">${iconOnly(choiceIcon("plan", plan.id, plan.tag), "P")}</span>
	              <strong>${esc(plan.label)}</strong>
	              <span class="choice-summary">${esc(plan.summary)}</span>
	              <small>${statLine(plan.stats)}</small>
	            </button>
	          `).join("")}
        </div>
        <div class="notice fight-plan-note">Matchup: vous ${overall(career)} OVR | adversaire ${fight.opponent.overall} OVR | enjeu ${esc(fight.tag)} | bourse ${formatMoney(fight.money)}. Fatigue camp: ${fatigueImpact.fatigue}/12 (${esc(fatigueImpact.label)}). Debout: Striking, Puissance, Fight IQ, Menton. Sol/cage: Lutte, Sol, Cardio, Fight IQ.</div>
	      </section>
	    `);
	  }

  function renderFightMoment() {
    const career = ui.career;
    const fight = career.pendingFight;
    const plan = PLANS.find(item => item.id === (career.pendingPlan?.id || career.pendingPlan)) || PLANS[0];
    if (!fight) {
      startFightSelection();
      return;
    }
    if (!career.pendingFightMoment) {
      career.liveFight = career.liveFight || {
        planId: plan.id,
        round: 1,
        rounds: fightRoundsFor(career, fight),
        fighterScore: 0,
        opponentScore: 0,
        report: [],
        finish: null,
      };
      const targetRound = clamp(career.liveFight.round || 1, 1, career.liveFight.rounds || fightRoundsFor(career, fight));
      const usedIds = (career.fightMomentChoices || []).map(item => item.moment.id);
      career.pendingFightMomentIndex = targetRound - 1;
      career.pendingFightMoment = buildFightMoment(career, fight, plan, targetRound, usedIds);
      saveCareer();
    }
    const totalDecisions = career.liveFight?.rounds || fightRoundsFor(career, fight);
    const decisionIndex = clamp((career.liveFight?.round || 1) - 1, 0, Math.max(0, totalDecisions - 1));
    const moment = career.pendingFightMoment;
    const momentChoices = (moment.options || []).slice(0, 2);
	    const swipeChoices = momentChoices.map((option, index) => ({
	      label: option.binaryLabel || (index === 0 ? "Non" : "Oui"),
	      intent: option.binaryIntent || (index === 0 ? "Prudent" : "Engager"),
	      summary: `${option.binarySummary || option.label} | ${effectLine(option.effects) || "Aucun effet visible"}`,
	      action: "fight-moment-option",
	      attrs: { index },
    }));
    renderShell(`
      <section class="game-screen fight-moment-screen">
        ${fighterHeader(career)}
        <div class="fight-moment-card">
          <span class="moment-kicker">${iconOnly(moment.icon || "target", "M")} Round ${moment.round} | Decision ${decisionIndex + 1}/${totalDecisions || 1}</span>
          <div class="moment-timer" data-fight-timer>
            <span>Decision</span>
            <strong data-fight-timer-value>10</strong>
            <i data-fight-timer-bar></i>
          </div>
          <h3>${esc(moment.title)}</h3>
          <p>${esc(moment.text)}</p>
          <div class="choice-grid two binary-choice-grid fight-moment-binary">
            ${momentChoices.map((option, index) => `
              <button class="choice-btn moment-choice ${index === 0 ? "moment-choice-no" : "moment-choice-yes"}" data-action="fight-moment-option" data-index="${index}">
                <span class="choice-icon">${iconOnly(index === 0 ? "arrow-left" : "arrow-right", index === 0 ? "N" : "O")}</span>
                <strong>${esc(option.binaryLabel || option.label)}</strong>
                <span class="choice-summary">${esc(option.binarySummary || option.label)}</span>
                <small>${esc(effectLine(option.effects) || "Aucun effet visible")}</small>
              </button>
            `).join("")}
          </div>
	          ${mobileSwipeDeck(swipeChoices, {
	            leftIntent: "Prudent",
	            rightIntent: "Engager",
	            kicker: `Round ${moment.round} | ${decisionIndex + 1}/${totalDecisions || 1}`,
	            title: moment.title,
	            summary: moment.text,
          })}
        </div>
      </section>
    `);
  }

	  function renderFightResult() {
	    const career = ui.career;
    const result = career.lastResult;
    const needsRest = hasMedicalRest(career);
	    const afterFightLabel = career.flags.medicalRetirement
	      ? "Rapport medical"
	      : needsRest
	        ? "Repos medical"
	        : career.season && career.season.fightsDone < career.season.fightsTarget
	          ? "Continuer la saison"
	          : "Bilan de saison";
	    const afterFightIcon = career.flags.medicalRetirement || needsRest
	      ? "heart-pulse"
	      : career.season && career.season.fightsDone < career.season.fightsTarget
	        ? "arrow-right"
	        : "clipboard-list";
	    const moments = result.moments?.length ? result.moments : result.moment ? [result.moment] : [];
	    const fightDetails = `
	      ${moments.length ? `
	        <div class="fight-moment-recap">
	          <span>${iconOnly("target", "M")} Decisions de combat</span>
	          ${moments.map(moment => `
	            <div class="round-decision-recap">
	              <strong>R${moment.round} | ${esc(moment.title)}: ${esc(moment.choice)}</strong>
	              <p>${esc(moment.result)}</p>
	              <div class="effect-list compact">
	                ${(moment.effects || []).map(effect => {
	                  const good = effectIsGood(effect.key, effect.value);
	                  return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
	                }).join("") || `<span class="effect">Aucun effet visible</span>`}
	              </div>
	            </div>
	          `).join("")}
	        </div>
	      ` : ""}
	      <div class="fight-report">
	        ${result.report.map(line => `
	          <div class="round-line">
	            <strong>${iconOnly(line.winner === "Vous" ? "circle-check" : "circle-dot", "R")} Round ${line.round} | ${esc(line.winner)}</strong>
	            <span>${esc(line.text)}</span>
	          </div>
	        `).join("")}
	      </div>
	      <div class="analysis-panel">
	        <div class="panel-title">
	          <span>${iconOnly("scan-search", "A")} Lecture du combat</span>
	          <strong>Pourquoi ca a bascule</strong>
	        </div>
	        ${(result.analysis || []).map(line => `<p>${esc(line)}</p>`).join("")}
	      </div>
	    `;
	    renderShell(`
	      <section class="game-screen">
        ${fighterHeader(career)}
	        ${seasonPanel(career)}
	        <div class="result-banner ${result.won ? "win" : "loss"}">
	          <span class="rank">${esc(result.fight.tag)} | ${esc(result.plan.label)}</span>
	          <h3>${iconOnly(result.won ? "circle-check" : "x-circle", result.won ? "V" : "D")} ${result.won ? "Victoire" : "Defaite"} | ${esc(result.scoreText)}</h3>
	        </div>
	        ${result.badgeUnlocks?.length ? `
	          <div class="badge-unlock">
	            <strong>${iconOnly("award", "B")} Badge debloque</strong>
	            <span>${result.badgeUnlocks.map(id => esc(badgeById(id)?.title || id)).join(" / ")}${result.badgeTokenGain ? ` | +${result.badgeTokenGain} jetons` : ""}</span>
	          </div>
	        ` : ""}
		        ${result.injury ? `
		          <div class="medical-alert">
		            <strong>${iconOnly("heart-pulse", "M")} ${esc(result.injury.label)}</strong>
		            <span>${esc(injurySentence(result.injury))}</span>
		          </div>
		        ` : ""}
		        <div class="effect-list">
		          <span class="effect ${result.won ? "good" : "bad"}">${iconOnly(result.won ? "trending-up" : "trending-down", result.won ? "+" : "-")}<span>${result.won ? "+ ranking" : "- moral"}</span></span>
	          <span class="effect bad">${iconOnly("heart-crack", "-")}<span>Sante -${result.damage}</span></span>
	          <span class="effect bad">${iconOnly("heart-pulse", "-")}<span>Forme -${result.conditionLoss ?? result.damage}</span></span>
	          ${result.fatigueImpact ? `<span class="effect ${result.fatigueImpact.score >= 0 ? "good" : "bad"}">${iconOnly("activity", "F")}<span>Fatigue ${result.fatigueImpact.fatigue}/12 | ${esc(result.fatigueImpact.label)}</span></span>` : ""}
	          <span class="effect">${iconOnly("gauge", "F")}<span>Forme actuelle ${career.condition}/100</span></span>
	          <span class="effect good">${iconOnly("circle-dollar-sign", "$")}<span>Gains +${formatMoney(result.fight.money)}</span></span>
	        </div>
		        <div class="menu-actions" style="margin-top: 22px">
		          <button class="btn btn-primary" data-action="after-fight">${iconText(afterFightIcon, afterFightLabel, ">")}</button>
		        </div>
		        <details class="fight-detail-toggle">
		          <summary>
		            <span>${iconOnly("file-text", "R")} Resume detaille du combat</span>
		            <span class="detail-chevron">${iconOnly("chevron-down", "v")}</span>
		          </summary>
		          <div class="fight-detail-content">${fightDetails}</div>
		        </details>
	      </section>
	    `);
	  }

  function renderMedicalRest() {
    const career = ui.career;
    if (!career || !hasMedicalRest(career)) {
      if (career?.season && career.season.fightsDone < career.season.fightsTarget) startFightSelection();
      else renderMenu();
      return;
    }
    const medical = ensureMedical(career);
    const active = medical.activeInjury;
    const injuries = (medical.injuries || []).slice(0, 5);
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        ${renderSeasonFocusPanel(career)}
        <div class="story-panel">
          <h3>Repos medical</h3>
          <p>${active ? `${active.label} apres ${active.source}.` : "La commission ou le staff impose une coupure."} Pas de camp, pas de signature: on soigne, on teste, puis on reprend.</p>
        </div>
	        <div class="summary-grid">
	          <div class="summary-item"><span>${iconOnly("calendar-clock", "R")} Repos</span><strong>${formatRestWeeks(medical.restWeeks)}</strong></div>
	          <div class="summary-item"><span>${iconOnly("activity", "B")} Risque</span><strong>${medical.injuryRisk}/90</strong></div>
	          <div class="summary-item"><span>${iconOnly("heart-pulse", "F")} Forme</span><strong>${career.condition}/100</strong></div>
	          <div class="summary-item"><span>${iconOnly("heart", "S")} Sante</span><strong>${career.stats.durability}/99</strong></div>
	        </div>
	        <div class="story-panel slim">
	          <h3>Choisir la recuperation</h3>
	          <p>Le repos passe quoi qu'il arrive, mais la maniere de revenir change le risque residuel, la forme, la sante et l'argent disponible.</p>
	        </div>
	        <div class="choice-grid two medical-protocols">
          ${MEDICAL_PROTOCOLS.map(protocol => `
            <button class="choice-btn protocol-choice" data-action="choose-medical-protocol" data-id="${protocol.id}">
              <span class="choice-icon">${iconOnly(protocolIcon(protocol.id), "M")}</span>
              <strong>${esc(protocol.label)}</strong>
              <span class="choice-summary">${esc(protocol.summary)}</span>
              <small>${esc(effectLine(protocol.effects))}</small>
	            </button>
	          `).join("")}
	        </div>
	        <div class="context-grid medical-rest-details">
	          ${renderMedicalPanel(career)}
	          ${renderNewsPanel(career, 4)}
	          ${renderObjectivesPanel(career)}
	        </div>
	        <div class="timeline medical-rest-timeline">
	          ${injuries.map(injury => `
	            <div class="timeline-row">
	              <strong>${esc(injury.label)}</strong>
	              <span>${esc(injurySentence(injury))}</span>
	            </div>
	          `).join("") || `<div class="timeline-row"><strong>Dossier propre</strong><span>Aucune blessure majeure enregistree.</span></div>`}
	        </div>
      </section>
    `);
  }

  function renderSeasonProgress() {
    const career = ui.career;
    const season = career.season;
    const last = career.lastResult;
    const done = Math.min(season.fightsDone || 0, season.fightsTarget || 0);
    const remaining = Math.max(0, (season.fightsTarget || 0) - done);
    const nextFight = Math.min(done + 1, season.fightsTarget || done + 1);
    const remainingText = remaining
	      ? `Il reste ${formatCombats(remaining)} a signer. Prochain dossier: combat ${nextFight}/${season.fightsTarget}.`
      : "La saison sportive est complete. Le bilan peut etre valide.";
    renderShell(`
      <section class="game-screen season-progress-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        <div class="story-panel">
          <h3>Retour au camp</h3>
          <p>${last.special ? "Le gala hors MMA est digere par le staff." : last.won ? "La victoire fait monter le bruit autour de vous." : "La defaite oblige a reajuster le camp."} ${remainingText}</p>
        </div>
        ${renderMedicalAlert(career)}
	        <div class="context-grid season-progress-secondary-context">
	          ${renderNewsPanel(career, 4)}
	          ${renderObjectivesPanel(career)}
	          ${renderMedicalPanel(career)}
	        </div>
	        <div class="timeline season-progress-timeline">
	          ${season.fightLog.map(row => `
            <div class="timeline-row">
              <strong>Combat ${row.number}</strong>
	              <span>${row.special ? `${esc(row.special)} | ` : ""}${esc(row.result)} contre ${esc(row.opponent)} (${esc(row.method)}, R${row.round}).${row.press ? ` Conference: ${esc(row.press)}.` : ""}${row.moment ? ` Moment: ${esc(row.moment)}.` : ""}</span>
            </div>
          `).join("")}
        </div>
        <div class="menu-actions">
	          <button class="btn btn-primary" data-action="next-camp">${iconText("handshake", "Choisir le prochain combat", ">")}</button>
        </div>
      </section>
    `);
  }

  function renderSeasonSummary() {
    const career = ui.career;
    const season = career.season;
    if (season && !season.settled && season.fightsDone >= season.fightsTarget) {
      settleSeason(career);
      saveCareer();
    }
    if (ensureContractOffers(career)) {
      saveCareer();
    }
    const scoreNow = scoreCareer(career);
    const hasContractOffers = Boolean(career.pendingContracts?.length);
    const seasonDetails = `
      ${renderSeasonFocusPanel(career)}
      <div class="story-panel">
        <h3>Saison ${career.year}</h3>
        <p>${formatCombats(season.fightsDone)}, ${season.trainingLog.length} camp${season.trainingLog.length > 1 ? "s" : ""}, ${season.lifeLog.length} choix de vie. Score provisoire: ${scoreNow.score} pts.</p>
      </div>
      <div class="notice season-next-step">
        ${hasContractOffers
          ? `${iconOnly("file-pen-line", "C")} Prochaine etape: signer une des offres au-dessus pour lancer la saison suivante.`
          : `${iconOnly("calendar-plus", "S")} Aucun contrat prioritaire a signer: vous pouvez lancer la saison suivante avec le cadre actuel.`}
      </div>
      ${season.settlement ? `
        <div class="season-verdict">
          <strong>${iconOnly(season.settlement.title === "Saison compliquee" ? "triangle-alert" : "circle-check", "V")} ${esc(season.settlement.title)}</strong>
          <span>${esc(season.settlement.text)}</span>
          <div class="effect-list compact">
            ${(season.settlement.effects || []).map(effect => {
              const good = effectIsGood(effect.key, effect.value);
              return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
            }).join("") || `<span class="effect">Aucun effet visible</span>`}
          </div>
        </div>
      ` : ""}
      ${season.settlement?.delayed?.length ? `
        <div class="season-verdict delayed-verdict">
          <strong>${iconOnly("hourglass", "D")} Consequences de vie</strong>
          ${(season.settlement.delayed || []).map(item => `
            <span>${esc(item.title)} | ${esc(item.outcome)}: ${esc(item.text)}</span>
            <div class="effect-list compact">
              ${(item.effects || []).map(effect => {
                const good = effectIsGood(effect.key, effect.value);
                return `<span class="effect ${good ? "good" : "bad"}">${iconOnly(effectIcon(effect.key, effect.value), good ? "+" : "-")}<span>${esc(effectText(effect.key, effect.value))}</span></span>`;
              }).join("")}
            </div>
          `).join("")}
        </div>
      ` : ""}
      <div class="summary-grid">
        <div class="summary-item"><span>${iconOnly("list-checks", "R")} Record</span><strong>${career.record.w}-${career.record.l}</strong></div>
        <div class="summary-item"><span>${iconOnly("zap", "K")} Finitions</span><strong>${career.record.ko + career.record.sub}</strong></div>
        <div class="summary-item"><span>${iconOnly("trophy", "T")} Ceintures</span><strong>${career.titles.length}</strong></div>
        <div class="summary-item"><span>${iconOnly("heart", "S")} Sante</span><strong>${career.stats.durability}</strong></div>
      </div>
      <div class="context-grid">
        ${renderNewsPanel(career, 5)}
        ${renderRankingPanel(career)}
        ${renderContractPanel(career)}
        ${renderMedicalPanel(career)}
      </div>
      <div class="tabs">
        <button class="tab active" data-action="noop">Combats</button>
      </div>
      <div class="timeline">
        ${season.fightLog.map(row => `
          <div class="timeline-row">
            <strong>${row.result}</strong>
            <span>Combat ${row.number}: ${row.special ? `${esc(row.special)} | ` : ""}${esc(row.opponent)} (${esc(row.method)}, R${row.round})${row.title ? " | ceinture" : ""}.${row.press ? ` Conference: ${esc(row.press)}.` : ""}${row.moment ? ` Moment: ${esc(row.moment)}.` : ""}</span>
          </div>
        `).join("")}
        ${season.trainingLog.slice(-2).map(row => `
          <div class="timeline-row">
            <strong>Camp</strong>
            <span>${esc(row.label)} | ${esc(row.text)}</span>
          </div>
        `).join("")}
        ${season.lifeLog.slice(-2).map(row => `
          <div class="timeline-row">
            <strong>Choix de vie</strong>
            <span>${esc(row.title)}: ${esc(row.choice)}. ${esc(row.result)}</span>
          </div>
        `).join("")}
      </div>
      ${hasContractOffers ? "" : `
        <div class="menu-actions">
          <button class="btn btn-primary" data-action="advance-year">${iconText("calendar-plus", "Saison suivante", ">")}</button>
          ${voluntaryRetirementAvailable(career) ? `<button class="btn" data-action="retire">${iconText("flag", "Raccrocher les gants", "F")}</button>` : ""}
        </div>
      `}
    `;
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        ${renderContractOffersBlock(career)}
        ${hasContractOffers ? `
          <details class="fight-detail-toggle season-detail-toggle">
            <summary>
              <span>${iconOnly("clipboard-list", "R")} Resume de la saison passee</span>
              <span class="detail-chevron">${iconOnly("chevron-down", "v")}</span>
            </summary>
            <div class="fight-detail-content season-detail-content">${seasonDetails}</div>
          </details>
        ` : seasonDetails}
      </section>
    `);
  }

  function renderRetirementChoice() {
    const career = ui.career;
    const mobileChoices = [
      {
        label: "Continuer",
        summary: "Une saison de plus, plus de score, plus de risques.",
        action: "force-advance-year",
        attrs: {},
      },
      {
        label: "Raccrocher",
        summary: "Transformer la carriere en carte finale maintenant.",
        action: "retire",
        attrs: {},
      },
    ];
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        <div class="story-panel">
          <h3>Continuer ?</h3>
          <p>Le corps commence a negocier chaque matin. Une saison de plus peut offrir une legende, ou tout gacher.</p>
        </div>
	        <div class="choice-grid binary-choice-grid">
	          <button class="choice-btn" data-action="force-advance-year">
	            <span class="choice-icon">${iconOnly("rotate-ccw", "R")}</span>
	            <strong>Une derniere danse</strong>
	            <span class="choice-summary">Continuer malgre l'usure. Plus de points possibles, plus de risques.</span>
	            <small>Risque / legacy</small>
	          </button>
	          <button class="choice-btn" data-action="retire">
	            <span class="choice-icon">${iconOnly("flag", "F")}</span>
	            <strong>Raccrocher les gants</strong>
	            <span class="choice-summary">Transformer la carriere en carte finale maintenant.</span>
	            <small>Hall of Fame</small>
	          </button>
        </div>
        ${mobileSwipeDeck(mobileChoices, {
          kicker: "Decision de carriere",
          title: "Continuer ?",
          summary: "Glisse selon ton instinct: une derniere saison ou la carte finale.",
        })}
      </section>
    `);
  }

	  function finalHistoryCampOpponent(text = "") {
	    const oldMatch = String(text).match(/^Camp\s+\d+\/\d+\s+vs\s+([^:]+):/);
	    if (oldMatch) return oldMatch[1].trim();
	    const newMatch = String(text).match(/^Camp de preparation contre\s+([^:]+):/);
	    if (newMatch) return newMatch[1].trim();
	    return "";
	  }

	  function formatFinalHistoryText(text = "") {
	    const opponent = finalHistoryCampOpponent(text);
	    if (opponent) return `Camps de preparation pour combat contre ${opponent}.`;
	    return text;
	  }

	  function finalHistoryRows(career) {
	    const rows = [];
	    const campOpponents = new Set();
	    [...(career.history || [])].reverse().forEach(row => {
	      if (rows.length >= 10) return;
	      const opponent = finalHistoryCampOpponent(row.text);
	      if (opponent) {
	        const key = normalizeFighterName(opponent);
	        if (campOpponents.has(key)) return;
	        campOpponents.add(key);
	      }
	      rows.push({
	        ...row,
	        text: formatFinalHistoryText(row.text),
	      });
	    });
	    return rows;
	  }

  function renderFinal() {
    const career = ui.finalCareer;
    const final = career.final || scoreCareer(career);
    const unlocked = final.unlockedNow || final.unlocked || [];
    const endReason = final.endReason || careerEndReason(career);
    const medicalEnd = endReason.toLowerCase().includes("blessures") || career.flags?.medicalRetirement;
    renderShell(`
      <section class="game-screen">
        ${medicalEnd ? `
          <div class="notice final-end-alert">
            <span class="final-end-icon">${iconOnly("heart-pulse", "M")}</span>
            <span>
              <strong>Carriere terminee</strong>
              <small>Le corps refuse une reprise de plus. Les medecins ferment le dossier professionnel.</small>
            </span>
          </div>
        ` : ""}
	        <div class="final-card" id="finalCard">
	          <span class="rank">${iconOnly("trophy", "#")} ${esc(final.rank)} | ${final.score} pts</span>
	          <h2>${esc(career.name)}</h2>
		          <p>${career.age} ans | ${career.country.label} | ${career.weight.label} | ${career.style.label} | ${esc(endReason)}</p>
	          <div class="card-stats">
	            <div class="card-stat"><span>${iconOnly("list-checks", "R")} Record</span><strong>${career.record.w}-${career.record.l}</strong></div>
	            <div class="card-stat"><span>${iconOnly("zap", "K")} Finitions</span><strong>${career.record.ko + career.record.sub}</strong></div>
	            <div class="card-stat"><span>${iconOnly("trophy", "T")} Ceintures</span><strong>${career.titles.length}</strong></div>
	            <div class="card-stat"><span>${iconOnly("circle-dollar-sign", "$")} Gains</span><strong>${formatMoney(career.money)}</strong></div>
	          </div>
	        </div>
        <div class="notice">+${final.tokenGain || 0} jetons gagnes. ${unlocked.length ? `${unlocked.length} nouveau badge debloque.` : "Aucun nouveau badge, mais la legende grandit."}</div>
        <div class="tabs">
          <button class="tab active" data-action="noop">Parcours</button>
        </div>
	        <div class="timeline">
	          ${finalHistoryRows(career).map(row => `
	            <div class="timeline-row">
              <strong>${row.age} ans</strong>
              <span>${esc(row.text)}</span>
            </div>
	          `).join("")}
	        </div>
		        <div class="legacy-grid">
		          <div class="legacy-panel">
		            <div class="panel-title">
		              <span>${iconOnly("swords", "R")} Rivalites</span>
		              <strong>${career.rivals?.length || 0}</strong>
		            </div>
		            ${(career.rivals || []).slice(0, 3).map(rival => `<p>${esc(rival.name)} | chaleur ${rival.heat || 1}/10</p>`).join("") || "<p>Aucune rivalite majeure.</p>"}
		          </div>
		          <div class="legacy-panel">
		            <div class="panel-title">
		              <span>${iconOnly("sparkles", "M")} Moments</span>
		              <strong>Signature</strong>
		            </div>
	            ${(career.moments || []).slice(-3).map(moment => `<p>${esc(moment)}</p>`).join("") || "<p>Une carriere propre, sans grand scandale.</p>"}
	          </div>
	        </div>
	        <div class="menu-actions">
	          <button class="btn btn-primary" data-action="new-career">${iconText("plus-circle", "Rejouer une carriere", "+")}</button>
	          <button class="btn" data-action="download-card">${iconText("download", "Telecharger la carte", "D")}</button>
	          <button class="btn" data-action="copy-share">${iconText("copy", "Copier le resume", "C")}</button>
        </div>
      </section>
    `);
  }

	  function renderBadges() {
	    if (ui.career) {
	      const catchUp = syncBadges(ui.career, { notify: false });
	      if (catchUp.unlockedNow.length) saveCareer();
	    }
	    const unlocked = ui.meta.badges || {};
	    renderShell(`
      <section class="game-screen">
        <div class="screen-head">
          <div>
            <p class="eyebrow">Meta-progression</p>
            <h2 class="screen-title">Badges</h2>
            <p class="screen-lead">${Object.keys(unlocked).length}/${BADGES.length} badges. Les jetons gagnent des avantages pour les prochaines carrieres.</p>
          </div>
        </div>
        <div class="badge-grid">
	          ${BADGES.map(badge => `
	            <div class="badge ${unlocked[badge.id] ? "" : "locked"}">
	              <strong>${iconOnly(unlocked[badge.id] ? "award" : "lock", unlocked[badge.id] ? "B" : "L")} ${unlocked[badge.id] ? "Debloque" : "Verrouille"} | ${esc(badge.title)}</strong>
	              <span>${esc(badge.text)}${unlocked[badge.id] ? ` Avec ${esc(unlocked[badge.id].fighter)}.` : ""}</span>
	            </div>
          `).join("")}
        </div>
      </section>
    `);
  }

  function renderPantheonList(entries = [], options = {}) {
    if (!entries.length) return `<div class="notice">${esc(options.empty || "Aucun combattant dans ce Pantheon pour le moment.")}</div>`;
    return `
      <div class="pantheon-list">
        ${entries.map((raw, index) => {
          const item = normalizeLocalPantheonEntry(raw);
          return `
            <article class="pantheon-card ${item.active ? "is-active" : ""}">
              <span class="pantheon-rank">#${index + 1}</span>
              <div class="pantheon-main">
                <span class="pantheon-status">${iconOnly(item.active ? "activity" : "trophy", "P")} ${item.active ? "Carriere active" : "Hall of Fame"}</span>
                <h3>${esc(item.name)}</h3>
                <strong>${esc(item.nickname)}</strong>
                <p>${esc(item.rank)} | ${esc(item.record)} | ${esc(item.org || "Organisation")} | ${item.finishes || 0} finition(s)</p>
              </div>
              <div class="pantheon-score">
                <strong>${item.score || 0}</strong>
                <span>pts</span>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderHall() {
    if (ui.career?.active) upsertLocalPantheon(ui.career, { save: true });
    const localEntries = (ui.meta.hall || []).map(normalizeLocalPantheonEntry)
      .sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
    const sharedEntries = sharedPantheonEntries();
    renderShell(`
      <section class="game-screen pantheon-screen">
        <div class="screen-head">
          <div>
            <p class="eyebrow">Pantheon</p>
            <h2 class="screen-title">Hall of Fame</h2>
            <p class="screen-lead">Les combattants entrent dans le Pantheon des qu'ils atteignent KSW, PFL ou UFC. Ensuite, chaque victoire, ceinture et gros moment fait grimper la plaque.</p>
          </div>
          <button class="btn" data-action="refresh-pantheon">${iconText("refresh-cw", "Actualiser commun", "R")}</button>
        </div>
        <div class="pantheon-grid">
          <section class="pantheon-section">
            <div class="panel-title">
              <span>${iconOnly("trophy", "P")} Pantheon local</span>
              <strong>${localEntries.length}</strong>
            </div>
            <p class="online-help">Vos legendes sur cet appareil, y compris les carrieres encore actives qui ont atteint une grosse organisation.</p>
            ${renderPantheonList(localEntries, {
              empty: ui.career?.active
                ? "Votre combattant doit atteindre KSW, PFL ou UFC pour ouvrir sa plaque locale."
                : "Aucune plaque locale pour le moment. Lancez une carriere ou reprenez une sauvegarde."
            })}
          </section>
          <section class="pantheon-section pantheon-shared">
            <div class="panel-title">
              <span>${iconOnly("globe-2", "C")} Pantheon commun</span>
              <strong>${sharedEntries.length}</strong>
            </div>
            <p class="online-help">Classement commun alimente par les carrieres connectees au leaderboard.</p>
            ${ui.online.leaderboardLoaded
              ? renderPantheonList(sharedEntries, { empty: "Aucun joueur connecte n'a encore atteint une grosse organisation." })
              : `<div class="notice online-neutral">${iconOnly("wifi", "O")} Connectez-vous ou actualisez pour charger le Pantheon commun.</div>`}
          </section>
        </div>
      </section>
    `);
  }

	  function renderShop() {
	    const equippedItems = ui.meta.equipped.map(id => SHOP.find(item => item.id === id)).filter(Boolean);
	    renderShell(`
	      <section class="game-screen">
	        <div class="screen-head">
	          <div>
	            <p class="eyebrow">${ui.meta.tokens} jetons</p>
	            <h2 class="screen-title">Boutique</h2>
	            <p class="screen-lead">Equipez jusqu'a deux avantages. Ils seront appliques au moment ou vous lancez une nouvelle carriere normale.</p>
	          </div>
	        </div>
	        <div class="notice perk-shop-notice">
	          ${iconOnly(equippedItems.length ? "check-circle-2" : "shopping-bag", "B")}
	          ${equippedItems.length ? `Actifs pour la prochaine carriere: ${esc(equippedItems.map(item => item.title).join(", "))}.` : "Aucun bonus equipe pour la prochaine carriere."}
	        </div>
	        <div class="choice-grid">
          ${SHOP.map(item => {
            const unlocked = ui.meta.unlocked[item.id];
            const equipped = ui.meta.equipped.includes(item.id);
	            return `
	              <button class="choice-btn" data-action="${unlocked ? "toggle-perk" : "buy-perk"}" data-id="${item.id}" ${!unlocked && ui.meta.tokens < item.cost ? "disabled" : ""}>
	                <span class="choice-icon">${iconOnly(equipped ? "check-circle-2" : unlocked ? "package-check" : "shopping-bag", "$")}</span>
	                <strong>${equipped ? "Equipe | " : unlocked ? "Debloque | " : ""}${esc(item.title)}</strong>
	                <span class="choice-summary">${esc(item.text)}</span>
		                <small>${equipped ? "Sera applique a la prochaine nouvelle carriere" : unlocked ? "Cliquer pour equiper" : `${item.cost} jetons`}</small>
	              </button>
            `;
          }).join("")}
        </div>
      </section>
    `);
  }

	  function onlineClient() {
	    if (ui.online.client) return ui.online.client;
	    if (!window.supabase?.createClient) return null;
	    ui.online.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
	      auth: {
	        persistSession: true,
	        autoRefreshToken: true,
	        detectSessionInUrl: true,
	      },
	    });
	    return ui.online.client;
	  }

	  function renderOnlineIfVisible() {
	    if (["online", "account", "onlineChallenge", "onlineChallengeResult", "menu", "hall"].includes(ui.view)) render();
	  }

  function waitForSupabaseClient(timeoutMs = 7000) {
    if (window.supabase?.createClient) return Promise.resolve(true);
    return new Promise(resolve => {
      const started = Date.now();
      const timer = window.setInterval(() => {
        if (window.supabase?.createClient) {
          window.clearInterval(timer);
          resolve(true);
        } else if (Date.now() - started >= timeoutMs) {
          window.clearInterval(timer);
          resolve(false);
        }
      }, 80);
    });
  }

	  async function initOnline() {
		    await waitForSupabaseClient();
		    const client = onlineClient();
		    if (!client) {
		      ui.online.error = "Service multijoueur indisponible. Rechargez la page ou reessayez plus tard.";
		      ui.online.ready = true;
		      renderOnlineIfVisible();
		      return;
		    }
	    try {
	      const { data } = await client.auth.getSession();
	      ui.online.session = data?.session || null;
	      if (ui.online.session) {
	        await loadOnlineProfile({ rerender: false });
	        await loadOnlineFighters({ rerender: false });
	        await loadOnlineChallenges({ rerender: false });
	        scheduleOnlineCareerSync(300);
	      }
	      await loadOnlineLeaderboard({ rerender: false });
	      client.auth.onAuthStateChange((_event, session) => {
	        ui.online.session = session || null;
	        ui.online.profile = null;
	        if (session) {
	          Promise.all([
	            loadOnlineProfile({ rerender: false }),
	            loadOnlineFighters({ rerender: false }),
	            loadOnlineChallenges({ rerender: false }),
	          ]).finally(() => {
	            scheduleOnlineCareerSync(300);
	            renderOnlineIfVisible();
	          });
	        } else {
	          ui.online.myFighters = [];
	          ui.online.notifications = [];
	          ui.online.challenges = [];
	          renderOnlineIfVisible();
	        }
	      });
	    } catch (error) {
		      ui.online.error = error?.message || "Connexion au service multijoueur impossible.";
	    } finally {
	      ui.online.ready = true;
	      renderOnlineIfVisible();
	    }
	  }

	  async function loadOnlineProfile(options = {}) {
	    const client = onlineClient();
	    const session = ui.online.session;
	    if (!client || !session?.user) return null;
	    const { data, error } = await client
	      .from("profiles")
	      .select("manager_name, updated_at")
	      .eq("user_id", session.user.id)
	      .maybeSingle();
	    if (!error && data) {
	      ui.online.profile = data;
	      ui.online.managerName = data.manager_name || ui.online.managerName;
	      saveOnlinePrefs();
	    }
	    if (options.rerender !== false) renderOnlineIfVisible();
	    return data || null;
	  }

	  async function loadOnlineFighters(options = {}) {
	    const client = onlineClient();
	    const session = ui.online.session;
	    if (!client || !session?.user) {
	      ui.online.myFighters = [];
	      return [];
	    }
	    const { data, error } = await client
	      .from("official_fighters")
	      .select("id,user_id,source,fighter_name,weight_class,country,style,org,org_tier,record_w,record_l,finishes_ko,finishes_sub,titles_count,belts,overall,hype,reputation,money,condition,career_age,season_year,score,rank_label,retired,published_at,updated_at,stats,snapshot")
	      .eq("user_id", session.user.id)
	      .order("score", { ascending: false })
	      .limit(5);
	    if (error) {
	      ui.online.error = `Combattants indisponibles: ${error.message}`;
	      if (options.rerender !== false) renderOnlineIfVisible();
	      return [];
	    }
	    ui.online.myFighters = Array.isArray(data) ? data : [];
	    if (!ui.online.selectedOwnFighterId && ui.online.myFighters[0]) {
	      ui.online.selectedOwnFighterId = ui.online.myFighters[0].id;
	    }
	    ensureActiveCareerFromOnlineFighters();
	    if (options.rerender !== false) renderOnlineIfVisible();
	    return ui.online.myFighters;
	  }

	  function ensureActiveCareerFromOnlineFighters() {
	    if (ui.career?.active || ui.view === "creator") return false;
	    const fighters = (ui.online.myFighters || []).filter(row => !row.retired);
	    if (!fighters.length) return false;
	    const preferred =
	      fighters.find(row => row.id === ui.online.activeFighterId) ||
	      fighters.find(row => row.id === ui.online.selectedOwnFighterId) ||
	      fighters[0];
	    const restored = careerFromOnlineFighter(preferred);
	    if (!restored?.active) return false;
	    restored.onlineFighterId = preferred.id;
	    restored.onlineSource = preferred.source || "beta_import";
	    restored.onlinePublishedAt = preferred.updated_at || preferred.published_at || restored.onlinePublishedAt || "";
	    ui.career = restored;
	    ui.finalCareer = null;
	    ui.resultChoice = null;
	    ui.online.selectedOwnFighterId = preferred.id;
	    ui.online.activeFighterId = preferred.id;
	    saveOnlinePrefs();
	    saveCareer();
	    archiveCareerLocally(restored, preferred);
	    return true;
	  }

	  async function loadOnlineChallenges(options = {}) {
	    const client = onlineClient();
	    const session = ui.online.session;
	    if (!client || !session?.user) {
	      ui.online.notifications = [];
	      ui.online.challenges = [];
	      return { notifications: [], challenges: [] };
	    }
	    const [{ data: notifications, error: notificationError }, { data: challenges, error: challengeError }] = await Promise.all([
	      client
	        .from("player_notifications")
	        .select("*")
	        .order("created_at", { ascending: false })
	        .limit(30),
	      client
	        .from("player_challenges")
	        .select("*")
	        .order("created_at", { ascending: false })
	        .limit(30),
	    ]);
	    if (notificationError || challengeError) {
	      ui.online.error = `Defis indisponibles: ${(notificationError || challengeError).message}`;
	    } else {
	      ui.online.notifications = Array.isArray(notifications) ? notifications : [];
	      ui.online.challenges = Array.isArray(challenges) ? challenges : [];
	    }
	    if (options.rerender !== false) renderOnlineIfVisible();
	    return {
	      notifications: ui.online.notifications,
	      challenges: ui.online.challenges,
	    };
	  }

	  async function saveOnlineProfileFromForm() {
	    const client = onlineClient();
	    const session = ui.online.session;
		    if (!client || !session?.user) {
		      showToast("Connectez-vous d'abord.");
		      ui.online.authOpen = true;
		      renderOnlineCurrentScreen();
		      return false;
		    }
		    const managerName = (document.querySelector("#onlineManager")?.value || ui.online.managerName || "").trim();
		    if (managerName.length < 2) {
		      showToast("Nom de manager trop court.");
		      ui.online.authOpen = true;
		      renderOnlineCurrentScreen();
		      return false;
		    }
		    ui.online.loading = true;
		    ui.online.success = "";
		    renderOnlineCurrentScreen();
	    const { error } = await client.from("profiles").upsert({
	      user_id: session.user.id,
	      manager_name: managerName,
	    });
	    ui.online.loading = false;
	    if (error) {
	      showToast(error.message.includes("duplicate") ? "Ce nom de manager est deja pris." : "Profil manager refuse.");
	      renderOnlineCurrentScreen();
	      return false;
		    }
		    ui.online.managerName = managerName;
		    ui.online.profile = { manager_name: managerName };
		    saveOnlinePrefs();
		    ui.online.success = "Profil manager enregistre.";
		    showToast("Manager enregistre.");
		    scheduleOnlineCareerSync(100);
		    renderOnlineCurrentScreen();
		    return true;
		  }

	  function readableAuthError(primaryError, fallbackError = null) {
	    const message = `${primaryError?.message || ""} ${fallbackError?.message || ""}`.toLowerCase();
	    if (message.includes("already") || message.includes("registered") || message.includes("exists")) {
	      return "Cet email existe deja: verifiez le mot de passe.";
	    }
	    if (message.includes("invalid") || message.includes("credential") || message.includes("password")) {
	      return "Email ou mot de passe incorrect. Si c'est votre premiere fois, renseignez aussi un nom de manager.";
	    }
	    return primaryError?.message || fallbackError?.message || "Connexion impossible.";
	  }

	  async function submitOnlineAuth(mode = "auto") {
		    const client = onlineClient();
		    if (!client) {
		      showToast("Service multijoueur indisponible.");
		      return;
		    }
	    const email = (document.querySelector("#onlineEmail")?.value || "").trim();
	    const password = document.querySelector("#onlinePassword")?.value || "";
	    const managerName = (document.querySelector("#onlineManager")?.value || "").trim();
	    if (!email || password.length < 6) {
	      showToast("Email requis et mot de passe 6 caracteres min.");
	      return;
	    }
	    if (mode === "signup" && managerName.length < 2) {
	      showToast("Choisissez un nom de manager.");
	      return;
	    }
	    ui.online.email = email;
	    if (managerName) ui.online.managerName = managerName;
	    saveOnlinePrefs();
		    ui.online.loading = true;
		    ui.online.error = "";
		    ui.online.success = "";
		    renderOnlineCurrentScreen();
	    let resolvedMode = mode;
	    let response;
	    if (mode === "auto") {
	      resolvedMode = "signin";
	      response = await client.auth.signInWithPassword({ email, password });
	      if (response.error) {
	        if (managerName.length < 2) {
	          ui.online.loading = false;
	          ui.online.error = "Compte introuvable ou mot de passe incorrect. Pour creer un compte, ajoutez un nom de manager.";
	          ui.online.authOpen = true;
	          renderOnlineCurrentScreen();
	          return;
	        }
	        const signinError = response.error;
	        const signupResponse = await client.auth.signUp({ email, password });
	        if (signupResponse.error) {
	          ui.online.loading = false;
	          ui.online.error = readableAuthError(signupResponse.error, signinError);
	          ui.online.authOpen = true;
	          renderOnlineCurrentScreen();
	          return;
	        }
	        response = signupResponse;
	        resolvedMode = "signup";
	      }
	    } else {
	      response = mode === "signup"
	        ? await client.auth.signUp({ email, password })
	        : await client.auth.signInWithPassword({ email, password });
	      resolvedMode = mode;
	    }
	    ui.online.loading = false;
		    if (response.error) {
		      ui.online.error = readableAuthError(response.error);
		      ui.online.authOpen = true;
		      renderOnlineCurrentScreen();
		      return;
		    }
		    ui.online.email = email;
		    ui.online.session = response.data?.session || (await client.auth.getSession()).data?.session || null;
		    saveOnlinePrefs();
			    if (ui.online.session && managerName) {
			      ui.online.managerName = managerName;
			      const { error: profileError } = await client.from("profiles").upsert({
			        user_id: ui.online.session.user.id,
			        manager_name: managerName,
			      });
			      if (profileError) {
			        ui.online.error = profileError.message.includes("duplicate") ? "Ce nom de manager est deja pris." : "Profil manager refuse.";
			        ui.online.authOpen = true;
			        renderOnlineCurrentScreen();
			        return;
			      }
			      ui.online.profile = { manager_name: managerName };
			      saveOnlinePrefs();
		    } else if (!ui.online.session) {
				      ui.online.success = "Compte cree. Connectez-vous pour synchroniser votre carriere.";
			      showToast("Compte cree.");
			    }
			    await loadOnlineProfile({ rerender: false });
			    if (ui.online.session) {
			      ui.online.authOpen = false;
			      if (currentPublishableCareer()) {
			        await syncCurrentCareerOnline({ fromAuth: true, silent: false, skipIfUnchanged: false });
			        return;
			      }
			      await loadOnlineFighters({ rerender: false });
			      await loadOnlineChallenges({ rerender: false });
			      await loadOnlineLeaderboard({ rerender: false });
			      ui.online.success = resolvedMode === "signup"
			        ? "Compte joueur cree."
			        : "Connexion reussie.";
			      scheduleOnlineCareerSync(250);
			    }
			    renderOnlineCurrentScreen();
			  }

	  async function signOutOnline() {
	    const client = onlineClient();
	    if (!client) return;
		    await client.auth.signOut();
		    ui.online.session = null;
		    ui.online.profile = null;
		    ui.online.lastPublish = null;
		    ui.online.myFighters = [];
		    ui.online.notifications = [];
		    ui.online.challenges = [];
		    ui.online.authOpen = false;
		    ui.online.success = "Deconnexion reussie. Vous pouvez continuer a jouer en local.";
		    renderOnlineCurrentScreen();
		  }

	  async function loadOnlineLeaderboard(options = {}) {
	    const client = onlineClient();
	    if (!client) return;
		    ui.online.loading = true;
		    ui.online.error = "";
		    if (options.rerender) renderOnlineCurrentScreen();
	    let { data, error } = await client
	      .from("leaderboard_all_public")
	      .select("*")
	      .order("score", { ascending: false })
	      .limit(80);
	    if (error) {
	      const fallback = await client
	        .from("leaderboard_public")
	        .select("*")
	        .order("score", { ascending: false })
	        .limit(50);
	      data = (fallback.data || []).map(row => ({ ...row, source: "official", public_status: "Officiel" }));
	      error = fallback.error;
	    }
	    ui.online.loading = false;
	    if (error) {
	      ui.online.error = `Classement indisponible: ${error.message}`;
	    } else {
	      ui.online.leaderboard = Array.isArray(data) ? data : [];
	      ui.online.leaderboardLoaded = true;
	      if (!ui.online.selectedFighterId && ui.online.leaderboard[0]) {
	        ui.online.selectedFighterId = ui.online.leaderboard[0].fighter_id;
	      }
	    }
	    if (options.rerender !== false) renderOnlineCurrentScreen();
	  }

	  function onlineFighterPayload(career, source = "beta_import") {
	    const titles = (career.titles || []).map(title => ({
	      label: title.label || title.org || "Ceinture",
	      tier: clamp(title.tier ?? career.tier ?? 0, 0, 5),
	    }));
	    return {
	      source,
	      importType: source,
	      managerName: ui.online.managerName,
	      fighter: {
	        source,
	        name: career.name,
	        weightClass: career.weight?.label || "Unknown",
	        country: career.country?.label || "",
	        style: career.style?.label || "",
	        org: ORGS[career.tier]?.label || career.org?.label || "Souterrain",
	        orgTier: career.tier || 0,
	        record: career.record || { w: 0, l: 0, ko: 0, sub: 0 },
	        titles,
	        overall: overall(career),
	        hype: career.hype || 0,
	        reputation: career.rep || 0,
	        money: career.money || 0,
	        condition: career.condition ?? 70,
	        age: career.age || 18,
	        seasonYear: career.season?.year || career.year || CURRENT_YEAR,
	        stats: career.stats || {},
	        retired: !career.active,
	        runId: career.officialRunId || "",
	        snapshot: {
	          saveVersion: career.saveVersion || SAVE_VERSION,
	          source,
	          importedAt: new Date().toISOString(),
	          phase: career.phase || "",
	          year: career.year || CURRENT_YEAR,
	          season: career.season ? {
	            year: career.season.year,
	            fightsDone: career.season.fightsDone || 0,
	            fightsTarget: career.season.fightsTarget || 0,
	          } : null,
	          rank: career.rank,
	          seed: career.seed,
	        },
	      },
	    };
	  }

	  function onlineCareerSyncKey(career) {
	    if (!career) return "";
	    return JSON.stringify({
	      name: career.name,
	      country: career.country?.label || career.country?.id || "",
	      weight: career.weight?.label || career.weight?.id || "",
	      style: career.style?.label || career.style?.id || "",
	      tier: career.tier || 0,
	      org: ORGS[career.tier]?.label || career.org?.label || "",
	      record: career.record || {},
	      titles: (career.titles || []).map(title => ({
	        label: title.label || title.org || "",
	        tier: title.tier || 0,
	        defenses: title.defenses || 0,
	        lost: Boolean(title.lost),
	      })),
	      stats: career.stats || {},
	      money: career.money || 0,
	      rep: career.rep || 0,
	      hype: career.hype || 0,
	      condition: career.condition || 0,
	      age: career.age || 0,
	      year: career.year || CURRENT_YEAR,
	      season: career.season ? {
	        year: career.season.year,
	        fightsDone: career.season.fightsDone || 0,
	        fightsTarget: career.season.fightsTarget || 0,
	      } : null,
	      active: Boolean(career.active),
	    });
	  }

	  function onlineManagerReady() {
	    return Boolean((ui.online?.managerName || ui.online?.profile?.manager_name || "").trim().length >= 2);
	  }

	  function scheduleOnlineCareerSync(delay = 1200) {
	    if (!ui?.online?.session || !ui.career?.active || !onlineManagerReady()) return;
	    const key = onlineCareerSyncKey(ui.career);
	    if (!key || key === ui.online.lastSyncKey || ui.online.syncInFlight) return;
	    if (ui.online.syncTimer) window.clearTimeout(ui.online.syncTimer);
	    ui.online.syncTimer = window.setTimeout(() => {
	      ui.online.syncTimer = null;
	      syncCurrentCareerOnline({ silent: true });
	    }, delay);
	  }

	  function currentPublishableCareer() {
	    if (ui.career?.active) return ui.career;
	    if (ui.finalCareer) return ui.finalCareer;
	    return null;
	  }

	  async function syncCurrentCareerOnline(options = {}) {
	    const career = currentPublishableCareer();
	    const key = onlineCareerSyncKey(career);
	    if (!career || !ui.online.session || !onlineManagerReady()) return false;
	    if (options.skipIfUnchanged !== false && key && key === ui.online.lastSyncKey) return true;
	    if (ui.online.syncInFlight) return false;
	    ui.online.syncInFlight = true;
	    try {
	      const ok = await importCurrentCareerOnline({
	        ...options,
	        silent: options.silent !== false,
	        auto: true,
	        syncKey: key,
	      });
	      return ok;
	    } finally {
	      ui.online.syncInFlight = false;
	    }
	  }

		  async function importCurrentCareerOnline(options = {}) {
		    const silent = Boolean(options.silent);
		    const client = onlineClient();
			    const career = currentPublishableCareer();
			    if (!client || !ui.online.session) {
			      if (!silent) {
			        ui.online.authOpen = true;
			        renderOnlineCurrentScreen();
			        showToast("Connectez-vous pour synchroniser.");
			      }
			      return false;
			    }
		    if (!career) {
		      if (!silent) showToast("Aucune carriere en cours a synchroniser.");
		      return false;
		    }
		    const formManagerName = (document.querySelector("#onlineManager")?.value || "").trim();
		    if (formManagerName) {
		      ui.online.managerName = formManagerName;
		      saveOnlinePrefs();
		    }
			    if (!ui.online.managerName || ui.online.managerName.trim().length < 2) {
			      if (!silent) {
			        ui.online.authOpen = true;
				        renderOnlineCurrentScreen();
			        showToast("Ajoutez votre nom de manager avant la synchronisation.");
			      }
			      return false;
			    }
			    if (!silent) ui.online.loading = true;
			    ui.online.error = "";
			    if (!silent) ui.online.success = "";
				    if (!options.fromAuth && !silent) renderOnlineCurrentScreen();
		    const { data, error } = await client.functions.invoke("publish-fighter", {
		      body: onlineFighterPayload(career, "beta_import"),
		    });
		    if (!silent) ui.online.loading = false;
		    if (error || data?.error) {
		      ui.online.error = data?.details || data?.error || error?.message || "Synchronisation refusee.";
		      renderOnlineIfVisible();
		      return false;
		    }
			    ui.online.lastPublish = data;
			    if (!silent) {
			      ui.online.success = data?.fighter?.verified
			        ? "Votre carriere officielle a bien ete publiee dans le classement."
			        : "Votre carriere est synchronisee dans le leaderboard.";
			    }
			    ui.online.lastSyncKey = options.syncKey || onlineCareerSyncKey(career);
			    if (data?.fighter?.id) {
			      career.onlineFighterId = data.fighter.id;
			      career.onlineSource = data.fighter.source || "beta_import";
			      career.onlinePublishedAt = new Date().toISOString();
			      ui.online.selectedFighterId = data.fighter.id;
			      ui.online.selectedOwnFighterId = data.fighter.id;
			      ui.online.activeFighterId = data.fighter.id;
			      saveOnlinePrefs();
			      saveCareer();
			      archiveCareerLocally(career, {
			        id: data.fighter.id,
			        source: data.fighter.source || "beta_import",
			        fighter_name: career.name,
			      });
			    }
			    if (!silent) showToast(data?.fighter?.verified ? "Carriere publiee." : "Carriere synchronisee.");
			    await loadOnlineFighters({ rerender: false });
			    await loadOnlineChallenges({ rerender: false });
			    await loadOnlineLeaderboard({ rerender: false });
				    if (silent) renderOnlineIfVisible();
				    else renderOnlineCurrentScreen();
				    return true;
			  }

		  async function saveCurrentAndStartNewCareer() {
		    const career = currentPublishableCareer();
		    if (!ui.online.session && career) {
		      ui.view = "account";
		      ui.online.authOpen = true;
		      renderOnlineAccountScreen();
		      showToast("Connectez-vous pour garder cette carriere avant d'en ajouter une.");
		      return;
		    }
		    if (ui.online.session && career) {
		      const synced = await syncCurrentCareerOnline({ fromAuth: true, silent: false, skipIfUnchanged: false });
		      if (!synced) return;
		    }
		    startNewCareerCreation();
		    if (career) showToast("Carriere conservee. Nouvelle creation lancee.");
		  }

		  async function switchToOnlineFighter(fighterId, options = {}) {
		    const row = (ui.online.myFighters || []).find(fighter => fighter.id === fighterId);
		    if (!row) {
		      showToast("Combattant introuvable.");
		      return;
		    }
		    if (row.retired) {
		      showToast("Cette carriere est terminee.");
		      return;
		    }
		    const current = ui.career?.active ? ui.career : null;
		    const sameAsCurrent = onlineRowMatchesCareer(row, current);
		    if (current && !sameAsCurrent) {
		      const currentOnlineRow = (ui.online.myFighters || []).find(fighter => onlineRowMatchesCareer(fighter, current));
		      archiveCareerLocally(current, currentOnlineRow || null);
		      if (options.saveCurrent) {
		        const currentAlreadyPublished = currentCareerAlreadyPublished(current);
		        if (!currentAlreadyPublished && (ui.online.myFighters || []).length >= 5) {
		          showToast("Ecurie pleine: impossible de garder la carriere actuelle.");
		          return;
		        }
		        const synced = await syncCurrentCareerOnline({ fromAuth: true, silent: false, skipIfUnchanged: false });
		        if (!synced) return;
		      }
		    }
		    const restored = careerFromOnlineFighter(row);
		    if (!restored?.active) {
		      showToast("Carriere non jouable.");
		      return;
		    }
		    restored.onlineFighterId = row.id;
		    restored.onlineSource = row.source || "beta_import";
		    restored.onlinePublishedAt = row.updated_at || row.published_at || restored.onlinePublishedAt || "";
		    ui.career = restored;
		    ui.finalCareer = null;
		    ui.resultChoice = null;
		    ui.online.selectedOwnFighterId = row.id;
		    ui.online.activeFighterId = row.id;
		    ui.online.success = `${restored.name} est maintenant votre carriere active.`;
		    saveOnlinePrefs();
		    clearCreatorDraft();
		    saveCareer();
		    archiveCareerLocally(restored, row);
		    ui.view = viewForPhase(restored.phase);
		    render();
		    showToast(`${restored.name} charge.`);
		  }

		  function renderOnlineAuthBlock(career) {
		    const session = ui.online.session;
		    const email = session?.user?.email || ui.online.email || "";
		    if (session) {
		      return `
		        <div class="online-panel">
		          <div class="panel-title">
		            <span>${iconOnly("shield-check", "C")} Espace manager</span>
		            <strong>Connecte</strong>
		          </div>
		          <div class="online-account-grid">
		            <label>
		              <span>Email</span>
	              <input id="onlineEmail" type="email" value="${esc(email)}" disabled>
	            </label>
	            <label>
	              <span>Manager public</span>
	              <input id="onlineManager" maxlength="32" value="${esc(ui.online.managerName || ui.online.profile?.manager_name || "")}" placeholder="Ex: Arnaud">
	            </label>
	          </div>
		          <div class="menu-actions online-actions">
		            <button class="btn btn-primary" data-action="save-online-profile">${iconText("save", "Sauver manager", "S")}</button>
			            ${career ? `<button class="btn" data-action="sync-current-career">${iconText("refresh-cw", "Synchroniser maintenant", "S")}</button>` : ""}
			            <button class="btn btn-light" data-action="online-signout">${iconText("log-out", "Deconnexion", "D")}</button>
		          </div>
		          <div class="notice online-local-save">
		            ${iconOnly("database", "B")} ${career ? `Synchro automatique active pour ${esc(career.name)} (${career.record.w}-${career.record.l}).` : "Aucune carriere locale active sur cet appareil."}
		          </div>
		        </div>
		      `;
		    }
		    return `
			      <div class="online-panel">
		        <div class="panel-title">
		          <span>${iconOnly("user-round", "C")} Se connecter</span>
		          <strong>Compte joueur</strong>
		        </div>
			        <p class="online-help">Le jeu reste jouable sans compte. Entrez un email, un mot de passe et un manager: si le compte n'existe pas encore, il sera cree automatiquement.</p>
			        ${career ? `
			          <div class="notice online-local-save">
			            ${iconOnly("refresh-cw", "S")} Carriere en cours detectee: ${esc(career.name)} (${career.record.w}-${career.record.l}). Elle sera synchronisee automatiquement apres connexion.
			          </div>
			        ` : ""}
	        <div class="online-account-grid">
	          <label>
	            <span>Email</span>
	            <input id="onlineEmail" type="email" autocomplete="email" value="${esc(ui.online.email || "")}" placeholder="joueur@mail.com">
	          </label>
	          <label>
	            <span>Mot de passe</span>
	            <input id="onlinePassword" type="password" autocomplete="current-password" placeholder="6 caracteres minimum">
	          </label>
	          <label>
	            <span>Manager public</span>
	            <input id="onlineManager" maxlength="32" value="${esc(ui.online.managerName || "")}" placeholder="Ex: Arnaud">
	          </label>
	        </div>
	        <div class="menu-actions online-actions">
		          <button class="btn btn-primary" data-action="online-auth-continue">${iconText("log-in", "Se connecter", "C")}</button>
	        </div>
	      </div>
	    `;
	  }

	  function onlineFighterSourceLabel(row = {}) {
	    return row.source === "official" ? "Officiel" : "Carriere en cours";
	  }

	  function currentCareerAlreadyPublished(career) {
	    if (!career) return false;
	    return (ui.online.myFighters || []).some(row => (
	      row.id === career.onlineFighterId ||
	      (row.source === "beta_import" && sameFighterName(row.fighter_name, career.name))
	    ));
	  }

	  function renderOnlineFighterCard(row, index = 0, career = null, atLimit = false) {
	    const snapshot = onlineFighterSnapshot(row);
	    const fighterId = row.id || row.fighter_id || "";
	    const selected = ui.online.selectedOwnFighterId === fighterId;
	    const active = onlineRowMatchesCareer(row, career || ui.career);
	    const currentNeedsImport = Boolean(career?.active && !active && !currentCareerAlreadyPublished(career));
	    const actionLabel = row.retired
	      ? "Terminee"
	      : active
	        ? "Actif"
	        : currentNeedsImport && atLimit
	          ? "Bloque"
	          : "Voir carriere";
	    return `
	      <button class="online-fighter-card ${selected ? "selected" : ""} ${active ? "is-active" : ""}" data-action="select-own-fighter" data-id="${esc(fighterId)}">
	        <span class="leaderboard-rank">#${index + 1}</span>
	        <div class="online-fighter-main">
	          <strong>${esc(snapshot.name)}</strong>
	          <small>${active ? "Actif | " : ""}${esc(snapshot.weightClass || "Categorie")} | ${esc(snapshot.style?.label || row.style || "MMA")} | ${esc(snapshot.org || "Organisation")}</small>
	        </div>
	        <div class="online-fighter-meta">
	          <b>${snapshot.score || 0} pts</b>
	          <small>${snapshot.record?.w || 0}-${snapshot.record?.l || 0} | OVR ${snapshot.overall || "-"}</small>
	          <span class="online-fighter-cta">${esc(actionLabel)}</span>
	        </div>
	      </button>
	    `;
	  }

	  function renderOnlineSwitchPanel(row, career, atLimit = false) {
	    if (!row) {
	      return `<div class="notice online-neutral">${iconOnly("mouse-pointer-click", "C")} Cliquez sur un combattant de votre ecurie pour afficher sa carriere.</div>`;
	    }
	    const snapshot = onlineFighterSnapshot(row);
	    const active = onlineRowMatchesCareer(row, career);
	    const currentNeedsImport = Boolean(career?.active && !active && !currentCareerAlreadyPublished(career));
	    if (row.retired) {
	      return `
	        <div class="online-switch-panel">
	          <div class="panel-title">
	            <span>${iconOnly("archive", "T")} ${esc(snapshot.name)}</span>
	            <strong>Terminee</strong>
	          </div>
	          <p>Cette carriere est terminee. Elle reste dans le classement, mais elle ne peut pas redevenir la carriere jouable.</p>
	        </div>
	      `;
	    }
	    return `
	      <div class="online-switch-panel">
	        <div class="panel-title">
	          <span>${iconOnly(active ? "circle-check" : "user-round-check", "P")} Carriere de ${esc(snapshot.name)}</span>
	          <strong>${active ? "Active" : "Disponible"}</strong>
	        </div>
	        <p>${active
	          ? "Vous etes deja en train de jouer cette carriere."
	          : currentNeedsImport
	            ? "Cette carriere peut devenir la carriere jouable. La carriere active actuelle restera disponible dans votre compte."
	            : "Cette carriere peut devenir la carriere jouable sur cet appareil."}</p>
	        ${currentNeedsImport && atLimit ? `<div class="notice online-error">${iconOnly("triangle-alert", "L")} Ecurie pleine: impossible de prendre cette carriere en main sans liberer une place.</div>` : ""}
	        <div class="menu-actions online-actions">
	          <button class="btn btn-primary" data-action="switch-online-fighter" data-id="${esc(row.id)}" data-save-current="${currentNeedsImport ? "1" : "0"}" ${active || (currentNeedsImport && atLimit) ? "disabled" : ""}>
	            ${iconText(active ? "circle-check" : "user-round-check", active ? "Carriere active" : "Prendre en main cette carriere", "P")}
	          </button>
	        </div>
	      </div>
	    `;
	  }

	  function renderOnlineFightersPanel(career) {
	    const fighters = ui.online.myFighters || [];
	    const alreadyPublished = currentCareerAlreadyPublished(career);
	    const atLimit = fighters.length >= 5 && !alreadyPublished;
	    const selectedOwn = fighters.find(row => (row.id || row.fighter_id) === ui.online.selectedOwnFighterId) || fighters[0] || null;
	    return `
	      <div class="online-panel online-stable-panel">
	        <div class="panel-title">
	          <span>${iconOnly("users", "C")} Combattants</span>
	          <strong>${fighters.length}/5</strong>
	        </div>
	        <p class="online-help">Votre compte peut garder jusqu'a 5 combattants. Quand vous etes connecte, la carriere active est synchronisee automatiquement dans le leaderboard.</p>
	        ${career ? `
	          <div class="online-current-career">
	            <span>${iconOnly("database", "L")} Carriere locale</span>
	            <strong>${esc(career.name)} (${career.record.w}-${career.record.l})</strong>
	            <small>${esc(career.weight?.label || "Categorie")} | ${esc(career.style?.label || "Style")} | OVR ${overall(career)}</small>
	          </div>
	          ${atLimit ? `<div class="notice online-error">${iconOnly("triangle-alert", "L")} Limite atteinte: vous avez deja 5 combattants. Cette carriere doit rester locale tant qu'une place n'est pas liberee.</div>` : ""}
	          <div class="menu-actions online-actions">
	            <button class="btn btn-primary" data-action="sync-current-career" ${atLimit ? "disabled" : ""}>${iconText("refresh-cw", "Synchroniser maintenant", "S")}</button>
	            ${atLimit
	              ? `<button class="btn" disabled>${iconText("lock", "Ecurie pleine", "L")}</button>`
	              : `<button class="btn" data-action="save-and-new-career">${iconText("plus-circle", "Commencer une nouvelle carriere", "+")}</button>`}
	          </div>
	          ${atLimit ? "" : `<p class="online-help">La carriere actuelle reste dans Combattants avant d'ouvrir la creation suivante.</p>`}
	        ` : `
	          <div class="notice online-neutral">${iconOnly("plus-circle", "N")} Aucune carriere locale active. Vous pouvez lancer une nouvelle carriere sans toucher a votre ecurie en ligne.</div>
	          <div class="menu-actions online-actions">
	            <button class="btn btn-primary" data-action="new-career">${iconText("plus-circle", "Nouvelle carriere", "+")}</button>
	          </div>
	        `}
	      </div>
	      <div class="online-panel">
	        <div class="panel-title">
	          <span>${iconOnly("dumbbell", "E")} Ecurie en ligne</span>
	          <strong>${fighters.length}</strong>
	        </div>
	        ${fighters.length ? `
	          <div class="online-fighter-list">
	            ${fighters.map((row, index) => renderOnlineFighterCard(row, index, career, atLimit)).join("")}
	          </div>
	          ${renderOnlineSwitchPanel(selectedOwn, career, atLimit)}
	        ` : `<div class="notice">Aucun combattant publie pour ce compte. Lancez une carriere pendant que vous etes connecte: elle entrera automatiquement dans le classement.</div>`}
	      </div>
	    `;
	  }

	  function renderOnlineChallengesPanel() {
	    const notifications = ui.online.notifications || [];
	    const challenges = ui.online.challenges || [];
	    const unread = notifications.filter(item => !item.read_at).length;
	    return `
	      <div class="online-panel">
	        <div class="panel-title">
	          <span>${iconOnly("bell", "N")} Notifications</span>
	          <strong>${unread}</strong>
	        </div>
	        ${notifications.length ? `
	          <div class="notification-list">
	            ${notifications.map(item => `
	              <div class="notification-row ${item.read_at ? "" : "unread"}">
	                <strong>${esc(item.title || "Notification")}</strong>
	                <span>${esc(item.body || "")}</span>
	                <small>${esc(new Date(item.created_at).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }))}</small>
	              </div>
	            `).join("")}
	          </div>
	        ` : `<div class="notice">Aucune notification pour le moment. Les defis envoyes par vos potes arriveront ici.</div>`}
	      </div>
	      <div class="online-panel">
	        <div class="panel-title">
	          <span>${iconOnly("swords", "D")} Defis</span>
	          <strong>${challenges.length}</strong>
	        </div>
	        ${challenges.length ? `
	          <div class="challenge-list">
	            ${challenges.map(challenge => {
	              const sent = challenge.challenger_user_id === ui.online.session?.user?.id;
	              const you = sent ? challenge.challenger_snapshot : challenge.target_snapshot;
	              const them = sent ? challenge.target_snapshot : challenge.challenger_snapshot;
	              const result = challenge.result || {};
	              return `
	                <div class="challenge-row">
	                  <div>
	                    <strong>${sent ? "Vous defiez" : "Defi recu"} ${esc(them?.name || "Combattant")}</strong>
	                    <small>${esc(you?.name || "Votre combattant")} vs ${esc(them?.name || "Adversaire")} | ${esc(challenge.status || "pending")}</small>
	                    ${challenge.status === "completed" ? `<span>${esc(result.winnerName || "Vainqueur")} par ${esc(result.scoreText || "decision")}</span>` : ""}
	                  </div>
	                  ${sent && challenge.status === "pending" ? `<button class="btn btn-primary" data-action="start-online-challenge" data-id="${esc(challenge.id)}">${iconText("play", "Combattre", ">")}</button>` : ""}
	                </div>
	              `;
	            }).join("")}
	          </div>
	        ` : `<div class="notice">Aucun defi actif. Allez dans Joueurs, selectionnez un combattant compatible, puis lancez le defi.</div>`}
	      </div>
	    `;
	  }

	  function renderOnlineAccountTabs(career) {
	    const tab = ui.online.accountTab || "fighters";
	    const items = [
	      { id: "fighters", label: "Combattants", icon: "users" },
	      { id: "challenges", label: "Defis", icon: "swords" },
	      { id: "profile", label: "Profil", icon: "user-round-cog" },
	    ];
	    const panel = tab === "challenges"
	      ? renderOnlineChallengesPanel()
	      : tab === "profile"
	        ? renderOnlineAuthBlock(career)
	        : renderOnlineFightersPanel(career);
	    return `
	      <div class="tabs online-tabs">
	        ${items.map(item => `
	          <button class="tab ${tab === item.id ? "active" : ""}" data-action="online-account-tab" data-tab="${item.id}">
	            ${iconOnly(item.icon, "T")} ${item.label}
	          </button>
	        `).join("")}
	      </div>
	      <div class="online-account-layout online-account-wide">
	        ${panel}
	      </div>
	    `;
	  }

	  function renderLeaderboardRows(rows) {
	    if (!rows.length) {
	      return `<div class="notice">Aucun combattant publie pour le moment. Le premier testeur va prendre toute la lumiere.</div>`;
	    }
	    return `
	      <div class="leaderboard-list">
	        ${rows.map((row, index) => {
	          const selected = ui.online.selectedFighterId === row.fighter_id;
	          const source = row.source === "beta_import" ? "Carriere en cours" : "Officiel";
	          return `
	            <button class="leaderboard-row ${selected ? "selected" : ""}" data-action="select-online-fighter" data-id="${esc(row.fighter_id)}">
	              <span class="leaderboard-rank">#${row.leaderboard_rank || index + 1}</span>
	              <span class="leaderboard-main">
	                <strong>${esc(row.fighter_name)}</strong>
	                <small>Manager: ${esc(row.manager_name || "Inconnu")} | ${esc(row.org || "Org")} | ${esc(row.weight_class || "Categorie")}</small>
	              </span>
	              <span class="leaderboard-score">
	                <strong>${row.score || 0}</strong>
	                <small>${esc(source)}</small>
	              </span>
	            </button>
	          `;
	        }).join("")}
	      </div>
	    `;
	  }

	  function renderOnlineChallengeBox(row) {
	    if (!row) return "";
	    if (!ui.online.session) {
	      return `
	        <div class="online-challenge-box">
	          <p>Connectez-vous pour envoyer un defi a ${esc(row.manager_name || "ce manager")}.</p>
	          <button class="btn btn-primary" data-action="show-account">${iconText("log-in", "Se connecter", "C")}</button>
	        </div>
	      `;
	    }
	    const ownFighters = ui.online.myFighters || [];
	    const isOwn = ownFighters.some(fighter => fighter.id === row.fighter_id);
	    if (isOwn) {
	      return `<div class="notice online-neutral">${iconOnly("shield", "S")} C'est votre combattant. Le sparring interne viendra plus tard, ici on defie les autres managers.</div>`;
	    }
	    if (!ownFighters.length) {
	      return `
	        <div class="online-challenge-box">
	          <p>Connectez-vous avec une carriere active pour lancer des defis. Votre combattant rejoindra le classement automatiquement.</p>
	          ${currentPublishableCareer()
	            ? `<button class="btn" data-action="sync-current-career">${iconText("refresh-cw", "Synchroniser maintenant", "S")}</button>`
	            : `<button class="btn" data-action="show-account">${iconText("log-in", "Se connecter", "C")}</button>`}
	        </div>
	      `;
	    }
	    const compatible = ownFighters.filter(fighter => challengeWeightCompatible(fighter, row));
	    if (!compatible.length) {
	      return `
	        <div class="notice online-neutral">
	          ${iconOnly("scale", "P")} Aucun de vos combattants n'est compatible avec ${esc(row.fighter_name)}. Il faut la meme categorie, une au-dessus ou une en-dessous.
	        </div>
	      `;
	    }
	    return `
	      <div class="online-challenge-box">
	        <div class="panel-title">
	          <span>${iconOnly("swords", "D")} Defier ${esc(row.manager_name || "ce manager")}</span>
	          <strong>${compatible.length}</strong>
	        </div>
	        <p>Choisissez le combattant qui lance le defi. Le combat se joue ensuite tout de suite avec vos decisions de round.</p>
	        <div class="challenge-launch-list">
	          ${compatible.map(fighter => {
	            const snapshot = onlineFighterSnapshot(fighter);
	            return `
	              <button class="btn btn-primary" data-action="send-challenge" data-target="${esc(row.fighter_id)}" data-challenger="${esc(fighter.id)}">
	                ${iconText("swords", `${snapshot.name} (${snapshot.weightClass})`, "D")}
	              </button>
	            `;
	          }).join("")}
	        </div>
	      </div>
	    `;
	  }

		  function renderOnlineFighterDetail(row) {
		    if (!row) {
		      return `
		        <div class="online-detail online-empty">
		          <div class="panel-title">
		            <span>${iconOnly("users", "J")} Combattant selectionne</span>
		            <strong>Vide</strong>
		          </div>
		          <h3>Aucun combattant</h3>
		          <p>Connectez-vous avec une carriere active ou revenez quand un autre testeur aura publie son combattant.</p>
		        </div>
		      `;
		    }
		    const source = row.source === "beta_import" ? "Carriere en cours" : "Carriere officielle";
		    return `
		      <div class="online-detail">
	        <div class="panel-title">
	          <span>${iconOnly(row.source === "beta_import" ? "flask-conical" : "shield-check", "F")} ${esc(source)}</span>
	          <strong>${row.score || 0} pts</strong>
	        </div>
	        <h3>${esc(row.fighter_name)}</h3>
	        <p>Manager: ${esc(row.manager_name || "Inconnu")}</p>
	        <div class="summary-grid">
	          <div class="summary-item"><span>${iconOnly("list-checks", "R")} Record</span><strong>${row.record_w || 0}-${row.record_l || 0}</strong></div>
	          <div class="summary-item"><span>${iconOnly("gauge", "O")} OVR</span><strong>${row.overall || "-"}</strong></div>
	          <div class="summary-item"><span>${iconOnly("flame", "H")} Hype</span><strong>${row.hype || 0}</strong></div>
	          <div class="summary-item"><span>${iconOnly("circle-dollar-sign", "$")} Gains</span><strong>${formatMoney(row.money || 0)}</strong></div>
	        </div>
	        <p>${esc(row.country || "Pays inconnu")} | ${esc(row.style || "Style inconnu")} | ${esc(row.org || "Organisation")} | ${row.titles_count || 0} ceinture(s)</p>
	        ${renderOnlineChallengeBox(row)}
	      </div>
	    `;
	  }

	  function renderOnlineCurrentScreen() {
		    if (ui.view === "account") renderOnlineAccountScreen();
		    else if (ui.view === "hall") renderHall();
		    else renderOnlineScreen();
		  }

		  function safeOnlineRefresh(task) {
		    Promise.resolve()
		      .then(task)
		      .catch(error => {
		        ui.online.error = error?.message || "Chargement multijoueur interrompu.";
		        renderOnlineIfVisible();
		      });
		  }

		  function renderOnlineScreen() {
		    const career = currentPublishableCareer();
		    const rows = ui.online.leaderboard || [];
		    const selected = rows.find(row => row.fighter_id === ui.online.selectedFighterId) || rows[0];
		    const officialCount = rows.filter(row => row.source !== "beta_import").length;
		    const betaCount = rows.filter(row => row.source === "beta_import").length;
		    renderShell(`
		      <section class="game-screen online-screen">
		        ${ui.career ? fighterHeader(ui.career) : ""}
		        <div class="screen-head online-head">
		          <div>
		            <p class="eyebrow">Leaderboard joueurs</p>
		            <h2 class="screen-title">Managers et combattants</h2>
			            <p class="screen-lead">Classement public des testeurs. Les comptes et la synchronisation des carrieres se gerent dans l'onglet Compte.</p>
			          </div>
			          <div class="online-head-actions">
			            <button class="btn" data-action="refresh-online">${iconText("refresh-cw", "Actualiser", "R")}</button>
			          </div>
			        </div>
			        ${ui.online.success ? `<div class="notice online-success">${iconOnly("circle-check", "S")} ${esc(ui.online.success)}</div>` : ""}
			        ${ui.online.error ? `<div class="notice online-error">${iconOnly("triangle-alert", "E")} ${esc(ui.online.error)}</div>` : ""}
		        <div class="online-board-grid online-board-primary">
		          <div class="online-panel online-ranking-panel">
		            <div class="panel-title">
		              <span>${iconOnly("trophy", "C")} Classement joueurs</span>
		              <strong>${rows.length}</strong>
		            </div>
		            <p class="online-help">${officialCount} officiel${officialCount > 1 ? "s" : ""} | ${betaCount} carriere${betaCount > 1 ? "s" : ""} en cours</p>
		            ${renderLeaderboardRows(rows)}
		          </div>
		          <div class="online-side-stack">
		            ${renderOnlineFighterDetail(selected)}
		          </div>
		        </div>
			      </section>
			    `);
		  }

		  function renderOnlineAccountScreen() {
		    const career = currentPublishableCareer();
		    renderShell(`
		      <section class="game-screen online-screen online-account-screen">
		        ${ui.career ? fighterHeader(ui.career) : ""}
		        <div class="screen-head online-head">
		          <div>
		            <p class="eyebrow">Compte joueur</p>
		            <h2 class="screen-title">${ui.online.session ? "Espace manager" : "Se connecter"}</h2>
		            <p class="screen-lead">Le jeu reste jouable sans compte. Cette zone sert au classement, a la synchronisation des carrieres et aux futures fonctions multi.</p>
		          </div>
		          <div class="online-head-actions">
		            <button class="btn" data-action="show-online">${iconText("users", "Voir joueurs", "J")}</button>
		          </div>
		        </div>
		        ${ui.online.success ? `<div class="notice online-success">${iconOnly("circle-check", "S")} ${esc(ui.online.success)}</div>` : ""}
		        ${ui.online.error ? `<div class="notice online-error">${iconOnly("triangle-alert", "E")} ${esc(ui.online.error)}</div>` : ""}
		        ${!ui.online.session ? `
		          <div class="notice online-neutral">
		            ${iconOnly("gamepad-2", "J")} Sans compte, vos sauvegardes locales restent intactes. Connectez-vous seulement pour afficher votre carriere dans le classement.
		          </div>
		        ` : ""}
		        ${ui.online.session ? renderOnlineAccountTabs(career) : `
		          <div class="online-account-layout">
		            ${renderOnlineAuthBlock(career)}
		          </div>
		        `}
		      </section>
		    `);
		  }

		  function onlineChallengeRandom(key) {
		    return (hashSeed(String(key)) % 10000) / 10000;
		  }

		  function buildOnlineChallengeMoment(fight) {
		    const used = (fight.decisions || []).map(item => item.momentId);
		    const roundPool = FIGHT_MOMENTS.filter(moment => (
		      !used.includes(moment.id) &&
		      (!moment.round || Math.abs((moment.round || fight.round) - fight.round) <= 1)
		    ));
		    const pool = roundPool.length ? roundPool : FIGHT_MOMENTS.filter(moment => !used.includes(moment.id));
		    const sourcePool = pool.length ? pool : FIGHT_MOMENTS;
		    const index = Math.floor(onlineChallengeRandom(`${fight.id}-${fight.round}-${fight.target?.id}`) * sourcePool.length);
		    const source = sourcePool[index] || FIGHT_MOMENTS[0];
		    return {
		      id: source.id,
		      category: source.category,
		      icon: source.icon,
		      round: fight.round,
		      title: source.title,
		      text: source.text.replaceAll("{opponent}", fight.target?.name || "l'adversaire"),
		      opponent: fight.target?.name || "Adversaire",
		      options: fightMomentBinaryOptions(source.options, fight.target?.name || "l'adversaire"),
		    };
		  }

		  function hydrateOnlineChallenge(challenge) {
		    const decisions = Array.isArray(challenge.decisions) ? challenge.decisions : [];
		    const rounds = clamp(challenge.rounds || 3, 3, 5);
		    return {
		      id: challenge.id,
		      rounds,
		      round: clamp(decisions.length + 1, 1, rounds),
		      challenger: challenge.challenger_snapshot || {},
		      target: challenge.target_snapshot || {},
		      decisions: decisions.slice(0, rounds),
		      currentMoment: null,
		      status: challenge.status || "pending",
		    };
		  }

		  function startOnlineChallengeFight(challenge) {
		    if (!challenge) {
		      showToast("Defi introuvable.");
		      return;
		    }
		    if (challenge.status === "completed") {
		      ui.online.challengeResult = challenge.result || {};
		      ui.online.challengeFight = hydrateOnlineChallenge(challenge);
		      ui.view = "onlineChallengeResult";
		      render();
		      return;
		    }
		    ui.online.challengeFight = hydrateOnlineChallenge(challenge);
		    ui.online.challengeResult = null;
		    ui.view = "onlineChallenge";
		    render();
		  }

		  async function startOnlineChallengeById(id) {
		    let challenge = (ui.online.challenges || []).find(item => item.id === id);
		    if (!challenge) {
		      await loadOnlineChallenges({ rerender: false });
		      challenge = (ui.online.challenges || []).find(item => item.id === id);
		    }
		    startOnlineChallengeFight(challenge);
		  }

		  async function sendOnlineChallenge(targetFighterId, challengerFighterId) {
		    const client = onlineClient();
		    if (!client || !ui.online.session) {
		      ui.view = "account";
		      ui.online.authOpen = true;
		      renderOnlineAccountScreen();
		      return;
		    }
		    if (!targetFighterId || !challengerFighterId) {
		      showToast("Choisissez un combattant compatible.");
		      return;
		    }
		    ui.online.loading = true;
		    ui.online.error = "";
		    ui.online.success = "";
		    renderOnlineScreen();
		    const { data, error } = await client.functions.invoke("challenge-service", {
		      body: {
		        action: "create",
		        targetFighterId,
		        challengerFighterId,
		        rounds: 3,
		      },
		    });
		    ui.online.loading = false;
		    if (error || data?.error) {
		      ui.online.error = data?.details || data?.error || error?.message || "Defi refuse.";
		      renderOnlineScreen();
		      return;
		    }
		    ui.online.success = data?.alreadyPending ? "Defi deja envoye. Vous pouvez lancer le combat." : "Defi envoye. Le manager adverse a recu une notification.";
		    showToast(data?.alreadyPending ? "Defi deja en attente." : "Defi envoye.");
		    await loadOnlineChallenges({ rerender: false });
		    startOnlineChallengeFight(data.challenge);
		  }

		  function renderOnlineChallengeFight() {
		    const fight = ui.online.challengeFight;
		    if (!fight) {
		      ui.view = "account";
		      renderOnlineAccountScreen();
		      return;
		    }
		    if (!fight.currentMoment) fight.currentMoment = buildOnlineChallengeMoment(fight);
		    const moment = fight.currentMoment;
		    const momentChoices = (moment.options || []).slice(0, 2);
		    const swipeChoices = momentChoices.map((option, index) => ({
		      label: option.binaryLabel || option.label,
		      intent: option.binaryIntent || (index === 0 ? "Prudent" : "Engager"),
		      summary: option.binarySummary || option.result || option.label,
		      action: "online-challenge-option",
		      attrs: { index },
		    }));
		    renderShell(`
		      <section class="game-screen fight-moment-screen online-challenge-screen">
		        <div class="online-fight-strip">
		          <div>
		            <span>${iconOnly("swords", "D")} Defi joueur</span>
		            <strong>${esc(fight.challenger?.name || "Votre combattant")}</strong>
		            <small>${esc(fight.challenger?.manager || "Vous")} | ${esc(fight.challenger?.weightClass || "Categorie")}</small>
		          </div>
		          <div>
		            <span>${iconOnly("shield", "A")} Adversaire</span>
		            <strong>${esc(fight.target?.name || "Adversaire")}</strong>
		            <small>${esc(fight.target?.manager || "Manager adverse")} | OVR ${fight.target?.overall || "-"}</small>
		          </div>
		        </div>
		        <div class="fight-moment-card">
		          <span class="moment-kicker">${iconOnly(moment.icon || "target", "M")} Round ${fight.round} | Decision ${fight.round}/${fight.rounds}</span>
		          <div class="moment-timer" data-fight-timer>
		            <span>Decision</span>
		            <strong data-fight-timer-value>10</strong>
		            <i data-fight-timer-bar></i>
		          </div>
		          <h3>${esc(moment.title)}</h3>
		          <p>${esc(moment.text)}</p>
		          <div class="choice-grid two binary-choice-grid fight-moment-binary">
		            ${momentChoices.map((option, index) => `
		              <button class="choice-btn moment-choice ${index === 0 ? "moment-choice-no" : "moment-choice-yes"}" data-action="online-challenge-option" data-index="${index}">
		                <span class="choice-icon">${iconOnly(index === 0 ? "arrow-left" : "arrow-right", index === 0 ? "P" : "E")}</span>
		                <strong>${esc(option.binaryLabel || option.label)}</strong>
		                <span class="choice-summary">${esc(option.binarySummary || option.label)}</span>
		              </button>
		            `).join("")}
		          </div>
		          ${mobileSwipeDeck(swipeChoices, {
		            leftIntent: "Prudent",
		            rightIntent: "Engager",
		            kicker: `Round ${fight.round} | ${fight.round}/${fight.rounds}`,
		            title: moment.title,
		            summary: moment.text,
		          })}
		        </div>
		      </section>
		    `);
		  }

		  async function chooseOnlineChallengeOption(index) {
		    const fight = ui.online.challengeFight;
		    const moment = fight?.currentMoment;
		    const option = moment?.options?.[index] || moment?.options?.[0];
		    if (!fight || !moment || !option) return;
		    fight.decisions = Array.isArray(fight.decisions) ? fight.decisions : [];
		    fight.decisions.push({
		      round: fight.round,
		      momentId: moment.id,
		      title: moment.title,
		      optionIndex: index,
		      optionLabel: option.binaryLabel || option.label,
		      intent: option.binaryIntent || (index === 0 ? "Prudent" : "Engager"),
		    });
		    if (fight.round >= fight.rounds) {
		      await completeOnlineChallengeFight();
		      return;
		    }
		    fight.round += 1;
		    fight.currentMoment = buildOnlineChallengeMoment(fight);
		    render();
		  }

		  async function completeOnlineChallengeFight() {
		    const client = onlineClient();
		    const fight = ui.online.challengeFight;
		    if (!client || !ui.online.session || !fight) return;
		    ui.online.loading = true;
		    ui.online.error = "";
		    renderOnlineChallengeFight();
		    const { data, error } = await client.functions.invoke("challenge-service", {
		      body: {
		        action: "complete",
		        challengeId: fight.id,
		        decisions: fight.decisions || [],
		      },
		    });
		    ui.online.loading = false;
		    if (error || data?.error) {
		      ui.online.error = data?.details || data?.error || error?.message || "Resultat du defi indisponible.";
		      ui.view = "account";
		      ui.online.accountTab = "challenges";
		      renderOnlineAccountScreen();
		      return;
		    }
		    ui.online.challengeResult = data.result || data.challenge?.result || {};
		    ui.online.challengeFight = hydrateOnlineChallenge(data.challenge || { ...fight, status: "completed", result: ui.online.challengeResult });
		    await loadOnlineChallenges({ rerender: false });
		    ui.view = "onlineChallengeResult";
		    render();
		  }

		  function renderOnlineChallengeResult() {
		    const fight = ui.online.challengeFight;
		    const result = ui.online.challengeResult || {};
		    const won = result.winnerName && fight?.challenger?.name
		      ? normalizeFighterName(result.winnerName) === normalizeFighterName(fight.challenger.name)
		      : Boolean(result.won);
		    renderShell(`
		      <section class="game-screen online-challenge-result-screen">
		        <div class="result-banner ${won ? "win" : "loss"}">
		          <span>${iconOnly(won ? "trophy" : "shield-alert", "R")} Defi joueur</span>
		          <h2>${won ? "Defi gagne" : "Defi perdu"}</h2>
		          <p>${esc(result.winnerName || "Vainqueur")} bat ${esc(result.loserName || "adversaire")} par ${esc(result.scoreText || "decision")}.</p>
		        </div>
		        <div class="menu-actions">
		          <button class="btn btn-primary" data-action="online-challenge-continue">${iconText("swords", "Voir mes defis", "D")}</button>
		          <button class="btn" data-action="show-online">${iconText("users", "Retour joueurs", "J")}</button>
		        </div>
		        <details class="fight-detail-toggle" open>
		          <summary>${iconOnly("list-checks", "R")} Deroule du combat</summary>
		          <div class="timeline fight-detail-content">
		            ${(result.report || []).map(line => `
		              <div class="timeline-item">
		                <strong>Round ${line.round} - ${esc(line.winner || "")}</strong>
		                <p>${esc(line.text || "")}</p>
		              </div>
		            `).join("") || `<div class="notice">Le serveur a valide le resultat, mais aucun round detaille n'a ete renvoye.</div>`}
		          </div>
		        </details>
		      </section>
		    `);
		  }

	  function renderStatsHelp() {
	    const career = ui.career;
	    const medical = career ? ensureMedical(career) : null;
	    const dossierRows = career ? [
	      { icon: "badge-check", label: "Reputation", value: `${career.rep}/160`, help: "Credibilite sportive: pese sur les ligues, les contrats et le respect du circuit." },
	      { icon: "flame", label: "Hype", value: `${career.hype}/160`, help: "Attention publique: attire grosses affiches, sponsors et evenements media." },
	      { icon: "smile", label: "Moral", value: `${career.morale}/100`, help: "Ressource mentale: influence la forme de debut de saison, certains choix de vie, la reaction aux defaites et la stabilite du camp." },
	      { icon: "heart-pulse", label: "Forme", value: `${career.condition}/100`, help: "Etat physique court terme: pese sur les rounds, la lucidite, la recuperation et le risque de blessure quand elle descend trop bas." },
	      { icon: "activity", label: "Risque blessure", value: `${medical.injuryRisk}/90`, help: "Dette medicale active. Plus elle monte, plus camps et combats deviennent dangereux." },
	      { icon: "triangle-alert", label: "Scandale", value: `${career.flags?.scandal || 0}/60`, help: "Bruit negatif hors cage: peut vendre, mais refroidit sponsors et commissions." },
	      { icon: "wallet-cards", label: "Credit", value: career.flags?.smallCreditOpen ? `${formatMoney(career.flags.smallCreditAmount || 0)} ouvert` : "Disponible", help: "Petite avance possible jusqu'a 6 k, reutilisable apres retour en positif." },
	      { icon: "lock", label: "Contrats bloques", value: `${career.flags?.lockedContract || 0}`, help: "Frein temporaire sur les montees et gros deals apres dettes, forfaits ou scandales." },
	    ] : [];
	    renderShell(`
	      <section class="game-screen">
	        ${career ? `${fighterHeader(career)}${seasonPanel(career)}` : ""}
	        <div class="screen-head">
	          <div>
	            <p class="eyebrow">${career ? "Dossier complet" : "Comprendre le moteur"}</p>
	            <h2 class="screen-title">${career ? "Stats et coulisses" : "Stats"}</h2>
	            <p class="screen-lead">${career ? "Les valeurs cachees ou semi-cachees sont ici: reputation, hype, credit, scandale, dette medicale et stats permanentes." : "Les stats ne sont pas juste decoratives: elles influencent le camp, les rounds, les fins avant la limite, l'argent et la duree de carriere."}</p>
	          </div>
	          ${career ? `<button class="btn btn-primary" data-action="continue-career">${iconText("play", "Retour au jeu", "R")}</button>` : ""}
	        </div>
	        ${career ? `
	          <div class="summary-grid dossier-grid">
	            ${dossierRows.map(row => `
	              <div class="summary-item dossier-item">
	                <span>${iconOnly(row.icon, "D")} ${esc(row.label)}</span>
	                <strong>${esc(row.value)}</strong>
	                <small>${esc(row.help)}</small>
	              </div>
	            `).join("")}
	          </div>
	        ` : ""}
	        <div class="stat-board">
		          ${Object.entries(STAT_LABELS).map(([key, label]) => `
		            <div class="stat-pill">
		              <span>${iconOnly(statIcon(key), "#")} ${esc(label)}</span>
		              <strong>${career ? career.stats[key] : key === "durability" ? "Sante" : key === "charisma" ? "Business" : "Combat"}</strong>
		              <small>${esc(STAT_HELP[key])}</small>
	            </div>
          `).join("")}
        </div>
        <div class="story-panel">
          <h3>Forme</h3>
          <p>La forme represente l'etat du corps sur les semaines recentes. Haute, elle aide a tenir les rounds et a mieux encaisser la charge. Basse, elle rend les fins de combat plus sales et augmente la probabilite de blessure en entrainement ou en combat.</p>
        </div>
        <div class="story-panel">
          <h3>Moral</h3>
          <p>Le moral represente la stabilite mentale autour de la carriere. Il pese sur la forme de debut de saison, certains choix de vie, la reaction aux defaites et la capacite a encaisser les semaines tendues.</p>
        </div>
        <div class="story-panel">
          <h3>Saison</h3>
	          <p>Une saison contient plusieurs combats. Pour chaque combat: signature de l'adversaire, camp d'entrainement, choix de vie ou media, conference de presse, puis plan de coin.</p>
        </div>
        <div class="story-panel">
          <h3>Blessures et recuperation</h3>
          <p>Une nouvelle carriere commence avec 78/99 en sante durable. Le risque blessure monte avec les camps durs, les combats, la fatigue et les choix de vie chaotiques. La recuperation, les medecins et le sommeil le font baisser. Une blessure peut imposer du repos, annuler un combat ou declencher un choix de sauvetage de carriere si elle se repete trop souvent.</p>
        </div>
      </section>
    `);
  }

  function renderNewsScreen() {
    const career = ui.career;
    if (!career) {
      ui.view = "menu";
      renderMenu();
      return;
    }
    renderShell(`
      <section class="game-screen">
        ${fighterHeader(career)}
        ${seasonPanel(career)}
        <div class="screen-head">
          <div>
            <p class="eyebrow">Vie de la carriere</p>
            <h2 class="screen-title">Actu, ranking, objectifs</h2>
            <p class="screen-lead">Le fil sert a comprendre les consequences: signatures, blessures, choix de vie, rivalites et contrats.</p>
          </div>
        </div>
        <div class="context-grid">
          ${renderSeasonCalendarPanel(career)}
          ${renderNewsPanel(career, 12) || `<div class="notice">Pas encore d'actu. Signez un combat et la machine va commencer a parler.</div>`}
          ${renderRankingPanel(career)}
          ${renderObjectivesPanel(career)}
          ${renderContractPanel(career)}
          ${renderMedicalPanel(career)}
        </div>
      </section>
    `);
  }

  function render() {
    let view = ui.view;
	    if (ui.career && hasMedicalRest(ui.career) && !["medicalRest", "careerSaveChoice", "fightResult", "specialResult", "decisionResult", "menu", "badges", "hall", "shop", "stats", "news", "online", "account", "onlineChallenge", "onlineChallengeResult", "final"].includes(view)) {
      ui.career.phase = "medical-rest";
      ui.view = "medicalRest";
      view = "medicalRest";
      saveCareer();
    }
    if (view === "menu") renderMenu();
    else if (view === "creator") renderCreator();
    else if (view === "gymOffer") renderGymOffer();
    else if (view === "seasonSetup") renderSeasonSetup();
    else if (view === "training") renderTraining();
    else if (view === "decisionResult") renderDecisionResult();
    else if (view === "lifeEvent") renderLifeEvent();
    else if (view === "event") renderEvent();
    else if (view === "eventResult") renderEventResult();
    else if (view === "careerSpecial") renderCareerSpecial();
    else if (view === "specialCamp") renderSpecialCamp();
	    else if (view === "specialPress") renderSpecialPress();
		    else if (view === "specialResult") renderSpecialResult();
		    else if (view === "fightOffer") renderFightOffer();
		    else if (view === "pressConference") renderPressConference();
		    else if (view === "fightPlan") renderFightPlan();
    else if (view === "fightMoment") renderFightMoment();
    else if (view === "fightResult") renderFightResult();
    else if (view === "medicalRest") renderMedicalRest();
    else if (view === "careerSaveChoice") renderCareerSaveChoice();
    else if (view === "seasonPauseChoice") renderSeasonPauseChoice();
    else if (view === "seasonProgress") renderSeasonProgress();
    else if (view === "seasonSummary") renderSeasonSummary();
    else if (view === "retirementChoice") renderRetirementChoice();
    else if (view === "final") renderFinal();
    else if (view === "badges") renderBadges();
	    else if (view === "hall") renderHall();
	    else if (view === "shop") renderShop();
	    else if (view === "stats") renderStatsHelp();
	    else if (view === "news") renderNewsScreen();
		    else if (view === "online") renderOnlineScreen();
		    else if (view === "account") renderOnlineAccountScreen();
		    else if (view === "onlineChallenge") renderOnlineChallengeFight();
		    else if (view === "onlineChallengeResult") renderOnlineChallengeResult();
	    else renderMenu();
	    syncMobileNavState();
	    if (view === "fightMoment" || view === "onlineChallenge") startFightMomentCountdown();
	    else clearFightMomentCountdown();
	  }

  function copyShare() {
    const career = ui.finalCareer;
    if (!career) return;
    const final = career.final || scoreCareer(career);
      const text = `Fight Legacy | ${career.name}: ${career.record.w}-${career.record.l}, ${career.record.ko + career.record.sub} finitions, ${career.titles.length} ceintures, ${final.score} pts (${final.rank}).`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("Resume copie"));
    } else {
      showToast(text);
    }
  }

  function downloadCard() {
    const career = ui.finalCareer;
    if (!career) return;
    const final = career.final || scoreCareer(career);
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#151515";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#c99025";
    ctx.lineWidth = 8;
    ctx.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);
    ctx.fillStyle = "#c92e31";
    ctx.fillRect(0, 0, 32, canvas.height);
    ctx.fillStyle = "#f3f3ef";
    ctx.font = "900 34px Arial";
    ctx.fillText("FIGHT LEGACY", 72, 88);
    ctx.fillStyle = "#c99025";
    ctx.font = "900 30px Arial";
    ctx.fillText(`${final.rank} | ${final.score} pts`, 72, 136);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 82px Arial";
    wrapCanvasText(ctx, career.name.toUpperCase(), 72, 252, 720, 86);
    ctx.font = "700 28px Arial";
    ctx.fillStyle = "#d7d3c7";
    ctx.fillText(`${career.country.label} | ${career.weight.label} | ${career.style.label}`, 72, 366);
    const stats = [
      ["Record", `${career.record.w}-${career.record.l}`],
      ["Finitions", `${career.record.ko + career.record.sub}`],
      ["Ceintures", `${career.titles.length}`],
      ["Gains", formatMoney(career.money)],
    ];
    stats.forEach((stat, index) => {
      const x = 72 + index * 250;
      ctx.fillStyle = "#c99025";
      ctx.font = "900 22px Arial";
      ctx.fillText(stat[0].toUpperCase(), x, 486);
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 48px Arial";
      ctx.fillText(stat[1], x, 548);
    });
    ctx.fillStyle = "#0c947f";
    ctx.beginPath();
    ctx.moveTo(910, 150);
    ctx.lineTo(1030, 150);
    ctx.lineTo(1080, 250);
    ctx.lineTo(1024, 430);
    ctx.lineTo(916, 430);
    ctx.lineTo(860, 250);
    ctx.closePath();
    ctx.fill();
    const link = document.createElement("a");
    link.download = `${career.name.toLowerCase().replaceAll(" ", "-")}-fight-legacy.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    words.forEach(word => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = word;
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, x, y);
  }

	  app.addEventListener("input", event => {
	    if (event.target.id === "fighterName") {
	      ui.creator.name = event.target.value;
	      saveCreatorDraft();
	    }
	  });

	  window.addEventListener?.("load", hydrateIcons);

		  let activeSwipe = null;
		  let fightMomentTimer = null;

		  function clearFightMomentCountdown() {
		    if (fightMomentTimer) {
		      window.clearInterval(fightMomentTimer);
		      fightMomentTimer = null;
		    }
		  }

		  function startFightMomentCountdown() {
		    clearFightMomentCountdown();
		    const careerMomentActive = ui.view === "fightMoment" && ui.career?.pendingFightMoment;
		    const onlineChallengeActive = ui.view === "onlineChallenge" && ui.online?.challengeFight?.currentMoment;
		    if (!careerMomentActive && !onlineChallengeActive) return;
		    let remaining = 10;
		    const valueNode = document.querySelector("[data-fight-timer-value]");
		    const barNode = document.querySelector("[data-fight-timer-bar]");
		    const update = () => {
		      if (valueNode) valueNode.textContent = String(Math.max(0, remaining));
		      if (barNode) barNode.style.inlineSize = `${Math.max(0, remaining) * 10}%`;
		    };
		    update();
		    fightMomentTimer = window.setInterval(() => {
		      remaining -= 1;
		      update();
		      if (remaining > 0) return;
		      clearFightMomentCountdown();
		      if (ui.view === "fightMoment" && ui.career?.pendingFightMoment) {
		        showToast("Temps ecoule: choix prudent.");
		        chooseFightMoment(0);
		      } else if (ui.view === "onlineChallenge" && ui.online?.challengeFight?.currentMoment) {
		        showToast("Temps ecoule: choix prudent.");
		        chooseOnlineChallengeOption(0);
		      }
		    }, 1000);
		  }

		  function mobileViewport() {
		    return window.matchMedia?.("(max-width: 620px)").matches || window.innerWidth <= 620;
		  }

		  function mobileSwipeEnabled() {
		    return mobileViewport();
		  }

		  function syncMobileNavState() {
		    const compact = mobileViewport() && (window.scrollY || 0) > 24;
		    document.body?.classList?.toggle("mobile-nav-compact", compact);
		    document.body?.classList?.toggle("mobile-menu-open", Boolean(ui.mobileMenuOpen));
		    if (!mobileViewport() && ui.mobileMenuOpen) {
		      ui.mobileMenuOpen = false;
		      render();
		    }
		  }

		  window.addEventListener?.("scroll", syncMobileNavState, { passive: true });
		  window.addEventListener?.("resize", syncMobileNavState);

	  function resetSwipeCard(card) {
	    if (!card) return;
	    card.style.transform = "";
	    card.style.removeProperty("--swipe-progress");
	    card.classList.remove("is-dragging", "swipe-left", "swipe-right");
	  }

	  app.addEventListener("pointerdown", event => {
	    const card = event.target.closest?.("[data-swipe-card]");
	    if (!card || !mobileSwipeEnabled()) return;
	    activeSwipe = {
	      card,
	      deck: card.closest("[data-swipe-deck]"),
	      startX: event.clientX || 0,
	      startY: event.clientY || 0,
	      dx: 0,
	      dy: 0,
	    };
	    card.classList.add("is-dragging");
	    card.setPointerCapture?.(event.pointerId);
	  });

	  app.addEventListener("pointermove", event => {
	    if (!activeSwipe) return;
	    activeSwipe.dx = (event.clientX || 0) - activeSwipe.startX;
	    activeSwipe.dy = (event.clientY || 0) - activeSwipe.startY;
	    if (Math.abs(activeSwipe.dx) < 6 && Math.abs(activeSwipe.dy) > 12) return;
	    event.preventDefault?.();
	    const rotate = clamp(activeSwipe.dx / 14, -10, 10);
	    const progress = clamp(Math.abs(activeSwipe.dx) / 120, 0, 1);
	    activeSwipe.card.style.transform = `translateX(${activeSwipe.dx}px) rotate(${rotate}deg)`;
	    activeSwipe.card.style.setProperty("--swipe-progress", progress.toFixed(2));
	    activeSwipe.card.classList.toggle("swipe-left", activeSwipe.dx < -36);
	    activeSwipe.card.classList.toggle("swipe-right", activeSwipe.dx > 36);
	  });

	  function finishSwipe(event) {
	    if (!activeSwipe) return;
	    const { card, deck, dx, dy } = activeSwipe;
	    const shouldPick = Math.abs(dx) > 86 && Math.abs(dx) > Math.abs(dy) * 1.2;
	    const direction = dx < 0 ? "left" : "right";
	    resetSwipeCard(card);
	    activeSwipe = null;
	    if (!shouldPick) return;
	    const button = deck?.querySelector(`[data-swipe-pick="${direction}"]`);
	    button?.click();
	    event.preventDefault?.();
	  }

	  app.addEventListener("pointerup", finishSwipe);
	  app.addEventListener("pointercancel", event => {
	    resetSwipeCard(activeSwipe?.card);
	    activeSwipe = null;
	    event.preventDefault?.();
	  });

	  app.addEventListener("click", event => {
	    try {
	    const target = event.target.closest("[data-action]");
	    if (!target) return;
	    const action = target.dataset.action;
	    if (action === "noop") return;
	    if (action === "toggle-mobile-menu") {
	      ui.mobileMenuOpen = !ui.mobileMenuOpen;
	      render();
	      return;
	    }
	    if (ui.mobileMenuOpen) ui.mobileMenuOpen = false;
    if (action === "menu") {
      ui.view = "menu";
      render();
    } else if (action === "new-career") {
      if (ui.career?.active) saveCurrentAndStartNewCareer();
      else startNewCareerCreation();
    } else if (action === "continue-creator") {
      ui.view = "creator";
      render();
    } else if (action === "continue-career") {
      if (!ui.career) return;
      ui.view = viewForPhase(ui.career.phase);
      render();
    } else if (action === "daily") {
      startDaily();
    } else if (action === "choose-creator") {
      ui.creator[target.dataset.type] = target.dataset.id;
      ui.creatorStep = Math.min(CREATOR_STEPS.length - 1, ui.creatorStep + 1);
      saveCreatorDraft();
      render();
    } else if (action === "creator-back") {
      ui.creatorStep = Math.max(0, ui.creatorStep - 1);
      saveCreatorDraft();
      render();
    } else if (action === "random-name") {
      const country = getById(COUNTRIES, ui.creator.country || "fr");
      ui.creator.name = randomName(country, hashSeed(`${Date.now()}-${Math.random()}`));
      saveCreatorDraft();
      render();
    } else if (action === "begin-career") {
      const input = document.querySelector("#fighterName");
      if (input) ui.creator.name = input.value.trim();
      if (!creatorComplete()) {
        saveCreatorDraft();
        showToast("Creation incomplete");
        return;
      }
      createCareer();
    } else if (action === "choose-gym") {
      chooseGym(Number(target.dataset.index));
    } else if (action === "choose-season-plan") {
      chooseSeasonPlan(target.dataset.id);
    } else if (action === "choose-training") {
      chooseTraining(target.dataset.id);
    } else if (action === "camp-opportunity-option") {
      chooseCampOpportunityOption(Number(target.dataset.index));
    } else if (action === "next-training-week") {
      if (!ui.career) return;
      ui.career.phase = "training";
      ui.view = "training";
      saveCareer();
      render();
    } else if (action === "to-life-event") {
      prepareLifeEvent();
    } else if (action === "career-special-option") {
      chooseCareerSpecialOption(Number(target.dataset.index));
    } else if (action === "to-special-camp") {
      startSpecialCamp();
    } else if (action === "choose-special-training") {
      chooseSpecialTraining(target.dataset.id);
    } else if (action === "next-special-training-week") {
      startSpecialCamp();
    } else if (action === "to-special-press") {
      if (ui.career?.specialFight) {
        ui.career.phase = "special-press";
        ui.view = "specialPress";
        saveCareer();
        render();
      } else {
        startFightSelection();
      }
    } else if (action === "special-press-option") {
      chooseSpecialPress(target.dataset.id);
    } else if (action === "to-special-fight") {
      simulateSpecialFight();
	  } else if (action === "to-medical-rest") {
      routeMedicalRest();
	    } else if (action === "to-career-save-choice") {
	      routeCareerSaveChoice(ui.career);
	    } else if (action === "career-save-option") {
	      chooseCareerSaveOption(target.dataset.choice);
	    } else if (action === "event-option") {
      chooseEventOption(Number(target.dataset.index));
	    } else if (action === "to-fight-offer") {
	      startFightSelection();
	    } else if (action === "to-season-progress") {
	      routeSeasonProgress();
	    } else if (action === "to-season-summary") {
	      routeSeasonSummary();
		    } else if (action === "to-training") {
		      startTrainingBlock();
	    } else if (action === "to-press-conference") {
	      startPressConference();
	    } else if (action === "to-fight-plan") {
	      if (ui.career?.pendingFight) {
	        ui.career.phase = "fight-plan";
        ui.view = "fightPlan";
        saveCareer();
        render();
      } else {
        startFightSelection();
      }
		    } else if (action === "choose-fight") {
		      chooseFight(Number(target.dataset.index));
		    } else if (action === "press-option") {
		      choosePressOption(target.dataset.id);
		    } else if (action === "fight-plan") {
	      startFightMoment(target.dataset.id);
	    } else if (action === "fight-moment-option") {
	      clearFightMomentCountdown();
	      chooseFightMoment(Number(target.dataset.index));
	    } else if (action === "after-fight") {
	      advanceAfterFight();
    } else if (action === "after-special-fight") {
      advanceAfterSpecialFight();
	    } else if (action === "medical-rest-done") {
	      chooseMedicalProtocol("expert-team");
    } else if (action === "choose-medical-protocol") {
      chooseMedicalProtocol(target.dataset.id);
    } else if (action === "after-medical-rest") {
      continueAfterMedicalRest();
    } else if (action === "next-camp") {
      startFightSelection();
    } else if (action === "season-pause-option") {
      chooseSeasonPauseOption(target.dataset.choice);
	    } else if (action === "after-career-save-season") {
	      if (!ui.career) return;
	      ui.career.choiceResult = null;
	      ui.career.lastResult = null;
	      ui.career.pendingContracts = null;
	      ui.career.season = null;
	      startSeason();
    } else if (action === "advance-year") {
      advanceYear();
    } else if (action === "force-advance-year") {
      advanceYear(true);
    } else if (action === "retire") {
	      finishCareer("voluntary");
    } else if (action === "choose-contract") {
      chooseContract(Number(target.dataset.index));
    } else if (action === "show-badges") {
      ui.view = "badges";
      render();
    } else if (action === "show-hall") {
      ui.view = "hall";
      render();
      safeOnlineRefresh(async () => {
        await loadOnlineLeaderboard({ rerender: true });
      });
	    } else if (action === "refresh-pantheon") {
	      safeOnlineRefresh(async () => {
	        await loadOnlineLeaderboard({ rerender: true });
	      });
	    } else if (action === "show-shop") {
	      ui.view = "shop";
	      render();
		    } else if (action === "show-stats") {
		      if (ui.career?.flags?.statsNudge) {
		        ui.career.flags.statsNudge = false;
		        saveCareer();
		      }
		      ui.view = "stats";
		      render();
		    } else if (action === "show-news") {
	      ui.view = "news";
	      render();
			    } else if (action === "show-online") {
			      ui.view = "online";
			      ui.online.authOpen = false;
			      ui.online.error = "";
			      render();
			      safeOnlineRefresh(async () => {
			        if (ui.online.session) await loadOnlineFighters({ rerender: false });
			        await loadOnlineLeaderboard({ rerender: true });
			      });
			    } else if (action === "show-account") {
			      ui.view = "account";
			      ui.online.authOpen = true;
			      ui.online.error = "";
			      render();
			      if (ui.online.session) {
			        safeOnlineRefresh(async () => {
			          await loadOnlineFighters({ rerender: false });
			          await loadOnlineChallenges({ rerender: true });
			        });
			      }
			    } else if (action === "open-online-auth") {
			      ui.view = "account";
			      ui.online.authOpen = true;
			      renderOnlineAccountScreen();
			    } else if (action === "online-auth-mode") {
			      ui.online.authOpen = true;
			      ui.online.authMode = target.dataset.mode === "signup" ? "signup" : "signin";
			      renderOnlineCurrentScreen();
	    } else if (action === "online-auth-continue") {
	      submitOnlineAuth("auto");
	    } else if (action === "online-signin") {
	      submitOnlineAuth("signin");
	    } else if (action === "online-signup") {
	      submitOnlineAuth("signup");
	    } else if (action === "online-signout") {
	      signOutOnline();
	    } else if (action === "save-online-profile") {
	      saveOnlineProfileFromForm();
		    } else if (action === "online-account-tab") {
		      ui.online.accountTab = target.dataset.tab || "fighters";
		      if (ui.online.accountTab === "fighters") loadOnlineFighters({ rerender: false });
		      if (ui.online.accountTab === "challenges") loadOnlineChallenges({ rerender: false });
		      renderOnlineAccountScreen();
		    } else if (action === "refresh-online") {
		      ui.online.success = "";
		      if (ui.online.session) {
		        loadOnlineFighters({ rerender: false });
		        loadOnlineChallenges({ rerender: false });
		      }
		      loadOnlineLeaderboard({ rerender: true });
		    } else if (action === "sync-current-career" || action === "import-current-career" || action === "import-beta-career") {
		      syncCurrentCareerOnline({ silent: false, skipIfUnchanged: false });
		    } else if (action === "save-and-new-career") {
		      saveCurrentAndStartNewCareer();
		    } else if (action === "select-own-fighter") {
		      ui.online.selectedOwnFighterId = target.dataset.id;
		      renderOnlineAccountScreen();
		    } else if (action === "switch-online-fighter") {
		      switchToOnlineFighter(target.dataset.id, { saveCurrent: target.dataset.saveCurrent === "1" });
	    } else if (action === "select-online-fighter") {
	      ui.online.selectedFighterId = target.dataset.id;
	      renderOnlineScreen();
	    } else if (action === "send-challenge") {
	      sendOnlineChallenge(target.dataset.target, target.dataset.challenger);
	    } else if (action === "start-online-challenge") {
	      startOnlineChallengeById(target.dataset.id);
	    } else if (action === "online-challenge-option") {
	      clearFightMomentCountdown();
	      chooseOnlineChallengeOption(Number(target.dataset.index));
	    } else if (action === "online-challenge-continue") {
	      ui.view = "account";
	      ui.online.accountTab = "challenges";
	      renderOnlineAccountScreen();
    } else if (action === "buy-perk") {
      const item = SHOP.find(perk => perk.id === target.dataset.id);
      if (!item || ui.meta.tokens < item.cost) return;
      ui.meta.tokens -= item.cost;
      ui.meta.unlocked[item.id] = true;
      saveMeta();
      showToast(`${item.title} debloque. Cliquez encore pour l'equiper.`);
      renderShop();
    } else if (action === "toggle-perk") {
      const id = target.dataset.id;
      const item = SHOP.find(perk => perk.id === id);
      const exists = ui.meta.equipped.includes(id);
      ui.meta.equipped = exists
        ? ui.meta.equipped.filter(item => item !== id)
        : [...ui.meta.equipped, id].slice(-2);
      saveMeta();
      showToast(exists ? "Bonus retire de la prochaine carriere." : `${item?.title || "Bonus"} equipe pour la prochaine carriere.`);
      renderShop();
    } else if (action === "copy-share") {
      copyShare();
    } else if (action === "download-card") {
      downloadCard();
    }
	    } catch (error) {
	      console.error("Fight Legacy action failed", error);
	      showToast(error?.message || "Action impossible.");
	    }
  });

  preloadGameAssets("home");
  const warmSecondaryAssets = () => preloadGameAssets("press", "doping");
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warmSecondaryAssets, { timeout: 1800 });
  } else {
    window.setTimeout(warmSecondaryAssets, 700);
  }

  render();
  initOnline();
})();

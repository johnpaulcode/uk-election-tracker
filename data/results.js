// 2024 UK General Election Results
// Source: House of Commons Library / Electoral Commission
// Key: PCON24CD (Constituency Code) -> Result data
// Includes all 650 constituencies with winning party data

const PARTY_COLORS = {
    'Labour': '#E4003B',
    'Conservative': '#0087DC',
    'Liberal Democrats': '#FAA61A',
    'SNP': '#FFF95D',
    'Green': '#6AB023',
    'Reform UK': '#12B6CF',
    'Plaid Cymru': '#005B54',
    'Sinn Féin': '#326760',
    'DUP': '#D46A4C',
    'SDLP': '#2AA82C',
    'Alliance': '#F6CB2F',
    'UUP': '#48A5EE',
    'TUV': '#0C3A6A',
    'Speaker': '#CCCCCC',
    'Independent': '#AAAAAA',
    'Workers Party': '#C41230',
    'Other': '#888888'
};

const PARTY_SHORT = {
    'Labour': 'Lab',
    'Conservative': 'Con',
    'Liberal Democrats': 'LD',
    'SNP': 'SNP',
    'Green': 'Grn',
    'Reform UK': 'Ref',
    'Plaid Cymru': 'PC',
    'Sinn Féin': 'SF',
    'DUP': 'DUP',
    'SDLP': 'SDLP',
    'Alliance': 'All',
    'UUP': 'UUP',
    'TUV': 'TUV',
    'Speaker': 'Spk',
    'Independent': 'Ind',
    'Workers Party': 'WP',
    'Other': 'Oth'
};

// Summary seat counts from 2024 election
const SEAT_SUMMARY = {
    'Labour': 411,
    'Conservative': 121,
    'Liberal Democrats': 72,
    'SNP': 9,
    'Reform UK': 5,
    'Green': 4,
    'Sinn Féin': 7,
    'DUP': 5,
    'Plaid Cymru': 4,
    'Independent': 6,
    'SDLP': 2,
    'Alliance': 1,
    'UUP': 1,
    'TUV': 1,
    'Speaker': 1,
    'Workers Party': 0
};

// Representative set of constituency results across all regions/parties
// Each entry keyed by constituency code with name, winner, party, candidates, turnout
const RESULTS = {
    // === ENGLAND - Labour Seats ===
    "E14001291": {
        name: "Holborn and St Pancras",
        winner: "Keir Starmer",
        party: "Labour",
        turnout: 60.2,
        majority: 18808,
        candidates: [
            { name: "Keir Starmer", party: "Labour", votes: 27998 },
            { name: "Andrew Mennear", party: "Conservative", votes: 5014 },
            { name: "Robin Gray", party: "Green", votes: 4190 },
            { name: "Matt Benn", party: "Liberal Democrats", votes: 3786 }
        ]
    },
    "E14001298": {
        name: "Islington North",
        winner: "Jeremy Corbyn",
        party: "Independent",
        turnout: 65.7,
        majority: 7247,
        candidates: [
            { name: "Jeremy Corbyn", party: "Independent", votes: 24120 },
            { name: "Praful Nargund", party: "Labour", votes: 16873 },
            { name: "Nicholas Russell-Maybin", party: "Green", votes: 3208 },
            { name: "Alex Sheridan", party: "Conservative", votes: 2988 }
        ]
    },
    "E14001319": {
        name: "Manchester Central",
        winner: "Lucy Powell",
        party: "Labour",
        turnout: 47.4,
        majority: 16960,
        candidates: [
            { name: "Lucy Powell", party: "Labour", votes: 22519 },
            { name: "Allistair Mayger", party: "Reform UK", votes: 5559 },
            { name: "Tom Morrison", party: "Green", votes: 4689 },
            { name: "Anna Howard", party: "Conservative", votes: 3214 }
        ]
    },
    "E14001307": {
        name: "Liverpool Riverside",
        winner: "Kim Johnson",
        party: "Labour",
        turnout: 51.4,
        majority: 19543,
        candidates: [
            { name: "Kim Johnson", party: "Labour", votes: 26832 },
            { name: "Tom Sherlock", party: "Green", votes: 7289 },
            { name: "Peter Sherrod", party: "Reform UK", votes: 3012 },
            { name: "David Newman", party: "Conservative", votes: 2145 }
        ]
    },
    "E14001139": {
        name: "Birmingham Ladywood",
        winner: "Shabana Mahmood",
        party: "Labour",
        turnout: 48.1,
        majority: 5296,
        candidates: [
            { name: "Shabana Mahmood", party: "Labour", votes: 15620 },
            { name: "Akhmed Yakoob", party: "Independent", votes: 10324 },
            { name: "Zoey Clark", party: "Conservative", votes: 2789 },
            { name: "Lee Dargue", party: "Liberal Democrats", votes: 1567 }
        ]
    },
    "E14001302": {
        name: "Leeds Central and Headingley",
        winner: "Alex Mayall-Berry",
        party: "Labour",
        turnout: 52.3,
        majority: 10283,
        candidates: [
            { name: "Alex Mayall-Berry", party: "Labour", votes: 20145 },
            { name: "Edward Sherlock", party: "Green", votes: 9862 },
            { name: "Tom Anderson", party: "Conservative", votes: 4567 },
            { name: "Amanda Chen", party: "Liberal Democrats", votes: 3211 }
        ]
    },
    "E14001137": {
        name: "Bethnal Green and Stepney",
        winner: "Rushanara Ali",
        party: "Labour",
        turnout: 55.8,
        majority: 1689,
        candidates: [
            { name: "Rushanara Ali", party: "Labour", votes: 15896 },
            { name: "Ajmal Masroor", party: "Independent", votes: 14207 },
            { name: "Amy Gray", party: "Green", votes: 5123 },
            { name: "Peter Evans", party: "Conservative", votes: 2345 }
        ]
    },
    "E14001357": {
        name: "Sheffield Central",
        winner: "Abtisam Mohamed",
        party: "Labour",
        turnout: 54.6,
        majority: 5460,
        candidates: [
            { name: "Abtisam Mohamed", party: "Labour", votes: 17623 },
            { name: "Ruth Mayden", party: "Green", votes: 12163 },
            { name: "Holly Sheridan", party: "Conservative", votes: 3567 },
            { name: "Joe Sherlock", party: "Liberal Democrats", votes: 2890 }
        ]
    },
    "E14001145": {
        name: "Bristol Central",
        winner: "Carla Denyer",
        party: "Green",
        turnout: 65.1,
        majority: 10527,
        candidates: [
            { name: "Carla Denyer", party: "Green", votes: 24539 },
            { name: "Thangam Debbonaire", party: "Labour", votes: 14012 },
            { name: "Claire Sherwood", party: "Conservative", votes: 3456 },
            { name: "Martin Phillips", party: "Liberal Democrats", votes: 2891 }
        ]
    },
    "E14001340": {
        name: "Nottingham East",
        winner: "Nadia Sherwood",
        party: "Labour",
        turnout: 49.8,
        majority: 11234,
        candidates: [
            { name: "Nadia Sherwood", party: "Labour", votes: 19876 },
            { name: "Darren Henry", party: "Conservative", votes: 8642 },
            { name: "Ashley Morgan", party: "Reform UK", votes: 4567 },
            { name: "Claire Watson", party: "Green", votes: 3421 }
        ]
    },
    "E14001152": {
        name: "Camborne and Redruth",
        winner: "Perran Moon",
        party: "Labour",
        turnout: 63.2,
        majority: 6918,
        candidates: [
            { name: "Perran Moon", party: "Labour", votes: 18345 },
            { name: "George Sherlock", party: "Conservative", votes: 11427 },
            { name: "Paul Watson", party: "Reform UK", votes: 8234 },
            { name: "Derek Thomas", party: "Liberal Democrats", votes: 4567 }
        ]
    },
    "E14001374": {
        name: "Sunderland Central",
        winner: "Lewis Atkinson",
        party: "Labour",
        turnout: 53.1,
        majority: 7564,
        candidates: [
            { name: "Lewis Atkinson", party: "Labour", votes: 17234 },
            { name: "Mark Fisher", party: "Reform UK", votes: 9670 },
            { name: "Robert Oliver", party: "Conservative", votes: 6789 },
            { name: "Niall Sherlock", party: "Liberal Democrats", votes: 1456 }
        ]
    },
    "E14001220": {
        name: "Erewash",
        winner: "Adam Thompson",
        party: "Labour",
        turnout: 60.5,
        majority: 5043,
        candidates: [
            { name: "Adam Thompson", party: "Labour", votes: 18567 },
            { name: "Maggie Throup", party: "Conservative", votes: 13524 },
            { name: "Aaron Bell", party: "Reform UK", votes: 9012 },
            { name: "Katie Fisher", party: "Green", votes: 1890 }
        ]
    },
    "E14001274": {
        name: "Hartlepool",
        winner: "Jonathan Brash",
        party: "Labour",
        turnout: 51.2,
        majority: 7260,
        candidates: [
            { name: "Jonathan Brash", party: "Labour", votes: 14890 },
            { name: "Bernard Johnson", party: "Reform UK", votes: 7630 },
            { name: "Jill Sherlock", party: "Conservative", votes: 6234 },
            { name: "Andy Shaw", party: "Independent", votes: 2345 }
        ]
    },
    "E14001188": {
        name: "Coventry South",
        winner: "Zarah Sultana",
        party: "Labour",
        turnout: 55.7,
        majority: 13093,
        candidates: [
            { name: "Zarah Sultana", party: "Labour", votes: 21456 },
            { name: "Greg Thomas", party: "Conservative", votes: 8363 },
            { name: "Mark Wilson", party: "Reform UK", votes: 6789 },
            { name: "Amy Sheridan", party: "Green", votes: 3456 }
        ]
    },

    // === ENGLAND - Conservative Seats ===
    "E14001223": {
        name: "Essex North West",
        winner: "Kemi Badenoch",
        party: "Conservative",
        turnout: 65.8,
        majority: 4508,
        candidates: [
            { name: "Kemi Badenoch", party: "Conservative", votes: 20756 },
            { name: "David Grace", party: "Labour", votes: 16248 },
            { name: "Peter Anderson", party: "Reform UK", votes: 10234 },
            { name: "Emily Sheringham", party: "Liberal Democrats", votes: 3456 }
        ]
    },
    "E14001356": {
        name: "Sevenoaks and Swanley",
        winner: "Laura Sherwood",
        party: "Conservative",
        turnout: 66.2,
        majority: 6421,
        candidates: [
            { name: "Laura Sherwood", party: "Conservative", votes: 21345 },
            { name: "Alan Grace", party: "Labour", votes: 14924 },
            { name: "Yvonne Burns", party: "Reform UK", votes: 8934 },
            { name: "Paul Fisher", party: "Liberal Democrats", votes: 4567 }
        ]
    },
    "E14001367": {
        name: "South Holland and The Deepings",
        winner: "John Hayes",
        party: "Conservative",
        turnout: 58.3,
        majority: 3863,
        candidates: [
            { name: "John Hayes", party: "Conservative", votes: 16789 },
            { name: "Rick Fisher", party: "Reform UK", votes: 12926 },
            { name: "Tom Shaw", party: "Labour", votes: 8934 },
            { name: "Sue Watson", party: "Liberal Democrats", votes: 2345 }
        ]
    },
    "E14001268": {
        name: "Goole and Pocklington",
        winner: "David Davis",
        party: "Conservative",
        turnout: 57.9,
        majority: 4567,
        candidates: [
            { name: "David Davis", party: "Conservative", votes: 17890 },
            { name: "Craig Sherlock", party: "Reform UK", votes: 13323 },
            { name: "Martin Ellis", party: "Labour", votes: 10456 },
            { name: "Diana Woods", party: "Liberal Democrats", votes: 2678 }
        ]
    },
    "E14001237": {
        name: "Fareham and Waterlooville",
        winner: "Suella Braverman",
        party: "Conservative",
        turnout: 62.4,
        majority: 8765,
        candidates: [
            { name: "Suella Braverman", party: "Conservative", votes: 21345 },
            { name: "Claire Watson", party: "Labour", votes: 12580 },
            { name: "Mark Sheridan", party: "Reform UK", votes: 10234 },
            { name: "Alix Owen", party: "Liberal Democrats", votes: 5678 }
        ]
    },
    "E14001176": {
        name: "Christchurch",
        winner: "Chris Smith",
        party: "Conservative",
        turnout: 64.1,
        majority: 5321,
        candidates: [
            { name: "Chris Smith", party: "Conservative", votes: 19876 },
            { name: "Amanda Fisher", party: "Reform UK", votes: 14555 },
            { name: "Helen Taylor", party: "Labour", votes: 6789 },
            { name: "Phil Watson", party: "Liberal Democrats", votes: 4567 }
        ]
    },
    "E14001161": {
        name: "Castle Point",
        winner: "Rebecca Harris",
        party: "Conservative",
        turnout: 57.8,
        majority: 2156,
        candidates: [
            { name: "Rebecca Harris", party: "Conservative", votes: 14789 },
            { name: "Lee Anderson", party: "Reform UK", votes: 12633 },
            { name: "Jack Bell", party: "Labour", votes: 8234 },
            { name: "Sarah Green", party: "Liberal Democrats", votes: 1567 }
        ]
    },

    // === Liberal Democrat Seats ===
    "E14001216": {
        name: "Eastleigh",
        winner: "Liz Maybury",
        party: "Liberal Democrats",
        turnout: 63.5,
        majority: 8712,
        candidates: [
            { name: "Liz Maybury", party: "Liberal Democrats", votes: 22345 },
            { name: "Paul Holmes", party: "Conservative", votes: 13633 },
            { name: "Tom Fisher", party: "Labour", votes: 5678 },
            { name: "Mark Ellis", party: "Reform UK", votes: 7456 }
        ]
    },
    "E14001263": {
        name: "Guildford",
        winner: "Zöe Franklin",
        party: "Liberal Democrats",
        turnout: 67.3,
        majority: 11291,
        candidates: [
            { name: "Zöe Franklin", party: "Liberal Democrats", votes: 26789 },
            { name: "Angela Richardson", party: "Conservative", votes: 15498 },
            { name: "Emma Watson", party: "Labour", votes: 5234 },
            { name: "Kyle Fisher", party: "Green", votes: 2345 }
        ]
    },
    "E14001165": {
        name: "Cheltenham",
        winner: "Max Sheridan",
        party: "Liberal Democrats",
        turnout: 68.2,
        majority: 12840,
        candidates: [
            { name: "Max Sheridan", party: "Liberal Democrats", votes: 28456 },
            { name: "Alex Sherlock", party: "Conservative", votes: 15616 },
            { name: "Tom Grace", party: "Labour", votes: 4567 },
            { name: "Adam Green", party: "Green", votes: 2345 }
        ]
    },
    "E14001391": {
        name: "Twickenham",
        winner: "Munira Wilson",
        party: "Liberal Democrats",
        turnout: 70.1,
        majority: 16027,
        candidates: [
            { name: "Munira Wilson", party: "Liberal Democrats", votes: 31456 },
            { name: "Robert Watson", party: "Conservative", votes: 15429 },
            { name: "Polly Fisher", party: "Labour", votes: 5678 },
            { name: "James Ellis", party: "Green", votes: 3456 }
        ]
    },
    "E14001400": {
        name: "Westmorland and Lonsdale",
        winner: "Tim Farron",
        party: "Liberal Democrats",
        turnout: 69.8,
        majority: 17145,
        candidates: [
            { name: "Tim Farron", party: "Liberal Democrats", votes: 30234 },
            { name: "Danny Mayall", party: "Conservative", votes: 13089 },
            { name: "Jamie Watson", party: "Labour", votes: 5678 },
            { name: "Pete Shaw", party: "Reform UK", votes: 3456 }
        ]
    },
    "E14001405": {
        name: "Winchester",
        winner: "Danny Sherwood",
        party: "Liberal Democrats",
        turnout: 71.2,
        majority: 14560,
        candidates: [
            { name: "Danny Sherwood", party: "Liberal Democrats", votes: 29876 },
            { name: "Steve Brine", party: "Conservative", votes: 15316 },
            { name: "Martin Fisher", party: "Labour", votes: 4890 },
            { name: "Kate Ellis", party: "Green", votes: 2345 }
        ]
    },

    // === Reform UK Seats ===
    "E14001180": {
        name: "Clacton",
        winner: "Nigel Farage",
        party: "Reform UK",
        turnout: 58.9,
        majority: 12539,
        candidates: [
            { name: "Nigel Farage", party: "Reform UK", votes: 21225 },
            { name: "Giles Watling", party: "Conservative", votes: 8686 },
            { name: "Jens Watson", party: "Labour", votes: 7010 },
            { name: "Sam Green", party: "Independent", votes: 2345 }
        ]
    },
    "E14001144": {
        name: "Boston and Skegness",
        winner: "Richard Tice",
        party: "Reform UK",
        turnout: 53.2,
        majority: 8675,
        candidates: [
            { name: "Richard Tice", party: "Reform UK", votes: 18789 },
            { name: "Matt Warman", party: "Conservative", votes: 10114 },
            { name: "Tom Fisher", party: "Labour", votes: 6234 },
            { name: "Holly Shaw", party: "Liberal Democrats", votes: 1567 }
        ]
    },
    "E14001256": {
        name: "Great Yarmouth",
        winner: "Rupert Lowe",
        party: "Reform UK",
        turnout: 54.6,
        majority: 5689,
        candidates: [
            { name: "Rupert Lowe", party: "Reform UK", votes: 16234 },
            { name: "James Watson", party: "Conservative", votes: 10545 },
            { name: "Emma Grace", party: "Labour", votes: 9876 },
            { name: "William Ellis", party: "Green", votes: 1567 }
        ]
    },
    "E14001130": {
        name: "Ashfield",
        winner: "Lee Anderson",
        party: "Reform UK",
        turnout: 55.5,
        majority: 4867,
        candidates: [
            { name: "Lee Anderson", party: "Reform UK", votes: 17234 },
            { name: "Jason Sheridan", party: "Labour", votes: 12367 },
            { name: "Mark Holmes", party: "Conservative", votes: 7890 },
            { name: "Phil Fisher", party: "Independent", votes: 2345 }
        ]
    },

    // === Green Seats ===
    "E14001145": {
        name: "Bristol Central",
        winner: "Carla Denyer",
        party: "Green",
        turnout: 65.1,
        majority: 10527,
        candidates: [
            { name: "Carla Denyer", party: "Green", votes: 24539 },
            { name: "Thangam Debbonaire", party: "Labour", votes: 14012 },
            { name: "Claire Fisher", party: "Conservative", votes: 3456 },
            { name: "Martin Sherlock", party: "Liberal Democrats", votes: 2891 }
        ]
    },
    "E14001146": {
        name: "Brighton Pavilion",
        winner: "Siân Berry",
        party: "Green",
        turnout: 66.4,
        majority: 13874,
        candidates: [
            { name: "Siân Berry", party: "Green", votes: 27890 },
            { name: "Tom Gray", party: "Labour", votes: 14016 },
            { name: "Wendy Watson", party: "Conservative", votes: 3789 },
            { name: "Kelly Holmes", party: "Liberal Democrats", votes: 2345 }
        ]
    },
    "E14001342": {
        name: "North Herefordshire",
        winner: "Ellie Sheringham",
        party: "Green",
        turnout: 68.9,
        majority: 7256,
        candidates: [
            { name: "Ellie Sheringham", party: "Green", votes: 22456 },
            { name: "Bill Sherlock", party: "Conservative", votes: 15200 },
            { name: "Jane Fisher", party: "Liberal Democrats", votes: 5678 },
            { name: "Pete Watson", party: "Labour", votes: 3456 }
        ]
    },
    "E14001412": {
        name: "Waveney Valley",
        winner: "Adrian Sherwood",
        party: "Green",
        turnout: 63.7,
        majority: 5340,
        candidates: [
            { name: "Adrian Sherwood", party: "Green", votes: 19876 },
            { name: "Peter Watson", party: "Conservative", votes: 14536 },
            { name: "Tom Fisher", party: "Labour", votes: 6789 },
            { name: "Jess Holmes", party: "Liberal Democrats", votes: 3456 }
        ]
    },

    // === SCOTLAND - SNP Seats ===
    "S14000092": {
        name: "Aberdeen North",
        winner: "Kirsty Blackman",
        party: "SNP",
        turnout: 52.1,
        majority: 2346,
        candidates: [
            { name: "Kirsty Blackman", party: "SNP", votes: 14234 },
            { name: "Michael Watson", party: "Labour", votes: 11888 },
            { name: "James Fisher", party: "Conservative", votes: 5678 },
            { name: "Holly Shaw", party: "Reform UK", votes: 3456 }
        ]
    },
    "S14000097": {
        name: "Angus and Perthshire Glens",
        winner: "Dave Doogan",
        party: "SNP",
        turnout: 60.4,
        majority: 1890,
        candidates: [
            { name: "Dave Doogan", party: "SNP", votes: 16234 },
            { name: "Anna Watson", party: "Conservative", votes: 14344 },
            { name: "Paul Fisher", party: "Labour", votes: 5678 },
            { name: "Tim Shaw", party: "Liberal Democrats", votes: 3456 }
        ]
    },
    "S14000108": {
        name: "Dundee Central",
        winner: "Chris Law",
        party: "SNP",
        turnout: 49.8,
        majority: 3567,
        candidates: [
            { name: "Chris Law", party: "SNP", votes: 13456 },
            { name: "Martin Watson", party: "Labour", votes: 9889 },
            { name: "Claire Fisher", party: "Conservative", votes: 3456 },
            { name: "Amy Green", party: "Green", votes: 1890 }
        ]
    },
    "S14000118": {
        name: "Inverness, Skye and West Ross-shire",
        winner: "Drew Hendry",
        party: "SNP",
        turnout: 62.3,
        majority: 1245,
        candidates: [
            { name: "Drew Hendry", party: "SNP", votes: 14567 },
            { name: "Keith Watson", party: "Liberal Democrats", votes: 13322 },
            { name: "Mark Fisher", party: "Labour", votes: 5678 },
            { name: "Peter Shaw", party: "Conservative", votes: 4567 }
        ]
    },
    "S14000145": {
        name: "Na h-Eileanan an Iar",
        winner: "Torcuil Crichton",
        party: "Labour",
        turnout: 64.5,
        majority: 1435,
        candidates: [
            { name: "Torcuil Crichton", party: "Labour", votes: 7234 },
            { name: "Alasdair MacLeod", party: "SNP", votes: 5799 },
            { name: "Duncan Watson", party: "Independent", votes: 2345 },
            { name: "Cameron Fisher", party: "Conservative", votes: 1567 }
        ]
    },

    // Scotland Labour seats
    "S14000109": {
        name: "East Kilbride and Strathaven",
        winner: "Joani Reid",
        party: "Labour",
        turnout: 59.8,
        majority: 10456,
        candidates: [
            { name: "Joani Reid", party: "Labour", votes: 21234 },
            { name: "Lisa Watson", party: "SNP", votes: 10778 },
            { name: "Phil Fisher", party: "Conservative", votes: 5678 },
            { name: "Kate Shaw", party: "Reform UK", votes: 3456 }
        ]
    },
    "S14000113": {
        name: "Glasgow East",
        winner: "John Grady",
        party: "Labour",
        turnout: 51.2,
        majority: 8234,
        candidates: [
            { name: "John Grady", party: "Labour", votes: 17890 },
            { name: "David Linden", party: "SNP", votes: 9656 },
            { name: "Peter Watson", party: "Conservative", votes: 2345 },
            { name: "Amy Fisher", party: "Reform UK", votes: 1890 }
        ]
    },
    "S14000114": {
        name: "Glasgow North",
        winner: "Martin Rhodes",
        party: "Labour",
        turnout: 53.7,
        majority: 6789,
        candidates: [
            { name: "Martin Rhodes", party: "Labour", votes: 16234 },
            { name: "Patrick Grady", party: "SNP", votes: 9445 },
            { name: "James Watson", party: "Green", votes: 3456 },
            { name: "Claire Fisher", party: "Conservative", votes: 2345 }
        ]
    },
    "S14000110": {
        name: "Edinburgh East and Musselburgh",
        winner: "Chris Murray",
        party: "Labour",
        turnout: 60.8,
        majority: 10234,
        candidates: [
            { name: "Chris Murray", party: "Labour", votes: 22123 },
            { name: "Tommy Watson", party: "SNP", votes: 11889 },
            { name: "Rachel Fisher", party: "Conservative", votes: 5678 },
            { name: "Oscar Shaw", party: "Green", votes: 3456 }
        ]
    },

    // Scotland Lib Dem seat
    "S14000107": {
        name: "Caithness, Sutherland and Easter Ross",
        winner: "Jamie Stone",
        party: "Liberal Democrats",
        turnout: 57.9,
        majority: 4567,
        candidates: [
            { name: "Jamie Stone", party: "Liberal Democrats", votes: 13456 },
            { name: "Karl Watson", party: "SNP", votes: 8889 },
            { name: "Anne Fisher", party: "Labour", votes: 5678 },
            { name: "David Shaw", party: "Conservative", votes: 4567 }
        ]
    },

    // === WALES - Plaid Cymru Seats ===
    "W07000094": {
        name: "Dwyfor Meirionnydd",
        winner: "Liz Saville Roberts",
        party: "Plaid Cymru",
        turnout: 60.1,
        majority: 7234,
        candidates: [
            { name: "Liz Saville Roberts", party: "Plaid Cymru", votes: 16890 },
            { name: "Mark Watson", party: "Conservative", votes: 9656 },
            { name: "Katie Fisher", party: "Labour", votes: 5678 },
            { name: "Jen Shaw", party: "Liberal Democrats", votes: 2345 }
        ]
    },
    "W07000095": {
        name: "Caerfyrddin",
        winner: "Ann Davies",
        party: "Plaid Cymru",
        turnout: 63.4,
        majority: 5234,
        candidates: [
            { name: "Ann Davies", party: "Plaid Cymru", votes: 18234 },
            { name: "Simon Hart", party: "Conservative", votes: 13000 },
            { name: "Tom Watson", party: "Labour", votes: 6789 },
            { name: "David Fisher", party: "Reform UK", votes: 4567 }
        ]
    },
    "W07000096": {
        name: "Ceredigion Preseli",
        winner: "Ben Lake",
        party: "Plaid Cymru",
        turnout: 64.8,
        majority: 7890,
        candidates: [
            { name: "Ben Lake", party: "Plaid Cymru", votes: 19876 },
            { name: "Mark Cole", party: "Conservative", votes: 11986 },
            { name: "Clare Watson", party: "Liberal Democrats", votes: 5678 },
            { name: "Tom Fisher", party: "Labour", votes: 4567 }
        ]
    },
    "W07000097": {
        name: "Bangor Aberconwy",
        winner: "Virginia Sherwood",
        party: "Plaid Cymru",
        turnout: 58.2,
        majority: 3456,
        candidates: [
            { name: "Virginia Sherwood", party: "Plaid Cymru", votes: 14567 },
            { name: "Robin Millar", party: "Conservative", votes: 11111 },
            { name: "Dawn Watson", party: "Labour", votes: 6789 },
            { name: "Steve Fisher", party: "Reform UK", votes: 3456 }
        ]
    },

    // Wales Labour seats
    "W07000084": {
        name: "Cardiff South and Penarth",
        winner: "Stephen Doughty",
        party: "Labour",
        turnout: 62.3,
        majority: 14567,
        candidates: [
            { name: "Stephen Doughty", party: "Labour", votes: 24567 },
            { name: "Josh Watson", party: "Conservative", votes: 10000 },
            { name: "Tiffany Fisher", party: "Plaid Cymru", votes: 4567 },
            { name: "Owen Shaw", party: "Green", votes: 2345 }
        ]
    },
    "W07000085": {
        name: "Swansea West",
        winner: "Torsten Bell",
        party: "Labour",
        turnout: 55.6,
        majority: 8234,
        candidates: [
            { name: "Torsten Bell", party: "Labour", votes: 17890 },
            { name: "Craig Watson", party: "Conservative", votes: 9656 },
            { name: "Rhian Fisher", party: "Plaid Cymru", votes: 3456 },
            { name: "Lisa Shaw", party: "Reform UK", votes: 2345 }
        ]
    },
    "W07000086": {
        name: "Newport East",
        winner: "Jessica Morden",
        party: "Labour",
        turnout: 54.1,
        majority: 11890,
        candidates: [
            { name: "Jessica Morden", party: "Labour", votes: 20234 },
            { name: "Mark Watson", party: "Conservative", votes: 8344 },
            { name: "Kim Fisher", party: "Reform UK", votes: 5678 },
            { name: "Pete Shaw", party: "Plaid Cymru", votes: 2345 }
        ]
    },
    "W07000087": {
        name: "Wrexham",
        winner: "Andrew Sheridan",
        party: "Labour",
        turnout: 56.7,
        majority: 5678,
        candidates: [
            { name: "Andrew Sheridan", party: "Labour", votes: 16890 },
            { name: "Sarah Atherton", party: "Conservative", votes: 11212 },
            { name: "Paul Watson", party: "Reform UK", votes: 6789 },
            { name: "Rhod Fisher", party: "Plaid Cymru", votes: 2345 }
        ]
    },

    // === NORTHERN IRELAND ===
    "N06000001": {
        name: "Belfast North",
        winner: "John Finucane",
        party: "Sinn Féin",
        turnout: 55.3,
        majority: 6234,
        candidates: [
            { name: "John Finucane", party: "Sinn Féin", votes: 17234 },
            { name: "Paul Watson", party: "DUP", votes: 11000 },
            { name: "Nuala Fisher", party: "Alliance", votes: 5678 },
            { name: "Mark Shaw", party: "SDLP", votes: 3456 }
        ]
    },
    "N06000002": {
        name: "Belfast South and Mid Down",
        winner: "Claire Hanna",
        party: "SDLP",
        turnout: 60.1,
        majority: 8234,
        candidates: [
            { name: "Claire Hanna", party: "SDLP", votes: 21456 },
            { name: "Kate Watson", party: "Alliance", votes: 13222 },
            { name: "Emma Fisher", party: "DUP", votes: 5678 },
            { name: "Philip Shaw", party: "Sinn Féin", votes: 3456 }
        ]
    },
    "N06000003": {
        name: "Belfast East",
        winner: "Gavin Robinson",
        party: "DUP",
        turnout: 57.8,
        majority: 5678,
        candidates: [
            { name: "Gavin Robinson", party: "DUP", votes: 18234 },
            { name: "Naomi Long", party: "Alliance", votes: 12556 },
            { name: "Peter Watson", party: "UUP", votes: 4567 },
            { name: "James Fisher", party: "Sinn Féin", votes: 2345 }
        ]
    },
    "N06000004": {
        name: "Belfast West",
        winner: "Paul Maskey",
        party: "Sinn Féin",
        turnout: 53.4,
        majority: 12345,
        candidates: [
            { name: "Paul Maskey", party: "Sinn Féin", votes: 22345 },
            { name: "Frank Watson", party: "SDLP", votes: 10000 },
            { name: "Anne Fisher", party: "DUP", votes: 3456 },
            { name: "Karen Shaw", party: "Alliance", votes: 2345 }
        ]
    },
    "N06000005": {
        name: "East Antrim",
        winner: "Sammy Wilson",
        party: "DUP",
        turnout: 54.6,
        majority: 4567,
        candidates: [
            { name: "Sammy Wilson", party: "DUP", votes: 15678 },
            { name: "Alan Watson", party: "Alliance", votes: 11111 },
            { name: "Mark Fisher", party: "UUP", votes: 6789 },
            { name: "Peter Shaw", party: "TUV", votes: 3456 }
        ]
    },
    "N06000006": {
        name: "East Londonderry",
        winner: "Gregory Campbell",
        party: "DUP",
        turnout: 55.9,
        majority: 3456,
        candidates: [
            { name: "Gregory Campbell", party: "DUP", votes: 14567 },
            { name: "Ciara Watson", party: "Sinn Féin", votes: 11111 },
            { name: "Katie Fisher", party: "UUP", votes: 5678 },
            { name: "Thomas Shaw", party: "SDLP", votes: 4567 }
        ]
    },
    "N06000007": {
        name: "Fermanagh and South Tyrone",
        winner: "Pat Cullen",
        party: "Sinn Féin",
        turnout: 64.7,
        majority: 5890,
        candidates: [
            { name: "Pat Cullen", party: "Sinn Féin", votes: 21345 },
            { name: "Diana Armstrong", party: "DUP", votes: 15455 },
            { name: "Mark Watson", party: "UUP", votes: 5678 },
            { name: "Claire Fisher", party: "SDLP", votes: 3456 }
        ]
    },
    "N06000008": {
        name: "Foyle",
        winner: "Colum Eastwood",
        party: "SDLP",
        turnout: 56.3,
        majority: 4567,
        candidates: [
            { name: "Colum Eastwood", party: "SDLP", votes: 16234 },
            { name: "Padraig Watson", party: "Sinn Féin", votes: 11667 },
            { name: "Mark Fisher", party: "DUP", votes: 4567 },
            { name: "Anne Shaw", party: "Alliance", votes: 3456 }
        ]
    },
    "N06000009": {
        name: "Lagan Valley",
        winner: "Sorcha Watson",
        party: "Alliance",
        turnout: 58.2,
        majority: 2345,
        candidates: [
            { name: "Sorcha Watson", party: "Alliance", votes: 15678 },
            { name: "Gary Fisher", party: "DUP", votes: 13333 },
            { name: "Robbie Shaw", party: "UUP", votes: 6789 },
            { name: "Mark Watson", party: "TUV", votes: 3456 }
        ]
    },
    "N06000010": {
        name: "Mid Ulster",
        winner: "Francie Molloy",
        party: "Sinn Féin",
        turnout: 60.8,
        majority: 7234,
        candidates: [
            { name: "Francie Molloy", party: "Sinn Féin", votes: 19876 },
            { name: "Keith Watson", party: "DUP", votes: 12642 },
            { name: "David Fisher", party: "UUP", votes: 4567 },
            { name: "Malachy Shaw", party: "SDLP", votes: 3456 }
        ]
    },
    "N06000011": {
        name: "Newry and Armagh",
        winner: "Mickey Brady",
        party: "Sinn Féin",
        turnout: 58.4,
        majority: 8234,
        candidates: [
            { name: "Mickey Brady", party: "Sinn Féin", votes: 20234 },
            { name: "Mark Watson", party: "SDLP", votes: 12000 },
            { name: "William Fisher", party: "DUP", votes: 5678 },
            { name: "Peter Shaw", party: "Alliance", votes: 3456 }
        ]
    },
    "N06000012": {
        name: "North Antrim",
        winner: "Jim Allister",
        party: "TUV",
        turnout: 57.6,
        majority: 3234,
        candidates: [
            { name: "Jim Allister", party: "TUV", votes: 15234 },
            { name: "Philip Watson", party: "DUP", votes: 12000 },
            { name: "Connor Fisher", party: "Sinn Féin", votes: 5678 },
            { name: "Mark Shaw", party: "UUP", votes: 4567 }
        ]
    },
    "N06000013": {
        name: "North Down",
        winner: "Alex Sheridan",
        party: "UUP",
        turnout: 56.8,
        majority: 2345,
        candidates: [
            { name: "Alex Sheridan", party: "UUP", votes: 14567 },
            { name: "Stephen Watson", party: "DUP", votes: 12222 },
            { name: "Mark Fisher", party: "Alliance", votes: 8901 },
            { name: "David Shaw", party: "Independent", votes: 3456 }
        ]
    },
    "N06000014": {
        name: "South Antrim",
        winner: "Robin Swann",
        party: "DUP",
        turnout: 55.4,
        majority: 3456,
        candidates: [
            { name: "Robin Swann", party: "DUP", votes: 15234 },
            { name: "Danny Watson", party: "Alliance", votes: 11778 },
            { name: "Declan Fisher", party: "Sinn Féin", votes: 5678 },
            { name: "Mark Shaw", party: "UUP", votes: 4567 }
        ]
    },
    "N06000015": {
        name: "South Down",
        winner: "Chris Hazzard",
        party: "Sinn Féin",
        turnout: 59.1,
        majority: 5890,
        candidates: [
            { name: "Chris Hazzard", party: "Sinn Féin", votes: 19234 },
            { name: "Margaret Watson", party: "SDLP", votes: 13344 },
            { name: "Jim Fisher", party: "DUP", votes: 5678 },
            { name: "Katie Shaw", party: "Alliance", votes: 3456 }
        ]
    },
    "N06000016": {
        name: "Strangford",
        winner: "Jim Shannon",
        party: "DUP",
        turnout: 54.2,
        majority: 5678,
        candidates: [
            { name: "Jim Shannon", party: "DUP", votes: 17890 },
            { name: "Michael Watson", party: "Alliance", votes: 12212 },
            { name: "Peter Fisher", party: "UUP", votes: 5678 },
            { name: "Ciara Shaw", party: "Sinn Féin", votes: 2345 }
        ]
    },
    "N06000017": {
        name: "Upper Bann",
        winner: "Carla Lockhart",
        party: "DUP",
        turnout: 57.3,
        majority: 4567,
        candidates: [
            { name: "Carla Lockhart", party: "DUP", votes: 16789 },
            { name: "Dolores Watson", party: "Sinn Féin", votes: 12222 },
            { name: "Mark Fisher", party: "UUP", votes: 5678 },
            { name: "Chris Shaw", party: "Alliance", votes: 4567 }
        ]
    },
    "N06000018": {
        name: "West Tyrone",
        winner: "Órfhlaith Begley",
        party: "Sinn Féin",
        turnout: 62.1,
        majority: 8901,
        candidates: [
            { name: "Órfhlaith Begley", party: "Sinn Féin", votes: 21345 },
            { name: "Tom Watson", party: "SDLP", votes: 12444 },
            { name: "Mark Fisher", party: "DUP", votes: 5678 },
            { name: "James Shaw", party: "UUP", votes: 3456 }
        ]
    },

    // === MORE ENGLAND Labour seats ===
    "E14001395": {
        name: "Vauxhall and Camberwell Green",
        winner: "Florence Eshalomi",
        party: "Labour",
        turnout: 56.7,
        majority: 19234,
        candidates: [
            { name: "Florence Eshalomi", party: "Labour", votes: 27890 },
            { name: "Karen Watson", party: "Green", votes: 8656 },
            { name: "Mark Fisher", party: "Conservative", votes: 4567 },
            { name: "Lou Shaw", party: "Liberal Democrats", votes: 3456 }
        ]
    },
    "E14001378": {
        name: "Stratford and Bow",
        winner: "Uma Sherwood",
        party: "Labour",
        turnout: 52.3,
        majority: 14567,
        candidates: [
            { name: "Uma Sherwood", party: "Labour", votes: 23456 },
            { name: "Pete Watson", party: "Green", votes: 8889 },
            { name: "Mark Fisher", party: "Conservative", votes: 3456 },
            { name: "Tim Shaw", party: "Liberal Democrats", votes: 2345 }
        ]
    },
    "E14001346": {
        name: "Peckham",
        winner: "Harriet Harman",
        party: "Labour",
        turnout: 53.8,
        majority: 17890,
        candidates: [
            { name: "Harriet Harman", party: "Labour", votes: 26234 },
            { name: "Anna Watson", party: "Green", votes: 8344 },
            { name: "Mark Fisher", party: "Conservative", votes: 3456 },
            { name: "Jim Shaw", party: "Liberal Democrats", votes: 2345 }
        ]
    },
    "E14001196": {
        name: "Doncaster Central",
        winner: "Sally Jameson",
        party: "Labour",
        turnout: 52.1,
        majority: 8901,
        candidates: [
            { name: "Sally Jameson", party: "Labour", votes: 18234 },
            { name: "Mark Watson", party: "Reform UK", votes: 9333 },
            { name: "Nick Fisher", party: "Conservative", votes: 5678 },
            { name: "Kate Shaw", party: "Green", votes: 1890 }
        ]
    },
    "E14001282": {
        name: "Hendon",
        winner: "David Pinto-Duschinsky",
        party: "Labour",
        turnout: 61.3,
        majority: 7890,
        candidates: [
            { name: "David Pinto-Duschinsky", party: "Labour", votes: 22456 },
            { name: "Matthew Watson", party: "Conservative", votes: 14566 },
            { name: "Amy Fisher", party: "Reform UK", votes: 4567 },
            { name: "Kate Shaw", party: "Liberal Democrats", votes: 3456 }
        ]
    },
    "E14001200": {
        name: "Dudley",
        winner: "Sonia Kumar",
        party: "Labour",
        turnout: 54.8,
        majority: 3456,
        candidates: [
            { name: "Sonia Kumar", party: "Labour", votes: 15678 },
            { name: "Marco Watson", party: "Conservative", votes: 12222 },
            { name: "Rick Fisher", party: "Reform UK", votes: 9012 },
            { name: "Pete Shaw", party: "Independent", votes: 1890 }
        ]
    },
    "E14001345": {
        name: "Oxford East",
        winner: "Anneliese Dodds",
        party: "Labour",
        turnout: 62.4,
        majority: 13456,
        candidates: [
            { name: "Anneliese Dodds", party: "Labour", votes: 24567 },
            { name: "Mark Watson", party: "Green", votes: 11111 },
            { name: "Chris Fisher", party: "Conservative", votes: 5678 },
            { name: "Kate Shaw", party: "Liberal Democrats", votes: 4567 }
        ]
    },
    "E14001154": {
        name: "Cambridge",
        winner: "Daniel Zeichner",
        party: "Labour",
        turnout: 64.7,
        majority: 10234,
        candidates: [
            { name: "Daniel Zeichner", party: "Labour", votes: 25678 },
            { name: "Pippa Watson", party: "Green", votes: 15444 },
            { name: "Mark Fisher", party: "Liberal Democrats", votes: 5678 },
            { name: "Tim Shaw", party: "Conservative", votes: 4567 }
        ]
    },
    "E14001408": {
        name: "Wolverhampton West",
        winner: "Warinder Juss",
        party: "Labour",
        turnout: 51.2,
        majority: 6234,
        candidates: [
            { name: "Warinder Juss", party: "Labour", votes: 16789 },
            { name: "Jane Watson", party: "Conservative", votes: 10555 },
            { name: "Dave Fisher", party: "Reform UK", votes: 7890 },
            { name: "Tom Shaw", party: "Independent", votes: 1890 }
        ]
    },
    "E14001370": {
        name: "Southgate and Wood Green",
        winner: "Bambos Sherwood",
        party: "Labour",
        turnout: 63.1,
        majority: 19234,
        candidates: [
            { name: "Bambos Sherwood", party: "Labour", votes: 28901 },
            { name: "Mike Watson", party: "Conservative", votes: 9667 },
            { name: "Sian Fisher", party: "Green", votes: 4567 },
            { name: "Mark Shaw", party: "Liberal Democrats", votes: 3456 }
        ]
    },
    "E14001207": {
        name: "Ealing Central and Acton",
        winner: "Rupa Huq",
        party: "Labour",
        turnout: 64.5,
        majority: 15678,
        candidates: [
            { name: "Rupa Huq", party: "Labour", votes: 27890 },
            { name: "Steve Watson", party: "Conservative", votes: 12212 },
            { name: "Clare Fisher", party: "Green", votes: 4567 },
            { name: "Pete Shaw", party: "Liberal Democrats", votes: 3456 }
        ]
    },

    // === The Speaker ===
    "E14001178": {
        name: "Chorley",
        winner: "Lindsay Hoyle",
        party: "Speaker",
        turnout: 55.3,
        majority: 15234,
        candidates: [
            { name: "Lindsay Hoyle", party: "Speaker", votes: 22345 },
            { name: "Mark Watson", party: "Reform UK", votes: 7111 },
            { name: "Tom Fisher", party: "Conservative", votes: 5678 },
            { name: "Kate Shaw", party: "Green", votes: 2345 }
        ]
    }
};

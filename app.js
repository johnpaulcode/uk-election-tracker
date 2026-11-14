// Party colours and display names, keyed by the short codes used in data/results.js
const PARTIES = {
  Con: { name: 'Conservative', color: '#0087DC' },
  Lab: { name: 'Labour', color: '#E4003B' },
  LD: { name: 'Liberal Democrat', color: '#FAA61A' },
  RUK: { name: 'Reform UK', color: '#12B6CF' },
  Green: { name: 'Green', color: '#02A95B' },
  SNP: { name: 'SNP', color: '#FDF38E' },
  PC: { name: 'Plaid Cymru', color: '#005B54' },
  DUP: { name: 'DUP', color: '#D46A4C' },
  SF: { name: 'Sinn Féin', color: '#326760' },
  SDLP: { name: 'SDLP', color: '#2AA82C' },
  UUP: { name: 'UUP', color: '#48A5EE' },
  APNI: { name: 'Alliance', color: '#F6CB2F' },
  Ind: { name: 'Independent', color: '#E5E7EB' },
  TUV: { name: 'TUV', color: '#0C3A6A' },
  Spk: { name: 'Speaker', color: '#909090' },
  // Parties formed since 2024; they only appear in live overrides. Neutral colours, not brand ones.
  YP: { name: 'Your Party', color: '#64748B' },
  RB: { name: 'Restore Britain', color: '#64748B' },
  Vacant: { name: 'Vacant', color: '#475569' },
  Other: { name: 'Other', color: '#9CA3AF' }
};

// Codes that appear in the data under a different spelling
const PARTY_ALIASES = { Ref: 'RUK', 'All other candidates': 'Other' };

const TOTAL_SEATS = 650;
const OVERRIDES = typeof LIVE_OVERRIDES !== 'undefined' ? LIVE_OVERRIDES : {};
const OVERRIDE_COLOR = '#fbbf24';

function partyKey(code) {
  const key = PARTY_ALIASES[code] || code;
  return PARTIES[key] ? key : 'Other';
}

function partyColor(code) {
  return PARTIES[partyKey(code)].color;
}

// Known parties show their short code; unknown ones keep whatever the data says
function partyLabel(code) {
  const key = partyKey(code);
  return key === 'Other' ? (code === 'All other candidates' ? 'Others' : code) : key;
}

function setPartyBadge(el, code) {
  el.className = 'party-badge party-' + partyKey(code).toLowerCase();
  el.textContent = partyLabel(code);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ---------- National dashboard ----------

function renderDashboard() {
  const bar = document.getElementById('seat-progress-container');
  const legend = document.getElementById('seat-legend');
  if (!bar || !legend || typeof SEAT_SUMMARY === 'undefined') return;

  const parties = Object.entries(SEAT_SUMMARY)
    .filter(([, seats]) => seats > 0)
    .sort((a, b) => b[1] - a[1]);

  parties.forEach(([code, seats]) => {
    const key = partyKey(code);
    const name = PARTIES[key].name;

    const segment = el('div', 'seat-segment party-' + key.toLowerCase());
    segment.style.width = (seats / TOTAL_SEATS * 100) + '%';
    segment.title = `${name}: ${seats} seats`;
    if (seats >= 40) segment.textContent = seats;
    bar.appendChild(segment);

    const item = el('div', 'legend-item');
    const swatch = el('span', 'legend-color');
    swatch.style.backgroundColor = PARTIES[key].color;
    item.append(swatch, el('span', null, name), el('strong', null, seats));
    legend.appendChild(item);
  });
}

// ---------- Constituency panel ----------

const infoPanel = document.getElementById('constituency-info');
const placeholderText = document.querySelector('.placeholder-text');
const elName = document.getElementById('constituency-name');
const elOverride = document.getElementById('override-container');
const elWinner = document.getElementById('winner-name');
const elPartyBadge = document.getElementById('winner-party');
const elMajority = document.getElementById('winner-majority');
const elTurnout = document.getElementById('voter-turnout');
const elCandidateList = document.getElementById('candidate-list');

function renderOverride(code) {
  elOverride.replaceChildren();
  const live = OVERRIDES[code];
  if (!live) return;

  const headings = {
    'by-election': 'By-election since 2024',
    party: 'Changed party since 2024',
    vacant: 'Seat currently vacant'
  };
  const alert = el('div', 'live-override-alert');
  alert.appendChild(el('h4', null, headings[live.change] || 'Status changed since 2024'));

  if (live.change !== 'vacant') {
    const mp = el('p');
    mp.append(el('strong', null, 'Current MP: '), live.new_winner);

    const party = el('p');
    const badge = el('span');
    setPartyBadge(badge, live.new_party);
    badge.textContent = PARTIES[partyKey(live.new_party)].name;
    party.append(el('strong', null, 'Current party: '), badge);
    alert.append(mp, party);
  }

  if (live.since) {
    const date = new Date(live.since + 'T00:00:00').toLocaleDateString('en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' });
    alert.appendChild(el('p', null, `By-election held ${date}`));
  }

  let note = `Elected 2024: ${live.old_winner} (${partyLabel(live.old_party)})`;
  if (typeof LIVE_OVERRIDES_UPDATED !== 'undefined') note += ` · checked ${LIVE_OVERRIDES_UPDATED}`;
  alert.appendChild(el('p', 'override-note', note));
  elOverride.appendChild(alert);
}

function swingBadge(swing) {
  const value = parseFloat(swing);
  if (Number.isNaN(value)) return null;
  const cls = value > 0 ? 'swing-positive' : value < 0 ? 'swing-negative' : 'swing-neutral';
  const badge = el('span', 'swing-badge ' + cls, swing + ' pts');
  badge.title = 'Change in vote share since 2019 (notional results on 2024 boundaries)';
  return badge;
}

function renderCandidates(candidates) {
  elCandidateList.replaceChildren();
  const standing = (candidates || []).filter(c => c.votes > 0);
  if (standing.length === 0) {
    elCandidateList.appendChild(el('li', null, 'No candidate data available.'));
    return;
  }

  const totalVotes = standing.reduce((sum, c) => sum + c.votes, 0);

  [...standing].sort((a, b) => b.votes - a.votes).forEach(cand => {
    const li = el('li');

    const party = el('span', 'candidate-party');
    const dot = el('span', 'candidate-party-badge');
    dot.style.backgroundColor = partyColor(cand.party);
    party.append(dot, partyLabel(cand.party));

    const figures = el('span', 'candidate-figures');
    figures.append(
      el('strong', null, cand.votes.toLocaleString()),
      el('span', 'candidate-share', (cand.votes / totalVotes * 100).toFixed(1) + '%')
    );
    const badge = cand.swing !== undefined ? swingBadge(cand.swing) : null;
    if (badge) figures.appendChild(badge);

    li.append(party, figures);
    elCandidateList.appendChild(li);
  });
}

function updateInfoPanel(code) {
  const data = RESULTS[code];
  if (!data) return;

  placeholderText.style.display = 'none';
  infoPanel.style.display = 'block';

  elName.textContent = data.name;
  renderOverride(code);
  elWinner.textContent = data.winner;
  setPartyBadge(elPartyBadge, data.party);
  elMajority.textContent = data.majority.toLocaleString();
  elTurnout.textContent = data.turnout.toFixed(1);
  renderCandidates(data.candidates);
}

function clearInfoPanel() {
  infoPanel.style.display = 'none';
  placeholderText.style.display = '';
}

// ---------- Map ----------

const map = L.map('map').setView([54.5, -4], 6);

// OpenStreetMap tiles, darkened in index.css (.leaflet-tile-pane). The CARTO dark
// basemap used previously now watermarks tiles unless an API key is supplied.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

// The seat pinned by a click; hovering elsewhere previews, then falls back to this
let selected = null; // { code, layer }

function baseStyle(code) {
  const result = RESULTS[code];
  const overridden = Boolean(OVERRIDES[code]);
  return {
    fillColor: partyColor(result ? result.party : 'Other'),
    weight: overridden ? 2 : 1,
    dashArray: overridden ? '5, 5' : '',
    opacity: 1,
    color: overridden ? OVERRIDE_COLOR : '#1e293b',
    fillOpacity: 0.8
  };
}

const HIGHLIGHT_STYLE = { weight: 3, color: '#f8fafc', dashArray: '', fillOpacity: 1 };

function tooltipContent(code) {
  const result = RESULTS[code];
  const wrap = el('div');
  wrap.append(el('strong', null, result.name), el('br'),
    `Winner: ${result.winner} (${partyLabel(result.party)})`);
  const live = OVERRIDES[code];
  if (live) {
    wrap.append(el('br'), el('span', 'tooltip-live', live.change === 'vacant'
      ? 'Now: vacant'
      : `Now: ${live.new_winner} (${partyLabel(live.new_party)})`));
  }
  return wrap;
}

function selectSeat(code, layer) {
  if (selected && selected.layer !== layer) {
    selected.layer.setStyle(baseStyle(selected.code));
  }
  selected = { code, layer };
  layer.setStyle(HIGHLIGHT_STYLE);
  layer.bringToFront();
  updateInfoPanel(code);
}

function renderGeoJSON(geojson) {
  const geojsonLayer = L.geoJSON(geojson, {
    style: feature => baseStyle(feature.properties.PCON24CD),
    onEachFeature: (feature, layer) => {
      const code = feature.properties.PCON24CD;
      if (!RESULTS[code]) return;

      layer.bindTooltip(() => tooltipContent(code), {
        sticky: true,
        className: 'custom-tooltip'
      });

      layer.on({
        mouseover: () => {
          layer.setStyle(HIGHLIGHT_STYLE);
          layer.bringToFront();
          updateInfoPanel(code);
        },
        mouseout: () => {
          if (selected && selected.layer === layer) return;
          layer.setStyle(baseStyle(code));
          if (selected) {
            selected.layer.bringToFront();
            updateInfoPanel(selected.code);
          } else {
            clearInfoPanel();
          }
        },
        click: e => {
          L.DomEvent.stopPropagation(e);
          selectSeat(code, layer);
        }
      });
    }
  }).addTo(map);

  // Clicking empty map clears the pinned seat
  map.on('click', () => {
    if (!selected) return;
    selected.layer.setStyle(baseStyle(selected.code));
    selected = null;
    clearInfoPanel();
  });

  map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });
}

// 2024 constituency boundaries (TopoJSON, via Jo Wood on ObservableHQ)
const topojsonUrl = 'https://static.observableusercontent.com/files/03bd2d7f0d8f92e9bf47859cf6bd5eb5305f61205d13e454f960c5ed5dab9d94ac6faa785a3375cc67cfdc0f1b6a608a3780530b647e129d779506c9dc52abb6';

renderDashboard();

fetch(topojsonUrl)
  .then(response => {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  })
  .then(topology => {
    const objectKey = Object.keys(topology.objects)[0];
    renderGeoJSON(topojson.feature(topology, topology.objects[objectKey]));
  })
  .catch(error => {
    console.error('Error loading constituency boundaries:', error);
    placeholderText.textContent = 'Could not load the map boundaries. Check your connection and reload.';
  });

// Define party colors for mapping
const partyColors = {
  'Con': '#0087DC',
  'Lab': '#E4003B',
  'LD': '#FAA61A',
  'RUK': '#12B6CF',
  'Green': '#02A95B',
  'SNP': '#FDF38E',
  'PC': '#005B54',
  'DUP': '#D46A4C',
  'SF': '#326760',
  'SDLP': '#2AA82C',
  'UUP': '#48A5EE',
  'APNI': '#F6CB2F',
  'Ind': '#E5E7EB',
  'TUV': '#0C3A6A',
  'Spk': '#909090',
  'Other': '#9CA3AF'
};

// Map initialization
const map = L.map('map').setView([54.5, -4], 6);

// Load dark mode tile layer (CartoDB Dark Matter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// DOM Elements
const infoPanel = document.getElementById('constituency-info');
const placeholderText = document.querySelector('.placeholder-text');
const elName = document.getElementById('constituency-name');
const elWinner = document.getElementById('winner-name');
const elPartyBadge = document.getElementById('winner-party');
const elMajority = document.getElementById('winner-majority');
const elTurnout = document.getElementById('voter-turnout');
const elCandidateList = document.getElementById('candidate-list');

function updateInfoPanel(data, code) {
  if (!data) return;

  placeholderText.style.display = 'none';
  infoPanel.style.display = 'block';

  elName.textContent = data.name;
  
  // Check for Live Overrides
  let overrideContainer = document.getElementById('override-container');
  if (!overrideContainer) {
      overrideContainer = document.createElement('div');
      overrideContainer.id = 'override-container';
      elName.parentNode.insertBefore(overrideContainer, elName.nextSibling);
  }
  
  if (code && typeof LIVE_OVERRIDES !== 'undefined' && LIVE_OVERRIDES[code]) {
      const liveData = LIVE_OVERRIDES[code];
      const newPartyColor = partyColors[liveData.new_party] || partyColors['Other'];
      overrideContainer.innerHTML = `
        <div class="live-override-alert">
          <h4>🚨 Live Status Changed</h4>
          <p><strong>Current MP:</strong> ${liveData.new_winner}</p>
          <p><strong>Current Party:</strong> <span class="party-badge party-${liveData.new_party.toLowerCase()}" style="background-color: ${newPartyColor};">${liveData.new_party}</span></p>
          <p style="font-size: 0.8em; opacity: 0.8; margin-top: 8px;">(Elected 2024: ${liveData.old_winner}, ${liveData.old_party})</p>
        </div>
      `;
  } else {
      overrideContainer.innerHTML = '';
  }

  elWinner.textContent = data.winner;
  
  elPartyBadge.textContent = data.party;
  const partyKey = data.party;
  const partyClass = 'party-' + (partyColors[partyKey] ? partyKey.toLowerCase() : 'other');
  
  // Clear old classes except party-badge
  elPartyBadge.className = 'party-badge';
  elPartyBadge.classList.add(partyClass);
  // Optional: Set fallback background if not defined via CSS class
  if (!partyColors[partyKey] && !document.querySelector('.' + partyClass)) {
      elPartyBadge.style.backgroundColor = partyColors['Other'];
  } else {
      elPartyBadge.style.backgroundColor = '';
  }

  elMajority.textContent = data.majority.toLocaleString();
  elTurnout.textContent = data.turnout.toFixed(1);

  // Render Candidates
  elCandidateList.innerHTML = '';
  if (data.candidates && data.candidates.length > 0) {
      // Sort candidates by votes descending
      const sortedCandidates = [...data.candidates].sort((a, b) => b.votes - a.votes);
      
      sortedCandidates.forEach(cand => {
          const li = document.createElement('li');
          
          const candParty = cand.party;
          const color = partyColors[candParty] || partyColors['Other'];
          
          let swingHtml = '';
          if (cand.swing !== undefined) {
              const swingVal = parseFloat(cand.swing);
              let swingClass = 'swing-neutral';
              if (swingVal > 0) swingClass = 'swing-positive';
              else if (swingVal < 0) swingClass = 'swing-negative';
              swingHtml = `<span class="swing-badge ${swingClass}">${cand.swing}%</span>`;
          }
          
          li.innerHTML = `
              <span><span class="candidate-party-badge" style="background-color: ${color};"></span>${candParty}</span>
              <strong>${cand.votes.toLocaleString()} ${swingHtml}</strong>
          `;
          elCandidateList.appendChild(li);
      });
  } else {
      elCandidateList.innerHTML = '<li>No candidate data available.</li>';
  }
}

// Fetch the TopoJSON data from the ObservableHQ source provided by Jo Wood
const topojsonUrl = 'https://static.observableusercontent.com/files/03bd2d7f0d8f92e9bf47859cf6bd5eb5305f61205d13e454f960c5ed5dab9d94ac6faa785a3375cc67cfdc0f1b6a608a3780530b647e129d779506c9dc52abb6';

fetch(topojsonUrl)
  .then(response => response.json())
  .then(topology => {
    // The topology object contains "objects" containing "constituencies2024longLatTopo"
    // Usually the key is just the first one or named specifically. We get the first object key:
    const objectKey = Object.keys(topology.objects)[0];
    const geojson = topojson.feature(topology, topology.objects[objectKey]);

    renderGeoJSON(geojson);
  })
  .catch(error => {
    console.error('Error loading constituency data:', error);
    elCandidateList.innerHTML = '<li>Error loading map boundaries. Please check console.</li>';
  });

function renderGeoJSON(geojson) {
  const geojsonLayer = L.geoJSON(geojson, {
    style: function(feature) {
      const code = feature.properties.PCON24CD; // Observable data uses PCON24CD
      const result = RESULTS[code];
      const partyKey = result ? result.party : 'Other';
      const color = partyColors[partyKey] || partyColors['Other'];
      const isOverridden = typeof LIVE_OVERRIDES !== 'undefined' && LIVE_OVERRIDES[code];
      
      return {
        fillColor: color,
        weight: isOverridden ? 2 : 1,
        dashArray: isOverridden ? '5, 5' : '',
        opacity: 1,
        color: isOverridden ? '#fbbf24' : '#1e293b',
        fillOpacity: 0.8
      };
    },
    onEachFeature: function(feature, layer) {
      const code = feature.properties.PCON24CD;
      const result = RESULTS[code];
      const isOverridden = typeof LIVE_OVERRIDES !== 'undefined' && LIVE_OVERRIDES[code];

      if (result) {
        // Tooltip
        let tooltipContent = `<strong>${result.name}</strong><br/>Winner: ${result.winner} (${result.party})`;
        if (isOverridden) {
            const liveData = LIVE_OVERRIDES[code];
            tooltipContent += `<br/><span style="color: #fbbf24;">🚨 Live: ${liveData.new_winner} (${liveData.new_party})</span>`;
        }
        
        layer.bindTooltip(tooltipContent, {
          sticky: true,
          className: 'custom-tooltip'
        });

        // Interactivity
        layer.on({
          mouseover: function(e) {
            const target = e.target;
            target.setStyle({
              weight: 3,
              color: '#f8fafc',
              dashArray: '',
              fillOpacity: 1
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              target.bringToFront();
            }
            updateInfoPanel(result, code);
          },
          mouseout: function(e) {
            const target = e.target;
            const partyKey = result.party;
            const color = partyColors[partyKey] || partyColors['Other'];
            
            target.setStyle({
              fillColor: color,
              weight: isOverridden ? 2 : 1,
              dashArray: isOverridden ? '5, 5' : '',
              color: isOverridden ? '#fbbf24' : '#1e293b',
              fillOpacity: 0.8
            });
          },
          click: function(e) {
            updateInfoPanel(result, code);
          }
        });
      }
    }
  }).addTo(map);

  map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });
}

// Add custom tooltip CSS via JS
const style = document.createElement('style');
style.innerHTML = `
  .custom-tooltip {
    background-color: #1e293b;
    color: #f8fafc;
    border: 1px solid #334155;
    border-radius: 4px;
    padding: 8px;
    font-family: inherit;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(style);

console.log("App ready. SEAT_SUMMARY: ", SEAT_SUMMARY);

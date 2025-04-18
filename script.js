// Initialize Feather icons and particles
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    createParticles();
    initializeDashboard();
});

// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleBtn = document.getElementById('toggle-sidebar');

toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    toggleIcon.setAttribute('data-feather', 
        sidebar.classList.contains('collapsed') ? 'chevron-right' : 'chevron-left');
    feather.replace();
});

// Create particles background effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            --x-drift: ${(Math.random() - 0.5) * 200}px;
            animation: rise ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// API Configuration
const API_BASE_URL = 'https://espflask.onrender.com';
let refreshInterval = 3000; // 3 seconds

// Dashboard initialization
async function initializeDashboard() {
    try {
        await updateAllUI();
        setInterval(updateAllUI, refreshInterval);
    } catch (error) {
        console.error('Dashboard init failed:', error);
        showError('System initialization failed');
    }
}

// Fetch real-time sensor data
async function fetchSensorData() {
    try {
        const response = await fetch(`${API_BASE_URL}/sensors`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const firebaseData = await response.json();
        if (!firebaseData) throw new Error('No data received');
        
        return Object.entries(firebaseData).map(([nodeName, nodeData]) => ({
            id: nodeName.replace('node', ''),
            name: `Sensor ${nodeName.replace('node', '')}`,
            temp: parseFloat(nodeData?.temperature) || 0,
            humidity: parseFloat(nodeData?.humidity) || 0,
            smoke: parseFloat(nodeData?.gas) || 0,
            status: calculateStatus(nodeData?.temperature, nodeData?.gas),
            lastUpdated: Date.now(),
            isActive: nodeData ? true : false // Mark if node has data
        }));
    } catch (error) {
        console.error('Fetch error:', error);
        showError('Failed to load sensor data');
        return [];
    }
}

// Calculate sensor status
function calculateStatus(temp, smoke) {
    temp = parseFloat(temp) || 0;
    smoke = parseFloat(smoke) || 0;
    
    if (temp > 45 || smoke > 300) return 'danger';
    if (temp > 40 || smoke > 200) return 'warning';
    return 'normal';
}

// Update all UI components
async function updateAllUI() {
    try {
        const sensorData = await fetchSensorData();
        if (sensorData.length === 0) {
            showNoDataMessage();
            return;
        }
        
        updateSensorTable(sensorData);
        updateMetricCards(sensorData);
        updateAlertSystem(sensorData);
        updateSensorSummary(sensorData);
    } catch (error) {
        console.error('UI update failed:', error);
    }
}

// Show message when no data available
function showNoDataMessage() {
    const tableBody = document.getElementById('sensor-table-body');
    tableBody.innerHTML = `
        <tr class="no-data-row">
            <td colspan="5">
                <i data-feather="alert-circle"></i>
                No sensor data available
            </td>
        </tr>
    `;
    feather.replace();
}

// Update sensor table with proper empty state handling
function updateSensorTable(sensorData) {
    const tableBody = document.getElementById('sensor-table-body');
    tableBody.innerHTML = '';

    sensorData.forEach(sensor => {
        const row = document.createElement('tr');
        if (!sensor.isActive) row.classList.add('inactive-node');
        
        // Name column
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `
            <div class="sensor-name">
                <div class="sensor-status-dot ${sensor.isActive ? sensor.status : 'inactive'}"></div>
                ${sensor.name}
            </div>
        `;
        
        // Helper function to format values
        const formatValue = (value, unit) => {
            if (!sensor.isActive) return '-';
            return value === 0 ? `0${unit}` : `${value.toFixed(1)}${unit}`;
        };

        // Temperature column
        const tempCell = document.createElement('td');
        tempCell.className = sensor.isActive ? 
            (sensor.temp > 45 ? 'temp-danger' : 
             sensor.temp > 40 ? 'temp-warning' : 'temp-normal') : 'value-empty';
        tempCell.textContent = formatValue(sensor.temp, '°C');
        
        // Humidity column
        const humidityCell = document.createElement('td');
        humidityCell.className = sensor.isActive ?
            (sensor.humidity < 20 ? 'humidity-danger' : 
             sensor.humidity < 30 ? 'humidity-warning' : 'humidity-normal') : 'value-empty';
        humidityCell.textContent = formatValue(sensor.humidity, '%');
        
        // Smoke column
        const smokeCell = document.createElement('td');
        smokeCell.className = sensor.isActive ?
            (sensor.smoke > 300 ? 'smoke-danger' : 
             sensor.smoke > 200 ? 'smoke-warning' : 'smoke-normal') : 'value-empty';
        smokeCell.textContent = formatValue(sensor.smoke, ' PPM');
        
        // Status column
        const statusCell = document.createElement('td');
        statusCell.innerHTML = sensor.isActive ? `
            <span class="status-badge ${sensor.status}">
                ${sensor.status.toUpperCase()}
            </span>
        ` : '<span class="status-badge inactive">OFFLINE</span>';
        
        row.append(nameCell, tempCell, humidityCell, smokeCell, statusCell);
        tableBody.appendChild(row);
    });
}

// Update metric cards with empty state handling
function updateMetricCards(sensorData) {
    const activeSensors = sensorData.filter(s => s.isActive);
    
    const averages = {
        temp: activeSensors.length ? calculateAverage(activeSensors, 'temp') : null,
        humidity: activeSensors.length ? calculateAverage(activeSensors, 'humidity') : null,
        smoke: activeSensors.length ? calculateAverage(activeSensors, 'smoke') : null
    };

    updateMetricCard('temperature', averages.temp, [40, 45]);
    updateMetricCard('humidity', averages.humidity, [30, 20], true);
    updateMetricCard('smoke', averages.smoke, [200, 300]);
}

function updateMetricCard(type, value, thresholds, reverse = false) {
    const card = document.getElementById(`${type}-card`);
    const valueElement = document.getElementById(`${type}-value`);
    
    if (value === null) {
        valueElement.textContent = '-';
        card.className = 'metric-card value-empty';
    } else {
        valueElement.textContent = value.toFixed(1);
        card.className = `metric-card ${getStatusClass(value, thresholds, reverse)}`;
    }
}

// (Keep all other existing helper functions like calculateAverage, 
// getStatusClass, determineAlertStatus, etc. from previous implementation)

// Show error message
function showError(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.className = 'alert-box danger';
    document.getElementById('alert-title').textContent = 'System Error';
    document.getElementById('alert-message').textContent = message;
    
    const alertIcon = alertBox.querySelector('.alert-feather');
    alertIcon.setAttribute('data-feather', 'alert-triangle');
    feather.replace();
}
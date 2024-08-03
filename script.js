function filterNumbers() {
    const input = document.getElementById('houseNumber');
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    if (input.value) {
        const filtered = addresses.filter(addr => String(addr.original).startsWith(input.value));
        if (filtered.length > 0) {
            filtered.forEach(addr => {
                const item = document.createElement('div');
                item.textContent = addr.original;
                item.onclick = () => {
                    input.value = addr.original;
                    showAddress(addr);
                    autocompleteList.innerHTML = '';
                };
                autocompleteList.appendChild(item);
            });
            autocompleteList.style.display = 'block';
        } else {
            // If no addresses match, handle free text input
            showFreeText(input.value);
        }
    } else {
        autocompleteList.style.display = 'none';
    }
}

function showAddress(address) {
    document.getElementById('addressDisplay').textContent = `${address.street} ${address.translated}`;
    document.getElementById('wazeLink').href = `https://waze.com/ul?q=${encodeURIComponent(address.street + ' ' + address.translated + ' ' + 'אילת')}&navigate=yes`;
    document.getElementById('googleMapsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.street + ' ' + address.translated + ' ' + 'אילת')}`;
}

function showFreeText(freeText) {
    if (!freeText.includes('אילת')) {
        freeText += ' אילת';
    }
    document.getElementById('addressDisplay').textContent = freeText;
    document.getElementById('wazeLink').href = `https://waze.com/ul?q=${encodeURIComponent(freeText)}&navigate=yes`;
    document.getElementById('googleMapsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(freeText)}`;
}



document.getElementById('toggleExplanation').addEventListener('click', function() {
    var explanation = document.getElementById('explanation');
    if (explanation.style.display === 'none') {
        explanation.style.display = 'block';
        this.textContent = 'הסתר הסבר';
    } else {
        explanation.style.display = 'none';
        this.textContent = 'להסבר, לחץ כאן';
    }
});

function saveOrganization() {
    var organization = document.getElementById('organization').value;
    if (organization) {
        localStorage.setItem('organization', organization);
        loadOrganization();
    }
}

function loadOrganization() {
    var organization = localStorage.getItem('organization');
    if (organization) {
        document.getElementById('organizationSelection').style.display = 'none';
        document.getElementById('switchOrganization').style.display = 'block';
        var logoSrc;
        var bodyClass;
        switch (organization) {
            case 'mda':
                logoSrc = 'mda_waze_logo.png';
                bodyClass = 'mda-theme';
                break;
            case 'police':
                logoSrc = 'eilat_police.png';
                bodyClass = 'police-theme';
                break;
            // Add more cases as needed
        }
        document.getElementById('organizationLogo').src = logoSrc;
        document.getElementById('organizationLogo').style.display = 'block'; // Show the logo
        document.getElementById('searchContainer').style.display = 'block'; // Show the search container
        document.body.className = bodyClass;
    } else {
        document.getElementById('organizationSelection').style.display = 'block';
        document.getElementById('switchOrganization').style.display = 'none';
        document.getElementById('organizationLogo').style.display = 'none';
        document.getElementById('searchContainer').style.display = 'none'; // Hide the search container
    }document.getElementById('organizationLogo')
}

function showOrganizationSelection() {
    document.getElementById('organizationSelection').style.display = 'block';
    document.getElementById('switchOrganization').style.display = 'none';
    document.getElementById('organizationLogo').style.display = 'none';
    document.getElementById('searchContainer').style.display = 'none'; // Hide the search container when switching organizations
}

// Load organization on page load
document.addEventListener('DOMContentLoaded', loadOrganization);

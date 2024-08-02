function filterNumbers() {
    const input = document.getElementById('houseNumber');
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    if (input.value) {
        const filtered = addresses.filter(addr => String(addr.original).startsWith(input.value));
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
        // Ensure the list is visible
        autocompleteList.style.display = 'block';
    } else {
        autocompleteList.style.display = 'none';
    }
}

function showAddress(address) {
    document.getElementById('addressDisplay').textContent = `${address.street} ${address.translated}`;
    document.getElementById('wazeLink').href = `https://waze.com/ul?q=${encodeURIComponent(address.street + ' ' + address.translated + ' ' + 'אילת')}&navigate=yes`;
    document.getElementById('googleMapsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.street + ' ' + address.translated + ' ' + 'אילת')}`;
}

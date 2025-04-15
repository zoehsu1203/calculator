const prices = {
    base: {
        '豆花': {cost: 2.35356, usage: 160},
        '三色豆花': {cost: 7.06068, usage: 480},
        '仙草凍': {cost: 2.17, usage: 160},
        '鮮奶凍': {cost: 4.74, usage: 67},
        '燒仙草': {cost: 2.0016, usage: 220}
    },
    special: {
        '黑糖冰沙': {cost: 2.7, usage: 200},
        '仙草冰沙': {cost: 3.43, usage: 200},
        '紅豆湯': {cost: 3.05, usage: 200},
        '薑湯': {cost: 1.26, usage: 200},
        '抹茶冰沙': {cost: 3.6, usage: 200},
        '芋頭牛奶': {cost: 5.0, usage: 200},
        '黑糖奶茶': {cost: 4.4, usage: 200},
        '仙草奶茶': {cost: 4.0, usage: 200},
        '抹茶奶綠': {cost: 4.6, usage: 200}
    },
    toppings: {
        '豆漿': {cost: 3.2, usage: 200},
        '鮮奶': {cost: 12.8205, usage: 200},
        '紅豆': {cost: 1.55817, usage: 50},
        '花生': {cost: 2.62545, usage: 60},
        '綠豆': {cost: 0.24175, usage: 60},
        '薑汁': {cost: 0.38888, usage: 45},
        '芋泥': {cost: 1.41384, usage: 40},
        '鮮奶凍': {cost: 5.66101, usage: 80},
        '杏仁豆腐': {cost: 1.71325, usage: 70},
        '布丁': {cost: 3.77647, usage: 70},
        '椰果': {cost: 2.59459, usage: 60},
        '粉粿': {cost: 2.64, usage: 60}
    }
};

let selectedItems = [];

document.addEventListener('DOMContentLoaded', function() {
    updateItems();
});

function updateItems() {
    const category = document.getElementById('category').value;
    const itemSelect = document.getElementById('item');
    
    itemSelect.innerHTML = '';
    
    Object.keys(prices[category]).forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
    });
    
    updateDefaultQuantity();
}

function updateDefaultQuantity() {
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const quantityInput = document.getElementById('quantity');
    
    if (prices[category] && prices[category][item]) {
        quantityInput.value = prices[category][item].usage;
    }
}

function addItem() {
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    
    if (!quantity || quantity <= 0) {
        alert('請輸入有效的份量');
        return;
    }
    
    const itemData = prices[category][item];
    const cost = (itemData.cost * quantity) / itemData.usage;
    
    selectedItems.push({
        category,
        name: item,
        quantity,
        cost
    });
    
    updateItemsList();
}

function updateItemsList() {
    const list = document.getElementById('itemsList');
    list.innerHTML = '';
    
    selectedItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (${item.quantity}g) - ${item.cost.toFixed(2)}元
            <button onclick="removeItem(${index})">刪除</button>
        `;
        list.appendChild(li);
    });
    
    calculate();
}

function removeItem(index) {
    selectedItems.splice(index, 1);
    updateItemsList();
}

function calculate() {
    const totalCost = selectedItems.reduce((sum, item) => sum + item.cost, 0);
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
}

function clearAll() {
    selectedItems = [];
    updateItemsList();
    document.getElementById('totalCost').textContent = '0';
}

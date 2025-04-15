export const prices = {
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

    // 更新預設份量
    updateDefaultQuantity();
}

function updateDefaultQuantity() {
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const defaultQuantity = prices[category][item].usage;
    document.getElementById('quantity').value = defaultQuantity;
}

function addItem() {
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    
    if (isNaN(quantity) || quantity <= 0) {
        alert('請輸入有效的份量');
        return;
    }

    selectedItems.push({
        category,
        item,
        quantity
    });

    updateSelectedItemsDisplay();
    // 重置份量為該品項的預設用量
    updateDefaultQuantity();
}

function updateSelectedItemsDisplay() {
    const container = document.getElementById('selectedItems');
    container.innerHTML = '';

    if (selectedItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">尚未加入任何品項</p>';
        return;
    }

    selectedItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'selected-item';
        itemElement.innerHTML = `
            <span>${item.item} (${item.quantity}克)</span>
            <button onclick="removeItem(${index})">刪除</button>
        `;
        container.appendChild(itemElement);
    });
}

function removeItem(index) {
    selectedItems.splice(index, 1);
    updateSelectedItemsDisplay();
}

function clearAll() {
    selectedItems = [];
    updateSelectedItemsDisplay();
    document.getElementById('result').innerHTML = '請選擇品項並輸入份量';
}

function calculate() {
    if (selectedItems.length === 0) {
        alert('請先加入品項');
        return;
    }

    let totalCost = 0;
    let details = [];

    selectedItems.forEach(item => {
        const itemData = prices[item.category][item.item];
        const cost = itemData.price * item.quantity;
        totalCost += cost;
        details.push(`${item.item} (${item.quantity}克): ${cost.toFixed(2)}元`);
    });

    document.getElementById('result').innerHTML = 
        `細項成本：<br>${details.join('<br>')}<br><br>` +
        `總成本：${totalCost.toFixed(2)}元`;
}

// 初始化
updateItems();
updateSelectedItemsDisplay();

// 當選擇不同品項時自動更新預設份量
document.getElementById('item').addEventListener('change', updateDefaultQuantity);

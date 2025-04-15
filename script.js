const prices = {
    base: {
        '豆花': {price: 0.014709764705882353, usage: 100},
        '仙草凍': {price: 0.013554809843400448, usage: 100},
        '鮮奶凍': {price: 0.07076268656716417, usage: 100},
        '燒仙草': {price: 0.009097964376590332, usage: 100},
        '愛玉': {price: 0.015, usage: 100},
        '粉圓': {price: 0.032, usage: 30},
        '粉條': {price: 0.028, usage: 30},
        '芋圓': {price: 0.045, usage: 30},
        '地瓜圓': {price: 0.042, usage: 30},
        '白玉': {price: 0.038, usage: 30}
    },
    special: {
        '黑糖冰沙': {price: 0.01350824949698189, usage: 200},
        '仙草冰沙': {price: 0.01716279069767442, usage: 200},
        '紅豆湯': {price: 0.015259776536312848, usage: 200},
        '薑湯': {price: 0.006196078431372549, usage: 200},
        '抹茶冰沙': {price: 0.018, usage: 200},
        '芋頭牛奶': {price: 0.025, usage: 200},
        '黑糖奶茶': {price: 0.022, usage: 200},
        '仙草奶茶': {price: 0.020, usage: 200},
        '抹茶奶綠': {price: 0.023, usage: 200}
    },
    toppings: {
        '珍珠': {price: 0.0427, usage: 30},
        '椰果': {price: 0.043243243243243246, usage: 30},
        '紅豆': {price: 0.031163471074380163, usage: 30},
        '花生': {price: 0.043757500000000005, usage: 20},
        '綠豆': {price: 0.035, usage: 30},
        '芋頭': {price: 0.048, usage: 30},
        '地瓜': {price: 0.038, usage: 30},
        '蜜紅豆': {price: 0.040, usage: 30},
        '黃金QQ': {price: 0.045, usage: 30},
        '布丁': {price: 0.052, usage: 50},
        '杏仁凍': {price: 0.048, usage: 50}
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

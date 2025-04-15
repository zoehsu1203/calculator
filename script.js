const prices = {
    base: {
        '豆花': 0.014709764705882353,
        '仙草凍': 0.013554809843400448,
        '鮮奶凍': 0.07076268656716417,
        '燒仙草': 0.009097964376590332,
        '愛玉': 0.015,
        '粉圓': 0.032,
        '粉條': 0.028,
        '芋圓': 0.045,
        '地瓜圓': 0.042,
        '白玉': 0.038
    },
    special: {
        '黑糖冰沙': 0.01350824949698189,
        '仙草冰沙': 0.01716279069767442,
        '紅豆湯': 0.015259776536312848,
        '薑湯': 0.006196078431372549,
        '抹茶冰沙': 0.018,
        '芋頭牛奶': 0.025,
        '黑糖奶茶': 0.022,
        '仙草奶茶': 0.020,
        '抹茶奶綠': 0.023
    },
    toppings: {
        '珍珠': 0.0427,
        '椰果': 0.043243243243243246,
        '紅豆': 0.031163471074380163,
        '花生': 0.043757500000000005,
        '綠豆': 0.035,
        '芋頭': 0.048,
        '地瓜': 0.038,
        '蜜紅豆': 0.040,
        '黃金QQ': 0.045,
        '布丁': 0.052,
        '杏仁凍': 0.048
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
    document.getElementById('quantity').value = '100'; // 重置份量為預設值
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
        const cost = prices[item.category][item.item] * item.quantity;
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

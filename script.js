const prices = {
    base: {
      '豆花': 0.014709764705882353,
      '仙草凍': 0.013554809843400448,
      '鮮奶凍': 0.07076268656716417,
      '燒仙草': 0.009097964376590332
    },
    special: {
      '黑糖冰沙': 0.01350824949698189,
      '仙草冰沙': 0.01716279069767442,
      '紅豆湯': 0.015259776536312848,
      '薑湯': 0.006196078431372549
    },
    toppings: {
      '珍珠': 0.0427,
      '椰果': 0.043243243243243246,
      '紅豆': 0.031163471074380163,
      '花生': 0.043757500000000005
    }
};

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

function calculate() {
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    
    if (isNaN(quantity) || quantity <= 0) {
      alert('請輸入有效的份量');
      return;
    }

    const cost = (prices[category][item] * quantity).toFixed(2);
    const perUnit = (prices[category][item]).toFixed(4);
    
    document.getElementById('result').innerHTML = 
      `${item} ${quantity}克的成本為：${cost}元<br>` +
      `(每克成本：${perUnit}元)`;
}

// 初始化
updateItems();

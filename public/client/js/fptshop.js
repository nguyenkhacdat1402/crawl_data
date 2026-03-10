function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let html = "";

  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="far fa-star"></i>';
  }

  return html;
}


function renderProduct({ product1, product2 }) {
  renderSingleProduct(product1, "result-1");
  renderSingleProduct(product2, "result-2");
}

function renderSingleProduct(product, containerId) {
  const container = $(`#${containerId}`);

  if (!product) {
    container.html(`
      <div class="no-product">
        <i class="fas fa-box-open fa-3x mb-3"></i>
        <p>Vui lòng chọn sản phẩm</p>
      </div>
    `);
    return;
  }

  let specsHtml = "";

  product.specs.forEach((spec) => {
    specsHtml += `
      <tr>
        <td class="spec-label">${spec.label}</td>
        <td>${spec.value}</td>
      </tr>
    `;
  });

  container.html(`
    <a href="${product.link}" target="_blank" class="product-name">${product.name}</a>
    <div class="product-price new-price">${product.newPrice}</div>
    <div class="product-price base-price">${product.basePrice}</div>

    <div class="rating-section">
      <span class="stars">${renderStars(product.start)}</span>
      <span class="stars">${product.start}</span>
      <span class="review-count">
        (${product.totalRating})
      </span>
    </div>
    <div class="product-image-wrapper">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
    </div>

    <h5 class="mt-4 mb-3">
      <i class="fas fa-list-ul mr-2"></i>Cấu hình chi tiết
    </h5>

    <table class="spec-table">
      <tbody>
        ${specsHtml}
      </tbody>
    </table>
  `);
}

const buttonCompare = document.querySelector(
  "#compare-btn.compare-btn.fpt-compare-btn",
);
const selecProduct1 = document.querySelector("#fpt-product-1.product-select");
const selecProduct2 = document.querySelector("#fpt-product-2.product-select");

if (buttonCompare) {
  buttonCompare.addEventListener("click", () => {
    const optionProduct1 = selecProduct1.selectedOptions[0];
    const optionProduct2 = selecProduct2.selectedOptions[0];

    if (!optionProduct1.value || !optionProduct2.value) {
      alert("Vui lòng chọn đủ 2 sản phẩm hợp lệ");
      return;
    }

    const product1 = optionProduct1.value;
    const product2 = optionProduct2.value;
    fetch("/compare/fptshop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product1: product1,
        product2: product2,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code !== 200) {
          alert("Có lỗi xảy ra");
          return;
        }

        renderProduct(result.data);
      });
  });
}

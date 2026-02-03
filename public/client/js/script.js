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
function renderCompareSpecsByIndexMap(productCellphones, productFpt) {
  const tbody = document.querySelector("#compare-specs-body");

  let html = "";
  const SPEC_INDEX_MAP = [
    { label: "Kích thước màn hình", cellphones: 12, fpt: 1 },
    { label: "Chipset", cellphones: 6, fpt: 5 },
    { label: "RAM", cellphones: 10, fpt: 8 },
    { label: "Bộ nhớ trong", cellphones: 11, fpt: 9 },
  ];
  SPEC_INDEX_MAP.forEach((item) => {
    const cellSpec = productCellphones.specs[item.cellphones];
    const fptSpec = productFpt.specs[item.fpt];

    const valueCell = cellSpec?.value || "-";
    const valueFpt = fptSpec?.value || "-";

    const isDiff = valueCell !== valueFpt && valueCell !== "-" && valueFpt !== "-";

    html += `
      <tr class="${isDiff ? "diff" : ""}">
        <td class="spec-label">${item.label}</td>
        <td>${valueCell}</td>
        <td>${valueFpt}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


function renderProduct({ productCellphones, productFpt }) {
  renderSingleProduct(productCellphones, "cellphones-result");
  renderSingleProduct(productFpt, "fpt-result");
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
    <h3 class="product-name">${product.name}</h3>
    <div class="product-price new-price">${product.newPrice}</div>
    <div class="product-price base-price">${product.basePrice}</div>

    <div class="rating-section">
      <span class="stars">${renderStars(product.start)}</span>
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




const buttonCompare = document.querySelector("#compare-btn");
const selectCellphones = document.querySelector("#cellphones-product");
const selectFpt = document.querySelector("#fpt-product");

if (buttonCompare) {
  buttonCompare.addEventListener("click", () => {
    const optionCellphones = selectCellphones.selectedOptions[0];
    const optionFpt = selectFpt.selectedOptions[0];

    if (!optionCellphones.value || !optionFpt.value) {
      alert("Vui lòng chọn đủ 2 sản phẩm hợp lệ");
      return;
    }

    const idProductCellphoneS = optionCellphones.value;
    const idProductFpt = optionFpt.value;
    fetch("/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idProductCellphoneS: idProductCellphoneS,
        idProductFpt: idProductFpt,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code !== 200) {
          alert("Có lỗi xảy ra")
          return;
        }

        renderProduct(result.data)

        renderCompareSpecsByIndexMap(
          result.data.productCellphones,
          result.data.productFpt
        )
      });
  });
}

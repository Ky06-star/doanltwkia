const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const products = [
  { name: "kia morning", keywords: "xe nho, hatback", url: "./sanpham.html" },
  { name: "kia k3", keywords: "cerato, sedan", url: "./sanpham.html" },
  { name: "kia k5", keywords: "optima, sedan", url: "./sanpham.html" },
  { name: "kia soluto", keywords: "sedan, gia re", url: "./sanpham.html" },
  { name: "kia sonet", keywords: "suv, gam cao", url: "./sanpham.html" },
  { name: "kia seltos", keywords: "suv, gam cao", url: "./sanpham.html" },
  { name: "kia sportage", keywords: "suv, gam cao", url: "./sanpham.html" },
  { name: "kia sorento", keywords: "suv, 7 cho", url: "./sanpham.html" },
  {
    name: "kia carnival",
    keywords: "mpv, 7 cho, gia dinh",
    url: "./sanpham.html",
  },
  { name: "bảng giá", keywords: "gia xe, khuyen mai", url: "./banggia.html" },
  { name: "liên hệ", keywords: "sdt, dia chi, showroom", url: "./lienhe.html" },
  { name: "dịch vụ", keywords: "bao hanh, sua chua", url: "./dichvu.html" },
];

function handleSearch() {
  if (!searchInput) return;
  const keywordRaw = searchInput.value.trim();
  const keyword = removeVietnameseTones(keywordRaw);

  if (keyword === "") {
    alert("Bạn chưa nhập nội dung tìm kiếm!");
    return;
  }

  let found = false;
  for (let i = 0; i < products.length; i++) {
    const productName = removeVietnameseTones(products[i].name);
    const productKeywords = removeVietnameseTones(products[i].keywords || "");
    if (productName.includes(keyword) || productKeywords.includes(keyword)) {
      window.location.href = products[i].url;
      found = true;
      break;
    }
  }

  if (!found) {
    alert("Không tìm thấy kết quả cho: " + keywordRaw);
  }
}
if (searchBtn) {
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    handleSearch();
  });
}

if (searchInput) {
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}

const consultForm = document.getElementById("consultation-form");
const style = document.createElement("style");
style.innerHTML = `
    #toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    }
    .toast-item {
        background: #fff;
        border-left: 5px solid #28a745;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        min-width: 280px;
        font-family: sans-serif;
        animation: slideIn 0.4s ease forwards;
    }
    .toast-item h4 { margin: 0 0 5px; color: #28a745; font-size: 16px; }
    .toast-item p { margin: 2px 0; font-size: 14px; color: #555; }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .fade-out {
        animation: fadeOut 0.5s ease forwards;
    }
    @keyframes fadeOut {
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
let toastContainer = document.getElementById("toast-container");
if (!toastContainer) {
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  document.body.appendChild(toastContainer);
}
function showSuccessToast(name, phone, car) {
  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `
        <h4>Gửi thành công!</h4>
        <p><b>Khách hàng:</b> ${name}</p>
        <p><b>SĐT:</b> ${phone}</p>
        <p><b>Xe:</b> ${car}</p>
    `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}
if (consultForm) {
  consultForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const carModel = document.getElementById("car-model").value;
    if (fullName === "" || phone === "") {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    showSuccessToast(fullName, phone, carModel);
    consultForm.reset();
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  const notification = document.createElement("div");
  notification.innerHTML = " Gửi thông tin thành công!";
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "15px 25px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "none",
    fontFamily: "sans-serif",
    transition: "opacity 0.5s ease",
  });

  document.body.appendChild(notification);

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      notification.style.display = "block";
      notification.style.opacity = "1";

      contactForm.reset();

      setTimeout(function () {
        notification.style.opacity = "0";
        setTimeout(() => {
          notification.style.display = "none";
        }, 500);
      }, 5000);
    });
  }
});

const BASE_URL = "http://localhost:8080/kopinusantara/api";

let mejaTerpilih = null;
let keranjangBelanja = [];
let dataMenu = [];

document.addEventListener("DOMContentLoaded", async () => {
  tableSelection();
  await loadMenu();
});

// fungsi memuat data menu dari server
async function loadMenu() {
  try {
    const response = await fetch(`${BASE_URL}/menu.php`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    if (result.status === "success" && Array.isArray(result.data)) {
      dataMenu = result.data;
      tampilMenu();
    } else {
      throw new Error("Format data menu tidak valid");
    }
  } catch (error) {
    console.error("Error loading menu:", error);
    alert(
      `Gagal memuat menu. Error: ${error.message}\n\nPastikan:\n1. Database terhubung\n2. Tabel menu sudah dibuat\n3. Ada data dalam tabel menu`
    );
  }
}

// Fungsi memilih meja
function tableSelection() {
  document.querySelectorAll(".meja").forEach(async (meja) => {
    meja.addEventListener("click", async () => {
      try {
        const nomorMeja = meja.dataset.meja;
        const response = await fetch(`${BASE_URL}/meja.php?nomor=${nomorMeja}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "terisi") {
          alert("Maaf, meja ini sedang terisi");
          return;
        }

        document.querySelectorAll(".meja").forEach((m) => {
          m.classList.remove("selected");
        });
        meja.classList.add("selected");
        mejaTerpilih = nomorMeja;
        document.getElementById("lanjutKeMenu").disabled = false;
      } catch (error) {
        console.error("Error checking table status:", error);
        alert(
          `Gagal memeriksa status meja. Error: ${error.message}\n\nPastikan API meja.php tersedia dan berfungsi dengan benar.`
        );
      }
    });
  });
}

// Fungsi menampilkan menu
function tampilMenu() {
  const listMenu = document.querySelector(".listMenu");
  if (!listMenu) return;

  listMenu.innerHTML = dataMenu
    .map(
      (item) => `
        <div class="itemMenu">
          <img src="${item.gambar}" alt="${item.nama}">
          <div class="menuInfo">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <p class="hargaMenu">Rp. ${item.harga.toLocaleString()}</p>
            <button class="tombolTambah" onclick="tambahKeKeranjang(${
              item.id
            }, '${item.nama}', ${item.harga})">
              Tambah Ke Keranjang
            </button>
          </div>
        </div>
      `
    )
    .join("");
}

// Pindah ke bagian menu
function tampilkanMenu() {
  const mejaTerpilih = document.querySelector(".meja.selected");
  if (mejaTerpilih) {
    const noMeja = mejaTerpilih.dataset.meja;
    document.getElementById("noMeja").textContent = noMeja;
    document.getElementById("pilihMeja").style.display = "none";
    document.getElementById("menu").style.display = "block";
    tampilMenu();
  } else {
    alert("Silakan pilih meja terlebih dahulu!");
  }
}

// Fungsi Filter Kategori Menu
function filterMenu(category) {
  const keyword = document.getElementById("searchInput").value || "";
  let filteredMenu;

  switch (category) {
    case "all":
      filteredMenu = dataMenu.filter(
        (item) =>
          item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
          item.deskripsi.toLowerCase().includes(keyword.toLowerCase())
      );
      break;
    case "nonkopi":
      filteredMenu = dataMenu.filter(
        (item) =>
          item.category === "nonkopi" &&
          (item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(keyword.toLowerCase()))
      );
      break;
    case "mainDish":
      filteredMenu = dataMenu.filter(
        (item) =>
          item.category === "mainDish" &&
          (item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(keyword.toLowerCase()))
      );
      break;
    default:
      filteredMenu = dataMenu.filter(
        (item) =>
          item.category === category &&
          (item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(keyword.toLowerCase()))
      );
  }

  const listMenu = document.querySelector(".listMenu");
  listMenu.innerHTML = filteredMenu
    .map(
      (item) => `
        <div class="itemMenu">
          <img src="${item.gambar}" alt="${item.nama}">
          <div class="menuInfo">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <p class="hargaMenu">Rp. ${item.harga.toLocaleString()}</p>
            <button class="tombolTambah" onclick="tambahKeKeranjang(${
              item.id
            }, '${item.nama}', ${item.harga})">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      `
    )
    .join("");
}

// Fungsi Search box menu
function cariMenu(keyword) {
  const listMenu = document.querySelector(".listMenu");
  const filteredMenu = dataMenu.filter(
    (item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(keyword.toLowerCase())
  );

  listMenu.innerHTML = filteredMenu
    .map(
      (item) => `
        <div class="itemMenu">
          <img src="${item.gambar}" alt="${item.nama}">
          <div class="menuInfo">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <p class="hargaMenu">Rp. ${item.harga.toLocaleString()}</p>
            <button class="tombolTambah" onclick="tambahKeKeranjang(${
              item.id
            }, '${item.nama}', ${item.harga})">
              Tambah ke Pesanan
            </button>
          </div>
        </div>
      `
    )
    .join("");
}

window.tambahKeKeranjang = (idItem, namaItem, hargaItem) => {
  const itemAda = keranjangBelanja.find((item) => item.id === idItem);

  if (itemAda) {
    itemAda.jumlah += 1;
  } else {
    keranjangBelanja.push({
      id: idItem,
      nama: namaItem,
      harga: hargaItem,
      jumlah: 1,
    });
  }
  perbaruiKeranjang();
  document.querySelector(".tombolPesan").disabled = false;
};

function perbaruiKeranjang() {
  const daftarPesanan = document.querySelector(".daftarPesanan");
  if (!daftarPesanan) return;

  daftarPesanan.innerHTML = keranjangBelanja
    .map(
      (item) => `
        <div class="itemKeranjang">
            <div class="infoItemKeranjang">
                <h4>${item.nama}</h4>
                <p>Rp. ${item.harga.toLocaleString()}</p>
            </div>
            <div class="kontrolJumlah">
                <button class="tombolJumlah" onclick="ubahJumlah(${
                  item.id
                }, -1)">-</button>
                <span>${item.jumlah}</span>
                <button class="tombolJumlah" onclick="ubahJumlah(${
                  item.id
                }, 1)">+</button>
            </div>
        </div>
    `
    )
    .join("");

  const total = keranjangBelanja.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  );
  const totalElement = document.getElementById("totalBelanja");
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
}

function openPayment() {
  document.getElementById("paymentModal").style.display = "block"; // Buka modal pembayaran
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none"; // Tutup modal pembayaran
}

function selectPayment(method) {
  document.querySelectorAll(".paymentDetail").forEach((n) => {
    n.style.display = "none";
  });

  if (method === "qr") {
    document.getElementById("qrPayment").style.display = "block";
  } else if (method === "card") {
    document.getElementById("cardPayment").style.display = "block";
    document.getElementById("cardForm").onsubmit = function (e) {
      e.preventDefault();
      processPayment("card");
    };
  } else if (method === "cash") {
    document.getElementById("cashPayment").style.display = "block";
    const total = keranjangBelanja.reduce(
      (sum, item) => sum + item.harga * item.jumlah,
      0
    );
    document.getElementById("cashAmount").textContent = total.toLocaleString();
  }

  selectedPaymentMethod = method;
}

function resetPesanan() {
  keranjangBelanja = [];
  perbaruiKeranjang();
  document.querySelector(".tombolPesan").disabled = true;

  document.getElementById("menu").style.display = "none";
  document.getElementById("pilihMeja").style.display = "block";
  const selectedTable = document.querySelector(".meja.selected");
  if (selectedTable) {
    selectedTable.classList.remove("selected");
  }
  document.getElementById("lanjutKeMenu").disabled = true;
}

async function processPayment(method) {
  try {
    const nomorMeja = document.getElementById("noMeja").textContent;
    const total = keranjangBelanja.reduce(
      (sum, item) => sum + item.harga * item.jumlah,
      0
    );

    if (!["cash", "card", "qr"].includes(method)) {
      alert("Metode pembayaran tidak valid!");
      return;
    }

    const pesananData = {
      table_number: nomorMeja,
      order_items: keranjangBelanja.map((item) => ({
        id: item.id,
        jumlah: item.jumlah,
        harga: item.harga,
      })),
      total: total,
      payment_method: method,
    };

    console.log("Data yang dikirim ke server:", pesananData);

    const response = await fetch(`${BASE_URL}/order.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pesananData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Gagal memproses pembayaran: ${errorMessage}`);
    }

    const result = await response.json();

    if (result.status === "success") {
      alert(`Pesanan berhasil dibuat! Metode pembayaran: ${method}`);
      closePayment();
      resetPesanan();
    } else {
      throw new Error(result.message || "Pesanan gagal dibuat");
    }
  } catch (error) {
    console.error("Error saat memproses pembayaran:", error);
    alert(`Gagal memproses pembayaran: ${error.message}`);
  }
}

const fraudData = [
  {
    id: 1,
    title: "Fraud 1",
    description:
      "Nasabah baru yang melakukan transaksi besar di luar Indonesia",
    categoryIds: [1, 5],
  },
  {
    id: 2,
    title: "Fraud 2",
    description: "Transaksi mencurigakan dilakukan di luar jam operasional",
    categoryIds: [1, 5],
  },
  {
    id: 3,
    title: "Fraud 3",
    description:
      "Penggunaan kartu ATM di dua lokasi berbeda dalam waktu singkat",
    categoryIds: [1],
  },
  {
    id: 4,
    title: "Fraud 4",
    description:
      "Transaksi gagal berkali-kali lalu berhasil dalam jumlah besar",
    categoryIds: [7],
  },
  {
    id: 5,
    title: "Fraud 5",
    description: "Akses akun dari perangkat baru yang tidak dikenali",
    categoryIds: [2, 3],
  },
  {
    id: 6,
    title: "Fraud 6",
    description: "Login dilakukan dari negara berisiko tinggi",
    categoryIds: [2, 4],
  },
  {
    id: 7,
    title: "Fraud 7",
    description: "Transfer ke rekening yang masuk daftar hitam",
    categoryIds: [6],
  },
  {
    id: 8,
    title: "Fraud 8",
    description:
      "Perubahan data pribadi yang tidak biasa sebelum transaksi besar",
    categoryIds: [1, 7],
  },
  {
    id: 9,
    title: "Fraud 9",
    description: "Penarikan tunai dalam jumlah maksimal berturut-turut",
    categoryIds: [1],
  },
  {
    id: 10,
    title: "Fraud 10",
    description: "Aktivitas mencurigakan setelah reset password",
    categoryIds: [2, 7],
  },
];

export default fraudData;

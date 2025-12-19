// Import expanded license plate data
import { expandedCarPlates } from './expandedCarPlates.js';
import { expandedMotorbikePlates } from './expandedMotorbikePlates.js';

const carPlates = [
  { id: 1, plateNumber: "30M - 666.66", startPrice: "500.000.000 đ", province: "Thành phố Hà Nội", type: "Ngũ quý" },
  { id: 2, plateNumber: "30B - 555.55", startPrice: "500.000.000 đ", province: "Thành phố Hà Nội", type: "Ngũ quý" },
  { id: 3, plateNumber: "50H - 555.55", startPrice: "500.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
  { id: 4, plateNumber: "51L - 999.99", startPrice: "500.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
  { id: 5, plateNumber: "51M - 888.88", startPrice: "500.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
  { id: 6, plateNumber: "50H - 666.66", startPrice: "500.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
  { id: 7, plateNumber: "15K - 777.77", startPrice: "500.000.000 đ", province: "Thành phố Hải Phòng", type: "Ngũ quý" },
  { id: 8, plateNumber: "89A - 666.66", startPrice: "500.000.000 đ", province: "Tỉnh Hưng Yên", type: "Ngũ quý" },
  { id: 9, plateNumber: "89A - 777.77", startPrice: "500.000.000 đ", province: "Tỉnh Hưng Yên", type: "Ngũ quý" },
  { id: 10, plateNumber: "37K - 777.77", startPrice: "500.000.000 đ", province: "Tỉnh Nghệ An", type: "Ngũ quý" },
  { id: 11, plateNumber: "70A - 666.66", startPrice: "500.000.000 đ", province: "Tỉnh Tây Ninh", type: "Ngũ quý" },
  { id: 12, plateNumber: "60K - 888.88", startPrice: "500.000.000 đ", province: "Tỉnh Đồng Nai", type: "Ngũ quý" },
  { id: 13, plateNumber: "30B - 567.89", startPrice: "500.000.000 đ", province: "Thành phố Hà Nội", type: "Sảnh tiến" },
  { id: 14, plateNumber: "37C - 567.89", startPrice: "500.000.000 đ", province: "Tỉnh Nghệ An", type: "Sảnh tiến" },
  { id: 15, plateNumber: "20H - 024.68", startPrice: "40.000.000 đ", province: "Tỉnh Thái Nguyên", type: "Sảnh tiến" },
  { id: 16, plateNumber: "30M - 444.45", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 17, plateNumber: "30C - 222.24", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 18, plateNumber: "30C - 111.10", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 19, plateNumber: "29E - 444.48", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 20, plateNumber: "29E - 444.42", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 21, plateNumber: "29E - 422.22", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 22, plateNumber: "29E - 400.00", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 23, plateNumber: "29E - 333.35", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 24, plateNumber: "29E - 333.32", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 25, plateNumber: "29E - 222.26", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 26, plateNumber: "29E - 222.24", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 27, plateNumber: "29E - 444.49", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 28, plateNumber: "29E - 444.46", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 29, plateNumber: "29E - 444.45", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 30, plateNumber: "29E - 333.37", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 31, plateNumber: "29E - 222.27", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 32, plateNumber: "29E - 222.23", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 33, plateNumber: "29E - 100.00", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 34, plateNumber: "29E - 444.41", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 35, plateNumber: "29E - 200.00", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 36, plateNumber: "30C - 000.04", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 37, plateNumber: "50H - 600.00", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 38, plateNumber: "50E - 333.36", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 39, plateNumber: "50E - 333.34", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 40, plateNumber: "51N - 444.43", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 41, plateNumber: "51M - 444.42", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 42, plateNumber: "50E - 333.35", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 43, plateNumber: "50E - 333.30", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 44, plateNumber: "51N - 444.48", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 45, plateNumber: "51N - 444.46", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 46, plateNumber: "51N - 444.40", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 47, plateNumber: "50H - 600.00", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 48, plateNumber: "50E - 333.36", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 49, plateNumber: "50E - 333.34", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
  { id: 50, plateNumber: "50E - 333.31", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý" },
];

const officialCarPlates = [
  { id: 1, plateNumber: "74H-024.68", startPrice: "40.000.000 đ", province: "Tỉnh Quảng Trị", type: "Sảnh tiến", auctionTime: "15:00 02/12/2025" },
  { id: 2, plateNumber: "22H-024.68", startPrice: "40.000.000 đ", province: "Tỉnh Tuyên Quang", type: "Sảnh tiến", auctionTime: "13:30 02/12/2025" },
  { id: 3, plateNumber: "29E-433.33", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 4, plateNumber: "29E-411.11", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "14:15 02/12/2025" },
  { id: 5, plateNumber: "29E-444.47", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "14:15 02/12/2025" },
  { id: 6, plateNumber: "29E-444.43", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 7, plateNumber: "29E-444.40", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 8, plateNumber: "29E-333.30", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 9, plateNumber: "29E-244.44", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 10, plateNumber: "30B-444.48", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "14:15 01/12/2025" },
  { id: 11, plateNumber: "50E-144.44", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 12, plateNumber: "51N-444.49", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 13, plateNumber: "50E-300.00", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 14, plateNumber: "50E-311.11", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 15, plateNumber: "50E-333.38", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 16, plateNumber: "50H-844.44", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 17, plateNumber: "50E-200.00", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 18, plateNumber: "50H-944.44", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 19, plateNumber: "50E-333.32", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 20, plateNumber: "50E-244.44", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 21, plateNumber: "51B-777.74", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "15:00 01/12/2025" },
  { id: 22, plateNumber: "51N-400.00", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "14:15 01/12/2025" },
  { id: 23, plateNumber: "51M-444.41", startPrice: "40.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "13:30 01/12/2025" },
  { id: 24, plateNumber: "43H-111.16", startPrice: "40.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "14:15 02/12/2025" },
  { id: 25, plateNumber: "43B-333.32", startPrice: "40.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 26, plateNumber: "43H-111.14", startPrice: "40.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 27, plateNumber: "43B-222.20", startPrice: "40.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "15:00 01/12/2025" },
  { id: 28, plateNumber: "43H-100.00", startPrice: "40.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "14:15 01/12/2025" },
  { id: 29, plateNumber: "15H-111.18", startPrice: "40.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý", auctionTime: "13:30 01/12/2025" },
  { id: 30, plateNumber: "65H-100.00", startPrice: "40.000.000 đ", province: "Thành phố Cần Thơ", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 31, plateNumber: "75A-444.48", startPrice: "40.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "13:30 01/12/2025" },
  { id: 32, plateNumber: "68A-444.40", startPrice: "40.000.000 đ", province: "Tỉnh An Giang", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 33, plateNumber: "68H-100.00", startPrice: "40.000.000 đ", province: "Tỉnh An Giang", type: "Tứ quý", auctionTime: "13:30 02/12/2025" },
  { id: 34, plateNumber: "68A-555.54", startPrice: "40.000.000 đ", province: "Tỉnh An Giang", type: "Tứ quý", auctionTime: "14:15 01/12/2025" },
  { id: 35, plateNumber: "99H-100.00", startPrice: "40.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 36, plateNumber: "99B-300.00", startPrice: "40.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 37, plateNumber: "99B-222.20", startPrice: "40.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 38, plateNumber: "11H-011.11", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 39, plateNumber: "11A-222.21", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 40, plateNumber: "11A-222.20", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 41, plateNumber: "11A-222.24", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 42, plateNumber: "11A-244.44", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "15:00 01/12/2025" },
  { id: 43, plateNumber: "11A-222.28", startPrice: "40.000.000 đ", province: "Tỉnh Cao Bằng", type: "Tứ quý", auctionTime: "13:30 01/12/2025" },
  { id: 44, plateNumber: "69H-044.44", startPrice: "40.000.000 đ", province: "Tỉnh Cà Mau", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 45, plateNumber: "38C-222.20", startPrice: "40.000.000 đ", province: "Tỉnh Hà Tĩnh", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 46, plateNumber: "89H-100.00", startPrice: "40.000.000 đ", province: "Tỉnh Hưng Yên", type: "Tứ quý", auctionTime: "15:45 02/12/2025" },
  { id: 47, plateNumber: "79H-100.00", startPrice: "40.000.000 đ", province: "Tỉnh Khánh Hòa", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 48, plateNumber: "25B-011.11", startPrice: "40.000.000 đ", province: "Tỉnh Lai Châu", type: "Tứ quý", auctionTime: "15:45 01/12/2025" },
  { id: 49, plateNumber: "24A-511.11", startPrice: "40.000.000 đ", province: "Tỉnh Lào Cai", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
  { id: 50, plateNumber: "24A-444.49", startPrice: "40.000.000 đ", province: "Tỉnh Lào Cai", type: "Tứ quý", auctionTime: "15:00 02/12/2025" },
];

// const motorbikePlates = [
//   { id: 1, plateNumber: "50AA - 999.99", startPrice: "50.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
//   { id: 2, plateNumber: "65AA - 888.88", startPrice: "50.000.000 đ", province: "Thành phố Cần Thơ", type: "Ngũ quý" },
//   { id: 3, plateNumber: "65AA - 777.77", startPrice: "50.000.000 đ", province: "Thành phố Cần Thơ", type: "Ngũ quý" },
//   { id: 4, plateNumber: "68AB - 333.33", startPrice: "5.000.000 đ", province: "Tỉnh An Giang", type: "Ngũ quý" },
//   { id: 5, plateNumber: "69AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Cà Mau", type: "Ngũ quý" },
//   { id: 6, plateNumber: "81AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Gia Lai", type: "Ngũ quý" },
//   { id: 7, plateNumber: "26AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Sơn La", type: "Ngũ quý" },
//   { id: 8, plateNumber: "22AA - 222.22", startPrice: "5.000.000 đ", province: "Tỉnh Tuyên Quang", type: "Ngũ quý" },
//   { id: 9, plateNumber: "22AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Tuyên Quang", type: "Ngũ quý" },
//   { id: 10, plateNumber: "64AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Vĩnh Long", type: "Ngũ quý" },
// ];
const motorbikePlates = [
  { id: 1, plateNumber: "50AA - 999.99", startPrice: "50.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý" },
  { id: 2, plateNumber: "65AA - 888.88", startPrice: "50.000.000 đ", province: "Thành phố Cần Thơ", type: "Ngũ quý" },
  { id: 3, plateNumber: "65AA - 777.77", startPrice: "50.000.000 đ", province: "Thành phố Cần Thơ", type: "Ngũ quý" },
  { id: 4, plateNumber: "68AB - 333.33", startPrice: "5.000.000 đ", province: "Tỉnh An Giang", type: "Ngũ quý" },
  { id: 5, plateNumber: "69AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Cà Mau", type: "Ngũ quý" },
  { id: 6, plateNumber: "81AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Gia Lai", type: "Ngũ quý" },
  { id: 7, plateNumber: "26AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Sơn La", type: "Ngũ quý" },
  { id: 8, plateNumber: "22AA - 222.22", startPrice: "5.000.000 đ", province: "Tỉnh Tuyên Quang", type: "Ngũ quý" },
  { id: 9, plateNumber: "22AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Tuyên Quang", type: "Ngũ quý" },
  { id: 10, plateNumber: "64AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Vĩnh Long", type: "Ngũ quý" },
  // Thêm dữ liệu mô phỏng từ ảnh (từ STT 11 trở đi)
  { id: 11, plateNumber: "60AG - 222.22", startPrice: "5.000.000 đ", province: "Tỉnh Đồng Nai", type: "Tứ quý" },
  { id: 12, plateNumber: "60AB - 777.77", startPrice: "50.000.000 đ", province: "Tỉnh Đồng Nai", type: "Ngũ quý" },
  { id: 13, plateNumber: "66AA - 999.99", startPrice: "50.000.000 đ", province: "Tỉnh Đồng Tháp", type: "Ngũ quý" },
  { id: 14, plateNumber: "50AD - 234.56", startPrice: "5.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Sảnh tiến" },
  { id: 15, plateNumber: "83AA - 234.56", startPrice: "5.000.000 đ", province: "Tỉnh Sóc Trăng", type: "Sảnh tiến" },
  { id: 16, plateNumber: "29AX - 111.17", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 17, plateNumber: "29AO - 111.14", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 18, plateNumber: "29AD - 444.48", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 19, plateNumber: "29AE - 444.47", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 20, plateNumber: "29AD - 444.49", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 21, plateNumber: "29AE - 444.45", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 22, plateNumber: "29AE - 444.49", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 23, plateNumber: "29AE - 444.40", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 24, plateNumber: "29AD - 400.00", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 25, plateNumber: "29AE - 555.53", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 26, plateNumber: "29AE - 222.21", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 27, plateNumber: "29AD - 444.47", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý" },
  { id: 28, plateNumber: "43AB - 444.42", startPrice: "5.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý" },
  { id: 29, plateNumber: "43AB - 111.13", startPrice: "5.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý" },
  { id: 30, plateNumber: "43AB - 200.00", startPrice: "5.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý" },
  { id: 31, plateNumber: "15AK - 111.14", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 32, plateNumber: "15AH - 111.10", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 33, plateNumber: "15AA - 777.74", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 34, plateNumber: "15AA - 777.73", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 35, plateNumber: "15AB - 333.37", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 36, plateNumber: "15AB - 444.40", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 37, plateNumber: "15AA - 444.45", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 38, plateNumber: "15AA - 444.43", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 39, plateNumber: "15AK - 111.17", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 40, plateNumber: "15AH - 111.17", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 41, plateNumber: "15AH - 111.14", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 42, plateNumber: "15AC - 111.17", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 43, plateNumber: "15AA - 777.70", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 44, plateNumber: "15AB - 444.47", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 45, plateNumber: "15AB - 444.46", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 46, plateNumber: "15AB - 444.41", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 47, plateNumber: "15AK - 111.10", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 48, plateNumber: "15AF - 222.24", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 49, plateNumber: "15AC - 111.14", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
  { id: 50, plateNumber: "15AB - 444.45", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý" },
];

const motorbikeAuctionResults = [
  // Dữ liệu Kết quả đấu giá xe máy (Trích xuất từ ảnh)
  { id: 1, plateNumber: "29AE - 928.28", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 2, plateNumber: "29AC - 121.21", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 3, plateNumber: "29AD - 938.99", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 4, plateNumber: "29AD - 596.96", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 5, plateNumber: "29AD - 888.55", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 6, plateNumber: "29AF - 079.99", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 7, plateNumber: "29AD - 588.86", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 8, plateNumber: "29AD - 378.88", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 9, plateNumber: "29AF - 183.33", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 10, plateNumber: "29AE - 183.39", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 11, plateNumber: "29AD - 889.92", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 12, plateNumber: "29AD - 919.95", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 13, plateNumber: "29AE - 945.67", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 14, plateNumber: "29AE - 868.58", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 15, plateNumber: "29BH - 193.33", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 16, plateNumber: "29AE - 259.95", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 17, plateNumber: "29AE - 768.89", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 18, plateNumber: "29AE - 777.69", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 19, plateNumber: "29AE - 667.67", startPrice: "11.500.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 20, plateNumber: "29AE - 606.06", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 21, plateNumber: "29AD - 396.89", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 22, plateNumber: "29AE - 862.22", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 23, plateNumber: "29AD - 555.53", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 24, plateNumber: "29AE - 919.83", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 25, plateNumber: "29AD - 887.87", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 26, plateNumber: "29AE - 912.34", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 27, plateNumber: "29AE - 883.68", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 28, plateNumber: "29AF - 111.14", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 29, plateNumber: "29AF - 096.88", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 30, plateNumber: "29AE - 939.69", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 31, plateNumber: "29AD - 687.77", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 32, plateNumber: "29BM - 069.96", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 33, plateNumber: "29AE - 812.89", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 34, plateNumber: "29BB - 111.23", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 35, plateNumber: "29AE - 333.59", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 36, plateNumber: "29AE - 997.77", startPrice: "9.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 37, plateNumber: "29AD - 459.99", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 38, plateNumber: "29AE - 911.99", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 39, plateNumber: "29AF - 088.83", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 40, plateNumber: "29AE - 183.88", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 41, plateNumber: "29AE - 176.98", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 42, plateNumber: "29AD - 885.58", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 43, plateNumber: "29AD - 986.98", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 44, plateNumber: "29AF - 112.33", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 45, plateNumber: "29AD - 666.22", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 46, plateNumber: "29AD - 555.25", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 47, plateNumber: "29AD - 396.39", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 48, plateNumber: "29AD - 489.99", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 49, plateNumber: "29AF - 107.68", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
  { id: 50, plateNumber: "29AE - 888.26", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 27/11/2025" },
];

const officialMotorbikePlates = [
  // Dữ liệu Danh sách chính thức cho xe máy (Trích xuất từ ảnh)
  { id: 1, plateNumber: "50AD - 999.99", startPrice: "5.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý", auctionTime: "10:45 01/12/2025" },
  { id: 2, plateNumber: "50AD - 888.88", startPrice: "5.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý", auctionTime: "09:15 01/12/2025" },
  { id: 3, plateNumber: "50AB - 888.88", startPrice: "50.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Ngũ quý", auctionTime: "08:30 01/12/2025" },
  { id: 4, plateNumber: "43AB - 333.33", startPrice: "5.000.000 đ", province: "Thành phố Đà Nẵng", type: "Ngũ quý", auctionTime: "08:30 02/12/2025" },
  { id: 5, plateNumber: "65AB - 222.22", startPrice: "5.000.000 đ", province: "Thành phố Cần Thơ", type: "Ngũ quý", auctionTime: "08:30 01/12/2025" },
  { id: 6, plateNumber: "68AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh An Giang", type: "Ngũ quý", auctionTime: "10:00 02/12/2025" },
  { id: 7, plateNumber: "68AB - 555.55", startPrice: "5.000.000 đ", province: "Tỉnh An Giang", type: "Ngũ quý", auctionTime: "10:00 01/12/2025" },
  { id: 8, plateNumber: "68AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh An Giang", type: "Ngũ quý", auctionTime: "08:30 01/12/2025" },
  { id: 9, plateNumber: "99AA - 999.99", startPrice: "5.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Ngũ quý", auctionTime: "10:00 01/12/2025" },
  { id: 10, plateNumber: "81AB - 999.99", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Ngũ quý", auctionTime: "10:45 01/12/2025" },
  { id: 11, plateNumber: "38AA - 555.55", startPrice: "5.000.000 đ", province: "Tỉnh Hà Tĩnh", type: "Ngũ quý", auctionTime: "08:30 01/12/2025" },
  { id: 12, plateNumber: "89AB - 777.77", startPrice: "5.000.000 đ", province: "Tỉnh Hưng Yên", type: "Ngũ quý", auctionTime: "09:15 01/12/2025" },
  { id: 13, plateNumber: "49AA - 888.88", startPrice: "50.000.000 đ", province: "Tỉnh Lâm Đồng", type: "Ngũ quý", auctionTime: "09:15 02/12/2025" },
  { id: 14, plateNumber: "36AD - 777.77", startPrice: "5.000.000 đ", province: "Tỉnh Thanh Hóa", type: "Ngũ quý", auctionTime: "10:00 01/12/2025" },
  { id: 15, plateNumber: "20AA - 888.88", startPrice: "5.000.000 đ", province: "Tỉnh Thái Nguyên", type: "Ngũ quý", auctionTime: "09:15 01/12/2025" },
  { id: 16, plateNumber: "70AA - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Tây Ninh", type: "Ngũ quý", auctionTime: "10:45 01/12/2025" },
  { id: 17, plateNumber: "47AD - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Đắk Lắk", type: "Ngũ quý", auctionTime: "10:45 02/12/2025" },
  { id: 18, plateNumber: "60AB - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Đồng Nai", type: "Ngũ quý", auctionTime: "09:15 01/12/2025" },
  { id: 19, plateNumber: "66AB - 444.44", startPrice: "5.000.000 đ", province: "Tỉnh Đồng Tháp", type: "Ngũ quý", auctionTime: "10:00 01/12/2025" },
  { id: 20, plateNumber: "66AB - 333.33", startPrice: "5.000.000 đ", province: "Tỉnh Đồng Tháp", type: "Ngũ quý", auctionTime: "09:15 01/12/2025" },
  { id: 21, plateNumber: "29AC - 123.45", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Sảnh tiến", auctionTime: "10:00 01/12/2025" },
  { id: 22, plateNumber: "81AB - 456.78", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Sảnh tiến", auctionTime: "08:30 01/12/2025" },
  { id: 23, plateNumber: "36AE - 123.45", startPrice: "5.000.000 đ", province: "Tỉnh Thanh Hóa", type: "Sảnh tiến", auctionTime: "10:45 01/12/2025" },
  { id: 24, plateNumber: "29AD - 444.46", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "10:45 01/12/2025" },
  { id: 25, plateNumber: "29AD - 444.41", startPrice: "5.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
  { id: 26, plateNumber: "50AB - 999.94", startPrice: "5.000.000 đ", province: "Thành phố Hồ Chí Minh", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 27, plateNumber: "43AA - 811.11", startPrice: "5.000.000 đ", province: "Thành phố Đà Nẵng", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 28, plateNumber: "15AB - 444.49", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý", auctionTime: "10:00 02/12/2025" },
  { id: 29, plateNumber: "15AB - 333.30", startPrice: "5.000.000 đ", province: "Thành phố Hải Phòng", type: "Tứ quý", auctionTime: "09:15 02/12/2025" },
  { id: 30, plateNumber: "65AB - 744.44", startPrice: "5.000.000 đ", province: "Thành phố Cần Thơ", type: "Tứ quý", auctionTime: "10:00 01/12/2025" },
  { id: 31, plateNumber: "65AB - 444.47", startPrice: "5.000.000 đ", province: "Thành phố Cần Thơ", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 32, plateNumber: "65AB - 888.83", startPrice: "5.000.000 đ", province: "Thành phố Cần Thơ", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 33, plateNumber: "65AB - 555.53", startPrice: "5.000.000 đ", province: "Thành phố Cần Thơ", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
  { id: 34, plateNumber: "75AA - 200.00", startPrice: "5.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "10:00 02/12/2025" },
  { id: 35, plateNumber: "75AA - 555.54", startPrice: "5.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "08:30 02/12/2025" },
  { id: 36, plateNumber: "75AA - 344.44", startPrice: "5.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "10:45 01/12/2025" },
  { id: 37, plateNumber: "75AA - 333.34", startPrice: "5.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "10:00 01/12/2025" },
  { id: 38, plateNumber: "75AA - 222.25", startPrice: "5.000.000 đ", province: "Thành phố Huế", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 39, plateNumber: "68AC - 100.00", startPrice: "5.000.000 đ", province: "Tỉnh An Giang", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
  { id: 40, plateNumber: "99AB - 111.13", startPrice: "5.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
  { id: 41, plateNumber: "99AA - 555.54", startPrice: "5.000.000 đ", province: "Tỉnh Bắc Ninh", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
  { id: 42, plateNumber: "69AB - 255.55", startPrice: "5.000.000 đ", province: "Tỉnh Cà Mau", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 43, plateNumber: "69AA - 777.74", startPrice: "5.000.000 đ", province: "Tỉnh Cà Mau", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 44, plateNumber: "81AB - 555.54", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "10:00 02/12/2025" },
  { id: 45, plateNumber: "81AC - 111.12", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "10:45 01/12/2025" },
  { id: 46, plateNumber: "81AB - 444.41", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "10:45 01/12/2025" },
  { id: 47, plateNumber: "81AB - 455.55", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "10:45 01/12/2025" },
  { id: 48, plateNumber: "81AB - 444.42", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 49, plateNumber: "81AB - 555.53", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "09:15 01/12/2025" },
  { id: 50, plateNumber: "81AB - 333.30", startPrice: "5.000.000 đ", province: "Tỉnh Gia Lai", type: "Tứ quý", auctionTime: "08:30 01/12/2025" },
];

const assets = [
  {
    id: 1,
    title: "Tài sản là tang vật, phương tiện vi phạm hành chính bị tịch thu",
    shortTitle: "445 xe mô tô tang vật VPHC",
    startPrice: "2.154.232.000 đ",
    startPriceNumber: 2154232000,
    depositAmount: 215423200,
    depositPercent: 10,
    auctionTime: "02/12/2025",
    auctionDate: "2025-12-02T09:00:00",
    registerTime: "9 giờ 5 phút 44 giây",
    registerDeadline: "2025-12-01T17:00:00",
    image: "https://picsum.photos/seed/moto1/400/300",
    images: [
      "https://picsum.photos/seed/moto1/800/600",
      "https://picsum.photos/seed/moto1a/800/600",
      "https://picsum.photos/seed/moto1b/800/600",
      "https://picsum.photos/seed/moto1c/800/600"
    ],
    category: "Xe mô tô",
    status: "active",
    location: "Hà Nội",
    description: "Tài sản là tang vật, phương tiện vi phạm hành chính bị tịch thu gồm 445 chiếc xe mô tô, xe máy hai bánh các loại. Tài sản được bảo quản tại kho bãi của cơ quan chức năng.",
    specifications: [
      { label: "Số lượng", value: "445 chiếc" },
      { label: "Loại tài sản", value: "Xe mô tô, xe máy hai bánh" },
      { label: "Tình trạng", value: "Đã qua sử dụng" },
      { label: "Nguồn gốc", value: "Tang vật VPHC bị tịch thu" },
      { label: "Đơn vị tổ chức", value: "Sở Tư pháp Hà Nội" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 5000000,
      participants: 156,
      viewCount: 2340
    }
  },
  {
    id: 2,
    title: "445 chiếc xe mô tô, xe máy hai bánh là tang vật, phương tiện vi phạm hành chính",
    shortTitle: "445 xe máy tang vật",
    startPrice: "750.235.000 đ",
    startPriceNumber: 750235000,
    depositAmount: 75023500,
    depositPercent: 10,
    auctionTime: "08/12/2025",
    auctionDate: "2025-12-08T14:00:00",
    registerTime: "6 ngày 8 giờ 50 phút",
    registerDeadline: "2025-12-07T17:00:00",
    image: "https://picsum.photos/seed/moto2/400/300",
    images: [
      "https://picsum.photos/seed/moto2/800/600",
      "https://picsum.photos/seed/moto2a/800/600",
      "https://picsum.photos/seed/moto2b/800/600"
    ],
    category: "Xe mô tô",
    status: "active",
    location: "TP. Hồ Chí Minh",
    description: "Lô tài sản gồm 445 chiếc xe mô tô, xe máy hai bánh các loại hiệu, nhãn hiệu khác nhau, là tang vật, phương tiện vi phạm hành chính bị tịch thu theo quyết định của cơ quan có thẩm quyền.",
    specifications: [
      { label: "Số lượng", value: "445 chiếc" },
      { label: "Loại tài sản", value: "Xe mô tô hai bánh" },
      { label: "Tình trạng", value: "Đa dạng" },
      { label: "Nguồn gốc", value: "Tang vật VPHC" },
      { label: "Đơn vị tổ chức", value: "Công ty Đấu giá Hợp danh Sài Gòn" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 3000000,
      participants: 89,
      viewCount: 1567
    }
  },
  {
    id: 3,
    title: "653 chiếc xe mô tô, xe máy hai bánh là tang vật, phương tiện vi phạm hành chính",
    shortTitle: "653 xe mô tô VPHC",
    startPrice: "544.100.000 đ",
    startPriceNumber: 544100000,
    depositAmount: 54410000,
    depositPercent: 10,
    auctionTime: "08/12/2025",
    auctionDate: "2025-12-08T10:00:00",
    registerTime: "6 ngày 8 giờ 50 phút",
    registerDeadline: "2025-12-07T17:00:00",
    image: "https://picsum.photos/seed/moto3/400/300",
    images: [
      "https://picsum.photos/seed/moto3/800/600",
      "https://picsum.photos/seed/moto3a/800/600",
      "https://picsum.photos/seed/moto3b/800/600",
      "https://picsum.photos/seed/moto3c/800/600"
    ],
    category: "Xe mô tô",
    status: "active",
    location: "Đà Nẵng",
    description: "Lô 653 chiếc xe mô tô, xe máy hai bánh các loại là tang vật, phương tiện vi phạm hành chính đã bị tịch thu. Tài sản được niêm phong và bảo quản theo quy định.",
    specifications: [
      { label: "Số lượng", value: "653 chiếc" },
      { label: "Loại tài sản", value: "Xe mô tô, xe máy" },
      { label: "Tình trạng", value: "Cũ, qua sử dụng" },
      { label: "Nguồn gốc", value: "Tịch thu VPHC" },
      { label: "Đơn vị tổ chức", value: "Công ty Đấu giá Miền Trung" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 2500000,
      participants: 124,
      viewCount: 1890
    }
  },
  {
    id: 4,
    title: "Tài sản là phương tiện vi phạm hành chính bị tịch thu (05 xe mô tô)",
    shortTitle: "05 xe mô tô tịch thu",
    startPrice: "637.500.000 đ",
    startPriceNumber: 637500000,
    depositAmount: 63750000,
    depositPercent: 10,
    auctionTime: "12/12/2025",
    auctionDate: "2025-12-12T09:30:00",
    registerTime: "12 ngày 8 giờ 50 phút",
    registerDeadline: "2025-12-11T17:00:00",
    image: "https://picsum.photos/seed/moto4/400/300",
    images: [
      "https://picsum.photos/seed/moto4/800/600",
      "https://picsum.photos/seed/moto4a/800/600"
    ],
    category: "Xe mô tô",
    status: "active",
    location: "Hải Phòng",
    description: "Lô tài sản gồm 05 xe mô tô phân khối lớn là phương tiện vi phạm hành chính bị tịch thu. Các xe đều trong tình trạng tốt, có đầy đủ giấy tờ nguồn gốc hợp pháp.",
    specifications: [
      { label: "Số lượng", value: "05 chiếc" },
      { label: "Loại tài sản", value: "Xe mô tô phân khối lớn" },
      { label: "Tình trạng", value: "Tốt" },
      { label: "Nguồn gốc", value: "VPHC bị tịch thu" },
      { label: "Đơn vị tổ chức", value: "Sở Tư pháp Hải Phòng" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 5000000,
      participants: 67,
      viewCount: 1234
    }
  },
  {
    id: 5,
    title: "Quyền sử dụng 204,0m2 đất và tài sản gắn liền với đất là nhà ở tại Hà Nội",
    shortTitle: "204m2 đất + nhà ở HN",
    startPrice: "48.695.787.000 đ",
    startPriceNumber: 48695787000,
    depositAmount: 4869578700,
    depositPercent: 10,
    auctionTime: "26/12/2025",
    auctionDate: "2025-12-26T14:00:00",
    registerTime: "26 ngày 8 giờ 50 phút",
    registerDeadline: "2025-12-25T17:00:00",
    image: "https://picsum.photos/seed/house1/400/300",
    images: [
      "https://picsum.photos/seed/house1/800/600",
      "https://picsum.photos/seed/house1a/800/600",
      "https://picsum.photos/seed/house1b/800/600",
      "https://picsum.photos/seed/house1c/800/600",
      "https://picsum.photos/seed/house1d/800/600"
    ],
    category: "Bất động sản",
    status: "active",
    location: "Quận Hoàn Kiếm, Hà Nội",
    description: "Quyền sử dụng 204,0m2 đất ở tại vị trí đắc địa và tài sản gắn liền với đất là nhà ở 03 tầng kiên cố, có vị trí thuận lợi cho kinh doanh và sinh sống.",
    specifications: [
      { label: "Diện tích đất", value: "204,0 m²" },
      { label: "Loại đất", value: "Đất ở đô thị" },
      { label: "Kết cấu nhà", value: "Nhà 3 tầng kiên cố" },
      { label: "Vị trí", value: "Quận Hoàn Kiếm, Hà Nội" },
      { label: "Hướng", value: "Đông Nam" },
      { label: "Đơn vị tổ chức", value: "Công ty Đấu giá Hà Nội" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 100000000,
      participants: 234,
      viewCount: 5678
    }
  },
  {
    id: 6,
    title: "Quyền thuê diện tích kinh doanh dịch vụ tại chung cư thương mại",
    shortTitle: "32 ô kinh doanh CCTT",
    startPrice: "32 tài sản",
    startPriceNumber: 0,
    depositAmount: 50000000,
    depositPercent: 0,
    auctionTime: "28/11/2025",
    auctionDate: "2025-11-28T10:00:00",
    registerTime: "Đã hết hạn",
    registerDeadline: "2025-11-27T17:00:00",
    image: "https://picsum.photos/seed/building1/400/300",
    images: [
      "https://picsum.photos/seed/building1/800/600",
      "https://picsum.photos/seed/building1a/800/600"
    ],
    category: "Quyền thuê",
    status: "expired",
    location: "TP. Hồ Chí Minh",
    description: "Quyền thuê 32 diện tích kinh doanh dịch vụ tại khu chung cư thương mại, vị trí đắc địa, thích hợp kinh doanh mọi loại hình.",
    specifications: [
      { label: "Số lượng", value: "32 ô" },
      { label: "Loại tài sản", value: "Quyền thuê mặt bằng" },
      { label: "Thời hạn thuê", value: "10 năm" },
      { label: "Vị trí", value: "Chung cư thương mại Q.1" },
      { label: "Đơn vị tổ chức", value: "Công ty Đấu giá Sài Gòn" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 1000000,
      participants: 45,
      viewCount: 890
    }
  },
  {
    id: 7,
    title: "Vật tư thu hồi thuộc cấu phần GPMB công trình: Cải tạo các tuyến đường",
    shortTitle: "Vật tư thu hồi GPMB",
    startPrice: "519.013.250 đ",
    startPriceNumber: 519013250,
    depositAmount: 51901325,
    depositPercent: 10,
    auctionTime: "29/11/2025",
    auctionDate: "2025-11-29T09:00:00",
    registerTime: "Hết thời gian",
    registerDeadline: "2025-11-28T17:00:00",
    image: "https://picsum.photos/seed/scrap/400/300",
    images: [
      "https://picsum.photos/seed/scrap/800/600",
      "https://picsum.photos/seed/scrapa/800/600"
    ],
    category: "Vật tư",
    status: "expired",
    location: "Hà Nội",
    description: "Vật tư thu hồi từ công trình giải phóng mặt bằng, gồm các loại sắt thép, cốt pha, gỗ và vật liệu xây dựng khác.",
    specifications: [
      { label: "Loại tài sản", value: "Vật tư xây dựng" },
      { label: "Tình trạng", value: "Thu hồi từ GPMB" },
      { label: "Khối lượng", value: "Theo danh mục" },
      { label: "Đơn vị tổ chức", value: "Ban GPMB Hà Nội" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 2000000,
      participants: 23,
      viewCount: 456
    }
  },
  {
    id: 8,
    title: "Lô tài sản, công cụ dụng cụ đã cũ hỏng, không còn nhu cầu sử dụng",
    shortTitle: "Lô CCDC cũ thanh lý",
    startPrice: "92.726.360 đ",
    startPriceNumber: 92726360,
    depositAmount: 9272636,
    depositPercent: 10,
    auctionTime: "01/12/2025",
    auctionDate: "2025-12-01T13:00:00",
    registerTime: "Hết thời gian",
    registerDeadline: "2025-11-30T17:00:00",
    image: "https://picsum.photos/seed/carold/400/300",
    images: [
      "https://picsum.photos/seed/carold/800/600"
    ],
    category: "Thanh lý",
    status: "expired",
    location: "Đà Nẵng",
    description: "Lô tài sản, công cụ dụng cụ đã qua sử dụng lâu năm, hư hỏng, không còn nhu cầu sử dụng của đơn vị, cần thanh lý theo quy định.",
    specifications: [
      { label: "Loại tài sản", value: "CCDC thanh lý" },
      { label: "Tình trạng", value: "Cũ, hỏng" },
      { label: "Khối lượng", value: "Theo danh mục chi tiết" },
      { label: "Đơn vị tổ chức", value: "Công ty Đấu giá Miền Trung" }
    ],
    auctionInfo: {
      method: "Đấu giá trực tuyến",
      priceStep: 1000000,
      participants: 12,
      viewCount: 234
    }
  }
];

const newsData = [
  // Tin tức (News - Tích hợp dữ liệu từ ảnh 08.12.43.jpg và 08.12.49.jpg)
  { id: 1, 
    category: "Dân trí",
    title: "Biển số ô tô 99A-999.99 trúng đấu giá gần 28 tỷ đồng",
    date: "12:32 11/12/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/801c3346-4529-480b-a002-d10522f5beda.png",
    excerpt: "Ngày 11/11, trao đổi với phóng viên Dân trí, đại diện công ty đấu giá biển số ô tô cho biết sáng cùng ngày đơn vị này vừa phối hợp với Cục CSGT (Bộ Công an) tổ chức đấu giá loạt biển số ô tô. Đáng chú ý, biển số ô tô 99A-999.99 đã tìm được chủ nhân với số tiền trúng đấu giá lên tới gần 28 tỷ đồng.", 
    content: `
      <p><strong>Ngày 11/11/2025</strong> — Tại phiên đấu giá do Công ty Đấu giá hợp danh Việt Nam tổ chức phối hợp với Cục CSGT, biển số <em>99A-999.99</em> đã được bán với mức giá kỷ lục gần 28 tỷ đồng.</p>
      <br>
      <p> Đại diện đơn vị tổ chức cho biết, phiên đấu giá thu hút nhiều nhà đầu tư và người sưu tập quan tâm. Quy trình đấu giá được thực hiện công khai, minh bạch với sự giám sát của cơ quan chức năng.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/3a8a0074-00c7-4740-b488-21b09c29a3ff.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:400px;height:400px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">Ảnh: Biển số ô tô 99A-999.99 trúng đấu giá lên tới gần 28 tỷ đồng (Ảnh: Chụp màn hình).</figcaption>
      </figure>
      <p>Theo vị đại diện, đây là lần thứ 2 biển số ô tô 99A-999.99 này được đưa ra đấu giá, trước đó biển số này được đưa ra đấu giá lần 1 vào chiều 12/8 với số tiền trúng cao kỷ lục - hơn 21,8 tỷ đồng, tuy nhiên trong lần 1 người đấu giá đã bỏ cọc.
        Các biển số ô tô có trúng đấu giá cao trong sáng nay gồm: 99A-999.99 giá trúng gần 28 tỷ đồng, 51N-234.56 giá trúng đấu giá 915 triệu đồng, 11A-234.56 giá trúng đấu giá 550 triệu đồng, 36B-111.11 giá trúng đấu giá 320 triệu đồng....</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/f5762249-b36e-424a-b537-f0e93d558ca5.png" alt="Mô tả ảnh"
        style="display:block;margin:0 auto;width:100%;max-width:600px;border-radius:6px;" />
        <figcaption class="text-sm text-gray-500 mt-2 text-center">
          Bên trong khu vực tổ chức đấu giá biển số (Ảnh: Cục CSGT).
        </figcaption>
      </figure>
      <p>Cục CSGT cho biết, từ ngày 15/9/2023 đến ngày 20/10, tổng số biển đấu giá thành/niêm yết là 150.914 biển số, tương đương hơn 8.300 tỷ đồng. Trong đó, biển số ô tô đấu giá thành/niêm yết là 87.939 biển số, tương đương hơn 7.500 tỷ đồng, biển số xe máy đấu giá thành là 62.975 biển số, tương đương hơn 804 tỷ đồng.
        Tổng số tiền mà lực lượng chức năng đã thu về tài khoản chuyên thu, để nộp ngân sách nhà nước là 8.100 tỷ đồng từ đấu giá biển số xe.</p>
      <br>
        <p class="text-base text-black-1000">
        <strong>Trần Thanh/ Báo Dân trí.</strong>
      </p>`
  },
  { id: 2,
    category: "Báo tin tức",
    title: "Lần đầu tiên lô rượu ngoại 'khủng' lên sàn đấu giá với mức khởi điểm 3,7 tỷ đồng",
    date: "10:24 11/12/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/a8b85c98-0360-4714-a780-aaf1d2c3221f.png",
    excerpt: " Chiều 2/12, đại diện Công ty Đấu giá hợp danh Việt Nam (VPA) cho biết, tài sản bao gồm 3.752 chai rượu sản xuất ở nước ngoài và được bảo quản trong kho, có danh mục chi tiết kèm theo, hình ảnh minh họa cho thấy nhiều dòng sản phẩm cao cấp.",
    content: `
      <p>Chiều 2/12, đại diện Công ty Đấu giá hợp danh Việt Nam (VPA) cho biết, tài sản bao gồm 3.752 chai rượu sản xuất ở nước ngoài và được bảo quản trong kho, 
        có danh mục chi tiết kèm theo, hình ảnh minh họa cho thấy nhiều dòng sản phẩm cao cấp. Lô hàng được mô tả ở tình trạng đảm bảo chất lượng, đúng quy định của pháp luật về sản phẩm đồ uống có cồn.
      </p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/fd726e37-b0f8-407c-a5b2-d41668b94323.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:700px;height:400px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">.</figcaption>
      </figure>
      <p class="mb">Thông tin về lô rượu ngoại sắp lên sàn đấu giá, được đăng tải công khai trên trang web của Công ty Đấu giá hợp danh Việt Nam.</p>
      <p class="mb">Giá khởi điểm của toàn bộ lô tài sản được đưa ra là 3.763.700.000 đồng. Người tham gia đấu giá phải mua hồ sơ với mức 200.000 đồng và đặt trước số tiền 600.000.000 đồng. Bước giá trong phiên được ấn định là 10.000.000 đồng cho mỗi lần trả giá.</p>
      <p class="mb">Phiên đấu giá sẽ diễn ra theo hình thức đấu giá trực tuyến, áp dụng phương thức trả giá lên - tức người trả giá cao hơn sẽ trở thành người có quyền trúng đấu giá nếu đáp ứng đủ điều kiện. Thời gian đấu giá được ấn định vào khung 10 giờ - 10 giờ 30 phút ngày 12/12/2025.</p>
      <p class="mb">Việc đưa lô rượu ngoại số lượng lớn ra đấu giá thu hút sự quan tâm của nhiều tổ chức và cá nhân có nhu cầu kinh doanh hoặc sưu tầm sản phẩm. Theo đánh giá từ các đơn vị thẩm định, mức giá khởi điểm được xác định dựa trên thị trường hàng hóa, tình trạng thực tế của sản phẩm và hồ sơ pháp lý đi kèm.</p>
      <p class="mb">Các bên quan tâm có thể đăng ký tham gia trong thời hạn quy định trước khi phiên đấu giá chính thức bắt đầu.</p>

      <p class="text-base text-black-1000">
        <strong>Trung Nguyên/Báo Tin tức và Dân tộc.</strong>
      </p>
    ` },
  { id: 3,
    category: "Viện Kiểm Sát",
    title: "Viện KSND khu vực 1 kiểm sát việc đấu giá tài sản bằng hình thức trực tuyến",
    date: "14:44 31/07/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/5730c3f8-5d0b-45c9-9bc6-93a8af2ed52a.png",
    excerpt: " Trong bối cảnh hiện nay, ứng dụng công nghệ thông tin và chuyển đổi số là mục tiêu Quốc gia, là chìa khóa thúc đẩy sự phát triển toàn diện của đất nước. Mục tiêu cơ bản của chuyển đổi số là việc ứng dụng công nghệ thông tin trong các hoạt động của mọi lĩnh vực.",
    content: `
      <p> Trong bối cảnh hiện nay, ứng dụng công nghệ thông tin và chuyển đổi số là mục tiêu Quốc gia, là chìa khóa thúc đẩy sự phát triển toàn diện của đất nước. 
        Mục tiêu cơ bản của chuyển đổi số là việc ứng dụng công nghệ thông tin trong các hoạt động của mọi lĩnh vực. Chuyển đổi số không chỉ là áp dụng, thay đổi về mặt công nghệ mà còn thay đổi về tư duy, cách thức điều hành, cách thức hoạt động một cách linh hoạt, nhanh chóng và tiện lợi. 
        Từ những mục tiêu đó, Viện KSND khu vực 1 đã phối hợp cùng Phòng Thi hành án dân sự khu vực 1 - Hà Nội đã thực hiện việc đấu giá tài sản bằng hình thức trực tuyến.
      </p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/c62c7b82-ccfa-47d3-89d4-c61ec5ea9a5f.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:500px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">Toàn cảnh phiên đấu giá tài sản bằng hình thức trực tuyến.</figcaption>
      </figure>
      <p>Nhận được sự quan tâm, chỉ đạo của Lãnh đạo 02 ngành; Chấp hành viên đã phối hợp cùng Kiểm sát viên xây dựng kế hoạch đấu giá tài sản bằng hình thức trực tuyến. Sau khi nghiên cứu các quy định của Nhà nước về hình thức đấu giá trực tuyến, phù hợp với các quy định của Luật Thi hành án dân sự, 
        Luật Đấu giá tài sản và các Nghị định của Chính phủ quy định về đấu giá trực tuyến, Chấp hành viên đã lựa chọn Công ty đấu giá Hợp danh Việt Nam VPA làm đơn vị tổ chức dấu giá trực tuyến cho tài sản cần xử lý. Công ty VPA là công ty có nhiều kinh nghiệm trong việc đấu giá trực tuyến tài sản; 
        là Công ty được lựa chọn đấu giá biển số xe và tài sản vi phạm hành chính của Bộ Công an. Kiểm sát viên và Chấp hành viên đã trực tiếp làm việc với Công ty VPA, đánh giá điều kiện về cơ sở vật chất, tính bảo mật và tiến hành nhiều lần thử nghiệm đấu giá tài sản bằng hình thức trực tuyến.
      </p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/c8af9b0c-bd00-4674-a3f4-63d138ff736b.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:600px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">Kiểm sát viên, Chấp hành viên, Đấu giá viên tại phiên đấu giá.</figcaption>
      </figure>
      <p class="mb"> Từ kết quả của các buổi thử nghiệm đấu giá tại Công ty VPA, Kiểm sát viên báo cáo đề xuất Lãnh đạo viện và được Lãnh đạo Viện đồng ý thực hiện việc đấu giá tài sản bằng hình thức trực tuyến. Buổi đấu giá đã được thực hiện ngày 10/7/2025.</p>
      <p class="mb"> Đánh giá kết quả của việc đấu giá tài sản bằng hình thức trực tuyến, Kiểm sát viên có một số kiến nghị như sau:</p>
      <p> Về ưu điểm:</p>
      <p> - Tài sản được đấu giá bằng hình thức trực tuyến được đăng công khai minh bạch về thông tin tài sản trên Cổng thông tin đấu giá Quốc gia và trang thông tin điện tử của Tổ chức đấu giá. </p>
      <p> - Việc bán hồ sơ tham gia đấu giá được thực hiện trực tuyến, tạo thuận lợi và dễ dàng cho mọi khách hàng có thể tiếp cận một cách công bằng, minh bạch. Khách hàng mua hồ sơ đấu giá đều được xác thực bằng phần mềm VNeID, đảm bảo thông tin khách hàng chính xác, không có hồ sơ ảo.</p>
      <p> - Thông tin khách hàng được mã hóa, tăng tính bảo mật cho cuộc đấu giá. Khách hàng không biết có bao nhiêu người cùng tham gia đấu giá, không biết thông tin của nhau và không biết ai đang là người trả giá nên tránh được tình trạng “quân xanh, quân đỏ”.</p>
      <p class="mb"> - Khách hàng có thể tham gia buổi đấu giá một cách dễ dàng bằng thiết bị di động có kết nối Internet. Kết quả đấu giá được xác thực nhanh chóng bằng chữ ký số thông qua phần mềm VNeID. </p>
      <p> Một số hạn chế và kiến nghị: </p>
      <p> - Chưa có hướng dẫn việc kiểm sát việc đấu giá tài sản bằng hình thức trực tuyến; Cơ quan THADS và Viện KSND đang vận dụng các quy định của Luật Thi hành án dân sự, Luật Đấu giá tài sản, Nghị định 172/2024/NĐ-CP ngày 27/12/2024 quy định chi tiết một số điều luật của Luật Đấu giá tài sản. Do đó kiến nghị sớm có hướng dẫn cụ thể việc kiểm sát đấu giá bằng hình thức trực tuyến. </p>
      <p class="mb"> - Tổ chức đấu giá đã tạo tài khoản giám sát cho Chấp hành viên, tuy nhiên chưa tạo tài khoản kiểm sát cho Kiểm sát viên. Tại buổi đấu giá, Kiểm sát viên phải dùng chung tài khoản giám sát của Chấp hành viên./.</p>
      <p class="text-base text-black-1000">
        <strong>Nguyễn Ngọc Dương – Viện KSND khu vực 1.</strong> </p>
      ` 
  },
  { id: 4,
    category: "Dân trí",
    title: "Đấu giá biển số xe mang về 5.200 tỷ đồng cho ngân sách nhà nước",
    date: "18:26 16/05/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/bee3fded-0ff0-4448-ad53-5cea0ba77604.png",
    excerpt: "Theo Cục CSGT, tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08 để nộp ngân sách nhà nước (từ ngày bắt đầu đấu giá 15/9/2023 đến hết ngày 14/5) là 5.200 tỷ đồng.",
    content: `
      <p class="mb"><strong>(Dân trí) - Theo Cục CSGT, tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08 để nộp ngân sách nhà nước (từ ngày bắt đầu đấu giá 15/9/2023 đến hết ngày 14/5) là 5.200 tỷ đồng.</strong></p>
      <p class="mb">Sáng 15/5, trao đổi với phóng viên Dân trí, đại diện Cục CSGT (C08, Bộ Công an) cho biết, trong phiên đấu giá biển số xe lần thứ 6 (từ ngày 8/4 đến nay), tổng số biển được niêm yết lên sàn là hơn 1,5 triệu biển số xe; 
        tổng số biển đấu giá thành là hơn 34.600 biển số; tổng giá trị tài sản đấu thành là hơn 1.600 tỷ đồng.</p>
      <p>Trong đó, tổng số biển ô tô niêm yết là 342.000 biển số; tổng số biển đấu giá thành là hơn 11.300 biển số; tổng giá trị tài sản đấu giá thành là hơn 1.200 tỷ đồng.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/594e449b-a750-4fb7-8eb8-064bb055e6a8.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:500px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08, để nộp ngân sách nhà nước (từ ngày bắt đầu đấu giá 15/9/2023 đến hết ngày 14/5) là 5.200 tỷ đồng (Ảnh: Trần Thanh).
            </figcaption>
      </figure>
      <p class="mb">Đối với biển số xe máy, tổng số biển được niêm yết lên sàn là 1,2 triệu biển số; tổng số biển đấu giá thành là hơn 23.300 biển số; tổng giá trị tài sản đấu giá thành là hơn 387 tỷ đồng.</p>
      <p>Cục C08 cho biết, tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08, để nộp ngân sách nhà nước của phiên đấu giá thứ 6 (từ ngày 8/4 đến hết ngày 14/5) là 830 tỷ đồng. 
        Trong đó số tiền thu được từ đấu giá xe máy là 230 tỷ đồng, thu được từ đấu giá ô tô là 600 tỷ đồng.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/594e449b-a750-4fb7-8eb8-064bb055e6a8.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:500px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08, để nộp ngân sách nhà nước (từ ngày bắt đầu đấu giá 15/9/2023 đến hết ngày 14/5) là 5.200 tỷ đồng (Ảnh: Trần Thanh).
            </figcaption>
      </figure>
      <p class="mb">Đối với biển số xe máy, tổng số biển được niêm yết lên sàn là 1,2 triệu biển số; tổng số biển đấu giá thành là hơn 23.300 biển số; tổng giá trị tài sản đấu giá thành là hơn 387 tỷ đồng.</p>
      <p>Cục C08 cho biết, tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08, để nộp ngân sách nhà nước của phiên đấu giá thứ 6 (từ ngày 8/4 đến hết ngày 14/5) là 830 tỷ đồng. 
        Trong đó số tiền thu được từ đấu giá xe máy là 230 tỷ đồng, thu được từ đấu giá ô tô là 600 tỷ đồng.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/4fa77a3e-78e5-48b7-a7d7-79249e6a3b68.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:500px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Một biển số xe máy trúng đấu giá với số tiền hàng trăm triệu đồng (Ảnh: Chụp màn hình).
            </figcaption> 
      </figure>
      <p>Cũng theo C08, từ khi bắt đầu đấu giá biển số xe (từ ngày 15/9/2023 đến hết ngày 14/5), tổng số biển đã niêm yết lên sàn là hơn 3,5 triệu biển số; tổng số biển đấu giá thành là hơn 85.800 biển số; tổng giá trị tài sản đấu giá thành là hơn 6.000 tỷ đồng.</p>
      <p class="mb">Đặc biệt, tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của C08, để nộp ngân sách nhà nước (từ ngày bắt đầu đấu giá 15/9/2023 đến hết ngày 14/5) là 5.200 tỷ đồng.</p>
      <p class="mb">Một số biển ô tô mà chủ nhân đã nộp đủ tiền trúng đấu giá trong phiên đấu giá thứ 6 (từ ngày 8/4 đến hết ngày 14/5) đơn cử gồm: 35A-555.55 hơn 3,1 tỷ đồng; 47A-899.99 hơn 2 tỷ đồng; 15K-555.55 hơn 2,1 tỷ đồng.</p>
      <p class="mb">Một số biển xe máy có số tiền trúng đấu giá cao mà chủ nhân đã nộp đủ tiền gồm: 50A-888.88 hơn 1,4 tỷ đồng; 50A-567.89 854 triệu đồng; 29AC-666.66 735 triệu đồng...</p>
      <p class="text-base text-black-1000">
        <strong>Trần Thanh.</strong>
      </p>
      ` },
  { id: 5,
    category: "XD OL",
    title: "Người trúng đấu giá biển số xe phiên thứ 6 đã nộp 830 tỷ đồng",
    date: "17:57 16/05/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/8c818f89-0183-4c63-825b-eb4935abe3f9.png",
    excerpt: "Từ ngày 8/4 đến nay, tổng số tiền người trúng đấu giá biển số ô tô và xe máy đã nộp ngân sách Nhà nước khoảng 830 tỷ đồng.",
    content: `
      <strong> Từ ngày 8/4 đến nay, tổng số tiền người trúng đấu giá biển số ô tô và xe máy đã nộp ngân sách Nhà nước khoảng 830 tỷ đồng.</strong>
      <br>
      <p>Ngày 15/5, thông tin từ Cục CSGT (Bộ Công an) cho biết, qua gần 40 ngày triển khai phiên đấu giá biển số xe thứ 6 (từ ngày 8/4 - 14/5) theo Nghị định số 156/2024/NĐ-CP về đấu giá biển số xe (Nghị định 156), các đơn vị liên quan đã tổ chức đấu giá thành công trên 34.600 biển số.
       Tổng giá trị tài sản đấu giá thành công khoảng 1.650 tỷ đồng.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/c8fc9e46-799d-4993-abdf-b30e2cd34033.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:800px;height:500px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Một số kết quả trúng đấu giá biển số xe máy.
            </figcaption> 
      </figure>
      <p class="mb">Trong đó, có hơn 11.300 biển số ô tô với tổng trị giá trên 1.200 tỷ đồng và hơn 23.300 biển số xe máy giá trị khoảng 387 tỷ đồng.</p>
      <p class="mb">Trong số này, khoảng 830 tỷ đồng là tổng số tiền người trúng đấu giá biển số ô tô và xe máy đã nộp vào ngân sách Nhà nước.</p>
      <p class="mb">Như vậy, theo thống kê, từ thời điểm thực hiện đấu giá biển số xe (ngày 15/9/2023 - nay), tổng số tiền người trúng đấu giá đã nộp vào tài khoản chuyên thu của Cục CSGT để nộp vào ngân sách Nhà nước là hơn 5.200 tỷ đồng.</p>
      <p class="mb">Phiên đấu giá biển số lần thứ 6 bắt đầu từ sáng 8/4 với hơn 2,18 triệu biển số xe đưa ra đấu giá. Trong đó, hơn 1,55 triệu biển số lần đầu được đấu giá dành cho mô tô, xe gắn máy.</p>
      <p class="mb">Đáng chú ý, nhiều biển số xe máy được trả với mức khá cao và người trúng đấu giá đã nộp đủ tiền, như: 50AA-888.88 (TP.HCM) 1,455 tỷ đồng; 50AA-567.89 (TP.HCM) 854 triệu đồng; 29AC-666.66 (Hà Nội) 735 triệu đồng; 95AA-222.22 (Hậu Giang) 603 triệu đồng; 50AB-222.22 (TP.HCM) 562 triệu đồng...</p>
      <p class="mb">Một số biển dành cho ô tô cũng có kết quả trúng đấu giá thành công, hoàn tất nộp tiền, như: 35A-555.55 (Ninh Bình) 3,15 tỷ đồng; 47A-899.99 (Lâm Đồng) 2,075 tỷ đồng; 15K-555.55 (Hải Phòng) 2,145 tỷ đồng; 93A-567.89 (Bình Phước) 1,805 tỷ đồng; 93A-555.55 (Bình Phước) 1,75 tỷ đồng...</p>
      <p class="mb">Hiện nay, Nghị định 156 quy định đấu giá biển số xe là đấu giá theo hình thức trực tuyến. Phương thức đấu giá là phương thức trả giá lên.</p>
      <p class="mb">Trong đó, giá khởi điểm đấu giá biển số xe ô tô là 40 triệu đồng, 3 năm tăng 1 lần tính từ ngày 1/1/2025, mỗi lần tăng 5 triệu đồng. Còn giá khởi điểm đấu giá của biển số xe máy là 5 triệu đồng, 3 năm cũng tăng 1 lần tính từ ngày 1/1/2025, mỗi lần tăng 1 triệu đồng.</p>
      <p class="mb">Giá khởi điểm của biển số xe có định dạng AAAAA (A>4), ABCDE ( A < B < C < D < E, A>4) đưa ra đấu giá lại sau lần thứ hai là 500 triệu đồng (biển số xe ô tô) và 50 triệu đồng (biển số xe máy).</p>
      <p class="text-base text-black-1000">
        <strong>Hoàng Lam.</strong>
      </p>
    ` },
  { id: 6,
    category: "",
    title: "ĐẤU GIÁ THÀNH CÔNG LÔ TÀI SẢN THÍ ĐIỂM ĐẤU GIÁ TÀI SẢN VI PHẠM HÀNH CHÍNH TRONG ỨNG DỤNG VNEID",
    date: "18:26 28/02/2025",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/2c13ab91-efab-4509-b3f5-d4a7e4095004.jpg",
    excerpt: "Bốn chiếc động cơ máy thủy cano, nhãn hiệu YAMAHA 200ET (không có chân vịt), xuất xứ Nhật Bản vừa được đấu giá thành công.",
    content: `
      <p class="mb"><em> Bốn chiếc động cơ máy thủy cano, nhãn hiệu YAMAHA 200ET (không có chân vịt), xuất xứ Nhật Bản vừa được đấu giá thành công.</em></p>
      <p class="mb">Sáng ngày 28/2/2025, Công ty Đấu giá Hợp danh Việt Nam (VPA) đã tổ chức thành công phiên đấu giá trực tuyến 4 động cơ máy thủy cano nhãn hiệu YAMAHA 200ET (không có chân vịt), xuất xứ Nhật Bản với giá trúng đấu giá là 982 triệu đồng, cao hơn gấp 3 lần so với giá khởi điểm là 320 triệu đồng.</p>
      <p class="mb">Để đăng ký tham gia đấu giá, khách hàng phải thực hiện xác thực danh tính người tham gia bằng cách đăng nhập ứng dụng VNeID trên Trang thông tin đấu giá tài sản của Công ty VPA. Điều này không chỉ giúp xác thực danh tính người tham gia chính xác, 
        giảm thiểu nguy cơ giả mạo hồ sơ của người tham gia đấu giá mà còn tối giản thủ tục đăng ký, giúp người tham gia đấu giá thuận tiện hơn và đảm bảo tính công khai, nâng cao hiệu quả hoạt động đấu giá tài sản.</p>
      <p class="mb">Là một trong những đơn vị tiên phong tích hợp VNeID vào đấu giá trực tuyến, đại diện VPA nhấn mạnh, việc ứng dụng công nghệ định danh điện tử không chỉ giúp quản lý chặt chẽ hơn, mà còn tạo nền tảng để phát triển đấu giá trực tuyến theo hướng hiện đại, 
        minh bạch và hiệu quả. Khách hàng quan tâm đến các phiên đấu giá tài sản vi phạm hành chính có thể theo dõi thông báo đấu giá trên Cổng thông tin đấu giá tài sản của Bộ Công an tại địa chỉ: https://dgts.bocongan.gov.vn hoặc Trang thông tin đấu giá trực tuyến của VPA tại địa chỉ https://vpa.com.vn.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/975d9e03-8355-42a3-bec7-38e2e2cb74c1.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:500px;height:300px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Hình ảnh tài sản đưa ra đấu giá
            </figcaption> 
      </figure>
      <p class="mb">Lô tài sản đấu giá lần này thuộc quản lý của Công an thành phố Móng Cái, bị tịch thu theo Quyết định xử phạt vi phạm hành chính số 04/QĐ-XPHC ngày 02/01/2024 của UBND thành phố Móng Cái.</p>
      <p class="mb">Phiên đấu giá được tổ chức từ 09 giờ 00 phút đến 09 giờ 30 phút trên Trang thông tin đấu giá trực tuyến của VPA, phương thức đấu giá trả giá lên, với sự giám sát của đại diện Bộ Công an và chủ tài sản.
       Sau khi hoàn tất thanh toán, người trúng đấu giá sẽ thực hiện các thủ tục liên quan đến thuế, phí và chuyển nhượng theo quy định pháp luật.</p>
      <p>Trong thời gian tới, VPA sẽ tiếp tục mở rộng việc ứng dụng công nghệ vào các quy trình đấu giá, góp phần nâng cao hiệu quả quản lý, đảm bảo quyền lợi hợp pháp của các bên và thúc đẩy sự phát triển bền vững của thị trường đấu giá tài sản tại Việt Nam./.</p>
 ` },
  { id: 7,
    category: "Dân trí",
    title: "Đấu ấn một năm thí điểm đấu giá biển số trực tuyến",
    date: "10:47 27/12/2024",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/ba5c1fda-d91d-48a0-a40e-0d2a284d6b79.png",
    excerpt: "Tháng 9/2023, phiên đấu giá biển số xe trực tuyến đầu tiên được Công ty đấu giá hợp danh Việt Nam (VPA) tổ chức thành công với vai trò là đơn vị duy nhất được Bộ Công an lựa chọn thực hiện đấu giá biển số xe ô tô.",
    content: `
      <p class="mb"> Tháng 9/2023, phiên đấu giá biển số xe trực tuyến đầu tiên được Công ty đấu giá hợp danh Việt Nam (VPA) tổ chức thành công với vai trò là đơn vị duy nhất được Bộ Công an lựa chọn thực hiện đấu giá biển số xe ô tô. Đến nay, sau hơn 1 năm, việc đấu giá biển số ô tô trực tuyến đã mang tới những kết quả ấn tượng, tạo nên cuộc cách mạng trong ngành đấu giá và đóng góp tích cực vào kinh tế - xã hội Việt Nam.</p>
      <p class="mb"><p class="text-xl text-black-1000">
        <strong>Đột phá công nghệ, hiệu quả kinh tế</strong> </p> <br>
      <p class="mb">Đấu giá biển số xe ô tô được đưa ra nhằm đáp ứng nhu cầu, nguyện vọng của người dân đăng ký biển số theo sở thích. Với một thị trường ô tô đang phát triển mạnh như Việt Nam, nhu cầu biển số đẹp của người dân mỗi năm rất lớn. Do đó, áp lực lên đơn vị đấu giá cũng không nhỏ, khi mỗi phiên đấu giá có hàng chục nghìn biển số được đưa lên hệ thống để người dân lựa chọn.</p>
      <p class="mb">Để thực hiện hiệu quả hoạt động này, VPA áp dụng nhiều công nghệ hiện đại và liên tục cải tiến quy trình nhằm hỗ trợ người dân thuận lợi khi tham gia đấu giá. Không cần đến trực tiếp, khách hàng từ mọi miền đất nước có thể tham gia chỉ với vài thao tác đơn giản và dễ tiếp cận, xóa bỏ nhiều rào cản từng khiến người dân khó tiếp cận với hoạt động đấu giá chuyên nghiệp. 
        Chính nhờ những công nghệ hiện đại và quy trình chặt chẽ, VPA giúp đưa lĩnh vực đấu giá của Việt Nam có bước tiến vượt bậc, đáp ứng kỳ vọng hiện đại hóa và chuyển đổi số của quốc gia.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/0bd46eb6-b3df-43c2-9ab6-9a56c01c1ce4.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:400px;height:400px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Công nghệ và vận hành tinh gọn đã mang tới những phiên đấu giá hiệu quả, tiết kiệm trong hơn 1 năm qua.
            </figcaption> 
      </figure>
      <p class="mb">Với bộ máy tinh gọn và thực hiện hoàn toàn online, chi phí cho mỗi phiên đấu giá được tối ưu, mang lại hiệu quả kinh tế cao.</p>
      <p class="mb">Theo đại diện VPA, chỉ trong hơn một năm thí điểm, hơn 2 triệu biển số được đấu giá với hơn 50.000 biển số xe được đấu giá thành công, thu về cho ngân sách nhà nước gần 4.500 tỷ đồng.
       Đây là thành tích ấn tượng với hoạt động chỉ mới thực hiện thí điểm trong vòng hơn 1 năm, tạo ra nguồn thu mới ổn định cho ngân sách, giảm bớt gánh nặng từ các nguồn thu truyền thống, tăng dư địa cho chính sách tài khóa của chính phủ.</p>
      <p class="mb"><p class="text-xl text-black-1000">
        <strong>Minh bạch và công khai, bước đệm cho phát triển bền vững</strong> </p> <br>
      <p class="mb"> Ngoài đáp ứng nhu cầu, nguyện vọng của người dân, đấu giá biển số xe còn giúp khai thác có hiệu quả tài sản công là kho biển số nhằm tạo nguồn thu cho ngân sách Nhà nước và công khai, minh bạch trong công tác đăng ký, quản lý xe với tiêu chí cải cách thủ tục hành chính, đo lường sự hài lòng của người dân.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/91f233eb-951f-44c8-8010-75b01ab1cdf0.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:600px;height:400px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Minh bạch là một trong những yếu tố được đánh giá cao của các phiên đấu giá biển số xe do VPA điều hành.
            </figcaption> 
      </figure>
      <p class="mb">Những thành tựu đạt được của VPA sau hơn một năm điều hành hoạt động đấu giá biển số ô tô là kết quả của tầm nhìn chiến lược, sự đầu tư bài bản về cả công nghệ, con người, truyền thông, đặt nền móng cho việc triển khai các quy định mới của Luật Trật tự, An toàn giao thông đường bộ và Nghị định của Chính phủ. Mới đây, Bộ Công an ban hành Thông tư số 79 quy định biển số xe trúng đấu giá sẽ được gắn tem nhận diện nền màu đỏ và màu vàng, chữ màu xanh; nhằm phân biệt với biển số thường hoặc biển số xe sử dụng năng lượng sạch.</p>
      <p class="mb">Từ thành công của hoạt động đấu giá biển số xe ô tô, biển số xe máy cũng sẽ được đưa vào đấu giá công khai theo thông tin được nêu tại Nghị định 156/2024 quy định về đấu giá biển số xe có hiệu lực từ 1/1/2025. Đây là nghị định quy định chi tiết điều 37 và 38 Luật Trật tự, an toàn giao thông đường bộ 2024 về đấu giá biển số xe.</p>
      <p class="mb">Những bước đi tiên phong của VPA đóng góp rất lớn cho mục tiêu phát triển bền vững của lĩnh vực đấu giá biển số nói riêng và ngành đấu giá Việt Nam nói chung, chứng minh năng lực của Việt Nam trong dòng chảy của xu thế quốc tế.</p>
      <p class="text-base text-black-1000">
        <strong>Tiến Thịnh.</strong> </p>
  ` },
  { id: 8,
    category: "Người đưa tin ",
    title: "Những trường hợp được đổi biển số xe từ 1/1/2025, ai cũng nên biết",
    date: "09:42 16/12/2024",
    source: "Tin tức",
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/3d23cb26-10a1-44a3-bbbf-fa6d00c3c4be.png",
    excerpt: "Điều 18 Thông tư 79/2024/TT-BCA quy định về trường hợp đổi chứng nhận đăng ký xe, biển số xe như sau:",
    content: `
      <p class="mb">Điều 18 Thông tư 79/2024/TT-BCA quy định về trường hợp đổi chứng nhận đăng ký xe, biển số xe như sau:</p>
      <p class="mb">1. Chứng nhận đăng ký xe, biển số xe bị mờ, hỏng.</p>
      <p class="mb">2. Xe cải tạo; xe thay đổi màu sơn.</p>
      <p class="mb">3. Xe đã đăng ký, cấp biển số xe nền màu trắng, chữ và số màu đen đổi sang biển số xe nền màu vàng, chữ và số màu đen (xe hoạt động kinh doanh vận tải bằng ô tô) và ngược lại.</p>
      <p class="mb">4. Thay đổi các thông tin của chủ xe (tên chủ xe, số định danh) hoặc chủ xe có nhu cầu đổi chứng nhận đăng ký xe theo địa chỉ mới.</p>
      <p class="mb">5. Chứng nhận đăng ký xe hết thời hạn sử dụng.</p>
      <p class="mb">6. Đổi chứng nhận đăng ký xe cũ, biển số xe cũ sang chứng nhận đăng ký xe, biển số xe theo quy định tại Thông tư này; chủ xe có nhu cầu đổi biển ngắn sang biển dài hoặc ngược lại.</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/f70143d4-e9b2-441a-8b02-c9b03f4d1896.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:600px;height:400px;border-radius:6px;" />
            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Ảnh minh họa.
            </figcaption> 
      </figure>
      <p class="mb">Điều 19 Thông tư 79/2024/TT-BCA quy định về hồ sơ đổi chứng nhận đăng ký xe, biển số xe như sau:</p>
      <p class="mb">1. Giấy khai đăng ký xe.</p>
      <p class="mb">2. Giấy tờ của chủ xe theo quy định tại Điều 10 Thông tư này.</p>
      <p class="mb">3. Chứng nhận đăng ký xe (trường hợp đổi chứng nhận đăng ký xe) hoặc biển số xe (trường hợp đổi biển số xe).</p>
      <p class="mb">4. Một số giấy tờ khác:</p>
      <p class="mb">a) Xe cải tạo thay đổi tổng thành máy, tổng thành khung thì phải có thêm chứng nhận nguồn gốc, chứng từ nộp lệ phí trước bạ, chứng từ chuyển quyền sở hữu của tổng thành máy hoặc tổng thành khung đó theo quy định. Trường hợp tổng thành máy, tổng thành khung không cùng kiểu loại thì phải có thêm giấy chứng nhận an toàn kỹ thuật và bảo vệ môi trường xe cơ giới, xe máy chuyên dùng cải tạo theo quy định;</p>
      <p class="mb">b) Xe cải tạo thay tổng thành máy của xe đã đăng ký thì phải có chứng nhận thu hồi chứng nhận đăng ký xe, biển số của xe có tổng thành đó;</p>
      <figure class="my-4">
        <img src="https://s3-hfx03.fptcloud.com/vpa-web/photos/c73957cc-d886-4af1-ba86-b1988785a7ee.png" alt=""
          style="display:block;margin:0 auto;width:100%;max-width:600px;height:400px;border-radius:6px;" />
      </figure>
      <p class="mb">c) Xe cải tạo thay đổi kiểu loại xe thì phải có thêm giấy chứng nhận an toàn kỹ thuật và bảo vệ môi trường xe cơ giới, xe máy chuyên dùng cải tạo theo quy định;</p>
      <p class="mb">d) Trường hợp đổi biển số xe nền màu vàng, chữ và số màu đen sang biển số xe nền màu trắng, chữ và số màu đen, phải có thêm văn bản thu hồi giấy phép kinh doanh vận tải hoặc văn bản thu hồi phù hiệu, biển hiệu;</p>
      <p class="mb">đ) Đối với trường hợp chủ xe có nhu cầu đổi chứng nhận đăng ký xe khi thay đổi trụ sở, nơi cư trú đến địa chỉ mới ngoài phạm vi đăng ký của cơ quan đổi chứng nhận đăng ký xe, biển số xe, phải có thêm giấy xác nhận hồ sơ xe theo mẫu ĐKX14 ban hành kèm theo Thông tư này.</p>
      <p class="text-base text-black-1000">
        <strong>Minh Hoa.</strong> </p>
    ` },
];

const notifData = [
  // Thông báo (Notifications - Tích hợp dữ liệu từ ảnh 08.12.56.png và 08.13.02.jpg)
  { id: 10,
    category: "",
    title: "THÔNG BÁO ĐẤU GIÁ TÀI SẢN",
    date: "08:56 12/12/2025",
    source: "Thông báo" ,
    image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/2d7cffd4-75ef-4eea-8ce3-f94dc6f894bf.jpg",
    excerpt: "Công ty Đấu giá hợp danh Việt Nam (Công ty VPA). Địa chỉ trụ sở: NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân, thành phố Hà Nội thông báo đấu giá......",
    content: `
      Công ty Đấu giá hợp danh Việt Nam (Công ty VPA) trân trọng thông báo một phiên đấu giá sắp tới được tổ chức tại trụ sở NO2-T4.03. Phiên đấu giá gồm nhiều mặt hàng tang vật, hồ sơ chi tiết sẽ được đăng tải trên website. Khách hàng quan tâm vui lòng liên hệ hotline để biết thêm chi tiết.


      
    ` },
  { id: 11, category: "", title: "THÔNG BÁO THỜI GIAN ĐẤU GIÁ TRỰC TUYẾN BIỂN SỐ XE NGÀY 19/12/2025", date: "16:57 11/12/2025", source: "Thông báo" , image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/b476eb62-0563-4454-82bf-8fdf890c68d1.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam trân trọng thông báo thời gian tổ chức đấu giá biển số xe ngày 19/12/2025 như sau....", content: `Công ty thông báo phiên đấu giá biển số xe ngày 19/12/2025 sẽ diễn ra trực tuyến. Thông tin chi tiết về danh mục biển số, thời gian bắt đầu và hướng dẫn tham gia sẽ được cập nhật trên trang thông báo.` },
  { id: 12, category: "", title: "THÔNG BÁO THỜI GIAN ĐẤU GIÁ TRỰC TUYẾN BIỂN SỐ XE NGÀY 18/12/2025", date: "08:55 11/12/2025", source: "Thông báo", image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/3a9d5e72-d89d-4933-8a74-5761eab495fe.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam trân trọng thông báo thời gian tổ chức đấu giá biển số xe ngày 18/12/2025 như sau...", content: `Phiên đấu giá ngày 18/12/2025 bao gồm các lô biển số xe do các cơ quan thanh lý. Mọi quy trình tham gia được thực hiện trực tuyến.`  },
  { id: 13, category: "", title: "THÔNG BÁO ĐẤU GIÁ TÀI SẢN", date: "08:20 11/12/2025", source: "Thông báo", image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/407c13ec-276b-421e-807c-6d6ccbd72e19.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam (Công ty VPA). Địa chỉ trụ sở: NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân, thành phố Hà Nội thông báo đấu giá", content: `Thông báo về phiên đấu giá tài sản kèm theo các thông tin chi tiết, danh mục và hướng dẫn tham dự. Khách hàng tham gia vui lòng đọc kỹ thể lệ.`  },
  { id: 14, category: "", title: "THÔNG BÁO THỜI GIAN ĐẤU GIÁ TRỰC TUYẾN BIỂN SỐ XE NGÀY 17/12/2025", date: "08:48 10/12/2025", source: "Thông báo" , image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/9f9c9c30-a5f5-4c85-8182-38c9b0a732f6.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam trân trọng thông báo thời gian tổ chức đấu giá biển số xe ngày 17/12/2025 như sau:", content: `Phiên đấu giá ngày 17/12/2025 sẽ diễn ra theo lịch và hướng dẫn đã đăng tải. Vui lòng kiểm tra kỹ thông tin lô và quy định tham gia.` },
  { id: 15, category: "", title: "THÔNG BÁO ĐẤU GIÁ TÀI SẢN", date: "08:25 08/12/2025", source: "Thông báo" , image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/30fe8fa2-00c4-4fa4-a2ef-3fd5828c5230.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam (Công ty VPA). Địa chỉ trụ sở: NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân, thành phố Hà Nội thông báo đấu giá", content: `Thông báo các tài sản đưa ra bán, điều kiện và thể lệ tham gia.` },
  { id: 16, category: "", title: "THÔNG BÁO THỜI GIAN ĐẤU GIÁ TRỰC TUYẾN BIỂN SỐ XE NGÀY 16/12/2025", date: "16:42 08/12/2025", source: "Thông báo", image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/9f9c9c30-a5f5-4c85-8182-38c9b0a732f6.jpg", excerpt: "Công ty Đấu giá hợp danh Việt Nam trân trọng thông báo thời gian tổ chức đấu giá biển số xe ngày 16/12/2025 như sau...", content: `Thông tin chi tiết về phiên đấu giá ngày 16/12/2025 đã được cập nhật.`  },
  { id: 17, category: "", title: "CÔNG TY ĐẤU GIÁ HỢP DANH ĐẤU GIÁ VIỆT NAM THÔNG BÁO ĐẤU GIÁ TÀI SẢN", date: "09:42 08/12/2024", source: "Thông báo", image: "https://s3-hfx03.fptcloud.com/vpa-web/photos/531f2b9a-6022-481f-8a01-5caf6ef66b1e.jpg", excerpt: "", content: `` },
];

const auctionResultsData = [
  { id: 1, plateNumber: "29K - 298.92", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 2, plateNumber: "30M - 900.79", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 3, plateNumber: "30M - 018.81", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 4, plateNumber: "29K - 190.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 5, plateNumber: "30M - 902.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 6, plateNumber: "30M - 671.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 7, plateNumber: "30M - 717.71", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 8, plateNumber: "30K - 905.68", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 9, plateNumber: "29K - 203.86", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 10, plateNumber: "29K - 092.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 11, plateNumber: "30M - 960.96", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 12, plateNumber: "30B - 846.66", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 13, plateNumber: "30C - 211.66", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 14, plateNumber: "30C - 122.69", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 15, plateNumber: "30B - 776.87", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 16, plateNumber: "30B - 993.66", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 17, plateNumber: "30B - 663.83", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 18, plateNumber: "30C - 012.66", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 19, plateNumber: "30B - 191.66", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 20, plateNumber: "30B - 587.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 21, plateNumber: "30B - 612.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 22, plateNumber: "30B - 182.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 23, plateNumber: "30B - 222.19", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 24, plateNumber: "30B - 202.89", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 25, plateNumber: "30B - 507.77", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 26, plateNumber: "30B - 633.55", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 27, plateNumber: "30B - 833.55", startPrice: "65.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 28, plateNumber: "30B - 661.61", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 29, plateNumber: "30C - 033.39", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 30, plateNumber: "30B - 923.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 31, plateNumber: "30C - 028.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 32, plateNumber: "30B - 966.36", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 33, plateNumber: "30C - 265.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 34, plateNumber: "30B - 127.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 35, plateNumber: "30B - 267.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 36, plateNumber: "30B - 553.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 37, plateNumber: "30B - 285.79", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 38, plateNumber: "30B - 516.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 39, plateNumber: "30B - 308.89", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 40, plateNumber: "30C - 028.68", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 41, plateNumber: "30B - 961.68", startPrice: "45.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 42, plateNumber: "30M - 561.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 43, plateNumber: "30M - 165.79", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 44, plateNumber: "30L - 805.68", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 45, plateNumber: "29K - 362.88", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 46, plateNumber: "29K - 297.92", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 47, plateNumber: "30M - 901.23", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 48, plateNumber: "30L - 900.79", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 49, plateNumber: "30M - 596.59", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
  { id: 50, plateNumber: "30B - 925.99", startPrice: "40.000.000 đ", province: "Thành phố Hà Nội", type: "Tứ quý", auctionTime: "15:45 26/11/2025" },
];

// Export all data arrays
export {
  carPlates,
  officialCarPlates,
  motorbikePlates,
  motorbikeAuctionResults,
  officialMotorbikePlates,
  assets,
  newsData,
  notifData,
  auctionResultsData,
  // Expanded data with plate colors
  expandedCarPlates,
  expandedMotorbikePlates
};

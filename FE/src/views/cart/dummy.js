// 임의의 mock 데이터 생성
var mockData = [
  { name: "갤럭시워치갤럭시워치갤럭시워치갤럭시워치", price: 1000, color: "레드", productCount:1, image: "https://via.placeholder.com/150"},
  { name: "샤오미미밴드", price: 2000, color: "블랙", productCount:2, image: "https://via.placeholder.com/150"},
  { name: "애플워치", price: 3000, color: "그린", productCount:4, image: "https://via.placeholder.com/150"}
];

// 로컬 스토리지에 mock 데이터 저장
localStorage.setItem("cart", JSON.stringify(mockData));

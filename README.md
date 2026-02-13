# Web Crawler - FPT Shop & CellphoneS

Hệ thống thu thập dữ liệu (Web Crawler) tự động từ các website thương mại điện tử FPT Shop và CellphoneS. Dự án được xây dựng bằng Node.js, Express.js và Puppeteer/Cheerio để crawl thông tin sản phẩm, giá cả và đặc điểm kỹ thuật.



##  Giới thiệu

Dự án này là một web crawler được thiết kế để tự động thu thập và cập nhật thông tin sản phẩm từ hai website thương mại điện tử lớn tại Việt Nam:
- **FPT Shop** (fptshop.com.vn)
- **CellphoneS** (cellphones.com.vn)

Dữ liệu thu thập được lưu trữ vào database để phục vụ cho việc phân tích giá, so sánh sản phẩm, hoặc các mục đích nghiên cứu khác.

##  Tính năng

### Crawling Features
-  Thu thập dữ liệu tự động từ FPT Shop và CellphoneS
-  Crawl thông tin sản phẩm: tên, giá, hình ảnh, mô tả
-  Cập nhật dữ liệu định kỳ
-  Lọc sản phẩm theo danh mục (điện thoại, laptop, tablet, phụ kiện)
-  Tracking thay đổi giá theo thời gian

### Management Features
-  Quản lý danh sách sản phẩm đã crawl
-  Tìm kiếm và lọc dữ liệu
-  Dashboard hiển thị thống kê
-  Xác thực và phân quyền admin
-  Export dữ liệu ra CSV/JSON

### Technical Features
-  Crawling nhanh với concurrent requests
-  Bypass anti-bot mechanisms
-  Retry mechanism cho failed requests
-  Logging chi tiết cho từng crawl session
-  Rate limiting để tránh bị block

##  Công nghệ sử dụng

### Backend
- **Node.js** (v14+) - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database để lưu trữ dữ liệu crawl
- **Mongoose** - ODM cho MongoDB

### Crawling Libraries
- **Puppeteer** - Headless browser cho dynamic content
- **Cheerio** - HTML parsing
- **Axios** - HTTP client
- **node-cron** - Scheduled tasks

### Frontend
- **Pug** - Template engine
- **CSS3** - Styling
- **JavaScript** - Client-side functionality
- **Chart.js** - Data visualization

### Utilities
- **Winston** - Logging
- **dotenv** - Environment configuration
- **express-validator** - Input validation

##  Cấu trúc dự án

```
crawl_data/
├── config/                 # Database và app configuration
│   ├── database.js
│   └── app.js
├── controllers/           # Request handlers
│   ├── admin.controller.js
│   └── product.controller.js
├── crawlers/             # Crawler implementations
│   ├── fptshop.crawler.js
│   ├── cellphones.crawler.js
│   └── base.crawler.js
├── helpers/              # Helper functions
│   └── crawl/
│       ├── parser.js
│       └── utils.js
├── middlewares/          # Custom middlewares
│   └── admin/
│       ├── auth.middleware.js
│       └── validate.middleware.js
├── models/               # Database models
│   ├── product.model.js
│   ├── crawl-history.model.js
│   └── user.model.js
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── routes/               # API routes
│   ├── admin.route.js
│   └── product.route.js
├── validates/            # Validation schemas
│   └── admin/
├── views/                # Pug templates
│   ├── admin/
│   └── layouts/
├── .env.example          # Environment variables template
├── .gitignore
├── index.js              # Application entry point
├── package.json
└── README.md
```

##  Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 14.x
- **npm**
- **MongoDB** >= 4.x (local hoặc cloud)
- **Chrome/Chromium** (cho Puppeteer)

### Các bước cài đặt

1. **Clone repository**
```bash
git clone https://github.com/nguyenkhacdat1402/crawl_data.git
cd crawl_data
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình môi trường**

Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Chỉnh sửa file `.env`:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/crawl_data

# Authentication
JWT_SECRET=your_super_secret_key_here
SESSION_SECRET=your_session_secret


4. **Khởi chạy MongoDB**
```bash
# Nếu dùng MongoDB local
mongod
```

5. **Chạy ứng dụng**

Production mode:
```bash
npm start
```

6. **Truy cập ứng dụng**
```
http://localhost:3000
```

##  Sử dụng

### Crawl dữ liệu thủ công

#### 1. Crawl từ FPT Shop
```bash
POST http://localhost:3000/api/crawl/fptshop
```

#### 2. Crawl từ CellphoneS
```bash
POST http://localhost:3000/api/crawl/cellphones
```

### Sử dụng Dashboard

1. Đăng nhập với tài khoản admin
2. Truy cập Dashboard để xem thống kê
3. Quản lý sản phẩm đã crawl
4. Xem lịch sử crawl và logs
5. Export dữ liệu nếu cần


##  API Documentation

### Products API

#### Lấy danh sách sản phẩm
```
GET /api/products
Query params:
  - page: số trang (default: 1)
  - limit: số items/trang (default: 20)
  - source: fptshop | cellphones
  - category: danh mục sản phẩm
  - search: tìm kiếm theo tên
```

#### Lấy chi tiết sản phẩm
```
GET /api/products/:id
```

#### So sánh giá giữa 2 nguồn
```
GET /api/products/compare/:productName
```


**QUAN TRỌNG**: Dự án này mục đích học tập và nghiên cứu.


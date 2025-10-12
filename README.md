# Adhivasindo-BE

## Analisis Proyek

Proyek ini adalah backend API untuk manajemen autentikasi pengguna dan konten, dibangun dengan Node.js, Express, dan Sequelize untuk database PostgreSQL. API ini menyediakan endpoint untuk registrasi, login, dan CRUD operasi pada konten dengan autentikasi JWT.

### Struktur Proyek

- **controllers/**: Mengandung logika bisnis untuk autentikasi dan konten.
- **models/**: Model database untuk User dan Content.
- **routes/**: Definisi rute API.
- **middleware/**: Middleware autentikasi JWT.
- **config/**: Konfigurasi database Sequelize.
- **utils/**: Utilitas untuk format respons API standar.

### Endpoint API

#### Autentikasi

- `POST /api/auth/register`: Registrasi pengguna baru.
- `POST /api/auth/login`: Login dan dapatkan token JWT.

#### Konten (Memerlukan Autentikasi JWT)

- `POST /api/contents`: Buat konten baru.
- `GET /api/contents`: Dapatkan daftar konten dengan paging (?page=1&limit=10).
- `GET /api/contents/:id`: Dapatkan konten berdasarkan ID.
- `PUT /api/contents/:id`: Update konten.
- `DELETE /api/contents/:id`: Hapus konten.

### Format Respons

Semua respons API mengikuti format standar:

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Pesan sukses atau error",
  "data": {} atau [] atau null,
  "date": "12-Oktober-2025"
}
```

## Contoh Curl

Asumsikan server berjalan di `http://localhost:3000`.

### 1. Registrasi Pengguna

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

**Respons Sukses:**

```json
{
  "code": 201,
  "version": "0.0.1",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "user"
  },
  "date": "12-Oktober-2025"
}
```

**Respons Error (Email sudah ada):**

```json
{
  "code": 500,
  "version": "0.0.1",
  "message": "Validation error",
  "data": null,
  "date": "12-Oktober-2025"
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

**Respons Sukses:**

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "date": "12-Oktober-2025"
}
```

**Respons Error (Kredensial salah):**

```json
{
  "code": 401,
  "version": "0.0.1",
  "message": "Invalid credentials",
  "data": null,
  "date": "12-Oktober-2025"
}
```

Gunakan token dari respons login untuk endpoint berikutnya dengan header `Authorization: Bearer <token>`.

### 3. Buat Konten

```bash
curl -X POST http://localhost:3000/api/contents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title": "Judul Konten", "body": "Isi konten"}'
```

**Respons Sukses:**

```json
{
  "code": 201,
  "version": "0.0.1",
  "message": "Content created successfully",
  "data": {
    "id": 1,
    "title": "Judul Konten",
    "body": "Isi konten",
    "userId": 1,
    "createdAt": "2025-10-12T00:00:00.000Z",
    "updatedAt": "2025-10-12T00:00:00.000Z"
  },
  "date": "12-Oktober-2025"
}
```

### 4. Dapatkan Daftar Konten

```bash
curl -X GET "http://localhost:3000/api/contents?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respons Sukses:**

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Contents retrieved successfully",
  "data": {
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1,
    "contents": [
      {
        "id": 1,
        "title": "Judul Konten",
        "body": "Isi konten",
        "userId": 1,
        "createdAt": "2025-10-12T00:00:00.000Z",
        "updatedAt": "2025-10-12T00:00:00.000Z",
        "User": {
          "id": 1,
          "username": "testuser",
          "email": "test@example.com"
        }
      }
    ]
  },
  "date": "12-Oktober-2025"
}
```

### 5. Dapatkan Konten Berdasarkan ID

```bash
curl -X GET http://localhost:3000/api/contents/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respons Sukses:**

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Content retrieved successfully",
  "data": {
    "id": 1,
    "title": "Judul Konten",
    "body": "Isi konten",
    "userId": 1,
    "createdAt": "2025-10-12T00:00:00.000Z",
    "updatedAt": "2025-10-12T00:00:00.000Z",
    "User": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    }
  },
  "date": "12-Oktober-2025"
}
```

**Respons Error (Tidak ditemukan):**

```json
{
  "code": 404,
  "version": "0.0.1",
  "message": "Content not found",
  "data": null,
  "date": "12-Oktober-2025"
}
```

### 6. Update Konten

```bash
curl -X PUT http://localhost:3000/api/contents/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title": "Judul Baru", "body": "Isi baru"}'
```

**Respons Sukses:**

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Content updated successfully",
  "data": {
    "id": 1,
    "title": "Judul Baru",
    "body": "Isi baru",
    "userId": 1,
    "createdAt": "2025-10-12T00:00:00.000Z",
    "updatedAt": "2025-10-12T00:00:00.000Z"
  },
  "date": "12-Oktober-2025"
}
```

**Respons Error (Tidak diizinkan):**

```json
{
  "code": 403,
  "version": "0.0.1",
  "message": "Unauthorized",
  "data": null,
  "date": "12-Oktober-2025"
}
```

### 7. Hapus Konten

```bash
curl -X DELETE http://localhost:3000/api/contents/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respons Sukses:**

```json
{
  "code": 200,
  "version": "0.0.1",
  "message": "Content deleted successfully",
  "data": null,
  "date": "12-Oktober-2025"
}
```

**Respons Error (Tidak diizinkan):**

```json
{
  "code": 403,
  "version": "0.0.1",
  "message": "Unauthorized",
  "data": null,
  "date": "12-Oktober-2025"
}
```

## Menjalankan Proyek

1. Install dependencies: `npm install`
2. Setup database PostgreSQL dan konfigurasi di `config/database.js`
3. Jalankan server: `npm start` atau `node index.js`
4. Server akan berjalan di port 3000 (atau sesuai PORT di .env)

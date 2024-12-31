# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker


# Exercise Tracker API

Aplikasi ini menyediakan API sederhana untuk melacak latihan fisik pengguna. Kamu bisa mendaftarkan user baru, menambahkan catatan latihan, dan melihat log latihan user.

## Fitur Utama

*   **Pendaftaran Pengguna:** Membuat akun pengguna baru dengan *username* unik.
*   **Pencatatan Latihan:** Menambahkan detail latihan (deskripsi, durasi, dan tanggal) untuk setiap pengguna.
*   **Log Latihan:** Melihat catatan latihan pengguna, difilter berdasarkan rentang tanggal dan jumlah catatan yang ditampilkan.

## Cara Menggunakan

### Endpoint

*   **`POST /api/users`**: Membuat pengguna baru.
    *   Menerima: `username` dalam *body* request.
    *   Mengembalikan: JSON object dengan `username` dan `_id` user.
    *   Contoh Request Body:
        ```json
        {
            "username": "johnDoe"
        }
        ```
    *   Contoh Response:
        ```json
        {
            "username": "johnDoe",
            "_id": "some-unique-id"
        }
        ```

*   **`GET /api/users`**: Mendapatkan daftar semua pengguna.
    *   Mengembalikan: Array JSON object berisi informasi `username` dan `_id` dari semua pengguna.
    *   Contoh Response:
        ```json
         [
            {
                "username": "johnDoe",
                "_id": "some-unique-id"
            },
              {
                "username": "janeDoe",
                "_id": "another-unique-id"
            }
         ]
        ```
*   **`POST /api/users/:_id/exercises`**: Menambahkan catatan latihan ke pengguna.
    *   Menerima:
        *   `description`, `duration` (dalam menit), dan `date` (opsional) dalam *body* request.
        *   `_id` pengguna dalam *path parameters*.
    *   Mengembalikan: JSON object detail latihan yang baru ditambahkan beserta username pengguna.
    *   Contoh Request Body:
        ```json
        {
            "description": "Lari pagi",
            "duration": 30,
            "date": "2024-03-15"
        }
        ```
    *   Contoh Response:
        ```json
        {
            "username": "johnDoe",
            "description": "Lari pagi",
            "duration": 30,
            "date": "Fri Mar 15 2024",
            "_id": "some-unique-id"
        }
        ```

*   **`GET /api/users/:_id/logs`**: Mendapatkan log latihan pengguna.
    *   Menerima:
        *   `_id` pengguna dalam *path parameters*.
        *   Query parameters opsional: `from`, `to`, dan `limit`.
    *   Mengembalikan: JSON object berisi username pengguna, jumlah catatan latihan, `_id` pengguna dan array yang berisi catatan latihan.
    *   Contoh Response:
    ```json
    {
      "username": "johnDoe",
      "count": 2,
      "_id": "some-unique-id",
      "log": [
        {
            "description": "Lari pagi",
            "duration": 30,
            "date": "Fri Mar 15 2024"
        },
        {
            "description": "Angkat beban",
            "duration": 45,
            "date": "Sat Mar 16 2024"
        }
      ]
   }
    ```
    *   Query parameter
         * `from`: Format tanggal YYYY-MM-DD untuk memfilter latihan yang dimulai dari tanggal ini
         * `to`: Format tanggal YYYY-MM-DD untuk memfilter latihan hingga tanggal ini
         * `limit`: Integer yang membatasi jumlah latihan yang dikembalikan

### Konfigurasi

*   **`.env`:** Port server dapat dikonfigurasi menggunakan variabel lingkungan `PORT` dalam file `.env`. Default adalah port 3000 jika variabel `PORT` tidak didefinisikan.

### Cara Menjalankan

1.  Clone repositori ini.
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  (Opsional) Buat file `.env` dan tambahkan `PORT=<nomor-port-pilihan>`.
4.  Jalankan aplikasi:
    ```bash
    npm start
    ```

### Catatan

*   Penyimpanan data (users dan exercises) menggunakan *in-memory storage*. Data akan hilang setelah server mati.
*   Untuk penyimpanan permanen, kamu bisa menggunakan database seperti MongoDB atau PostgreSQL.

## Teknologi yang Digunakan

*   Node.js
*   Express.js
*   `uuid`: Untuk membuat ID unik.
*   `cors`: Untuk mengaktifkan CORS

## Kontribusi

Kontribusi melalui *pull request* sangat diharapkan.

## Lisensi

 MIT License
// Contoh daftar HTTP Request
function getDetailData(id = 0) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then(
            (value) =>
                // Kembalikan dalam bentuk Promise dan beri jeda
                new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(`Eksekusi request id ${id}`);
                        resolve(value);
                    }, 10000);
                }),
        );
}

function getListPost() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(
        (response) => response.json(),
    );
}

// ====================================
// Fungsi DetailBlog #1 Promise Then
function getDetailBlogs(listpost = []) {
    const detailArray = [];
    // ambil detail 10 post pertama
    for (let i = 0; i < 10; i += 1) {
        const postId = listpost[i].id;
        getDetailData(postId)
            .then((result) => {
                // Hasil data dimasukkan ke dalam array
                detailArray.push(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Cek hasil array disini.
    console.log('Jalankan fungsi selanjutnya');
    console.log(detailArray);
}

// Fungsi DetailBlog #2 Promise Async Await
async function asyncGetDetailBlogs(listpost = []) {
    const detailArray = [];
    // ambil detail 10 post pertama
    for (let i = 0; i < 10; i += 1) {
        try {
            const postId = listpost[i].id;
            // eslint-disable-next-line no-await-in-loop
            const result = await getDetailData(postId);
            detailArray.push(result);
        } catch (err) {
            console.log(err);
        }
    }

    // Cek hasil array disini.
    console.log('Jalankan fungsi selanjutnya');
    console.log(detailArray);
}

// =========================================================

// Varian lain yang menggunakan forEach Loop
function getDetailBlogsForEach(listpost = []) {
    const arrayBatasPost = listpost.slice(0, 11);

    const detailArray = [];
    // ambil detail 10 post pertama
    arrayBatasPost.forEach((valuepost) => {
        const { id } = valuepost;
        getDetailData(id)
            .then((result) => {
                // Hasil data dimasukkan ke dalam array
                detailArray.push(result);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Cek hasil array disini.
    console.log(detailArray);
}

async function asyncGetDetailBlogsForEach(listpost = []) {
    const arrayBatasPost = listpost.slice(0, 11);

    const detailArray = [];
    // ambil detail 10 post pertama
    arrayBatasPost.forEach(async (valuepost) => {
        const { id } = valuepost;
        const result = await getDetailData(id);
        detailArray.push(result);
    });

    // Cek hasil array disini.
    console.log(detailArray);
}

// ================================================================

// Eksekusi data promise
async function getBlogPostDetails() {
    const listBlog = await getListPost();
    // getDetailBlogs(listBlog);
    asyncGetDetailBlogs(listBlog);
}

getBlogPostDetails();

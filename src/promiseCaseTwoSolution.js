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
                    }, 5000);
                }),
        );
}

function getListPost() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(
        (response) => response.json(),
    );
}

async function promisedGetDetailBlogParalel(listpost = []) {
    const listPromise = [];
    let listResult = [];
    const listValueResult = [];
    // ambil detail 10 post pertama
    // Simpan promise object ke dalam Array,
    for (let i = 0; i < 10; i += 1) {
        const postId = listpost[i].id;
        const promiseDetail = getDetailData(postId);
        listPromise.push(promiseDetail);
    }

    // Jalankan secara paralel jika ingin menggunakan then and catch
    Promise.allSettled(listPromise)
        .then((result) => {
            listResult = result;
        })
        .catch((err) => {
            console.log(err);
        });

    // Lakukan pengecekan hasil
    listResult.forEach((valueresult) => {
        console.log(valueresult);
        if (valueresult.status === 'fulfilled') {
            listValueResult.push(valueresult.value);
        }
    });
}

// ====================================
// Fungsi DetailBlog #1 Promise All Settled
async function asyncGetDetailBlogParalel(listpost = []) {
    const listPromise = [];
    // let listResult = [];
    // const listValueResult = [];
    // ambil detail 10 post pertama
    // Simpan promise object ke dalam Array,
    for (let i = 0; i < 10; i += 1) {
        const postId = listpost[i].id;
        const promiseDetail = getDetailData(postId);
        listPromise.push(promiseDetail);
    }

    // Jalankan secara paralel
    let listResult = [];
    try {
        listResult = await Promise.allSettled(listPromise);
    } catch (err) {
        console.log(err);
    }

    // Lakukan pengecekan hasil
    const listValueResult = [];
    listResult.forEach((valueresult) => {
        console.log(valueresult);
        if (valueresult.status === 'fulfilled') {
            listValueResult.push(valueresult.value);
        }
    });

    // Lanjutkan pengolahan data berikutnya
    console.log('Lanjutkan pengolahan data berikutnya', listValueResult);
}

// Eksekusi data promise
async function getBlogPostDetails() {
    try {
        const listBlog = await getListPost();
        asyncGetDetailBlogParalel(listBlog);
    } catch (err) {
        console.log(err);
    }
}

getBlogPostDetails();

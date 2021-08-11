// Contoh daftar HTTP Request
function getDetailData(id = 0) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
        (response) => response.json(),
    );
}

function getDetailDataError() {
    return fetch('https://jsonplaceholder.typicode.com/posts/asdfqeeasd').then(
        (response) => {
            console.log(response.status);
            if (response.status === 200 || response.status === 201) {
                return response.json();
            }
            return Promise.reject(
                new Error(`Request data error ${response.status}`),
            );
        },
    );
}

function getListPost() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(
        (response) => response.json(),
    );
}

// ====================================

// ====================================
// Fungsi DetailBlog #1 Promise All Settled
async function asyncGetDetailBlogParalel(listpost = []) {
    // ambil detail 10 post pertama
    // Simpan promise object ke dalam Array,
    const listPromise = [];
    for (let i = 0; i < 10; i += 1) {
        if (i === 6) {
            const promiseError = getDetailDataError();
            listPromise.push(promiseError);
        } else {
            const postId = listpost[i].id;
            const promiseDetail = getDetailData(postId);
            listPromise.push(promiseDetail);
        }
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
        } else {
            listValueResult.push({});
        }
    });

    // Lanjutkan pengolahan data berikutnya
    console.log('Lanjutkan pengolahan data berikutnya', listValueResult);
}

// ====================================
// Fungsi DetailBlog #1 Promise All Settled
async function asyncGetDetailBlogsPromiseAll(listpost = []) {
    // ambil detail 10 post pertama
    // Simpan promise object ke dalam Array,
    const listPromise = [];
    for (let i = 0; i < 10; i += 1) {
        // const postId = listpost[i].id;
        // const promiseDetail = getDetailData(postId);
        // listPromise.push(promiseDetail);
        if (i === 6) {
            const promiseError = getDetailDataError();
            listPromise.push(promiseError);
        } else {
            const postId = listpost[i].id;
            const promiseDetail = getDetailData(postId);
            listPromise.push(promiseDetail);
        }
    }

    // Jalankan secara paralel
    let listResult = [];
    try {
        listResult = await Promise.all(listPromise);
    } catch (err) {
        console.log(err);
    }

    // Lakukan pengecekan hasil
    const listValueResult = [];
    listResult.forEach((valueresult) => {
        console.log(valueresult);
        if (valueresult) {
            listValueResult.push(valueresult);
        }
    });

    // Lanjutkan pengolahan data berikutnya
    console.log('Lanjutkan pengolahan data berikutnya', listValueResult);
}

// Eksekusi data promise
async function getBlogPostDetails() {
    try {
        const listBlog = await getListPost();
        // asyncGetDetailBlogParalel(listBlog);
        asyncGetDetailBlogsPromiseAll(listBlog);
    } catch (err) {
        console.log(err);
    }
}

getBlogPostDetails();

// Contoh kasus lain yang promise undefined karena salah pengertian
const promiseDatasample = new Promise((resolve) => {
    setTimeout(() => {
        // Simulasi proses asinkronus
        resolve('Ada hasil Promise');
    }, 2000);
});

// Solusi lain menggunakan Async Await
async function eksekusiPromise() {
    const result = await promiseDatasample;
    console.log('Hasil promise didapat: ', result);
}

eksekusiPromise();

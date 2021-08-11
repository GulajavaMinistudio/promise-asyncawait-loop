// Contoh kasus lain yang promise undefined karena salah pengertian
const promiseDatasample = new Promise((resolve) => {
    setTimeout(() => {
        // Simulasi proses asinkronus
        resolve('Ada hasil Promise');
    }, 2000);
});

// eksekusi promise
let hasilPromise = null;
promiseDatasample
    .then((result) => {
        hasilPromise = result;
        console.log('Hasil promise', hasilPromise);
    })
    .catch((error) => {
        console.log(error);
    });

// Hasilnya pasti null karena proses asinkronus Promise di atas sedang berlangsung
// sedangkan console log di bawah ini bersifat sinkronus
// Sehingga akan dieksekusi duluan mendahului proses asinkron promise di atas
console.log('Hasil promise pasti null : ', hasilPromise);

// ==============================================================

// Solusi
function olahDataHasilPromise(data) {
    // Disini lakukan pengolahan data yang didapat dari Promise
    console.log('Olah data promise', data);
}

function eksekusiPromise() {
    promiseDatasample
        .then((result) => {
            hasilPromise = result;
            olahDataHasilPromise(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Eksekusi fungsinya
eksekusiPromise();

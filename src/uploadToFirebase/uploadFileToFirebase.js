import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";



export const uploadFileToFirebase = async (file, path) => {
    const filename = `${Date.now()}${file.name}`;
    const storageRef = ref(storage, `${path}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
        let res = await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    try {
                        let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        console.log('resolve');
                        resolve(downloadURL);
                    } catch (err) {
                        console.error('front error===', err.response.data);
                        reject(err);
                    }
                }
            );
        });
        console.log('return');
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};





/* Конструкция resolve(downloadURL) возвращает значение из Promise и устанавливает его как результат выполнения промиса.

Однако, переменная downloadURL в функции uploadFileToFirebase инициализируется в начале функции значением null, и затем обновляется асинхронно внутри колбэка uploadTask.on('state_changed', ...).

Так как вызов колбэка происходит асинхронно, до того, как значение downloadURL обновится внутри колбэка, функция uploadFileToFirebase уже вернёт значение downloadURL со значением null.

Чтобы получить актуальное значение downloadURL, которое обновляется внутри колбэка, мы используем конструкцию return downloadURL после того, как выполнение промиса завершится и колбэк успешно обновит значение переменной downloadURL. Таким образом, мы гарантируем, что результатом функции uploadFileToFirebase будет актуальное значение downloadURL.





zhenkaaf@gmail.com
Так как вызов колбэка происходит асинхронно, до того, как значение downloadURL обновится внутри колбэка, функция uploadFileToFirebase уже вернёт значение downloadURL со значением null. как тыпонимаешь что  вызов колбэка происходит асинхронно?
Вызов колбэка в данном случае происходит асинхронно потому, что код в функции uploadFileToFirebase не ждет, пока операция загрузки файла на сервер Firebase Storage завершится. Вместо этого, код добавляет слушатель события state_changed к объекту uploadTask и продолжает выполняться дальше, в том числе, до того, как колбэк будет вызван после успешной загрузки файла. Таким образом, функция uploadFileToFirebase завершает свою работу до того, как значение downloadURL будет обновлено внутри колбэка.

После того, как загрузка файла завершится и колбэк будет вызван, значение downloadURL будет обновлено, но функция uploadFileToFirebase уже завершила свою работу и вернула старое значение downloadURL, которое было установлено в null. Чтобы исправить это, нужно вернуть новое значение downloadURL, которое будет установлено внутри колбэка после успешной загрузки файла.





zhenkaaf@gmail.com
каким образом мы добиваемся этой последовательности? нужно вернуть новое значение downloadURL, которое будет установлено внутри колбэка после успешной загрузки файла.
Мы достигаем этой последовательности, используя Promise. Функция uploadFileToFirebase возвращает Promise, который резолвится только после того, как значение downloadURL будет обновлено внутри колбэка после успешной загрузки файла.

Когда функция uploadFileToFirebase вызывается, она создает Promise и возвращает его. После этого, она добавляет слушатель события state_changed к объекту uploadTask. Когда происходит изменение состояния uploadTask, вызывается соответствующий колбэк.

Внутри этого колбэка значение downloadURL устанавливается на полученное значение getDownloadURL(uploadTask.snapshot.ref). После этого вызывается resolve(downloadURL), которая резолвит Promise и возвращает значение downloadURL внутри функции uploadFileToFirebase.

Таким образом, мы получаем новое значение downloadURL, которое будет установлено внутри колбэка после успешной загрузки файла, и возвращаем его в функции uploadFileToFirebase только после того, как оно будет доступно. 



 }).then(() => {
        return downloadURL;
    }).catch((err) => {
        console.error(err);
        throw err;
    });
.then() - это метод, который вызывается после успешного выполнения асинхронной операции, представленной в виде промиса, и позволяет выполнить определенный код после выполнения этой операции.

В данном случае, .then(() => { return downloadURL; }) используется для того, чтобы вернуть обновленное значение downloadURL, когда колбэк загрузки файла успешно выполнится. Если его не написать, то функция uploadFileToFirebase() вернет значение downloadURL, которое на момент вызова return всё еще равно null, так как колбэк еще не выполнен и значение не обновлено.

Если вы используете await, то можете обойтись без .then(), например:*/




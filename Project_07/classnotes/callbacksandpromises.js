let doneWithHomework = true;
let doneWithChores = true;

// function canIWatchTV (successCallback, errorCallback) {
//     if (doneWithChores && doneWithHomework) {
//         successCallback()
//     } else {
//         errorCallback()
//     }
// }

// canIWatchTV(() => {
//     console.log("Yes you can watch tv");
// },
//     () => {
//         console.log("no, sorry");
//     }
// )

// function canIWatchTV() {
//     return new Promise((resolve, reject) => {
//         if(doneWithHomework && doneWithChores) {
//             resolve("Yes you can watch TV");
//         } else {
//             reject("No, Sorry");
//         }
//     });
// }

// canIWatchTV().then((message) => {
//     console.log(message);
// })
// .catch((message) => {
//     console.log(message);
// })

const url = 'https://jsonplace-univclone.herokuapp.com/todos';

fetch(url).then((Response) => Response.json())
    .then((data) => {
        console.log(data)
    })
import * as firebase from 'firebase-admin';
import privateKey from './../assets/privateKey.json';

const firebaseConfig = {
  apiKey: 'AIzaSyDLnTWjWlA2Ui-ORReRhCd7d5K1cIu3ZtE',
  authDomain: 'rfid-tag-bdce9.firebaseapp.com',
  databaseURL: 'https://rfid-tag-bdce9-default-rtdb.firebaseio.com',
  projectId: 'rfid-tag-bdce9',
  storageBucket: 'rfid-tag-bdce9.appspot.com',
  messagingSenderId: '761990817887',
  appId: '1:761990817887:web:406379841825a3ab4c93ea',
};

const serviceAccount: firebase.ServiceAccount = {
  projectId: 'rfid-tag-bdce9',
  clientEmail: 'firebase-adminsdk-vrcql@rfid-tag-bdce9.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoVg1FWSqitKHZ\nRTRNJ0CfxKFGMz5iw0FNtUNld0nH9dEg8lr8UFCSJYP5h59AwmFJdL4TCH7H8uo5\nHJFVf+5Xvbf6AjptP7K86X5mhOKQuB+bxbaRyc5Yk6DLcnFwpmlhkfP54avSbQ/7\nOkQGYjHTFbohM/I1musfCY8//URQltpPMCp3jiwwvq30eHTSXuuh3qK0Cnz5b+Z5\nZiWeqGnd6KYo39QubbYQc4KIjNtcoA0YtS/qasflbnYibK+lsrfTshApARY8BTsl\nzlpjPPuNzZaNhTThCBxdCm0s6+lbyWtU2nSBmpGArsOblMxNWrHqsbHcOvjY4FjQ\nH3f32Dn5AgMBAAECggEAJdAqq/zDHIhp4NXwUTJzjFANkCjbpzDIHw4MJSM+IhpA\nT1/Re2MJLkMaGbfS2KexVeBRABKE9CJHZevaY7PYlMILrS/J8xd/bXsfxySrhimu\nA/5OLAKChRgoYvsCq3TeMCoqfWOphpu0HtFwTWTKX2m+hU3XZx41GaQ6lvur2FQk\n7PcvK5o9b2qoOX8Z+I8TYOeMPsKPC9quvUBAo9ROZc/OnBGfQkS8HDVW+OfW07vL\nlm0auAQVXer9FjD9PYPtlbVfoqNQ7F0Q0c0Pt4tzzAuCXjvBEaPBPuNGqXaZa/ER\nDMIBH4p/jiDg3DiXzCzeIIDFCqtyVKSrzEVO1cbOWQKBgQDjvm4/ODR4efXLGlty\n/vG3D1fhgAM3DIE+vR8OyXxz4o4x3FNNg0feSVuakxcICjs/Wa5iFE8x6w5DxJuu\nqhvrVTleW51iDnjyw9O9xBeJ3mQKZqYl7WnOjBeWUMe6MwItzlb2x6qjAOi/buqc\nvJ0ovGc7qpJP4gzkz3ftEANppQKBgQC9OLiYhT2QqaUzSxZh3ZBZxxH0jtBaB4IX\nOscqPO1jroFkDPgBSvC6icddAx99uHoVONY//OPNYYzlfi+LEHQdF5ZG37XOs9j3\np3X9fzUbKePgKkcNHm85S0iYTAMp2tI7DOzSU1qxaFDxBKb8Xa6MramMAGLDReD3\nQEWwmsjWxQKBgCEDTb/kSdbc9wBGBdOZmThMBRUvFUg5i9KoX4QpON0jjjE0Gu81\nhIl4YMr7X29O7F+2hEy7XO+Df0HbkiWzivCGHhbLePjp2CZ4tIzhi/f0QNQxJQyC\nacADFrg3ZXxcQIibTIfhUZ7nVtXJIkEuJinthZlklGj3/557ZIr8s0HxAoGBAK6q\nvTuNQtdWwfgnR/Hu5GD7McfeTNXOOHfY+iAzPa7WVvpUPlpzIuQOasmhKGCU+Zy9\naoiGmIHtmnH9mUV1WrnAHCgwOVMlERMKsg/ebNc2Q/OZEx05CtKIe+qZwBHSvF1m\nAPXlm8JH2O+iq8IpeAbEB84ETSaUSqXx3mK3fs1BAoGAPWd+KMd+FlzZ4Nhe1x9K\na/rf2+kQqPzWVgSZa0rT2NDffQp8bXs7/20lgnvuWQUJ2rjDSzG2eo+jEvX7tHW7\ne2xHFJSWwAd2a6lYQDu/DSON3CDaLvoNzGir6/TCqfta2Du1R0Sx+t0cRcK/NGu3\ntzyGpaYDwQdGVO86S0PqyHE=\n-----END PRIVATE KEY-----\n',
};

console.log(process.env.FIRBASE);

const app = firebase.initializeApp({
  ...firebaseConfig,
  credential: firebase.credential.cert(serviceAccount),
});
export const database = app.database();

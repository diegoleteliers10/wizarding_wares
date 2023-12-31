
const validateString = (cadena) => {
  const abc = [
    "a","b","c","d","e","f","g","h","i",
    "j","k","l","m","n","ñ","o","p","q","r",
    "s","t","u","v","w","x","y","z"," ","á","é",
    "í","ó","ú"
  ];
  if(!cadena) throw new Error('Parametro Necesario Incompleto'); // Si No Me Pasan Argumnetos
  //if(typeof cadena !== "string") throw ('El Argumento Debe Ser Un String');
  cadena = cadena.toLowerCase();
  cadena = cadena.split("");
  let count = 0;
  cadena.forEach((elem) => {
    if(abc.includes(elem)) count++;     // p, i, k, a, c, h, u, 8, ()
    //Revisamos Si Cada 'elem' Se Encuentra En El Array De 'abc'
  })
  if(count === cadena.length) return true; //Si count tiene El Mismo Largo Que Cadena; Entonces Es Un String De Solo Letras
  return false;
};

const arrojarError = (mensaje) => {
	throw new Error(mensaje);
};


const validadorDeEmails = (email) => {
  const validEmail1 = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const validEmail2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;

  if (validEmail1.test(email) || validEmail2.test(email)){
    return true;
  }else{
    return false;
  }
};


const validadorDePassword = (password) => {
  // Si no me pasan un argumento, return false;
  if(!password) return false;
  
  // Verificamos el largo de la contraseña, que debe de ser entre 6 y 20 catracteres.
  // En caso de ser menor que 6 y a la vez ser mayor 20. return false;
  const passwordLength = (password.length >= 6 && password.length <= 20);
  if(!passwordLength) return false;

  // Verificamos si la contraseña esta formada tanto por letras como por numeros
  const isAlfanumeric = (/[a-z]/.test(password) && /[0-9]/.test(password));
  if(!isAlfanumeric) return false;

  // Verificamos que por lo menos una letra este en Mayuscula
  const isUpperCase = (/[A-Z]/.test(password));
  if(!isUpperCase) return false;

  // Si pasa todas las validaciones retornamos true;
   return true;
};

const generateRandomString = () => {
  const length = Math.floor(Math.random() * 15) + 6; // Random length between 6 and 20
  const numbers = '0123456789';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  
  // que arranque con GL de "google-register"
  let randomString = 'GR';

  // al menos 1 numero
  const randomIndex = Math.floor(Math.random() * numbers.length);
  randomString += numbers[randomIndex];

  // al menos una mayuscula
  const uppercaseIndex = Math.floor(Math.random() * uppercaseLetters.length);
  randomString += uppercaseLetters[uppercaseIndex];

  // al menos una minuscula
  const lowercaseIndex = Math.floor(Math.random() * lowercaseLetters.length);
  randomString += lowercaseLetters[lowercaseIndex];

  // el resto de los caracteres
  const remainingChars = length - 5;
  const allChars = numbers + uppercaseLetters + lowercaseLetters;

  for (let i = 0; i < remainingChars; i++) {
    const charIndex = Math.floor(Math.random() * allChars.length);
    randomString += allChars[charIndex];
  }

  return randomString;
}



module.exports = {
	validateString,
	arrojarError,
  validadorDeEmails,
  validadorDePassword,
  generateRandomString,
};

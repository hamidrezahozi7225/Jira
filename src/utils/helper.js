import { compare, hash } from 'bcryptjs';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function testPassword(pwd) {
  if (pwd.length <= 6)
    return {
      valid: false,
      message: 'Please make sure password is longer than 6 characters.',
    };

  if (!/[A-Z].*[A-Z]/.test(pwd))
    return {
      valid: false,
      message: 'Please make sure password includes 2 capital letters',
    };

  if (!/\d/.test(pwd))
    return {
      valid: false,
      message: 'Please make sure Password Includes a Digit',
    };

  if (/\s/.test(pwd))
    return { valid: false, message: 'Please only use visible characters' };

  return { valid: true, message: 'Valid Password' };
}

async function hashPass(psw) {
  const hashPassWord = await hash(psw, 12);
  return hashPassWord;
}

async function verifyPassword(userPsw, psw) {
  const verifyPass = await compare(psw, userPsw);
  return verifyPass;
}

export { validateEmail, testPassword, hashPass, verifyPassword };

// utils/authUtils.js

export const encryptData = (data) => {
  return btoa(JSON.stringify(data));
};

export const decryptData = (encrypted) => {
  try {
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
};

export const initializeUsers = () => {
  if (!localStorage.getItem("users")) {
    const users = [
      {
        id: 1,
        email: import.meta.env.VITE_USER1_EMAIL,
        password: import.meta.env.VITE_USER1_PASSWORD,
        role: import.meta.env.VITE_USER1_ROLE,
      },
      {
        id: 2,
        email: import.meta.env.VITE_USER2_EMAIL,
        password: import.meta.env.VITE_USER2_PASSWORD,
        role: import.meta.env.VITE_USER2_ROLE,
      },
    ];

    localStorage.setItem("users", encryptData(users));
  }
};

export const validateUser = (email, password) => {
  const encryptedUsers = localStorage.getItem("users");
  if (!encryptedUsers) {
    initializeUsers(); // Eğer users yoksa initialize et
    return validateUser(email, password); // Recursive olarak tekrar kontrol et
  }

  const users = decryptData(encryptedUsers);
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

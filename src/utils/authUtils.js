export const initializeUsers = () => {
  if (!localStorage.getItem("users")) {
    const users = [
      {
        id: 1,
        email: "admin@example.com",
        password: "Test109*",
        role: "admin",
      },
      {
        id: 2,
        email: import.meta.env.VITE_USER2_EMAIL,
        password: import.meta.env.VITE_USER2_PASSWORD,
        role: import.meta.env.VITE_USER2_ROLE,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));

    return users;
  }
  return JSON.parse(localStorage.getItem("users"));
};

export const validateUser = (email, password) => {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : initializeUsers();

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return foundUser;
  }
  return null;
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser");
};

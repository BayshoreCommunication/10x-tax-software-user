const users = [
  {
    email: "arsahak@gmail.com",
    password: "12345",
    company: "Bayshore Tech",
    name: "AR Sahak",
    image: "https://i.ibb.co.com/Yb61fFC/1726902985654.jpg",
    domain: "sahak.10xtax.com",
  },

  {
    email: "milon@gmail.com",
    password: "12345",
    company: "Milon Tech",
    name: "NG Milon",
    image:
      "https://i.ibb.co.com/3hRmXDJ/young-bearded-man-with-striped-shirt-273609-5677.jpg",
    domain: "milon.10xtax.com",
  },

  {
    email: "abu@gmail.com",
    password: "12345",
    company: "Abu Tech",
    name: "Abu Kawsar ",
    image:
      "https://i.ibb.co.com/3hRmXDJ/young-bearded-man-with-striped-shirt-273609-5677.jpg",
    domain: "abu.10xtax.com",
  },

  {
    email: "bayshore@gmail.com",
    password: "12345",
    company: "Bayshore",
    name: "Bayshore",
    image: "https://i.ibb.co.com/Mcnmvq6/Mask-group-1.png",
  },
];

export const getUserByEmail = (email: any) => {
  const found = users.find((user: any) => user.email === email);
  return found;
};

// Demo accounts only. Replace this module with your real user store before deployment.
const users = [
  {
    id: "customer-demo",
    name: "Demo Customer",
    phone: "0911111111",
    password: "Eats1234!",
    role: "customer",
  },
  {
    id: "staff-demo",
    name: "Kitchen Staff",
    phone: "0922222222",
    password: "Kitchen123!",
    role: "staff",
  },
];
export function verifyCredentials(phone, password) {
  const user = users.find(
    (item) => item.phone === phone && item.password === password,
  );
  if (!user) return null;
  return { id: user.id, name: user.name, role: user.role };
}

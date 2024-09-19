export const test = (req, res) => {
  console.log(req.user);
  res.json({ message: 'Hello' });
};

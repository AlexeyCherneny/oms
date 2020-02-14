const parseNumbers = number => {
  return number ? number.replace(/[^0-9]/g, "") : "";
};

export default { parseNumbers };

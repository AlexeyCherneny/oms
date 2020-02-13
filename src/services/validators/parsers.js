const parseNumbers = number => {
  console.log("number: ", number ? number.replace(/[^0-9]/g, "") : "");
  return number ? number.replace(/[^0-9]/g, "") : "";
};

export default { parseNumbers };

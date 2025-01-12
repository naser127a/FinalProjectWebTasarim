const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Event = require("../models/etkinlik"); // Event modelini doğru bağladığınızdan emin olun.
let userId;
router.get("/:pageNo?", async (req, res) => {
  let pageNo = 1;

  if (req.params.pageNo) {
    pageNo = parseInt(req.params.pageNo);
  }
  if (req.params.pageNo == 0) {
    pageNo = 1;
  }

  let q = {
    skip: 5 * (pageNo - 1),
    limit: 5,
  };
   userId = req.session.userId;

  const successMessage = req.flash("successMessage");

  console.log(userId);
  if(userId){
  try {
    // Find total documents
    const totalDocs = await Event.countDocuments({ userId });
    const etikinliklerArr = await Event.find({ userId }, {}, q).sort({
      year: -1, //
      month: -1, //
      day: -1, //
    });

    res.render("index", {
      etikinliklerArr: etikinliklerArr,
      total: parseInt(totalDocs),
      pageNo: pageNo,
      successMessage: successMessage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching events.");
  }
}else{
  req.session.userId = "";
  res.render("index", {
    etikinliklerArr: [],
    total: 0,
    pageNo: 0,
    successMessage: successMessage,
  });
}
});

router.post("/send-data", (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  console.log(firstName, lastName, email, message);

  const filePath = "şikayetlerVeOnarmalar.xlsx";
  let workbook;

  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    workbook = XLSX.utils.book_new();
  }

  let worksheet = workbook.Sheets["şikayetlerVeOnarmalar"];
  if (!worksheet) {
    worksheet = XLSX.utils.aoa_to_sheet([
      ["First Name", "Last Name", "Email", "Message"],
    ]);
    workbook.Sheets["şikayetlerVeOnarmalar"] = worksheet;
  }

  const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const newRecord = [firstName, lastName, email, message];
  sheetData.push(newRecord);

  const updatedWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
  workbook.Sheets["şikayetlerVeOnarmalar"] = updatedWorksheet;

  XLSX.writeFile(workbook, filePath);

  res.send("Your message has been saved to Excel!");
});

module.exports = router;

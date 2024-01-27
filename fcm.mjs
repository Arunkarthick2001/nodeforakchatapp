import express from "express";
import bodyParser from "body-parser"; // Import bodyParser to parse JSON in the request body
import FCM from "fcm-node";
import cors from "cors";

const app = express();

app.use(cors());
const serverKey =
  "AAAAipvA_Yk:APA91bGsAR5Y-DXF30IHOzLUx70JNyy72xlJrRkXnYoLn_AjePeMoHO7mJ26yO6PndQYzNxhpR_dfoowqOoK__bY77jBasy3i-7ZIrOHO4mcHWBPXDuTcRzgdyKxMdBSCw1jcsqiJ-UX";
const fcm = new FCM(serverKey);

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

app.post("/sendNotification", (req, res) => {
  // Extract data from the request body
  // res.status(200).json({ success: true });
  console.log("j");
  const { deviceToken, notificationTitle, notificationBody } = req.body;

  const message = {
    to: deviceToken,
    notification: {
      title: notificationTitle,
      body: notificationBody,
    },
    data: {
      title: "ok cdfsdsdfsd",
      body: '{"name": "okg ooggle ogrlrl", "product_id": "123", "final_price": "0.00035"}',
    },
  };

  fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong! " + err);
      res.status(500).json({ error: "Failed to send notification" });
    } else {
      console.log("Successfully sent with response: ", response);
      res.status(200).json({ success: true, response });
    }
  });
});
app.post("/", (req, res) => {
res.status(200)});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});